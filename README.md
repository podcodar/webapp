# Welcome to PodCodar WebApp

This WebApp is the main project of [PodCodar](https://github.com/podcodar), a learning community about programming and technology.

- 📖 [Astro documentation](https://docs.astro.build)
- 🧑‍💻 [PodCodar Engineering docs](https://podcodar.github.io/webapp)

## Features

- ⚡ Static site generation with [Astro](https://astro.build/)
- 📝 Markdown and MDX for pages and blog posts
- 📚 Content collections with typed frontmatter
- 🗺️ Sitemap and RSS feed
- 🔒 TypeScript by default
- 🎨 Minimal, customizable styling

## Quick start

```sh
bun install
bun dev
```

The dev server runs at [http://localhost:4321](http://localhost:4321).

For project layout, CLI commands, and how we work on this repo, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Production

Build the site:

```sh
bun run build
```

Output is written to `./dist/`. Preview the production build locally:

```sh
bun run preview
```

Deploy the contents of `dist/` to any static host (GitHub Pages, Netlify, Cloudflare Pages, etc.).
