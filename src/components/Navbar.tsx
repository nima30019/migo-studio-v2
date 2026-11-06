'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu } from 'lucide-react';
import { NAV_ITEMS, UI_STRINGS } from '@/data/translations';
import { useDirection } from './direction/DirectionProvider';
import { DirectionAwareDrawer } from './direction/DirectionAwareDrawer';
import { DirectionAwareArrow } from './direction/DirectionAwareArrow';
import { SoundToggle, useAudio } from './AudioController';
import { getAssetPath } from '@/utils/asset';

export function Navbar() {
  const { locale, isRtl } = useDirection();
  const pathname = usePathname();
  const { playClick, playHover } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute other locale path
  const targetLocale = locale === 'fa' ? 'en' : 'fa';
  let targetPath = `/${targetLocale}`;
  if (pathname) {
    const stripped = pathname.replace(/^\/(fa|en)/, '');
    targetPath = `/${targetLocale}${stripped || ''}`;
  }

  const logoSrc = getAssetPath('/migo-logo-transparent.png');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090C]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Studio Brand Logo */}
            <Link
              href={`/${locale}`}
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-orange rounded-xl"
            >
              <div className="flex items-center transition-transform duration-200 group-hover:scale-105">
                <img
                  src={logoSrc}
                  alt={isRtl ? 'لوگوی رسمی استودیو MIGO' : 'Official MIGO Studio Logo'}
                  width={80}
                  height={44}
                  decoding="async"
                  className="h-10 sm:h-11 w-auto max-w-[90px] object-contain"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-lg text-white tracking-wider group-hover:text-brand-orange transition-colors">
                    MIGO
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-brand-orange/20 border border-brand-orange/40 text-[9px] font-mono text-brand-orange font-bold">
                    V2
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-mono">
                  {UI_STRINGS.brandTagline[locale]}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#12151B]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08]">
              {NAV_ITEMS.map((item) => {
                const href = item.href(locale);
                const isActive =
                  pathname === href ||
                  (item.key !== 'home' && pathname?.startsWith(href));

                return (
                  <Link
                    key={item.key}
                    href={href}
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 relative ${
                      isActive
                        ? 'text-white bg-brand-orange shadow-[0_0_15px_rgba(255,120,31,0.4)]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {item.key === 'lab' && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 me-1.5 animate-pulse" />
                    )}
                    {item.label[locale]}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Sound, Lang Switcher & Start Project */}
            <div className="hidden lg:flex items-center gap-2.5">
              <SoundToggle />

              {/* Language Switch */}
              <Link
                href={targetPath}
                onClick={playClick}
                onMouseEnter={playHover}
                aria-label={isRtl ? 'Switch language to English' : 'تغییر زبان به فارسی'}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-neutral-300 hover:text-white bg-[#12151B] border border-white/[0.08] hover:border-brand-orange/60 transition-all min-h-[38px]"
              >
                <Globe className="w-3.5 h-3.5 text-brand-orange" aria-hidden="true" />
                <span>{targetLocale.toUpperCase()}</span>
              </Link>

              {/* CTA Start Project */}
              <Link
                href={`/${locale}/start-project`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-all duration-200 shadow-glow-orange hover:shadow-glow-orange-lg hover:scale-105 active:scale-95 min-h-[38px]"
              >
                <span>{UI_STRINGS.startProject[locale]}</span>
                <DirectionAwareArrow type="up-right" className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <SoundToggle />

              <Link
                href={targetPath}
                aria-label={isRtl ? 'Switch language to English' : 'تغییر زبان به فارسی'}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-mono font-semibold text-neutral-300 bg-[#12151B] border border-white/[0.08] min-h-[44px] min-w-[44px]"
              >
                <Globe className="w-4 h-4 text-brand-orange" aria-hidden="true" />
                <span>{targetLocale.toUpperCase()}</span>
              </Link>

              <button
                onClick={() => {
                  playClick();
                  setIsDrawerOpen(true);
                }}
                className="p-2.5 rounded-xl text-neutral-300 hover:text-white bg-[#12151B] border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-brand-orange min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={isRtl ? 'باز کردن منوی ناوبری' : 'Open navigation menu'}
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Direction-Aware Mobile Drawer */}
      <DirectionAwareDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={isRtl ? 'منوی ناوبری استودیو MIGO' : 'MIGO Studio Navigation'}
      >
        <div className="flex flex-col space-y-2">
          {NAV_ITEMS.map((item) => {
            const href = item.href(locale);
            const isActive =
              pathname === href ||
              (item.key !== 'home' && pathname?.startsWith(href));

            return (
              <Link
                key={item.key}
                href={href}
                onClick={() => {
                  playClick();
                  setIsDrawerOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-orange/20 text-brand-orange border border-brand-orange/30'
                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.key === 'lab' && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                  <span>{item.label[locale]}</span>
                </div>
                <DirectionAwareArrow type="chevron" className="w-4 h-4 text-neutral-500" />
              </Link>
            );
          })}

          <div className="pt-6 mt-4 border-t border-white/[0.08]">
            <Link
              href={`/${locale}/start-project`}
              onClick={() => {
                playClick();
                setIsDrawerOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange min-h-[44px]"
            >
              <span>{UI_STRINGS.startProject[locale]}</span>
              <DirectionAwareArrow type="up-right" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </DirectionAwareDrawer>
    </>
  );
}
