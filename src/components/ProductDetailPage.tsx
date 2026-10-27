'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductCategory } from '@/types';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWhatsApp } from '@/context/WhatsAppContext';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Plus,
  Minus,
  Check,
  Zap,
  Truck,
  Store,
  Layers,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const { addToCart, formatGHS, setIsCartOpen } = useCart();
  const { requestWhatsApp } = useWhatsApp();

  // State
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Category Filter State (displayed at top per user request)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(product.category);
  const [selectedCondition, setSelectedCondition] = useState<string>('All Conditions');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeImage = selectedImage || product.image;

  // Add to cart handler
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  // Direct WhatsApp inquiry handler
  const handleWhatsAppInquiry = () => {
    requestWhatsApp({
      intent: `purchase / reserve this item from your Kumasi showroom`,
      lines: [
        {
          label: product.name,
          quantity,
          amountGHS: product.priceGHS * quantity,
          details: [
            `Condition: ${product.condition}`,
            `Brand: ${product.brand}`,
            product.specs.storage ? `Storage: ${product.specs.storage}` : '',
            product.specs.ram ? `RAM: ${product.specs.ram}` : '',
          ].filter(Boolean),
        },
      ],
      totalGHS: product.priceGHS * quantity,
      note: 'Please confirm stock and collection details at Sawaba near St. Patrick Hotel, Kumasi.',
    });
  };

  // Filtered Related Products displayed "down there"
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (item.id === product.id) return false;

      // Category matching
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Condition matching
      if (selectedCondition !== 'All Conditions' && item.condition !== selectedCondition) {
        return false;
      }

      // Search matching
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }

      return true;
    }).slice(0, 8);
  }, [product.id, selectedCategory, selectedCondition, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* 1. TOP FILTER BAR (Explicitly displayed per user request) */}
        <section aria-label="Product categories filter" className="pt-2">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-extrabold text-slate-500 uppercase tracking-widest text-[11px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Browse Catalog & Filter Related Products</span>
            </span>
            <Link
              href="/#storefront"
              className="font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
            >
              <span>View All 24+ Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCondition={selectedCondition}
            onSelectCondition={setSelectedCondition}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            productCount={relatedProducts.length}
          />
        </section>

        {/* 2. BREADCRUMBS & BACK LINK */}
        <nav aria-label="Breadcrumbs" className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center space-x-2 text-slate-500 font-medium overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-blue-600 transition-colors shrink-0">
              Home
            </Link>
            <span>/</span>
            <Link href="/#storefront" className="hover:text-blue-600 transition-colors shrink-0">
              Shop
            </Link>
            <span>/</span>
            <span className="text-blue-600 font-bold uppercase tracking-wider text-[11px] shrink-0">
              {product.category.replace('_', ' ')}
            </span>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-md">
              {product.name}
            </span>
          </div>

          <Link
            href="/#storefront"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 font-bold text-xs transition-all shadow-2xs shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Storefront</span>
          </Link>
        </nav>

        {/* 3. PRODUCT SHOWCASE DETAILS CONTAINER (Matching screenshot specifications) */}
        <section className="rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column: Gallery & Shop Guarantee */}
            <div className="space-y-5">
              {/* Main Image Frame */}
              <div className="relative w-full aspect-[4/3] rounded-3xl bg-slate-50 border border-slate-200/80 overflow-hidden flex items-center justify-center p-4 group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Left Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 shadow-sm">
                    {product.condition}
                  </span>
                  {product.badge && (
                    <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-950 text-white shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Top Right Live Stock Chip */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{product.stockCount} in showroom</span>
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails (if available) */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-1">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white p-1 flex items-center justify-center ${
                        activeImage === img
                          ? 'border-blue-600 shadow-md shadow-blue-500/20'
                          : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Nas Tech Shop Guarantee Card (Matches user upload) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/90 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-emerald-700 font-extrabold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Nas Tech Shop Guarantee</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  All pre-owned and foreign used consoles, laptops, and parts are physically inspected, repasted, and backed by our shop warranty.
                </p>
                <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 border-t border-slate-200/80">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>1-Year Kumasi Warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>In-Shop Testing Before Pay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Specs, Actions */}
            <div className="flex flex-col space-y-5">
              <div>
                <div className="text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-1.5 font-sans">
                  {product.brand} • {product.category.replace('_', ' ')}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Rating & In-Shop Status */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 text-xs">
                <div className="flex items-center space-x-2 text-amber-500">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">{product.rating}</span>
                  <span className="text-slate-400 font-medium">({product.reviewsCount} customer reviews)</span>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {product.stockCount} in shop showroom
                </span>
              </div>

              {/* Price in Cedis */}
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 tabular-nums font-sans">
                  {formatGHS(product.priceGHS)}
                </span>
                {product.originalPriceGHS && (
                  <span className="text-base sm:text-lg font-medium text-slate-400 line-through tabular-nums">
                    {formatGHS(product.originalPriceGHS)}
                  </span>
                )}
                {product.originalPriceGHS && (
                  <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
                    Save {formatGHS(product.originalPriceGHS - product.priceGHS)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* PRODUCT SPECIFICATIONS (Matches screenshot box) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 text-xs">
                <div className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">
                  PRODUCT SPECIFICATIONS:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {product.specs.storage && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-slate-500 text-[11px] block">Storage:</span>
                      <strong className="text-slate-900 font-bold">{product.specs.storage}</strong>
                    </div>
                  )}
                  {product.specs.ram && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-slate-500 text-[11px] block">RAM:</span>
                      <strong className="text-slate-900 font-bold">{product.specs.ram}</strong>
                    </div>
                  )}
                  {product.specs.processor && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-slate-500 text-[11px] block">CPU:</span>
                      <strong className="text-slate-900 font-bold">{product.specs.processor}</strong>
                    </div>
                  )}
                  {product.specs.gpu && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-slate-500 text-[11px] block">GPU:</span>
                      <strong className="text-slate-900 font-bold">{product.specs.gpu}</strong>
                    </div>
                  )}
                  {product.specs.compatibility && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-slate-500 text-[11px] block">Platform:</span>
                      <strong className="text-slate-900 font-bold">{product.specs.compatibility}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center justify-between sm:justify-start border border-slate-300 rounded-2xl bg-slate-50 px-3 py-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg font-bold transition-colors"
                    title="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-extrabold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg font-bold transition-colors"
                    title="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 transition-all active:scale-95"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Vault Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO CART ({formatGHS(product.priceGHS * quantity)})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Action Button */}
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full flex items-center justify-center space-x-2.5 py-3 px-6 rounded-2xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100/90 text-emerald-800 font-extrabold text-xs transition-all shadow-xs active:scale-95"
              >
                <WhatsAppIcon colored className="w-4 h-4 shrink-0" />
                <span>Inquire / Reserve via WhatsApp (+233 55 165 9683)</span>
              </button>

              {/* Showroom Status Footnote */}
              <div className="flex items-center space-x-2 text-[11px] text-slate-500 pt-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Available for immediate walk-in pickup at Kumasi Hub (Sawaba near St. Patrick Hotel) or dispatch across Ghana.</span>
              </div>

            </div>

          </div>
        </section>

        {/* 4. RELATED PRODUCTS SECTION ("down there" per user request) */}
        <section aria-label="Related products section" className="pt-8 border-t border-slate-200/90">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-2 text-blue-700 text-xs uppercase tracking-widest mb-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MORE IN {selectedCategory.toUpperCase().replace('_', ' ')} // KUMASI SHOWROOM</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Related Products & Gaming Gear
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Explore matching consoles, original discs, and accessories in stock for shop pickup or delivery.
              </p>
            </div>

            <div className="text-xs text-slate-500 font-semibold">
              Showing <strong className="text-slate-900 font-extrabold">{relatedProducts.length}</strong> related items
            </div>
          </div>

          {/* Related Products Grid */}
          {relatedProducts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-3">
              <div className="text-3xl">🔍</div>
              <h3 className="font-bold text-slate-900 text-base">No related products match your filter</h3>
              <p className="text-xs text-slate-500">
                Try switching the category pills above to explore all items in our Kumasi showroom.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCondition('All Conditions');
                  setSearchQuery('');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
