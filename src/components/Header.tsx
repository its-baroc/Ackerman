import React from 'react';
import { ShoppingBag, Search, X, BookOpen, Layers } from 'lucide-react';
import { LanguageMode } from '../types';

interface HeaderProps {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  tableNumber: string;
  setTableNumber: (table: string) => void;
  orderCount: number;
  orderTotal: number;
  onOpenOrder: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'pages' | 'all';
  setViewMode: (mode: 'pages' | 'all') => void;
  onOpenOwnerModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  tableNumber,
  setTableNumber,
  orderCount,
  orderTotal,
  onOpenOrder,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onOpenOwnerModal,
}) => {
  const [logoTapCount, setLogoTapCount] = React.useState(0);

  const handleLogoTap = () => {
    const next = logoTapCount + 1;
    if (next >= 3) {
      setLogoTapCount(0);
      onOpenOwnerModal?.();
    } else {
      setLogoTapCount(next);
      setTimeout(() => setLogoTapCount(0), 3000);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs w-full max-w-full overflow-hidden">
      {/* Top golden accent line */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600" />

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5">
        {/* Row 1: Brand & Top Action Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Hotel Brand: ALWAYS fully visible, unclipped and prominent */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={handleLogoTap}
              className="w-10 h-10 rounded-xl bg-amber-700 text-white flex-shrink-0 flex items-center justify-center font-serif font-black text-xl shadow-xs border border-amber-800 cursor-pointer active:scale-95 transition-transform"
              title="Baroc Hotel"
            >
              B
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-2xl font-black tracking-wide text-stone-900 uppercase leading-none whitespace-nowrap">
                  BAROC HOTEL
                </h1>
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  ባሮክ ሆቴል
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-tight mt-0.5">
                Restaurant & Hotel Menu • ዲጂታል ሜኑ
              </p>
            </div>
          </div>

          {/* Right Controls: Table, Lang & Order */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Table Number Selector */}
            <div className="flex items-center bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs">
              <span className="text-stone-500 mr-1 hidden md:inline">Table:</span>
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="bg-transparent text-amber-900 font-bold focus:outline-none cursor-pointer text-xs"
                title="Select your table number"
              >
                {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={`Table ${num}`}>
                    Table {num}
                  </option>
                ))}
                <option value="VIP Lounge">VIP Lounge</option>
                <option value="Room Service">Room Service</option>
                <option value="Bar Counter">Bar Counter</option>
              </select>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-stone-100 border border-stone-200 rounded-lg p-0.5 text-xs font-medium">
              <button
                onClick={() => setLanguage('both')}
                className={`px-1.5 sm:px-2 py-1 rounded transition-colors text-[11px] ${
                  language === 'both' ? 'bg-amber-700 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Both languages"
              >
                Both
              </button>
              <button
                onClick={() => setLanguage('am')}
                className={`px-1.5 sm:px-2 py-1 rounded transition-colors text-[11px] ${
                  language === 'am' ? 'bg-amber-700 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="አማርኛ"
              >
                አማ
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 sm:px-2 py-1 rounded transition-colors text-[11px] ${
                  language === 'en' ? 'bg-amber-700 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Order Tray button */}
            <button
              onClick={onOpenOrder}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition active:scale-95"
              aria-label="View table order"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Order</span>
              <span className="bg-white text-amber-900 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                {orderCount}
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: Search Bar + View Mode Toggle Switcher */}
        <div className="mt-2.5 pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-2">
          {/* Search input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Kitfo, ክትፎ, Tibs, Burger, Juice)..."
              className="w-full bg-stone-50 text-stone-900 placeholder-stone-400 text-xs pl-8 pr-7 py-1.5 rounded-lg border border-stone-200 focus:outline-none focus:border-amber-600 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Switcher Toggle: [ Page by Page | One Page Scroll ] */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-1.5">
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-semibold w-full sm:w-auto justify-center">
              <button
                onClick={() => setViewMode('pages')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1 rounded-md transition ${
                  viewMode === 'pages'
                    ? 'bg-white text-amber-900 shadow-xs font-bold border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Browse menu page by page"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span className="whitespace-nowrap">Page by Page</span>
              </button>

              <button
                onClick={() => setViewMode('all')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1 rounded-md transition ${
                  viewMode === 'all'
                    ? 'bg-white text-amber-900 shadow-xs font-bold border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="View full menu in one continuous scrollable page"
              >
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span className="whitespace-nowrap">One Page Scroll</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
