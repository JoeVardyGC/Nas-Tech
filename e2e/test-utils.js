/**
 * Nas Tech E2E Test Utilities
 * Manages headless browser automation, server lifecycle, and carousel DOM helpers.
 */

const puppeteer = require('puppeteer-core');
const http = require('http');
const { spawn } = require('child_process');

const CHROME_PATH = process.env.CHROME_BIN || '/usr/bin/google-chrome';
const BASE_URL = process.env.APP_URL || 'http://localhost:3000';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function isServerUp(url = BASE_URL) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = http.request(
        {
          hostname: u.hostname,
          port: u.port || 80,
          path: u.pathname,
          method: 'GET',
          timeout: 2000,
        },
        (res) => {
          resolve(res.statusCode >= 200 && res.statusCode < 400);
        }
      );
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    } catch {
      resolve(false);
    }
  });
}

async function ensureServerRunning() {
  const alreadyUp = await isServerUp();
  if (alreadyUp) {
    return { process: null, started: false };
  }

  // Start Next.js production or dev server
  const child = spawn('npm', ['run', 'start'], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: '3000' },
    stdio: 'ignore',
    detached: true,
  });
  child.unref();

  const maxAttempts = 30;
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(1000);
    if (await isServerUp()) {
      return { process: child, started: true };
    }
  }

  // If start fails (e.g. no build output), try npm run dev
  try {
    process.kill(-child.pid);
  } catch {}

  const devChild = spawn('npm', ['run', 'dev'], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: '3000' },
    stdio: 'ignore',
    detached: true,
  });
  devChild.unref();

  for (let i = 0; i < maxAttempts; i++) {
    await sleep(1000);
    if (await isServerUp()) {
      return { process: devChild, started: true };
    }
  }

  throw new Error('Failed to start Next.js application on ' + BASE_URL);
}

function stopServer(serverInfo) {
  if (serverInfo && serverInfo.process && serverInfo.started) {
    try {
      process.kill(-serverInfo.process.pid, 'SIGTERM');
    } catch {
      try {
        serverInfo.process.kill();
      } catch {}
    }
  }
}

async function launchBrowser() {
  return await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-extensions',
    ],
  });
}

async function createPage(browser, viewport = { width: 1280, height: 800 }) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  return page;
}

async function waitForCarousel(page, timeout = 10000) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  const selector = '[role="region"][aria-roledescription="carousel"], [data-testid="hero-carousel"], #hero-carousel, .hero-carousel';
  await page.waitForSelector(selector, { timeout });
  return selector;
}

async function getCarouselState(page) {
  return await page.evaluate(() => {
    const carousel = document.querySelector('[role="region"][aria-roledescription="carousel"], [data-testid="hero-carousel"], #hero-carousel, .hero-carousel');
    if (!carousel) return null;

    // Active slide index
    const activeSlideAttr = carousel.getAttribute('data-active-slide');
    let activeIndex = activeSlideAttr !== null ? parseInt(activeSlideAttr, 10) : null;

    // Search active slide in DOM if attribute not present
    if (activeIndex === null || isNaN(activeIndex)) {
      const slides = carousel.querySelectorAll('[role="group"][aria-roledescription="slide"], [data-slide-index]');
      slides.forEach((slide, idx) => {
        const isCurrent = slide.getAttribute('aria-current') === 'true' ||
                          slide.getAttribute('data-active') === 'true' ||
                          slide.classList.contains('opacity-100') ||
                          slide.getAttribute('aria-hidden') === 'false';
        if (isCurrent && activeIndex === null) {
          const customIdx = slide.getAttribute('data-slide-index');
          activeIndex = customIdx !== null ? parseInt(customIdx, 10) : idx;
        }
      });
    }

    // Indicators / Progress bar
    const indicatorButtons = Array.from(carousel.querySelectorAll('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]'));
    const progressBar = carousel.querySelector('[data-testid="carousel-progress-bar"], .carousel-progress-bar, [role="progressbar"]');
    let progressStyle = '';
    if (progressBar) {
      progressStyle = progressBar.getAttribute('style') || '';
    }

    // Adaptive navbar
    const navbar = document.querySelector('[data-testid="adaptive-navbar"], nav.adaptive-navbar, nav[data-theme]');
    const navbarTheme = navbar ? navbar.getAttribute('data-theme') || (navbar.className.includes('bg-white') ? 'light' : 'dark') : null;
    const navbarClasses = navbar ? navbar.className : '';

    return {
      activeIndex: activeIndex !== null && !isNaN(activeIndex) ? activeIndex : 0,
      totalIndicators: indicatorButtons.length,
      progressStyle,
      navbarTheme,
      navbarClasses,
    };
  });
}

module.exports = {
  BASE_URL,
  CHROME_PATH,
  sleep,
  isServerUp,
  ensureServerRunning,
  stopServer,
  launchBrowser,
  createPage,
  waitForCarousel,
  getCarouselState,
};
