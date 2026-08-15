import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  OrderStatus, 
  ProductCategory, 
  ProductVariant, 
  CustomerInfo, 
  FilterState 
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/mockData';

export type AppView = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-success' 
  | 'order-lookup' 
  | 'wishlist' 
  | 'admin';

interface ShopContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  activeView: AppView;
  selectedProduct: Product | null;
  selectedCategory: ProductCategory | 'all';
  searchQuery: string;
  filters: FilterState;
  currentOrder: Order | null;
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isFragranceQuizOpen: boolean;
  couponCode: string;
  couponDiscount: number;
  
  // Navigation & UI controls
  navigateTo: (view: AppView, payload?: { product?: Product; category?: ProductCategory | 'all'; search?: string }) => void;
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  setQuickViewProduct: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  setIsFragranceQuizOpen: (open: boolean) => void;

  // Cart operations
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Checkout & Order
  createOrder: (customerInfo: CustomerInfo, deliveryFee: number) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, adminNotes?: string) => void;
  findOrder: (query: string) => Order | undefined;

  // Admin inventory
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, stock: number) => void;
  resetToDemoData: () => void;

  // Helpers
  formatBDT: (amount: number) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'valent_products_v1',
  ORDERS: 'valent_orders_v1',
  CART: 'valent_cart_v1',
  WISHLIST: 'valent_wishlist_v1',
};

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  searchQuery: '',
  fragranceFamily: undefined,
  gender: undefined,
  minPrice: 0,
  maxPrice: 35000,
  inStockOnly: false,
  brand: undefined,
  sortBy: 'featured'
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  // Load cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Load wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // App UI State
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isFragranceQuizOpen, setIsFragranceQuizOpen] = useState<boolean>(false);
  
  // Coupon
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // Currency helper
  const formatBDT = (amount: number): string => {
    return `৳${Math.round(amount).toLocaleString('en-US')}`;
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation
  const navigateTo = (view: AppView, payload?: { product?: Product; category?: ProductCategory | 'all'; search?: string }) => {
    if (payload?.product) {
      setSelectedProduct(payload.product);
    }
    if (payload?.category !== undefined) {
      setSelectedCategory(payload.category);
      setFilters(prev => ({ ...prev, category: payload.category }));
    }
    if (payload?.search !== undefined) {
      setSearchQuery(payload.search);
      setFilters(prev => ({ ...prev, searchQuery: payload.search || '' }));
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Add to cart
  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const selectedVar = variant || product.variants[0] || {
      id: `def-${product.id}`,
      name: 'Standard',
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      inStock: product.stock > 0
    };

    const cartItemId = `${product.id}-${selectedVar.id}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          id: cartItemId,
          productId: product.id,
          product,
          selectedVariant: selectedVar,
          quantity,
          unitPrice: selectedVar.price || product.price
        }];
      }
    });

    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  // Coupons
  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'WELCOME10' || cleanCode === 'DHAKAFIRST') {
      const discount = Math.round(cartSubtotal * 0.10);
      setCouponCode(cleanCode);
      setCouponDiscount(discount);
      return { success: true, message: '10% privilege discount applied!' };
    }
    if (cleanCode === 'VIP15') {
      const discount = Math.round(cartSubtotal * 0.15);
      setCouponCode(cleanCode);
      setCouponDiscount(discount);
      return { success: true, message: '15% VIP discount applied!' };
    }
    if (cleanCode === 'EID500') {
      setCouponCode(cleanCode);
      setCouponDiscount(500);
      return { success: true, message: '৳500 celebration voucher applied!' };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (customerInfo: CustomerInfo, deliveryFee: number): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `VAL-${randomSuffix}`;

    const orderItems = cart.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      brand: item.product.brand,
      variantName: item.selectedVariant.name,
      image: item.product.images[0],
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity
    }));

    const finalSubtotal = cartSubtotal;
    const finalTotal = Math.max(0, finalSubtotal + deliveryFee - couponDiscount);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: customerInfo,
      items: orderItems,
      subtotal: finalSubtotal,
      deliveryFee,
      discount: couponDiscount,
      couponCode: couponCode || undefined,
      total: finalTotal,
      paymentMethod: 'Cash on Delivery (COD)',
      status: 'New',
      adminNotes: 'Order placed via online storefront. Cash on delivery verification pending.'
    };

    // Deduct stock
    setProducts(prevProducts => 
      prevProducts.map(p => {
        const matchingCartItems = cart.filter(ci => ci.productId === p.id);
        if (matchingCartItems.length > 0) {
          const totalQty = matchingCartItems.reduce((s, ci) => s + ci.quantity, 0);
          const newStock = Math.max(0, p.stock - totalQty);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setActiveView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, adminNotes?: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : ord.adminNotes
        };
      }
      return ord;
    }));
  };

  const findOrder = (query: string): Order | undefined => {
    const clean = query.trim().toLowerCase();
    if (!clean) return undefined;
    return orders.find(ord => 
      ord.orderNumber.toLowerCase() === clean ||
      ord.customer.mobile.replace(/\D/g, '').includes(clean.replace(/\D/g, ''))
    );
  };

  // Admin Product Actions
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(prev => prev ? { ...prev, ...updatedFields } : null);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      setActiveView('shop');
    }
  };

  const updateStock = (id: string, stock: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock } : p));
  };

  const resetToDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        orders,
        cart,
        wishlist,
        activeView,
        selectedProduct,
        selectedCategory,
        searchQuery,
        filters,
        currentOrder,
        quickViewProduct,
        isCartOpen,
        isMobileMenuOpen,
        isFragranceQuizOpen,
        couponCode,
        couponDiscount,
        navigateTo,
        setSelectedCategory,
        setSearchQuery,
        setFilters,
        setQuickViewProduct,
        setIsCartOpen,
        setIsMobileMenuOpen,
        setIsFragranceQuizOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemCount,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        createOrder,
        updateOrderStatus,
        findOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetToDemoData,
        formatBDT
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
