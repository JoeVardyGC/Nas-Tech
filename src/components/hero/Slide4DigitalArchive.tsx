'use client';

import React from 'react';
import Image from 'next/image';
import { HardDrive, ArrowRight, DownloadCloud, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface SlideProps {
  onExplore?: () => void;
}

const CATEGORIES = [
  { name: 'Action & Shooters', count: '450+ Games', color: 'from-blue-600 to-cyan-500' },
  { name: 'Sports & FC 25', count: '120+ Games', color: 'from-emerald-500 to-teal-600' },
  { name: 'RPG & Open World', count: '380+ Games', color: 'from-amber-500 to-orange-600' },
  { name: 'Racing & Speed', count: '90+ Games', color: 'from-purple-600 to-pink-500' }
];

export default function Slide4DigitalArchive({ onExplore }: SlideProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-between pt-16 sm:pt-20 pb-8 px-6 sm:px-16 lg:px-20 select-none bg-gradient-to-br from-[#0c1e42] via-[#09152e] to-[#060913] text-white">
      
      {/* Background Energy Glow */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(37, 99, 235, 0.35) 0%, rgba(6, 9, 19, 0.95) 70%)'
        }}
      />

      {/* 1. TOP EYEBROW */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider font-sans">
          <DownloadCloud className="w-3.5 h-3.5" />
          <span>IN-SHOP DIGITAL PRE-LOAD ARCHIVE</span>
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
          KUMASI DRIVE-LOAD CLINIC
        </span>
      </div>

      {/* 2. MAIN JAMKEY-STYLE HERO STAGE */}
      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto z-20">
        
        {/* Left Massive Showcase Card */}
        <div className="lg:col-span-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 max-w-md space-y-3">
            <span className="text-[11px] sm:text-xs font-black tracking-widest text-cyan-200 uppercase font-sans">
              OVER 2,000 CONSOLE & PC GAMES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-none font-sans drop-shadow-md">
              Direct-to-Drive Installations
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Skip slow internet downloads. Bring your external hard drive, PlayStation, or Xbox to our shop in Adum, Kumasi for instant game copies.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExplore || (() => handleScroll('installations'))}
                className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-blue-700 font-extrabold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all font-sans"
              >
                <span>View Full Game Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-white/90">
                From GH₵ 25 / game
              </span>
            </div>
          </div>

          {/* Right Blueprint Artwork */}
          <div className="hidden sm:block absolute -right-6 -bottom-6 w-72 h-72 opacity-90 group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
            <Image
              src="/assets/hero/carousel/jamkey_hero_banner.jpg"
              alt="Jamkey Xbox Controller Blueprint"
              fill
              unoptimized
              priority
              className="object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Right Column: Fast Category Tiles */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat, i) => (
            <div
              key={i}
              onClick={onExplore || (() => handleScroll('installations'))}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-blue-400/50 cursor-pointer transition-all duration-300 group"
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white mb-2 shadow-sm group-hover:scale-110 transition-transform`}>
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                {cat.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                {cat.count}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* 3. BOTTOM TRUST BAR */}
      <div className="w-full flex items-end justify-between mt-2 pt-3 border-t border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 font-sans z-10">
        <div>100% CLEAN FILES • ZERO VIRUSES</div>
        <div className="text-right">ADUM POST OFFICE ROAD, KUMASI</div>
      </div>
    </div>
  );
}
