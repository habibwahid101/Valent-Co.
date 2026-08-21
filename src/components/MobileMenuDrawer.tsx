import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

const navCategories: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Catalog' },
  { id: 'perfumes', label: 'Perfumes' },
  { id: 'watches', label: 'Watches' },
  { id: 'sunglasses', label: 'Sunglasses' },
  { id: 'wallets', label: 'Wallets' },
  { id: 'bags', label: 'Bags' },
  { id: 'caps', label: 'Caps' },
];

/**
 * Full-screen mobile navigation drawer.
 *
 * This used to be rendered inside <Header>, which is `position: sticky`
 * with its own z-index/backdrop-blur (both of which create a CSS stacking
 * context). Nesting a `position: fixed` full-screen overlay inside a
 * stacking-context-creating ancestor traps its paint order inside that
 * ancestor's context instead of the page root — in practice this let page
 * content (e.g. the home hero banner) render through/over the drawer
 * instead of being fully covered by it.
 *
 * Rendered as a top-level sibling in App.tsx instead (matching the
 * existing CartDrawer/QuickViewModal/FragranceQuizModal pattern), so it's
 * never nested inside another stacking context. z-30 keeps it below the
 * header itself (z-40, so the header's close button stays on top and
 * clickable) while staying above every other page element.
 */
export const MobileMenuDrawer: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsFragranceQuizOpen,
    wishlist,
    navigateTo,
  } = useShop();

  if (!isMobileMenuOpen) return null;

  return (
    <div className="lg:hidden fixed left-0 right-0 bottom-0 top-18 bg-[#FAF9F6] z-30 overflow-y-auto px-6 py-6 border-t border-[#E8E5DE] shadow-2xl flex flex-col justify-between">
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
              className="col-span-2 p-3 bg-white border border-[#E8E5DE] rounded-lg text-left font-medium text-[#1C1B19] cursor-pointer"
            >
              ❤️ Saved Wishlist ({wishlist.length})
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Footer info */}
      <div className="pt-8 border-t border-[#E8E5DE] mt-6 text-xs text-[#6B6864]">
        <p className="font-serif text-sm font-semibold text-[#1C1B19] mb-1">VALENT & CO. BANGLADESH</p>
        <p>Direct Concierge: +880 1648-339833 (WhatsApp)</p>
        <p className="text-[11px] text-[#A8A49C] mt-2">Gulshan-2, Dhaka · Cash on Delivery Nationwide</p>
      </div>
    </div>
  );
};
