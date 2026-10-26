import React from 'react';

/**
 * Valid slide indices for the 4-slide Hero Carousel (0-indexed).
 * 0: Slide 1 - PlayStation 5 "Feel the Game" Master Stage
 * 1: Slide 2 - DualSense™ Wireless Controllers Showcase
 * 2: Slide 3 - Limited Edition Collector Series
 * 3: Slide 4 - Over 2,000 Games & Direct-to-Drive Hub
 */
export type SlideIndex = 0 | 1 | 2 | 3;

/** Total number of slides in the carousel */
export const TOTAL_SLIDES = 4;

/** Default auto-advance interval in milliseconds (7 seconds as requested) */
export const DEFAULT_AUTOPLAY_INTERVAL = 7000;

/**
 * Navbar theme options for optimal visual contrast against slide backgrounds:
 * - 'light': Crisp white pill navbar (#FFFFFF background, slate-900 text, border-white/90).
 * - 'dark':  Solid dark obsidian pill navbar (#060913 background, white text, border-slate-800).
 */
export type NavbarTheme = 'light' | 'dark';

/** Slide visual theme */
export type SlideTheme = 'light' | 'dark';

/**
 * Static mapping defining the required navbar theme for each slide index.
 */
export const SLIDE_NAVBAR_THEMES: Record<SlideIndex, NavbarTheme> = {
  0: 'light', // Slide 1 (PS5 Master) -> Crisp White Pill Navbar
  1: 'light', // Slide 2 (DualSense Colorways) -> Crisp White Pill Navbar
  2: 'light', // Slide 3 (Collector Series) -> Crisp White Pill Navbar
  3: 'light', // Slide 4 (Games Archive) -> Crisp White Pill Navbar
};

/**
 * Universal props contract accepted by every slide component (Slides 1 through 4).
 */
export interface SlideProps {
  /** Whether the slide is currently active and visible to the user */
  isActive: boolean;

  /**
   * Visual theme context of the slide or navbar.
   * Can be used for internal contrast adjustments.
   */
  theme: NavbarTheme;

  /**
   * Callback invoked when a user begins interacting with an interactive sub-element
   * inside the slide (e.g. 3D controller tilt/drag, colorway switcher click, spec toggle).
   * Signals the parent carousel engine to pause auto-advancing so user exploration is uninterrupted.
   */
  onInteractionStart?: () => void;

  /**
   * Callback invoked when the user finishes interacting with the sub-element.
   * Signals the parent carousel engine to resume the auto-advancing timer.
   */
  onInteractionEnd?: () => void;
}

/**
 * Descriptive metadata for each carousel slide.
 */
export interface SlideMetadata {
  index: SlideIndex;
  id: string;
  title: string;
  shortLabel: string;
  eyebrow?: string;
  subtitle?: string;
  theme: SlideTheme;
  navbarTheme: NavbarTheme;
  ariaLabel: string;
}

/**
 * Full carousel configuration definitions for all 4 slides.
 */
export const SLIDE_METADATA: readonly SlideMetadata[] = [
  {
    index: 0,
    id: 'ps5-master',
    title: 'PlayStation 5 Feel the Game',
    shortLabel: '01 / PS5',
    eyebrow: 'T H E   N E X T   G E N E R A T I O N   O F   P L A Y',
    subtitle: 'PlayStation 5 Console & DualSense Wireless Controller',
    theme: 'light',
    navbarTheme: 'light',
    ariaLabel: 'Slide 1 of 4: PlayStation 5 Feel the Game',
  },
  {
    index: 1,
    id: 'dualsense-colorways',
    title: 'PlayStation®5 Consoles & Hardware',
    shortLabel: '02 / CONSOLES',
    eyebrow: 'IN-STOCK IN KUMASI // ADUM SHOWROOM',
    theme: 'light',
    navbarTheme: 'light',
    ariaLabel: 'Slide 2 of 4: PlayStation 5 Consoles and DualSense Controllers',
  },
  {
    index: 2,
    id: 'collector-series',
    title: 'Limited Edition Collector Series',
    shortLabel: '03 / COLLECTOR',
    eyebrow: 'EXCLUSIVE CUSTOM BUILDS',
    theme: 'light',
    navbarTheme: 'light',
    ariaLabel: 'Slide 3 of 4: Limited Edition Collector Series',
  },
  {
    index: 3,
    id: 'games-archive',
    title: 'Over 2,000 Games Available',
    shortLabel: '04 / GAMES',
    eyebrow: 'DIRECT-TO-DRIVE PRE-LOAD SERVICE',
    subtitle: 'IN-SHOP CONSOLE & PC GAME PRE-LOADS // BRING YOUR DRIVE TO ADUM, KUMASI',
    theme: 'light',
    navbarTheme: 'light',
    ariaLabel: 'Slide 4 of 4: Over 2,000 Games Archive Hub',
  },
] as const;

