'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, RefreshCw, Star } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addToCart, formatGHS } = useCart();
  const router = useRouter();

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const phone = '233500000000'; // Nas Tech WhatsApp
    const msg = `Hello Nas Tech! I am interested in purchasing:\n*${product.name}*\nPrice: ${formatGHS(product.priceGHS)}\nCondition: ${product.condition}\nIs it in stock at your shop right now?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (onOpenDetails) {
      onOpenDetails(product);
    }
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="product-card group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer min-w-0 w-full"
    >
      {/* Product Image Area */}
      <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {product.swapEligible && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              <RefreshCw className="w-2.5 h-2.5" />
              <span>Swap Eligible</span>
            </span>
          )}
        </div>

        {/* Condition Tag */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 shadow-2xs">
            {product.condition}
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Rating and In-Shop Availability */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold text-slate-900">{product.rating}</span>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>

          <span
            className={`text-[11px] font-medium flex items-center space-x-1 ${
              product.inStock ? 'text-emerald-700' : 'text-rose-600'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product.inStock ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            <span>{product.inStock ? `${product.stockCount} in shop` : 'Sold out'}</span>
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Technical Specification Chips */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {product.specs.storage && (
            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10px] font-semibold text-slate-600">
              {product.specs.storage}
            </span>
          )}
          {product.specs.gpu && (
            <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[10px] font-semibold text-blue-700">
              {product.specs.gpu}
            </span>
          )}
          {product.specs.ram && (
            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10px] font-semibold text-slate-600">
              {product.specs.ram}
            </span>
          )}
          {product.specs.compatibility && (
            <span className="px-2 py-0.5 rounded-md bg-purple-50 border border-purple-200 text-[10px] font-semibold text-purple-700">
              {product.specs.compatibility}
            </span>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 mt-auto border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              {formatGHS(product.priceGHS)}
            </div>
            {product.originalPriceGHS && (
              <div className="text-[11px] font-medium text-slate-400 line-through">
                {formatGHS(product.originalPriceGHS)}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={handleAddToCart}
              title="Add to cart"
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              title="Quick WhatsApp inquiry"
              className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-all active:scale-95 shadow-xs"
            >
              <WhatsAppIcon colored className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
