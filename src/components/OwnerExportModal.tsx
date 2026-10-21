import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { generateStandaloneGithubHtml } from '../utils/generateGithubHtml';

interface OwnerExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerExportModal: React.FC<OwnerExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  if (!isOpen) return null;

  const htmlContent = generateStandaloneGithubHtml();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = htmlContent;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch {
      window.open('/menu.html', '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-amber-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold text-sm">
              B
            </div>
            <div>
              <h2 className="font-serif font-black text-base text-stone-900 leading-tight">
                Owner File Export
              </h2>
              <p className="text-[11px] text-stone-500 font-medium">
                Hidden owner menu • Not visible to customers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs text-stone-700">
          <p className="text-stone-600 leading-relaxed">
            Here are the fail-proof ways to save your <strong>index.html</strong> file to your phone, GitHub, or Google Drive:
          </p>

          {/* Action 1: Copy Code */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 flex items-center gap-1.5">
                <Copy className="w-4 h-4 text-amber-700" />
                Way 1: Copy Entire HTML (Easiest for GitHub on Phone)
              </span>
              <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded">
                Recommended
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Copies all ~64KB of self-contained code in 1 tap. Then go to GitHub &rarr; Add file &rarr; Create new file (`index.html`) &rarr; Paste &rarr; Commit!
            </p>
            <button
              onClick={handleCopy}
              className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs transition shadow-xs ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-amber-700 hover:bg-amber-800 text-white active:scale-98'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Tap to Copy Full Menu Code</span>
                </>
              )}
            </button>
          </div>

          {/* Action 2: Download Direct */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2">
            <span className="font-bold text-stone-900 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-amber-700" />
              Way 2: Direct File Download
            </span>
            <p className="text-[11px] text-stone-500">
              Saves `index.html` directly to your phone's Downloads or PC.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-900 text-white font-semibold flex items-center justify-center gap-1.5 active:scale-98"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save index.html</span>
              </button>
              <a
                href="/menu.html"
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-semibold flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>

          {/* Action 3: Inspect Raw Code */}
          <div className="border-t border-stone-200 pt-3">
            <button
              onClick={() => setShowCode(!showCode)}
              className="text-stone-500 hover:text-stone-900 flex items-center gap-1 text-[11px] font-semibold"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{showCode ? 'Hide raw HTML box' : 'View / Select raw HTML text directly'}</span>
            </button>

            {showCode && (
              <div className="mt-2 space-y-1.5">
                <textarea
                  readOnly
                  value={htmlContent}
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  rows={6}
                  className="w-full bg-stone-900 text-stone-200 p-2.5 rounded-lg font-mono text-[10px] focus:outline-none"
                />
                <p className="text-[10px] text-stone-400">
                  Tap text to select all, then tap Copy.
                </p>
              </div>
            )}
          </div>

          {/* Quick GitHub Instructions */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3 text-[11px] space-y-1 text-stone-700">
            <strong className="text-amber-950 font-bold block">
              📌 Quick GitHub 30-Second Guide:
            </strong>
            <ol className="list-decimal list-inside space-y-0.5 text-stone-600">
              <li>Tap <strong>"Copy Full Menu Code"</strong> above.</li>
              <li>Open your repository on GitHub.</li>
              <li>Tap <strong>Add file &rarr; Create new file</strong>, name it <code>index.html</code>.</li>
              <li>Paste and tap <strong>Commit changes</strong>.</li>
              <li>In repo Settings &rarr; Pages, turn on GitHub Pages for a free QR link!</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-[10px] text-stone-400">
            Tip: Tap "B" logo 3 times anytime to reopen this
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
