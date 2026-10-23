'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ArrowUpLeft, User, Gamepad } from 'lucide-react';
import PlayStationIcon from '@/components/icons/PlayStationIcon';
import { useCart } from '@/context/CartContext';

export default function Hero3D() {
  const { setIsCartOpen, cartCount } = useCart();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth 3D perspective tilt tracking on mouse hover
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -(y * 7),
      y: x * 9
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#060913] text-white selection:bg-blue-600 selection:text-white">
      {/* ========================================================
          HERO SECTION: 1:1 REPLICA OF THE PLAYSTATION 5 CONCEPT
         ======================================================== */}
      <section 
        id="hero"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-5 sm:pt-7 pb-6 sm:pb-8 px-3 sm:px-6 lg:px-10 overflow-hidden select-none"
      >
        {/* Cinematic Electric Blue Radial Underglow Spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, rgba(0, 114, 245, 0.44) 0%, rgba(10, 26, 68, 0.28) 42%, rgba(6, 9, 19, 0.98) 72%)'
          }}
        />

        {/* ----------------------------------------------------
            1. FLOATING WHITE PILL NAVBAR (Top Center)
           ---------------------------------------------------- */}
        <div className="w-full flex justify-center z-30">
          <header className="inline-flex items-center space-x-3.5 sm:space-x-7 px-4 sm:px-7 py-2 sm:py-2.5 rounded-full bg-white text-slate-900 shadow-2xl shadow-black/50 border border-white/90 transition-all font-sans">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 transition-colors"
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection('storefront')}
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 transition-colors"
            >
              GAMES
            </button>
            <button 
              onClick={() => scrollToSection('storefront')}
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 transition-colors"
            >
              ACCESSORIES
            </button>

            {/* PlayStation Official Logo */}
            <div className="px-1 sm:px-2 flex items-center justify-center text-slate-950">
              <PlayStationIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-none fill-current" />
            </div>

            <button 
              onClick={() => scrollToSection('storefront')}
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 transition-colors"
            >
              EXPLORE
            </button>
            <button 
              onClick={() => scrollToSection('repairs')}
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 transition-colors"
            >
              SUPPORT
            </button>

            {/* User Profile Circle / Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label="User Profile & Cart"
              className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-slate-300 hover:border-slate-900 flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-all"
            >
              <User className="w-3.5 h-3.5 stroke-[2.2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </header>
        </div>

        {/* ----------------------------------------------------
            2. EYEBROW & MASSIVE DISPLAY HEADLINE
           ---------------------------------------------------- */}
        <div className="w-full text-center mt-3 sm:mt-5 z-10">
          <p className="text-[9px] sm:text-xs font-semibold tracking-[0.42em] uppercase text-slate-300/90 font-sans">
            T H E &nbsp; N E X T &nbsp; G E N E R A T I O N &nbsp; O F &nbsp; P L A Y
          </p>
          <div className="py-0.5 sm:py-1">
            <h1 className="text-[40px] sm:text-[68px] md:text-[90px] lg:text-[112px] font-extrabold tracking-[-0.04em] text-white leading-none whitespace-nowrap drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] font-sans">
              Feel the Game
            </h1>
          </div>
        </div>

        {/* ----------------------------------------------------
            3. FLANKING KEYWORDS: CONTROL & THE FUTURE
           ---------------------------------------------------- */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 flex items-center justify-between -mt-1 sm:mt-0 z-10 text-[9px] sm:text-[11px] font-bold tracking-[0.28em] text-slate-400 uppercase font-sans">
          <span>CONTROL</span>
          <span>THE FUTURE</span>
        </div>

        {/* ----------------------------------------------------
            4. DOCK STAGE:
               [ LEFT GTA VI CARD ] <--- [ DUALSENSE CONTROLLER ] ---> [ RIGHT FC 27 CARD ]
           ---------------------------------------------------- */}
        <div className="relative w-full max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6 mt-1 z-20">
          
          {/* ===================================================
              LEFT CARD: GRAND THEFT AUTO VI PRE-ORDER
             =================================================== */}
          <div className="relative w-36 sm:w-44 md:w-52 lg:w-56 shrink-0">
            {/* Top Indicator Triangle ▼ */}
            <div className="w-full flex justify-center -mb-1 z-10">
              <span className="text-cyan-400 text-[10px] leading-none drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                ▼
              </span>
            </div>
            
            <div className="rounded-2xl bg-[#091122]/80 backdrop-blur-xl border border-cyan-500/25 p-2 sm:p-2.5 shadow-2xl hover:border-cyan-400/50 transition-all duration-300 group">
              {/* GTA VI Cover Artwork */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-inner bg-slate-950 border border-white/5">
                <Image
                  src="/assets/hero/gtavi_art_hd.jpg"
                  alt="Grand Theft Auto VI"
                  fill
                  unoptimized
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Action Button: ( ↗ ) Place a pre-order */}
              <button
                type="button"
                onClick={() => scrollToSection('installations')}
                className="mt-2 w-full flex items-center space-x-2 text-left transition-all group/btn"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover/btn:scale-110 group-hover/btn:bg-cyan-400 transition-all">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.6]" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-200 group-hover/btn:text-white truncate">
                  Place a pre-order
                </span>
              </button>
            </div>
          </div>

          {/* ===================================================
              CENTER: DOMINANT UPRIGHT DUALSENSE WIRELESS CONTROLLER
              With Glowing Cyan LED Light Strip & 3D Tilt
             =================================================== */}
          <div className="flex-1 flex flex-col items-center justify-center relative -my-5 sm:-my-7">
            <div 
              className="relative w-48 sm:w-64 md:w-72 lg:w-[350px] aspect-[16/11] transition-transform duration-200 ease-out flex items-center justify-center"
              style={{
                transform: isHovered
                  ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.04, 1.04, 1.04)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
              }}
            >
              <div className="relative w-full h-full drop-shadow-[0_20px_35px_rgba(0,114,245,0.45)]">
                <Image
                  src="/assets/hero/dualsense_hero_perfect_transparent.png"
                  alt="Sony PlayStation 5 DualSense Wireless Controller"
                  fill
                  unoptimized
                  priority
                  className="object-contain"
                  style={{
                    filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 24px rgba(0, 114, 245, 0.5))'
                  }}
                />
              </div>
            </div>

            {/* Glowing Upward White Triangle Indicator ▲ */}
            <div className="mt-1 text-white text-[10px] select-none animate-pulse">
              ▲
            </div>

            {/* Explore PS5 Action Pill Button */}
            <button
              onClick={() => scrollToSection('storefront')}
              className="mt-2 inline-flex items-center space-x-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-[11px] sm:text-xs tracking-wider shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-300 font-sans"
            >
              <Gamepad className="w-3.5 h-3.5 text-slate-950 stroke-[2.4]" />
              <span>Explore Our Consoles</span>
            </button>
          </div>

          {/* ===================================================
              RIGHT CARD: EA SPORTS FC 27 PRE-ORDER
             =================================================== */}
          <div className="relative w-36 sm:w-44 md:w-52 lg:w-56 shrink-0">
            {/* Top Indicator Triangle ▼ */}
            <div className="w-full flex justify-center -mb-1 z-10">
              <span className="text-cyan-400 text-[10px] leading-none drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                ▼
              </span>
            </div>

            <div className="rounded-2xl bg-[#091122]/80 backdrop-blur-xl border border-cyan-500/25 p-2 sm:p-2.5 shadow-2xl hover:border-cyan-400/50 transition-all duration-300 group">
              {/* FC 27 Cover Artwork */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-inner bg-slate-950 border border-white/5">
                <Image
                  src="/assets/hero/fc27_art_hd.jpg"
                  alt="EA Sports FC"
                  fill
                  unoptimized
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Action Button: Place a pre-order ( ↖ ) */}
              <button
                type="button"
                onClick={() => scrollToSection('installations')}
                className="mt-2 w-full flex items-center justify-between text-left transition-all group/btn"
              >
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-200 group-hover/btn:text-white truncate">
                  Place a pre-order
                </span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover/btn:scale-110 group-hover/btn:bg-cyan-400 transition-all">
                  <ArrowUpLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.6]" />
                </div>
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================
          SECOND SECTION: PROJECT OVERVIEW & CINEMATIC SHOWCASE CARD
          (Verbatim from reference image)
         ======================================================== */}
      <section id="concept-overview" className="w-full bg-white text-slate-900 border-t border-slate-200/80">
        
        {/* Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-3.5">
              <PlayStationIcon className="w-8 h-8 text-slate-950 shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                PlayStation 5 Landing Page Concept
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md font-medium leading-relaxed">
              A futuristic landing page concept inspired by the PlayStation 5 visual language. The design combines bold typography, the iconic silhouette, and immersive interactive hardware mechanics.
            </p>
          </div>

          {/* Subheader tracking row */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Landing Page</span>
            <span>01 / PROJECT OVERVIEW</span>
          </div>

          {/* Large Showcase Card with Blue Wave & Controller Closeup */}
          <div className="mt-8 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src="/assets/hero/concept_card_cropped.png"
              alt="PlayStation 5 Cinematic Controller Interface Overview"
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
        </div>

      </section>
    </div>
  );
}
