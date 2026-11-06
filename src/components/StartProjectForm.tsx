'use client';

import React, { useState, useEffect } from 'react';
import {
  Glasses,
  Scan,
  Gamepad2,
  Box,
  Cpu,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mail,
  Copy,
  Check,
  Paperclip,
  Target,
} from 'lucide-react';
import { useDirection } from './direction/DirectionProvider';
import { useAudio } from './AudioController';
import { SpotlightCard } from './SpotlightCard';
import { SERVICES } from '@/data/services';

const GOAL_OPTIONS = [
  { id: 'brand-exhibition', label: { en: 'Trade Show & Brand Activation', fa: 'غرفه نمایشگاهی و لانچ محصول' } },
  { id: 'enterprise-training', label: { en: 'Enterprise Workforce Training & HSE', fa: 'آموزش پرسنل سازمان و ایمنی HSE' } },
  { id: 'product-sales', label: { en: 'Interactive Sales & Product Configurator', fa: 'افزایش فروش و کانفیگوراتور محصول' } },
  { id: 'museum-culture', label: { en: 'Museum Gallery & Cultural Heritage', fa: 'موزه هوشمند و میراث فرهنگی' } },
  { id: 'rd-prototype', label: { en: 'R&D Innovation & Experimental MVP', fa: 'تحقیق و توسعه (R&D) و ساخت MVP' } },
];

const PLATFORM_OPTIONS = [
  { id: 'meta-quest', label: { en: 'Standalone VR (Meta Quest 3 / Pico 4)', fa: 'هدست مستقل (Meta Quest / Pico)' } },
  { id: 'mobile-webar', label: { en: 'Zero-Install WebAR (Mobile Browser)', fa: 'وب بدون نصب (WebAR موبایل)' } },
  { id: 'interactive-kiosk', label: { en: 'Turnkey Video Wall / LiDAR Kiosk', fa: 'ویدیو وال تعاملی / کیوسک LiDAR' } },
  { id: 'high-end-pc', label: { en: 'High-Fidelity PC-VR / Simulation Workstation', fa: 'ورک‌استیشن شبیه‌ساز PC-VR سنگین' } },
  { id: 'cross-platform', label: { en: 'Cross-Platform (Web + Desktop + Mobile)', fa: 'چندسکویی (وب، دسکتاپ و موبایل)' } },
];

