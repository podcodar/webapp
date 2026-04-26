# AGENTS.md - PodCodar WebApp Agent Guide

> This document provides essential context for AI agents working on the PodCodar WebApp project.

## Quick Links

- [Shared Context](./docs/podcodar.md) - Project overview and domain knowledge
- [Contributing Guide](./CONTRIBUTING.md) - Development workflow
- [README](./README.md) - Project introduction

---

## OpenCode Setup

This project uses [OpenCode](https://opencode.ai) for AI-assisted development with squad-based workflows.

### Configuration

- **Config Directory**: `.opencode/`
- **Agents**: Defined in `.opencode/agent/*.md`
- **Skills**: Reusable knowledge in `.opencode/skills/`
- **Learnings**: Captured in `.opencode/learnings/registry.md`

### Available Skills

| Skill                 | Purpose                                        | Location                                        |
| --------------------- | ---------------------------------------------- | ----------------------------------------------- |
| `astro-i18n`          | Astro internationalization with locale routing | `.opencode/skills/astro-i18n/SKILL.md`          |
| `continuous-learning` | Capture and organize learnings after diamonds  | `.opencode/skills/continuous-learning/SKILL.md` |
| `daisyui-v5-themes`   | Custom DaisyUI v5 theme configuration          | `.opencode/skills/daisyui-v5-themes/SKILL.md`   |
| `tmux-automation`     | Detached tmux session management               | `.opencode/skills/tmux-automation/SKILL.md`     |

To use a skill: Load it via the `skill` tool with the skill name.

---

## Maestro Setup

This project uses **Maestro** with the **AI Diamond Chain** workflow defined in `maestro.yaml`.

### Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI DIAMOND CHAIN                                 │
│                                                                     │
│  Discovery Diamond (n)     →     Implementation Diamond (n)         │
│  ┌──────────────────┐           ┌──────────────────┐                │
│  │  DIVERGE         │           │  DIVERGE         │                │
│  │ • Research       │           │ • Architecture   │                │
│  │ • UX Design      │──────────▶│ • Prototyping    │──────┐         │
│  │ • Architecture   │           │ • Risk analysis  │      │         │
│  └──────────────────┘           └──────────────────┘      │         │
│         │                              │                  │         │
│  ┌──────────────────┐           ┌──────────────────┐      │         │
│  │  CONVERGE        │           │  CONVERGE        │      │         │
│  │ • Problem def    │           │ • Solution built │      │         │
│  │ • Scope commit   │──────────▶│ • Quality verify │──────┤         │
│  │ • Go/No-go       │           │ • Ship/Fix       │      │         │
│  └──────────────────┘           └──────────────────┘      │         │
└────────────────────────────────┬──────────────────────┬───┴─────────┘
                                 │                      │
                    ┌────────────┴──────────────────────┘             │
                    ↓                                                 │
         ┌──────────────────┐                                         │
         │  LEARN & FEED    │─────────────────────────────────────────┘
         │ • Analytics      │
         │ • User feedback  │
         │ • Tech learnings │
         └──────────────────┘
```

### Configuration File

See [`maestro.yaml`](./maestro.yaml) for the complete workflow definition including:

- Agent role mappings
- Diamond phase configurations
- Decision gate criteria
- Learning loop settings

---

## Agent Roles

This squad uses 9 specialized agents:

| Agent                 | Phase     | Purpose                                             | File                                   |
| --------------------- | --------- | --------------------------------------------------- | -------------------------------------- |
| **maestro**           | All       | Primary orchestrator, coordinates the diamond chain | `.opencode/agent/maestro.md`           |
| **architect**         | Discovery | Technical feasibility, system design, tradeoffs     | `.opencode/agent/architect.md`         |
| **researcher**        | Discovery | Documentation lookup, prior art, API research       | `.opencode/agent/researcher.md`        |
| **ux-designer**       | Discovery | User flows, interaction patterns, accessibility     | `.opencode/agent/ux-designer.md`       |
| **frontend-engineer** | Build     | UI components, client-side functionality            | `.opencode/agent/frontend-engineer.md` |
| **backend-engineer**  | Build     | Business logic, APIs, data processing               | `.opencode/agent/backend-engineer.md`  |
| **devops-sre**        | Build     | CI/CD, infrastructure, build tooling                | `.opencode/agent/devops-sre.md`        |
| **qa-engineer**       | Quality   | Automated tests, linting, integration checks        | `.opencode/agent/qa-engineer.md`       |
| **code-reviewer**     | Quality   | API validation, standards compliance                | `.opencode/agent/code-reviewer.md`     |

### Agent Modes

- **Primary** (`maestro`): Orchestrates, delegates, never writes code
- **Subagent**: Executes tasks delegated by Maestro
  - **Read-only** (`researcher`, `architect`, `ux-designer`, `code-reviewer`): Research and report only
  - **Write** (`frontend-engineer`, `backend-engineer`, `devops-sre`, `qa-engineer`): Can modify code

---

## Tech Stack

### Core Framework

| Technology                               | Version | Purpose                   |
| ---------------------------------------- | ------- | ------------------------- |
| [Astro](https://astro.build)             | v6.1.8  | Static site generation    |
| [TypeScript](https://typescriptlang.org) | v6.0.3  | Type-safe JavaScript      |
| [Bun](https://bun.sh)                    | latest  | Package manager & runtime |

### Styling

| Technology                              | Version | Purpose                                               |
| --------------------------------------- | ------- | ----------------------------------------------------- |
| [Tailwind CSS](https://tailwindcss.com) | v4.2.2  | Utility-first CSS                                     |
| [DaisyUI](https://daisyui.com)          | v5.5.19 | Component library                                     |
| Custom themes                           | -       | PodCodar brand colors (purple/violet based on mascot) |

**Theme Configuration**: `src/styles/global.css`

- Light theme: `podcodar-light` (default)
- Dark theme: `podcodar-dark` (auto-switch on prefers-color-scheme)
- Colors based on llama mascot: purple/violet primary, lavender secondary

### Integrations

| Integration           | Purpose                           |
| --------------------- | --------------------------------- |
| `@astrojs/cloudflare` | Cloudflare adapter for deployment |
| `@astrojs/mdx`        | Markdown/MDX content support      |
| `@astrojs/rss`        | RSS feed generation               |
| `@astrojs/sitemap`    | Sitemap generation                |
| `astro-icon`          | Icon system (Simple Icons)        |

### Tooling

| Tool                                                 | Purpose              | Config                 |
| ---------------------------------------------------- | -------------------- | ---------------------- |
| [Biome](https://biomejs.dev)                         | Linting & formatting | `biome.json`           |
| [Vitest](https://vitest.dev)                         | Unit testing         | `vitest.config.ts`     |
| [Playwright](https://playwright.dev)                 | E2E testing          | `playwright.config.ts` |
| [Lefthook](https://github.com/evilmartians/lefthook) | Git hooks            | `lefthook.yml`         |

### Infrastructure

| Tool                                                  | Purpose                |
| ----------------------------------------------------- | ---------------------- |
| [Pulumi](https://pulumi.com)                          | Infrastructure as Code |
| [Cloudflare](https://cloudflare.com)                  | Hosting & CDN          |
| [GitHub Actions](https://github.com/features/actions) | CI/CD                  |

### Internationalization

- **Current**: Portuguese (pt-br) only
- **Configured in**: `astro.config.ts`
- **Skill available**: `astro-i18n` for adding English support
- Default locale does not use URL prefix (`prefixDefaultLocale: false`)
- **Convention**: ALL user-visible text in `.astro` templates must go through the i18n system (`t()`). Hardcoded strings are not allowed. See the `astro-i18n` skill for the full rule.
- **How**: Import `useTranslations` from `@/i18n/utils`, call `t('key')`. Add keys to `src/i18n/ui.ts` under the relevant page namespace (e.g., `about.hero.title`).

---

## Development Commands

```bash
# Install dependencies
bun install

# Development server
bun dev              # http://localhost:4321

# Build & preview
bun run build        # Production build to ./dist/
bun run preview      # Preview production build

# Quality checks
bun run lint         # Biome linting
bun run lint:fix     # Fix linting issues
bun run format       # Format code
bun run typecheck    # Astro type checking
bun run test         # Unit tests (Vitest)
bun run e2e          # E2E tests (Playwright)

# Infrastructure
bun run w            # Wrangler CLI
bun run w:build      # Build + Wrangler build
```

---

## CI/CD Workflows

| Workflow | Trigger          | Purpose                               | File                                   |
| -------- | ---------------- | ------------------------------------- | -------------------------------------- |
| Quality  | PR, push to main | Lint, format, typecheck, build        | `.github/workflows/quality.yml`        |
| Deploy   | push to main     | Deploy to Cloudflare (dev)            | `.github/workflows/deploy.yml`         |
| Release  | tag (v*.*.\*)    | Deploy to production + GitHub release | `.github/workflows/release.yml`        |
| E2E      | manual           | Playwright E2E tests                  | `.github/workflows/playwright-e2e.yml` |

---

## Project Structure

```
├── .opencode/          # Agent configuration
│   ├── agent/          # Agent role definitions
│   ├── skills/         # Reusable skills
│   └── learnings/      # Learning registry
├── .github/workflows/  # CI/CD pipelines
├── src/
│   ├── assets/         # Static assets (fonts, images)
│   ├── components/     # Astro components
│   ├── content/        # Content collections (blog)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global CSS
├── infra/              # Pulumi infrastructure code
├── docs/               # Project documentation
│   └── podcodar.md     # Shared context (see below)
├── astro.config.ts     # Astro configuration
├── biome.json          # Biome configuration
├── maestro.yaml        # Maestro workflow config
├── mise.toml           # Mise environment config
└── package.json        # Dependencies & scripts
```

---

## Shared Context

:page_with_curl: **[docs/podcodar.md](./docs/podcodar.md)** - Essential reading for all agents

This document contains:

- Project mission and values
- Target audience
- Site structure and features
- Brand guidelines (colors, typography, mascot)
- Content strategy
- Development conventions

**All agents should read this before starting work.**

---

## Environment Setup

### Prerequisites

- [Bun](https://bun.sh) (latest)
- [Node.js](https://nodejs.org) >=22.12.0 (see `.node-version`)
- [Mise](https://mise.jdx.dev) (optional, for environment management)

### Environment Variables

Encrypted secrets stored in `.env.gpg`. To decrypt:

```bash
mise run decrypt  # or: gpg -d .env.gpg > .env
```

Required for deployment (Cloudflare/Pulumi credentials).

---

## Key Files for Agents

| File                              | Why It Matters                        |
| --------------------------------- | ------------------------------------- |
| `maestro.yaml`                    | Defines the AI Diamond Chain workflow |
| `docs/podcodar.md`                | Shared project context                |
| `src/styles/global.css`           | Brand colors and design tokens        |
| `astro.config.ts`                 | Site configuration, i18n settings     |
| `biome.json`                      | Code style and linting rules          |
| `.opencode/learnings/registry.md` | Captured learnings from past work     |

---

## Decision Gates

All work goes through explicit decision gates:

### Discovery Gate (human approval required)

- **GO**: Proceed to implementation
- **NO-GO**: Cancel objective
- **REFINE**: More research needed

### Implementation Gate (auto-triggers Learn & Feed)

- **SHIP**: Deploy the solution
- **NO-SHIP**: Critical issues, do not deploy
- **FIX**: Address issues and retry (max 3 retries)

---

_For questions about agent workflows, see the [Maestro documentation](./maestro.yaml)._
