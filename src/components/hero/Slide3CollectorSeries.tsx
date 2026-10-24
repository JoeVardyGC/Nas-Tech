'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Battery, Zap, Gamepad, ShoppingCart, ShieldCheck } from 'lucide-react';
import PlayStationIcon from '@/components/icons/PlayStationIcon';

interface SlideProps {
  onExplore?: () => void;
}

const COLLECTORS = [
  {
    id: '007',
    legacyId: '007-first-light',
    teamName: '007 First Light',
    title: '007 FIRST LIGHT GOLD',
    subtitle: 'Limited Agent Edition',
    description: 'Metallic champagne gold finish with precision laser etching and signature custom haptic profiles.',
    priceGHS: 1200,
    accentColor: '#E5B84B',
    gradient: 'radial-gradient(circle at 50% 50%, rgba(229, 184, 75, 0.22) 0%, rgba(248, 250, 252, 0.95) 75%)',
    borderGlow: 'border-amber-500/40 shadow-amber-500/20',
    btnBg: 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950',
    image: '/assets/hero/carousel/collector_007_isolated.png',
  },
  {
    id: 'gow',
    legacyId: 'god-of-war',
    teamName: 'God of War',
    title: 'GOD OF WAR CRIMSON',
    subtitle: 'Ragnarök Spartan Tribute',
    description: 'Deep crimson metallic shell with textured warrior grips and high-response adaptive triggers.',
    priceGHS: 1200,
    accentColor: '#E11937',
    gradient: 'radial-gradient(circle at 50% 50%, rgba(225, 25, 55, 0.22) 0%, rgba(248, 250, 252, 0.95) 75%)',
    borderGlow: 'border-red-500/40 shadow-red-500/20',
    btnBg: 'bg-gradient-to-r from-red-600 via-rose-500 to-red-400 text-white',
    image: '/assets/hero/carousel/collector_gow_isolated.png',
  },
  {
    id: 'genshin',
    legacyId: 'genshin-impact',
    teamName: 'Genshin Impact',
    title: 'GENSHIN IMPACT CELESTIAL',
    subtitle: 'Celestia Realm Edition',
    description: 'Electric cobalt blue metallic finish with ultra-low latency wireless haptic response.',
    priceGHS: 1200,
    accentColor: '#0072F5',
    gradient: 'radial-gradient(circle at 50% 50%, rgba(0, 114, 245, 0.22) 0%, rgba(248, 250, 252, 0.95) 75%)',
    borderGlow: 'border-blue-500/40 shadow-blue-500/20',
    btnBg: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white',
    image: '/assets/hero/carousel/collector_genshin_isolated.png',
  },
  {
    id: 'cyber',
    legacyId: 'cyber-green',
    teamName: 'Cyber Emerald',
    title: 'CYBER EMERALD EDITION',
    subtitle: 'Matrix Runner Edition',
    description: 'Cyberpunk neon emerald shell with high-durability rubberized grips and dual vibration motors.',
    priceGHS: 1200,
    accentColor: '#10D778',
    gradient: 'radial-gradient(circle at 50% 50%, rgba(16, 215, 120, 0.22) 0%, rgba(248, 250, 252, 0.95) 75%)',
    borderGlow: 'border-emerald-500/40 shadow-emerald-500/20',
    btnBg: 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 text-white',
    image: '/assets/hero/carousel/collector_cyber_isolated.png',
  },
];

export default function Slide3CollectorSeries({ onExplore }: SlideProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = COLLECTORS[activeIdx];

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative w-full min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-between pt-16 sm:pt-20 pb-8 px-6 sm:px-16 lg:px-20 select-none text-slate-900 transition-all duration-700 bg-white"
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 transition-all duration-700"
        style={{ background: active.gradient }}
      />

      {/* 1. TOP HEADER */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-slate-600 font-sans">
          <PlayStationIcon className="w-5 h-5 text-slate-900" />
          <span>COLLECTOR SERIES // (PS5)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          {COLLECTORS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIdx(i)}
              data-theme-choice={c.legacyId}
              className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all font-sans ${
                activeIdx === i
                  ? 'bg-slate-950 text-white shadow-md scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {c.teamName}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN HERO STAGE */}
      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto z-20">
        {/* Left Column: Product Info & Buy */}
        <div className="md:col-span-5 space-y-4 text-left">
          <span
            className="text-[10px] sm:text-xs font-black tracking-widest uppercase font-sans"
            style={{ color: active.accentColor }}
          >
            ( {active.teamName.toUpperCase()} // SIGNATURE RIG )
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-slate-950 font-sans">
            {active.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-sm">
            {active.description}
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <button
              data-testid="order-collector"
              onClick={onExplore || (() => handleScroll('storefront'))}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all font-sans ${active.btnBg}`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>ORDER COLLECTOR EDITION • GH₵ {active.priceGHS}</span>
            </button>
          </div>
        </div>

        {/* Center: ONLY THE ISOLATED FLOATING GAMEPAD & DOCK UNDER IT */}
        <div className="md:col-span-4 flex flex-col items-center justify-center relative">
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
            className="relative w-56 sm:w-72 aspect-[16/11] flex items-center justify-center"
          >
            <div
              className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500"
              style={{
                background: active.accentColor,
                opacity: 0.22,
                filter: 'blur(36px)',
              }}
            />
            <Image
              key={active.id}
              src={active.image}
              alt={active.title}
              fill
              unoptimized
              priority
              className="object-contain"
              style={{
                filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2))',
              }}
            />
          </motion.div>

          {/* Illuminated Perspective Orbital Halo Ring */}
          <div className="relative -mt-8 sm:-mt-10 w-64 sm:w-80 h-16 flex items-center justify-center pointer-events-none z-0">
            <svg viewBox="0 0 320 80" className="w-full h-full overflow-visible" aria-hidden="true">
              <defs>
                <filter id={`hero-orbital-glow-${active.id}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <ellipse cx="160" cy="40" rx="140" ry="24" fill="none" stroke={active.accentColor} strokeWidth="3.5" opacity="0.35" filter={`url(#hero-orbital-glow-${active.id})`} />
              <ellipse cx="160" cy="40" rx="136" ry="22" fill="none" stroke={active.accentColor} strokeWidth="1.25" opacity="0.65" />
              <ellipse cx="160" cy="40" rx="122" ry="18" fill="none" stroke="#FFFFFF" strokeWidth="1.75" opacity="0.9" />
            </svg>
            <div className="absolute bottom-1 flex items-center justify-center">
              <div className="w-3 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] border border-white" />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            {COLLECTORS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveIdx(i)}
                data-theme-choice={c.legacyId}
                aria-label={`Select ${c.title}`}
                className={`relative p-1.5 rounded-xl border transition-all ${
                  activeIdx === i
                    ? 'border-slate-900 bg-white shadow-md scale-105'
                    : 'border-slate-200 bg-white/80 hover:border-slate-400'
                }`}
              >
                <div className="w-12 h-8 relative">
                  <Image src={c.image} alt={c.title} fill unoptimized className="object-contain" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Accessible spec description for assistive tech */}
        <div className="sr-only" aria-hidden="true">
          1ms Low Latency, 12hr Battery Life, Adaptive Triggers
        </div>
      </div>

      {/* 3. BOTTOM FOOTER TAG */}
      <div className="w-full flex items-end justify-between mt-2 pt-3 border-t border-slate-200/80 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 font-sans z-10">
        <div>LIMITED GLOBAL RUN // KUMASI SHOWROOM</div>
        <div className="text-right">AVAILABLE FOR IMMEDIATE DISPATCH IN GHANA</div>
      </div>
    </div>
  );
}
