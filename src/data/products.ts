import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  // 1. CONSOLES
  {
    id: 'prod-xbox-series-x',
    name: 'Xbox Series X 1TB Console (Black Edition)',
    category: 'consoles',
    brand: 'Xbox',
    condition: 'Brand New',
    priceGHS: 7800,
    originalPriceGHS: 8400,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stockCount: 5,
    badge: 'Best Seller',
    swapEligible: true,
    image: '/assets/hero/xbox_series_x_hero.jpg',
    gallery: [
      '/assets/hero/xbox_series_x_hero.jpg',
      '/assets/hero/xbox_series_x_transparent.png'
    ],
    specs: {
      storage: '1TB Custom NVMe SSD',
      gpu: '12 TFLOPS 52 CUs @ 1.825 GHz Custom RDNA 2',
      processor: '8X Cores @ 3.8 GHz Custom Zen 2 CPU',
      ram: '16GB GDDR6'
    },
    description: 'Experience 12 teraflops of raw graphic processing power, DirectX ray tracing, a custom SSD, and true 4K gaming.'
  },
  {
    id: 'prod-xbox-series-s',
    name: 'Xbox Series S 512GB Digital Console (Robot White)',
    category: 'consoles',
    brand: 'Xbox',
    condition: 'Brand New',
    priceGHS: 4200,
    originalPriceGHS: 4500,
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    stockCount: 8,
    badge: 'Special Deal',
    swapEligible: true,
    image: '/assets/hero/carousel/console_xboxone_isolated.png',
    gallery: [
      '/assets/hero/carousel/console_xboxone_isolated.png'
    ],
    specs: {
      storage: '512GB Custom NVMe SSD',
      gpu: '4 TFLOPS Custom RDNA 2',
      processor: '8X Cores @ 3.6 GHz Custom Zen 2 CPU',
      ram: '10GB GDDR6'
    },
    description: 'Next-gen performance in the smallest Xbox ever. All digital, high speed loading with Quick Resume.'
  },
  {
    id: 'prod-ps5-slim-disc',
    name: 'Sony PlayStation 5 Slim 1TB Disc Edition',
    category: 'consoles',
    brand: 'PlayStation',
    condition: 'Brand New',
    priceGHS: 8600,
    originalPriceGHS: 9200,
    rating: 5.0,
    reviewsCount: 65,
    inStock: true,
    stockCount: 4,
    badge: 'Popular',
    swapEligible: true,
    image: '/assets/hero/ps5_pro_hero.jpg',
    gallery: [
      '/assets/hero/ps5_pro_hero.jpg',
      '/assets/hero/carousel/ps5_consoles_pedestal.png'
    ],
    specs: {
      storage: '1TB High-Speed Custom SSD',
      ram: '16GB GDDR6',
      edition: 'Ultra HD Blu-ray Disc Edition'
    },
    description: 'PlayStation 5 Slim with detachable Blu-ray drive, ultra-high speed SSD, and haptic feedback DualSense controller.'
  },
  {
    id: 'prod-xbox-one-x-used',
    name: 'Xbox One X 1TB 4K Gaming Console (Pre-Owned)',
    category: 'consoles',
    brand: 'Xbox',
    condition: 'Pre-Owned (Refurbished)',
    priceGHS: 2800,
    originalPriceGHS: 3200,
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
    stockCount: 3,
    badge: 'Great Value',
    swapEligible: true,
    image: '/assets/hero/carousel/console_xboxone_isolated.png',
    gallery: [
      '/assets/hero/carousel/console_xboxone_isolated.png'
    ],
    specs: {
      storage: '1TB HDD (Optional SSD Upgrade available)',
      gpu: '6 Teraflops GPU',
      edition: '4K Ultra HD Gaming'
    },
    description: 'Fully serviced, repasted with premium thermal compound, tested, and comes with 1 genuine wireless controller.'
  },

  // 2. LAPTOPS
  {
    id: 'prod-asus-tuf-gaming',
    name: 'ASUS TUF Gaming A15 (RTX 4060, Ryzen 7 7735HS)',
    category: 'laptops',
    brand: 'ASUS',
    condition: 'Brand New',
    priceGHS: 17500,
    originalPriceGHS: 19000,
    rating: 4.9,
    reviewsCount: 14,
    inStock: true,
    stockCount: 2,
    badge: 'Top Pick',
    swapEligible: true,
    image: '/assets/hero/rog_laptop_hero.jpg',
    gallery: [
      '/assets/hero/rog_laptop_hero.jpg'
    ],
    specs: {
      processor: 'AMD Ryzen 7 7735HS 8-Core',
      gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (140W)',
      ram: '16GB DDR5 4800MHz',
      storage: '1TB PCIe 4.0 NVMe SSD',
      display: '15.6" FHD 144Hz IPS 100% sRGB'
    },
    description: 'High performance gaming and content creation beast with military-grade durability and dual Arc Flow fans.'
  },
  {
    id: 'prod-hp-victus-15',
    name: 'HP Victus 15 Gaming Laptop (RTX 3050, Core i5-13420H)',
    category: 'laptops',
    brand: 'HP',
    condition: 'Foreign Used',
    priceGHS: 9800,
    originalPriceGHS: 10500,
    rating: 4.8,
    reviewsCount: 21,
    inStock: true,
    stockCount: 3,
    badge: 'Best Budget',
    swapEligible: true,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      processor: 'Intel Core i5-13420H 8-Core (Up to 4.6GHz)',
      gpu: 'NVIDIA GeForce RTX 3050 6GB GDDR6',
      ram: '16GB DDR4 3200MHz',
      storage: '512GB NVMe M.2 SSD',
      display: '15.6" Full HD 144Hz Micro-edge'
    },
    description: 'Clean UK-used condition. Fully inspected, clean battery health (96%), tested with AAA games and thermal benchmarking.'
  },
  {
    id: 'prod-dell-latitude-pro',
    name: 'Dell Latitude 5420 Workstation & Coding Laptop',
    category: 'laptops',
    brand: 'Dell',
    condition: 'Foreign Used',
    priceGHS: 4900,
    originalPriceGHS: 5400,
    rating: 4.7,
    reviewsCount: 33,
    inStock: true,
    stockCount: 6,
    badge: 'Productivity',
    swapEligible: true,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      processor: 'Intel Core i7-1185G7 vPro (Up to 4.8GHz)',
      ram: '16GB DDR4 (Expandable to 64GB)',
      storage: '512GB PCIe NVMe SSD',
      display: '14.0" FHD Anti-Glare Backlit'
    },
    description: 'Ultra-durable business and student workhorse. Super fast boot, backlit keyboard, fingerprint sensor, and 6+ hours battery life.'
  },

  // 3. PHYSICAL GAME DISCS
  {
    id: 'prod-disc-gta-v',
    name: 'Grand Theft Auto V: Premium Edition (PS5 / Xbox Disc)',
    category: 'discs',
    brand: 'PlayStation',
    condition: 'Brand New',
    priceGHS: 350,
    originalPriceGHS: 420,
    rating: 5.0,
    reviewsCount: 110,
    inStock: true,
    stockCount: 15,
    badge: 'Must Have',
    swapEligible: true,
    image: '/assets/hero/gtav_cover.jpg',
    gallery: ['/assets/hero/gtav_cover.jpg'],
    specs: {
      compatibility: 'PS5 / PS4 / Xbox One / Series X',
      edition: 'Premium Edition with Criminal Enterprise Starter Pack'
    },
    description: 'Factory sealed genuine game disc. Available in stock at our Kumasi showroom.'
  },
  {
    id: 'prod-disc-fc-25',
    name: 'EA Sports FC 25 (PlayStation 5 Physical Disc)',
    category: 'discs',
    brand: 'PlayStation',
    condition: 'Brand New',
    priceGHS: 750,
    originalPriceGHS: 850,
    rating: 4.8,
    reviewsCount: 54,
    inStock: true,
    stockCount: 10,
    badge: 'New Release',
    swapEligible: true,
    image: '/assets/hero/fc25_cover.jpg',
    gallery: ['/assets/hero/fc25_cover.jpg'],
    specs: {
      compatibility: 'PS5 Disc Edition',
      edition: 'Standard Physical Disc'
    },
    description: 'HyperMotionV technology with updated 2024/2025 squads, Ultimate Team, and Career Mode.'
  },
  {
    id: 'prod-disc-spiderman-2',
    name: "Marvel's Spider-Man 2 (PlayStation 5 Disc, Mint Used)",
    category: 'discs',
    brand: 'PlayStation',
    condition: 'Pre-Owned (Refurbished)',
    priceGHS: 480,
    originalPriceGHS: 650,
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    stockCount: 4,
    badge: 'Popular',
    swapEligible: true,
    image: '/assets/hero/spiderman_card_art.jpg',
    gallery: ['/assets/hero/spiderman_card_art.jpg'],
    specs: {
      compatibility: 'PS5 Only',
      edition: 'Complete in original box, scratch-free disc'
    },
    description: 'Tested and buffed 100% scratch-free disc. Inspected and verified in our Kumasi workshop.'
  },

  // 4. PARTS & ACCESSORIES
  {
    id: 'prod-dualsense-custom',
    name: 'DualSense™ Wireless Controller (Midnight Black / Ice Cyan)',
    category: 'parts_accessories',
    brand: 'PlayStation',
    condition: 'Brand New',
    priceGHS: 950,
    originalPriceGHS: 1100,
    rating: 4.9,
    reviewsCount: 48,
    inStock: true,
    stockCount: 7,
    badge: 'Featured',
    swapEligible: true,
    image: '/assets/hero/dualsense_hero_perfect.jpg',
    gallery: [
      '/assets/hero/dualsense_hero_perfect.jpg',
      '/assets/hero/carousel/collector_genshin_cyan.jpg'
    ],
    specs: {
      compatibility: 'PS5, PC, Mobile via Bluetooth',
      edition: 'Haptic Feedback & Adaptive Triggers'
    },
    description: 'Original Sony controller with dynamic haptic feedback, built-in microphone, and USB-C fast charging.'
  },
  {
    id: 'prod-xbox-wireless-controller',
    name: 'Xbox Wireless Controller (Robot White / Carbon Black)',
    category: 'parts_accessories',
    brand: 'Xbox',
    condition: 'Brand New',
    priceGHS: 850,
    originalPriceGHS: 980,
    rating: 4.9,
    reviewsCount: 39,
    inStock: true,
    stockCount: 12,
    badge: 'Popular',
    swapEligible: true,
    image: '/assets/hero/carousel/console_xboxone_isolated.png',
    gallery: ['/assets/hero/carousel/console_xboxone_isolated.png'],
    specs: {
      compatibility: 'Xbox Series X|S, Xbox One, Windows PC, Android, iOS'
    },
    description: 'Sculpted surfaces, hybrid D-pad, textured grip, and dedicated Share button.'
  },
  {
    id: 'prod-hdmi-port-part',
    name: 'OEM PlayStation 5 & Xbox Series X Replacement HDMI Port',
    category: 'parts_accessories',
    brand: 'Nas Tech Repair',
    condition: 'Brand New',
    priceGHS: 180,
    originalPriceGHS: 220,
    rating: 4.8,
    reviewsCount: 15,
    inStock: true,
    stockCount: 18,
    badge: 'Repair Part',
    swapEligible: false,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    gallery: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'],
    specs: {
      compatibility: 'PS5 Original & Slim / Xbox Series X Motherboards',
      edition: 'High-Temperature Solid Solder Pin OEM'
    },
    description: 'Gold-plated replacement HDMI 2.1 port connector for damaged console displays. Sold standalone or with in-shop micro-soldering service.'
  },
  {
    id: 'prod-nvme-ssd-1tb',
    name: 'Kingston NV2 1TB PCIe 4.0 NVMe SSD (For Laptops & PS5)',
    category: 'parts_accessories',
    brand: 'Kingston',
    condition: 'Brand New',
    priceGHS: 850,
    originalPriceGHS: 950,
    rating: 4.9,
    reviewsCount: 22,
    inStock: true,
    stockCount: 9,
    badge: 'Upgrade Part',
    swapEligible: false,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
    gallery: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80'],
    specs: {
      storage: '1TB Gen 4x4 NVMe M.2 2280',
      compatibility: 'PS5 M.2 Expansion Slot, Gaming Laptops, Desktop PCs'
    },
    description: 'Read speeds up to 3500MB/s. Includes free in-shop installation and heatsink mounting when purchased.'
  }
];
