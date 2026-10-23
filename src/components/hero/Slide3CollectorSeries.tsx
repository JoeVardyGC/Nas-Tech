'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BatteryCharging, Zap, ChevronLeft, ChevronRight, ShoppingCart, ShieldCheck } from 'lucide-react';
import PlayStationIcon from '@/components/icons/PlayStationIcon';

interface SlideProps {
  onExplore?: () => void;
}

const COLLECTORS = [
  {
    id: '007',
    title: '007 FIRST LIGHT',
    subtitle: 'Limited Agent Edition',
    description: 'Gold metallic finish with precision laser engraving and custom haptic feedback profiles.',
    priceGHS: 1200,
    accentColor: '#EAB308',
    gradient: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.28) 0%, rgba(18, 14, 5, 0.85) 50%, #060913 90%)',
    borderGlow: 'border-amber-500/30 shadow-amber-500/20',
    btnBg: 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950',
    image: '/assets/hero/carousel/collector_007_gold.jpg'
  },
  {
    id: 'genshin',
    title: 'GENSHIN IMPACT',
    subtitle: 'Celestia Realm Edition',
    description: 'Frosted cyan accents with celestial star motifs and zero-latency wireless connectivity.',
    priceGHS: 1200,
    accentColor: '#06B6D4',
    gradient: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, rgba(10, 24, 40, 0.85) 50%, #060913 90%)',
    borderGlow: 'border-cyan-500/30 shadow-cyan-500/20',
    btnBg: 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white',
    image: '/assets/hero/carousel/collector_genshin_cyan.jpg'
  },
  {
    id: 'gow',
    title: 'GOD OF WAR',
    subtitle: 'Ragnarök Spartan Tribute',
    description: 'Textured crimson war slash detailing with ultra-durable grip pads for competitive gaming.',
    priceGHS: 1200,
    accentColor: '#EF4444',
    gradient: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.3) 0%, rgba(28, 10, 10, 0.85) 50%, #060913 90%)',
    borderGlow: 'border-red-500/30 shadow-red-500/20',
    btnBg: 'bg-gradient-to-r from-red-600 to-rose-700 text-white',
    image: '/assets/hero/carousel/collector_gow_crimson.jpg'
  }
];

export default function Slide3CollectorSeries({ onExplore }: SlideProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = COLLECTORS[activeIdx];

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % COLLECTORS.length);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + COLLECTORS.length) % COLLECTORS.length);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="relative w-full min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-between pt-16 sm:pt-20 pb-8 px-6 sm:px-16 lg:px-20 select-none text-white transition-all duration-700"
      style={{ background: active.gradient }}
    >
      {/* 1. TOP HEADER */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-slate-400 font-sans">
          <PlayStationIcon className="w-5 h-5 text-white" />
          <span>COLLECTOR SERIES // (PS5)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          {COLLECTORS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIdx(i)}
              className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all ${
                activeIdx === i
                  ? 'bg-white text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-slate-300'
              }`}
            >
              {c.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN HERO STAGE */}
      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto z-20">
        
        {/* Left Column: Product Info & Buy */}
        <div className="md:col-span-5 space-y-4 text-left">
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-400 uppercase font-sans">
            ( LIMITED EDITION CONTROLLER )
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white font-sans drop-shadow-md">
            {active.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-sm">
            {active.description}
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={onExplore || (() => handleScroll('storefront'))}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all font-sans ${active.btnBg}`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Buy Collector Rig • GH₵ {active.priceGHS}</span>
            </button>
          </div>
        </div>

        {/* Center: Collector Display Artwork */}
        <div className="md:col-span-4 flex flex-col items-center justify-center relative">
          <div className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border ${active.borderGlow} shadow-2xl p-2 group`}>
            <Image
              src={active.image}
              alt={active.title}
              fill
              unoptimized
              priority
              className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Interactive Prev/Next Arrows */}
          <div className="flex items-center space-x-3 mt-4">
            <button
              onClick={handlePrev}
              aria-label="Previous Collector Edition"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold tracking-wider text-slate-400">
              0{activeIdx + 1} / 0{COLLECTORS.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next Collector Edition"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Spec Cards (12hr Battery, 1ms Latency) */}
        <div className="md:col-span-3 flex md:flex-col justify-center gap-3">
          <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-3.5 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white">12 hr</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Battery Life</div>
            </div>
          </div>

          <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-3.5 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white">1 ms</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Low Latency</div>
            </div>
          </div>

          <div className="hidden md:flex rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-3.5 items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white">100%</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Sony Original</div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM FOOTER TAG */}
      <div className="w-full flex items-end justify-between mt-2 pt-3 border-t border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 font-sans z-10">
        <div>LIMITED GLOBAL RUN</div>
        <div className="text-right">AVAILABLE FOR IMMEDIATE DISPATCH IN GHANA</div>
      </div>
    </div>
  );
}
