// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lacompagnie.net',
  // Les adresses WordPress finissent par « / » (/cours/, /contact/…) : on garde exactement les mêmes.
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Plan du site (sitemap-index.xml) à déclarer dans Google Search Console.
  integrations: [sitemap()],
});
