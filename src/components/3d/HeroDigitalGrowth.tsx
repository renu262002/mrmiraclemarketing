import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroDigitalGrowth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Luxury Ruby, Crimson & Champagne Gold Lighting
    const ambientLight = new THREE.AmbientLight(0x1f0812, 1.8);
    scene.add(ambientLight);

    const keyLightGold = new THREE.DirectionalLight(0xFFD36A, 3.6);
    keyLightGold.position.set(5, 8, 5);
    scene.add(keyLightGold);

    const rimLightCrimson = new THREE.DirectionalLight(0xD41450, 3.2);
    rimLightCrimson.position.set(-6, -4, -4);
    scene.add(rimLightCrimson);

    const pointLightCore = new THREE.PointLight(0xB5003A, 4.5, 16);
    pointLightCore.position.set(0, 0, 0);
    scene.add(pointLightCore);

    // 1. Central Core: Faceted Ruby-Red & Metallic Growth Crystal
    const crystalGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x240510,
      emissive: 0xB5003A,
      emissiveIntensity: 0.45,
      roughness: 0.14,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      flatShading: true
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    rootGroup.add(crystalMesh);

    // Metallic Gold Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.36, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xFFD36A,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    rootGroup.add(wireMesh);

    // Inner Glowing Champagne-Gold Core
    const innerSphereGeo = new THREE.SphereGeometry(0.62, 24, 24);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0xFFD36A,
      transparent: true,
      opacity: 0.88
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    rootGroup.add(innerSphere);

    // 2. Concentric Gyroscope Rings (Metallic Gold, Crimson Pink, Champagne Gold)
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.042, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xD99A24,
      emissive: 0xD99A24,
      emissiveIntensity: 0.45,
      roughness: 0.16,
      metalness: 0.92
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 4;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.4, 0.036, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xD41450,
      emissive: 0xB5003A,
      emissiveIntensity: 0.55,
      roughness: 0.2,
      metalness: 0.85
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    rootGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.8, 0.03, 16, 120);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xFFD36A,
      emissive: 0xD99A24,
      emissiveIntensity: 0.4,
      roughness: 0.22,
      metalness: 0.88
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    rootGroup.add(ring3);

    // 3. Orbiting Data Satellites (Gold & Crimson Nodes)
    const satellitesGroup = new THREE.Group();
    rootGroup.add(satellitesGroup);

    const satelliteCount = 6;
    const satelliteMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < satelliteCount; i++) {
      const satGeo = new THREE.OctahedronGeometry(0.18, 0);
      const isGold = i % 2 === 0;
      const satMat = new THREE.MeshStandardMaterial({
        color: isGold ? 0xFFD36A : 0xD41450,
        emissive: isGold ? 0xD99A24 : 0xB5003A,
        emissiveIntensity: 0.75,
        roughness: 0.12,
        metalness: 0.92
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      satellitesGroup.add(sat);
      satelliteMeshes.push(sat);
    }

    // 4. Floating Champagne Gold Particle Field
    const particleCount = 180;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = radius * Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xFFD36A,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(pGeo, pMat);
    rootGroup.add(particlePoints);

    // 5. Contact Grounding Shadow Disc
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(212, 20, 80, 0.35)');
      grad.addColorStop(0.45, 'rgba(217, 154, 36, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.8;
    rootGroup.add(shadowMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.35;
      mouseY = y * 0.35;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    rootGroup.scale.set(0.01, 0.01, 0.01);
    rootGroup.position.y = -0.5;

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (rootGroup.scale.x < 1.0) {
        const nextScale = THREE.MathUtils.lerp(rootGroup.scale.x, 1.0, 0.04);
        rootGroup.scale.set(nextScale, nextScale, nextScale);
      }

      rootGroup.position.y = Math.sin(elapsed * 1.2) * 0.15;

      crystalMesh.rotation.x = elapsed * 0.25;
      crystalMesh.rotation.y = elapsed * 0.35;
      wireMesh.rotation.x = -elapsed * 0.2;
      wireMesh.rotation.y = -elapsed * 0.3;

      const pulseScale = 1.0 + Math.sin(elapsed * 3) * 0.12;
      innerSphere.scale.set(pulseScale, pulseScale, pulseScale);

      ring1.rotation.x += 0.008;
      ring1.rotation.y += 0.012;
      ring2.rotation.y += 0.01;
      ring2.rotation.z += 0.006;
      ring3.rotation.z += 0.005;
      ring3.rotation.x += 0.007;

      satelliteMeshes.forEach((sat, i) => {
        const angle = elapsed * 0.8 + (i * Math.PI * 2) / satelliteCount;
        const orbitRadius = 2.4 + Math.sin(elapsed + i) * 0.2;
        sat.position.x = Math.cos(angle) * orbitRadius;
        sat.position.z = Math.sin(angle) * orbitRadius;
        sat.position.y = Math.sin(angle * 2) * 0.7;
        sat.rotation.x += 0.03;
        sat.rotation.y += 0.02;
      });

      particlePoints.rotation.y = elapsed * 0.08;

      targetRotationX += (mouseY - targetRotationX) * 0.05;
      targetRotationY += (mouseX - targetRotationY) * 0.05;
      rootGroup.rotation.x = targetRotationX;
      rootGroup.rotation.y = targetRotationY + elapsed * 0.06;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      crystalGeo.dispose();
      crystalMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[620px] flex items-center justify-center">
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#B5003A]/20 filter blur-3xl pointer-events-none" />
      <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-[#D99A24]/15 filter blur-3xl translate-x-20 translate-y-10 pointer-events-none" />
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Interactive 3D Digital Growth Core - Move your mouse to explore"
      />
    </div>
  );
};
