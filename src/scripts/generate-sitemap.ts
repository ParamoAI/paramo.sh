import * as fs from 'fs';
import * as path from 'path';
import { blogPosts } from '../data/blog-posts';
import { RESULTS } from '../site/data/results';
import { SERVICE_PAGES } from '../site/data/servicePages';

const SITE_URL = 'https://paramo.sh';
const BUILD_DIR = 'docs';

interface SitemapEntry {
  path: string;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

// Main pages
const pages: SitemapEntry[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/blog/', priority: 0.8, changefreq: 'weekly' },
  { path: '/case-studies/', priority: 0.8, changefreq: 'weekly' },
  // new pages in the redesign
  { path: '/what-we-do/', priority: 0.9, changefreq: 'monthly' },
  { path: '/who-we-are/', priority: 0.7, changefreq: 'monthly' },
  { path: '/why-us/', priority: 0.7, changefreq: 'monthly' },
];

// Dynamic content pages
const additionalPages: SitemapEntry[] = [
  ...blogPosts.map(post => ({
    path: `/blog/${post.slug}/`,
    priority: 0.7,
    changefreq: 'monthly' as const,
  })),
  // one page per service
  ...SERVICE_PAGES.map(p => ({
    path: `/what-we-do/${p.slug}/`,
    priority: 0.8,
    changefreq: 'monthly' as const,
  })),
  // every result: the seven original case studies plus the new stories
  ...RESULTS.map(study => ({
    path: `/case-studies/${study.slug}/`,
    priority: 0.7,
    changefreq: 'monthly' as const,
  })),
];

function generateSitemap(): string {
  const now = new Date().toISOString();
  const allPages = [...pages, ...additionalPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq ?? 'daily'}</changefreq>
    <priority>${page.priority ?? 0.8}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
}

const sitemap = generateSitemap();
const outputPath = path.join(process.cwd(), BUILD_DIR, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log(`✅ Sitemap generated at ${outputPath}`);
