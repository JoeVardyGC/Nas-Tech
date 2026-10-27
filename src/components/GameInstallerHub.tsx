'use client';

import React, { useState, useMemo } from 'react';
import {
  INSTALLABLE_GAMES,
  InstallableGame,
  GamePlatformCategory,
  gameToProduct,
} from '@/data/servicesData';
import { useCart } from '@/context/CartContext';
import { useWhatsApp } from '@/context/WhatsAppContext';
import {
  HardDrive,
  Search,
  ShoppingCart,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  Monitor,
  Flame,
  Layers,
  Sparkles,
  Info,
  ExternalLink,
} from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

type FilterCategory = 'ALL' | GamePlatformCategory;

const CATEGORIES: FilterCategory[] = [
  'ALL',
  'PS Games',
  'Xbox Games',
  'PC Games',
  'Mobile Phone Games',
  'Console Classics',
];

export default function GameInstallerHub() {
  const { addToCart, formatGHS } = useCart();
  const { requestWhatsApp } = useWhatsApp();

  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSpecsId, setExpandedSpecsId] = useState<string | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filtered games calculation
  const filteredGames = useMemo(() => {
    return INSTALLABLE_GAMES.filter((game) => {
      const matchesCategory =
        activeCategory === 'ALL' || game.platformCategory === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        game.title.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q) ||
        game.platformCategory.toLowerCase().includes(q) ||
        game.platforms.some((p) => p.toLowerCase().includes(q)) ||
        game.details.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Category counts badge
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: INSTALLABLE_GAMES.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'ALL') {
        counts[cat] = INSTALLABLE_GAMES.filter((g) => g.platformCategory === cat).length;
      }
    });
    return counts;
  }, []);

  const handleAddToCart = (e: React.MouseEvent, game: InstallableGame) => {
    e.stopPropagation();
    const product = gameToProduct(game);
    addToCart(product, 1);
    setJustAddedId(game.id);
    setTimeout(() => setJustAddedId(null), 2000);
  };

  const handleDirectWhatsApp = (e: React.MouseEvent, game: InstallableGame) => {
    e.stopPropagation();
    requestWhatsApp({
      intent: `install the game "${game.title}" directly to my device / hard drive`,
      lines: [
        {
          label: `${game.title} (Digital Game Install)`,
          quantity: 1,
          amountGHS: game.installPriceGHS,
          details: [
            `Platform: ${game.platformCategory} (${game.platforms.join(', ')})`,
            `Storage Required: ${game.systemRequirements.storage}`,
            `RAM Required: ${game.systemRequirements.ram}`,
            `GPU/Processor: ${game.systemRequirements.gpuOrProcessor}`,
            `OS: ${game.systemRequirements.os}`,
          ],
        },
      ],
      totalGHS: game.installPriceGHS,
      note: '💾 I will bring my console, laptop, or external hard drive to your shop in Sawaba, Kumasi.',
    });
  };

  const toggleSpecs = (id: string) => {
    setExpandedSpecsId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="installations"
      className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-8 lg:p-10 shadow-xl space-y-8 font-sans"
    >
      {/* 1. SECTION HEADER (Light eyebrow + Bold display title) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/90 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold tracking-wider uppercase font-sans">
            <HardDrive className="w-3.5 h-3.5" />
            <span>SAWABA, KUMASI • IN-SHOP DIGITAL PRE-LOAD ARCHIVE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            AVAILABLE GAMES & DIRECT PRE-LOADS
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Browse our full archive of console, PC, and mobile titles below. Pick your games, verify your system requirements, and either <strong>add them to your cart</strong> or order directly on WhatsApp. Bring your console, gaming laptop, or external hard drive to our shop in <strong>Sawaba, near St. Patrick Hotel, Kumasi</strong> for fast, in-person installation!
          </p>
        </div>

        {/* Live Total Games Badge */}
        <div className="flex items-center space-x-3 bg-gradient-to-tr from-slate-50 to-blue-50/50 border border-slate-200 rounded-2xl p-3.5 px-5 shrink-0 self-start md:self-auto">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-600/25">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Archive Library</div>
            <div className="text-lg font-black text-slate-900">
              {INSTALLABLE_GAMES.length} <span className="text-xs font-semibold text-blue-600">TITLES READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY FILTERS & SEARCH BAR */}
      <div className="space-y-4">
        {/* Category Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow-2xs ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <span>{cat === 'ALL' ? 'ALL GAMES' : cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-black tabular-nums ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Active Results Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games by title, genre, or platform..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900 font-bold">{filteredGames.length}</strong> of{' '}
            <strong className="text-slate-900 font-bold">{INSTALLABLE_GAMES.length}</strong> games
          </div>
        </div>
      </div>

      {/* 3. GAMES GRID */}
      {filteredGames.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <Info className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">No games found matching your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or selecting &quot;ALL GAMES&quot; above to view our complete collection.
          </p>
          <button
            onClick={() => {
              setActiveCategory('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredGames.map((game) => {
            const isSpecsExpanded = expandedSpecsId === game.id;
            const isJustAdded = justAddedId === game.id;

            return (
              <div
                key={game.id}
                className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Upper: Cover Image, Badges & Size */}
                <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/90 text-white backdrop-blur-xs border border-white/20 shadow-xs">
                      {game.platformCategory}
                    </span>
                    {game.badge && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
                        {game.badge}
                      </span>
                    )}
                  </div>

                  {/* Top Right File Size Tag */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-blue-600 text-white shadow-xs">
                      {game.sizeGB} GB
                    </span>
                  </div>

                  {/* Bottom Platforms Overlay */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white">
                    <span className="font-semibold truncate drop-shadow-sm">
                      {game.platforms.join(' • ')}
                    </span>
                    <span className="font-black text-amber-300 shrink-0 ml-2 drop-shadow-sm">
                      ★ {game.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Body: Title, Price & Synopsis */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-sm text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
                        {game.title}
                      </h3>
                    </div>

                    {/* Price in Ghanaian Cedis */}
                    <div className="flex items-baseline space-x-2">
                      <span className="text-base font-black text-blue-700 font-sans tracking-tight">
                        {formatGHS(game.installPriceGHS)}
                      </span>
                      {game.originalPriceGHS && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatGHS(game.originalPriceGHS)}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">
                        • Direct In-Shop Install
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {game.details}
                    </p>
                  </div>

                  {/* System Requirements Section before downloading/installing */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => toggleSpecs(game.id)}
                      className="w-full flex items-center justify-between py-1 text-[11px] font-bold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      <span className="flex items-center space-x-1.5">
                        <Cpu className="w-3.5 h-3.5 text-blue-600" />
                        <span>System Requirements:</span>
                      </span>
                      <span className="flex items-center text-[10px] text-blue-600 font-bold">
                        {isSpecsExpanded ? (
                          <>
                            <span>Hide Specs</span>
                            <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
                          </>
                        ) : (
                          <>
                            <span>View Specs</span>
                            <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                          </>
                        )}
                      </span>
                    </button>

                    {/* Requirements Breakdown Card */}
                    {isSpecsExpanded ? (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-[10px] space-y-1.5 text-slate-700 animate-in fade-in duration-200">
                        <div className="flex items-start justify-between">
                          <span className="font-bold text-slate-500 uppercase">Storage:</span>
                          <span className="font-semibold text-slate-900 text-right">{game.systemRequirements.storage}</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="font-bold text-slate-500 uppercase">RAM:</span>
                          <span className="font-semibold text-slate-900 text-right">{game.systemRequirements.ram}</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="font-bold text-slate-500 uppercase">GPU / CPU:</span>
                          <span className="font-semibold text-slate-900 text-right max-w-[65%] line-clamp-2">
                            {game.systemRequirements.gpuOrProcessor}
                          </span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="font-bold text-slate-500 uppercase">OS:</span>
                          <span className="font-semibold text-slate-900 text-right">{game.systemRequirements.os}</span>
                        </div>
                        {game.systemRequirements.additionalNotes && (
                          <div className="pt-1 border-t border-slate-200/60 text-[9.5px] text-slate-500 italic">
                            * {game.systemRequirements.additionalNotes}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 truncate">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold">{game.systemRequirements.ram} RAM</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold">{game.systemRequirements.storage}</span>
                      </div>
                    )}
                  </div>

                  {/* 4. ACTION BUTTONS: ADD TO CART & ORDER ON WHATSAPP */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, game)}
                      className={`w-full py-2.5 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-all shadow-xs ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-slate-900 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleDirectWhatsApp(e, game)}
                      className="w-full py-2.5 px-2 rounded-xl text-xs font-extrabold bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 hover:border-emerald-600 transition-all flex items-center justify-center space-x-1.5 shadow-2xs"
                    >
                      <WhatsAppIcon colored={false} className="w-3.5 h-3.5 shrink-0" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. SHOP WALK-IN INSTRUCTIONS FOOTER */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-slate-50 border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-extrabold text-slate-900 flex items-center space-x-2 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Ready to Install Games On-the-Spot in Kumasi</span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">
            Visit <strong>Nas Tech</strong> at <strong>Sawaba near St. Patrick Hotel, Kumasi</strong> with your PlayStation, Xbox, gaming laptop, or external hard drive. We test every installation before you walk out!
          </p>
        </div>

        <button
          onClick={() => {
            requestWhatsApp({
              intent: 'ask about game installations and custom drive packages at your Sawaba shop',
              note: 'I want to know your current queue and how soon I can bring my device in.',
            });
          }}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/25 transition-all active:scale-95 shrink-0"
        >
          <WhatsAppIcon colored className="w-4 h-4 shrink-0" />
          <span>Chat With Our Game Tech</span>
        </button>
      </div>
    </section>
  );
}
