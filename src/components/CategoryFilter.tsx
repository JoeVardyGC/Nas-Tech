'use client';

import React from 'react';
import { ProductCategory } from '@/types';
import { Gamepad2, Laptop, Disc, Cpu, Layers, Search } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedCondition: string;
  onSelectCondition: (condition: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  productCount: number;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  selectedCondition,
  onSelectCondition,
  searchQuery,
  onSearchChange,
  productCount,
}: CategoryFilterProps) {
  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Products', icon: <Layers className="w-4 h-4" /> },
    { id: 'consoles', label: 'Xbox & PS Consoles', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'laptops', label: 'Gaming & Work Laptops', icon: <Laptop className="w-4 h-4" /> },
    { id: 'discs', label: 'Original Game Discs', icon: <Disc className="w-4 h-4" /> },
    { id: 'parts_accessories', label: 'Gamepads & Parts', icon: <Cpu className="w-4 h-4" /> },
  ];

  const conditions = ['All Conditions', 'Brand New', 'Foreign Used', 'Pre-Owned (Refurbished)'];

  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills (Inspired by Stuffsus) */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-Bar: Search & Condition Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Xbox Series X, PS5, RTX 4060, Discs, HDMI Ports..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors shadow-2xs"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        {/* Condition Filters */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
            {conditions.map((cond) => (
              <button
                key={cond}
                onClick={() => onSelectCondition(cond)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCondition === cond
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-sans whitespace-nowrap pl-2 border-l border-slate-200">
            <strong>{productCount}</strong> items
          </span>
        </div>
      </div>
    </div>
  );
}
