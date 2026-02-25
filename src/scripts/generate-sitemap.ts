import * as fs from 'fs';
import * as path from 'path';
import { blogPosts } from '../data/blog-posts';
import { caseStudies } from '../data/case-studies';

const SITE_URL = 'https://paramo.sh';
const BUILD_DIR = 'docs';

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  const entries: SitemapEntry[] = [
    // Main pages
    { url: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { url: '/blog/', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { url: '/case-studies/', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    
    // Blog posts
    ...blogPosts.map(post => ({
      url: `/blog/${post.slug}/`,
      lastmod: today,
      changefreq: 'monthly' as const,
      priority: '0.7',
    })),
    
    // Case studies
    ...caseStudies.map(study => ({
      url: `/case-studies/${study.slug}/`,
      lastmod: today,
      changefreq: 'monthly' as const,
      priority: '0.7',
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${SITE_URL}${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.join(process.cwd(), BUILD_DIR, 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log(`✅ Sitemap generated at ${outputPath}`);
}

generateSitemap();
