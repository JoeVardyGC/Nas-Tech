import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = process.env.CHROME_BIN || '/usr/bin/google-chrome';
const BASE_URL = 'http://localhost:3000';
const ARTIFACT_DIR = '/home/thejoevardy/.gemini/antigravity/brain/06fafef6-3f38-48fa-abcc-bfeb9c63d8b6';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();

  // Test mobile view (iPhone 14 / standard mobile: 390x844)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 20000 });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 1000));

  const heroEl = await page.$('[data-testid="hero-carousel"]');

  // Capture Slide 3 (Collector Series Gamepad) on mobile
  await page.evaluate(() => {
    const tab = document.querySelector('[data-indicator-index="2"]');
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_slide3_gamepad_header.png') });
  }

  // Capture Slide 4 (Games Archive) on mobile
  await page.evaluate(() => {
    const tab = document.querySelector('[data-indicator-index="3"]');
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_slide4_games_taller_card.png') });
  }

  // Capture desktop views (1440x900)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 20000 });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  const desktopHero = await page.$('[data-testid="hero-carousel"]');
  // Slide 2 Console
  await page.evaluate(() => {
    const tab = document.querySelector('[data-indicator-index="1"]');
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  if (desktopHero) {
    await desktopHero.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_slide2_consoles.png') });
  }

  // Slide 3 Gamepad
  await page.evaluate(() => {
    const tab = document.querySelector('[data-indicator-index="2"]');
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  if (desktopHero) {
    await desktopHero.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_slide3_gamepads.png') });
  }

  // Slide 4 Games
  await page.evaluate(() => {
    const tab = document.querySelector('[data-indicator-index="3"]');
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  if (desktopHero) {
    await desktopHero.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_slide4_games.png') });
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
