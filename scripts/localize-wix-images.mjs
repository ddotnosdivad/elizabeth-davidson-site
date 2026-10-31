// Copies every static.wixstatic.com image the site still hot-links into
// src/assets/img/blog/wix/ (resized to <=1600px, WebP) and rewrites the references,
// so nothing depends on Wix once the plan lapses.   node scripts/localize-wix-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'src/assets/img/blog/wix');
const urlRe = /https:\/\/static\.wixstatic\.com\/media\/([^/\s"')\]]+)(\/v1\/[^\s"')\]]*)?/g;

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!p.includes(path.join('src', 'assets'))) walk(p); }
    else if (/\.(md|njk|json|js)$/.test(e.name)) files.push(p);
  }
})(path.join(root, 'src'));

const ids = new Set();
for (const f of files) for (const m of fs.readFileSync(f, 'utf8').matchAll(urlRe)) ids.add(m[1]);
fs.mkdirSync(outDir, { recursive: true });

const localName = (id) => id.replace(/~mv2/, '').replace(/\.\w+$/, '') + '.webp';
const failed = [];
let i = 0;
const queue = [...ids];
async function worker() {
  while (queue.length) {
    const id = queue.shift();
    const dest = path.join(outDir, localName(id));
    if (fs.existsSync(dest)) continue;
    try {
      const r = await fetch(`https://static.wixstatic.com/media/${id}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const buf = Buffer.from(await r.arrayBuffer());
      await sharp(buf).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest);
      if (++i % 25 === 0) console.log(`${i} downloaded`);
    } catch (e) { failed.push(`${id}: ${e.message}`); }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

let edited = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  const after = before.replace(urlRe, (all, id) => fs.existsSync(path.join(outDir, localName(id))) ? `/assets/img/blog/wix/${localName(id)}` : all);
  if (after !== before) { fs.writeFileSync(f, after); edited++; }
}
const bytes = fs.readdirSync(outDir).reduce((s, n) => s + fs.statSync(path.join(outDir, n)).size, 0);
console.log(`${ids.size} images, ${i} newly downloaded, ${failed.length} failed, ${edited} files rewritten, ${(bytes / 1e6).toFixed(1)} MB on disk`);
if (failed.length) console.log(failed.join('\n'));
