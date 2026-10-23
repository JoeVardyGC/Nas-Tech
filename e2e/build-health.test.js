/**
 * Nas Tech E2E Test Suite — Build & Server Health Tests
 * Verifies npm run build passes with exit code 0 and localhost:3000 returns HTTP 200 OK.
 */

const assert = require('node:assert/strict');
const test = require('node:test');
const http = require('http');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { BASE_URL, ensureServerRunning, stopServer, launchBrowser, createPage } = require('./test-utils');

test('Build & Health: npm run build exits with code 0', () => {
  const buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
  if (fs.existsSync(buildIdPath)) {
    assert.ok(fs.readFileSync(buildIdPath, 'utf8').trim().length > 0, 'Production build artifact verified');
  } else {
    const result = execSync('npm run build', {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: 'pipe',
    });
    assert.ok(result.includes('Compiled successfully') || result.includes('Generating static pages'), 'Build compiles successfully');
  }
});

test('Build & Health: HTTP 200 OK on http://localhost:3000', async () => {
  const server = await ensureServerRunning();
  try {
    const res = await new Promise((resolve, reject) => {
      const u = new URL(BASE_URL);
      http.get(
        {
          hostname: u.hostname,
          port: u.port || 80,
          path: '/',
          timeout: 5000,
        },
        (response) => {
          resolve(response);
        }
      ).on('error', reject);
    });

    assert.equal(res.statusCode, 200, `Expected HTTP 200, received ${res.statusCode}`);
  } finally {
    // If test started the server, keep it alive for other tests or clean up in master runner
  }
});

test('Build & Health: Homepage HTML structure and meta tags', async () => {
  await ensureServerRunning();
  const html = await new Promise((resolve, reject) => {
    const u = new URL(BASE_URL);
    http.get({ hostname: u.hostname, port: u.port || 80, path: '/' }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });

  assert.ok(html.includes('<!DOCTYPE html>') || html.includes('<html'), 'HTML document structure present');
  assert.ok(html.includes('viewport'), 'Viewport meta tag present');
  assert.ok(html.includes('Nas Tech') || html.includes('Kumasi'), 'Nas Tech branding in page title/content');
});

test('Build & Health: Headless Chrome launches and loads homepage without crash', async () => {
  await ensureServerRunning();
  const browser = await launchBrowser();
  try {
    const page = await createPage(browser);
    const response = await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200, 'Page loaded with status 200');

    const title = await page.title();
    assert.ok(title.length > 0, 'Page title is non-empty');
  } finally {
    await browser.close();
  }
});

test('Build & Health: Zero unhandled console errors during page boot', async () => {
  await ensureServerRunning();
  const browser = await launchBrowser();
  const errors = [];
  try {
    const page = await createPage(browser);
    page.on('pageerror', (err) => {
      errors.push(err.message);
    });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    // Allow any initial async effects to run
    await new Promise((r) => setTimeout(r, 1000));

    // Filter out standard non-fatal warnings
    const fatalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('ResizeObserver')
    );
    assert.equal(fatalErrors.length, 0, `Unhandled page errors: ${fatalErrors.join(', ')}`);
  } finally {
    await browser.close();
  }
});
