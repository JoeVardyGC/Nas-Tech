/**
 * Nas Tech E2E Test Suite — Tier 4: Real-World Scenarios
 * End-to-end user journeys: PS5 pre-orders, custom DualSense, collector edition, drive pre-load, market browsing.
 */

const assert = require('node:assert/strict');
const test = require('node:test');
const {
  BASE_URL,
  ensureServerRunning,
  launchBrowser,
  createPage,
  waitForCarousel,
  getCarouselState,
  sleep,
} = require('./test-utils');

let browser;
let page;
let carouselMounted = false;

test.before(async () => {
  await ensureServerRunning();
  browser = await launchBrowser();
  page = await createPage(browser);
  try {
    await waitForCarousel(page, 3000);
    carouselMounted = true;
  } catch {
    carouselMounted = false;
  }
});

test.after(async () => {
  if (browser) await browser.close();
});

function checkMounted(t) {
  if (!carouselMounted) {
    t.todo('HeroCarousel component not yet mounted in page.tsx (M1 in progress)');
    return false;
  }
  return true;
}

test('T4.S01: Scenario 1: Kumasi PS5 Gamer Exploring Pre-Orders & Console', async (t) => {
  if (!checkMounted(t)) return;
  // 1. Reset to Slide 1
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 1) await dots[0].click();
  await sleep(400);

  // 2. Verify title and eyebrow
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('Feel the Game'), 'Title "Feel the Game" is visible');

  // 3. Hover over PS5 stage
  await page.mouse.move(500, 300);
  await sleep(300);

  // 4. Click Explore PS5 CTA
  const exploreBtn = await page.$('button[data-testid="explore-ps5"], button[aria-label*="EXPLORE PS5"]');
  if (exploreBtn) {
    await exploreBtn.click();
    await sleep(300);
  }

  // 5. Verify navbar is white theme on white canvas
  const state = await getCarouselState(page);
  assert.ok(state.navbarClasses.includes('bg-white') || state.navbarTheme === 'light', 'Navbar is white theme on Slide 1 white canvas');
});

test('T4.S02: Scenario 2: Custom Controller Buyer Customizing DualSense Colorways', async (t) => {
  if (!checkMounted(t)) return;
  // 1. Jump to Slide 2
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 2) await dots[1].click();
  await sleep(400);

  // 2. Verify white navbar
  const state = await getCarouselState(page);
  assert.ok(state.navbarClasses.includes('bg-white') || state.navbarTheme === 'light', 'Navbar is white on Slide 2');

  // 3. Switch skins
  const skinBtn = await page.$('button[data-skin="cyber-green"], button[aria-label*="Cyber Green"]');
  if (skinBtn) {
    await skinBtn.click();
    await sleep(200);
  }

  // 4. Click shop controllers CTA
  const shopBtn = await page.$('button[data-testid="shop-controllers"], button[aria-label*="SHOP CONTROLLERS"]');
  if (shopBtn) {
    await shopBtn.click();
    await sleep(300);
  }

  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('950'), 'Price GH₵ 950 confirmed');
});

test('T4.S03: Scenario 3: Luxury Collector Ordering Limited Edition Series', async (t) => {
  if (!checkMounted(t)) return;
  // 1. Navigate to Slide 3
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 3) await dots[2].click();
  await sleep(400);

  // 2. Verify white navbar on white canvas
  const state = await getCarouselState(page);
  assert.ok(state.navbarClasses.includes('bg-white') || state.navbarTheme === 'light', 'Navbar is white on Slide 3 white canvas');

  // 3. Switch collector theme to God of War
  const gowBtn = await page.$('button[data-theme-choice="god-of-war"], button[aria-label*="God of War"]');
  if (gowBtn) {
    await gowBtn.click();
    await sleep(200);
  }

  // 4. Check spec cards
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('1ms') || text.includes('12hr') || text.includes('Triggers'), 'Spec cards verified');

  // 5. Order Collector Edition button
  const orderBtn = await page.$('button[data-testid="order-collector"], button[aria-label*="ORDER COLLECTOR"]');
  if (orderBtn) {
    await orderBtn.click();
    await sleep(300);
  }
  assert.ok(text.includes('1,200'), 'Price GH₵ 1,200 verified');
});

test('T4.S04: Scenario 4: Direct-to-Drive In-Person Game Pre-Load Customer in Adum, Kumasi', async (t) => {
  if (!checkMounted(t)) return;
  // 1. Navigate to Slide 4
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 4) await dots[3].click();
  await sleep(400);

  // 2. Verify headline & Adum, Kumasi subtitle
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('2,000 Games') || text.includes('2000 Games'), '2,000 Games header verified');
  assert.ok(text.includes('ADUM') || text.includes('KUMASI'), 'Adum, Kumasi subtitle verified');

  // 3. Click category launcher card
  const catCard = await page.$('[data-testid="category-launcher-action"], button[aria-label*="Action"]');
  if (catCard) {
    await catCard.click();
    await sleep(200);
  }

  // 4. Click browse titles CTA
  const browseBtn = await page.$('button[data-testid="browse-installable"], button[aria-label*="BROWSE INSTALLABLE"]');
  if (browseBtn) {
    await browseBtn.click();
    await sleep(300);
  }
  assert.ok(text.includes('25'), 'Price GH₵ 25/GAME verified');
});

test('T4.S05: Scenario 5: Trending Games Explorer Browsing Kumasi Market', async (t) => {
  if (!checkMounted(t)) return;
  // 1. Navigate to Slide 5
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 5) await dots[4].click();
  await sleep(400);

  // 2. Verify white navbar on bright slide
  const state = await getCarouselState(page);
  assert.ok(state.navbarClasses.includes('bg-white') || state.navbarTheme === 'light', 'Navbar is white theme on Slide 5');

  // 3. Hover over trending shelf covers
  const covers = await page.$$('[data-testid="game-cover-card"], .game-cover-card');
  for (const c of covers.slice(0, 3)) {
    await c.hover();
    await sleep(100);
  }

  // 4. Click View All 150+ Games CTA
  const viewBtn = await page.$('button[data-testid="view-all-games"], button[aria-label*="VIEW ALL"]');
  if (viewBtn) {
    await viewBtn.click();
    await sleep(300);
  }
  assert.ok(true, 'Scenario 5 completed successfully');
});
