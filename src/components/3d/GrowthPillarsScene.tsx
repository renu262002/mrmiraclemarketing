import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GrowthPillarsSceneProps {
  activeIndex: number;
  onSelectIndex?: (idx: number) => void;
}

export const GrowthPillarsScene: React.FC<GrowthPillarsSceneProps> = ({ activeIndex, onSelectIndex }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

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
    camera.position.set(0, 1.8, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const ambientLight = new THREE.AmbientLight(0x1f0812, 1.8);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xFFD36A, 3.4);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xD41450, 2.8);
    rimLight.position.set(-5, -5, -4);
    scene.add(rimLight);

    // Central Core: Ruby-Red & Metallic Hexagonal Monolith
    const coreGeo = new THREE.CylinderGeometry(1.0, 1.3, 2.6, 6);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x240510,
      emissive: 0xB5003A,
      emissiveIntensity: 0.45,
      roughness: 0.18,
      metalness: 0.88,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Champagne Gold Wireframe Cage
    const wireGeo = new THREE.CylinderGeometry(1.05, 1.35, 2.65, 6);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xFFD36A,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    const innerLight = new THREE.PointLight(0xFFD36A, 3, 10);
    mainGroup.add(innerLight);

    // Metallic Gold Orbital Ring
    const orbitRingGeo = new THREE.TorusGeometry(3.0, 0.032, 16, 80);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xD99A24,
      transparent: true,
      opacity: 0.48
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.3;
    mainGroup.add(orbitRing);

    const satelliteCount = 6;
    const satellites: THREE.Mesh[] = [];
    const beamLines: THREE.Line[] = [];
    const satelliteGeos: THREE.BufferGeometry[] = [];
    const satelliteMats: THREE.MeshStandardMaterial[] = [];

    const colors = [
      0xFFD36A, // 1. Creative Thinking (Champagne Gold)
      0xD41450, // 2. Customized Strategies (Crimson Pink)
      0xD99A24, // 3. Results-Focused (Metallic Gold)
      0xB5003A, // 4. Complete Digital (Ruby Red)
      0xFFD36A, // 5. Transparent Comm (Champagne Gold)
      0xD41450  // 6. Long-Term Partnership (Crimson Pink)
    ];

    for (let i = 0; i < satelliteCount; i++) {
      const satGeo = new THREE.OctahedronGeometry(0.35, 0);
      satelliteGeos.push(satGeo);

      const satMat = new THREE.MeshStandardMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.45,
        roughness: 0.14,
        metalness: 0.9,
        flatShading: true
      });
      satelliteMats.push(satMat);

      const satMesh = new THREE.Mesh(satGeo, satMat);
      mainGroup.add(satMesh);
      satellites.push(satMesh);

      const beamGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
      ]);
      const beamMat = new THREE.LineBasicMaterial({
        color: colors[i],
        transparent: true,
        opacity: 0.4
      });
      const beamLine = new THREE.Line(beamGeo, beamMat);
      mainGroup.add(beamLine);
      beamLines.push(beamLine);
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(satellites);
      if (intersects.length > 0) {
        const hitIdx = satellites.indexOf(intersects[0].object as THREE.Mesh);
        if (hitIdx !== -1 && onSelectIndex) {
          onSelectIndex(hitIdx);
        }
      }
    };
    container.addEventListener('click', handleClick);

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
      const currentActive = activeRef.current;

      coreMesh.rotation.y = elapsed * 0.2;
      wireMesh.rotation.y = -elapsed * 0.15;

      satellites.forEach((sat, i) => {
        const baseAngle = (i * Math.PI * 2) / satelliteCount;
        const angle = baseAngle + elapsed * 0.25;
        const orbitR = 3.0;

        const x = Math.cos(angle) * orbitR;
        const z = Math.sin(angle) * orbitR;
        const y = Math.sin(elapsed * 1.5 + i) * 0.35;

        sat.position.set(x, y, z);
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;

        const isActive = currentActive === i;
        const targetScale = isActive ? 1.6 : 1.0;
        sat.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        satelliteMats[i].emissiveIntensity = isActive ? 1.0 : 0.4;

        const positions = new Float32Array([
          0, 0, 0,
          sat.position.x, sat.position.y, sat.position.z
        ]);
        beamLines[i].geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        (beamLines[i].material as THREE.LineBasicMaterial).opacity = isActive ? 0.9 : 0.28;
      });

      mainGroup.rotation.y = elapsed * 0.05 + pointerX * 0.3;
      mainGroup.rotation.x = pointerY * 0.2;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();
      satelliteGeos.forEach(g => g.dispose());
      satelliteMats.forEach(m => m.dispose());
      beamLines.forEach(b => {
        b.geometry.dispose();
        (b.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [onSelectIndex]);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] flex items-center justify-center">
      <div className="absolute w-72 h-72 rounded-full bg-[#B5003A]/15 filter blur-3xl pointer-events-none" />
      <div
        ref={mountRef}
        className="w-full h-full cursor-pointer relative z-10"
        title="Interactive 3D Growth Core & Pillars - Click satellites or select reasons"
      />
    </div>
  );
};
