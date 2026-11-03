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
 * Clean and normalize Persian and English text for robust intent matching
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u200C\u200B]/g, ' ') // replace zero-width non-joiners
    .replace(/[ي]/g, 'ی')
    .replace(/[ك]/g, 'ک')
    .replace(/[آأإ]/g, 'ا')
    .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728)) // Arabic nums
    .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1776)) // Persian nums
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

/**
 * Contextual topic types
 */
export type ConversationTopic =
  | 'museum_exhibition'
  | 'webar_product'
  | 'vr_mr_spatial'
  | 'industrial_sim'
  | 'games_interactive'
  | '3d_visualization'
  | 'pricing_onboarding'
  | 'studio_about'
  | 'experiments_lab'
  | 'contact_location'
  | 'workflow'
  | 'general';

export interface EngineResult {
  reply: string;
  topic: ConversationTopic;
  suggestedActions: Array<{ label: string; href: string }>;
  followUpOptions: string[];
}

/**
 * MIGO AI Conversational Intelligence Engine (Zero-Download, 100% Deterministic & Accurate)
 */
export class MigoAiEngine {
  /**
   * Determine conversation topic from current query and past history
   */
  public static extractTopic(norm: string, history: ChatMessage[]): ConversationTopic {
    // 1. Start Project / Pricing / Timeline / Onboarding (high intent)
    if (
      /(شروع\s.*پروژه|پروژه\s.*شروع|شروع\s*(کنیم|کنم|کردن)|شروع\s*همکاری|آغاز\s*پروژه|سفارش\s*پروژه|هزینه|قیمت|تعرفه|بودجه|چقدر\s*میشه|زمان\s*بندی|مدت\s*زمان|قرارداد|مشاوره\s*پروژه|بریف|ثبت\s*پروژه|start\s*(a|an|the)?\s*project|project\s*start|collaborate|hire|pricing|cost|how much|budget|timeline|how long|contract|submit brief)/i.test(
        norm
      )
    ) {
      return 'pricing_onboarding';
    }

    // 2. Interactive Games & Systems (specific)
    if (
      /(بازی|گیم|انریل|یونیتی|آرکید|گیمیفیکیشن|game|gaming|interactive game|unreal engine|unity|arcade)/i.test(
        norm
      )
    ) {
      return 'games_interactive';
    }

    // 3. VR vs MR / Spatial Headsets
    if (
      /(واقعیت مجازی|واقعیت ترکیبی|عینک|هدست|متا کوئست|کوئست|ویژن پرو|تفاوت vr|vr چیست|mr چیست|vr mr|اسپشیال|virtual reality|mixed reality|quest 3|vision pro|spatial computing)/i.test(
        norm
      )
    ) {
      return 'vr_mr_spatial';
    }

    // 4. WebAR / Product 3D
    if (
      /(محصول|کالا|ویترین|خرید|فروشگاه|کانفیگوراتور|واقعیت افزوده|webar|ar|کیو ار|qr|دیدن در اتاق|دیدن در خانه|product|ecommerce|retail|store|augmented reality|configurator|in my room)/i.test(
        norm
      )
    ) {
      return 'webar_product';
    }

    // 5. Industrial Simulation & Digital Twins
    if (
      /(شبیه سازی|صنعتی|دوقلو|دیجیتال توین|پالایشگاه|توربین|آموزش پرسنل|خط تولید|نفت|گاز|تجهیزات|simulation|digital twin|industrial|refinery|turbine|workforce training)/i.test(
        norm
      )
    ) {
      return 'industrial_sim';
    }

    // 6. Museum & Exhibition Installations
    if (
      /(موزه|نمایشگاه|غرفه|گالری|اینستالیشن|دیوار تعاملی|لایدار|تاچ دیزاینر|سنسور لمسی|museum|exhibition|booth|gallery|interactive wall|kinetic wall|lidar|touchdesigner)/i.test(
        norm
      )
    ) {
      return 'museum_exhibition';
    }

    // 7. 3D & Visualization / WebGL
    if (
      /(مدل سازی|رندر|وب جی پی یو|سه بعدی|3d|webgl|webgpu|modeling|rendering|pbr)/i.test(norm)
    ) {
      return '3d_visualization';
    }

    // 8. Contact & Location
    if (
      /(تماس|ارتباط|تلفن|ایمیل|آدرس|کجایید|دفتر|لوکیشن|contact|email|phone|address|office|location)/i.test(
        norm
      )
    ) {
      return 'contact_location';
    }

    // 9. About Studio & Philosophy
    if (
      /(درباره مایگو|استودیو کیه|فلسفه|تیم|رویکرد|تاریخچه|about migo|who are you|philosophy|team|approach)/i.test(
        norm
      )
    ) {
      return 'studio_about';
    }

    // 10. Experiments Lab
    if (
      /(لب|آزمایشگاه|شیدر|کد تجربی|پروتوتایپ|lab|experiments|shader|prototype|r&d)/i.test(norm)
    ) {
      return 'experiments_lab';
    }

    // 11. Workflow & Methodology
    if (
      /(فرآیند|روش شناسی|مراحل|پایپ لاین|ورک فلو|workflow|methodology|pipeline|process|steps)/i.test(
        norm
      )
    ) {
      return 'workflow';
    }

    // Check last topic in history if user gave a short follow-up (e.g., "بله", "هزینه‌اش؟", "بیشتر توضیح بده")
    if (norm.length < 25 && history.length > 0) {
      for (let i = history.length - 1; i >= 0; i--) {
        const lastTopic = history[i].metadata?.topic;
        if (lastTopic && lastTopic !== 'general') {
          return lastTopic as ConversationTopic;
        }
      }
    }

    return 'general';
  }

