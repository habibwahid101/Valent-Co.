import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ChevronRight,
  Eye,
  ShoppingBag,
  Star,
  CheckCircle2,
  Award
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';
import { CATEGORIES_LIST, BRANDS_LIST } from '../../data/mockData';
import { ProductCategory, FragranceFamily } from '../../types';

export const HomeView: React.FC = () => {
  const { 
    products, 
    navigateTo, 
    setIsFragranceQuizOpen, 
    formatBDT 
  } = useShop();

  const [selectedFragranceFamily, setSelectedFragranceFamily] = useState<FragranceFamily>('Woody');

  // Filter subsets
  const newArrivals = products.filter(p => p.isNew || p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const perfumeProducts = products.filter(p => p.category === 'perfumes');
  const executiveProducts = products.filter(p => p.category === 'watches' || p.category === 'bags' || p.category === 'wallets').slice(0, 4);

  // Fragrance family filtered
  const familyFilteredPerfumes = perfumeProducts.filter(p => 
    p.fragranceSpecs?.fragranceFamily.toLowerCase().includes(selectedFragranceFamily.toLowerCase().split(' ')[0])
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* -------------------------------------------------------------
          1. HERO CAMPAIGN (MR PORTER & Editorial Luxury Influence)
         ------------------------------------------------------------- */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#181716] text-[#FAF9F6]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury watches, extrait perfumery and leather goods"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-[#181716]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D9D5CC] text-[11px] uppercase tracking-[0.25em] font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A6A3A] animate-ping" />
            <span>The 2026 Curated Collection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Objects of Everyday <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#E8E5DE]">Distinction & Craft</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#C5C1B8] font-normal leading-relaxed mb-8">
            Handcrafted Extrait de Parfum, precision mechanical horology, polarized Italian eyewear, and full-grain leather goods delivered directly to your doorstep in Bangladesh.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('shop', { category: 'all' })}
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF9F6] text-[#1C1B19] text-xs font-bold uppercase tracking-[0.2em] rounded-xs hover:bg-white hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('shop', { category: 'perfumes' })}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-xs hover:bg-white/10 transition cursor-pointer"
            >
              <span>Discover Fragrances</span>
            </button>
          </div>

          {/* Key highlights bar below buttons */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-[11px] text-[#A8A49C]">
            <div>
              <span className="font-semibold text-white block">Cash on Delivery</span>
              <span>All 64 Districts</span>
            </div>
            <div>
              <span className="font-semibold text-white block">100% Authentic</span>
              <span>Direct European Sourcing</span>
            </div>
            <div>
              <span className="font-semibold text-white block">24-48h Delivery</span>
              <span>Inside Dhaka Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. SHOP BY CATEGORY (Clean Visual Cards)
         ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E5DE]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
              Curated Departments
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1B19] mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { category: 'all' })}
            className="text-xs uppercase tracking-wider font-semibold text-[#1C1B19] hover:text-[#9A6A3A] transition flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES_LIST.filter(c => c.id !== 'all').map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', { category: cat.id as ProductCategory })}
              className="group relative rounded-lg overflow-hidden aspect-[3/4] bg-[#F4F2EB] border border-[#E8E5DE] cursor-pointer shadow-xs hover:shadow-md transition duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B19]/90 via-[#1C1B19]/30 to-transparent" />
              
              <div className="absolute bottom-3 inset-x-3 text-white">
                <span className="text-[9px] uppercase tracking-wider text-[#D9D5CC] font-medium block">
                  {cat.tag}
                </span>
                <h3 className="font-serif text-sm sm:text-base font-semibold leading-tight mt-0.5 group-hover:text-[#D9D5CC] transition">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. NEW ARRIVALS (Disciplined Grid with Filtering)
         ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E5DE]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
              Just Arrived in Dhaka
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1B19] mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { category: 'all', search: 'new' })}
            className="text-xs uppercase tracking-wider font-semibold text-[#1C1B19] hover:text-[#9A6A3A] transition flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
          >
            <span>Explore All New Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. EDITORIAL CAMPAIGN (MR PORTER Style Visual Narrative)
         ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden bg-[#242220] text-white border border-[#3D3A35]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#9A6A3A]">
                The Editorial Campaign
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                The Anatomy of Quiet Luxury
              </h2>

              <p className="text-xs sm:text-sm text-[#C5C1B8] leading-relaxed">
                True elegance does not shout. It reveals itself in the tactile weight of 380 GSM Japanese cotton twill, the smooth sweeping second hand of an automatic calibre, and the lingering sillage of high-concentration perfume oils.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => navigateTo('shop', { category: 'all' })}
                  className="px-6 py-3 bg-white text-[#1C1B19] text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#F4F2EB] transition cursor-pointer"
                >
                  Shop the Story
                </button>
                <button
                  onClick={() => setIsFragranceQuizOpen(true)}
                  className="px-6 py-3 bg-transparent border border-white/30 text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-white/10 transition cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#9A6A3A]" />
                  <span>Take Scent Quiz</span>
                </button>
              </div>
            </div>

            <div className="relative min-h-[320px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"
                alt="Luxury fragrance bottle and gold accents"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. BEST SELLERS (High Conversion Products)
         ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E5DE]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
              Client Favorites in Dhaka & Chittagong
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1B19] mt-1">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { category: 'all', search: 'bestseller' })}
            className="text-xs uppercase tracking-wider font-semibold text-[#1C1B19] hover:text-[#9A6A3A] transition flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. PERFUME SPOTLIGHT & OLFACTORY PYRAMID (Sephora Influence)
         ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F2EB] rounded-2xl p-6 sm:p-10 border border-[#E8E5DE]">
          
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
              High Perfumery Extraits
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#1C1B19] mt-1">
              Explore by Fragrance Family
            </h2>
            <p className="text-xs text-[#6B6864] mt-2">
              Formulated with up to 30% fragrance oil concentration for exceptional 12+ hour longevity in tropical and temperate climates.
            </p>
          </div>

          {/* Fragrance Family Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-[#D9D5CC]">
            {[
              { family: 'Woody', label: '🪵 Woody & Santal' },
              { family: 'Amber & Oriental', label: '✨ Amber & Royal Oud' },
              { family: 'Fresh & Citrus', label: '🍋 Fresh Italian Citrus' },
              { family: 'Floral', label: '🌹 Velvet Midnight Floral' }
            ].map((tab) => (
              <button
                key={tab.family}
                onClick={() => setSelectedFragranceFamily(tab.family as FragranceFamily)}
                className={`text-xs font-semibold py-2 px-4 rounded-full transition cursor-pointer ${
                  selectedFragranceFamily === tab.family
                    ? 'bg-[#1C1B19] text-white shadow-sm'
                    : 'bg-white text-[#1C1B19] border border-[#D9D5CC] hover:border-[#1C1B19]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Fragrance Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(familyFilteredPerfumes.length > 0 ? familyFilteredPerfumes : perfumeProducts.slice(0, 3)).map((perfume) => (
              <div 
                key={perfume.id}
                onClick={() => navigateTo('product-detail', { product: perfume })}
                className="bg-white rounded-xl p-5 border border-[#E8E5DE] hover:border-[#1C1B19] transition duration-300 flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#FAF9F6] mb-4 relative">
                    <img 
                      src={perfume.images[0]} 
                      alt={perfume.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#1C1B19] text-white rounded-xs">
                      {perfume.fragranceSpecs?.concentration}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A6A3A] block">
                    {perfume.brand}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1C1B19] mt-0.5 group-hover:text-[#9A6A3A] transition">
                    {perfume.name}
                  </h3>
                  <p className="text-xs text-[#6B6864] line-clamp-2 mt-1">
                    {perfume.subtitle}
                  </p>

                  {/* Notes Pills */}
                  {perfume.fragranceSpecs && (
                    <div className="mt-4 pt-3 border-t border-[#E8E5DE]/80 text-[11px] space-y-1">
                      <div className="flex gap-1.5">
                        <span className="text-[#8C8880] w-12 shrink-0">Top:</span>
                        <span className="text-[#1C1B19] font-medium">{perfume.fragranceSpecs.topNotes.slice(0, 2).join(', ')}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="text-[#8C8880] w-12 shrink-0">Heart:</span>
                        <span className="text-[#1C1B19] font-medium">{perfume.fragranceSpecs.heartNotes.slice(0, 2).join(', ')}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="text-[#8C8880] w-12 shrink-0">Base:</span>
                        <span className="text-[#1C1B19] font-medium">{perfume.fragranceSpecs.baseNotes.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E5DE] flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1C1B19]">
                    {formatBDT(perfume.price)}
                  </span>
                  <span className="text-xs font-medium text-[#9A6A3A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          7. THE EXECUTIVE EDIT (Bellroy Cross-Merchandising Influence)
         ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E5DE]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
              Curated Style Capsule
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1B19] mt-1">
              The Executive Edit
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { category: 'all' })}
            className="text-xs uppercase tracking-wider font-semibold text-[#1C1B19] hover:text-[#9A6A3A] transition flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
          >
            <span>Explore All Lifestyle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {executiveProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          8. HOUSE BRANDS SHOWCASE
         ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
            Craftsmanship & Heritage
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1B19] mt-1">
            Our Atelier Houses
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANDS_LIST.map((brand) => (
            <div
              key={brand.name}
              onClick={() => navigateTo('shop', { search: brand.name })}
              className="p-5 bg-white rounded-lg border border-[#E8E5DE] hover:border-[#1C1B19] transition text-center cursor-pointer flex flex-col justify-center items-center shadow-2xs hover:shadow-xs"
            >
              <h4 className="font-serif text-base font-bold text-[#1C1B19]">
                {brand.name}
              </h4>
              <span className="text-[10px] uppercase tracking-wider text-[#9A6A3A] mt-1">
                {brand.origin}
              </span>
              <p className="text-[10px] text-[#6B6864] mt-2 line-clamp-1">
                {brand.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          9. LIFESTYLE GALLERY (Visual Grid)
         ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md mx-auto mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
            @valentandco.bd
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1B19] mt-1">
            Objects in Living Context
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop', caption: 'Heritage Calibre on Tuscan Leather' },
            { img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop', caption: 'Maison Aurelle No. 07 Nocturne' },
            { img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', caption: 'Monaco Polarized Bio-Acetate' },
            { img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', caption: 'Grand Tourer Waxed Weekender' }
          ].map((item, idx) => (
            <div key={idx} className="group relative aspect-square rounded-lg overflow-hidden bg-[#F4F2EB] border border-[#E8E5DE]">
              <img
                src={item.img}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#1C1B19]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                <span className="text-xs font-serif text-white font-medium">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
