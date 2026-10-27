'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { X, User, MapPin, Store, Truck, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import {
  CustomerDetails,
  WhatsAppOrder,
  buildWhatsAppMessage,
  loadCustomer,
  saveCustomer,
  whatsappUrl,
  timeGreeting,
} from '@/lib/whatsapp';

interface WhatsAppContextType {
  /** Opens the details sheet (name, location, pickup/delivery) and then sends to WhatsApp. */
  requestWhatsApp: (order: WhatsAppOrder, onSent?: () => void) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<{ order: WhatsAppOrder; onSent?: () => void } | null>(null);
  const [details, setDetails] = useState<CustomerDetails>({ name: '', location: '', fulfillment: 'pickup' });
  const [touched, setTouched] = useState(false);

  const requestWhatsApp = useCallback((order: WhatsAppOrder, onSent?: () => void) => {
    setDetails(loadCustomer());
    setTouched(false);
    setPending({ order, onSent });
  }, []);

  const close = () => setPending(null);

  useEffect(() => {
    if (!pending) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPending(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pending]);

  const nameMissing = details.name.trim().length < 2;
  const locationMissing = details.location.trim().length < 2;

  const send = () => {
    if (!pending) return;
    setTouched(true);
    if (nameMissing || locationMissing) return;
    saveCustomer(details);
    window.open(whatsappUrl(buildWhatsAppMessage(pending.order, details)), '_blank');
    pending.onSent?.();
    setPending(null);
  };

  return (
    <WhatsAppContext.Provider value={{ requestWhatsApp }}>
      {children}

      {pending && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Send your request on WhatsApp"
          data-testid="whatsapp-details-modal"
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans"
        >
          <div onClick={close} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" />

          <div className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400" />

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.3em] text-emerald-600 uppercase">
                    {timeGreeting()} 👋
                  </p>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">Quick details before WhatsApp</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    So we know who we&apos;re chatting with. We&apos;ll remember this for next time.
                  </p>
                </div>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Name */}
              <label className="block space-y-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Your name</span>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-white ${touched && nameMissing ? 'border-rose-400' : 'border-slate-300 focus-within:border-emerald-500'}`}>
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    placeholder="e.g. Kwabena Mensah"
                    className="w-full text-sm outline-none bg-transparent text-slate-900 placeholder-slate-400"
                  />
                </div>
                {touched && nameMissing && <span className="text-[11px] text-rose-600">Please enter your name.</span>}
              </label>

              {/* Location */}
              <label className="block space-y-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Your location</span>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-white ${touched && locationMissing ? 'border-rose-400' : 'border-slate-300 focus-within:border-emerald-500'}`}>
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={details.location}
                    onChange={(e) => setDetails({ ...details, location: e.target.value })}
                    placeholder="e.g. KNUST, Kumasi"
                    className="w-full text-sm outline-none bg-transparent text-slate-900 placeholder-slate-400"
                  />
                </div>
                {touched && locationMissing && <span className="text-[11px] text-rose-600">Please enter your location.</span>}
              </label>

              {/* Fulfillment */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 text-xs font-bold">
                {([
                  { id: 'pickup', label: 'Pick up in-shop', Icon: Store },
                  { id: 'delivery', label: 'Deliver to me', Icon: Truck },
                ] as const).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDetails({ ...details, fulfillment: id })}
                    className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      details.fulfillment === id ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Message preview */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase">Message preview</span>
                <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-700 bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 max-h-48 overflow-y-auto font-sans">
                  {buildWhatsAppMessage(pending.order, details)}
                </pre>
              </div>

              <button
                onClick={send}
                className="relative w-full overflow-hidden flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all active:scale-95 group"
              >
                <WhatsAppIcon colored className="w-4 h-4 shrink-0" />
                <span>Send on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) throw new Error('useWhatsApp must be used within WhatsAppProvider');
  return ctx;
}
