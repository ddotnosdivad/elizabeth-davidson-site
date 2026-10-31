# Open questions before go-live

For Todd and Elizabeth. Nothing below has been acted on.
Todd's answers (2026-10-23) are marked **Answered**; Elizabeth is answering the rest.

1. **Domain registrar and DNS.** *Answered 2026-10-29 by public lookup (RDAP + DNS), correcting
   Todd's guess of Wix:* registrar is **GoDaddy** (registered 2003-08-14, expires
   2027-08-14). Nameservers are **Wix** (`ns14/ns15.wixdns.net`), so Wix hosts the DNS
   zone. Email is **Google Workspace** (Todd: Gmail; MX `10 smtp.google.com`, SPF
   `v=spf1 include:_spf.google.com -all`, DKIM at `google._domainkey`, plus a
   `google-site-verification` TXT).
   - Cancelling Wix drops the DNS zone and with it her email. Move DNS first: recreate the
     zone (Netlify DNS recommended) with the Google records copied exactly, then change
     the nameservers at GoDaddy. Needs the GoDaddy login.

2. **Sotheby's / Cascade Hasson brand rules.** *Answered (Todd): replicate the site
   as is; it's already compliant.* The prototype keeps the same logo lockup, brokerage
   name, license number and layout. The one visible difference is the heading font:
   the Wix site uses a brush font uploaded to Wix, and the prototype uses Kaushan
   Script (Google Fonts) as a near match. To be exact, get that font file and its
   licence from whoever designed the logo/site.

3. **Where do listings come from?** *Open — Todd is finding out.* Today: a Cascade Hasson iframe
   (`elizabethdavidson.cascadehasson.com/Featured-Properties`) plus a Wix CMS
   collection of 34 hand-entered listing pages. Options:
   a) iframe only (zero upkeep, no SEO value);
   b) one Markdown file per listing that Claude writes from the MLS sheet (good SEO,
      ~minutes per listing, needs MLS/brokerage photo rights confirmed);
   c) the brokerage's IDX/feed if they offer one for agent sites.
   Same question for the 34 old `/properties/<address>` pages — rebuild as "Sold"
   pages, or keep redirecting them to `/properties`?

4. **Client Resources (Wix File Share + member Log In).** Is anyone actually using
   it? If yes, what replaces it (shared Google Drive/Dropbox folders, brokerage
   platform)? Before cancelling Wix, download every file in it.

5. **Newsletter.** What sends the newsletter today — Wix Email Marketing? Export
   the contact list. Going forward: Netlify Form collecting signups, or embed
   Mailchimp/Flodesk/etc.

6. **Form notifications.** *Answered (Todd, 2026-10-29): her inbox only,
   elizabeth@elizabethdavidson.com.* (Netlify free tier: 100 submissions/month, spam
   filtering included.)

7. **Videos.** Six Wix-hosted videos (home, selling, 4 FAQ). OK to upload them to
   a YouTube (or Vimeo) channel for embedding?

8. **Review markup.** The current site's schema claims a 5.0 rating from 18 reviews
   that aren't shown on the page. Keep it off (prototype), or show real reviews on
   the page and mark those up?

9. **Phone number.** *Answered (Todd, 2026-10-29): 503-939-2035 only.* Already the only
   number on the new site and in its schema. ZIP 97034 is kept: it matches the 310 N. State St,
   Lake Oswego office.

10. **Netlify account.** Same Netlify team as themovegenie.com, or a separate
    account owned by Elizabeth? (Affects billing and who can see form submissions.)
