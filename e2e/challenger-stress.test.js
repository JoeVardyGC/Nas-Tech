/**
 * Nas Tech HeroCarousel — Adversarial Stress & Empirical Verification Suite
 * Authored by: challenger_m1_1 (Empirical Challenger)
 * 
 * Verifies:
 * 1. 5-second interval timer auto-advancing slides (0 -> 1 -> 2 -> 3 -> 4 -> 0)
 * 2. 5-second linear progress bar fill (0% -> 100%) and instantaneous reset to 0%
 * 3. Pause handling: hover freezes timer and progress bar in place; leave resumes immediately
 * 4. Stress testing: 50+ rapid Next/Prev clicks, rapid dot jumping, interleaved hover/click bursts
 * 5. State synchronization: ARIA, data attributes, active indices, single progress bar invariant
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

test.before(async () => {
  await ensureServerRunning();
  browser = await launchBrowser();
  page = await createPage(browser, { width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await waitForCarousel(page, 10000);
});

test.after(async () => {
  if (browser) await browser.close();
});

// Helper to read numerical scaleX from active progress bar
async function getProgressBarScale(page) {
  return await page.evaluate(() => {
    const bar = document.querySelector('[data-testid="carousel-progress-bar"]');
    if (!bar) return null;
    const transform = bar.style.transform || '';
    const match = transform.match(/scaleX\(([^)]+)\)/);
    return match ? parseFloat(match[1]) : 0;
  });
}

// Helper to inspect full carousel DOM coherence
async function getDetailedCarouselState(page) {
  return await page.evaluate(() => {
    const carousel = document.querySelector('[data-testid="hero-carousel"]');
    if (!carousel) return null;

    const activeSlideAttr = parseInt(carousel.getAttribute('data-active-slide') || '-1', 10);
    const slides = Array.from(carousel.querySelectorAll('[role="group"][aria-roledescription="slide"]')).map((s, idx) => ({
      index: idx,
      dataIndex: parseInt(s.getAttribute('data-slide-index') || '-1', 10),
      isActive: s.getAttribute('data-active') === 'true',
      ariaHidden: s.getAttribute('aria-hidden') === 'true',
      opacity: window.getComputedStyle(s).opacity,
      pointerEvents: window.getComputedStyle(s).pointerEvents,
    }));

    const tabs = Array.from(carousel.querySelectorAll('[role="tab"]')).map((t, idx) => ({
      index: idx,
      dataIndex: parseInt(t.getAttribute('data-indicator-index') || '-1', 10),
      isSelected: t.getAttribute('aria-selected') === 'true',
      hasProgressBar: t.querySelector('[data-testid="carousel-progress-bar"]') !== null,
    }));

    const progressBars = carousel.querySelectorAll('[data-testid="carousel-progress-bar"]');

    return {
      activeSlideAttr,
      slides,
      tabs,
      progressBarCount: progressBars.length,
    };
  });
}

// ============================================================================
// SUITE 1: 5-Second Interval Timer Auto-Advancement & Wrap-Around
// ============================================================================
test('ADV-01: Auto-advance cycles sequentially (0 -> 1 -> 2 -> 3 -> 4 -> 0) with accurate timing', async () => {
  // Reset to slide 0
  const dots = await page.$$('[role="tab"]');
  assert.ok(dots.length >= 5, 'Must have 5 indicator tabs');
  await dots[0].click();
  await sleep(200);

  // Move pointer completely offscreen to prevent any hover pause
  await page.mouse.move(0, 0);

  const observedCycle = [0];
  const transitionDurations = [];

  for (let step = 1; step <= 5; step++) {
    const expectedTarget = step % 5;
    const startTime = Date.now();

    // Wait for the slide to change to expectedTarget
    await page.waitForFunction(
      (target) => {
        const c = document.querySelector('[data-testid="hero-carousel"]');
        return c && parseInt(c.getAttribute('data-active-slide'), 10) === target;
      },
      { timeout: 7000 },
      expectedTarget
    );

    const elapsed = Date.now() - startTime;
    transitionDurations.push(elapsed);
    observedCycle.push(expectedTarget);

    // Verify DOM consistency at each step
    const state = await getDetailedCarouselState(page);
    assert.equal(state.activeSlideAttr, expectedTarget, `Root data-active-slide must match ${expectedTarget}`);
    assert.equal(state.progressBarCount, 1, 'Exactly one progress bar must exist in DOM');
    assert.equal(state.slides[expectedTarget].isActive, true, `Slide ${expectedTarget} must have data-active=true`);
    assert.equal(state.tabs[expectedTarget].isSelected, true, `Tab ${expectedTarget} must have aria-selected=true`);
  }

  assert.deepEqual(observedCycle, [0, 1, 2, 3, 4, 0], 'Must complete full wrap-around cycle 0->1->2->3->4->0');

  // Verify timing for each step is approximately 5000ms (+/- 500ms tolerance for rAF/system load)
  for (let i = 0; i < transitionDurations.length; i++) {
    const dur = transitionDurations[i];
    assert.ok(
      dur >= 4500 && dur <= 5600,
      `Step ${i} duration ${dur}ms must be within 5000ms ± 600ms tolerance`
    );
  }
});

// ============================================================================
// SUITE 2: 5-Second Linear Progress Bar Fill & Instantaneous Reset Oracle
// ============================================================================
test('ADV-02: Progress bar fills linearly (0% -> 100%) and resets instantaneously to 0% on auto & manual transition', async () => {
  // Move pointer offscreen
  await page.mouse.move(0, 0);

  // Navigate to slide 0 to initialize clean window
  const dots = await page.$$('[role="tab"]');
  await dots[0].click();
  await sleep(100);

  // Check initial scale immediately after click
  const initialScale = await getProgressBarScale(page);
  assert.ok(initialScale !== null && initialScale < 0.05, `Initial scale must be near 0%, observed: ${initialScale}`);

  // Sample progress bar over time
  await sleep(1000);
  const scale1s = await getProgressBarScale(page);
  assert.ok(scale1s >= 0.15 && scale1s <= 0.28, `Scale at 1.0s should be ~0.20, observed: ${scale1s}`);

  await sleep(1500); // at t = 2500ms
  const scale2_5s = await getProgressBarScale(page);
  assert.ok(scale2_5s >= 0.42 && scale2_5s <= 0.58, `Scale at 2.5s should be ~0.50, observed: ${scale2_5s}`);
  assert.ok(scale2_5s > scale1s, 'Progress bar must be monotonically increasing');

  await sleep(1500); // at t = 4000ms
  const scale4s = await getProgressBarScale(page);
  assert.ok(scale4s >= 0.72 && scale4s <= 0.88, `Scale at 4.0s should be ~0.80, observed: ${scale4s}`);
  assert.ok(scale4s > scale2_5s, 'Progress bar must be monotonically increasing');

  // 1. Instantaneous Reset on Auto-Transition
  // Wait for auto-advance to slide 1
  await page.waitForFunction(
    () => {
      const c = document.querySelector('[data-testid="hero-carousel"]');
      return c && parseInt(c.getAttribute('data-active-slide'), 10) === 1;
    },
    { timeout: 3000 }
  );

  // Immediately sample progress bar on slide 1
  const scaleAfterAutoAdvance = await getProgressBarScale(page);
  assert.ok(
    scaleAfterAutoAdvance !== null && scaleAfterAutoAdvance < 0.08,
    `Progress bar must immediately reset to ~0% upon auto-transition, observed: ${scaleAfterAutoAdvance}`
  );

  // 2. Instantaneous Reset on Manual Next
  await sleep(2000); // let it advance to ~40%
  const scaleBeforeNext = await getProgressBarScale(page);
  assert.ok(scaleBeforeNext > 0.3, `Scale should have advanced, observed: ${scaleBeforeNext}`);

  const nextBtn = await page.$('[data-testid="carousel-next"]');
  await nextBtn.click();
  await sleep(80);

  const scaleAfterNext = await getProgressBarScale(page);
  assert.ok(
    scaleAfterNext !== null && scaleAfterNext < 0.08,
    `Progress bar must immediately reset to ~0% on Next click, observed: ${scaleAfterNext}`
  );

  // 3. Instantaneous Reset on Manual Prev
  await sleep(2000); // let it advance
  const prevBtn = await page.$('[data-testid="carousel-prev"]');
  await prevBtn.click();
  await sleep(80);

  const scaleAfterPrev = await getProgressBarScale(page);
  assert.ok(
    scaleAfterPrev !== null && scaleAfterPrev < 0.08,
    `Progress bar must immediately reset to ~0% on Prev click, observed: ${scaleAfterPrev}`
  );

  // 4. Instantaneous Reset on Indicator Dot Jump
  await sleep(2000); // let it advance
  const currentDots = await page.$$('[role="tab"]');
  await currentDots[4].click();
  await sleep(80);

  const scaleAfterDotJump = await getProgressBarScale(page);
  assert.ok(
    scaleAfterDotJump !== null && scaleAfterDotJump < 0.08,
    `Progress bar must immediately reset to ~0% on direct dot jump, observed: ${scaleAfterDotJump}`
  );
});

// ============================================================================
// SUITE 3: Pause Handling — Hover Freeze & Mouse Leave Resume
// ============================================================================
test('ADV-03: Hover halts auto-rotation and freezes progress bar; pointer leave immediately resumes', async () => {
  const dots = await page.$$('[role="tab"]');
  await dots[0].click();
  await sleep(200);

  // Let progress bar fill for 2.0 seconds (~40%)
  await page.mouse.move(0, 0);
  await sleep(2000);

  const preHoverScale = await getProgressBarScale(page);
  assert.ok(preHoverScale >= 0.32 && preHoverScale <= 0.50, `Pre-hover scale should be ~0.40, observed: ${preHoverScale}`);

  // Hover over the center of the carousel container
  const carousel = await page.$('[data-testid="hero-carousel"]');
  const box = await carousel.boundingBox();
  assert.ok(box, 'Carousel bounding box must exist');

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await sleep(150); // slight settling

  const frozenScale1 = await getProgressBarScale(page);

  // Hold hover for 4.0 seconds (Total elapsed real time > 6 seconds; normal 5s timer would have expired!)
  await sleep(4000);

  const frozenScale2 = await getProgressBarScale(page);
  const stateDuringHover = await getCarouselState(page);

  // Assertions during hover
  assert.equal(stateDuringHover.activeIndex, 0, 'Carousel must remain on Slide 0 during hover pause');
  assert.ok(
    Math.abs(frozenScale2 - frozenScale1) < 0.02,
    `Progress bar must be frozen in place! Difference between 0s and 4s was ${Math.abs(frozenScale2 - frozenScale1)} (scale1: ${frozenScale1}, scale2: ${frozenScale2})`
  );

  // Now pointer leaves carousel
  const unpauseTimestamp = Date.now();
  await page.mouse.move(0, 0);
  await sleep(150);

  const resumeScale = await getProgressBarScale(page);
  // Verify it did not jump to 1.0 or reset to 0
  assert.ok(
    resumeScale >= frozenScale2 - 0.01 && resumeScale <= frozenScale2 + 0.15,
    `Progress bar must smoothly resume from frozen position, observed: ${resumeScale} vs frozen: ${frozenScale2}`
  );

  // Wait for the remaining duration (~3000ms left out of 5000ms)
  await page.waitForFunction(
    () => {
      const c = document.querySelector('[data-testid="hero-carousel"]');
      return c && parseInt(c.getAttribute('data-active-slide'), 10) === 1;
    },
    { timeout: 4500 }
  );

  const timeToAdvanceAfterLeave = Date.now() - unpauseTimestamp;
  assert.ok(
    timeToAdvanceAfterLeave >= 2500 && timeToAdvanceAfterLeave <= 3800,
    `Slide should advance after remaining ~3000ms elapsed, took ${timeToAdvanceAfterLeave}ms`
  );
});

// ============================================================================
// SUITE 4: Adversarial Stress Testing — Rapid Multi-Clicks & Interleaved Input
// ============================================================================
test('ADV-04: 50 Rapid Next clicks do not cause NaN state, duplicate timers, or desync', async () => {
  const nextBtn = await page.$('[data-testid="carousel-next"]');
  assert.ok(nextBtn, 'Next button must exist');

  // Perform 50 rapid clicks as fast as possible
  for (let i = 0; i < 50; i++) {
    await nextBtn.click();
  }
  await sleep(200);

  const state = await getDetailedCarouselState(page);
  assert.ok(state.activeSlideAttr >= 0 && state.activeSlideAttr <= 4, `Active slide must be valid (0-4), got: ${state.activeSlideAttr}`);
  assert.equal(state.progressBarCount, 1, 'Must still have exactly one active progress bar');
  assert.equal(state.slides[state.activeSlideAttr].isActive, true, 'Active slide DOM element matches activeSlideAttr');
  assert.equal(state.tabs[state.activeSlideAttr].isSelected, true, 'Active tab indicator matches activeSlideAttr');

  // Verify auto-advance timer is not broken or running in a hyper-loop
  const startSlide = state.activeSlideAttr;
  await page.mouse.move(0, 0);

  // At 1.5s, slide should NOT have changed yet (verifies no duplicate runaway timers!)
  await sleep(1500);
  const stateCheckMid = await getDetailedCarouselState(page);
  assert.equal(stateCheckMid.activeSlideAttr, startSlide, 'Timer must not be running multiple duplicate intervals');

  // At 5.5s total, it should advance exactly once
  await page.waitForFunction(
    (expected) => {
      const c = document.querySelector('[data-testid="hero-carousel"]');
      return c && parseInt(c.getAttribute('data-active-slide'), 10) === expected;
    },
    { timeout: 4500 },
    (startSlide + 1) % 5
  );
});

test('ADV-05: 50 Rapid Prev clicks do not cause negative indices or state corruption', async () => {
  const prevBtn = await page.$('[data-testid="carousel-prev"]');
  assert.ok(prevBtn, 'Prev button must exist');

  // Perform 50 rapid clicks
  for (let i = 0; i < 50; i++) {
    await prevBtn.click();
  }
  await sleep(200);

  const state = await getDetailedCarouselState(page);
  assert.ok(state.activeSlideAttr >= 0 && state.activeSlideAttr <= 4, `Active slide must be valid (0-4), got: ${state.activeSlideAttr}`);
  assert.equal(state.progressBarCount, 1, 'Must still have exactly one active progress bar');
  assert.equal(state.slides[state.activeSlideAttr].isActive, true);
  assert.equal(state.tabs[state.activeSlideAttr].isSelected, true);
});

test('ADV-06: Chaotic indicator jumping and clicking active dot is a clean no-op', async () => {
  const dots = await page.$$('[role="tab"]');
  assert.equal(dots.length, 5, 'Must have 5 tabs');

  // Clicking currently active dot multiple times
  const stateBefore = await getDetailedCarouselState(page);
  const activeIdx = stateBefore.activeSlideAttr;

  await dots[activeIdx].click();
  await sleep(50);
  await dots[activeIdx].click();
  await sleep(50);
  await dots[activeIdx].click();
  await sleep(100);

  const stateAfterActiveClicks = await getDetailedCarouselState(page);
  assert.equal(stateAfterActiveClicks.activeSlideAttr, activeIdx, 'Clicking active dot must be a no-op');

  // Chaotic jumping sequence: 0 -> 4 -> 1 -> 3 -> 2 -> 0 -> 3 -> 1
  const sequence = [0, 4, 1, 3, 2, 0, 3, 1];
  for (const target of sequence) {
    await dots[target].click();
    await sleep(40);
  }
  await sleep(250);

  const finalState = await getDetailedCarouselState(page);
  assert.equal(finalState.activeSlideAttr, 1, 'Final target in chaotic jump sequence should be active');
  assert.equal(finalState.progressBarCount, 1, 'Exactly one progress bar remains');
  assert.equal(finalState.slides[1].isActive, true);
  assert.equal(finalState.tabs[1].isSelected, true);
});

test('ADV-07: Interleaved chaotic stress: Click Next -> Click Prev -> Jump Dot -> Hover -> Click Next -> Leave', async () => {
  const dots = await page.$$('[role="tab"]');
  const nextBtn = await page.$('[data-testid="carousel-next"]');
  const prevBtn = await page.$('[data-testid="carousel-prev"]');
  const carousel = await page.$('[data-testid="hero-carousel"]');
  const box = await carousel.boundingBox();

  // Step 1: Rapid Next
  await nextBtn.click();
  await sleep(30);

  // Step 2: Rapid Prev
  await prevBtn.click();
  await sleep(30);

  // Step 3: Jump to dot 3
  await dots[3].click();
  await sleep(50);

  // Step 4: Hover over carousel
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await sleep(100);

  // Step 5: Click Next while hovered
  await nextBtn.click();
  await sleep(100);

  // While hovered on slide 4, wait 3 seconds
  await sleep(3000);
  const stateHovered = await getDetailedCarouselState(page);
  assert.equal(stateHovered.activeSlideAttr, 4, 'Must remain paused on slide 4 while hovered');

  // Step 6: Leave carousel
  await page.mouse.move(0, 0);

  // Verify it resumes and auto-advances to slide 0 after 5s
  await page.waitForFunction(
    () => {
      const c = document.querySelector('[data-testid="hero-carousel"]');
      return c && parseInt(c.getAttribute('data-active-slide'), 10) === 0;
    },
    { timeout: 6500 }
  );

  const stateResumed = await getDetailedCarouselState(page);
  assert.equal(stateResumed.activeSlideAttr, 0, 'Auto-advancement successfully resumed to slide 0');
});
