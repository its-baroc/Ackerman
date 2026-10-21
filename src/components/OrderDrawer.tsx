import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Copy, Check, Printer, Smartphone, UtensilsCrossed } from 'lucide-react';
import { MenuItem, OrderItem, LanguageMode } from '../types';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
  tableNumber: string;
  language: LanguageMode;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  orderItems,
  onAdd,
  onRemove,
  onClear,
  tableNumber,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const [showWaiterMode, setShowWaiterMode] = useState(false);
  const [tableNote, setTableNote] = useState('');

  if (!isOpen) return null;

  const totalETB = orderItems.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const totalItemCount = orderItems.reduce((sum, entry) => sum + entry.quantity, 0);

  // Copy order formatted text
  const handleCopyOrder = () => {
    let text = `🏨 BAROC HOTEL & RESTAURANT\n📍 ${tableNumber}\n-----------------------------------\n`;
    orderItems.forEach((entry) => {
      text += `• ${entry.item.nameEn} (${entry.item.nameAm}) x${entry.quantity} - ${(entry.item.price * entry.quantity).toLocaleString()} ETB\n`;
    });
    if (tableNote.trim()) {
      text += `📝 Notes: ${tableNote}\n`;
    }
    text += `-----------------------------------\n💰 Total: ${totalETB.toLocaleString()} ETB (ብር)\nTime: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-sm sm:max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-stone-200">
        {/* Drawer Header */}
        <div className="p-3.5 sm:p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-stone-900">
                Table Order / የጠረጴዛ ትዕዛዝ
              </h3>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-xs font-mono font-bold">
                {tableNumber}
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Review before showing the waiter
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
            aria-label="Close order drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Waiter Presentation View */}
        {showWaiterMode ? (
          <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-3">
            <div className="text-center pb-3 border-b border-stone-200 bg-white p-3 rounded-xl border">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-black tracking-wider uppercase">
                Ready for Waiter / ለአስተናጋጅ አሳይ
              </span>
              <h2 className="font-serif text-2xl font-black text-stone-900 mt-1">
                {tableNumber}
              </h2>
              <p className="text-[11px] text-stone-500">Baroc Hotel & Restaurant</p>
            </div>

            <div className="space-y-2">
              {orderItems.map((entry) => (
                <div
                  key={entry.item.id}
                  className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-2 shadow-xs"
                >
                  <div className="min-w-0">
                    <div className="font-serif font-bold text-base text-stone-900 truncate">
                      {entry.item.nameAm}
                    </div>
                    <div className="text-xs text-stone-500 truncate">
                      {entry.item.nameEn}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-200 font-mono font-bold text-sm">
                      x {entry.quantity}
                    </span>
                    <div className="text-[11px] font-mono text-stone-600 mt-0.5">
                      {(entry.item.price * entry.quantity).toLocaleString()} ETB
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {tableNote && (
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <strong>ማስታወሻ / Notes:</strong> {tableNote}
              </div>
            )}

            <div className="p-3 rounded-xl bg-amber-700 text-white font-bold flex items-center justify-between shadow-xs">
              <span className="text-sm uppercase tracking-wider">Total / ጠቅላላ ድምር:</span>
              <span className="font-mono text-lg">{totalETB.toLocaleString()} ብር (ETB)</span>
            </div>

            <button
              onClick={() => setShowWaiterMode(false)}
              className="w-full py-2 rounded-lg bg-stone-200 text-stone-800 font-semibold text-xs hover:bg-stone-300 transition"
            >
              Back to Order List
            </button>
          </div>
        ) : (
          /* Normal Order List */
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
            {orderItems.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <UtensilsCrossed className="w-10 h-10 text-stone-300 mb-2" />
                <h4 className="font-serif font-bold text-stone-700 text-sm">
                  Your table order is empty
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Tap "+" on any dish in the menu to add.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {orderItems.map((entry) => (
                  <div
                    key={entry.item.id}
                    className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate">
                        {language === 'am' ? entry.item.nameAm : entry.item.nameEn}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {entry.item.price.toLocaleString()} ETB each
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="flex items-center bg-white rounded-lg border border-stone-200 p-0.5">
                        <button
                          onClick={() => onRemove(entry.item.id)}
                          className="w-5 h-5 rounded bg-stone-100 text-stone-700 flex items-center justify-center hover:bg-stone-200 text-xs"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-mono font-bold text-xs text-stone-900">
                          {entry.quantity}
                        </span>
                        <button
                          onClick={() => onAdd(entry.item)}
                          className="w-5 h-5 rounded bg-amber-600 text-white font-bold flex items-center justify-center hover:bg-amber-700 text-xs"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="w-16 text-right font-mono font-bold text-xs text-amber-800">
                        {(entry.item.price * entry.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Special Instructions */}
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Special Instructions / ማስታወሻ:
                  </label>
                  <input
                    type="text"
                    value={tableNote}
                    onChange={(e) => setTableNote(e.target.value)}
                    placeholder="e.g. Extra mitmita, hot water on side..."
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Drawer Footer with Totals and Action Buttons */}
        {!showWaiterMode && orderItems.length > 0 && (
          <div className="p-3.5 border-t border-stone-200 bg-stone-50 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>Items Total ({totalItemCount} items):</span>
              <span className="font-mono font-bold text-base text-amber-900">
                {totalETB.toLocaleString()} ብር (ETB)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowWaiterMode(true)}
                className="py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Show Waiter</span>
              </button>

              <button
                onClick={handleCopyOrder}
                className="py-2 px-3 rounded-lg bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1 hover:text-stone-800 transition"
              >
                <Printer className="w-3 h-3" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClear}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 transition"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear Order</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
