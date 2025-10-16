import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: 'zh12zogr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

const article = await sanity.fetch(`*[_type == "article" && siteId == "infostreamhub"][0]{
  title,
  slug,
  mainImage {
    asset->{url}
  }
}`);

console.log(JSON.stringify(article, null, 2));
