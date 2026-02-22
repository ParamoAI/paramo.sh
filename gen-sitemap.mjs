#!/usr/bin/env node
/**
 * Auto-generate sitemap.xml from all index.html files in the repo.
 * Run: node gen-sitemap.mjs
 */
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const SITE = 'https://paramo.sh';
const ROOT = new URL('.', import.meta.url).pathname;
const IGNORE = ['node_modules', '.git', 'assets'];

function findPages(dir) {
  const pages = [];
  for (const entry of readdirSync(dir)) {
    if (IGNORE.includes(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      pages.push(...findPages(full));
    } else if (entry === 'index.html') {
      const rel = relative(ROOT, dir);
      const path = rel ? `/${rel}/` : '/';
      const lastmod = st.mtime.toISOString().split('T')[0];
      pages.push({ path, lastmod });
    }
  }
  return pages;
}

const pages = findPages(ROOT).sort((a, b) => {
  // homepage first, then by depth, then alpha
  if (a.path === '/') return -1;
  if (b.path === '/') return 1;
  const da = a.path.split('/').length;
  const db = b.path.split('/').length;
  if (da !== db) return da - db;
  return a.path.localeCompare(b.path);
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => {
  const priority = p.path === '/' ? '1.0' : p.path.split('/').filter(Boolean).length === 1 ? '0.8' : '0.7';
  return `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>
`;

writeFileSync(join(ROOT, 'sitemap.xml'), xml);
console.log(`✅ sitemap.xml updated with ${pages.length} pages`);
