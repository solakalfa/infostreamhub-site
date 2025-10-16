import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: 'zh12zogr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

const articles = await sanity.fetch(`*[_type == "article" && siteId == "infostreamhub"]{
  title,
  slug,
  "hasImage": defined(mainImage)
} | order(_createdAt desc)[0...10]`);

console.log(JSON.stringify(articles, null, 2));
