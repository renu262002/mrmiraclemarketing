import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Layers,
  MessageSquare,
  Sliders,
  Check,
  Compass
} from 'lucide-react';
import { GrowthPillarsScene } from '../components/3d/GrowthPillarsScene';
import { WHY_US_REASONS, DIGITAL_GROWTH_PROCESS } from '../data/companyData';

const ENGAGEMENT_TIMELINE = [
  {
    phase: 'Stage 01',
    title: 'Understanding Your Requirements & Business Model',
    summary:
      'Every partnership begins with a deep discovery conversation. We learn about your products or services, target customers, regional or national market, profit margins, and immediate growth objectives.',
    outcome: 'Clear alignment on commercial priorities and target audience.'
  },
  {
    phase: 'Stage 02',
    title: 'Auditing Your Current Digital Footprint',
    summary:
      'We inspect your existing website speed, mobile usability, search engine rankings, Google Business Profile, social channels, and any past ad campaigns to uncover hidden bottlenecks.',
    outcome: 'Objective diagnostic of where opportunities are being missed.'
  },
  {
    phase: 'Stage 03',
    title: 'Architecting a Customized Digital Strategy',
    summary:
      'Instead of forcing you into a generic template, we select the exact combination of services—such as Web Development, SEO, Local SEO, Meta/Google Ads, LinkedIn Branding, or Email Marketing—that fits your goals.',
    outcome: 'A tailored, transparent roadmap with clear deliverables.'
  },
  {
    phase: 'Stage 04',
    title: 'Implementing & Launching Suitable Digital Solutions',
    summary:
      'Our engineering, design, content, and paid-media specialists build and launch your website, search architecture, and campaigns with clean conversion tracking from day one.',
    outcome: 'High-craft execution across every customer touchpoint.'
  },
  {
    phase: 'Stage 05',
    title: 'Ongoing Optimization & Transparent Reporting',
    summary:
      'Once live, we continuously monitor real conversion data, refine ad creatives and keywords, and share clear, honest updates so your digital ecosystem compounds in value over time.',
    outcome: 'Sustained lead generation, brand authority, and long-term partnership.'
  }
];

