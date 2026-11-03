'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { WebGLFallback } from './WebGLFallback';

interface LabCanvasProps {
  experimentId: string;
  parameters: Record<string, number>;
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function LabCanvas({
  experimentId,
  parameters,
  colorScheme = { primary: '#FF781F', secondary: '#FF3D00', accent: '#00F2FE' },
}: LabCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [fps, setFps] = useState<number>(60);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const testCanvas = document.createElement('canvas');
      const isAvailable = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
      );
      if (!isAvailable) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    setHasWebGL(true);
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // Interactive Group
    const group = new THREE.Group();
    scene.add(group);

    // Setup experiment-specific geometry
    let planeMesh: THREE.Mesh | null = null;
    let pointsMesh: THREE.Points | null = null;
    let originalPositions: Float32Array | null = null;

    if (experimentId === 'holographic-shader') {
      const planeGeo = new THREE.PlaneGeometry(3.6, 3.6, 40, 40);
      originalPositions = planeGeo.attributes.position.array.slice() as Float32Array;
      const planeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorScheme.primary),
        wireframe: true,
        roughness: 0.2,
        metalness: 0.8,
        emissive: new THREE.Color(colorScheme.secondary),
        emissiveIntensity: 0.3,
      });
      planeMesh = new THREE.Mesh(planeGeo, planeMat);
      group.add(planeMesh);
    } else if (experimentId === 'spatial-lidar') {
      const pCount = 3500;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pColors = new Float32Array(pCount * 3);
      const colCyan = new THREE.Color(colorScheme.primary);
      const colOrange = new THREE.Color(colorScheme.accent);

      for (let i = 0; i < pCount; i++) {
        // Torus / Helix point cloud distribution
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 1.6;
        const r = 0.6;
        pPos[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
        pPos[i * 3 + 2] = r * Math.sin(v) + (Math.random() - 0.5) * 0.2;

        const mixed = Math.random() > 0.3 ? colCyan : colOrange;
        pColors[i * 3] = mixed.r;
        pColors[i * 3 + 1] = mixed.g;
        pColors[i * 3 + 2] = mixed.b;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      pointsMesh = new THREE.Points(pGeo, pMat);
      group.add(pointsMesh);
    } else {
      // Default: 3D High-Tech Polyhedron / Configurator
      const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 80, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorScheme.primary),
        metalness: 0.85,
        roughness: 0.2,
        wireframe: true,
      });
      planeMesh = new THREE.Mesh(geo, mat);
      group.add(planeMesh);
    }

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);
    const pLight = new THREE.PointLight(new THREE.Color(colorScheme.primary).getHex(), 4, 10);
    pLight.position.set(2, 3, 4);
    scene.add(pLight);

    // Pointer tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });

    // FPS Meter tracking
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Update FPS once per 500ms
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 500) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      const speedParam = parameters['speed'] ?? parameters['rotationSpeed'] ?? 1.0;
      const distortionParam = parameters['distortion'] ?? 1.0;

      // Real-time vertex wave computation if shader experiment
      if (planeMesh && originalPositions && experimentId === 'holographic-shader') {
        const posAttr = planeMesh.geometry.attributes.position;
        const currentArr = posAttr.array as Float32Array;
        for (let i = 0; i < currentArr.length; i += 3) {
          const ox = originalPositions[i];
          const oy = originalPositions[i + 1];
          const wave =
            Math.sin(ox * 2.5 + t * speedParam * 2) *
            Math.cos(oy * 2.5 + t * speedParam * 1.5) *
            0.35 *
            distortionParam;
          currentArr[i + 2] = wave;
        }
        posAttr.needsUpdate = true;
      }

      // Rotate group
      group.rotation.y = t * 0.2 * speedParam + mouseX * 0.4;
      group.rotation.x = t * 0.15 * speedParam + mouseY * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [experimentId, parameters, colorScheme]);

  if (hasWebGL === false) {
    return <WebGLFallback />;
  }

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl bg-[#08090D] border border-white/[0.08] overflow-hidden flex items-center justify-center">
      {/* Live Telemetry Pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/[0.1] backdrop-blur-md text-[11px] font-mono text-neutral-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-white font-bold">{fps} FPS</span>
        <span className="text-neutral-500">•</span>
        <span className="text-brand-orange uppercase">{experimentId}</span>
      </div>

      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
