'use client';

import React from 'react';
import { useDirection } from './DirectionProvider';

interface DirectionAwareBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'orange' | 'cyan' | 'purple' | 'neutral';
  className?: string;
}

export function DirectionAwareBadge({
  children,
  icon,
  variant = 'orange',
  className = '',
}: DirectionAwareBadgeProps) {
  const { isRtl } = useDirection();

  const variantStyles = {
    orange: 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange',
    cyan: 'bg-[#00F2FE]/10 border-[#00F2FE]/30 text-[#00F2FE]',
    purple: 'bg-[#7928CA]/15 border-[#7928CA]/35 text-[#C884FF]',
    neutral: 'bg-white/[0.05] border-white/[0.1] text-neutral-300',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border backdrop-blur-sm ${variantStyles[variant]} ${className}`}
    >
      {icon && (
        <span className={isRtl ? 'order-first' : 'order-first'}>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
