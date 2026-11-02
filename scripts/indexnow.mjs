// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver) which pages are new or
// changed, so they crawl those now instead of waiting to rediscover them.
// GOOGLE DOES NOT USE INDEXNOW; for Google, use Search Console's sitemap and Request Indexing.
//
//   npm run indexnow                              # dry run: list every URL in the live sitemap
//   npm run indexnow -- --since 2026-11-01        # only pages with lastmod on or after the date
//   npm run indexnow -- --url /post/some-slug     # one page (repeatable)
//   add --send to any of these to actually submit
//
// Run AFTER `npm run deploy`: URLs come from the LIVE sitemap, and Bing fetches the key file
// from the live site to verify ownership. The key file is src/<KEY>.txt (copied to the site
// root by eleventy.config.js) and must keep shipping with every deploy.
const HOST = 'www.elizabethdavidson.com';
const KEY = 'e5d109e58241b7a98022b07b80e56088';
// Bing directly rather than api.indexnow.org: The Move Genie got 403s from the shared endpoint
// for a key that served fine, while Bing accepted the same payload. Bing shares it onward.
const ENDPOINT = 'https://www.bing.com/indexnow';

const args = process.argv.slice(2);
const SEND = args.includes('--send');
const sinceIdx = args.indexOf('--since');
const SINCE = sinceIdx >= 0 ? args[sinceIdx + 1] : null;
const only = args.flatMap((a, i) => (a === '--url' ? [args[i + 1]] : []))
  .map((u) => (u.startsWith('http') ? u : `https://${HOST}${u.startsWith('/') ? '' : '/'}${u}`));

const keyRes = await fetch(`https://${HOST}/${KEY}.txt`);
const keyText = keyRes.ok ? (await keyRes.text()).trim() : '';
if (keyText !== KEY) {
  console.error(`Key file not live at https://${HOST}/${KEY}.txt (HTTP ${keyRes.status}). Deploy first.`);
  process.exit(1);
}

let urls = only;
if (!urls.length) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)]
    .map((m) => ({ loc: m[1], lastmod: m[2] || '' }));
  urls = entries.filter((e) => !SINCE || e.lastmod >= SINCE).map((e) => e.loc);
  console.log(`${entries.length} URLs in the live sitemap${SINCE ? `, ${urls.length} with lastmod >= ${SINCE}` : ''}.`);
}
if (!urls.length) { console.log('Nothing to submit.'); process.exit(0); }

if (!SEND) {
  urls.forEach((u) => console.log(`  ${u}`));
  console.log(`\nDry run: ${urls.length} URL(s). Add --send to submit.`);
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`Submitted ${urls.length} URL(s): HTTP ${res.status} ${res.statusText}`);
if (res.status >= 300) {
  console.log(await res.text());
  console.log('403 usually means Bing has not verified the site yet: add it in Bing Webmaster Tools, then retry.');
  process.exit(1);
}
