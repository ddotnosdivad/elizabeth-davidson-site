// Eleventy config. Pages live in src/ as .njk (layout-heavy) or .md (text-heavy).
// URLs match the old Wix site (no trailing slash): each page is written as
// <path>.html and Netlify serves /about from about.html automatically.
import fs from 'node:fs';

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'src/_redirects': '_redirects' });
  // IndexNow key file; Bing fetches it from the site root to verify ownership (scripts/indexnow.mjs).
  eleventyConfig.addPassthroughCopy({ 'src/e5d109e58241b7a98022b07b80e56088.txt': 'e5d109e58241b7a98022b07b80e56088.txt' });
  eleventyConfig.addGlobalData('year', new Date().getFullYear());
  // Appended to the stylesheet URL so each deploy busts browser caches.
  eleventyConfig.addGlobalData('buildVersion', Date.now().toString(36));
  // PREVIEW=1 builds a private review copy: noindex everywhere, robots.txt blocks all.
  eleventyConfig.addGlobalData('preview', process.env.PREVIEW === '1');

  eleventyConfig.addCollection('posts', (api) =>
    api.getFilteredByGlob('src/blog/posts/*.md').sort((a, b) => b.date - a.date)
  );

  // Blog sections (src/_data/blogSections.json, chosen per post by `section:`) and
  // cities (per post `cities:`). Cities are listed by post count, biggest first.
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  eleventyConfig.addFilter('slug', slug);
  const cityList = (posts) => {
    const map = new Map();
    for (const p of posts) for (const c of p.data.cities || []) {
      if (!map.has(c)) map.set(c, []);
      map.get(c).push(p);
    }
    return [...map].map(([name, list]) => ({ name, slug: slug(name), posts: list }))
      .sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name));
  };
  eleventyConfig.addFilter('cities', cityList);
  // Nunjucks' selectattr can't compare values, so look sections up here.
  const sectionData = () => JSON.parse(fs.readFileSync('src/_data/blogSections.json', 'utf8'));
  eleventyConfig.addFilter('sectionOf', (slugValue) => sectionData().find((s) => s.slug === slugValue));
  eleventyConfig.addFilter('inSection', (posts, section) => posts.filter((p) => p.data.section === section));
  // "Keep Reading" box under a post: posts sharing a city first, then the same
  // section, then the newest. `posts` is already newest-first, so ties stay newest.
  eleventyConfig.addFilter('related', (posts, url, cities = [], section, n = 3) => {
    const rank = (p) => ((p.data.cities || []).some((c) => cities.includes(c)) ? 0 : p.data.section === section ? 1 : 2);
    return posts.filter((p) => p.url !== url)
      .map((p, i) => ({ p, r: rank(p), i }))
      .sort((a, b) => a.r - b.r || a.i - b.i)
      .slice(0, n).map((x) => x.p);
  });

  // Every listing page the blog needs, as one flat list a template can paginate over:
  // /blog/<section>[/page/N] (12 per page) and /blog/city-guides/<city>.
  eleventyConfig.addCollection('blogPages', (api) => {
    const sections = JSON.parse(fs.readFileSync('src/_data/blogSections.json', 'utf8'));
    const posts = api.getFilteredByGlob('src/blog/posts/*.md').sort((a, b) => b.date - a.date);
    const pages = [];
    for (const s of sections) {
      const list = posts.filter((p) => p.data.section === s.slug);
      const total = Math.max(1, Math.ceil(list.length / 12));
      for (let n = 0; n < total; n++) {
        const url = (k) => `/blog/${s.slug}${k ? `/page/${k + 1}` : ''}`;
        pages.push({
          url: url(n), section: s, title: s.label, blurb: s.blurb,
          posts: list.slice(n * 12, n * 12 + 12),
          prev: n > 0 ? url(n - 1) : null, next: n < total - 1 ? url(n + 1) : null,
          pageNumber: n + 1, totalPages: total,
        });
      }
    }
    const cityGuides = sections.find((s) => s.byCity);
    for (const c of cityList(posts)) {
      pages.push({
        url: `/blog/city-guides/${c.slug}`, section: cityGuides, city: c.name,
        title: `${c.name} Guide`, blurb: `Living in and around ${c.name}: guides, local favorites and homes I've listed.`,
        posts: c.posts, pageNumber: 1, totalPages: 1,
      });
    }
    return pages;
  });

  eleventyConfig.addFilter('readableDate', (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
  );
  eleventyConfig.addFilter('head', (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter('isoDate', (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter('minutesToRead', (html) =>
    Math.max(1, Math.round(String(html).replace(/<[^>]+>/g, ' ').split(/\s+/).length / 230))
  );
  // Wix originals are large; ask Wix's CDN for a sized copy while images are still hot-linked.
  eleventyConfig.addFilter('wixSized', (src, w) =>
    /static\.wixstatic\.com\/media\/[^/]+$/.test(src || '')
      ? `${src}/v1/fill/w_${w},h_${Math.round(w * 0.5625)},al_c,q_80/${src.split('/').pop().replace('~', '_')}`
      : src
  );
  // page.url is /about.html; links and canonicals use Netlify's /about.
  eleventyConfig.addFilter('cleanUrl', (u) => String(u).replace(/(index)?\.html$/, ''));

  return {
    dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}
