'use client';

import React from 'react';
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import { useDirection } from './DirectionProvider';

interface DirectionAwareArrowProps {
  type?: 'arrow' | 'up-right' | 'chevron';
  direction?: 'forward' | 'backward';
  className?: string;
}

export function DirectionAwareArrow({
  type = 'arrow',
  direction = 'forward',
  className = 'w-4 h-4',
}: DirectionAwareArrowProps) {
  const { isRtl } = useDirection();

  // If reading RTL:
  // Forward arrow should point left (180deg rotation or horizontal flip)
  // Up-right arrow in RTL should angle up-left (-90deg or flip)
  const isForward = direction === 'forward';

  let rotationStyle = '';

  if (type === 'arrow') {
    if (isRtl) {
      rotationStyle = isForward ? 'rotate-180' : '';
    } else {
      rotationStyle = isForward ? '' : 'rotate-180';
    }
    return <ArrowRight className={`${className} transition-transform ${rotationStyle}`} aria-hidden="true" />;
  }

  if (type === 'chevron') {
    if (isRtl) {
      rotationStyle = isForward ? 'rotate-180' : '';
    } else {
      rotationStyle = isForward ? '' : 'rotate-180';
    }
    return <ChevronRight className={`${className} transition-transform ${rotationStyle}`} aria-hidden="true" />;
  }

  if (type === 'up-right') {
    // In LTR, up-right points North-East.
    // In RTL, up-right points North-West.
    const transformClass = isRtl ? 'scale-x-[-1]' : '';
    return <ArrowUpRight className={`${className} transition-transform ${transformClass}`} aria-hidden="true" />;
  }

  return <ArrowRight className={className} aria-hidden="true" />;
}
