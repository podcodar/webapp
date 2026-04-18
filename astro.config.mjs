import { fileURLToPath } from 'node:url';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://podcodar.org',
	adapter: cloudflare(),
	output: 'server',

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
		icon({
			include: {
				'simple-icons': ['github', 'linkedin', 'instagram', 'youtube', 'x', 'discord'],
			},
		}),
	],

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	},

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
});
