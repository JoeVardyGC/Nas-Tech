/**
 * Nas Tech E2E Test Suite — Static Code & Typography Linter
 * Verifies zero font-mono occurrences, strict Montserrat usage, brand palette, and ARIA markup.
 */

const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const test = require('node:test');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CAROUSEL_DIR = path.join(PROJECT_ROOT, 'src', 'components', 'HeroCarousel');
const APP_PAGE = path.join(PROJECT_ROOT, 'src', 'app', 'page.tsx');

function getAllFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx', '.css']) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...getAllFiles(fullPath, extensions));
    } else if (extensions.includes(path.extname(fullPath))) {
      results.push(fullPath);
    }
  }
  return results;
}

test('Static Lint: Zero font-mono in HeroCarousel components', (t) => {
  const carouselFiles = getAllFiles(CAROUSEL_DIR);
  if (carouselFiles.length === 0) {
    // If carousel dir not yet created, note pending status
    t.todo('HeroCarousel components not yet authored under src/components/HeroCarousel');
    return;
  }

  const violations = [];
  for (const file of carouselFiles) {
    const content = fs.readFileSync(file, 'utf8');
    // Match font-mono class or string
    const match = content.match(/\bfont-mono\b/g);
    if (match) {
      violations.push({ file: path.relative(PROJECT_ROOT, file), count: match.length });
    }
  }

  assert.equal(
    violations.length,
    0,
    `Forbidden font-mono found in carousel components: ${JSON.stringify(violations)}`
  );
});

test('Static Lint: Strict Montserrat / font-sans typography enforcement', (t) => {
  const globalsCss = path.join(PROJECT_ROOT, 'src', 'app', 'globals.css');
  const layoutTsx = path.join(PROJECT_ROOT, 'src', 'app', 'layout.tsx');

  assert.ok(fs.existsSync(globalsCss), 'globals.css exists');
  assert.ok(fs.existsSync(layoutTsx), 'layout.tsx exists');

  const globalsContent = fs.readFileSync(globalsCss, 'utf8');
  const layoutContent = fs.readFileSync(layoutTsx, 'utf8');

  const hasMontserrat =
    globalsContent.includes('Montserrat') || layoutContent.includes('Montserrat');
  assert.ok(hasMontserrat, 'Montserrat font is loaded in layout or globals.css');
});

test('Static Lint: Harmonized brand palette hex codes', (t) => {
  const carouselFiles = getAllFiles(CAROUSEL_DIR);
  if (carouselFiles.length === 0) {
    t.todo('HeroCarousel components not yet authored');
    return;
  }

  const brandHexes = ['060913', '0070F3', '06B6D4', 'EAB308'];
  let foundAny = false;
  for (const file of carouselFiles) {
    const content = fs.readFileSync(file, 'utf8').toLowerCase();
    for (const hex of brandHexes) {
      if (content.includes(hex.toLowerCase())) {
        foundAny = true;
        break;
      }
    }
  }
  assert.ok(foundAny, 'Carousel components utilize harmonized brand color palette');
});

test('Static Lint: Ghanaian localization & GH₵ currency formatting', (t) => {
  const carouselFiles = getAllFiles(CAROUSEL_DIR);
  if (carouselFiles.length === 0) {
    t.todo('HeroCarousel components not yet authored');
    return;
  }

  let foundGhc = false;
  let foundKumasi = false;
  for (const file of carouselFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('GH₵')) foundGhc = true;
    if (content.includes('Kumasi') || content.includes('Adum')) foundKumasi = true;
  }

  assert.ok(foundGhc, 'GH₵ Ghanaian Cedis currency symbol is present in carousel');
  assert.ok(foundKumasi, 'Kumasi/Adum location references are present in carousel');
});

test('Static Lint: ARIA carousel semantics markup in source', (t) => {
  const carouselFiles = getAllFiles(CAROUSEL_DIR);
  if (carouselFiles.length === 0) {
    t.todo('HeroCarousel components not yet authored');
    return;
  }

  let hasRoleRegion = false;
  let hasRoleDesc = false;
  for (const file of carouselFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('role="region"') || content.includes("role='region'")) hasRoleRegion = true;
    if (content.includes('aria-roledescription="carousel"') || content.includes("aria-roledescription='carousel'")) hasRoleDesc = true;
  }

  assert.ok(hasRoleRegion, 'Carousel root specifies role="region"');
  assert.ok(hasRoleDesc, 'Carousel root specifies aria-roledescription="carousel"');
});
