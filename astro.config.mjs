import { defineConfig } from 'astro/config';

// En GitHub Pages el sitio vive en /laschicago/; en local, en la raíz.
export default defineConfig({
  site: 'https://carryerickmx.github.io',
  base: process.env.BASE_PATH ?? '/',
  devToolbar: { enabled: false },
});
