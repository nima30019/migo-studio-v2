'use client';

import React from 'react';
import Link from 'next/link';
import {
  Glasses,
  Scan,
  Gamepad2,
  Sparkles,
  Box,
  Cpu,
  type LucideIcon,
} from 'lucide-react';
import { ServiceItem } from '@/data/services';
import { useDirection } from './direction/DirectionProvider';
import { DirectionAwareArrow } from './direction/DirectionAwareArrow';
import { SpotlightCard } from './SpotlightCard';
import { useAudio } from './AudioController';

const ICON_MAP: Record<string, LucideIcon> = {
  Glasses,
  Scan,
  Gamepad2,
  Sparkles,
  Box,
  Cpu,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();
  const IconComponent = ICON_MAP[service.icon] || Sparkles;

  return (
    <SpotlightCard className="h-full flex flex-col justify-between p-7 sm:p-8">
      <div>
        {/* Header: Icon & Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#080A0E] border border-white/[0.1] flex items-center justify-center text-brand-orange group-hover:scale-110 group-hover:border-brand-orange transition-all duration-300">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-brand-orange bg-[#080A0E] px-3 py-1 rounded-full border border-white/[0.08]">
            {service.badge[locale]}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 hover:text-brand-orange transition-colors">
          <Link
            href={`/${locale}/services/${service.slug}`}
            onClick={playClick}
            onMouseEnter={playHover}
          >
            {service.title[locale]}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
          {service.shortDescription[locale]}
        </p>

        {/* Bullet Capabilities */}
        <div className="space-y-2 mb-8 pt-4 border-t border-white/[0.06]">
          {service.capabilities[locale].slice(0, 3).map((cap, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0 shadow-[0_0_8px_#FF781F]" />
              <span className="line-clamp-1">{cap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Link */}
      <Link
        href={`/${locale}/services/${service.slug}`}
        onClick={playClick}
        onMouseEnter={playHover}
        aria-label={`${isRtl ? 'اطلاعات بیشتر درباره' : 'Learn more about'} ${service.title[locale]}`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-brand-orange transition-colors pt-2 group"
      >
        <span>{isRtl ? 'اطلاعات بیشتر و مشخصات' : 'Service Architecture'}</span>
        <DirectionAwareArrow type="arrow" className="w-3.5 h-3.5 group-hover:translate-x-1" />
      </Link>
    </SpotlightCard>
  );
}
