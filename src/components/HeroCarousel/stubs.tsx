'use client';

import React, { useState, useRef, MouseEvent } from 'react';
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
      className="relative w-full h-full flex flex-col justify-between pt-2 pb-24 sm:pb-28 px-3 sm:px-6 lg:px-10 overflow-hidden font-sans select-none"
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
      <div className="w-full text-center mt-2 sm:mt-4 z-10 font-sans">
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
        <div className="py-0.5 sm:py-1">
          <h1 className="text-[38px] sm:text-[64px] md:text-[84px] lg:text-[104px] font-extrabold tracking-[-0.04em] text-slate-950 leading-none whitespace-nowrap drop-shadow-[0_12px_24px_rgba(0,114,245,0.12)] font-sans">
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
          className="relative w-36 sm:w-44 md:w-52 lg:w-56 shrink-0"
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
            className="relative w-44 sm:w-60 md:w-72 lg:w-[340px] aspect-[16/11] flex items-center justify-center cursor-grab active:cursor-grabbing"
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
            className="shimmer-button-luxury mt-2 inline-flex items-center space-x-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-white font-bold text-xs sm:text-sm tracking-wider shadow-xl hover:shadow-[0_0_30px_rgba(0,114,245,0.45)] transition-all duration-300 font-sans border border-white/20"
          >
            <Gamepad className="w-3.5 h-3.5 text-white stroke-[2.4]" />
            <span className="font-sans">Explore Our Consoles</span>
          </motion.button>
        </div>

        {/* RIGHT CARD: EA SPORTS FC 27 */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative w-36 sm:w-44 md:w-52 lg:w-56 shrink-0"
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

      {/* 4. BOTTOM CORNER TAGS */}
      <div className="w-full flex items-end justify-between mt-3 sm:mt-5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600 font-sans z-10">
        <div className="leading-snug">
          <div>PLAY WITHOUT</div>
          <div>LIMITS</div>
        </div>
        <div className="text-right leading-snug">
          <div>A NEW LEVEL OF SPEED, IMMERSION</div>
          <div>AND CONTROL // GH₵ 8,500</div>
        </div>
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

  const colorways = [
    {
      id: 'midnight-camo' as const,
      name: 'Midnight Camo',
      hex: '#2b343b',
      accent: 'border-slate-800',
      badge: 'STEALTH SPEC',
    },
    {
      id: 'cyber-green' as const,
      name: 'Cyber Green',
      hex: '#10b981',
      accent: 'border-emerald-500',
      badge: 'NEON EDITION',
    },
    {
      id: 'tactical-patriots' as const,
      name: 'Tactical Patriots',
      hex: '#1e3a8a',
      accent: 'border-blue-700',
      badge: 'LIMITED KUMASI DROP',
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-4 pb-24 sm:pb-28 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 text-slate-900 font-sans select-none overflow-hidden">
      {/* Studio Electric Blue Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0, 114, 245, 0.14) 0%, rgba(248, 250, 252, 0.95) 70%)',
        }}
      />

      {/* Header */}
      <div className="w-full text-center mt-2 sm:mt-4 z-10">
        <p className="text-[9px] sm:text-xs font-bold tracking-[0.25em] uppercase text-blue-600 font-sans">
          NAS TECH KUMASI // ADUM SHOWROOM
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-tight mt-1 font-sans">
          DualSense™ Wireless Controllers
        </h2>
      </div>

      {/* Studio Pedestal Showcase */}
      <div className="pedestal-showcase relative w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center z-20">
        {/* Illuminated Pedestal Visual */}
        <div className="relative w-full max-w-2xl aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-blue-200/80 bg-white/90 backdrop-blur-md flex items-center justify-center">
          <Image
            src="/assets/hero/carousel/slide2_colorways.jpg"
            alt="DualSense Wireless Controllers Studio Pedestal Lineup"
            fill
            unoptimized
            priority
            className="object-cover"
          />
          {/* Active Skin Banner Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between px-4 py-2 rounded-2xl bg-slate-950/85 backdrop-blur-md text-white border border-slate-800">
            <span className="text-xs font-extrabold uppercase tracking-wider font-sans">
              ACTIVE SELECTION: {colorways.find((c) => c.id === selectedSkin)?.name}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white font-sans">
              IN-STOCK IN KUMASI
            </span>
          </div>
        </div>

        {/* Interactive Skin Switcher */}
        <div className="mt-4 flex items-center justify-center space-x-2 sm:space-x-3">
          {colorways.map((colorway) => {
            const isSelected = selectedSkin === colorway.id;
            return (
              <button
                key={colorway.id}
                type="button"
                data-skin={colorway.id}
                aria-label={`Select ${colorway.name} colorway`}
                onClick={() => {
                  setSelectedSkin(colorway.id);
                  onInteractionStart?.();
                }}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all font-sans ${
                  isSelected
                    ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-500 hover:bg-blue-50/50'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: colorway.hex }}
                />
                <span>{colorway.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          data-testid="shop-controllers"
          onClick={() => scrollToSection('storefront')}
          aria-label="SHOP CONTROLLERS & SKINS • FROM GH₵ 950"
          className="shimmer-button-luxury inline-flex items-center space-x-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:shadow-[0_0_30px_rgba(0,114,245,0.4)] transition-all duration-300 font-sans border border-white/20"
        >
          <span>🛒</span>
          <span className="font-sans tabular-nums">SHOP CONTROLLERS & SKINS • FROM GH₵ 950</span>
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
  glowRgba: string;
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
    teamName: 'Gold Team',
    editionName: '007 First Light Gold',
    badge: 'CHAMPAGNE GOLD // 007 EDITION',
    accentHex: '#E5B84B',
    glowRgba: 'rgba(229, 184, 75, 0.35)',
    backdropRadial:
      'radial-gradient(ellipse at 50% 48%, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.08) 40%, rgba(255, 255, 255, 0.95) 75%)',
    btnGradient: 'from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200',
    btnTextColor: 'text-slate-950',
    activeBorder: 'border-amber-500 ring-2 ring-amber-400/40 shadow-amber-500/25',
    image: '/assets/hero/carousel/gamepad_gold_isolated.png',
  },
  {
    id: 'red',
    legacyId: 'god-of-war',
    teamName: 'Red Team',
    editionName: 'God of War Crimson',
    badge: 'CRIMSON RED // GOD OF WAR',
    accentHex: '#E11937',
    glowRgba: 'rgba(225, 25, 55, 0.35)',
    backdropRadial:
      'radial-gradient(ellipse at 50% 48%, rgba(239, 68, 68, 0.22) 0%, rgba(185, 28, 28, 0.08) 40%, rgba(255, 255, 255, 0.95) 75%)',
    btnGradient: 'from-red-600 via-rose-500 to-red-500 hover:from-red-500 hover:to-rose-400',
    btnTextColor: 'text-white',
    activeBorder: 'border-red-500 ring-2 ring-red-400/40 shadow-red-500/25',
    image: '/assets/hero/carousel/gamepad_red_isolated.png',
  },
  {
    id: 'blue',
    legacyId: 'genshin-impact',
    teamName: 'Blue Team',
    editionName: 'Special Forces Cobalt',
    badge: 'ELECTRIC COBALT // CELESTIAL',
    accentHex: '#0072F5',
    glowRgba: 'rgba(0, 114, 245, 0.38)',
    backdropRadial:
      'radial-gradient(ellipse at 50% 48%, rgba(0, 114, 245, 0.22) 0%, rgba(6, 182, 212, 0.08) 40%, rgba(255, 255, 255, 0.95) 75%)',
    btnGradient: 'from-blue-600 via-blue-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300',
    btnTextColor: 'text-white',
    activeBorder: 'border-blue-500 ring-2 ring-blue-400/40 shadow-blue-500/25',
    image: '/assets/hero/carousel/gamepad_blue_isolated.png',
  },
  {
    id: 'green',
    legacyId: 'cyber-green',
    teamName: 'Green Team',
    editionName: 'Cyber Emerald',
    badge: 'CYBER GREEN // MATRIX RUNNER',
    accentHex: '#10D778',
    glowRgba: 'rgba(16, 215, 120, 0.35)',
    backdropRadial:
      'radial-gradient(ellipse at 50% 48%, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.08) 40%, rgba(255, 255, 255, 0.95) 75%)',
    btnGradient: 'from-emerald-600 via-emerald-500 to-teal-400 hover:from-emerald-500 hover:to-teal-300',
    btnTextColor: 'text-white',
    activeBorder: 'border-emerald-500 ring-2 ring-emerald-400/40 shadow-emerald-500/25',
    image: '/assets/hero/carousel/gamepad_green_isolated.png',
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

  const activeTeam = COLLECTOR_TEAMS.find((t) => t.id === selectedTeam) || COLLECTOR_TEAMS[0];

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-4 pb-24 sm:pb-28 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-slate-50 to-amber-50/20 text-slate-900 font-sans select-none overflow-hidden">
      {/* Ambient Electric Spotlight that shifts with active team color */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 transition-all duration-700"
        style={{
          background: activeTeam.backdropRadial,
        }}
      />

      {/* Header */}
      <div className="w-full text-center mt-2 sm:mt-4 z-10">
        <p
          className="text-[9px] sm:text-xs font-bold tracking-[0.28em] uppercase font-sans transition-colors duration-300"
          style={{ color: activeTeam.accentHex }}
        >
          EXCLUSIVE CUSTOM BUILDS // SIGNATURE SERIES
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-tight mt-1 font-sans">
          Limited Edition Collector Series
        </h2>
      </div>

      {/* Main Showcase Stage: ONLY THE FLOATING GAMEPAD & DYNAMIC LIGHTING */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onInteractionStart?.()}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
          onInteractionEnd?.();
        }}
        className="relative w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center z-20"
      >
        {/* Active Custom Build Badge Pill */}
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-2">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm"
            style={{ backgroundColor: activeTeam.accentHex }}
          />
          <span className="text-slate-800 font-sans">{activeTeam.badge}</span>
        </div>

        {/* Floating Isolated DualSense Gamepad Stage */}
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
            duration: 4.8,
            ease: 'easeInOut',
          }}
          className="relative w-48 sm:w-64 md:w-76 lg:w-[340px] aspect-[16/11] flex items-center justify-center cursor-grab active:cursor-grabbing my-1"
        >
          {/* Dynamic Ambient Underglow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500"
            style={{
              background: activeTeam.glowRgba,
              filter: 'blur(38px)',
              transform: 'scale(0.85)',
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
                filter: `drop-shadow(0 18px 28px rgba(0, 0, 0, 0.18)) drop-shadow(0 0 24px ${activeTeam.glowRgba})`,
              }}
            />
          </div>
        </motion.div>

        {/* Interactive Miniature Gamepad Selector Dock */}
        <div className="mt-2 w-full max-w-xl mx-auto px-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {COLLECTOR_TEAMS.map((team) => {
              const isSelected = selectedTeam === team.id;
              return (
                <motion.button
                  key={team.id}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  data-theme-choice={team.legacyId}
                  aria-label={`Select ${team.editionName} (${team.teamName})`}
                  onClick={() => {
                    setSelectedTeam(team.id);
                    onInteractionStart?.();
                  }}
                  className={`relative flex flex-col items-center p-2 rounded-2xl border transition-all duration-300 font-sans group ${
                    isSelected
                      ? `${team.activeBorder} bg-white shadow-lg scale-[1.03]`
                      : 'bg-white/85 backdrop-blur-md border-slate-200/90 hover:border-slate-400 hover:bg-white shadow-sm'
                  }`}
                >
                  {/* Miniature Isolated Gamepad */}
                  <div className="relative w-14 sm:w-16 aspect-[16/11] my-0.5">
                    <Image
                      src={team.image}
                      alt={team.editionName}
                      fill
                      unoptimized
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Color Dot & Team Name */}
                  <div className="flex items-center space-x-1.5 mt-1">
                    <span
                      className="w-2 h-2 rounded-full shadow-sm"
                      style={{ backgroundColor: team.accentHex }}
                    />
                    <span className="text-[11px] sm:text-xs font-extrabold text-slate-900 font-sans">
                      {team.teamName}
                    </span>
                  </div>

                  {/* Edition Subtitle */}
                  <span className="text-[9px] font-semibold text-slate-500 truncate max-w-full font-sans mt-0.5">
                    {team.editionName}
                  </span>

                  {/* Active Pill */}
                  {isSelected && (
                    <span
                      className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full text-[8px] font-extrabold text-white tracking-wider shadow-sm font-sans uppercase"
                      style={{ backgroundColor: team.accentHex }}
                    >
                      ACTIVE
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 3 Technical Spec Cards */}
        <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg">
          <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 py-1.5 sm:py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm text-slate-900">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold font-sans tabular-nums">⚡ 1ms Low Latency</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 py-1.5 sm:py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm text-slate-900">
            <Battery className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold font-sans tabular-nums">🔋 12hr Battery Life</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 py-1.5 sm:py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm text-slate-900">
            <Gamepad className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold font-sans">🎮 Adaptive Triggers</span>
          </div>
        </div>
      </div>

      {/* CTA Button with Active Team Accent Gradient */}
      <div className="w-full flex justify-center z-20 mt-2 sm:mt-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          data-testid="order-collector"
          onClick={() => scrollToSection('storefront')}
          aria-label="ORDER COLLECTOR EDITION • GH₵ 1,200"
          className={`inline-flex items-center space-x-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r ${activeTeam.btnGradient} ${activeTeam.btnTextColor} font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 font-sans border border-white/20`}
        >
          <span>⚡</span>
          <span className="font-sans tabular-nums">ORDER COLLECTOR EDITION • GH₵ 1,200</span>
        </motion.button>
      </div>
    </div>
  );
}

// ============================================================================
// SLIDE 4: OVER 2,000 GAMES & DIRECT-TO-DRIVE HUB
// ============================================================================
export function Slide4GamesArchive({
  isActive,
  onInteractionStart,
  onInteractionEnd,
}: SlideProps) {
  const [selectedCat, setSelectedCat] = useState('action');

  const categories = [
    { id: 'action', testid: 'category-launcher-action', label: 'Action', desc: "Call of Duty, Assassin's Creed" },
    { id: 'sports', testid: 'category-launcher-sports', label: 'Sports & FC 25', desc: 'EA FC 25, NBA 2K25, eFootball' },
    { id: 'open-world', testid: 'category-launcher-openworld', label: 'Open World / GTA', desc: 'GTA V, Red Dead Redemption 2' },
    { id: 'strategy', testid: 'category-launcher-strategy', label: 'Strategy', desc: 'Mortal Kombat, Tekken, Sims' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-4 pb-24 sm:pb-28 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-slate-50 to-blue-50/40 text-slate-900 font-sans select-none overflow-hidden">
      {/* Energetic Cobalt Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 112, 243, 0.18) 0%, rgba(248, 250, 252, 0.95) 75%)',
        }}
      />

      {/* Header */}
      <div className="w-full text-center mt-2 sm:mt-4 z-10">
        <p className="text-[9px] sm:text-xs font-bold tracking-[0.28em] uppercase text-blue-600 font-sans">
          DIRECT-TO-DRIVE PRE-LOAD SERVICE // ADUM, KUMASI
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-tight mt-1 font-sans">
          Over 2,000 Games Available
        </h2>
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-600 uppercase mt-1 font-sans">
          IN-SHOP CONSOLE & PC GAME PRE-LOADS // BRING YOUR DRIVE TO ADUM, KUMASI
        </p>
      </div>

      {/* Visual Stage: 3D Xbox Emerging from Cobalt Card */}
      <div className="relative w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center z-20">
        <div className="relative w-full max-w-2xl aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-blue-200/80 bg-white flex items-center justify-center">
          <Image
            src="/assets/hero/carousel/slide4_jamkey.jpg"
            alt="Over 2,000 Games Archive Hub & Direct-to-Drive Xbox Console"
            fill
            unoptimized
            priority
            className="object-cover"
          />
        </div>

        {/* 4 Category Launcher Cards */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-2xl">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={cat.id}
              type="button"
              data-testid={cat.testid}
              aria-label={`Category ${cat.label}`}
              onClick={() => {
                setSelectedCat(cat.id);
                onInteractionStart?.();
              }}
              className={`p-2.5 rounded-xl border text-left transition-all font-sans ${
                selectedCat === cat.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-blue-50/60 hover:border-blue-400 shadow-sm'
              }`}
            >
              <span className="block text-xs font-extrabold font-sans">{cat.label}</span>
              <span
                className={`block text-[10px] truncate font-sans ${
                  selectedCat === cat.id ? 'text-blue-100' : 'text-slate-500'
                }`}
              >
                {cat.desc}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          data-testid="browse-installable"
          onClick={() => scrollToSection('installations')}
          aria-label="BROWSE INSTALLABLE TITLES • GH₵ 25/GAME"
          className="inline-flex items-center space-x-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-blue-500/25 transition-all duration-300 font-sans"
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
    <div className="relative w-full h-full flex flex-col justify-between pt-4 pb-24 sm:pb-28 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 text-slate-900 font-sans select-none overflow-hidden">
      {/* Dynamic Market Underglow with Electric Blue */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 114, 245, 0.12) 0%, rgba(248, 250, 252, 0.95) 75%)',
        }}
      />

      {/* Header */}
      <div className="w-full text-center mt-2 sm:mt-4 z-10">
        <p className="text-[9px] sm:text-xs font-bold tracking-[0.28em] uppercase text-emerald-700 font-sans">
          KUMASI GAMING MARKET // PHYSICAL & DIGITAL
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-tight mt-1 font-sans">
          Games Market & Trending Releases
        </h2>
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-600 uppercase mt-1 font-sans">
          TRENDING TITLES, PHYSICAL DISCS & INSTANT INSTALLS
        </p>
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
        <div className="mt-4 w-full max-w-2xl">
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
      <div className="w-full flex justify-center z-20">
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
