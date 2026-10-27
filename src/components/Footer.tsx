'use client';

import React from 'react';
import { Gamepad2, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-slate-900 text-base">NAS TECH</span>
                <p className="text-[10px] text-blue-600 font-bold tracking-wider">GAMING & HARDWARE GH</p>
              </div>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Physical gaming store, console & laptop repair workshop, in-person game installation center, and trade-in hub in Kumasi, Ghana.
            </p>
            <div className="flex items-center space-x-2 text-emerald-700 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Technicians & Tested Hardware</span>
            </div>
          </div>

          {/* Store Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Hardware & Inventory</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#storefront" className="hover:text-blue-600 transition-colors">Xbox Series X|S & Xbox One Consoles</a></li>
              <li><a href="#storefront" className="hover:text-blue-600 transition-colors">PlayStation 5 & PS4 Consoles</a></li>
              <li><a href="#storefront" className="hover:text-blue-600 transition-colors">Gaming Laptops (RTX 4060, Core i7, Ryzen 7)</a></li>
              <li><a href="#storefront" className="hover:text-blue-600 transition-colors">Original Physical Game Discs</a></li>
              <li><a href="#storefront" className="hover:text-blue-600 transition-colors">Controllers, HDMI Ports & Replacement Parts</a></li>
            </ul>
          </div>

          {/* In-Shop Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">In-Shop Workshop Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#installations" className="hover:text-blue-600 transition-colors">Direct-to-Drive Game Pre-Loads</a></li>
              <li><a href="#repairs" className="hover:text-blue-600 transition-colors">Xbox & PS5 HDMI Port Micro-Soldering</a></li>
              <li><a href="#repairs" className="hover:text-blue-600 transition-colors">PS5 Liquid Metal Clean & Overheating Overhaul</a></li>
              <li><a href="#repairs" className="hover:text-blue-600 transition-colors">Laptop Screen, Battery & SSD Upgrades</a></li>
            </ul>
          </div>

          {/* Physical Location in Ghana */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Visit Our Kumasi Shop</h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Kumasi Gaming Commercial Center, Sawaba near St. Patrick Hotel, Ashanti Region, Ghana</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Mon – Sat: 8:30 AM – 7:30 PM (Closed Sundays)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <a href="tel:+233551659683" className="hover:text-blue-600 font-semibold">+233 55 165 9683</a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/233551659683"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-bold transition-all shadow-xs"
                >
                  <WhatsAppIcon colored className="w-4 h-4 shrink-0" />
                  <span>Chat With Us On WhatsApp (+233 55 165 9683)</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Nas Tech Gaming Ghana. All rights reserved. Prices in Ghanaian Cedis (GH₵).
          </div>
          <div className="flex space-x-4">
            <span className="text-slate-400 font-sans">Next.js 14 • Three.js • Primary Light Theme</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
