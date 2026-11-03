'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { WebGLFallback } from './WebGLFallback';

export function InteractiveWebGLHero() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. WebGL Support Test
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setHasWebGL(false);
      return;
    }

    setHasWebGL(true);
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // 2. Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

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

    // 3. Central Wireframe Geometry (Icosahedron & Inner Core)
    const group = new THREE.Group();
    scene.add(group);

    const outerGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xff781f,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0xff781f,
      emissiveIntensity: 0.25,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Inner glowing sphere / diamond
    const innerGeo = new THREE.OctahedronGeometry(1.1, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 4. Particle Constellation
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorOrange = new THREE.Color(0xff781f);
    const colorCyan = new THREE.Color(0x00f2fe);

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const r = 2.4 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixedColor = Math.random() > 0.4 ? colorOrange : colorCyan;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    group.add(particleCloud);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const orangePointLight = new THREE.PointLight(0xff781f, 3, 15);
    orangePointLight.position.set(3, 3, 4);
    scene.add(orangePointLight);

    const cyanPointLight = new THREE.PointLight(0x00f2fe, 2.5, 15);
    cyanPointLight.position.set(-3, -3, 3);
    scene.add(cyanPointLight);

    // 6. Mouse / Touch Interaction with Smooth LERP
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      targetX = (clientX / window.innerWidth - 0.5) * 1.5;
      targetY = (clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped mouse tracking
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      group.rotation.y = elapsedTime * 0.15 + currentX * 1.2;
      group.rotation.x = elapsedTime * 0.1 + currentY * 1.2;

      innerMesh.rotation.y = -elapsedTime * 0.3;
      innerMesh.rotation.z = elapsedTime * 0.2;

      // Subtle breathing scale
      const scaleFactor = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
      group.scale.set(scaleFactor, scaleFactor, scaleFactor);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (hasWebGL === false) {
    return <WebGLFallback />;
  }

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}
