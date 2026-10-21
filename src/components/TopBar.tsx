import React from 'react';

interface TopBarProps {
  onNavigate: (sectionId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-4 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('hero');
        }}
        className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-neutral-200 transition-colors"
      >
        WebStudio
      </a>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
        <a
          href="#capabilities"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('capabilities');
          }}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          Capabilities
        </a>
        <a
          href="#showcase"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('showcase');
          }}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          Website Types
        </a>
        <a
          href="#sandbox"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('sandbox');
          }}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          Live Sandbox
        </a>
        <a
          href="#builder"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('builder');
          }}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          Prompt Builder
        </a>
        <a
          href="#stack"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('stack');
          }}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          Tech Stack
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onNavigate('builder')}
          className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-white rounded-lg hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-95"
        >
          Tell Me What to Build
        </button>
      </div>
    </header>
  );
};
