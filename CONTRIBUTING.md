# Contributing

This project is built with [Astro](https://astro.build/). Below is the usual Astro blog-template orientation and command reference.

## Project structure

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Astro treats files under `src/pages/` as routes (`.astro`, `.md`, etc.).

`src/components/` holds Astro (and optional framework) components.

`src/content/` holds content collections—for example blog posts under `src/content/blog/`. Use `getCollection()` to query them and optional schemas to type-check frontmatter. See [Content collections](https://docs.astro.build/en/guides/content-collections/).

Static assets such as images can go in `public/` or be imported from `src/assets/` as needed.

## Styling (Tailwind CSS + daisyUI)

This matches the open-source app at [podcodar/webapp](https://github.com/podcodar/webapp): **Tailwind CSS v4** via [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/framework-guides/astro) and **daisyUI** (`@import "tailwindcss";` + `@plugin "daisyui";` in [`src/styles/global.css`](src/styles/global.css)).

Semantic colors (`primary`, `secondary`, `accent`, `base-*`, etc.) come from daisyUI’s default light/dark themes—the same OKLCH tokens as [podcodar.org](https://podcodar.org). The document theme follows system preference (`prefers-color-scheme`) or a stored `localStorage` key `podcodar-theme` (`light` / `dark`) set from an inline script in [`BaseHead.astro`](src/components/BaseHead.astro).

For a quick visual check, open [`/design-system`](src/pages/design-system.astro) after `bun dev`.

## Commands

Run these from the repository root:

| Command | Action |
| :------ | :----- |
| `bun install` | Install dependencies |
| `bun dev` | Start dev server at `localhost:4321` |
| `bun run build` | Production build to `./dist/` |
| `bun run preview` | Preview the production build locally |
| `bun astro ...` | Astro CLI (`astro add`, `astro check`, etc.) |
| `bun astro -- --help` | Astro CLI help |

## Learn more

- [Astro documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)

## Credit

This starter theme is based on [Bear Blog](https://github.com/HermanMartinus/bearblog/).
