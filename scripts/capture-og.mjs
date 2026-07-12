#!/usr/bin/env node

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 694;
const DEFAULT_BASE_URL = 'http://localhost:4000';

function usage() {
  console.log(`Usage: node scripts/capture-og.mjs <page-path> [output-name]

Examples:
  node scripts/capture-og.mjs /listening listening-og
  node scripts/capture-og.mjs /reading reading-og

Options via env:
  OG_BASE_URL   Site base URL (default: ${DEFAULT_BASE_URL})
  OG_WIDTH      Viewport width (default: ${DEFAULT_WIDTH})
  OG_HEIGHT     Viewport height (default: ${DEFAULT_HEIGHT})
`);
}

const pagePath = process.argv[2];
const outputName = process.argv[3];

if (!pagePath || pagePath === '--help' || pagePath === '-h') {
  usage();
  process.exit(pagePath ? 0 : 1);
}

const baseUrl = process.env.OG_BASE_URL ?? DEFAULT_BASE_URL;
const width = Number(process.env.OG_WIDTH ?? DEFAULT_WIDTH);
const height = Number(process.env.OG_HEIGHT ?? DEFAULT_HEIGHT);
const slug = outputName ?? (pagePath.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-') || 'page');
const outputPath = path.join(root, 'assets', 'metadata', `${slug}.png`);

const url = new URL(pagePath.startsWith('/') ? pagePath : `/${pagePath}`, baseUrl).toString();

await mkdir(path.dirname(outputPath), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 1,
});

await page.emulateMedia({ colorScheme: 'dark' });
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: outputPath, type: 'png' });
await browser.close();

console.log(`Saved ${outputPath} (${width}x${height}) from ${url}`);
