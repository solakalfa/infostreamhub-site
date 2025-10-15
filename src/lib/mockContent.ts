import { SITE } from "./config";

export async function getEntry(collection: string, id: string) {
  // Mock entry for views collection
  if (collection === "views") {
    return {
      id,
      collection: "views",
      data: {
        title: id === "home" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1),
        description: SITE.description || "Your trusted source for financial insights and news"
      }
    };
  }
  
  return null;
}