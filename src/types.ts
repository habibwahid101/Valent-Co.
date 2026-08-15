export type ProductCategory = 
  | 'perfumes' 
  | 'watches' 
  | 'sunglasses' 
  | 'wallets' 
  | 'bags' 
  | 'caps' 
  | 'accessories';

export type FragranceFamily = 'Woody' | 'Fresh & Citrus' | 'Amber & Oriental' | 'Floral' | 'Aromatic & Fougere' | 'Leather & Smoky';
export type GenderTarget = 'Unisex' | 'Men' | 'Women';

export interface FragranceAttributes {
  concentration: 'Eau de Parfum (EDP)' | 'Parfum / Extrait' | 'Eau de Toilette (EDT)' | 'Cologne';
  fragranceFamily: FragranceFamily;
  gender: GenderTarget;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  mood: string;
  longevity: string;
  sillage: string;
  season: string;
}

export interface WatchAttributes {
  movement: 'Automatic Self-Winding' | 'Swiss Quartz' | 'Chronograph Automatic' | 'Manual Wind Mechanical';
  caseSize: string; // e.g. "40mm"
  caseMaterial: string; // e.g. "316L Stainless Steel"
  dialColor: string;
  strapMaterial: string; // e.g. "Italian Full-Grain Leather" or "Stainless Steel Jubilee"
  waterResistance: string; // e.g. "50m / 5 ATM" or "200m / 20 ATM"
  glass: string; // e.g. "Domed Sapphire Crystal with AR Coating"
  warranty: string;
}

export interface SunglassesAttributes {
  frameShape: 'Aviator' | 'Square' | 'Wayfarer' | 'Round' | 'Hexagonal';
  frameMaterial: 'Handcrafted Italian Acetate' | 'Japanese Beta-Titanium' | 'Stainless Steel';
  lensType: 'Polarized UV400' | 'Gradient Tint UV400' | 'Mineral Glass';
  lensColor: string;
  gender: GenderTarget;
  fit: 'Standard' | 'Wide' | 'Slim';
}

export interface LeatherAttributes {
  material: 'Full-Grain Italian Calfskin' | 'Nappa Leather' | 'Saffiano Textured Leather' | 'Waxed Canvas & Bridle Leather';
  dimensions: string;
  cardSlots?: number;
  compartments?: string;
  rfidProtected?: boolean;
  hardware?: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "100ml" or "Cognac Leather" or "Midnight Black"
  sku: string;
  price: number;
  oldPrice?: number;
  stock: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  subtitle: string;
  description: string;
  story: string;
  price: number;
  oldPrice?: number;
  images: string[];
  variants: ProductVariant[];
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isLimited?: boolean;
  rating: number;
  reviewCount: number;
  
  // Category specific specs
  fragranceSpecs?: FragranceAttributes;
  watchSpecs?: WatchAttributes;
  sunglassSpecs?: SunglassesAttributes;
  leatherSpecs?: LeatherAttributes;
  
  tags: string[];
  careInstructions?: string;
  origin?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Confirmed' 
  | 'Processing' 
  | 'Shipped' 
  | 'Delivered' 
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  variantName: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CustomerInfo {
  fullName: string;
  mobile: string;
  district: string;
  thanaArea: string;
  fullAddress: string;
  customerNote?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "VAL-84920"
  createdAt: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'Cash on Delivery (COD)';
  status: OrderStatus;
  adminNotes?: string;
}

export interface FilterState {
  category?: ProductCategory | 'all';
  searchQuery: string;
  fragranceFamily?: string;
  gender?: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  brand?: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}
