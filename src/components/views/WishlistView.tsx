import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard';

export const WishlistView: React.FC = () => {
  const { wishlist, products, navigateTo, toggleWishlist } = useShop();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F4F2EB] flex items-center justify-center mx-auto mb-4 text-[#A8A49C]">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1C1B19]">
          Your Saved Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6864] max-w-md mx-auto mt-2 mb-8">
          Save your favorite perfume extraits, automatic timepieces, and leather goods to review or order later.
        </p>
        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="px-8 py-3.5 bg-[#1C1B19] text-white text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-[#2A2927] transition cursor-pointer"
        >
          Explore Boutique
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="border-b border-[#E8E5DE] pb-6 mb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
            Client Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B19] mt-1">
            Saved Pieces ({savedProducts.length})
          </h1>
        </div>
        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="text-xs font-semibold uppercase tracking-wider text-[#1C1B19] hover:text-[#9A6A3A] transition flex items-center gap-1 cursor-pointer"
        >
          <span>Continue Browsing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
