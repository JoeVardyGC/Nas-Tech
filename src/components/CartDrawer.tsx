'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Store,
  Gamepad2,
  Disc,
  Wrench,
  CheckCircle2,
  MapPin,
  Plus,
  Minus,
  Zap,
  Check
} from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalGHS,
    formatGHS,
    generateWhatsAppLink,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>('pickup');

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const fullAddress = deliveryMode === 'pickup'
      ? `In-Shop Pickup (Adum Showroom, Kumasi) ${deliveryAddress ? `- Note: ${deliveryAddress}` : ''}`
      : `Doorstep Delivery: ${deliveryAddress || 'Kumasi'}`;
    const link = generateWhatsAppLink(customerName, fullAddress);
    window.open(link, '_blank');
  };

  // Gamified Kumasi Free Perk Threshold (GH₵ 1,200)
  const PERK_TARGET = 1200;
  const perkProgress = Math.min(100, Math.round((totalGHS / PERK_TARGET) * 100));
  const amountToPerk = Math.max(0, PERK_TARGET - totalGHS);

  const quickLocations = ['Adum', 'KNUST', 'Bantama', 'Ahodwo', 'Asokwa', 'Accra Dispatch'];

  const scrollToSection = (id: string) => {
    setIsCartOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      data-testid="cart-modal"
      className="cart-drawer fixed inset-0 z-50 overflow-hidden font-sans select-none"
    >
      {/* 1. Ambient Frosted Glass Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* 2. Slide-In Vault Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-12">
        <div className="w-screen max-w-md bg-white border-l border-slate-200/90 text-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col relative z-10 animate-in slide-in-from-right duration-300 ease-out">
          
          {/* Top Neon Shimmer Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 shrink-0" />

          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-200/80 bg-gradient-to-b from-slate-50/90 to-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-600/25">
                <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="font-extrabold text-sm tracking-tight text-slate-950 uppercase font-sans">
                    Nas Tech Vault
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-black tabular-nums">
                    {cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Adum, Kumasi Showroom Inventory</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              data-testid="close-cart"
              className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Perks Gamification Meter */}
          {cart.length > 0 && (
            <div className="px-5 py-2.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-cyan-50/80 border-b border-blue-100/80 shrink-0">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 mb-1.5">
                <span className="flex items-center gap-1 text-blue-700">
                  <Zap className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                  {perkProgress >= 100 ? (
                    <span className="text-emerald-700 font-extrabold">🎉 Free Kumasi Express Delivery Unlocked!</span>
                  ) : (
                    <span>Add {formatGHS(amountToPerk)} for Free Express Delivery</span>
                  )}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">{perkProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200/90 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    perkProgress >= 100
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-400'
                  }`}
                  style={{ width: `${perkProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items Scrollable List or Catchy Empty State */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8 space-y-4">
                {/* Floating Controller Icon with Glowing Rings */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500/15 blur-xl animate-pulse" />
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-50 to-indigo-50 border-2 border-blue-200/80 flex items-center justify-center text-blue-600 shadow-lg shadow-blue-500/10">
                    <Gamepad2 className="w-10 h-10 stroke-[1.8]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                    Your Gaming Vault is Empty
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Lock in authentic PlayStation & Xbox consoles, 4K original game discs, or pre-load 2,000+ digital titles directly to your drive.
                  </p>
                </div>

                {/* Catchy Quick-Jump Categories */}
                <div className="w-full max-w-xs pt-2 grid grid-cols-2 gap-2 text-left">
                  <button
                    onClick={() => scrollToSection('storefront')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 transition-all flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-blue-600"
                  >
                    <Gamepad2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate">Consoles</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('storefront')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 transition-all flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-blue-600"
                  >
                    <Disc className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="truncate">Game Discs</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('installations')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 transition-all flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-blue-600"
                  >
                    <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate">Pre-Loads</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('repairs')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 transition-all flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-blue-600"
                  >
                    <Wrench className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">Repair Lab</span>
                  </button>
                </div>

                <button
                  onClick={() => scrollToSection('storefront')}
                  className="w-full max-w-xs mt-3 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-blue-600/25 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Explore Kumasi Store Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="group relative flex space-x-3.5 p-3.5 rounded-2xl bg-slate-50/90 hover:bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200/80 shrink-0 p-1 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-0.5 rounded-md hover:bg-rose-50"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200/60">
                        {item.product.condition}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-medium">
                        Unit: {formatGHS(item.product.priceGHS)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Catchy Quantity Stepper */}
                      <div className="flex items-center border border-slate-300/90 rounded-lg bg-white px-1 py-0.5 text-xs shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md font-bold transition-colors"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-extrabold text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md font-bold transition-colors"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-950 font-sans tabular-nums">
                          {formatGHS(item.product.priceGHS * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Catchy Checkout Section */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200/90 bg-gradient-to-b from-slate-50/80 to-slate-100/90 space-y-3.5 shrink-0">
              
              {/* Delivery Mode Toggle Tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-200/80 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setDeliveryMode('pickup')}
                  className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                    deliveryMode === 'pickup'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>In-Shop Pickup (Adum)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMode('delivery')}
                  className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                    deliveryMode === 'delivery'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Doorstep Delivery</span>
                </button>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Your Full Name (e.g. Kwabena Mensah)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-2xs font-sans"
                />

                <input
                  type="text"
                  placeholder={
                    deliveryMode === 'pickup'
                      ? 'Pickup time / Notes (e.g. Today 4:00 PM)'
                      : 'Delivery Address / City (e.g. KNUST Campus, Ahodwo, Kumasi)'
                  }
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-2xs font-sans"
                />

                {/* Quick Location Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                  <span className="text-[10px] text-slate-400 font-bold shrink-0">Quick:</span>
                  {quickLocations.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setDeliveryAddress((prev) => (prev ? `${prev}, ${loc}` : loc));
                      }}
                      className="px-2 py-0.5 rounded-full bg-white border border-slate-200 hover:border-blue-300 text-[10px] font-semibold text-slate-600 hover:text-blue-700 shrink-0 transition-colors"
                    >
                      +{loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 text-xs shadow-2xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'}):</span>
                  <span className="font-bold text-slate-900 tabular-nums">{formatGHS(totalGHS)}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>Fulfillment:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {deliveryMode === 'pickup' ? 'Free Pickup (Adum Hub)' : 'Courier Dispatch'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-slate-900">
                  <span className="font-extrabold text-sm">Total Payable:</span>
                  <span className="font-black text-blue-700 text-lg tabular-nums tracking-tight">
                    {formatGHS(totalGHS)}
                  </span>
                </div>
              </div>

              {/* WhatsApp Checkout Button with Shimmer Sweep */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="relative w-full overflow-hidden flex items-center justify-center space-x-2.5 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all active:scale-95 group"
                >
                  {/* Subtle Light Shimmer Sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  <WhatsAppIcon colored className="w-4 h-4 shrink-0 drop-shadow-sm" />
                  <span>Send Order to WhatsApp ({formatGHS(totalGHS)})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    1-Yr Kumasi Local Warranty
                  </span>
                  <button
                    onClick={clearCart}
                    className="hover:text-rose-600 underline transition-colors"
                  >
                    Clear Vault Cart
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
