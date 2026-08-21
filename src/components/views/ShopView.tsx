import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Check,
  Tag
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';
import { ProductCategory, FragranceFamily, FilterState } from '../../types';
import { CATEGORIES_LIST, BRANDS_LIST } from '../../data/mockData';

export const ShopView: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    filters,
    setFilters,
    navigateTo,
    formatBDT 
  } = useShop();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Dynamic category meta info
  const categoryMeta: Record<string, { title: string; subtitle: string }> = {
    all: {
      title: 'The Complete Lifestyle Catalogue',
      subtitle: 'Handcrafted extrait perfumery, automatic timepieces, Italian eyewear, and full-grain leather goods.'
    },
    perfumes: {
      title: 'High Perfumery & Extraits',
      subtitle: 'Artisanal extraits formulated with up to 30% oil concentration for intense, long-lasting sillage.'
    },
    watches: {
      title: 'Precision Mechanical Horology',
      subtitle: '316L surgical steel, automatic calibres, and scratch-resistant sapphire crystals.'
    },
    sunglasses: {
      title: 'Polarized Luxury Eyewear',
      subtitle: 'Hand-polished Italian bio-acetate and ultralight Japanese beta-titanium with Cat-3 UV400 lenses.'
    },
    wallets: {
      title: 'Full-Grain Leather Goods',
      subtitle: 'Tuscan vegetable-tanned calfskin designed to hold Bangladeshi currency and RFID protection.'
    },
    bags: {
      title: 'Bags & Travel Luggage',
      subtitle: 'Heavyweight waxed duck canvas and pebble leather built for executive commuting and weekend voyages.'
    },
    caps: {
      title: 'Caps & Headwear',
      subtitle: '380 GSM washed cotton twill contoured for uncompromised, unbranded luxury.'
    },
    accessories: {
      title: 'Everyday Essentials & Accoutrements',
      subtitle: 'Tactile leather keychains, titanium clips, and lifestyle accoutrements.'
    }
  };

  const currentMeta = categoryMeta[selectedCategory] || categoryMeta.all;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category check
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesNotes = product.fragranceSpecs && (
          product.fragranceSpecs.topNotes.some(n => n.toLowerCase().includes(query)) ||
          product.fragranceSpecs.heartNotes.some(n => n.toLowerCase().includes(query)) ||
          product.fragranceSpecs.baseNotes.some(n => n.toLowerCase().includes(query))
        );

        if (!matchesName && !matchesBrand && !matchesCategory && !matchesTags && !matchesDesc && !matchesNotes) {
          return false;
        }
      }

      // Fragrance family filter
      if (filters.fragranceFamily && product.fragranceSpecs) {
        if (!product.fragranceSpecs.fragranceFamily.toLowerCase().includes(filters.fragranceFamily.toLowerCase())) {
          return false;
        }
      }

      // Gender filter
      if (filters.gender) {
        if (product.fragranceSpecs && product.fragranceSpecs.gender !== filters.gender && product.fragranceSpecs.gender !== 'Unisex') {
          return false;
        }
        if (product.sunglassSpecs && product.sunglassSpecs.gender !== filters.gender && product.sunglassSpecs.gender !== 'Unisex') {
          return false;
        }
      }

      // Brand filter
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Stock check
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // featured default
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, filters]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setFilters({
      category: 'all',
      searchQuery: '',
      fragranceFamily: undefined,
      gender: undefined,
      minPrice: 0,
      maxPrice: 35000,
      inStockOnly: false,
      brand: undefined,
      sortBy: 'featured'
    });
  };

  const activeFilterCount = (
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (filters.fragranceFamily ? 1 : 0) +
    (filters.gender ? 1 : 0) +
    (filters.brand ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.maxPrice < 35000 ? 1 : 0)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* -------------------------------------------------------------
          Catalogue Editorial Header
         ------------------------------------------------------------- */}
      <div className="border-b border-[#E8E5DE] pb-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6A3A] mb-1">
              <button 
                onClick={() => setSelectedCategory('all')}
                className="hover:underline cursor-pointer"
              >
                Atelier
              </button>
              <span>/</span>
              <span>{selectedCategory === 'all' ? 'All Collections' : selectedCategory}</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B19]">
              {currentMeta.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6864] max-w-2xl mt-1.5 leading-relaxed">
              {currentMeta.subtitle}
            </p>
          </div>

          <div className="text-xs text-[#8C8880] shrink-0 font-medium">
            Showing <strong className="text-[#1C1B19]">{filteredProducts.length}</strong> creations
          </div>
        </div>

        {/* Active Search / Filter Banner */}
        {(searchQuery || activeFilterCount > 0) && (
          <div className="mt-4 pt-3 border-t border-[#E8E5DE] flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#6B6864] font-medium">Active criteria:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#1C1B19] px-2.5 py-1 rounded-full text-[#1C1B19]">
                <span>Query: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-[#B91C1C] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#F4F2EB] border border-[#D9D5CC] px-2.5 py-1 rounded-full text-[#1C1B19]">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('all')} className="hover:text-[#B91C1C] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.fragranceFamily && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#F4F2EB] border border-[#D9D5CC] px-2.5 py-1 rounded-full text-[#1C1B19]">
                <span>Family: {filters.fragranceFamily}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, fragranceFamily: undefined }))} className="hover:text-[#B91C1C] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.gender && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#F4F2EB] border border-[#D9D5CC] px-2.5 py-1 rounded-full text-[#1C1B19]">
                <span>Silhouette: {filters.gender}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, gender: undefined }))} className="hover:text-[#B91C1C] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.brand && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#F4F2EB] border border-[#D9D5CC] px-2.5 py-1 rounded-full text-[#1C1B19]">
                <span>House: {filters.brand}</span>
                <button onClick={() => setFilters(prev => ({ ...prev, brand: undefined }))} className="hover:text-[#B91C1C] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFilterCount > 1 && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#9A6A3A] hover:underline flex items-center gap-1 cursor-pointer font-medium ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------
          Catalogue Layout: Filter Sidebar + Products Grid
         ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block space-y-8 pr-4">
          
          {/* Department Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1C1B19] mb-3">
              Departments
            </h4>
            <ul className="space-y-1.5 text-xs text-[#4A4744]">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setSelectedCategory(cat.id as ProductCategory | 'all')}
                    className={`w-full text-left py-1 flex items-center justify-between transition cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'font-bold text-[#1C1B19] translate-x-1'
                        : 'hover:text-[#1C1B19]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-[#A8A49C]">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Fragrance Families (Visible for perfume category or all) */}
          {(selectedCategory === 'perfumes' || selectedCategory === 'all') && (
            <div className="pt-6 border-t border-[#E8E5DE]">
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1C1B19] mb-3">
                Fragrance Family
              </h4>
              <div className="space-y-1.5 text-xs">
                {['Woody', 'Amber & Oriental', 'Fresh & Citrus', 'Floral'].map((fam) => (
                  <button
                    key={fam}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      fragranceFamily: prev.fragranceFamily === fam ? undefined : fam
                    }))}
                    className={`w-full text-left py-1 flex items-center justify-between transition cursor-pointer ${
                      filters.fragranceFamily === fam
                        ? 'font-bold text-[#9A6A3A]'
                        : 'text-[#4A4744] hover:text-[#1C1B19]'
                    }`}
                  >
                    <span>{fam}</span>
                    {filters.fragranceFamily === fam && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Gender / Silhouette Target */}
          <div className="pt-6 border-t border-[#E8E5DE]">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1C1B19] mb-3">
              Gender Silhouette
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Unisex', 'Men', 'Women'].map((g) => (
                <button
                  key={g}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    gender: prev.gender === g ? undefined : g
                  }))}
                  className={`text-xs px-3 py-1.5 rounded border transition cursor-pointer ${
                    filters.gender === g
                      ? 'bg-[#1C1B19] text-white border-[#1C1B19]'
                      : 'bg-white text-[#4A4744] border-[#D9D5CC] hover:border-[#1C1B19]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="pt-6 border-t border-[#E8E5DE]">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1C1B19] mb-3">
              Brand / House
            </h4>
            <select
              value={filters.brand || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value || undefined }))}
              className="w-full text-xs p-2.5 rounded border border-[#D9D5CC] bg-white text-[#1C1B19] focus:outline-none focus:border-[#1C1B19]"
            >
              <option value="">All Houses</option>
              {BRANDS_LIST.map(b => (
                <option key={b.name} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Price Max Filter */}
          <div className="pt-6 border-t border-[#E8E5DE]">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1C1B19]">
                Max Price
              </h4>
              <span className="text-xs font-semibold text-[#1C1B19]">
                {formatBDT(filters.maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={2000}
              max={35000}
              step={1000}
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-[#1C1B19] cursor-pointer"
            />
          </div>

          {/* In-Stock Toggle */}
          <div className="pt-6 border-t border-[#E8E5DE]">
            <label className="flex items-center gap-2.5 text-xs text-[#1C1B19] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                className="w-4 h-4 rounded border-[#D9D5CC] text-[#1C1B19] focus:ring-0 accent-[#1C1B19]"
              />
              <span>In-Stock in Dhaka Hub only</span>
            </label>
          </div>

        </aside>

        {/* Products Grid & Controls */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar (Sort & Mobile Filter Trigger) */}
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#E8E5DE]">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1B19] px-3 py-1.5 rounded bg-[#F4F2EB] cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#9A6A3A]" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <span className="hidden lg:inline text-xs text-[#6B6864]">
              Displaying {filteredProducts.length} pieces
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-[#6B6864] hidden sm:inline">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                className="text-xs py-1.5 px-3 rounded border border-[#D9D5CC] bg-[#FAF9F6] text-[#1C1B19] font-medium focus:outline-none focus:border-[#1C1B19] cursor-pointer"
              >
                <option value="featured">Editorial Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-xl border border-[#E8E5DE] p-8">
              <div className="w-16 h-16 rounded-full bg-[#F4F2EB] flex items-center justify-center mx-auto mb-4 text-[#A8A49C]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1C1B19]">
                No matching creations found
              </h3>
              <p className="text-xs text-[#6B6864] max-w-sm mx-auto mt-2 mb-6">
                Try widening your price range, clearing specific filters, or searching with broader keywords.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 bg-[#1C1B19] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#2A2927] transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

      {/* -------------------------------------------------------------
          Mobile Filter Bottom Sheet / Drawer
         ------------------------------------------------------------- */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-[#FAF9F6] shadow-2xl flex flex-col justify-between p-6 border-l border-[#E8E5DE]">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DE]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#9A6A3A]" />
                  <h3 className="font-serif text-base font-bold text-[#1C1B19]">Refine Catalogue</h3>
                </div>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#6B6864] hover:text-[#1C1B19] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 space-y-6">
                {/* Category Selection */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1B19] mb-2">Category</h4>
                  <div className="space-y-1 text-xs">
                    {CATEGORIES_LIST.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id as ProductCategory | 'all')}
                        className={`w-full text-left py-1.5 px-2 rounded ${selectedCategory === cat.id ? 'bg-[#1C1B19] text-white font-bold' : 'text-[#4A4744]'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fragrance Family */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1B19] mb-2">Fragrance Family</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Woody', 'Amber & Oriental', 'Fresh & Citrus', 'Floral'].map(fam => (
                      <button
                        key={fam}
                        onClick={() => setFilters(prev => ({ ...prev, fragranceFamily: prev.fragranceFamily === fam ? undefined : fam }))}
                        className={`text-xs px-2.5 py-1 rounded border ${filters.fragranceFamily === fam ? 'bg-[#9A6A3A] text-white border-[#9A6A3A]' : 'bg-white border-[#D9D5CC]'}`}
                      >
                        {fam}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold uppercase tracking-wider">Max Price</span>
                    <span>{formatBDT(filters.maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={35000}
                    step={1000}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                    className="w-full accent-[#1C1B19]"
                  />
                </div>

                {/* In Stock */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-[#1C1B19]">
                    <input
                      type="checkbox"
                      checked={filters.inStockOnly}
                      onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                      className="w-4 h-4 rounded border-[#D9D5CC] accent-[#1C1B19]"
                    />
                    <span>In-Stock only</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E5DE] space-y-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#1C1B19] text-white text-xs font-bold uppercase tracking-wider rounded"
                >
                  Show {filteredProducts.length} Results
                </button>
                <button
                  onClick={resetAllFilters}
                  className="w-full py-2 bg-transparent text-[#6B6864] text-xs font-medium underline text-center"
                >
                  Reset all
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
