// One-time importer: pulls every blog post off the live Wix site and writes
// src/blog/posts/<slug>.md (front matter + Markdown body).
//
//   node scripts/import-wix-blog.mjs            # all posts in the Wix sitemap
//   node scripts/import-wix-blog.mjs <slug> ... # just these posts
//
// Raw HTML is cached in _scrape/posts/ so re-runs don't refetch.
// Images stay hot-linked to static.wixstatic.com for now; they must be
// downloaded into src/assets/ before the Wix plan is cancelled (see INVENTORY.md).
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const ORIGIN = 'https://www.elizabethdavidson.com';
const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE = path.join(ROOT, '_scrape', 'posts');
const OUT = path.join(ROOT, 'src', 'blog', 'posts');
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

async function get(url, cacheFile) {
  if (cacheFile && fs.existsSync(cacheFile)) return fs.readFileSync(cacheFile, 'utf8');
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const text = await res.text();
  if (cacheFile) fs.writeFileSync(cacheFile, text);
  return text;
}

// Wix image URLs carry a transform suffix (/v1/fill/w_..,h_../name.jpg); keep the original.
const wixOriginal = (src) => {
  const m = src && src.match(/https:\/\/static\.wixstatic\.com\/media\/[^/]+/);
  return m ? m[0] : src;
};

// Category -> post slugs, by walking each category listing (and its /page/N pages).
async function categoryMap() {
  const sitemap = await get(`${ORIGIN}/blog-categories-sitemap.xml`, path.join(CACHE, '_categories-sitemap.xml'));
  const cats = [...sitemap.matchAll(/<loc>[^<]*\/blog\/categories\/([^<]+)<\/loc>/g)].map((m) => m[1]);
  const bySlug = {};
  for (const cat of cats) {
    let label = cat;
    for (let page = 1; page < 30; page++) {
      const url = `${ORIGIN}/blog/categories/${cat}${page > 1 ? `/page/${page}` : ''}`;
      let html;
      try { html = await get(url, path.join(CACHE, `_cat-${cat}-${page}.html`)); } catch { break; }
      const $ = cheerio.load(html);
      label = $(`a[href$="/blog/categories/${cat}"]`).first().text().trim() || label;
      const slugs = [...new Set($('a[href*="/post/"]').map((_, a) => decodeURIComponent($(a).attr('href').split('/post/')[1])).get())];
      const fresh = slugs.filter((s) => !(bySlug[s] || []).includes(label));
      if (!fresh.length) break;
      for (const s of fresh) (bySlug[s] ||= []).push(label);
    }
  }
  return bySlug;
}

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', emDelimiter: '*' });
td.addRule('wixImage', {
  filter: 'img',
  replacement: (_, node) => {
    const src = wixOriginal(node.getAttribute('src') || '');
    return src.startsWith('http') ? `\n\n![${node.getAttribute('alt') || ''}](${src})\n\n` : '';
  },
});
// Wix wraps every image in expand buttons / figure chrome; drop the buttons.
td.remove(['button', 'svg', 'style', 'script']);

function yamlStr(s) {
  return JSON.stringify(String(s ?? ''));
}

async function importPost(slug, cats) {
  const html = await get(`${ORIGIN}/post/${encodeURI(slug)}`, path.join(CACHE, `${slug}.html`));
  const $ = cheerio.load(html);
  const title = $('[data-hook="post-title"]').first().text().trim() || $('meta[property="og:title"]').attr('content');
  const date = (html.match(/"datePublished":"([^"]+)"/) || [])[1];
  const description = $('meta[property="og:description"]').attr('content') || '';
  const image = wixOriginal($('meta[property="og:image"]').attr('content') || '');
  const tags = $('a[href*="/blog/tags/"]').map((_, a) => $(a).text().trim()).get();

  const body = $('[data-id="content-viewer"]').first();
  // Wix rich content: images live in <img> inside gallery/image wrappers; unwrap links around images.
  body.find('[data-hook="image-expand-button"], [data-hook="gallery-expand"]').remove();
  body.find('img').each((_, img) => {
    const $img = $(img);
    if (!$img.attr('src') && $img.attr('data-pin-media')) $img.attr('src', $img.attr('data-pin-media'));
  });
  let md = td.turndown(body.html() || '');
  md = md
    .replace(/​/g, '')
    .replace(/^[\s ]+$/gm, '')
    .replace(/^\s*\*\*\s*\*\*\s*$/gm, '')
    // headings are already bold; Wix also wraps their text in <strong>
    .replace(/^(#{1,6} .*)$/gm, (h) => h.replace(/\*\*/g, ''))
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  // og:description is Wix's first ~300 chars glued together; use a clean first-paragraph excerpt.
  const firstPara = md.split('\n\n').find((p) => !/^[#!-]/.test(p)) || description;
  const plain = firstPara.replace(/[*_\\]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
  const excerpt = plain.length > 160 ? plain.slice(0, 157).replace(/\s+\S*$/, '') + '…' : plain;

  const fm = [
    '---',
    `title: ${yamlStr(title)}`,
    `date: ${date ? date.slice(0, 10) : ''}`,
    `description: ${yamlStr(excerpt)}`,
    `image: ${yamlStr(image)}`,
    `categories: ${JSON.stringify(cats[slug] || [])}`,
    `wixTags: ${JSON.stringify(tags)}`,
    `wixUrl: ${yamlStr(`${ORIGIN}/post/${slug}`)}`,
    '---',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(OUT, `${slug}.md`), fm + md + '\n');
  return { slug, title, chars: md.length };
}

const only = process.argv.slice(2);
const sitemap = await get(`${ORIGIN}/blog-posts-sitemap.xml`, path.join(CACHE, '_posts-sitemap.xml'));
let slugs = [...sitemap.matchAll(/<loc>[^<]*\/post\/([^<]+)<\/loc>/g)].map((m) => decodeURIComponent(m[1]));
if (only.length) slugs = slugs.filter((s) => only.includes(s));
const cats = await categoryMap();
let n = 0;
for (const slug of slugs) {
  try {
    const r = await importPost(slug, cats);
    n++;
    if (r.chars < 300) console.warn(`short body (${r.chars} chars): ${slug}`);
  } catch (e) {
    console.error(`FAILED ${slug}: ${e.message}`);
  }
}
console.log(`imported ${n}/${slugs.length} posts; ${Object.keys(cats).length} posts have categories`);
