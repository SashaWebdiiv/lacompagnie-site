import type { APIRoute } from "astro";

/** robots.txt : tout est indexable, et le plan du site est déclaré pour Google. */
export const GET: APIRoute = ({ site }) => {
  const plan = new URL("sitemap-index.xml", site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${plan}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
