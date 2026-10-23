export type ProductCategory = 'all' | 'consoles' | 'laptops' | 'discs' | 'parts_accessories';

export type ProductCondition = 'Brand New' | 'Foreign Used' | 'Pre-Owned (Refurbished)';

export interface Product {
  id: string;
  name: string;
  category: 'consoles' | 'laptops' | 'discs' | 'parts_accessories';
  brand: string; // 'Xbox' | 'PlayStation' | 'Nintendo' | 'ASUS' | 'HP' | 'Dell' | 'Lenovo' | 'Razer'
  condition: ProductCondition;
  priceGHS: number;
  originalPriceGHS?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: string; // 'Best Seller' | 'Special Deal' | 'Rare Find' | 'Swap Eligible'
  swapEligible: boolean;
  image: string;
  gallery: string[];
  specs: {
    storage?: string;
    ram?: string;
    processor?: string;
    gpu?: string;
    display?: string;
    edition?: string;
    compatibility?: string;
  };
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}
