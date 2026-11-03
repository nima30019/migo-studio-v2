'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#07080B] text-white px-4 text-center">
      <div className="space-y-4 max-w-md">
        <span className="text-xs font-mono text-brand-orange uppercase tracking-widest px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20">
          ERROR 404 // ROUTE NOT FOUND
        </span>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-white">
          404
        </h1>
        <p className="text-sm text-neutral-400 font-light leading-relaxed">
          The requested spatial destination does not exist or has been shifted in the quantum pipeline.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link
            href="/fa"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>صفحه اصلی (فارسی)</span>
          </Link>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-neutral-300 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] transition-all"
          >
            <span>Home (English)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
