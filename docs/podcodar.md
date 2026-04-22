# PodCodar WebApp - Shared Context

> **Purpose**: This document provides essential context about PodCodar for all AI agents. Read this before starting any work.

---

## What is PodCodar?

**PodCodar** is a Brazilian learning community focused on programming and technology. We help people learn to code through mentorship, collaborative projects, and a supportive community.

### Mission

Empower Brazilians to start and grow their careers in technology through accessible, community-driven learning.

### Values

- **Collaboration**: Learning together is more effective than learning alone
- **Accessibility**: Quality tech education should be available to everyone
- **Practical Learning**: Build real projects, not just tutorials
- **Community First**: We grow by helping each other

---

## Target Audience

### Primary

- Brazilians interested in learning programming
- Career switchers looking to enter tech
- Self-taught developers seeking structure and mentorship

### Secondary

- Junior developers looking to grow their skills
- Experienced developers who want to mentor others
- Tech companies seeking talented junior developers

### Language

- **Primary**: Portuguese (pt-BR)
- **Secondary**: English (for broader reach and resources)
- Currently Portuguese-only; English support planned

---

## Site Structure

The website serves as the public face of the community:

### Pages

| Page              | Purpose                                | URL              |
| ----------------- | -------------------------------------- | ---------------- |
| **Home**          | Landing page with value proposition    | `/`              |
| **About**         | Mission, story, team                   | `/about`         |
| **Blog**          | Articles, tutorials, community updates | `/blog`          |
| **Join Us**       | How to become a member                 | `/join-us`       |
| **Contributing**  | How to contribute to the community     | `/contributing`  |
| **Contact**       | Get in touch                           | `/contact`       |
| **Design System** | Visual reference for components        | `/design-system` |

### Content Collections

- **Blog Posts**: Markdown/MDX in `src/content/blog/`
  - Tutorials, community updates, member stories
  - Typed frontmatter with Astro content collections

---

## Brand Guidelines

### Mascot

**The PodCodar Llama** :llama:

Our mascot is a purple/violet llama wearing sunglasses. This is central to our brand identity.

### Color Palette

**Primary Colors** (based on mascot):

- **Primary**: Purple/Violet (`oklch(60% 0.2 285)`)
- **Secondary**: Lavender/Lilac (`oklch(75% 0.12 290)`)
- **Accent**: Deep Purple (`oklch(50% 0.18 285)`)

**Theme Implementation**:

- Light theme: `podcodar-light` (clean white with purple accents)
- Dark theme: `podcodar-dark` (deep purple-tinted dark)
- Both defined in `src/styles/global.css`

**Important**: Do not assume tech company = blue. Our brand is purple because of the llama mascot!

### Typography

- **Primary Font**: Atkinson Hyperlegible
  - Chosen for accessibility and readability
  - Local font files in `src/assets/fonts/`
- **Fallback**: System sans-serif stack

### Design System

- Built with **DaisyUI v5** + **Tailwind CSS v4**
- Semantic color tokens: `primary`, `secondary`, `accent`, `base-*`
- View at `/design-system` when running locally

---

## Tech Stack Context

### Why Astro?

- Static site generation for performance
- Excellent content collection support for blog
- Component islands for interactivity where needed
- Built-in i18n routing support

### Why Tailwind + DaisyUI?

- Consistent with main PodCodar webapp
- DaisyUI provides accessible components out of the box
- Custom theming matches brand colors
- Utility-first CSS enables rapid development

### Why Cloudflare?

- Edge deployment for global performance
- Generous free tier suitable for community projects
- Pulumi integration for infrastructure as code

---

## Content Strategy

### Blog Topics

- Programming tutorials (JavaScript, Python, etc.)
- Career advice for junior developers
- Community member spotlights
- Project showcases
- Industry insights relevant to learners

### Tone & Voice

- **Welcoming**: Inclusive language for all skill levels
- **Encouraging**: Learning is a journey, not a destination
- **Practical**: Actionable advice and examples
- **Portuguese-first**: Write primarily in Portuguese

---

## Development Conventions

### Code Style

- **Linting**: Biome (configured in `biome.json`)
- **Formatting**: 2-space indentation, 100 char line width
- **Imports**: Use `@/` alias instead of relative paths (`../`)
- **Types**: Strict TypeScript enabled

### Component Patterns

- Astro components for static content
- DaisyUI classes for styling
- Custom CSS in `src/styles/global.css` for global styles

### Git Workflow

- Main branch: `main`
- Feature branches: descriptive names
- Pull requests required for changes
- Quality gate runs on all PRs

### File Organization

```
src/
├── components/         # Reusable Astro components
│   ├── marketing/      # Marketing page sections
│   └── metadata/       # SEO/metadata components
├── layouts/            # Page layout templates
├── pages/              # Route definitions
├── content/            # Content collections
│   └── blog/           # Blog posts (markdown/MDX)
├── assets/             # Static assets
│   ├── fonts/          # Atkinson font files
│   └── images/         # Project images
└── styles/             # Global CSS
```

---

## Important Notes for Agents

### Design Decisions

1. **Colors come from the mascot**: Always reference the llama for brand colors (purple, not blue)
2. **Accessibility matters**: We serve learners of all abilities
3. **Performance counts**: Many users may be on mobile or slower connections
4. **Community-focused**: Features should encourage participation and learning

### Content Considerations

- Blog posts should be practical and beginner-friendly
- Use Portuguese as the primary language
- Include code examples where relevant
- Link to community resources when possible

### Technical Constraints

- Static site (SSG) - avoid server-side dependencies where possible
- Cloudflare Workers compatibility for edge functions
- Keep bundle sizes reasonable for global audience

### What NOT to Do

- Don't add complex authentication (this is a public info site)
- Don't assume users have fast internet
- Don't use English-only resources without Portuguese context
- Don't break the purple color scheme with unrelated colors

---

## Resources & References

### Internal

- `src/styles/global.css` - Brand colors and CSS variables
- `astro.config.ts` - Site configuration
- `/design-system` page - Visual component reference

### External

- [PodCodar GitHub](https://github.com/podcodar) - Main organization
- [Astro Documentation](https://docs.astro.build)
- [DaisyUI Theme Generator](https://daisyui.com/theme-generator/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## Questions?

If you're unsure about:

- **Design**: Check the mascot colors and `/design-system` page
- **Content**: Default to Portuguese, beginner-friendly tone
- **Technical**: Follow existing patterns in the codebase
- **Priority**: Community needs come first

---

_This document is a living reference. Update it as the project evolves._
