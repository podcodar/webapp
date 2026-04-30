// https://astro.build/config
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  site: process.env.BASE_URL,
  adapter: cloudflare({ prerenderEnvironment: 'node' }),

  i18n: {
    locales: ['pt-br'],
    defaultLocale: 'pt-br',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    icon({
      include: {
        'simple-icons': ['github', 'linkedin', 'instagram', 'youtube', 'x', 'discord'],
        lucide: ['*'],
      },
    }),
  ],

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
});
