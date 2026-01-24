#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator
 * 
 * Generates sitemap.xml with all routes and proper SEO metadata.
 * Called automatically after SSG prerender in the build process.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DOMAIN = 'https://arendaapartmentssochi.ru';

// Routes configuration with SEO priorities
// Excludes: NotFound, Statistics, About, Contacts, PrivacyPolicy (noIndex pages)
const routesConfig = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/catalog', priority: 0.9, changefreq: 'daily' },
  { path: '/apartments', priority: 0.8, changefreq: 'weekly' },
  { path: '/reviews', priority: 0.7, changefreq: 'weekly' },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' },
  { path: '/management', priority: 0.6, changefreq: 'monthly' },
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  const urlEntries = routesConfig.map(route => `  <url>
    <loc>${DOMAIN}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  const distPath = path.resolve(__dirname, 'dist');
  const outputPath = path.join(distPath, 'sitemap.xml');
  
  if (!fs.existsSync(distPath)) {
    console.log('⚠️ dist folder not found, creating...');
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, sitemap);
  console.log(`✅ sitemap.xml generated with ${routesConfig.length} URLs`);
  console.log(`   Domain: ${DOMAIN}`);
  console.log(`   Output: ${outputPath}`);
}

generateSitemap();
