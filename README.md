# Páramo — Above the Clouds

The official website for [Páramo](https://paramo.sh), an OpenClaw implementation studio that builds custom AI automation systems for businesses.

## What We Do

- **AI Command Centers** — Manage multiple AI instances from a single dashboard
- **Workflow Automation** — End-to-end systems for content, leads, onboarding, and operations
- **Custom AI Agents** — Purpose-built agents trained on your business data
- **Integration Architecture** — Connect your entire stack into one automated ecosystem

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.x (Pages Router) |
| Language | TypeScript |
| Styling | CSS Variables (brand theming) |
| Fonts | Source Serif 4, Outfit (Google Fonts) |
| Build Output | Static export to `docs/` |
| Hosting | GitHub Pages |
| Domain | [paramo.sh](https://paramo.sh) |

---

## Development

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm run dev

# Build for production (outputs to docs/)
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

Or use the Makefile:

```bash
make dev      # Start development server
make build    # Build for production
make clean    # Remove build artifacts
make install  # Install dependencies
```

---

## Project Structure

```
paramo.sh/
├── docs/                 # Build output (served by GitHub Pages)
├── public/               # Static assets (copied to docs/ on build)
│   ├── assets/           # Logos, favicons, brand marks
│   ├── CNAME             # Custom domain
│   ├── robots.txt
│   ├── og-image.png
│   └── ...
├── src/
│   ├── components/       # React components
│   │   ├── Nav.tsx           # Navigation with mobile menu
│   │   ├── Footer.tsx        # Site footer
│   │   ├── ScrollReveal.tsx  # Intersection Observer animations
│   │   ├── GoogleAnalytics.tsx
│   │   └── StructuredData.tsx
│   ├── config/           # Configuration
│   │   └── site.ts           # URLs, colors, analytics IDs
│   ├── data/             # Content data
│   │   ├── blog-posts.ts     # Blog post metadata
│   │   └── case-studies.ts   # Case study metadata
│   ├── pages/            # NextJS pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx         # Home page
│   │   ├── blog/
│   │   │   ├── index.tsx     # Blog listing
│   │   │   └── [slug].tsx    # Individual posts
│   │   └── case-studies/
│   │       ├── index.tsx     # Case studies listing
│   │       └── [slug].tsx    # Individual case studies
│   ├── scripts/          # Build scripts
│   │   └── generate-sitemap.ts
│   └── styles/
│       └── globals.css       # All CSS (variables, components)
├── next.config.mjs       # NextJS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, services, process, results, pricing, CTA |
| `/blog/` | Blog listing page |
| `/blog/[slug]/` | Individual blog posts (4 articles) |
| `/case-studies/` | Case studies listing page |
| `/case-studies/[slug]/` | Individual case studies (6 studies) |

---

## Configuration

### Site Config (`src/config/site.ts`)

```typescript
export const SITE_URL = 'https://paramo.sh';
export const GA_MEASUREMENT_IDS = ['G-T9Z403DE2W', 'G-RRW1NVQ7NY'];
export const CALENDLY_URL = 'https://calendly.com/d/cvkf-q3t-25j/...';
```

### Build Config (`next.config.mjs`)

```javascript
output: 'export',        // Static export
distDir: 'docs',         // Output directory
trailingSlash: true,     // Clean URLs (/blog/ not /blog)
```

---

## Adding Content

### Blog Posts

1. Add entry to `src/data/blog-posts.ts`:
   ```typescript
   {
     slug: 'my-new-post',
     title: 'My New Post Title',
     description: 'Post description for SEO and cards',
     tag: 'Insights',
     date: 'Feb 25, 2026',
     readTime: '5 min read',
   }
   ```

2. The dynamic route `[slug].tsx` generates the page automatically

3. To add full content: modify `src/pages/blog/[slug].tsx` to load content from markdown or a CMS

### Case Studies

1. Add entry to `src/data/case-studies.ts`:
   ```typescript
   {
     slug: 'my-case-study',
     industry: 'Technology',
     industryEmoji: '🤖',
     stat: 'Headline stat or result',
     title: 'Full case study description',
     avatar: 'MC',
     name: 'My Client',
     role: 'Location or role',
   }
   ```

2. The dynamic route generates pages automatically

---

## Deployment

### GitHub Pages

1. Build: `npm run build`
2. The `docs/` directory contains the static site
3. Commit and push to `main`
4. GitHub Pages serves from `docs/` folder

The build process:
1. NextJS compiles and exports static HTML/CSS/JS to `docs/`
2. `generate-sitemap.ts` creates `docs/sitemap.xml`
3. Public assets are copied to `docs/`

---

## Brand Guidelines

### Primary Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--paramo-deep` | `#0B1D1A` | Background |
| `--highland-moss` | `#1B4D3E` | Secondary background |
| `--misty-sage` | `#5B8A72` | Muted text |
| `--morning-mist` | `#A8C5B8` | Body text |
| `--cloud-layer` | `#E8F0EB` | Bright text |
| `--peak-snow` | `#F7FAF8` | Headings, emphasis |

### Accent Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--frailejon-gold` | `#C8963E` | Primary accent, CTAs |
| `--sun-through-mist` | `#E8C87A` | Hover states |
| `--warm-earth` | `#9E7230` | Active states |

### Typography

- **Display:** Source Serif 4 (headings)
- **Body:** Outfit (body text, UI)

---

## Migration Notes

This site was migrated from static HTML to NextJS. Key changes:

### What Was Migrated ✅

- Home page with all sections (hero, proof bar, services, process, results, pricing, CTA, newsletter)
- Blog listing and 4 blog post pages
- Case studies listing and 6 case study pages
- Navigation with mobile menu
- Footer
- Complete CSS variable system and brand styling
- Google Analytics (dual tracking: G-T9Z403DE2W, G-RRW1NVQ7NY)
- Structured data (JSON-LD Organization schema)
- Meta tags and Open Graph
- Scroll reveal animations (Intersection Observer)
- All static assets (favicons, logos, OG images)
- Sitemap generation

### What Needs Attention ⚠️

- **Individual article content:** Blog post and case study detail pages currently have placeholder content. The full article HTML would need to be converted to React components or loaded from markdown/CMS.

---

## Links

- 🌐 [Website](https://paramo.sh)
- 💬 [Discord](https://discord.com/invite/xXE9TqGju)
- 🐦 [Twitter / X](https://x.com/tipbtdennis)

---

## License

© 2026 Páramo. All rights reserved.