export function StartProjectForm() {
  const { locale, isRtl } = useDirection();
  const { playClick, playSuccess } = useAudio();

  const [step, setStep] = useState(1);

  // Form State
  const [selectedService, setSelectedService] = useState('immersive-experiences');
  const [selectedGoal, setSelectedGoal] = useState('brand-exhibition');
  const [selectedPlatform, setSelectedPlatform] = useState('meta-quest');
  const [budgetTier, setBudgetTier] = useState('standard');
  const [timeline, setTimeline] = useState('1-3-months');
  const [description, setDescription] = useState('');
  const [attachmentLink, setAttachmentLink] = useState('');

  const [contact, setContact] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDone, setIsDone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const pkg = searchParams.get('package');
      const mode = searchParams.get('mode');
      const serviceParam = searchParams.get('service');

      if (pkg) {
        setSelectedService('interactive-experiences');
        setSelectedGoal('brand-exhibition');
        const formattedModules = pkg.split(',').join(' + ');
        setDescription(
          isRtl
            ? `پکیج انتخابی از پکیج‌ساز نمایشگاهی: ${formattedModules}\nاهداف تکمیلی غرفه: `
            : `Selected modules from Exhibition Tech Builder: ${formattedModules}\nAdditional booth goals: `
        );
      } else if (mode === 'event') {
        setSelectedService('interactive-installations');
        setSelectedGoal('brand-exhibition');
        setTimeline('under-1-month');
      } else if (mode === 'custom') {
        setSelectedGoal('rd-prototype');
      } else if (serviceParam) {
        setSelectedService(serviceParam);
      }
    }
  }, [isRtl]);

  const validateCurrentStep = () => {
    const err: Record<string, string> = {};
    if (step === 3) {
      if (!description.trim() || description.length < 15) {
        err.description = isRtl
          ? 'لطفاً شرح اولیه پروژه را با حداقل ۱۵ کاراکتر بنویسید.'
          : 'Please provide at least 15 characters describing your project vision.';
      }
    } else if (step === 4) {
      if (!contact.name.trim()) err.name = isRtl ? 'نام و نام خانوادگی الزامی است.' : 'Name is required.';
      if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
        err.email = isRtl ? 'ایمیل کاری معتبر الزامی است.' : 'Valid business email is required.';
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    playClick();
    if (!validateCurrentStep()) return;

    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsDone(true);
      playSuccess();
    }
  };

  const handleBack = () => {
    playClick();
    if (step > 1) setStep(step - 1);
  };

  const compiledBrief = `=========================================
MIGO STUDIO V2 — STRUCTURED PROJECT BRIEF
=========================================
Service Family: ${selectedService}
Project Goal: ${selectedGoal}
Target Platform: ${selectedPlatform}
Budget Tier: ${budgetTier}
Timeline: ${timeline}

Description:
${description}

Attachment / Reference Link:
${attachmentLink || 'None provided'}

Contact Info:
- Name: ${contact.name}
- Email: ${contact.email}
- Company: ${contact.company || 'N/A'}
- Phone: ${contact.phone || 'N/A'}
=========================================`;

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[MIGO Project RFP] ${selectedService} - ${contact.company || contact.name}`);
    const body = encodeURIComponent(compiledBrief);
    return `mailto:migogamessemnan@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    playClick();
    navigator.clipboard.writeText(compiledBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isDone) {
    return (
      <SpotlightCard className="p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
            {isRtl ? 'پروپوزال اولیه شما با موفقیت فرمت‌بندی شد!' : 'Project Brief Compiled!'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light max-w-lg mx-auto">
            {isRtl
              ? 'اطلاعات شما در قالب یک فایل فنی ساختاریافته آماده شد. جهت بررسی فوری توسط سرپرستان فنی MIGO، روی دکمه ارسال مستقیم ایمیل کلیک کنید یا متن بریف را کپی نمایید.'
              : 'Your technical requirements have been structured into a formal RFP brief. Click below to transmit directly via your mail client or copy the brief.'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] text-start font-mono text-[11px] text-neutral-300 whitespace-pre-wrap overflow-x-auto max-h-52">
          {compiledBrief}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={getMailtoUrl()}
            onClick={playClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>{isRtl ? 'ارسال به سرپرستان فنی (Mailto)' : 'Send RFP via Email Client'}</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-neutral-200 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isRtl ? 'بریف کپی شد!' : 'Brief Copied!') : (isRtl ? 'کپی متن بریف' : 'Copy Structured Brief')}</span>
          </button>
        </div>

        <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-neutral-400">
          DIRECT LINE // migogamessemnan@gmail.com // RESPONSE SLA &lt; 24H
        </div>
      </SpotlightCard>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 4 Step Progress Indicators */}
      <div className="flex items-center justify-between relative px-2 sm:px-6">
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-white/[0.08] -z-0" />
        {[1, 2, 3, 4].map((s) => (
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
                ? isRtl ? 'خانواده خدمت' : 'Service'
                : s === 2
                ? isRtl ? 'اهداف و پلتفرم' : 'Scope'
                : s === 3
                ? isRtl ? 'شرح و پیوست‌ها' : 'Brief'
                : isRtl ? 'اطلاعات هماهنگی' : 'Contact'}
            </span>
          </div>
        ))}
      </div>

      <SpotlightCard className="p-6 sm:p-10">
        {/* Step 1: Consolidated Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {isRtl ? '۱. خانواده خدمت مورد نظر خود را انتخاب کنید' : '1. Select Core Service Family'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                {isRtl ? 'پروژه شما در کدام حوزه تخصصی استودیو قرار دارد؟' : 'Which specialized family aligns with your vision?'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((srv) => {
                const isSelected = selectedService === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => {
                      playClick();
                      setSelectedService(srv.id);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-brand-orange/15 border-brand-orange shadow-[0_0_20px_rgba(255,120,31,0.25)]'
                        : 'bg-[#0E1117] border-white/[0.08] hover:border-white/[0.2]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-semibold uppercase text-brand-orange px-2 py-0.5 rounded bg-brand-orange/10 border border-brand-orange/20">
                          {srv.badge[locale]}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />}
                      </div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-white mb-2">
                        {srv.title[locale]}
                      </h4>
                      <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed">
                        {srv.shortDescription[locale]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Project Goals & Platform Selection */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {isRtl ? '۲. اهداف کلیدی پروژه و پلتفرم هدف' : '2. Project Goals & Target Platform'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                {isRtl ? 'مخاطبان این سیستم در چه محیطی و با چه هدفی با آن تعامل خواهند داشت؟' : 'Define runtime context and strategic goals.'}
              </p>
            </div>

            {/* Goals */}
            <div className="space-y-3">
              <label className="block text-xs font-mono font-medium text-neutral-300">
                {isRtl ? 'هدف راهبردی پروژه:' : 'Primary Strategic Goal:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOAL_OPTIONS.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setSelectedGoal(goal.id);
                    }}
                    className={`p-3.5 rounded-xl border text-start text-xs font-medium transition-all ${
                      selectedGoal === goal.id
                        ? 'bg-brand-orange/15 border-brand-orange text-white'
                        : 'bg-[#0E1117] border-white/[0.08] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {goal.label[locale]}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Selection */}
            <div className="space-y-3 pt-4 border-t border-white/[0.06]">
              <label className="block text-xs font-mono font-medium text-neutral-300">
                {isRtl ? 'سخت‌افزار و پلتفرم اجرا:' : 'Target Runtime Hardware:'}
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
                    className={`p-3.5 rounded-xl border text-start text-xs font-medium transition-all ${
                      selectedPlatform === plat.id
                        ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                        : 'bg-[#0E1117] border-white/[0.08] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {plat.label[locale]}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget & Timeline Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-2">
                  {isRtl ? 'سطح بودجه و مقیاس مورد نظر:' : 'Estimated Scope Tier:'}
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-brand-orange"
                >
                  <option value="pilot">{isRtl ? 'پایلوت و پروتوتایپ سریع (MVP)' : 'Prototype / MVP Pilot'}</option>
                  <option value="standard">{isRtl ? 'توسعه استاندارد نرم‌افزار تعاملی' : 'Full Production Deployment'}</option>
                  <option value="turnkey">{isRtl ? 'صفر تا صد (همراه با تامین سخت‌افزار و استقرار)' : 'Turnkey (Hardware + Software)'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-300 mb-2">
                  {isRtl ? 'زمان‌بندی هدف برای بهره‌برداری:' : 'Delivery Horizon:'}
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-brand-orange"
                >
                  <option value="urgent">{isRtl ? 'ضرب‌الاجل رویداد (کمتر از ۱ ماه)' : 'Urgent (< 1 month)'}</option>
                  <option value="1-3-months">{isRtl ? '۱ تا ۳ ماه (پروژه استاندارد)' : '1 - 3 months (Standard)'}</option>
                  <option value="3-6-months">{isRtl ? '۳ تا ۶ ماه (شبیه‌ساز پیشرفته سازمانی)' : '3 - 6 months (Enterprise)'}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Project Description & Optional Attachments */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {isRtl ? '۳. شرح چشم‌انداز و پیوست‌های فنی' : '3. Project Vision & Optional Attachments'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                {isRtl ? 'ایده، سناریو یا نیازمندی‌های کلیدی سیستم را شرح دهید.' : 'Describe technical requirements and visual expectations.'}
              </p>
            </div>

            <div>
              <label htmlFor="project-scope" className="block text-xs font-mono font-medium text-neutral-300 mb-2">
                {isRtl ? 'شرح نیازمندی‌های پروژه' : 'Project Scope & Requirements'} *
              </label>
              <textarea
                id="project-scope"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  isRtl
                    ? 'به عنوان مثال: ما به یک غرفه نمایشگاهی تعاملی با سنسور LiDAR و مانیتورینگ آنلاین نیاز داریم که بازدیدکنندگان بتوانند...'
                    : 'e.g. We require a multiplayer VR turbine training simulator with realistic physics and trainee performance reporting...'
                }
                aria-required="true"
                aria-invalid={errors.description ? 'true' : 'false'}
                aria-describedby={errors.description ? 'project-scope-error' : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-[#0E1117] border ${
                  errors.description ? 'border-red-500' : 'border-white/[0.1] focus:border-brand-orange'
                } text-white placeholder-neutral-500 text-xs focus:outline-none transition-all`}
              />
              {errors.description && (
                <p id="project-scope-error" className="text-red-400 text-[11px] mt-1.5">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Optional Attachments Link */}
            <div>
              <label htmlFor="project-attachment" className="block text-xs font-mono font-medium text-neutral-300 mb-2 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-brand-orange" />
                <span>{isRtl ? 'لینک اسناد، فیگما یا فایل پیوست (اختیاری)' : 'Attachment Link (Figma, Drive, Dropbox, PDF - Optional)'}</span>
              </label>
              <input
                id="project-attachment"
                type="url"
                value={attachmentLink}
                onChange={(e) => setAttachmentLink(e.target.value)}
                placeholder="https://drive.google.com/... or https://figma.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">
                {isRtl
                  ? 'در صورت وجود پروپوزال، فایل سه‌بعدی یا دیزاین فیگما، لینک اشتراک‌گذاری آن را اینجا قرار دهید.'
                  : 'Provide public or view-only links to technical specifications or CAD files.'}
              </span>
            </div>
          </div>
        )}

        {/* Step 4: Contact Details */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {isRtl ? '۴. اطلاعات تماس و ارسال بریف' : '4. Contact Details & Submission'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                {isRtl ? 'تیم مهندسی استودیو پس از دریافت بریف با چه کسی در ارتباط باشد؟' : 'Who should receive the preliminary architecture breakdown?'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="project-name" className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                  {isRtl ? 'نام و نام خانوادگی' : 'Full Name'} *
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder={isRtl ? 'مثال: علی احمدی' : 'Alex Johnson'}
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'project-name-error' : undefined}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
                />
                {errors.name && (
                  <p id="project-name-error" className="text-red-400 text-[11px] mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="project-email" className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                  {isRtl ? 'ایمیل کاری' : 'Business Email'} *
                </label>
                <input
                  id="project-email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="name@company.com"
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'project-email-error' : undefined}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
                />
                {errors.email && (
                  <p id="project-email-error" className="text-red-400 text-[11px] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="project-company" className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                  {isRtl ? 'نام شرکت یا برند (اختیاری)' : 'Organization / Brand (Optional)'}
                </label>
                <input
                  id="project-company"
                  type="text"
                  value={contact.company}
                  onChange={(e) => setContact({ ...contact, company: e.target.value })}
                  placeholder={isRtl ? 'نام سازمان شما' : 'Acme Corp'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="project-phone" className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                  {isRtl ? 'شماره تماس مستقیم' : 'Phone Number'}
                </label>
                <input
                  id="project-phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+98 912 ..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1117] border border-white/[0.1] text-white text-xs focus:border-brand-orange focus:outline-none"
                />
              </div>
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
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {step === 4 ? (
              <span>{isRtl ? 'تکمیل و ساخت بریف فنی' : 'Compile Structured RFP'}</span>
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
