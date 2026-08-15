import { Product, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // -------------------------------------------------------------
  // PERFUMES
  // -------------------------------------------------------------
  {
    id: 'perf-01',
    sku: 'VA-FRG-001',
    name: 'Maison Aurelle No. 07 Extrait',
    slug: 'maison-aurelle-no-07-extrait',
    brand: 'Maison Aurelle',
    category: 'perfumes',
    subtitle: 'Smoky Cardamom, Smoked Santal & Black Vanilla',
    description: 'An intoxicating evening composition anchored by vintage Mysore sandalwood, roasted cardamom pods, and Madagascan bourbon vanilla.',
    story: 'Conceived in the quiet twilight of Paris and macerated for six months in French oak vats, No. 07 is the hallmark signature of modern nocturnal elegance.',
    price: 8450,
    oldPrice: 9800,
    stock: 24,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-perf-01-50', name: '50ml Extrait de Parfum', sku: 'VA-FRG-001-50', price: 6200, stock: 12, inStock: true },
      { id: 'v-perf-01-100', name: '100ml Extrait de Parfum', sku: 'VA-FRG-001-100', price: 8450, oldPrice: 9800, stock: 12, inStock: true },
    ],
    fragranceSpecs: {
      concentration: 'Parfum / Extrait',
      fragranceFamily: 'Woody',
      gender: 'Unisex',
      topNotes: ['Guatemalan Cardamom', 'Bergamot Zest', 'Pink Peppercorn'],
      heartNotes: ['Smoked Sandalwood', 'Papyrus', 'Iris Concrete'],
      baseNotes: ['Bourbon Vanilla', 'Ambergris', 'White Cedar', 'Leather Accord'],
      mood: 'Sophisticated, Warm, Magnetic',
      longevity: '12-14 Hours on skin',
      sillage: 'Intimate to Moderate aura',
      season: 'Autumn / Winter / Evening Events'
    },
    tags: ['Best Seller', 'Oud & Woods', 'Signature', 'Extrait'],
    careInstructions: 'Store in a cool, dark place away from direct sunlight and humidity to preserve delicate fragrance oils.',
    origin: 'Grasse, France'
  },
  {
    id: 'perf-02',
    sku: 'VA-FRG-002',
    name: 'Oud Royale Intense Eau de Parfum',
    slug: 'oud-royale-intense-edp',
    brand: 'Maison Aurelle',
    category: 'perfumes',
    subtitle: 'Cambodian Oud, Damask Rose & Rare Saffron',
    description: 'A regal oriental harmony balancing the raw earthiness of aged agarwood with velvet Turkish rose petals and golden Iranian saffron.',
    story: 'Inspired by royal heritage and eastern palace courts, blended with modern French refinement to achieve an unforgettable trail.',
    price: 9900,
    oldPrice: 11500,
    stock: 16,
    isBestSeller: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-perf-02-100', name: '100ml Eau de Parfum', sku: 'VA-FRG-002-100', price: 9900, oldPrice: 11500, stock: 16, inStock: true }
    ],
    fragranceSpecs: {
      concentration: 'Eau de Parfum (EDP)',
      fragranceFamily: 'Amber & Oriental',
      gender: 'Unisex',
      topNotes: ['Iranian Saffron', 'Nutmeg', 'Lavender'],
      heartNotes: ['Damask Rose', 'Incense Smoke', 'Guaiacwood'],
      baseNotes: ['Aged Cambodian Oud', 'Benzoin Resin', 'Patchouli', 'Dark Amber'],
      mood: 'Opulent, Commanding, Enduring',
      longevity: '14+ Hours',
      sillage: 'Heavy, Majestic trail',
      season: 'All Year / Formal / Weddings'
    },
    tags: ['Luxury Oud', 'Best Seller', 'Oriental'],
    origin: 'Dubai & Grasse'
  },
  {
    id: 'perf-03',
    sku: 'VA-FRG-003',
    name: 'Riviera Bergamot & Vetiver Cologne',
    slug: 'riviera-bergamot-vetiver-cologne',
    brand: 'Atelier Veld',
    category: 'perfumes',
    subtitle: 'Calabrian Bergamot, Sea Salt & Haitian Vetiver',
    description: 'Crisp Mediterranean citrus laced with invigorating sea breezes and grounded in earthy root vetiver. The ultimate fresh daytime companion for Dhaka summers.',
    story: 'Evoking breezy coastal yacht days along the Amalfi coast, engineered with high-longevity citrus fixatives that withstand humid climates.',
    price: 6850,
    stock: 30,
    isNew: true,
    rating: 4.8,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-perf-03-100', name: '100ml Cologne Absolue', sku: 'VA-FRG-003-100', price: 6850, stock: 30, inStock: true }
    ],
    fragranceSpecs: {
      concentration: 'Eau de Parfum (EDP)',
      fragranceFamily: 'Fresh & Citrus',
      gender: 'Unisex',
      topNotes: ['Calabrian Bergamot', 'Bitter Orange Peel', 'Grapefruit'],
      heartNotes: ['Neroli Flowers', 'Sea Mist Accord', 'Cardamom'],
      baseNotes: ['Haitian Vetiver', 'White Musk', 'Cedarwood'],
      mood: 'Invigorating, Clean, Effortless',
      longevity: '8-10 Hours',
      sillage: 'Moderate, Crisp and clean',
      season: 'Spring / Summer / Office & Everyday'
    },
    tags: ['Fresh', 'Summer Essential', 'Office Wear'],
    origin: 'Florence, Italy'
  },
  {
    id: 'perf-04',
    sku: 'VA-FRG-004',
    name: 'Rose Velours Nocturne',
    slug: 'rose-velours-nocturne',
    brand: 'Maison Aurelle',
    category: 'perfumes',
    subtitle: 'Midnight Rose, Blackcurrant & Praline Amber',
    description: 'Dark, velvety rose layered with tart cassis berries, tonka bean, and warm balsamic undertones. Deeply sensual and captivating.',
    story: 'A tribute to evening opera nights and candlelit encounters, designed for discerning individuals who appreciate enigmatic florals.',
    price: 7950,
    oldPrice: 8900,
    stock: 14,
    isLimited: true,
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-perf-04-100', name: '100ml Eau de Parfum', sku: 'VA-FRG-004-100', price: 7950, oldPrice: 8900, stock: 14, inStock: true }
    ],
    fragranceSpecs: {
      concentration: 'Eau de Parfum (EDP)',
      fragranceFamily: 'Floral',
      gender: 'Unisex',
      topNotes: ['Blackcurrant Bud', 'Pink Pepper', 'Mandarin'],
      heartNotes: ['Centifolia Rose', 'Bulgarian Rose', 'Jasmine Sambac'],
      baseNotes: ['Praline', 'Tonka Bean', 'Indonesian Patchouli', 'Ambergris'],
      mood: 'Enigmatic, Sensual, Romantic',
      longevity: '10-12 Hours',
      sillage: 'Moderate to Strong',
      season: 'Evenings / Date Nights'
    },
    tags: ['Floral', 'Velvet Rose', 'Evening'],
    origin: 'Grasse, France'
  },

  // -------------------------------------------------------------
  // WATCHES
  // -------------------------------------------------------------
  {
    id: 'wat-01',
    sku: 'VA-WAT-001',
    name: 'Vandenberg Heritage Automatic 40mm',
    slug: 'vandenberg-heritage-automatic-40mm',
    brand: 'Vandenberg Horology',
    category: 'watches',
    subtitle: 'Calibre 8215 Automatic Movement | Domed Sapphire Crystal',
    description: 'An understated dress timepiece featuring an enamel sunburst dial, hand-applied faceted markers, and an exhibition caseback displaying the automatic rotor.',
    story: 'Crafted with surgical-grade 316L stainless steel and finished with hand-brushed chamfers, the Heritage 40mm transitions seamlessly from executive boardrooms to black-tie galas.',
    price: 18500,
    oldPrice: 22000,
    stock: 8,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 41,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-wat-01-cognac', name: 'Sunburst Silver / Cognac Leather Strap', sku: 'VA-WAT-001-COG', price: 18500, oldPrice: 22000, stock: 4, inStock: true },
      { id: 'v-wat-01-black', name: 'Midnight Onyx / Black Croc-Embossed Leather', sku: 'VA-WAT-001-BLK', price: 18500, oldPrice: 22000, stock: 4, inStock: true }
    ],
    watchSpecs: {
      movement: 'Automatic Self-Winding',
      caseSize: '40mm Diameter | 11.2mm Thickness',
      caseMaterial: '316L Surgical Grade Stainless Steel',
      dialColor: 'Sunburst Silver / Midnight Onyx with Diamond-cut hands',
      strapMaterial: 'Italian Vegetable-Tanned Full-Grain Leather with quick-release spring bars',
      waterResistance: '50m / 5 ATM (Splash & Rain Resistant)',
      glass: 'Double-Domed Sapphire Crystal with Triple Anti-Reflective Coating',
      warranty: '2-Year International Mechanical Warranty'
    },
    tags: ['Automatic', 'Executive', 'Sapphire Crystal', 'Heritage'],
    careInstructions: 'Clean with a soft microfiber cloth. Avoid exposure to strong magnetic fields and saunas.',
    origin: 'Geneva / Hand-assembled'
  },
  {
    id: 'wat-02',
    sku: 'VA-WAT-002',
    name: 'Aurelle Monaco Diver 200M Automatic',
    slug: 'aurelle-monaco-diver-200m',
    brand: 'Vandenberg Horology',
    category: 'watches',
    subtitle: 'Ceramic Bezel, Swiss Super-LumiNova & 316L Steel Bracelet',
    description: 'Engineered for resilience and precision, featuring a 120-click unidirectional ceramic bezel, screw-down crown, and ultra-bright Super-LumiNova indices.',
    story: 'Built to withstand deep oceanic pressure while remaining slim enough to slide under a tailored shirt cuff.',
    price: 24500,
    oldPrice: 27500,
    stock: 5,
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-wat-02-steel', name: 'Deep Navy Ceramic / Steel Jubilee Bracelet', sku: 'VA-WAT-002-NVY', price: 24500, oldPrice: 27500, stock: 3, inStock: true },
      { id: 'v-wat-02-black', name: 'Stealth Matte Black / Brushed Steel Oyster', sku: 'VA-WAT-002-BLK', price: 24500, oldPrice: 27500, stock: 2, inStock: true }
    ],
    watchSpecs: {
      movement: 'Automatic Self-Winding',
      caseSize: '41mm Diameter | 12.8mm Thickness',
      caseMaterial: 'Solid 316L Marine-grade Stainless Steel',
      dialColor: 'Deep Navy Blue with Sunray finish',
      strapMaterial: 'Solid Link 316L Stainless Steel with diver extension clasp',
      waterResistance: '200m / 20 ATM (Swimming & Scuba Certified)',
      glass: 'Scratch-resistant Flat Sapphire Crystal with Date Magnifier (Cyclops)',
      warranty: '3-Year Comprehensive Warranty'
    },
    tags: ['Diver', 'Ceramic Bezel', '200M', 'Automatic'],
    origin: 'Swiss Precision Components'
  },
  {
    id: 'wat-03',
    sku: 'VA-WAT-003',
    name: 'Obsidian Minimalist Quartz Watch',
    slug: 'obsidian-minimalist-quartz-watch',
    brand: 'Atelier Veld',
    category: 'watches',
    subtitle: 'Ultra-Slim 6.8mm Profile | Matte Black Dial & Mesh Band',
    description: 'Pure architectural minimalism. An ultra-thin 6.8mm case profile powered by a high-precision Japanese quartz movement with brushed indices.',
    story: 'Stripped of every superfluous detail, delivering pure Nordic geometry and featherweight comfort on the wrist.',
    price: 9200,
    oldPrice: 10500,
    stock: 15,
    rating: 4.7,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-wat-03-mesh', name: 'All-Black Matte / Milanese Mesh Bracelet', sku: 'VA-WAT-003-MSH', price: 9200, oldPrice: 10500, stock: 10, inStock: true },
      { id: 'v-wat-03-leather', name: 'All-Black Matte / Smooth Nappa Black Leather', sku: 'VA-WAT-003-LTH', price: 8800, stock: 5, inStock: true }
    ],
    watchSpecs: {
      movement: 'Swiss Quartz',
      caseSize: '39mm Diameter | 6.8mm Ultra-Slim',
      caseMaterial: 'PVD Coated Matte Black Stainless Steel',
      dialColor: 'Minimalist Matte Obsidian Black',
      strapMaterial: 'Interchangeable Milanese Mesh / Italian Nappa Leather',
      waterResistance: '30m / 3 ATM',
      glass: 'Hardened Mineral Crystal with Anti-Glare',
      warranty: '2-Year Warranty'
    },
    tags: ['Minimalist', 'Ultra-Slim', 'Everyday'],
    origin: 'Scandinavia'
  },

  // -------------------------------------------------------------
  // SUNGLASSES
  // -------------------------------------------------------------
  {
    id: 'sun-01',
    sku: 'VA-SUN-001',
    name: 'Monaco Polarized Acetate Sunglasses',
    slug: 'monaco-polarized-acetate-sunglasses',
    brand: 'Optique Riviera',
    category: 'sunglasses',
    subtitle: 'Hand-Polished Mazzucchelli Acetate | Cat-3 Polarized Lenses',
    description: 'Timeless square silhouette sculpted from premium Italian bio-acetate with custom custom 5-barrel hinges and crystal-clear polarized optics.',
    story: 'Inspired by the French Riviera coastline, engineered to eliminate harsh glare on Dhaka sunny afternoons while preserving color clarity.',
    price: 7900,
    oldPrice: 9200,
    stock: 18,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 34,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-sun-01-tort', name: 'Vintage Havana Tortoise / G-15 Bottle Green Lenses', sku: 'VA-SUN-001-TOR', price: 7900, oldPrice: 9200, stock: 10, inStock: true },
      { id: 'v-sun-01-blk', name: 'Polished Piano Black / Midnight Grey Polarized Lenses', sku: 'VA-SUN-001-BLK', price: 7900, oldPrice: 9200, stock: 8, inStock: true }
    ],
    sunglassSpecs: {
      frameShape: 'Square',
      frameMaterial: 'Handcrafted Italian Acetate',
      lensType: 'Polarized UV400',
      lensColor: 'G-15 Green / Smoke Grey',
      gender: 'Unisex',
      fit: 'Standard'
    },
    tags: ['Polarized', 'Handcrafted', 'Italian Acetate', 'Best Seller'],
    origin: 'Belluno, Italy'
  },
  {
    id: 'sun-02',
    sku: 'VA-SUN-002',
    name: 'Riviera Beta-Titanium Aviators',
    slug: 'riviera-beta-titanium-aviators',
    brand: 'Optique Riviera',
    category: 'sunglasses',
    subtitle: 'Ultralight 14g Japanese Titanium | Gradient Amber Lenses',
    description: 'An architectural reinterpretation of the iconic aviator frame, forged from ultralight flexible beta-titanium with hand-finished silicone nose pads.',
    story: 'Featherlight at just 14 grams, offering pressure-free all-day wear with 100% UVA/UVB barrier defense.',
    price: 8800,
    oldPrice: 10200,
    stock: 11,
    isNew: true,
    rating: 4.8,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-sun-02-gold', name: 'Brushed Champagne Gold / Warm Bronze Gradient Lenses', sku: 'VA-SUN-002-GLD', price: 8800, oldPrice: 10200, stock: 6, inStock: true },
      { id: 'v-sun-02-silv', name: 'Gunmetal Titanium / Cool Silver Mirror Lenses', sku: 'VA-SUN-002-SLV', price: 8800, oldPrice: 10200, stock: 5, inStock: true }
    ],
    sunglassSpecs: {
      frameShape: 'Aviator',
      frameMaterial: 'Japanese Beta-Titanium',
      lensType: 'Gradient Tint UV400',
      lensColor: 'Bronze Gradient / Silver Mirror',
      gender: 'Unisex',
      fit: 'Standard'
    },
    tags: ['Titanium', 'Ultralight', 'Aviator'],
    origin: 'Fukui, Japan'
  },

  // -------------------------------------------------------------
  // WALLETS & SMALL LEATHER GOODS
  // -------------------------------------------------------------
  {
    id: 'wal-01',
    sku: 'VA-WAL-001',
    name: 'Atelier Slim Bifold Nappa Wallet',
    slug: 'atelier-slim-bifold-nappa-wallet',
    brand: 'L Atelier Cuir',
    category: 'wallets',
    subtitle: 'Full-Grain Italian Calfskin | RFID Blocking Shield',
    description: 'Engineered for sleek pocket carry without bulk. Holds 8-12 cards, unfolded cash notes (fits Bangladeshi Taka notes perfectly), with hidden micro-slots for SIM / ejector pins.',
    story: 'Handcrafted in Tuscany from full-grain vegetable-tanned calfskin that patinas richly with each year of carry.',
    price: 3650,
    oldPrice: 4200,
    stock: 28,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606503829068-189f78317769?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-wal-01-cognac', name: 'Tuscan Cognac Brown', sku: 'VA-WAL-001-COG', price: 3650, oldPrice: 4200, stock: 14, inStock: true },
      { id: 'v-wal-01-black', name: 'Midnight Charcoal Black', sku: 'VA-WAL-001-BLK', price: 3650, oldPrice: 4200, stock: 14, inStock: true }
    ],
    leatherSpecs: {
      material: 'Full-Grain Italian Calfskin',
      dimensions: '10.8 cm x 8.5 cm x 0.9 cm (Slim Profile)',
      cardSlots: 8,
      compartments: 'Full-width bill sleeve (fits BDT 1000 notes) + 2 concealed quick-draw pockets',
      rfidProtected: true,
      hardware: 'Hand-burnished wax-sealed edges'
    },
    tags: ['Full Grain', 'RFID Shield', 'Slim Wallet', 'Best Seller'],
    origin: 'Florence, Italy'
  },
  {
    id: 'wal-02',
    sku: 'VA-WAL-002',
    name: 'Magnetic Ejector Cardholder Case',
    slug: 'magnetic-ejector-cardholder-case',
    brand: 'Atelier Veld',
    category: 'wallets',
    subtitle: 'Aerospace Aluminium Core + Saffiano Leather Shell',
    description: 'Instant card access with a single mechanical flick. Holds 6 embossed bank cards inside the RFID-shielded chamber plus cash and ID cards on the exterior sleeve.',
    story: 'Modern tactical minimalism meets luxury leather tactility for the fast-paced urban professional.',
    price: 2850,
    oldPrice: 3400,
    stock: 22,
    isNew: true,
    rating: 4.8,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1606503829068-189f78317769?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-wal-02-gunmetal', name: 'Gunmetal Aluminium / Black Saffiano Leather', sku: 'VA-WAL-002-GUN', price: 2850, oldPrice: 3400, stock: 12, inStock: true },
      { id: 'v-wal-02-navy', name: 'Deep Navy Aluminium / Navy Saffiano', sku: 'VA-WAL-002-NVY', price: 2850, oldPrice: 3400, stock: 10, inStock: true }
    ],
    leatherSpecs: {
      material: 'Saffiano Textured Leather',
      dimensions: '9.8 cm x 6.5 cm x 1.2 cm',
      cardSlots: 6,
      compartments: 'Rapid ejector mechanism + back money band',
      rfidProtected: true
    },
    tags: ['Cardholder', 'Quick Eject', 'Modern'],
    origin: 'Handcrafted'
  },

  // -------------------------------------------------------------
  // BAGS & LUGGAGE
  // -------------------------------------------------------------
  {
    id: 'bag-01',
    sku: 'VA-BAG-001',
    name: 'Grand Tourer Waxed Canvas Weekender Duffle',
    slug: 'grand-tourer-waxed-canvas-weekender',
    brand: 'L Atelier Cuir',
    category: 'bags',
    subtitle: 'Water-Resistant 18oz Duck Canvas & Bridle Leather',
    description: 'The definitive 45L travel companion built for short getaways, business trips to Sylhet or Chittagong, and flight cabin carry-on.',
    story: 'Reinforced with solid antiqued brass rivets, heavy-duty Japanese YKK Excella zippers, and a dedicated ventilated footwear compartment.',
    price: 12800,
    oldPrice: 14500,
    stock: 9,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 27,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-bag-01-olive', name: 'Heritage Olive Canvas / Cognac Leather Trim', sku: 'VA-BAG-001-OLV', price: 12800, oldPrice: 14500, stock: 5, inStock: true },
      { id: 'v-bag-01-charcoal', name: 'Charcoal Black Canvas / Black Leather Trim', sku: 'VA-BAG-001-CHR', price: 12800, oldPrice: 14500, stock: 4, inStock: true }
    ],
    leatherSpecs: {
      material: 'Waxed Canvas & Bridle Leather',
      dimensions: '52 cm (L) x 28 cm (W) x 30 cm (H) | 42L Capacity',
      compartments: 'Spacious main bay + separate zippered shoe tunnel + padded 16" laptop sleeve',
      hardware: 'Solid Antiqued Brass & Heavy YKK Excella Zippers'
    },
    tags: ['Weekender', 'Carry-On', 'Waxed Canvas', 'Travel'],
    origin: 'Craft Studio'
  },
  {
    id: 'bag-02',
    sku: 'VA-BAG-002',
    name: 'Executive Slim Laptop Briefcase 15"',
    slug: 'executive-slim-laptop-briefcase',
    brand: 'L Atelier Cuir',
    category: 'bags',
    subtitle: 'Full-Grain Pebble Leather | Padded 15.6" Laptop Compartment',
    description: 'A disciplined, razor-sharp silhouette designed for modern corporate executives. Features dedicated pen sleeves, passport pocket, and a rear trolley luggage pass-through.',
    story: 'Supple full-grain calfskin with water-resistant micro-suede lining ensures documents and tech stay pristine in all conditions.',
    price: 14200,
    oldPrice: 16800,
    stock: 7,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-bag-02-black', name: 'Obsidian Pebble Leather', sku: 'VA-BAG-002-BLK', price: 14200, oldPrice: 16800, stock: 4, inStock: true },
      { id: 'v-bag-02-brown', name: 'Espresso Brown Leather', sku: 'VA-BAG-002-BRN', price: 14200, oldPrice: 16800, stock: 3, inStock: true }
    ],
    leatherSpecs: {
      material: 'Full-Grain Italian Calfskin',
      dimensions: '39 cm (L) x 29 cm (H) x 7 cm (D)',
      compartments: 'Dual zip section, 15.6" shock-absorbing sleeve, organizer panel',
      hardware: 'Brushed Nickel Custom Pulls'
    },
    tags: ['Briefcase', 'Executive', 'Laptop Bag', 'Pebble Leather'],
    origin: 'Florence, Italy'
  },

  // -------------------------------------------------------------
  // CAPS & ACCESSORIES
  // -------------------------------------------------------------
  {
    id: 'cap-01',
    sku: 'VA-CAP-001',
    name: 'Kuro Heavyweight Washed Twill Cap',
    slug: 'kuro-heavyweight-washed-twill-cap',
    brand: 'Kuro Studio',
    category: 'caps',
    subtitle: '380 GSM Japanese Cotton Twill | Antiqued Brass Buckle',
    description: 'An unconstructed 6-panel silhouette featuring low-crown contouring, vintage garment wash, and an adjustable brass buckle leather strap.',
    story: 'No loud graphics or logos—just superior fabric weight, meticulous stitching, and an enduring structured fit.',
    price: 2450,
    oldPrice: 2900,
    stock: 35,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-cap-01-sand', name: 'Dune Sand / Cognac Leather Strap', sku: 'VA-CAP-001-SND', price: 2450, oldPrice: 2900, stock: 18, inStock: true },
      { id: 'v-cap-01-charcoal', name: 'Washed Charcoal Black', sku: 'VA-CAP-001-CHR', price: 2450, oldPrice: 2900, stock: 17, inStock: true }
    ],
    tags: ['Minimalist Cap', 'Washed Twill', 'Streetwear Luxury'],
    origin: 'Okayama, Japan'
  },
  {
    id: 'acc-01',
    sku: 'VA-ACC-001',
    name: 'Braided Nappa Leather Key Lanyard & Carabiner',
    slug: 'braided-nappa-leather-key-lanyard',
    brand: 'L Atelier Cuir',
    category: 'accessories',
    subtitle: 'Hand-Braided Calfskin | Matte Titanium Alloy Clip',
    description: 'A tactile everyday companion crafted from supple hand-braided Italian calfskin paired with an aerospace-grade quick-snap carabiner.',
    story: 'Elevates everyday key carry into an understated luxury statement.',
    price: 1750,
    oldPrice: 2100,
    stock: 40,
    isNew: true,
    rating: 4.9,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'
    ],
    variants: [
      { id: 'v-acc-01-black', name: 'Matte Black / Gunmetal Clip', sku: 'VA-ACC-001-BLK', price: 1750, stock: 20, inStock: true },
      { id: 'v-acc-01-tan', name: 'Tuscan Tan / Brushed Brass Clip', sku: 'VA-ACC-001-TAN', price: 1750, stock: 20, inStock: true }
    ],
    tags: ['Keyring', 'Accessory', 'Leather'],
    origin: 'Florence'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'VAL-84920',
    createdAt: '2026-08-15T09:30:00Z',
    customer: {
      fullName: 'Tahmidur Rahman',
      mobile: '01711293847',
      district: 'Dhaka',
      thanaArea: 'Gulshan 2',
      fullAddress: 'House 14, Road 53, Apt 4B, Gulshan-2, Dhaka 1212',
      customerNote: 'Please deliver after 2 PM if possible.'
    },
    items: [
      {
        productId: 'perf-01',
        productName: 'Maison Aurelle No. 07 Extrait',
        brand: 'Maison Aurelle',
        variantName: '100ml Extrait de Parfum',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 8450,
        totalPrice: 8450
      },
      {
        productId: 'wal-01',
        productName: 'Atelier Slim Bifold Nappa Wallet',
        brand: 'L Atelier Cuir',
        variantName: 'Tuscan Cognac Brown',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 3650,
        totalPrice: 3650
      }
    ],
    subtotal: 12100,
    deliveryFee: 0,
    discount: 500,
    couponCode: 'WELCOME10',
    total: 11600,
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'Confirmed',
    adminNotes: 'Customer verified via phone call. Express dispatch arranged.'
  },
  {
    id: 'ord-102',
    orderNumber: 'VAL-84921',
    createdAt: '2026-08-15T11:15:00Z',
    customer: {
      fullName: 'Nafisa Chowdhury',
      mobile: '01819384756',
      district: 'Chittagong',
      thanaArea: 'Khulshi R/A',
      fullAddress: 'Road 3, House 22, South Khulshi, Chattogram',
      customerNote: 'Call before arriving.'
    },
    items: [
      {
        productId: 'sun-01',
        productName: 'Monaco Polarized Acetate Sunglasses',
        brand: 'Optique Riviera',
        variantName: 'Vintage Havana Tortoise / G-15 Bottle Green Lenses',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 7900,
        totalPrice: 7900
      }
    ],
    subtotal: 7900,
    deliveryFee: 130,
    discount: 0,
    total: 8030,
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'Processing',
    adminNotes: 'Packed in wooden collector gift box.'
  },
  {
    id: 'ord-103',
    orderNumber: 'VAL-84922',
    createdAt: '2026-08-15T12:00:00Z',
    customer: {
      fullName: 'Arman Hossain',
      mobile: '01977654321',
      district: 'Sylhet',
      thanaArea: 'Shahjalal Upashahar',
      fullAddress: 'Block D, Road 4, House 18, Upashahar, Sylhet',
      customerNote: 'Fragile handling please.'
    },
    items: [
      {
        productId: 'wat-01',
        productName: 'Vandenberg Heritage Automatic 40mm',
        brand: 'Vandenberg Horology',
        variantName: 'Sunburst Silver / Cognac Leather Strap',
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=400&auto=format&fit=crop',
        quantity: 1,
        unitPrice: 18500,
        totalPrice: 18500
      }
    ],
    subtotal: 18500,
    deliveryFee: 0,
    discount: 0,
    total: 18500,
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'New',
    adminNotes: 'Awaiting phone confirmation from customer.'
  }
];

