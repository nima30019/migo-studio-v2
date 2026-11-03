'use client';

import React from 'react';
import { getAssetPath } from '@/utils/asset';
import { useDirection } from '@/components/direction/DirectionProvider';

interface MigoAiLauncherProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MigoAiLauncher({ isOpen, onClick }: MigoAiLauncherProps) {
  const { isRtl } = useDirection();
  const logoEmblem = getAssetPath('/brand/instagram/migo-instagram-avatar-emblem-dark.png');
  const logoFallback = getAssetPath('/migo-logo-transparent.png');

  return (
    <div
      className={`fixed bottom-6 ${
        isRtl ? 'left-6' : 'right-6'
      } z-50 flex items-center gap-3`}
    >
      {/* Floating Tooltip Pill */}
      {!isOpen && (
        <div
          onClick={onClick}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1017]/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl cursor-pointer hover:border-brand-orange/50 transition-all duration-300 group animate-fade-in"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-200 group-hover:text-white">
            {isRtl ? 'گفتگو با مشاور MIGO AI' : 'Ask MIGO AI'}
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-400/15 text-emerald-400 border border-emerald-400/30">
            {isRtl ? 'پاسخ آنی' : 'Instant AI'}
          </span>
        </div>
      )}

      {/* Main Launcher Button */}
      <button
        type="button"
        onClick={onClick}
        aria-label={
          isOpen
            ? isRtl
              ? 'بستن دستیار هوش مصنوعی MIGO'
              : 'Close MIGO AI Assistant'
            : isRtl
            ? 'باز کردن دستیار هوش مصنوعی MIGO'
            : 'Open MIGO AI Assistant'
        }
        className={`relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange ${
          isOpen
            ? 'bg-[#151922] border border-white/20 text-white rotate-90 shadow-2xl'
            : 'bg-gradient-to-br from-[#1A1F2C] to-[#0A0C11] border border-brand-orange/40 hover:border-brand-orange text-white hover:scale-105 shadow-[0_0_25px_rgba(255,120,31,0.35)]'
        }`}
      >
        {/* Glow halo */}
        <span className="absolute inset-0 rounded-2xl bg-brand-orange/20 blur-md pointer-events-none" />

        {/* MIGO Emblem Image */}
        <div className="relative z-10 flex items-center justify-center w-9 h-9 overflow-hidden rounded-lg">
          <img
            src={logoEmblem}
            alt="MIGO AI"
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = logoFallback;
            }}
          />
        </div>

        {/* Live Status indicator dot */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#090B0F] bg-emerald-400" />
      </button>
    </div>
  );
}
