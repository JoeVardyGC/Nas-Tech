'use client';

import React, { useState, useMemo } from 'react';
import HeroCarousel from '@/components/HeroCarousel/HeroCarousel';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import GameInstallerHub from '@/components/GameInstallerHub';
import RepairAndTrackingHub from '@/components/RepairAndTrackingHub';
import { PRODUCTS } from '@/data/products';
import { Product, ProductCategory } from '@/types';
import { Gamepad2, HardDrive, Wrench, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('All Conditions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Condition match
      if (selectedCondition !== 'All Conditions' && product.condition !== selectedCondition) {
        return false;
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesSpecs = Object.values(product.specs).some((val) =>
          val?.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesSpecs) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedCondition, searchQuery]);

  return (
    <div className="min-h-screen space-y-16 pb-20 overflow-x-hidden">
      
      {/* 1. 5-Slide Dynamic Hero Carousel System */}
      <HeroCarousel />

      {/* 2. Fast Trust & Ghanaian In-Shop Assurance Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Consoles & Laptops</div>
              <div className="text-[11px] text-slate-500 font-medium">Xbox, PS5 & Gaming Laptops</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">In-Shop Game Pre-Loads</div>
              <div className="text-[11px] text-slate-500 font-medium">Bring Your Drive or Console</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">1-Year Shop Warranty</div>
              <div className="text-[11px] text-slate-500 font-medium">Sawaba, Kumasi Showroom</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Hardware Repairs</div>
              <div className="text-[11px] text-slate-500 font-medium">HDMI Ports & Overheating Fix</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STOREFRONT CATALOG FIRST (As Requested!) */}
      <section id="storefront" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="sr-only">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SHOP INVENTORY // KUMASI SHOWROOM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              HARDWARE, GAME DISCS & ACCESSORIES
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              All prices displayed in Ghanaian Cedis (GH₵). Available for immediate shop pickup in Kumasi or dispatch.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Showing <strong className="text-slate-900 font-extrabold">{filteredProducts.length}</strong> items in stock
          </div>
        </div>

        {/* Filter Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedCondition={selectedCondition}
          onSelectCondition={setSelectedCondition}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          productCount={filteredProducts.length}
        />

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-3 shadow-xs">
            <div className="text-3xl">🔍</div>
            <h3 className="font-bold text-slate-900 text-base">No matching products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCondition('All Conditions');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setActiveModalProduct(p)}
              />
            ))}
          </div>
        )}

      </section>

      {/* 4. DIGITAL GAME INSTALLATION ARCHIVE (IN-PERSON SERVICE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GameInstallerHub />
      </section>

      {/* 5. CONSOLE, GAMEPAD & LAPTOP REPAIR WORKSHOP + TRACKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RepairAndTrackingHub />
      </section>

      {/* 6. Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

    </div>
  );
}
