import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroMascotCanvas } from './3d/HeroMascotCanvas';

type OrbPhase = 'hidden' | 'ignite' | 'grow' | 'float' | 'revealed';

const LINE_1 = 'Give a Miracle to Your';
const LINE_2 = 'Business Growth';
const MASCOT_SRC =
  '/assets/aistudio/WhatsApp_Image_2026-10-15_at_4.06.30_PM-removebg-preview_0d735c0d.png';

export const HeroMascotStage: React.FC = () => {
  const [orbPhase, setOrbPhase] = useState<OrbPhase>('hidden');
  const [rotateY, setRotateY] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRotateY(0);
      setOrbPhase('revealed');
      return;
    }

    // Continuous animation sequence:
    // 0.0s -> 1.6s: Lion starts facing viewer (0deg) and slowly rotates to the left (-18deg side-facing angle)
    // 1.6s -> 3.2s: Lion returns smoothly to the original front-facing position (0deg)
    // 3.2s -> 3.8s: Golden orb ignites near the pointing hand
    // 3.8s -> 4.6s: Golden orb grows with sparkling gold particles
    // 4.6s -> 5.6s: Golden orb floats upward
    // 5.6s -> 8.6s: Orb transforms into "Give a Miracle to Your / Business Growth"
    // 8.6s -> 9.4s: Brief pause before repeating the rotation & magic cycle
    const CYCLE_MS = 9400;
    const start = performance.now();
    let rafId = 0;

    const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

    const tick = (now: number) => {
      const elapsed = (now - start) % CYCLE_MS;

      if (elapsed < 1600) {
        // Rotate smoothly from 0deg to -18deg (left side-facing angle)
        const t = easeInOutSine(elapsed / 1600);
        setRotateY(-18 * t);
        setOrbPhase('hidden');
      } else if (elapsed < 3200) {
        // Return smoothly from -18deg back to 0deg (front-facing)
        const t = easeInOutSine((elapsed - 1600) / 1600);
        setRotateY(-18 * (1 - t));
        setOrbPhase('hidden');
      } else {
        setRotateY(0);
        const post = elapsed - 3200;

        if (post < 600) {
          setOrbPhase('ignite');
        } else if (post < 1400) {
          setOrbPhase('grow');
        } else if (post < 2400) {
          setOrbPhase('float');
        } else {
          setOrbPhase('revealed');
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const showMessage = orbPhase === 'revealed';
  const line2StartDelay = LINE_1.length * 0.025 + 0.08;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center select-none"
    >
      {/* Ambient Champagne Gold & Ruby Red Stage Glows */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#FFD36A]/40 filter blur-3xl pointer-events-none" />
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#B5003A]/12 filter blur-3xl translate-x-10 -translate-y-6 pointer-events-none" />

      {/* 3D Three.js Golden Energy Orb & Sparkling Gold Particle Trail */}
      <HeroMascotCanvas orbPhase={orbPhase} mousePos={mousePos} />

      {/* Floating Two-Line Magical Message (Completely Transparent Background) */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            key="magical-message"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `perspective(900px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * 4}deg)`
            }}
            className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-auto max-w-xs sm:max-w-sm z-30 pointer-events-none bg-transparent text-center"
          >
            {/* Line 1: Give a Miracle to Your */}
            <p
              className="font-heading font-bold text-lg sm:text-xl leading-snug text-[#B5003A]"
              style={{
                textShadow:
                  '0 0 14px rgba(255, 211, 106, 0.95), 0 0 26px rgba(255, 211, 106, 0.75), 0 1px 2px rgba(255, 253, 249, 0.9)'
              }}
            >
              {LINE_1.split('').map((char, idx) => (
                <motion.span
                  key={`l1-${idx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: idx * 0.025,
                    ease: 'easeOut'
                  }}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </p>

            {/* Line 2: Business Growth (Larger, Bold, Appears Smoothly Underneath) */}
            <p
              className="font-heading font-extrabold text-2xl sm:text-3xl leading-tight text-[#B5003A] mt-0.5"
              style={{
                textShadow:
                  '0 0 18px rgba(255, 211, 106, 1), 0 0 32px rgba(255, 211, 106, 0.85), 0 1px 2px rgba(255, 253, 249, 0.95)'
              }}
            >
              {LINE_2.split('').map((char, idx) => (
                <motion.span
                  key={`l2-${idx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.22,
                    delay: line2StartDelay + idx * 0.028,
                    ease: 'easeOut'
                  }}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Smiling Lion Mascot with CSS 3D Rotation & Gentle Floating Effect */}
      <motion.div
        animate={{
          y: [0, -10, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 4.4,
          ease: 'easeInOut'
        }}
        className="relative z-10 flex items-center justify-center h-[370px] sm:h-[430px] lg:h-[470px] mt-14 sm:mt-16"
      >
        <div
          style={{
            transform: `perspective(1100px) rotateY(${rotateY + mousePos.x * 6}deg) rotateX(${mousePos.y * 4}deg)`,
            transformStyle: 'preserve-3d'
          }}
          className="relative h-full flex items-center justify-center transition-transform duration-100 ease-out"
        >
          {/* Warm Champagne Gold & Ruby Rim Backlight behind Mascot */}
          <div
            className="absolute inset-4 rounded-full bg-gradient-to-t from-[#FFD36A]/45 via-[#D99A24]/20 to-[#B5003A]/15 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Exact Uploaded Transparent PNG Lion Mascot */}
          <img
            src={MASCOT_SRC}
            alt="MR Miracle Smiling Lion Mascot wearing glasses and red MR Miracle T-shirt"
            className="relative z-10 h-full w-auto object-contain drop-shadow-[0_18px_32px_rgba(26,17,21,0.22)]"
          />

          {/* Subtle Golden Glow near the Pointing Hand during Ignition/Growth */}
          {(orbPhase === 'ignite' || orbPhase === 'grow') && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0.4 }}
              animate={{
                scale: orbPhase === 'grow' ? [1, 1.4, 1.15] : [0.5, 0.9, 0.7],
                opacity: [0.75, 1, 0.85]
              }}
              transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
              className="absolute left-[26%] top-[66%] w-14 h-14 rounded-full bg-gradient-to-r from-[#FFD36A] via-[#D99A24] to-[#D41450] blur-md pointer-events-none z-20"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};
