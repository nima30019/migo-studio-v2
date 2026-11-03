'use client';

import React, { useState } from 'react';
import {
  Glasses,
  Scan,
  Gamepad2,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { useDirection } from './direction/DirectionProvider';
import { useAudio } from './AudioController';
import { SpotlightCard } from './SpotlightCard';

const DOMAIN_OPTIONS = [
  {
    id: 'vr-mr',
    icon: Glasses,
    title: { en: 'VR / MR Spatial App', fa: 'واقعیت مجازی و ترکیبی (VR/MR)' },
    desc: { en: 'Standalone headsets or PC-VR rigs for enterprise simulations', fa: 'هدست‌های مستقل یا سیستم‌های قدرتمند شبیه‌سازی' },
  },
  {
    id: 'webar',
    icon: Scan,
    title: { en: 'Zero-Install WebAR', fa: 'واقعیت افزوده وب (WebAR)' },
    desc: { en: 'Browser-based 3D product view and interactive AR via QR code', fa: 'مشاهده سه‌بعدی و جانمایی محصول بدون نیاز به نصب اپ' },
  },
  {
    id: 'exhibition',
    icon: Sparkles,
    title: { en: 'Exhibition & Multi-Touch', fa: 'فناوری نمایشگاهی و کیوسک هوشمند' },
    desc: { en: 'Kinetic video walls, LiDAR sensors, and turnkey hardware', fa: 'ویدیو وال تعاملی، سنسورهای حرکتی و سخت‌افزار یکپارچه' },
  },
  {
    id: 'games',
    icon: Gamepad2,
    title: { en: 'Serious Games & Simulators', fa: 'بازی‌های جدی و شبیه‌سازها' },
    desc: { en: 'Gamified training, safety drills, and educational games', fa: 'آموزش گیمیفای‌شده، مانورهای ایمنی و بازی‌های رویدادی' },
  },
];

const PLATFORM_OPTIONS = [
  { id: 'meta-quest', label: { en: 'Meta Quest 3 / Pico 4 (Standalone)', fa: 'هدست‌های مستقل (Meta Quest / Pico)' } },
  { id: 'pc-vr', label: { en: 'High-Fidelity PC-VR (SteamVR / Unreal 5)', fa: 'سیستم‌های با گرافیک سنگین PC-VR' } },
  { id: 'mobile-web', label: { en: 'Mobile Browser (iOS / Android WebAR)', fa: 'مرورگر موبایل (WebAR بدون نیاز به نصب)' } },
  { id: 'physical-kiosk', label: { en: 'Interactive Multi-Touch Kiosk / LiDAR', fa: 'کیوسک لمسی نمایشگاهی / سنسور LiDAR' } },
];

export function StartProjectForm() {
  const { locale, isRtl } = useDirection();
  const { playClick, playSuccess } = useAudio();

  const [step, setStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState('vr-mr');
  const [selectedPlatform, setSelectedPlatform] = useState('meta-quest');
  const [timeline, setTimeline] = useState('1-3-months');
  const [budgetTier, setBudgetTier] = useState('standard');

  const [contact, setContact] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    brief: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const validateStep3 = () => {
    const err: Record<string, string> = {};
    if (!contact.name.trim()) err.name = isRtl ? 'نام خود را وارد نمایید.' : 'Name is required.';
    if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      err.email = isRtl ? 'ایمیل کاری معتبر الزامی است.' : 'Valid email is required.';
    }
    if (!contact.brief.trim() || contact.brief.length < 15) {
      err.brief = isRtl ? 'توضیحات اولیه پروژه باید حداقل ۱۵ کاراکتر باشد.' : 'Brief must be at least 15 characters.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    playClick();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      if (validateStep3()) {
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsDone(true);
          playSuccess();
        }, 700);
      }
    }
  };

  const handleBack = () => {
    playClick();
    if (step > 1) setStep(step - 1);
  };

  if (isDone) {
    return (
      <SpotlightCard className="p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
          {isRtl ? 'درخواست پروژه شما ثبت گردید!' : 'Project Ingestion Complete!'}
        </h3>
        <p className="text-sm text-neutral-300 leading-relaxed font-light">
          {isRtl
            ? 'اطلاعات و الزامات اولیه پروژه دریافت شد. سرپرست فنی حوزه مربوطه ظرف ۲۴ ساعت کاری با برنامه زمان‌بندی و راهکار معماری پیشنهادی با شما تماس خواهد گرفت.'
            : 'Your preliminary technical scope has been logged into our pipeline. A dedicated technical director will reach out within 24 hours with an architectural breakdown.'}
        </p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-400">
          PROJECT REFERENCE // MIGO-V2-{Math.floor(100000 + Math.random() * 900000)}
        </div>
      </SpotlightCard>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Wizard Progress Steps */}
      <div className="flex items-center justify-between relative px-2 sm:px-6">
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-white/[0.08] -z-0" />
        {[1, 2, 3].map((s) => (
          <div key={s} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                step >= s
                  ? 'bg-brand-orange text-white shadow-glow-orange'
                  : 'bg-[#12151B] text-neutral-500 border border-white/[0.1]'
              }`}
            >
              {s}
            </div>
            <span className="text-[11px] font-mono text-neutral-400 hidden sm:block">
              {s === 1
                ? isRtl ? 'حوزه پروژه' : 'Domain'
                : s === 2
                ? isRtl ? 'سخت‌افزار و بازه' : 'Hardware'
                : isRtl ? 'اطلاعات تماس' : 'Brief'}
            </span>
          </div>
        ))}
      </div>

      <SpotlightCard className="p-6 sm:p-10">
        {/* Step 1: Select Domain */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {isRtl ? '۱. حوزه اصلی پروژه خود را مشخص کنید' : '1. Select Your Project Category'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                {isRtl
                  ? 'کدام یک از فناوری‌های تعاملی بیشترین انطباق را با هدف نهایی شما دارد؟'
                  : 'Which interactive specialization aligns closest with your goals?'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DOMAIN_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedDomain === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      playClick();
                      setSelectedDomain(opt.id);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-brand-orange/15 border-brand-orange shadow-[0_0_20px_rgba(255,120,31,0.25)]'
                        : 'bg-[#0E1117] border-white/[0.08] hover:border-white/[0.2]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-brand-orange text-white' : 'bg-white/[0.05] text-brand-orange'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white mb-1">
                        {opt.title[locale]}
                      </h4>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        {opt.desc[locale]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Target Platform & Timeline */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {isRtl ? '۲. بستر سخت‌افزاری و زمان‌بندی مورد انتظار' : '2. Target Hardware & Timeline'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                {isRtl ? 'محیط اجرای نرم‌افزار را انتخاب کنید.' : 'Specify runtime constraints.'}
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono font-medium text-neutral-300">
                {isRtl ? 'بستر اجرای نرم‌افزار:' : 'Target Platform:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PLATFORM_OPTIONS.map((plat) => (
                  <button
                    key={plat.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setSelectedPlatform(plat.id);
                    }}
                    className={`p-4 rounded-xl border text-start text-xs font-medium transition-all ${
                      selectedPlatform === plat.id
                        ? 'bg-brand-orange/15 border-brand-orange text-white'
                        : 'bg-[#0E1117] border-white/[0.08] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {plat.label[locale]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-2">
                  {isRtl ? 'افق زمانی پروژه:' : 'Target Timeline:'}
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-brand-orange"
                >
                  <option value="under-1-month">{isRtl ? 'کمتر از ۱ ماه (ضرب‌الاجل رویداد/نمایشگاه)' : 'Urgent (< 1 month)'}</option>
                  <option value="1-3-months">{isRtl ? '۱ تا ۳ ماه (پروژه استاندارد)' : '1 - 3 months (Standard)'}</option>
                  <option value="3-6-months">{isRtl ? '۳ تا ۶ ماه (شبیه‌ساز پیشرفته سازمانی)' : '3 - 6 months (Enterprise)'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-2">
                  {isRtl ? 'بودجه و مقیاس مورد نظر:' : 'Estimated Scope Tier:'}
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-brand-orange"
                >
                  <option value="pilot">{isRtl ? 'پایلوت و پروتوتایپ سریع (MVP)' : 'Prototype / MVP Pilot'}</option>
                  <option value="standard">{isRtl ? 'توسعه کامل سیستم تعاملی' : 'Full Production Deployment'}</option>
                  <option value="turnkey">{isRtl ? 'صفر تا صد (همراه با سخت‌افزار و استقرار)' : 'Turnkey (Hardware + Software)'}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Brief */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {isRtl ? '۳. اطلاعات هماهنگی و شرح نیازمندی‌ها' : '3. Technical Brief & Contact'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                {isRtl ? 'چگونه و با چه کسی در ارتباط باشیم؟' : 'Who should our technical leads contact?'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                  {isRtl ? 'نام و نام خانوادگی' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder={isRtl ? 'علی رضایی' : 'John Doe'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
                />
                {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                  {isRtl ? 'ایمیل کاری' : 'Business Email'} *
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
                />
                {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                  {isRtl ? 'شرکت یا سازمان (اختیاری)' : 'Company / Organization'}
                </label>
                <input
                  type="text"
                  value={contact.company}
                  onChange={(e) => setContact({ ...contact, company: e.target.value })}
                  placeholder={isRtl ? 'نام سازمان شما' : 'Your Organization'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                  {isRtl ? 'شماره تماس مستقیم' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+98 912 ..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                {isRtl ? 'شرح مختصر چالش و اهداف پروژه' : 'Project Goals & Requirements'} *
              </label>
              <textarea
                rows={4}
                value={contact.brief}
                onChange={(e) => setContact({ ...contact, brief: e.target.value })}
                placeholder={
                  isRtl
                    ? 'به عنوان مثال: ما به یک شبیه‌ساز واقعیت مجازی برای غرفه نمایشگاهی صنعت نفت نیاز داریم که کاربران بتوانند...'
                    : 'e.g. We require a multiplayer VR training module for aeronautic technicians with realistic physics...'
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
              />
              {errors.brief && <p className="text-red-400 text-[11px] mt-1">{errors.brief}</p>}
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-8 mt-6 border-t border-white/[0.08] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
            >
              {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isRtl ? 'مرحله قبل' : 'Back'}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>{isRtl ? 'در حال ثبت...' : 'Submitting...'}</span>
            ) : step === 3 ? (
              <span>{isRtl ? 'ثبت نهایی درخواست پروژه' : 'Submit Project Brief'}</span>
            ) : (
              <>
                <span>{isRtl ? 'مرحله بعد' : 'Next Step'}</span>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </>
            )}
          </button>
        </div>
      </SpotlightCard>
    </div>
  );
}
