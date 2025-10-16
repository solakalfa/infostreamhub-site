import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getArticles(siteId: string) {
  return await sanityClient.fetch(
    `*[_type == "article" && siteId == $siteId] | order(publishedAt desc, _createdAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage {
        asset->{
          url
        },
        alt,
        caption
      },
      publishedAt,
      _createdAt,
      isMainHeadline,
      isSubHeadline,
      "author": author->name,
      categories[]->{ title, slug },
      readingTime
    }`,
    { siteId }
  );
}

export async function getArticle(slug: string, siteId: string) {
  return await sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug && siteId == $siteId][0] {
      _id,
      title,
      slug,
      body,
      content,
      excerpt,
      mainImage {
        asset->{
          url
        },
        alt,
        caption
      },
      publishedAt,
      isMainHeadline,
      isSubHeadline,
      "author": author->{name, image},
      categories[]->{ title, slug },
      readingTime,
      keywords
    }`,
    { slug, siteId }
  );
}

export const sanity = sanityClient;