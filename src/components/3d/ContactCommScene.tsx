import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ContactCommScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 6.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const commGroup = new THREE.Group();
    scene.add(commGroup);

    const amb = new THREE.AmbientLight(0x1f0812, 1.5);
    scene.add(amb);
    const light = new THREE.DirectionalLight(0xFFD36A, 3.2);
    light.position.set(4, 5, 4);
    scene.add(light);
    const crimsonLight = new THREE.DirectionalLight(0xD41450, 2.8);
    crimsonLight.position.set(-4, -2, -3);
    scene.add(crimsonLight);

    // 1. Central Transmitter Beacon (Ruby Red & Metallic)
    const beaconGeo = new THREE.CylinderGeometry(0.18, 0.45, 3.2, 8);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0x240510,
      emissive: 0xB5003A,
      emissiveIntensity: 0.55,
      roughness: 0.18,
      metalness: 0.9,
      flatShading: true
    });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    commGroup.add(beaconMesh);

    // Top Emitter Sphere (Champagne Gold)
    const topSphereGeo = new THREE.SphereGeometry(0.45, 24, 24);
    const topSphereMat = new THREE.MeshStandardMaterial({
      color: 0xFFD36A,
      emissive: 0xD99A24,
      emissiveIntensity: 0.85,
      roughness: 0.1,
      metalness: 0.92
    });
    const topSphere = new THREE.Mesh(topSphereGeo, topSphereMat);
    topSphere.position.y = 1.6;
    commGroup.add(topSphere);

    // 2. Holographic Pulse Rings (Champagne Gold & Crimson Pink)
    const ringCount = 4;
    const waveRings: THREE.Mesh[] = [];
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.RingGeometry(0.3, 0.38, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xFFD36A : 0xD41450,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.6;
      commGroup.add(ring);
      waveRings.push(ring);
    }

    // 3. Animated Light Trails (Gold & Crimson Double Helix)
    const trailCount = 90;
    const trailPositions = new Float32Array(trailCount * 3);
    const trailColors = new Float32Array(trailCount * 3);
    const gold = new THREE.Color(0xFFD36A);
    const crimson = new THREE.Color(0xD41450);

    for (let i = 0; i < trailCount; i++) {
      const c = i % 2 === 0 ? gold : crimson;
      trailColors[i * 3] = c.r;
      trailColors[i * 3 + 1] = c.g;
      trailColors[i * 3 + 2] = c.b;
    }

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

    const trailMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });
    const trailPoints = new THREE.Points(trailGeo, trailMat);
    commGroup.add(trailPoints);

    // 4. Floating Communication Nodes
    const nodesCount = 5;
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodesCount; i++) {
      const nGeo = new THREE.OctahedronGeometry(0.2, 0);
      const isGold = i % 2 === 0;
      const nMat = new THREE.MeshStandardMaterial({
        color: isGold ? 0xFFD36A : 0xD41450,
        emissive: isGold ? 0xD99A24 : 0xB5003A,
        emissiveIntensity: 0.75,
        roughness: 0.16,
        metalness: 0.88
      });
      const nodeMesh = new THREE.Mesh(nGeo, nMat);
      commGroup.add(nodeMesh);
      nodes.push(nodeMesh);
    }

    let pointerX = 0;
    let pointerY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

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

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      beaconMesh.rotation.y = elapsed * 0.4;
      topSphere.rotation.y = -elapsed * 0.6;

      waveRings.forEach((ring, i) => {
        const offset = (elapsed * 0.6 + i * 0.25) % 1;
        const scale = 1.0 + offset * 5.5;
        ring.scale.set(scale, scale, scale);
        (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.85 * (1 - offset));
      });

      const posAttr = trailGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < trailCount; i++) {
        const t = (i / trailCount) * 4 * Math.PI + elapsed * 1.5;
        const h = ((i / trailCount) * 3.5 - 1.5 + Math.sin(elapsed) * 0.2);
        const r = 1.2 + Math.sin(t * 0.5) * 0.3;
        const x = Math.cos(t) * r;
        const z = Math.sin(t) * r;
        posAttr.setXYZ(i, x, h, z);
      }
      posAttr.needsUpdate = true;

      nodes.forEach((n, i) => {
        const angle = elapsed * 0.7 + (i * Math.PI * 2) / nodesCount;
        const r = 2.2;
        n.position.x = Math.cos(angle) * r;
        n.position.z = Math.sin(angle) * r;
        n.position.y = Math.sin(elapsed * 2 + i) * 0.5;
        n.rotation.x += 0.02;
        n.rotation.y += 0.03;
      });

      commGroup.rotation.y = elapsed * 0.1 + pointerX * 0.25;
      commGroup.rotation.x = pointerY * 0.15;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      beaconGeo.dispose();
      beaconMat.dispose();
      topSphereGeo.dispose();
      topSphereMat.dispose();
      trailGeo.dispose();
      trailMat.dispose();
      waveRings.forEach(r => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      nodes.forEach(n => {
        n.geometry.dispose();
        (n.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center">
      <div className="absolute w-64 h-64 rounded-full bg-[#B5003A]/15 filter blur-3xl pointer-events-none" />
      <div
        ref={mountRef}
        className="w-full h-full relative z-10"
        title="Interactive 3D Communication Transmitter & Signal Trails"
      />
    </div>
  );
};
