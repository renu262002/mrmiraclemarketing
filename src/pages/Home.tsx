import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Check,
  HelpCircle
} from 'lucide-react';
import { HeroMascotStage } from '../components/HeroMascotStage';
import { CtaMascotStage } from '../components/CtaMascotStage';
import { FaqAccordion } from '../components/FaqAccordion';
import {
  COMPANY_INFO,
  SERVICES_DATA,
  DIGITAL_GROWTH_PROCESS,
  WHY_US_REASONS,
  FEATURED_HIGHLIGHTS,
  HOME_FAQS
} from '../data/companyData';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem } from '../types';

export const Home: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);

  return (
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION (ANIMATION 1: LION MASCOT ROTATION & RISING GOLDEN ORB) */}
      <section className="relative min-h-[calc(100vh-100px)] flex items-center justify-center py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left z-20"
          >
            <div className="inline-flex items-center gap-2 text-[#B5003A] text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D99A24]" />
              <span>MR Miracle Digital Marketing Pvt. Ltd.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[#1A1115] leading-[1.08] text-balance">
              More Than Marketing.{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#B5003A] via-[#D41450] to-[#B87B0E]">
                We Build Brands.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#1A1115] max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
              Creative strategies. Powerful digital experiences. Measurable business growth.
            </p>

            {/* Description Subtext */}
            <p className="text-sm sm:text-base text-[#4A3B41] max-w-xl leading-relaxed mx-auto lg:mx-0">
              We empower ambitious enterprises to transcend commoditized marketing. Through bespoke web engineering, organic search domination, high-intent performance ads, and personal branding, we build lasting brand equity.
            </p>

            {/* Two Main Hero Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_8px_28px_rgba(181,0,58,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Our Services</span>
                <ChevronRight className="w-5 h-5" />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[#B5003A] hover:text-white bg-[#FFFDF9] hover:bg-[#B5003A] border border-[#D99A24]/55 hover:border-[#B5003A] transition-all duration-300 shadow-[0_6px_18px_rgba(217,154,36,0.16)]"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Lion Mascot Presenting Golden Energy Orb */}
          <div className="lg:col-span-6 flex items-center justify-center z-10">
            <HeroMascotStage />
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-gradient-to-b from-transparent via-[#FAF3E6]/75 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4"
            >
              <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D99A24]" />
                About MR Miracle
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A1115] tracking-tight text-balance">
                Architecting Brands That Outpace The Market
              </h2>
              <p className="text-[#4A3B41] text-base leading-relaxed">
                {COMPANY_INFO.overview}
              </p>
              <p className="text-[#6E5B62] text-sm leading-relaxed">
                In today's digital economy, a brand is the living sum of every touchpoint—your website speed, organic search authority, message precision, and the trust you inspire.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[#B5003A] hover:text-[#D41450] font-semibold group text-sm transition-colors"
                >
                  <span>Learn More About Our Mission</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Cpu className="w-6 h-6" />,
                  color: 'text-[#B5003A] bg-[#B5003A]/10 border-[#B5003A]/25',
                  title: 'Modern Engineering',
                  desc: 'Fast, ultra-responsive digital architectures designed with modern web stacks, interactive 3D, and conversion-focused ergonomics.'
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  color: 'text-[#B87B0E] bg-[#FFD36A]/35 border-[#D99A24]/45',
                  title: 'Measurable Growth',
                  desc: 'Campaigns structured around business metrics: revenue, qualified pipeline, sustainable CAC, and high customer lifetime value.'
                },
                {
                  icon: <Layers className="w-6 h-6" />,
                  color: 'text-[#D41450] bg-[#D41450]/10 border-[#D41450]/25',
                  title: 'Full-Spectrum Synergy',
                  desc: 'Connecting organic search intent with high-precision paid ads and high-converting web experiences to multiply returns.'
                },
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  color: 'text-[#B5003A] bg-[#FFD36A]/35 border-[#D99A24]/45',
                  title: 'Long-Term Partnership',
                  desc: 'Transparent communication, genuine accountability, and strategic collaboration dedicated to your sustained market dominance.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 rounded-3xl glass-panel hover:border-[#B5003A]/45 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-[#1A1115] mb-2">{item.title}</h3>
                  <p className="text-[#4A3B41] text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALL EIGHT SERVICES WITH IMAGES & DESCRIPTIONS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D99A24]" />
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] mt-2 text-balance">
                Specialized Digital Services
              </h2>
              <p className="mt-3 text-[#4A3B41] text-base">
                Explore our eight core digital marketing and engineering pillars engineered to propel modern enterprises.
              </p>
            </div>
            <div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[#B5003A] bg-[#FFFDF9] border border-[#D99A24]/50 hover:border-[#B5003A] hover:bg-[#B5003A] hover:text-white transition-all whitespace-nowrap shadow-sm"
              >
                <span>View All 8 Services</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={idx}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW OUR DIGITAL MARKETING PROCESS WORKS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-[#FAF3E6]/75">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#D99A24]" />
              Strategic Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] tracking-tight text-balance">
              How Our Digital Marketing Process Works
            </h2>
            <p className="mt-3 text-[#4A3B41] text-base">
              A systematic 5-phase execution model designed to analyze business bottlenecks and scale brand presence sustainably.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B5003A]/25 via-[#D41450] to-[#D99A24]/45 -translate-y-8 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
              {DIGITAL_GROWTH_PROCESS.map((p, idx) => {
                const isActive = activeProcessIndex === idx;
                return (
                  <motion.div
                    key={p.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                    onClick={() => setActiveProcessIndex(idx)}
                    className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 ${
                      isActive
                        ? 'glass-panel-glow border-[#B5003A]/50 shadow-[0_14px_32px_rgba(181,0,58,0.14)] transform -translate-y-2'
                        : 'glass-panel hover:border-[#D99A24]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-2xl font-heading font-bold tabular-nums ${isActive ? 'text-[#B5003A]' : 'text-[#6E5B62]'}`}>
                        {p.step}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold tabular-nums ${
                          isActive
                            ? 'bg-gradient-to-r from-[#B5003A] to-[#D41450] text-white'
                            : 'bg-[#FAF3E6] text-[#4A3B41] border border-[#D99A24]/40'
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-[#1A1115] mb-2">{p.title}</h3>

                    <p className="text-[#4A3B41] text-xs sm:text-sm leading-relaxed">{p.description}</p>

                    {isActive && (
                      <div className="mt-4 pt-3 border-t border-[#D99A24]/30 text-xs text-[#B5003A] font-medium">
                        {p.detail}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/why-us"
              className="inline-flex items-center gap-2 text-[#B5003A] hover:text-[#D41450] font-semibold text-sm transition-colors"
            >
              <span>Explore Why Businesses Choose Our Approach</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY BUSINESSES CHOOSE MR MIRACLE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl glass-panel relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD36A]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D99A24]" />
                  Why Choose MR Miracle
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] leading-tight text-balance">
                  Your Business Deserves More Than Ordinary Marketing.
                </h2>
                <p className="text-[#4A3B41] text-base leading-relaxed">
                  We stand by genuine brand engineering and verifiable performance. Discover why visionary enterprises trust MR Miracle to establish authority and drive measurable ROI.
                </p>

                <div className="pt-2">
                  <Link
                    to="/why-us"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_8px_24px_rgba(181,0,58,0.28)] transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Read The 6 Strategic Reasons</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_US_REASONS.slice(0, 4).map((reason, idx) => (
                  <motion.div
                    key={reason.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="p-5 rounded-2xl bg-[#FAF3E6]/90 border border-[#D99A24]/30 hover:border-[#B5003A]/50 transition-colors"
                  >
                    <div className="text-xs font-semibold text-[#B5003A] mb-1">{reason.badge}</div>
                    <h3 className="text-base font-heading font-bold text-[#1A1115] mb-1.5">{reason.title}</h3>
                    <p className="text-[#4A3B41] text-xs leading-relaxed line-clamp-3">{reason.highlight}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED SERVICE HIGHLIGHTS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-gradient-to-b from-transparent via-[#FAF3E6]/70 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D99A24]" />
              Integrated Growth Combinations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              Featured Service Highlights
            </h2>
            <p className="text-[#4A3B41] text-base">
              How our core capabilities work together to turn first-time visitors into long-term brand advocates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FEATURED_HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl glass-panel-glow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#B5003A]">
                    {item.tag}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-[#1A1115] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#4A3B41] text-sm leading-relaxed">{item.description}</p>
                  <ul className="space-y-2.5 pt-3 border-t border-[#D99A24]/25">
                    {item.outcomes.map((outcome, oIdx) => (
                      <li key={oIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1A1115] font-medium">
                        <Check className="w-4 h-4 text-[#B5003A] shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/contact?service=${encodeURIComponent(item.serviceName)}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#B5003A] hover:text-[#D41450] transition-colors group"
                  >
                    <span>Discuss This Solution</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#D99A24]" />
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-[#4A3B41] text-base max-w-2xl mx-auto">
              Clear answers about how MR Miracle partners with businesses to build websites, run campaigns, and drive measurable growth.
            </p>
          </div>

          <FaqAccordion items={HOME_FAQS} />
        </div>
      </section>

      {/* 8. ANIMATION 2 — SECOND LION MASCOT CTA BEFORE FINAL CONTACT SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <CtaMascotStage />
        </div>
      </section>

      {/* 9. FINAL CONTACT SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 p-10 sm:p-16 rounded-3xl glass-panel relative overflow-hidden border border-[#D99A24]/35">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD36A]/20 via-[#B5003A]/5 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#B5003A]">
              Start The Conversation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              Let's Build Something Remarkable Together.
            </h2>
            <p className="text-[#4A3B41] text-base leading-relaxed">
              Tell us about your business goals. We will analyze your digital landscape and construct a strategic roadmap tailored to your growth.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_8px_28px_rgba(181,0,58,0.3)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Request A Brand Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${COMPANY_INFO.contactEmail}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-[#1A1115] hover:text-[#B5003A] bg-[#FFFDF9] border border-[#D99A24]/45 hover:border-[#B5003A] transition-colors"
              >
                <span>Email Us Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};
