import { getArticles } from '../sanity';

const siteId = import.meta.env.PUBLIC_SITE_ID;

export const articlesHandler = {
  allArticles: async () => {
    return await getArticles(siteId);
  },
  
  mainHeadline: async () => {
    const articles = await getArticles(siteId);
    const article = articles.find((a) => a.isMainHeadline === true);
    return article || articles[0] || null;
  },
  
  subHeadlines: async () => {
    const articles = await getArticles(siteId);
    const mainHeadline = await articlesHandler.mainHeadline();
    const subHeadlines = articles
      .filter((a) => a.isSubHeadline === true && mainHeadline?.slug?.current !== a.slug?.current)
      .slice(0, 4);
    return subHeadlines.length > 0 ? subHeadlines : articles.slice(0, 4);
  },
};