# Páramo — Above the Clouds

The official website for [Páramo](https://paramo.sh), an OpenClaw implementation studio that builds custom AI automation systems for businesses.

## What We Do

- **AI Command Centers** — Manage multiple AI instances from a single dashboard
- **Workflow Automation** — End-to-end systems for content, leads, onboarding, and operations
- **Custom AI Agents** — Purpose-built agents trained on your business data
- **Integration Architecture** — Connect your entire stack into one automated ecosystem

## Tech Stack

- **Framework:** Next.js 16.x (Pages Router)
- **Static Export:** Outputs to `docs/` for GitHub Pages deployment
- **Styling:** CSS Variables with brand theming
- **TypeScript:** Full TypeScript support
- **Fonts:** Source Serif 4, Outfit (Google Fonts)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (outputs to docs/)
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── Nav.tsx           # Navigation with mobile menu
│   ├── Footer.tsx        # Site footer
│   ├── ScrollReveal.tsx  # Intersection Observer animations
│   ├── GoogleAnalytics.tsx
│   └── StructuredData.tsx
├── config/           # Configuration
│   └── site.ts           # Site URLs, brand colors, analytics IDs
├── data/             # Data files
│   ├── blog-posts.ts     # Blog post metadata
│   └── case-studies.ts   # Case study metadata
├── pages/            # NextJS pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx         # Home page
│   ├── blog/
│   │   ├── index.tsx     # Blog listing
│   │   └── [slug].tsx    # Individual blog posts
│   └── case-studies/
│       ├── index.tsx     # Case studies listing
│       └── [slug].tsx    # Individual case studies
├── scripts/          # Build scripts
│   └── generate-sitemap.ts
└── styles/           # Global styles
    └── globals.css       # CSS variables, all component styles
```

## Deployment

Pushes to `main` are automatically deployed via GitHub Pages at [https://paramo.sh](https://paramo.sh).

The site builds to the `docs/` directory, which GitHub Pages serves.

## Brand Guidelines

### Primary Colors
- `--paramo-deep: #0B1D1A` - Background
- `--highland-moss: #1B4D3E`
- `--misty-sage: #5B8A72`
- `--morning-mist: #A8C5B8`
- `--cloud-layer: #E8F0EB`
- `--peak-snow: #F7FAF8` - Text

### Accent Colors
- `--frailejon-gold: #C8963E` - Primary accent
- `--sun-through-mist: #E8C87A`
- `--warm-earth: #9E7230`

## Links

- 🌐 [Website](https://paramo.sh)
- 💬 [Discord](https://discord.com/invite/xXE9TqGju)
- 🐦 [Twitter / X](https://x.com/tipbtdennis)

## License

© 2026 Páramo. All rights reserved.