  /**
   * Process query and generate structured, authoritative response
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
    const topic = this.extractTopic(norm, history);

    // -------------------------------------------------------------
    // 1. GREETINGS
    // -------------------------------------------------------------
    const isGreeting = isFa
      ? /^(سلام|درود|وقت بخیر|سلام و عرض ادب|سلام خسته نباشید|صبح بخیر|عصر بخیر|سلام وقتتون بخیر|هی)/i.test(
          norm
        )
      : /^(hi|hello|hey|good morning|good afternoon|good evening|greetings)/i.test(norm);

    if (isGreeting && norm.length < 35) {
      return {
        reply: isFa
          ? `سلام و درود! من **MIGO AI**، مشاور هوشمند فناوری خلاق و رایانش فضایی **استودیو MIGO** هستم.\n\nمن می‌توانم در زمینه انتخاب تکنولوژی، بررسی خدمات تخصصی، مشاهده نمونه کارهای اجرا شده و برنامه‌ریزی بریف اولیه پروژه‌تان شما را راهنمایی کنم.\n\nچه نوع ایده یا پروژه‌ای در ذهن دارید؟`
          : `Hello and welcome! I am **MIGO AI**, creative technology and spatial engineering consultant for **MIGO Studio**.\n\nI can assist you in selecting appropriate technologies, exploring our specialized capabilities, inspecting real client case studies, or planning an initial project brief.\n\nWhat kind of experience or concept are you looking to create?`,
        topic: 'general',
        suggestedActions: [
          {
            label: isFa ? 'بررسی ۶ حوزه خدمات استودیو' : 'Explore 6 Service Families',
            href: `/${locale}/services`,
          },
          {
            label: isFa ? 'مشاهده پروژه‌های برگزیده' : 'View Featured Projects',
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
              'برای موزه یا نمایشگاه چه تجربه‌ای پیشنهاد میدید؟',
              'تفاوت واقعیت مجازی (VR) و ترکیبی (MR) چیه؟',
              'چطور محصولاتم رو با WebAR نمایش بدم؟',
            ]
          : [
              'What services does MIGO provide?',
              'What do you suggest for an interactive museum?',
              'What is the difference between VR and MR?',
              'How can I display products in WebAR?',
            ],
      };
    }

    // -------------------------------------------------------------
    // 2. MUSEUM & EXHIBITION INSTALLATIONS
    // -------------------------------------------------------------
    if (topic === 'museum_exhibition') {
      return {
        reply: isFa
          ? `برای **موزه‌ها، گالری‌ها و غرفه‌های نمایشگاهی**، استودیو MIGO اینستالیشن‌های تعاملی مقیاس‌پذیر و پایدار طراحی و پیاده‌سازی می‌کند.\n\nبرای طراحی دقیق این تجربه، ۳ پارامتر مهندسی حائز اهمیت است:\n\n1. **شیوه تعامل بازدیدکننده:** آیا ترجیح می‌دهید تعامل بدون لمس فیزیکی و با سنسورهای لایدار (LiDAR) و ردیابی حرکت بدن باشد، یا از طریق کیوسک‌ها و تاچ‌اسکرین‌های مقاوم صنعتی؟\n2. **ظرفیت و مقیاس فضا:** آیا تجربه به صورت تک‌نفره است یا چند کاربر به صورت همزمان روی دیوارهای بزرگ تصویری تعامل می‌کنند؟\n3. **هدف روایی:** تمرکز اصلی بر آموزش تعاملی اسناد است یا خلق جلوه‌های بصری خیره‌کننده (Spectacle) برای جذب حداکثری مخاطب؟\n\nما در پروژه برگزیده **[دیوار تعاملی لومینا](/fa/work/lumina-motion-wall)** از ترکیب سنسورهای لایدار، خط لوله ریل‌تایم تاچ‌دیزاینر و موتور یونیتی برای میزبانی از صدها بازدیدکننده روزانه با پایداری ۲۴/۷ بهره گرفته‌ایم.`
          : `For **museums, exhibitions, and cultural pavilions**, MIGO engineers robust turnkey interactive installations.\n\nTo tailor the optimal architecture for your venue, three key parameters guide the design:\n\n1. **Interaction Modality:** Do you prefer touchless motion interaction using industrial LiDAR and depth tracking, or physical ruggedized touchscreens?\n2. **Spatial Capacity:** Is it an individual kiosk station or a concurrent multi-user experience on large-scale LED/projection walls?\n3. **Curatorial Goal:** Is the installation focused on deep archival educational interaction or an immersive visual spectacle?\n\nIn our featured **[Lumina Motion Exhibition Wall](/en/work/lumina-motion-wall)** case study, we engineered LiDAR tracking with a TouchDesigner real-time pipeline operating 24/7 autonomously without requiring visitors to download apps.`,
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
            label: isFa ? 'ثبت بریف پروژه نمایشگاهی' : 'Submit Exhibition Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'سنسور لایدار در نمایشگاه چطور کار می‌کنه؟',
              'تفاوت لایدار با تاچ‌اسکرین معمولی چیه؟',
              'برآورد زمان‌بندی و مراحل پیاده‌سازی',
            ]
          : [
              'How does LiDAR touch detection work?',
              'Why LiDAR instead of physical touchscreens?',
              'Project timeline & staging process',
            ],
      };
    }

    // -------------------------------------------------------------
    // 3. WEBAR & 3D PRODUCT VISUALIZATION
    // -------------------------------------------------------------
    if (topic === 'webar_product') {
      return {
        reply: isFa
          ? `برای نمایش سه‌بعدی محصولات و ارتقای نرخ تبدیل فروش آنلاین، استودیو MIGO راهکارهای **واقعیت افزوده وب (Zero-Install WebAR)** را توسعه می‌دهد.\n\n**ویژگی‌ها و مزایای استراتژیک این راهکار:**\n\n- **عدم نیاز به نصب اپلیکیشن:** کاربر تنها با اسکن یک QR کد در مرورگر گوشی (سافاری یا کروم)، بدون ورود به اپ‌استور یا گوگل‌پلی، کالا را در کسری از ثانیه در فضای واقعی اتاق یا روی میز خود می‌بیند.\n- **حجم فوق‌العاده بهینه (< 4.5MB):** با فشرده‌سازی بافت‌های گرافیکی با استاندارد KTX2 و هندسه سه‌بعدی Draco، فایل‌ها حتی با اینترنت معمولی در کمتر از ۳ ثانیه لود می‌شوند.\n- **متریال‌های واقع‌گرایانه (PBR):** انعکاس نور محیط واقعی، پرداخت‌های متریال (فلز، چرم، شیشه) و مقیاس دقیق ۱:۱ کالا به صورت بی‌درنگ محاسبه می‌شود.\n- **کانفیگوراتور رنگ و مدل:** مشتری می‌تواند رنگ، بند، روکش یا قطعات مختلف محصول را در همان لحظه تغییر داده و دکمه خرید را کلیک کند.\n\nمی‌توانید اجرای این سیستم را در پروژه **[کانفیگوراتور ساعت لوکس ChronoSpatial](/fa/work/webar-luxury-showcase)** مشاهده فرمایید.`
          : `For interactive product showcases and e-commerce conversion, MIGO specializes in **Zero-Install WebAR** and **Real-Time 3D Configurators**.\n\n**Strategic Advantages:**\n\n- **Zero Friction (No App Downloads):** Customers simply scan a QR code using standard Safari or Chrome mobile browsers—no App Store friction.\n- **Ultra-Lightweight Payloads (< 4.5MB):** Engineered via KTX2 GPU texture compression and Draco geometry, loading in sub-3-second times.\n- **Photorealistic PBR Materials:** Physical light reflections, brushed metals, fabrics, and millimeter-accurate 1:1 spatial scaling.\n- **Interactive Configurator:** Real-time color, strap, and material customization with instant e-commerce call-to-action.\n\nInspect this production architecture in our **[ChronoSpatial WebAR Luxury Configurator](/en/work/webar-luxury-showcase)** case study.`,
        topic: 'webar_product',
        suggestedActions: [
          {
            label: isFa ? 'خدمات واقعیت افزوده (WebAR)' : 'Augmented Reality Services',
            href: `/${locale}/services/augmented-reality`,
          },
          {
            label: isFa ? 'مشاهده نمونه WebAR ساعت لوکس' : 'Explore ChronoSpatial Case Study',
            href: `/${locale}/work/webar-luxury-showcase`,
          },
          {
            label: isFa ? 'ثبت بریف پروژه WebAR' : 'Start a WebAR Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'آیا WebAR روی هر دو سیستم‌عامل آیفون و اندروید کار می‌کنه؟',
              'تفاوت مدل‌سازی صنعتی CAD با وب‌تری‌دی چیه؟',
              'چطور محصولات فعلی‌مون رو به WebAR تبدیل کنیم؟',
            ]
          : [
              'Does WebAR work on both iOS and Android?',
              'What is the difference between CAD and Web3D?',
              'How to convert our catalog into WebAR?',
            ],
      };
    }

    // -------------------------------------------------------------
    // 4. VR / MR / SPATIAL COMPUTING
    // -------------------------------------------------------------
    if (topic === 'vr_mr_spatial') {
      return {
        reply: isFa
          ? `در استودیو MIGO، حوزه **رایانش فضایی (Spatial Computing)** شامل دو معماری پیشرفته است:\n\n- **واقعیت مجازی (VR):** کاربر کاملاً در یک دنیای سه‌بعدی ۱۰۰٪ شبیه‌سازی‌شده غوطه‌ور می‌شود و محیط فیزیکی اطراف محو می‌گردد. این حالت برای سناریوهای آموزش پرخطر، شبیه‌سازی اورژانسی، جراحی و بازی‌های اکشن عمیق ایده‌آل است.\n- **واقعیت ترکیبی (MR Passthrough):** کاربر محیط واقعی اتاق، سوله یا خط تولید را از طریق دوربین‌های هدست مشاهده می‌کند و المان‌های هولوگرافیک دیجیتال (ماشین‌آلات، راهنماها و دیاگرام‌های سه‌بعدی) با مقیاس میلی‌متری بر روی سطوح فیزیکی لنگراندازی می‌شوند.\n\n**پشتیبانی سخت‌افزاری استودیو:**\n- هدست‌های مستقل: Meta Quest 3، Pico 4، Apple Vision Pro\n- سیستم‌های سنگین PC-VR: پلتفرم‌های متصل به سرور برای پروژه‌های گرافیکی عظیم صنعتی\n\nبرای نمونه پروژه **[شبیه‌ساز تعمیر و نگهداری توربین جت AeroTurbine](/fa/work/holo-industrial-vr)** را ببینید که با بیش از ۳۵۰ قطعه تعاملی روی عینک Quest 3 با نرخ فریم پایدار ۹۰ فریم اجرا می‌شود.`
          : `At MIGO, our **Spatial Computing** capability spans two core technological paradigms:\n\n- **Virtual Reality (VR):** The visitor is completely immersed inside a 100% digital simulated environment, shielding out the physical world. This is optimal for hazardous procedure training, medical simulations, and deep experiential gaming.\n- **Mixed Reality (MR Passthrough):** High-definition cameras project the user's real physical room, while millimeter-accurate 3D digital holograms and interactive tools are spatially anchored to tables and floors.\n\n**Supported Hardware Rigs:**\n- Standalone Headsets: Meta Quest 3, Pico 4, Apple Vision Pro\n- High-End Tethered PC-VR: Enterprise research and photorealistic industrial rigs\n\nInspect our featured **[AeroTurbine VR Maintenance Rig](/en/work/holo-industrial-vr)** running standalone on Quest 3 at locked 90 FPS with 350+ interactive mechanical parts.`,
        topic: 'vr_mr_spatial',
        suggestedActions: [
          {
            label: isFa ? 'خدمات تجربیات غوطه‌ورکننده (VR/MR)' : 'Immersive Experiences (VR/MR)',
            href: `/${locale}/services/immersive-experiences`,
          },
          {
            label: isFa ? 'مشاهده پروژه شبیه‌ساز توربین جت' : 'View AeroTurbine VR Case Study',
            href: `/${locale}/work/holo-industrial-vr`,
          },
          {
            label: isFa ? 'مشاوره فنی پروژه واقعیت مجازی' : 'Start a Spatial VR Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'آیا نیاز به کامپیوتر گیمینگ قوی هست یا هدست مستقل؟',
              'نرخ فریم ۹۰ FPS چطور تضمین میشه؟',
              'شبیه‌سازی آموزش پرسنل صنعتی چطور انجام میشه؟',
            ]
          : [
              'Do we need high-end gaming PCs or standalone headsets?',
              'How is locked 90 FPS guaranteed?',
              'How does industrial workforce training work?',
            ],
      };
    }

    // -------------------------------------------------------------
    // 5. INDUSTRIAL SIMULATION & DIGITAL TWINS
    // -------------------------------------------------------------
    if (topic === 'industrial_sim') {
      return {
        reply: isFa
          ? `استودیو MIGO سامانه‌های **شبیه‌سازی پیشرفته صنعتی و دوقلوهای دیجیتال (Digital Twins)** را برای شرکت‌های انرژی، تولیدی و هوانوردی توسعه می‌دهد.\n\n**مزایای محوری شبیه‌سازهای MIGO:**\n\n1. **ریسک جانی صفر (Zero Hazard):** تکنسین‌ها و مهندسان فرآیندهای پرخطر، مانورهای اضطراری اطفای حریق، بازرسی شیرهای پرفشار و عیب‌یابی توربین‌ها را بدون کوچک‌ترین خطر جانی در محیط مجازی تمرین می‌کنند.\n2. **حذف توقف خطوط تولید (Zero Downtime):** نیازی به متوقف کردن ماشین‌آلات گران‌قیمت یا خارج کردن توربین از مدار برای آموزش کارآموزان نیست.\n3. **ارزشیابی خودکار و لاگ خطاها:** سیستم ترتیب باز کردن پیچ‌ها، رعایت گشتاور آچارها، زمان انجام عملیات و خطاهای انسانی را ثانیه به ثانیه ثبت و کارنامه استاندارد صادر می‌کند.\n\nمطالعه موردی **[دوقلو دیجیتال پالایشگاهی PetroSim](/fa/work/petrosim-digital-twin)** و **[شبیه‌ساز توربین جت AeroTurbine](/fa/work/holo-industrial-vr)** نمونه‌های اجرایی این تخصص هستند.`
          : `MIGO designs **Industrial Simulations and Digital Twins** for high-consequence enterprise, energy, and aerospace operations.\n\n**Core Advantages:**\n\n1. **Zero Life Hazards:** Technicians rehearse critical emergencies, high-pressure pipeline overhauls, and hazardous turbine operations with complete safety.\n2. **Zero Machinery Downtime:** Multi-million-dollar physical equipment remains in active production while cohorts train in digital replicas.\n3. **Automated Competency Auditing:** The system logs mistake sequences, torque compliance, and procedural timing automatically.\n\nExamine our case studies: **[PetroSim Refinery Digital Twin](/en/work/petrosim-digital-twin)** and **[AeroTurbine VR Trainer](/en/work/holo-industrial-vr)**.`,
        topic: 'industrial_sim',
        suggestedActions: [
          {
            label: isFa ? 'خدمات شبیه‌سازی و دوقلوی دیجیتال' : 'Simulation & Digital Twins Services',
            href: `/${locale}/services/simulation-digital-twins`,
          },
          {
            label: isFa ? 'مشاهده پروژه دوقلو پتروسیم' : 'Explore PetroSim Digital Twin',
            href: `/${locale}/work/petrosim-digital-twin`,
          },
          {
            label: isFa ? 'شروع مشاوره پروژه صنعتی' : 'Start an Industrial Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? [
              'شبیه‌سازی در موتور آنریل ۵ ساخته میشه یا یونیتی؟',
              'آیا سنسورهای فیزیکی IoT به دوقلو وصل میشن؟',
              'چطور بریف شبیه‌سازی ثبت کنیم؟',
            ]
          : [
              'Is it built in Unreal Engine 5 or Unity 6?',
              'Can live IoT sensor data connect to the digital twin?',
              'How to submit a simulation brief?',
            ],
      };
    }

    // -------------------------------------------------------------
    // 6. PRICING, TIMELINE & ONBOARDING (START A PROJECT)
    // -------------------------------------------------------------
    if (topic === 'pricing_onboarding') {
      return {
        reply: isFa
          ? `برای آغاز همکاری با استودیو MIGO و دریافت برآورد فنی و مالی دقیق، فرآیند در ۴ گام مهندسی‌شده انجام می‌شود:\n\n۱. **ثبت بریف در صفحه [شروع پروژه](/fa/start-project):** شما در یک فرم ۵ مرحله‌ای، حوزه خدمات مدنظر، اهداف کلیدی پروژه، پلتفرم سخت‌افزاری (وب، هدست VR، کیوسک فیزیکی، ویدئومپینگ)، بازه زمانی و بودجه تخمینی را مشخص می‌کنید.\n۲. **بررسی امکان‌سنجی معماری:** مهندسان MIGO محدودیت‌های چندضلعی‌های سه‌بعدی، الزامات فریم‌ریت و سنسورها را تحلیل می‌کنند.\n۳. **جلسه کشف (Discovery Call):** هماهنگی جلسه حضوری یا آنلاین جهت تعریف مایل‌استون‌های پروتوتایپ سریع.\n۴. **ارائه پروپوزال و قرارداد شفاف:** اعلام دقیق هزینه‌ها و زمان‌بندی فازبندی‌شده.\n\nچون در پروژه‌های فناوری خلاق، هزینه‌ها به شدت وابسته به تعداد قطعات سه‌بعدی، مقیاس سخت‌افزار و شرایط نصب در محل است، اعلام قیمت دقیق صرفاً پس از دریافت این بریف امکان‌پذیر خواهد بود.`
          : `To initiate a collaboration with MIGO and obtain a definitive architectural and financial proposal, we follow a 4-step engineering path:\n\n1. **Submit a Brief via [Start a Project](/en/start-project):** A 5-step guided flow where you outline your target service, strategic objectives, hardware platform (Web, VR Headset, Kiosks, LED walls), timeframe, and budget tier.\n2. **Architectural Feasibility Audit:** Our systems architects evaluate framerate budgets, 3D polygon thresholds, and sensor staging.\n3. **Discovery Session:** A technical consultation to review Graybox prototypes and define milestone deliverables.\n4. **Formal Proposal & Milestone Plan:** Definitive pricing and staged delivery dates.\n\nBecause creative technology budgets vary heavily based on sensor hardware, 3D asset density, and on-site physical staging, pricing is formally determined following this architectural brief.`,
        topic: 'pricing_onboarding',
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
              'روش‌شناسی ۴ مرحله‌ای استودیو چیست؟',
              'مشاهده پروژه‌های اجرا شده استودیو',
            ]
          : [
              'What services does MIGO provide?',
              'What is MIGO\'s 4-phase methodology?',
              'Explore featured client projects',
            ],
      };
    }

    // -------------------------------------------------------------
    // 7. GAMES & INTERACTIVE SYSTEMS
    // -------------------------------------------------------------
    if (topic === 'games_interactive') {
      return {
        reply: isFa
          ? `استودیو MIGO **بازی‌های تعاملی، سیستم‌های گیمیفیکیشن و فضاهای بازی فیزیکی-دیجیتال** را با موتورهای قدرتمند Unreal Engine 5 و Unity 6 توسعه می‌دهد.\n\n**حوزه‌های اصلی:**\n- **بازی‌های آرکید کینتیک:** بازی‌های مبتنی بر سنسورهای حرکتی، استیج‌های هوشمند و رقابت‌های گروهی در رویدادها\n- **شبیه‌سازهای جدی (Serious Games):** بازی‌های هدفمند برای آموزش فرآیندهای پیچیده صنعتی و مهارت‌های مدیریتی\n- **بازی‌های وب ۳D بدون نصب:** بازی‌های روان مبتنی بر WebGL با زمان لود آنی\n\nبرای نمونه پروژه **[PulseRush: آرکید حرکتی فضایی](/fa/work/kinetic-arcade-game)** را بررسی کنید که تعامل فیزیکی کاربران را با فیزیک ریل‌تایم و نورپردازی داینامیک ترکیب کرده است.`
          : `MIGO designs **Interactive Games, Serious Gaming Systems, and Phygital Arcades** engineered in Unreal Engine 5 and Unity 6.\n\n**Core Capabilities:**\n- **Kinetic Arcades:** Motion-sensor games, smart physical stages, and group competitions for brand activations and festivals.\n- **Serious Games:** Gamified learning engines for industrial procedures and team simulations.\n- **Zero-Install WebGL Games:** Smooth, high-framerate browser games with instantaneous loading.\n\nInspect our case study: **[PulseRush: Spatial Kinetic Arcade](/en/work/kinetic-arcade-game)** fusing physical user telemetry with dynamic particle shaders.`,
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
        ],
        followUpOptions: isFa
          ? [
              'تفاوت آنریل ۵ و یونیتی در پروژه‌های استودیو',
              'شروع یک پروژه بازی جدید',
            ]
          : [
              'Unreal Engine 5 vs Unity pipelines',
              'Start a game development brief',
            ],
      };
    }

    // -------------------------------------------------------------
    // 8. 3D VISUALIZATION & WEB3D
    // -------------------------------------------------------------
    if (topic === '3d_visualization') {
      return {
        reply: isFa
          ? `خدمات **طراحی، مدل‌سازی و رندرهای سه‌بعدی بی‌درنگ وب** در استودیو MIGO شامل بهینه‌سازی پیشرفته مدل‌های CAD برای بستر وب و رندرهای فوتورئال است:\n\n- **مدل‌سازی PBR صنعتی:** تبدیل فایل‌های سنگین چندمیلیون چندضلعی به مش‌های سبک بهینه وب بدون افت شیارها و جزئیات\n- **کانفیگوراتورهای وب‌تری‌دی (WebGL / WebGPU):** نمایش قطعات با چرخش ۳۶۰ درجه و تغییر متریال در مرورگر\n- **انیمیشن‌های تشریحی و فنی:** نمایش انفجاری قطعات (Exploded View) و مونتاژ گام‌به‌گام\n\nتمام مدل‌ها با استاندارد فشرده‌سازی بافت KTX2 و فشرده‌سازی هندسی Draco آماده می‌شوند تا با حجم کمتر از ۵ مگابایت در وب بارگذاری شوند.`
          : `Our **3D Modeling & Real-Time WebGL/WebGPU Visualization** discipline bridges photoreal precision with web delivery:\n\n- **Industrial PBR Pipelines:** Decimating heavy multi-million CAD meshes into lightweight web geometries while preserving micro-surface chamfers.\n- **Web3D Real-Time Configurators:** 360-degree rotation, exploded views, and instant material switching on desktop and mobile.\n- **Technical & Architectural Animations:** Exploded CAD assemblies, mechanical kinematics, and lighting walkthroughs.\n\nAll assets are compressed via KTX2 GPU textures and Draco geometry for sub-5MB delivery on mobile browsers.`,
        topic: '3d_visualization',
        suggestedActions: [
          {
            label: isFa ? 'خدمات طراحی و مدل‌سازی سه‌بعدی' : '3D & Visualization Service',
            href: `/${locale}/services/3d-visualization`,
          },
          {
            label: isFa ? 'مشاهده نمونه کارهای سه‌بعدی' : 'View 3D Projects',
            href: `/${locale}/work`,
          },
        ],
        followUpOptions: isFa
          ? ['توضیح درباره WebAR', 'شروع پروژه کانفیگوراتور سه‌بعدی']
          : ['Tell me about WebAR', 'Start a 3D configurator brief'],
      };
    }

    // -------------------------------------------------------------
    // 9. STUDIO ABOUT & PHILOSOPHY
    // -------------------------------------------------------------
    if (topic === 'studio_about') {
      return {
        reply: isFa
          ? `**استودیو MIGO** یک استودیوی پیشرو در فناوری‌های تعاملی، واقعیت مجازی، واقعیت افزوده و اینستالیشن‌های فیزیکی-دیجیتال است.\n\n- **فلسفه استودیو:** پیوند معماری فضایی با مهندسی بلادرنگ گرافیک. ما به جای انیمیشن‌های تزئینی، تجربیات تعاملی بر پایه فیزیک دقیق، سنسورهای فیزیکی و فریم‌ریت پایدار ۶۰ تا ۱۲۰ FPS می‌سازیم.\n- **رویکرد:** ۱۰۰٪ توسعه درون‌استودیویی بدون برون‌سپاری، کنترل کامل بر کد شیدرها و راه‌اندازی یکپارچه سخت‌افزار و نرم‌افزار به صورت Turnkey.\n- **آزمایشگاه فیزیکی:** ما دارای آزمایشگاه اختصاصی در تهران برای تست سنسورهای لایدار، حجم موکپ VR و کیوسک‌های نمایشگاهی هستیم.\n\nبرای مطالعه بیشتر، صفحه **[درباره استودیو](/fa/about)** را ببینید.`
          : `**MIGO Studio** is an independent creative technology and spatial engineering studio.\n\n- **Our Philosophy:** Bridging physical architecture and real-time graphics through deterministic physics, sensory fidelity, and locked framerate budgets (60–120 FPS).\n- **Our Approach:** 100% in-house engineering with zero outsourcing, total shader control, and turnkey hardware-software staging.\n- **Physical Lab:** We maintain a dedicated hardware staging lab in Tehran equipped with LiDAR test rigs, VR motion capture volumes, and kiosk stress-testing environments.\n\nTo discover our complete philosophy and multidisciplinary team ethos, visit the **[About Studio](/en/about)** page.`,
        topic: 'studio_about',
        suggestedActions: [
          {
            label: isFa ? 'صفحه درباره استودیو' : 'About MIGO Studio',
            href: `/${locale}/about`,
          },
          {
            label: isFa ? 'مشاهده خدمات استودیو' : 'View All Services',
            href: `/${locale}/services`,
          },
        ],
        followUpOptions: isFa
          ? ['۶ خانواده خدمات استودیو کدامند؟', 'چطور با مایگو پروژه شروع کنیم؟']
          : ['What are the 6 service families?', 'How to start a project?'],
      };
    }

    // -------------------------------------------------------------
    // 10. CONTACT & LOCATION
    // -------------------------------------------------------------
    if (topic === 'contact_location') {
      return {
        reply: isFa
          ? `برای برقراری ارتباط با تیم فنی و مدیریتی استودیو MIGO:\n\n- **ایمیل رسمی:** \`hello@migo-studio.com\`\n- **محل آزمایشگاه استودیو:** تهران، منطقه نوآوری، آزمایشگاه سخت‌افزار و فناوری‌های تعاملی MIGO\n- **ساعات کاری آزمایشگاه:** شنبه تا چهارشنبه، ساعت ۹:۰۰ الی ۱۸:۰۰\n\nبرای ثبت درخواست جلسه حضوری یا ارسال پیام سریع، می‌توانید به **[صفحه تماس با ما](/fa/contact)** مراجعه فرمایید یا بریف پروژه خود را مستقیماً در **[شروع پروژه](/fa/start-project)** ثبت کنید.`
          : `To reach out directly to MIGO Studio's technical leads and management:\n\n- **Official Email:** \`hello@migo-studio.com\`\n- **Hardware Staging Lab:** Tehran Innovation District, MIGO Creative Technology Staging Lab\n- **Lab Hours:** Saturday to Wednesday, 09:00 – 18:00\n\nTo schedule an in-person discovery session or submit an inquiry, visit our **[Contact Page](/en/contact)** or complete your project brief via **[Start a Project](/en/start-project)**.`,
        topic: 'contact_location',
        suggestedActions: [
          {
            label: isFa ? 'صفحه تماس با استودیو' : 'Go to Contact Page',
            href: `/${locale}/contact`,
          },
          {
            label: isFa ? 'ثبت فرم شروع پروژه' : 'Start a Project Brief',
            href: `/${locale}/start-project`,
          },
        ],
        followUpOptions: isFa
          ? ['بررسی خدمات استودیو', 'مشاهده پروژه‌ها']
          : ['Browse services', 'View projects'],
      };
    }

    // -------------------------------------------------------------
    // 11. EXPERIMENTS LAB
    // -------------------------------------------------------------
    if (topic === 'experiments_lab') {
      return {
        reply: isFa
          ? `بخش **[آزمایشگاه کدهای تجربی (Experiments Lab)](/fa/lab)** بخش تحقیق و توسعه (R&D) آزاد استودیو MIGO است.\n\nما در این بخش الگوریتم‌های نوظهور گرافیک، شیدرهای GLSL، اسکنرهای ذرات لایدار و فیزیک سینتیک را پیش از ورود به پروژه‌های تجاری تست و اعتبارسنجی می‌کنیم:\n\n1. **Holographic Dispersion Shader:** شیدر پیشرفته پراکندگی طیف نوری بر بستر WebGL/WebGPU\n2. **Spatial LiDAR Scanner:** اسکنر ابری ذرات با بیش از ۴۲۰۰ نقطه همزمان و برش لیزری\n3. **Kinetic Spring Typography:** شبیه‌سازی فیزیک فنر و کشش در گره‌های حروف سه‌بعدی\n4. **WebAR Disassembly Inspector:** مدل قطعات متحرک مکانیکی با قابلیت انفجار لایه‌ای (Exploded View)\n\nمی‌توانید مستقیماً در آزمایشگاه با هر کدام از این نمونه‌ها به صورت سه‌بعدی تعامل داشته باشید!`
          : `The **[Experiments Lab](/en/lab)** serves as MIGO's open research & development playground.\n\nHere, we develop and stress-test emerging GLSL shaders, point-cloud LiDAR simulations, kinetic spring topologies, and exploded CAD inspectors before deploying them into mission-critical client projects:\n\n1. **Holographic Dispersion Shader:** Real-time spectral chromatic dispersion running on WebGL/WebGPU.\n2. **Spatial LiDAR Scanner:** 4,200+ particle cloud with real-time green laser slicing geometry.\n3. **Kinetic Spring Typography:** Dynamic velocity springs and particle lattice physics.\n4. **WebAR Disassembly Inspector:** Interactive exploded CAD view of mechanical components.\n\nYou can interact directly with each experiment in full 3D inside the Lab!`,
        topic: 'experiments_lab',
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

    // -------------------------------------------------------------
    // 12. GENERAL SERVICES ARCHITECTURE
    // -------------------------------------------------------------
    const servicesListFa = SERVICES.map(
      (s, idx) => `${idx + 1}. **[${s.title.fa}](/fa/services/${s.slug})** — ${s.badge.fa}`
    ).join('\n');

    const servicesListEn = SERVICES.map(
      (s, idx) => `${idx + 1}. **[${s.title.en}](/en/services/${s.slug})** — ${s.badge.en}`
    ).join('\n');

    return {
      reply: isFa
        ? `استودیو MIGO پروژه‌های فناوری خلاق را در **۶ خانواده خدمت اصلی** مهندسی می‌کند:\n\n${servicesListFa}\n\nتمام این خدمات با تکیه بر توسعه درون‌استودیویی، تضمین نرخ فریم ۶۰ تا ۱۲۰ FPS و یکپارچه‌سازی سخت‌افزار و نرم‌افزار ارائه می‌شوند.\n\nدرباره کدام زمینه مایلید اطلاعات فنی یا نمونه پروژه‌های اجرایی را بررسی کنید؟`
        : `MIGO Studio engineers creative technology across **6 core service families**:\n\n${servicesListEn}\n\nAll services are produced in-house with zero outsourcing, locked 60–120 FPS guarantees, and turnkey hardware integration.\n\nWhich discipline would you like to explore or consult on?`,
      topic: 'general',
      suggestedActions: [
        {
          label: isFa ? 'مشاهده پرتال کامل خدمات' : 'Browse All Services',
          href: `/${locale}/services`,
        },
        {
          label: isFa ? 'مشاهده پروژه‌های شاخص' : 'View Portfolio Projects',
          href: `/${locale}/work`,
        },
        {
          label: isFa ? 'ثبت بریف در شروع پروژه' : 'Start a Project Brief',
          href: `/${locale}/start-project`,
        },
      ],
      followUpOptions: isFa
        ? [
            'برای موزه یا نمایشگاه چه تجربه‌ای پیشنهاد میدید؟',
            'چطور محصولاتم رو با WebAR نمایش بدم؟',
            'تفاوت واقعیت مجازی (VR) و ترکیبی (MR) چیه؟',
            'مراحل شروع همکاری چطور است؟',
          ]
        : [
            'What do you suggest for an interactive museum?',
            'How can I display products via WebAR?',
            'What is the difference between VR and MR?',
            'How do we start a project?',
          ],
    };
  }

  /**
   * Stream a simulated typing response word-by-word with natural cadence
   */
  public static async *streamReply(
    fullText: string,
    chunkDelayMs: number = 22
  ): AsyncGenerator<string, void, unknown> {
    // Split into tokens (words or punctuation chunks)
    const tokens = fullText.split(/(\s+)/);

    for (const token of tokens) {
      if (token) {
        yield token;
        // Pause briefly to simulate live thinking/typing
        await new Promise((res) => setTimeout(res, chunkDelayMs));
      }
    }
  }
}
