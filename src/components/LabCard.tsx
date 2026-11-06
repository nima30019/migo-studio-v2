'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, Sparkles } from 'lucide-react';
import { ExperimentItem } from '@/data/lab';
import { useDirection } from './direction/DirectionProvider';
import { DirectionAwareArrow } from './direction/DirectionAwareArrow';
import { SpotlightCard } from './SpotlightCard';
import { useAudio } from './AudioController';

interface LabCardProps {
  experiment: ExperimentItem;
  onSelect?: (exp: ExperimentItem) => void;
  isActive?: boolean;
}

export function LabCard({ experiment, onSelect, isActive = false }: LabCardProps) {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();
  const router = useRouter();

  const handleCardClick = () => {
    playClick();
    if (onSelect) {
      onSelect(experiment);
    } else {
      router.push(`/${locale}/lab`);
    }
  };

  return (
    <SpotlightCard
      className={`h-full flex flex-col justify-between p-6 sm:p-7 cursor-pointer transition-all ${
        isActive
          ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(0,242,254,0.25)] bg-[#0C121C]'
          : 'hover:border-cyan-500/40'
      }`}
    >
      <div onClick={handleCardClick}>
        {/* Header: Category & FPS */}
        <div className="flex items-center justify-between mb-4 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {experiment.category[locale]}
          </span>
          <span className="text-neutral-400 font-bold">{experiment.fpsTarget}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl text-white mb-2.5 hover:text-cyan-300 transition-colors">
          {experiment.title[locale]}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-neutral-300 leading-relaxed mb-5 font-light">
          {experiment.shortDescription[locale]}
        </p>

        {/* Real-world Application Note */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-5 text-xs text-neutral-300">
          <span className="text-brand-orange font-bold font-mono block mb-1">
            {isRtl ? '// کاربرد عملیاتی صنعتی:' : '// Commercial Application:'}
          </span>
          <span className="line-clamp-2">{experiment.practicalApplication[locale]}</span>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {experiment.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          {experiment.parameters.length} {isRtl ? 'پارامتر تعاملی' : 'Live Controls'}
        </span>

        <button
          onClick={handleCardClick}
          onMouseEnter={playHover}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-cyan-300 transition-colors"
        >
          <span>{isRtl ? 'اجرای آزمایش' : 'Launch Simulator'}</span>
          <Play className="w-3 h-3 fill-current" />
        </button>
      </div>
    </SpotlightCard>
  );
}
