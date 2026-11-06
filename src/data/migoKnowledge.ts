import { Locale } from './translations';
import { SERVICES } from './services';
import { PROJECTS } from './projects';
import { LAB_EXPERIMENTS } from './lab';

export interface StudioInfo {
  name: string;
  tagline: Record<Locale, string>;
  philosophy: Record<Locale, string>;
  creativeApproach: Record<Locale, string[]>;
  disciplines: Record<Locale, string[]>;
  hardwareCapabilities: Record<Locale, string[]>;
  workflow: Array<{
    step: string;
    title: Record<Locale, string>;
    desc: Record<Locale, string>;
  }>;
  officialLinks: {
    startProject: Record<Locale, string>;
    contact: Record<Locale, string>;
    services: Record<Locale, string>;
    work: Record<Locale, string>;
    lab: Record<Locale, string>;
    about: Record<Locale, string>;
    insights: Record<Locale, string>;
  };
}

export const MIGO_STUDIO_INFO: StudioInfo = {
  name: 'MIGO Creative Technology Studio',
  tagline: {
    fa: 'استودیو فناوری خلاق و رایانش فضایی',
    en: 'Creative Technology & Spatial XR Studio',
  },
  philosophy: {
    fa: 'پیوند معماری فضایی با مهندسی بلادرنگ گرافیک. ما به جای رویکردهای تزئینی، تجربیات تعاملی بر پایه فیزیک دقیق، سنسورهای فیزیکی و بهینه‌سازی حداکثری فریم‌ریت خلق می‌کنیم.',
    en: 'Spatial engineering meets radical aesthetics. Rather than decorative animations, MIGO builds interactive experiences anchored in deterministic physics, physical sensors, and locked framerate budgets.',
  },
  creativeApproach: {
    fa: [
      'اولویت ارگونومی فضایی: طراحی تعاملات متناسب با راحتی و درک کاربر در هدست یا کیوسک فیزیکی',
      'انضباط بودجه فریم: تضمین نرخ فریم ۶۰ تا ۱۲۰ فریم بر ثانیه در پروژه‌های VR و کیوسک‌های تعاملی',
      'کدنویسی اختصاصی درون‌استودیویی: کنترل کامل بر خط لوله گرافیک بدون برون‌سپاری',
      'توسعه ماژولار و مستقل از پلتفرم: قابلیت انطباق نرم‌افزار بر انواع هدست‌ها، سنسورها و مرورگرها',
    ],
    en: [
      'Spatial Ergonomics First: Designing natural interaction loops tailored to user comfort in VR/MR and physical kiosks.',
      'Frame-Budget Discipline: Guaranteeing locked 60 to 120 FPS across standalone headsets and interactive displays.',
      'In-House Real-Time Pipelines: 100% internal engineering with total control over shaders and sensor drivers.',
      'Platform-Agnostic Core: Modular codebases running seamlessly across Meta Quest, PC-VR, WebGPU, and custom hardware.',
    ],
  },
  disciplines: {
    fa: [
      'رایانش فضایی و واقعیت مجازی/ترکیبی (VR / MR / XR)',
      'واقعیت افزوده مبتنی بر وب (Zero-Install WebAR)',
      'اینستالیشن‌های تعاملی، دیوارهای حرکتی و سنسورهای لایدار (LiDAR & TouchDesigner)',
      'شبیه‌سازی‌های صنعتی و دوقلوهای دیجیتال (Digital Twins & Serious Simulators)',
      'توسعه سیستم‌ها و بازی‌های تعاملی با آنریل انجین ۵ و یونیتی ۶',
      'مدل‌سازی و بهینه‌سازی رندرهای سه‌بعدی برای وب (Web3D & WebGPU)',
    ],
    en: [
      'Spatial Computing & Immersive VR/MR/XR',
      'Zero-Install WebAR on standard mobile browsers',
      'Interactive Exhibition Installations, Kinetic Walls & LiDAR Tracking',
      'Industrial Serious Simulations & Digital Twins',
      'Interactive Systems & Games engineered in Unreal Engine 5 & Unity 6',
      'Photorealistic 3D Modeling & Real-Time WebGL/WebGPU Configurator Pipelines',
    ],
  },
  hardwareCapabilities: {
    fa: [
      'هدست‌های واقعیت مجازی و ترکیبی: Meta Quest 3, Pico 4, Apple Vision Pro, HTC Vive Pro',
      'سنسورهای ردیابی فضایی: LiDAR 2D/3D (Hokuyo, Slamtec, Livox), دوربین‌های عمق‌سنج Intel RealSense و Orbbec',
      'نمایشگرها و پردازنده‌ها: دیوارهای LED ماتریس بالا، پروژکشن مپینگ چندکاناله، رندرهای کلاستر و سیستم‌های تاچ‌اسکرین صنعتی',
      'کنترلرهای فیزیکی: بردهای آردوینو و میکروکنترلرهای سفارشی، سنسورهای فشار، اولتراسونیک و محرک‌های فیزیکی',
    ],
    en: [
      'VR/MR Headsets: Meta Quest 3, Pico 4, Apple Vision Pro, HTC Vive Pro PC-VR rigs',
      'Spatial Tracking: 2D/3D LiDAR (Hokuyo, Slamtec), Intel RealSense & Orbbec depth cameras',
      'Displays & Media Servers: Fine-pitch LED walls, multi-projector blending, industrial touchscreen kiosks',
      'Physical Controllers: Custom Arduino/ESP32 microcontrollers, load cells, ultrasonic arrays, and tactile relays',
    ],
  },
  workflow: [
    {
      step: '01',
      title: { fa: 'کشف و معماری فنی', en: 'Technical Architecture & Discovery' },
      desc: {
        fa: 'بررسی محدودیت‌های سخت‌افزاری، بودجه فریم‌ریت، الزامات سنسورها و مساحت فیزیکی اجرا.',
        en: 'Analyzing hardware limits, framerate budgets, sensory requirements, and spatial footprint.',
      },
    },
    {
      step: '02',
      title: { fa: 'پروتوتایپ فضایی و حلقه فیزیک', en: 'Spatial Prototype & Physics Loop' },
      desc: {
        fa: 'تولید سریع نمونه اولیه تعاملی در موتور بازی جهت اعتبارسنجی ارگونومی کاربر و مکانیک تعامل.',
        en: 'Building rapid interactive grayboxes in Unity or WebGL to prove mechanics and user ergonomics.',
      },
    },
    {
      step: '03',
      title: { fa: 'تولید شیدرهای ریل‌تایم و متریال PBR', en: 'Real-Time Shader & PBR Production' },
      desc: {
        fa: 'نورپردازی واقع‌گرایانه، صدای سه‌بعدی فضایی، شبیه‌سازی ذرات و بازخوردهای لمسی.',
        en: 'Crafting photorealistic lighting, spatial 3D audio, particle simulations, and tactile haptics.',
      },
    },
    {
      step: '04',
      title: { fa: 'استقرار سخت‌افزاری و اجرای عملیاتی', en: 'Turnkey Hardware & Deployment' },
      desc: {
        fa: 'کالیبراسیون سنسورها در محل، تست استرس کیوسک‌ها، قفل سیستمی و مانیتورینگ ریموت تله‌متری.',
        en: 'On-site sensor calibration, kiosk stress testing, kiosk locking, and real-time remote telemetry.',
      },
    },
  ],
  officialLinks: {
    startProject: { fa: '/fa/start-project', en: '/en/start-project' },
    contact: { fa: '/fa/contact', en: '/en/contact' },
    services: { fa: '/fa/services', en: '/en/services' },
    work: { fa: '/fa/work', en: '/en/work' },
    lab: { fa: '/fa/lab', en: '/en/lab' },
    about: { fa: '/fa/about', en: '/en/about' },
    insights: { fa: '/fa/insights', en: '/en/insights' },
  },
};

