export interface InstallableGame {
  id: string;
  title: string;
  sizeGB: number;
  platforms: ('PS5' | 'PS4' | 'Xbox Series' | 'Xbox One' | 'PC / Laptop')[];
  category: 'Action' | 'Sports' | 'RPG / Adventure' | 'Racing' | 'Shooter';
  installPriceGHS: number;
  coverImage: string;
  rating: number;
}

export const INSTALLABLE_GAMES: InstallableGame[] = [
  {
    id: 'game-gta-v',
    title: 'Grand Theft Auto V: Enhanced',
    sizeGB: 95,
    platforms: ['PS5', 'PS4', 'Xbox Series', 'Xbox One', 'PC / Laptop'],
    category: 'Action',
    installPriceGHS: 50,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
  },
  {
    id: 'game-fc-25',
    title: 'EA Sports FC 25 (Latest Squads)',
    sizeGB: 48,
    platforms: ['PS5', 'PS4', 'Xbox Series', 'Xbox One', 'PC / Laptop'],
    category: 'Sports',
    installPriceGHS: 60,
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
  },
  {
    id: 'game-spiderman-2',
    title: "Marvel's Spider-Man 2",
    sizeGB: 86,
    platforms: ['PS5', 'PC / Laptop'],
    category: 'Action',
    installPriceGHS: 60,
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
  },
  {
    id: 'game-cod-mw3',
    title: 'Call of Duty: Modern Warfare III',
    sizeGB: 135,
    platforms: ['PS5', 'PS4', 'Xbox Series', 'Xbox One', 'PC / Laptop'],
    category: 'Shooter',
    installPriceGHS: 70,
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
  },
  {
    id: 'game-forza-horizon-5',
    title: 'Forza Horizon 5: Premium',
    sizeGB: 110,
    platforms: ['Xbox Series', 'Xbox One', 'PC / Laptop'],
    category: 'Racing',
    installPriceGHS: 55,
    coverImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
  },
  {
    id: 'game-god-of-war-ragnarok',
    title: 'God of War: Ragnarök',
    sizeGB: 84,
    platforms: ['PS5', 'PS4', 'PC / Laptop'],
    category: 'RPG / Adventure',
    installPriceGHS: 60,
    coverImage: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
  },
  {
    id: 'game-mortal-kombat-1',
    title: 'Mortal Kombat 1 (All DLCs)',
    sizeGB: 115,
    platforms: ['PS5', 'Xbox Series', 'PC / Laptop'],
    category: 'Action',
    installPriceGHS: 55,
    coverImage: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
  },
  {
    id: 'game-cyberpunk',
    title: 'Cyberpunk 2077: Phantom Liberty',
    sizeGB: 75,
    platforms: ['PS5', 'Xbox Series', 'PC / Laptop'],
    category: 'RPG / Adventure',
    installPriceGHS: 50,
    coverImage: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
  },
];

export interface RepairServiceItem {
  id: string;
  deviceType: 'Xbox Console' | 'PlayStation Console' | 'Gaming Laptop' | 'Business Laptop';
  issueTitle: string;
  symptoms: string;
  turnaroundTime: string;
  estimatedPriceGHS: number;
  partsUsed: string;
  warrantyPeriod: string;
}

