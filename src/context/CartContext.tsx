'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalGHS: number;
  formatGHS: (amount: number) => string;
  generateWhatsAppLink: (customerName?: string, deliveryAddress?: string) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nas_tech_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nas_tech_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalGHS = cart.reduce(
    (sum, item) => sum + item.product.priceGHS * item.quantity,
    0
  );

  const formatGHS = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount).replace('GHS', 'GH₵');
  };

  const generateWhatsAppLink = (customerName = '', deliveryAddress = '') => {
    const shopPhone = '233500000000'; // Replace with Nas Tech phone
    let message = `*NEW ORDER - NAS TECH GAMING*\n`;
    if (customerName) message += `Customer: ${customerName}\n`;
    if (deliveryAddress) message += `Delivery Address: ${deliveryAddress}\n`;
    message += `\n*Items Ordered:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (x${item.quantity}) - ${formatGHS(item.product.priceGHS * item.quantity)}\n`;
      if (item.selectedColor) message += `   Color/Edition: ${item.selectedColor}\n`;
      message += `   Condition: ${item.product.condition}\n`;
    });

    message += `\n*Total Amount:* ${formatGHS(totalGHS)}\n`;
    message += `\nPlease confirm item availability and pickup/dispatch details. Thank you!`;

    return `https://wa.me/${shopPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        totalGHS,
        formatGHS,
        generateWhatsAppLink,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
