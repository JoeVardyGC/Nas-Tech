'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2,
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  Disc,
  Layers,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { AdaptiveNavbarProps, SlideIndex } from './types';

export default function AdaptiveNavbar({
  activeSlide,
  navbarTheme,
  onSlideSelect,
  onInteractionStart,
  onInteractionEnd,
  className = '',
}: AdaptiveNavbarProps) {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd+K / Ctrl+K to focus search (MicroKit UI inspired)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        onInteractionStart?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onInteractionStart]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    onInteractionEnd?.();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = id;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      scrollToSection('storefront');
    }
  };

  const navLinks = [
    { label: 'Consoles', target: 'storefront' },
    { label: 'Games', target: 'installations' },
    { label: 'Controllers', target: 'storefront' },
    { label: 'Pre-Orders', target: 'hero' },
    { label: 'Kumasi Hub', target: 'repairs' },
  ];

  return (
    <div
      data-testid="adaptive-navbar"
      className={`adaptive-navbar w-full flex justify-center z-40 select-none font-sans bg-transparent theme-light ${className}`}
      data-theme="light"
    >
      <header
        className="relative inline-flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full backdrop-blur-2xl transition-all duration-500 ease-in-out font-sans bg-white/95 text-slate-900 border border-slate-200/90 shadow-[0_12px_40px_-10px_rgba(0,114,245,0.08),0_2px_6px_rgba(0,0,0,0.04)]"
        role="navigation"
        aria-label="Nas Tech Hero Navigation"
      >
        {/* Specular Liquid Glass Top Sheen (Liquid Glass inspired) */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />

        {/* 1. NAS TECH BRAND LOGO & LIVE STATUS INDICATOR */}
        <button
          type="button"
          onClick={() => {
            onSlideSelect?.(0);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2 sm:space-x-3 group text-left shrink-0 focus:outline-none"
          aria-label="Nas Tech Home - Kumasi Gaming Hub"
        >
          {/* Logo Icon with Subtle Elevation */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-500 bg-blue-50 text-blue-600 shadow-xs group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
            <Gamepad2 className="w-4 h-4 stroke-[2.2]" />
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-xs sm:text-sm font-extrabold tracking-tight transition-colors duration-500 font-sans text-slate-900 group-hover:text-blue-600">
              NAS TECH
            </span>

            {/* Glowing Live Inventory Indicator */}
            <span className="relative flex h-2 w-2" title="Kumasi Hub Live & In-Stock">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
        </button>

        {/* 2. DESKTOP NAVIGATION LINKS WITH MOTION PRIMITIVES HOVER PILL */}
        <nav
          className="hidden lg:flex items-center space-x-1"
          aria-label="Main menu"
          onMouseLeave={() => setHoveredNavIndex(null)}
        >
          {navLinks.map((item, idx) => (
            <div key={item.label} className="relative">
              <button
                type="button"
                onClick={() => scrollToSection(item.target)}
                onMouseEnter={() => setHoveredNavIndex(idx)}
                className="relative z-10 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors duration-200 font-sans text-slate-700 hover:text-blue-600 focus:outline-none"
              >
                {item.label}
              </button>
              {hoveredNavIndex === idx && (
                <motion.div
                  layoutId="navbar-hover-pill"
                  className="absolute inset-0 rounded-full bg-slate-100/90 border border-slate-200/80 -z-0 shadow-2xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
            </div>
          ))}
        </nav>

        {/* 3. QUICK SEARCH BAR PILL WITH ⌘K BADGE (MicroKit UI inspired) */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative hidden sm:flex items-center rounded-full px-2.5 py-1 transition-all duration-300 font-sans bg-slate-100/90 border border-slate-200/90 text-slate-800 focus-within:border-blue-600 focus-within:bg-white focus-within:shadow-xs"
          role="search"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => onInteractionStart?.()}
            onBlur={() => onInteractionEnd?.()}
            placeholder="Quick search..."
            aria-label="Quick search products and games"
            className="w-20 sm:w-28 md:w-32 lg:w-36 bg-transparent text-[11px] font-medium focus:outline-none pl-2 pr-1 text-inherit placeholder:text-slate-400 font-sans"
          />
          <kbd
            onClick={() => searchInputRef.current?.focus()}
            className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold text-slate-400 bg-white border border-slate-200/90 rounded shadow-2xs cursor-pointer select-none font-sans hover:text-blue-600 hover:border-blue-300"
            title="Press ⌘K or Ctrl+K to search"
          >
            ⌘K
          </kbd>
        </form>

        {/* 4. UTILITY CONTROLS: CART & HAMBURGER */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Shopping Cart Button with Live Counter Badge */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open shopping cart containing ${cartCount} items`}
            className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-blue-600 flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse font-sans tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Drawer Hamburger Button */}
          <button
            type="button"
            onClick={() => {
              const nextState = !isMobileMenuOpen;
              setIsMobileMenuOpen(nextState);
              if (nextState) {
                onInteractionStart?.();
              } else {
                onInteractionEnd?.();
              }
            }}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* 5. RESPONSIVE MOBILE DRAWER WITH FRAMER MOTION ANIMATION */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.98)' }}
              className="absolute top-full left-0 right-0 mt-3 p-4 sm:p-5 rounded-3xl backdrop-blur-2xl border border-slate-200 shadow-2xl shadow-black/15 transition-all z-50 font-sans text-slate-900"
            >
              {/* Mobile Search Input */}
              <form onSubmit={handleSearchSubmit} className="mb-3">
                <div className="flex items-center rounded-2xl px-3 py-2 border bg-slate-100 border-slate-200 text-slate-900">
                  <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Xbox, PS5, Games..."
                    aria-label="Search store items in mobile menu"
                    className="w-full bg-transparent text-xs font-medium focus:outline-none font-sans"
                  />
                </div>
              </form>

              {/* Mobile Links List */}
              <div className="space-y-1">
                {[
                  { label: 'Consoles & Hardware', target: 'storefront', icon: Gamepad2 },
                  { label: 'Digital Games Archive', target: 'installations', icon: Disc },
                  { label: 'DualSense & Controllers', target: 'storefront', icon: Sparkles },
                  { label: 'Pre-Orders (GTA VI / FC 27)', target: 'hero', icon: Layers },
                  { label: 'Kumasi Hub & Repairs', target: 'repairs', icon: Wrench },
                ].map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => scrollToSection(link.target)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors font-sans text-slate-800 hover:bg-slate-100 hover:text-blue-600"
                    >
                      <div className="flex items-center space-x-2.5">
                        <IconComponent className="w-4 h-4 text-slate-400" />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  );
                })}
              </div>

              {/* Slide Quick Jumper */}
              <div className="mt-3.5 pt-3 border-t border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-sans">
                  Featured Hero Slides
                </p>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { name: 'PS5', idx: 0 as SlideIndex },
                    { name: 'DualSense', idx: 1 as SlideIndex },
                    { name: 'Collector', idx: 2 as SlideIndex },
                    { name: 'Archive', idx: 3 as SlideIndex },
                    { name: 'Market', idx: 4 as SlideIndex },
                  ].map(({ name, idx }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        onSlideSelect?.(idx);
                        setIsMobileMenuOpen(false);
                        onInteractionEnd?.();
                      }}
                      className={`py-1.5 text-[9px] font-extrabold rounded-lg transition-all font-sans ${
                        activeSlide === idx
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Shop Link */}
              <div className="mt-3.5 pt-3 border-t border-slate-200">
                <a
                  href="https://wa.me/233500000000"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md font-sans"
                >
                  <WhatsAppIcon colored={false} className="w-4 h-4 fill-white" />
                  <span>Chat with Kumasi Shop on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