export const WhyUs: React.FC = () => {
  const [activeReasonIndex, setActiveReasonIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#B5003A]" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-[#D41450]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#B87B0E]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#D41450]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-[#B5003A]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 text-[#B87B0E]" />;
    }
  };

  return (
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* Floating Golden Elements */}
      <motion.div
        animate={{ y: [0, -18, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ repeat: Infinity, duration: 7.5, ease: 'easeInOut' }}
        className="pointer-events-none fixed top-40 left-8 w-48 h-48 rounded-full bg-[#FFD36A]/25 blur-3xl z-0"
        aria-hidden="true"
      />
      <motion.div
        animate={{ y: [0, 16, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
        className="pointer-events-none fixed bottom-32 right-10 w-56 h-56 rounded-full bg-[#B5003A]/10 blur-3xl z-0"
        aria-hidden="true"
      />

      {/* 1. HERO SECTION WITH 3D GROWTH CORE & 6 SATELLITES */}
      <section className="relative min-h-[75vh] flex items-center justify-center py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left z-20"
          >
            <div className="inline-flex items-center gap-2 text-[#B5003A] text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#D99A24]" />
              <span>Why Choose MR Miracle</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[#1A1115] leading-tight text-balance">
              Your Business Deserves{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#B5003A] via-[#D41450] to-[#B87B0E]">
                More Than Ordinary Marketing.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#4A3B41] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We reject shallow promises and cookie-cutter templates. Here is the foundation upon which we engineer high-impact digital experiences and sustainable market leadership.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_6px_22px_rgba(181,0,58,0.28)] transition-all"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#six-reasons"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[#1A1115] hover:text-[#B5003A] bg-[#FFFDF9] border border-[#D99A24]/45 hover:border-[#B5003A] transition-colors"
              >
                <span>Review The 6 Pillars</span>
              </a>
            </div>

            <p className="text-xs text-[#6E5B62] pt-1">
              Interactive 3D model: Click satellites or hover reasons below to inspect pillars
            </p>
          </motion.div>

          <div className="lg:col-span-5 flex items-center justify-center z-10">
            <GrowthPillarsScene
              activeIndex={activeReasonIndex}
              onSelectIndex={idx => setActiveReasonIndex(idx)}
            />
          </div>
        </div>
      </section>

      {/* 2. THE SIX REASONS SECTION */}
      <section id="six-reasons" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-gradient-to-b from-transparent via-[#FAF3E6]/70 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D99A24]" />
              The Pillars of Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] tracking-tight text-balance">
              Six Reasons Why Visionary Brands Trust Us
            </h2>
            <p className="text-[#4A3B41] text-base">
              Every pillar represents an uncompromising principle that guides how we build, market, and scale your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US_REASONS.map((reason, idx) => {
              const isSelected = activeReasonIndex === idx;
              return (
                <motion.div
                  key={reason.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  onMouseEnter={() => setActiveReasonIndex(idx)}
                  className={`p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'glass-panel-glow border-[#B5003A]/50 shadow-[0_14px_32px_rgba(181,0,58,0.14)] transform -translate-y-1.5'
                      : 'glass-panel hover:border-[#D99A24]/60'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF3E6] border border-[#D99A24]/40 flex items-center justify-center">
                        {getIcon(reason.iconName)}
                      </div>
                      <span className="text-xs font-medium text-[#6E5B62] tabular-nums">
                        Pillar 0{reason.id}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-[#B5003A] font-semibold uppercase tracking-wider">
                        {reason.badge}
                      </span>
                      <h3 className="text-2xl font-heading font-bold text-[#1A1115] mt-1">
                        {reason.title}
                      </h3>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF3E6] border border-[#D99A24]/30 text-xs text-[#1A1115] font-medium">
                      "{reason.highlight}"
                    </div>

                    <p className="text-[#4A3B41] text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D99A24]/20 flex items-center justify-between text-xs text-[#6E5B62]">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#B5003A]" />
                      Client Guarantee
                    </span>
                    <button
                      onClick={() => setActiveReasonIndex(idx)}
                      className="text-[#B5003A] hover:text-[#D41450] font-semibold focus:outline-none transition-colors"
                    >
                      {isSelected ? 'Active Satellite' : 'Select'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ANIMATED PROCESS TIMELINE: HOW MR MIRACLE WORKS WITH BUSINESSES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-[#D99A24]" />
              Client Collaboration Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              How We Work With Businesses From Discovery to Implementation
            </h2>
            <p className="text-[#4A3B41] text-base leading-relaxed">
              A clear, structured partnership model—from understanding your requirements to implementing suitable digital solutions that scale.
            </p>
          </div>

          {/* Vertical Animated Timeline with Glowing Golden Connecting Line */}
          <div className="relative pl-6 sm:pl-10 space-y-8">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="absolute left-2 sm:left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#D99A24] via-[#D41450] to-[#B5003A]"
            />

            {ENGAGEMENT_TIMELINE.map((item, idx) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.09 }}
                className="relative p-6 sm:p-8 rounded-3xl glass-panel hover:border-[#B5003A]/45 transition-all"
              >
                {/* Glowing Timeline Node */}
                <span className="absolute -left-[25px] sm:-left-[33px] top-8 w-4 h-4 rounded-full bg-gradient-to-r from-[#D99A24] to-[#B5003A] ring-4 ring-[#FFFDF9] shadow-[0_0_12px_rgba(217,154,36,0.75)]" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#B5003A] tabular-nums">
                    {item.phase}
                  </span>
                  <span className="text-xs text-[#6E5B62] font-medium">{item.outcome}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1A1115] mb-2">
                  {item.title}
                </h3>

                <p className="text-[#4A3B41] text-sm sm:text-base leading-relaxed">
                  {item.summary}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DIGITAL GROWTH PROCESS: ANALYZE -> STRATEGIZE -> EXECUTE -> OPTIMIZE -> GROW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-[#FAF3E6]/75">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D41450] font-semibold flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" />
              The Continuous Growth Engine
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              Analyze &rarr; Strategize &rarr; Execute &rarr; Optimize &rarr; Grow
            </h2>
            <p className="text-[#4A3B41] text-base leading-relaxed">
              We apply an agile scientific framework to every brand engagement. Rather than guessing, we measure, iterate, and systematically expand your market share.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {DIGITAL_GROWTH_PROCESS.map((p, idx) => (
              <button
                key={p.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeStepIndex === idx
                    ? 'bg-gradient-to-r from-[#B5003A] to-[#D41450] text-white font-semibold shadow-[0_6px_18px_rgba(181,0,58,0.28)]'
                    : 'bg-[#FFFDF9] text-[#3A2B31] hover:text-[#B5003A] border border-[#D99A24]/35'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-xs flex items-center justify-center tabular-nums ${
                    activeStepIndex === idx ? 'bg-white/25 text-white' : 'bg-[#FAF3E6] text-[#4A3B41]'
                  }`}
                >
                  {idx + 1}
                </span>
                <span>{p.title}</span>
              </button>
            ))}
          </div>

          <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#D99A24]/25">
              <div>
                <span className="text-xs text-[#B5003A] font-semibold uppercase tracking-widest tabular-nums">
                  Process Stage {DIGITAL_GROWTH_PROCESS[activeStepIndex].step}
                </span>
                <h3 className="text-3xl font-heading font-bold text-[#1A1115] mt-1">
                  Phase {activeStepIndex + 1}: {DIGITAL_GROWTH_PROCESS[activeStepIndex].title}
                </h3>
              </div>
              <div className="text-xs font-semibold text-[#B5003A] self-start sm:self-auto">
                Strategic Milestone
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-[#1A1115] leading-relaxed font-normal">
                {DIGITAL_GROWTH_PROCESS[activeStepIndex].description}
              </p>
              <div className="p-5 rounded-2xl bg-[#FAF3E6] border border-[#D99A24]/30 text-sm text-[#4A3B41] leading-relaxed">
                <span className="font-semibold text-[#B5003A] block mb-1">
                  Execution Detail:
                </span>
                {DIGITAL_GROWTH_PROCESS[activeStepIndex].detail}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 p-10 sm:p-14 rounded-3xl glass-panel-glow">
          <span className="text-xs font-semibold text-[#B5003A] uppercase tracking-wider">
            Ready to break through ordinary limits?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
            Experience Growth Built On Genuine Craftsmanship.
          </h2>
          <p className="text-[#4A3B41] text-base max-w-xl mx-auto">
            Talk directly to our strategists. We will evaluate your digital ecosystem and propose a transparent roadmap with zero guesswork.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] shadow-[0_8px_28px_rgba(181,0,58,0.3)] transition-all transform hover:-translate-y-0.5"
            >
              Start Your Free Consultation
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 rounded-full font-semibold text-[#1A1115] hover:text-[#B5003A] bg-[#FFFDF9] border border-[#D99A24]/45"
            >
              Review All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
