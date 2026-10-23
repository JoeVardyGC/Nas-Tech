'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { RefreshCw, Info, Sparkles } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

interface SwapSourceDevice {
  id: string;
  category: 'console' | 'laptop' | 'disc';
  name: string;
  baseCreditGHS: number;
}

const SOURCE_DEVICES: SwapSourceDevice[] = [
  // Consoles
  { id: 'src-ps4-slim', category: 'console', name: 'PlayStation 4 Slim (500GB/1TB)', baseCreditGHS: 1800 },
  { id: 'src-ps4-pro', category: 'console', name: 'PlayStation 4 Pro (1TB 4K)', baseCreditGHS: 2400 },
  { id: 'src-xbox-one-s', category: 'console', name: 'Xbox One S (500GB/1TB)', baseCreditGHS: 1400 },
  { id: 'src-xbox-one-x', category: 'console', name: 'Xbox One X (1TB)', baseCreditGHS: 2000 },
  { id: 'src-switch', category: 'console', name: 'Nintendo Switch V2', baseCreditGHS: 1600 },
  
  // Laptops
  { id: 'src-lap-corei5', category: 'laptop', name: 'Standard Core i5 8th/10th Gen Laptop', baseCreditGHS: 2200 },
  { id: 'src-lap-corei7', category: 'laptop', name: 'Business Core i7 10th/11th Gen Laptop', baseCreditGHS: 3400 },
  { id: 'src-lap-gtx1650', category: 'laptop', name: 'Old GTX 1650 / 1050 Gaming Laptop', baseCreditGHS: 4200 },

  // Discs
  { id: 'src-disc-ps5', category: 'disc', name: 'Finished PS5 Original Game Disc', baseCreditGHS: 300 },
  { id: 'src-disc-ps4', category: 'disc', name: 'Finished PS4 Original Game Disc', baseCreditGHS: 150 },
  { id: 'src-disc-xbox', category: 'disc', name: 'Finished Xbox One / Series Disc', baseCreditGHS: 180 },
];

interface TargetUpgradeItem {
  id: string;
  name: string;
  priceGHS: number;
  category: 'console' | 'laptop' | 'disc';
}

const TARGET_ITEMS: TargetUpgradeItem[] = [
  { id: 'tgt-ps5-slim', name: 'PlayStation 5 Slim 1TB Disc Edition', priceGHS: 8600, category: 'console' },
  { id: 'tgt-xbox-series-x', name: 'Xbox Series X 1TB Console', priceGHS: 7800, category: 'console' },
  { id: 'tgt-xbox-series-s', name: 'Xbox Series S 512GB Digital', priceGHS: 4200, category: 'console' },
  { id: 'tgt-asus-tuf-rtx4060', name: 'ASUS TUF Gaming A15 (RTX 4060)', priceGHS: 17500, category: 'laptop' },
  { id: 'tgt-hp-victus-rtx3050', name: 'HP Victus 15 Gaming (RTX 3050)', priceGHS: 9800, category: 'laptop' },
  { id: 'tgt-disc-fc25', name: 'EA Sports FC 25 PS5 Brand New Disc', priceGHS: 750, category: 'disc' },
  { id: 'tgt-disc-gta-v', name: 'Grand Theft Auto V Enhanced Disc', priceGHS: 350, category: 'disc' },
];

