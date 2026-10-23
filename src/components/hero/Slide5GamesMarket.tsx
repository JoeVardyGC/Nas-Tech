'use client';

import React from 'react';
import Image from 'next/image';
import { Gamepad2, Disc, ArrowRight, Star, Flame } from 'lucide-react';

interface SlideProps {
  onExplore?: () => void;
}

const FEATURED_GAMES = [
  { title: 'Call of Duty: MW', platform: 'PS5 & Xbox', tag: 'Hot', priceGHS: 650 },
  { title: 'EA Sports FC 25', platform: 'PS5 & Xbox', tag: 'Best Seller', priceGHS: 850 },
  { title: 'Forza Horizon 5', platform: 'Xbox & PC', tag: 'Top Rated', priceGHS: 600 },
  { title: 'Cyberpunk 2077', platform: 'PS5 & Xbox', tag: '4K 60fps', priceGHS: 550 },
  { title: 'Spider-Man 2', platform: 'PS5 Exclusive', tag: 'Blockbuster', priceGHS: 750 }
];

export default function Slide5GamesMarket({ onExplore }: SlideProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-between pt-16 sm:pt-20 pb-8 px-6 sm:px-16 lg:px-20 select-none bg-gradient-to-b from-slate-100 via-slate-50 to-indigo-50/30 text-slate-900">
      
      {/* Background Studio Glow */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.08) 0%, rgba(248, 250, 252, 0.95) 70%)'
        }}
      />

      {/* 1. TOP HEADER */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider font-sans">
          <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>TRENDING TITLES & ORIGINAL GAME DISCS</span>
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">
          PHYSICAL DISCS • READY FOR PICKUP
        </span>
      </div>

      {/* 2. SPLIT HERO BANNER & SHELF */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col justify-center my-auto space-y-4 z-20">
        
        {/* Top Split Banners */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          
          {/* Left Banner: Grand Theft Auto Feature */}
          <div className="md:col-span-7 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between group">
            <div className="relative z-10 max-w-sm space-y-2">
              <div className="flex items-center space-x-1 text-amber-400 text-xs">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
                Grand Theft Auto VI
              </h3>
              <p className="text-xs text-slate-300 font-medium line-clamp-2">
                Pre-order and prepare for the biggest entertainment launch in history. Physical disc & digital pre-load reservations open.
              </p>
            </div>

            <div className="relative z-10 mt-4 flex items-center space-x-3">
              <button
                onClick={onExplore || (() => handleScroll('storefront'))}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all font-sans"
              >
                Pre-Order In Kumasi
              </button>
            </div>

            {/* Split artwork in background */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/assets/hero/carousel/gamesmarket_hero_banner.jpg"
                alt="Games Market Grand Theft Auto Showcase"
                fill
                unoptimized
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Banner: Hardware Pack & Gamepad */}
          <div className="md:col-span-5 rounded-3xl bg-emerald-50/80 border border-emerald-200/80 p-5 sm:p-6 shadow-md flex flex-col justify-between text-slate-900 group">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 font-sans">
                KUMASI GAMING LAB
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 mt-1 font-sans">
                Consoles & Custom Controllers
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Xbox Series X|S, PS5, and pro gamepads in stock with warranty.
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={onExplore || (() => handleScroll('storefront'))}
                className="flex items-center space-x-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 font-sans"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Shelf of Trending Titles */}
        <div className="pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 font-sans">
            Popular in Store Today
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {FEATURED_GAMES.map((game, i) => (
              <div
                key={i}
                onClick={onExplore || (() => handleScroll('storefront'))}
                className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-1">
                  <span className="truncate">{game.platform}</span>
                  <span className="text-rose-600 font-bold">{game.tag}</span>
                </div>
                <h5 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 truncate font-sans">
                  {game.title}
                </h5>
                <div className="text-xs font-black text-slate-950 mt-1">
                  GH₵ {game.priceGHS}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. BOTTOM TRUST BAR */}
      <div className="w-full flex items-end justify-between mt-2 pt-3 border-t border-slate-200/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 font-sans z-10">
        <div>ORIGINAL DISCS & SEALED PACKAGING</div>
        <div className="text-right">IMMEDIATE COURIER DISPATCH ACROSS GHANA</div>
      </div>
    </div>
  );
}
