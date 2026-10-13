# Search Checklist

This list protects paramo.sh's place in Google and AI search during the redesign. It was taken from the live `main` branch on 2026-10-13.

## The rules

1. **Before the `new-website` branch is ever merged into `main`, every item below must still exist at the exact same address.**
2. **No page may carry a "do not index" flag.** That means no `noindex` in a `<meta name="robots">` tag, no `X-Robots-Tag` header, and no `Disallow` line in `robots.txt` that blocks a page on this list.
3. **No address changes without Dennis's approval first.** If a redesign idea needs an address to move, stop and flag it before doing any work. If Dennis approves, the old address must redirect to the new one.
4. Titles and descriptions may be improved on purpose for keyword work, but never dropped or left blank by accident. Any change to the text below should be a deliberate, reviewed change.

## How to check before merging

1. Run `npm run build` on the `new-website` branch.
2. Confirm every page below has a matching `index.html` inside the `docs/` folder.
3. Confirm every setup file below exists inside `docs/` with the content described.
4. Confirm `docs/sitemap.xml` lists all 16 addresses below.
5. Search the `docs/` folder for `noindex`. There should be no results.
6. Compare each page's title and description to the tables below.

---

## 1. Every page address in the sitemap (16 pages)

These come from `docs/sitemap.xml`. The sitemap is built automatically by `src/scripts/generate-sitemap.ts` from the blog and case study lists.

### Main pages

- [ ] `https://paramo.sh/`
- [ ] `https://paramo.sh/blog/`
- [ ] `https://paramo.sh/case-studies/`

### Blog posts

- [ ] `https://paramo.sh/blog/ai-labs-just-validated-implementation-gap/`
- [ ] `https://paramo.sh/blog/agentic-ai-app-development-growth/`
- [ ] `https://paramo.sh/blog/real-cost-of-not-automating/`
- [ ] `https://paramo.sh/blog/ai-agents-vs-zapier-make/`
- [ ] `https://paramo.sh/blog/replaced-12-saas-tools/`
- [ ] `https://paramo.sh/blog/what-is-ai-native-company/`

### Case studies

- [ ] `https://paramo.sh/case-studies/ai-built-website/`
- [ ] `https://paramo.sh/case-studies/seo-automation/`
- [ ] `https://paramo.sh/case-studies/dr-osborn-neurosurgeon/`
- [ ] `https://paramo.sh/case-studies/skilletz-cafe/`
- [ ] `https://paramo.sh/case-studies/real-estate-portfolio/`
- [ ] `https://paramo.sh/case-studies/bookkeeping-automation/`
- [ ] `https://paramo.sh/case-studies/employee-training-sops/`

### Live pages that are not in the sitemap

These also exist today. Keep them at the same address unless Dennis decides otherwise.

- [ ] `https://paramo.sh/architect-prep/` (flashcard study tool, not linked from the menu)

---

## 2. Setup files Google and AI search rely on

| Check | Published address | Source file | What it does |
|---|---|---|---|
| [ ] | `https://paramo.sh/sitemap.xml` | Built by `src/scripts/generate-sitemap.ts` | Tells Google every page to crawl. Must list all 16 pages above. |
| [ ] | `https://paramo.sh/robots.txt` | `public/robots.txt` | Lets all crawlers in (Google, GPTBot, ChatGPT, Google-Extended, Perplexity, ClaudeBot, Anthropic) and points to the sitemap. Must keep `Allow: /` for every crawler and the `Sitemap:` line. |
| [ ] | `https://paramo.sh/googlec4309e858071aca0.html` | `public/googlec4309e858071aca0.html` | Proves to Google Search Console that Páramo owns the site. Never rename or delete. |
| [ ] | `https://paramo.sh/llms.txt` | `public/llms.txt` | Short summary of Páramo for AI assistants. |
| [ ] | `https://paramo.sh/llms-full.txt` | `public/llms-full.txt` | Longer description of Páramo for AI assistants. |
| [ ] | `https://paramo.sh/404.html` (also `https://paramo.sh/404/`) | Generated automatically (there is no custom 404 page yet) | The "page not found" page. |
| [ ] | `docs/CNAME` (not a web page) | `public/CNAME` | Tells GitHub Pages the site lives at `paramo.sh`. Must contain exactly `paramo.sh`. If this breaks, the whole site goes offline at its address. |

