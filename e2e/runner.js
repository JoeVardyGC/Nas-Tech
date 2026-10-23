#!/usr/bin/env node

/**
 * Nas Tech E2E Test Suite — Master Test Runner
 * Orchestrates execution of Tiers 1-4, static code linting, and build verification.
 * Usage:
 *   node e2e/runner.js           # Run all suites
 *   node e2e/runner.js --tier=1  # Run Tier 1 Feature Coverage
 *   node e2e/runner.js --tier=2  # Run Tier 2 Boundaries
 *   node e2e/runner.js --tier=3  # Run Tier 3 Interactions
 *   node e2e/runner.js --tier=4  # Run Tier 4 Real-World Scenarios
 *   node e2e/runner.js --lint    # Run Static Linter
 *   node e2e/runner.js --build   # Run Build & Server Checks
 */

const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);

const testFilesMap = {
  lint: path.join(__dirname, 'static-lint.test.js'),
  build: path.join(__dirname, 'build-health.test.js'),
  tier1: path.join(__dirname, 'tier1-features.test.js'),
  tier2: path.join(__dirname, 'tier2-boundaries.test.js'),
  tier3: path.join(__dirname, 'tier3-interactions.test.js'),
  tier4: path.join(__dirname, 'tier4-scenarios.test.js'),
};

let selectedFiles = [];

if (args.includes('--lint')) {
  selectedFiles.push(testFilesMap.lint);
} else if (args.includes('--build')) {
  selectedFiles.push(testFilesMap.build);
} else if (args.includes('--tier=1') || args.includes('-1')) {
  selectedFiles.push(testFilesMap.tier1);
} else if (args.includes('--tier=2') || args.includes('-2')) {
  selectedFiles.push(testFilesMap.tier2);
} else if (args.includes('--tier=3') || args.includes('-3')) {
  selectedFiles.push(testFilesMap.tier3);
} else if (args.includes('--tier=4') || args.includes('-4')) {
  selectedFiles.push(testFilesMap.tier4);
} else {
  // Default: run all
  selectedFiles = [
    testFilesMap.lint,
    testFilesMap.build,
    testFilesMap.tier1,
    testFilesMap.tier2,
    testFilesMap.tier3,
    testFilesMap.tier4,
  ];
}

console.log('===============================================================');
console.log('       🎮  NAS TECH HERO CAROUSEL — E2E TEST RUNNER  🎮        ');
console.log('===============================================================');
console.log(`Executing ${selectedFiles.length} test suite(s):`);
selectedFiles.forEach((f) => console.log(`  • ${path.basename(f)}`));
console.log('---------------------------------------------------------------\n');

const startTime = Date.now();

const child = spawn(
  process.execPath,
  ['--test', ...selectedFiles],
  {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
    env: process.env,
  }
);

child.on('close', (code) => {
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('\n---------------------------------------------------------------');
  if (code === 0) {
    console.log(`✅  ALL TEST SUITES PASSED in ${duration}s`);
  } else {
    console.error(`❌  TEST SUITE COMPLETED WITH CODE ${code} in ${duration}s`);
  }
  console.log('===============================================================');
  process.exit(code);
});
