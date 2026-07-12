#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, '_posts');
const captureScript = path.join(__dirname, 'capture-og.mjs');

const POST_FILENAME = /^\d{4}-\d{2}-\d{2}-(.+)\.md$/;

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

function parsePost(fileContents) {
  const match = fileContents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  return { frontMatter: match[1], body: match[2] };
}

function getCategory(frontMatter) {
  const match = frontMatter.match(/^categories:\s*\r?\n-\s*(\S+)/m);
  return match?.[1] ?? 'en';
}

function getLayout(frontMatter) {
  const match = frontMatter.match(/^layout:\s*(\S+)/m);
  return match?.[1] ?? 'post';
}

function setFrontMatterField(frontMatter, key, value) {
  const line = `${key}: ${value}`;
  const pattern = new RegExp(`^${key}:.*$`, 'm');
  if (pattern.test(frontMatter)) {
    return frontMatter.replace(pattern, line);
  }
  if (/^layout:/m.test(frontMatter)) {
    return frontMatter.replace(/^(layout:.*)$/m, `$1\n${line}`);
  }
  return `${line}\n${frontMatter}`;
}


const files = (await readdir(postsDir))
  .filter((file) => POST_FILENAME.test(file))
  .sort();

for (const file of files) {
  const slug = file.match(POST_FILENAME)[1];
  const filePath = path.join(postsDir, file);
  const contents = await readFile(filePath, 'utf8');
  const parsed = parsePost(contents);

  if (!parsed) {
    console.warn(`Skipping ${file}: no front matter`);
    continue;
  }

  const layout = getLayout(parsed.frontMatter);
  if (layout === 'case-study') {
    console.log(`Skipping ${file}: case studies use banner for OG`);
    continue;
  }

  const category = getCategory(parsed.frontMatter);
  const pagePath = `/${category}/${slug}.html`;
  const outputName = `posts/${slug}-og`;
  const imagePath = `/assets/metadata/posts/${slug}-og.png`;
  const field = 'banner';

  await runCapture(pagePath, outputName);

  const updatedFrontMatter = setFrontMatterField(parsed.frontMatter, field, imagePath);
  await writeFile(filePath, `---\n${updatedFrontMatter}\n---\n${parsed.body}`, 'utf8');
  console.log(`Updated ${file} (${field})`);
}

console.log(`Captured OG images for ${files.length} posts.`);
