import { Locale } from '@/data/translations';
import { SERVICES } from '@/data/services';
import { PROJECTS } from '@/data/projects';
import { LAB_EXPERIMENTS } from '@/data/lab';
import { MIGO_STUDIO_INFO, VERIFIED_FAQS } from '@/data/migoKnowledge';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  metadata?: {
    isFallback?: boolean;
    suggestedActions?: Array<{
      label: string;
      href: string;
    }>;
    followUpOptions?: string[];
  };
}

/**
 * Detect language from text (Persian vs English)
 */
export function detectLanguage(text: string): Locale {
  const persianPattern = /[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]/;
  return persianPattern.test(text) ? 'fa' : 'en';
}

/**
 * Intelligent Fallback Engine for MIGO Studio Knowledge Base
 */
export class FallbackEngine {
  /**
   * Process incoming user prompt against MIGO structured knowledge base
   */
  public static processQuery(
    userText: string,
    history: ChatMessage[] = [],
    forcedLocale?: Locale
  ): {
    reply: string;
    suggestedActions: Array<{ label: string; href: string }>;
    followUpOptions: string[];
  } {
    const raw = userText.trim().toLowerCase();
    const locale = forcedLocale || detectLanguage(userText);
    const isFa = locale === 'fa';

    // 1. GREETINGS & CASUAL INTROS
    const isGreeting = isFa
      ? /^(سلام|درود|وقت بخیر|سلام و عرض ادب|سلام خسته نباشید|سلام وقتتون بخیر|هی|صبح بخیر|عصر بخیر)/i.test(raw)
      : /^(hi|hello|hey|good morning|good afternoon|good evening|greetings)/i.test(raw);

    if (isGreeting && raw.length < 35) {
      return {
        reply: isFa
          ? `سلام و درود! من دستیار هوشمند پایگاه دانش **استودیو فناوری خلاق MIGO** هستم.\n\nمن می‌توانم در زمینه انتخاب تکنولوژی، بررسی خدمات (واقعیت مجازی، وب‌واقعیت‌افزوده، اینستالیشن‌های تعاملی نمایشگاهی، بازی و شبیه‌سازی)، مشاهده پروژه‌ها و نحوه آغاز همکاری به شما مشاوره دهم.\n\nچه نوع ایده یا پروژه‌ای در ذهن دارید؟`
          : `Hello and welcome! I am the intelligent knowledge assistant of **MIGO Creative Technology Studio**.\n\nI can consult with you regarding spatial technology selection, our 6 core service families (VR/MR, WebAR, Interactive Exhibitions, Games, Digital Twins, 3D WebGL), reviewing real portfolio case studies, or planning an upcoming project brief.\n\nWhat kind of experience or project do you have in mind?`,
        suggestedActions: [
          {
            label: isFa ? 'بررسی ۶ حوزه خدمات استودیو' : 'Explore 6 Service Families',
            href: `/${locale}/services`,
          },
          {
            label: isFa ? 'شروع پروژه و بریف همکاری' : 'Start a Project Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'مایگو چه خدماتی ارائه میده؟',
              'برای موزه یا نمایشگاه چه تجربه‌ای پیشنهاد میدید؟',
              'تفاوت VR و MR چیه؟',
              'مشاهده پروژه‌های واقعیت مجازی',
            ]
          : [
              'What services does MIGO provide?',
              'What do you suggest for an interactive museum?',
              'What is the difference between VR and MR?',
              'Show me VR/MR case studies',
            ],
      };
    }

    // 2. MUSEUM & EXHIBITION CONSULTATION
    const isMuseumExhibition = isFa
      ? /(موزه|نمایشگاه|غرفه|گالری|رویداد|اینستالیشن|دیوار تعاملی|سنسور لمسی|لایدار|تاچ دیزاینر|بازدیدکننده)/i.test(raw)
      : /(museum|exhibition|booth|gallery|installation|interactive wall|kinetic wall|lidar|touchdesigner|visitor)/i.test(raw);

    if (isMuseumExhibition) {
      return {
        reply: isFa
          ? `برای **موزه‌ها، گالری‌ها و فضاهای نمایشگاهی**، استودیو MIGO اینستالیشن‌های تعاملی مقیاس‌پذیر و پایدار طراحی می‌کند.\n\nبرای انتخاب بهترین معماری تعاملی، چند پرسش کلیدی مطرح است:\n\n1. **نوع تعامل مخاطب:** آیا ترجیح می‌دهید بازدیدکنندگان از طریق حسگرهای حرکتی بدن و لایدار (بدون لمس فیزیکی) تعامل کنند یا از تاچ‌اسکرین‌های صنعتی؟\n2. **ابعاد و ظرفیت فضا:** آیا تجربه برای یک فرد همزمان است (مانند کیوسک مستقل) یا تعامل چندنفره روی دیوارهای بزرگ تصویری (Multi-User Large Format)؟\n3. **هدف روایت‌گری:** آیا هدف آموزش و اسناد تاریخی است یا خلق یک جاذبه بصری هیجان‌انگیز (Spectacle)؟\n\nما در پروژه برگزیده **[دیوار تعاملی لومینا](/fa/work/lumina-motion-wall)** از ترکیب سنسورهای لایدار و پردازش بلادرنگ تاچ‌دیزاینر برای تعامل صدها نفر در روز با پایداری ۲۴/۷ استفاده کرده‌ایم.`
          : `For **museums, exhibitions, and sensory public spaces**, MIGO designs turnkey interactive architectural installations.\n\nTo tailor the ideal solution for your venue, consider these technical questions:\n\n1. **Interaction Modality:** Do you prefer touchless motion tracking (using LiDAR/depth sensors) or industrial physical touchscreens?\n2. **Spatial Capacity:** Is it a 1-to-1 kiosk experience or a shared multi-user canvas on large LED/projection walls?\n3. **Curatorial Goal:** Is the installation focused on deep archival storytelling or high-impact visual spectacle?\n\nIn our featured **[Lumina Motion Exhibition Wall](/en/work/lumina-motion-wall)** project, we deployed industrial LiDAR sensors and TouchDesigner real-time engines for 24/7 autonomous operation without requiring app downloads.`,
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
            label: isFa ? 'تکمیل فرم بریف نمایشگاهی' : 'Start an Exhibition Project',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'سنسور لایدار در نمایشگاه چطور کار می‌کنه؟',
              'هزینه و زمان‌بندی چطور محاسبه میشه؟',
              'مشاهده همه پروژه‌های استودیو',
            ]
          : [
              'How does LiDAR touch detection work?',
              'How are timeline and budgets planned?',
              'View all studio projects',
            ],
      };
    }

    // 3. 3D PRODUCT VIEWER & WEBAR CONSULTATION
    const isProductWebAR = isFa
      ? /(محصول|سه‌بعدی کالا|فروشگاه|ویترین|خرید|ar|webar|واقعیت افزوده|کد qr|کانفیگوراتور|دیدن در خانه)/i.test(raw)
      : /(product|3d viewer|ecommerce|store|retail|ar|webar|augmented reality|qr code|configurator|in my room)/i.test(raw);

    if (isProductWebAR) {
      return {
        reply: isFa
          ? `برای نمایش سه‌بعدی و خرید محصولات، استودیو MIGO راهکارهای **واقعیت افزوده وب (Zero-Install WebAR)** و **کانفیگوراتورهای ریل‌تایم ۳D** را پیشنهاد می‌دهد.\n\n**مزایای اصلی این راهکار:**\n- **بدون نیاز به نصب اپلیکیشن:** کاربر فقط با اسکن یک QR کد در مرورگر گوشی (سافاری یا کروم) محصول را در مقیاس واقعی روی میز یا زمین خانه خود قرار می‌دهد.\n- **حجم بسیار سبک (< 4.5MB):** با الگوریتم‌های فشرده‌سازی بافت‌های گرافیکی KTX2 و هندسه Draco، بارگذاری در کمتر از ۳ ثانیه انجام می‌شود.\n- **سفارشی‌سازی رنگ و متریال بی‌درنگ:** مشتری قبل از سفارش آنلاین می‌تواند تمام زوایا، متریال‌ها و جزئیات دقیق محصول را بررسی کند.\n\nنمونه اجرایی این راهکار در پروژه **[کانفیگوراتور واقعیت افزوده ساعت لوکس](/fa/work/webar-luxury-showcase)** پیاده‌سازی شده است.`
          : `For 3D product showcase and immersive e-commerce, MIGO specializes in **Zero-Install WebAR** and **Real-Time 3D Configurators**.\n\n**Key Strategic Advantages:**\n- **Zero App Friction:** Customers simply scan a QR code with standard Safari or Chrome mobile browsers—no App Store downloads required.\n- **Ultra-Lightweight Payload (< 4.5MB):** Optimized via KTX2 texture compression and Draco geometry, achieving sub-3-second load times.\n- **Photorealistic PBR Materials:** Customers inspect true-to-scale lighting, millimeter dimensions, and material finishes in their own room.\n\nSee this in action in our **[ChronoSpatial WebAR Luxury Configurator](/en/work/webar-luxury-showcase)** case study.`,
        suggestedActions: [
          {
            label: isFa ? 'خدمات واقعیت افزوده (WebAR)' : 'Augmented Reality Services',
            href: `/${locale}/services/augmented-reality`,
          },
          {
            label: isFa ? 'مشاهده پروژه WebAR ساعت لوکس' : 'Explore ChronoSpatial WebAR',
            href: `/${locale}/work/webar-luxury-showcase`,
          },
          {
            label: isFa ? 'شروع پروژه کانفیگوراتور' : 'Start a Configurator Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'WebAR روی آیفون و اندروید کار می‌کنه؟',
              'تفاوت مدل‌سازی عادی با وب‌تری‌دی چیه؟',
              'ثبت درخواست مشاوره تجاری',
            ]
          : [
              'Does WebAR work on iPhone & Android?',
              'What is the difference between Web3D & regular CAD?',
              'Start a project inquiry',
            ],
      };
    }

    // 4. VR & MR COMPARISON OR INQUIRY
    const isVRorMR = isFa
      ? /(واقعیت مجازی|واقعیت ترکیبی|عینک vr|هدست|متا کوئست|ویژن پرو|تفاوت vr|vr چیه|mr چیه|vr\/mr|اسپشیال)/i.test(raw)
      : /(virtual reality|mixed reality|vr headset|meta quest|vision pro|difference between vr|what is vr|what is mr|vr\/mr|spatial)/i.test(raw);

    if (isVRorMR) {
      return {
        reply: isFa
          ? `در استودیو MIGO، حوزه **رایانش فضایی (Spatial Computing)** شامل دو فناوری بنیادین است:\n\n- **واقعیت مجازی (VR):** کاربر کاملاً در یک دنیای سه‌بعدی دیجیتال قرار می‌گیرد و محیط اطراف او دیده نمی‌شود. این راهکار برای شبیه‌سازی‌های صنعتی پرخطر، آموزش اتاق تمیز، اورهال تجهیزات گران‌قیمت و بازی‌های هیجان‌انگیز فوق‌العاده است.\n- **واقعیت ترکیبی (MR Passthrough):** کاربر محیط واقعی کارگاه یا دفتر خود را از طریق دوربین‌های هدست می‌بیند و المان‌های هولوگرافیک دیجیتال به صورت پایدار و میلی‌متری بر روی سطوح فیزیکی لنگراندازی می‌شوند.\n\nپروژه **[شبیه‌ساز واقعیت مجازی توربین جت AeroTurbine](/fa/work/holo-industrial-vr)** نمونه‌ای از پیاده‌سازی VR بر روی عینک‌های Meta Quest 3 با ۹۰ فریم بر ثانیه پایدار و دقت قطعات صنعتی است.`
          : `At MIGO, our **Spatial Computing** discipline spans two core paradigms:\n\n- **Virtual Reality (VR):** Completely immerses the user inside a digital realm, shielding physical distractions. It is the premier choice for hazardous industrial drills, aerospace maintenance, and deeply immersive spatial games.\n- **Mixed Reality (MR Passthrough):** Merges real-world environments with millimeter-anchored 3D holograms, ideal for spatial prototyping and collaborative enterprise tools.\n\nOur featured project **[AeroTurbine Immersive VR Maintenance Rig](/en/work/holo-industrial-vr)** demonstrates high-precision standalone Quest 3 execution running at locked 90 FPS with 350+ interactive mechanical parts.`,
        suggestedActions: [
          {
            label: isFa ? 'خدمات تجربیات غوطه‌ورکننده (VR/MR)' : 'Immersive Experiences (VR/MR)',
            href: `/${locale}/services/immersive-experiences`,
          },
          {
            label: isFa ? 'مشاهده پروژه شبیه‌ساز توربین جت' : 'View AeroTurbine VR Case Study',
            href: `/${locale}/work/holo-industrial-vr`,
          },
        ],
        followUpOptions: isFa
          ? [
              'مایگو از چه هدست‌هایی پشتیبانی می‌کنه؟',
              'آیا نیاز به کامپیوتر قوی هست یا هدست مستقل؟',
              'مشاهده بخش شبیه‌سازی صنعتی',
            ]
          : [
              'Which headsets does MIGO support?',
              'Does it require a gaming PC or standalone headset?',
              'Explore Industrial Simulation services',
            ],
      };
    }

    // 5. INDUSTRIAL SIMULATION & DIGITAL TWINS
    const isSimulation = isFa
      ? /(شبیه سازی|صنعتی|دوقلو دیجیتال|آموزش پرسنل|خط تولید|نفت|گاز|پالایشگاه|توربین|آموزش تکنسین)/i.test(raw)
      : /(simulation|industrial|digital twin|workforce training|assembly line|oil|refinery|turbine|technician)/i.test(raw);

    if (isSimulation) {
      return {
        reply: isFa
          ? `استودیو MIGO سامانه‌های **شبیه‌سازی صنعتی و دوقلوهای دیجیتال (Digital Twins)** را برای شرکت‌های مهندسی و کارخانجات توسعه می‌دهد.\n\n**ارزش‌های محوری این خدمات:**\n1. **ریسک جانی صفر (0 Risk):** تکنسین‌ها پروتکل‌های اورژانسی و خطاهای پرخطر را بارها در محیط مجازی تمرین می‌کنند بدون اینکه خطری متوجه جان آنها یا تجهیزات فیزیکی شود.\n2. **کاهش چشمگیر هزینه‌های داون‌تایم:** نیازی به توقف توربین‌ها یا خطوط پالایشگاهی گران‌قیمت برای آموزش کارآموزان نیست.\n3. **ارزشیابی خودکار:** سیستم تمام خطاها، ترتیب بستن پیچ‌ها، گشتاور و زمان‌بندی را ثبت کرده و گزارش تحلیلی برای سرپرستان صادر می‌کند.\n\nبرای نمونه پروژه **[دوقلو دیجیتال پتروسیم](/fa/work/petrosim-digital-twin)** و **[شبیه‌ساز توربین جت](/fa/work/holo-industrial-vr)** را بررسی نمایید.`
          : `MIGO engineers **Industrial Simulations and Digital Twins** for high-consequence enterprise operations.\n\n**Core Value Drivers:**\n1. **Zero Life Hazard:** Technicians execute dangerous fault procedures repeatedly with complete safety.\n2. **Elimination of Machine Downtime:** Costly industrial assets remain in revenue operation while staff train in photorealistic digital replicas.\n3. **Automated Competency Auditing:** The system tracks mistake sequences, torque compliance, and completion times automatically.\n\nInspect our case studies: **[PetroSim Digital Twin](/en/work/petrosim-digital-twin)** and **[AeroTurbine VR Trainer](/en/work/holo-industrial-vr)**.`,
        suggestedActions: [
          {
            label: isFa ? 'خدمات شبیه‌سازی و دوقلوی دیجیتال' : 'Simulation & Digital Twins Services',
            href: `/${locale}/services/simulation-digital-twins`,
          },
          {
            label: isFa ? 'مشاهده پروژه دوقلوی پتروسیم' : 'Explore PetroSim Digital Twin',
            href: `/${locale}/work/petrosim-digital-twin`,
          },
          {
            label: isFa ? 'شروع مشاوره پروژه صنعتی' : 'Start an Industrial Inquiry',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'شبیه‌سازی در آنریل انجین ساخته میشه یا یونیتی؟',
              'آیا دیتای سنسورهای زنده به شبیه‌ساز وصل میشه؟',
              'شروع یک پروژه شبیه‌سازی جدید',
            ]
          : [
              'Is it built in Unreal Engine 5 or Unity?',
              'Can live IoT sensor data connect to the twin?',
              'Start a simulation project brief',
            ],
      };
    }

    // 6. SERVICES OVERVIEW INQUIRY
    const isServicesQuery = isFa
      ? /(خدمات|چه کارهایی|سرویس|توانمندی|حوزه‌ها|چیکار میکنید|چه خدماتی)/i.test(raw)
      : /(services|what do you do|capabilities|offerings|what can migo do|specialties)/i.test(raw);

    if (isServicesQuery) {
      const servicesListFa = SERVICES.map(
        (s, idx) => `${idx + 1}. **[${s.title.fa}](/fa/services/${s.slug})** — ${s.badge.fa}`
      ).join('\n');

      const servicesListEn = SERVICES.map(
        (s, idx) => `${idx + 1}. **[${s.title.en}](/en/services/${s.slug})** — ${s.badge.en}`
      ).join('\n');

      return {
        reply: isFa
          ? `استودیو MIGO فعالیت‌های مهندسی خود را در **۶ خانواده خدمت محوری** متمرکز کرده است:\n\n${servicesListFa}\n\nتمام این خدمات به صورت درون‌استودیویی، با کدنویسی بهینه و گارانتی اجرای سخت‌افزاری ارائه می‌شوند. درباره کدام حوزه مایلید اطلاعات فنی بیشتری دریافت کنید؟`
          : `MIGO focuses its creative technology engineering across **6 core service families**:\n\n${servicesListEn}\n\nAll services are produced in-house with zero outsourcing, locked framerate guarantees, and turnkey hardware integration. Which area would you like to explore in detail?`,
        suggestedActions: [
          {
            label: isFa ? 'مشاهده پرتال کامل خدمات' : 'Browse All Services',
            href: `/${locale}/services`,
          },
          {
            label: isFa ? 'آغاز بریف چندمرحله‌ای' : 'Start a Project Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'توضیح درباره واقعیت افزوده وب (WebAR)',
              'توضیح درباره اینستالیشن‌های نمایشگاهی',
              'توضیح درباره بازی‌های تعاملی',
              'مشاهده پروژه‌های اجرا شده',
            ]
          : [
              'Tell me about Zero-Install WebAR',
              'Tell me about Interactive Installations',
              'Tell me about Interactive Games',
              'Show me completed projects',
            ],
      };
    }

    // 7. START A PROJECT & ONBOARDING / PRICING / TIMELINE INQUIRY
    const isStartProject = isFa
      ? /(شروع\s.*پروژه|پروژه\s.*شروع|شروع\s*(کنیم|کنم|کردن)|آغاز\s*همکاری|شروع|همکاری|سفارش|هزینه|قیمت|تعرفه|بودجه|زمان\s*بندی|مدت\s*زمان|قرارداد|مشاوره|استعلام)/i.test(raw)
      : /(start\s.*project|project\s.*start|start\s*(a|an|the)?\s*project|collaborate|hire|work together|pricing|cost|quote|budget|timeline|how long|contract|consultation|inquiry)/i.test(raw);

    if (isStartProject) {
      return {
        reply: isFa
          ? `برای آغاز همکاری و ارزیابی فنی ایده شما، فرآیند در استودیو MIGO بسیار شفاف و مهندسی‌شده است:\n\n۱. **ثبت بریف در صفحه [شروع پروژه](/fa/start-project):** شما در ۵ گام ساده، نوع خدمت، پلتفرم مدنظر (وب، هدست، کیوسک)، اهداف استراتژیک، برآورد اولیه بودجه و زمان‌بندی را مشخص می‌کنید.\n۲. **ارزیابی معماری اولیه:** سرپرستان فنی MIGO پیش‌نیازهای سخت‌افزاری و نرخ فریم را ارزیابی می‌کنند.\n۳. **جلسه کشف (Discovery Call):** هماهنگی جلسه حضوری یا آنلاین برای تدوین پروتوتایپ سریع و برآورد رسمی.\n\nچون تمام پروژه‌های فناوری خلاق بسته به مقیاس سخت‌افزار، تعداد سنسورها و مدل‌سازی سه‌بعدی متغیر هستند، تعیین هزینه قطعی صرفاً پس از بررسی این بریف اولیه امکان‌پذیر خواهد بود.`
          : `To initiate a project or request technical consultation, MIGO follows a structured engineering onboarding path:\n\n1. **Submit a Brief via [Start a Project](/en/start-project):** A 5-step guided flow where you outline your target service, hardware platform (Web, Meta Quest, LED walls), strategic KPIs, budget tier, and launch timeline.\n2. **Technical Feasibility Audit:** Our lead systems architects evaluate polygon budgets, sensory limits, and hardware staging.\n3. **Discovery Session:** A technical consultation to establish the rapid prototype timeline and definitive milestone plan.\n\nBecause creative technology installations vary heavily based on sensor counts, 3D fidelity, and hardware turnkeys, pricing and delivery schedules are formally determined following this architectural brief.`,
        suggestedActions: [
          {
            label: isFa ? 'تکمیل فرم شروع پروژه (۵ مرحله)' : 'Complete Start a Project Flow',
            href: `/${locale}/start-project`,
          },
          {
            label: isFa ? 'اطلاعات تماس مستقیم و آدرس' : 'Contact Information',
            href: `/${locale}/contact`,
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

    // 8. PROJECTS & PORTFOLIO DISCOVERY
    const isProjectsQuery = isFa
      ? /(پروژه‌ها|نمونه کار|نمونه‌ها|پورتفولیو|کارهای انجام شده|پروژه‌های اجرایی|سابقه کاری|لیست پروژه)/i.test(raw)
      : /(projects|portfolio|case studies|sample work|examples|past work|show me projects)/i.test(raw);

    if (isProjectsQuery) {
      const topProjectsFa = PROJECTS.slice(0, 4)
        .map(
          (p) =>
            `- **[${p.title.fa}](/fa/work/${p.slug})** (${p.category.fa})\n  ${p.shortDescription.fa}`
        )
        .join('\n\n');

      const topProjectsEn = PROJECTS.slice(0, 4)
        .map(
          (p) =>
            `- **[${p.title.en}](/en/work/${p.slug})** (${p.category.en})\n  ${p.shortDescription.en}`
        )
        .join('\n\n');

      return {
        reply: isFa
          ? `در ادامه گزیده‌ای از پروژه‌های شاخص استودیو MIGO را مشاهده می‌فرمایید:\n\n${topProjectsFa}\n\nبرای مشاهده تمام پروژه‌ها همراه با چالش‌های فنی، ویدیوها و نتایج، به بخش پورتفولیو مراجعه کنید.`
          : `Here is a curated selection of featured MIGO engineering case studies:\n\n${topProjectsEn}\n\nVisit our Work archive to inspect detailed challenges, architectural breakdowns, and measured outcomes.`,
        suggestedActions: [
          {
            label: isFa ? 'مشاهده همه پروژه‌های استودیو' : 'View Full Case Studies Archive',
            href: `/${locale}/work`,
          },
          {
            label: isFa ? 'آزمایشگاه کدهای تجربی (Lab)' : 'Experiments Lab',
            href: `/${locale}/lab`,
          },
        ],
        followUpOptions: isFa
          ? [
              'پروژه‌های نمایشگاهی رو نشون بده',
              'پروژه‌های وب و WebAR رو نشون بده',
              'آزمایشگاه کد و شیدرهای سه‌بعدی چیست؟',
            ]
          : [
              'Show me exhibition tech projects',
              'Show me Web & WebAR projects',
              'What is the Experiments Lab?',
            ],
      };
    }

    // 8. EXPERIMENTS LAB QUERY
    const isLabQuery = isFa
      ? /(لب|آزمایشگاه|شیدر|کد تجربی|پروتوتایپ|تکنولوژی‌های جدید|r&d|lab)/i.test(raw)
      : /(lab|experiments|shader|prototypes|r&d|experimental)/i.test(raw);

    if (isLabQuery) {
      return {
        reply: isFa
          ? `بخش **[آزمایشگاه کدهای تجربی (Experiments Lab)](/fa/lab)** بخش تحقیق و توسعه (R&D) آزاد استودیو MIGO است.\n\nما در این بخش الگوریتم‌های نوظهور گرافیک، شیدرهای GLSL، اسکنرهای ذرات لایدار و فیزیک سینتیک را پیش از ورود به پروژه‌های تجاری تست و اعتبارسنجی می‌کنیم:\n\n1. **Holographic Dispersion Shader:** شیدر پیشرفته پراکندگی طیف نوری بر بستر WebGL/WebGPU\n2. **Spatial LiDAR Scanner:** اسکنر ابری ذرات با بیش از ۴۲۰۰ نقطه همزمان و برش لیزری\n3. **Kinetic Spring Typography:** شبیه‌سازی فیزیک فنر و کشش در گره‌های حروف سه‌بعدی\n4. **WebAR Disassembly Inspector:** مدل قطعات متحرک مکانیکی با قابلیت انفجار لایه‌ای (Exploded View)\n\nمی‌توانید مستقیماً در آزمایشگاه با هر کدام از این نمونه‌ها به صورت سه‌بعدی تعامل داشته باشید!`
          : `The **[Experiments Lab](/en/lab)** serves as MIGO's open research & development playground.\n\nHere, we develop and stress-test emerging GLSL shaders, point-cloud LiDAR simulations, kinetic spring topologies, and exploded CAD inspectors before deploying them into mission-critical client projects:\n\n1. **Holographic Dispersion Shader:** Real-time spectral chromatic dispersion running on WebGL/WebGPU.\n2. **Spatial LiDAR Scanner:** 4,200+ particle cloud with real-time green laser slicing geometry.\n3. **Kinetic Spring Typography:** Dynamic velocity springs and particle lattice physics.\n4. **WebAR Disassembly Inspector:** Interactive exploded CAD view of mechanical components.\n\nYou can interact directly with each experiment in full 3D inside the Lab!`,
        suggestedActions: [
          {
            label: isFa ? 'ورود به آزمایشگاه تجربیات (Lab)' : 'Enter Experiments Lab',
            href: `/${locale}/lab`,
          },
        ],
        followUpOptions: isFa
          ? ['نحوه اجرای آزمایش‌ها روی مرورگر من', 'بازگشت به معرفی خدمات']
          : ['How experiments run in browser', 'Back to services overview'],
      };
    }


    // 10. STUDIO PHILOSOPHY & ABOUT
    const isAboutQuery = isFa
      ? /(درباره مایگو|استودیو کیه|فلسفه|تیم|دفتر|کجا هستید|آدرس)/i.test(raw)
      : /(about migo|who are you|philosophy|team|studio location|where are you located)/i.test(raw);

    if (isAboutQuery) {
      return {
        reply: isFa
          ? `**استودیو MIGO** یک استودیوی مستقل فناوری خلاق و مهندسی فضایی است.\n\n- **فلسفه ما:** پیوند هنر تعاملی با دقت ریاضیاتی گرافیک بلادرنگ. ما تعاملات فیزیکی، شیدرهای اختصاصی و سیستم‌های مستقل از سخت‌افزار خلق می‌کنیم.\n- **رویکرد:** ۱۰۰٪ توسعه درون‌استودیویی بدون برون‌سپاری، تضمین فریم‌ریت ۶۰/۱۲۰ FPS، و یکپارچه‌سازی سخت‌افزار و نرم‌افزار به صورت Turnkey.\n- **محیط فیزیکی:** ما دارای آزمایشگاه اختصاصی تست سنسورها، سیستم‌های موکپ و کیوسک‌های نمایشگاهی هستیم.\n\nبرای آشنایی کامل با فلسفه، رویکرد و فرآیند ۴ مرحله‌ای مهندسی ما، صفحه **[درباره استودیو](/fa/about)** را مطالعه فرمایید.`
          : `**MIGO Studio** is an independent creative technology and spatial engineering studio.\n\n- **Our Philosophy:** Bridging physical space and real-time graphics through deterministic physics, sensory fidelity, and locked framerate budgets.\n- **Our Approach:** 100% in-house engineering with zero outsourcing, 60/120 FPS guarantees, and turnkey hardware-software staging.\n- **The Physical Lab:** We maintain dedicated sensor test rigs, VR volume capture, and industrial kiosk stress-testing environments.\n\nTo discover our complete philosophy, multidisciplinary team ethos, and 4-phase pipeline, visit the **[About Studio](/en/about)** page.`,
        suggestedActions: [
          {
            label: isFa ? 'صفحه درباره استودیو MIGO' : 'Discover MIGO Studio',
            href: `/${locale}/about`,
          },
          {
            label: isFa ? 'راه‌های ارتباطی و تماس' : 'Direct Contact & Office',
            href: `/${locale}/contact`,
          },
        ],
        followUpOptions: isFa
          ? [
              'خدمات تخصصی استودیو',
              'شروع همکاری و ثبت پروژه',
            ]
          : [
              'Specialized capabilities',
              'Start a project inquiry',
            ],
      };
    }

    // 11. MATCH AGAINST VERIFIED FAQS
    for (const faq of VERIFIED_FAQS) {
      const qText = (faq.question[locale] || '').toLowerCase();
      // check similarity or keyword overlap
      const userWords = raw.split(/\s+/).filter((w) => w.length > 2);
      const matches = userWords.filter((w) => qText.includes(w));
      if (matches.length >= 2 || (matches.length >= 1 && userWords.length <= 2)) {
        return {
          reply: faq.answer[locale],
          suggestedActions: faq.relatedLink
            ? [
                {
                  label: faq.relatedLink.text[locale],
                  href: faq.relatedLink.url[locale],
                },
              ]
            : [
                {
                  label: isFa ? 'مشاهده همه خدمات' : 'Explore All Services',
                  href: `/${locale}/services`,
                },
              ],
          followUpOptions: isFa
            ? [
                'مایگو چه خدماتی ارائه میده؟',
                'برای ایده من چه راهکاری مناسبه؟',
                'شروع یک پروژه جدید',
              ]
            : [
                'What services does MIGO offer?',
                'Which solution is best for my idea?',
                'Start a project inquiry',
              ],
        };
      }
    }

    // 12. GENERAL INTELLIGENT DEFAULT WITH GUIDANCE
    return {
      reply: isFa
        ? `پرسش شما درباره: «${userText}» ثبت شد.\n\nاستودیو MIGO در ۶ حوزه تخصصی فعالیت می‌کند:\n- **[تجربیات غوطه‌ورکننده (VR/MR)](/fa/services/immersive-experiences)**\n- **[واقعیت افزوده وب (WebAR)](/fa/services/augmented-reality)**\n- **[سیستم‌ها و بازی‌های تعاملی](/fa/services/interactive-experiences)**\n- **[طراحی و رندرهای سه‌بعدی وب (Web3D)](/fa/services/3d-visualization)**\n- **[شبیه‌سازی صنعتی و دوقلوی دیجیتال](/fa/services/simulation-digital-twins)**\n- **[اینستالیشن‌های تعاملی نمایشگاهی](/fa/services/interactive-installations)**\n\nهمچنین اگر مایلید درباره ایده خود مستقیماً با مهندسان استودیو صحبت کنید، می‌توانید بریف اولیه خود را در صفحه **[شروع پروژه](/fa/start-project)** ثبت کنید یا از طریق **[صفحه تماس](/fa/contact)** با ما ارتباط برقرار نمایید.`
        : `Thank you for asking about: "${userText}".\n\nMIGO Studio provides specialized engineering across 6 key disciplines:\n- **[Immersive Experiences (VR/MR)](/en/services/immersive-experiences)**\n- **[Augmented Reality (WebAR)](/en/services/augmented-reality)**\n- **[Interactive Systems & Games](/en/services/interactive-experiences)**\n- **[3D & Visualization (Web3D)](/en/services/3d-visualization)**\n- **[Simulation & Digital Twins](/en/services/simulation-digital-twins)**\n- **[Interactive Installations](/en/services/interactive-installations)**\n\nIf you have a specific concept or RFP in mind, feel free to submit your brief via our **[Start a Project](/en/start-project)** flow or reach out directly through our **[Contact page](/en/contact)**.`,
      suggestedActions: [
        {
          label: isFa ? 'مشاهده خدمات استودیو' : 'Explore All Services',
          href: `/${locale}/services`,
        },
        {
          label: isFa ? 'ثبت بریف در شروع پروژه' : 'Submit a Project Brief',
          href: `/${locale}/start-project`,
        },
      ],
      followUpOptions: isFa
        ? [
            'مایگو چه خدماتی ارائه میده؟',
            'برای موزه یا نمایشگاه چه ایده‌ای دارید؟',
            'مشاهده پروژه‌های واقعیت مجازی',
            'تفاوت VR و MR چیست؟',
          ]
        : [
            'What services does MIGO offer?',
            'What do you suggest for a museum?',
            'Show me VR case studies',
            'What is the difference between VR and MR?',
          ],
    };
  }
}
