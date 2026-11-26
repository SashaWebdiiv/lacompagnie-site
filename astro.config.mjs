// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://lacompagnie.net',
  // Les adresses WordPress finissent par « / » (/cours/, /contact/…) : on garde exactement les mêmes.
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Le site reste statique ; seule /api/contact/ tourne à la demande (fonction Vercel) pour envoyer les messages.
  output: 'static',
  adapter: vercel(),
  // Plan du site (sitemap-index.xml) à déclarer dans Google Search Console.
  integrations: [sitemap({ filter: (page) => !page.includes('/api/') })],
});
