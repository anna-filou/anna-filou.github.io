#!/usr/bin/env node

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const captureScript = path.join(__dirname, 'capture-og.mjs');

const pages = [
  ['/reading', 'reading-og'],
  ['/uses', 'uses-og'],
  ['/listening', 'listening-og'],
  ['/friends', 'friends-og'],
  ['/ideas', 'ideas-og'],
  ['/bookmarks', 'bookmarks-og'],
  ['/links', 'links-og'],
  ['/about', 'about-og'],
  ['/contact', 'contact-og'],
  ['/posts', 'posts-og'],
  ['/art', 'art-og'],
  ['/collab', 'collab-og'],
  ['/experiments', 'experiments-og'],
  ['/websites', 'websites-og'],
  ['/menu', 'menu-og'],
  ['/404.html', '404-og'],
];

function runCapture(pagePath, outputName) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [captureScript, pagePath, outputName], {
      stdio: 'inherit',
      env: process.env,
    });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Failed to capture ${pagePath} (${code})`));
    });
  });
}

for (const [pagePath, outputName] of pages) {
  await runCapture(pagePath, outputName);
}

console.log(`Captured ${pages.length} OG images.`);
