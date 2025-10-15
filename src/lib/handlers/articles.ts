import { getArticles } from '../sanity';

const siteId = import.meta.env.PUBLIC_SITE_ID;
let articlesCollection: any[] = [];

try {
  articlesCollection = await getArticles(siteId);
} catch (error) {
  console.error('Failed to fetch articles from Sanity:', error);
  articlesCollection = [];
}

export const articlesHandler = {
  allArticles: () => articlesCollection,
  
  mainHeadline: () => {
    const article = articlesCollection.find(
      (article) => article.isMainHeadline === true
    );
    
    if (!article) {
      // Return first article as fallback
      return articlesCollection[0] || null;
    }
    
    return article;
  },
  
  subHeadlines: () => {
    const mainHeadline = articlesHandler.mainHeadline();
    const subHeadlines = articlesCollection
      .filter(
        (article) =>
          article.isSubHeadline === true &&
          mainHeadline?.slug?.current !== article.slug?.current
      )
      .slice(0, 4);
    
    if (subHeadlines.length === 0) {
      // Return first 4 articles as fallback
      return articlesCollection.slice(0, 4);
    }
    
    return subHeadlines;
  },
};