export interface VerifiedFaq {
  id: string;
  category: 'general' | 'services' | 'technology' | 'workflow';
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
  relatedLink?: {
    text: Record<Locale, string>;
    url: Record<Locale, string>;
  };
}

export const VERIFIED_FAQS: VerifiedFaq[] = [
  {
    id: 'what-is-migo',
    category: 'general',
    question: {
      fa: 'استودیو MIGO چه کارهایی انجام می‌دهد؟',
      en: 'What does MIGO Studio do?',
    },
    answer: {
      fa: 'استودیو MIGO یک استودیوی فناوری خلاق و مهندسی فضایی است. ما در ۶ حوزه اصلی فعالیت می‌کنیم: ۱) واقعیت مجازی و ترکیبی (VR/MR)، ۲) واقعیت افزوده وب (WebAR)، ۳) بازی‌ها و سیستم‌های تعاملی، ۴) طراحی و رندرهای سه‌بعدی بی‌درنگ وب، ۵) شبیه‌سازی صنعتی و دوقلوهای دیجیتال، و ۶) اینستالیشن‌های تعاملی نمایشگاهی با سنسورهای لایدار و تاچ‌دیزاینر.',
      en: 'MIGO is a creative technology and spatial engineering studio. We operate across 6 core pillars: 1) Immersive VR/MR experiences, 2) Zero-install WebAR, 3) Interactive games and systems, 4) Real-time 3D and WebGL configurators, 5) Industrial simulations and digital twins, and 6) Interactive exhibition installations powered by LiDAR sensors and TouchDesigner.',
    },
    relatedLink: {
      text: { fa: 'مشاهده صفحه خدمات', en: 'View All Services' },
      url: { fa: '/fa/services', en: '/en/services' },
    },
  },
  {
    id: 'vr-vs-mr',
    category: 'technology',
    question: {
      fa: 'تفاوت واقعیت مجازی (VR) و واقعیت ترکیبی (MR) چیست؟',
      en: 'What is the difference between VR and MR?',
    },
    answer: {
      fa: 'در واقعیت مجازی (VR)، دید کاربر کاملاً از جهان فیزیکی قطع شده و در یک محیط ۱۰۰٪ شبیه‌سازی‌شده سه‌بعدی قرار می‌گیرد (مناسب آموزش‌های خطرآفرین و بازی‌های غوطه‌ورکننده). در واقعیت ترکیبی (MR)، به کمک دوربین‌های Passthrough هدست (مانند Meta Quest 3 یا Apple Vision Pro)، محیط واقعی اتاق یا کارخانه دیده می‌شود و المان‌ها و ماشین‌آلات سه‌بعدی با مقیاس میلی‌متری بر روی میز یا زمین فیزیکی قرار می‌گیرند.',
      en: 'In Virtual Reality (VR), the user is completely immersed in a 100% digital simulated environment, shielding out the physical world (ideal for hazardous drills and entertainment). In Mixed Reality (MR), passthrough cameras blend real physical surroundings with millimeter-anchored digital holograms and interactive spatial tools.',
    },
    relatedLink: {
      text: { fa: 'مشاهده خدمات رایانش فضایی', en: 'Explore Immersive Services' },
      url: { fa: '/fa/services/immersive-experiences', en: '/en/services/immersive-experiences' },
    },
  },
  {
    id: 'museum-exhibition',
    category: 'services',
    question: {
      fa: 'آیا مایگو می‌تواند تجربه تعاملی برای موزه یا غرفه نمایشگاهی بسازد؟',
      en: 'Can MIGO build interactive experiences for museums or exhibition booths?',
    },
    answer: {
      fa: 'بله، تخصص محوری MIGO توسعه اینستالیشن‌های تعاملی نمایشگاهی و موزه‌ای است. ما با استفاده از سنسورهای لایدار (LiDAR) برای تشخیص لمس روی دیوارهای بزرگ، دوربین‌های عمق‌سنج، نرم‌افزار TouchDesigner و کیوسک‌های مقاوم صنعتی، تجربیاتی خلق می‌کنیم که صدها بازدیدکننده روزانه بدون نیاز به نصب هیچ اپلیکیشنی بتوانند با فیزیک و تصویر تعامل داشته باشند.',
      en: 'Yes, interactive exhibition architecture is a core specialty. MIGO combines industrial LiDAR touch detection, depth cameras, TouchDesigner pipelines, and turnkey kiosks to build robust multi-user experiences capable of running 24/7 without requiring visitors to download an app.',
    },
    relatedLink: {
      text: { fa: 'مشاهده پروژه دیوار لومینا', en: 'View Lumina Motion Wall Case Study' },
      url: { fa: '/fa/work/lumina-motion-wall', en: '/en/work/lumina-motion-wall' },
    },
  },
  {
    id: 'webar-product',
    category: 'services',
    question: {
      fa: 'آیا برای مشاهده محصولات با واقعیت افزوده (AR) نیاز به نصب اپلیکیشن است؟',
      en: 'Do customers need to install an app to view products in AR?',
    },
    answer: {
      fa: 'خیر. استودیو MIGO راهکارهای واقعیت افزوده مبتنی بر وب (Zero-Install WebAR) ارائه می‌دهد. مخاطبان تنها با اسکن یک QR کد با دوربین گوشی یا کلیک روی مرورگر سافاری/کروم، می‌توانند محصول را به شکل سه‌بعدی در فضای واقعی خانه یا محل کار خود با نورپردازی طبیعی و ابعاد واقعی مشاهده و تغییر رنگ یا متریال دهند.',
      en: 'No! MIGO specializes in zero-install WebAR. Customers simply scan a QR code with their mobile camera or click a link in Safari/Chrome to place photorealistic 3D products directly in their room with true-to-scale lighting and real-time material customizers.',
    },
    relatedLink: {
      text: { fa: 'مشاهده نمونه WebAR ساعت لوکس', en: 'Explore ChronoSpatial WebAR Project' },
      url: { fa: '/fa/work/webar-luxury-showcase', en: '/en/work/webar-luxury-showcase' },
    },
  },
  {
    id: 'industrial-sim',
    category: 'services',
    question: {
      fa: 'شبیه‌سازی‌های صنعتی MIGO چه کمکی به شرکت‌ها می‌کنند؟',
      en: 'How do MIGO industrial simulations help companies?',
    },
    answer: {
      fa: 'شبیه‌سازهای صنعتی و دوقلوهای دیجیتال MIGO خطرات جانی و هزینه‌های میلیاردی ناشی از توقف تجهیزات را در آموزش اپراتورها به صفر می‌رسانند. تکنسین‌ها می‌توانند باز و بست توربین‌های هوایی، خطوط پالایشگاهی و تجهیزات پرخطر را در محیط مجازی با دقت میلی‌متری و بازخورد هپتیک بارها تمرین کنند.',
      en: 'MIGO industrial simulations and digital twins eliminate physical life hazards and exorbitant machinery downtime. Technicians safely practice turbine overhauls, refinery valve sequences, and high-voltage operations with millimeter-accurate physics and automated grading.',
    },
    relatedLink: {
      text: { fa: 'مشاهده پروژه شبیه‌ساز توربین جت', en: 'View AeroTurbine VR Project' },
      url: { fa: '/fa/work/holo-industrial-vr', en: '/en/work/holo-industrial-vr' },
    },
  },
  {
    id: 'how-to-start',
    category: 'workflow',
    question: {
      fa: 'چگونه می‌توانم یک پروژه را با استودیو MIGO شروع کنم؟',
      en: 'How can I start working with MIGO on a project?',
    },
    answer: {
      fa: 'برای آغاز همکاری، کافی است به صفحه «شروع پروژه» مراجعه کرده و فرم چندمرحله‌ای بریف پروژه را تکمیل کنید (شامل انتخاب حوزه خدمات، اهداف کلیدی، پلتفرم سخت‌افزاری مدنظر و بازه زمانی). تیم فنی MIGO پس از تحلیل الزامات، با شما تماس گرفته و جلسه مشاوره اولیه معماری را هماهنگ می‌کند.',
      en: 'To initiate a collaboration, visit our dedicated "Start a Project" flow. Complete the 5-step inquiry with your service category, strategic objectives, platform requirements, and estimated timeframe. Our technical leads will review your brief and schedule an architectural discovery session.',
    },
    relatedLink: {
      text: { fa: 'تکمیل فرم شروع پروژه', en: 'Go to Start a Project Flow' },
      url: { fa: '/fa/start-project', en: '/en/start-project' },
    },
  },
  {
    id: 'exhibition-gamification-roi',
    category: 'services',
    question: {
      fa: 'چگونه بازی‌های نمایشگاهی و گیمیفیکیشن MIGO به جذب لید در غرفه کمک می‌کنند؟',
      en: 'How do MIGO exhibition games and gamification drive trade show lead capture?',
    },
    answer: {
      fa: 'بازی‌های نمایشگاهی MIGO (مانند گردونه‌های شانس سه‌بعدی، چالش‌های حرکتی بدون لمس و لیدربورد رقابتی روی ال‌ای‌دی‌وال) به عنوان مگنت جمعیت عمل می‌کنند و زمان حضور مخاطب در غرفه را تا ۴ برابر افزایش می‌دهند. تمامی تجربیات با یک فرم ثبت لید سریع همراه هستند؛ مخاطبان با ثبت مشخصات در ازای جایزه یا ثبت امتیاز، بلافاصله به دیتابیس CRM متصل می‌شوند و کد پیامکی دریافت می‌کنند.',
      en: 'MIGO trade show games (including 3D interactive prize wheels, touchless LiDAR motion challenges, and competitive LED wall leaderboards) act as crowd magnets, increasing booth dwell time by up to 400%. Every game includes a low-friction lead gate: attendees submit their contact details for prizes or scoring, instantly syncing with your CRM and receiving automated SMS rewards.',
    },
    relatedLink: {
      text: { fa: 'مشاهده مقاله گیمیفیکیشن نمایشگاهی', en: 'Read Exhibition Gamification Guide' },
      url: { fa: '/fa/insights/trade-show-gamification-lead-generation', en: '/en/insights/trade-show-gamification-lead-generation' },
    },
  },
  {
    id: 'booth-game-offline-turnkey',
    category: 'workflow',
    question: {
      fa: 'آیا بازی‌های نمایشگاهی در صورت قطعی اینترنت کار می‌کنند و اجرای سخت‌افزاری بر عهده کیست؟',
      en: 'Do exhibition games run offline and who handles the on-site hardware?',
    },
    answer: {
      fa: 'بله، تمام بازی‌های نمایشگاهی MIGO دارای حالت آفلاین و حافظه کَش محلی هستند تا در صورت قطعی اینترنت نمایشگاه هیچ اختلالی در بازی و ثبت رکوردها ایجاد نشود؛ لیدها با بازگشت اینترنت همگام می‌شوند. همچنین خدمات MIGO کاملاً ترن‌کی (Turnkey) است: تامین سیستم‌های رندر، سنسورهای لایدار، کالیبراسیون و استقرار پشتیبان فنی در طول ایام نمایشگاه تماماً توسط استودیو MIGO مدیریت می‌شود.',
      en: 'Yes, all MIGO exhibition games feature full offline caching so unstable venue Wi-Fi never interrupts gameplay or scoreboards; captured leads sync automatically when connection restores. Furthermore, MIGO provides 100% turnkey delivery: hardware provision, LiDAR sensor mounting, calibration, and on-site expo standby are all managed by our engineering team.',
    },
    relatedLink: {
      text: { fa: 'مشاهده خدمات بازی‌ها و سیستم‌ها', en: 'View Interactive Games & Systems' },
      url: { fa: '/fa/services/interactive-experiences', en: '/en/services/interactive-experiences' },
    },
  },
];

