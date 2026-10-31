# elizabethdavidson.com — Wix site inventory

Taken 2026-10-23 from the live site (built-in browser + raw HTML + Wix sitemaps).
Raw HTML for every page below is cached in `_scrape/` (gitignored).

**Size of the site:** 18 static pages, 119 blog posts, 10 blog categories,
34 old listing pages (`/properties/<address>`), plus Wix tag/profile pages.
Wix sitemap: `/sitemap.xml` → `pages-sitemap.xml`, `blog-posts-sitemap.xml`,
`blog-categories-sitemap.xml`, `dynamic-properties_…-sitemap.xml`.

## Look and feel

| Item | Wix value | Prototype |
|---|---|---|
| Navy | `#002349` (rgb 0,35,73 — Sotheby's blue) | same |
| Gold | `#C29B40` (rgb 194,155,64) | same |
| Slate button | `#617992` | same |
| Light band | `#DEDEDE` / grey | same |
| Script headings | custom uploaded brush font (`wfont_a25b39_…`, "orig_regular_brush") | **Kaushan Script** (Google Fonts) stand-in — see open questions |
| Body / nav | Avenir LT Light, Montserrat, Futura | Montserrat |
| Logo | `Elizabeth Davidson CHSIR Logo Lockup _ Horizontal _ SIR Blue + Gold _ 1000px.png` | `src/assets/img/logo-lockup.png` |

**Header (every page):** centered logo lockup, Facebook + Instagram icons and a Wix
**Log In** (members) button top-right, nav row underneath.
**Footer (every page):** "Get in Touch" contact form (Name, Email, Subject, Message),
email, stacked logo, "©2022 by Elizabeth Davidson, Real Estate Broker serving Portland, Oregon".

## Navigation (as on the live site)

Home · Luxury Outlook 2026 · About (▸ About Cascade Hasson Sotheby's) · Let's Work
Together (▸ Buying, Selling) · Featured Listings · Relocation Guide · Blog ·
Testimonials (anchor on home) · Vendors · More (▸ Join My Newsletter, FAQ, Client
Resources, Community Guides [external], Real Scout, Refer a Friend, Request a
Referral, What's Your Home Worth?)

## Pages

Legend for **Status**: ✅ built in prototype (all pages as of 2026-10-23) · ⬜ not rebuilt.

| Old URL | Title | What's on it | Forms / embeds | Status |
|---|---|---|---|---|
| `/` | Elizabeth Davidson, Real Estate Broker \| Lake Oswego Realtor \| Portland, Oregon, USA | Navy intro + Contact Me; Wix-hosted video (click to play); "Come Home to Portland, Oregon"; "What's Your Next Move?" (Buying / Selling / Relocating); "Set Up Your Home Search" → RealScout; Featured Listings; 10-slide testimonial slider; "Read More Testimonials" → Zillow / Facebook / Realtor.com | **Featured listings iframe** `elizabethdavidson.cascadehasson.com/Featured-Properties` (Cascade Hasson IDX page); Google Map widget; **Wix video** (`video.wixstatic.com/video/e2dd7e_dcdc80d9…`, 26 MB 720p mp4 downloaded); JSON-LD `RealEstateAgent` + `LocalBusiness` (custom head code) | ✅ |
| `/luxuryrealestate` | Luxury Outlook 2026 | One full-page embed, no text | **Issuu iframe** `issuu.com/cascadehassonsir.com/docs/luxury_lookbook` (brokerage's lookbook) | ✅ |
| `/about` | About | Split hero (photo + "Meet Elizabeth Davidson", NAR member, OR license #201101040); "Nobody moves without a reason." bio (8 paragraphs); Let's Chat | — | ✅ (Markdown: `src/about.md`) |
| `/the-sotheby-s-difference` | About Cascade Hasson Sotheby's | Brokerage pitch; stats (25 offices, $6B 2021 volume, $150K donated); selling + buying sections | — | ✅ |
| `/let-s-work-together` | Let's Work Together | Intro, Schedule Consultation (#contact), Buy / Sell cards | — | ✅ |
| `/buying` | Buying | "Buying a Home" photo hero; Start Your Search → `/homes-for-sale`; Find Your Perfect Neighborhood tiles (commute → Google Maps, schools → GreatSchools, area → AreaVibes) | — | ✅ |
| `/selling` | Selling | Hero; What's Your Home Worth? → `/home-value`; Preparing to Sell **(Wix video)**; Pricing Matters | Wix video | ✅ |
| `/properties` | Listings | "Featured Listings" + "See More Sold Listings" | Wix **CMS collection** "Properties" (34 items) + Cascade Hasson iframe | ✅ (iframe) |
| `/properties/<address>` ×34 | e.g. 53 Touchstone | Wix dynamic item: address, status, price, description, beds/baths/sqft/year, photo gallery, map | Wix CMS | ⬜ redirected to `/properties` for now |
| `/about-3` | Relocation Guide | "Portland & Lake Oswego Neighborhood Guide" intro + embedded guide | client-side embed (did not finish loading in the hidden browser pane — re-check) | ✅ |
| `/blog` | Blog | Wix Blog list, category menu, search | **Wix Blog app** | ✅ (paginated 12/page, `/blog/page/N`) |
| `/post/<slug>` ×119 | posts | Rich text, images, galleries, tags | Wix Blog | ✅ all 119 imported to Markdown |
| `/blog/categories/<slug>` ×10 | category lists | Holiday Guide, Oregon, Home Selling, General Portland, Home Buying, Family Guide, Lake Oswego, Home Tips, My Listings, Portland Community Guide | Wix Blog | ✅ (same URLs) |
| `/blog/tags/<tag>` | tag lists | many | Wix Blog | redirect → `/blog` |
| `/vendors` | Vendors | "Recommended Vendors" — ~30 vendors in ~25 trades, each with phone/site/"Go to" button and a stock photo | — | ✅ |
| `/newsletter` | Join My Newsletter | Signup: first, last, email | **Wix form** → Wix contacts/email marketing | ✅ |
| `/faq` | FAQ | Intro + 4 video Q&As (listing agent, prepping home, competitive buyer, buy+sell at once) | **4 Wix-hosted videos** | ✅ |
| `/file-share` | Client Resources | Wix **File Share** app (members only, behind the Log In) | Wix Members + File Share | ✅ |
| `/real-scout` | Real Scout | Full-page iframe | **RealScout** `elizabethdavidson.realscout.com` | ✅ |
| `/refer-a-friend` | Refer a Friend | "Your referrals are the heartbeat of my business!" | **Wix form**: your first/last/email/phone, friend's first/last/email/phone, dropdown | ✅ |
| `/copy-of-selling` | Request a Referral | "Moving Out of Portland?" + call 503-939-2035 | **Wix form**: first, last, email, phone, "Where are you moving to next?" | ✅ |
| `/home-value` | What's Your Home Worth? | "Find Your Home Value" | **Wix form**: name, email, address dropdown, phone, beds, baths, sq ft, recent updates, parking, notes | ✅ |
| *(external)* Community Guides | — | `elizabethdavidson.cascadehassonsir.com/Portland-Area` | brokerage site | link only |

## Images and media

- Wix media lives on `static.wixstatic.com/media/<id>`; the original file is that
  URL with nothing after the id. All images used by the 4 prototype pages are
  downloaded into `src/assets/img/`.
- **Blog images are still hot-linked to Wix** (`static.wixstatic.com`). Before the
  Wix plan is cancelled they must be downloaded and the Markdown re-pointed
  (one script pass; the importer already records every URL).
- Videos: home (1), selling (1), FAQ (4) are Wix-hosted. Only the home video is
  downloaded (26 MB, gitignored); the selling and FAQ pages in the prototype still
  stream straight from `video.wixstatic.com`, so they stop working when Wix is cancelled. Recommend moving all six to YouTube/Vimeo and
  embedding — smaller pages, and they become searchable.

## Wix-specific things that need a replacement

| Wix feature | Used for | Replacement |
|---|---|---|
| **Wix Forms** (contact footer, newsletter, refer-a-friend, request-a-referral, home-value) | lead capture | **Netlify Forms** — `data-netlify="true"` on plain HTML forms; submissions land in the Netlify dashboard and email Elizabeth. Free tier: 100 submissions/mo. Prototype has the footer contact form wired. |
| **Wix Blog** | 119 posts, categories, tags, search | Markdown files in `src/blog/posts/` (imported). Same `/post/<slug>` URLs. Tags kept in front matter but not given pages (redirect to /blog). No on-site search yet. |
| **Wix CMS "Properties" collection** | 34 listing pages | Decide the listings source (open question). Options: keep the Cascade Hasson iframe only; Markdown file per listing (Claude can write these from an MLS sheet); or the brokerage's IDX. |
| **Wix Members + Log In + File Share** (`/file-share`) | client document sharing | No static equivalent. Options: Google Drive / Dropbox shared folders linked per client, or the brokerage's transaction platform. Drop the Log In button. |
| **Wix email marketing / contacts** (newsletter) | newsletter list | Netlify Form → export, or embed Mailchimp / Flodesk / whatever Elizabeth sends with. **Export the existing Wix contact list before cancelling.** |
| **Wix video** | 6 videos | YouTube/Vimeo embeds |
| Wix SEO settings, custom head JSON-LD | schema | Ported to `src/_data/realEstateAgent.json` (see notes below) |
| Wix site search, Wix chat (if enabled) | — | not reproduced |

## Problems found on the live site (worth fixing in the rebuild)

1. **Instagram icon is a broken link** — it points to
   `https://www.elizabethdavidson.com/instagram.com/edavidsonpdxrealtor` (missing `https://`).
2. Buying page "Search All Homes" goes to `/homes-for-sale`, which **404s**.
3. Buying page "Check Your Commute" Google Maps link is centred on **Salt Lake City**
   (`@40.675,-111.845`) — a Wix template leftover.
4. JSON-LD conflicts: the custom `RealEstateAgent` block says (503) 939-2035 and
   97034; a second Wix-generated `LocalBusiness` block says **(503) 212-5014** and **97045**.
   The custom block also carries an `aggregateRating` (5.0 / 18) and reviews (e.g.
   "Michael S.") that **don't appear anywhere on the page** — Google treats that as
   self-serving review markup and can ignore or penalise it. The prototype keeps the
   agent block and drops the rating/reviews until real on-page reviews back them.
5. Footer copyright says **©2022**.
6. Vendors page: two "website" links are Outlook SafeLinks wrappers
   (`nam04.safelinks.protection.outlook.com/?url=…crystalann.ghanem%40cascadehasson.com…`)
   — they leak a staff email and break when the token expires. One "Go to" button
   points to octomaids.com under the Home IV Therapy listing.
7. The Sotheby's Difference page contradicts itself (22 vs 25 offices) and quotes 2021 sales.
8. Homepage typo "suite your desired lifestyle" (kept as-is in the prototype).
9. Vendors lists **Todd Davidson – UMortgage** as mortgage broker — fine for her
   site, but note it if the Move Genie independence rules ever link the two sites.
10. **Home value form has no address field** (Wix form asks beds/baths/sq ft but
    never the property address). The prototype adds a required "Property Address".
11. **Relocation Guide embed is blank** on the live site (an empty 1,552px-tall
    embed under the intro). The prototype shows the intro plus a button to the
    brokerage Community Guides until Elizabeth says what belongs there.
12. Vendors "Home IV Therapy" → its "Go to" button opens octomaids.com, not Zenia
    Wellness. Prototype links zeniaiv.com.
13. **FAQ videos are branded "The Hasson Company"**, the brokerage name before the
    2022 merger into Cascade Hasson Sotheby's. They play fine, but show the old name.
14. Blog categories: the importer (which walks each `/blog/categories/<slug>` page and
    its `/page/N` pages) found a category for only 35 of 119 posts. Either most posts
    are uncategorised on Wix or Wix only server-renders part of each list — **not yet
    verified**; check in the Wix dashboard before relying on category pages.

## Old URL → new URL map

Unchanged URLs need no redirect (Netlify serves `/about` from `about.html`), so
SEO carries over with zero hops for almost everything. Only these change — they
are in `src/_redirects`:

| Old (Wix) | New | Why |
|---|---|---|
| `/about-3` | `/relocation-guide` | Wix auto-slug |
| `/copy-of-selling` | `/request-a-referral` | Wix auto-slug |
| `/real-scout` | `/home-search` | clearer |
| `/file-share` | `/client-resources` | matches the menu label |
| `/homes-for-sale` | `/home-search` | was already a 404 |
| `/blog/tags/*`, `/blog/hashtags/*` | `/blog` | tag pages not rebuilt |
| `/profile/*` | `/about` | Wix member profile |
| `/blog-feed.xml` | `/feed.xml` | new RSS feed |
| `/properties/*` (34) | `/properties` | until listings source is decided |
| `/home`, `/index` | `/` | Wix aliases |

Kept identical: `/`, `/luxuryrealestate`, `/about`, `/the-sotheby-s-difference`,
`/let-s-work-together`, `/buying`, `/selling`, `/properties`, `/blog`,
`/blog/page/<n>`, `/blog/categories/<slug>`, `/post/<slug>` (all 119), `/vendors`,
`/newsletter`, `/faq`, `/refer-a-friend`, `/home-value`.
