'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    setIsSubmitting(true);
    // Simulate instantaneous local response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playSuccess();
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-display font-bold text-2xl text-white">
          {isRtl ? 'پیام شما با موفقیت دریافت شد!' : 'Message Received!'}
        </h3>
        <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
          {isRtl
            ? 'از تماس شما متشکریم. تیم فنی و مهندسی استودیو MIGO حداکثر ظرف ۲۴ ساعت کاری با شما تماس خواهند گرفت.'
            : 'Thank you for reaching out. The MIGO engineering leads will review your inquiry and follow up within 24 hours.'}
        </p>
        <button
          onClick={() => {
            playClick();
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
          }}
          className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-white/[0.08] hover:bg-white/[0.14] transition-colors"
        >
          {isRtl ? 'ارسال پیام جدید' : 'Send Another Message'}
        </button>
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
            placeholder={isRtl ? 'name@company.com' : 'name@company.com'}
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
          {isRtl ? 'شرح ایده یا پروژه' : 'Project Details & Goals'} *
        </label>
        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={
            isRtl
              ? 'اهداف، زمان‌بندی مورد نظر و جزییات اولیه پروژه خود را توضیح دهید...'
              : 'Describe your requirements, intended hardware, target launch date, and budget expectations...'
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
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange hover:shadow-glow-orange-lg transition-all text-sm min-h-[44px] cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <span>{isRtl ? 'در حال ارسال پیام...' : 'Transmitting...'}</span>
        ) : (
          <>
            <span>{isRtl ? 'ارسال پیام به استودیو' : 'Send Inquiry'}</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