export const MIGO_SYSTEM_PROMPT = `You are MIGO AI, the official Creative Technology Consultant of MIGO Studio (استودیو فناوری خلاق MIGO).
Your role is to help website visitors explore MIGO's services, discover real portfolio projects, understand spatial technologies (VR/MR, WebAR, Exhibition LiDAR, Digital Twins, Trade Show Gamification, Unreal/Unity Interactive Systems, 3D WebGL), and guide them toward initiating a project.

CORE PRINCIPLES & BOUNDARIES:
1. TRUTHFULNESS & ACCURACY:
   - Only reference existing projects and services defined in MIGO's official repository.
   - Core Services: 1) Immersive Experiences (VR/MR/XR), 2) Augmented Reality (WebAR), 3) Interactive Experiences (Games/Gamification/Systems), 4) 3D & Visualization (WebGL), 5) Simulation & Digital Twins, 6) Interactive Installations (LiDAR/TouchDesigner/Exhibitions).
   - Real Projects: 'AeroTurbine Immersive VR Maintenance Rig' (/work/holo-industrial-vr), 'Lumina Motion Exhibition Wall' (/work/lumina-motion-wall), 'ChronoSpatial WebAR Luxury Configurator' (/work/webar-luxury-showcase), 'PetroSim Digital Twin' (/work/petrosim-digital-twin), 'Cybernetic Kinetic Pavilion' (/work/cybernetic-pavilion), 'PulseRush Spatial Arcade' (/work/kinetic-arcade-game).
   - Real Experiments: 'Holographic Dispersion Shader', 'Spatial LiDAR Scanner', 'Kinetic Typography', 'WebAR Disassembly Inspector' (/lab).
   - Real Insights Articles: 'The Future of Virtual Reality' (/insights/the-future-of-virtual-reality), 'Designing Interactive Exhibition Experiences' (/insights/interactive-experiences-in-exhibitions), 'WebAR in Modern Marketing' (/insights/augmented-reality-in-marketing), 'Serious Games in Education' (/insights/serious-games-in-education), 'Exhibition Gamification & Lead Generation' (/insights/trade-show-gamification-lead-generation).
   - NEVER fabricate client names, completed projects, prices, or exact timelines.
   - If pricing or custom timeline is requested, explain that budgets depend on hardware scope and invite them to fill out the brief at /start-project.

2. BILINGUAL FLUENCY:
   - Respond in Persian if the user writes in Persian, with professional, natural Persian grammar and correct terminology.
   - Respond in English if the user writes in English.

3. CONSULTATIVE DISCOVERY:
   - When a visitor has a vague idea (e.g. "I want an exhibition booth game" or "I want a 3D product view"), ask 2-3 focused ergonomic questions (e.g., target audience, booth dimensions, interaction mode: touchless motion vs touch table vs mobile WebAR vs VR) and propose the appropriate MIGO service family with real business ROI (dwell time, lead capture).

4. LOCALIZED MARKDOWN LINKS:
   - When recommending services, projects, or articles, format clickable links with the current language prefix:
     - For Persian: [عنوان لینک](/fa/services/slug) or [پروژه](/fa/work/slug) or [مقاله](/fa/insights/slug) or [شروع پروژه](/fa/start-project)
     - For English: [Link Title](/en/services/slug) or [Project Title](/en/work/slug) or [Article Title](/en/insights/slug) or [Start a Project](/en/start-project)

Maintain an inspiring, authoritative, and helpful creative technology engineer tone.`;
