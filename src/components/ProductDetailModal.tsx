'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { X, Star, ShoppingBag, ShieldCheck, RefreshCw } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart, formatGHS } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const activeImage = selectedImage || product.image;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const phone = '233500000000'; // Nas Tech WhatsApp
    const msg = `Hello Nas Tech! I want to purchase this item from your Kumasi shop:\n- Product: ${product.name}\n- Condition: ${product.condition}\n- Quantity: ${quantity}\n- Price: ${formatGHS(product.priceGHS * quantity)}\n\nPlease let me know when I can pick it up.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-4xl rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          
          {/* Gallery Column */}
          <div className="space-y-4">
            <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-slate-50 overflow-hidden border border-slate-200">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/95 border border-slate-200 text-slate-900 shadow-2xs">
                  {product.condition}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === img ? 'border-blue-600' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Assurance Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Nas Tech Shop Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All pre-owned and foreign used consoles, laptops, and parts are physically inspected, repasted, and backed by our shop warranty.
              </p>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col space-y-4">
            <div>
              <div className="text-xs font-sans font-bold text-blue-600 uppercase tracking-wider mb-1">
                {product.brand} • {product.category.replace('_', ' ')}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Rating & In-Shop Availability */}
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-1.5 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-slate-900">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} reviews)</span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {product.stockCount} in shop showroom
              </span>
            </div>

            {/* Price in Cedis */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-black font-sans text-slate-900">
                {formatGHS(product.priceGHS)}
              </span>
              {product.originalPriceGHS && (
                <span className="text-sm font-sans text-slate-400 line-through">
                  {formatGHS(product.originalPriceGHS)}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Technical Specs Table */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                Product Specifications:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {product.specs.storage && (
                  <div>
                    <span className="text-slate-500">Storage:</span>{' '}
                    <strong className="text-slate-900">{product.specs.storage}</strong>
                  </div>
                )}
                {product.specs.ram && (
                  <div>
                    <span className="text-slate-500">RAM:</span>{' '}
                    <strong className="text-slate-900">{product.specs.ram}</strong>
                  </div>
                )}
                {product.specs.processor && (
                  <div>
                    <span className="text-slate-500">CPU:</span>{' '}
                    <strong className="text-slate-900">{product.specs.processor}</strong>
                  </div>
                )}
                {product.specs.gpu && (
                  <div>
                    <span className="text-slate-500">GPU:</span>{' '}
                    <strong className="text-slate-900">{product.specs.gpu}</strong>
                  </div>
                )}
                {product.specs.compatibility && (
                  <div>
                    <span className="text-slate-500">Platform:</span>{' '}
                    <strong className="text-slate-900">{product.specs.compatibility}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Swap Program Mention */}
            {product.swapEligible && (
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800">
                <RefreshCw className="w-4 h-4 flex-shrink-0" />
                <span>Bring your old console or laptop to our shop for a trade-in credit toward this item!</span>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div className="pt-2 flex items-center space-x-3">
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-slate-600 hover:text-slate-900 font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-sans font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-2 py-1 text-slate-600 hover:text-slate-900 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart ({formatGHS(product.priceGHS * quantity)})</span>
              </button>
            </div>

            {/* Direct WhatsApp Action */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-all shadow-xs"
            >
              <WhatsAppIcon colored className="w-4 h-4 shrink-0" />
              <span>Inquire / Reserve via WhatsApp</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
