export type Locale = 'en' | 'fa';
export type Direction = 'ltr' | 'rtl';

export function getDirection(locale: Locale): Direction {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

export interface NavItem {
  key: string;
  label: Record<Locale, string>;
  href: (locale: Locale) => string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: 'home',
    label: { en: 'Home', fa: 'صفحه اصلی' },
    href: (l) => `/${l}`,
  },
  {
    key: 'services',
    label: { en: 'Services', fa: 'خدمات' },
    href: (l) => `/${l}/services`,
  },
  {
    key: 'work',
    label: { en: 'Work', fa: 'پروژه‌ها' },
    href: (l) => `/${l}/work`,
  },
  {
    key: 'lab',
    label: { en: 'Experiments', fa: 'آزمایشگاه' },
    href: (l) => `/${l}/lab`,
  },
  {
    key: 'about',
    label: { en: 'Studio', fa: 'استودیو' },
    href: (l) => `/${l}/about`,
  },
  {
    key: 'insights',
    label: { en: 'Insights', fa: 'مقالات' },
    href: (l) => `/${l}/insights`,
  },
  {
    key: 'contact',
    label: { en: 'Contact', fa: 'تماس' },
    href: (l) => `/${l}/contact`,
  },
];

export const UI_STRINGS = {
  brandName: {
    en: 'MIGO',
    fa: 'میگو',
  },
  brandTagline: {
    en: 'Creative Technology Studio',
    fa: 'استودیو فناوری خلاق',
  },
  heroHeadingLine1: {
    en: 'ENGINEERING',
    fa: 'ما تجربیات',
  },
  heroHeadingAccent: {
    en: 'INTERACTIVE',
    fa: 'تعاملی و غوطه‌ورکننده',
  },
  heroHeadingLine2: {
    en: 'REALITIES.',
    fa: 'خلق می‌کنیم.',
  },
  heroSubheadline: {
    en: '// Spatial Computing • Virtual Reality (VR/MR) • WebAR • Serious Games',
    fa: '// رایانش فضایی • واقعیت مجازی و ترکیبی • WebAR • بازی‌های جدی',
  },
  heroDescription: {
    en: 'MIGO blends real-time 3D graphics, spatial computing, tactile hardware sensors, and simulation physics to engineer extraordinary digital brand experiences and mission-critical training tools.',
    fa: 'استودیو فناوری خلاق MIGO با تلفیق گرافیک پیشرفته ریل‌تایم، رایانش فضایی، سنسورهای فیزیکی و فیزیک شبیه‌سازی، تجربیات دیجیتال متمایز، ابزارهای آموزشی حیاتی و چیدمان‌های نمایشگاهی خلق می‌کند.',
  },
  exploreWork: {
    en: 'Explore Case Studies',
    fa: 'مشاهده پروژه‌ها',
  },
  exploreLab: {
    en: 'Enter Experiments Lab',
    fa: 'ورود به آزمایشگاه تجربی',
  },
  startProject: {
    en: 'Start a Project',
    fa: 'شروع پروژه',
  },
  whatWeDo: {
    en: 'Core Specializations',
    fa: 'زمینه‌های فعالیت ما',
  },
  whatWeDoDesc: {
    en: 'We craft high-performance interactive experiences bridging physical architecture and digital imagination.',
    fa: 'ما تجربیات تعاملی پیشرفته‌ای خلق می‌کنیم که پل ارتباطی میان معماری فیزیکی و تخیل دیجیتال هستند.',
  },
  selectedWork: {
    en: 'Selected Client Work',
    fa: 'پروژه‌های برگزیده',
  },
  selectedWorkDesc: {
    en: 'Production deployments spanning virtual reality rigs, WebAR configurators, interactive exhibitions, and simulation engines.',
    fa: 'پروژه‌های اجرایی شامل سامانه‌های واقعیت مجازی، پیکربندی‌کننده‌های WebAR، چیدمان‌های تعاملی نمایشگاهی و شبیه‌سازها.',
  },
  viewAllWork: {
    en: 'View All Projects',
    fa: 'مشاهده تمام پروژه‌ها',
  },
  labHeadline: {
    en: 'MIGO Experiments Lab',
    fa: 'آزمایشگاه تجربیات MIGO',
  },
  labDesc: {
    en: 'Interactive research, real-time WebGL shaders, kinetic typography, and physical computing prototypes pushed directly to your browser.',
    fa: 'تحقیقات تعاملی، شیدرهای ریل‌تایم WebGL، تایپوگرافی حرکتی و پروتوتایپ‌های پردازش فیزیکی مستقیماً در مرورگر شما.',
  },
  ourApproach: {
    en: 'From Concept to Deployment',
    fa: 'از ایده تا اجرای عملیاتی',
  },
  ourApproachDesc: {
    en: 'Our four-stage engineering methodology guarantees high-fidelity visuals, 60+ FPS performance, and hardware stability.',
    fa: 'متدولوژی چهارمرحله‌ای استودیو MIGO تضمین‌کننده وفاداری بصری بالا، نرخ فریم ۶۰+ پایدار و پایداری کامل سخت‌افزاری است.',
  },
  industries: {
    en: 'Industries We Empower',
    fa: 'صنایعی که با آن‌ها همکاری داریم',
  },
  techStackHeadline: {
    en: 'Industrial-Grade Technology Stack',
    fa: 'بر پایه فناوری‌های صنعتی و روز دنیا',
  },
  techStackDesc: {
    en: 'Built on Unreal Engine 5, Unity Spatial XR, WebGL/Three.js, LiDAR sensors, and custom microcontrollers.',
    fa: 'توسعه بر پایه Unreal Engine 5، یونیتی، وب‌جی‌ال، سنسورهای لایدار و میکروکنترلرهای اختصاصی.',
  },
  aboutPreviewHeadline: {
    en: 'Where Precision Engineering Meets Digital Artistry.',
    fa: 'تلاقی مهندسی دقیق و هنر دیجیتال.',
  },
  aboutPreviewText: {
    en: 'MIGO is an independent creative technology studio based in Tehran with international delivery capability. We reject generic templates in favor of tailored real-time engines, sensory interactions, and memorable spatial computing.',
    fa: 'استودیو MIGO استودیوی تخصصی فناوری‌های خلاق است. ما ساختارهای کلیشه‌ای و تکراری را کنار می‌گذاریم و بر روی طراحی ریل‌تایم، تعاملات حسی چندرسانه‌ای و رایانش فضایی متمرکز می‌شویم.',
  },
  learnMoreAboutUs: {
    en: 'Learn More About Studio',
    fa: 'آشنایی بیشتر با استودیو',
  },
  insightsHeadline: {
    en: 'Insights & Technical Notes',
    fa: 'یادداشت‌های فنی و مقالات',
  },
  finalCtaHeadline: {
    en: 'Ready to Build Something Unprecedented?',
    fa: 'آماده‌اید تجربه‌ای بی‌سابقه خلق کنیم؟',
  },
  finalCtaDesc: {
    en: 'Whether you need a trade show showstopper, an enterprise VR training platform, or zero-install WebAR, let’s talk architecture.',
    fa: 'چه برای غرفه نمایشگاهی متمایز، چه شبیه‌ساز واقعیت مجازی صنعتی یا WebAR، بیایید درباره معماری پروژه صحبت کنیم.',
  },
  footerDesc: {
    en: 'MIGO is a premier creative technology studio engineering next-generation VR/MR, WebAR, kinetic exhibition walls, serious games, and real-time 3D simulation.',
    fa: 'استودیو MIGO، استودیوی تخصصی فناوری‌های خلاق در زمینه توسعه واقعیت مجازی و افزوده، دیوارهای تعاملی نمایشگاهی، بازی‌سازی و شبیه‌سازی سه‌بعدی.',
  },
  rightsReserved: {
    en: 'All rights reserved.',
    fa: 'تمامی حقوق محفوظ است.',
  },
  learnMore: {
    en: 'Learn More',
    fa: 'اطلاعات بیشتر',
  },
  viewProject: {
    en: 'Explore Case Study',
    fa: 'مشاهده جزئیات پروژه',
  },
  runExperiment: {
    en: 'Launch Experiment',
    fa: 'اجرای آزمایش',
  },
  allCategories: {
    en: 'All',
    fa: 'همه موارد',
  },
  overview: {
    en: 'Overview & Architecture',
    fa: 'نمای کلی و معماری',
  },
  capabilities: {
    en: 'Capabilities & Deliverables',
    fa: 'قابلیت‌ها و خروجی‌ها',
  },
  useCases: {
    en: 'Real-world Applications',
    fa: 'کاربردها در دنیای واقعی',
  },
  technologiesUsed: {
    en: 'Core Technologies',
    fa: 'فناوری‌های به‌کاررفته',
  },
  faq: {
    en: 'Technical FAQ',
    fa: 'پرسش‌های متداول فنی',
  },
  projectChallenge: {
    en: 'The Challenge',
    fa: 'چالش پروژه',
  },
  creativeSolution: {
    en: 'Engineered Solution',
    fa: 'راهکار مهندسی‌شده',
  },
  technicalImplementation: {
    en: 'Technical Pipeline',
    fa: 'پایپ‌لاین فنی و معماری',
  },
  outcomes: {
    en: 'Measured Impact',
    fa: 'نتایج و دستاوردهای سنجیده‌شده',
  },
  relatedProjects: {
    en: 'Related Projects',
    fa: 'پروژه‌های مرتبط',
  },
  readArticle: {
    en: 'Read Full Article',
    fa: 'مطالعه کامل مقاله',
  },
  minRead: {
    en: 'min read',
    fa: 'دقیقه مطالعه',
  },
  contactUs: {
    en: 'Get in Touch',
    fa: 'تماس با ما',
  },
  startProjectTitle: {
    en: 'Initiate a Project with MIGO',
    fa: 'شروع همکاری و سفارش پروژه',
  },
  startProjectSubtitle: {
    en: 'Brief us on your timeline, hardware scope, and creative goals. Our technical leads will respond within 24 hours.',
    fa: 'زمان‌بندی، بستر سخت‌افزاری و اهداف پروژه خود را با ما در میان بگذارید. تیم فنی ما ظرف ۲۴ ساعت پاسخگوی شما خواهند بود.',
  },
  webglFallbackNotice: {
    en: 'Interactive 3D preview running in optimized 2D fallback mode. For the full real-time shader experience, enable WebGL hardware acceleration.',
    fa: 'پیش‌نمایش تعاملی سه‌بعدی در حالت بهینه دومرحله‌ای در حال اجراست. برای تجربه شیدرهای ریل‌تایم، شتاب‌دهنده سخت‌افزاری WebGL را فعال کنید.',
  },
  soundOn: {
    en: 'Sound FX: ON',
    fa: 'صدای تعاملی: روشن',
  },
  soundOff: {
    en: 'Sound FX: MUTED',
    fa: 'صدای تعاملی: خاموش',
  },
};
