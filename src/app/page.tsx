'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/fa');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080B] text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-neutral-400">CONNECTING TO MIGO V2...</span>
      </div>
    </div>
  );
}
