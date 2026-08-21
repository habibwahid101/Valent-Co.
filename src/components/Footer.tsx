import React from 'react';
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Mail
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <footer className="bg-[#191817] text-[#FAF9F6] border-t border-[#2D2B28]">
      {/* Brand Trust Strip */}
      <div className="border-b border-[#2D2B28] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#262522] border border-[#3D3A35] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#9A6A3A]" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold tracking-wide text-white">
                Authenticity & Craft
              </h4>
              <p className="text-xs text-[#A8A49C] mt-1 leading-relaxed">
                Hand-selected luxury extrait perfumery, automatic timepieces, and Italian full-grain leather.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#262522] border border-[#3D3A35] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#9A6A3A]" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold tracking-wide text-white">
                Express Nationwide Delivery
              </h4>
              <p className="text-xs text-[#A8A49C] mt-1 leading-relaxed">
                24-48 hour delivery inside Dhaka; 2-3 days across all 64 districts with secure courier handling.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#262522] border border-[#3D3A35] flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-[#9A6A3A]" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold tracking-wide text-white">
                Cash on Delivery (COD)
              </h4>
              <p className="text-xs text-[#A8A49C] mt-1 leading-relaxed">
                Pay with complete peace of mind at your doorstep upon receiving your luxury package.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#262522] border border-[#3D3A35] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#9A6A3A]" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold tracking-wide text-white">
                Direct WhatsApp Concierge
              </h4>
              <p className="text-xs text-[#A8A49C] mt-1 leading-relaxed">
                Live consultations for fragrance pairings and gift recommendations with our stylists.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-white block uppercase">
              VALENT & CO.
            </span>
            <p className="text-xs text-[#A8A49C] leading-relaxed max-w-sm">
              An atelier dedicated to modern luxury essentials: exquisite perfume extraits, high-precision horology, handcrafted polarized eyewear, and artisanal leather goods designed for longevity.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#D9D5CC]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9A6A3A]" />
                <span>Gulshan-2, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9A6A3A]" />
                <span>+880 1648-339833 (WhatsApp & Phone)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#9A6A3A]" />
                <span>concierge@valentandco.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: The Collections */}
          <div>
            <h5 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#A8A49C]">
              <li>
                <button 
                  onClick={() => navigateTo('shop', { category: 'perfumes' })} 
                  className="hover:text-white transition cursor-pointer"
                >
                  Niche Fragrances & Extraits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('shop', { category: 'watches' })} 
                  className="hover:text-white transition cursor-pointer"
                >
                  Automatic Dress & Diver Watches
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('shop', { category: 'sunglasses' })} 
                  className="hover:text-white transition cursor-pointer"
                >
                  Italian Acetate Eyewear
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('shop', { category: 'wallets' })} 
                  className="hover:text-white transition cursor-pointer"
                >
                  Full-Grain Leather Wallets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('shop', { category: 'bags' })} 
                  className="hover:text-white transition cursor-pointer"
                >
                  Weekender Duffles & Briefcases
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('shop', { category: 'caps' })} 
                  className="hover:text-white transition cursor-pointer"
                >
                  Minimalist Washed Twill Caps
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Experience */}
          <div>
            <h5 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Client Service
            </h5>
            <ul className="space-y-2.5 text-xs text-[#A8A49C]">
              <li>
                <button 
                  onClick={() => navigateTo('order-lookup')} 
                  className="hover:text-white transition cursor-pointer flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-[#9A6A3A]" />
                  <span>Track Your Order</span>
                </button>
              </li>
              <li>
                <span className="text-[#A8A49C]">Cash on Delivery Coverage</span>
              </li>
              <li>
                <span className="text-[#A8A49C]">Gift Packaging & Cards</span>
              </li>
              <li>
                <span className="text-[#A8A49C]">Care & Maintenance Guides</span>
              </li>
              <li>
                <span className="text-[#A8A49C]">Authenticity Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Admin & Direct WhatsApp */}
          <div>
            <h5 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Direct Contact
            </h5>
            <p className="text-xs text-[#A8A49C] mb-4 leading-relaxed">
              Need assistance placing an order or selecting a fragrance? Chat with our specialist on WhatsApp.
            </p>
            <a
              href="https://wa.me/8801648339833?text=Hello%20Valent%20%26%20Co.%2C%20I%20would%20like%20to%20inquire%20about%20a%20product."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] px-3.5 py-2 rounded-lg text-xs font-medium hover:bg-[#25D366]/30 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-[#2D2B28] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6E6A64]">
          <p>© {new Date().getFullYear()} VALENT & CO. Luxury Lifestyle Ltd. All rights reserved. Dhaka, Bangladesh.</p>
          <div className="flex items-center gap-6 mt-3 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>COD Delivery Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
