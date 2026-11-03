'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  RotateCcw,
  Maximize2,
  Minimize2,
  Play,
  Layers,
  Cpu,
  Scan,
} from 'lucide-react';
import { LAB_EXPERIMENTS, ExperimentItem } from '@/data/lab';
import { useDirection } from './direction/DirectionProvider';
import { LabCanvas } from './canvas/LabCanvas';
import { SpotlightCard } from './SpotlightCard';
import { useAudio } from './AudioController';

export function LabInteractiveSandbox() {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();

  const [activeExp, setActiveExp] = useState<ExperimentItem>(LAB_EXPERIMENTS[0]);
  const [isDedicatedView, setIsDedicatedView] = useState<boolean>(false);

  // Parameter initial state generator
  const getInitialParams = (exp: ExperimentItem) => {
    const map: Record<string, number> = {};
    exp.parameters.forEach((p) => {
      map[p.id] = p.defaultValue;
    });
    return map;
  };

  const [params, setParams] = useState<Record<string, number>>(() =>
    getInitialParams(LAB_EXPERIMENTS[0])
  );

  const handleSelectExp = (exp: ExperimentItem) => {
    playClick();
    setActiveExp(exp);
    setParams(getInitialParams(exp));
  };

  const handleParamChange = (id: string, val: number) => {
    setParams((prev) => ({ ...prev, [id]: val }));
  };

  const handleReset = () => {
    playClick();
    setParams(getInitialParams(activeExp));
  };

  const toggleDedicatedView = () => {
    playClick();
    setIsDedicatedView((prev) => !prev);
  };

  return (
    <div className="space-y-16">
      {/* Active Stage & Parameters */}
      <SpotlightCard className={`p-6 sm:p-10 border-cyan-500/40 bg-[#080B10] ${isDedicatedView ? 'fixed inset-0 z-50 rounded-none overflow-y-auto bg-[#07080B]' : ''}`}>
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{activeExp.category[locale]}</span>
            </div>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              // {activeExp.fpsTarget}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDedicatedView}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono text-neutral-200 transition-colors"
              title={isDedicatedView ? 'Exit Dedicated View' : 'Dedicated Experience View'}
            >
              {isDedicatedView ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isRtl ? 'خروج از نمای اختصاصی' : 'Exit Focus View'}</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isRtl ? 'نمای اختصاصی آزمایش' : 'Dedicated View'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive WebGL Canvas */}
          <div className={isDedicatedView ? 'lg:col-span-8' : 'lg:col-span-7'}>
            <LabCanvas
              experimentId={activeExp.id}
              parameters={params}
              colorScheme={activeExp.colorScheme}
              isExpanded={isDedicatedView}
            />
          </div>

          {/* Controls Panel */}
          <div className={isDedicatedView ? 'lg:col-span-4 space-y-6' : 'lg:col-span-5 space-y-6'}>
            <div className="space-y-2">
              <h2 className="font-display font-bold text-2xl text-white">
                {activeExp.title[locale]}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {activeExp.shortDescription[locale]}
              </p>
            </div>

            {/* Parameter Sliders */}
            <div className="p-5 rounded-2xl bg-[#0E121A] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono font-bold text-neutral-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  {isRtl ? 'پارامترهای زنده محاسباتی' : 'Real-Time Parameters'}
                </span>
                <button
                  onClick={handleReset}
                  className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isRtl ? 'بازنشانی' : 'Reset'}</span>
                </button>
              </div>

              {activeExp.parameters.map((p) => {
                const currentVal = params[p.id] ?? p.defaultValue;
                return (
                  <div key={p.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-300">{p.label[locale]}</span>
                      <span className="text-cyan-400 font-bold">{currentVal}</span>
                    </div>
                    <input
                      type="range"
                      min={p.min}
                      max={p.max}
                      step={p.step}
                      value={currentVal}
                      onChange={(e) => handleParamChange(p.id, parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 bg-white/[0.1] h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>

            {/* Industrial & Commercial Context */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs space-y-1.5">
              <span className="font-mono font-bold text-brand-orange block">
                {isRtl ? '// کاربرد صنعتی و تجاری:' : '// Commercial Application:'}
              </span>
              <p className="text-neutral-300 font-light leading-relaxed">
                {activeExp.practicalApplication[locale]}
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5">
              {activeExp.technologies.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Select Other Active Prototypes (Non-duplicated, clean switchers) */}
      {!isDedicatedView && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-2xl text-white">
                {isRtl ? 'انتخاب نمونه‌های آزمایشگاه R&D' : 'Research Prototypes Matrix'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
                {isRtl
                  ? 'بر روی هر پروتوتایپ کلیک کنید تا در استیج تعاملی بالا لود شود.'
                  : 'Select an experiment to activate its real-time viewport and telemetry.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LAB_EXPERIMENTS.map((exp) => {
              const isCurrent = exp.id === activeExp.id;
              return (
                <div
                  key={exp.id}
                  onClick={() => handleSelectExp(exp)}
                  onMouseEnter={playHover}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.25)]'
                      : 'bg-[#0B0D13] border-white/[0.08] hover:border-cyan-500/40 hover:bg-[#0F131C]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                      <span className="text-cyan-400 font-semibold">{exp.badge[locale]}</span>
                      <span className="text-neutral-400">{exp.fpsTarget}</span>
                    </div>

                    <h4 className="font-display font-bold text-base text-white mb-2">
                      {exp.title[locale]}
                    </h4>

                    <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed">
                      {exp.shortDescription[locale]}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono">
                      {exp.parameters.length} {isRtl ? 'پارامتر' : 'Params'}
                    </span>
                    <span className="font-bold text-cyan-300 flex items-center gap-1">
                      <span>{isCurrent ? (isRtl ? 'در حال اجرا' : 'Active') : (isRtl ? 'بارگذاری' : 'Load')}</span>
                      <Play className="w-3 h-3 fill-current" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
