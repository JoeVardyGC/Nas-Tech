'use client';

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowUpLeft,
  Zap,
  Battery,
  Gamepad,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Shield,
  Flame,
  Check,
} from 'lucide-react';
import PlayStationIcon from '@/components/icons/PlayStationIcon';
import { SlideProps } from './types';

// ============================================================================
// HELPER: SMOOTH SCROLL
// ============================================================================
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.hash = id;
  }
}

// ============================================================================
// SLIDE 1: PLAYSTATION 5 "FEEL THE GAME" MASTER STAGE
// ============================================================================
export function Slide1PS5Master({
  isActive,
  onInteractionStart,
  onInteractionEnd,
}: SlideProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Physics-based spring tilt (Motion Primitives inspired)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 220 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onInteractionStart?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    onInteractionEnd?.();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-brand-cobalt="#0070F3"
      data-brand-obsidian="#060913"
      className="relative w-full h-full flex flex-col justify-between pt-1 sm:pt-2 pb-4 sm:pb-6 px-3 sm:px-6 lg:px-10 overflow-hidden font-sans select-none"
    >
      {/* Aceternity-inspired Layered Studio Spotlights */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top Ambient Beam */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[300px] sm:h-[400px] opacity-75 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0, 114, 245, 0.16) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 80%)',
          }}
        />
        {/* Core Console Spotlight */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[450px] opacity-90 blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 55%, rgba(0, 114, 245, 0.20) 0%, rgba(6, 182, 212, 0.09) 40%, rgba(240, 246, 255, 0.85) 68%, #FFFFFF 100%)',
          }}
        />
      </div>

      {/* 1. EYEBROW & MASSIVE DISPLAY HEADLINE */}
      <div className="w-full text-center mt-1 sm:mt-3 z-10 font-sans">
        <p
          className="text-[9px] sm:text-xs font-bold tracking-[0.42em] uppercase text-blue-600 font-sans whitespace-pre flex items-center justify-center gap-1"
          aria-label="THE NEXT GENERATION OF PLAY"
        >
          <span>T H E</span>
          <span>N E X T</span>
          <span>G E N E R A T I O N</span>
          <span>O F</span>
          <span>P L A Y</span>
          <span className="sr-only">NEXT GENERATION</span>
        </p>
        <div className="py-0.5">
          <h1 className="text-[34px] sm:text-[54px] md:text-[70px] lg:text-[88px] font-extrabold tracking-[-0.04em] text-slate-950 leading-none whitespace-nowrap drop-shadow-[0_12px_24px_rgba(0,114,245,0.12)] font-sans">
            Feel the Game
          </h1>
        </div>
      </div>

      {/* 2. FLANKING KEYWORDS: CONTROL & THE FUTURE */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 flex items-center justify-between -mt-1 sm:mt-0 z-10 text-[9px] sm:text-[11px] font-bold tracking-[0.28em] text-slate-600 uppercase font-sans">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          CONTROL
        </span>
        <span className="flex items-center gap-1.5">
          THE FUTURE
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
        </span>
      </div>

      {/* 3. DOCK STAGE: [LEFT GTA VI CARD] <--- [DUALSENSE] ---> [RIGHT FC 27 CARD] */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6 mt-1 z-20 font-sans">
        {/* LEFT CARD: GRAND THEFT AUTO VI */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative w-32 sm:w-40 md:w-48 lg:w-52 shrink-0"
        >
          <div className="w-full flex justify-center -mb-1 z-10">
            <span className="text-blue-600 text-[10px] leading-none drop-shadow-[0_0_8px_rgba(0,114,245,0.6)]">
              ▼
            </span>
          </div>
          <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-blue-200/90 p-2 sm:p-2.5 shadow-[0_12px_32px_-8px_rgba(0,114,245,0.12),0_2px_6px_rgba(0,0,0,0.03)] hover:border-blue-500/60 hover:shadow-blue-500/15 transition-all duration-300 group">
            {/* Top Micro-Badge */}
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-[8px] sm:text-[9px] font-extrabold text-blue-600 uppercase tracking-wider font-sans">
                PRE-ORDER // 2025
              </span>
              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-600 font-sans">
                4K HDR
              </span>
            </div>

            <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-inner bg-slate-100 border border-slate-200/60">
              <Image
                src="/assets/hero/gtavi_art_hd.jpg"
                alt="Grand Theft Auto VI GTA VI"
                fill
                unoptimized
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('installations')}
              className="mt-2 w-full flex items-center space-x-2 text-left transition-all group/btn"
              aria-label="GTA VI Place a pre-order"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-md group-hover/btn:scale-110 group-hover/btn:bg-blue-600 transition-all">
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.6]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 group-hover/btn:text-blue-600 truncate font-sans">
                GTA VI Pre-order
              </span>
            </button>
          </div>
        </motion.div>

        {/* CENTER: UPRIGHT DUALSENSE CONTROLLER WITH SPRING TILT & FLOATING EASE */}
        <div
          data-testid="ps5-dualsense-stage"
          className="dualsense-stage flex-1 flex flex-col items-center justify-center relative -my-4 sm:-my-6"
        >
          <motion.div
            style={{
              rotateX: tiltX,
              rotateY: tiltY,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              y: [-3, 3, -3],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut',
            }}
            className="relative w-36 sm:w-48 md:w-60 lg:w-[280px] aspect-[16/11] flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <div className="relative w-full h-full drop-shadow-[0_22px_38px_rgba(0,114,245,0.32)]">
              <Image
                src="/assets/hero/dualsense_hero_perfect_transparent.png"
                alt="Sony PlayStation 5 DualSense Wireless Controller"
                fill
                unoptimized
                priority
                className="object-contain"
                style={{
                  filter:
                    'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.22)) drop-shadow(0 0 24px rgba(0, 114, 245, 0.38))',
                }}
              />
            </div>
          </motion.div>

          <div className="mt-1 text-blue-600 text-[10px] select-none animate-pulse">
            ▲
          </div>

          {/* EXPLORE CONSOLES ACTION BUTTON WITH SHIMMER (Magic UI inspired) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            data-testid="explore-ps5"
            onClick={() => scrollToSection('storefront')}
            aria-label="Explore Our Consoles"
            className="shimmer-button-luxury mt-1.5 inline-flex items-center space-x-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-white font-bold text-xs sm:text-sm tracking-wider shadow-xl hover:shadow-[0_0_30px_rgba(0,114,245,0.45)] transition-all duration-300 font-sans border border-white/20"
          >
            <Gamepad className="w-3.5 h-3.5 text-white stroke-[2.4]" />
            <span className="font-sans">Explore Our Consoles</span>
          </motion.button>
        </div>

        {/* RIGHT CARD: EA SPORTS FC 27 */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative w-32 sm:w-40 md:w-48 lg:w-52 shrink-0"
        >
          <div className="w-full flex justify-center -mb-1 z-10">
            <span className="text-blue-600 text-[10px] leading-none drop-shadow-[0_0_8px_rgba(0,114,245,0.6)]">
              ▼
            </span>
          </div>
          <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-blue-200/90 p-2 sm:p-2.5 shadow-[0_12px_32px_-8px_rgba(0,114,245,0.12),0_2px_6px_rgba(0,0,0,0.03)] hover:border-blue-500/60 hover:shadow-blue-500/15 transition-all duration-300 group">
            {/* Top Micro-Badge */}
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-[8px] sm:text-[9px] font-extrabold text-blue-600 uppercase tracking-wider font-sans">
                PRE-ORDER // 2026
              </span>
              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-600 font-sans">
                HYPERMOTION
              </span>
            </div>

            <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-inner bg-slate-100 border border-slate-200/60">
              <Image
                src="/assets/hero/fc27_art_hd.jpg"
                alt="EA Sports FC 27"
                fill
                unoptimized
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('installations')}
              className="mt-2 w-full flex items-center justify-between text-left transition-all group/btn"
              aria-label="FC 27 Place a pre-order"
            >
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 group-hover/btn:text-blue-600 truncate font-sans">
                FC 27 Pre-order
              </span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-md group-hover/btn:scale-110 group-hover/btn:bg-blue-600 transition-all">
                <ArrowUpLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.6]" />
              </div>
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

