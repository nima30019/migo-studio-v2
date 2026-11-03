import { Locale } from './translations';

export interface ExperimentItem {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  category: Record<Locale, string>;
  categoryKey: 'glsl' | 'spatial' | 'kinetic' | 'webar';
  badge: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  technicalDetails: Record<Locale, string>;
  practicalApplication: Record<Locale, string>;
  technologies: string[];
  fpsTarget: string;
  parameters: Array<{
    id: string;
    label: Record<Locale, string>;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  }>;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const LAB_EXPERIMENTS: ExperimentItem[] = [
  {
    id: 'holographic-shader',
    slug: 'holographic-fluid-mesh',
    title: {
      en: 'Holographic Fluid Mesh & Noise Displacement',
      fa: 'شیدر موج سیال هولوگرافیک و تغییر شکل ریل‌تایم',
    },
    category: {
      en: 'GLSL Shaders & WebGL',
      fa: 'شیدرهای GLSL و وب‌جی‌ال',
    },
    categoryKey: 'glsl',
    badge: {
      en: 'Real-Time Shader',
      fa: 'شیدر بی‌درنگ',
    },
    shortDescription: {
      en: 'Simplex noise vertex displacement with chromatic aberration, real-time cursor repulsion, and interactive turbulence frequency.',
      fa: 'تغییر مکان برداری نویز سیمپلکس با انحراف رنگی کروماتیک، واکنش بی‌درنگ به موقعیت ماوس و بسامد تلاطم پویا.',
    },
    technicalDetails: {
      en: 'Computes customized simplex noise on vertex geometry directly on the GPU, avoiding CPU bottlenecks and achieving locked 60+ FPS performance even on low-power devices.',
      fa: 'محاسبه مستقیم نویز سیمپلکس بر روی هندسه رئوس توسط پردازنده گرافیکی (GPU) بدون تحمیل بار به CPU، با حفظ نرخ فریم پایدار ۶۰+ فریم بر ثانیه.',
    },
    practicalApplication: {
      en: 'Used in interactive trade show kinetic video walls, luxury brand experience portals, and interactive digital stage backdrops.',
      fa: 'کاربرد در دیوارهای ویدیویی حرکتی غرفه‌های نمایشگاهی، پورتال‌های برندهای شاخص و پس‌زمینه‌های دیجیتال تعاملی استیج‌ها.',
    },
    technologies: ['Three.js', 'Custom GLSL', 'Simplex Noise', 'Post-processing Bloom'],
    fpsTarget: '60 - 120 FPS',
    parameters: [
      {
        id: 'speed',
        label: { en: 'Wave Velocity', fa: 'سرعت موج' },
        min: 0.2,
        max: 3.0,
        step: 0.1,
        defaultValue: 1.0,
      },
      {
        id: 'distortion',
        label: { en: 'Turbulence Depth', fa: 'عمق تلاطم' },
        min: 0.1,
        max: 2.5,
        step: 0.1,
        defaultValue: 1.2,
      },
      {
        id: 'density',
        label: { en: 'Mesh Density', fa: 'تراکم مش' },
        min: 10,
        max: 60,
        step: 5,
        defaultValue: 35,
      },
    ],
    colorScheme: {
      primary: '#FF781F',
      secondary: '#FF3D00',
      accent: '#00F2FE',
    },
  },
  {
    id: 'spatial-lidar',
    slug: 'spatial-lidar-pointcloud',
    title: {
      en: 'Spatial LiDAR Point Cloud Scanner Simulator',
      fa: 'شبیه‌ساز اسکنر ابر نقاط فضایی LiDAR',
    },
    category: {
      en: 'Spatial Computing',
      fa: 'رایانش فضایی و سنسور',
    },
    categoryKey: 'spatial',
    badge: {
      en: 'Point Cloud Matrix',
      fa: 'ماتریس ابر نقاط',
    },
    shortDescription: {
      en: 'Dynamic 3D point cloud streaming simulator rendering 100,000+ depth particles with interactive horizontal laser slicing and proximity detection.',
      fa: 'شبیه‌ساز پردازش ابر نقاط سه‌بعدی با رندر بیش از ۱۰۰٬۰۰۰ ذره عمق‌سنجی، برش افقی لیزری و تشخیص نزدیکی کاربر.',
    },
    technicalDetails: {
      en: 'Utilizes GPU Instanced Buffers to animate tens of thousands of individual laser telemetry points with zero memory leaks.',
      fa: 'بهره‌گیری از بافرهای نمونه‌برداری‌شده GPU جهت پویانمایی ده‌ها هزار نقطه دوری‌سنجی لیزری بدون افت حافظه یا کندی سیستم.',
    },
    practicalApplication: {
      en: 'Museum heritage digital archiving, autonomous inspection telemetry visualization, and gesture-controlled physical spatial installations.',
      fa: 'آرشیو دیجیتال و بازسازی میراث فرهنگی در موزه‌ها، پایش تله‌متری رباتیک و چیدمان‌های تعاملی حساس به حضور افراد.',
    },
    technologies: ['InstancedMesh', 'Spatial Octree', 'Float32Array', 'Depth Shaders'],
    fpsTarget: '60 FPS',
    parameters: [
      {
        id: 'density',
        label: { en: 'Point Density (k)', fa: 'تراکم نقاط (هزار)' },
        min: 10,
        max: 80,
        step: 5,
        defaultValue: 40,
      },
      {
        id: 'sliceHeight',
        label: { en: 'Laser Slice Plane', fa: 'صفحه برش لیزر' },
        min: -2,
        max: 2,
        step: 0.1,
        defaultValue: 0.0,
      },
      {
        id: 'glow',
        label: { en: 'Phosphor Glow', fa: 'شدت تابش فسفری' },
        min: 0.5,
        max: 3.0,
        step: 0.2,
        defaultValue: 1.5,
      },
    ],
    colorScheme: {
      primary: '#00F2FE',
      secondary: '#4FACFE',
      accent: '#FF781F',
    },
  },
  {
    id: 'kinetic-typography',
    slug: 'kinetic-typography-distortion',
    title: {
      en: 'Reactive Kinetic Typography & Spring Dynamics',
      fa: 'تایپوگرافی حرکتی واکنشی و دینامیک فنری',
    },
    category: {
      en: 'Kinetic Computing',
      fa: 'طراحی محاسباتی پویا',
    },
    categoryKey: 'kinetic',
    badge: {
      en: 'Kinetic Vector',
      fa: 'وکتور حرکتی',
    },
    shortDescription: {
      en: 'Kinetic 3D typographic wireframe system that reacts elasticaly to mouse velocity and spatial gestures with spring physics.',
      fa: 'سیستم وایرفریم تایپوگرافی سه‌بعدی با واکنش الاستیک به سرعت ماوس و حرکات دست با فیزیک شبیه‌سازی‌شده فنر.',
    },
    technicalDetails: {
      en: 'Real-time Verlet integration physics mapped to vector letterforms, supporting both Persian and Latin glyph coordinate transforms.',
      fa: 'فیزیک انتگرال ورلت بی‌درنگ نگاشت‌شده بر روی اشکال وکتوری حروف، با پشتیبانی همزمان از کاراکترهای فارسی و لاتین.',
    },
    practicalApplication: {
      en: 'Interactive brand launches, experiential signage, and architectural interactive projection mapping.',
      fa: 'مراسم رونمایی از محصولات، تابلوهای هوشمند رویدادی و ویدیو مپینگ تعاملی معماری.',
    },
    technologies: ['Verlet Physics', 'Canvas 2D/3D', 'Hermite Splines', 'Audio Waveform'],
    fpsTarget: '60 FPS',
    parameters: [
      {
        id: 'elasticity',
        label: { en: 'Spring Elasticity', fa: 'خاصیت کشسانی فنر' },
        min: 0.05,
        max: 0.4,
        step: 0.02,
        defaultValue: 0.18,
      },
      {
        id: 'damping',
        label: { en: 'Velocity Damping', fa: 'میراکننده سرعت' },
        min: 0.7,
        max: 0.98,
        step: 0.02,
        defaultValue: 0.88,
      },
      {
        id: 'influenceRadius',
        label: { en: 'Cursor Force Radius', fa: 'شعاع اثر نشانگر' },
        min: 50,
        max: 250,
        step: 10,
        defaultValue: 120,
      },
    ],
    colorScheme: {
      primary: '#FF007A',
      secondary: '#7928CA',
      accent: '#FF781F',
    },
  },
  {
    id: 'webar-inspector',
    slug: 'webar-spatial-anchor-preview',
    title: {
      en: 'Zero-Install WebAR Surface Anchor Inspector',
      fa: 'کاوشگر لنگراندازی سطحی واقعیت افزوده وب (WebAR)',
    },
    category: {
      en: 'WebXR / WebAR',
      fa: 'واقعیت افزوده وب',
    },
    categoryKey: 'webar',
    badge: {
      en: 'WebXR Ready',
      fa: 'آماده وب‌اکس‌آر',
    },
    shortDescription: {
      en: 'PBR 3D asset inspection with exploded mechanical views, simulated AR surface reticle anchoring, and real-time environment lighting.',
      fa: 'بررسی مشخصات مواد PBR با امکان انفجار قطعات مکانیکی، شبکه‌بندی لنگراندازی روی سطح و نورپردازی محیطی بی‌درنگ.',
    },
    technicalDetails: {
      en: 'Simulates WebXR hit-testing algorithms right within standard WebGL browsers without requiring external native apps.',
      fa: 'شبیه‌سازی الگوریتم‌های Hit-Testing استاندارد WebXR درون مرورگر بدون نیاز به نصب هرگونه اپلیکیشن یا افزونه خارجی.',
    },
    practicalApplication: {
      en: 'Industrial machinery sales, automotive interactive configurators, and e-commerce scale-accurate product placements.',
      fa: 'فروش ماشین‌آلات صنعتی، پیکربندی تعاملی خودروها و جانمایی ابعاد دقیق محصولات در دکوراسیون داخلی.',
    },
    technologies: ['WebXR Hit-Test', 'PBR Material', 'Exploded Hierarchy', 'GLTF/GLB'],
    fpsTarget: '60 FPS',
    parameters: [
      {
        id: 'explodeFactor',
        label: { en: 'Exploded View Offset', fa: 'میزان انفجار قطعات' },
        min: 0,
        max: 1.5,
        step: 0.05,
        defaultValue: 0.4,
      },
      {
        id: 'metallic',
        label: { en: 'PBR Metallic Roughness', fa: 'زبری و بازتاب فلز' },
        min: 0.1,
        max: 1.0,
        step: 0.05,
        defaultValue: 0.8,
      },
      {
        id: 'rotationSpeed',
        label: { en: 'Auto-orbit Velocity', fa: 'سرعت چرخش خودکار' },
        min: 0,
        max: 2.0,
        step: 0.1,
        defaultValue: 0.5,
      },
    ],
    colorScheme: {
      primary: '#00E676',
      secondary: '#00B0FF',
      accent: '#FF781F',
    },
  },
];
