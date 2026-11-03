import { Locale } from './translations';

export interface ServiceItem {
  id: string;
  slug: string;
  aliases?: string[];
  title: Record<Locale, string>;
  family: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  overview: Record<Locale, string>;
  icon: string;
  badge: Record<Locale, string>;
  capabilities: Record<Locale, string[]>;
  useCases: Array<{
    title: Record<Locale, string>;
    desc: Record<Locale, string>;
  }>;
  technologies: string[];
  relevantProjects: string[];
  faqs: Array<{
    q: Record<Locale, string>;
    a: Record<Locale, string>;
  }>;
}

export const SERVICES: ServiceItem[] = [
  // 1. Immersive Experiences — VR / MR / XR
  {
    id: 'immersive-experiences',
    slug: 'immersive-experiences',
    aliases: ['virtual-reality', 'vr-mr'],
    title: {
      en: 'Immersive Experiences — VR / MR / XR',
      fa: 'تجربیات غوطه‌ورکننده — VR / MR / XR',
    },
    family: {
      en: 'Spatial Computing',
      fa: 'رایانش فضایی',
    },
    shortDescription: {
      en: 'High-fidelity spatial computing, standalone Meta Quest/Pico environments, and tethered PC-VR rigs for enterprise simulations and entertainment.',
      fa: 'رایانش فضایی با وفاداری بصری بالا، توسعه اپلیکیشن‌های مستقل VR/MR و سیستم‌های قدرتمند PC-VR برای شبیه‌سازی و سرگرمی.',
    },
    overview: {
      en: 'MIGO engineers spatial computing applications that transport users into interactive digital realms. From tetherless standalone headsets to high-performance PC-VR rigs, we craft intuitive physics-driven interactions, realistic spatial audio, and photorealistic 3D environments.',
      fa: 'استودیو MIGO نرم‌افزارهای رایانش فضایی (Spatial Computing) طراحی می‌کند که کاربران را به اعماق دنیاهای دیجیتال هدایت می‌کنند. از هدست‌های مستقل بی‌سیم گرفته تا سیستم‌های قدرتمند PC-VR، ما تعاملات فیزیکی طبیعی، صدای فضایی سه‌بعدی و محیط‌های بسیار واقع‌گرایانه خلق می‌کنیم.',
    },
    icon: 'Glasses',
    badge: {
      en: 'VR / MR / XR',
      fa: 'واقعیت مجازی و ترکیبی',
    },
    capabilities: {
      en: [
        'Standalone VR application development (Meta Quest 3, Pico 4, Apple Vision Pro)',
        'High-end PC-VR tethered rigs for industrial centers and research labs',
        'Mixed Reality passthrough and spatial anchoring in real-world spaces',
        'Multi-user collaborative VR environments with voice synchronization',
        'Millimeter-accurate physics interactions and tactile haptic feedback',
        'Virtual architectural walkthroughs with real-time global illumination',
      ],
      fa: [
        'توسعه اپلیکیشن‌های مستقل VR (Meta Quest 3، Pico 4 و Apple Vision Pro)',
        'تجربیات با گرافیک پیشرفته PC-VR برای مراکز صنعتی و آزمایشگاه‌های پژوهشی',
        'ادغام واقعیت ترکیبی (MR Passthrough) و لنگراندازی فضایی در محیط واقعی',
        'محیط‌های همکاری چندکاربره واقعیت مجازی همراه با همگام‌سازی صوت فضایی',
        'تعاملات فیزیکی با دقت میلی‌متری و بازخورد لرزشی هپتیک',
        'تورهای مجازی معماری با نورپردازی بی‌درنگ و بازتاب‌های واقع‌گرایانه',
      ],
    },
    useCases: [
      {
        title: { en: 'Enterprise Workforce Training', fa: 'آموزش پرسنل سازمان‌ها' },
        desc: {
          en: 'Hazard-free interactive procedures allowing technicians to practice critical operations before touching physical hardware.',
          fa: 'تمرین سناریوهای حساس و خطرآفرین در محیط مجازی بدون تحمیل کوچک‌ترین ریسک جانی یا خسارت به تجهیزات واقعی.',
        },
      },
      {
        title: { en: 'Medical & Healthcare Simulations', fa: 'شبیه‌سازی‌های پزشکی و درمانی' },
        desc: {
          en: 'Anatomical exploration and surgical tool manipulation in stereoscopic high-resolution space.',
          fa: 'آشنایی عمیق با آناتومی و کار با ابزارهای جراحی در فضای استریوسکوپیک با وفاداری بصری بالا.',
        },
      },
      {
        title: { en: 'Brand Showrooms & Experiences', fa: 'شوروم‌های تعاملی برند' },
        desc: {
          en: 'Transporting global audiences into customized virtual worlds showcasing flagship products at scale.',
          fa: 'انتقال مخاطبان نمایشگاهی به دنیاهای اختصاصی و مقیاس‌پذیر برای لمس قابلیت‌های محصولات شاخص برند.',
        },
      },
    ],
    technologies: ['Unreal Engine 5', 'Unity Spatial XR', 'OpenXR', 'Meta XR SDK', 'WebXR'],
    relevantProjects: ['holo-industrial-vr'],
    faqs: [
      {
        q: {
          en: 'Which VR headsets does MIGO support?',
          fa: 'استودیو MIGO از چه هدست‌هایی پشتیبانی می‌کند؟',
        },
        a: {
          en: 'We develop natively for Meta Quest (2, 3, Pro), Pico (4, Neo 3), HTC Vive, Valve Index, and Apple Vision Pro via standard OpenXR frameworks.',
          fa: 'ما به صورت بومی برای Meta Quest، Pico، HTC Vive، Valve Index و Apple Vision Pro با استاندارد OpenXR نرم‌افزار توسعه می‌دهیم.',
        },
      },
      {
        q: {
          en: 'How do you prevent motion sickness in VR?',
          fa: 'چگونه از بروز حالت سرگیجه (Motion Sickness) در VR جلوگیری می‌کنید؟',
        },
        a: {
          en: 'We maintain a locked 90/120 FPS render loop, zero latency tracking, 1:1 physical locomotion scaling, and carefully designed comfort teleports.',
          fa: 'با تضمین نرخ فریم پایدار ۹۰ الی ۱۲۰ هرتز، تاخیر رندرینگ زیر ۲۰ میلی‌ثانیه، تطابق ۱:۱ حرکت سر و سیستم‌های جابجایی تاییدشده ارگونومیک.',
        },
      },
    ],
  },

  // 2. Augmented Reality — AR / WebAR
  {
    id: 'augmented-reality',
    slug: 'augmented-reality',
    aliases: ['ar-webar'],
    title: {
      en: 'Augmented Reality — AR / WebAR',
      fa: 'واقعیت افزوده — AR / WebAR',
    },
    family: {
      en: 'Spatial Web & Mobile',
      fa: 'وب فضایی و موبایل',
    },
    shortDescription: {
      en: 'Zero-install browser WebAR, QR-code activated 3D placements, and native iOS ARKit / Android ARCore applications.',
      fa: 'تجربیات WebAR بدون نیاز به نصب اپلیکیشن در مرورگر، جانمایی سه‌بعدی محصول با اسکن کد QR و توسعه اپلیکیشن‌های بومی.',
    },
    overview: {
      en: 'Bridging physical space with intelligent digital layers. MIGO crafts zero-install WebAR that works instantly on standard mobile browsers, as well as native mobile AR applications utilizing LiDAR surface tracking, image recognition, and real-time occlusion.',
      fa: 'پیوند لایه‌های دیجیتال هوشمند با جهان واقعی. استودیو MIGO راهکارهای WebAR بدون نیاز به نصب را برای دسترسی آنی کاربران موبایل و همچنین اپلیکیشن‌های بومی با ردیابی سطوح، تشخیص تصاویر و انسداد فضایی توسعه می‌دهد.',
    },
    icon: 'Scan',
    badge: {
      en: 'AR & WebAR',
      fa: 'واقعیت افزوده وب',
    },
    capabilities: {
      en: [
        'Zero-install WebAR running seamlessly on iOS Safari and Android Chrome',
        'Instant launch via physical QR codes printed on packaging or exhibits',
        'Native AR apps using Apple ARKit and Google ARCore with LiDAR depth',
        'Marker-based tracking for interactive packaging, books, and prints',
        'Surface hit-testing for scale-accurate industrial product preview',
        'Real-time PBR material rendering with environmental HDR reflection',
      ],
      fa: [
        'تجربیات WebAR بدون نیاز به نصب اپلیکیشن بر روی سافاری و کروم موبایل',
        'دسترسی سریع تنها با اسکن کد QR روی بسته‌بندی، پوستر یا غرفه',
        'توسعه اپلیکیشن‌های بومی با ARKit و ARCore همراه با اسکنرهای LiDAR',
        'ردیابی بر پایه مارکر برای بروشورها، بسته‌بندی‌ها و کتاب‌های تعاملی',
        'جانمایی ابعاد دقیق محصولات در فضای واقعی کاربر با تشخیص سطح زمین',
        'رندر متریال‌های واقع‌گرایانه PBR با بازتاب نور محیط طبیعی',
      ],
    },
    useCases: [
      {
        title: { en: 'Product E-Commerce & Retail', fa: 'تجارت الکترونیک و فروش محصولات' },
        desc: {
          en: 'Customers inspect photorealistic 3D products in their actual living or workspace before purchase.',
          fa: 'مشاهده و بررسی ۳۶۰ درجه محصولات با ابعاد واقعی در منزل یا محیط کار مشتری پیش از تصمیم به خرید.',
        },
      },
      {
        title: { en: 'Interactive Print & Packaging', fa: 'بسته‌بندی و کاتالوگ‌های هوشمند' },
        desc: {
          en: 'Turning physical brochures and packaging into animated 3D multimedia portals via smartphone cameras.',
          fa: 'تبدیل کاتالوگ‌ها و بسته‌بندی‌های چاپی به پورتال‌های پویا با انیمیشن‌های سه‌بعدی و ویدیوهای تعاملی.',
        },
      },
      {
        title: { en: 'On-Site Machine Maintenance Support', fa: 'راهنمای تعمیرات در محل کارخانه' },
        desc: {
          en: 'Overlaying step-by-step schematics directly onto physical machinery in real-time.',
          fa: 'نمایش شماتیک قطعات و راهنمای گام‌به‌گام عیب‌یابی مستقیماً روی بدنه دستگاه‌های صنعتی.',
        },
      },
    ],
    technologies: ['Three.js', 'WebXR', '8th Wall', 'Apple ARKit', 'Google ARCore'],
    relevantProjects: ['webar-luxury-showcase'],
    faqs: [
      {
        q: {
          en: 'Does WebAR require downloading an app from the App Store?',
          fa: 'آیا برای اجرای WebAR نیازی به نصب اپلیکیشن است؟',
        },
        a: {
          en: 'No. Users simply scan a QR code with their mobile camera; the 3D model opens instantly in Safari or Chrome.',
          fa: 'خیر. کاربر تنها دوربین گوشی را به سمت QR Code می‌گیرد و مدل سه‌بعدی بی‌درنگ در مرورگر موبایل باز می‌شود.',
        },
      },
    ],
  },

  // 3. Interactive Experiences — Games / Interactive Systems
  {
    id: 'interactive-experiences',
    slug: 'interactive-experiences',
    aliases: ['game-development', 'interactive-software'],
    title: {
      en: 'Interactive Experiences — Games / Interactive Systems',
      fa: 'تجربیات تعاملی — بازی‌ها و سیستم‌های تعاملی',
    },
    family: {
      en: 'Game Tech & Software',
      fa: 'بازی‌سازی و سیستم‌ها',
    },
    shortDescription: {
      en: 'Serious games for workforce training, real-time WebGL games, event leaderboards, and bespoke interactive software systems.',
      fa: 'بازی‌های جدی برای آموزش سازمانی، بازی‌های بی‌درنگ وب، جدول امتیازات رویدادی و نرم‌افزارهای اختصاصی تعاملی.',
    },
    overview: {
      en: 'We leverage game design mechanics and modern real-time engines to build compelling interactive systems. Whether developing serious games that accelerate learning, branded event challenges, or custom client-facing applications, MIGO ensures seamless 60 FPS performance and intuitive UX.',
      fa: 'ما با بهره‌گیری از مکانیک‌های بازی‌سازی و انجین‌های پیشرفته، سیستم‌های تعاملی ماندگار خلق می‌کنیم. از بازی‌های جدی آموزشی با بازدهی بالا گرفته تا بازی‌های رقابتی نمایشگاهی و نرم‌افزارهای اختصاصی، استودیو MIGO تضمین‌کننده نرخ فریم ۶۰ و تجربه کاربری روان است.',
    },
    icon: 'Gamepad2',
    badge: {
      en: 'Games & Systems',
      fa: 'بازی‌ها و سیستم‌ها',
    },
    capabilities: {
      en: [
        'Development of 2D/3D games for PC, mobile, and web (WebGL/Canvas)',
        'Serious games for corporate training, compliance, and skills evaluation',
        'Branded trade show games with live digital leaderboards and prize systems',
        'Physics-driven game mechanics with custom collision and ragdoll dynamics',
        'Multiplayer networking and real-time socket synchronization',
        'Custom interactive software platforms with zero-latency input response',
      ],
      fa: [
        'طراحی و تولید بازی‌های ۲ بعدی و ۳ بعدی برای PC، موبایل و مرورگر (WebGL)',
        'توسعه بازی‌های جدی (Serious Games) با هدف آموزش سازمانی و ارزیابی مهارت‌ها',
        'بازی‌های اختصاصی نمایشگاهی همراه با جدول امتیازات زنده و چالش‌های جوایز',
        'مکانیک‌های بازی فیزیک‌محور با شبیه‌سازی دقیق برخوردها و تعادل',
        'شبکه‌سازی چندنفره و همگام‌سازی سوکت‌ها به صورت بی‌درنگ',
        'سیستم‌های نرم‌افزاری تعاملی اختصاصی با پاسخ‌دهی آنی به ورودی‌های کاربر',
      ],
    },
    useCases: [
      {
        title: { en: 'Trade Show Gamified Engagement', fa: 'گیمیفیکیشن غرفه‌های رویدادی' },
        desc: {
          en: 'Drawing massive foot traffic to event booths with competitive 60-second games and digital scoreboards.',
          fa: 'جذب حداکثری بازدیدکنندگان غرفه نمایشگاهی با بازی‌های چالشی ۶۰ ثانیه‌ای و تابلوهای امتیازات رقابتی.',
        },
      },
      {
        title: { en: 'Employee Onboarding & Safety Drills', fa: 'آموزش سازمانی و مانورهای ایمنی' },
        desc: {
          en: 'Gamified learning paths that test hazard recognition and reward correct procedure adherence.',
          fa: 'مسیرهای یادگیری بازی‌وارسازی‌شده برای ارزیابی واکنش به خطرات کاری و ارتقای بازدهی پرسنل.',
        },
      },
    ],
    technologies: ['Unity', 'Unreal Engine 5', 'WebGL', 'TypeScript', 'Node.js / WebSockets'],
    relevantProjects: ['pulse-tactile-terminal'],
    faqs: [
      {
        q: {
          en: 'Can the games be customized with our corporate branding?',
          fa: 'آیا بازی‌ها متناسب با هویت برند ما سفارشی‌سازی می‌شوند؟',
        },
        a: {
          en: 'Absolutely. Every asset, color scheme, 3D character, user interface, and leaderboard is engineered to your brand guidelines.',
          fa: 'بله کاملاً. تمامی المان‌ها، رنگ‌بندی، کاراکترهای سه‌بعدی، رابط کاربری و جدول امتیازات طبق کتابچه برند شما تولید می‌شوند.',
        },
      },
    ],
  },

  // 4. 3D & Visualization — Modeling / Animation / Rendering
  {
    id: '3d-visualization',
    slug: '3d-visualization',
    aliases: ['modeling-rendering'],
    title: {
      en: '3D & Visualization — Modeling / Animation / Rendering',
      fa: 'طراحی و بصری‌سازی سه‌بعدی — مدل‌سازی / انیمیشن / رندرینگ',
    },
    family: {
      en: '3D Computer Graphics',
      fa: 'گرافیک رایانه‌ای سه‌بعدی',
    },
    shortDescription: {
      en: 'Photorealistic PBR real-time product configurators, architectural spatial walkthroughs, and cinematic real-time 3D animations.',
      fa: 'پیکربندی‌کننده‌های بی‌درنگ محصولات صنعتی با متریال‌های PBR، انیمیشن‌های سینماتیک سه‌بعدی و تورهای تعاملی معماری.',
    },
    overview: {
      en: 'High-end 3D visual fidelity meeting real-time web performance. MIGO produces ultra-detailed polygon models, physically based rendering (PBR) materials, and cinematic animations engineered for both offline rendering and 60 FPS real-time WebGL engines.',
      fa: 'تلاقی هنر بصری سه‌بعدی با کارایی ریل‌تایم وب. استودیو MIGO به مدل‌سازی دقیق صنعتی، ساخت متریال‌های فیزیکی PBR و انیمیشن‌های سینماتیک برای رندرهای استاتیک و انجین‌های تعاملی وب می‌پردازد.',
    },
    icon: 'Box',
    badge: {
      en: '3D & Rendering',
      fa: 'طراحی سه‌بعدی',
    },
    capabilities: {
      en: [
        'Hard-surface industrial modeling and high-to-low poly baking',
        'Physically Based Rendering (PBR) shader development and lighting setups',
        'Interactive 3D web configurators with color, material, and exploded view options',
        'Architectural interior and exterior interactive walkthroughs',
        'Cinematic 3D technical animations explaining mechanical systems',
        'Geometry optimization and Draco/Meshopt compression for instant web loads',
      ],
      fa: [
        'مدل‌سازی دقیق سطوح سخت (Hard-Surface) و استخراج نقشه‌های نور و نرمال',
        'ساخت متریال‌ها و شیدرهای PBR با وفاداری کامل به فیزیک نور',
        'توسعه کانفیگوراتورهای تعاملی سه‌بعدی محصول با تغییر رنگ، متریال و قطعات',
        'تورهای سه‌بعدی تعاملی معماری داخلی و نما با امکان گردش آزاد',
        'انیمیشن‌های سینماتیک فنی جهت تشریح مکانیزم‌های پیچیده مکانیکی',
        'فشرده‌سازی پیشرفته هندسه مش با Draco جهت بارگذاری آنی در بستر وب',
      ],
    },
    useCases: [
      {
        title: { en: 'Luxury & Automotive Product Configurators', fa: 'پیکربندی‌کننده‌های خودرو و کالاهای لوکس' },
        desc: {
          en: 'Allowing buyers to customize finishes, trims, and wheels in photorealistic real-time 3D before ordering.',
          fa: 'امکان شخصی‌سازی رنگ بدنه، تودوزی و قطعات خودرو با کیفیت فوق‌العاده واقع‌گرایانه پیش از خرید.',
        },
      },
      {
        title: { en: 'Industrial Machine Digital Showcases', fa: 'نمایش دیجیتال ماشین‌آلات صنعتی' },
        desc: {
          en: 'Visualizing internal engine mechanics and fluid flow through transparent exploded views.',
          fa: 'به تصویر کشیدن مکانیزم‌های داخلی موتورها و خطوط تولید با نمای انفجاری و برش‌های شفاف.',
        },
      },
    ],
    technologies: ['Blender', 'Substance 3D Painter', 'Three.js', 'Unreal Engine 5', 'GLTF/GLB'],
    relevantProjects: ['webar-luxury-showcase'],
    faqs: [
      {
        q: {
          en: 'How do you keep 3D models lightweight for web browsers?',
          fa: 'چگونه مدل‌های سه‌بعدی را برای وب سبک و کم‌حجم نگه می‌دارید؟',
        },
        a: {
          en: 'We retopologize geometries, optimize texture atlases with KTX2/Basis Universal, and apply Draco mesh compression, keeping full scenes under 5 MB.',
          fa: 'با استفاده از توپولوژی بهینه، فشرده‌سازی بافت‌ها با استانداردهای KTX2 و فشرده‌سازی مش Draco، حجم کل صحنه معمولاً زیر ۵ مگابایت حفظ می‌شود.',
        },
      },
    ],
  },

  // 5. Simulation & Digital Twins — Industrial / Training
  {
    id: 'simulation-digital-twins',
    slug: 'simulation-digital-twins',
    aliases: ['simulation', 'industrial-simulation'],
    title: {
      en: 'Simulation & Digital Twins — Industrial / Training',
      fa: 'شبیه‌سازی و دوقلوهای دیجیتال — صنعتی / آموزشی',
    },
    family: {
      en: 'Industrial Simulation',
      fa: 'شبیه‌سازی صنعتی',
    },
    shortDescription: {
      en: 'Mission-critical industrial drills, millimeter-accurate physics engines, hazard-free safety training, and real-time digital twins.',
      fa: 'مانورهای ایمنی محیط‌های پرخطر، موتورهای فیزیک با دقت میلی‌متری، آموزش بدون ریسک جانی و دوقلوهای دیجیتال صنعتی.',
    },
    overview: {
      en: 'Engineering real-time physics engines and digital replicas of industrial infrastructure. MIGO builds safety simulation environments, aeronautical turbine maintenance trainers, and oil & gas pipeline emergency scenarios with zero physical hazard.',
      fa: 'مهندسی موتورهای فیزیک ریل‌تایم و نمونه‌های دیجیتال زیرساخت‌های صنعتی. استودیو MIGO محیط‌های شبیه‌سازی ایمنی HSE، تعمیر و نگهداری توربین‌های هوایی و سناریوهای اضطراری نفت و گاز را بدون کوچک‌ترین خطر جانی بازآفرینی می‌کند.',
    },
    icon: 'Cpu',
    badge: {
      en: 'Simulation & Twins',
      fa: 'شبیه‌سازی و دوقلوها',
    },
    capabilities: {
      en: [
        'Physics-accurate simulation of heavy machinery and hazardous industrial systems',
        'HSE safety virtual drills (fire, chemical leaks, high-voltage maintenance)',
        'Aeronautics and maritime operator training with procedural evaluation',
        'Real-time IoT telemetry synchronization with 3D digital twins',
        'Automated scoring, trainee error tracking, and performance analytics',
        'Turnkey simulation control desks and replica physical hardware cockpits',
      ],
      fa: [
        'شبیه‌سازی دقیق فیزیک ماشین‌آلات سنگین و سیستم‌های صنعتی پرخطر',
        'مانورهای واقعیت مجازی ایمنی HSE (اطفای حریق، نشت گاز، برق فشار قوی)',
        'آموزش اپراتورهای هوانوردی و دریانوردی همراه با ارزیابی سیستمی خطاها',
        'اتصال داده‌های تله‌متری سنسورهای IoT به دوقلوی دیجیتال سه‌بعدی به صورت زنده',
        'ثبت خودکار گزارش عملکرد، سنجش زمان عکس‌العمل و تحلیل آماری یادگیری',
        'ساخت کنسول‌های فیزیکی کنترل شبیه‌ساز و کابین‌های آموزشی ترن‌کی',
      ],
    },
    useCases: [
      {
        title: { en: 'Oil, Gas & Energy Emergency Drills', fa: 'مانورهای اضطراری صنایع نفت و گاز' },
        desc: {
          en: 'Allowing refinery engineers to resolve catastrophic pipeline blowouts in virtual reality without risking lives.',
          fa: 'آموزش پرسنل پالایشگاه‌ها در مدیریت حوادث غیرمترقبه و نشت خطوط لوله بدون به خطر افتادن جان افراد.',
        },
      },
      {
        title: { en: 'Aeronautics Turbine Maintenance', fa: 'تعمیر و اورهال توربین‌های هوایی' },
        desc: {
          en: 'Disassembling complex jet propulsion components with millimeter-precise procedural guidance.',
          fa: 'باز و بست و بازرسی قطعات حساس موتور جت با راهنمای گام‌به‌گام و بررسی سایش قطعات.',
        },
      },
    ],
    technologies: ['Unreal Engine 5', 'Chaos Physics Engine', 'NVIDIA PhysX', 'Unity', 'OpenXR'],
    relevantProjects: ['holo-industrial-vr'],
    faqs: [
      {
        q: {
          en: 'How accurate is the physical interaction inside the simulation?',
          fa: 'دقت فیزیک تعاملات در شبیه‌ساز چقدر به دنیای واقعی نزدیک است؟',
        },
        a: {
          en: 'We calibrate mass, friction, center of gravity, and torque constraints according to actual engineering datasheets.',
          fa: 'ضرایب اصطکاک، جرم قطعات، مرکز ثقل و محدودیت‌های چرخش طبق مستندات دقیق مهندسی و دفترچه‌های سازنده کالیبره می‌شوند.',
        },
      },
    ],
  },

  // 6. Interactive Installations — Exhibitions / Sensors / Kiosks
  {
    id: 'interactive-installations',
    slug: 'interactive-installations',
    aliases: ['interactive-exhibitions', 'exhibition-tech'],
    title: {
      en: 'Interactive Installations — Exhibitions / Sensors / Kiosks',
      fa: 'چیدمان‌های تعاملی — نمایشگاهی / سنسورها / کیوسک‌ها',
    },
    family: {
      en: 'Physical Computing',
      fa: 'پردازش فیزیکی و فضا',
    },
    shortDescription: {
      en: 'Kinetic video walls, multi-touch kiosks, body tracking with LiDAR and Kinect, and turnkey hardware-software integration.',
      fa: 'دیوارهای ویدیویی حرکتی، کیوسک‌های مالتی‌تاچ غول‌پیکر، ردیابی حرکات بدن با LiDAR و کینکت، و اجرای صفر تا صد سخت‌افزار و نرم‌افزار.',
    },
    overview: {
      en: 'Transforming architectural spaces, museums, and trade shows into living responsive digital canvases. MIGO engineers kinetic video walls, depth-sensor gesture installations, interactive projection mapping, and custom multi-touch kiosk software.',
      fa: 'تبدیل فضاهای نمایشگاهی، موزه‌ها و شوروم‌ها به استیج‌های زنده و تعاملی دیجیتال. استودیو MIGO به طراحی دیوارهای ویدیویی حساس به حرکت، سنسورهای عمق‌سنج، ویدیو مپینگ تعاملی و نرم‌افزارهای مالتی‌تاچ کیوسک می‌پردازد.',
    },
    icon: 'Sparkles',
    badge: {
      en: 'Installations & Kiosks',
      fa: 'کیوسک‌ها و چیدمان‌ها',
    },
    capabilities: {
      en: [
        'Development of multi-touch software for large exhibition video walls and kiosks',
        'Full-body spatial tracking with Azure Kinect, LiDAR, and depth cameras',
        'Interactive projection mapping responding to visitor touch and footsteps',
        'Physical computing integration with custom microcontrollers and sensors',
        'TouchDesigner and Notch real-time generative visual pipelines',
        'Autonomous turnkey delivery: hardware sourcing, installation, and 24/7 reliability',
      ],
      fa: [
        'توسعه نرم‌افزارهای مالتی‌تاچ برای کیوسک‌ها و ویدیو وال‌های غول‌پیکر نمایشگاهی',
        'ردیابی حرکتی بدن و ژست دست با Azure Kinect، سنسورهای LiDAR و دوربین‌های عمق‌سنج',
        'ویدیو مپینگ تعاملی روی دیوارها، کف زمین و حجم‌های دکوراسیون غرفه',
        'اتصال سخت‌افزارهای پردازش فیزیکی با میکروکنترلرها و حسگرهای الکترونیکی',
        'پایپ‌لاین‌های گرافیکی بی‌درنگ و جنریتیو با TouchDesigner و Notch',
        'اجرای صفر تا صد (Turnkey): تامین سخت‌افزار، نصب در محل و پایداری مداوم ۲۴/۷',
      ],
    },
    useCases: [
      {
        title: { en: 'Trade Show Flagship Kinetic Wall', fa: 'دیوار تعاملی شاخص غرفه‌های نمایشگاهی' },
        desc: {
          en: 'A massive 10-meter video wall that reacts in real-time as visitors walk past, displaying dynamic brand shaders.',
          fa: 'دیوار ویدیویی ۱۰ متری که با راه رفتن مخاطبان در غرفه، امواج نور و محتوای هوشمند ایجاد می‌کند.',
        },
      },
      {
        title: { en: 'Museum & Heritage Interactive Galleries', fa: 'گالری‌های لمسی و غوطه‌ورکننده موزه' },
        desc: {
          en: 'Visitors interact with virtual historical artifacts on multi-touch smart tables without physical wear.',
          fa: 'کاوش و لمس مجازی اشیای تاریخی بر روی میزهای لمسی هوشمند بدون ایجاد استهلاک فیزیکی.',
        },
      },
    ],
    technologies: ['TouchDesigner', 'Azure Kinect', 'LiDAR Sensors', 'Unity', 'WebGL'],
    relevantProjects: ['lumina-motion-wall'],
    faqs: [
      {
        q: {
          en: 'Does MIGO handle the physical hardware as well as the code?',
          fa: 'آیا استودیو MIGO بخش سخت‌افزار را هم همراه با نرم‌افزار ارائه می‌دهد؟',
        },
        a: {
          en: 'Yes. We offer 100% turnkey delivery: we specify, calibrate, and mount the sensors, touch screens, and computing units on-site.',
          fa: 'بله. ما خدمات کاملاً ترن‌کی (Turnkey) ارائه می‌دهیم؛ تامین تجهیزات، کالیبراسیون سنسورها، نصب و راه‌اندازی در محل بر عهده تیم ماست.',
        },
      },
    ],
  },
];
