// Every address under kylepace.dev/world-cuisine/ forwards to the same place on
// finDish, where World cuisine has been the Explore section since 2026-11-26.
// A 301 (moved for good), so search engines and shared links follow it. The part of an
// address after "#" never reaches a server; browsers carry it across the redirect
// themselves, so /world-cuisine/#thai-cuisine still opens Thai cuisine on the globe.
import type { APIRoute } from 'astro';
import { forward } from '../../lib/forward.mjs';

export const prerender = false;

export const ALL: APIRoute = ({ url }) =>
  new Response(null, {
    status: 301,
    headers: { Location: forward(url.pathname, url.search), 'Cache-Control': 'public, max-age=3600' },
  });
