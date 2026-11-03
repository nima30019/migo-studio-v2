# MIGO Creative Technology Studio V2

> **High-Performance Spatial Computing, Virtual Reality (VR/MR), WebAR & Real-Time 3D Laboratory**

[![Deploy MIGO V2 to GitHub Pages](https://github.com/nima30019/migo-studio-v2/actions/workflows/deploy.yml/badge.svg)](https://github.com/nima30019/migo-studio-v2/actions/workflows/deploy.yml)

## 🌐 Live Production URLs

* **Persian Production (RTL):** [https://nima30019.github.io/migo-studio-v2/fa](https://nima30019.github.io/migo-studio-v2/fa)
* **English Production (LTR):** [https://nima30019.github.io/migo-studio-v2/en](https://nima30019.github.io/migo-studio-v2/en)
* **Experiments Lab:** [https://nima30019.github.io/migo-studio-v2/fa/lab](https://nima30019.github.io/migo-studio-v2/fa/lab)
* **Dynamic Sitemap:** [https://nima30019.github.io/migo-studio-v2/sitemap.xml](https://nima30019.github.io/migo-studio-v2/sitemap.xml)
* **Robots Directives:** [https://nima30019.github.io/migo-studio-v2/robots.txt](https://nima30019.github.io/migo-studio-v2/robots.txt)

---

## 🚀 Key Architectural Innovations in V2

1. **Direction-Aware Layout Architecture (RTL & LTR):**
   * Built with semantic direction-aware components (`DirectionProvider`, `DirectionAwareArrow`, `DirectionAwareDrawer`, `DirectionAwareBadge`).
   * Eliminates naive CSS inversions; preserves natural typography metrics for both Persian (Vazirmatn) and English (Space Grotesk/Mono).
2. **Interactive Experiments Lab (`/lab`):**
   * Real-time WebGL simplex noise shaders, 3D LiDAR point cloud simulators, and zero-install WebAR asset inspectors with live parameter controls.
   * Built-in WebGL hardware capability detection and ultra-crisp 2D canvas fallback.
3. **Tactile Sound Architecture:**
   * Synthesized Web Audio API sound effects with user-controlled sound toggle and zero external asset dependencies.
4. **Complete SEO & Schema.org JSON-LD:**
   * Full metadata, dynamic canonical URLs, `hreflang` alternates (`fa`, `en`, `x-default`), OpenGraph, Twitter Cards, and schema markup (`Organization`, `WebSite`, `BreadcrumbList`, `Service`, `FAQPage`, `CreativeWork`, `Article`).
5. **Static Performance:**
   * 100% static export (56 static routes), sub-100ms first-contentful paint, zero layout shift (CLS: 0).