export const REPAIR_SERVICES: RepairServiceItem[] = [
  {
    id: 'rep-xbox-hdmi',
    deviceType: 'Xbox Console',
    issueTitle: 'Xbox Series X / One HDMI Port Replacement',
    symptoms: 'No signal on TV, black screen, wobbly HDMI port, bent internal pins',
    turnaroundTime: '2 - 4 Hours',
    estimatedPriceGHS: 450,
    partsUsed: 'OEM High-Temp Solid Pin HDMI 2.1 Connector',
    warrantyPeriod: '90 Days Shop Warranty',
  },
  {
    id: 'rep-ps5-overheat',
    deviceType: 'PlayStation Console',
    issueTitle: 'PS5 Liquid Metal Clean & Thermal Overhaul',
    symptoms: 'Console shuts off after 15 mins of gaming, loud fan, beep warning',
    turnaroundTime: '3 Hours',
    estimatedPriceGHS: 350,
    partsUsed: 'High-purity Liquid Metal + APU foam dam replacement',
    warrantyPeriod: '60 Days Warranty',
  },
  {
    id: 'rep-laptop-screen',
    deviceType: 'Gaming Laptop',
    issueTitle: '144Hz / 165Hz IPS Laptop Screen Replacement',
    symptoms: 'Cracked LCD, vertical lines, flickering panel, black screen',
    turnaroundTime: 'Same Day (2 - 5 Hours)',
    estimatedPriceGHS: 1250,
    partsUsed: 'Brand New 15.6" / 16" 144Hz IPS OEM Display Panel',
    warrantyPeriod: '90 Days Warranty',
  },
  {
    id: 'rep-laptop-troubleshoot',
    deviceType: 'Business Laptop',
    issueTitle: 'Laptop Troubleshooting, Clean Windows 11 & Thermal Repasting',
    symptoms: 'Extremely slow, BSOD crashes, malware, overheating keyboard',
    turnaroundTime: '2 Hours',
    estimatedPriceGHS: 200,
    partsUsed: 'Arctic MX-4 Thermal Paste + Full OS Diagnostic',
    warrantyPeriod: '30 Days Software Guarantee',
  },
  {
    id: 'rep-controller-drift',
    deviceType: 'PlayStation Console',
    issueTitle: 'DualSense / Xbox Analog Stick Drift Fix (Hall Effect Upgrade)',
    symptoms: 'Character walks on their own, jittery aim, camera spins',
    turnaroundTime: '1 Hour',
    estimatedPriceGHS: 150,
    partsUsed: 'Anti-Drift Magnetic Hall Effect Sensor Analog Module',
    warrantyPeriod: '90 Days Warranty',
  },
];

export interface RepairTicketLookup {
  ticketCode: string;
  customerName: string;
  device: string;
  issue: string;
  currentStage: 'Intake Registered' | 'Diagnostics Complete' | 'Parts Installed & Soldering' | 'Thermal & Benchmarking Test' | 'Ready for Pickup';
  stageIndex: number; // 1 to 5
  estimatedCompletion: string;
  assignedTechnician: string;
  totalCostGHS: number;
  partsConsumed: string[];
}

export const SAMPLE_TICKETS: Record<string, RepairTicketLookup> = {
  'NT-REP-1048': {
    ticketCode: 'NT-REP-1048',
    customerName: 'Kweku A.',
    device: 'Xbox Series X 1TB',
    issue: 'HDMI Port bent (No display output on Samsung TV)',
    currentStage: 'Thermal & Benchmarking Test',
    stageIndex: 4,
    estimatedCompletion: 'Today by 5:30 PM',
    assignedTechnician: 'Master Solder Tech (Nas Tech Lab)',
    totalCostGHS: 450,
    partsConsumed: ['OEM Xbox Series X HDMI 2.1 Gold Connector', 'Lead-Free Solder Alloy'],
  },
  'NT-REP-2091': {
    ticketCode: 'NT-REP-2091',
    customerName: 'Emmanuel O.',
    device: 'ASUS TUF Gaming A15',
    issue: 'Overheating shutoff under Call of Duty + 512GB SSD Upgrade to 1TB',
    currentStage: 'Ready for Pickup',
    stageIndex: 5,
    estimatedCompletion: 'Ready for Pickup Right Now',
    assignedTechnician: 'Hardware & OS Specialist',
    totalCostGHS: 1050,
    partsConsumed: ['Kingston NV2 1TB PCIe 4.0 SSD', 'Noctua NT-H2 Thermal Compound'],
  },
};
