'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ArrowUpLeft, Gamepad } from 'lucide-react';
import PlayStationIcon from '@/components/icons/PlayStationIcon';

interface SlideProps {
  onExplore?: () => void;
  onPreOrder?: () => void;
}

export default function Slide1FeelTheGame({ onExplore, onPreOrder }: SlideProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-between pt-16 sm:pt-20 pb-8 px-6 sm:px-16 lg:px-20 select-none"
    >
      {/* Cinematic Electric Blue Radial Underglow Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(0, 114, 245, 0.44) 0%, rgba(10, 26, 68, 0.28) 42%, rgba(6, 9, 19, 0.98) 72%)'
        }}
      />

      {/* 1. EYEBROW & MASSIVE DISPLAY HEADLINE */}
      <div className="w-full text-center z-10">
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.42em] uppercase text-slate-300/90 font-sans">
          T H E &nbsp; N E X T &nbsp; G E N E R A T I O N &nbsp; O F &nbsp; P L A Y
        </p>
        <div className="py-1">
          <h1 className="text-[42px] sm:text-[68px] md:text-[92px] lg:text-[116px] font-extrabold tracking-[-0.04em] text-white leading-none whitespace-nowrap drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] font-sans">
            Feel the Game
          </h1>
        </div>
      </div>

      {/* 2. FLANKING KEYWORDS: CONTROL & THE FUTURE */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 flex items-center justify-between -mt-1 sm:mt-0 z-10 text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-slate-400 uppercase font-sans">
        <span>CONTROL</span>
        <span>THE FUTURE</span>
      </div>

      {/* 3. DOCK STAGE: [ LEFT GTA VI ] <--- [ DUALSENSE ] ---> [ RIGHT FC 27 ] */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-between gap-3 sm:gap-6 mt-1 z-20">
        
        {/* LEFT CARD: GTA VI */}
        <div className="relative w-36 sm:w-44 md:w-52 lg:w-56 shrink-0">
          <div className="w-full flex justify-center -mb-1 z-10">
            <span className="text-cyan-400 text-[10px] leading-none drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              ▼
            </span>
          </div>
          
          <div className="rounded-2xl bg-[#091122]/80 backdrop-blur-xl border border-cyan-500/25 p-2 sm:p-2.5 shadow-2xl hover:border-cyan-400/50 transition-all duration-300 group">
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

            <button
              type="button"
              onClick={onPreOrder || (() => handleScroll('installations'))}
              className="mt-2 w-full flex items-center space-x-2 text-left transition-all group/btn"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover/btn:scale-110 group-hover/btn:bg-cyan-400 transition-all">
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.6]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-200 group-hover/btn:text-white truncate font-sans">
                Place a pre-order
              </span>
            </button>
          </div>
        </div>

        {/* CENTER: 3D DUALSENSE CONTROLLER */}
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

          <div className="mt-1 text-white text-[10px] select-none animate-pulse">
            ▲
          </div>

          <button
            onClick={onExplore || (() => handleScroll('storefront'))}
            className="mt-2 inline-flex items-center space-x-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-[11px] sm:text-xs tracking-wider shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-300 font-sans"
          >
            <Gamepad className="w-3.5 h-3.5 text-slate-950 stroke-[2.4]" />
            <span>Explore Our Consoles</span>
          </button>
        </div>

        {/* RIGHT CARD: EA SPORTS FC 27 */}
        <div className="relative w-36 sm:w-44 md:w-52 lg:w-56 shrink-0">
          <div className="w-full flex justify-center -mb-1 z-10">
            <span className="text-cyan-400 text-[10px] leading-none drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              ▼
            </span>
          </div>

          <div className="rounded-2xl bg-[#091122]/80 backdrop-blur-xl border border-cyan-500/25 p-2 sm:p-2.5 shadow-2xl hover:border-cyan-400/50 transition-all duration-300 group">
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

            <button
              type="button"
              onClick={onPreOrder || (() => handleScroll('installations'))}
              className="mt-2 w-full flex items-center justify-between text-left transition-all group/btn"
            >
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-200 group-hover/btn:text-white truncate font-sans">
                Place a pre-order
              </span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover/btn:scale-110 group-hover/btn:bg-cyan-400 transition-all">
                <ArrowUpLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.6]" />
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* 4. BOTTOM CORNER TAGS */}
      <div className="w-full flex items-end justify-between mt-4 sm:mt-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300 font-sans z-10">
        <div className="leading-snug">
          <div>PLAY WITHOUT</div>
          <div>LIMITS</div>
        </div>
        <div className="text-right leading-snug">
          <div>A NEW LEVEL OF SPEED, IMMERSION</div>
          <div>AND CONTROL.</div>
        </div>
      </div>
    </div>
  );
}