/**
 * Root HeroCarousel component props.
 */
export interface HeroCarouselProps {
  /** Auto-advance interval in milliseconds (defaults to 5000ms / 5s) */
  intervalMs?: number;

  /** Initial slide index on first render (defaults to 0) */
  initialSlide?: SlideIndex;

  /** Optional callback fired when the active slide changes */
  onSlideChange?: (newIndex: SlideIndex) => void;

  /** Additional CSS classes for outer container */
  className?: string;
}

/**
 * Internal state contract for the Carousel engine.
 */
export interface HeroCarouselState {
  /** Currently active slide index (0 to 4) */
  activeSlide: SlideIndex;

  /** Direction of transition: +1 for next/forward, -1 for previous/backward */
  direction: number;

  /** Whether timer is currently paused (by hover, touch hold, or sub-interaction) */
  isPaused: boolean;

  /** Progress of active slide timer (0 to 100 percentage) */
  progress: number;
}

/**
 * Props contract for the Adaptive Floating Pill Navbar.
 */
export interface AdaptiveNavbarProps {
  /** Currently active slide index (0 to 4) */
  activeSlide: SlideIndex;

  /** Current navbar theme ('light' | 'dark') auto-inverted by the carousel */
  navbarTheme: NavbarTheme;

  /** Callback when user clicks a slide indicator dot or nav item */
  onSlideSelect?: (index: SlideIndex) => void;

  /** Callback to pause carousel timer when user interacts with navbar */
  onInteractionStart?: () => void;

  /** Callback to resume carousel timer when interaction ceases */
  onInteractionEnd?: () => void;

  /** Additional styling */
  className?: string;
}

/**
 * Props contract for manual carousel navigation controls (arrows, indicators, progress bar).
 */
export interface CarouselControlsProps {
  activeSlide: SlideIndex;
  totalSlides: number;
  progress: number;
  isPaused: boolean;
  navbarTheme: NavbarTheme;
  onSelectSlide: (index: SlideIndex) => void;
  onPrev: () => void;
  onNext: () => void;
}

// =========================================================================
// SUB-SLIDE CONTRACTS
// =========================================================================

/** Slide 2: DualSense Colorway Option */
export interface ColorwayOption {
  id: 'midnight-camo' | 'cyber-green' | 'tactical-patriots' | string;
  name: string;
  hexColor: string;
  accentGlow: string;
  imageSrc: string;
  priceGHS: number;
  badge: string;
  inStock: boolean;
}

/** Slide 3: Collector Series Theme Option */
export interface CollectorThemeOption {
  id: '007-first-light' | 'genshin-impact' | 'god-of-war' | string;
  name: string;
  themeTag: string;
  accentColor: string;
  priceGHS: number;
  imageSrc: string;
}

/** Slide 4: Fast Category Launcher Card */
export interface GameCategoryLauncher {
  id: 'action' | 'sports' | 'open-world' | 'strategy' | string;
  label: string;
  sublabel: string;
  color: string;
}

/** Slide 5: Trending Game Cover Card */
export interface TrendingGameCard {
  id: string;
  title: string;
  genre: string;
  coverImage: string;
}
