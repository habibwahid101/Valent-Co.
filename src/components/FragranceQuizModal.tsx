import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const FragranceQuizModal: React.FC = () => {
  const { 
    isFragranceQuizOpen, 
    setIsFragranceQuizOpen, 
    products, 
    navigateTo, 
    addToCart,
    formatBDT 
  } = useShop();

  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string>('Unisex');
  const [selectedMood, setSelectedMood] = useState<string>('Warm & Sensual');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Evening Gala');

  if (!isFragranceQuizOpen) return null;

  const perfumes = products.filter(p => p.category === 'perfumes');

  const handleReset = () => {
    setStep(1);
    setSelectedGender('Unisex');
    setSelectedMood('Warm & Sensual');
    setSelectedOccasion('Evening Gala');
  };

  // Find matching perfume
  let matchedProduct: Product = perfumes[0];
  if (selectedMood.includes('Fresh') || selectedOccasion.includes('Daytime')) {
    matchedProduct = perfumes.find(p => p.slug.includes('riviera') || p.fragranceSpecs?.fragranceFamily.includes('Fresh')) || perfumes[0];
  } else if (selectedMood.includes('Opulent') || selectedOccasion.includes('Wedding')) {
    matchedProduct = perfumes.find(p => p.slug.includes('oud') || p.fragranceSpecs?.fragranceFamily.includes('Amber')) || perfumes[0];
  } else if (selectedMood.includes('Romantic') || selectedMood.includes('Floral')) {
    matchedProduct = perfumes.find(p => p.slug.includes('rose') || p.fragranceSpecs?.fragranceFamily.includes('Floral')) || perfumes[0];
  } else {
    matchedProduct = perfumes.find(p => p.slug.includes('no-07')) || perfumes[0];
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsFragranceQuizOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-[#FAF9F6] w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-[#E8E5DE] p-6 sm:p-8 animate-in zoom-in-95 duration-200">
          
          <button
            onClick={() => setIsFragranceQuizOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-[#6B6864] hover:text-[#1C1B19] hover:bg-[#F4F2EB] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1C1B19] text-[#9A6A3A] mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#1C1B19]">
              Signature Olfactory Match
            </h3>
            <p className="text-xs text-[#6B6864] mt-1">
              Answer 3 curated questions to discover the bespoke extrait tailored to your personality.
            </p>
          </div>

          {/* Step 1: Persona */}
          {step === 1 && (
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A6A3A] block text-center">
                Step 1 of 3: Preferred Silhouette
              </span>
              <h4 className="text-base font-medium text-center text-[#1C1B19]">
                Whom are you selecting this fragrance for?
              </h4>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'Unisex', label: 'Unisex / Universal', desc: 'Balanced, enigmatic & modern' },
                  { id: 'Men', label: 'Masculine Aura', desc: 'Woody, spicy, commanding' },
                  { id: 'Women', label: 'Feminine Seduction', desc: 'Velvet floral, amber, graceful' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGender(item.id)}
                    className={`p-4 rounded-lg border text-left flex flex-col justify-between transition cursor-pointer ${
                      selectedGender === item.id 
                        ? 'border-[#1C1B19] bg-white ring-1 ring-[#1C1B19] shadow-sm' 
                        : 'border-[#D9D5CC] bg-[#F4F2EB]/50 hover:bg-[#F4F2EB]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#1C1B19]">{item.label}</span>
                    <span className="text-[10px] text-[#6B6864] mt-2 leading-tight">{item.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-[#1C1B19] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 hover:bg-[#2A2927] transition cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Vibe / Mood */}
          {step === 2 && (
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A6A3A] block text-center">
                Step 2 of 3: Olfactory Atmosphere
              </span>
              <h4 className="text-base font-medium text-center text-[#1C1B19]">
                What mood or impression do you wish to project?
              </h4>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'Warm & Sensual', title: 'Smoky Sandalwood & Vanilla', desc: 'Intoxicating, warm cardamom and bourbon vanilla trail.' },
                  { id: 'Opulent & Regal', title: 'Aged Oud & Saffron Gold', desc: 'Commanding royal presence with agarwood and rose.' },
                  { id: 'Fresh & Crisp', title: 'Italian Bergamot & Vetiver', desc: 'Invigorating coastal breeze and clean citrus elegance.' },
                  { id: 'Velvet Floral', title: 'Midnight Rose & Praline Amber', desc: 'Sensual, enigmatic evening romance.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMood(item.id)}
                    className={`p-4 rounded-lg border text-left flex flex-col justify-between transition cursor-pointer ${
                      selectedMood === item.id 
                        ? 'border-[#1C1B19] bg-white ring-1 ring-[#1C1B19] shadow-sm' 
                        : 'border-[#D9D5CC] bg-[#F4F2EB]/50 hover:bg-[#F4F2EB]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#1C1B19]">{item.title}</span>
                    <span className="text-[10px] text-[#6B6864] mt-1.5 leading-normal">{item.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#6B6864] hover:text-[#1C1B19] underline cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-[#1C1B19] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 hover:bg-[#2A2927] transition cursor-pointer"
                >
                  <span>Final Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Occasion */}
          {step === 3 && (
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A6A3A] block text-center">
                Step 3 of 3: Setting & Ritual
              </span>
              <h4 className="text-base font-medium text-center text-[#1C1B19]">
                When will you wear this fragrance most often?
              </h4>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'Evening Gala', title: 'Nocturnal Evenings & Dinners', desc: 'Sophisticated dinners, black-tie, lounge evenings.' },
                  { id: 'Wedding Celebration', title: 'Grand Celebrations & Weddings', desc: 'Rich occasions where projecting majesty is essential.' },
                  { id: 'Daytime Executive', title: 'Office, Meetings & Daytime', desc: 'Clean, professional presence with crisp projection.' },
                  { id: 'Intimate Encounters', title: 'Date Nights & Special Moments', desc: 'Close-quarters magnetic attraction.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedOccasion(item.id)}
                    className={`p-4 rounded-lg border text-left flex flex-col justify-between transition cursor-pointer ${
                      selectedOccasion === item.id 
                        ? 'border-[#1C1B19] bg-white ring-1 ring-[#1C1B19] shadow-sm' 
                        : 'border-[#D9D5CC] bg-[#F4F2EB]/50 hover:bg-[#F4F2EB]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#1C1B19]">{item.title}</span>
                    <span className="text-[10px] text-[#6B6864] mt-1.5 leading-normal">{item.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-[#6B6864] hover:text-[#1C1B19] underline cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 bg-[#9A6A3A] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 hover:bg-[#7A5128] transition cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal My Match</span>
                </button>
              </div>
            </div>
          )}

          {/* Result: Match Reveal */}
          {step === 4 && matchedProduct && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A6A3A] bg-[#9A6A3A]/10 px-3 py-1 rounded-full inline-block">
                  98% Compatibility Match
                </span>
                <h4 className="font-serif text-2xl font-semibold text-[#1C1B19] mt-2">
                  Your Signature Extrait
                </h4>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E8E5DE] flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={matchedProduct.images[0]}
                  alt={matchedProduct.name}
                  className="w-28 h-36 object-cover rounded-lg bg-[#F4F2EB] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 space-y-1.5 text-center sm:text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#9A6A3A] font-bold block">
                    {matchedProduct.brand} • {matchedProduct.fragranceSpecs?.fragranceFamily}
                  </span>
                  <h5 className="font-serif text-lg font-bold text-[#1C1B19]">
                    {matchedProduct.name}
                  </h5>
                  <p className="text-xs text-[#6B6864] line-clamp-2">
                    {matchedProduct.subtitle}
                  </p>
                  
                  {matchedProduct.fragranceSpecs && (
                    <div className="text-[11px] text-[#4A4744] pt-1">
                      <strong>Notes:</strong> {matchedProduct.fragranceSpecs.topNotes[0]}, {matchedProduct.fragranceSpecs.heartNotes[0]}, {matchedProduct.fragranceSpecs.baseNotes[0]}
                    </div>
                  )}

                  <div className="text-base font-bold text-[#1C1B19] pt-1">
                    {formatBDT(matchedProduct.price)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(matchedProduct, matchedProduct.variants[0], 1);
                    setIsFragranceQuizOpen(false);
                  }}
                  className="py-3 bg-[#1C1B19] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#2A2927] transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => {
                    setIsFragranceQuizOpen(false);
                    navigateTo('product-detail', { product: matchedProduct });
                  }}
                  className="py-3 bg-white border border-[#D9D5CC] text-[#1C1B19] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#F4F2EB] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-[#6B6864] hover:text-[#1C1B19] inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Scent Quiz</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
