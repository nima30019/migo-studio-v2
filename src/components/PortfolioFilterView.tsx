'use client';

import React, { useState } from 'react';
import { PROJECT_CATEGORIES, PROJECTS, ProjectItem } from '@/data/projects';
import { useDirection } from './direction/DirectionProvider';
import { ProjectCard } from './ProjectCard';
import { useAudio } from './AudioController';

export function PortfolioFilterView() {
  const { locale, isRtl } = useDirection();
  const { playClick, playHover } = useAudio();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categoryKey === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label={isRtl ? 'دسته‌بندی پروژه‌ها' : 'Project categories'}
        className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none"
      >
        {PROJECT_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                playClick();
                setActiveCategory(cat.key);
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all min-h-[40px] ${
                isActive
                  ? 'bg-brand-orange text-white shadow-glow-orange'
                  : 'bg-[#12151B] text-neutral-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              {cat.label[locale]}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
