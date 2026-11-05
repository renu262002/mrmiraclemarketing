import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ServiceMiniCanvasProps {
  iconType: 'code' | 'search' | 'share' | 'target' | 'ad' | 'linkedin' | 'email' | 'local';
  isHovered: boolean;
}

export const ServiceMiniCanvas: React.FC<ServiceMiniCanvasProps> = ({ iconType, isHovered }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(isHovered);
  hoverRef.current = isHovered;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 96;
    const height = 96;

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
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'low-power'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Luxury Gold & Crimson Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(amb);
    const key = new THREE.DirectionalLight(0xFFD36A, 3.2);
    key.position.set(3, 3, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xD41450, 2.8);
    rim.position.set(-3, -3, -2);
    scene.add(rim);

    const disposables: { geo?: THREE.BufferGeometry; mat?: THREE.Material }[] = [];
    const track = <T extends THREE.BufferGeometry | THREE.Material>(item: T): T => {
      if (item instanceof THREE.BufferGeometry) disposables.push({ geo: item });
      else disposables.push({ mat: item });
      return item;
    };

    // Animated references for custom 3D objects
    let customUpdate: ((elapsed: number, speed: number) => void) | null = null;

    if (iconType === 'code') {
      const boxGeo = track(new THREE.BoxGeometry(1.2, 1.2, 1.2));
      const boxMat = track(
        new THREE.MeshBasicMaterial({
          color: 0xFFD36A,
          wireframe: true,
          transparent: true,
          opacity: 0.85
        })
      );
      group.add(new THREE.Mesh(boxGeo, boxMat));

      const coreGeo = track(new THREE.OctahedronGeometry(0.55, 0));
      const coreMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xD41450,
          emissive: 0xB5003A,
          roughness: 0.18,
          metalness: 0.85
        })
      );
      group.add(new THREE.Mesh(coreGeo, coreMat));
    } else if (iconType === 'search') {
      const ringGeo = track(new THREE.TorusGeometry(0.9, 0.08, 16, 64));
      const ringMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xD99A24,
          emissive: 0xD99A24,
          emissiveIntensity: 0.35,
          metalness: 0.92,
          roughness: 0.12
        })
      );
      group.add(new THREE.Mesh(ringGeo, ringMat));

      const centerGeo = track(new THREE.OctahedronGeometry(0.5, 0));
      const centerMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xD41450,
          emissive: 0xB5003A,
          metalness: 0.82,
          roughness: 0.2
        })
      );
      group.add(new THREE.Mesh(centerGeo, centerMat));
    } else if (iconType === 'share') {
      const knotGeo = track(new THREE.TorusKnotGeometry(0.65, 0.18, 64, 12, 2, 3));
      const knotMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xD41450,
          emissive: 0xB5003A,
          emissiveIntensity: 0.45,
          roughness: 0.18,
          metalness: 0.86
        })
      );
      group.add(new THREE.Mesh(knotGeo, knotMat));
    } else if (iconType === 'target') {
      const r1Geo = track(new THREE.TorusGeometry(0.95, 0.04, 16, 48));
      const r1Mat = track(new THREE.MeshBasicMaterial({ color: 0xFFD36A }));
      group.add(new THREE.Mesh(r1Geo, r1Mat));

      const r2Geo = track(new THREE.TorusGeometry(0.6, 0.04, 16, 48));
      const r2Mat = track(new THREE.MeshBasicMaterial({ color: 0xD41450 }));
      group.add(new THREE.Mesh(r2Geo, r2Mat));

      const sphereGeo = track(new THREE.SphereGeometry(0.25, 16, 16));
      const sphereMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xFFD36A,
          emissive: 0xD99A24,
          emissiveIntensity: 0.8
        })
      );
      group.add(new THREE.Mesh(sphereGeo, sphereMat));
    } else if (iconType === 'ad') {
      const pyrGeo = track(new THREE.ConeGeometry(0.8, 1.2, 4));
      const pyrMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xD99A24,
          emissive: 0xB5003A,
          emissiveIntensity: 0.35,
          roughness: 0.14,
          metalness: 0.92,
          flatShading: true
        })
      );
      group.add(new THREE.Mesh(pyrGeo, pyrMat));

      const ringGeo = track(new THREE.TorusGeometry(1.0, 0.03, 16, 48));
      const ringMat = track(new THREE.MeshBasicMaterial({ color: 0xD41450 }));
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      group.add(ring);
    } else if (iconType === 'linkedin') {
      // Floating 3D Professional Profile Card + Connection Nodes + Animated Gold Connection Lines
      const cardGeo = track(new THREE.BoxGeometry(1.25, 1.55, 0.08));
      const cardMat = track(
        new THREE.MeshStandardMaterial({
          color: 0x240510,
          emissive: 0xB5003A,
          emissiveIntensity: 0.35,
          roughness: 0.2,
          metalness: 0.85
        })
      );
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      group.add(cardMesh);

      // Gold Card Border Frame
      const frameGeo = track(new THREE.EdgesGeometry(cardGeo));
      const frameMat = track(new THREE.LineBasicMaterial({ color: 0xFFD36A }));
      group.add(new THREE.LineSegments(frameGeo, frameMat));

      // Profile Avatar Sphere on Card
      const avatarGeo = track(new THREE.SphereGeometry(0.26, 20, 20));
      const avatarMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xFFD36A,
          emissive: 0xD99A24,
          emissiveIntensity: 0.5,
          metalness: 0.9,
          roughness: 0.15
        })
      );
      const avatar = new THREE.Mesh(avatarGeo, avatarMat);
      avatar.position.set(0, 0.32, 0.07);
      group.add(avatar);

      // Profile Bio Bar
      const barGeo = track(new THREE.BoxGeometry(0.75, 0.1, 0.04));
      const barMat = track(new THREE.MeshBasicMaterial({ color: 0xD99A24 }));
      const bar1 = new THREE.Mesh(barGeo, barMat);
      bar1.position.set(0, -0.15, 0.06);
      group.add(bar1);

      // Orbiting Connection Nodes & Gold Connection Lines
      const nodeCount = 4;
      const nodes: THREE.Mesh[] = [];
      const lines: THREE.Line[] = [];
      const nodeGeo = track(new THREE.SphereGeometry(0.11, 14, 14));
      const nodeMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xFFD36A,
          emissive: 0xD41450,
          emissiveIntensity: 0.6,
          metalness: 0.9,
          roughness: 0.15
        })
      );
      const lineMat = track(
        new THREE.LineBasicMaterial({
          color: 0xFFD36A,
          transparent: true,
          opacity: 0.75
        })
      );

      for (let i = 0; i < nodeCount; i++) {
        const n = new THREE.Mesh(nodeGeo, nodeMat);
        group.add(n);
        nodes.push(n);

        const lGeo = track(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0.32, 0.07),
            new THREE.Vector3(1, 0, 0)
          ])
        );
        const l = new THREE.Line(lGeo, lineMat);
        group.add(l);
        lines.push(l);
      }

      customUpdate = (elapsed, speed) => {
        group.rotation.y = Math.sin(elapsed * 0.8 * speed) * 0.45;
        group.rotation.x = Math.cos(elapsed * 0.6 * speed) * 0.18;

        nodes.forEach((n, idx) => {
          const angle = elapsed * 1.1 * speed + (idx * Math.PI * 2) / nodeCount;
          const r = 1.15;
          const nx = Math.cos(angle) * r;
          const ny = Math.sin(angle) * r * 0.75;
          const nz = Math.sin(angle * 2) * 0.45;
          n.position.set(nx, ny, nz);

          const posAttr = lines[idx].geometry.attributes.position as THREE.BufferAttribute;
          posAttr.setXYZ(0, 0, 0.32, 0.07);
          posAttr.setXYZ(1, nx, ny, nz);
          posAttr.needsUpdate = true;
        });
      };
    } else if (iconType === 'email') {
      // 3D Envelope with Floating Email Cards & Animated Message Trails
      const envGroup = new THREE.Group();
      group.add(envGroup);

      const envGeo = track(new THREE.BoxGeometry(1.45, 0.95, 0.12));
      const envMat = track(
        new THREE.MeshStandardMaterial({
          color: 0x240510,
          emissive: 0xB5003A,
          emissiveIntensity: 0.4,
          roughness: 0.2,
          metalness: 0.85
        })
      );
      envGroup.add(new THREE.Mesh(envGeo, envMat));

      const envEdges = track(new THREE.EdgesGeometry(envGeo));
      const envEdgeMat = track(new THREE.LineBasicMaterial({ color: 0xD99A24 }));
      envGroup.add(new THREE.LineSegments(envEdges, envEdgeMat));

      // Envelope Flap (Gold Triangle Prism)
      const flapGeo = track(new THREE.ConeGeometry(0.75, 0.55, 4));
      flapGeo.rotateY(Math.PI / 4);
      flapGeo.rotateX(Math.PI);
      const flapMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xD99A24,
          emissive: 0xD99A24,
          emissiveIntensity: 0.3,
          metalness: 0.92,
          roughness: 0.15,
          flatShading: true
        })
      );
      const flap = new THREE.Mesh(flapGeo, flapMat);
      flap.position.set(0, 0.22, 0.08);
      flap.scale.set(1.3, 1, 0.2);
      envGroup.add(flap);

      // Floating Email Cards rising from envelope
      const cardGeo = track(new THREE.BoxGeometry(0.75, 0.5, 0.04));
      const cardMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xFFD36A,
          emissive: 0xD41450,
          emissiveIntensity: 0.35,
          metalness: 0.85,
          roughness: 0.18
        })
      );
      const floatingCards: THREE.Mesh[] = [];
      for (let i = 0; i < 3; i++) {
        const c = new THREE.Mesh(cardGeo, cardMat);
        group.add(c);
        floatingCards.push(c);
      }

      // Animated Message Trail Particles
      const trailCount = 24;
      const trailGeo = track(new THREE.BufferGeometry());
      const trailPos = new Float32Array(trailCount * 3);
      trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
      const trailMat = track(
        new THREE.PointsMaterial({
          size: 0.07,
          color: 0xFFD36A,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending
        })
      );
      group.add(new THREE.Points(trailGeo, trailMat));

      customUpdate = (elapsed, speed) => {
        group.rotation.y = Math.sin(elapsed * 0.7 * speed) * 0.4;
        group.rotation.x = 0.2;

        floatingCards.forEach((c, idx) => {
          const phase = (elapsed * 0.55 * speed + idx * 0.33) % 1;
          c.position.y = -0.1 + phase * 1.35;
          c.position.x = Math.sin(phase * Math.PI * 2 + idx) * 0.35;
          c.position.z = 0.2 + idx * 0.12;
          c.rotation.z = Math.sin(elapsed * 2 + idx) * 0.15;
          const s = Math.sin(phase * Math.PI);
          c.scale.set(s, s, s);
        });

        const posAttr = trailGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < trailCount; i++) {
          const t = (i / trailCount) * Math.PI * 2 + elapsed * 2 * speed;
          posAttr.setXYZ(
            i,
            Math.cos(t) * 0.65,
            -0.2 + (i / trailCount) * 1.4,
            Math.sin(t) * 0.45
          );
        }
        posAttr.needsUpdate = true;
      };
    } else {
      // Local SEO: Floating 3D Map with Glowing Location Pins & Animated Connection Lines
      const mapGeo = track(new THREE.BoxGeometry(1.65, 0.08, 1.35));
      const mapMat = track(
        new THREE.MeshStandardMaterial({
          color: 0x1E0712,
          emissive: 0xB5003A,
          emissiveIntensity: 0.3,
          roughness: 0.25,
          metalness: 0.8
        })
      );
      const mapBase = new THREE.Mesh(mapGeo, mapMat);
      mapBase.rotation.x = 0.45;
      group.add(mapBase);

      const mapEdges = track(new THREE.EdgesGeometry(mapGeo));
      const mapEdgeMat = track(new THREE.LineBasicMaterial({ color: 0xD99A24 }));
      const mapWire = new THREE.LineSegments(mapEdges, mapEdgeMat);
      mapWire.rotation.x = 0.45;
      group.add(mapWire);

      // 3 Glowing Location Pins
      const pinOffsets = [
        new THREE.Vector3(0, 0.25, 0),
        new THREE.Vector3(-0.48, 0.18, 0.25),
        new THREE.Vector3(0.45, 0.2, -0.22)
      ];

      const pinHeadGeo = track(new THREE.SphereGeometry(0.15, 16, 16));
      const pinTipGeo = track(new THREE.ConeGeometry(0.11, 0.28, 12));
      pinTipGeo.rotateX(Math.PI);

      const pinMatGold = track(
        new THREE.MeshStandardMaterial({
          color: 0xFFD36A,
          emissive: 0xD99A24,
          emissiveIntensity: 0.85,
          metalness: 0.9,
          roughness: 0.1
        })
      );
      const pinMatCrimson = track(
        new THREE.MeshStandardMaterial({
          color: 0xD41450,
          emissive: 0xB5003A,
          emissiveIntensity: 0.75,
          metalness: 0.85,
          roughness: 0.15
        })
      );

      const pins: THREE.Group[] = [];
      pinOffsets.forEach((offset, idx) => {
        const pGroup = new THREE.Group();
        const mat = idx === 0 ? pinMatGold : pinMatCrimson;
        const head = new THREE.Mesh(pinHeadGeo, mat);
        head.position.y = 0.16;
        const tip = new THREE.Mesh(pinTipGeo, mat);
        pGroup.add(head);
        pGroup.add(tip);
        pGroup.position.copy(offset);
        group.add(pGroup);
        pins.push(pGroup);
      });

      // Animated Connection Lines between Pins
      const connGeo = track(
        new THREE.BufferGeometry().setFromPoints([
          pinOffsets[0],
          pinOffsets[1],
          pinOffsets[0],
          pinOffsets[2]
        ])
      );
      const connMat = track(
        new THREE.LineBasicMaterial({
          color: 0xFFD36A,
          transparent: true,
          opacity: 0.85
        })
      );
      const connLines = new THREE.LineSegments(connGeo, connMat);
      group.add(connLines);

      customUpdate = (elapsed, speed) => {
        group.rotation.y = elapsed * 0.55 * speed;
        pins.forEach((p, idx) => {
          const bounce = Math.sin(elapsed * 3 * speed + idx * 1.4) * 0.1;
          p.position.y = pinOffsets[idx].y + bounce;
        });

        const posAttr = connGeo.attributes.position as THREE.BufferAttribute;
        posAttr.setXYZ(0, pins[0].position.x, pins[0].position.y, pins[0].position.z);
        posAttr.setXYZ(1, pins[1].position.x, pins[1].position.y, pins[1].position.z);
        posAttr.setXYZ(2, pins[0].position.x, pins[0].position.y, pins[0].position.z);
        posAttr.setXYZ(3, pins[2].position.x, pins[2].position.y, pins[2].position.z);
        posAttr.needsUpdate = true;
      };
    }

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const isHover = hoverRef.current;
      const speedMultiplier = isHover ? 2.4 : 1.0;

      if (customUpdate) {
        customUpdate(elapsed, speedMultiplier);
      } else {
        group.rotation.x = elapsed * 0.4 * speedMultiplier;
        group.rotation.y = elapsed * 0.6 * speedMultiplier;
      }

      const targetScale = isHover ? 1.16 : 1.0;
      group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      disposables.forEach(d => {
        d.geo?.dispose();
        d.mat?.dispose();
      });
      renderer.dispose();
    };
  }, [iconType]);

  return (
    <div
      ref={mountRef}
      className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0"
    />
  );
};
