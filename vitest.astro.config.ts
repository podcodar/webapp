import { defineConfig } from 'astro/config';
import base from './astro.config';

// Cloudflare's Vite plugin rejects Vitest's SSR `resolve.external`; tests use Node instead.
const { adapter: _adapter, ...withoutAdapter } = base;

export default defineConfig(withoutAdapter);
