'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MapPin, Clock, Phone, ShieldCheck, Wrench, HardDrive, RefreshCw } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'How does the Digital Game Installation service work?',
    a: 'You simply bring your gaming console (PS5, PS4, Xbox Series X|S, Xbox One) or your gaming laptop/external hard drive to our shop in Kumasi. You pick any combination of games from our library. We pre-load them directly to your internal/external drive with all the latest patches. This saves your internet data and takes only 2 to 4 hours!'
  },
  {
    q: 'How do Console & Laptop Swaps (Trade-Ins) work?',
    a: 'Bring your current console (e.g. PS4 Slim/Pro or Xbox One), laptop, or completed game disc to our showroom. Our technicians perform a quick 10-minute physical and diagnostic check, determine your trade-in credit, and you pay only the small cash top-up difference to take home your upgraded PS5, Xbox Series X, or RTX Gaming Laptop.'
  },
  {
    q: 'What kind of repairs and troubleshooting do you handle?',
    a: 'We specialize in board-level micro-soldering: Xbox & PS5 HDMI 2.1 port replacements, liquid metal repasting for overheating shutoffs, analog stick drift repairs (with magnetic Hall Effect upgrades), and laptop repairs (144Hz screen replacement, keyboard repair, SSD upgrades, and clean Windows installation).'
  },
  {
    q: 'Do your consoles, laptops, and repairs come with a warranty?',
    a: 'Yes! Brand new items come with full manufacturer warranty. Pre-owned and foreign used laptops/consoles undergo extensive thermal stress tests and include our 30-to-90-day shop warranty. All HDMI micro-soldering and screen repairs are covered with a 90-day guarantee.'
  },
  {
    q: 'Can I purchase physical game discs and swap them later?',
    a: 'Absolutely. Every original game disc bought from Nas Tech is automatically eligible for our Disc Swap program. When you finish the storyline, bring the scratch-free disc back to our shop to trade it for another title at a fraction of the retail cost.'
  }
];

export default function WorkshopFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Workshop Location & Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-sans uppercase tracking-widest mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>KUMASI SHOWROOM & LAB</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                VISIT NAS TECH GAMING
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Drop in for same-day console repairs, game installations, swap valuations, or to test out gaming hardware in person.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3.5 text-xs">
              <div className="flex items-start space-x-3 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Showroom & Workshop Address:</div>
                  <div className="text-slate-400">Kumasi Gaming Commercial Center, Ashanti Region, Ghana</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Opening Hours:</div>
                  <div className="text-slate-400">Monday – Saturday: 8:30 AM – 7:30 PM (Closed Sundays)</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Direct Line / WhatsApp Dispatch:</div>
                  <div className="text-emerald-400 font-sans font-bold">+233 50 000 0000</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div className="font-bold text-white">90-Day Warranty</div>
                <div className="text-[11px] text-slate-500">On all micro-soldering & repairs</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                <Clock className="w-4 h-4 text-cyan-400" />
                <div className="font-bold text-white">Fast Turnaround</div>
                <div className="text-[11px] text-slate-500">2-4hr game installs & diagnostics</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Frequently Asked Questions</span>
            </h4>

            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  >
                    <span className="font-bold text-xs sm:text-sm text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
