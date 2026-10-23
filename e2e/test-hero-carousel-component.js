/**
 * Component-Level Empirical Harness for HeroCarousel
 * Verifies that src/components/HeroCarousel/HeroCarousel.tsx embeds AdaptiveNavbar.tsx.
 */

const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const swc = require('next/dist/build/swc');
const assert = require('node:assert/strict');
const test = require('node:test');

function mockIcon(name) {
  return function MockIcon(props) {
    return React.createElement('svg', { 'data-icon': name, ...props });
  };
}

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
        ChevronLeft: mockIcon('ChevronLeft'),
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
          cartCount: 0,
          setIsCartOpen: () => {},
        }),
      };
    }
    if (importPath.includes('WhatsAppIcon')) {
      return function WhatsAppIcon(props) {
        return React.createElement('svg', { 'data-icon': 'WhatsAppIcon', ...props });
      };
    }
    if (importPath.endsWith('./AdaptiveNavbar') || importPath.includes('AdaptiveNavbar')) {
      return requireTsx(path.join(__dirname, '../src/components/HeroCarousel/AdaptiveNavbar.tsx'));
    }
    if (importPath.endsWith('./stubs') || importPath.includes('stubs')) {
      return {
        Slide1PS5Master: () => React.createElement('div', { 'data-slide': 1 }, 'Slide1'),
        Slide2DualSenseColorways: () => React.createElement('div', { 'data-slide': 2 }, 'Slide2'),
        Slide3CollectorSeries: () => React.createElement('div', { 'data-slide': 3 }, 'Slide3'),
        Slide4GamesArchive: () => React.createElement('div', { 'data-slide': 4 }, 'Slide4'),
        Slide5GamesMarket: () => React.createElement('div', { 'data-slide': 5 }, 'Slide5'),
      };
    }
    if (importPath.endsWith('./types') || importPath.includes('types')) {
      const typesCode = fs.readFileSync(path.join(__dirname, '../src/components/HeroCarousel/types.ts'), 'utf8');
      const transformedTypes = swc.transformSync(typesCode, {
        jsc: { parser: { syntax: 'typescript' } },
        module: { type: 'commonjs' },
      });
      const typesMod = { exports: {} };
      const fnTypes = new Function('module', 'exports', 'require', transformedTypes.code);
      fnTypes(typesMod, typesMod.exports, require);
      return typesMod.exports;
    }
    return require(importPath);
  };

  const fn = new Function('module', 'exports', 'require', transformed.code);
  fn(m, m.exports, customRequire);
  return m.exports.default || m.exports;
}

const HeroCarousel = requireTsx(
  path.join(__dirname, '../src/components/HeroCarousel/HeroCarousel.tsx')
);

test('CAROUSEL-01: HeroCarousel mounts AdaptiveNavbar and initial slide 0 with light theme', () => {
  const html = ReactDOMServer.renderToString(React.createElement(HeroCarousel, { initialSlide: 0 }));
  assert.ok(html.includes('data-testid="hero-carousel"'), 'HeroCarousel has data-testid="hero-carousel"');
  assert.ok(html.includes('data-testid="adaptive-navbar"'), 'HeroCarousel embeds AdaptiveNavbar');
  assert.ok(html.includes('data-theme="light"'), 'Initial AdaptiveNavbar has data-theme="light"');
  assert.ok(html.includes('bg-white/95'), 'Initial navbar has bg-white/95');
  assert.ok(html.includes('NAS TECH'), 'Navbar contains NAS TECH branding');
});

test('CAROUSEL-02: HeroCarousel with initialSlide=1 renders AdaptiveNavbar with dark obsidian (#060913)', () => {
  const html = ReactDOMServer.renderToString(React.createElement(HeroCarousel, { initialSlide: 1 }));
  assert.ok(html.includes('data-testid="adaptive-navbar"'), 'HeroCarousel embeds AdaptiveNavbar');
  assert.ok(html.includes('data-theme="dark"'), 'Slide 1 AdaptiveNavbar has data-theme="dark"');
  assert.ok(html.includes('bg-[#060913]/95'), 'Slide 1 navbar has bg-[#060913]/95');
  assert.ok(html.includes('text-white'), 'Slide 1 navbar has text-white');
});

test('CAROUSEL-03: HeroCarousel with initialSlide=4 renders AdaptiveNavbar with dark obsidian (#060913)', () => {
  const html = ReactDOMServer.renderToString(React.createElement(HeroCarousel, { initialSlide: 4 }));
  assert.ok(html.includes('data-theme="dark"'), 'Slide 4 AdaptiveNavbar has data-theme="dark"');
  assert.ok(html.includes('bg-[#060913]/95'), 'Slide 4 navbar has bg-[#060913]/95');
});

test('CAROUSEL-04: HeroCarousel with initialSlide=2 and 3 renders Crisp White navbar', () => {
  const html2 = ReactDOMServer.renderToString(React.createElement(HeroCarousel, { initialSlide: 2 }));
  assert.ok(html2.includes('data-theme="light"'), 'Slide 2 navbar is light');
  assert.ok(html2.includes('bg-white/95'), 'Slide 2 navbar is bg-white/95');

  const html3 = ReactDOMServer.renderToString(React.createElement(HeroCarousel, { initialSlide: 3 }));
  assert.ok(html3.includes('data-theme="light"'), 'Slide 3 navbar is light');
  assert.ok(html3.includes('bg-white/95'), 'Slide 3 navbar is bg-white/95');
});
