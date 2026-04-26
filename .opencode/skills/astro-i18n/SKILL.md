---
name: astro-i18n
description: Astro internationalization with built-in i18n routing, locale detection, and cookie-based language persistence
license: MIT
compatibility: opencode
---

# Astro i18n Implementation Guide

> **Prerequisites**: Astro v6+ with built-in i18n routing

## Quick Start

### 1. Configure astro.config.mjs

```js
i18n: {
  locales: ['pt-br', 'en'],
  defaultLocale: 'pt-br',
  routing: {
    prefixDefaultLocale: false,
  }
}
```

### 2. Create Translation Files

```
src/i18n/ui.ts    # Translation strings
src/i18n/utils.ts # Helper functions
```

### 3. Organize Pages

```
src/pages/
├── index.astro        # default locale (pt-br)
├── about.astro        # default locale (pt-br)
├── contact.astro     # default locale (pt-br)
├── blog/index.astro  # default locale (pt-br)
└── en/
    ├── index.astro   # English
    ├── about.astro  # English
    └── ...
```

---

## Core Concepts

### Locale Detection Priority

1. **Cookie** (user selected) - highest priority
2. **Browser Accept-Language header** - middleware (SSR required)
3. **Default locale** - fallback

### URL Structure

| prefixDefaultLocale | default locale URL | other locale URL |
| ------------------- | ------------------ | ---------------- |
| false               | `/`                | `/en/`           |
| true                | `/pt-br/`          | `/en/`           |

---

## File Reference

### src/i18n/ui.ts

```typescript
export const languages = {
  en: "English",
  "pt-br": "Português (Brasil)",
} as const;

export const defaultLang = "pt-br";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "footer.copyright": "All rights reserved.",
  },
  "pt-br": {
    "nav.home": "Início",
    "nav.blog": "Blog",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "footer.copyright": "Todos os direitos reservados.",
  },
} as const;
```

### src/i18n/utils.ts

```typescript
import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL): keyof typeof ui {
  const segments = url.pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && firstSegment in ui) {
    return firstSegment as keyof typeof ui;
  }
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
```

---

## Header with Translations

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n';
import { getLangFromUrl, useTranslations } from '../i18n/utils';
import HeaderLink from './HeaderLink.astro';
import LanguagePicker from './LanguagePicker.astro';
import Logo from './Logo.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---
<header>
  <nav>
    <Logo size="md" showTitle />
    <div>
      <HeaderLink href={getRelativeLocaleUrl(lang, '/')}>
        {t('nav.home')}
      </HeaderLink>
      <HeaderLink href={getRelativeLocaleUrl(lang, '/blog')}>
        {t('nav.blog')}
      </HeaderLink>
      <HeaderLink href={getRelativeLocaleUrl(lang, '/about')}>
        {t('nav.about')}
      </HeaderLink>
    </div>
    <LanguagePicker />
  </nav>
</header>
```

---

## Language Picker with Cookie Persistence

### src/components/LanguagePicker.astro

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n';
import { languages } from '../i18n/ui';
import { getLangFromUrl } from '../i18n/utils';

const currentLang = getLangFromUrl(Astro.url);
const pathname = Astro.url.pathname;

function getPathWithoutLocale(path, lang) {
  const prefix = `/${lang}`;
  if (path.startsWith(prefix)) {
    return path.slice(prefix.length) || '/';
  }
  return path;
}

const currentPath = getPathWithoutLocale(pathname, currentLang);
---

<div class="dropdown dropdown-end">
  <button tabindex="0" class="btn btn-ghost btn-sm" aria-label="Select language">
    {languages[currentLang]}
  </button>
  <ul class="dropdown-content menu z-50 mt-2 w-52 rounded-box bg-base-200 p-2 shadow">
    {Object.entries(languages).map(([lang, label]) => (
      <li>
        <a
          href={getRelativeLocaleUrl(lang, currentPath)}
          class:list={{ active: lang === currentLang }}
          data-lang={lang}
        >
          {label}
        </a>
      </li>
    ))}
  </ul>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const lang = (e.target as HTMLElement).dataset.lang;
        if (lang) {
          const expires = new Date();
          expires.setFullYear(expires.getFullYear() + 1);
          document.cookie = `lang=${lang};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
        }
      });
    });
  });
