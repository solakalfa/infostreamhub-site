import type { Link } from "../types";

export const SITE = {
  title: "InfoStream Hub",
  description: "Your trusted source for financial insights and news",
  author: "InfoStream Hub Team",
  url: "https://infostreamhub.com",
  github: "https://github.com/infostreamhub",
  locale: "en-US",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 12,
};

export const NAVIGATION_LINKS: Link[] = [
  {
    href: "/about",
    text: "About",
  },
  {
    href: "/contact",
    text: "Contact",
  },
];

export const OTHER_LINKS: Link[] = [
  {
    href: "/privacy",
    text: "Privacy Policy",
  },
  {
    href: "/terms",
    text: "Terms of Service",
  },
];

export const SOCIAL_LINKS: Link[] = [
  {
    href: "https://twitter.com/infostreamhub",
    text: "Twitter",
    icon: "newTwitter",
  },
  {
    href: "https://www.facebook.com/infostreamhub",
    text: "Facebook",
    icon: "facebook",
  },
  {
    href: "https://linkedin.com/company/infostreamhub",
    text: "LinkedIn",
    icon: "linkedin",
  },
];