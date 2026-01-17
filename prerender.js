#!/usr/bin/env node

/**
 * SSG Prerender Script
 * 
 * This script generates static HTML files for all routes in the application.
 * It should be run after `npm run build` to create SEO-friendly static pages.
 * 
 * Usage: node prerender.js
 */

// Setup polyfills BEFORE any imports - required for SSR environment
// Some libraries (like Supabase) access localStorage on import
if (typeof globalThis.localStorage === 'undefined') {
  const storage = {};
  globalThis.localStorage = {
    getItem: (key) => storage[key] ?? null,
    setItem: (key, value) => { storage[key] = String(value); },
    removeItem: (key) => { delete storage[key]; },
    clear: () => { Object.keys(storage).forEach(key => delete storage[key]); },
    get length() { return Object.keys(storage).length; },
    key: (index) => Object.keys(storage)[index] ?? null,
  };
}

if (typeof globalThis.sessionStorage === 'undefined') {
  const storage = {};
  globalThis.sessionStorage = {
    getItem: (key) => storage[key] ?? null,
    setItem: (key, value) => { storage[key] = String(value); },
    removeItem: (key) => { delete storage[key]; },
    clear: () => { Object.keys(storage).forEach(key => delete storage[key]); },
    get length() { return Object.keys(storage).length; },
    key: (index) => Object.keys(storage)[index] ?? null,
  };
}

// Mock window for SSR
if (typeof globalThis.window === 'undefined') {
  globalThis.window = globalThis;
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'cyan');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

async function prerender() {
  const distPath = path.resolve(__dirname, 'dist');
  const serverEntryPath = path.resolve(distPath, 'server/entry-server.js');

  log('\n🚀 Starting SSG Prerender...\n', 'cyan');

  // Check if dist folder exists
  if (!fs.existsSync(distPath)) {
    logError('dist folder not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Check if server entry exists
  if (!fs.existsSync(serverEntryPath)) {
    logError('Server entry not found at dist/server/entry-server.js');
    logInfo('Make sure vite.config.ts has SSR build configured.');
    process.exit(1);
  }

  // Load the server entry
  let render, routes;
  try {
    const serverModule = await import(serverEntryPath);
    render = serverModule.render;
    routes = serverModule.routes;
    logSuccess('Server module loaded successfully');
  } catch (error) {
    logError(`Failed to load server module: ${error.message}`);
    process.exit(1);
  }

  // Read the template HTML
  const templatePath = path.resolve(distPath, 'index.html');
  if (!fs.existsSync(templatePath)) {
    logError('index.html not found in dist folder.');
    process.exit(1);
  }

  let template = fs.readFileSync(templatePath, 'utf-8');
  logSuccess('Template HTML loaded');

  // Check for placeholder in template
  const hasPlaceholder = template.includes('<!--app-html-->');
  const hasEmptyRoot = template.includes('<div id="root"></div>');
  
  if (!hasPlaceholder && !hasEmptyRoot) {
    logWarning('No placeholder found in template. Looking for <div id="root">');
  }

  logInfo(`Found ${routes.length} routes to prerender\n`);

  let successCount = 0;
  let failCount = 0;
  const minContentSize = 100; // Minimum expected content size in bytes

  for (const route of routes) {
    const routeStart = Date.now();
    
    try {
      // Render the route
      const { html: appHtml, helmet } = render(route);
      
      // Prepare the final HTML
      let finalHtml = template;

      // Replace app content - try placeholder first, then fallback to empty root div
      if (hasPlaceholder) {
        finalHtml = finalHtml.replace('<!--app-html-->', appHtml);
      } else if (hasEmptyRoot) {
        finalHtml = finalHtml.replace(
          '<div id="root"></div>',
          `<div id="root">${appHtml}</div>`
        );
      } else {
        // Last resort: try to find any root div pattern
        finalHtml = finalHtml.replace(
          /<div id="root"[^>]*><\/div>/,
          `<div id="root">${appHtml}</div>`
        );
      }

      // Inject helmet meta tags if available
      if (helmet) {
        const helmetTags = [
          helmet.title?.toString() || '',
          helmet.meta?.toString() || '',
          helmet.link?.toString() || '',
          helmet.script?.toString() || '',
        ].filter(Boolean).join('\n    ');

        if (helmetTags) {
          // Insert helmet tags before </head>
          finalHtml = finalHtml.replace('</head>', `    ${helmetTags}\n  </head>`);
        }
      }

      // Determine output path
      const routePath = route === '/' ? '/index.html' : `${route}.html`;
      const outputPath = path.join(distPath, routePath);
      
      // Ensure directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write the file
      fs.writeFileSync(outputPath, finalHtml);

      // Verify the output
      const stats = fs.statSync(outputPath);
      const contentSize = appHtml.length;
      const fileSize = stats.size;
      const duration = Date.now() - routeStart;

      if (contentSize < minContentSize) {
        logWarning(`${route} → ${routePath} (${fileSize} bytes, ${duration}ms) - Content seems small (${contentSize} chars)`);
      } else {
        logSuccess(`${route} → ${routePath} (${fileSize} bytes, content: ${contentSize} chars, ${duration}ms)`);
      }

      successCount++;
    } catch (error) {
      logError(`${route} → Failed: ${error.message}`);
      failCount++;
    }
  }

  // Summary
  log('\n' + '─'.repeat(50), 'dim');
  log(`\n📊 Prerender Summary:`, 'cyan');
  logSuccess(`${successCount} pages generated successfully`);
  if (failCount > 0) {
    logError(`${failCount} pages failed`);
  }

  // Verify index.html specifically
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    const hasContent = indexContent.includes('class=') && indexContent.length > 2000;
    
    if (hasContent) {
      logSuccess('index.html contains rendered content ✓');
    } else {
      logWarning('index.html may not have been properly rendered');
    }
  }

  log('\n✨ SSG Prerender complete!\n', 'green');

  process.exit(failCount > 0 ? 1 : 0);
}

// Run the prerender
prerender().catch((error) => {
  logError(`Prerender failed: ${error.message}`);
  console.error(error);
  process.exit(1);
});
