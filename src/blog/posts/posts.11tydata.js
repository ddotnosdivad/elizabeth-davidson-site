// Defaults for every blog post. A new post only needs title, date, description
// and (optionally) image + categories in its front matter.
export default {
  layout: 'layouts/post.njk',
  // Plain Markdown: a stray "{{" in post text must not be read as a template tag.
  templateEngineOverride: 'md',
  // Same URL shape as Wix (/post/<slug>), so no redirects are needed for posts.
  permalink: (data) => `/post/${data.page.fileSlug}.html`,
  eleventyComputed: {
    schemaPost: (data) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: data.title,
      datePublished: data.page.date.toISOString().slice(0, 10),
      image: data.image || undefined,
      author: { '@type': 'Person', name: 'Elizabeth Davidson', url: 'https://www.elizabethdavidson.com/about' },
      mainEntityOfPage: `https://www.elizabethdavidson.com/post/${data.page.fileSlug}`,
    }),
  },
};
