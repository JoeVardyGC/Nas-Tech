import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = process.env.CHROME_BIN || '/usr/bin/google-chrome';
const BASE_URL = 'http://localhost:3000/product/prod-xbox-series-s';
const ARTIFACT_DIR = '/home/thejoevardy/.gemini/antigravity/brain/06fafef6-3f38-48fa-abcc-bfeb9c63d8b6';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();

  // Desktop capture
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 20000 });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_product_detail_top.png') });

  // Scroll down to Related Products
  await page.evaluate(() => window.scrollBy(0, 700));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_product_detail_related.png') });

  // Mobile capture
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 20000 });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_product_detail_top.png') });

  await browser.close();
  console.log('Product detail screenshots captured successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
