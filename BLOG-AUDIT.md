# Blog audit: what to fix so Google indexes more posts

Reviewed 11/1/2026: all 119 posts in `src/blog/posts/`. This is a report only; no post has been changed.

## The short version

Google skips most of these posts for three reasons:

1. **Nothing links to them.** No post links to another post (0 of 119), and the post page has no "related posts" box. The only way to reach most posts is to page back through the blog list, so Google treats them as unimportant.
2. **Many posts say the same thing.** About 45 posts fall into a dozen topic groups: six posts on Lake Oswego neighborhoods, eight on getting a home ready to sell, four on listing photos. When several posts compete for the same search, Google usually indexes one and skips the rest.
3. **Many posts are generic.** Recipes, party ideas and holiday activities aren't about real estate or the Portland area, and millions of sites already cover them, so Google has no reason to index a realtor's version.

Fix #1 once for the whole site, merge the duplicate groups, and retire the off-topic posts. You'd end up with about 60–70 strong posts, which will index better than 119 weak ones.

---

## 1. Site-wide fixes (one change each, all free)

| Fix | Why | Size |
|---|---|---|
| Add a "More about [city]" / related-posts box to the post page | Gives every post several links pointing in. Biggest single gain. | 1 template change |
| Add 2–3 links in each post's text to related posts and city pages | Same reason; Google reads in-text links most strongly | Done as posts are edited |
| Fill in photo descriptions (alt text) | 63 posts have photos with none | Can be scripted |
| Remove emoji from titles | 9 titles start with 🏡 or ☀️; it wastes title space and looks spammy in Google results | 9 edits |
| Turn bold lines into real headings | 39 posts use bold text as headings (225 lines), so Google can't see the post's structure | Can be scripted |
| Shorten titles to about 60 characters, with the city and topic first | Google cuts off long titles; "Fun", "Ultimate" and "Extravaganza" crowd out the search words | See section 5 |
| Cite sources for facts | Only 10 posts link to anything outside the site | Done as posts are edited |

## 2. Retire: off-topic, no local angle (14 posts)

Suggest deleting these and redirecting each address to the blog section that fits best, so nothing breaks.

- Best Weeknight Recipes for Busy Families
- Kid-Friendly Holiday Recipes: A Real Estate Agent's Secret Sauce
- Hi Party People! How to Throw the Ultimate Cinco de Mayo Party
- How to Host a Kentucky Derby Party at Your House
- Make Mom's Day! Fun Ways to Celebrate Mother's Day
- Celebrating Father's Day in Style
- How to Host a Fun Memorial Day BBQ
- Creating Cherished Thanksgiving Memories: Fun Family Activities
- Organize Like a Pro: Fun and Fabulous Home Organization Tips
- Luxury Living and the ABCs of Back-to-School Survival (2023)
- Staycation Sensation: Turning Your Home into a Vacation Hotspot
- Keep Your Home Cool, Without Blowing Your Budget
- Navigating the Holidays: A Real Estate Agent's Guide to Surviving the Festive Season
- Unmasking the Magic of Real Estate Agents

## 3. Merge: combine each group into one strong post

Keep the best post in each group (marked ★), fold the best parts of the others into it, and redirect the others' addresses to it.

**Lake Oswego neighborhoods / living there**
- ★ Living in Lake Oswego: A Guide to Luxury Real Estate & Lifestyle (2026)
- Unveiling the Splendor: A Guide to Lake Oswego's Prestigious Neighborhoods (2023)
- Lake Oswego Living: A Guide to the Enchanting Neighborhoods (2023)
- Why Living in Lake Oswego is Like Winning the Neighborhood Jackpot (2024)
- Why Lake Oswego Continues to Be One of Oregon's Most Coveted Zip Codes (2026)

**Portland neighborhoods / relocating**
- ★ Relocating to Portland: A Luxury Buyer's Guide (2026)
- Exploring Portland's Most Exclusive Neighborhoods for Luxury Living (2023)
- Relocating to Portland: The Coolest Neighborhoods (2024)
- Beyond Portland: The Hottest Neighborhoods for Your Next Move (2024)
- The Most Desirable Luxury Neighborhoods in Portland & Lake Oswego (2025): keep only if refocused on comparing the two cities

**Listing photos**
- ★ Why Summer Photos Can Give Your Winter Home Sale a Major Advantage (2026)
- Lights, Camera, Sell (2024) · Snap That Perfect Shot (2024) · Selling in the Fall or Winter? Take Photos NOW! (2025)

**Getting a home ready to sell**: merge 8 posts into 2, one general and one luxury
- ★ How to Sell a Luxury Home in Portland for Top Dollar (2026)
- ★ Summer Selling Tips for Maximum Value in the Greater Portland Area (2026); rename it so it isn't tied to one season
- Fold in: Mastering the Art of Home Selling (2023) · First-Time Home Sellers (2025) · Selling This Summer? (2025) · Fall Into Prep (2025) · Selling Your Portland Home This Autumn (2024) · The Ultimate Prep Guide: Luxury Home Market-Ready (2025)

**Buying**: merge 5 posts into 2
- ★ Welcome to the Adventure of Buying Your First Home (2025), renamed
- ★ Luxury Real Estate Buying Guide for Portland (2023), updated
- Fold in: Ultimate Fun Guide to Buying Luxury Real Estate (2023) · Navigating the Home Buying Process (2023) · Your Guide to Finding the Perfect Family Home (2023)

