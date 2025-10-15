import { authorsHandler } from "@/lib/handlers/authors";
import { SITE } from "@/lib/config";
import defaultImage from "@/assets/images/default-image.jpg";
import type { ArticleMeta, Meta } from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils/letter";
import { normalizeDate } from "@/lib/utils/date";

const renderCache = new Map<string, any>();

// Simple mock for Sanity articles
export const getMeta = async (
  entry: any,
  category?: string
): Promise<Meta | ArticleMeta> => {
  try {
    // For home page or views
    if (!entry || entry.data) {
      const meta: Meta = {
        title: entry?.data?.title ? `${capitalizeFirstLetter(entry.data.title)} - ${SITE.title}` : SITE.title,
        metaTitle: entry?.data?.title ? capitalizeFirstLetter(entry.data.title) : SITE.title,
        description: entry?.data?.description || SITE.description || "Your trusted source for financial insights",
        ogImage: defaultImage.src,
        ogImageAlt: SITE.title,
        type: "website",
      };
      return meta;
    }

    // For articles from Sanity
    const meta: ArticleMeta = {
      title: `${capitalizeFirstLetter(entry.title)} - ${SITE.title}`,
      metaTitle: capitalizeFirstLetter(entry.title),
      description: entry.excerpt || entry.description || "",
      ogImage: entry.mainImage || defaultImage.src,
      ogImageAlt: entry.title,
      publishedTime: normalizeDate(entry.publishedAt),
      lastModified: entry.publishedAt,
      authors: entry.author ? [{ name: entry.author, link: "#" }] : [],
      type: "article",
    };

    return meta;
  } catch (error) {
    console.error(`Error generating metadata:`, error);
    
    // Return default meta on error
    return {
      title: SITE.title,
      metaTitle: SITE.title,
      description: SITE.description || "Your trusted source for financial insights",
      ogImage: defaultImage.src,
      ogImageAlt: SITE.title,
      type: "website",
    };
  }
};