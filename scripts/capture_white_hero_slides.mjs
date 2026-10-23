import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = process.env.CHROME_BIN || '/usr/bin/google-chrome';
const BASE_URL = 'http://localhost:3000';
const ARTIFACT_DIR = '/home/thejoevardy/.gemini/antigravity/brain/06fafef6-3f38-48fa-abcc-bfeb9c63d8b6';

async function main() {
  console.log('Launching browser with Chrome:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to', BASE_URL);
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for hero carousel to be visible
  await page.waitForSelector('[data-testid="hero-carousel"]', { timeout: 10000 });

  // Slide names
  const slides = [
    { index: 0, name: 'white_hero_slide1_ps5.png', label: 'Slide 1 (PS5 Master Stage)' },
    { index: 1, name: 'white_hero_slide2_colorways.png', label: 'Slide 2 (DualSense Colorways)' },
    { index: 2, name: 'white_hero_slide3_collector.png', label: 'Slide 3 (Collector Series)' },
    { index: 3, name: 'white_hero_slide4_games_archive.png', label: 'Slide 4 (Games Archive)' },
    { index: 4, name: 'white_hero_slide5_games_market.png', label: 'Slide 5 (Games Market)' },
  ];

  for (const s of slides) {
    console.log(`Navigating to ${s.label}...`);
    // Click indicator or evaluate switch
    await page.evaluate((targetIdx) => {
      const tab = document.querySelector(`[data-indicator-index="${targetIdx}"]`);
      if (tab) {
        tab.click();
      }
    }, s.index);

    // Give 600ms for transition animation to settle
    await new Promise((r) => setTimeout(r, 650));

    // Finish any running CSS transitions to ensure 100% opacity rendering
    await page.evaluate(() => {
      document.querySelectorAll('[data-slide-index]').forEach((el) => {
        el.getAnimations().forEach((a) => a.finish());
      });
    });

    const heroEl = await page.$('[data-testid="hero-carousel"]');
    if (heroEl) {
      const outPath = path.join(ARTIFACT_DIR, s.name);
      await heroEl.screenshot({ path: outPath });
      console.log(`Saved screenshot to ${outPath}`);
    }
  }

  await browser.close();
  console.log('All 5 slides captured successfully!');
}

main().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
