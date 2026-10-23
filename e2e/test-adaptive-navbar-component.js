/**
 * Component-Level Empirical Harness for AdaptiveNavbar
 * Uses Next.js SWC compiler and react-dom/server to test AdaptiveNavbar in isolation.
 */

const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const swc = require('next/dist/build/swc');
const assert = require('node:assert/strict');
const test = require('node:test');

// Mock CartContext
let mockCartCount = 0;
let mockIsCartOpen = false;

// Mock Lucide icons & WhatsApp icon
function mockIcon(name) {
  return function MockIcon(props) {
    return React.createElement('svg', { 'data-icon': name, ...props });
  };
}

// Compile a TSX file using SWC
function requireTsx(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const transformed = swc.transformSync(code, {
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      transform: {
        react: {
          runtime: 'classic',
        },
      },
    },
    module: {
      type: 'commonjs',
    },
  });

  const m = { exports: {} };
  const customRequire = (importPath) => {
    if (importPath === 'react') return React;
    if (importPath === 'lucide-react') {
      return {
        Gamepad2: mockIcon('Gamepad2'),
        Search: mockIcon('Search'),
        ShoppingBag: mockIcon('ShoppingBag'),
        Menu: mockIcon('Menu'),
        X: mockIcon('X'),
        ChevronRight: mockIcon('ChevronRight'),
        Disc: mockIcon('Disc'),
        Layers: mockIcon('Layers'),
        Wrench: mockIcon('Wrench'),
        Sparkles: mockIcon('Sparkles'),
      };
    }
    if (importPath.includes('CartContext')) {
      return {
        useCart: () => ({
          cartCount: mockCartCount,
          setIsCartOpen: (open) => { mockIsCartOpen = open; },
        }),
      };
    }
    if (importPath.includes('WhatsAppIcon')) {
      return function WhatsAppIcon(props) {
        return React.createElement('svg', { 'data-icon': 'WhatsAppIcon', ...props });
      };
    }
    if (importPath.endsWith('./types') || importPath.includes('types')) {
      return {};
    }
    return require(importPath);
  };

  const fn = new Function('module', 'exports', 'require', transformed.code);
  fn(m, m.exports, customRequire);
  return m.exports.default || m.exports;
}

const AdaptiveNavbar = requireTsx(
  path.join(__dirname, '../src/components/HeroCarousel/AdaptiveNavbar.tsx')
);

// --------------------------------------------------------------------------
// COMPONENT TESTS
// --------------------------------------------------------------------------

test('UNIT-01: AdaptiveNavbar renders Crisp White styling on Slide 1 (activeSlide=0, theme=light)', () => {
  mockCartCount = 0;
  const html = ReactDOMServer.renderToString(
    React.createElement(AdaptiveNavbar, {
      activeSlide: 0,
      navbarTheme: 'light',
    })
  );

  assert.ok(html.includes('data-testid="adaptive-navbar"'), 'Must have data-testid="adaptive-navbar"');
  assert.ok(html.includes('data-theme="light"'), 'Must have data-theme="light"');
  assert.ok(html.includes('bg-white/95'), 'Header must contain bg-white/95');
  assert.ok(html.includes('text-slate-900'), 'Header must contain text-slate-900');
  assert.ok(html.includes('duration-500'), 'Header must declare duration-500 transition');
});

test('UNIT-02: AdaptiveNavbar renders Dark Obsidian styling on Slide 2 (activeSlide=1, theme=dark)', () => {
  mockCartCount = 0;
  const html = ReactDOMServer.renderToString(
    React.createElement(AdaptiveNavbar, {
      activeSlide: 1,
      navbarTheme: 'dark',
    })
  );

  assert.ok(html.includes('data-theme="dark"'), 'Must have data-theme="dark"');
  assert.ok(html.includes('bg-[#060913]/95'), 'Header must contain bg-[#060913]/95');
  assert.ok(html.includes('text-white'), 'Header must contain text-white');
  assert.ok(html.includes('border-slate-800'), 'Header must contain border-slate-800');
});

