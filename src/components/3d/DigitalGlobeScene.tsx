import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const DigitalGlobeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

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
    camera.position.set(0, 0, 6.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Globe Points Sphere (Gold & Crimson Pink)
    const globeRadius = 2.1;
    const pointCount = 1200;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    const gold = new THREE.Color(0xFFD36A);
    const crimson = new THREE.Color(0xD41450);

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / pointCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.cos(phi);
      const z = globeRadius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const c = Math.random() > 0.45 ? gold : crimson;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });
    const globePoints = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(globePoints);

    // 2. Translucent Inner Core Sphere (Deep Burgundy)
    const innerGeo = new THREE.SphereGeometry(globeRadius * 0.96, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x12050B,
      transparent: true,
      opacity: 0.92
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // 3. Latitude Rings (Metallic Gold)
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xD99A24,
      transparent: true,
      opacity: 0.32
    });
    for (let lat = -60; lat <= 60; lat += 30) {
      const r = globeRadius * Math.cos((lat * Math.PI) / 180);
      const y = globeRadius * Math.sin((lat * Math.PI) / 180);
      const circleGeo = new THREE.BufferGeometry();
      const pts: number[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const a = (j / segments) * Math.PI * 2;
        pts.push(r * Math.cos(a), y, r * Math.sin(a));
      }
      circleGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const line = new THREE.Line(circleGeo, ringMat);
      globeGroup.add(line);
    }

    // 4. Hub Nodes
    const hubCoords = [
      { lat: 10, lon: 77, name: 'India HQ (Tamil Nadu)' },
      { lat: 25, lon: 55, name: 'Dubai / MENA' },
      { lat: 51, lon: 0, name: 'London / Europe' },
      { lat: 40, lon: -74, name: 'New York / US' },
      { lat: 1, lon: 103, name: 'Singapore' },
      { lat: 35, lon: 139, name: 'Tokyo' },
      { lat: -33, lon: 151, name: 'Sydney' }
    ];

    const toVector = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const nodeVectors = hubCoords.map(c => toVector(c.lat, c.lon, globeRadius));
    const nodeMeshes: THREE.Mesh[] = [];

    nodeVectors.forEach((pos, idx) => {
      const isHQ = idx === 0;
      const nodeGeo = new THREE.SphereGeometry(isHQ ? 0.12 : 0.08, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: isHQ ? 0xFFD36A : 0xD41450
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      globeGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      const beaconGeo = new THREE.RingGeometry(0.1, 0.16, 24);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: isHQ ? 0xFFD36A : 0xB5003A,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos.clone().multiplyScalar(1.02));
      beacon.lookAt(0, 0, 0);
      globeGroup.add(beacon);
    });

    // 5. Connection Arcs (Glowing Red & Gold Light Trails)
    const arcCurves: THREE.CatmullRomCurve3[] = [];
    const arcLines: THREE.Line[] = [];
    const packetMeshes: THREE.Mesh[] = [];

    for (let i = 1; i < nodeVectors.length; i++) {
      const start = nodeVectors[0];
      const end = nodeVectors[i];
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(globeRadius + dist * 0.35);

      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      arcCurves.push(curve);

      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0xFFD36A : 0xD41450,
        transparent: true,
        opacity: 0.65
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(arcLine);
      arcLines.push(arcLine);

      const packetGeo = new THREE.SphereGeometry(0.055, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0xFFD36A
      });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      globeGroup.add(packet);
      packetMeshes.push(packet);
    }

    // 6. Equatorial Orbital Ring (Metallic Gold)
    const orbit1Geo = new THREE.TorusGeometry(3.1, 0.022, 16, 100);
    const orbit1Mat = new THREE.MeshBasicMaterial({
      color: 0xD99A24,
      transparent: true,
      opacity: 0.45
    });
    const orbit1 = new THREE.Mesh(orbit1Geo, orbit1Mat);
    orbit1.rotation.x = Math.PI / 3;
    globeGroup.add(orbit1);

    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener('mousemove', onPointerMove, { passive: true });

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

      const scrollRotation = scrollY * 0.0015;
      globeGroup.rotation.y = elapsed * 0.12 + scrollRotation;
      orbit1.rotation.z = elapsed * 0.2;

      arcCurves.forEach((curve, i) => {
        const t = (elapsed * 0.4 + i * 0.2) % 1;
        const pos = curve.getPoint(t);
        if (packetMeshes[i]) {
          packetMeshes[i].position.copy(pos);
        }
      });

      nodeMeshes.forEach((mesh, idx) => {
        const s = 1.0 + Math.sin(elapsed * 4 + idx) * 0.25;
        mesh.scale.set(s, s, s);
      });

      targetX += (pointerY * 0.3 - targetX) * 0.05;
      targetY += (pointerX * 0.3 - targetY) * 0.05;
      globeGroup.rotation.x = targetX + 0.1;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      container.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      pointsGeo.dispose();
      pointsMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      orbit1Geo.dispose();
      orbit1Mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] flex items-center justify-center">
      <div className="absolute w-72 h-72 rounded-full bg-[#B5003A]/15 filter blur-3xl pointer-events-none" />
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Interactive 3D Digital Globe - Connecting Brands & Markets"
      />
    </div>
  );
};
