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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 25000 });
  await page.evaluateHandle('document.fonts.ready');

  // Scroll to #installations
  await page.evaluate(() => {
    const el = document.getElementById('installations');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'available_games_desktop.png') });

  // Mobile capture
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const el = document.getElementById('installations');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'available_games_mobile.png') });

  await browser.close();
  console.log('Available games screenshots captured successfully!');
}

main().catch(console.error);
