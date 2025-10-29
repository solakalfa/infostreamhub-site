import { getArticles } from '../sanity';

const siteId = import.meta.env.PUBLIC_SITE_ID;

// Helper: Convert title object to string
const getTitle = (titleObj: any): string => {
  if (typeof titleObj === 'string') return titleObj;
  return titleObj?.en || titleObj?.he || Object.values(titleObj)[0] || 'Untitled';
};

export const articlesHandler = {
  allArticles: async () => {
    const articles = await getArticles(siteId);
    return articles.map(a => ({ ...a, title: getTitle(a.title) }));
  },
  
  mainHeadline: async () => {
    const articles = await getArticles(siteId);
    const article = articles.find((a) => a.isMainHeadline === true);
    const mainArticle = article || articles[0] || null;
    if (mainArticle) {
      return { ...mainArticle, title: getTitle(mainArticle.title) };
    }
    return null;
  },
  
  subHeadlines: async () => {
    const articles = await getArticles(siteId);
    const mainHeadline = await articlesHandler.mainHeadline();
    const subHeadlines = articles
      .filter((a) => a.isSubHeadline === true && mainHeadline?.slug?.current !== a.slug?.current)
      .slice(0, 4);
    const finalSubHeadlines = subHeadlines.length > 0 ? subHeadlines : articles.slice(0, 4);
    return finalSubHeadlines.map(a => ({ ...a, title: getTitle(a.title) }));
  },
};