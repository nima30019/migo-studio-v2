'use client';

import React, { useState } from 'react';
import { Sparkles, Sliders, Play, RotateCcw } from 'lucide-react';
import { LAB_EXPERIMENTS, ExperimentItem } from '@/data/lab';
import { useDirection } from './direction/DirectionProvider';
import { LabCanvas } from './canvas/LabCanvas';
import { LabCard } from './LabCard';
import { SpotlightCard } from './SpotlightCard';
import { useAudio } from './AudioController';

export function LabInteractiveSandbox() {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();

  const [activeExp, setActiveExp] = useState<ExperimentItem>(LAB_EXPERIMENTS[0]);

  // Initial parameters map
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

  return (
    <div className="space-y-16">
      {/* Active Interactive Sandbox Stage */}
      <SpotlightCard className="p-6 sm:p-10 border-cyan-500/40 bg-[#080B10]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Canvas Render View */}
          <div className="lg:col-span-7">
            <LabCanvas
              experimentId={activeExp.id}
              parameters={params}
              colorScheme={activeExp.colorScheme}
            />
          </div>

          {/* Interactive Controls & Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{activeExp.category[locale]}</span>
              </div>
              <h2 className="font-display font-bold text-2xl text-white">
                {activeExp.title[locale]}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {activeExp.shortDescription[locale]}
              </p>
            </div>

            {/* Parameter Sliders */}
            <div className="p-5 rounded-2xl bg-[#0F131C] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono font-bold text-neutral-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  {isRtl ? 'پارامترهای زنده محاسباتی' : 'Real-time Shading Parameters'}
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

            {/* Industrial Application */}
            <div className="text-xs text-neutral-400 space-y-1">
              <span className="font-mono font-bold text-brand-orange block">
                {isRtl ? '// کاربرد صنعتی و تجاری:' : '// Commercial Application:'}
              </span>
              <p className="font-light leading-relaxed">{activeExp.practicalApplication[locale]}</p>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Grid of All Lab Prototypes */}
      <div className="space-y-6">
        <h3 className="font-display font-bold text-2xl text-white">
          {isRtl ? 'سایر پروتوتایپ‌های فعال در آزمایشگاه' : 'Active Research Prototypes'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LAB_EXPERIMENTS.map((exp) => (
            <LabCard
              key={exp.id}
              experiment={exp}
              isActive={exp.id === activeExp.id}
              onSelect={handleSelectExp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
