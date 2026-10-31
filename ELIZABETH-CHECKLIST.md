# Website move: what we need from Elizabeth

Preview of the new site: https://ed-preview-lt0osb8c.netlify.app
Nothing changes on elizabethdavidson.com until everything below is done.

## What we already know (checked 2026-10-29 from public records)

- **Email is Google Workspace (Gmail)**, answered by Todd and confirmed by the domain's
  public records: mail goes to Google (`smtp.google.com`), with Google SPF and DKIM
  signing records.
- **The domain is registered at GoDaddy**, not Wix (registered 2003, paid through
  **Aug 14, 2027**). GoDaddy only points to Wix: the domain's DNS records (web,
  email, Google verification) are kept in Wix (`ns14/ns15.wixdns.net`).
- So cancelling Wix would take the **email records** with it. Before Wix is cancelled,
  the DNS must move somewhere else (Netlify DNS or GoDaddy's own), with the Google
  email records copied over exactly.

## 1. Questions to answer

| # | Question | Why it matters |
|---|---|---|
| 1 | ~~Where should form messages go?~~ **Answered: her inbox only, `elizabeth@elizabethdavidson.com`.** Set as the Netlify form notification address at launch. | |
| 2 | ~~Which phone number?~~ **Answered: 503-939-2035 only.** It's the only number the new site shows; 503-212-5014 came from Wix's built-in business info and goes away with Wix. The site uses ZIP 97034, which matches her office at 310 N. State St, Lake Oswego (97045 is Oregon City). Worth checking her Google Business Profile, Zillow and Realtor.com show 503-939-2035 too. | |
| 3 | ~~How does your email work?~~ **Answered: Gmail / Google Workspace.** Who is the Google Workspace admin (her, Todd, or the brokerage)? | Needed only if something goes wrong with email on launch day. |
| 4 | **Featured listings: keep showing the Cascade Hasson listings box** (it updates itself), **or should each new listing get its own page on your site?** | Own pages help Google find you. Claude can make one from the listing sheet in a few minutes. |
| 5 | **Your 34 old listing pages** (mostly sold): bring them back as "Sold" pages, or let them point to Featured Listings? | |
| 6 | **Client Resources / Log In:** do clients actually use the file area on your site? If yes, would a shared Google Drive or Dropbox folder per client work instead? | The new site can't have log-ins. |
| 7 | **Newsletter:** what do you send it with today (Wix, Mailchimp, Flodesk, the brokerage)? Do you want to keep sending one? | Decides where sign-ups go. |
| 8 | **Videos:** OK to put your 6 website videos on a YouTube (or Vimeo) channel so the site can play them? | They're stored on Wix today. |
| 9 | **FAQ videos say "The Hasson Company"** (the old brokerage name). Keep them, or re-record or drop them? | |
| 10 | **Relocation Guide page:** the guide on the current page shows up blank. What should be there? (Today: a short intro plus a link to the brokerage's community guides.) | |
| 11 | **Vendors list:** anyone to add, remove or update? | Easy to change now. |
| 12 | **Reviews:** can we show more of your real Zillow/Google reviews on the site? | Lets Google show your star rating. Today's site claims 18 reviews it doesn't actually show. |
| 13 | **Anything you want changed** now that you've seen the preview (photos, wording, pages you never use)? | |
| 14 | **Brokerage sign-off:** does Cascade Hasson Sotheby's need to approve agent websites or changes to them? | Avoids a surprise after launch. |

## 2. Things to download from Wix BEFORE it's cancelled

Wix deletes these when the plan ends, so save copies first.

- [ ] **Contact list / newsletter subscribers** (Wix dashboard → Contacts → Export to CSV)
- [ ] **Past form submissions** you want to keep (Wix → Forms & Submissions → export)
- [ ] **Files in Client Resources** (Wix → File Share → download each folder)
- [ ] **Blog photos and videos.** Claude can copy these automatically; no action needed, just don't cancel before we say so.
- [ ] **The brush font** used for headings, if you or a designer have the file (we're using a close match now).

## 3. Access we'll need on launch day

- [ ] **GoDaddy login**: the domain is registered there, and that's where it gets pointed at the new site. Who has this login? It was registered in 2003, so it may be under an old email address.
- [x] **Wix login**: Todd has it (2026-10-29). Used to read off the full DNS record list and do the exports in section 2.
- [ ] **Google Workspace admin login**: just in case email needs a check after the switch.
- Nobody needs a password typed into anything; Elizabeth or Todd logs in and clicks.
- [ ] Decide whose **Netlify account** holds the site: Todd's (like The Move Genie) or a new one in your name.

## 4. Launch order (for Todd)

1. Answers above + Wix exports saved.
2. Copy blog images and videos off Wix; final build without the preview "hide from Google" setting.
3. Copy every DNS record Wix holds, then set up DNS at its new home (recommended:
   Netlify DNS) with **MX `smtp.google.com`, the SPF and `google-site-verification` TXT records, and the
   `google._domainkey` DKIM record** copied exactly. Point the website records at Netlify.
4. At **GoDaddy**, change the nameservers from Wix to the new DNS. This is the actual switch.
5. Check email still sends and receives, forms deliver, the site loads on both
   `elizabethdavidson.com` and `www`, then submit the sitemap to Google.
6. Cancel the Wix plan a week or two later. The domain itself stays at GoDaddy and isn't affected.
