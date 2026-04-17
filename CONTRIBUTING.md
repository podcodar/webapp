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
