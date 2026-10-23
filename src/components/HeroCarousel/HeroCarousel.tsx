'use client';

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AdaptiveNavbar from './AdaptiveNavbar';
import {
  Slide1PS5Master,
  Slide2DualSenseColorways,
  Slide3CollectorSeries,
  Slide4GamesArchive,
  Slide5GamesMarket,
} from './stubs';
import {
  SlideIndex,
  TOTAL_SLIDES,
  DEFAULT_AUTOPLAY_INTERVAL,
  SLIDE_METADATA,
  HeroCarouselProps,
} from './types';

const AUTOPLAY_DURATION_MS = DEFAULT_AUTOPLAY_INTERVAL;

export default function HeroCarousel({
  intervalMs = AUTOPLAY_DURATION_MS,
  initialSlide = 0,
  onSlideChange,
  className = '',
}: HeroCarouselProps) {
  const [activeSlide, setActiveSlide] = useState<SlideIndex>(initialSlide);
  const [direction, setDirection] = useState<number>(1);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  // Pause state triggers
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouchHeld, setIsTouchHeld] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState<boolean>(false);

  // Coordinates for touch gestures
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // Timing references
  const elapsedRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Master pause condition
  const isPaused = isHovered || isTouchHeld || isInteracting || isDocumentHidden;
  const isPausedRef = useRef<boolean>(isPaused);
  isPausedRef.current = isPaused;

  // Slide navigation handlers
  const goToSlide = useCallback(
    (index: SlideIndex) => {
      setIsHovered(false);
      elapsedRef.current = 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = 'scaleX(0)';
        progressBarRef.current.setAttribute('aria-valuenow', '0');
      }
      if (index === activeSlide) return;
      setDirection(index > activeSlide ? 1 : -1);
      setActiveSlide(index);
    },
    [activeSlide]
  );

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveSlide((prev) => ((prev + 1) % TOTAL_SLIDES) as SlideIndex);
    elapsedRef.current = 0;
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = 'scaleX(0)';
      progressBarRef.current.setAttribute('aria-valuenow', '0');
    }
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveSlide((prev) => (((prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES) as SlideIndex));
    elapsedRef.current = 0;
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = 'scaleX(0)';
      progressBarRef.current.setAttribute('aria-valuenow', '0');
    }
  }, []);

  // StrictMode-compliant side-effect notification on activeSlide change
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onSlideChange?.(activeSlide);
  }, [activeSlide, onSlideChange]);

  // 1. High-Performance Synchronized rAF Loop
  useEffect(() => {
    let animId: number;
    lastTimeRef.current = performance.now();

    const tick = (currentTime: number) => {
      const delta = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (!isPausedRef.current) {
        elapsedRef.current += delta;
        const progress = Math.min(elapsedRef.current / intervalMs, 1);

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress})`;
          progressBarRef.current.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
        }

        if (elapsedRef.current >= intervalMs) {
          elapsedRef.current = 0;
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = 'scaleX(0)';
            progressBarRef.current.setAttribute('aria-valuenow', '0');
          }
          nextSlide();
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [intervalMs, nextSlide]);

  // 2. Document Visibility Listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.visibilityState === 'hidden');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 3. Keyboard Navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide((TOTAL_SLIDES - 1) as SlideIndex);
    }
  };

  // 4. Touch Handlers for Mobile Hold & Swipe
  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    setIsTouchHeld(true);
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    setIsTouchHeld(false);
    if (e.changedTouches && e.changedTouches[0]) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX.current;
      const diffY = touchEndY - touchStartY.current;

      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  };

  const handleTouchCancel = () => {
    setIsTouchHeld(false);
  };

  const currentMeta = SLIDE_METADATA[activeSlide];

  const slideComponents = [
    Slide1PS5Master,
    Slide2DualSenseColorways,
    Slide3CollectorSeries,
    Slide4GamesArchive,
    Slide5GamesMarket,
  ];

  return (
    <section
      id="nas-tech-hero-carousel"
      data-testid="hero-carousel"
      data-active-slide={activeSlide}
      role="region"
      aria-roledescription="carousel"
      aria-label="Nas Tech Featured Gaming Hero Carousel"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={(e) => {
        if (e.clientX <= 0 && e.clientY <= 0) return;
        setIsHovered(true);
      }}
      onMouseMove={(e) => {
        if (e.clientX <= 0 && e.clientY <= 0) {
          setIsHovered(false);
          return;
        }
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className={`hero-carousel relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-white via-slate-50 to-blue-50/20 text-slate-900 font-sans focus:outline-none transform-gpu will-change-transform duration-500 ${className}`}
    >
      {/* 1. TOP FLOATING PILL NAVBAR */}
      <div className="w-full flex justify-center z-40 pt-4 sm:pt-6 px-3 sm:px-6">
        <AdaptiveNavbar
          activeSlide={activeSlide}
          navbarTheme={currentMeta.navbarTheme}
          onSlideSelect={goToSlide}
          onInteractionStart={() => setIsInteracting(true)}
          onInteractionEnd={() => setIsInteracting(false)}
        />
      </div>

      {/* Screen Reader Live Announcements */}
      <div className="sr-only" aria-atomic="true">
        Showing slide {activeSlide + 1} of {TOTAL_SLIDES}: {currentMeta.title}
      </div>

      {/* 2. 5-SLIDE VIEWPORT WITH HARDWARE-ACCELERATED TRANSITIONS */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden" aria-live="polite">
        {slideComponents.map((SlideComponent, index) => {
          const isCurrent = activeSlide === index;
          const meta = SLIDE_METADATA[index as SlideIndex];

          return (
            <div
              key={meta.id}
              id={`carousel-slide-${index}`}
              role="group"
              aria-roledescription="slide"
              data-slide-index={index}
              data-active={isCurrent ? 'true' : 'false'}
              aria-hidden={isCurrent ? 'false' : 'true'}
              aria-label={`Slide ${index + 1} of ${TOTAL_SLIDES}: ${meta.title}`}
              aria-labelledby={`carousel-tab-${index}`}
              className={`absolute inset-0 w-full h-full font-sans transition-opacity duration-500 ${
                isCurrent ? 'opacity-100 z-10 pointer-events-auto visible' : 'opacity-0 z-0 pointer-events-none invisible'
              }`}
              style={{
                zIndex: isCurrent ? 10 : 0,
                opacity: isCurrent ? 1 : 0,
              }}
            >
              <SlideComponent
                isActive={isCurrent}
                theme={meta.navbarTheme}
                onInteractionStart={() => setIsInteracting(true)}
                onInteractionEnd={() => setIsInteracting(false)}
              />
            </div>
          );
        })}
      </div>

      {/* 3. BOTTOM CENTERED INTERACTIVE INDICATOR DOCK (Liquid Glass & Motion Primitives) */}
      <div className="w-full flex justify-center z-40 pb-6 sm:pb-8 px-4 font-sans">
        <div
          role="toolbar"
          aria-label="Carousel navigation controls"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsHovered(false);
          }}
          onMouseMove={(e) => {
            e.stopPropagation();
            setIsHovered(false);
          }}
          className="relative inline-flex items-center space-x-2 sm:space-x-3 px-3.5 sm:px-5 py-2 rounded-full bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_16px_40px_-10px_rgba(0,114,245,0.1),0_2px_6px_rgba(0,0,0,0.04)] font-sans"
        >
          {/* Specular Top Rim Sheen */}
          <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />

          {/* Previous Slide Button with Tactile Spring */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            data-testid="carousel-prev"
            onClick={prevSlide}
            aria-label="Previous"
            aria-controls="nas-tech-hero-carousel"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors font-sans focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </motion.button>

          {/* 5 Slide Indicator Tabs */}
          <div
            role="tablist"
            aria-label="Slide indicators"
            className="flex items-center space-x-2 font-sans"
            onMouseLeave={() => setHoveredDot(null)}
          >
            {SLIDE_METADATA.map((slide, index) => {
              const isSelected = index === activeSlide;
              const isHoveredPreview = hoveredDot === index && !isSelected;

              return (
                <div key={slide.id} className="relative flex items-center justify-center">
                  {/* MicroKit Hover Tooltip Preview */}
                  <AnimatePresence>
                    {isHoveredPreview && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: -24, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute pointer-events-none z-30 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[9px] font-bold whitespace-nowrap shadow-lg font-sans"
                      >
                        {slide.shortLabel}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    role="tab"
                    id={`carousel-tab-${index}`}
                    data-indicator-index={index}
                    aria-selected={isSelected}
                    aria-current={isSelected ? 'true' : undefined}
                    aria-label={`Slide ${index + 1}: ${slide.shortLabel}`}
                    aria-controls={`carousel-slide-${index}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => goToSlide(index as SlideIndex)}
                    onMouseEnter={() => setHoveredDot(index)}
                    className={`relative flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 font-sans ${
                      isSelected
                        ? 'w-24 sm:w-32 h-4 rounded-full bg-slate-100 border border-slate-200/90 overflow-hidden shadow-inner'
                        : 'w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-300 hover:bg-blue-400 hover:scale-110'
                    }`}
                  >
                    {isSelected && (
                      <>
                        {/* Live 5-Second Linear Progress Bar Fill with Blue Gradient */}
                        <div
                          ref={progressBarRef}
                          data-testid="carousel-progress-bar"
                          role="progressbar"
                          aria-valuenow={0}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          className="carousel-progress-bar absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 origin-left rounded-full will-change-transform font-sans shadow-[0_0_8px_rgba(0,114,245,0.5)]"
                          style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                        />
                        {/* Slide Label Overlay */}
                        <span className="relative z-10 text-[8px] sm:text-[9px] font-extrabold text-white uppercase tracking-wider px-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] truncate select-none font-sans">
                          {slide.shortLabel}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Next Slide Button with Tactile Spring */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            data-testid="carousel-next"
            onClick={nextSlide}
            aria-label="Next"
            aria-controls="nas-tech-hero-carousel"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors font-sans focus:outline-none"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
