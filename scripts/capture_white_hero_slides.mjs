import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = process.env.CHROME_BIN || '/usr/bin/google-chrome';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || '/home/thejoevardy/.gemini/antigravity/brain/2ec82e21-9b1d-40d3-b5d8-87025970677e';

async function main() {
  console.log('Launching browser with Chrome:', CHROME_PATH);
  const browser = await puppeteer.launch({
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

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to', BASE_URL);
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 20000 });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 1200));

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

  const heroEl = await page.$('[data-testid="hero-carousel"]');
  if (heroEl) {
    // Hover over carousel immediately to freeze autoplay during captures
    await heroEl.hover();
    await new Promise((r) => setTimeout(r, 300));
  }

  for (const s of slides) {
    console.log(`Navigating to ${s.label}...`);
    // Click indicator or evaluate switch
    await page.evaluate((targetIdx) => {
      const tab = document.querySelector(`[data-indicator-index="${targetIdx}"]`);
      if (tab) {
        tab.click();
      }
    }, s.index);

    // Give 700ms for transition animation to settle
    await new Promise((r) => setTimeout(r, 700));

    if (heroEl) {
      const outPath = path.join(ARTIFACT_DIR, s.name);
      await heroEl.screenshot({ path: outPath });
      console.log(`Saved screenshot to ${outPath}`);
    }

    // If Slide 2, also capture PS4 and Xbox One console interactions!
    if (s.index === 1 && heroEl) {
      const consoleVariations = [
        { id: 'ps4', name: 'white_hero_slide2_ps4.png' },
        { id: 'xbox-one', name: 'white_hero_slide2_xboxone.png' },
      ];

      for (const cv of consoleVariations) {
        console.log(`Clicking ${cv.id} console card on Slide 2...`);
        await page.evaluate(() => {
          const tab = document.querySelector('[data-indicator-index="1"]');
          if (tab) tab.click();
        });
        await new Promise((r) => setTimeout(r, 300));
        await page.evaluate((cid) => {
          const btn = document.querySelector(`button[data-console-choice="${cid}"], button[data-console="${cid}"]`);
          if (btn) btn.click();
        }, cv.id);
        await new Promise((r) => setTimeout(r, 500));
        const cPath = path.join(ARTIFACT_DIR, cv.name);
        await heroEl.screenshot({ path: cPath });
        console.log(`Saved ${cv.id} console screenshot to ${cPath}`);
      }

      // Restore PS5 Pro & Slim
      await page.evaluate(() => {
        const btn = document.querySelector('button[data-console-choice="ps4"]');
        if (btn) btn.click();
      });
      await new Promise((r) => setTimeout(r, 400));
    }

    // If Slide 3, also capture Red, Blue, and Green team interactions!
    if (s.index === 2 && heroEl) {
      await heroEl.hover(); // Freeze carousel autoplay on Slide 3
      const teamVariations = [
        { team: 'red', name: 'white_hero_slide3_red_team.png', choice: 'god-of-war' },
        { team: 'blue', name: 'white_hero_slide3_blue_team.png', choice: 'genshin-impact' },
        { team: 'green', name: 'white_hero_slide3_green_team.png', choice: 'cyber-green' },
      ];

      for (const t of teamVariations) {
        console.log(`Clicking ${t.team} gamepad card on Slide 3...`);
        // Ensure we are on Slide 3
        await page.evaluate(() => {
          const tab = document.querySelector('[data-indicator-index="2"]');
          if (tab) tab.click();
        });
        await new Promise((r) => setTimeout(r, 200));

        await page.evaluate((choice) => {
          const btn = document.querySelector(`button[data-theme-choice="${choice}"]`);
          if (btn) btn.click();
        }, t.choice);
        await new Promise((r) => setTimeout(r, 500));
        const teamPath = path.join(ARTIFACT_DIR, t.name);
        await heroEl.screenshot({ path: teamPath });
        console.log(`Saved ${t.team} team screenshot to ${teamPath}`);
      }

      // Restore gold team
      await page.evaluate(() => {
        const btn = document.querySelector('button[data-theme-choice="007-first-light"]');
        if (btn) btn.click();
      });
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  await browser.close();
  console.log('All slides and gamepad team variations captured successfully!');
}

main().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
