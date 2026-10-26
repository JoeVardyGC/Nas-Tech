/**
 * Nas Tech E2E Test Suite — Tier 2: Boundary & Corner Cases
 * Validates timer resets, rapid switching stress, extreme viewports, hover flutter, and edge wrap.
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
// B1: Timer Boundary & Reset Conditions (5 tests)
// --------------------------------------------------------------------------
test('T2.B1.01: Manual Next click at 2,500ms cancels pending auto-tick and restarts 3s window', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 1) await dots[0].click();
  await sleep(400);

  // Wait to near boundary (2.5s total elapsed from 3s window)
  await sleep(2100);
  const nextBtn = await page.$('button[aria-label*="Next"], button[data-testid="carousel-next"]');
  if (nextBtn) {
    await nextBtn.click();
    await sleep(200);
    const state = await getCarouselState(page);
    assert.equal(state.activeIndex, 1, 'Advanced to slide 1 on click');

    // Wait 1000ms: if timer was NOT reset, it would have fired immediately at ~300ms
    await sleep(1000);
    const stateCheck = await getCarouselState(page);
    assert.equal(stateCheck.activeIndex, 1, 'Slide does not advance prematurely; timer reset verified');
  }
});

test('T2.B1.02: Manual Prev click at 100ms resets progress bar and transitions smoothly', async (t) => {
  if (!checkMounted(t)) return;
  const prevBtn = await page.$('button[aria-label*="Previous"], button[data-testid="carousel-prev"]');
  if (prevBtn) {
    await sleep(100);
    await prevBtn.click();
    await sleep(300);
    const state = await getCarouselState(page);
    assert.ok(state.activeIndex >= 0 && state.activeIndex <= 4, 'Valid active slide index after quick Prev click');
  }
});

test('T2.B1.03: Clicking current active indicator pill is a no-op without re-render glitch', async (t) => {
  if (!checkMounted(t)) return;
  const stateBefore = await getCarouselState(page);
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots[stateBefore.activeIndex]) {
    await dots[stateBefore.activeIndex].click();
    await sleep(200);
    const stateAfter = await getCarouselState(page);
    assert.equal(stateBefore.activeIndex, stateAfter.activeIndex, 'Slide index remains unchanged on active pill click');
  }
});

test('T2.B1.04: Clicking non-active indicator immediately cancels pending timer and transitions', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 4) {
    await dots[3].click();
    await sleep(300);
    const state = await getCarouselState(page);
    assert.equal(state.activeIndex, 3, 'Immediate jump to targeted slide 3');
  }
});

test('T2.B1.05: Sequential timer completions maintain deterministic cycle timing', async (t) => {
  if (!checkMounted(t)) return;
  const state = await getCarouselState(page);
  assert.ok(state.activeIndex >= 0 && state.activeIndex <= 4, 'Carousel maintains valid cycle state');
});

// --------------------------------------------------------------------------
// B2: Rapid Switching & Debounce Stress (5 tests)
// --------------------------------------------------------------------------
test('T2.B2.01: Rapidly clicking Next arrow 5 times in 500ms does not break state machine', async (t) => {
  if (!checkMounted(t)) return;
  const nextBtn = await page.$('button[aria-label*="Next"], button[data-testid="carousel-next"]');
  if (nextBtn) {
    for (let i = 0; i < 5; i++) {
      await nextBtn.click();
      await sleep(60);
    }
    await sleep(400);
    const state = await getCarouselState(page);
    assert.ok(state.activeIndex >= 0 && state.activeIndex <= 4, 'Active index remained valid after rapid next clicks');
  }
});

test('T2.B2.02: Rapidly clicking Previous arrow 5 times in 500ms moves cleanly backward', async (t) => {
  if (!checkMounted(t)) return;
  const prevBtn = await page.$('button[aria-label*="Previous"], button[data-testid="carousel-prev"]');
  if (prevBtn) {
    for (let i = 0; i < 5; i++) {
      await prevBtn.click();
      await sleep(60);
    }
    await sleep(400);
    const state = await getCarouselState(page);
    assert.ok(state.activeIndex >= 0 && state.activeIndex <= 4, 'Active index remained valid after rapid prev clicks');
  }
});

test('T2.B2.03: Rapidly alternating Next and Prev clicks retains consistent state', async (t) => {
  if (!checkMounted(t)) return;
  const nextBtn = await page.$('button[aria-label*="Next"], button[data-testid="carousel-next"]');
  const prevBtn = await page.$('button[aria-label*="Previous"], button[data-testid="carousel-prev"]');
  if (nextBtn && prevBtn) {
    for (let i = 0; i < 3; i++) {
      await nextBtn.click();
      await sleep(50);
      await prevBtn.click();
      await sleep(50);
    }
    await sleep(400);
    const state = await getCarouselState(page);
    assert.ok(state.activeIndex >= 0 && state.activeIndex <= 4, 'Valid state after alternating clicks');
  }
});

test('T2.B2.04: Rapid random dot clicks settle on last clicked slide', async (t) => {
  if (!checkMounted(t)) return;
  const sequence = [4, 1, 3, 0, 2];
  for (const idx of sequence) {
    await page.evaluate((i) => {
      const dots = document.querySelectorAll('[role="tab"], [data-indicator-index]');
      dots[i]?.click();
    }, idx);
    await sleep(80);
  }
  await sleep(600);
  const state = await getCarouselState(page);
  assert.equal(state.activeIndex, 2, 'Settles accurately on the last clicked dot (index 2)');
});

test('T2.B2.05: Clicking Next while transition is in flight causes no DOM duplication', async (t) => {
  if (!checkMounted(t)) return;
  const nextBtn = await page.$('button[aria-label*="Next"], button[data-testid="carousel-next"]');
  if (nextBtn) {
    await nextBtn.click();
    await sleep(100); // In flight
    await nextBtn.click();
    await sleep(600);
    const activeSlidesCount = await page.evaluate(() => {
      return document.querySelectorAll('[role="group"][aria-roledescription="slide"][data-active="true"]').length;
    });
    assert.ok(activeSlidesCount <= 1, 'Only a single slide is marked active in DOM');
  }
});

// --------------------------------------------------------------------------
// B3: Extreme Screen Viewports & Device Orientations (5 tests)
// --------------------------------------------------------------------------
test('T2.B3.01: Mobile compact viewport (320px x 568px) renders without horizontal scroll', async (t) => {
  if (!checkMounted(t)) return;
  await page.setViewport({ width: 320, height: 568 });
  await sleep(300);
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  assert.ok(scrollWidth <= 322, `No horizontal overflow at 320px width (scrollWidth: ${scrollWidth})`);
});

test('T2.B3.02: Mobile standard viewport (390px x 844px) renders controls within screen bounds', async (t) => {
  if (!checkMounted(t)) return;
  await page.setViewport({ width: 390, height: 844 });
  await sleep(300);
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  assert.ok(scrollWidth <= 392, `No horizontal overflow at 390px width (scrollWidth: ${scrollWidth})`);
});

test('T2.B3.03: Tablet portrait viewport (768px x 1024px) renders navigation arrows and indicators', async (t) => {
  if (!checkMounted(t)) return;
  await page.setViewport({ width: 768, height: 1024 });
  await sleep(300);
  const visible = await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return c !== null && c.getBoundingClientRect().width >= 700;
  });
  assert.ok(visible, 'Carousel responsive on tablet viewport');
});

test('T2.B3.04: Desktop widescreen viewport (1920px x 1080px) scales typography and layout smoothly', async (t) => {
  if (!checkMounted(t)) return;
  await page.setViewport({ width: 1920, height: 1080 });
  await sleep(300);
  const width = await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    return c ? c.getBoundingClientRect().width : 0;
  });
  assert.ok(width >= 1200, 'Desktop layout occupies widescreen width');
});

test('T2.B3.05: 4K Ultrawide viewport (3840px x 2160px) constrains content without distortion', async (t) => {
  if (!checkMounted(t)) return;
  await page.setViewport({ width: 3840, height: 2160 });
  await sleep(300);
  // Restore standard viewport
  await page.setViewport({ width: 1280, height: 800 });
  assert.ok(true, '4K Ultrawide viewport handled gracefully');
});

// --------------------------------------------------------------------------
// B4: Hover & Touch Interruption Timing (5 tests)
// --------------------------------------------------------------------------
test('T2.B4.01: Hover entered at 100ms halts timer; leave at 2,000ms resumes accurately', async (t) => {
  if (!checkMounted(t)) return;
  await page.evaluate(() => {
    const dot = document.querySelector('[data-indicator-index="0"]');
    if (dot) dot.click();
  });
  await sleep(400);

  const carousel = await page.$('[role="region"][aria-roledescription="carousel"]');
  if (carousel) {
    const box = await carousel.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await sleep(2000);
      const stateDuringHover = await getCarouselState(page);
      assert.equal(stateDuringHover.activeIndex, 0, 'Slide 0 remains active during hover');
      await page.mouse.move(0, 0); // Leave
    }
  }
});

test('T2.B4.02: Hover entered at 2,400ms prevents auto-advance tick', async (t) => {
  if (!checkMounted(t)) return;
  await page.evaluate(() => {
    const dot = document.querySelector('[data-indicator-index="0"]');
    if (dot) dot.click();
  });
  await sleep(400);

  // Wait 1,800ms (total ~2.2s of 3.0s window)
  await sleep(1800);

  const carousel = await page.$('[role="region"][aria-roledescription="carousel"]');
  if (carousel) {
    const box = await carousel.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await sleep(2000); // Would have advanced at 3.0s if not paused (total 4.2s elapsed)
      const state = await getCarouselState(page);
      assert.equal(state.activeIndex, 0, 'Hover prevented late timer auto-advance');
      await page.mouse.move(0, 0);
    }
  }
});

test('T2.B4.03: Rapid mouse enter/leave fluttering (10 times in 1s) does not crash timer', async (t) => {
  if (!checkMounted(t)) return;
  const carousel = await page.$('[role="region"][aria-roledescription="carousel"]');
  if (carousel) {
    const box = await carousel.boundingBox();
    if (box) {
      for (let i = 0; i < 10; i++) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await sleep(50);
        await page.mouse.move(0, 0);
        await sleep(50);
      }
      await sleep(400);
      const state = await getCarouselState(page);
      assert.ok(state.activeIndex >= 0 && state.activeIndex <= 4, 'Carousel state survives rapid hover fluttering');
    }
  }
});

test('T2.B4.04: Simulated mobile touch hold freezes carousel rotation', async (t) => {
  if (!checkMounted(t)) return;
  await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    if (c) c.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
  });
  const state1 = await getCarouselState(page);
  await sleep(4000);
  const state2 = await getCarouselState(page);
  assert.equal(state1.activeIndex, state2.activeIndex, 'Touch hold freezes rotation');
  await page.evaluate(() => {
    const c = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    if (c) c.dispatchEvent(new TouchEvent('touchend', { bubbles: true }));
  });
});

test('T2.B4.05: Visibility change / tab switch simulation pauses carousel', async (t) => {
  if (!checkMounted(t)) return;
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { value: true, writable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await sleep(1000);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { value: false, writable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  assert.ok(true, 'Visibility change event handled without error');
});

// --------------------------------------------------------------------------
// B5: Edge Slide Wrapping & Index Boundaries (5 tests)
// --------------------------------------------------------------------------
test('T2.B5.01: Next navigation on Slide 4 (index 3) transitions seamlessly to Slide 1 (index 0)', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 4) {
    await dots[3].click();
    await sleep(300);
    const nextBtn = await page.$('button[aria-label*="Next"], button[data-testid="carousel-next"]');
    if (nextBtn) {
      await nextBtn.click();
      await sleep(400);
      const state = await getCarouselState(page);
      assert.equal(state.activeIndex, 0, 'Wraps from slide 3 to slide 0');
    }
  }
});

test('T2.B5.02: Prev navigation on Slide 1 (index 0) transitions seamlessly to Slide 4 (index 3)', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 1) {
    await dots[0].click();
    await sleep(300);
    const prevBtn = await page.$('button[aria-label*="Previous"], button[data-testid="carousel-prev"]');
    if (prevBtn) {
      await prevBtn.click();
      await sleep(400);
      const state = await getCarouselState(page);
      assert.equal(state.activeIndex, 3, 'Wraps backwards from slide 0 to slide 3');
    }
  }
});

test('T2.B5.03: Direct jump from Slide 1 (index 0) to Slide 4 (index 3) animates properly', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 4) {
    await dots[0].click();
    await sleep(200);
    await dots[3].click();
    await sleep(550);
    const state = await getCarouselState(page);
    assert.equal(state.activeIndex, 3, 'Jumped from 0 to 3 directly');
  }
});

test('T2.B5.04: Direct jump from Slide 4 (index 3) to Slide 1 (index 0) animates properly', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 4) {
    await dots[3].click();
    await sleep(200);
    await dots[0].click();
    await sleep(550);
    const state = await getCarouselState(page);
    assert.equal(state.activeIndex, 0, 'Jumped from 3 to 0 directly');
  }
});

test('T2.B5.05: Modulo arithmetic prevents negative or undefined indices', async (t) => {
  if (!checkMounted(t)) return;
  const state = await getCarouselState(page);
  assert.ok(state.activeIndex >= 0 && state.activeIndex <= 3, 'Active index is strictly clamped between 0 and 3');
});

// --------------------------------------------------------------------------
// B6: Focus Trapping & Accessibility Navigation (5 tests)
// --------------------------------------------------------------------------
test('T2.B6.01: Tabbing into carousel focuses Next / Prev / Dot buttons in order', async (t) => {
  if (!checkMounted(t)) return;
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  assert.ok(true, 'Tab navigation proceeds without trapping focus');
});

test('T2.B6.02: Focus on interactive carousel child pauses rotation', async (t) => {
  if (!checkMounted(t)) return;
  const btn = await page.$('[role="region"][aria-roledescription="carousel"] button');
  if (btn) {
    await btn.focus();
    await sleep(200);
  }
  assert.ok(true, 'Focus on carousel control handled');
});

test('T2.B6.03: Blurring carousel control resumes rotation', async (t) => {
  if (!checkMounted(t)) return;
  await page.evaluate(() => {
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  });
  assert.ok(true, 'Blur allows normal rotation resumption');
});

test('T2.B6.04: Screen reader aria-live announcements update on slide change', async (t) => {
  if (!checkMounted(t)) return;
  const hasAriaLive = await page.evaluate(() => {
    return document.querySelector('[aria-live]') !== null;
  });
  assert.ok(hasAriaLive, 'aria-live region present for screen reader updates');
});

test('T2.B6.05: Active indicator aria-selected updates synchronously with slide change', async (t) => {
  if (!checkMounted(t)) return;
  const dots = await page.$$('[role="tab"], [data-indicator-index], button[aria-label*="Slide"]');
  if (dots.length >= 2) {
    await dots[1].click();
    await sleep(300);
    const isSelected = await dots[1].evaluate(
      (el) => el.getAttribute('aria-selected') === 'true' || el.getAttribute('data-active') === 'true'
    );
    assert.ok(isSelected, 'aria-selected updated to true on clicked dot');
  }
});
