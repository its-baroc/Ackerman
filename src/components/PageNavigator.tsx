import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MENU_PAGES_CONFIG } from '../data/menuData';
import { LanguageMode } from '../types';

interface PageNavigatorProps {
  currentPage: number;
  onSelectPage: (page: number) => void;
  language: LanguageMode;
  viewMode?: 'pages' | 'all';
}

export const PageNavigator: React.FC<PageNavigatorProps> = ({
  currentPage,
  onSelectPage,
  language,
  viewMode = 'pages',
}) => {
  return (
    <div className="bg-white border-b border-stone-200 py-2 px-3 sticky top-[108px] sm:top-[98px] z-30 shadow-2xs w-full max-w-full overflow-hidden">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Navigation Arrows (shown in Page by Page mode) */}
        {viewMode === 'pages' ? (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onSelectPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-1 rounded-md border flex items-center justify-center transition ${
                currentPage === 1
                  ? 'border-stone-200 text-stone-300 cursor-not-allowed bg-stone-50'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100 active:scale-95'
              }`}
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {currentPage}/9
            </span>

            <button
              onClick={() => onSelectPage(Math.min(9, currentPage + 1))}
              disabled={currentPage === 9}
              className={`p-1 rounded-md border flex items-center justify-center transition ${
                currentPage === 9
                  ? 'border-stone-200 text-stone-300 cursor-not-allowed bg-stone-50'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100 active:scale-95'
              }`}
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200 flex-shrink-0">
            <span>Scroll Menu:</span>
          </div>
        )}

        {/* Scrollable Page Tabs (1 to 9) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none flex-1 max-w-full">
          {MENU_PAGES_CONFIG.map((page) => {
            const isSelected = viewMode === 'pages' && page.pageNumber === currentPage;
            return (
              <button
                key={page.pageNumber}
                onClick={() => onSelectPage(page.pageNumber)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  isSelected
                    ? 'bg-amber-700 text-white font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  isSelected ? 'bg-white text-amber-800' : 'bg-stone-200 text-stone-700'
                }`}>
                  {page.pageNumber}
                </span>
                <span className="whitespace-nowrap text-[11px]">
                  {page.pageNumber === 1 && 'Tibs & Kitfo'}
                  {page.pageNumber === 2 && 'Burgers & Veg'}
                  {page.pageNumber === 3 && 'Sandwiches & Fasting'}
                  {page.pageNumber === 4 && 'Pizza & Juice'}
                  {page.pageNumber === 5 && 'Hot Drinks & Buna'}
                  {page.pageNumber === 6 && 'Beers & Wine'}
                  {page.pageNumber === 7 && 'Whiskey'}
                  {page.pageNumber === 8 && 'Vodka & Spirits'}
                  {page.pageNumber === 9 && 'Breakfast'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
