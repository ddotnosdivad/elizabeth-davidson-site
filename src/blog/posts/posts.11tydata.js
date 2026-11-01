import { readFileSync } from 'node:fs';

const SITE = 'https://www.elizabethdavidson.com';
const sections = JSON.parse(readFileSync(new URL('../../_data/blogSections.json', import.meta.url), 'utf8'));
// Same slug rule as the 'slug' filter in eleventy.config.js, so breadcrumb URLs match the city pages.
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const day = (d) => (d instanceof Date ? d.toISOString() : String(d)).slice(0, 10);
const REGIONS = new Set(['Oregon Getaways', 'Willamette Valley']);
const abs =(u) => (/^https?:/.test(u) ? u : SITE + u);

// Defaults for every blog post. A new post only needs title, date, description
// and (optionally) image + categories in its front matter. A post rewritten in
// place (e.g. the monthly market report) keeps its date and sets `updated:`.
export default {
  layout: 'layouts/post.njk',
  // Plain Markdown: a stray "{{" in post text must not be read as a template tag.
  templateEngineOverride: 'md',
  // Same URL shape as Wix (/post/<slug>), so no redirects are needed for posts.
  permalink: (data) => `/post/${data.page.fileSlug}.html`,
  eleventyComputed: {
    schemaPost: (data) => {
      const url = `${SITE}/post/${data.page.fileSlug}`;
      const sec = sections.find((s) => s.slug === data.section);
      const cities = data.cities || [];
      const crumbs = [['Home', `${SITE}/`], ['Blog', `${SITE}/blog`]];
      if (sec) crumbs.push([sec.label, `${SITE}/blog/${sec.slug}`]);
      if (sec?.byCity && cities.length === 1) crumbs.push([cities[0], `${SITE}/blog/city-guides/${slug(cities[0])}`]);
      crumbs.push([data.title, url]);
      return {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            headline: data.title,
            description: data.description || undefined,
            datePublished: day(data.page.date),
            dateModified: day(data.updated || data.page.date),
            image: data.image ? abs(data.image) : undefined,
            author: {
              '@type': 'Person', name: 'Elizabeth Davidson', url: `${SITE}/about`,
              jobTitle: 'Real Estate Broker',
              worksFor: { '@type': 'RealEstateAgency', name: 'Cascade Hasson Sotheby’s International Realty', url: 'https://www.cascadehasson.com/' },
            },
            // The homepage's RealEstateAgent block carries the same @id.
            publisher: { '@type': 'RealEstateAgent', '@id': `${SITE}/#agent`, name: 'Elizabeth Davidson', url: `${SITE}/`, logo: `${SITE}/assets/img/logo-lockup.png` },
            // Some "cities" tags are regions ("Willamette Valley", "Oregon Getaways"), not cities.
            about: cities.length ? cities.map((c) => ({ '@type': REGIONS.has(c) ? 'Place' : 'City', name: c, containedInPlace: { '@type': 'State', name: 'Oregon' } })) : undefined,
            mainEntityOfPage: url,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
          },
        ],
      };
    },
  },
};
