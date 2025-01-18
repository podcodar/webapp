import { SITEMAP_URL } from "@packages/contants";

const ROBOT_CONTENT = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: ${SITEMAP_URL}
`;

export function loader() {
  return new Response(ROBOT_CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
