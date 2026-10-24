'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

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

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const link = generateWhatsAppLink(customerName, deliveryAddress);
    window.open(link, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      data-testid="cart-modal"
      className="cart-drawer fixed inset-0 z-50 overflow-hidden font-sans"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-base tracking-wide text-slate-900">Your Shopping Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
                  🛒
                </div>
                <div className="font-bold text-slate-700">Your cart is empty</div>
                <p className="text-xs text-slate-500 max-w-xs">
                  Browse consoles, laptops, game discs, and parts to add items to your in-shop pickup or delivery order.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex space-x-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-white"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-semibold text-xs text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[10px] text-blue-600 font-sans font-medium">
                      {item.product.condition}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white px-1.5 py-0.5 text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-1.5 text-slate-500 hover:text-slate-900 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-[11px] font-sans font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-1.5 text-slate-500 hover:text-slate-900 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-sans font-bold text-slate-900">
                        {formatGHS(item.product.priceGHS * item.quantity)}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
                <input
                  type="text"
                  placeholder="Delivery Address / City (e.g. Kumasi, Accra, Sunyani)"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Totals in GH₵ */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-sans font-bold text-slate-900">{formatGHS(totalGHS)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Pickup / Dispatch:</span>
                  <span className="text-emerald-700 font-semibold">Available at Kumasi Shop</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-200 text-slate-900">
                  <span>Total Amount:</span>
                  <span className="font-sans text-blue-700 text-base">{formatGHS(totalGHS)}</span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center space-x-2.5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  <WhatsAppIcon colored className="w-4 h-4 shrink-0" />
                  <span>Send Order to Nas Tech WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-[11px] text-slate-400 hover:text-slate-600 py-1"
                >
                  Clear Cart
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
