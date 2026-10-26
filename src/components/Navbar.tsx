'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Gamepad2,
  Search,
  ShoppingBag,
  Sun,
  Moon,
  MessageSquare,
  Flame,
  Wrench,
  RefreshCw,
  DownloadCloud,
  ChevronDown,
  X,
  Check,
  Menu,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  Laptop,
  Disc
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { INSTALLABLE_GAMES } from '@/data/servicesData';
import { Product } from '@/types';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

type SearchCategory = 'all' | 'consoles' | 'laptops' | 'discs' | 'parts' | 'games';

const CATEGORY_LABELS: Record<SearchCategory, string> = {
  all: 'All Categories',
  consoles: 'Consoles',
  laptops: 'Laptops',
  discs: 'Game Discs',
  parts: 'Parts & Accessories',
  games: 'Game Pre-Loads'
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount, setIsCartOpen, addToCart, formatGHS } = useCart();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // All Categories Dropdown State (Tier 2)
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);

  // Scroll detection to let the hero take full stage and slide in store bar on scroll
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 180);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const allCategoriesRef = useRef<HTMLDivElement>(null);

  // Close search suggestions, category dropdown, and all categories menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      if (
        allCategoriesRef.current &&
        !allCategoriesRef.current.contains(event.target as Node)
      ) {
        setIsAllCategoriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products based on search query and category
  const queryTrimmed = searchQuery.trim().toLowerCase();

  const matchingProducts = queryTrimmed.length > 0
    ? PRODUCTS.filter(product => {
        const matchesCategory =
          selectedCategory === 'all' ||
          (selectedCategory === 'consoles' && product.category === 'consoles') ||
          (selectedCategory === 'laptops' && product.category === 'laptops') ||
          (selectedCategory === 'discs' && product.category === 'discs') ||
          (selectedCategory === 'parts' && product.category === 'parts_accessories');

        const matchesQuery =
          product.name.toLowerCase().includes(queryTrimmed) ||
          product.brand.toLowerCase().includes(queryTrimmed) ||
          product.description.toLowerCase().includes(queryTrimmed);

        return matchesCategory && matchesQuery;
      }).slice(0, 5)
    : [];

  const matchingGames = queryTrimmed.length > 0 && (selectedCategory === 'all' || selectedCategory === 'games')
    ? INSTALLABLE_GAMES.filter(game =>
        game.title.toLowerCase().includes(queryTrimmed) ||
        game.category.toLowerCase().includes(queryTrimmed) ||
        game.platforms.some(p => p.toLowerCase().includes(queryTrimmed))
      ).slice(0, 3)
    : [];

  const totalResults = matchingProducts.length + matchingGames.length;
  const showDropdown = isSearchFocused && queryTrimmed.length > 0;

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1800);
  };

  return (
    <header
      data-testid="adaptive-navbar"
      data-theme="light"
      className="adaptive-navbar sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md transition-all duration-300 ease-in-out"
    >
      {/* ========================================================
          TIER 1: MAIN BRAND & GLOBAL SEARCH ROW (Height: 80px)
          Floating Pill & Frosted Glass Aesthetic with Montserrat
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-6">

          {/* 1. BRAND LOGO */}
          <a href="#" className="flex items-center space-x-2 sm:space-x-3.5 group shrink-0 min-w-0">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 group-hover:shadow-blue-500/40 transition-all duration-300 shrink-0">
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-base sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  NAS TECH
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 tracking-wide shrink-0">
                  GH
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-slate-500 flex items-center space-x-1 sm:space-x-1.5 mt-0.5 truncate">
                <span>GAMING HUB</span>
                <span className="text-slate-300">•</span>
                <span className="text-blue-600 font-bold">KUMASI</span>
              </p>
            </div>
          </a>

          {/* 2. FLOATING PILL SEARCH BAR WITH CATEGORY SELECTOR */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl hidden md:block">
            <div className="relative flex items-center bg-slate-50/80 hover:bg-white focus-within:bg-white rounded-full border border-slate-200/90 hover:border-slate-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/15 transition-all p-1.5 shadow-sm">
              
              {/* Category Selector Pill */}
              <div ref={categoryDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-white/90 hover:bg-slate-100/90 rounded-full transition-colors border border-slate-200/60 shadow-xs"
                >
                  <span className="truncate max-w-[105px]">{CATEGORY_LABELS[selectedCategory]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {/* Category Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2.5 w-52 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {(Object.keys(CATEGORY_LABELS) as SearchCategory[]).map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors ${
                          selectedCategory === cat
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                        }`}
                      >
                        <span>{CATEGORY_LABELS[cat]}</span>
                        {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div className="relative flex-1 min-w-0 flex items-center pl-3 pr-2">
                <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search Xbox, PS5, Laptops"
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none truncate"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 hover:bg-slate-200/70 rounded-full text-slate-400 hover:text-slate-600 mr-1.5 transition-colors shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Action Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchFocused(true)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-blue-500/25 active:scale-95 transition-all shrink-0"
              >
                <span>Search</span>
              </button>
            </div>

            {/* Instant Floating Search Suggestions Dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[490px] overflow-y-auto divide-y divide-slate-100">
                {totalResults === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    <p className="text-sm font-bold text-slate-700">No results found for &ldquo;{searchQuery}&rdquo;</p>
                    <p className="text-xs text-slate-400 mt-1">Try searching for &lsquo;PS5&rsquo;, &lsquo;Xbox&rsquo;, &lsquo;FIFA&rsquo;, &lsquo;Thermal Paste&rsquo;, or &lsquo;Screen&rsquo;</p>
                  </div>
                ) : (
                  <>
                    {/* Hardware Products Group */}
                    {matchingProducts.length > 0 && (
                      <div className="p-3.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 flex items-center justify-between">
                          <span>Products in Store</span>
                          <span className="text-blue-600 font-extrabold">{matchingProducts.length} matches</span>
                        </div>
                        <div className="space-y-1.5">
                          {matchingProducts.map(product => (
                            <div
                              key={product.id}
                              className="group flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
                              onClick={() => {
                                setIsSearchFocused(false);
                                const el = document.getElementById('storefront');
                                el?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              <div className="flex items-center space-x-3.5 min-w-0">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-xl bg-slate-100 border border-slate-200/60 shrink-0"
                                />
                                <div className="min-w-0">
                                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">
                                    {product.name}
                                  </h4>
                                  <div className="flex items-center space-x-2 mt-0.5">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                      {product.brand}
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-600">
                                      {product.condition}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3.5 shrink-0 ml-3">
                                <div className="text-right">
                                  <div className="text-xs font-extrabold text-slate-900">
                                    {formatGHS(product.priceGHS)}
                                  </div>
                                  {product.originalPriceGHS && (
                                    <div className="text-[10px] text-slate-400 line-through">
                                      {formatGHS(product.originalPriceGHS)}
                                    </div>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={e => handleAddToCart(e, product)}
                                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center space-x-1 shadow-xs ${
                                    justAddedId === product.id
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'
                                  }`}
                                >
                                  {justAddedId === product.id ? (
                                    <>
                                      <Check className="w-3 h-3 stroke-[2.5]" />
                                      <span>Added</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>+ Add</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Game Pre-loads Group */}
                    {matchingGames.length > 0 && (
                      <div className="p-3.5 bg-slate-50/60">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 flex items-center justify-between">
                          <span>In-Shop Game Installations (Walk-In)</span>
                          <span className="text-blue-600 font-extrabold">{matchingGames.length} available</span>
                        </div>
                        <div className="space-y-1.5">
                          {matchingGames.map(game => (
                            <a
                              key={game.id}
                              href="#installations"
                              onClick={() => setIsSearchFocused(false)}
                              className="group flex items-center justify-between p-2.5 rounded-2xl hover:bg-white transition-colors"
                            >
                              <div className="flex items-center space-x-3.5 min-w-0">
                                <img
                                  src={game.coverImage}
                                  alt={game.title}
                                  className="w-11 h-11 object-cover rounded-xl bg-slate-200 shrink-0"
                                />
                                <div className="min-w-0">
                                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">
                                    {game.title}
                                  </h4>
                                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 mt-0.5">
                                    <span className="font-bold text-blue-600">{game.sizeGB} GB</span>
                                    <span>•</span>
                                    <span>{game.platforms.slice(0, 2).join(', ')}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right shrink-0 ml-3">
                                <span className="text-xs font-extrabold text-slate-900">
                                  GH₵ {game.installPriceGHS}
                                </span>
                                <span className="block text-[9px] text-slate-500 font-medium">install fee</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* View all footer */}
                    <div className="p-3 bg-slate-100/70 text-center">
                      <a
                        href="#storefront"
                        onClick={() => setIsSearchFocused(false)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1.5"
                      >
                        <span>View complete store catalog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 3. RIGHT UTILITY CONTROLS */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* Direct Shop WhatsApp Button */}
            <a
              href="https://wa.me/233500000000"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-emerald-50/90 border border-emerald-200/90 text-emerald-800 hover:bg-emerald-100/90 text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <WhatsAppIcon colored className="w-4 h-4 shrink-0" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 sm:p-2.5 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-95"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping cart containing ${cartCount} items`}
              className="relative flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white text-blue-700 text-[10px] font-extrabold shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 sm:p-2.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar (Only visible on mobile) */}
        <div className="md:hidden pb-3">
          <div className="relative flex items-center bg-slate-100 rounded-full border border-slate-200 p-1">
            <Search className="w-4 h-4 text-slate-400 ml-3 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Xbox, PS5, Laptops"
              className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none py-1.5 truncate"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 mr-2 text-slate-400 shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          TIER 2: AP RAZOX GAMING NAVIGATION ROW (Height: 48px)
          All Categories Pill Menu + Navigation Links + Kumasi Hub Status
         ======================================================== */}
      <div className="border-t border-slate-200/80 bg-white/95 backdrop-blur-md hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-xs">
            
            {/* Left: "All Categories" Dropdown Menu & Quick Links */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* All Categories Dropdown Pill */}
              <div ref={allCategoriesRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsAllCategoriesOpen(!isAllCategoriesOpen)}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <LayoutGrid className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>All Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAllCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* All Categories Floating Panel */}
                {isAllCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2.5 w-64 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100">
                    <div className="py-1">
                      <a
                        href="#storefront"
                        onClick={() => setIsAllCategoriesOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Gamepad2 className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-bold">Gaming Consoles</div>
                          <div className="text-[10px] text-slate-400 font-normal">Xbox Series X|S, PS5, PS4</div>
                        </div>
                      </a>
                      <a
                        href="#storefront"
                        onClick={() => setIsAllCategoriesOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Laptop className="w-4 h-4 text-indigo-600" />
                        <div>
                          <div className="font-bold">Gaming Laptops</div>
                          <div className="text-[10px] text-slate-400 font-normal">RTX 4060, Intel i7, Ryzen 7</div>
                        </div>
                      </a>
                      <a
                        href="#storefront"
                        onClick={() => setIsAllCategoriesOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Disc className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-bold">Original Game Discs</div>
                          <div className="text-[10px] text-slate-400 font-normal">PS5 & Xbox Physical Media</div>
                        </div>
                      </a>
                      <a
                        href="#storefront"
                        onClick={() => setIsAllCategoriesOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <div>
                          <div className="font-bold">Parts & Accessories</div>
                          <div className="text-[10px] text-slate-400 font-normal">Controllers, HDMI Ports, Paste</div>
                        </div>
                      </a>
                    </div>
                    <div className="py-1 bg-slate-50/50">
                      <a
                        href="#installations"
                        onClick={() => setIsAllCategoriesOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <DownloadCloud className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-bold">In-Shop Game Installs</div>
                          <div className="text-[10px] text-slate-400 font-normal">Direct pre-loads to your drive</div>
                        </div>
                      </a>
                      <a
                        href="#repairs"
                        onClick={() => setIsAllCategoriesOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Wrench className="w-4 h-4 text-amber-500" />
                        <div>
                          <div className="font-bold">Repair Lab & Diagnostics</div>
                          <div className="text-[10px] text-slate-400 font-normal">HDMI ports, Liquid metal, Screens</div>
                        </div>
                      </a>
                      <a
                        href="#swaps"
                        onClick={() => setIsAllCategoriesOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="font-bold">Device Swap / Trade-In</div>
                          <div className="text-[10px] text-slate-400 font-normal">Upgrade with cash top-up</div>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <nav className="flex items-center space-x-1 lg:space-x-1.5 font-semibold text-slate-700 whitespace-nowrap overflow-x-auto no-scrollbar">
                {/* Hot Deals Badge */}
                <a
                  href="#storefront"
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-50 to-amber-50 text-rose-700 border border-rose-200/80 hover:from-rose-100 hover:to-amber-100 font-bold transition-all shadow-xs"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600 animate-pulse" />
                  <span>Hot Deals</span>
                </a>

                <a
                  href="#storefront"
                  className="px-3 py-1 rounded-full hover:text-blue-600 hover:bg-slate-100/80 transition-colors"
                >
                  Consoles
                </a>
                <a
                  href="#storefront"
                  className="px-3 py-1 rounded-full hover:text-blue-600 hover:bg-slate-100/80 transition-colors"
                >
                  Gaming Laptops
                </a>
                <a
                  href="#storefront"
                  className="px-3 py-1 rounded-full hover:text-blue-600 hover:bg-slate-100/80 transition-colors"
                >
                  Game Discs
                </a>
                <a
                  href="#installations"
                  className="px-3 py-1 rounded-full hover:text-blue-600 hover:bg-slate-100/80 transition-colors"
                >
                  Pre-Loads
                </a>
                <a
                  href="#repairs"
                  className="px-3 py-1 rounded-full hover:text-blue-600 hover:bg-slate-100/80 transition-colors"
                >
                  Repair Lab
                </a>
                <a
                  href="#swaps"
                  className="px-3 py-1 rounded-full hover:text-blue-600 hover:bg-slate-100/80 transition-colors"
                >
                  Device Swap
                </a>
              </nav>
            </div>

            {/* Right: Physical Kumasi Shop Presence & Status */}
            <div className="hidden xl:flex items-center space-x-2 text-xs shrink-0">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-900 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 inline mr-0.5" />
                  <span>Kumasi Hub</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">Open: 8:30 AM – 7:30 PM</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE EXPANDED SLIDE-DOWN DRAWER
         ======================================================== */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <a
              href="#storefront"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-600 flex items-center space-x-2 border border-slate-200/60"
            >
              <Gamepad2 className="w-4 h-4 text-blue-600" />
              <span>Consoles & Discs</span>
            </a>
            <a
              href="#installations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-600 flex items-center space-x-2 border border-slate-200/60"
            >
              <DownloadCloud className="w-4 h-4 text-blue-600" />
              <span>Game Installs</span>
            </a>
            <a
              href="#repairs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-600 flex items-center space-x-2 border border-slate-200/60"
            >
              <Wrench className="w-4 h-4 text-amber-500" />
              <span>Repair Lab</span>
            </a>
            <a
              href="#swaps"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-600 flex items-center space-x-2 border border-slate-200/60"
            >
              <RefreshCw className="w-4 h-4 text-emerald-500" />
              <span>Device Swap</span>
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <a
              href="tel:+233500000000"
              className="flex items-center space-x-1.5 text-slate-700 font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>+233 (0) 50 000 000</span>
            </a>
            <a
              href="https://wa.me/233500000000"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-800 bg-emerald-50/90 px-3 py-1.5 rounded-full font-bold flex items-center space-x-1.5 border border-emerald-200"
            >
              <WhatsAppIcon colored className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