Related files worth keeping as-is: `docs/.nojekyll` (GitHub Pages needs it to serve the site's scripts), `/og-image.png` (the preview image shown when the site is shared), and the favicons in `/assets/`.

---

## 3. Every page's title and description

Taken from the published `docs/` folder. "Canonical" is the address each page tells Google is its official home; it must stay the same.

### Main pages

| Address | Title | Description | Source |
|---|---|---|---|
| `/` | Páramo \| AI systems for business owners | Custom AI automation for business owners. We show you what's possible, then we build it. | `src/pages/index.tsx` |
| `/blog/` | Blog — Páramo | Insights on AI automation, AI agents, and building smarter businesses. From the team at Páramo AI. | `src/pages/blog/index.tsx` |
| `/case-studies/` | Case Studies — Páramo | See how businesses transform with custom AI automation. Real clients, real results. | `src/pages/case-studies/index.tsx` |
| `/architect-prep/` | Architect Prep — Páramo | Mobile-first flashcard study tool for the Claude Certified Architect exam. 20 cards covering agentic loops, multi-agent systems, context passing, safety, and more. | `src/pages/architect-prep.tsx` |
| `/404.html` | 404: This page could not be found | *(none)* | Generated automatically |

### Blog posts

Titles and descriptions come from `src/data/blog-posts.ts`. The site adds " — Páramo" to the end of each title.

| Address | Title | Description |
|---|---|---|
| `/blog/ai-labs-just-validated-implementation-gap/` | OpenAI and Anthropic Just Proved the AI Gap Isn't Models — It's Implementation — Páramo | The companies building the most powerful AI models in the world are launching consulting arms. Here's what that tells us about where the real value is — and who captures it. |
| `/blog/agentic-ai-app-development-growth/` | How Agentic AI Will Reshape App Development and Growth — And Why I'm Building It — Páramo | The app economy is entering its most disruptive phase since the App Store launched. Here is what agentic AI means for developers, monetization, and growth. |
| `/blog/real-cost-of-not-automating/` | What Manual Work Costs Your Small Business (The Real Numbers) — Páramo | Small businesses lose 10-20 hours a week on admin tasks that AI can handle. We break down the exact dollar cost — and what to automate first. |
| `/blog/ai-agents-vs-zapier-make/` | AI Agents vs Zapier & Make: What Automation Tools Can't Do (2026) — Páramo | Zapier and Make hit a ceiling when tasks need judgment, not just triggers. See where AI agents pick up — with real examples and a side-by-side comparison. |
| `/blog/replaced-12-saas-tools/` | We Replaced 12 SaaS Tools with AI Agents — Here's What Happened — Páramo | We canceled $2,400/month in software and got better results. The full list of tools we dropped, what replaced them, and the lessons we learned. |
| `/blog/what-is-ai-native-company/` | What Is an AI-Native Company? (And How 3 People Run Like 300) — Páramo | AI-native companies aren't just using AI tools — they're built on AI from day one. Here's what that actually looks like, and why it's the future of small business. |

### Case studies

Titles and descriptions come from `src/data/case-studies.ts`.

| Address | Title | Description |
|---|---|---|
| `/case-studies/ai-built-website/` | Páramo AI: $40,000+ saved — Páramo | We built our entire brand identity and production website — guidelines, copy, design, SEO — using our own AI agent. No designers. No agencies. No templates. |
| `/case-studies/seo-automation/` | Páramo AI: $2,500+/month saved — Páramo | We automated our entire SEO and programmatic SEO strategy — keyword research, content calendars, city pages, competitor analysis — for paramo.sh and sister brand getclawhelp.com using our AI agent. |
| `/case-studies/dr-osborn-neurosurgeon/` | Dr. Brett Osborn: A neurosurgeon's brand, amplified — Páramo | A board-certified neurosurgeon and longevity physician deployed a locally-installed AI assistant to handle content creation, trend monitoring, and brand management across three platforms — without compromising patient privacy or his voice. |
| `/case-studies/skilletz-cafe/` | Skillet'z Cafe: 5 automations — Páramo | A family-run breakfast diner deployed AI to orchestrate marketing, dispute resolution, school partnerships, and custom analytics — without hiring a single person. |
| `/case-studies/real-estate-portfolio/` | Bay Area Investor: From scattered properties to a command center — Páramo | A real estate investor managing properties across multiple markets built an AI system for deal sourcing, tax optimization, and family financial education. |
| `/case-studies/bookkeeping-automation/` | Small Business Owner: 8 hours a month — Páramo | A small business owner running multiple entities eliminated bookkeeping chaos — and discovered thousands in tax deductions their software was missing. |
| `/case-studies/employee-training-sops/` | Home Services Company: 30 employees — Páramo | A growing home services company turned tribal knowledge into a living operating manual — handbooks, SOPs, and training guides generated by AI in days, not months. |

---

## 4. "Do not index" status today

Checked on 2026-10-13: no page in `docs/`, `src/`, or `public/` contains `noindex` or `nofollow`, and `robots.txt` blocks nothing. This must still be true at merge time.
