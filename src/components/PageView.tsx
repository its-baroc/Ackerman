import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MenuPageDef, getMenuItemById } from '../data/menuData';
import { MenuItemRow } from './MenuItemRow';
import { MenuItem, LanguageMode } from '../types';

interface PageViewProps {
  page: MenuPageDef;
  orderMap: Record<string, number>;
  onAdd: (item: MenuItem) => void;
  onRemove: (itemId: string) => void;
  language: LanguageMode;
  onNextPage?: () => void;
}

export const PageView: React.FC<PageViewProps> = ({
  page,
  orderMap,
  onAdd,
  onRemove,
  language,
  onNextPage,
}) => {
  return (
    <article
      id={`page-${page.pageNumber}`}
      className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden mb-6 w-full max-w-full transition-all scroll-mt-32"
    >
      {/* Top Banner: EXACTLY ONE picture for this page, showing a dish present on this page */}
      <div className="relative h-48 sm:h-64 md:h-72 w-full overflow-hidden bg-stone-100 group">
        <img
          src={page.featuredImageUrl}
          alt={page.featuredDishNameEn}
          className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
          loading="lazy"
        />
        {/* Soft readable gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

        {/* Top Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center">
          <span className="px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-amber-900 font-mono text-xs font-bold shadow-xs">
            PAGE {page.pageNumber} OF 9
          </span>
        </div>

        {/* Bottom caption identifying the single featured dish on this page */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <div className="inline-block bg-amber-700/90 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded mb-1">
            Featured on this page: {page.featuredDishNameEn} ({page.featuredDishNameAm})
          </div>

          <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm leading-tight">
            {language === 'am' ? page.titleAm : page.titleEn}
          </h2>
          {language === 'both' && (
            <p className="text-xs sm:text-sm font-serif text-amber-200 font-medium">
              {page.titleAm}
            </p>
          )}
          <p className="text-[11px] text-stone-200 mt-0.5 max-w-xl line-clamp-1 opacity-90">
            {language === 'am' ? page.subtitleAm : page.subtitleEn}
          </p>
        </div>
      </div>

      {/* Page Body: List of all categories and dishes on this page */}
      <div className="p-3 sm:p-5 space-y-6 w-full max-w-full">
        {page.categoriesInPage.map((cat, idx) => (
          <section key={idx} className="space-y-2">
            {/* Category Subheader */}
            <div className="flex items-center gap-2 pb-1.5 border-b-2 border-amber-500">
              <div className="w-2 h-2 rotate-45 bg-amber-600 flex-shrink-0" />
              <h3 className="font-serif font-bold text-sm sm:text-base text-amber-950 tracking-wide">
                {language === 'am' ? cat.titleAm : cat.titleEn}
                {language === 'both' && (
                  <span className="text-stone-500 font-sans font-normal text-xs ml-1.5">
                    / {cat.titleAm}
                  </span>
                )}
              </h3>
              <span className="ml-auto text-[11px] font-mono text-stone-500">
                {cat.itemIds.length} items
              </span>
            </div>

            {/* List of dish rows */}
            <div className="grid grid-cols-1 gap-2 w-full">
              {cat.itemIds.map((itemId) => {
                const item = getMenuItemById(itemId);
                if (!item) return null;
                const quantityInOrder = orderMap[item.id] || 0;
                return (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    quantityInOrder={quantityInOrder}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    language={language}
                  />
                );
              })}
            </div>
          </section>
        ))}

        {/* Bottom Page Footer with navigation */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-2 text-xs text-stone-500">
          <span className="text-[11px] font-mono text-stone-400">
            BAROC HOTEL • PAGE {page.pageNumber}
          </span>

          {onNextPage && page.pageNumber < 9 && (
            <button
              onClick={onNextPage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-600 text-stone-700 hover:text-white font-semibold transition active:scale-95 text-xs ml-auto"
            >
              <span>Next Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
