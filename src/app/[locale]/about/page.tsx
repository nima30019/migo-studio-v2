import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Cpu,
  Layers,
  ShieldCheck,
  MapPin,
  Flame,
  Binary,
  Code2,
  Workflow,
  Wrench,
  MonitorCheck,
  CheckCircle2,
} from 'lucide-react';
import { Locale, UI_STRINGS } from '@/data/translations';
import { StructuredData } from '@/components/StructuredData';
import { SpotlightCard } from '@/components/SpotlightCard';
import { DirectionAwareArrow } from '@/components/direction/DirectionAwareArrow';
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
    path: '/about',
    title: isFa ? 'فلسفه، فناوری و تیم مهندسی' : 'Philosophy, Technology & Team',
    description: isFa
      ? 'آشنایی عمیق با فلسفه استودیو MIGO، رویکرد خلاقانه، فناوری‌های کلیدی، تخصص‌های تیمی، متدولوژی مهندسی و محیط آزمایشگاهی استودیو.'
      : 'Explore MIGO Studio architecture: our core philosophy, creative approach, industrial tech stack, cross-disciplinary team, and turnkey delivery workflow.',
  });
}

export default function StudioPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale === 'en' ? 'en' : 'fa';
  const isRtl = locale === 'fa';

  const breadcrumbs = getBreadcrumbSchema(locale, [
    { name: isRtl ? 'صفحه اصلی' : 'Home', path: '/' },
    { name: isRtl ? 'استودیو' : 'Studio', path: '/about' },
  ]);

  // Section 1: Studio Philosophy Pillars
  const philosophyPillars = [
    {
      icon: Zap,
      title: { en: 'Performance as a Feature', fa: 'کارایی و فریم‌ریت، ویژگی اصلی ما' },
      desc: {
        en: 'We reject bloated templates. Every shader, polygon, and draw call is budgeted for locked 60+ FPS to guarantee zero motion sickness in VR and instantaneous Web loads.',
        fa: 'ما ساختارهای سنگین و کلیشه‌ای وب را رد می‌کنیم. هر شیدر و مش هندسی برای دستیابی به ۶۰+ فریم پایدار بودجه‌بندی می‌شود تا سرگیجه در VR به صفر برسد.',
      },
    },
    {
      icon: Cpu,
      title: { en: 'The Physical-Digital Continuum', fa: 'پیوند بی‌واسطه فیزیک و تصویر' },
      desc: {
        en: 'Digital experiences should not remain trapped behind flat screens. We link code to physical computing, spatial sensors, depth cameras, and tactile actuators.',
        fa: 'جهان دیجیتال نباید در صفحات تخت محصور بماند. ما کد را به سنسورهای فضایی، دوربین‌های عمق‌سنج، ردیاب‌های حرکتی و کنترلرهای لمسی پیوند می‌دهیم.',
      },
    },
    {
      icon: ShieldCheck,
      title: { en: 'Autonomous Turnkey Stability', fa: 'پایداری عملیاتی ترن‌کی ۲۴/۷' },
      desc: {
        en: 'Our trade show installations and enterprise training platforms operate autonomously for weeks under heavy visitor loads with zero memory leaks.',
        fa: 'کیوسک‌ها و دیوارهای تعاملی نمایشگاهی ما هفته‌ها زیر بار ترافیک شدید بازدیدکنندگان بدون افت فریم یا نشت حافظه اجرا می‌شوند.',
      },
    },
  ];

  // Section 2: Creative Approach
  const creativePrinciples = [
    {
      num: '01',
      title: { en: 'Spatial-First Ergonomics', fa: 'ارگونومی انسان‌محور در فضای سه‌بعدی' },
      desc: {
        en: 'Designing intuitive physical gestures and natural spatial scales rather than porting legacy 2D UI paradigms into 3D environments.',
        fa: 'طراحی ژست‌های حرکتی طبیعی دست و مقیاس‌های فضایی متناسب با آناتومی انسان، به جای انتقال صرف المان‌های دوبعدی به فضای سه‌بعدی.',
      },
    },
    {
      num: '02',
      title: { en: 'Physics-Grounded Feedback', fa: 'فیزیک شبیه‌سازی‌شده و بازخورد حسی' },
      desc: {
        en: 'Simulating true mass, momentum, collision impulse, and spatial 3D audio so every interaction feels tactile and authentic.',
        fa: 'محاسبه تکانه، اینرسی، اصطکاک و صوت فضایی سه‌بعدی به گونه‌ای که تعامل کاربر با قطعات مجازی کاملاً طبیعی و حسی احساس شود.',
      },
    },
    {
      num: '03',
      title: { en: 'Zero-Friction Accessibility', fa: 'دسترسی سریع با حداقل اصطکاک' },
      desc: {
        en: 'From instant WebAR activated by a single packaging QR scan to tetherless standalone VR headsets requiring no complex setups.',
        fa: 'از WebAR بدون نیاز به نصب اپلیکیشن تنها با یک اسکن، تا هدست‌های مستقل VR که کاربر بدون پیچیدگی ظرف چند ثانیه وارد فضا می‌شود.',
      },
    },
  ];

  // Section 3: Core Technologies Matrix
  const techCategories = [
    {
      category: { en: 'Game Engines & Real-Time Rigs', fa: 'انجین‌های ریل‌تایم و بازی‌سازی' },
      items: ['Unreal Engine 5 (Nanite & Lumen)', 'Unity Spatial XR Engine', 'Chaos Physics Engine', 'NVIDIA PhysX'],
    },
    {
      category: { en: 'Web Graphics & Spatial Web', fa: 'گرافیک وب و وب فضایی' },
      items: ['WebGL 2.0 & WebGPU', 'Three.js Pipeline', 'Custom GLSL Shaders', 'WebXR Device API', 'Draco Compression'],
    },
    {
      category: { en: 'Sensors & Physical Hardware', fa: 'سنسورها و پردازش فیزیکی' },
      items: ['Azure Kinect & Intel RealSense', 'Industrial Solid-State LiDAR', 'TouchDesigner & Notch', 'Custom Arduino/ESP32 Hubs'],
    },
    {
      category: { en: '3D Computer Graphics Pipelines', fa: 'پایپ‌لاین مدلسازی و PBR' },
      items: ['Blender Industrial Hard-Surface', 'Substance 3D Painter', 'KTX2 / Basis Universal Textures', 'GLTF/GLB PBR Standards'],
    },
  ];

  // Section 4: Team & Disciplinary Architecture
  const teamDisciplines = [
    {
      role: { en: 'Spatial Computing Architects', fa: 'معماران رایانش فضایی و VR/MR' },
      desc: {
        en: 'Leads responsible for OpenXR integrations, tracking latency budgets, comfort locomotion, and spatial UI ergonomics.',
        fa: 'متخصصان یکپارچه‌سازی OpenXR، بهینه‌سازی تاخیر ردیابی سر و طراحی ارگونومی ناوبری فضایی.',
      },
      skills: ['OpenXR', 'Meta SDK', 'Apple VisionOS', 'Spatial Audio'],
    },
    {
      role: { en: 'GPU Shader & Physics Engineers', fa: 'مهندسان شیدر GPU و فیزیک' },
      desc: {
        en: 'Crafting mathematical noise shaders, fluid dynamics, collision solvers, and rigid-body constraints locked at 60 FPS.',
        fa: 'توسعه شیدرهای محاسباتی GPU، دینامیک سیالات، حل‌کننده‌های برخورد و پایپ‌لاین‌های ریل‌تایم.',
      },
      skills: ['GLSL / HLSL', 'Compute Shaders', 'Chaos Physics', 'Optimization'],
    },
    {
      role: { en: 'Hardware & Sensor Integration Leads', fa: 'سرپرستان سخت‌افزار و سنسورهای تعاملی' },
      desc: {
        en: 'Engineering communication protocols for LiDAR, depth cameras, multi-touch video walls, and custom microcontrollers.',
        fa: 'طراحی پروتکل‌های ارتباطی سنسورهای لایدار، دوربین‌های عمق‌سنج، ویدیو وال‌ها و میکروکنترلرها.',
      },
      skills: ['LiDAR Telemetry', 'TouchDesigner', 'Kinect SDK', 'Turnkey Kiosks'],
    },
    {
      role: { en: 'Real-Time 3D Technical Artists', fa: 'طراحان و آرتیست‌های تکنیکال سه‌بعدی' },
      desc: {
        en: 'High-to-low poly baking, physically based lighting, texture memory packing, and cinematic mechanical animations.',
        fa: 'مدل‌سازی صنعتی، متریال‌سازی PBR، بهینه‌سازی بافت‌ها و انیمیشن‌های دقیق مکانیکی.',
      },
      skills: ['Hard-Surface PBR', 'Lighting & VFX', 'Draco Meshopt', 'Cinematics'],
    },
  ];

  // Section 5: Engineering Workflow
  const workflowPhases = [
    {
      step: '01',
      title: { en: 'Technical Discovery & Feasibility', fa: 'کشف و ارزیابی معماری فنی' },
      desc: {
        en: 'We dissect spatial constraints, hardware budgets, sensor telemetry specs, and target frame rates.',
        fa: 'تحلیل دقیق محدودیت‌های محیط، سخت‌افزارهای هدف، مشخصات تله‌متری سنسورها و بودجه فریم‌ریت.',
      },
    },
    {
      step: '02',
      title: { en: 'Rapid Interactive Spatial Graybox', fa: 'پروتوتایپ تعاملی سریع (Graybox)' },
      desc: {
        en: 'Before final 3D artwork, we validate physics loops, scale, and ergonomics in interactive graybox engines.',
        fa: 'پیش از تولید مدل‌های نهایی، حلقه فیزیک و تعاملات ارگونومیک با پروتوتایپ سریع اعتبارسنجی می‌شود.',
      },
    },
    {
      step: '03',
      title: { en: 'High-Fidelity Engine Production', fa: 'تولید وفادارانه شیدر و متریال' },
      desc: {
        en: 'PBR shading, volumetric lighting, spatial audio cues, and multi-user network synchronization.',
        fa: 'پیاده‌سازی شیدرهای PBR، نورپردازی حجمی، افکت‌های صوتی فضایی و همگام‌سازی چندکاربره تحت شبکه.',
      },
    },
    {
      step: '04',
      title: { en: 'On-Site Calibration & Turnkey Deployment', fa: 'کالیبراسیون در محل و استقرار ترن‌کی' },
      desc: {
        en: 'Mounting sensors, zero-drift spatial calibration, hardware stress-testing, and autonomous remote monitoring.',
        fa: 'نصب سخت‌افزارها، کالیبراسیون بدون خطای سنسورها، تست استرس ممتد و راه‌اندازی تله‌متری مانیتورینگ.',
      },
    },
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      <StructuredData id="studio-breadcrumbs" data={breadcrumbs} />

      {/* Hero Header */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
          {isRtl ? 'هویت استودیو و ارکان مهندسی' : 'Studio Manifesto & Architecture'}
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
          {UI_STRINGS.aboutPreviewHeadline[locale]}
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
          {UI_STRINGS.aboutPreviewText[locale]}
        </p>
      </div>

      {/* 1. Studio Philosophy */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-orange uppercase">
            <Flame className="w-3.5 h-3.5" />
            <span>01 // {isRtl ? 'فلسفه استودیو' : 'Studio Philosophy'}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-white">
            {isRtl ? 'اصول بنیادین در مهندسی تجربیات تعاملی' : 'Core Architectural Pillars'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophyPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <SpotlightCard key={i} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-brand-orange flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {p.title[locale]}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {p.desc[locale]}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* 2. Creative Approach */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // {isRtl ? 'رویکرد خلاقانه' : 'Creative Approach'}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-white">
            {isRtl ? 'تلاقی هنر دیجیتال و مهندسی دقیق' : 'Bridging Imagination & High-Precision Code'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creativePrinciples.map((cp) => (
            <SpotlightCard key={cp.num} className="p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-3xl font-extrabold text-cyan-400/40 block mb-4">
                  {cp.num}
                </span>
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {cp.title[locale]}
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {cp.desc[locale]}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 3. Core Technologies Matrix */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 uppercase">
            <Binary className="w-3.5 h-3.5" />
            <span>03 // {isRtl ? 'فناوری‌های کلیدی' : 'Core Technologies'}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-white">
            {UI_STRINGS.techStackHeadline[locale]}
          </h2>
          <p className="text-sm text-neutral-400 font-light">
            {UI_STRINGS.techStackDesc[locale]}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, idx) => (
            <SpotlightCard key={idx} className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-white mb-4 pb-2 border-b border-white/[0.08]">
                  {cat.category[locale]}
                </h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item, iIdx) => (
                    <li key={iIdx} className="text-xs text-neutral-300 font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 4. Team & Expertise Architecture */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase">
            <Code2 className="w-3.5 h-3.5" />
            <span>04 // {isRtl ? 'تیم و تخصص‌ها' : 'Team & Engineering Squads'}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-white">
            {isRtl ? 'تیم چندرشته‌ای متخصص در فضاهای تعاملی' : 'Cross-Disciplinary Engineering Architecture'}
          </h2>
          <p className="text-sm text-neutral-400 font-light max-w-2xl">
            {isRtl
              ? 'تیم استودیو MIGO متشکل از متخصصانی است که مرز بین گرافیک بی‌درنگ، برنامه‌نویسی سخت‌افزار و طراحی تعاملی را به هم متصل می‌کنند.'
              : 'Our studio brings together specialized leads spanning game engine architecture, low-level shader engineering, and sensor computing.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamDisciplines.map((d, i) => (
            <SpotlightCard key={i} className="p-7 space-y-4">
              <h3 className="font-display font-bold text-xl text-white">
                {d.role[locale]}
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {d.desc[locale]}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
                {d.skills.map((s, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-neutral-300">
                    {s}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 5. Engineering Workflow */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-orange uppercase">
            <Workflow className="w-3.5 h-3.5" />
            <span>05 // {isRtl ? 'جریان کاری استودیو' : 'Studio Workflow'}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-white">
            {UI_STRINGS.ourApproach[locale]}
          </h2>
          <p className="text-sm text-neutral-400 font-light">
            {UI_STRINGS.ourApproachDesc[locale]}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowPhases.map((phase) => (
            <SpotlightCard key={phase.step} className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-3xl font-extrabold text-brand-orange/40 block mb-3">
                  {phase.step}
                </span>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {phase.title[locale]}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {phase.desc[locale]}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 6. Studio Environment & Staging */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
            <MonitorCheck className="w-3.5 h-3.5" />
            <span>06 // {isRtl ? 'محیط و استانداردهای آزمایشگاهی' : 'Studio Environment'}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-white">
            {isRtl ? 'لابراتوار کالیبراسیون و تست سخت‌افزارهای فضایی' : 'Spatial Testing Staging & Calibration Lab'}
          </h2>
        </div>

        <SpotlightCard className="p-8 sm:p-12 border-white/[0.12] bg-[#0A0D14]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-orange">
                <MapPin className="w-4 h-4" />
                <span>{isRtl ? 'تهران، ایران • استقرار بین‌المللی' : 'Tehran, Iran • Worldwide Deployments'}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                {isRtl ? 'تضمین پایداری پیش از استقرار در محل کارفرما' : 'Pre-Deployment Stress Testing'}
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {isRtl
                  ? 'تمامی پروژه‌ها پیش از تحویل، در محیط شبیه‌سازی‌شده استودیو تحت آزمون‌های مداوم ۴۸ ساعته از نظر نرخ فریم، حرارت پردازنده و پایداری سنسورهای LiDAR و کینکت قرار می‌گیرند.'
                  : 'Every interactive kiosk, video wall, and VR rig undergoes a mandatory 48-hour continuous stress test in our staging lab before on-site installation.'}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover shadow-glow-orange transition-all"
              >
                <span>{UI_STRINGS.contactUs[locale]}</span>
                <DirectionAwareArrow type="up-right" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </section>
    </div>
  );
}
