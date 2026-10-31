# elizabethdavidson.com (static rebuild — prototype)

A static rebuild of Elizabeth Davidson's Wix site with [Eleventy](https://www.11ty.dev/),
hosted on Netlify. **Live at https://www.elizabethdavidson.com since 2026-10-30.**
DNS is in Netlify; the domain is registered at GoDaddy. See DNS-RECORDS.md for the email records.

- `INVENTORY.md` — every page on the Wix site, its forms/embeds, what's Wix-only,
  bugs found, and the old → new URL map.
- `OPEN-QUESTIONS.md` — decisions needed before this goes live.
- `screenshots/` — the prototype pages as rendered locally.

## Run it

```bash
npm install
npm run build              # writes _site/
node scripts/serve.mjs     # http://localhost:8090 — serves /about from about.html and applies _redirects, like Netlify
```

## Deploying

This folder is linked to its own Netlify site (`.netlify/state.json`, site
`ed-preview-lt0osb8c`), separate from themovegenie.com. There's no hand-kept deploy
folder: the source in `src/` is built into a fresh temporary folder each time, and
only that gets uploaded.

```bash
npm run deploy -- "what changed"            # the live site (launched 2026-10-30)
```

## Adding content (the point of the rebuild)

**A blog post** is one Markdown file in `src/blog/posts/`. The file name becomes the
URL: `src/blog/posts/fall-market-update.md` → `/post/fall-market-update`.

```markdown
---
title: "Fall Market Update: Lake Oswego"
date: 2026-10-23
description: "One or two sentences for Google and the blog card."
image: "/assets/img/blog/fall-market.jpg"
section: city-guides
cities: ["Lake Oswego"]
---
Write the post here in Markdown. ## Subheadings, **bold**, [links](/buying), ![photo](/assets/img/blog/x.jpg)
```

`section` is one of the slugs in `src/_data/blogSections.json`: `city-guides`,
`featured-listings`, `buying-selling`, `home-tips`, `market-insights`. Add a section
there and it appears on the blog page and gets `/blog/<slug>` automatically.
`cities` is free text. A new city gets its own `/blog/city-guides/<city>` page and a
tile on the blog page as soon as one City Guides post names it. Listing posts name
their city too, so they show under "Homes I've Listed in <city>" on that page. Post layout, author line, read time, schema and the contact CTA
come from `src/blog/posts/posts.11tydata.js` + `src/_includes/layouts/post.njk`.

**A text page** (like About) is a `.md` file in `src/` with front matter and a
`layout`; see `src/about.md`. Pages with designed sections (Home, Buying) are
`.njk` files.

**Site-wide details** — phone, email, license, social links, nav menu, review
links, RealScout and listings URLs — live in `src/_data/site.json`.
Testimonials are in `src/_data/testimonials.json`.

**Forms** use Netlify Forms: any `<form data-netlify="true" name="...">` in the built
HTML is picked up at deploy. See `src/_includes/partials/contact-form.njk`.

## Layout

```
src/
  _data/          site.json, testimonials.json, realEstateAgent.json (schema)
  _includes/      layouts/ (base, about, post), partials/ (contact form, blog bits), icons/
  assets/         css/site.css, img/, video/ (gitignored)
  blog/           index.njk (paginated), categories.njk, posts/*.md (119 imported)
  index.njk  about.md  buying.njk  properties.njk  thank-you.njk  404.njk
  feed.xml (feed.njk)  sitemap.xml (sitemap.njk)  _redirects
scripts/
  import-wix-blog.mjs   one-time Wix → Markdown importer (caches raw HTML in _scrape/)
  serve.mjs             Netlify-like local preview server
```
