'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { useDirection } from './direction/DirectionProvider';
import { NAV_ITEMS, UI_STRINGS } from '@/data/translations';
import { SERVICES } from '@/data/services';
import { getAssetPath } from '@/utils/asset';
import { useAudio } from './AudioController';

export function Footer() {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();
  const logoSrc = getAssetPath('/migo-logo-transparent.png');

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080C] text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            <Link
              href={`/${locale}`}
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex items-center gap-3 group"
            >
              <img
                src={logoSrc}
                alt={isRtl ? 'لوگوی رسمی استودیو فناوری خلاق MIGO V2' : 'MIGO Studio V2 Logo'}
                width={80}
                height={44}
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-lg text-white tracking-wider">MIGO</span>
                  <span className="px-1.5 py-0.2 rounded bg-brand-orange/20 border border-brand-orange/40 text-[9px] font-mono text-brand-orange font-bold">
                    V2
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-mono">
                  {UI_STRINGS.brandTagline[locale]}
                </span>
              </div>
            </Link>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              {UI_STRINGS.footerDesc[locale]}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/nima30019/migo-studio-v2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MIGO Studio GitHub"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-brand-orange/20 hover:text-white border border-white/[0.08] transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/migo-studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MIGO Studio LinkedIn"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-brand-orange/20 hover:text-white border border-white/[0.08] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/migo.studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MIGO Studio Instagram"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-brand-orange/20 hover:text-white border border-white/[0.08] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-4 pb-2 border-b border-white/[0.08]">
              {isRtl ? 'صفحات اصلی' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href(locale)}
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="hover:text-brand-orange transition-colors text-xs flex items-center gap-1.5"
                  >
                    {item.key === 'lab' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Specializations */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-4 pb-2 border-b border-white/[0.08]">
              {UI_STRINGS.whatWeDo[locale]}
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="hover:text-brand-orange transition-colors text-xs line-clamp-1"
                  >
                    {service.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-4 pb-2 border-b border-white/[0.08]">
              {UI_STRINGS.contactUs[locale]}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="mailto:migogamessemnan@gmail.com" className="hover:text-brand-orange transition-colors">
                  migogamessemnan@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{isRtl ? 'تهران، ایران • پروژه‌های سراسر جهان' : 'Tehran, Iran • Global Deployments'}</span>
              </div>
              <div className="pt-3">
                <Link
                  href={`/${locale}/start-project`}
                  onClick={playClick}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-orange/20 border border-brand-orange/40 hover:bg-brand-orange hover:text-white transition-all shadow-glow-orange"
                >
                  <span>{UI_STRINGS.startProject[locale]}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} MIGO Creative Technology Studio. {UI_STRINGS.rightsReserved[locale]}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">BUILD 2.0.0 // PRODUCTION</span>
            <span className="text-brand-orange">•</span>
            <span className="text-emerald-400">SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
