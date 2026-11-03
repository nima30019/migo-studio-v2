import React from 'react';
import type { Metadata } from 'next';
import { Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Locale, UI_STRINGS } from '@/data/translations';
import { ContactForm } from '@/components/ContactForm';
import { StructuredData } from '@/components/StructuredData';
import { SpotlightCard } from '@/components/SpotlightCard';
import { getBreadcrumbSchema } from '@/utils/schema';
import { createLocalizedMetadata } from '@/utils/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isFa = params.locale === 'fa';
  return createLocalizedMetadata({
    locale: params.locale,
    path: '/contact',
    title: isFa ? 'تماس با استودیو MIGO' : 'Contact MIGO Studio',
    description: isFa
      ? 'راه‌های ارتباطی با تیم فنی و مهندسی استودیو MIGO جهت مشاوره، استعلام پروژه‌های واقعیت مجازی، غرفه‌های تعاملی و بازی‌سازی.'
      : 'Connect with MIGO Creative Technology Studio leads for architectural feasibility, RFP submissions, and spatial project consultations.',
  });
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: UI_STRINGS.contactUs[locale], path: '/contact' },
  ]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <StructuredData id="contact-breadcrumbs" data={breadcrumbs} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
          {isRtl ? 'کانال‌های ارتباطی مستقیم' : 'Direct Engineering Line'}
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          {UI_STRINGS.contactUs[locale]}
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
          {isRtl
            ? 'برای گفتگو پیرامون معماری فنی پروژه، تخمین زمان‌بندی و دریافت پروپوزال با سرپرستان فنی استودیو در ارتباط باشید.'
            : 'Initiate a technical dialogue with our leads. We provide architectural assessments, hardware specifications, and turnaround estimates.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Side */}
        <div className="lg:col-span-5 space-y-6">
          <SpotlightCard className="p-7 space-y-6">
            <h2 className="font-display font-bold text-xl text-white">
              {isRtl ? 'دفتر و مشخصات رسمی استودیو' : 'Studio Coordinates'}
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-mono text-neutral-400">
                    {isRtl ? 'ایمیل رسمی و مکاتبات:' : 'Direct Inquiries:'}
                  </span>
                  <a href="mailto:hello@migo-studio.com" className="text-white hover:text-brand-orange transition-colors">
                    hello@migo-studio.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-mono text-neutral-400">
                    {isRtl ? 'مرکز استودیو:' : 'Studio Headquarters:'}
                  </span>
                  <span className="text-white">
                    {isRtl ? 'تهران، ایران • استقرار بین‌المللی' : 'Tehran, Iran • Worldwide Deployments'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-mono text-neutral-400">
                    {isRtl ? 'تعهد پاسخگویی:' : 'Response SLA:'}
                  </span>
                  <span className="text-white">
                    {isRtl ? 'حداکثر ۲۴ ساعت کاری' : 'Under 24 hours guaranteed'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-neutral-400 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>NON-DISCLOSURE AGREEMENT (NDA) READY</span>
              </div>
              <p className="font-light leading-relaxed">
                {isRtl
                  ? 'تمام ایده‌ها و اسناد ارسالی شما پیش از آغاز گفتگو مشمول تعهد رازداری و حفظ مالکیت معنوی هستند.'
                  : 'All briefs and technical specifications remain confidential under standard bilateral NDA terms.'}
              </p>
            </div>
          </SpotlightCard>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-7">
          <SpotlightCard className="p-7 sm:p-10">
            <ContactForm />
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
