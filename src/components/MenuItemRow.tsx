import React, { useState } from 'react';
import { Plus, Minus, Sparkles, Leaf } from 'lucide-react';
import { MenuItem, LanguageMode } from '../types';

interface MenuItemRowProps {
  item: MenuItem;
  quantityInOrder: number;
  onAdd: (item: MenuItem) => void;
  onRemove: (itemId: string) => void;
  language: LanguageMode;
}

export const MenuItemRow: React.FC<MenuItemRowProps> = ({
  item,
  quantityInOrder,
  onAdd,
  onRemove,
  language,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const formattedPrice = item.price.toLocaleString();

  return (
    <div
      className={`p-2.5 sm:p-3 rounded-xl border transition-colors w-full max-w-full overflow-hidden ${
        quantityInOrder > 0
          ? 'bg-amber-50/70 border-amber-300'
          : 'bg-white hover:bg-stone-50 border-stone-200'
      }`}
    >
      <div className="flex items-center justify-between gap-2 w-full">
        {/* Left Side: Dish Name, Subtitle & Badges */}
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="flex flex-wrap items-center gap-1 mb-0.5">
            {language === 'am' ? (
              <span className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-snug">
                {item.nameAm}
              </span>
            ) : language === 'en' ? (
              <span className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-snug">
                {item.nameEn}
              </span>
            ) : (
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-snug">
                  {item.nameAm}
                </span>
                <span className="text-stone-500 font-medium text-xs">
                  / {item.nameEn}
                </span>
              </div>
            )}

            {/* Badges */}
            {item.isSpecial && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                <Sparkles className="w-2.5 h-2.5" />
                <span>ልዩ</span>
              </span>
            )}
            {item.isFasting && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Leaf className="w-2.5 h-2.5" />
                <span>የጾም</span>
              </span>
            )}
            {item.unit && (
              <span className="px-1 py-0.2 rounded text-[9px] font-mono bg-stone-100 text-stone-600">
                {item.unit}
              </span>
            )}
          </div>

          {/* Description preview */}
          <div className="text-[11px] text-stone-500 leading-tight">
            {showDetails ? (
              <p className="mt-1 text-stone-700 bg-stone-50 p-2 rounded border border-stone-200">
                {language === 'am' ? item.descriptionAm : item.descriptionEn}
                {language === 'both' && item.descriptionAm && item.descriptionEn && (
                  <span className="block mt-0.5 text-stone-500 italic">
                    {item.descriptionEn}
                  </span>
                )}
              </p>
            ) : (
              <span className="line-clamp-1">
                {language === 'am' ? item.descriptionAm : item.descriptionEn}
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Price & Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right">
            <span className="font-mono font-bold text-sm sm:text-base text-amber-800 whitespace-nowrap">
              {formattedPrice}{' '}
              <span className="text-[10px] font-medium text-stone-500 font-sans">
                {language === 'am' ? 'ብር' : 'ETB'}
              </span>
            </span>
          </div>

          {/* Add / Quantity Buttons */}
          <div className="flex items-center">
            {quantityInOrder > 0 ? (
              <div className="flex items-center bg-white border border-stone-300 rounded-lg p-0.5 shadow-xs">
                <button
                  onClick={() => onRemove(item.id)}
                  className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition active:scale-90"
                  aria-label="Decrease"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center font-mono font-bold text-xs text-amber-900">
                  {quantityInOrder}
                </span>
                <button
                  onClick={() => onAdd(item)}
                  className="w-6 h-6 rounded bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition active:scale-90 font-bold"
                  aria-label="Increase"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAdd(item)}
                className="w-7 h-7 sm:w-auto sm:px-2.5 sm:py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition flex items-center justify-center gap-1 active:scale-95"
                title="Add to order"
              >
                <Plus className="w-3.5 h-3.5 text-amber-800" />
                <span className="hidden sm:inline">Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
