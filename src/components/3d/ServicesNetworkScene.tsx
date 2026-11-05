import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ServicesNetworkScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
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
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    const nodeCount = 28;
    const nodeData: { mesh: THREE.Mesh; basePos: THREE.Vector3; speed: number; rotSpeed: THREE.Vector3 }[] = [];

    const geometries = [
      new THREE.IcosahedronGeometry(0.55, 0),
      new THREE.OctahedronGeometry(0.65, 0),
      new THREE.TetrahedronGeometry(0.7, 0)
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0xD99A24,
        emissive: 0xD99A24,
        emissiveIntensity: 0.35,
        roughness: 0.18,
        metalness: 0.9,
        wireframe: true
      }),
      new THREE.MeshStandardMaterial({
        color: 0xD41450,
        emissive: 0xB5003A,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.85,
        wireframe: true
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xFFD36A,
        emissive: 0xB5003A,
        emissiveIntensity: 0.35,
        roughness: 0.12,
        metalness: 0.92,
        transparent: true,
        opacity: 0.65
      })
    ];

    for (let i = 0; i < nodeCount; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      const x = (Math.random() - 0.5) * 32;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 14;

      mesh.position.set(x, y, z);
      networkGroup.add(mesh);

      nodeData.push({
        mesh,
        basePos: new THREE.Vector3(x, y, z),
        speed: 0.5 + Math.random() * 1.2,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      });
    }

    const maxDistance = 9;
    const linesGeo = new THREE.BufferGeometry();
    const maxConnections = nodeCount * (nodeCount - 1);
    const linePositions = new Float32Array(maxConnections * 6);
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xD99A24,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const lineSegments = new THREE.LineSegments(linesGeo, lineMat);
    networkGroup.add(lineSegments);

    const ambientLight = new THREE.AmbientLight(0x1f0812, 1.5);
    scene.add(ambientLight);
    const light1 = new THREE.PointLight(0xFFD36A, 3, 25);
    light1.position.set(5, 5, 8);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xD41450, 2.8, 25);
    light2.position.set(-6, -4, 6);
    scene.add(light2);

    let pointerX = 0;
    let pointerY = 0;
    const onMouseMove = (e: MouseEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 4;
      pointerY = -(e.clientY / window.innerHeight - 0.5) * 3;
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

      nodeData.forEach((item, idx) => {
        item.mesh.position.y = item.basePos.y + Math.sin(elapsed * item.speed + idx) * 0.8;
        item.mesh.position.x = item.basePos.x + Math.cos(elapsed * 0.4 + idx) * 0.4;
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;
      });

      let vertexPos = 0;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodeData[i].mesh.position.distanceTo(nodeData[j].mesh.position);
          if (dist < maxDistance) {
            linePositions[vertexPos++] = nodeData[i].mesh.position.x;
            linePositions[vertexPos++] = nodeData[i].mesh.position.y;
            linePositions[vertexPos++] = nodeData[i].mesh.position.z;
            linePositions[vertexPos++] = nodeData[j].mesh.position.x;
            linePositions[vertexPos++] = nodeData[j].mesh.position.y;
            linePositions[vertexPos++] = nodeData[j].mesh.position.z;
          }
        }
      }
      linesGeo.setDrawRange(0, vertexPos / 3);
      linesGeo.attributes.position.needsUpdate = true;

      camera.position.x += (pointerX - camera.position.x) * 0.03;
      camera.position.y += (pointerY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      networkGroup.rotation.y = elapsed * 0.03;

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
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      linesGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-45"
      aria-hidden="true"
    />
  );
};
