import * as fs from 'fs';
import * as path from 'path';
import { blogPosts } from '../data/blog-posts';
import { caseStudies } from '../data/case-studies';

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
];

// Dynamic content pages
const additionalPages: SitemapEntry[] = [
  ...blogPosts.map(post => ({
    path: `/blog/${post.slug}/`,
    priority: 0.7,
    changefreq: 'monthly' as const,
  })),
  ...caseStudies.map(study => ({
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
