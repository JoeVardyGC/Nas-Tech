'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

interface SlideProps {
  onExplore?: () => void;
}

const COLORWAYS = [
  {
    id: 'camo',
    name: 'Midnight Black Camo',
    tag: 'Stealth Edition',
    priceGHS: 950,
    inStock: true,
    chipColor: 'bg-slate-900 text-white'
  },
  {
    id: 'green',
    name: 'Cyber Chroma Green',
    tag: 'Trending Now',
    priceGHS: 950,
    inStock: true,
    chipColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'patriots',
    name: 'Special Ops Patriots',
    tag: 'Limited Stock',
    priceGHS: 1050,
    inStock: true,
    chipColor: 'bg-blue-600 text-white'
  }
];

export default function Slide2Colorways({ onExplore }: SlideProps) {
  const [selectedColor, setSelectedColor] = useState(0);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-between pt-16 sm:pt-20 pb-8 px-6 sm:px-16 lg:px-20 select-none bg-gradient-to-b from-white via-slate-50 to-blue-50/40 text-slate-900">
      
      {/* Soft High-Key Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.08) 0%, rgba(248, 250, 252, 0.95) 60%)'
        }}
      />

      {/* 1. EYEBROW & DISPLAY TITLE */}
      <div className="w-full text-center z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 font-sans">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OFFICIAL SONY ACCESSORIES // ADUM, KUMASI</span>
        </div>
        <h1 className="text-[34px] sm:text-[56px] md:text-[76px] lg:text-[92px] font-black tracking-[-0.035em] text-slate-950 leading-none font-sans drop-shadow-xs">
          DualSense™ Wireless
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-500 tracking-wide mt-2 font-sans">
          Next-level immersion with tactile feedback, dynamic adaptive triggers & custom colorways.
        </p>
      </div>

      {/* 2. CENTER STAGE: 3 CONTROLLERS ON ILLUMINATED STUDIO PEDESTAL */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-2 z-20">
        
        {/* Showcase Image Container */}
        <div className="relative w-full max-w-2xl aspect-[16/9] rounded-3xl overflow-hidden bg-white/60 backdrop-blur-md border border-slate-200/80 shadow-2xl p-4 flex items-center justify-center group">
          <Image
            src="/assets/hero/carousel/slide2_colorways.jpg"
            alt="DualSense Wireless Controllers Custom Colorways"
            fill
            unoptimized
            priority
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Interactive Colorway Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4">
          {COLORWAYS.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedColor(idx)}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                selectedColor === idx
                  ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${c.chipColor}`} />
              <span>{c.name}</span>
              <span className="text-[10px] opacity-75 font-normal">• GH₵ {c.priceGHS}</span>
            </button>
          ))}
        </div>

        {/* Feature Specs Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-3 text-[11px] font-semibold text-slate-600">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Dual Actuator Haptics</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Dynamic Triggers</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Instant Kumasi Shop Pickup</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mt-5">
          <button
            onClick={onExplore || (() => handleScroll('storefront'))}
            className="flex items-center space-x-2 px-7 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all font-sans"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Now • GH₵ {COLORWAYS[selectedColor].priceGHS}</span>
          </button>
          <a
            href={`https://wa.me/233551659683?text=Hello%20Nas%20Tech,%20I%20want%20to%20reserve%20the%20${encodeURIComponent(COLORWAYS[selectedColor].name)}%20DualSense%20controller.`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center space-x-2 px-5 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-all shadow-sm"
          >
            <WhatsAppIcon colored className="w-4 h-4" />
            <span>Reserve via WhatsApp</span>
          </a>
        </div>

      </div>

      {/* 3. BOTTOM TRUST BAR */}
      <div className="w-full flex items-end justify-between mt-2 pt-3 border-t border-slate-200/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 font-sans z-10">
        <div>GENUINE SONY HARDWARE</div>
        <div className="text-right">6-MONTH SHOP WARRANTY INCLUDED</div>
      </div>
    </div>
  );
}
