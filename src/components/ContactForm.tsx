'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Copy, Check } from 'lucide-react';
import { useDirection } from './direction/DirectionProvider';
import { useAudio } from './AudioController';

export function ContactForm() {
  const { locale, isRtl } = useDirection();
  const { playClick, playSuccess } = useAudio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = isRtl ? 'لطفاً نام خود را وارد کنید.' : 'Please enter your name.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isRtl ? 'لطفاً یک ایمیل معتبر وارد کنید.' : 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = isRtl
        ? 'پیام شما باید حداقل ۱۰ کاراکتر باشد.'
        : 'Your message must be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!validate()) return;

    setIsSubmitted(true);
    playSuccess();
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[MIGO Inquiry] ${formData.subject}: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    return `mailto:hello@migo-studio.com?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    playClick();
    const text = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-bold text-2xl text-white">
            {isRtl ? 'پیام شما آماده ارسال مستقیم است!' : 'Inquiry Compiled Successfully!'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed font-light">
            {isRtl
              ? 'پیام شما فرمت‌بندی شد. جهت ارتباط بدون واسطه، می‌توانید آن را از طریق نرم‌افزار ایمیل خود ارسال نمایید یا متن آن را کپی کنید.'
              : 'Your inquiry has been structured. To ensure direct deliverability, launch your mail client or copy the brief below to send to hello@migo-studio.com.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={getMailtoUrl()}
            onClick={playClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>{isRtl ? 'ارسال با نرم‌افزار ایمیل (Mailto)' : 'Transmit via Email Client'}</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-neutral-200 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isRtl ? 'کپی شد!' : 'Copied!') : (isRtl ? 'کپی متن پیام' : 'Copy Inquiry')}</span>
          </button>
        </div>

        <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400">
          hello@migo-studio.com // RESPONSE SLA &lt; 24H
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-mono font-medium text-neutral-300 mb-2">
            {isRtl ? 'نام و نام خانوادگی' : 'Full Name'} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={isRtl ? 'مثال: علی احمدی' : 'e.g. Alex Johnson'}
            className={`w-full px-4 py-3 rounded-xl bg-[#0F1218] border ${
              errors.name ? 'border-red-500/80 focus:ring-red-500' : 'border-white/[0.1] focus:border-brand-orange'
            } text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-mono font-medium text-neutral-300 mb-2">
            {isRtl ? 'ایمیل کاری' : 'Business Email'} *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@company.com"
            className={`w-full px-4 py-3 rounded-xl bg-[#0F1218] border ${
              errors.email ? 'border-red-500/80 focus:ring-red-500' : 'border-white/[0.1] focus:border-brand-orange'
            } text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Phone */}
        <div>
          <label className="block text-xs font-mono font-medium text-neutral-300 mb-2">
            {isRtl ? 'شماره تماس (اختیاری)' : 'Phone Number (Optional)'}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+98 912 000 0000"
            className="w-full px-4 py-3 rounded-xl bg-[#0F1218] border border-white/[0.1] focus:border-brand-orange text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-mono font-medium text-neutral-300 mb-2">
            {isRtl ? 'موضوع ارتباط' : 'Inquiry Scope'}
          </label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0F1218] border border-white/[0.1] focus:border-brand-orange text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all"
          >
            <option value="general">{isRtl ? 'استعلام کلی و همکاری' : 'General Partnership'}</option>
            <option value="vr-mr">{isRtl ? 'واقعیت مجازی و شبیه‌سازی (VR/MR)' : 'Virtual Reality & Simulation'}</option>
            <option value="webar">{isRtl ? 'واقعیت افزوده و WebAR' : 'WebAR & 3D Configurator'}</option>
            <option value="exhibition">{isRtl ? 'فناوری‌های تعاملی نمایشگاهی' : 'Interactive Exhibition Tech'}</option>
            <option value="games">{isRtl ? 'بازی‌سازی و بازی‌های جدی' : 'Serious Games & Development'}</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-mono font-medium text-neutral-300 mb-2">
          {isRtl ? 'شرح پیام' : 'Message'} *
        </label>
        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={
            isRtl
              ? 'موضوع، سوالات یا شرح مختصر پیام خود را بنویسید...'
              : 'Write your questions, partnership details, or general inquiry...'
          }
          className={`w-full px-4 py-3 rounded-xl bg-[#0F1218] border ${
            errors.message ? 'border-red-500/80 focus:ring-red-500' : 'border-white/[0.1] focus:border-brand-orange'
          } text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all`}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange hover:shadow-glow-orange-lg transition-all text-sm min-h-[44px] cursor-pointer"
      >
        <span>{isRtl ? 'آماده‌سازی پیام مستقیم' : 'Prepare Direct Message'}</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