test('UNIT-03: AdaptiveNavbar renders Crisp White styling on Slide 3 (activeSlide=2, theme=light)', () => {
  const html = ReactDOMServer.renderToString(
    React.createElement(AdaptiveNavbar, {
      activeSlide: 2,
      navbarTheme: 'light',
    })
  );
  assert.ok(html.includes('data-theme="light"'), 'Must have data-theme="light"');
  assert.ok(html.includes('bg-white/95'), 'Header must contain bg-white/95');
});

test('UNIT-04: AdaptiveNavbar renders Crisp White styling on Slide 4 (activeSlide=3, theme=light)', () => {
  const html = ReactDOMServer.renderToString(
    React.createElement(AdaptiveNavbar, {
      activeSlide: 3,
      navbarTheme: 'light',
    })
  );
  assert.ok(html.includes('data-theme="light"'), 'Must have data-theme="light"');
  assert.ok(html.includes('bg-white/95'), 'Header must contain bg-white/95');
});

test('UNIT-05: AdaptiveNavbar renders Dark Obsidian styling on Slide 5 (activeSlide=4, theme=dark)', () => {
  const html = ReactDOMServer.renderToString(
    React.createElement(AdaptiveNavbar, {
      activeSlide: 4,
      navbarTheme: 'dark',
    })
  );
  assert.ok(html.includes('data-theme="dark"'), 'Must have data-theme="dark"');
  assert.ok(html.includes('bg-[#060913]/95'), 'Header must contain bg-[#060913]/95');
});

test('UNIT-06: Fallback auto-inversion resolves correctly when navbarTheme is omitted', () => {
  // Slide 0 -> light
  const html0 = ReactDOMServer.renderToString(React.createElement(AdaptiveNavbar, { activeSlide: 0 }));
  assert.ok(html0.includes('data-theme="light"'), 'Slide 0 default must be light');

  // Slide 1 -> dark
  const html1 = ReactDOMServer.renderToString(React.createElement(AdaptiveNavbar, { activeSlide: 1 }));
  assert.ok(html1.includes('data-theme="dark"'), 'Slide 1 default must be dark');

  // Slide 2 -> light
  const html2 = ReactDOMServer.renderToString(React.createElement(AdaptiveNavbar, { activeSlide: 2 }));
  assert.ok(html2.includes('data-theme="light"'), 'Slide 2 default must be light');

  // Slide 3 -> light
  const html3 = ReactDOMServer.renderToString(React.createElement(AdaptiveNavbar, { activeSlide: 3 }));
  assert.ok(html3.includes('data-theme="light"'), 'Slide 3 default must be light');

  // Slide 4 -> dark
  const html4 = ReactDOMServer.renderToString(React.createElement(AdaptiveNavbar, { activeSlide: 4 }));
  assert.ok(html4.includes('data-theme="dark"'), 'Slide 4 default must be dark');
});

test('UNIT-07: Shopping cart badge suppresses when cartCount=0, renders when cartCount>0', () => {
  mockCartCount = 0;
  const emptyHtml = ReactDOMServer.renderToString(
    React.createElement(AdaptiveNavbar, { activeSlide: 0 })
  );
  assert.ok(!emptyHtml.includes('tabular-nums'), 'Must not render badge counter when cartCount is 0');

  mockCartCount = 3;
  const withItemsHtml = ReactDOMServer.renderToString(
    React.createElement(AdaptiveNavbar, { activeSlide: 0 })
  );
  assert.ok(withItemsHtml.includes('tabular-nums'), 'Must render badge counter with tabular-nums when cartCount > 0');
  assert.ok(withItemsHtml.includes('>3<'), 'Badge must display exact count "3"');
  assert.ok(withItemsHtml.includes('bg-blue-600'), 'Badge must have bg-blue-600');
});

test('UNIT-08: Zero font-mono enforcement in AdaptiveNavbar output', () => {
  mockCartCount = 5;
  const htmlDark = ReactDOMServer.renderToString(React.createElement(AdaptiveNavbar, { activeSlide: 1 }));
  const htmlLight = ReactDOMServer.renderToString(React.createElement(AdaptiveNavbar, { activeSlide: 0 }));
  assert.ok(!htmlDark.includes('font-mono'), 'Dark navbar must not contain font-mono');
  assert.ok(!htmlLight.includes('font-mono'), 'Light navbar must not contain font-mono');
  assert.ok(!htmlDark.includes('monospace'), 'Dark navbar must not contain monospace');
});
