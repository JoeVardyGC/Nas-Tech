'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem } from '@/types';
import { buildWhatsAppMessage, whatsappUrl, Fulfillment, WhatsAppOrder } from '@/lib/whatsapp';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalGHS: number;
  formatGHS: (amount: number) => string;
  generateWhatsAppLink: (customerName?: string, deliveryAddress?: string, fulfillment?: Fulfillment) => string;
  buildCartOrder: () => WhatsAppOrder;
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

  const buildCartOrder = (): WhatsAppOrder => ({
    intent: 'order the following from Nas Tech',
    lines: cart.map((item) => {
      const isInstall = item.product.kind === 'game_install';
      const details: string[] = [];
      if (isInstall && item.product.installMeta) {
        details.push(`Game installation • ${item.product.installMeta.platformCategory} • ${item.product.installMeta.sizeGB} GB`);
      } else {
        details.push(`Condition: ${item.product.condition}`);
      }
      if (item.selectedColor) details.push(`Colour/Edition: ${item.selectedColor}`);
      return {
        label: item.product.name,
        quantity: item.quantity,
        amountGHS: item.product.priceGHS * item.quantity,
        details,
      };
    }),
    totalGHS,
    note: cart.some((i) => i.product.kind === 'game_install')
      ? '💾 For the game installs I will bring my console / laptop / drive to the shop.'
      : undefined,
  });

  const generateWhatsAppLink = (customerName = '', deliveryAddress = '', fulfillment: Fulfillment = 'pickup') => {
    return whatsappUrl(
      buildWhatsAppMessage(buildCartOrder(), { name: customerName, location: deliveryAddress, fulfillment })
    );
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
        buildCartOrder,
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
