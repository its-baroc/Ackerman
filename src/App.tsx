import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { PageNavigator } from './components/PageNavigator';
import { PageView } from './components/PageView';
import { MenuItemRow } from './components/MenuItemRow';
import { OrderDrawer } from './components/OrderDrawer';
import { OwnerExportModal } from './components/OwnerExportModal';
import { MENU_PAGES_CONFIG, MENU_ITEMS } from './data/menuData';
import { MenuItem, OrderItem, LanguageMode } from './types';
import {
  ShoppingBag,
  Search,
} from 'lucide-react';

export function App() {
  // App state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'pages' | 'all'>('pages');
  const [language, setLanguage] = useState<LanguageMode>('both');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tableNumber, setTableNumber] = useState<string>('Table 1');

  // Table order mapping: itemId -> quantity
  const [orderMap, setOrderMap] = useState<Record<string, number>>({});
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState<boolean>(false);

  // Detect table or export flag from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTable = params.get('table');
      if (urlTable) {
        setTableNumber(urlTable);
      }
      const urlPage = params.get('page');
      if (urlPage && !isNaN(Number(urlPage))) {
        const p = Number(urlPage);
        if (p >= 1 && p <= 9) setCurrentPage(p);
      }
      if (params.get('export') || params.get('admin') || params.get('download')) {
        setIsOwnerModalOpen(true);
      }
    }
  }, []);

  // Add / remove from order
  const handleAddToOrder = (item: MenuItem) => {
    setOrderMap((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleRemoveFromOrder = (itemId: string) => {
    setOrderMap((prev) => {
      const next = { ...prev };
      if (!next[itemId]) return prev;
      if (next[itemId] <= 1) {
        delete next[itemId];
      } else {
        next[itemId] -= 1;
      }
      return next;
    });
  };

  const handleClearOrder = () => {
    setOrderMap({});
  };

  // Convert order map to OrderItem array
  const orderItems: OrderItem[] = useMemo(() => {
    return Object.entries(orderMap)
      .map(([id, quantity]) => {
        const item = MENU_ITEMS.find((it) => it.id === id);
        if (!item || quantity <= 0) return null;
        return { item, quantity };
      })
      .filter((entry): entry is OrderItem => entry !== null);
  }, [orderMap]);

  const orderCount = useMemo(() => {
    return Object.values(orderMap).reduce((a, b) => a + b, 0);
  }, [orderMap]);

  const orderTotal = useMemo(() => {
    return orderItems.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  }, [orderItems]);

  // Filtered items when search is active
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return MENU_ITEMS.filter((item) => {
      const en = item.nameEn.toLowerCase();
      const am = item.nameAm.toLowerCase();
      const descEn = (item.descriptionEn || '').toLowerCase();
      const descAm = (item.descriptionAm || '').toLowerCase();
      return (
        en.includes(q) ||
        am.includes(q) ||
        descEn.includes(q) ||
        descAm.includes(q)
      );
    });
  }, [searchQuery]);

  const activePageConfig = useMemo(() => {
    return MENU_PAGES_CONFIG.find((p) => p.pageNumber === currentPage) || MENU_PAGES_CONFIG[0];
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-amber-600 selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Sticky White Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        orderCount={orderCount}
        orderTotal={orderTotal}
        onOpenOrder={() => setIsOrderOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
      />

      {/* Page Navigator bar for both Page-by-Page and One-Page Scroll quick jump */}
      {!searchQuery && (
        <PageNavigator
          currentPage={currentPage}
          onSelectPage={(p) => {
            if (viewMode === 'pages') {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              const el = document.getElementById(`page-${p}`);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          language={language}
          viewMode={viewMode}
        />
      )}

      {/* Main Content Area - perfectly sized to screen width */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Search Results Display */}
        {searchQuery.trim() ? (
          <div className="space-y-4">
            <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-center justify-between shadow-xs">
              <div>
                <h2 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-[11px] text-stone-500">
                  Found {searchResults.length} matching menu dishes
                </p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-amber-800 hover:text-amber-950 underline font-semibold"
              >
                Clear
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-16 text-stone-400 bg-white rounded-xl border border-stone-200">
                <Search className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                <p className="font-serif text-base text-stone-700">No dishes found</p>
                <p className="text-xs text-stone-400 mt-0.5">
                  Try searching for "Kitfo", "Tibs", "Burger", "Juice", "Wine" or "ቡና"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {searchResults.map((item) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    quantityInOrder={orderMap[item.id] || 0}
                    onAdd={handleAddToOrder}
                    onRemove={handleRemoveFromOrder}
                    language={language}
                  />
                ))}
              </div>
            )}
          </div>
        ) : viewMode === 'pages' ? (
          /* Single Page View: exactly one picture per page, featuring a dish present on that page */
          <div>
            <PageView
              page={activePageConfig}
              orderMap={orderMap}
              onAdd={handleAddToOrder}
              onRemove={handleRemoveFromOrder}
              language={language}
              onNextPage={() => {
                if (currentPage < 9) {
                  setCurrentPage(currentPage + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
          </div>
        ) : (
          /* All 9 Pages Mode: each page section has its single hero photo of a dish on that page */
          <div className="space-y-6">
            <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between shadow-xs">
              <div>
                <h2 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                  Complete Baroc Hotel Menu (Pages 1 to 9)
                </h2>
                <p className="text-[11px] text-stone-500">
                  All 9 pages • One picture per page
                </p>
              </div>
              <button
                onClick={() => setViewMode('pages')}
                className="text-xs text-amber-800 hover:text-amber-950 underline font-semibold"
              >
                Switch to Single Page
              </button>
            </div>

            {MENU_PAGES_CONFIG.map((page) => (
              <PageView
                key={page.pageNumber}
                page={page}
                orderMap={orderMap}
                onAdd={handleAddToOrder}
                onRemove={handleRemoveFromOrder}
                language={language}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Bottom Action Bar on Mobile */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 flex items-center gap-2">
        <button
          onClick={() => setIsOrderOpen(true)}
          className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-lg flex items-center justify-center gap-2 text-xs font-bold active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>
            {orderCount > 0 ? `View Order (${orderCount}) • ${orderTotal.toLocaleString()} ETB` : 'View Table Order'}
          </span>
        </button>
      </div>

      {/* Hotel Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 px-4 text-center text-xs text-stone-500 mt-8 pb-20 sm:pb-6">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="font-serif text-base font-bold text-stone-800 tracking-wider uppercase">
            BAROC HOTEL & RESTAURANT
          </div>
          <p className="text-stone-500 text-[11px]">
            ባሮክ ሆቴል • Authentic Ethiopian Cuisine • Fasting Delicacies • Fine Beverages
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <OrderDrawer
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        orderItems={orderItems}
        onAdd={handleAddToOrder}
        onRemove={handleRemoveFromOrder}
        onClear={handleClearOrder}
        tableNumber={tableNumber}
        language={language}
      />

      {/* Secret Owner Export Modal (opened via triple-tapping B logo or ?export=1) */}
      <OwnerExportModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
      />
    </div>
  );
}

export default App;
