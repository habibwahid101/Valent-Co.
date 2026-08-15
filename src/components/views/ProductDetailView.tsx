import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Plus, 
  Minus, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  MessageCircle,
  Award,
  Layers,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product, ProductVariant } from '../../types';
import { ProductCard } from '../ProductCard';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    formatBDT 
  } = useShop();

  // If no product selected, fallback to first product
  const product: Product = selectedProduct || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0] || {
    id: `def-${product.id}`,
    name: 'Standard',
    sku: product.sku,
    price: product.price,
    stock: product.stock,
    inStock: product.stock > 0
  });
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string>('specs');

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
    setActiveImageIndex(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const isLiked = isInWishlist(product.id);
  const activePrice = selectedVariant.price || product.price;
  const activeOldPrice = selectedVariant.oldPrice || product.oldPrice;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleDirectBuy = () => {
    addToCart(product, selectedVariant, quantity);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If not enough related in same category, pad with featured
  const crossSellProducts = relatedProducts.length >= 2 
    ? relatedProducts 
    : [...relatedProducts, ...products.filter(p => p.id !== product.id).slice(0, 4 - relatedProducts.length)];

  return (
    <div className="pb-24">
      {/* -------------------------------------------------------------
          Breadcrumb Navigation
         ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E8E5DE] text-xs text-[#6B6864]">
        <div className="flex items-center gap-2">
          <button onClick={() => navigateTo('home')} className="hover:text-[#1C1B19] cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop', { category: product.category })} className="hover:text-[#1C1B19] capitalize cursor-pointer">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#1C1B19] font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* -------------------------------------------------------------
              Left: Image Gallery (MR PORTER Style)
             ------------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F4F2EB] border border-[#E8E5DE] group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.isNew && (
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 bg-[#1C1B19] text-white rounded-xs shadow-sm">
                    New Arrival
                  </span>
                )}
                {product.isBestSeller && !product.isNew && (
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 bg-[#9A6A3A] text-white rounded-xs shadow-sm">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm z-10 cursor-pointer ${
                  isLiked ? 'bg-[#1C1B19] text-[#E05656]' : 'bg-white/90 text-[#1C1B19] hover:bg-white hover:text-[#9A6A3A]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition cursor-pointer bg-[#F4F2EB] ${
                      activeImageIndex === idx
                        ? 'border-[#1C1B19] ring-1 ring-[#1C1B19]'
                        : 'border-[#E8E5DE] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Direct WhatsApp Stylist Banner */}
            <div className="p-4 rounded-xl bg-white border border-[#E8E5DE] flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1C1B19]">Personal Concierge Consultation</h4>
                  <p className="text-[11px] text-[#6B6864]">Questions about sizing, scent profile, or Dhaka delivery?</p>
                </div>
              </div>
              <a
                href={`https://wa.me/8801711293847?text=Hello%20Valent%20%26%20Co.%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1b8a43] text-xs font-semibold transition"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* -------------------------------------------------------------
              Right: Product Commercial Core
             ------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Header / Brand / Title */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#9A6A3A]">
                  {product.brand}
                </span>
                <button 
                  onClick={handleShare}
                  className="text-xs text-[#6B6864] hover:text-[#1C1B19] flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B19] mt-1">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#6B6864] mt-1.5 font-normal">
                {product.subtitle}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="font-bold text-[#1C1B19]">{product.rating}</span>
                <span className="text-[#8C8880]">({product.reviewCount} verified client reviews)</span>
              </div>
            </div>

            {/* Pricing Strip in BDT */}
            <div className="p-4 rounded-lg bg-[#F4F2EB] border border-[#E8E5DE] flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6B6864] block">
                  Cash on Delivery Price
                </span>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1C1B19]">
                    {formatBDT(activePrice)}
                  </span>
                  {activeOldPrice && activeOldPrice > activePrice && (
                    <span className="text-sm text-[#9A9790] line-through">
                      {formatBDT(activeOldPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-semibold text-[#25633C] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock (Hub Dhaka)</span>
                </span>
                <span className="text-[10px] text-[#8C8880] block mt-0.5">
                  Ships within 24h
                </span>
              </div>
            </div>

            {/* Short Editorial Description */}
            <p className="text-xs sm:text-sm text-[#4A4744] leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#1C1B19]">
                    Select Specification / Volume:
                  </span>
                  <span className="text-[#9A6A3A] font-semibold">{selectedVariant.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-lg border text-left transition cursor-pointer ${
                        selectedVariant.id === v.id
                          ? 'border-[#1C1B19] bg-white ring-1 ring-[#1C1B19] shadow-xs'
                          : 'border-[#D9D5CC] bg-[#FAF9F6] hover:bg-white'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#1C1B19] block">{v.name}</span>
                      <span className="text-[11px] text-[#6B6864] mt-0.5 block">{formatBDT(v.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------
                Buying Controls (Quantity + Add to Cart + Cash on Delivery Buy)
               ------------------------------------------------------------- */}
            <div className="space-y-3 pt-4 border-t border-[#E8E5DE]">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#D9D5CC] rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-[#6B6864] hover:text-[#1C1B19] transition cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold text-[#1C1B19]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-[#6B6864] hover:text-[#1C1B19] transition cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Add to Cart */}
                <button
                  id="add-to-cart-cta"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 py-3.5 px-6 bg-[#1C1B19] hover:bg-[#2A2927] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-lg shadow-md flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • {formatBDT(activePrice * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Cash on Delivery Instant Order */}
              <button
                onClick={handleDirectBuy}
                className="w-full py-3.5 px-4 bg-[#9A6A3A] hover:bg-[#7A5128] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-lg shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Order Now with Cash on Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Reassurance Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E8E5DE] text-[11px] text-[#4A4744]">
              <div className="flex items-start gap-2 p-2.5 rounded bg-white border border-[#E8E5DE]">
                <Truck className="w-4 h-4 text-[#9A6A3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1B19] block">Dhaka 24h Express</strong>
                  <span>Free delivery over ৳5,000</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded bg-white border border-[#E8E5DE]">
                <ShieldCheck className="w-4 h-4 text-[#9A6A3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1B19] block">100% Quality Checked</strong>
                  <span>Direct European Import</span>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                Storytelling & Detailed Accordions
               ------------------------------------------------------------- */}
            <div className="pt-4 border-t border-[#E8E5DE] divide-y divide-[#E8E5DE]">
              
              {/* Accordion 1: Technical & Olfactory Specs */}
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1C1B19] py-1 cursor-pointer"
                >
                  <span>Composition & Specifications</span>
                  {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {openAccordion === 'specs' && (
                  <div className="pt-3 text-xs text-[#4A4744] space-y-3 animate-in fade-in duration-200">
                    {/* Perfume Pyramid Visual */}
                    {product.fragranceSpecs && (
                      <div className="space-y-2 bg-[#F4F2EB] p-4 rounded-lg">
                        <div className="flex justify-between border-b border-[#D9D5CC] pb-1.5">
                          <span className="font-semibold text-[#1C1B19]">Concentration:</span>
                          <span>{product.fragranceSpecs.concentration}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#D9D5CC] pb-1.5">
                          <span className="font-semibold text-[#1C1B19]">Family:</span>
                          <span>{product.fragranceSpecs.fragranceFamily}</span>
                        </div>
                        <div className="border-b border-[#D9D5CC] pb-1.5">
                          <span className="font-semibold text-[#1C1B19] block mb-1">Top Notes:</span>
                          <span className="text-[#6B6864]">{product.fragranceSpecs.topNotes.join(', ')}</span>
                        </div>
                        <div className="border-b border-[#D9D5CC] pb-1.5">
                          <span className="font-semibold text-[#1C1B19] block mb-1">Heart Notes:</span>
                          <span className="text-[#6B6864]">{product.fragranceSpecs.heartNotes.join(', ')}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1C1B19] block mb-1">Base Notes:</span>
                          <span className="text-[#6B6864]">{product.fragranceSpecs.baseNotes.join(', ')}</span>
                        </div>
                      </div>
                    )}

                    {/* Watch Specs Sheet */}
                    {product.watchSpecs && (
                      <div className="space-y-2 bg-[#F4F2EB] p-4 rounded-lg">
                        <div className="flex justify-between border-b border-[#D9D5CC] pb-1.5">
                          <span className="font-semibold text-[#1C1B19]">Movement Calibre:</span>
                          <span>{product.watchSpecs.movement}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#D9D5CC] pb-1.5">
                          <span className="font-semibold text-[#1C1B19]">Case Material:</span>
                          <span>{product.watchSpecs.caseMaterial}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#D9D5CC] pb-1.5">
                          <span className="font-semibold text-[#1C1B19]">Glass:</span>
                          <span>{product.watchSpecs.glass}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#D9D5CC] pb-1.5">
                          <span className="font-semibold text-[#1C1B19]">Water Resistance:</span>
                          <span>{product.watchSpecs.waterResistance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-[#1C1B19]">Warranty:</span>
                          <span>{product.watchSpecs.warranty}</span>
                        </div>
                      </div>
                    )}

                    {/* Eyewear / Leather Specs */}
                    {product.sunglassSpecs && (
                      <div className="space-y-2 bg-[#F4F2EB] p-4 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-semibold text-[#1C1B19]">Frame Material:</span>
                          <span>{product.sunglassSpecs.frameMaterial}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-[#1C1B19]">Lenses:</span>
                          <span>{product.sunglassSpecs.lensType}</span>
                        </div>
                      </div>
                    )}

                    {product.leatherSpecs && (
                      <div className="space-y-2 bg-[#F4F2EB] p-4 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-semibold text-[#1C1B19]">Leather:</span>
                          <span>{product.leatherSpecs.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-[#1C1B19]">Dimensions:</span>
                          <span>{product.leatherSpecs.dimensions}</span>
                        </div>
                        {product.leatherSpecs.rfidProtected && (
                          <div className="flex justify-between text-[#25633C] font-medium">
                            <span>RFID Shield:</span>
                            <span>Integrated Aluminum Layer</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: The Craft Story */}
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'story' ? '' : 'story')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1C1B19] py-1 cursor-pointer"
                >
                  <span>The Atelier Story & Heritage</span>
                  {openAccordion === 'story' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {openAccordion === 'story' && (
                  <div className="pt-3 text-xs text-[#4A4744] leading-relaxed space-y-2 animate-in fade-in duration-200">
                    <p>{product.story}</p>
                    <p className="text-[11px] text-[#8C8880]">Origin: {product.origin || 'European Atelier'}</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Delivery in Bangladesh */}
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1C1B19] py-1 cursor-pointer"
                >
                  <span>Delivery & Cash on Delivery Policy</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {openAccordion === 'shipping' && (
                  <div className="pt-3 text-xs text-[#4A4744] leading-relaxed space-y-2 animate-in fade-in duration-200">
                    <p>
                      <strong>Inside Dhaka:</strong> Delivery fee is ৳80 (Complimentary over ৳5,000). Delivered within 24 to 48 hours via our dedicated executive courier.
                    </p>
                    <p>
                      <strong>Outside Dhaka (All 64 Districts):</strong> Delivery fee is ৳130. Delivered within 48 to 72 hours with Pathao / Steadfast Courier with tracking.
                    </p>
                    <p className="text-[#25633C] font-semibold">
                      Payment is made strictly upon doorstep delivery after inspecting the sealed exterior package.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* -------------------------------------------------------------
            Cross-Selling: You May Also Like / Complete the Look
           ------------------------------------------------------------- */}
        <div className="mt-20 pt-12 border-t border-[#E8E5DE]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
                Curated Suggestions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1B19] mt-1">
                You May Also Like
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop', { category: product.category })}
              className="text-xs uppercase tracking-wider font-semibold text-[#1C1B19] hover:text-[#9A6A3A] transition flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Category</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {crossSellProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>

      {/* -------------------------------------------------------------
          Sticky Mobile Add to Cart Bar
         ------------------------------------------------------------- */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E8E5DE] p-3 z-30 shadow-2xl flex items-center justify-between gap-3">
        <div className="overflow-hidden">
          <span className="text-xs font-semibold text-[#1C1B19] block truncate">
            {product.name}
          </span>
          <span className="text-xs font-bold text-[#9A6A3A]">
            {formatBDT(activePrice * quantity)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="py-2.5 px-5 bg-[#1C1B19] hover:bg-[#2A2927] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
        >
          {isAdded ? <Check className="w-4 h-4 text-emerald-400" /> : <ShoppingBag className="w-4 h-4" />}
          <span>{isAdded ? 'Added' : 'Add to Bag'}</span>
        </button>
      </div>

    </div>
  );
};
