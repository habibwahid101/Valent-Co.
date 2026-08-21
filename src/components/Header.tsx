import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Phone,
  LayoutDashboard,
  ArrowRight,
  Clock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const Header: React.FC = () => {
  const { 
    activeView, 
    navigateTo, 
    cartItemCount, 
    wishlist, 
    setIsCartOpen, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen,
    setIsFragranceQuizOpen,
    searchQuery,
    setSearchQuery,
    products,
    formatBDT
  } = useShop();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navCategories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Catalog' },
    { id: 'perfumes', label: 'Perfumes' },
    { id: 'watches', label: 'Watches' },
    { id: 'sunglasses', label: 'Sunglasses' },
    { id: 'wallets', label: 'Wallets' },
    { id: 'bags', label: 'Bags' },
    { id: 'caps', label: 'Caps' },
  ];

  const searchResults = localSearch.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(localSearch.toLowerCase()))
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigateTo('shop', { search: localSearch.trim(), category: 'all' });
      setIsSearchOpen(false);
      setLocalSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E5DE] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#1C1B19] text-[#FAF9F6] text-[11px] sm:text-xs tracking-wider uppercase py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9A6A3A] animate-pulse"></span>
            <span className="font-medium text-[#D9D5CC]">
              Complimentary Express Delivery in Dhaka over ৳5,000 | Cash on Delivery Nationwide
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[#A8A49C] text-[11px]">
            <button 
              onClick={() => navigateTo('order-lookup')}
              className="hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <Clock className="w-3 h-3" />
              Track Order
            </button>
            <button 
              onClick={() => navigateTo('admin')} 
              className="hover:text-white transition flex items-center gap-1 font-semibold text-[#9A6A3A] cursor-pointer"
            >
              <LayoutDashboard className="w-3 h-3" />
              Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Left: Mobile Menu Trigger & Fragrance Quiz CTA */}
          <div className="flex items-center gap-3 shrink-0 lg:w-1/4">
            <button 
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-[#1C1B19] hover:text-[#9A6A3A] transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => setIsFragranceQuizOpen(true)}
              className="hidden lg:inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase px-3 py-1.5 rounded-full border border-[#D9D5CC] hover:border-[#1C1B19] text-[#1C1B19] hover:bg-[#1C1B19] hover:text-[#FAF9F6] transition duration-200 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9A6A3A]" />
              <span>Scent Finder</span>
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-1 min-w-0 text-center lg:flex-none lg:w-2/4">
            <button
              onClick={() => navigateTo('home')}
              className="inline-block max-w-full text-left cursor-pointer group text-center"
            >
              <span className="block font-serif text-lg sm:text-2xl lg:text-3xl tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] font-semibold uppercase text-[#1C1B19] group-hover:text-[#9A6A3A] transition duration-300 whitespace-nowrap truncate">
                VALENT & CO.
              </span>
              <span className="block text-[9px] tracking-[0.2em] sm:tracking-[0.35em] text-[#6B6864] uppercase -mt-0.5 whitespace-nowrap truncate">
                Boutique & Horology
              </span>
            </button>
          </div>

          {/* Right: Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 shrink-0 lg:w-1/4">
            {/* Search Trigger */}
            <button
              id="search-open-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#1C1B19] hover:text-[#9A6A3A] transition cursor-pointer"
              aria-label="Open search bar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              id="wishlist-btn"
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-[#1C1B19] hover:text-[#9A6A3A] transition relative cursor-pointer"
              aria-label="View saved wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#9A6A3A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="cart-drawer-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 py-2 px-3 bg-[#1C1B19] text-[#FAF9F6] hover:bg-[#2A2927] transition rounded-full text-xs font-medium cursor-pointer shadow-sm"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline tracking-wider uppercase text-[11px]">Cart</span>
              <span className="w-5 h-5 bg-[#9A6A3A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-[#E8E5DE]/80 text-xs uppercase tracking-[0.15em] font-medium text-[#4A4744]">
          {navCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigateTo('shop', { category: cat.id, search: '' })}
              className={`py-1 hover:text-[#1C1B19] transition relative cursor-pointer ${
                activeView === 'shop' && (cat.id === 'all' ? false : true) // dynamic active indicator handled inside shop
                  ? 'hover:text-[#1C1B19]'
                  : ''
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => navigateTo('shop', { category: 'all', search: 'limited' })}
            className="text-[#9A6A3A] font-semibold hover:text-[#7A5128] transition cursor-pointer"
          >
            Editorial Picks
          </button>
        </nav>
      </div>

      {/* Global Search Overlay Modal */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-[#FAF9F6] z-50 px-4 sm:px-8 border-b border-[#E8E5DE] shadow-xl animate-in fade-in duration-200">
          <div className="max-w-4xl mx-auto py-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-6 h-6 text-[#9A6A3A] mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search perfumes, watches, sunglasses, leather goods, brands..."
                className="w-full bg-transparent text-lg sm:text-xl font-serif text-[#1C1B19] placeholder:text-[#9A9790] focus:outline-none border-b border-[#1C1B19] pb-2"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setLocalSearch('');
                }}
                className="p-2 text-[#6B6864] hover:text-[#1C1B19] ml-2 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </form>

            {/* Instant Suggestions Dropdown */}
            {localSearch.trim() && (
              <div className="mt-4 pb-4">
                <div className="text-[11px] uppercase tracking-wider text-[#6B6864] mb-3">
                  Matching Products ({searchResults.length})
                </div>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          navigateTo('product-detail', { product: p });
                          setIsSearchOpen(false);
                          setLocalSearch('');
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg bg-white border border-[#E8E5DE] hover:border-[#1C1B19] transition cursor-pointer"
                      >
                        <img 
                          src={p.images[0]} 
                          alt={p.name} 
                          className="w-12 h-12 object-cover rounded bg-[#F4F2EB]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="overflow-hidden">
                          <span className="text-[10px] uppercase tracking-wider text-[#9A6A3A] font-semibold block truncate">
                            {p.brand}
                          </span>
                          <span className="text-xs font-medium text-[#1C1B19] block truncate">
                            {p.name}
                          </span>
                          <span className="text-xs font-semibold text-[#1C1B19]">
                            {formatBDT(p.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-[#6B6864] py-2">
                    No exact match found for "{localSearch}". Press Enter to browse all results.
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E8E5DE]">
                  <span className="text-xs text-[#6B6864]">Quick suggestions:</span>
                  <div className="flex gap-2">
                    {['Extrait', 'Oud', 'Automatic', 'Polarized', 'Wallet'].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setLocalSearch(tag)}
                        className="text-xs px-2.5 py-1 bg-[#F4F2EB] hover:bg-[#E8E5DE] rounded text-[#1C1B19] cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-18 bg-[#FAF9F6] z-30 overflow-y-auto px-6 py-6 border-t border-[#E8E5DE] shadow-2xl flex flex-col justify-between">
          <div className="space-y-6">
            {/* Quick Scent Finder banner */}
            <div 
              onClick={() => {
                setIsFragranceQuizOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="p-4 rounded-xl bg-[#1C1B19] text-[#FAF9F6] flex items-center justify-between cursor-pointer shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#9A6A3A]/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#9A6A3A]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide">Signature Scent Finder</h4>
                  <p className="text-xs text-[#D9D5CC]">Find your personalized fragrance in 30s</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9A6A3A]" />
            </div>

            {/* Categories */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A6A3A] block mb-3">
                Categories
              </span>
              <ul className="space-y-2">
                {navCategories.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => navigateTo('shop', { category: cat.id, search: '' })}
                      className="w-full text-left py-2 text-base font-serif font-medium text-[#1C1B19] hover:text-[#9A6A3A] border-b border-[#E8E5DE]/60 flex items-center justify-between cursor-pointer"
                    >
                      <span>{cat.label}</span>
                      <ArrowRight className="w-4 h-4 text-[#6B6864]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A6A3A] block mb-3">
                Client Services
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button 
                  onClick={() => navigateTo('order-lookup')}
                  className="p-3 bg-white border border-[#E8E5DE] rounded-lg text-left font-medium text-[#1C1B19] cursor-pointer"
                >
                  📦 Track Order Status
                </button>
                <button 
                  onClick={() => navigateTo('wishlist')}
                  className="p-3 bg-white border border-[#E8E5DE] rounded-lg text-left font-medium text-[#1C1B19] cursor-pointer"
                >
                  ❤️ Saved Wishlist ({wishlist.length})
                </button>
                <button 
                  onClick={() => navigateTo('admin')}
                  className="col-span-2 p-3 bg-[#F4F2EB] border border-[#9A6A3A]/30 rounded-lg text-left font-semibold text-[#1C1B19] flex items-center justify-between cursor-pointer"
                >
                  <span>⚙️ Store Management Admin</span>
                  <span className="text-[10px] bg-[#9A6A3A] text-white px-2 py-0.5 rounded">Access</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Footer info */}
          <div className="pt-8 border-t border-[#E8E5DE] mt-6 text-xs text-[#6B6864]">
            <p className="font-serif text-sm font-semibold text-[#1C1B19] mb-1">VALENT & CO. BANGLADESH</p>
            <p>Direct Concierge: +880 1711-293847 (WhatsApp)</p>
            <p className="text-[11px] text-[#A8A49C] mt-2">Gulshan-2, Dhaka · Cash on Delivery Nationwide</p>
          </div>
        </div>
      )}
    </header>
  );
};
