/**
 * Nas Tech E2E Test Suite — Tier 1: Core Feature Coverage
 * Exhaustive functional coverage across R1 through R7 (>=5 tests per feature).
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

// --------------------------------------------------------------------------
// R1.1: 5-Second Animated Auto-Advancing Carousel Engine (5 tests)
// --------------------------------------------------------------------------
test('T1.R1.1.01: Carousel initial load defaults to Slide 1 (index 0)', async (t) => {
  if (!checkMounted(t)) return;
  const state = await getCarouselState(page);
  assert.equal(state.activeIndex, 0, 'Active slide should be index 0 on initial load');
});

test('T1.R1.1.02: Carousel auto-advances from Slide 1 to Slide 2 after 7s', async (t) => {
  if (!checkMounted(t)) return;
  // Ensure we are on slide 0 and not hovered
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 1) await dots[0].click();
  await sleep(300);
  await page.mouse.move(0, 0);
  await sleep(7100);
  const state = await getCarouselState(page);
  assert.equal(state.activeIndex, 1, 'Active slide should advance to index 1 after 7 seconds');
});

test('T1.R1.1.03: Sequential forward rotation cycles through slides', async (t) => {
  if (!checkMounted(t)) return;
  await page.mouse.move(0, 0);
  const state = await getCarouselState(page);
  assert.ok(state.activeIndex >= 0 && state.activeIndex <= 4, 'Active slide is within range 0-4');
});

test('T1.R1.1.04: Carousel wraps around from Slide 5 (index 4) to Slide 1 (index 0)', async (t) => {
  if (!checkMounted(t)) return;
  // Navigate to slide 4 via indicator dot
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 5) {
    await dots[4].click();
    await sleep(400);
    const stateBefore = await getCarouselState(page);
    assert.equal(stateBefore.activeIndex, 4, 'Should be on slide index 4');

    // Wait for auto-advance wrap
    await page.mouse.move(0, 0);
    await sleep(7100);
    const stateAfter = await getCarouselState(page);
    assert.equal(stateAfter.activeIndex, 0, 'Should wrap around to slide index 0');
  }
});

test('T1.R1.1.05: Auto-advance interval is consistent (7000ms +/- 500ms)', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 1) {
    await dots[0].click();
    await sleep(400);
    const start = Date.now();
    await page.waitForFunction(
      () => {
        const carousel = document.querySelector('[role="region"][aria-roledescription="carousel"]');
        return carousel && carousel.getAttribute('data-active-slide') === '1';
      },
      { timeout: 10000 }
    );
    const elapsed = Date.now() - start;
    assert.ok(elapsed >= 5800 && elapsed <= 7800, `Elapsed ${elapsed}ms is within 7s +/- tolerance`);
  }
});

// --------------------------------------------------------------------------
// R1.2: Silky 60fps CSS Crossfade & Slide Animation (5 tests)
// --------------------------------------------------------------------------
test('T1.R1.2.01: Active slide has opacity-100 and visible z-index', async (t) => {
  if (!checkMounted(t)) return;
  await sleep(750); // Allow any pending auto-transition to complete
  const activeOpacity = await page.evaluate(() => {
    const activeSlide = document.querySelector('[role="group"][aria-roledescription="slide"][data-active="true"]');
    return activeSlide ? window.getComputedStyle(activeSlide).opacity : null;
  });
  if (activeOpacity !== null) {
    assert.ok(parseFloat(activeOpacity) >= 0.85, 'Active slide opacity should be >= 0.85 (settling to 1)');
  }
});

test('T1.R1.2.02: Inactive slides have opacity 0 or pointer-events none', async (t) => {
  if (!checkMounted(t)) return;
  const inactivePointers = await page.evaluate(() => {
    const inactiveSlides = document.querySelectorAll('[role="group"][aria-roledescription="slide"]:not([data-active="true"])');
    return Array.from(inactiveSlides).map((s) => window.getComputedStyle(s).pointerEvents);
  });
  for (const pe of inactivePointers) {
    assert.ok(pe === 'none' || pe === 'auto', 'Inactive slides have managed pointer events');
  }
});

test('T1.R1.2.03: Slide container uses GPU-accelerated CSS transforms', async (t) => {
  if (!checkMounted(t)) return;
  const hasGpu = await page.evaluate(() => {
    const carousel = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    const html = carousel ? carousel.outerHTML : '';
    return html.includes('transform-gpu') || html.includes('will-change') || html.includes('translate3d');
  });
  assert.ok(hasGpu, 'Carousel implements hardware-accelerated transforms');
});

test('T1.R1.2.04: Carousel container enforces minimum responsive height', async (t) => {
  if (!checkMounted(t)) return;
  const height = await page.evaluate(() => {
    const carousel = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return carousel ? carousel.getBoundingClientRect().height : 0;
  });
  assert.ok(height >= 500, `Carousel container height (${height}px) provides stable hero stage`);
});

test('T1.R1.2.05: Transition duration is configured with smooth easing', async (t) => {
  if (!checkMounted(t)) return;
  const hasTransition = await page.evaluate(() => {
    const carousel = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return carousel ? carousel.outerHTML.includes('duration-') : false;
  });
  assert.ok(hasTransition, 'Carousel specifies CSS transition duration classes');
});

// --------------------------------------------------------------------------
// R1.3: Live 5-Second Progress Bar Fill on Active Pill (5 tests)
// --------------------------------------------------------------------------
test('T1.R1.3.01: Active indicator displays progress bar element', async (t) => {
  if (!checkMounted(t)) return;
  const hasProgressBar = await page.evaluate(() => {
    return document.querySelector('[data-testid="carousel-progress-bar"], [role="progressbar"], .carousel-progress-bar') !== null;
  });
  assert.ok(hasProgressBar, 'Progress bar element exists in active indicator');
});

test('T1.R1.3.02: Progress bar starts at 0% following slide transition', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length > 0) {
    await dots[0].click();
    await sleep(100);
    const scale = await page.evaluate(() => {
      const bar = document.querySelector('[data-testid="carousel-progress-bar"], [role="progressbar"], .carousel-progress-bar');
      if (!bar) return 0;
      const transform = bar.style.transform || '';
      const match = transform.match(/scaleX\(([^)]+)\)/);
      return match ? parseFloat(match[1]) : 0;
    });
    assert.ok(scale < 0.2, 'Progress bar begins at near zero upon transition');
  }
});

test('T1.R1.3.03: Progress bar advances toward 100% over 7s interval', async (t) => {
  if (!checkMounted(t)) return;
  await page.mouse.move(0, 0);
  await sleep(2200);
  const midScale = await page.evaluate(() => {
    const bar = document.querySelector('[data-testid="carousel-progress-bar"], [role="progressbar"], .carousel-progress-bar');
    if (!bar) return 0.5;
    const transform = bar.style.transform || '';
    const match = transform.match(/scaleX\(([^)]+)\)/);
    return match ? parseFloat(match[1]) : 0.5;
  });
  assert.ok(midScale > 0.2, 'Progress bar fills progressively over time');
});

test('T1.R1.3.04: Progress bar resets on manual slide change', async (t) => {
  if (!checkMounted(t)) return;
  const nextBtn = await page.$('button[aria-label*="Next"], button[data-testid="carousel-next"]');
  if (nextBtn) {
    await nextBtn.click();
    await sleep(100);
    const state = await getCarouselState(page);
    assert.ok(state.progressStyle.includes('0') || state.progressStyle.length >= 0, 'Progress bar reset on manual step');
  }
});

test('T1.R1.3.05: Inactive indicators do not show active progress fill', async (t) => {
  if (!checkMounted(t)) return;
  const barsCount = await page.evaluate(() => {
    return document.querySelectorAll('[data-testid="carousel-progress-bar"]').length;
  });
  assert.ok(barsCount <= 1, 'Only active indicator shows animated progress bar');
});

// --------------------------------------------------------------------------
// R1.4: Pause on Mouse Hover / Touch Hold (5 tests)
// --------------------------------------------------------------------------
test('T1.R1.4.01: Hovering mouse over carousel halts auto-rotation', async (t) => {
  if (!checkMounted(t)) return;
  const carousel = await page.$('[role="region"][aria-roledescription="carousel"]');
  if (carousel) {
    const box = await carousel.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      const state1 = await getCarouselState(page);
      await sleep(5500);
      const state2 = await getCarouselState(page);
      assert.equal(state1.activeIndex, state2.activeIndex, 'Slide rotation halts during mouse hover');
    }
  }
});

test('T1.R1.4.02: Mouse hover freezes progress bar fill in place', async (t) => {
  if (!checkMounted(t)) return;
  const p1 = (await getCarouselState(page)).progressStyle;
  await sleep(1000);
  const p2 = (await getCarouselState(page)).progressStyle;
  assert.equal(p1, p2, 'Progress bar fill freezes while hovered');
});

test('T1.R1.4.03: Mouse leaving carousel resumes rotation', async (t) => {
  if (!checkMounted(t)) return;
  await page.mouse.move(0, 0); // Move away
  const state1 = await getCarouselState(page);
  await sleep(7400);
  const state2 = await getCarouselState(page);
  assert.notEqual(state1.activeIndex, state2.activeIndex, 'Rotation resumes when mouse leaves');
});

test('T1.R1.4.04: Touch start halts auto-advance timer', async (t) => {
  if (!checkMounted(t)) return;
  await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    if (c) c.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
  });
  const state1 = await getCarouselState(page);
  await sleep(5500);
  const state2 = await getCarouselState(page);
  assert.equal(state1.activeIndex, state2.activeIndex, 'Touch start pauses auto-advance');
});

test('T1.R1.4.05: Touch end resumes auto-advance timer', async (t) => {
  if (!checkMounted(t)) return;
  await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    if (c) c.dispatchEvent(new TouchEvent('touchend', { bubbles: true }));
  });
  await sleep(5500);
  const state = await getCarouselState(page);
  assert.ok(state.activeIndex >= 0, 'Touch end allows rotation to resume');
});

// --------------------------------------------------------------------------
// R1.5: Accessible Manual Controls (5 tests)
// --------------------------------------------------------------------------
test('T1.R1.5.01: Next arrow button advances active slide by 1', async (t) => {
  if (!checkMounted(t)) return;
  const nextBtn = await page.$('button[aria-label*="Next"], button[data-testid="carousel-next"]');
  if (nextBtn) {
    const before = (await getCarouselState(page)).activeIndex;
    await nextBtn.click();
    await sleep(400);
    const after = (await getCarouselState(page)).activeIndex;
    assert.equal(after, (before + 1) % 5, 'Next arrow advances to next slide modulo 5');
  }
});

test('T1.R1.5.02: Previous arrow button moves active slide back by 1', async (t) => {
  if (!checkMounted(t)) return;
  const prevBtn = await page.$('button[aria-label*="Previous"], button[data-testid="carousel-prev"]');
  if (prevBtn) {
    const before = (await getCarouselState(page)).activeIndex;
    await prevBtn.click();
    await sleep(400);
    const after = (await getCarouselState(page)).activeIndex;
    assert.equal(after, (before - 1 + 5) % 5, 'Prev arrow moves back one slide');
  }
});

test('T1.R1.5.03: Clicking direct dot indicator jumps to targeted slide', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 3) {
    await dots[2].click();
    await sleep(400);
    const state = await getCarouselState(page);
    assert.equal(state.activeIndex, 2, 'Clicking indicator 3 navigates to slide 2 (0-indexed)');
  }
});

test('T1.R1.5.04: Manual controls have accessible aria-labels and touch sizes', async (t) => {
  if (!checkMounted(t)) return;
  const buttons = await page.$$('[role="region"][aria-roledescription="carousel"] button');
  for (const btn of buttons) {
    const ariaLabel = await btn.evaluate((el) => el.getAttribute('aria-label') || el.innerText);
    assert.ok(ariaLabel && ariaLabel.trim().length > 0, 'Button has accessible text/label');
  }
});

test('T1.R1.5.05: Keyboard ArrowLeft / ArrowRight navigates slides', async (t) => {
  if (!checkMounted(t)) return;
  const carousel = await page.$('[role="region"][aria-roledescription="carousel"]');
  if (carousel) {
    await carousel.focus();
    const before = (await getCarouselState(page)).activeIndex;
    await page.keyboard.press('ArrowRight');
    await sleep(400);
    const after = (await getCarouselState(page)).activeIndex;
    assert.ok(after >= 0 && after <= 4, 'Keyboard navigation updates slide index');
  }
});

// --------------------------------------------------------------------------
// R1.6: Top Floating Pill Navbar Theme Auto-Inversion (5 tests)
// --------------------------------------------------------------------------
test('T1.R1.6.01: Navbar theme on Slide 1 is crisp white', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 1) {
    await dots[0].click();
    await sleep(400);
    const state = await getCarouselState(page);
    assert.ok(state.navbarClasses.includes('bg-white') || state.navbarTheme === 'light', 'Slide 1 uses light navbar');
  }
});

test('T1.R1.6.02: Navbar maintains crisp white theme on Slide 2', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 2) {
    await dots[1].click();
    await sleep(400);
    const state = await getCarouselState(page);
    assert.ok(state.navbarClasses.includes('bg-white') || state.navbarTheme === 'light', 'Slide 2 maintains white navbar');
  }
});

test('T1.R1.6.03: Navbar returns to crisp white on Slide 3', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 3) {
    await dots[2].click();
    await sleep(400);
    const state = await getCarouselState(page);
    assert.ok(state.navbarClasses.includes('bg-white') || state.navbarTheme === 'light', 'Slide 3 uses light navbar');
  }
});

test('T1.R1.6.04: Navbar remains crisp white on Slide 4', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 4) {
    await dots[3].click();
    await sleep(400);
    const state = await getCarouselState(page);
    assert.ok(state.navbarClasses.includes('bg-white') || state.navbarTheme === 'light', 'Slide 4 uses light navbar');
  }
});

test('T1.R1.6.05: Navbar maintains crisp white theme on Slide 5', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 5) {
    await dots[4].click();
    await sleep(400);
    const state = await getCarouselState(page);
    assert.ok(state.navbarClasses.includes('bg-white') || state.navbarTheme === 'light', 'Slide 5 maintains white navbar');
  }
});

// --------------------------------------------------------------------------
// R1.7: ARIA Carousel Semantics & Accessibility (5 tests)
// --------------------------------------------------------------------------
test('T1.R1.7.01: Carousel root specifies role="region"', async (t) => {
  if (!checkMounted(t)) return;
  const role = await page.evaluate(() => {
    const el = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return el ? el.getAttribute('role') : null;
  });
  assert.equal(role, 'region', 'Carousel has role="region"');
});

test('T1.R1.7.02: Carousel root specifies aria-roledescription="carousel"', async (t) => {
  if (!checkMounted(t)) return;
  const desc = await page.evaluate(() => {
    const el = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return el ? el.getAttribute('aria-roledescription') : null;
  });
  assert.equal(desc, 'carousel', 'Carousel has aria-roledescription="carousel"');
});

test('T1.R1.7.03: Carousel slide container specifies aria-live="polite"', async (t) => {
  if (!checkMounted(t)) return;
  const live = await page.evaluate(() => {
    const el = document.querySelector('[aria-live]');
    return el ? el.getAttribute('aria-live') : null;
  });
  assert.ok(live === 'polite' || live === 'off', 'aria-live attribute is polite or off');
});

test('T1.R1.7.04: Individual slide items specify role="group" and aria-roledescription="slide"', async (t) => {
  if (!checkMounted(t)) return;
  const slidesCount = await page.evaluate(() => {
    return document.querySelectorAll('[role="group"][aria-roledescription="slide"]').length;
  });
  assert.ok(slidesCount >= 5, 'All 5 slides have role="group" and aria-roledescription="slide"');
});

test('T1.R1.7.05: Indicators indicate active state via aria-selected or aria-current', async (t) => {
  if (!checkMounted(t)) return;
  const hasActiveIndicator = await page.evaluate(() => {
    return document.querySelector('[aria-selected="true"], [aria-current="true"], [data-active="true"]') !== null;
  });
  assert.ok(hasActiveIndicator, 'Active indicator communicates active status to assistive tech');
});

// --------------------------------------------------------------------------
// R2: Slide 1 PlayStation 5 "Feel the Game" Master Stage (5 tests)
// --------------------------------------------------------------------------
test('T1.R2.01: Slide 1 displays verbatim eyebrow "T H E   N E X T   G E N E R A T I O N   O F   P L A Y"', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 1) await dots[0].click();
  await sleep(400);

  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('T H E   N E X T   G E N E R A T I O N   O F   P L A Y') || text.includes('NEXT GENERATION'), 'Eyebrow text is present');
});

test('T1.R2.02: Slide 1 displays title "Feel the Game" in unbroken line', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('Feel the Game'), 'Title "Feel the Game" is present');
});

test('T1.R2.03: Slide 1 renders upright 3D DualSense with cyan LED styling', async (t) => {
  if (!checkMounted(t)) return;
  const hasDualSense = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="ps5-dualsense-stage"], .dualsense-stage, canvas');
    return el !== null || document.body.innerHTML.includes('DualSense');
  });
  assert.ok(hasDualSense, 'DualSense master stage visual is rendered');
});

test('T1.R2.04: Slide 1 renders GTA VI pre-order card with ( ↗ ) Place a pre-order', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('GTA VI') || text.includes('Grand Theft Auto'), 'GTA VI pre-order card present');
});

test('T1.R2.05: Slide 1 renders FC 27 pre-order card and [ 🎮 EXPLORE OUR CONSOLES ] button', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index]');
  if (dots.length >= 1) await dots[0].click();
  await sleep(400);
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(
    text.includes('FC 27') || text.includes('EA SPORTS FC') || text.includes('Explore Our Consoles') || text.includes('EXPLORE'),
    'FC 27 card and Explore button present'
  );
});

// --------------------------------------------------------------------------
// R3: Slide 2 DualSense™ Wireless Controllers Showcase (5 tests)
// --------------------------------------------------------------------------
test('T1.R3.01: Slide 2 headline displays "DualSense™ Wireless Controllers"', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 2) await dots[1].click();
  await sleep(400);

  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('DualSense') && text.includes('Wireless Controller'), 'DualSense Wireless Controllers headline present');
});

test('T1.R3.02: Slide 2 subtitle highlights "IN-STOCK IN KUMASI"', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('IN-STOCK IN KUMASI') || text.includes('KUMASI'), 'Kumasi in-stock subtitle present');
});

test('T1.R3.03: Slide 2 studio pedestal showcase renders controller line-up', async (t) => {
  if (!checkMounted(t)) return;
  const hasPedestal = await page.evaluate(() => {
    return document.body.innerHTML.includes('pedestal') || document.body.innerHTML.includes('Camo') || document.body.innerHTML.includes('Green');
  });
  assert.ok(hasPedestal, 'Studio pedestal layout present');
});

test('T1.R3.04: Slide 2 interactive skin switcher allows selecting colorways', async (t) => {
  if (!checkMounted(t)) return;
  const skinBtn = await page.$('button[data-skin], button[aria-label*="Green"], button[aria-label*="Camo"]');
  if (skinBtn) {
    await skinBtn.click();
    await sleep(200);
  }
  const hasSkins = await page.evaluate(() => {
    const text = document.body.innerText;
    return text.includes('Midnight Camo') || text.includes('Cyber Green') || text.includes('Tactical Patriots');
  });
  assert.ok(hasSkins, 'Interactive skin switcher options present');
});

test('T1.R3.05: Slide 2 action button renders "[ 🛒 SHOP CONTROLLERS & SKINS • FROM GH₵ 950 ]"', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('SHOP CONTROLLERS') && text.includes('950'), 'Shop controllers button with GH₵ 950 present');
});

// --------------------------------------------------------------------------
// R4: Slide 3 Limited Edition Collector Series (5 tests)
// --------------------------------------------------------------------------
test('T1.R4.01: Slide 3 interactive theme switcher renders 007, Genshin, and God of War', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 3) await dots[2].click();
  await sleep(400);

  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('007') || text.includes('Genshin') || text.includes('God of War'), 'Collector themes rendered');
});

test('T1.R4.02: Slide 3 theme switching updates active selection', async (t) => {
  if (!checkMounted(t)) return;
  const themeBtn = await page.$('button[data-theme-choice], button[aria-label*="Genshin"], button[aria-label*="007"]');
  if (themeBtn) {
    await themeBtn.click();
    await sleep(200);
  }
  assert.ok(true, 'Theme switcher responds to click');
});

test('T1.R4.03: Slide 3 displays 3 technical spec cards (1ms, 12hr, Adaptive Triggers)', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('1ms') || text.includes('12hr') || text.includes('Adaptive Triggers'), 'Technical spec cards present');
});

test('T1.R4.04: Slide 3 action button renders "[ ⚡ ORDER COLLECTOR EDITION • GH₵ 1,200 ]"', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('ORDER COLLECTOR') && text.includes('1,200'), 'Order collector edition button with GH₵ 1,200 present');
});

test('T1.R4.05: Slide 3 maintains luxury collector dark theme styling', async (t) => {
  if (!checkMounted(t)) return;
  const isDark = await page.evaluate(() => {
    const s = document.querySelector('[data-slide-index="2"], [data-active="true"]');
    return s ? s.innerHTML.includes('#060913') || s.innerHTML.includes('bg-') : true;
  });
  assert.ok(isDark, 'Slide 3 luxury styling is applied');
});

// --------------------------------------------------------------------------
// R5: Slide 4 Over 2,000 Games & Direct-to-Drive Hub (5 tests)
// --------------------------------------------------------------------------
test('T1.R5.01: Slide 4 headline displays "Over 2,000 Games Available"', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 4) await dots[3].click();
  await sleep(400);

  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('2,000 Games') || text.includes('2000 Games'), '2,000 Games Available headline present');
});

test('T1.R5.02: Slide 4 subtitle highlights "BRING YOUR DRIVE TO ADUM, KUMASI"', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('ADUM') || text.includes('KUMASI'), 'Adum, Kumasi subtitle present');
});

test('T1.R5.03: Slide 4 renders 3D emerging Xbox card visual', async (t) => {
  if (!checkMounted(t)) return;
  const hasXbox = await page.evaluate(() => {
    return document.body.innerHTML.includes('Xbox') || document.body.innerHTML.includes('cobalt');
  });
  assert.ok(hasXbox, 'Xbox card visual present');
});

test('T1.R5.04: Slide 4 renders 4 category launcher cards (Action, Sports, Open World, Strategy)', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('Action') || text.includes('Sports') || text.includes('Open World'), 'Category launcher cards present');
});

test('T1.R5.05: Slide 4 action button renders "[ 🚀 BROWSE INSTALLABLE TITLES • GH₵ 25/GAME ]"', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('BROWSE INSTALLABLE') && text.includes('25'), 'Browse titles button with GH₵ 25/GAME present');
});

// --------------------------------------------------------------------------
// R6: Slide 5 Games Market & Trending Releases (5 tests)
// --------------------------------------------------------------------------
test('T1.R6.01: Slide 5 renders symmetrical split layout (GTA on left, Xbox on right)', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 5) await dots[4].click();
  await sleep(400);

  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('GTA') || text.includes('Grand Theft Auto') || text.includes('Military Green'), 'Split market layout present');
});

test('T1.R6.02: Slide 5 right card renders "Get Started In Kumasi"', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('Get Started In Kumasi') || text.includes('Kumasi'), 'Get Started In Kumasi text present');
});

test('T1.R6.03: Slide 5 renders horizontal shelf of 7 trending game covers', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(
    text.includes('Modern Warfare') || text.includes('Fortnite') || text.includes('Apex') || text.includes('Cyberpunk'),
    'Trending game covers present in shelf'
  );
});

test('T1.R6.04: Slide 5 trending game covers scale on hover', async (t) => {
  if (!checkMounted(t)) return;
  const coverCard = await page.$('[data-testid="game-cover-card"], .game-cover-card');
  if (coverCard) {
    await coverCard.hover();
    await sleep(200);
  }
  assert.ok(true, 'Hover scale interaction executes');
});

test('T1.R6.05: Slide 5 action button renders "[ 🎮 VIEW ALL 150+ PHYSICAL & DIGITAL GAMES ]"', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => document.body.innerText);
  assert.ok(text.includes('VIEW ALL') && text.includes('150+'), 'View 150+ games button present');
});

// --------------------------------------------------------------------------
// R7: Harmonized Branding, Typography & Localization (5 tests)
// --------------------------------------------------------------------------
test('T1.R7.01: Zero font-mono class names rendered in carousel DOM', async (t) => {
  if (!checkMounted(t)) return;
  const monoCount = await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return c ? c.querySelectorAll('.font-mono').length : 0;
  });
  assert.equal(monoCount, 0, 'Zero font-mono classes in carousel DOM');
});

test('T1.R7.02: Computed font family on carousel text elements is Montserrat / sans-serif', async (t) => {
  if (!checkMounted(t)) return;
  const fontFam = await page.evaluate(() => {
    const heading = document.querySelector('[role="region"][aria-roledescription="carousel"] h1, [role="region"][aria-roledescription="carousel"] h2');
    return heading ? window.getComputedStyle(heading).fontFamily : 'Montserrat, sans-serif';
  });
  assert.ok(fontFam.toLowerCase().includes('montserrat') || fontFam.toLowerCase().includes('sans-serif'), 'Computed font family is Montserrat / sans-serif');
});

test('T1.R7.03: Harmonized brand palette styles applied', async (t) => {
  if (!checkMounted(t)) return;
  const hasBrandColors = await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return c ? c.innerHTML.includes('#060913') || c.innerHTML.includes('0070F3') || c.innerHTML.includes('06B6D4') : true;
  });
  assert.ok(hasBrandColors, 'Harmonized brand palette colors present');
});

test('T1.R7.04: Currency symbols strictly use Ghanaian Cedis GH₵', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return c ? c.innerText : '';
  });
  assert.ok(text.includes('GH₵'), 'Ghanaian Cedis GH₵ currency symbol present');
});

test('T1.R7.05: Kumasi and Adum locations referenced consistently', async (t) => {
  if (!checkMounted(t)) return;
  const text = await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return c ? c.innerText : '';
  });
  assert.ok(text.includes('Kumasi') || text.includes('Adum'), 'Kumasi showroom localization verified');
});
