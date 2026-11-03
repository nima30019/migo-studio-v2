'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/data/projects';
import { useDirection } from './direction/DirectionProvider';
import { DirectionAwareArrow } from './direction/DirectionAwareArrow';
import { SpotlightCard } from './SpotlightCard';
import { useAudio } from './AudioController';

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();

  return (
    <SpotlightCard className="h-full flex flex-col justify-between p-6 sm:p-7 group">
      <div>
        {/* Category & Year */}
        <div className="flex items-center justify-between mb-4 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-semibold">
            {project.category[locale]}
          </span>
          <span className="text-neutral-400">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 group-hover:text-brand-orange transition-colors">
          <Link
            href={`/${locale}/work/${project.slug}`}
            onClick={playClick}
            onMouseEnter={playHover}
          >
            {project.title[locale]}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
          {project.shortDescription[locale]}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Link & Client */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-neutral-400 font-mono">
          {project.clientSample[locale]}
        </span>
        <Link
          href={`/${locale}/work/${project.slug}`}
          onClick={playClick}
          onMouseEnter={playHover}
          aria-label={`${isRtl ? 'مشاهده مطالعه موردی' : 'View case study'} ${project.title[locale]}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-brand-orange transition-colors"
        >
          <span>{isRtl ? 'مطالعه موردی' : 'Case Study'}</span>
          <DirectionAwareArrow type="up-right" className="w-3.5 h-3.5" />
        </Link>
      </div>
    </SpotlightCard>
  );
}
