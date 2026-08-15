import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Copy, 
  MapPin, 
  Check 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const OrderSuccessView: React.FC = () => {
  const { currentOrder, orders, navigateTo, formatBDT } = useShop();

  const [copied, setCopied] = React.useState(false);

  // Fallback to latest order if direct navigation
  const order = currentOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#1C1B19]">No recent order found</h2>
        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="mt-4 px-6 py-2.5 bg-[#1C1B19] text-white text-xs font-bold uppercase tracking-wider rounded"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Valent & Co., I have placed order ${order.orderNumber} for BDT ${order.total}. Customer Name: ${order.customer.fullName}, Phone: ${order.customer.mobile}. Please confirm my order.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Success Badge & Header */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#25633C]/10 text-[#25633C] flex items-center justify-center mx-auto ring-8 ring-[#25633C]/5 animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] block">
          Order Successfully Received
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B19]">
          Thank You, {order.customer.fullName}
        </h1>

        <p className="text-xs sm:text-sm text-[#6B6864] leading-relaxed">
          Your order has been recorded. Our client concierge team in Dhaka is preparing your bespoke parcel.
        </p>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-2 bg-[#F4F2EB] border border-[#D9D5CC] px-4 py-2 rounded-full text-xs text-[#1C1B19]">
          <span>Order Reference:</span>
          <strong className="font-mono tracking-wider font-bold text-[#9A6A3A]">{order.orderNumber}</strong>
          <button 
            onClick={handleCopyOrderNumber}
            className="p-1 hover:text-[#1C1B19] cursor-pointer text-[#6B6864]"
            title="Copy order reference"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          What Happens Next (Delivery Process Timeline)
         ------------------------------------------------------------- */}
      <div className="my-10 p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E5DE] shadow-xs space-y-6">
        <h3 className="font-serif text-lg font-bold text-[#1C1B19]">
          Order Fulfillment Steps
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#1C1B19] text-white text-xs font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1C1B19]">Phone Verification</h4>
              <p className="text-[11px] text-[#6B6864] mt-1 leading-relaxed">
                Our representative will call your mobile ({order.customer.mobile}) to confirm your address and timing.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#F4F2EB] text-[#1C1B19] border border-[#D9D5CC] text-xs font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1C1B19]">Express Dispatch</h4>
              <p className="text-[11px] text-[#6B6864] mt-1 leading-relaxed">
                Packaged in luxury protective gift casing and handed to courier (24h Dhaka / 48h Nationwide).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#F4F2EB] text-[#1C1B19] border border-[#D9D5CC] text-xs font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1C1B19]">Cash on Delivery</h4>
              <p className="text-[11px] text-[#6B6864] mt-1 leading-relaxed">
                Inspect the parcel exterior at your door and pay <strong>{formatBDT(order.total)}</strong> in cash to the rider.
              </p>
            </div>
          </div>

        </div>

        {/* WhatsApp Fast Confirmation CTA */}
        <div className="p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <MessageCircle className="w-6 h-6 text-[#25D366] shrink-0" />
            <div>
              <span className="text-xs font-bold text-[#1C1B19] block">Prefer instant WhatsApp confirmation?</span>
              <span className="text-[11px] text-[#4A4744]">Skip the phone wait by sending your order ID directly to our concierge.</span>
            </div>
          </div>
          <a
            href={`https://wa.me/8801711293847?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] hover:bg-[#1fb857] text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <span>Confirm on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Order Receipt Details
         ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-[#E8E5DE] overflow-hidden">
        <div className="p-6 border-b border-[#E8E5DE] flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1C1B19]">Receipt Summary</h3>
            <span className="text-[11px] text-[#8C8880]">Date: {new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[#25633C]/10 text-[#25633C] rounded-full self-start sm:self-auto">
            Payment: Cash on Delivery
          </span>
        </div>

        {/* Items */}
        <div className="p-6 divide-y divide-[#E8E5DE]">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-14 h-16 object-cover rounded bg-[#F4F2EB] border border-[#E8E5DE]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#9A6A3A] block">
                    {item.brand}
                  </span>
                  <h4 className="text-xs font-bold text-[#1C1B19]">{item.productName}</h4>
                  <span className="text-[11px] text-[#6B6864]">{item.variantName} × {item.quantity}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1C1B19]">{formatBDT(item.totalPrice)}</span>
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="p-6 bg-[#FAF9F6] border-t border-[#E8E5DE] space-y-2 text-xs text-[#6B6864]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-[#1C1B19] font-medium">{formatBDT(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-[#25633C]">
              <span>Voucher Discount ({order.couponCode})</span>
              <span>-{formatBDT(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Fee ({order.customer.district})</span>
            <span className="text-[#1C1B19] font-medium">{order.deliveryFee === 0 ? 'FREE' : formatBDT(order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-[#1C1B19] pt-3 border-t border-[#E8E5DE]">
            <span>Total Payable upon Doorstep Delivery</span>
            <span>{formatBDT(order.total)}</span>
          </div>
        </div>

        {/* Customer Address Details */}
        <div className="p-6 border-t border-[#E8E5DE] bg-white grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-bold text-[#1C1B19] uppercase tracking-wider text-[10px] block mb-1">
              Customer Contact
            </span>
            <p className="font-medium text-[#1C1B19]">{order.customer.fullName}</p>
            <p className="text-[#6B6864]">{order.customer.mobile}</p>
          </div>
          <div>
            <span className="font-bold text-[#1C1B19] uppercase tracking-wider text-[10px] block mb-1">
              Delivery Address
            </span>
            <p className="text-[#4A4744] leading-relaxed">
              {order.customer.fullAddress}, {order.customer.thanaArea}, {order.customer.district}
            </p>
            {order.customer.customerNote && (
              <p className="text-[11px] text-[#9A6A3A] italic mt-1">
                Note: "{order.customer.customerNote}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigateTo('order-lookup')}
          className="w-full sm:w-auto px-6 py-3 bg-white border border-[#D9D5CC] hover:border-[#1C1B19] text-[#1C1B19] text-xs font-semibold uppercase tracking-wider rounded transition cursor-pointer flex items-center justify-center gap-2"
        >
          <Clock className="w-4 h-4" />
          <span>Track Order Status</span>
        </button>

        <button
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="w-full sm:w-auto px-8 py-3 bg-[#1C1B19] hover:bg-[#2A2927] text-white text-xs font-bold uppercase tracking-wider rounded transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
