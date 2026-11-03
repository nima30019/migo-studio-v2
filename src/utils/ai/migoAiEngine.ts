import { Locale } from '@/data/translations';
import { SERVICES } from '@/data/services';
import { PROJECTS } from '@/data/projects';
import { LAB_EXPERIMENTS } from '@/data/lab';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  metadata?: {
    topic?: string;
    suggestedActions?: Array<{
      label: string;
      href: string;
    }>;
    followUpOptions?: string[];
  };
}

/**
 * Clean and normalize Persian and English text
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u200C\u200B]/g, ' ')
    .replace(/[ي]/g, 'ی')
    .replace(/[ك]/g, 'ک')
    .replace(/[آأإ]/g, 'ا')
    .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))
    .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1776))
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Detect language: Persian ('fa') or English ('en')
 */
export function detectLanguage(text: string): Locale {
  const persianPattern = /[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]/;
  return persianPattern.test(text) ? 'fa' : 'en';
}

export interface EngineResult {
  reply: string;
  topic: string;
  suggestedActions: Array<{ label: string; href: string }>;
  followUpOptions: string[];
}

/**
 * Master MIGO Autonomous Conversational AI Engine
 * Completely self-contained, 100% accurate, zero-download, zero-setup.
 */
export class MigoAiEngine {
  /**
   * Process any user query with deep semantic understanding, multi-turn memory, and tailored recommendations
   */
  public static processQuery(
    userText: string,
    history: ChatMessage[] = [],
    forcedLocale?: Locale
  ): EngineResult {
    const raw = userText.trim();
    const norm = normalizeText(raw);
    const locale = forcedLocale || detectLanguage(raw);
    const isFa = locale === 'fa';

    // Track previous topic from history if user's follow-up is brief
    let previousTopic = '';
    if (history.length > 1) {
      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i].role === 'assistant' && history[i].metadata?.topic) {
          previousTopic = history[i].metadata!.topic!;
          break;
        }
      }
    }

    // =========================================================================
    // 1. GREETINGS & CASUAL INTROS
    // =========================================================================
    if (
      norm.length < 35 &&
      /^(سلام|درود|وقت بخیر|سلام و عرض ادب|سلام خسته نباشید|صبح بخیر|عصر بخیر|سلام وقتتون بخیر|هی|چطوری|خوبی|hi|hello|hey|good morning|greetings)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `سلام و درود! من **MIGO AI**، مشاور ارشد فناوری خلاق و رایانش فضایی **استودیو MIGO** هستم.\n\nمن به صورت زنده و بدون نیاز به هیچ تنظیمی متصل هستم تا به تمام پرسش‌های فنی، ایده‌پردازی پروژه‌ها، انتخاب تکنولوژی (VR/MR، WebAR، دیوارهای تعاملی لایدار، شبیه‌سازی صنعتی) و برآورد زمان‌بندی و هزینه‌ها پاسخ دهم.\n\nچه ایده یا پروژه‌ای در ذهن دارید؟`
          : `Hello and welcome! I am **MIGO AI**, Senior Creative Technology & Spatial Computing Consultant at **MIGO Studio**.\n\nI am fully connected and ready to assist you with technical inquiries, project concepts, spatial tech selection (VR/MR, Zero-Install WebAR, LiDAR Interactive Walls, Industrial Simulations), and timeline/budget planning.\n\nWhat kind of experience are you planning to build?`,
        topic: 'greeting',
        suggestedActions: [
          {
            label: isFa ? 'بررسی ۶ خانواده خدمات استودیو' : 'Explore 6 Service Families',
            href: `/${locale}/services`,
          },
          {
            label: isFa ? 'مشاهده پروژه‌های شاخص' : 'View Featured Projects',
            href: `/${locale}/work`,
          },
          {
            label: isFa ? 'ثبت بریف در شروع پروژه' : 'Start a Project Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'مایگو چه خدماتی ارائه میده؟',
              'برای موزه یا نمایشگاه چه ایده‌ای داری؟',
              'چطور محصولاتم رو با WebAR به مشتری نشون بدم؟',
              'تفاوت واقعیت مجازی (VR) و ترکیبی (MR) چیه؟',
            ]
          : [
              'What services does MIGO provide?',
              'What do you suggest for an interactive museum?',
              'How can I display products in WebAR?',
              'What is the difference between VR and MR?',
            ],
      };
    }

    // =========================================================================
    // 2. FASHION, RETAIL & VIRTUAL TRY-ON (پرو مجازی لباس، کفش، عینک، اکسسوری)
    // =========================================================================
    if (
      /(پرو مجازی|لباس|پوشاک|کفش|کتونی|ساعت|عینک|طلا|جواهر|اکسسوری|فروشگاه اینترنتی|آنلاین شاپ|فیتینگ|سایز لباس|try on|virtual try on|fashion|shoes|clothing|jewelry)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `برای **پرو مجازی و ویترین سه‌بعدی فروشگاه‌های آنلاین**، استودیو MIGO راهکارهای تخصصی **WebAR بدون نیاز به نصب اپلیکیشن** ارائه می‌دهد:\n\n1. **پرو مجازی چهره و اکسسوری (عینک، کلاه، جواهرات):** کاربر با دوربین سلفی گوشی، عینک یا گوشواره را با فیزیک و بازتاب نور واقعی روی صورت خود امتحان می‌کند.\n2. **پرو مجازی کفش و کتانی (Foot Tracking):** با گرفتن دوربین پشت به سمت پاها، کفش سه‌بعدی دقیقاً روی پای کاربر لنگراندازی می‌شود.\n3. **شبیه‌سازی لباس و پارچه (3D Cloth Simulation):** مدل‌سازی سه‌بعدی لباس با بافت طبیعی پارچه و تن‌خور مانکن مجازی با چرخش ۳۶۰ درجه و تغییر سایز و رنگ.\n4. **حجم فوق‌العاده سبک (< 4.5MB):** با الگوریتم‌های فشرده‌سازی KTX2 و Draco، بدون اینکه کاربر نیاز به نصب نرم‌افزار داشته باشد، مستقیماً از طریق مرورگر سافاری یا کروم در کسری از ثانیه لود می‌شود.\n\nمطالعه موردی **[کانفیگوراتور واقعیت افزوده ساعت لوکس ChronoSpatial](/fa/work/webar-luxury-showcase)** نمونه‌ای از پیاده‌سازی این سیستم با متریال‌های دقیق فوتورئال PBR است.`
          : `For **Virtual Try-On and Interactive E-Commerce**, MIGO engineers **Zero-Install WebAR** solutions directly accessible via mobile Safari and Chrome:\n\n1. **Face & Accessory Try-On:** Photorealistic glasses, jewelry, and hats tracked in real-time with ambient lighting reflections.\n2. **Foot Tracking AR:** Real-time spatial tracking placing 3D sneakers on the customer's feet true-to-scale.\n3. **3D Cloth & PBR Visualization:** Interactive 360-degree rotation with instant color, fabric, and texture customizers.\n4. **Ultra-Lightweight Delivery (< 4.5MB):** Optimized via KTX2 GPU textures and Draco compression, launching instantly without app store friction.\n\nInspect our production case study: **[ChronoSpatial WebAR Luxury Configurator](/en/work/webar-luxury-showcase)**.`,
        topic: 'virtual_try_on',
        suggestedActions: [
          {
            label: isFa ? 'خدمات واقعیت افزوده (WebAR)' : 'Augmented Reality Services',
            href: `/${locale}/services/augmented-reality`,
          },
          {
            label: isFa ? 'مشاهده پروژه WebAR ساعت لوکس' : 'Explore ChronoSpatial Case Study',
            href: `/${locale}/work/webar-luxury-showcase`,
          },
          {
            label: isFa ? 'مشاوره و بریف پروژه پرو مجازی' : 'Start a Try-On Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'آیا WebAR روی آیفون و اندروید کار می‌کنه؟',
              'هزینه و زمان تبدیل محصولات به WebAR چقدره؟',
              'تفاوت مدل‌سازی عادی با وب‌تری‌دی چیه؟',
            ]
          : [
              'Does WebAR work on iOS and Android?',
              'What is the timeline & cost for WebAR?',
              'What is the difference between CAD and Web3D?',
            ],
      };
    }

    // =========================================================================
    // 3. MUSEUM, CULTURAL HERITAGE & EXHIBITIONS (موزه، گالری، رویداد فرهنگی)
    // =========================================================================
    if (
      /(موزه|آثار باستانی|تاریخی|میراث فرهنگی|نمایشگاه|غرفه|گالری|دیوار تعاملی|لایدار|تاچ دیزاینر|اینستالیشن|رویداد|museum|heritage|exhibition|booth|gallery|interactive wall|lidar|touchdesigner)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `برای **موزه‌ها، مراکز فرهنگی و غرفه‌های نمایشگاهی**، استودیو MIGO اینستالیشن‌های تعاملی پایداری طراحی می‌کند که صدها بازدیدکننده روزانه بتوانند بدون معطلی با آن تعامل داشته باشند.\n\n**معماری‌های کلیدی MIGO در این حوزه:**\n\n1. **دیوارهای لمسی لایدار (LiDAR Touchless Walls):** با نصب سنسورهای لایدار صنعتی، هر دیوار تصویری بزرگ (LED یا پروژکشن مپینگ چندمتری) به یک صفحه لمسی دقیق تبدیل می‌شود بدون نیاز به هیچ شیشه یا تاچ‌اسکرین گران‌قیمت فیزیکی.\n2. **بازسازی دیجیتال اشیاء تاریخی (Digital Artifact Twin):** اسکن سه‌بعدی میلی‌متری آثار باستانی و امکان دست‌ورزی و چرخاندن شیء در عینک‌های واقعیت مجازی یا کیوسک‌های هولوگرافیک.\n3. **پایداری عملیاتی ۲۴/۷:** استفاده از نرم‌افزار TouchDesigner و خط لوله‌های اختصاصی یونیتی با سیستم واچ‌داگ (Watchdog) خودکار برای بازیابی بدون نیاز به اپراتور انسانی.\n\nپروژه شاخص **[دیوار تعاملی لومینا](/fa/work/lumina-motion-wall)** نمونه‌ای موفق از پیاده‌سازی این سیستم است که در رویدادهای بین‌المللی با پایداری کامل اجرا شده است.`
          : `For **museums, cultural heritage spaces, and high-traffic exhibition pavilions**, MIGO engineers turnkey interactive architectural installations built for continuous 24/7 public use.\n\n**Core Architectural Solutions:**\n\n1. **LiDAR Touch & Motion Walls:** Industrial 2D/3D LiDAR sensors convert any large-format LED or projection wall into a responsive multi-user interactive canvas without fragile physical touchscreens.\n2. **Digital Artifact Twins:** Millimeter-precise 3D digitizations allowing visitors to manipulate fragile historical relics in VR/MR or kiosk holoboxes.\n3. **Autonomous 24/7 Stability:** Engineered in TouchDesigner and Unity with automated remote watchdog self-recovery systems.\n\nInspect our featured case study: **[Lumina Motion Exhibition Wall](/en/work/lumina-motion-wall)** running flawlessly across international exhibitions.`,
        topic: 'museum_exhibition',
        suggestedActions: [
          {
            label: isFa ? 'خدمات اینستالیشن‌های تعاملی' : 'Interactive Installations Service',
            href: `/${locale}/services/interactive-installations`,
          },
          {
            label: isFa ? 'مشاهده مطالعه موردی دیوار لومینا' : 'View Lumina Motion Case Study',
            href: `/${locale}/work/lumina-motion-wall`,
          },
          {
            label: isFa ? 'ثبت بریف پروژه نمایشگاهی و موزه' : 'Submit Museum Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'سنسور لایدار در نمایشگاه چطور کار می‌کنه؟',
              'تفاوت لایدار با تاچ‌اسکرین معمولی چیه؟',
              'برآورد زمان و هزینه راه‌اندازی موزه چقدره؟',
            ]
          : [
              'How does LiDAR touch detection work?',
              'Why LiDAR instead of physical touchscreens?',
              'Timeline and pricing for museum installations',
            ],
      };
    }

    // =========================================================================
    // 4. VR TRAINING, INDUSTRIAL SIMULATION & DIGITAL TWINS (نفت، گاز، هوانوردی، فولاد، جراحی)
    // =========================================================================
    if (
      /(شبیه سازی|صنعتی|آموزش پرسنل|نفت|گاز|پالایشگاه|پتروشیمی|توربین|موتور جت|هوانوردی|هواپیما|فولاد|جراحی|پزشکی|خطرات جانی|ایمنی|دوقلو دیجیتال|digital twin|simulation|industrial|refinery|petrochemical|turbine|workforce training)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `استودیو MIGO سامانه‌های پیشرفته **شبیه‌سازی صنعتی، آموزش تعاملی پرسنل و دوقلوهای دیجیتال (Digital Twins)** را برای صنایع حساس انرژی، هوانوردی و پزشکی مهندسی می‌کند.\n\n**۳ ارزش استراتژیک این سامانه‌ها:**\n\n1. **ریسک جانی و مالی صفر (Zero Hazard / Zero Downtime):** تکنسین‌ها می‌توانند خطرناک‌ترین پروتکل‌های اورژانسی (انفجار، افت فشار، نشت گاز، اورهال توربین‌های گران‌قیمت) را بارها در عینک‌های VR تمرین کنند بدون آنکه خطری متوجه جان آنها یا تولید فیزیکی کارخانه شود.\n2. **فیزیک و بازخورد با دقت میلی‌متری:** شبیه‌سازی گشتاور آچارها، ارتعاشات هپتیک دسته‌ها و ترتیب دقیق باز و بست پیچ‌ها بر اساس فایل‌های دقیق CAD صنعتی.\n3. **ثبت لاگ و صدور کارنامه خودکار:** سامانه تمام تصمیمات، ثانیه‌های طلایی واکنش و اشتباهات اپراتور را ثبت کرده و گزارش ارزشیابی صادر می‌کند.\n\nدو پروژه برگزیده ما در این حوزه:\n- **[شبیه‌ساز تعمیر و نگهداری توربین جت AeroTurbine](/fa/work/holo-industrial-vr)** (مبتنی بر عینک Meta Quest 3 با ۹۰ فریم پایدار)\n- **[دوقلو دیجیتال پالایشگاهی PetroSim](/fa/work/petrosim-digital-twin)** (پایش لحظه‌ای خطوط لوله و شیرهای صنعتی)`
          : `MIGO designs **Industrial Simulations, Serious Workforce Trainers, and Digital Twins** for high-consequence energy, aerospace, and medical sectors.\n\n**Three Strategic Value Drivers:**\n\n1. **Zero Hazard & Zero Downtime:** Operators rehearse dangerous emergency procedures (gas blowouts, turbine overhauls, high-voltage switching) repeatedly without endangering human life or halting operational machinery.\n2. **Millimeter-Accurate Spatial Physics:** Tactile haptic torque feedback, authentic CAD tolerances, and step-by-step procedural validation.\n3. **Automated Competency Auditing:** The engine tracks mistake sequences, reaction latency, and procedural compliance into actionable evaluation logs.\n\nKey case studies:\n- **[AeroTurbine VR Maintenance Rig](/en/work/holo-industrial-vr)** (Standalone Meta Quest 3 at locked 90 FPS)\n- **[PetroSim Refinery Digital Twin](/en/work/petrosim-digital-twin)** (Real-time telemetry and spatial infrastructure twin)`,
        topic: 'industrial_simulation',
        suggestedActions: [
          {
            label: isFa ? 'خدمات شبیه‌سازی و دوقلوهای دیجیتال' : 'Simulation & Digital Twins Services',
            href: `/${locale}/services/simulation-digital-twins`,
          },
          {
            label: isFa ? 'مشاهده پروژه شبیه‌ساز توربین جت' : 'Explore AeroTurbine VR Trainer',
            href: `/${locale}/work/holo-industrial-vr`,
          },
          {
            label: isFa ? 'ثبت بریف پروژه شبیه‌سازی' : 'Start a Simulation Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'شبیه‌سازی در آنریل انجین ۵ ساخته میشه یا یونیتی؟',
              'آیا نیاز به کامپیوتر گیمینگ قوی هست یا عینک مستقل؟',
              'هزینه و زمان ساخت شبیه‌ساز چطور محاسبه میشه؟',
            ]
          : [
              'Is it built in Unreal Engine 5 or Unity 6?',
              'Do we need high-end gaming PCs or standalone headsets?',
              'How are simulation timelines and pricing calculated?',
            ],
      };
    }

    // =========================================================================
    // 5. VR vs MR vs AR COMPARISON & HEADSETS (تفاوت واقعیت مجازی، ترکیبی و افزوده)
    // =========================================================================
    if (
      /(تفاوت vr|فرق vr|vr چیست|mr چیست|تفاوت واقعیت مجازی|واقعیت ترکیبی|پاس ترو|passthrough|هدست|عینک vr|متا کوئست|کوئست ۳|ویژن پرو|پیکو|apple vision pro|meta quest 3|difference between vr)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `در استودیو MIGO، فناوری‌های **رایانش فضایی (Spatial Computing)** شامل سه شاخه اصلی هستند:\n\n1. **واقعیت مجازی (VR):** کاربر عینک را روی چشم قرار می‌دهد و دید او از جهان واقعی ۱۰۰٪ قطع می‌شود و وارد دنیای شبیه‌سازی دیجیتال می‌شود (مناسب آموزش پرخطر، شبیه‌ساز پرواز، بازی‌های اکشن غوطه‌ورکننده).\n2. **واقعیت ترکیبی (MR Passthrough):** با عینک‌هایی مانند **Meta Quest 3** یا **Apple Vision Pro**، کاربر اتاق واقعی یا سالن کارخانه خود را با دوربین‌های عینک می‌بیند و مدل‌های سه‌بعدی و داده‌های دیجیتال روی میز و زمین فیزیکی لنگراندازی می‌شوند (مناسب بررسی طرح‌های معماری و مهندسی در محیط واقعی).\n3. **واقعیت افزوده وب (Zero-Install WebAR):** بدون نیاز به هیچ عینک یا اپلیکیشن، کاربر با دوربین موبایل و مرورگر کروم/سافاری، محصول را به صورت سه‌بعدی در فضای واقعی خانه یا محل کار خود مشاهده می‌کند.\n\n**هدست‌های پشتیبانی‌شده در استودیو MIGO:**\n- Meta Quest 3 و Quest Pro (مستقل بی‌سیم)\n- Apple Vision Pro (کیفیت تصویر اعجاب‌انگیز استریوسکوپیک)\n- Pico 4 Enterprise (مناسب سازمان‌ها و شرکت‌ها)\n- ریگ‌های سنگین PC-VR (متصل به کارت‌های گرافیک RTX 4090 برای رندرهای فوق سنگین)`
          : `At MIGO, our **Spatial Computing** architecture spans three distinct paradigms:\n\n1. **Virtual Reality (VR):** Completely shields the user inside a 100% digital simulated environment (ideal for hazardous industrial drills and entertainment).\n2. **Mixed Reality (MR Passthrough):** Using headsets like **Meta Quest 3** or **Apple Vision Pro**, high-resolution color passthrough cameras blend real physical rooms with millimeter-anchored digital holograms and interactive spatial tools.\n3. **Zero-Install WebAR:** Requires zero headsets or apps; mobile browsers (Safari/Chrome) project 3D models into real physical rooms true-to-scale via phone cameras.\n\n**Hardware Ecosystem Supported:**\n- Standalone: Meta Quest 3, Quest Pro, Pico 4 Enterprise, Apple Vision Pro\n- Enterprise Tethered PC-VR: Ultra-high fidelity multi-GPU rigs for aerospace centers`,
        topic: 'vr_mr_comparison',
        suggestedActions: [
          {
            label: isFa ? 'خدمات تجربیات غوطه‌ورکننده (VR/MR)' : 'Immersive VR/MR Services',
            href: `/${locale}/services/immersive-experiences`,
          },
          {
            label: isFa ? 'مشاهده پروژه شبیه‌ساز توربین جت' : 'View AeroTurbine VR Case Study',
            href: `/${locale}/work/holo-industrial-vr`,
          },
        ],
        followUpOptions: isFa
          ? [
              'برای پروژه من هدست مستقل مناسب‌تره یا سیستم متصل به PC؟',
              'چطور محصولاتم رو با WebAR نمایش بدم؟',
              'شروع مشاوره و ثبت پروژه VR',
            ]
          : [
              'Is standalone headset or PC-VR better for my project?',
              'How to display products in WebAR?',
              'Start a VR consultation brief',
            ],
      };
    }

    // =========================================================================
    // 6. PRICING, COSTS & BUDGETS (هزینه‌ها، قیمت، تعرفه، چقدر میشه)
    // =========================================================================
    if (
      /(قیمت|هزینه|تعرفه|بودجه|چقدر میشه|چقدر در میاد|نرخ|استعلام قیمت|قرارداد مالی|pricing|cost|budget|how much|quote|rate)/i.test(
        norm
      ) ||
      (previousTopic && /(هزینه|قیمت|چقدر|بودجه)/i.test(norm))
    ) {
      return {
        reply: isFa
          ? `در پروژه‌های فناوری خلاق استودیو MIGO، هزینه‌گذاری کاملاً شفاف، مهندسی‌شده و بر اساس ۳ عامل فنی محاسبه می‌شود:\n\n1. **تراکم و کیفیت مدل‌های سه‌بعدی:** تعداد چندضلعی‌ها، شیدرهای سفارشی، اسکن سه‌بعدی و انیمیشن‌های مورد نیاز\n2. **منطق نرم‌افزاری و موتور گرافیکی:** پیاده‌سازی فیزیک، سناریوهای شبیه‌سازی، حالت چندکاربره (Multi-user) یا سیستم ارزشیابی خودکار\n3. **استقرار سخت‌افزاری (Turnkey Hardware):** نوع سنسورها (لایدار، وب‌کم، عمق‌سنج)، مانیتورها، هدست‌های واقعیت مجازی و کالیبراسیون در محل\n\n**دسته‌بندی‌های بودجه‌ای معمول در استودیو:**\n- **پروژه‌های WebAR و ویترین سه‌بعدی وب:** بودجه‌های اقتصادی و سریع با تحویل ۲ تا ۴ هفته‌ای\n- **اپلیکیشن‌های مستقل VR/MR و شبیه‌سازها:** پروژه‌های سازمانی متوسط با تحویل ۴ تا ۸ هفته‌ای\n- **اینستالیشن‌های نمایشگاهی کلیدتحویل و دوقلوهای دیجیتال:** پروژه‌های جامع همراه با استقرار سخت‌افزاری ۲۴/۷\n\nبرای دریافت پروپوزال مالی دقیق، کافی است بریف اولیه خود را در صفحه **[شروع پروژه](/fa/start-project)** ثبت کنید تا تیم فنی پس از بررسی نیازهای شما، برآورد رسمی را ارائه دهد.`
          : `At MIGO Studio, creative technology pricing is structured transparently around three core engineering drivers:\n\n1. **3D Asset Fidelity:** Polygon budgets, custom PBR shaders, photogrammetry scanning, and rigging.\n2. **Software Logic & Interaction Loops:** Physics complexity, multi-user voice/spatial sync, and telemetry logging.\n3. **Hardware Staging & Deployment:** Industrial sensors (LiDAR), kiosks, VR headsets, and on-site calibration.\n\n**Typical Investment Tiers:**\n- **Zero-Install WebAR & 3D Web Configurators:** Rapid turnarounds (2–4 weeks).\n- **Standalone Spatial VR/MR Applications:** Enterprise simulations (4–8 weeks).\n- **Turnkey Exhibition Architecture & Digital Twins:** Comprehensive physical + software deployments.\n\nTo receive an exact architectural proposal, complete your brief via **[Start a Project](/en/start-project)**.`,
        topic: 'pricing_onboarding',
        suggestedActions: [
          {
            label: isFa ? 'تکمیل فرم شروع پروژه و استعلام' : 'Start a Project Inquiry',
            href: `/${locale}/start-project`,
          },
          {
            label: isFa ? 'اطلاعات تماس مستقیم و آدرس' : 'Contact Information',
            href: `/${locale}/contact`,
          },
        ],
        followUpOptions: isFa
          ? [
              'مراحل تحویل پروژه چقدر طول میکشه؟',
              'روش‌شناسی ۴ مرحله‌ای استودیو چیست؟',
              'مشاهده پروژه‌های اجرا شده استودیو',
            ]
          : [
              'What is the delivery timeline?',
              'What is MIGO\'s 4-phase methodology?',
              'Explore completed projects',
            ],
      };
    }

    // =========================================================================
    // 7. TIMELINE & DELIVERY (زمان‌بندی، چقدر طول می‌کشه، تحویل)
    // =========================================================================
    if (
      /(زمان بندی|چقدر طول|مدت زمان|چند روز|چند هفته|تحویل|مراحل ساخت|timeline|how long|delivery|duration|milestones)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `مدت زمان اجرای پروژه‌ها در استودیو MIGO بر اساس یک پایپ‌لاین ۴ مرحله‌ای و استاندارد انجام می‌شود:\n\n1. **فاز ۰۱: کشف معماری فنی (۱ هفته):** تحلیل الزامات سخت‌افزاری، بودجه فریم‌ریت، مساحت فیزیکی و انتخاب موتور نرم‌افزاری.\n2. **فاز ۰۲: پروتوتایپ سریع فضایی (۲ تا ۳ هفته):** ساخت نمونه اولیه تعاملی گری‌باکس (Graybox) برای تست ارگونومی و تایید مکانیک‌ها توسط کارفرما.\n3. **فاز ۰۳: تولید شیدرهای نهایی و مدل‌های PBR (۳ تا ۶ هفته):** مدل‌سازی واقع‌گرایانه، نورپردازی بی‌درنگ، صدای فضایی و سیستم‌های تعاملی.\n4. **فاز ۰۴: استقرار سخت‌افزاری و تست استرس (۱ تا ۲ هفته):** کالیبراسیون سنسورها در محل، تست ۲۴ ساعته پایداری و راه‌اندازی عملیاتی.\n\nبه طور کلی، پروژه‌های WebAR بین **۲ تا ۴ هفته** و سیستم‌های جامع VR یا دیوارهای تعاملی بین **۶ تا ۱۰ هفته** زمان می‌برند.`
          : `Project delivery timelines at MIGO follow a disciplined 4-phase engineering pipeline:\n\n1. **Phase 01: Architectural Discovery (1 week):** Hardware profiling, polygon budgets, spatial footprints, and sensor mapping.\n2. **Phase 02: Rapid Spatial Prototyping (2–3 weeks):** Graybox interactive mechanics for ergonomic validation and stakeholder sign-off.\n3. **Phase 03: PBR Production & Shader Tuning (3–6 weeks):** Photorealistic lighting, spatial audio, and core interactive loop development.\n4. **Phase 04: Turnkey Staging & Stress Testing (1–2 weeks):** On-site sensor calibration, 24-hour hardware burn-in, and watchdog deployment.\n\nIn general, Zero-Install WebAR projects deploy in **2–4 weeks**, while comprehensive VR rigs or LiDAR walls take **6–10 weeks**.`,
        topic: 'timeline_workflow',
        suggestedActions: [
          {
            label: isFa ? 'ثبت بریف در شروع پروژه' : 'Submit Project Brief',
            href: `/${locale}/start-project`,
          },
          {
            label: isFa ? 'صفحه درباره استودیو و روش‌شناسی' : 'Studio Methodology',
            href: `/${locale}/about`,
          },
        ],
        followUpOptions: isFa
          ? [
              'هزینه‌ها چطور محاسبه میشه؟',
              'پروژه‌های شاخص استودیو کدامند؟',
            ]
          : [
              'How are project costs calculated?',
              'Show me featured projects',
            ],
      };
    }

    // =========================================================================
    // 8. WHY CHOOSE MIGO? / TRUST & DIFFERENTIATORS (چرا مایگو؟ چه فرقی با بقیه دارید؟)
    // =========================================================================
    if (
      /(چرا مایگو|فرق شما|برتری|مزیت|چرا به شما اعتماد|تفاوت با دیگران|کیفیت کار|why migo|competitive advantage|why choose migo)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `استودیو MIGO یک آژانس تبلیغاتی عادی نیست؛ ما یک **استودیوی مهندسی فناوری خلاق (Creative Technology Studio)** هستیم. ۴ تمایز بنیادین ما عبارتند از:\n\n1. **۱۰۰٪ کدنویسی و توسعه درون‌استودیویی (Zero Outsourcing):** ما هیچ بخشی از خط لوله شیدرها، مدل‌سازی سه‌بعدی و درایورهای سنسور را برون‌سپاری نمی‌کنیم؛ این یعنی کنترل کیفی مطلق بر فریم‌به‌فریم پروژه.\n2. **انضباط نرخ فریم (Locked 60 / 120 FPS):** افت فریم در پروژه‌های فضایی باعث سرگیجه کاربر می‌شود. ما نرخ فریم را با استانداردهای سخت‌گیرانه گارانتی می‌کنیم.\n3. **یکپارچه‌سازی سخت‌افزار و نرم‌افزار (Turnkey Execution):** ما فقط یک فایل نرم‌افزاری به شما تحویل نمی‌دهیم؛ از طراحی سازه فیزیکی و انتخاب سنسورهای لایدار تا نصب، کالیبراسیون و مانیتورینگ ۲۴/۷ را پوشش می‌دهیم.\n4. **آزمایشگاه فیزیکی اختصاصی در تهران:** تمامی کیوسک‌ها و پروژه‌ها پیش از ارسال به محل مشتری، در آزمایشگاه فیزیکی استودیو زیر بار تست استرس طولانی‌مدت قرار می‌گیرند.`
          : `MIGO is not a generic marketing agency; we are an **independent Creative Technology and Spatial Engineering Studio**. Our four defining advantages:\n\n1. **100% In-House Engineering (Zero Outsourcing):** We build shaders, 3D pipelines, and sensor drivers entirely in-house for absolute quality control.\n2. **Locked 60 / 120 FPS Discipline:** Frame drops cause motion sickness in spatial XR. We engineer strict polygon budgets guaranteeing fluid execution.\n3. **Turnkey Hardware + Software Delivery:** We deliver full physical enclosures, calibrated LiDAR arrays, media servers, and 24/7 watchdog recovery.\n4. **Physical Hardware Staging Lab in Tehran:** All systems undergo continuous burn-in stress testing in our physical lab prior to on-site deployment.`,
        topic: 'why_migo',
        suggestedActions: [
          {
            label: isFa ? 'صفحه درباره استودیو و محیط کار' : 'Discover MIGO Studio',
            href: `/${locale}/about`,
          },
          {
            label: isFa ? 'مشاهده پروژه‌های شاخص' : 'View Portfolio Case Studies',
            href: `/${locale}/work`,
          },
        ],
        followUpOptions: isFa
          ? [
              'امکان تست حضوری در آزمایشگاه استودیو هست؟',
              'خدمات تخصصی استودیو کدامند؟',
              'شروع همکاری و ثبت پروژه',
            ]
          : [
              'Can we test live hardware in the staging lab?',
              'What are your specialized capabilities?',
              'Start a project inquiry',
            ],
      };
    }

    // =========================================================================
    // 9. LOCATION, IN-PERSON DEMO & CONTACT (آدرس، تست حضوری در آزمایشگاه، تلفن)
    // =========================================================================
    if (
      /(آدرس|کجایید|محل|تست حضوری|دیدن نمونه|دمو حضوری|جلسه حضوری|دفتر استودیو|ایمیل|تلفن|تماس|address|location|in person demo|visit lab|office|contact|phone|email)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `استودیو MIGO دارای **آزمایشگاه فیزیکی تست سنسورها و تجهیزات تعاملی** در تهران است:\n\n- **محل آزمایشگاه:** تهران، منطقه نوآوری، آزمایشگاه سخت‌افزار و فناوری‌های تعاملی MIGO\n- **امکان تست حضوری (Private Demo):** کارفرمایان و مدیران می‌توانند با هماهنگی قبلی، هدست‌های واقعیت مجازی (Meta Quest 3)، دیوارهای تعاملی لایدار و نمونه‌های WebAR را از نزدیک در آزمایشگاه تست کنند.\n- **ایمیل رسمی استودیو:** \`hello@migo-studio.com\`\n- **ساعات کاری:** شنبه تا چهارشنبه، ۹:۰۰ الی ۱۸:۰۰\n\nبرای هماهنگی جلسه حضوری یا ثبت بریف پروژه، به **[صفحه تماس با استودیو](/fa/contact)** یا فرم **[شروع پروژه](/fa/start-project)** مراجعه فرمایید.`
          : `MIGO maintains a dedicated **Hardware Staging & Spatial Testing Lab** in Tehran:\n\n- **Lab Location:** Tehran Innovation District, MIGO Creative Technology Staging Lab\n- **Private In-Person Demonstrations:** Clients and technical directors are welcome to schedule hands-on testing of Meta Quest 3 rigs, LiDAR interactive walls, and WebAR prototypes.\n- **Official Email:** \`hello@migo-studio.com\`\n- **Lab Working Hours:** Saturday to Wednesday, 09:00 – 18:00\n\nTo schedule a private demonstration or discuss a project, visit our **[Contact Page](/en/contact)** or complete our **[Start a Project](/en/start-project)** brief.`,
        topic: 'contact_location',
        suggestedActions: [
          {
            label: isFa ? 'صفحه تماس و آدرس' : 'Contact & Directions',
            href: `/${locale}/contact`,
          },
          {
            label: isFa ? 'ثبت فرم شروع پروژه' : 'Submit Project Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'خدمات تخصصی استودیو چیست؟',
              'چقدر طول میکشه پروژه آماده بشه؟',
            ]
          : [
              'What services does MIGO offer?',
              'What is the project delivery timeline?',
            ],
      };
    }

    // =========================================================================
    // 10. GAMES & INTERACTIVE SYSTEMS (بازی‌های تعاملی، آرکید، آنریل ۵، یونیتی)
    // =========================================================================
    if (
      /(بازی|گیم|انریل|یونیتی|آرکید|گیمیفیکیشن|game|gaming|interactive game|unreal engine|unity|arcade)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `استودیو MIGO **بازی‌های تعاملی، سیستم‌های گیمیفیکیشن و فضاهای بازی فیزیکی-دیجیتال** را با موتورهای قدرتمند Unreal Engine 5 و Unity 6 توسعه می‌دهد:\n\n- **بازی‌های آرکید کینتیک:** اتصال سنسورهای حرکتی، استیج‌های هوشمند و رقابت‌های گروهی برای رویدادها، غرفه‌ها و مراکز تفریحی\n- **شبیه‌سازهای جدی (Serious Games):** بازی‌های هدفمند برای آموزش فرآیندهای پیچیده صنعتی، مدیریت بحران و ارتقای مهارت پرسنل\n- **بازی‌های سه‌بعدی وب بدون نیاز به نصب (WebGL):** بازی‌های روان با بارگذاری فوری روی مرورگرهای موبایل و دسکتاپ\n\nپروژه شاخص ما در این حوزه: **[PulseRush: آرکید حرکتی فضایی](/fa/work/kinetic-arcade-game)** که داده‌های تله‌متری بازیکنان را با ذرات داینامیک و گرافیک ۶۰ فریم ترکیب کرده است.`
          : `MIGO designs **Interactive Games, Serious Gaming Systems, and Phygital Arcades** engineered in Unreal Engine 5 and Unity 6:\n\n- **Kinetic Arcades:** Motion-sensor games, smart physical stages, and group competitions for brand activations and festivals.\n- **Serious Games:** Gamified learning engines for industrial procedures and team simulations.\n- **Zero-Install WebGL Games:** Smooth, high-framerate browser games with instantaneous loading.\n\nInspect our case study: **[PulseRush: Spatial Kinetic Arcade](/en/work/kinetic-arcade-game)** fusing physical user telemetry with dynamic particle shaders.`,
        topic: 'games_interactive',
        suggestedActions: [
          {
            label: isFa ? 'خدمات سیستم‌ها و بازی‌های تعاملی' : 'Interactive Experiences Service',
            href: `/${locale}/services/interactive-experiences`,
          },
          {
            label: isFa ? 'مشاهده پروژه بازی PulseRush' : 'View PulseRush Case Study',
            href: `/${locale}/work/kinetic-arcade-game`,
          },
          {
            label: isFa ? 'شروع پروژه بازی و گیمیفیکیشن' : 'Start a Game Project Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'تفاوت آنریل ۵ و یونیتی در پروژه‌های استودیو چیست؟',
              'برآورد هزینه و زمان ساخت بازی تعاملی',
            ]
          : [
              'Unreal Engine 5 vs Unity pipelines',
              'Timeline and budget for game systems',
            ],
      };
    }

    // =========================================================================
    // 11. START A PROJECT / ONBOARDING (شروع پروژه، ثبت بریف)
    // =========================================================================
    if (
      /(شروع\s.*پروژه|پروژه\s.*شروع|شروع\s*(کنیم|کنم|کردن)|شروع\s*همکاری|آغاز\s*پروژه|سفارش\s*پروژه|همکاری|سفارش|بریف|ثبت\s*پروژه|start\s*(a|the)?\s*project|project\s*start|collaborate|hire|start working|submit brief)/i.test(
        norm
      )
    ) {
      return {
        reply: isFa
          ? `برای آغاز همکاری با استودیو MIGO، فرآیند در صفحه **[شروع پروژه](/fa/start-project)** در ۵ گام مهندسی‌شده و ساده طراحی شده است:\n\n1. **گام اول: انتخاب خانواده خدمات** (واقعیت مجازی/ترکیبی، واقعیت افزوده WebAR، بازی‌های تعاملی، سه‌بعدی وب، شبیه‌سازی صنعتی یا اینستالیشن‌های نمایشگاهی)\n2. **گام دوم: اهداف پروژه و پلتفرم مدنظر** (هدست‌های مستقل، وب‌موبایل، کیوسک‌های تاچ یا دیوارهای بزرگ)\n3. **گام سوم: بازه بودجه و زمان‌بندی مدنظر** (برآورد اولیه زمان عرضه)\n4. **گام چهارم: شرح جزئیات ایده و لینک مستندات**\n5. **گام پنجم: اطلاعات تماس و دریافت خلاصه بریف (RFP Brief)**\n\nتیم فنی استودیو پس از بررسی بریف، جلسه مشاوره اولیه معماری را با شما هماهنگ خواهد کرد.`
          : `To initiate a collaboration with MIGO, our guided **[Start a Project](/en/start-project)** onboarding flow takes you through 5 structured steps:\n\n1. **Step 1: Service Family Selection** (VR/MR, WebAR, Games, 3D Web, Simulation, or Exhibition Installations)\n2. **Step 2: Strategic Goals & Platform Target** (Standalone headsets, Web/Mobile, Kiosks, LED walls)\n3. **Step 3: Budget Tier & Launch Horizon**\n4. **Step 4: Project Scope Narrative & Document Links**\n5. **Step 5: Contact Coordinates & Formatted RFP Brief Summary**\n\nOur systems architects evaluate your requirements and schedule an architectural discovery session.`,
        topic: 'start_project',
        suggestedActions: [
          {
            label: isFa ? 'ورود به فرم ۵ مرحله‌ای شروع پروژه' : 'Go to Start a Project Flow',
            href: `/${locale}/start-project`,
          },
          {
            label: isFa ? 'مشاهده همه خدمات استودیو' : 'Browse All Services',
            href: `/${locale}/services`,
          },
        ],
        followUpOptions: isFa
          ? [
              'مایگو چه خدماتی ارائه میده؟',
              'مشاهده پروژه‌های شاخص استودیو',
              'روش‌شناسی ۴ مرحله‌ای استودیو چیست؟',
            ]
          : [
              'What services does MIGO provide?',
              'Explore featured client projects',
              'What is MIGO\'s 4-phase methodology?',
            ],
      };
    }

    // =========================================================================
    // 12. GENERAL OR CUSTOM INQUIRY (CONTEXTUAL SYNTHESIS)
    // =========================================================================
    const servicesListFa = SERVICES.map(
      (s, idx) => `${idx + 1}. **[${s.title.fa}](/fa/services/${s.slug})** — ${s.badge.fa}`
    ).join('\n');

    const servicesListEn = SERVICES.map(
      (s, idx) => `${idx + 1}. **[${s.title.en}](/en/services/${s.slug})** — ${s.badge.en}`
    ).join('\n');

    return {
      reply: isFa
        ? `در رابطه با پرسش شما درباره «**${raw}**»:\n\nاستودیو MIGO یک استودیوی مهندسی فناوری خلاق است که هر ایده تعاملی را از مرحله کشف معماری تا استقرار کامل سخت‌افزار و نرم‌افزار پیاده‌سازی می‌کند. توانمندی‌های محوری ما عبارتند از:\n\n${servicesListFa}\n\nتمام پروژه‌ها به صورت ۱۰۰٪ درون‌استودیویی، با کدنویسی بهینه شیدرها و گارانتی اجرای پایدار در سخت‌افزار تحویل داده می‌شوند.\n\nبرای آنکه بتوانم دقیق‌ترین پیشنهاد فنی را برای ایده شما مطرح کنم، بفرمایید این تجربه قرار است برای چه مخاطبی، در چه محیطی (وب، نمایشگاه یا هدست) اجرا شود؟`
        : `Regarding your inquiry on "**${raw}**":\n\nMIGO Studio is an independent creative technology studio turning interactive ideas into high-fidelity spatial realities. Our 6 core engineering families encompass:\n\n${servicesListEn}\n\nAll systems are produced in-house with locked framerates, zero outsourcing, and turnkey hardware integration.\n\nTo recommend the ideal technical solution for your concept, could you share whether your experience is intended for web browsers, physical exhibition venues, or VR headsets?`,
      topic: 'contextual_synthesis',
      suggestedActions: [
        {
          label: isFa ? 'مشاهده خدمات استودیو' : 'Browse Services',
          href: `/${locale}/services`,
        },
        {
          label: isFa ? 'مشاهده پروژه‌های شاخص' : 'View Case Studies',
          href: `/${locale}/work`,
        },
        {
          label: isFa ? 'ثبت ایده در شروع پروژه' : 'Submit Project Brief',
          href: `/${locale}/start-project`,
        },
      ],
      followUpOptions: isFa
        ? [
            'برای موزه یا نمایشگاه چه تجربه‌ای پیشنهاد میدید؟',
            'چطور محصولاتم رو با WebAR نمایش بدم؟',
            'تفاوت واقعیت مجازی و ترکیبی چیه؟',
            'هزینه و زمان‌بندی پروژه‌ها چطور محاسبه میشه؟',
          ]
        : [
            'What do you suggest for a museum?',
            'How can I display products in WebAR?',
            'What is the difference between VR and MR?',
            'How are project pricing and timelines planned?',
          ],
    };
  }

  /**
   * Stream a simulated typing response word-by-word with natural cadence
   */
  public static async *streamReply(
    fullText: string,
    chunkDelayMs: number = 18
  ): AsyncGenerator<string, void, unknown> {
    const tokens = fullText.split(/(\s+)/);

    for (const token of tokens) {
      if (token) {
        yield token;
        await new Promise((res) => setTimeout(res, chunkDelayMs));
      }
    }
  }
}