export default function SwapValuationHub() {
  const { formatGHS } = useCart();
  const [activeCategory, setActiveCategory] = useState<'console' | 'laptop' | 'disc'>('console');
  
  const [selectedSource, setSelectedSource] = useState<SwapSourceDevice>(SOURCE_DEVICES[0]);
  const [selectedTarget, setSelectedTarget] = useState<TargetUpgradeItem>(TARGET_ITEMS[0]);
  const [conditionGrade, setConditionGrade] = useState<'mint' | 'good' | 'fair'>('good');
  const [hasAccessories, setHasAccessories] = useState<boolean>(true);

  const filteredSources = SOURCE_DEVICES.filter((d) => d.category === activeCategory);
  const filteredTargets = TARGET_ITEMS.filter((t) => t.category === activeCategory);

  let conditionMultiplier = 1.0;
  if (conditionGrade === 'mint') conditionMultiplier = 1.1;
  else if (conditionGrade === 'fair') conditionMultiplier = 0.85;

  const accessoriesBonus = hasAccessories ? 0 : -200;

  const estimatedCreditGHS = Math.max(
    100,
    Math.round(selectedSource.baseCreditGHS * conditionMultiplier + accessoriesBonus)
  );

  const topUpGHS = Math.max(0, selectedTarget.priceGHS - estimatedCreditGHS);

  const handleSendSwapQuote = () => {
    const phone = '233500000000'; // Nas Tech WhatsApp
    let msg = `*SWAP / TRADE-IN ESTIMATE - NAS TECH KUMASI*\n`;
    msg += `Trading In: ${selectedSource.name}\n`;
    msg += `Condition: ${conditionGrade.toUpperCase()}\n`;
    msg += `Estimated Credit: ${formatGHS(estimatedCreditGHS)}\n\n`;
    msg += `Target Upgrade: ${selectedTarget.name} (${formatGHS(selectedTarget.priceGHS)})\n`;
    msg += `*Top-Up Amount:* ${formatGHS(topUpGHS)}\n\n`;
    msg += `I want to bring my device to your shop in Kumasi for physical inspection.`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="swaps" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-lg space-y-8">
      
      {/* Header & In-Person Logic */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-sans font-bold tracking-wide mb-2">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>IN-PERSON TRADE-IN • KUMASI SHOP</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            DEVICE & GAME DISC SWAP (TRADE-IN) ESTIMATOR
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Upgrade without paying full retail price! <strong>Bring your older console, laptop, or completed game disc into our shop</strong> for a quick inspection. We deduct its trade-in value so you only pay a cash top-up.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => {
              setActiveCategory('console');
              setSelectedSource(SOURCE_DEVICES.find((d) => d.category === 'console')!);
              setSelectedTarget(TARGET_ITEMS.find((t) => t.category === 'console')!);
            }}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeCategory === 'console'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            🎮 Console Swap
          </button>
          <button
            onClick={() => {
              setActiveCategory('laptop');
              setSelectedSource(SOURCE_DEVICES.find((d) => d.category === 'laptop')!);
              setSelectedTarget(TARGET_ITEMS.find((t) => t.category === 'laptop')!);
            }}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeCategory === 'laptop'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            💻 Laptop Swap
          </button>
          <button
            onClick={() => {
              setActiveCategory('disc');
              setSelectedSource(SOURCE_DEVICES.find((d) => d.category === 'disc')!);
              setSelectedTarget(TARGET_ITEMS.find((t) => t.category === 'disc')!);
            }}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeCategory === 'disc'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            💿 Disc Swap
          </button>
        </div>
      </div>

      {/* Main Grid: Device You Have vs Desired Target */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: What You Bring In */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. What Are You Bringing In?
            </span>
            <span className="text-[11px] text-emerald-700 font-bold">Your Device</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-500">Select Model:</label>
            <select
              value={selectedSource.id}
              onChange={(e) => {
                const found = SOURCE_DEVICES.find((d) => d.id === e.target.value);
                if (found) setSelectedSource(found);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            >
              {filteredSources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Base Credit: {formatGHS(s.baseCreditGHS)})
                </option>
              ))}
            </select>
          </div>

          {/* Condition Grading */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs text-slate-500">Working Condition & Appearance:</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setConditionGrade('mint')}
                className={`py-2 px-2 rounded-xl border text-center font-semibold transition-all ${
                  conditionGrade === 'mint'
                    ? 'border-emerald-600 bg-white text-emerald-700 shadow-xs'
                    : 'border-slate-200 bg-white/60 text-slate-600 hover:text-slate-900'
                }`}
              >
                Mint (+10%)
              </button>
              <button
                onClick={() => setConditionGrade('good')}
                className={`py-2 px-2 rounded-xl border text-center font-semibold transition-all ${
                  conditionGrade === 'good'
                    ? 'border-emerald-600 bg-white text-emerald-700 shadow-xs'
                    : 'border-slate-200 bg-white/60 text-slate-600 hover:text-slate-900'
                }`}
              >
                Good (Normal)
              </button>
              <button
                onClick={() => setConditionGrade('fair')}
                className={`py-2 px-2 rounded-xl border text-center font-semibold transition-all ${
                  conditionGrade === 'fair'
                    ? 'border-emerald-600 bg-white text-emerald-700 shadow-xs'
                    : 'border-slate-200 bg-white/60 text-slate-600 hover:text-slate-900'
                }`}
              >
                Fair / Scratches
              </button>
            </div>
          </div>

          {/* Cable / Controller Checkbox */}
          <div className="flex items-center space-x-2.5 pt-1">
            <input
              type="checkbox"
              id="accessories-swap-check"
              checked={hasAccessories}
              onChange={(e) => setHasAccessories(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-0"
            />
            <label htmlFor="accessories-swap-check" className="text-xs text-slate-600 cursor-pointer">
              Includes original power cable & controller / charger
            </label>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Estimated Trade-In Credit:</span>
            <span className="font-sans font-black text-emerald-700 text-base">
              {formatGHS(estimatedCreditGHS)}
            </span>
          </div>
        </div>

        {/* Center Arrow */}
        <div className="lg:col-span-2 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>

        {/* Right Column: Desired Upgrade from Shop Stock */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. What Do You Want to Take Home?
            </span>
            <span className="text-[11px] text-blue-700 font-bold">Nas Tech Stock</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-500">Choose Upgrade Target:</label>
            <select
              value={selectedTarget.id}
              onChange={(e) => {
                const found = TARGET_ITEMS.find((t) => t.id === e.target.value);
                if (found) setSelectedTarget(found);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            >
              {filteredTargets.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({formatGHS(t.priceGHS)})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-1 text-xs">
            <div className="text-[11px] text-slate-500">Target Item In-Shop Price:</div>
            <div className="font-sans font-bold text-slate-900 text-sm">
              {formatGHS(selectedTarget.priceGHS)}
            </div>
            <div className="text-[11px] text-slate-400">
              Includes shop testing, benchmarking, and warranty.
            </div>
          </div>

          {/* Net Top Up Required */}
          <div className="pt-3 border-t border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 font-medium">Your Estimated Cash Top-Up:</div>
            <div className="font-sans font-black text-2xl text-blue-700">
              {formatGHS(topUpGHS)}
            </div>
          </div>
        </div>

      </div>

      {/* Action Notice */}
      <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-bold text-slate-900 flex items-center space-x-2 justify-center md:justify-start">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>
              Swap {selectedSource.name} + {formatGHS(topUpGHS)} Top-Up for {selectedTarget.name}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Bring your device into our Kumasi shop for physical testing. Deals are finalized on the spot!
          </p>
        </div>

        <button
          onClick={handleSendSwapQuote}
          className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all active:scale-95"
        >
          <WhatsAppIcon colored className="w-4 h-4 shrink-0" />
          <span>Confirm Deal on WhatsApp</span>
        </button>
      </div>

    </section>
  );
}
