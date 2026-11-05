import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';

const MASCOT_SRC =
  '/assets/aistudio/WhatsApp_Image_2026-10-15_at_4.06.30_PM-removebg-preview_0d735c0d.png';

type CtaStagePhase = 'idle' | 'entering' | 'gift-orb' | 'transformed';

export const CtaMascotStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const [phase, setPhase] = useState<CtaStagePhase>('idle');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setPhase('transformed');
      return;
    }

    if (!isInView) return;

    setPhase('entering');
    const t1 = window.setTimeout(() => setPhase('gift-orb'), 850);
    const t2 = window.setTimeout(() => setPhase('transformed'), 2150);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isInView]);

  const showGiftOrb = phase === 'gift-orb';
  const showMessage = phase === 'transformed';

  return (
    <div
      ref={containerRef}
      className="relative rounded-3xl glass-panel-glow p-8 sm:p-12 lg:p-14 overflow-hidden"
    >
      {/* Ambient Ruby Red & Champagne Gold Stage Lighting */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#B5003A]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-8 w-96 h-96 rounded-full bg-[#FFD36A]/35 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left / Center Column: Golden Gift Orb Transformation -> Message & CTA */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B5003A]">
            <Sparkles className="w-4 h-4 text-[#D99A24]" />
            <span>Your Next Chapter</span>
          </div>

          {/* Gift-Like Golden Orb that transforms into the headline */}
          <div className="min-h-[150px] sm:min-h-[160px] flex flex-col justify-center items-center lg:items-start">
            {showGiftOrb && (
              <motion.div
                key="golden-gift-orb"
                initial={{ scale: 0.35, opacity: 0, rotate: -12 }}
                animate={{
                  scale: [0.4, 1.12, 1],
                  opacity: [0, 1, 1],
                  rotate: [0, 6, 0]
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center gap-4 p-5 rounded-2xl bg-[#FFFDF9] border border-[#D99A24]/60 shadow-[0_12px_36px_rgba(217,154,36,0.35),0_0_24px_rgba(181,0,58,0.15)]"
              >
                {/* Faceted Golden Gift-Like Orb */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD36A] via-[#D99A24] to-[#B5003A] flex items-center justify-center shadow-[0_0_28px_rgba(217,154,36,0.65)]">
                  <div className="absolute inset-y-0 w-2 bg-[#FFFDF9]/80 rounded-full" />
                  <div className="absolute inset-x-0 h-2 bg-[#FFFDF9]/80 rounded-full" />
                  <Gift className="relative z-10 w-7 h-7 text-[#1A1115]" />
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold">
                    Unwrapping Growth
                  </div>
                  <div className="text-sm text-[#1A1115] font-medium">
                    A tailored digital strategy awaits...
                  </div>
                </div>
              </motion.div>
            )}

            {showMessage && (
              <motion.div
                key="cta-headline"
                initial={{ opacity: 0, scale: 0.92, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight text-balance text-[#1A1115]">
                  Ready to Give Your Business a{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B5003A] via-[#D41450] to-[#B87B0E]">
                    Miracle?
                  </span>
                </h2>
                <p className="text-[#4A3B41] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Partner with MR Miracle Digital Marketing Pvt. Ltd. to build a high-converting website, dominate search rankings, and scale your brand with measurable precision.
                </p>
              </motion.div>
            )}

            {(phase === 'idle' || phase === 'entering') && (
              <div className="space-y-3 opacity-85">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-[#1A1115] leading-tight text-balance">
                  Ready to Give Your Business a{' '}
                  <span className="text-[#B5003A]">Miracle?</span>
                </h2>
                <p className="text-[#4A3B41] text-base max-w-xl mx-auto lg:mx-0">
                  Partner with MR Miracle Digital Marketing Pvt. Ltd. to build a high-converting website and scale your brand.
                </p>
              </div>
            )}
          </div>

          {/* Primary CTA Button: "Let's Talk" -> /contact */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={
              isInView || phase === 'transformed'
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.5, delay: 0.35 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_8px_28px_rgba(181,0,58,0.3)] hover:shadow-[0_12px_34px_rgba(212,20,80,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Lion Mascot Entering from Side & Turning Toward Viewer */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: 90, scale: 0.9 }}
            animate={
              isInView || phase === 'transformed'
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 90, scale: 0.9 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center h-[300px] sm:h-[340px] lg:h-[370px]"
          >
            <motion.div
              initial={{ rotateY: 22 }}
              animate={
                isInView || phase === 'transformed'
                  ? { rotateY: 0 }
                  : { rotateY: 22 }
              }
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transformPerspective: 1100,
                transformStyle: 'preserve-3d'
              }}
              className="relative h-full flex items-center justify-center"
            >
              {/* Warm Champagne Gold & Ruby Halo behind Mascot */}
              <div
                className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#FFD36A]/50 via-[#D99A24]/25 to-[#B5003A]/15 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Glowing Golden Gift-Like Orb near Mascot's Hand during gift-orb phase */}
              {showGiftOrb && (
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: [0.5, 1.25, 1], opacity: [0, 1, 0.95] }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                  className="absolute left-[18%] top-[58%] z-20 w-16 h-16 rounded-full bg-gradient-to-br from-[#FFF3C4] via-[#FFD36A] to-[#D99A24] shadow-[0_0_36px_rgba(217,154,36,0.9)] flex items-center justify-center pointer-events-none"
                >
                  <Gift className="w-7 h-7 text-[#1A1115]" />
                </motion.div>
              )}

              <img
                src={MASCOT_SRC}
                alt="MR Miracle Smiling Lion Mascot presenting a golden growth opportunity"
                className="relative z-10 h-full w-auto object-contain drop-shadow-[0_18px_30px_rgba(26,17,21,0.22)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
