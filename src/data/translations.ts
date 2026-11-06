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
    fa: 'MIGO',
  },
  brandTagline: {
    en: 'Creative Technology Studio',
    fa: 'استودیو فناوری خلاق',
  },
  heroHeadingLine1: {
    en: 'ENGINEERING',
    fa: 'مهندسی تجربیات',
  },
  heroHeadingAccent: {
    en: 'INTERACTIVE',
    fa: 'تعاملی و فضایی',
  },
  heroHeadingLine2: {
    en: 'REALITIES.',
    fa: 'فراتر از مرزها.',
  },
  heroSubheadline: {
    en: '// Spatial Computing • Virtual Reality (VR/MR) • WebAR • Serious Games',
    fa: '// رایانش فضایی • واقعیت مجازی و ترکیبی (VR/MR) • وب‌آر (WebAR) • بازی‌های تعاملی و جدی',
  },
  heroDescription: {
    en: 'MIGO blends real-time 3D graphics, spatial computing, tactile hardware sensors, and simulation physics to engineer extraordinary digital brand experiences and mission-critical training tools.',
    fa: 'استودیو MIGO پیوندگاه هنر دیجیتال، مهندسی ریل‌تایم و پردازش فیزیکی است. ما با تلفیق گرافیک سه‌بعدی بی‌درنگ، واقعیت مجازی و سنسورهای تعاملی، غرفه‌های نمایشگاهی شاخص، شبیه‌سازهای صنعتی و تجربیات فضایی ماندگار خلق می‌کنیم.',
  },
  exploreWork: {
    en: 'Explore Case Studies',
    fa: 'کاوش در پروژه‌ها',
  },
  exploreLab: {
    en: 'Enter Experiments Lab',
    fa: 'ورود به آزمایشگاه تجربی',
  },
  startProject: {
    en: 'Start a Project',
    fa: 'آغاز همکاری و پروژه',
  },
  whatWeDo: {
    en: 'Core Specializations',
    fa: 'تخصص‌ها و حوزه‌های فعالیت',
  },
  whatWeDoDesc: {
    en: 'We craft high-performance interactive experiences bridging physical architecture and digital imagination.',
    fa: 'آفرینش تجربیات تعاملی و چندحسی که مرز میان فضای فیزیکی و دنیای دیجیتال را محو می‌کنند.',
  },
  selectedWork: {
    en: 'Selected Client Work',
    fa: 'پروژه‌های شاخص و برگزیده',
  },
  selectedWorkDesc: {
    en: 'Production deployments spanning virtual reality rigs, WebAR configurators, interactive exhibitions, and simulation engines.',
    fa: 'نمونه‌ای از سیستم‌های عملیاتی استودیو شامل شبیه‌سازهای پیشرفته VR، کانفیگوراتورهای سه‌بعدی WebAR و چیدمان‌های تعاملی نمایشگاهی.',
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
    fa: 'کاوش در مرزهای گرافیک وب؛ آزمایش‌های تعاملی با شیدرهای بی‌درنگ WebGL، تایپوگرافی زنده و تعاملات نوین مستقیماً در مرورگر شما.',
  },
  ourApproach: {
    en: 'From Concept to Deployment',
    fa: 'از خلق کانسپت تا استقرار عملیاتی',
  },
  ourApproachDesc: {
    en: 'Our four-stage engineering methodology guarantees high-fidelity visuals, 60+ FPS performance, and hardware stability.',
    fa: 'فرآیند مهندسی چهارگانه MIGO تضمین‌کننده خروجی بصری سینماتیک، فریم‌ریت پایدار ۶۰+ و کارکرد بی‌نقص در شلوغ‌ترین رویدادهاست.',
  },
  industries: {
    en: 'Industries We Empower',
    fa: 'صنایع و کاربردهای هدف',
  },
  techStackHeadline: {
    en: 'Industrial-Grade Technology Stack',
    fa: 'زیرساخت فنی و ابزارهای مهندسی',
  },
  techStackDesc: {
    en: 'Built on Unreal Engine 5, Unity Spatial XR, WebGL/Three.js, LiDAR sensors, and custom microcontrollers.',
    fa: 'توسعه اختصاصی بر پایه Unreal Engine 5، یونیتی، Three.js، سنسورهای لیزری لایدار و پردازنده‌های سخت‌افزاری تعبیه شده.',
  },
  aboutPreviewHeadline: {
    en: 'Where Precision Engineering Meets Digital Artistry.',
    fa: 'تلاقی مهندسی دقیق و هنر دیجیتال.',
  },
  aboutPreviewText: {
    en: 'MIGO is an independent creative technology studio based in Tehran with international delivery capability. We reject generic templates in favor of tailored real-time engines, sensory interactions, and memorable spatial computing.',
    fa: 'استودیو فناوری خلاق MIGO با تمرکز بر مرزهای تعامل انسان و کامپیوتر متولد شده است. ما قالب‌های آماده و سنتی را کنار می‌گذاریم تا با مهندسی اختصاصی انجین‌های سه‌بعدی و سخت‌افزارهای حسگر، تجربیاتی نو، جسورانه و ماندگار برای برندهای پیشرو خلق کنیم.',
  },
  learnMoreAboutUs: {
    en: 'Learn More About Studio',
    fa: 'درباره استودیو و نگرش ما',
  },
  insightsHeadline: {
    en: 'Insights & Technical Notes',
    fa: 'یادداشت‌های فنی و بینش‌ها',
  },
  finalCtaHeadline: {
    en: 'Ready to Build Something Unprecedented?',
    fa: 'آماده‌اید تجربه‌ای بی‌سابقه خلق کنیم؟',
  },
  finalCtaDesc: {
    en: 'Whether you need a trade show showstopper, an enterprise VR training platform, or zero-install WebAR, let’s talk architecture.',
    fa: 'اگر در اندیشه خلق یک غرفه نمایشگاهی پربازدید، شبیه‌ساز آموزش صنعتی یا پرتال واقعیت افزوده سه‌بعدی هستید، برای معماری و امکان‌سنجی فنی پروژه همراه شما هستیم.',
  },
  footerDesc: {
    en: 'MIGO is a premier creative technology studio engineering next-generation VR/MR, WebAR, kinetic exhibition walls, serious games, and real-time 3D simulation.',
    fa: 'استودیو فناوری خلاق MIGO؛ پیشرو در مهندسی واقعیت مجازی و ترکیبی (VR/MR)، وب‌آر بدون نیاز به نصب، اینستالیشن‌های حرکتی نمایشگاهی و شبیه‌سازی صنعتی.',
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
    fa: 'نمای کلی و معماری فنی',
  },
  capabilities: {
    en: 'Capabilities & Deliverables',
    fa: 'قابلیت‌ها و خروجی‌های اجرایی',
  },
  useCases: {
    en: 'Real-world Applications',
    fa: 'کاربردها در دنیای واقعی',
  },
  technologiesUsed: {
    en: 'Core Technologies',
    fa: 'فناوری‌ها و ابزارهای کلیدی',
  },
  faq: {
    en: 'Technical FAQ',
    fa: 'پرسش‌های متداول فنی',
  },
  projectChallenge: {
    en: 'The Challenge',
    fa: 'مسئله و چالش پروژه',
  },
  creativeSolution: {
    en: 'Engineered Solution',
    fa: 'راهکار مهندسی‌شده استودیو',
  },
  technicalImplementation: {
    en: 'Technical Pipeline',
    fa: 'پایپ‌لاین فنی و معماری نرم‌افزار',
  },
  outcomes: {
    en: 'Measured Impact',
    fa: 'نتایج و دستاوردهای ملموس',
  },
  relatedProjects: {
    en: 'Related Projects',
    fa: 'سایر پروژه‌های مرتبط',
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
    fa: 'ارتباط با ما',
  },
  startProjectTitle: {
    en: 'Initiate a Project with MIGO',
    fa: 'آغاز همکاری و سفارش پروژه',
  },
  startProjectSubtitle: {
    en: 'Brief us on your timeline, hardware scope, and creative goals. Our technical leads will respond within 24 hours.',
    fa: 'اهداف کلیدی، فضای اجرا و بستر سخت‌افزاری مدنظرتان را در چند گام ساده ثبت کنید؛ معماران فنی استودیو MIGO جهت تحلیل نیازمندی‌ها و ارائه پروپوزال با شما تماس خواهند گرفت.',
  },
  webglFallbackNotice: {
    en: 'Interactive 3D preview running in optimized 2D fallback mode. For the full real-time shader experience, enable WebGL hardware acceleration.',
    fa: 'پیش‌نمایش تعاملی در حالت بهینه دومرحله‌ای رندر می‌شود. برای فعال‌سازی کامل شیدرهای گرافیکی، شتاب‌دهنده سخت‌افزاری مرورگر خود را فعال کنید.',
  },
  soundOn: {
    en: 'Sound FX: ON',
    fa: 'افکت صوتی: روشن',
  },
  soundOff: {
    en: 'Sound FX: MUTED',
    fa: 'افکت صوتی: بی‌صدا',
  },
};
