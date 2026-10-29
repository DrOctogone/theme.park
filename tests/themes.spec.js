// @ts-check
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const themes = fs
  .readdirSync(path.join(__dirname, '..', 'css', 'theme-options'))
  .filter((file) => file.endsWith('.css'))
  .map((file) => file.replace(/\.css$/, ''));

for (const theme of themes) {
  test(`sonarr + ${theme} loads and applies its variables`, async ({ page }) => {
    const failed = [];
    page.on('response', (res) => {
      if (res.url().endsWith('.css') && !res.ok()) failed.push(`${res.status()} ${res.url()}`);
    });

    // Navigate first so the stylesheet URLs resolve against the local server (a plain CSS file, so no site JS runs)
    await page.goto('/css/defaults/placeholders.css');
    await page.setContent(`<!doctype html><html><head>
      <link rel="stylesheet" href="/css/base/sonarr/sonarr-base.css">
      <link rel="stylesheet" href="/css/theme-options/${theme}.css">
      </head><body><a href="#">link</a></body></html>`, { waitUntil: 'load' });

    const text = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--text').trim());
    expect(failed).toEqual([]);
    expect(text, `--text should be defined by ${theme}.css`).not.toBe('');
  });
}
