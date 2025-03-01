export const MAX_COOKIE_AGE = 2147483647;

export const SITEMAP_URL = "https://podcodar.fly.dev/sitemap.xml";

export const SITEMAP_URLS = [
  {
    loc: "https://podcodar.fly.dev/",
    lastmod: "2024-12-26T09:10:00-03:00",
    priority: 1.0,
  },
  {
    loc: "https://podcodar.fly.dev/team/",
    lastmod: "2024-12-26T09:10:00-03:00",
    priority: 1.0,
  },
];

export const ADMIN_ROUTES = {
  // auth
  signOut: "/admin/auth/logout",
  refresh: "/admin/auth/refresh",
  callback: "/admin/auth/callback",
  // pages
  signIn: "/admin/login",
  dashboard: "/admin/dashboard",
  members: "/admin/members",
  testimonials: "/admin/testimonials",
} as const;

const VALID_PERSONAL_EMAILS = [
  "ma.souza.junior@gmail.com",
  "pfrattezi@gmail.com",
] as const;

export const VALID_EMAILS = [
  // all emails ending with @podcodar.org
  new RegExp(/@podcodar\.org$/),
  // personal emails
  new RegExp(`(${VALID_PERSONAL_EMAILS.join("|")})$`),
];
