'use client';

import React, { useState } from 'react';
import { INSTALLABLE_GAMES, InstallableGame } from '@/data/servicesData';
import { useCart } from '@/context/CartContext';
import { HardDrive, Check, Plus, Trash2, MapPin, AlertCircle, Info } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

interface DriveTier {
  id: string;
  name: string;
  usableGB: number;
}

const DRIVE_TIERS: DriveTier[] = [
  { id: 'ps5-internal', name: 'PS5 Console (825 GB Internal)', usableGB: 667 },
  { id: 'ps4-1tb', name: 'PS4 / Xbox One (1TB Drive)', usableGB: 860 },
  { id: 'xbox-series-x', name: 'Xbox Series X (1TB NVMe)', usableGB: 802 },
  { id: 'xbox-series-s', name: 'Xbox Series S (512GB NVMe)', usableGB: 364 },
  { id: 'laptop-1tb', name: 'Gaming Laptop / External SSD (1TB)', usableGB: 930 },
  { id: 'laptop-2tb', name: 'Gaming Laptop / External SSD (2TB)', usableGB: 1860 },
];

export default function GameInstallerHub() {
  const { formatGHS } = useCart();
  const [selectedDrive, setSelectedDrive] = useState<DriveTier>(DRIVE_TIERS[0]);
  const [selectedGames, setSelectedGames] = useState<InstallableGame[]>([
    INSTALLABLE_GAMES[0], // GTA V
    INSTALLABLE_GAMES[1], // FC 25
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Storage math
  const usedGB = selectedGames.reduce((acc, g) => acc + g.sizeGB, 0);
  const remainingGB = selectedDrive.usableGB - usedGB;
  const storagePercentage = Math.min(100, Math.round((usedGB / selectedDrive.usableGB) * 100));

  // Pricing math & discounts
  const rawTotalGHS = selectedGames.reduce((acc, g) => acc + g.installPriceGHS, 0);
  let discountPercent = 0;
  if (selectedGames.length >= 6) discountPercent = 25;
  else if (selectedGames.length >= 4) discountPercent = 15;
  else if (selectedGames.length >= 3) discountPercent = 10;

  const discountedTotalGHS = Math.round(rawTotalGHS * (1 - discountPercent / 100));

  const toggleGame = (game: InstallableGame) => {
    if (selectedGames.some((g) => g.id === game.id)) {
      setSelectedGames(selectedGames.filter((g) => g.id !== game.id));
    } else {
      if (usedGB + game.sizeGB > selectedDrive.usableGB) {
        alert(`Cannot add ${game.title}! It requires ${game.sizeGB}GB, but your selected drive only has ${remainingGB}GB remaining.`);
        return;
      }
      setSelectedGames([...selectedGames, game]);
    }
  };

  const handleWhatsAppBooking = () => {
    const phone = '233500000000'; // Nas Tech WhatsApp
    let msg = `*GAME INSTALLATION INQUIRY - NAS TECH KUMASI*\n`;
    msg += `Device: ${selectedDrive.name}\n`;
    msg += `Storage Used: ${usedGB} GB / ${selectedDrive.usableGB} GB\n\n`;
    msg += `*Selected Games to Install (${selectedGames.length}):*\n`;
    selectedGames.forEach((g, idx) => {
      msg += `${idx + 1}. ${g.title} (${g.sizeGB} GB)\n`;
    });
    msg += `\n*Total In-Shop Fee:* ${formatGHS(discountedTotalGHS)}\n`;
    msg += `\nI will bring my console/drive to your shop in Kumasi. Please confirm your availability!`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const categories = ['All', 'Action', 'Sports', 'RPG / Adventure', 'Racing', 'Shooter'];
  const filteredLibrary = selectedCategory === 'All'
    ? INSTALLABLE_GAMES
    : INSTALLABLE_GAMES.filter((g) => g.category === selectedCategory);

  return (
    <section id="installations" className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-lg space-y-8">
      
      {/* Header & In-Person Logic Explanation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-sans font-bold tracking-wide">
            <HardDrive className="w-3.5 h-3.5" />
            <span>IN-PERSON SHOP SERVICE • KUMASI</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AVAILABLE GAMES FOR IN-SHOP INSTALLATION
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            We display all games available in our shop archive below. Pick the games you want, see the installation price, and <strong>bring your console, laptop, or external hard drive to us in person</strong>. We install everything on the spot with zero data wasted!
          </p>
        </div>

        {/* Selected Price Preview Chip */}
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-2xl p-3 px-5 flex-shrink-0">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-sans font-bold">In-Shop Install Fee:</div>
            <div className="text-xl font-sans font-black text-blue-700">
              {formatGHS(discountedTotalGHS)}
            </div>
          </div>
          {discountPercent > 0 && (
            <span className="px-2 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      {/* In-Person Shop Notice Alert */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
        <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>How this works:</strong> You do not need to download anything online. Just browse our collection, pick your favorite titles, check your drive space, and bring your device into our shop. Turnaround is typically <strong>2 to 4 hours</strong>.
        </div>
      </div>

      {/* Step 1: Select Device & Drive Capacity */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
          <span>Step 1: Select Your Device / Drive Storage:</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {DRIVE_TIERS.map((tier) => {
            const isSelected = selectedDrive.id === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedDrive(tier)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold truncate">{tier.name.split(' (')[0]}</div>
                <div className="text-[11px] font-sans text-blue-700 font-semibold mt-0.5">
                  {tier.usableGB} GB Usable
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Storage Meter */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">{selectedDrive.name}</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">
              Selected: <strong className="text-blue-700 font-sans">{usedGB} GB</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">
              Free: <strong className="text-emerald-700 font-sans">{remainingGB} GB</strong>
            </span>
          </div>
          <span className="font-sans font-bold text-xs text-slate-700">
            {storagePercentage}% Filled
          </span>
        </div>

        {/* Bar */}
        <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              storagePercentage > 90
                ? 'bg-rose-500'
                : storagePercentage > 75
                ? 'bg-amber-500'
                : 'bg-blue-600'
            }`}
            style={{ width: `${storagePercentage}%` }}
          />
        </div>

        {remainingGB < 50 && (
          <div className="flex items-center space-x-2 text-[11px] text-amber-700 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Almost full! Remove a game or upgrade to an external drive.</span>
          </div>
        )}
      </div>

      {/* Step 3: Browse Available Games Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Step 2: Browse & Select Games to Install ({selectedGames.length} selected):
          </label>
          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Games Library Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredLibrary.map((game) => {
            const isSelected = selectedGames.some((g) => g.id === game.id);
            return (
              <div
                key={game.id}
                onClick={() => toggleGame(game)}
                className={`group relative rounded-2xl border p-3 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100 mb-2.5">
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-sans font-bold bg-white/95 text-slate-800 shadow-2xs border border-slate-200">
                      {game.sizeGB} GB
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {game.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{game.category}</span>
                    <span className="font-sans font-bold text-slate-900">
                      {formatGHS(game.installPriceGHS)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`mt-2.5 w-full py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                    isSelected
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      <span>Add to Pre-Load List</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 4: Drop-Off Action Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-bold text-slate-900 flex items-center space-x-2 justify-center md:justify-start">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Ready to Install {selectedGames.length} Games ({usedGB} GB) in Person</span>
          </div>
          <p className="text-xs text-slate-600">
            Bring your device or external drive into our Kumasi shop. We load it for you and test it before you leave!
          </p>
        </div>

        <button
          onClick={handleWhatsAppBooking}
          disabled={selectedGames.length === 0}
          className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <WhatsAppIcon colored className="w-4 h-4 shrink-0" />
          <span>Confirm on WhatsApp ({formatGHS(discountedTotalGHS)})</span>
        </button>
      </div>

    </section>
  );
}
