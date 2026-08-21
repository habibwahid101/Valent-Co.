import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  ChevronLeft,
  Lock
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartItemCount, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    navigateTo, 
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    formatBDT 
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const FREE_SHIPPING_THRESHOLD = 5000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F4F2EB] flex items-center justify-center mx-auto mb-6 text-[#A8A49C]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1C1B19]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6864] max-w-md mx-auto mt-2 mb-8">
          You have not added any extrait perfumes, automatic watches, or handcrafted leather goods to your bag yet.
        </p>
        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="px-8 py-3.5 bg-[#1C1B19] text-white text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-[#2A2927] transition cursor-pointer"
        >
          Explore Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <div className="border-b border-[#E8E5DE] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button 
            onClick={() => navigateTo('shop', { category: 'all' })}
            className="text-xs text-[#6B6864] hover:text-[#1C1B19] flex items-center gap-1 mb-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B19]">
            Shopping Bag ({cartItemCount} Items)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#9A9790] hover:text-[#B91C1C] underline cursor-pointer"
        >
          Clear entire bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-[#F4F2EB] rounded-lg border border-[#E8E5DE]">
            {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#25633C]">
                <Truck className="w-4 h-4 text-[#25633C]" />
                <span>You've unlocked Complimentary Express Delivery in Dhaka!</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-xs text-[#4A4744] mb-1.5 font-medium">
                  <span>Add <strong>{formatBDT(remainingForFree)}</strong> more for Free Dhaka Delivery</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#D9D5CC] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#9A6A3A] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-xl border border-[#E8E5DE] divide-y divide-[#E8E5DE] overflow-hidden">
            {cart.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                
                {/* Product Meta */}
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded bg-[#F4F2EB] border border-[#E8E5DE] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#9A6A3A]">
                      {item.product.brand}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#1C1B19] leading-tight">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#6B6864]">
                      {item.selectedVariant.name}
                    </p>
                    <span className="text-xs font-semibold text-[#1C1B19] sm:hidden block">
                      {formatBDT(item.unitPrice)} each
                    </span>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8E5DE]/60">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#D9D5CC] rounded-lg bg-white">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-[#6B6864] hover:text-[#1C1B19] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#1C1B19]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.selectedVariant.stock}
                      className="p-2 text-[#6B6864] hover:text-[#1C1B19] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[90px]">
                    <span className="text-sm font-bold text-[#1C1B19] block">
                      {formatBDT(item.unitPrice * item.quantity)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-[#8C8880] block">
                        ({formatBDT(item.unitPrice)} / unit)
                      </span>
                    )}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#9A9790] hover:text-[#B91C1C] p-1 transition cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-[#E8E5DE] p-6 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#1C1B19] pb-3 border-b border-[#E8E5DE]">
              Order Summary
            </h3>

            {/* Promo code */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between p-3 bg-[#F4F2EB] rounded-lg text-xs">
                  <div className="flex items-center gap-2 text-[#25633C] font-medium">
                    <Tag className="w-4 h-4" />
                    <span>Promo <strong>{couponCode}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#9A9790] hover:text-[#B91C1C] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promotional code (e.g. WELCOME10)"
                      className="flex-1 text-xs px-3 py-2.5 border border-[#D9D5CC] rounded uppercase tracking-wider focus:outline-none focus:border-[#1C1B19] bg-[#FAF9F6]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#1C1B19] hover:bg-[#2A2927] text-white text-xs font-semibold rounded cursor-pointer transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-xs ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-[#6B6864] pt-2 border-t border-[#E8E5DE]">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="text-[#1C1B19] font-semibold">{formatBDT(cartSubtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#25633C] font-semibold">
                  <span>Privilege Voucher Discount</span>
                  <span>-{formatBDT(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>{cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE (Inside Dhaka)' : 'From ৳80'}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1C1B19] pt-3 border-t border-[#E8E5DE]">
                <span>Estimated Total</span>
                <span>{formatBDT(Math.max(0, cartSubtotal - couponDiscount))}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 px-6 bg-[#1C1B19] hover:bg-[#2A2927] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Proceed to Cash on Delivery Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Reassurance */}
            <div className="space-y-2 pt-3 border-t border-[#E8E5DE] text-[11px] text-[#6B6864]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9A6A3A]" />
                <span>Zero Risk: Pay Cash upon Doorstep Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#9A6A3A]" />
                <span>Express Courier Dispatch across Bangladesh</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
