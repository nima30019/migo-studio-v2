'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useDirection } from './DirectionProvider';

interface DirectionAwareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function DirectionAwareDrawer({
  isOpen,
  onClose,
  title,
  children,
}: DirectionAwareDrawerProps) {
  const { isRtl } = useDirection();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Drawer position:
  // In RTL, drawer slides in from the right edge
  // In LTR, drawer slides in from the left edge (or right if preferred, but logically consistent)
  const drawerPositionClass = isRtl
    ? 'right-0 border-l border-white/[0.12] shadow-[-20px_0_50px_rgba(0,0,0,0.8)]'
    : 'left-0 border-r border-white/[0.12] shadow-[20px_0_50px_rgba(0,0,0,0.8)]';

  return (
    <div
      role="dialog"
      aria-modal="true"
      id="mobile-navigation-drawer"
      aria-label={title || 'Navigation Drawer'}
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={`fixed top-0 bottom-0 w-[84vw] max-w-sm bg-[#0B0D12] p-6 flex flex-col justify-between z-10 transition-transform duration-300 ease-out ${drawerPositionClass}`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <span className="font-display font-bold text-lg text-white tracking-wider">
            {title || 'MIGO STUDIO'}
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2.5 rounded-xl text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          {children}
        </div>

        <div className="pt-6 border-t border-white/[0.08] text-xs font-mono text-neutral-400 text-center">
          MIGO // V2 EXPERIENTIAL ARCHITECTURE
        </div>
      </div>
    </div>
  );
}