</script>
```

---

## Text Convention (MANDATORY)

ALL user-visible text in `.astro` files MUST use the i18n system. Hardcoded
strings in templates are forbidden.

### Correct

```astro
---
import { getLangFromUrl, useTranslations } from '@/i18n/utils';
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---
<HeroSection title={t('about.hero.title')} eyebrow={t('about.hero.eyebrow')} />
<SectionHeader title={t('contact.methods.title')} subtitle={t('contact.methods.subtitle')} />
<p>{t('contributing.donations.body')}</p>
```

### Wrong

```astro
<HeroSection title="Sobre nós" eyebrow="PodCodar" />
<SectionHeader title="Canais de Comunicação" subtitle="Escolha o canal..." />
<p>Se quiser contribuir financeiramente...</p>
```

### Exception

Data-driven content from `src/data/*.ts` files (board member names, metric
values, channel names, project names) is iterable data, not display strings.
These may be used directly:

```astro
<!-- OK — iterated from marketing.ts data -->
{projects.map((project) => <h3>{project.name}</h3>)}

<!-- NOT OK — hardcoded section header -->
<h2>Projetos e repositórios</h2>
<!-- Should be: -->
<h2>{t('about.projects.title')}</h2>
```

### Adding New Keys

When adding a new key to `src/i18n/ui.ts`, follow the namespace pattern:

```
{page}.{section}.{field}
```

Examples:

- `about.hero.eyebrow` — About page, hero section, eyebrow badge
- `joinUs.steps.01.title` — Join Us page, steps section, step 1 title
- `contributing.volunteering.body` — Contributing page, volunteering section, body text

---

## Common Pitfalls

### 1. Hardcoded lang Attribute

**WRONG**:

```html
<html lang="en"></html>
```

**CORRECT**:

```astro
---
import { getLangFromUrl } from '../i18n/utils';
const lang = getLangFromUrl(Astro.url);
---
<html lang={lang}>
```

### 2. Static Links Without getRelativeLocaleUrl

**WRONG**:

```html
<a href="/about"></a>
```

**CORRECT**:

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n';
const lang = getLangFromUrl(Astro.url);
---
<a href={getRelativeLocaleUrl(lang, '/about')}>
```

### 3. Wrong Default Locale

**WRONG** (default must be explicitly set):

```js
locales: ['en', 'pt-br'],
defaultLocale: 'en',
```

**CORRECT**:

```js
locales: ['pt-br', 'en'],
defaultLocale: 'pt-br',
```

---

## Testing Checklist

- [ ] Root page (`/`) has correct `lang` attribute
- [ ] `/en/` has correct `lang` attribute
- [ ] Navigation links use `getRelativeLocaleUrl()`
- [ ] Language picker shows current language as active
- [ ] Clicking language link sets cookie and navigates correctly

---

## Build Output Example

```
✓ /index.html              # pt-br (default)
✓ /about/index.html        # pt-br
✓ /contact/index.html    # pt-br
✓ /blog/index.html      # pt-br
✓ /en/index.html       # en
✓ /en/about/index.html  # en
✓ /en/contact/index.html
✓ /en/blog/index.html  # en
```

---

## When Server-Side Redirect is Needed

For server-side redirect based on browser language, add SSR adapter:

1. Install `@astrojs/node`
2. Set `output: 'server'`
3. Create `src/middleware.ts` for server-side detection

For static sites, client-side cookie persistence works well.

---

## Related Files Created

```
src/
├── i18n/
│   ├── ui.ts
│   └── utils.ts
├── pages/
│   ├── index.astro      # pt-br (default)
│   ├── about.astro      # pt-br (default)
│   ├── contact.astro   # pt-br (default)
│   ├── blog/
│   │   └── index.astro
│   └── en/
│       ├── index.astro
│       ├── about.astro
│       ├── contact.astro
│       └── blog/
│           └── index.astro
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   └── LanguagePicker.astro
└── layouts/
    └── BlogPost.astro
```
