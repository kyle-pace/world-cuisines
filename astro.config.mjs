// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// World cuisine became finDish's Explore section on 2026-11-26. This Worker is still
// mounted on kylepace.dev/world-cuisine by the routes in wrangler.jsonc, and its one
// route (src/pages/world-cuisine/[...path].ts) forwards every address to
// findish.now/explore/. The explorer's pages and data at the repo root are the source
// finDish copies (npm run sync-explore there); nothing here serves them any more.
export default defineConfig({
  site: 'https://kylepace.dev',
  session: false,
  adapter: cloudflare({ imageService: 'compile' }),
});
