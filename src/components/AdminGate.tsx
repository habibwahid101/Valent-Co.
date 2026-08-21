import React, { useState } from 'react';
import { Lock, LogOut } from 'lucide-react';
import { useShop } from '../context/ShopContext';

/**
 * Gates access to the /admin view behind a real Cognito sign-in.
 * Renders children only once ShopContext holds a valid admin session.
 */
export const AdminGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminEmail, adminSignInAction, adminSignOutAction, navigateTo } = useShop();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (adminEmail) {
    return (
      <div>
        <div className="flex items-center justify-between gap-3 bg-[#1C1B19] text-[#D9D5CC] text-[11px] px-4 py-2">
          <span>Signed in as <strong className="text-white">{adminEmail}</strong></span>
          <button
            onClick={() => { adminSignOutAction(); navigateTo('home'); }}
            className="flex items-center gap-1.5 uppercase tracking-wider font-bold text-white hover:text-[#9A6A3A] transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
        {children}
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminSignInAction(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-[#E8E5DE] rounded-2xl shadow-sm p-8 space-y-5"
      >
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#1C1B19] text-[#9A6A3A] mb-1">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1C1B19]">Admin Sign-In</h1>
          <p className="text-xs text-[#6B6864]">Valent & Co. back office — authorized staff only.</p>
        </div>

        {error && (
          <div className="text-xs bg-rose-50 text-rose-800 border border-rose-100 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider font-bold text-[#6B6864] block mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm p-3 rounded-lg border border-[#D9D5CC] bg-white focus:outline-none focus:border-[#1C1B19] text-[#1C1B19]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider font-bold text-[#6B6864] block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm p-3 rounded-lg border border-[#D9D5CC] bg-white focus:outline-none focus:border-[#1C1B19] text-[#1C1B19]"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-[#1C1B19] hover:bg-[#2A2927] disabled:opacity-60 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="w-full text-center text-[11px] text-[#8C8880] hover:text-[#1C1B19] transition cursor-pointer"
        >
          ← Back to storefront
        </button>
      </form>
    </div>
  );
};
