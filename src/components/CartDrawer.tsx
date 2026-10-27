'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { loadCustomer, saveCustomer } from '@/lib/whatsapp';
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
  Check,
  Flame,
  Clock,
  Layers,
  ChevronRight
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
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (!isCartOpen) return;
    const saved = loadCustomer();
    setCustomerName((prev) => prev || saved.name);
    setDeliveryAddress((prev) => prev || saved.location);
    setDeliveryMode(saved.fulfillment);
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const nameMissing = customerName.trim().length < 2;
  const locationMissing = deliveryAddress.trim().length < 2;

  const handleWhatsAppCheckout = () => {
    setShowErrors(true);
    if (nameMissing || locationMissing) return;
    saveCustomer({ name: customerName, location: deliveryAddress, fulfillment: deliveryMode });
    const link = generateWhatsAppLink(customerName, deliveryAddress, deliveryMode);
    window.open(link, '_blank');
  };

  // Gamified Kumasi Free Delivery Target (GH₵ 1,200)
  const PERK_TARGET = 1200;
  const perkProgress = Math.min(100, Math.round((totalGHS / PERK_TARGET) * 100));
  const amountToPerk = Math.max(0, PERK_TARGET - totalGHS);

  const quickLocations = ['Sawaba', 'KNUST', 'Bantama', 'Ahodwo', 'Asokwa', 'Adum', 'Ayeduase', 'Tanoso', 'Accra'];

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
    <AnimatePresence>
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart Drawer"
          data-testid="cart-modal"
          className="cart-drawer fixed inset-0 z-50 overflow-hidden font-sans select-none"
        >
          {/* 1. Ambient Frosted Glass Backdrop with Cyber Radial Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
          />

          {/* 2. Slide-In Vault Drawer Panel with Framer Motion Spring */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-12">
            <motion.div
              initial={{ x: '100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="w-screen max-w-md bg-white border-l border-slate-200/90 text-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.35)] flex flex-col relative z-10"
            >
              {/* Dynamic Neon Shimmer Top Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 shrink-0 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-1/3 bg-white/40 blur-xs"
                  animate={{ x: ['-100%', '350%'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                />
              </div>

              {/* Catchy Vault Header */}
              <div className="px-5 py-4 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-white flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                      <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-md ring-2 ring-white">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="font-extrabold text-sm sm:text-base tracking-tight text-slate-950 uppercase font-sans">
                        Nas Tech Vault
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-black tabular-nums">
                        {cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                      <span className="font-semibold text-slate-700">Sawaba Hub, Kumasi</span>
                      <span className="text-slate-400">•</span>
                      <span>Live Stock</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart"
                  data-testid="close-cart"
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Gamified Delivery Perks Progress Meter */}
              {cart.length > 0 && (
                <div className="px-5 py-3 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-cyan-50/70 border-b border-blue-100/80 shrink-0">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      {perkProgress >= 100 ? (
                        <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500 animate-spin" style={{ animationDuration: '4s' }} />
                          <span>🎉 Free Kumasi Express Courier Unlocked!</span>
                        </span>
                      ) : (
                        <span className="text-blue-700 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 fill-blue-600 text-blue-600 animate-pulse" />
                          <span>Add {formatGHS(amountToPerk)} for Free Express Courier</span>
                        </span>
                      )}
                    </span>
                    <span className={`text-[10px] font-black tabular-nums ${perkProgress >= 100 ? 'text-emerald-700' : 'text-blue-600'}`}>
                      {perkProgress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200/90 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      className={`h-full rounded-full transition-all duration-500 ${
                        perkProgress >= 100
                          ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                          : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400'
                      }`}
                      style={{ width: `${perkProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Items Scrollable List or Catchy Holographic Empty State */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8 space-y-4">
                    {/* Floating 3D Hologram Gamepad with Rotating Rings */}
                    <div className="relative my-2">
                      <div className="absolute -inset-4 rounded-full bg-blue-500/10 blur-2xl animate-pulse" />
                      
                      {/* Orbital Cyan Light Ring */}
                      <div className="absolute inset-0 -m-3 border border-cyan-400/40 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
                      <div className="absolute inset-0 -m-1 border border-indigo-400/30 rounded-full animate-spin" style={{ animationDuration: '7s', animationDirection: 'reverse' }} />
                      
                      <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-blue-600/30">
                        <Gamepad2 className="w-10 h-10 stroke-[1.8] animate-bounce" style={{ animationDuration: '2s' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                        Your Gaming Vault is Unclaimed
                      </h3>
                      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                        Lock in authentic PlayStation & Xbox consoles, 4K original game discs, or pre-load 2,000+ digital titles directly to your drive.
                      </p>
                    </div>

                    {/* Catchy Quick-Jump Categories */}
                    <div className="w-full max-w-xs pt-1 grid grid-cols-2 gap-2 text-left">
                      <button
                        onClick={() => scrollToSection('storefront')}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 transition-all flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-blue-600 group"
                      >
                        <Gamepad2 className="w-4 h-4 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">Consoles</span>
                      </button>

                      <button
                        onClick={() => scrollToSection('storefront')}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200/80 hover:border-purple-300 transition-all flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-purple-600 group"
                      >
                        <Disc className="w-4 h-4 text-purple-600 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">Game Discs</span>
                      </button>

                      <button
                        onClick={() => scrollToSection('installations')}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200/80 hover:border-amber-300 transition-all flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-amber-600 group"
                      >
                        <Zap className="w-4 h-4 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">Pre-Loads</span>
                      </button>

                      <button
                        onClick={() => scrollToSection('repairs')}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-emerald-600 group"
                      >
                        <Wrench className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">Repair Lab</span>
                      </button>
                    </div>

                    <button
                      onClick={() => scrollToSection('storefront')}
                      className="w-full max-w-xs mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 transition-all active:scale-95 flex items-center justify-center space-x-2"
                    >
                      <span>Explore Kumasi Store Catalog</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Live Popular Ticker */}
                    <div className="w-full max-w-xs pt-2 text-[10px] text-slate-500 text-center font-medium bg-slate-50 rounded-xl p-2 border border-slate-100">
                      <span className="font-bold text-rose-600 mr-1 flex items-center justify-center gap-1">
                        <Flame className="w-3 h-3 fill-rose-500 text-rose-500 animate-pulse inline" />
                        <span>Trending in Kumasi:</span>
                      </span>
                      <span>GTA VI Pre-Orders • PS5 Slim 1TB • FC 25 Pre-Loads</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => {
                      const isGameInstall = item.product.kind === 'game_install';
                      return (
                        <div
                          key={item.product.id}
                          className="group relative flex space-x-3.5 p-3.5 rounded-2xl bg-slate-50/90 hover:bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                          {/* Item Image with Hover Zoom */}
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200/80 shrink-0 p-1 flex items-center justify-center">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                            {isGameInstall && (
                              <div className="absolute top-1 left-1 bg-blue-600 text-white rounded p-0.5 text-[8px] font-black">
                                PRE-LOAD
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded-lg hover:bg-rose-50 active:scale-90"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Badges Row */}
                            <div className="flex items-center gap-1.5 text-[10px] flex-wrap">
                              <span className="px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200/60">
                                {item.product.condition}
                              </span>
                              {item.product.specs?.storage && (
                                <span className="px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700 font-medium">
                                  {item.product.specs.storage}
                                </span>
                              )}
                              {item.product.installMeta?.sizeGB && (
                                <span className="px-1.5 py-0.2 rounded-md bg-blue-100/80 text-blue-800 font-bold">
                                  {item.product.installMeta.sizeGB} GB
                                </span>
                              )}
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-500 font-medium">
                                Unit: {formatGHS(item.product.priceGHS)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              {/* Catchy Tactile Quantity Stepper */}
                              <div className="flex items-center border border-slate-300/90 rounded-xl bg-white px-1.5 py-0.5 text-xs shadow-2xs">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md font-bold transition-all active:scale-80"
                                  title="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2.5 text-xs font-black text-slate-900 tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md font-bold transition-all active:scale-80"
                                  title="Increase quantity"
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
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Catchy Footer & Checkout Controls */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-slate-200/90 bg-gradient-to-b from-slate-50 to-slate-100/90 space-y-3 shrink-0">
                  
                  {/* Delivery Mode Toggle Tabs */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-200/80 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('pickup')}
                      className={`py-2 px-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
                        deliveryMode === 'pickup'
                          ? 'bg-white text-blue-700 shadow-sm font-extrabold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>In-Shop Pickup (Sawaba)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('delivery')}
                      className={`py-2 px-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
                        deliveryMode === 'delivery'
                          ? 'bg-white text-blue-700 shadow-sm font-extrabold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Doorstep Delivery</span>
                    </button>
                  </div>

                  {/* Customer Inputs with Validation Feedback */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Full Name (e.g. Kwabena Mensah)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 shadow-2xs font-sans transition-all ${
                          showErrors && nameMissing
                            ? 'border-rose-400 focus:ring-rose-500/20 bg-rose-50/20'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                        }`}
                      />
                      {showErrors && nameMissing && (
                        <p className="text-[10px] text-rose-600 font-semibold mt-0.5 pl-1">
                          Please enter your name so we can address your order.
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder={
                          deliveryMode === 'pickup'
                            ? 'Pickup time / Notes (e.g. Today 4:00 PM at Sawaba Hub)'
                            : 'Delivery Address / City (e.g. KNUST Campus, Ahodwo, Kumasi)'
                        }
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 shadow-2xs font-sans transition-all ${
                          showErrors && locationMissing
                            ? 'border-rose-400 focus:ring-rose-500/20 bg-rose-50/20'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                        }`}
                      />
                      {showErrors && locationMissing && (
                        <p className="text-[10px] text-rose-600 font-semibold mt-0.5 pl-1">
                          Please provide your location or pickup preference.
                        </p>
                      )}
                    </div>

                    {/* Quick Location Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">Quick Add:</span>
                      {quickLocations.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => {
                            setDeliveryAddress((prev) => (prev ? `${prev}, ${loc}` : loc));
                          }}
                          className="px-2 py-0.5 rounded-full bg-white border border-slate-200 hover:border-blue-300 text-[10px] font-semibold text-slate-600 hover:text-blue-700 shrink-0 transition-colors shadow-2xs active:scale-95"
                        >
                          +{loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Order Breakdown Card */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 text-xs shadow-2xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'}):</span>
                      <span className="font-bold text-slate-900 tabular-nums">{formatGHS(totalGHS)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Fulfillment:</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {deliveryMode === 'pickup' ? 'Free In-Shop Pickup (Sawaba)' : (
                          perkProgress >= 100 ? 'Free Express Delivery Unlocked' : 'Standard Courier Dispatch'
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-slate-900">
                      <span className="font-extrabold text-sm">Total Payable:</span>
                      <span className="font-black text-blue-700 text-lg tabular-nums tracking-tight">
                        {formatGHS(totalGHS)}
                      </span>
                    </div>
                  </div>

                  {/* Catchy WhatsApp Checkout Button with Glowing Sweep */}
                  <div className="space-y-2">
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="relative w-full overflow-hidden flex items-center justify-center space-x-2.5 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-emerald-600/30 transition-all active:scale-95 group"
                    >
                      {/* Animated Shimmer Sweep */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                      <WhatsAppIcon colored className="w-4 h-4 shrink-0 drop-shadow-sm group-hover:rotate-12 transition-transform" />
                      <span>Send Order to WhatsApp ({formatGHS(totalGHS)})</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 font-medium">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