**Improvements that add value**
- ★ Luxury Renovations That Increase Home Value in Portland & Lake Oswego (2026)
- Fold in: The ROI Dream Team (2025) · 7 Fun & Simple Ways to Boost Your Home's Value (2025) · Revitalize Your Home (2024) · What Adds the Most Value to Your Backyard? (2025) · Curb Appeal (2024)

**Portland architecture**
- ★ From Craftsman to Contemporary: The Most Popular Home Styles in Portland (2025)
- Portland's Architectural Wonderland (2024) · Architectural Masterpieces by Portland's Top Architects (2026)

**Portland summer**
- ★ Best Things To Do in & Around Portland during Summer (2026)
- Summer in Portland: Outdoor Adventures (2025) · Best Family Activities for Portland Summers (2026)

**Skiing**
- ★ Skiing Near Portland: The Best Slopes (2025) · fold in Skiing in Oregon (2023)

**Market trends** (dated): merge into one market page and update it every quarter with real local sales numbers (median price, days on market, inventory)
- Exploring the Flourishing Real Estate Market in Portland (2023) · Let's Get Ready: Hot Real Estate Trends for 2024 · Elevating Real Estate: Design Trends for 2024 · 2025 Real Estate Forecast · Inside Today's Luxury Buyer 2025 · Luxury Market Update (2026) · Housing Trends: In and Out (2026) · Is Now the Right Time to Sell Your Luxury Property? (2026)

## 4. Keep and refresh: local, specific, worth the work

These are about real places people search for, so they're the best candidates, but they're out of date:

- **Restaurant lists**: Best Restaurants in Lake Oswego (2023), Brunch Spots in Lake Oswego (2023), Lake Oswego Family-Friendly Restaurants (2023), Best Restaurants in Willamette Valley (2023), Oregon's Best Clam Chowder Spots (2024). Check that every place is still open before anything else; some on the 2023 lists may have closed. Add addresses, then show the updated date.
- **Yearly events**: Christmas tree lightings (Lake Oswego and Portland), Thanksgiving meals (Lake Oswego and Portland), Halloween in Portland, Things to Do in Portland on New Year's Day, Fall in Lake Oswego, Fourth of July. Update dates each year, about a month ahead; Google rewards a page that's current when people search.
- **Paddle Boarding and Kayaking in Lake Oswego**: local and specific (but see the lake-access question in section 6).
- **Listing posts (14)**: keep them, since people search for street addresses. When a home sells, change the post to "Sold" and add a link to her current listings instead of deleting it.

## 5. Title rewrites: examples

| Now | Suggested |
|---|---|
| Lakeside Dining Delights: The Best Restaurants in Lake Oswego, Oregon | Best Restaurants in Lake Oswego, Oregon |
| Family Fun Extravaganza: Unmissable Activities in Portland, Oregon! | Things to Do in Portland with Kids |
| Brunch Bliss: Exploring the Best Brunch Spots in Lake Oswego, Oregon | Best Brunch in Lake Oswego |
| Chowder Cheer: Savoring the Sea in Oregon's Best Clam Spots! | Best Clam Chowder on the Oregon Coast |
| Spring Activities in Portland: 6 Ways to Sprout Some Fun! | Spring Things to Do in Portland |
| Boo-tiful Adventures: Halloween in Portland, Oregon! | Halloween Events in Portland, Oregon |
| Wine, Wonders, and Whimsy: Exploring Real Estate in Willamette Valley! | Buying a Home in Oregon's Willamette Valley |
| 🏡 Winning in Real Estate: How I Negotiate the Best Deals for You | How I Negotiate for Buyers and Sellers in Portland |
| ☀️ Selling This Summer? Here's How to Get Your Home Hot Market Ready… | (merged; see section 3) |
| Discover The Aurora | [street address], Aurora, OR: Just Listed |

The web address stays the same when only the title changes, so retitling doesn't need a redirect.

## 6. Questions for Todd before editing

**DECIDED 11/1 (Todd): leave the lake-access and "family" wording in the existing posts as is. Questions 1 and 2 are closed, and the existing posts keep that wording.**

1. **Oswego Lake access.** The Facebook content rules for Elizabeth say lake access and ownership are never mentioned. Six blog posts talk about it: Lakefront Living (Oswego Lake Explained), Why Lake Oswego Continues to Be… Coveted, The Most Desirable Luxury Neighborhoods, Private Schools, Parks, Trails & Amenities, Is Now the Right Time to Sell, and Behind the Scenes Working With a High-End Realtor. Does that rule apply to her blog too? If it does, those passages come out, and the Lakefront Living post would mostly go.
2. **"Family" wording.** Her Facebook rules ban "family-friendly" and who-it-suits wording under fair housing rules. Several blog titles use it, such as "Family Bonds: Lake Oswego's Top Family-Friendly Restaurants" and "Your Guide to Finding the Perfect Family Home", and one listing post does too. Apply the same rule to the blog?
3. **The new Monday blog posts.** The weekly content-bank posts (`/post/<city>-<topic>`) will cover the same subjects as several old posts, like Lake Oswego neighborhoods and parks. Whenever a new post covers an old one's topic, redirect the old one to the new one, so her own posts don't compete with each other.
