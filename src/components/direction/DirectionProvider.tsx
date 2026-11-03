'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { Locale, Direction, getDirection } from '@/data/translations';

interface DirectionContextValue {
  locale: Locale;
  direction: Direction;
  isRtl: boolean;
  alignStart: 'left' | 'right';
  alignEnd: 'right' | 'left';
  // Utility function for conditional direction classes
  dirClass: (rtlClass: string, ltrClass: string) => string;
}

const DirectionContext = createContext<DirectionContextValue | null>(null);

export interface DirectionProviderProps {
  locale: Locale;
  children: React.ReactNode;
}

export function DirectionProvider({ locale, children }: DirectionProviderProps) {
  const direction = getDirection(locale);
  const isRtl = direction === 'rtl';

  const value = useMemo<DirectionContextValue>(() => {
    return {
      locale,
      direction,
      isRtl,
      alignStart: isRtl ? 'right' : 'left',
      alignEnd: isRtl ? 'left' : 'right',
      dirClass: (rtlClass: string, ltrClass: string) => (isRtl ? rtlClass : ltrClass),
    };
  }, [locale, direction, isRtl]);

  return (
    <DirectionContext.Provider value={value}>
      <div
        dir={direction}
        lang={locale}
        className={isRtl ? 'font-farsi antialiased selection:bg-brand-orange selection:text-black' : 'font-sans antialiased selection:bg-brand-orange selection:text-black'}
      >
        {children}
      </div>
    </DirectionContext.Provider>
  );
}

export function useDirection(): DirectionContextValue {
  const context = useContext(DirectionContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      locale: 'fa',
      direction: 'rtl',
      isRtl: true,
      alignStart: 'right',
      alignEnd: 'left',
      dirClass: (rtlClass, _ltrClass) => rtlClass,
    };
  }
  return context;
}
