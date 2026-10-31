// Local preview of _site that behaves like Netlify: /about serves about.html,
// and src/_redirects rules answer with their 301s. No dependencies.
//   npm run build && node scripts/serve.mjs   (port 8090, or PORT=...)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const SITE = path.resolve(import.meta.dirname, '..', '_site');
const PORT = Number(process.env.PORT) || 8090;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4',
  '.xml': 'application/xml', '.ico': 'image/x-icon', '.json': 'application/json' };

// Netlify _redirects: "from to status", supports a trailing /* splat and :placeholders.
function loadRules() {
  const file = path.join(SITE, '_redirects');
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const [from, to, status = '301'] = l.split(/\s+/);
      const re = new RegExp('^' + from.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\/\*$/, '(?:/(.*))?').replace(/:([a-z]+)/g, '(?<$1>[^/]+)') + '/?$');
      return { re, to, status: parseInt(status) };
    });
}

function fileFor(p) {
  const candidates = p.endsWith('/') ? [p + 'index.html'] : [p, p + '.html', p + '/index.html'];
  for (const c of candidates) {
    const f = path.join(SITE, decodeURIComponent(c));
    if (f.startsWith(SITE) && fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
}

http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://x');
  const file = fileFor(pathname);
  if (!file) {
    for (const r of loadRules()) {
      const m = pathname.match(r.re);
      if (!m) continue;
      let to = r.to.replace(':splat', m[1] || '');
      for (const [k, v] of Object.entries(m.groups || {})) to = to.replace(':' + k, v);
      res.writeHead(r.status, { location: to });
      return res.end();
    }
  }
  const f = file || path.join(SITE, '404.html');
  res.writeHead(file ? 200 : 404, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(PORT, () => console.log(`serving ${SITE} at http://localhost:${PORT}`));
