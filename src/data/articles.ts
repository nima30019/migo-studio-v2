import { Locale } from './translations';

export interface ArticleItem {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  category: Record<Locale, string>;
  author: string;
  date: string;
  readTime: Record<Locale, string>;
  featured: boolean;
  content: Record<Locale, Array<{ heading?: string; paragraphs: string[] }>>;
  tags: string[];
}

export const ARTICLES: ArticleItem[] = [
  {
    id: 'future-of-vr',
    slug: 'the-future-of-virtual-reality',
    title: {
      en: 'The Future of Virtual Reality: From Standalone Silicon to Spatial Presence',
      fa: 'آینده واقعیت مجازی: از چیپست‌های مستقل تا حضور فضایی تمام‌عیار',
    },
    excerpt: {
      en: 'How pancake optics, inside-out neural tracking, and high-density micro-OLED panels are transforming VR from niche entertainment into enterprise infrastructure.',
      fa: 'چگونه لنزهای پنکیک، ردیابی عصبی حرکت چشم و پنل‌های میکرو-OLED واقعیت مجازی را از سرگرمی به زیرساختی استراتژیک برای سازمان‌ها تبدیل کرده‌اند.',
    },
    category: {
      en: 'Spatial Computing',
      fa: 'رایانش فضایی',
    },
    author: 'MIGO R&D Lab',
    date: '2026-02-18',
    readTime: {
      en: '6 min read',
      fa: '۶ دقیقه مطالعه',
    },
    featured: true,
    tags: ['Virtual Reality', 'Hardware', 'Enterprise VR', 'Pico 4', 'Apple Vision'],
    content: {
      en: [
        {
          heading: 'The Paradigm Shift in Spatial Displays',
          paragraphs: [
            'For years, virtual reality carried the stigma of being heavy, uncomfortable, and tethered to bulky gaming computers. The arrival of high-efficiency silicon and pancake lenses has shattered that ceiling.',
            'Today, standalone headsets provide 4K per-eye resolution, sub-millimeter inside-out positional tracking, and photorealistic spatial passthrough. Enterprise adoption is accelerating as companies recognize the sheer ROI of virtual prototyping.',
          ],
        },
        {
          heading: 'Zero-Risk Industrial Training',
          paragraphs: [
            'When mistakes in physical training cost lives or millions in machine wear-and-tear, VR becomes an irreplaceable asset. Simulating complex emergency shutdowns or turbine overhauls gives workers muscle memory before they ever touch physical equipment.',
            'At MIGO, our simulations focus on tactile fidelity. By tuning haptic cues and precision physics, we create virtual experiences that transfer directly into real-world competency.',
          ],
        },
      ],
      fa: [
        {
          heading: 'تحول در اپتیک و راحتی کاربری',
          paragraphs: [
            'سال‌ها واقعیت مجازی با تصویر هدست‌های سنگین، کابل‌های متعدد و اتصال به کیس‌های غول‌پیکر شناخته می‌شد. اما معرفی لنزهای پنکیک باریک و پردازنده‌های کم‌مصرف موبایلی، این محدودیت‌ها را به کلی برطرف کرد.',
            'امروزه هدست‌های مستقل با رزولوشن‌های خیره‌کننده 4K برای هر چشم و رهگیری آنی مردمک چشم و دست‌ها، بستری ایده‌آل را برای ورود شرکت‌های بزرگ به دنیای پروتوتایپینگ سه‌بعدی فراهم آورده‌اند.',
          ],
        },
        {
          heading: 'آموزش سازمانی بدون ریسک و هزینه استهلاک',
          paragraphs: [
            'در صنایعی که کوچک‌ترین خطای انسانی در کارگاه یا پالایشگاه عواقب مالی و جانی جبران‌ناپذیر دارد، شبیه‌سازهای VR نقشی حیاتی ایفا می‌کنند. تمرین صدها باره یک پروتکل بحرانی در محیط ایمن، حافظه عضلانی پرسنل را تقویت می‌کند.',
            'تیم MIGO با تمرکز بر بازخوردهای لمسی دقیق و قوانین فیزیکی دنیای واقعی، فضایی را خلق می‌کند که آموخته‌های کاربر بلافاصله در محیط عملیاتی قابل پیاده‌سازی باشد.',
          ],
        },
      ],
    },
  },
  {
    id: 'interactive-exhibitions-guide',
    slug: 'interactive-experiences-in-exhibitions',
    title: {
      en: 'Stop Foot Traffic: Designing Interactive Exhibition Experiences That Convert',
      fa: 'تسخیر توجه مخاطبان: طراحی غرفه‌ها و چیدمان‌های تعاملی نمایشگاهی',
    },
    excerpt: {
      en: 'Why static banners and looping videos are losing the expo floor, and how multi-touch tables, kinetic projection, and gesture interaction capture high-value leads.',
      fa: 'چرا بنرهای چاپی و ویدیوهای تکرارشونده دیگر در سالن‌های نمایشگاهی اثرگذار نیستند و چگونه فناوری‌های حرکتی و لمسی لیدهای تجاری جذب می‌کنند.',
    },
    category: {
      en: 'Exhibition Design',
      fa: 'طراحی نمایشگاهی',
    },
    author: 'MIGO Creative Team',
    date: '2026-01-24',
    readTime: {
      en: '5 min read',
      fa: '۵ دقیقه مطالعه',
    },
    featured: false,
    tags: ['Exhibitions', 'Touchscreen', 'Kinect', 'Event Tech', 'Projection'],
    content: {
      en: [
        {
          heading: 'The 3-Second Rule of Trade Show Booths',
          paragraphs: [
            'In an exhibition hall with hundreds of competing vendors, visitors spend an average of three seconds glancing at a booth before deciding to walk past. Static rollups and corporate brochures are invisible to the modern attendee.',
            'Interactive installations change this equation. When a visitor sees their silhouette spark a wave of light on a kinetic projection wall, curiosity compels them to step in and investigate.',
          ],
        },
        {
          heading: 'From Amusement to High-Intent Business Leads',
          paragraphs: [
            'Entertainment without purpose is wasted effort. Every interactive experience we design at MIGO integrates an organic conversion loop — whether it is entering contact details to download customized 3D design files or competing in a branded leaderboard.',
          ],
        },
      ],
      fa: [
        {
          heading: 'قانون ۳ ثانیه در غرفه‌های نمایشگاهی',
          paragraphs: [
            'در یک سالن نمایشگاهی شلوغ با صدها رقیب، هر بازدیدکننده تنها ۳ ثانیه به نمای بیرونی غرفه نگاه می‌کند و سپس به مسیر خود ادامه می‌دهد. رول‌آپ‌های معمولی و بروشورهای کاغذی دیگر کششی برای مخاطب امروزی ایجاد نمی‌کنند.',
            'راهکارهای تعاملی این بازی را تغییر می‌دهند. وقتی یک رهگذر با تکان دادن دست خود ذرات نورانی روی دیوار ۱۲ متری را جابه‌جا می‌کند یا با لمس یک قطعه فیزیکی روی میز دیجیتال اطلاعات تخصصی آن را می‌بیند، ناخودآگاه وارد حریم غرفه می‌شود.',
          ],
        },
        {
          heading: 'تبدیل هیجان اولیه به قراردادهای تجاری',
          paragraphs: [
            'سرگرمیِ بدون هدف هدررفت بودجه است. تمامی سیستم‌های تعاملی MIGO طوری طراحی می‌شوند که در انتهای تجربه، اطلاعات تماس، ایمیل یا نیازهای کارفرما با رضایت کامل خود بازدیدکننده ثبت شده و به تیم فروش تحویل داده شود.',
          ],
        },
      ],
    },
  },
  {
    id: 'webar-future',
    slug: 'augmented-reality-in-marketing',
    title: {
      en: 'WebAR in Modern Marketing: Breaking Down the App Barrier',
      fa: 'انقلاب WebAR در بازاریابی: پایان دوران اجبار به نصب اپلیکیشن',
    },
    excerpt: {
      en: 'Analyzing how zero-install WebAR achieves 4x higher completion rates compared to native AR apps for consumer product launches.',
      fa: 'بررسی این که چگونه فناوری WebAR بدون نیاز به نصب، نرخ تعامل کمپین‌های تبلیغاتی را تا ۴ برابر نسبت به اپلیکیشن‌های بومی افزایش می‌دهد.',
    },
    category: {
      en: 'Augmented Reality',
      fa: 'واقعیت افزوده',
    },
    author: 'MIGO Engineering',
    date: '2026-01-10',
    readTime: {
      en: '4 min read',
      fa: '۴ دقیقه مطالعه',
    },
    featured: false,
    tags: ['WebAR', 'Marketing', 'Three.js', 'Mobile Web', 'E-commerce'],
    content: {
      en: [
        {
          heading: 'Friction Kills Conversion',
          paragraphs: [
            'When a marketing campaign demands that a smartphone user open an App Store, authenticate, wait for a 120MB download, and approve device permissions, 80% of potential buyers abandon the funnel before ever seeing the product.',
            'WebAR eliminates this entire friction curve. Modern WebGL and WebXR standards allow interactive 3D assets to render instantly inside Safari and Chrome directly from a camera QR scan.',
          ],
        },
      ],
      fa: [
        {
          heading: 'موانع نصب، قاتل کمپین‌های تبلیغاتی',
          paragraphs: [
            'هر بار که برای مشاهده یک تیزر یا محصول از کاربر خواسته می‌شود به اپ‌استور یا گوگل‌پلی برود و یک فایل ۱۰۰ مگابایتی را دانلود کند، بیش از ۸۰ درصد مخاطبان در نیمه راه منصرف می‌شوند.',
            'فناوری WebAR این مانع بزرگ را برای همیشه از بین برده است. استانداردهای پیشرفته وب امروزی اجازه می‌دهند مدل‌های سه‌بعدی با انیمیشن‌های روان تنها با یک اسکن ساده در مرورگر موبایل با سرعت ۶۰ فریم اجرا شوند.',
          ],
        },
      ],
    },
  },
  {
    id: 'serious-games-power',
    slug: 'serious-games-in-education',
    title: {
      en: 'Serious Games: Transforming Complex Corporate Knowledge into Play',
      fa: 'بازی‌های جدی (Serious Games): تبدیل آموزش‌های پیچیده به تجربیات ماندگار',
    },
    excerpt: {
      en: 'How gamification mechanics, branching decision trees, and immediate feedback loops dramatically increase employee retention rates.',
      fa: 'چگونه مکانیک‌های بازی‌سازی، سناریوهای چندشاخه و بازخورد آنی، ماندگاری آموزش‌ها را در ذهن پرسنل تا ۳ برابر ارتقا می‌دهند.',
    },
    category: {
      en: 'Game Design',
      fa: 'بازی‌سازی سازمانی',
    },
    author: 'MIGO R&D Lab',
    date: '2025-12-14',
    readTime: {
      en: '5 min read',
      fa: '۵ دقیقه مطالعه',
    },
    featured: false,
    tags: ['Serious Games', 'Corporate Training', 'Gamification', 'Unity'],
    content: {
      en: [
        {
          heading: 'Why Slide Decks Fail',
          paragraphs: [
            'Passive listening to 60-slide PowerPoint presentations yields an average knowledge retention rate below 15% after 30 days. Humans learn by making decisions and immediately encountering consequences.',
            'Serious games put employees directly into the cockpit or managerial chair. When their decisions trigger simulated outcomes in real time, engagement and retention surge.',
          ],
        },
      ],
      fa: [
        {
          heading: 'چرا اسلایدهای سنتی پاورپینت شکست می‌خورند؟',
          paragraphs: [
            'تحقیقات نشان می‌دهند شنیدن غیرفعال ساعت‌ها سخنرانی و اسلایدهای متنی پس از یک ماه کمتر از ۱۵ درصد در حافظه پرسنل باقی می‌ماند. مغز انسان از طریق تعامل، تصمیم‌گیری و روبرو شدن با پیامد اقدامات یاد می‌گیرد.',
            'بازی‌های جدی (Serious Games) کارمند را در نقش کاپیتان، تکنسین یا مذاکره‌کننده قرار می‌دهند. تصمیم‌گیری در شرایط بحرانی شبیه‌سازی‌شده باعث نهادینه شدن کامل مهارت‌ها می‌شود.',
          ],
        },
      ],
    },
  },
  {
    id: 'exhibition-gamification-guide',
    slug: 'trade-show-gamification-lead-generation',
    title: {
      en: 'Exhibition Gamification: How Interactive Games Drive 300% More Qualified Leads',
      fa: 'راهنمای جامع بازی‌های نمایشگاهی: چگونه گیمیفیکیشن غرفه جذب لید را تا ۳۰۰٪ افزایش می‌دهد؟',
    },
    excerpt: {
      en: 'Why static booths are losing the expo floor, and how 3D interactive lucky wheels, touchless motion games, and live leaderboards transform passersby into high-intent enterprise buyers.',
      fa: 'چرا غرفه‌های سنتی نمایشگاهی دیگر توجه مخاطب را جلب نمی‌کنند و چگونه گردونه‌های شانس سه‌بعدی، چالش‌های حرکتی بدون لمس و لیدربوردهای دیجیتال رهگذران را به مشتریان قطعی تبدیل می‌کنند.',
    },
    category: {
      en: 'Exhibition Tech & Gamification',
      fa: 'فناوری نمایشگاهی و گیمیفیکیشن',
    },
    author: 'MIGO Strategy & Game Engineering',
    date: '2026-03-02',
    readTime: {
      en: '7 min read',
      fa: '۷ دقیقه مطالعه',
    },
    featured: true,
    tags: ['Exhibition Games', 'Gamification', 'Lead Generation', 'Trade Shows', 'Touchless Sensors', 'Leaderboard', 'CRM'],
    content: {
      en: [
        {
          heading: 'The Trade Show Dilemma: High Investment, Low Attention Span',
          paragraphs: [
            'Renting prime expo space, constructing multi-story architectural booths, and staffing teams represents one of the largest single marketing investments for enterprise companies. Yet, the average exhibition visitor walks past dozens of booths per minute, glancing for barely 2 to 3 seconds before moving on.',
            'Traditional swag pens, printed brochures, and passive looping video reels no longer command attention. Attendees crave dynamic agency — they want to touch, play, compete, and be challenged.',
          ],
        },
        {
          heading: 'The Mechanics of High-Conversion Exhibition Gamification',
          paragraphs: [
            'A successful trade show game is engineered around four psychological pillars: instantaneous onboarding, low barrier to entry, social proof through spectator excitement, and organic lead capture.',
            '1. Touchless Motion Games: Utilizing LiDAR sensors and depth cameras to let players slice targets or steer vehicles through body gestures. Because it is touchless, spectators in the corridor can watch the player move, naturally creating a crowd effect.',
            '2. Interactive 3D Lucky Wheels & Raffles: Replacing clunky physical prize wheels with real-time WebGL physics wheels. Players spin in photorealistic 3D, while every spin is tied to a verified mobile number and immediate automated SMS discount code.',
            '3. Live Competitive Leaderboards: Broadcasting the day\'s top scores on high-pitch LED walls. This turns passive attendees into fiercely motivated competitors who return to your booth multiple times to defend their high scores.',
          ],
        },
        {
          heading: 'Converting Play Into Measurable Business ROI',
          paragraphs: [
            'Entertainment without data capture is merely an expense. At MIGO, every interactive system features a zero-friction registration gate before game entry or reward redemption.',
            'Visitors happily exchange verified phone numbers, work emails, and company titles for a chance to win or receive personalized digital demo files. Data is validated on-the-fly and synchronized directly with your corporate CRM, guaranteeing that your sales team leaves the trade show with hundreds of pre-qualified, warm leads.',
          ],
        },
      ],
      fa: [
        {
          heading: 'چالش بزرگ غرفه‌داری: سرمایه‌گذاری سنگین در برابر کم‌توجهی مخاطب',
          paragraphs: [
            'اجاره متراژ بالا در سالن‌های اصلی، طراحی سازه‌های پرهزینه دکوراسیون و اعزام کارشناسان، یکی از سنگین‌ترین ردیف‌های بودجه بازاریابی هر شرکتی است. با این حال، میانگین زمان نگاه یک بازدیدکننده به نمای یک غرفه تنها ۲ تا ۳ ثانیه است و اغلب افراد با یک نگاه گذرا از جلوی غرفه‌ها عبور می‌کنند.',
            'بروشورهای کاغذی، خودکارهای تبلیغاتی و ویدیوهای لوپ‌شده شرکتی روی نمایشگرها دیگر کششی ندارند. مخاطب امروز خواهان تعامل فعال است؛ او می‌خواهد بازی کند، به چالش کشیده شود و در یک رقابت جذاب شرکت کند.',
          ],
        },
        {
          heading: 'مکانیک‌های طلایی در طراحی بازی‌های نمایشگاهی پربازده',
          paragraphs: [
            'یک بازی نمایشگاهی موفق باید بر پایه چهار اصل روان‌شناسی طراحی شود: شروع سریع (زیر ۱۵ ثانیه)، سادگی قوانین، جلب توجه تماشاچیان راهرو و ثبت خودکار لید تجاری.',
            '۱. بازی‌های حرکتی بدون لمس (Touchless Games): با استفاده از سنسورهای LiDAR و دوربین‌های عمق‌سنج، کاربر با حرکات دست و بدن در فضای باز بازی می‌کند. دیدن هیجان حرکتی بازیکن، جمعیت زیادی از رهگذران سالن را دور غرفه جمع می‌کند.',
            '۲. گردونه شانس و شبیه‌ساز جوایز سه‌بعدی: جایگزین کردن گردونه‌های دستی سنتی با گردونه‌های سه‌بعدی و خیره‌کننده WebGL. هر بار چرخش گردونه مشروط به ثبت شماره موبایل است و کد تخفیف یا هدیه به صورت آنی برای کاربر پیامک می‌شود.',
            '۳. جدول امتیازات زنده (Live Leaderboard): نمایش رکوردهای روز بر روی ال‌ای‌دی‌وال بزرگ غرفه، حس رقابت را بین مدیران و متخصصان بازدیدکننده بیدار می‌کند و باعث می‌شود افراد چندین بار برای شکستن رکورد به غرفه شما بازگردند.',
          ],
        },
        {
          heading: 'تبدیل بازی و سرگرمی به بازگشت مستقیم سرمایه (ROI)',
          paragraphs: [
            'سرگرمیِ بدون جمع‌آوری دیتا، تنها هزینه است. در استودیو MIGO، تمامی سیستم‌های بازی و گیمیفیکیشن دارای دروازه ورودی ثبت لید (Lead Gate) بدون دردسر هستند.',
            'مخاطبان با اشتیاق کامل اطلاعات تماس، نام سازمان و نیاز تجاری خود را ثبت می‌کنند تا وارد مسابقه شوند یا فایل سه‌بعدی اختصاصی دریافت کنند. این اطلاعات در لحظه در دیتابیس CRM ذخیره شده و پس از پایان نمایشگاه، صدها لید گرم و آماده مذاکره در اختیار تیم فروش شما قرار خواهد داشت.',
          ],
        },
      ],
    },
  },
];
