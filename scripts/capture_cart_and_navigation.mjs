import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = process.env.CHROME_BIN || '/usr/bin/google-chrome';
const BASE_URL = 'http://localhost:3000';
const ARTIFACT_DIR = '/home/thejoevardy/.gemini/antigravity/brain/06fafef6-3f38-48fa-abcc-bfeb9c63d8b6';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to homepage...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));

    // 1. Open Empty Cart Drawer
    console.log('Opening empty cart drawer...');
    const cartBtn = await page.$('button[aria-label*="shopping cart"], button[aria-label*="Cart"]');
    if (cartBtn) {
      await cartBtn.click();
      await new Promise(r => setTimeout(r, 800));
      const emptyCartPath = path.join(ARTIFACT_DIR, 'catchy_cart_empty.png');
      await page.screenshot({ path: emptyCartPath });
      console.log('Saved:', emptyCartPath);

      // Close cart
      const closeBtn = await page.$('button[data-testid="close-cart"], button[aria-label="Close cart"]');
      if (closeBtn) {
        await closeBtn.click();
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // 2. Add items to cart (simulate adding a game install and a product)
    console.log('Adding items to cart in localStorage...');
    await page.evaluate(() => {
      const items = [
        {
          product: {
            id: 'prod-ps5-slim-disc',
            name: 'Sony PlayStation 5 Slim (1TB Ultra-Fast SSD Disc Edition)',
            category: 'consoles',
            brand: 'PlayStation',
            condition: 'Brand New',
            priceGHS: 7950,
            rating: 5.0,
            reviewsCount: 38,
            inStock: true,
            stockCount: 5,
            swapEligible: false,
            image: '/assets/hero/carousel/ps5_consoles_pedestal_isolated.png',
            gallery: [],
            specs: { storage: '1TB Ultra-Fast SSD' },
            description: 'Ultra-fast SSD PS5 Slim console with DualSense wireless controller.'
          },
          quantity: 1
        },
        {
          product: {
            id: 'game-god-of-war-ragnarok',
            name: 'God of War: Ragnarök (PS5 / PS4 Pre-Load)',
            category: 'consoles',
            brand: 'PlayStation',
            condition: 'Foreign Used',
            priceGHS: 60,
            rating: 5.0,
            reviewsCount: 14,
            inStock: true,
            stockCount: 99,
            swapEligible: false,
            image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80',
            gallery: [],
            specs: {},
            kind: 'game_install',
            installMeta: {
              platformCategory: 'PS Games',
              sizeGB: 84,
              requirements: ['PS5 / PS4 System Firmware 9.0+']
            },
            description: 'Full game installation directly to your console or external SSD.'
          },
          quantity: 1
        }
      ];
      localStorage.setItem('nas_tech_cart', JSON.stringify(items));
    });

    // Reload page to rehydrate cart from localStorage
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Open Filled Cart Drawer
    console.log('Opening filled cart drawer...');
    const cartBtnFilled = await page.$('button[aria-label*="shopping cart"], button[aria-label*="Cart"]');
    if (cartBtnFilled) {
      await cartBtnFilled.click();
      await new Promise(r => setTimeout(r, 800));
      const filledCartPath = path.join(ARTIFACT_DIR, 'catchy_cart_filled.png');
      await page.screenshot({ path: filledCartPath });
      console.log('Saved:', filledCartPath);

      // Close cart
      const closeBtn = await page.$('button[data-testid="close-cart"], button[aria-label="Close cart"]');
      if (closeBtn) {
        await closeBtn.click();
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // 3. Test Detached Vertical Navigation Drawer
    console.log('Opening detached vertical navigation drawer...');
    // Scroll down past hero so Navbar is in view
    await page.evaluate(() => window.scrollTo(0, 700));
    await new Promise(r => setTimeout(r, 600));

    // Click "Explore Catalog" or toggle menu button
    const menuToggle = await page.$('button[aria-label*="Toggle categories"], button[aria-label="Toggle Navigation Menu"]');
    if (menuToggle) {
      await menuToggle.click();
      await new Promise(r => setTimeout(r, 600));
      const navPath = path.join(ARTIFACT_DIR, 'detached_vertical_navigation.png');
      await page.screenshot({ path: navPath });
      console.log('Saved:', navPath);
    }

    // 4. Mobile view of detached vertical menu
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 800));

    // Click mobile hamburger toggle
    const mobileToggle = await page.$('button[aria-label*="Toggle Navigation Menu"]');
    if (mobileToggle) {
      await mobileToggle.click();
      await new Promise(r => setTimeout(r, 600));
      const mobileNavPath = path.join(ARTIFACT_DIR, 'detached_vertical_navigation_mobile.png');
      await page.screenshot({ path: mobileNavPath });
      console.log('Saved:', mobileNavPath);

      // Close mobile menu
      const closeNav = await page.$('button[aria-label="Close menu"]');
      if (closeNav) {
        await closeNav.click();
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // Mobile view of Cart
    console.log('Opening mobile cart drawer...');
    const mobileCart = await page.$('button[aria-label*="shopping cart"], button[aria-label*="Cart"]');
    if (mobileCart) {
      await mobileCart.click();
      await new Promise(r => setTimeout(r, 900));
      const mobileCartPath = path.join(ARTIFACT_DIR, 'catchy_cart_mobile.png');
      await page.screenshot({ path: mobileCartPath });
      console.log('Saved:', mobileCartPath);
    }

    console.log('All screenshots captured successfully!');
  } finally {
    await browser.close();
  }
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
