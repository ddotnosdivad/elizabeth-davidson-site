// One-command deploy for Elizabeth's site:  npm run deploy -- "what changed"
// Builds src/ into a fresh temporary folder and uploads only that folder to the
// Netlify site this project is linked to (.netlify/state.json -> ed-preview-lt0osb8c).
// A fresh folder each time means deleted pages never linger and Windows file locks
// on _site/ (the local preview's folder) can't break a deploy.
//
// The site launched on elizabethdavidson.com on 2026-10-30, so this builds the real
// version. `--preview` builds the hidden-from-Google version; never deploy that to
// this site now, because it would de-index her live site.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const live = !process.argv.includes('--preview');
const message = process.argv.slice(2).filter((a) => !a.startsWith('--')).join(' ') || 'Site update';

const state = JSON.parse(fs.readFileSync(path.join(root, '.netlify', 'state.json'), 'utf8'));
if (state.siteId !== 'ea26c76d-3ae8-4728-8f47-8be54df626f3') {
  throw new Error(`This folder is linked to an unexpected Netlify site (${state.siteId}); refusing to deploy.`);
}

const out = fs.mkdtempSync(path.join(os.tmpdir(), 'ed-site-'));
const env = { ...process.env, PREVIEW: live ? '' : '1' };
const shell = process.platform === 'win32';
console.log(live ? 'Building the LIVE site (visible to Google)...' : 'Building the PREVIEW site (hidden from Google)...');
execFileSync(process.execPath, ['node_modules/@11ty/eleventy/cmd.cjs', '--quiet', `--output=${out}`], { cwd: root, stdio: 'inherit', env });
execFileSync('netlify', ['deploy', '--prod', '--no-build', '--dir', out, '--message', message], { cwd: root, stdio: 'inherit', env, shell });
fs.rmSync(out, { recursive: true, force: true });
