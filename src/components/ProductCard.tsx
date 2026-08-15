import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  aspectRatio?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  aspectRatio = 'aspect-[4/5]' 
}) => {
  const { 
    navigateTo, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    formatBDT 
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isLiked = isInWishlist(product.id);
  const hasMultipleImages = product.images.length > 1;
  const currentImage = (isHovered && hasMultipleImages) ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, product.variants[0], 1);
    setTimeout(() => setIsAdding(false), 1200);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div 
      className="group flex flex-col cursor-pointer select-none"
      onClick={() => navigateTo('product-detail', { product })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Frame */}
      <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-md bg-[#F4F2EB] border border-[#E8E5DE]/80 transition-all duration-300 group-hover:border-[#C5C1B8] group-hover:shadow-md`}>
        
        {/* Main Image */}
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold px-2 py-0.5 bg-[#1C1B19] text-[#FAF9F6] rounded-xs shadow-xs">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold px-2 py-0.5 bg-[#9A6A3A] text-white rounded-xs shadow-xs">
              Best Seller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold px-2 py-0.5 bg-[#8A2424] text-white rounded-xs shadow-xs">
              Save {discountPercent}%
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-[9px] uppercase tracking-[0.15em] font-medium px-2 py-0.5 bg-amber-800 text-white rounded-xs shadow-xs">
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition duration-200 z-10 cursor-pointer ${
            isLiked 
              ? 'bg-[#1C1B19] text-[#E05656] shadow-md' 
              : 'bg-white/80 backdrop-blur-xs text-[#1C1B19] hover:bg-white hover:text-[#9A6A3A] shadow-xs'
          }`}
          aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Action Overlay (Desktop Hover & Mobile tap visible) */}
        <div className="absolute bottom-2.5 inset-x-2.5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2 px-2 bg-white/95 backdrop-blur-xs hover:bg-white text-[#1C1B19] text-[11px] font-medium tracking-wider uppercase rounded-xs border border-[#E8E5DE] shadow-sm flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quick View</span>
          </button>
          
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className="flex-1 py-2 px-2 bg-[#1C1B19] hover:bg-[#2F2E2B] text-white text-[11px] font-medium tracking-wider uppercase rounded-xs shadow-sm flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{product.stock > 0 ? 'Quick Add' : 'Sold Out'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-3 flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A6A3A]">
            {product.brand}
          </span>
          {product.fragranceSpecs && (
            <span className="text-[10px] text-[#8C8880] tracking-wider">
              {product.fragranceSpecs.fragranceFamily}
            </span>
          )}
          {product.watchSpecs && (
            <span className="text-[10px] text-[#8C8880] tracking-wider">
              {product.watchSpecs.movement.split(' ')[0]}
            </span>
          )}
        </div>

        <h3 className="text-sm font-medium text-[#1C1B19] line-clamp-1 group-hover:text-[#9A6A3A] transition">
          {product.name}
        </h3>

        <p className="text-[11px] text-[#6B6864] line-clamp-1">
          {product.subtitle}
        </p>

        {/* Pricing in BDT */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-semibold text-[#1C1B19]">
            {formatBDT(product.price)}
          </span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-xs text-[#9A9790] line-through">
              {formatBDT(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
