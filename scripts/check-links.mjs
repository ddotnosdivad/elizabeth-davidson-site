// Checks every internal link and image in _site against the running preview
// server (node scripts/serve.mjs), so _redirects rules count as working links.
//   node scripts/check-links.mjs   -> lists anything that doesn't end in a 200
import fs from 'node:fs';
import path from 'node:path';

const SITE = path.resolve(import.meta.dirname, '..', '_site');
const BASE = `http://localhost:${process.env.PORT || 8090}`;

const pages = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.html')) pages.push(p);
  }
})(SITE);

const targets = new Map(); // url -> first page that links it
for (const p of pages) {
  const html = fs.readFileSync(p, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    if (!targets.has(url)) targets.set(url, path.relative(SITE, p));
  }
  for (const [, url] of html.matchAll(/url\((\/[^)]+)\)/g)) {
    if (!targets.has(url)) targets.set(url, path.relative(SITE, p));
  }
}

let bad = 0;
for (const [url, from] of targets) {
  let res = await fetch(BASE + url, { redirect: 'follow' });
  if (res.status !== 200) {
    bad++;
    console.log(`${res.status}  ${url}  (linked from ${from})`);
  }
}
console.log(`${pages.length} pages, ${targets.size} internal URLs checked, ${bad} broken`);
