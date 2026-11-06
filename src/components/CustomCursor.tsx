'use client';

import React, { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const isPointerRef = useRef(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad), not touchscreens, and respect reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          target.getAttribute('role') === 'button';

        if (isClickable !== isPointerRef.current) {
          isPointerRef.current = isClickable;
          setIsPointer(isClickable);
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Precision Core Dot (Hardware-accelerated translate3d) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-brand-orange transition-[width,height,opacity] duration-150 ease-out opacity-0"
        style={{
          width: isPointer ? '8px' : '6px',
          height: isPointer ? '8px' : '6px',
          boxShadow: '0 0 10px #FF781F',
          willChange: 'transform',
        }}
      />
      {/* Smooth Outer Follower Ring (Hardware-accelerated translate3d) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-brand-orange/60 transition-[width,height,background-color,opacity] duration-200 ease-out opacity-0"
        style={{
          width: isPointer ? '44px' : '26px',
          height: isPointer ? '44px' : '26px',
          backgroundColor: isPointer ? 'rgba(255, 120, 31, 0.08)' : 'transparent',
          willChange: 'transform',
        }}
      />
    </>
  );
}
