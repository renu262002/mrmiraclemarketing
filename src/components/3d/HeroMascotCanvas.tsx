import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroMascotCanvasProps {
  orbPhase: 'hidden' | 'ignite' | 'grow' | 'float' | 'revealed';
  mousePos: { x: number; y: number };
}

export const HeroMascotCanvas: React.FC<HeroMascotCanvasProps> = ({
  orbPhase,
  mousePos
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(orbPhase);
  const mouseRef = useRef(mousePos);

  phaseRef.current = orbPhase;
  mouseRef.current = mousePos;

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

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Luxury Ruby Red, Crimson Pink & Champagne Gold Lighting
    const ambientLight = new THREE.AmbientLight(0x240612, 1.8);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xFFD36A, 3.5);
    goldKeyLight.position.set(4, 6, 5);
    scene.add(goldKeyLight);

    const crimsonRimLight = new THREE.DirectionalLight(0xD41450, 3.0);
    crimsonRimLight.position.set(-5, -3, 3);
    scene.add(crimsonRimLight);

    const orbLight = new THREE.PointLight(0xFFD36A, 0, 12);
    scene.add(orbLight);

    // 1. Magical Golden Energy Orb
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const coreGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xFFD36A,
      emissive: 0xFFD36A,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbGroup.add(coreMesh);

    const auraGeo = new THREE.SphereGeometry(0.52, 24, 24);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xD99A24,
      transparent: true,
      opacity: 0.42,
      blending: THREE.NormalBlending,
      depthWrite: false
    });
    const auraMesh = new THREE.Mesh(auraGeo, auraMat);
    orbGroup.add(auraMesh);

    const haloGeo = new THREE.TorusGeometry(0.58, 0.022, 12, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xB87B0E,
      transparent: true,
      opacity: 0.9
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    orbGroup.add(haloMesh);

    // 2. Glowing Gold & Crimson Particle Trail from Pointing Hand to Top Message
    const handPos = new THREE.Vector3(-0.65, -0.85, 0.95);
    const midPos = new THREE.Vector3(-0.95, 0.55, 1.35);
    const destPos = new THREE.Vector3(-0.25, 1.85, 0.6);

    const trailCurve = new THREE.CatmullRomCurve3([handPos, midPos, destPos]);
    const trailPoints = trailCurve.getPoints(64);
    const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
    const trailMat = new THREE.LineBasicMaterial({
      color: 0xD99A24,
      transparent: true,
      opacity: 0,
      blending: THREE.NormalBlending
    });
    const trailLine = new THREE.Line(trailGeo, trailMat);
    scene.add(trailLine);

    // 3. Sparkling Gold & Crimson Particles
    const sparkCount = isSoftwareGl ? 75 : 160;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);
    const cGold = new THREE.Color(0xD99A24);
    const cCrimson = new THREE.Color(0xB5003A);

    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 6.5;
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 3.0;

      const c = i % 3 === 0 ? cCrimson : cGold;
      sparkColors[i * 3] = c.r;
      sparkColors[i * 3 + 1] = c.g;
      sparkColors[i * 3 + 2] = c.b;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));

    const sparkMat = new THREE.PointsMaterial({
      size: 0.095,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.NormalBlending,
      depthWrite: false
    });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    rootGroup.add(sparkPoints);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let frameId = 0;
    const clock = new THREE.Clock();
    let floatProgress = 0;
    let currentOrbScale = 0.001;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.05);
      const phase = phaseRef.current;
      const mouse = mouseRef.current;

      let targetScale = 0.001;
      let targetLight = 0;
      let targetTrailOpacity = 0;

      if (phase === 'hidden') {
        targetScale = 0.001;
        targetLight = 0;
        targetTrailOpacity = 0;
        floatProgress = 0;
      } else if (phase === 'ignite') {
        targetScale = 0.45;
        targetLight = 3.2;
        floatProgress = 0;
      } else if (phase === 'grow') {
        targetScale = 1.1;
        targetLight = 6.2;
        floatProgress = 0;
      } else if (phase === 'float') {
        targetScale = 1.18;
        targetLight = 6.8;
        targetTrailOpacity = 0.85;
        floatProgress = Math.min(1, floatProgress + delta * 0.95);
      } else if (phase === 'revealed') {
        targetScale = 0.55 + Math.sin(elapsed * 2.4) * 0.06;
        targetLight = 3.2;
        targetTrailOpacity = 0.4;
        floatProgress = 1;
      }

      currentOrbScale = THREE.MathUtils.lerp(currentOrbScale, targetScale, 0.1);
      orbGroup.scale.set(currentOrbScale, currentOrbScale, currentOrbScale);

      const posOnCurve = trailCurve.getPoint(floatProgress);
      orbGroup.position.copy(posOnCurve);
      if (phase === 'revealed') {
        orbGroup.position.y += Math.sin(elapsed * 2.0) * 0.07;
        orbGroup.position.x += Math.cos(elapsed * 1.5) * 0.05;
      }

      orbLight.position.copy(orbGroup.position);
      orbLight.intensity = THREE.MathUtils.lerp(orbLight.intensity, targetLight, 0.1);
      trailMat.opacity = THREE.MathUtils.lerp(trailMat.opacity, targetTrailOpacity, 0.08);

      haloMesh.rotation.x = elapsed * 1.5;
      haloMesh.rotation.y = elapsed * 1.2;

      sparkPoints.rotation.y = elapsed * 0.06;
      sparkPoints.rotation.x = Math.sin(elapsed * 0.3) * 0.08;

      rootGroup.rotation.y = THREE.MathUtils.lerp(rootGroup.rotation.y, mouse.x * 0.16, 0.06);
      rootGroup.rotation.x = THREE.MathUtils.lerp(rootGroup.rotation.x, -mouse.y * 0.1, 0.06);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      auraGeo.dispose();
      auraMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      trailGeo.dispose();
      trailMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-20"
      aria-hidden="true"
    />
  );
};
