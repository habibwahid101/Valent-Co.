/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { FragranceQuizModal } from './components/FragranceQuizModal';

// Views
import { HomeView } from './components/views/HomeView';
import { ShopView } from './components/views/ShopView';
import { ProductDetailView } from './components/views/ProductDetailView';
import { CartView } from './components/views/CartView';
import { CheckoutView } from './components/views/CheckoutView';
import { OrderSuccessView } from './components/views/OrderSuccessView';
import { OrderLookupView } from './components/views/OrderLookupView';
import { WishlistView } from './components/views/WishlistView';
import { AdminView } from './components/views/AdminView';

// Floating WhatsApp concierge
import { MessageCircle } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeView } = useShop();

  // Scroll to top when activeView changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C1B19] selection:bg-[#9A6A3A] selection:text-white">
      
      {/* Header (Hidden when inside Admin portal for dedicated back-office screen) */}
      {activeView !== 'admin' && <Header />}

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'shop' && <ShopView />}
        {activeView === 'product-detail' && <ProductDetailView />}
        {activeView === 'cart' && <CartView />}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'order-success' && <OrderSuccessView />}
        {activeView === 'order-lookup' && <OrderLookupView />}
        {activeView === 'wishlist' && <WishlistView />}
        {activeView === 'admin' && <AdminView />}
      </main>

      {/* Footer (Hidden inside Admin view) */}
      {activeView !== 'admin' && <Footer />}

      {/* Slide-over Drawers & Interactive Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <FragranceQuizModal />

      {/* Floating WhatsApp Concierge Button */}
      {activeView !== 'admin' && (
        <aside
          aria-label="Direct WhatsApp Concierge"
          className="fixed bottom-6 right-6 z-40"
        >
          <a
            id="whatsapp-concierge-float"
            href="https://wa.me/8801711293847?text=Hello%20Valent%20%26%20Co.%2C%20I%20would%20like%20assistance%20with%20a%20luxury%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fb857] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            title="Chat with Dhaka Concierge"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline whitespace-nowrap">
              WhatsApp Concierge
            </span>
          </a>
        </aside>
      )}

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