export const BANGLADESH_DISTRICTS = [
  'Dhaka',
  'Chittagong (Chattogram)',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Cumilla',
  'Gazipur',
  'Narayanganj',
  'Cox\'s Bazar',
  'Bogura',
  'Jashore',
  'Tangail',
  'Dinajpur',
  'Faridpur',
  'Kushtia',
  'Pabna',
  'Noakhali',
  'Brahmanbaria',
  'Feni',
  'Jamalpur',
  'Netrokona',
  'Sunamganj',
  'Habiganj',
  'Moulvibazar'
];

export const CATEGORIES_LIST = [
  { id: 'all', name: 'All Products', count: 11, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop' },
  { id: 'perfumes', name: 'Perfumes & Scents', count: 4, tag: 'Extrait & EDP', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop' },
  { id: 'watches', name: 'Horology & Watches', count: 3, tag: 'Automatic & Swiss', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop' },
  { id: 'sunglasses', name: 'Polarized Eyewear', count: 2, tag: 'Italian Acetate', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop' },
  { id: 'wallets', name: 'Wallets & Cardholders', count: 2, tag: 'Full-Grain Leather', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop' },
  { id: 'bags', name: 'Bags & Luggage', count: 2, tag: 'Weekenders & Briefs', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop' },
  { id: 'caps', name: 'Caps & Headwear', count: 1, tag: 'Washed Twill', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop' }
];

export const BRANDS_LIST = [
  { name: 'Maison Aurelle', origin: 'Paris / Grasse', focus: 'High Perfumery & Scents' },
  { name: 'Vandenberg Horology', origin: 'Geneva', focus: 'Precision Automatic Timepieces' },
  { name: 'Optique Riviera', origin: 'Belluno, Italy', focus: 'Handcrafted Polarized Eyewear' },
  { name: 'L Atelier Cuir', origin: 'Florence, Italy', focus: 'Full-Grain Vegetable Tanned Leather' },
  { name: 'Atelier Veld', origin: 'Stockholm', focus: 'Minimalist Accessories & Tech Carry' },
  { name: 'Kuro Studio', origin: 'Okayama, Japan', focus: 'Heavyweight Headwear' }
];