// ============================================================================
// SLIDE 2: DUALSENSE™ WIRELESS CONTROLLERS SHOWCASE
// ============================================================================
export function Slide2DualSenseColorways({
  isActive,
  onInteractionStart,
  onInteractionEnd,
}: SlideProps) {
  const [selectedSkin, setSelectedSkin] = useState<'midnight-camo' | 'cyber-green' | 'tactical-patriots'>('midnight-camo');

  const consoleModels = [
    {
      id: 'midnight-camo' as const,
      modelName: 'PS5 Pro (2TB)',
      tagline: 'PSSR AI 4K@120FPS • Ray Tracing',
      price: 'GH₵ 11,500',
      skinName: 'Midnight Camo',
      hex: '#2b343b',
      badge: 'PRO FLAGSHIP // 2TB SSD',
    },
    {
      id: 'cyber-green' as const,
      modelName: 'PS5 Slim Disc (1TB)',
      tagline: '4K Ultra HD Blu-ray • Detachable Drive',
      price: 'GH₵ 7,950',
      skinName: 'Cyber Green',
      hex: '#10b981',
      badge: 'DISC EDITION // 1TB SSD',
    },
    {
      id: 'tactical-patriots' as const,
      modelName: 'PS5 Digital (1TB)',
      tagline: 'All-Digital Fast Installs • Slim Chassis',
      price: 'GH₵ 6,850',
      skinName: 'Tactical Patriots',
      hex: '#1e3a8a',
      badge: 'ALL-DIGITAL // 1TB SSD',
    },
  ];

  const activeModel = consoleModels.find((c) => c.id === selectedSkin) || consoleModels[0];

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-2 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 text-slate-900 font-sans select-none overflow-hidden">
      {/* Studio Electric Blue Ambient Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 42%, rgba(0, 114, 245, 0.16) 0%, rgba(248, 250, 252, 0.95) 72%)',
        }}
      />

      {/* Header */}
      <div className="w-full text-center mt-1 sm:mt-2 z-10">
        <p className="text-[9px] sm:text-xs font-bold tracking-[0.25em] uppercase text-blue-600 font-sans">
          NEXT-GEN PLAYSTATION HARDWARE // ADUM SHOWROOM
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight mt-0.5 sm:mt-1 font-sans">
          PlayStation®5 Consoles
        </h2>
        <p className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wide uppercase mt-0.5 font-sans">
          PS5 PRO (2TB 4K@120FPS) & PS5 SLIM (1TB ULTRA-FAST SSD) // IN-STOCK IN KUMASI
        </p>
      </div>

      {/* Studio Pedestal Showcase: Photorealistic PS5 Pro + Slim on Illuminated Pedestal */}
      <div className="pedestal-showcase relative w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center z-20">
        {/* Illuminated Pedestal Visual with Dynamic Glow */}
        <div className="relative w-full max-w-lg md:max-w-xl max-h-[160px] sm:max-h-[195px] md:max-h-[215px] aspect-[16/8.5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-blue-200/80 bg-white/95 backdrop-blur-md flex items-center justify-center group">
          <Image
            src="/assets/hero/ps5_consoles_lineup.png"
            alt="PlayStation 5 Pro and PS5 Slim Consoles Studio Pedestal Lineup"
            fill
            unoptimized
            priority
            className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
          />

          {/* Active Model Banner Overlay */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md text-white border border-slate-800 shadow-lg">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider font-sans">
                {activeModel.modelName} • {activeModel.price}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white font-sans">
              IN-STOCK IN KUMASI
            </span>
          </div>
        </div>

        {/* Interactive Model / Skin Switcher */}
        <div className="mt-2 sm:mt-2.5 flex items-center justify-center flex-wrap gap-1.5 sm:gap-2.5">
          {consoleModels.map((model) => {
            const isSelected = selectedSkin === model.id;
            return (
              <button
                key={model.id}
                type="button"
                data-skin={model.id}
                aria-label={`Select ${model.modelName} ${model.skinName}`}
                onClick={() => {
                  setSelectedSkin(model.id);
                  onInteractionStart?.();
                }}
                className={`flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border text-[11px] sm:text-xs font-bold transition-all font-sans ${
                  isSelected
                    ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-500 hover:bg-blue-50/50'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: model.hex }}
                />
                <span>{model.modelName}</span>
                <span className="text-[9px] opacity-75 font-normal">({model.skinName})</span>
              </button>
            );
          })}
        </div>

        {/* Feature Badges */}
        <div className="mt-1.5 flex items-center justify-center space-x-3 text-[10px] sm:text-[11px] font-bold text-slate-600 font-sans">
          <span>⚡ 5.5GB/s Ultra-Fast SSD</span>
          <span>•</span>
          <span>🎮 DualSense Controller Included</span>
          <span>•</span>
          <span>🛡️ 1-Yr Local Kumasi Warranty</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center z-20 mt-1 sm:mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          data-testid="shop-controllers"
          onClick={() => scrollToSection('storefront')}
          aria-label="SHOP CONTROLLERS & SKINS • FROM GH₵ 950"
          className="shimmer-button-luxury inline-flex items-center space-x-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-[0_0_30px_rgba(0,114,245,0.4)] transition-all duration-300 font-sans border border-white/20"
        >
          <span>🛒</span>
          <span className="font-sans tabular-nums">SHOP CONTROLLERS & SKINS • FROM GH₵ 950 / PS5 FROM GH₵ 6,850</span>
        </motion.button>
      </div>
    </div>
  );
}

// ============================================================================
// SLIDE 3: LIMITED EDITION COLLECTOR SERIES (INTERACTIVE GAMEPAD COLORWAY STAGE)
// ============================================================================

type CollectorTeamId = 'gold' | 'red' | 'blue' | 'green';

interface CollectorTeam {
  id: CollectorTeamId;
  legacyId: '007-first-light' | 'god-of-war' | 'genshin-impact' | 'cyber-green';
  teamName: string;
  editionName: string;
  badge: string;
  accentHex: string;
  ringBrightHex: string;
  glowRgba: string;
  glowRgbaBright: string;
  backdropRadial: string;
  btnGradient: string;
  btnTextColor: string;
  activeBorder: string;
  image: string;
}

const COLLECTOR_TEAMS: CollectorTeam[] = [
  {
    id: 'gold',
    legacyId: '007-first-light',
    teamName: '007 First Light',
    editionName: '007 First Light Gold',
    badge: 'CHAMPAGNE GOLD // 007 EDITION',
    accentHex: '#E5B84B',
    ringBrightHex: '#FFF0B3',
    glowRgba: 'rgba(229, 184, 75, 0.45)',
    glowRgbaBright: 'rgba(245, 197, 85, 0.70)',
    backdropRadial:
      'radial-gradient(ellipse at 50% 48%, rgba(229, 184, 75, 0.30) 0%, rgba(217, 119, 6, 0.12) 42%, rgba(255, 255, 255, 0.95) 75%)',
    btnGradient: 'from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200',
    btnTextColor: 'text-slate-950',
    activeBorder: 'border-amber-500 ring-2 ring-amber-400/40 shadow-amber-500/25',
    image: '/assets/hero/carousel/collector_007_isolated.png',
  },
  {
    id: 'red',
    legacyId: 'god-of-war',
    teamName: 'God of War',
    editionName: 'God of War Crimson',
    badge: 'CRIMSON SPARTAN // GOD OF WAR',
    accentHex: '#E11937',
    ringBrightHex: '#FFA8B6',
    glowRgba: 'rgba(225, 25, 55, 0.45)',
    glowRgbaBright: 'rgba(255, 45, 75, 0.70)',
    backdropRadial:
      'radial-gradient(ellipse at 50% 48%, rgba(225, 25, 55, 0.28) 0%, rgba(153, 27, 27, 0.12) 42%, rgba(255, 255, 255, 0.95) 75%)',
    btnGradient: 'from-red-600 via-rose-500 to-red-500 hover:from-red-500 hover:to-rose-400',
    btnTextColor: 'text-white',
    activeBorder: 'border-red-500 ring-2 ring-red-400/40 shadow-red-500/25',
    image: '/assets/hero/carousel/collector_gow_isolated.png',
  },
  {
    id: 'blue',
    legacyId: 'genshin-impact',
    teamName: 'Genshin Impact',
    editionName: 'Genshin Impact Celestial',
    badge: 'CELESTIAL CYAN // GENSHIN IMPACT',
    accentHex: '#0072F5',
    ringBrightHex: '#6CE5E8',
    glowRgba: 'rgba(0, 114, 245, 0.45)',
    glowRgbaBright: 'rgba(6, 182, 212, 0.70)',
    backdropRadial:
      'radial-gradient(ellipse at 50% 48%, rgba(0, 114, 245, 0.28) 0%, rgba(6, 182, 212, 0.12) 42%, rgba(255, 255, 255, 0.95) 75%)',
    btnGradient: 'from-blue-600 via-blue-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300',
    btnTextColor: 'text-white',
    activeBorder: 'border-blue-500 ring-2 ring-blue-400/40 shadow-blue-500/25',
    image: '/assets/hero/carousel/collector_genshin_isolated.png',
  },
  {
    id: 'green',
    legacyId: 'cyber-green',
    teamName: 'Cyber Emerald',
    editionName: 'Cyber Emerald Matrix',
    badge: 'CYBER GREEN // MATRIX RUNNER',
    accentHex: '#10D778',
    ringBrightHex: '#A7F3D0',
    glowRgba: 'rgba(16, 215, 120, 0.40)',
    glowRgbaBright: 'rgba(52, 211, 153, 0.65)',
    backdropRadial:
      'radial-gradient(ellipse at 50% 48%, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.10) 42%, rgba(255, 255, 255, 0.95) 75%)',
    btnGradient: 'from-emerald-600 via-emerald-500 to-teal-400 hover:from-emerald-500 hover:to-teal-300',
    btnTextColor: 'text-white',
    activeBorder: 'border-emerald-500 ring-2 ring-emerald-400/40 shadow-emerald-500/25',
    image: '/assets/hero/carousel/collector_cyber_isolated.png',
  },
];

export function Slide3CollectorSeries({
  isActive,
  onInteractionStart,
  onInteractionEnd,
}: SlideProps) {
  const [selectedTeam, setSelectedTeam] = useState<CollectorTeamId>('gold');
  const containerRef = useRef<HTMLDivElement>(null);

  // Physics-based spring tilt for interactiveGamepad stage
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 220 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePrevTeam = () => {
    const currIdx = COLLECTOR_TEAMS.findIndex((t) => t.id === selectedTeam);
    const prevIdx = (currIdx - 1 + COLLECTOR_TEAMS.length) % COLLECTOR_TEAMS.length;
    setSelectedTeam(COLLECTOR_TEAMS[prevIdx].id);
    onInteractionStart?.();
  };

  const handleNextTeam = () => {
    const currIdx = COLLECTOR_TEAMS.findIndex((t) => t.id === selectedTeam);
    const nextIdx = (currIdx + 1) % COLLECTOR_TEAMS.length;
    setSelectedTeam(COLLECTOR_TEAMS[nextIdx].id);
    onInteractionStart?.();
  };

  const activeTeam = COLLECTOR_TEAMS.find((t) => t.id === selectedTeam) || COLLECTOR_TEAMS[0];

  const leftTeams = [COLLECTOR_TEAMS[0], COLLECTOR_TEAMS[1]]; // 007 Gold & God of War Red
  const rightTeams = [COLLECTOR_TEAMS[2], COLLECTOR_TEAMS[3]]; // Genshin Blue & Cyber Green

  const renderTeamCard = (team: CollectorTeam) => {
    const isSelected = selectedTeam === team.id;
    return (
      <motion.button
        key={team.id}
        whileHover={{ y: -3, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        type="button"
        data-theme-choice={team.legacyId}
        aria-label={`Select ${team.editionName} (${team.teamName})`}
        onClick={() => {
          setSelectedTeam(team.id);
          onInteractionStart?.();
        }}
        className={`relative flex flex-col items-center p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border transition-all duration-300 font-sans group w-32 sm:w-36 lg:w-44 ${
          isSelected
            ? `${team.activeBorder} bg-white shadow-xl scale-[1.03]`
            : 'bg-white/85 backdrop-blur-md border-slate-200/90 hover:border-slate-400 hover:bg-white shadow-md'
        }`}
      >
        {/* Active Pill Badge */}
        {isSelected && (
          <span
            className="absolute -top-2 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-extrabold text-white tracking-wider shadow-sm font-sans uppercase"
            style={{ backgroundColor: team.accentHex }}
          >
            ACTIVE
          </span>
        )}

        {/* Thumbnail Gamepad */}
        <div className="relative w-14 sm:w-16 lg:w-20 aspect-[16/11] my-1">
          <Image
            src={team.image}
            alt={team.editionName}
            fill
            unoptimized
            className="object-contain group-hover:scale-108 transition-transform duration-300"
          />
        </div>

        {/* Team Name */}
        <div className="flex items-center space-x-1.5 mt-1">
          <span
            className="w-2 h-2 rounded-full shadow-xs shrink-0"
            style={{ backgroundColor: team.accentHex }}
          />
          <span className="text-[11px] sm:text-xs font-extrabold text-slate-900 font-sans truncate">
            {team.teamName}
          </span>
        </div>

        {/* Subtitle */}
        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 font-sans truncate max-w-full">
          {team.editionName}
        </span>
      </motion.button>
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-2 pb-4 sm:pb-6 px-3 sm:px-6 lg:px-10 bg-gradient-to-b from-white via-slate-50 to-amber-50/20 text-slate-900 font-sans select-none overflow-hidden">
      {/* Ambient Electric Spotlight that shifts with active team color */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 transition-all duration-700"
        style={{
          background: activeTeam.backdropRadial,
        }}
      />

      {/* Background Watermark Typography (from Image 1 Reference) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-5 overflow-hidden select-none">
        <span className="text-[100px] sm:text-[140px] md:text-[190px] lg:text-[230px] font-black tracking-[0.25em] uppercase opacity-[0.035] text-slate-950 leading-none select-none font-sans italic transform -rotate-3">
          GAMING
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center mt-1 sm:mt-2 z-10">
        <p
          className="text-[9px] sm:text-xs font-bold tracking-[0.28em] uppercase font-sans transition-colors duration-300"
          style={{ color: activeTeam.accentHex }}
        >
          EXCLUSIVE CUSTOM BUILDS // SIGNATURE SERIES
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight mt-0.5 sm:mt-1 font-sans">
          Limited Edition Collector Series
        </h2>
      </div>

      {/* Symmetrical Flanking Stage: 2 Left Cards | Center Hero Gamepad | 2 Right Cards */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onInteractionStart?.()}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
          onInteractionEnd?.();
        }}
        className="relative w-full max-w-6xl mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-6 px-2 sm:px-4 z-20"
      >
        {/* LEFT FLANKING COLUMN: 2 Floating Collector Cards (007 Gold & God of War Red) */}
        <div className="flex lg:flex-col items-center justify-center gap-2.5 sm:gap-3.5 z-20 shrink-0 w-full lg:w-48 xl:w-56 order-2 lg:order-1">
          {leftTeams.map((team) => renderTeamCard(team))}
        </div>

        {/* CENTER HERO STAGE: Giant Floating Gamepad with 3D Orbital Halo Ring */}
        <div className="flex-1 flex flex-col items-center justify-center z-20 order-1 lg:order-2 w-full max-w-lg lg:max-w-xl">
          {/* Active Custom Build Badge Pill */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mb-1">
            <span
              className="w-2 h-2 rounded-full animate-pulse shadow-sm"
              style={{ backgroundColor: activeTeam.accentHex }}
            />
            <span className="text-slate-800 font-sans">{activeTeam.badge}</span>
          </div>

          {/* Floating Hero Scale Gamepad Container (Matching Slide 1 Hero Pad Scale) */}
          <motion.div
            style={{
              rotateX: tiltX,
              rotateY: tiltY,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.8,
              ease: 'easeInOut',
            }}
            className="relative w-64 sm:w-80 md:w-96 lg:w-[400px] xl:w-[440px] aspect-[16/11] flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
          >
            {/* Dynamic Core Radial Glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500"
              style={{
                background: activeTeam.glowRgba,
                filter: 'blur(40px)',
                transform: 'scale(1.1)',
              }}
            />
            <div className="relative w-full h-full">
              <Image
                key={activeTeam.id}
                src={activeTeam.image}
                alt={`Custom PS5 DualSense Controller - ${activeTeam.editionName} (${activeTeam.teamName})`}
                fill
                unoptimized
                priority
                className="object-contain transition-all duration-300"
                style={{
                  filter: `drop-shadow(0 18px 30px rgba(0, 0, 0, 0.22)) drop-shadow(0 0 28px ${activeTeam.glowRgba})`,
                }}
              />
            </div>
          </motion.div>

          {/* Illuminated Perspective Orbital Halo Ring (Image 1 Style) */}
          <div className="relative -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 w-72 sm:w-88 md:w-[420px] lg:w-[480px] xl:w-[520px] h-18 sm:h-22 md:h-26 flex items-center justify-center pointer-events-none z-0">
            {/* SVG 3D Perspective Ellipse Rings */}
            <svg
              viewBox="0 0 400 90"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <filter id={`orbital-glow-${activeTeam.id}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ambient Halo Blur Ellipse */}
              <ellipse
                cx="200"
                cy="45"
                rx="180"
                ry="28"
                fill="none"
                stroke={activeTeam.accentHex}
                strokeWidth="4"
                opacity="0.38"
                filter={`url(#orbital-glow-${activeTeam.id})`}
              />

              {/* Outer Perspective Ring */}
              <ellipse
                cx="200"
                cy="45"
                rx="174"
                ry="26"
                fill="none"
                stroke={activeTeam.accentHex}
                strokeWidth="1.5"
                opacity="0.75"
              />

              {/* Inner High-Luminance Perspective Ring */}
              <ellipse
                cx="200"
                cy="45"
                rx="156"
                ry="21"
                fill="none"
                stroke={activeTeam.ringBrightHex}
                strokeWidth="2"
                opacity="0.95"
                style={{
                  filter: `drop-shadow(0 0 10px ${activeTeam.glowRgbaBright})`,
                }}
              />
            </svg>

            {/* Illuminated Front-Center Luminous Node */}
            <div className="absolute bottom-0 sm:bottom-0.5 flex items-center justify-center pointer-events-none">
              <div
                className="absolute w-8 h-4 sm:w-10 sm:h-5 rounded-full blur-xs opacity-75"
                style={{ backgroundColor: activeTeam.ringBrightHex }}
              />
              <motion.div
                animate={{
                  scale: [0.95, 1.1, 0.95],
                  boxShadow: [
                    `0 0 10px ${activeTeam.accentHex}, inset 0 0 4px #ffffff`,
                    `0 0 20px ${activeTeam.ringBrightHex}, 0 0 8px #ffffff, inset 0 0 6px #ffffff`,
                    `0 0 10px ${activeTeam.accentHex}, inset 0 0 4px #ffffff`,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: 'easeInOut',
                }}
                className="relative w-4 h-2.5 sm:w-5 sm:h-3 rounded-full bg-white border border-white shadow-lg flex items-center justify-center"
              >
                <span
                  className="w-2 h-1 sm:w-2.5 sm:h-1.5 rounded-full"
                  style={{ backgroundColor: activeTeam.accentHex }}
                />
              </motion.div>
            </div>
          </div>

          {/* Interactive Slider Navigation Controls (Image 1 Signature [ ← ] [ ••• ] [ → ]) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 mt-1 sm:mt-1.5 z-20">
            <button
              type="button"
              onClick={handlePrevTeam}
              data-testid="collector-prev-team"
              aria-label="Cycle backward collector edition"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:text-slate-950 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Interactive Dots Track */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 py-1 rounded-full bg-white/85 border border-slate-200/80 shadow-xs">
              {COLLECTOR_TEAMS.map((team) => {
                const isCurrent = selectedTeam === team.id;
                return (
                  <button
                    key={team.id}
                    type="button"
                    data-theme-choice={team.legacyId}
                    onClick={() => {
                      setSelectedTeam(team.id);
                      onInteractionStart?.();
                    }}
                    aria-label={`Switch to ${team.editionName}`}
                    className={`transition-all duration-300 rounded-full ${
                      isCurrent
                        ? 'w-4 h-1.5 sm:w-5 sm:h-2'
                        : 'w-1.5 h-1.5 sm:w-2 sm:h-2 opacity-35 hover:opacity-75'
                    }`}
                    style={{ backgroundColor: team.accentHex }}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNextTeam}
              data-testid="collector-next-team"
              aria-label="Cycle forward collector edition"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:text-slate-950 active:scale-95 transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Accessible spec description for assistive tech and test runners */}
          <div className="sr-only" aria-hidden="true">
            1ms Low Latency, 12hr Battery Life, Adaptive Triggers
          </div>

          {/* CTA Button with Active Team Accent Gradient */}
          <div className="w-full flex justify-center z-20 mt-2 sm:mt-2.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              data-testid="order-collector"
              onClick={() => scrollToSection('storefront')}
              aria-label="ORDER COLLECTOR EDITION • GH₵ 1,200"
              className={`inline-flex items-center space-x-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-gradient-to-r ${activeTeam.btnGradient} ${activeTeam.btnTextColor} font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 font-sans border border-white/20`}
            >
              <span>⚡</span>
              <span className="font-sans tabular-nums">ORDER COLLECTOR EDITION • GH₵ 1,200</span>
            </motion.button>
          </div>
        </div>

        {/* RIGHT FLANKING COLUMN: 2 Floating Collector Cards (Genshin Blue & Cyber Green) */}
        <div className="flex lg:flex-col items-center justify-center gap-2.5 sm:gap-3.5 z-20 shrink-0 w-full lg:w-48 xl:w-56 order-3">
          {rightTeams.map((team) => renderTeamCard(team))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SLIDE 4: OVER 2,000 GAMES & DIRECT-TO-DRIVE HUB (AUTO-SCROLLING GAME CARDS)
// ============================================================================
export function Slide4GamesArchive({
  isActive,
  onInteractionStart,
  onInteractionEnd,
}: SlideProps) {
  const [selectedCat, setSelectedCat] = useState('action');
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [isHoveredShelf, setIsHoveredShelf] = useState(false);

  const showcaseGames = [
    {
      id: 'spiderman',
      title: "Marvel's Spider-Man Remastered",
      shortTitle: 'Spider-Man Remastered',
      genre: 'Action Adventure',
      platform: 'PS5 & PC',
      tagline: '4K 60FPS Ray-Traced Manhattan • DualSense Haptics',
      badge: '🔥 POPULAR',
      badgeBg: 'bg-amber-500 text-slate-950',
      price: 'GH₵ 60',
      actionLabel: 'Book Now',
      image: '/assets/hero/spiderman_card_art.jpg',
      themeGlow: 'rgba(239, 68, 68, 0.40)',
    },
    {
      id: 'gta',
      title: 'Grand Theft Auto VI & V',
      shortTitle: 'Grand Theft Auto VI',
      genre: 'Open World Crime',
      platform: 'PS5 & Next-Gen',
      tagline: 'Return to Vice City • Dynamic Weather & Next-Gen Heists',
      badge: '👑 TOP PRE-ORDER',
      badgeBg: 'bg-fuchsia-600 text-white',
      price: 'GH₵ 850',
      actionLabel: 'Pre-Order',
      image: '/assets/hero/gtavi_art_hd.jpg',
      themeGlow: 'rgba(192, 38, 211, 0.40)',
    },
    {
      id: 'fc27',
      title: 'EA SPORTS FC 27',
      shortTitle: 'EA Sports FC 27',
      genre: 'Sports Simulation',
      platform: 'PS5 & PS4',
      tagline: 'HyperMotionV Volumetric • 2026/27 Latest Global Squads',
      badge: '⚽ MATCHDAY',
      badgeBg: 'bg-emerald-600 text-white',
      price: 'GH₵ 750',
      actionLabel: 'Pre-Order',
      image: '/assets/hero/fc27_art_hd.jpg',
      themeGlow: 'rgba(16, 185, 129, 0.40)',
    },
    {
      id: 'tsushima',
      title: 'Ghost of Tsushima: Director\'s Cut',
      shortTitle: 'Ghost of Tsushima',
      genre: 'Samurai Action RPG',
      platform: 'PS5 Exclusive',
      tagline: 'Defend Tsushima • Feudal Kurosawa Aesthetic & Iki Island',
      badge: '🌸 MASTERPIECE',
      badgeBg: 'bg-rose-600 text-white',
      price: 'GH₵ 550',
      actionLabel: 'Quick Install',
      image: '/assets/hero/ghost_tsushima_card_art.jpg',
      themeGlow: 'rgba(244, 63, 94, 0.40)',
    },
    {
      id: 'leos-fortune',
      title: "Leo's Fortune: Steampunk Edition",
      shortTitle: "Leo's Fortune",
      genre: 'Steampunk Platformer',
      platform: 'PS5 & Laptops',
      tagline: 'Lush Physics Adventure • Clockwork Forests & Handcrafted Traps',
      badge: '✨ GOLD AWARD',
      badgeBg: 'bg-teal-500 text-slate-950',
      price: 'GH₵ 180',
      actionLabel: 'Play Now',
      image: '/assets/hero/leos_fortune_card_art.jpg',
      themeGlow: 'rgba(20, 184, 166, 0.40)',
    },
  ];

  // Auto-scroll the game cards every 3 seconds when active and not hovered
  useEffect(() => {
    if (!isActive || isHoveredShelf) return;
    const interval = setInterval(() => {
      setActiveGameIndex((prev) => (prev + 1) % showcaseGames.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isActive, isHoveredShelf, showcaseGames.length]);

  const currentGame = showcaseGames[activeGameIndex];

  const categories = [
    { id: 'action', testid: 'category-launcher-action', label: 'Action', desc: "Spider-Man, Call of Duty" },
    { id: 'sports', testid: 'category-launcher-sports', label: 'Sports & FC 25', desc: 'EA FC 27, NBA 2K25' },
    { id: 'open-world', testid: 'category-launcher-openworld', label: 'Open World / GTA', desc: 'GTA VI, Ghost of Tsushima' },
    { id: 'strategy', testid: 'category-launcher-strategy', label: 'Strategy & Adventure', desc: "Leo's Fortune, Tekken" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-2 pb-4 sm:pb-6 px-3 sm:px-6 lg:px-10 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 text-slate-900 font-sans select-none overflow-hidden">
      {/* Dynamic Ambient Spotlight matching active game color */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 48%, ${currentGame.themeGlow} 0%, rgba(248, 250, 252, 0.95) 75%)`,
        }}
      />

      {/* Header */}
      <div className="w-full text-center mt-1 sm:mt-2 z-10">
        <p className="text-[9px] sm:text-xs font-bold tracking-[0.28em] uppercase text-blue-600 font-sans">
          DIRECT-TO-DRIVE PRE-LOAD SERVICE // ADUM, KUMASI
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight mt-0.5 sm:mt-1 font-sans">
          Over 2,000 Games Available
        </h2>
        <p className="text-[10px] sm:text-xs font-semibold tracking-wide text-slate-600 uppercase mt-0.5 font-sans">
          IN-SHOP CONSOLE & PC GAME PRE-LOADS // BRING YOUR DRIVE TO ADUM, KUMASI
        </p>
      </div>

      {/* Auto-Scrolling Game Showcase Stage */}
      <div
        onMouseEnter={() => {
          setIsHoveredShelf(true);
          onInteractionStart?.();
        }}
        onMouseLeave={() => {
          setIsHoveredShelf(false);
          onInteractionEnd?.();
        }}
        className="relative w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center z-20"
      >
        {/* Main Highlight Card (Spider-Man Remastered Style from Image Reference) */}
        <div className="relative w-full max-w-xl max-h-[165px] sm:max-h-[195px] md:max-h-[210px] aspect-[16/8] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-slate-950 flex items-center justify-center group">
          <Image
            key={currentGame.id}
            src={currentGame.image}
            alt={currentGame.title}
            fill
            unoptimized
            priority
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/30" />

          {/* Top Floating Badge */}
          <div className="absolute top-2.5 left-3 flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-md ${currentGame.badgeBg}`}>
              {currentGame.badge}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
              {currentGame.platform}
            </span>
          </div>

          {/* Top Right Counter (e.g. 1 / 5) */}
          <div className="absolute top-2.5 right-3 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-slate-200 border border-slate-700/60 tabular-nums">
            {activeGameIndex + 1} / {showcaseGames.length}
          </div>

          {/* Bottom Card Details */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
            <div className="max-w-[70%]">
              <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight leading-tight truncate">
                {currentGame.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-300 truncate mt-0.5">
                {currentGame.tagline}
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="px-2.5 py-1 rounded-xl bg-blue-600/90 text-white font-extrabold text-[11px] sm:text-xs font-sans shadow-md">
                {currentGame.price}
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('installations')}
                aria-label={`${currentGame.actionLabel} ${currentGame.title}`}
                className="px-3 py-1 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-extrabold text-[11px] sm:text-xs font-sans transition-all shadow-md"
              >
                {currentGame.actionLabel}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive 5-Game Scrolling Shelf with Numbers [1, 2, 3, 4, 5] */}
        <div className="mt-2 sm:mt-2.5 grid grid-cols-5 gap-1.5 sm:gap-2 w-full max-w-xl">
          {showcaseGames.map((game, idx) => {
            const isSelected = activeGameIndex === idx;
            return (
              <button
                key={game.id}
                type="button"
                aria-label={`Select game ${game.title}`}
                onClick={() => {
                  setActiveGameIndex(idx);
                  onInteractionStart?.();
                }}
                className={`flex flex-col items-center p-1 sm:p-1.5 rounded-xl border text-center transition-all font-sans group ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105'
                    : 'bg-white border-slate-200/90 text-slate-800 hover:border-blue-400 hover:bg-blue-50/50 shadow-xs'
                }`}
              >
                <span className={`text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center mb-0.5 ${
                  isSelected ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold truncate w-full">
                  {game.shortTitle}
                </span>
                <span className={`text-[8px] truncate w-full ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {game.genre.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4 Category Launchers (Preserved for Navigation & Verification) */}
        <div className="mt-1.5 flex items-center justify-center flex-wrap gap-1 sm:gap-1.5 w-full max-w-xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              data-testid={cat.testid}
              aria-label={`Category ${cat.label}`}
              onClick={() => {
                setSelectedCat(cat.id);
                onInteractionStart?.();
              }}
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold transition-all font-sans ${
                selectedCat === cat.id
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-white/80 border-slate-200 text-slate-700 hover:border-slate-400'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center z-20 mt-1 sm:mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          data-testid="browse-installable"
          onClick={() => scrollToSection('installations')}
          aria-label="BROWSE INSTALLABLE TITLES • GH₵ 25/GAME"
          className="inline-flex items-center space-x-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-blue-500/25 transition-all duration-300 font-sans"
        >
          <span>🚀</span>
          <span className="font-sans tabular-nums">BROWSE INSTALLABLE TITLES • GH₵ 25/GAME</span>
        </motion.button>
      </div>
    </div>
  );
}

// ============================================================================
// SLIDE 5: GAMES MARKET & TRENDING RELEASES
// ============================================================================
export function Slide5GamesMarket({
  isActive,
  onInteractionStart,
  onInteractionEnd,
}: SlideProps) {
  const trendingGames = [
    { title: 'COD Modern Warfare 2', genre: 'FPS Shooter' },
    { title: 'Fortnite', genre: 'Battle Royale' },
    { title: 'Apex Legends', genre: 'Squad Shooter' },
    { title: 'Forza Horizon 5', genre: 'Open Racing' },
    { title: 'EA FC 25', genre: 'Sports' },
    { title: 'Cyberpunk 2077', genre: 'Action RPG' },
    { title: 'Spider-Man', genre: 'Action Adventure' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-2 pb-4 sm:pb-6 px-3 sm:px-6 lg:px-10 bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 text-slate-900 font-sans select-none overflow-hidden">
      {/* Dynamic Market Underglow with Electric Blue */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 114, 245, 0.12) 0%, rgba(248, 250, 252, 0.95) 75%)',
        }}
      />

      {/* Header */}
      <div className="w-full text-center mt-1 sm:mt-2 z-10">
        <p className="text-[9px] sm:text-xs font-bold tracking-[0.28em] uppercase text-emerald-700 font-sans">
          KUMASI GAMING MARKET // PHYSICAL & DIGITAL
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight mt-0.5 sm:mt-1 font-sans">
          Games Market & Trending Releases
        </h2>
      </div>

      {/* Symmetrical Split Market Stage + Trending Shelf */}
      <div className="relative w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center z-20">
        {/* Split Layout: Left GTA V / VI & Right Xbox Military Green */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
          {/* Left Card: GTA V / VI Showcase */}
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md p-2.5 sm:p-3 flex items-center space-x-3 overflow-hidden group cursor-pointer"
          >
            <div className="relative w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200/80">
              <Image
                src="/assets/hero/carousel/gamesmarket_hero_banner.jpg"
                alt="Grand Theft Auto VI GTA V"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-950 font-sans">Grand Theft Auto V & VI</h3>
              <p className="text-[10px] text-slate-600 font-sans">Physical Discs & Digital Pre-loads In Adum • From GH₵ 250</p>
            </div>
          </motion.div>

          {/* Right Card: Xbox Military Green */}
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-500/30 shadow-md p-2.5 sm:p-3 flex items-center space-x-3 overflow-hidden group cursor-pointer"
          >
            <div className="relative w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-emerald-500/20 bg-emerald-50">
              <Image
                src="/assets/hero/carousel/slide5_gamesmarket.jpg"
                alt="Xbox Military Green Controller & Console"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-950 font-sans">Xbox Military Green Controller</h3>
              <p className="text-[10px] text-emerald-700 font-bold font-sans">Get Started In Kumasi • GH₵ 950</p>
            </div>
          </motion.div>
        </div>

        {/* Shelf of 7 Trending Game Covers */}
        <div className="mt-2 sm:mt-2.5 w-full max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-sans">
            Trending Game Covers • From GH₵ 40
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {trendingGames.map((game, idx) => (
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                key={game.title}
                data-testid="game-cover-card"
                className="game-cover-card group p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all duration-200 hover:border-blue-400 cursor-pointer text-center"
              >
                <div className="w-full aspect-square rounded-lg bg-gradient-to-tr from-slate-100 to-slate-200 text-slate-800 font-bold text-[9px] mb-1 font-sans border border-slate-200 flex items-center justify-center">
                  {idx + 1}
                </div>
                <p className="text-[9px] font-bold text-slate-900 truncate font-sans">{game.title}</p>
                <p className="text-[8px] text-slate-500 truncate font-sans">{game.genre}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center z-20 mt-1 sm:mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          data-testid="view-all-games"
          onClick={() => scrollToSection('storefront')}
          aria-label="VIEW ALL 150+ PHYSICAL & DIGITAL GAMES • FROM GH₵ 40"
          className="inline-flex items-center space-x-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all duration-300 font-sans"
        >
          <span>🎮</span>
          <span className="font-sans tabular-nums">VIEW ALL 150+ PHYSICAL & DIGITAL GAMES • FROM GH₵ 40</span>
        </motion.button>
      </div>
    </div>
  );
}
