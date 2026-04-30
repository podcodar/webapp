# Rules: Icon Componentization

> **Status:** Enforced | **Applies to:** All agents writing components  
> **Last updated:** 2026-04-30

---

## Rule 1: Never inline raw SVGs

Do **not** write `<svg>` elements directly in `.astro`, `.tsx`, or `.ts` files.  
All icons must be rendered through the project's icon systems (see Rule 2 and 3).

**Violation:**

```astro
<!-- ❌ Inline SVG — delete this -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2">
  <path d="M20 6 9 17l-5-5" />
</svg>
```

**Correction:**

```astro
<!-- ✅ astro-icon -->
<Icon name="lucide:check" class="w-5 h-5" />
```

**Exception:** The `<LcIcon>` component (`src/components/donations/lucide-icon.tsx`)  
uses a _single_ centralized `<svg>` wrapper. This is the **only** place raw `<svg>`  
elements are allowed for icon rendering.

---

## Rule 2: Astro components → use `astro-icon`

In any `.astro` file, import and use the `Icon` component from `astro-icon`:

```astro
---
import { Icon } from 'astro-icon/components';
---

<Icon name="lucide:gift" class="w-5 h-5" />
<Icon name="simple-icons:github" class="w-6 h-6" />
```

### Available icon sets

| Prefix          | Package                      | Example usage         |
| --------------- | ---------------------------- | --------------------- |
| `lucide:`       | `@iconify-json/lucide`       | `lucide:check`        |
| `simple-icons:` | `@iconify-json/simple-icons` | `simple-icons:github` |

Both packages are listed in `package.json`. Do **not** install additional  
iconify packages without explicit approval.

### Styling

- Use **Tailwind classes** (`class="w-5 h-5 text-primary"`), not inline `width`/`height` props.
- Override `stroke-width` via the prop: `<Icon name="lucide:check" stroke-width={2.5} />`.
- Always include `aria-hidden="true"` for decorative icons (the default).

---

## Rule 3: SolidJS components → use `<LcIcon>`

In `.tsx` files using SolidJS (e.g., `DonationWidget.tsx`), import from  
`src/components/donations/icons.tsx` — **never** import `LcIcon` directly:

```tsx
// ✅ Correct — use named exports from icons.tsx
import { CheckIcon, GiftIcon, SparklesIcon } from "./icons";

// ❌ Wrong — bypasses the named exports
import { LcIcon } from "./lucide-icon";
```

### Available named exports (`icons.tsx`)

| Export         | Underlying icon             | Default size   |
| -------------- | --------------------------- | -------------- |
| `CheckIcon`    | `lucide:check`              | 16×16          |
| `ClockIcon`    | `lucide:clock`              | 24×24          |
| `CoinIcon`     | `lucide:circle-dollar-sign` | 18×18          |
| `CopyIcon`     | `lucide:copy`               | 16×16          |
| `ErrorIcon`    | `lucide:circle-x`           | 16×16          |
| `GiftIcon`     | `lucide:gift`               | 20×20          |
| `HeartIcon`    | `lucide:heart`              | 24×24 (filled) |
| `LockIcon`     | `lucide:lock`               | 14×14          |
| `SparklesIcon` | `lucide:sparkles`           | 24×24 (filled) |

These thin wrappers live in `src/components/donations/icons.tsx` and delegate to  
`<LcIcon>` from `src/components/donations/lucide-icon.tsx`.

### Adding a new icon

1. Open `src/components/donations/lucide-icon.tsx`.
2. Add the icon name to the `LcIconName` union type.
3. Extract its SVG `body` from `node_modules/@iconify-json/lucide/icons.json`  
   and add it to the `ICON_BODIES` lookup.
4. Create a named export in `src/components/donations/icons.tsx` following the  
   existing pattern.
5. Update the table above in this document.

```tsx
// Step 1: add to type
export type LcIconName = "gift" | /* ... */ | "my-new-icon";

// Step 2: add body
const ICON_BODIES: Record<LcIconName, string> = {
  // ...
  "my-new-icon": `<g fill="none" stroke="currentColor" ...>...</g>`,
};

// Step 4: add named export in icons.tsx
export function MyNewIcon(props: { class?: string }) {
  return <LcIcon name="my-new-icon" width={24} height={24} class={props.class} />;
}
```

---

## Rule 4: Unicode symbols → use icons

Do not use raw Unicode symbols for UI decoration. Replace them with the  
appropriate `astro-icon` `<Icon>`:

| Instead of | Use                                                  |
| ---------- | ---------------------------------------------------- |
| `✓`        | `<Icon name="lucide:check" class="w-5 h-5" />`       |
| `✗` `✘`    | `<Icon name="lucide:x" class="w-5 h-5" />`           |
| `→` `➔`    | `<Icon name="lucide:arrow-right" class="w-5 h-5" />` |
| `⬤` `●`    | `<Icon name="lucide:circle" class="w-3 h-3" />`      |
| `★` `☆`    | `<Icon name="lucide:star" class="w-5 h-5" />`        |
| `♥` `❤`    | `<Icon name="lucide:heart" class="w-5 h-5" />`       |

---

## Architecture

```
                    ┌─────────────────────┐
                    │    Astro (.astro)    │
                    │                     │
                    │  <Icon name="..." />│ ← astro-icon looks up
                    │                     │    @iconify-json/lucide
                    └─────────────────────┘    or simple-icons at build time

                    ┌─────────────────────┐
                    │   SolidJS (.tsx)     │
                    │                     │
                    │  <GiftIcon />       │ ← imports from ./icons
                    │  <HeartIcon />      │
                    │     │               │
                    │     ▼               │
                    │  <LcIcon name="gift"/>│ ← SVG bodies extracted
                    │                     │    from @iconify-json/lucide
                    │  lucide-icon.tsx    │    at build time (tree-shaken)
                    └─────────────────────┘
```

- **No runtime iconify library** is loaded on the client.
- **SolidJS**: Only the 10 icon bodies we use are bundled (~2 KB gzipped).
- **Astro**: Icons are inlined at build time by `astro-icon` with zero client cost.

---

## Enforcement

- **Linting:** Run `bun run lint` to catch raw `<svg>` violations if a lint rule  
  is added in the future.
- **Code review:** Any PR introducing inline `<svg>` elements outside  
  `lucide-icon.tsx` must be rejected.
- **TypeScript:** The `LcIconName` union type prevents typos in icon names  
  in SolidJS components.
