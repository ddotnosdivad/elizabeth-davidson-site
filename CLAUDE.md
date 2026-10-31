# Elizabeth Davidson's website (elizabethdavidson.com)

Eleventy site rebuilt from Wix. Todd asks for changes in plain English; Claude edits and deploys.
Read README.md for structure; INVENTORY.md / OPEN-QUESTIONS.md for history.

## Rules
- Brokerage name is **Cascade Hasson Sotheby's International Realty**. Never write "Hasson Company"/"Hasson Co".
- Phone **503-939-2035** only. Office: 310 N. State St, Suite 102, Lake Oswego, OR 97034. License #201101040.
- Site-wide facts live in `src/_data/site.json`; never hard-code them in pages.
- Write in Elizabeth's first-person voice, warm and upbeat, like the existing posts. Fair housing: never describe
  who lives somewhere or who a place is "for" (race, religion, family status, etc.). Describe places and amenities instead.
- Reviews: show only testimonials she supplied (`src/_data/testimonials.json`). Don't bulk-copy Zillow reviews; link them.
- Videos are YouTube embeds via `partials/youtube.njk`, with a cover photo of her (old videos show an outdated logo).

## Blog posts
- One file per post: `src/blog/posts/<slug>.md`. The slug becomes `/post/<slug>`; never rename an existing one (it breaks links).
- Front matter: `title`, `date` (YYYY-MM-DD), `description` (≤160 chars), `image`, `section`, `cities`.
- `section` is one of the slugs in `src/_data/blogSections.json`: city-guides, featured-listings, buying-selling,
  home-tips, market-insights. `cities` is a list, e.g. `["West Linn"]`; a new city gets its page automatically.
- Photos: put them in `src/assets/img/blog/` (resize to ≤1920px wide, JPEG/WebP) and reference them as `/assets/img/blog/<file>`.
  Older posts still hot-link static.wixstatic.com; those must be downloaded before Wix is cancelled.
- City-guide facts (restaurants, parks, events, dates) must be checked against a current source before publishing.

## Build, check, deploy
- Preview locally: `npm run preview` → http://localhost:8090 (serves like Netlify, applies `_redirects`).
- Check: `npm run check-links` (needs the preview server running); 0 broken is the bar.
- Deploy: `npm run deploy -- "what changed"`. It builds into a temp folder and uploads to the linked Netlify site
  (named ed-preview-lt0osb8c, but it IS the live elizabethdavidson.com since launch on 2026-10-30). It builds the real
  site. Never pass `--preview` here: that build is noindex and would drop her from Google.
- Domain: registered at GoDaddy, DNS in Netlify (zone elizabethdavidson.com, nameservers dns1-4.p06.nsone.net).
  Primary is www; the bare domain redirects. The zone holds her Google Workspace email records (DNS-RECORDS.md);
  never delete the MX/TXT records.
- Stylesheet URLs are cache-busted per build; don't add long cache headers to /assets/css.
- Bash writes into this folder can fail under the sandbox; use PowerShell or the Write/Edit tools.
