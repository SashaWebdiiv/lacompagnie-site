// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lacompagnie.net',
  // Les adresses WordPress finissent par « / » (/cours/, /contact/…) : on garde exactement les mêmes.
  trailingSlash: 'always',
  build: { format: 'directory' },
});
