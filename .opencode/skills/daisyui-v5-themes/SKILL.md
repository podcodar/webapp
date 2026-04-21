# DaisyUI v5 Custom Theme Configuration

Creating custom themes in DaisyUI v5 (2026 best practices).

## Overview

DaisyUI v5 uses a new `@plugin` syntax for defining custom themes with OKLCH color format for better perceptual uniformity.

## Important: Verify Brand Assets First!

⚠️ **Always check actual brand assets (logos, mascots, brand guidelines) before defining colors.**

Don't assume colors based on industry stereotypes (e.g., "tech company = blue"). Extract colors from:
- Logo files (check for fill attributes or visual colors)
- Brand mascot images
- Existing brand guidelines
- Official website colors

**Example:** PodCodar is a tech community, but their llama mascot is **purple/violet**, not blue!

## Syntax

```css
@import "tailwindcss";

/* Disable default themes */
@plugin "daisyui" {
  themes: false;
}

/* Define custom theme */
@plugin "daisyui/theme" {
  name: "my-theme";
  default: true;
  prefersdark: false;
  color-scheme: light;
  
  /* Colors */
  --color-base-100: oklch(98% 0.005 260);
  --color-base-200: oklch(96% 0.01 260);
  --color-base-300: oklch(90% 0.015 260);
  --color-base-content: oklch(20% 0.02 260);
  
  --color-primary: oklch(55% 0.18 250);
  --color-primary-content: oklch(98% 0.005 260);
  
  --color-secondary: oklch(70% 0.15 70);
  --color-secondary-content: oklch(20% 0.02 70);
  
  --color-accent: oklch(65% 0.18 195);
  --color-accent-content: oklch(98% 0.005 260);
  
  --color-neutral: oklch(40% 0.03 260);
  --color-neutral-content: oklch(98% 0.005 260);
  
  --color-info: oklch(70% 0.15 240);
  --color-info-content: oklch(20% 0.02 240);
  
  --color-success: oklch(65% 0.15 145);
  --color-success-content: oklch(98% 0.005 145);
  
  --color-warning: oklch(75% 0.15 85);
  --color-warning-content: oklch(20% 0.02 85);
  
  --color-error: oklch(60% 0.18 25);
  --color-error-content: oklch(98% 0.005 25);
  
  /* Design tokens */
  --radius-selector: 0.5rem;
  --radius-field: 0.375rem;
  --radius-box: 0.75rem;
  
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  
  --border: 1px;
  --depth: 1;
  --noise: 0;
}
```

## Key Concepts

### Color Format: OKLCH

OKLCH is preferred over hex/RGB for:
- Better perceptual uniformity
- Easier to adjust lightness without changing perceived hue
- Consistent contrast ratios across color wheel

Format: `oklch(L% C H)` where:
- L = Lightness (0-100%)
- C = Chroma (0-0.4 typical range)
- H = Hue (0-360 degrees)

### Theme Properties

| Property | Description |
|----------|-------------|
| `name` | Theme identifier (kebab-case) |
| `default` | Set as default theme |
| `prefersdark` | Auto-activate on `prefers-color-scheme: dark` |
| `color-scheme` | Browser UI color (light/dark) |

### Color Variables

**Base Layers (Backgrounds)**
- `--color-base-100`: Main background
- `--color-base-200`: Secondary background (cards, hover)
- `--color-base-300`: Tertiary background (borders, dividers)
- `--color-base-content`: Primary text color

**Semantic Colors**
- `--color-primary`: Main brand color (buttons, links)
- `--color-secondary`: Complementary accent
- `--color-accent`: Highlight/CTA color
- `--color-neutral`: Grayscale base

**Status Colors**
- `--color-info`: Informational states
- `--color-success`: Success states
- `--color-warning`: Warning states
- `--color-error`: Error states

Each semantic/status color has a `-content` variant for text/icons on that background.

### Design Tokens

| Token | Description |
|-------|-------------|
| `--radius-selector` | Checkboxes, toggles, badges |
| `--radius-field` | Buttons, inputs, tabs |
| `--radius-box` | Cards, modals, alerts |
| `--size-selector` | Checkbox/toggle base size |
| `--size-field` | Button/input base size |
| `--border` | Global border width |
| `--depth` | 3D depth effect (0-1) |
| `--noise` | Noise texture overlay (0-1) |

## Best Practices

1. **Disable default themes** when using custom themes (`themes: false`)
2. **Define both light and dark variants** for complete coverage
3. **Use consistent hue families** across base layers (e.g., all blue-tinted)
4. **Ensure contrast ratios** meet WCAG AA (4.5:1 for text)
5. **Test with real components** using the DaisyUI theme generator
6. **Keep chroma low** for base layers (0.005-0.03) to avoid color casts
7. **Higher chroma** for primary/accent colors (0.15-0.25) for vibrancy

## Dark Mode Pattern

```css
/* Light theme (default) */
@plugin "daisyui/theme" {
  name: "my-light";
  default: true;
  prefersdark: false;
  color-scheme: light;
  /* ... */
}

/* Dark theme (auto-switch) */
@plugin "daisyui/theme" {
  name: "my-dark";
  default: false;
  prefersdark: true;
  color-scheme: dark;
  /* Reverse base layers, adjust for dark */
  --color-base-100: oklch(18% 0.02 260);
  --color-base-200: oklch(23% 0.025 260);
  --color-base-300: oklch(30% 0.03 260);
  --color-base-content: oklch(95% 0.015 260);
  /* Brighter primaries for dark mode */
  --color-primary: oklch(70% 0.15 250);
  /* ... */
}
```

## Theme Generator Tool

Use https://daisyui.com/theme-generator/ to:
- Visually design themes
- Export OKLCH values
- Preview component variants
- Copy-paste ready CSS

## References

- [DaisyUI Themes Docs](https://daisyui.com/docs/themes/)
- [DaisyUI Theme Generator](https://daisyui.com/theme-generator/)
- [OKLCH Color Picker](https://oklch.com/)
