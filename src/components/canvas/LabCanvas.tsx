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
  isExpanded?: boolean;
}

export function LabCanvas({
  experimentId,
  parameters,
  colorScheme = { primary: '#FF781F', secondary: '#FF3D00', accent: '#00F2FE' },
  isExpanded = false,
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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // Experiment-specific variables
    let planeMesh: THREE.Mesh | null = null;
    let pointsMesh: THREE.Points | null = null;
    let originalPlanePositions: Float32Array | null = null;

    // Exploded assembly parts for webar-inspector
    const explodedParts: Array<{ mesh: THREE.Mesh; dir: THREE.Vector3; initialPos: THREE.Vector3 }> = [];

    // Kinetic typography particles
    let kineticMesh: THREE.Group | null = null;

    const primCol = new THREE.Color(colorScheme.primary);
    const secCol = new THREE.Color(colorScheme.secondary);
    const accCol = new THREE.Color(colorScheme.accent);

    // 1. Holographic Fluid Mesh
    if (experimentId === 'holographic-shader') {
      const planeGeo = new THREE.PlaneGeometry(3.5, 3.5, 45, 45);
      originalPlanePositions = planeGeo.attributes.position.array.slice() as Float32Array;
      const planeMat = new THREE.MeshStandardMaterial({
        color: primCol,
        wireframe: true,
        roughness: 0.25,
        metalness: 0.85,
        emissive: secCol,
        emissiveIntensity: 0.35,
      });
      planeMesh = new THREE.Mesh(planeGeo, planeMat);
      group.add(planeMesh);
    }

    // 2. Spatial LiDAR Point Cloud
    else if (experimentId === 'spatial-lidar') {
      const pCount = 4200;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pColors = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 1.6;
        const r = 0.55;
        pPos[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
        pPos[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
        pPos[i * 3 + 2] = r * Math.sin(v) + (Math.random() - 0.5) * 0.15;

        pColors[i * 3] = primCol.r;
        pColors[i * 3 + 1] = primCol.g;
        pColors[i * 3 + 2] = primCol.b;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });
      pointsMesh = new THREE.Points(pGeo, pMat);
      group.add(pointsMesh);

      // LiDAR laser scan ring indicator
      const ringGeo = new THREE.RingGeometry(1.8, 1.84, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const laserRing = new THREE.Mesh(ringGeo, ringMat);
      laserRing.rotation.x = Math.PI / 2;
      group.add(laserRing);
    }

    // 3. Kinetic Typography & Spring Dynamics
    else if (experimentId === 'kinetic-typography') {
      kineticMesh = new THREE.Group();

      // Create an array of geometric facet letterforms / typographic nodes
      const nodeCount = 14;
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 1.7;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const boxGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
        const boxMat = new THREE.MeshStandardMaterial({
          color: primCol,
          wireframe: true,
          metalness: 0.8,
          emissive: accCol,
          emissiveIntensity: 0.2,
        });
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.position.set(x, y, (Math.random() - 0.5) * 0.6);
        kineticMesh.add(box);
      }

      // Central core symbol
      const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: accCol,
        wireframe: true,
        emissive: primCol,
        emissiveIntensity: 0.3,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      kineticMesh.add(core);

      group.add(kineticMesh);
    }

    // 4. Zero-Install WebAR Surface Anchor Inspector
    else {
      // Create multi-part mechanical assembly with real exploded offsets
      // Part A: Inner Reactor Sphere
      const sphereGeo = new THREE.SphereGeometry(0.7, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: primCol,
        metalness: 0.9,
        roughness: 0.2,
      });
      const centerSphere = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(centerSphere);

      // Part B: Torus Rotor
      const torusGeo = new THREE.TorusGeometry(1.2, 0.15, 16, 64);
      const torusMat = new THREE.MeshStandardMaterial({
        color: accCol,
        metalness: 0.95,
        roughness: 0.15,
        wireframe: true,
      });
      const rotor = new THREE.Mesh(torusGeo, torusMat);
      explodedParts.push({ mesh: rotor, dir: new THREE.Vector3(0, 1, 0), initialPos: new THREE.Vector3(0, 0, 0) });
      group.add(rotor);

      // Part C & D: Outer Casing Shields
      const shieldGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.3, 32, 1, true);
      const shieldMat = new THREE.MeshStandardMaterial({
        color: secCol,
        metalness: 0.8,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });
      const topShield = new THREE.Mesh(shieldGeo, shieldMat);
      topShield.position.y = 0.5;
      explodedParts.push({ mesh: topShield, dir: new THREE.Vector3(0, 1.2, 0), initialPos: new THREE.Vector3(0, 0.5, 0) });
      group.add(topShield);

      const bottomShield = new THREE.Mesh(shieldGeo, shieldMat);
      bottomShield.position.y = -0.5;
      explodedParts.push({ mesh: bottomShield, dir: new THREE.Vector3(0, -1.2, 0), initialPos: new THREE.Vector3(0, -0.5, 0) });
      group.add(bottomShield);

      // Simulated AR Surface Reticle
      const reticleGeo = new THREE.RingGeometry(1.8, 1.85, 32);
      const reticleMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, side: THREE.DoubleSide, opacity: 0.4, transparent: true });
      const reticle = new THREE.Mesh(reticleGeo, reticleMat);
      reticle.rotation.x = Math.PI / 2;
      reticle.position.y = -1.6;
      group.add(reticle);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(primCol.getHex(), 3.5, 12);
    pointLight1.position.set(3, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(accCol.getHex(), 2.5, 12);
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    // Mouse / Touch Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let cx = 0;
      let cy = 0;
      if ('touches' in e && e.touches.length > 0) {
        cx = e.touches[0].clientX;
        cy = e.touches[0].clientY;
      } else if ('clientX' in e) {
        cx = e.clientX;
        cy = e.clientY;
      }
      targetX = (cx / window.innerWidth - 0.5) * 1.5;
      targetY = (cy / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Performance & FPS counter
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let animId: number | null = null;
    let clock = new THREE.Clock();
    let isIntersecting = true;
    let isTabVisible = typeof document !== 'undefined' ? !document.hidden : true;

    const renderLabFrame = () => {
      const t = clock.getElapsedTime();

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 500) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = now;
      }

      // Smooth mouse LERP
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const speedParam = parameters['speed'] ?? parameters['rotationSpeed'] ?? 1.0;
      const distortionParam = parameters['distortion'] ?? 1.0;
      const explodeFactor = parameters['explodeFactor'] ?? 0.0;

      // Holographic wave deformation
      if (planeMesh && originalPlanePositions) {
        const posAttr = planeMesh.geometry.attributes.position;
        const currentArr = posAttr.array as Float32Array;
        for (let i = 0; i < currentArr.length; i += 3) {
          const ox = originalPlanePositions[i];
          const oy = originalPlanePositions[i + 1];
          const wave =
            Math.sin(ox * 2.8 + t * speedParam * 2.2) *
            Math.cos(oy * 2.8 + t * speedParam * 1.8) *
            0.32 *
            distortionParam;
          currentArr[i + 2] = wave;
        }
        posAttr.needsUpdate = true;
      }

      // Spatial LiDAR laser slice plane update
      if (pointsMesh) {
        const sliceH = parameters['sliceHeight'] ?? 0.0;
        const posAttr = pointsMesh.geometry.attributes.position;
        const colAttr = pointsMesh.geometry.attributes.color;
        const posArr = posAttr.array as Float32Array;
        const colArr = colAttr.array as Float32Array;

        for (let i = 0; i < posArr.length; i += 3) {
          const y = posArr[i + 1];
          if (y < sliceH) {
            colArr[i] = primCol.r;
            colArr[i + 1] = primCol.g;
            colArr[i + 2] = primCol.b;
          } else {
            colArr[i] = accCol.r * 0.35;
            colArr[i + 1] = accCol.g * 0.35;
            colArr[i + 2] = accCol.b * 0.35;
          }
        }
        colAttr.needsUpdate = true;
      }

      // Exploded Mechanical View
      if (explodedParts.length > 0) {
        explodedParts.forEach(({ mesh, dir, initialPos }) => {
          mesh.position.copy(initialPos).addScaledVector(dir, explodeFactor);
        });
      }

      // Kinetic Typography mesh deformation
      if (kineticMesh) {
        kineticMesh.children.forEach((child, idx) => {
          child.rotation.x = t * 0.5 + idx * 0.2;
          child.rotation.y = t * 0.8 + idx * 0.1;
        });
      }

      // Group rotation
      group.rotation.y = t * 0.25 * speedParam + mouseX * 0.6;
      group.rotation.x = t * 0.15 * speedParam + mouseY * 0.4;

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!isIntersecting || !isTabVisible) {
        animId = null;
        return;
      }
      renderLabFrame();
      animId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (animId === null && isIntersecting && isTabVisible) {
        clock.start();
        animId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
        clock.stop();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    startLoop();

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
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
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

  const heightClass = isExpanded
    ? 'h-[65vh] min-h-[480px]'
    : 'h-[340px] sm:h-[420px]';

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl bg-[#07090E] border border-white/[0.08] overflow-hidden flex items-center justify-center transition-all duration-300`}>
      {/* Telemetry pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 border border-white/[0.1] backdrop-blur-md text-[11px] font-mono text-neutral-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-white font-bold">{fps} FPS</span>
        <span className="text-neutral-500">•</span>
        <span className="text-cyan-400 uppercase tracking-wider">{experimentId}</span>
      </div>

      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
