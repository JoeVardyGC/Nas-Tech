'use client';

import React from 'react';
import { HardDrive, Wrench, RefreshCw, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ServicesBanner() {
  const handleInquireService = (serviceName: string) => {
    const phone = '233500000000'; // Nas Tech WhatsApp
    const msg = `Hello Nas Tech! I am interested in your *${serviceName}* service. Could you please give me more details on pricing and turnaround time at your shop?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="services" className="py-16 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-sans uppercase tracking-widest">
            <span>MORE THAN JUST A STORE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            INSTALLATIONS, REPAIRS & SWAPS
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            We don&apos;t just sell equipment. We install games on your consoles and laptops, fix hardware faults, and let you swap your old devices for top-tier upgrades.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Game Installations */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:shadow-xl hover:shadow-cyan-500/10 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Digital Game Installations
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Bring in your Xbox, PlayStation, or Laptop. We install any AAA games directly to your hard drive with all updates included.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>500GB, 1TB & 2TB Drive Fill Bundles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Save Internet Data & Download Time</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>GTA V, FC 25, Call of Duty, Spider-Man</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleInquireService('Game Installation Service')}
              className="mt-6 flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold text-xs transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Book Game Installation</span>
            </button>
          </div>

          {/* Card 2: Repairs & Troubleshooting */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-500/10 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Console & Laptop Repairs
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Certified hardware technicians fixing Xbox, PS5, PS4, and gaming laptops with precision micro-soldering and genuine parts.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>HDMI Port Repair (No Signal Fixed)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>Overheating & Thermal Repasting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>Laptop Screen, Battery & SSD Upgrades</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleInquireService('Console & Laptop Repair')}
              className="mt-6 flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-bold text-xs transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire About Repairs</span>
            </button>
          </div>

          {/* Card 3: Swap & Trade-In Program */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:shadow-xl hover:shadow-emerald-500/10 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Device & Disc Swap Program
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Upgrade without paying full price. Trade in your older device, add a small cash top-up, and walk away with your dream hardware.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Xbox One / PS4 to PS5 / Series X Swaps</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Trade-in Used Laptops for High-End Models</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Finished Game Disc Swaps for New Titles</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleInquireService('Device & Disc Swap Program')}
              className="mt-6 flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get Swap Valuation</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
