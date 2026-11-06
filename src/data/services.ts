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
      fa: 'واقعیت مجازی و واقعیت ترکیبی — VR / MR / XR',
    },
    family: {
      en: 'Spatial Computing',
      fa: 'فناوری‌های سه‌بعدی و فضایی (Spatial Tech)',
    },
    shortDescription: {
      en: 'High-fidelity spatial computing, standalone Meta Quest/Pico environments, and tethered PC-VR rigs for enterprise simulations and entertainment.',
      fa: 'توسعه نرم‌افزارهای واقعیت مجازی و ترکیبی (VR/MR) با گرافیک باکیفیت و شبیه‌سازهای تعاملی سازمانی و سرگرمی.',
    },
    overview: {
      en: 'MIGO engineers spatial computing applications that transport users into interactive digital realms. From tetherless standalone headsets to high-performance PC-VR rigs, we craft intuitive physics-driven interactions, realistic spatial audio, and photorealistic 3D environments.',
      fa: 'استودیو MIGO نرم‌افزارهای واقعیت مجازی و ترکیبی را با شبیه‌سازی دقیق فیزیک، صدای سه‌بعدی محیطی و گرافیک واقع‌گرایانه تولید می‌کند. از هدست‌های بی‌سیم سبک گرفته تا سیستم‌های سنگین صنعتی، ما ابزارهایی می‌سازیم که کاربر کاملاً احساس حضور واقعی در محیط را تجربه کند.',
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
        'ترکیب واقعیت ترکیبی (MR) و قرارگیری دقیق اشیای سه‌بعدی در فضای واقعی اتاق',
        'محیط‌های همکاری چندکاربره واقعیت مجازی همراه با همگام‌سازی صوت فضایی',
        'تعاملات فیزیکی با دقت بالا و بازخورد لرزشی دسته‌ها (Haptic)',
        'تورهای مجازی معماری با نورپردازی طبیعی و بازتاب‌های واقع‌گرایانه',
      ],
    },
    useCases: [
      {
        title: { en: 'Enterprise Workforce Training', fa: 'آموزش پرسنل و مهندسان سازمان‌ها' },
        desc: {
          en: 'Hazard-free interactive procedures allowing technicians to practice critical operations before touching physical hardware.',
          fa: 'تمرین سناریوهای حساس و خطرآفرین در محیط مجازی بدون تحمیل کوچک‌ترین ریسک جانی یا خسارت به تجهیزات واقعی.',
        },
      },
      {
        title: { en: 'Medical & Healthcare Simulations', fa: 'شبیه‌سازی‌های پزشکی و درمانی' },
        desc: {
          en: 'Anatomical exploration and surgical tool manipulation in stereoscopic high-resolution space.',
          fa: 'بررسی دقیق آناتومی و تمرین کار با ابزارهای جراحی با کیفیت گرافیکی سه‌بعدی بسیار بالا.',
        },
      },
      {
        title: { en: 'Brand Showrooms & Experiences', fa: 'شوروم‌های تعاملی و فضاهای نمایشگاهی برند' },
        desc: {
          en: 'Transporting global audiences into customized virtual worlds showcasing flagship products at scale.',
          fa: 'بردن مخاطبان نمایشگاهی به دنیاهای اختصاصی و جذاب برای آشنایی و لمس قابلیت‌های محصولات شاخص شرکت.',
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
      fa: 'پیوند لایه‌های دیجیتال هوشمند با جهان واقعی؛ استودیو MIGO با توسعه تجربیات WebAR بدون نیاز به نصب، دسترسی به مدل‌های سه‌بعدی را از طریق اسکن سریع کد QR در مرورگرهای موبایل ممکن می‌سازد. همچنین با بهره‌گیری از سنسورهای LiDAR در اپلیکیشن‌های موبایل، امکان نمایش دقیق محصولات در اندازه واقعی و قرار گرفتن طبیعی مدل‌های سه‌بعدی در پشت موانع محیطی را فراهم می‌کند.',
    },
    icon: 'Scan',
    badge: {
      en: 'AR & WebAR',
      fa: 'واقعیت افزوده و WebAR',
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
          fa: 'تبدیل کاتالوگ‌ها و بسته‌بندی‌های چاپی به صفحات تعاملی با انیمیشن‌های سه‌بعدی و ویدیوهای جذاب تنها با اسکن دوربین گوشی.',
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
    aliases: ['game-development', 'interactive-software', 'serious-games', 'gamification'],
    title: {
      en: 'Interactive Experiences — Games / Gamification & Serious Systems',
      fa: 'بازی‌ها و سیستم‌های تعاملی — گیمیفیکیشن رویداد و آموزش',
    },
    family: {
      en: 'Game Tech & Software',
      fa: 'بازی‌سازی و سیستم‌های تعاملی',
    },
    shortDescription: {
      en: 'Serious games for corporate training, exhibition gamification, 3D interactive lucky wheels, competitive event leaderboards, and bespoke WebGL software.',
      fa: 'بازی‌های تعاملی برای آموزش سازمانی، بازی‌های غرفه نمایشگاهی، گردونه‌های شانس سه‌بعدی، ثبت لید و نرم‌افزارهای اختصاصی وب.',
    },
    overview: {
      en: 'We leverage game design mechanics, behavioral psychology, and modern real-time engines to build compelling interactive systems. Whether creating serious games that accelerate enterprise learning, exhibition activations with live leaderboards and lead capture, or bespoke WebGL applications, MIGO guarantees locked 60 FPS performance, intuitive UX, and measurable business ROI.',
      fa: 'ما با تلفیق مکانیک‌های جذاب بازی‌سازی و موتورهای پیشرفته نرم‌افزاری، تجربیات تعاملی ماندگار خلق می‌کنیم. از بازی‌های جدی آموزش سازمانی گرفته تا بازی‌های غرفه نمایشگاه با تابلوی رکوردهای زنده و سیستم دریافت شماره تماس مخاطبان، استودیو MIGO تضمین‌کننده سرعت روان، کاربری ساده و جلب توجه حداکثری است.',
    },
    icon: 'Gamepad2',
    badge: {
      en: 'Games & Gamification',
      fa: 'بازی‌ها و گیمیفیکیشن',
    },
    capabilities: {
      en: [
        'Development of 2D/3D games for PC, mobile, and web (WebGL/Canvas)',
        'Serious games for corporate training, compliance, and skills evaluation',
        'Branded trade show games with live digital leaderboards and automated prize loops',
        'Interactive 3D lucky wheel and digital raffle systems connected to CRM lead capture',
        'Motion-controlled arcade challenges using webcams and depth tracking',
        'Multiplayer networking and real-time socket synchronization for live crowds',
        'Custom interactive software platforms with zero-latency input response',
      ],
      fa: [
        'طراحی و تولید بازی‌های ۲ بعدی و ۳ بعدی برای PC، موبایل و مرورگر (WebGL)',
        'توسعه بازی‌های جدی (Serious Games) با هدف آموزش سازمانی و ارزیابی مهارت‌ها',
        'بازی‌های اختصاصی نمایشگاهی همراه با جدول امتیازات زنده و سیستم جوایز خودکار',
        'گردونه شانس سه‌بعدی و قرعه‌کشی دیجیتال با قابلیت ثبت شماره تماس و اتصال به CRM',
        'چالش‌های حرکتی هیجان‌انگیز با وب‌کم و سنسورهای عمق‌سنج بدون نیاز به لمس',
        'امکان اجرای مسابقات زنده گروهی و رقابت هم‌زمان چند کاربر با هم',
        'سیستم‌های نرم‌افزاری تعاملی اختصاصی با پاسخ‌دهی آنی به ورودی‌های کاربر',
      ],
    },
    useCases: [
      {
        title: { en: 'Trade Show Lead Generation & Dwell Time', fa: 'شلوغ کردن غرفه و دریافت اطلاعات تماس مشتریان بالقوه' },
        desc: {
          en: 'Boosting booth dwell time by up to 400% through high-energy 45-second branded challenges, capturing verified visitor contact details in exchange for leaderboard ranking and rewards.',
          fa: 'افزایش بیش از ۴ برابری توقف افراد در غرفه با بازی‌های پرهیجان ۴۵ ثانیه‌ای و دریافت شماره تماس بازدیدکنندگان مشتاق در ازای رقابت و جوایز.',
        },
      },
      {
        title: { en: 'Employee Onboarding & Safety Compliance', fa: 'آموزش سازمانی و مانورهای ایمنی پرسنل' },
        desc: {
          en: 'Gamified learning paths that test hazard recognition, decision branches, and reward correct operational adherence with immediate feedback loops.',
          fa: 'آموزش پرسنل با بازی‌های شبیه‌سازی برای یادگیری واکنش سریع به خطرات کاری، تصمیم‌گیری در شرایط بحرانی و رعایت اصول ایمنی.',
        },
      },
      {
        title: { en: 'Brand Activations & Retail Gamification', fa: 'معرفی جذاب برند و کمپین‌های جذب مشتری' },
        desc: {
          en: 'Deploying interactive 3D lucky wheels and skill mini-games in retail stores and pop-up events to drive immediate purchases and social sharing.',
          fa: 'اجرای گردونه‌های شانس سه‌بعدی و بازی‌های مهارتی در فروشگاه‌ها و رویدادها جهت ترغیب به خرید و اشتراک‌گذاری گسترده توسط مخاطبان.',
        },
      },
    ],
    technologies: ['Unity', 'Unreal Engine 5', 'WebGL', 'TypeScript', 'Node.js / WebSockets', 'PostgreSQL / Supabase'],
    relevantProjects: ['pulse-tactile-terminal'],
    faqs: [
      {
        q: {
          en: 'How does an exhibition game capture qualified leads?',
          fa: 'چگونه یک بازی نمایشگاهی شماره تماس و اطلاعات بازدیدکنندگان را دریافت می‌کند؟',
        },
        a: {
          en: 'Before starting the game or claiming rewards, attendees enter their contact details (mobile/email/company) on a sleek companion tablet or QR portal. Data is validated in real-time, instantly synchronized with your CRM, and optional SMS vouchers are dispatched automatically.',
          fa: 'پیش از شروع بازی یا دریافت جایزه، بازدیدکننده شماره موبایل، نام و سازمان خود را در تبلت یا پرتال ثبت می‌کند. داده‌ها با اعتبارسنجی آنی در دیتابیس CRM ذخیره شده و کدهای تخفیف یا کارت‌های ویزیت دیجیتال بلافاصله از طریق پیامک برای مخاطب ارسال می‌شوند.',
        },
      },
      {
        q: {
          en: 'Can the games operate completely offline if the venue has poor internet?',
          fa: 'آیا بازی در صورت قطعی یا کندی اینترنت سالن نمایشگاه به صورت آفلاین کار می‌کند؟',
        },
        a: {
          en: 'Yes. Our exhibition builds feature local cache failovers. The game engine and leaderboards run seamlessly offline on the local display hardware, and queued lead submissions sync automatically once connectivity is restored.',
          fa: 'بله. معماری بازی‌های نمایشگاهی MIGO دارای سیستم ذخیره‌سازی محلی (Local Cache) است. بازی و جدول امتیازات بدون نیاز به اینترنت با حداکثر سرعت اجرا می‌شوند و شماره‌ها و اطلاعات ثبت‌شده به محض برقراری اتصال با سرور همگام‌سازی می‌گردند.',
        },
      },
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
      fa: 'طراحی و مدل‌سازی سه‌بعدی — رندرینگ و انیمیشن',
    },
    family: {
      en: '3D Computer Graphics',
      fa: 'طراحی سه‌بعدی و گرافیک کامپیوتری',
    },
    shortDescription: {
      en: 'Photorealistic PBR real-time product configurators, architectural spatial walkthroughs, and cinematic real-time 3D animations.',
      fa: 'کاتالوگ‌های سه‌بعدی تعاملی محصولات با امکان تغییر رنگ و قطعات، انیمیشن‌های روان و تورهای مجازی معماری.',
    },
    overview: {
      en: 'High-end 3D visual fidelity meeting real-time web performance. MIGO produces ultra-detailed polygon models, physically based rendering (PBR) materials, and cinematic animations engineered for both offline rendering and 60 FPS real-time WebGL engines.',
      fa: 'کیفیت بصری سینمایی همراه با اجرای فوق‌العاده روان در وب؛ استودیو MIGO با مدل‌سازی دقیق صنعتی، نورپردازی طبیعی و انیمیشن‌های باکیفیت، مدل‌های سه‌بعدی جذابی می‌سازد که بدون افت سرعت در مرورگر و موبایل اجرا می‌شوند.',
    },
    icon: 'Box',
    badge: {
      en: '3D & Rendering',
      fa: 'طراحی و رندرینگ سه‌بعدی',
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
        'مدل‌سازی دقیق صنعتی، قطعات مهندسی و محصولات تجاری',
        'ساخت بافت‌ها و متریال‌های واقع‌گرایانه با بازتاب طبیعی نور',
        'کاتالوگ سه‌بعدی و تعاملی محصول با امکان تعویض رنگ، جنس بدنه و قطعات',
        'تورهای سه‌بعدی تعاملی معماری داخلی و نما با امکان گردش آزاد',
        'انیمیشن‌های سه‌بعدی جهت تشریح سازوکار و مکانیزم‌های پیچیده',
        'فشرده‌سازی پیشرفته مدل‌ها جهت باز شدن آنی در مرورگر موبایل و وب',
      ],
    },
    useCases: [
      {
        title: { en: 'Luxury & Automotive Product Configurators', fa: 'کاتالوگ تعاملی سفارشی‌سازی خودرو و کالاهای لوکس' },
        desc: {
          en: 'Allowing buyers to customize finishes, trims, and wheels in photorealistic real-time 3D before ordering.',
          fa: 'امکان شخصی‌سازی رنگ بدنه، تودوزی و قطعات با کیفیت فوق‌العاده واقع‌گرایانه پیش از خرید نهایی.',
        },
      },
      {
        title: { en: 'Industrial Machine Digital Showcases', fa: 'نمایش دیجیتال و تعاملی ماشین‌آلات صنعتی' },
        desc: {
          en: 'Visualizing internal engine mechanics and fluid flow through transparent exploded views.',
          fa: 'به تصویر کشیدن سازوکار داخلی موتورها و خطوط تولید با نمای تفکیک‌شده قطعات (Exploded View) و برش‌های شفاف.',
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
      fa: 'مهندسی موتورهای فیزیک بی‌درنگ و دوقلوهای دیجیتال زیرساخت‌های صنعتی؛ استودیو MIGO مانورهای ایمنی HSE، عیب‌یابی توربین‌های هوایی و سناریوهای اضطراری نفت و گاز را بدون کوچک‌ترین ریسک جانی یا خسارت به تجهیزات بازآفرینی می‌کند.',
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
        'ساخت کنسول‌های فیزیکی کنترل و کابین‌های آموزشی شبیه‌ساز با تحویل کامل صفر تا صد',
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
    aliases: ['interactive-exhibitions', 'exhibition-tech', 'booth-installations', 'kinetic-walls'],
    title: {
      en: 'Interactive Installations — Exhibitions / Sensors / Kiosks',
      fa: 'سازه و تجهیزات تعاملی — نمایشگاهی / سنسورها / کیوسک‌ها',
    },
    family: {
      en: 'Physical Computing',
      fa: 'سیستم‌های تعاملی و تجهیزات محیطی',
    },
    shortDescription: {
      en: 'Kinetic video walls, LiDAR multi-touch surfaces, touchless body tracking, trade show crowd magnets, and turnkey hardware-software integration.',
      fa: 'دیوارهای تصویری حساس به حرکت، صفحات لمسی بزرگ با سنسور لایدار، بازی‌های بدون لمس، جلب توجه رهگذران غرفه و اجرای کامل سخت‌افزار و نرم‌افزار.',
    },
    overview: {
      en: 'Transforming architectural spaces, museums, and trade shows into living responsive digital canvases. MIGO engineers kinetic video walls, depth-sensor gesture installations, LiDAR laser touch surfaces, interactive projection mapping, and custom multi-touch kiosk software built to withstand intense event foot traffic.',
      fa: 'تبدیل فضاهای نمایشگاهی، موزه‌ها و شوروم‌ها به استیج‌های زنده و تعاملی دیجیتال؛ استودیو MIGO با طراحی دیوارهای تصویری حساس به حرکت، سنسورهای عمق‌سنج، تبدیل دیوارهای بزرگ به صفحات لمسی با سنسورهای لایدار، ویدیو مپینگ تعاملی و کیوسک‌های لمسی، غرفه شما را به پربازدیدترین نقطه رویداد تبدیل می‌کند.',
    },
    icon: 'Sparkles',
    badge: {
      en: 'Installations & Kiosks',
      fa: 'کیوسک‌ها و سازه‌های تعاملی',
    },
    capabilities: {
      en: [
        'LiDAR laser tracking converting standard LED walls and partitions into massive multi-touch screens',
        'Touchless body tracking with Azure Kinect, depth cameras, and radar sensors for sanitary public interaction',
        'Interactive projection mapping responding in real time to visitor footsteps and physical touches',
        'Development of multi-touch software for large exhibition video walls, smart tables, and kiosks',
        'TouchDesigner and Notch real-time generative visual pipelines running at locked 60 FPS',
        'Autonomous turnkey delivery: hardware sourcing, mount calibration, on-site setup, and 24/7 expo standby',
      ],
      fa: [
        'تبدیل ویدیووال‌ها و دیوارهای عادی غرفه به صفحات لمسی غول‌پیکر با سنسورهای لیزری لایدار (LiDAR)',
        'ردیابی حرکتی بدن و ژست دست با Azure Kinect، سنسورهای رادار و دوربین‌های عمق‌سنج بدون نیاز به لمس',
        'ویدیو مپینگ تعاملی روی دیوارها، کف زمین و حجم‌های دکوراسیون با واکنش بلادرنگ به گام‌های مخاطب',
        'توسعه نرم‌افزارهای مالتی‌تاچ برای کیوسک‌ها، استندهای هوشمند و میزهای لمسی نمایشگاهی',
        'تولید افکت‌ها و تصاویر گرافیکی زنده و پویا با TouchDesigner و ابزارهای روز با نرخ ۶۰ فریم',
        'اجرای صفر تا صد: تامین سخت‌افزار، نصب و تنظیم در محل و حضور پشتیبان فنی در تمام روزهای نمایشگاه',
      ],
    },
    useCases: [
      {
        title: { en: 'Trade Show Flagship Kinetic Wall & Crowd Magnet', fa: 'دیوار تعاملی شاخص غرفه برای شلوغ کردن و جلب توجه بازدیدکنندگان' },
        desc: {
          en: 'A massive 10-meter video wall that reacts in real-time as visitors walk past, transforming passersby into engaged participants through dynamic brand shaders.',
          fa: 'دیوار ویدیویی ۱۰ متری که با راه رفتن مخاطبان در غرفه امواج نوری و محتوای هوشمند تولید کرده و رهگذران سالن را به سمت داخل غرفه جذب می‌کند.',
        },
      },
      {
        title: { en: 'Interactive Floor & Wall Projection', fa: 'پروژکشن مپینگ تعاملی کف و دیواره‌ها' },
        desc: {
          en: 'Creating magical sensory pathways where digital water ripples, corporate storylines, or dynamic graphics follow visitor movements on the floor.',
          fa: 'خلق مسیرهای تعاملی حسی که با گام برداشتن بازدیدکنندگان، امواج آب، ذرات نورانی یا مفاهیم برند در زیر پای آنان شکل می‌گیرد.',
        },
      },
      {
        title: { en: 'Museum & Heritage Interactive Galleries', fa: 'نمایشگاه‌های لمسی و تعاملی موزه' },
        desc: {
          en: 'Visitors interact with virtual historical artifacts on multi-touch smart tables without physical wear.',
          fa: 'کاوش و لمس مجازی اشیای تاریخی بر روی میزهای لمسی هوشمند بدون ایجاد استهلاک فیزیکی.',
        },
      },
    ],
    technologies: ['TouchDesigner', 'LiDAR Sensors (Hokuyo / Slamtec)', 'Azure Kinect', 'Intel RealSense', 'Unity', 'WebGL'],
    relevantProjects: ['lumina-motion-wall'],
    faqs: [
      {
        q: {
          en: 'How long does it take to deploy and calibrate an interactive installation at an exhibition?',
          fa: 'راه‌اندازی و کالیبراسیون تجهیزات تعاملی در غرفه نمایشگاه چقدر زمان می‌برد؟',
        },
        a: {
          en: 'Pre-production and software testing are completed in our studio weeks prior. On-site installation, projector blending, and LiDAR touch calibration typically require 6 to 12 hours during the booth construction setup day.',
          fa: 'تمامی مراحل توسعه نرم‌افزار، تست‌های شبیه‌سازی و محتوا از هفته‌ها قبل در استودیو نهایی می‌شوند. نصب فیزیکی سنسورها، بلِند پروژکتورها و کالیبراسیون لایدار در محل غرفه معمولاً بین ۶ تا ۱۲ ساعت در روز ساخت و تحویل غرفه انجام می‌شود.',
        },
      },
      {
        q: {
          en: 'Does MIGO handle the physical hardware as well as the code?',
          fa: 'آیا استودیو MIGO بخش سخت‌افزار را هم همراه با نرم‌افزار ارائه می‌دهد؟',
        },
        a: {
          en: 'Yes. We offer 100% turnkey delivery: we specify, calibrate, and mount the sensors, touch screens, and computing units on-site.',
          fa: 'بله. ما خدمات را صفر تا صد ارائه می‌دهیم؛ تامین تجهیزات، تنظیم دقیق سنسورها، نصب و راه‌اندازی در محل غرفه کاملاً بر عهده تیم ماست.',
        },
      },
      {
        q: {
          en: 'How many simultaneous users can interact with a LiDAR touch wall?',
          fa: 'چند نفر به صورت هم‌زمان می‌توانند با دیوار لمسی لایدار تعامل داشته باشند؟',
        },
        a: {
          en: 'Industrial 2D/3D LiDAR sensors can track 20+ simultaneous touch points and gesture targets with zero input latency across walls up to 20 meters wide.',
          fa: 'سنسورهای صنعتی لایدار قادر به ردیابی هم‌زمان بیش از ۲۰ نقطه تماس و تعامل کاربر با تاخیر زیر ۱۰ میلی‌ثانیه بر روی دیوارهایی به طول تا ۲۰ متر هستند.',
        },
      },
    ],
  },
];
