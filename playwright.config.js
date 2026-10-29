// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:8123',
    // Point at a preinstalled Chromium when one is provided (e.g. PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium)
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : {},
  },
  // Serve the repo root so the absolute @import paths in the CSS resolve.
  // Bound to 127.0.0.1 so the server is never reachable from the network.
  webServer: {
    command: 'python3 -m http.server 8123 --bind 127.0.0.1',
    url: 'http://127.0.0.1:8123/css/defaults/placeholders.css',
    stderr: 'ignore',
    reuseExistingServer: !process.env.CI,
  },
});
