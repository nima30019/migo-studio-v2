'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Activity, Cpu, Layers } from 'lucide-react';
import { useDirection } from './direction/DirectionProvider';
import { DirectionAwareArrow } from './direction/DirectionAwareArrow';
import { DirectionAwareBadge } from './direction/DirectionAwareBadge';
import { InteractiveWebGLHero } from './canvas/InteractiveWebGLHero';
import { UI_STRINGS } from '@/data/translations';
import { useAudio } from './AudioController';
import { getAssetPath } from '@/utils/asset';

export function HeroV2() {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();
  const logoSrc = getAssetPath('/migo-logo-transparent.png');

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-radial-glow">
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-36 w-96 h-96 bg-[#00F2FE]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Typography Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#12151B]/90 border border-white/[0.1] shadow-inner backdrop-blur-md">
              <img
                src={logoSrc}
                alt={isRtl ? 'نشان استودیو MIGO' : 'MIGO Emblem'}
                width={24}
                height={24}
                decoding="async"
                className="w-6 h-6 object-contain"
              />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange">
                MIGO STUDIO V2
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-xs text-neutral-300 font-light">
                {isRtl ? 'فناوری‌های تعاملی و واقعیت مجازی' : 'Creative Technology & Spatial XR'}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-6xl tracking-tight text-white leading-[1.15]">
                {isRtl ? (
                  <>
                    مهندسی تجربیات <br />
                    <span className="text-gradient-orange">تعاملی و فضایی.</span>
                  </>
                ) : (
                  <>
                    WE ENGINEER <br />
                    <span className="text-gradient-orange">INTERACTIVE</span> REALITIES.
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-base font-mono font-medium text-brand-orange/90">
                {UI_STRINGS.heroSubheadline[locale]}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed font-light">
              {UI_STRINGS.heroDescription[locale]}
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <Link
                href={`/${locale}/work`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange hover:shadow-glow-orange-lg transition-all duration-300 text-sm group hover:scale-[1.02] active:scale-95"
              >
                <span>{UI_STRINGS.exploreWork[locale]}</span>
                <DirectionAwareArrow type="arrow" className="w-4 h-4 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>

              <Link
                href={`/${locale}/lab`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 text-sm group hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>{UI_STRINGS.exploreLab[locale]}</span>
              </Link>

              <Link
                href={`/${locale}/start-project`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-neutral-200 bg-[#12151B]/90 hover:bg-[#1C212A] border border-white/[0.12] hover:border-brand-orange/60 backdrop-blur-md transition-all duration-300 text-sm hover:scale-[1.02] active:scale-95"
              >
                <span>{UI_STRINGS.startProject[locale]}</span>
                <DirectionAwareArrow type="up-right" className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Studio Engineering Benchmarks */}
            <div className="pt-6 border-t border-white/[0.08] w-full grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-orange" />
                  60+ FPS
                </span>
                <span className="text-[11px] text-neutral-400 font-light mt-0.5">
                  {isRtl ? 'رندر بی‌درنگ وب' : 'Locked 60 FPS'}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  XR Engine
                </span>
                <span className="text-[11px] text-neutral-400 font-light mt-0.5">
                  {isRtl ? 'یونیتی و آنریل' : 'Unreal 5 & Unity'}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  Turnkey
                </span>
                <span className="text-[11px] text-neutral-400 font-light mt-0.5">
                  {isRtl ? 'سخت‌افزار و نرم‌افزار' : 'Hardware & Code'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive 3D Canvas Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[480px] rounded-3xl bg-[#0D1016]/85 border border-white/[0.1] backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-5 sm:p-6 flex flex-col items-center overflow-hidden group hover:border-brand-orange/40 transition-colors duration-500">
              {/* Telemetry Header */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.06] text-[11px] font-mono text-neutral-400">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                  <span className="text-white font-semibold">MIGO REAL-TIME XR</span>
                </div>
                <DirectionAwareBadge variant="orange" className="py-0.5 px-2">
                  <span>INTERACTIVE</span>
                </DirectionAwareBadge>
              </div>

              {/* Real-time 3D Scene */}
              <div className="w-full relative my-2">
                <InteractiveWebGLHero />
              </div>

              {/* Status Bar */}
              <div className="w-full text-center space-y-1.5 pt-3 border-t border-white/[0.06]">
                <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 font-medium">
                  {isRtl ? 'رایانش فضایی • وب سه‌بعدی • تکنولوژی نمایشگاهی' : 'Spatial XR • WebGL • Exhibition Tech'}
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
                  {isRtl ? 'نشانگر را حرکت دهید تا شیدر تعاملی تغییر زاویه دهد' : 'Move cursor / touch to rotate spatial mesh'}
                </div>
              </div>

              {/* Decorative Tech Corners */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-brand-orange/50 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-brand-orange/50 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-brand-orange/50 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-brand-orange/50 pointer-events-none" />
            </div>

            {/* Glowing Accent Aura */}
            <div className="absolute -bottom-8 w-4/5 h-10 bg-brand-orange/20 blur-3xl rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
