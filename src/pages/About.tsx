import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  Target,
  Compass,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Globe2,
  Cpu,
  Eye,
  Handshake,
  MessageSquare,
  Layers
} from 'lucide-react';
import { DigitalGlobeScene } from '../components/3d/DigitalGlobeScene';
import { COMPANY_INFO } from '../data/companyData';

export const About: React.FC = () => {
  return (
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* Floating Brand Elements (Subtle Champagne Gold & Ruby Glows) */}
      <motion.div
        animate={{ y: [0, -16, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        className="pointer-events-none fixed top-36 right-12 w-44 h-44 rounded-full bg-[#FFD36A]/25 blur-3xl z-0"
        aria-hidden="true"
      />
      <motion.div
        animate={{ y: [0, 18, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="pointer-events-none fixed bottom-28 left-10 w-56 h-56 rounded-full bg-[#B5003A]/10 blur-3xl z-0"
        aria-hidden="true"
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left z-20"
          >
            <div className="inline-flex items-center gap-2 text-[#B5003A] text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <Globe2 className="w-4 h-4 text-[#D99A24]" />
              <span>About MR Miracle Digital Marketing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[#1A1115] leading-tight text-balance">
              More Than Marketing.{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#B5003A] via-[#D41450] to-[#B87B0E]">
                We Build Brands.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#4A3B41] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We help businesses establish their authentic online identity, maximize visibility across search and social channels, and convert digital interest into enduring business value.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_6px_22px_rgba(181,0,58,0.28)] transition-all"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[#1A1115] hover:text-[#B5003A] bg-[#FFFDF9] border border-[#D99A24]/45 hover:border-[#B5003A] transition-colors"
              >
                <span>Explore Capabilities</span>
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex items-center justify-center z-10">
            <DigitalGlobeScene />
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-gradient-to-b from-transparent via-[#FAF3E6]/70 to-transparent">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D99A24]" />
              Company Introduction
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] tracking-tight text-balance">
              A Growth Agency Engineered For The Modern Web
            </h2>
            <p className="text-[#4A3B41] text-base leading-relaxed">
              {COMPANY_INFO.legalName} is an officially incorporated digital marketing enterprise in {COMPANY_INFO.location}. Built on the principle that modern businesses need cohesive digital systems rather than isolated tactics, we unite web engineering, search visibility, social storytelling, and performance advertising under one roof.
            </p>
          </motion.div>

          {/* Animated Golden Connection Line */}
          <div className="relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left center' }}
              className="hidden md:block absolute top-14 left-12 right-12 h-px bg-gradient-to-r from-[#B5003A]/40 via-[#D99A24] to-[#D41450]/40 z-0"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  icon: <Target className="w-6 h-6" />,
                  color: 'text-[#B5003A] bg-[#B5003A]/10 border-[#B5003A]/25',
                  title: 'Brand Identity Focus',
                  desc: 'We craft cohesive brand languages that stand out in crowded industries, establishing an authentic voice and visual distinction that commands immediate trust.'
                },
                {
                  icon: <Compass className="w-6 h-6" />,
                  color: 'text-[#B87B0E] bg-[#FFD36A]/35 border-[#D99A24]/45',
                  title: 'Organic & Paid Synthesis',
                  desc: 'We fuse long-term search engine authority (SEO & Local SEO) with surgical paid campaigns across Google and Meta, pairing immediate traffic with compounding organic equity.'
                },
                {
                  icon: <Cpu className="w-6 h-6" />,
                  color: 'text-[#D41450] bg-[#D41450]/10 border-[#D41450]/25',
                  title: 'Technical Rigor',
                  desc: 'From website speed scores to pixel-perfect conversion tracking and server-side tag integration, our foundation is built on rock-solid web engineering.'
                }
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-3xl glass-panel space-y-4 hover:border-[#B5003A]/45 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${card.color}`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#1A1115]">{card.title}</h3>
                  <p className="text-[#4A3B41] text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR MISSION & VISION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold">
              Purpose & Direction
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl glass-panel-glow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[#B5003A] text-xs font-semibold uppercase tracking-wider">
                  <Target className="w-4 h-4 text-[#D99A24]" />
                  Our Mission
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A1115]">
                  Empowering Brands with Measurable Digital Authority
                </h3>
                <p className="text-[#4A3B41] text-sm sm:text-base leading-relaxed">
                  Our mission is to help companies escape superficial, vanity-driven advertising by delivering intelligent digital ecosystems. We combine thoughtful web design, rigorous search optimization, and targeted performance advertising to construct predictable, scalable customer acquisition channels.
                </p>
              </div>

              <div className="space-y-2 border-t border-[#D99A24]/25 pt-4 text-xs sm:text-sm text-[#1A1115] font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B5003A]" />
                  <span>Uncompromising Quality in Every Deliverable</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B5003A]" />
                  <span>Data-Driven Decision Making & Full Transparency</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl glass-panel border-[#D41450]/30 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[#D41450] text-xs font-semibold uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  Our Vision
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A1115]">
                  Setting the Standard for Integrated Brand Engineering
                </h3>
                <p className="text-[#4A3B41] text-sm sm:text-base leading-relaxed">
                  Our vision is to be the most trusted digital growth partner for ambitious businesses—where creative storytelling, technical precision, and transparent communication come together to turn emerging brands into category leaders.
                </p>
              </div>

              <div className="space-y-2 border-t border-[#D99A24]/25 pt-4 text-xs sm:text-sm text-[#1A1115] font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D41450]" />
                  <span>Enduring Brand Equity Over Short-Term Gimmicks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D41450]" />
                  <span>Sustainable Growth Across Search, Social & Web</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. OUR APPROACH TO DIGITAL MARKETING & HOW WE DEVELOP SOLUTIONS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-[#FAF3E6]/75">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-6 space-y-4"
            >
              <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D99A24]" />
                Our Approach
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A1115] text-balance">
                Strategic Diagnostics First, Tailored Solutions Second
              </h2>
              <p className="text-[#4A3B41] text-base leading-relaxed">
                We never pitch boilerplate packages. Our approach begins by understanding the economic realities of your business—your profit margins, target decision-makers, regional market dynamics, and current conversion bottlenecks.
              </p>
              <p className="text-[#6E5B62] text-sm leading-relaxed">
                Once we diagnose the root problem, we develop a suitable digital solution combining the exact channels needed—whether that is a high-speed website, technical SEO, local map-pack optimization, LinkedIn authority, or targeted Meta and Google ad funnels.
              </p>
            </motion.div>

            <div className="lg:col-span-6 space-y-4">
              {[
                {
                  step: '01',
                  title: 'Understanding Business Problems',
                  desc: 'We audit your current website, search visibility, ad account structure, and customer journey to pinpoint where qualified prospects are dropping off.'
                },
                {
                  step: '02',
                  title: 'Developing Suitable Digital Solutions',
                  desc: 'We architect a custom roadmap that aligns web engineering, content, and paid acquisition with your specific revenue and lead-generation goals.'
                },
                {
                  step: '03',
                  title: 'Iterative Execution & Measurement',
                  desc: 'Every campaign and web release is tracked with clean analytics so we can refine messaging, lower acquisition costs, and compound your returns.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl glass-panel flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B5003A] to-[#D41450] text-white font-heading font-bold text-sm flex items-center justify-center shrink-0 tabular-nums">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-[#1A1115]">{item.title}</h3>
                    <p className="text-[#4A3B41] text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW WE SOLVE CORE BUSINESS CHALLENGES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#D99A24]" />
              Diagnostic Framework
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              How We Solve Business Challenges
            </h2>
            <p className="text-[#4A3B41] text-base">
              Every digital bottleneck requires a specific engineering response. Here is how we identify and dismantle core business obstacles:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                tag: 'Website & Conversions',
                title: 'Low Website Conversion & Sluggish Performance',
                problem:
                  'Many businesses invest in traffic only to lose prospects due to slow load times, outdated mobile layouts, and unclear calls to action.',
                solution:
                  'We engineer blazing-fast, responsive web applications with intuitive UX, clear value hierarchy, and frictionless conversion pathways.'
              },
              {
                num: '02',
                tag: 'Search Invisibility',
                title: 'Zero Organic Visibility on High-Intent Keywords',
                problem:
                  'Competitors monopolize top Google search and local map positions while the company remains invisible to buyers actively seeking solutions.',
                solution:
                  'Technical SEO architecture, Local SEO optimization, semantic content modeling, and authority-building strategies that systematically push your brand to page one.'
              },
              {
                num: '03',
                tag: 'Ad Waste',
                title: 'Wasted Ad Spend on Unqualified Clicks',
                problem:
                  'Running ads without strict negative keywords, conversion API tracking, or creative testing leads to inflated CPA with zero qualified leads.',
                solution:
                  'Precision Meta & Google ad campaigns structured with strict intent targeting, robust server-side analytics, and iterative creative testing.'
              },
              {
                num: '04',
                tag: 'Siloed Tactics',
                title: 'Disjointed Marketing Channels Without Synergy',
                problem:
                  'Social media posts, email follow-ups, ads, and website operate as isolated efforts with conflicting messages and no unified customer journey.',
                solution:
                  'A unified Omnichannel Growth Ecosystem where every channel reinforces the others, accelerating prospects from awareness to long-term client advocacy.'
              }
            ].map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-8 rounded-3xl glass-panel space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#B5003A] uppercase tracking-wider font-semibold tabular-nums">
                    Identified Challenge {item.num}
                  </span>
                  <span className="text-[#6E5B62] font-medium">{item.tag}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-[#1A1115]">{item.title}</h3>
                <p className="text-[#4A3B41] text-sm leading-relaxed">{item.problem}</p>
                <div className="pt-2 p-4 rounded-xl bg-[#FAF3E6] border border-[#D99A24]/35 text-xs text-[#1A1115] space-y-1">
                  <div className="font-semibold text-[#B5003A]">MR Miracle Solution:</div>
                  <div>{item.solution}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR COMMITMENT TO CREATIVE THINKING, TRANSPARENCY & LONG-TERM PARTNERSHIPS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-gradient-to-b from-transparent via-[#FAF3E6]/75 to-transparent">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold flex items-center justify-center gap-2">
              <Layers className="w-4 h-4 text-[#D99A24]" />
              Core Values
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              Our Commitment to Every Partner
            </h2>
            <p className="text-[#4A3B41] text-base">
              Three foundational commitments that define how we think, communicate, and build lasting relationships with our clients.
            </p>
          </div>

          <div className="relative">
            {/* Animated Golden Connection Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'center' }}
              className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-gradient-to-r from-[#B5003A]/30 via-[#D99A24] to-[#D41450]/30 z-0"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  icon: <Sparkles className="w-6 h-6 text-[#B5003A]" />,
                  title: 'Creative Thinking',
                  desc: 'We bring fresh, original strategic and visual thinking to every brand—ensuring your website, social presence, and ad creatives stand apart from generic industry templates.'
                },
                {
                  icon: <MessageSquare className="w-6 h-6 text-[#D41450]" />,
                  title: 'Complete Transparency',
                  desc: 'You always know where your budget goes, what we are testing, and how campaigns are performing. We share honest insights and clear, jargon-free reporting.'
                },
                {
                  icon: <Handshake className="w-6 h-6 text-[#B87B0E]" />,
                  title: 'Long-Term Partnerships',
                  desc: 'We measure our success by your sustained growth. Rather than chasing short-term vanity spikes, we work alongside your team to build compounding digital equity.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="p-8 rounded-3xl glass-panel-glow space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF3E6] border border-[#D99A24]/45 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#1A1115]">{item.title}</h3>
                  <p className="text-[#4A3B41] text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 p-10 sm:p-14 rounded-3xl glass-panel-glow">
          <span className="text-xs font-semibold text-[#B5003A] uppercase tracking-wider">
            Ready to experience the difference?
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A1115] text-balance">
            Discover What MR Miracle Can Do For Your Brand.
          </h2>
          <p className="text-[#4A3B41] text-sm sm:text-base max-w-xl mx-auto">
            Schedule a diagnostic consultation with our strategists to uncover hidden opportunities in your digital footprint.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] shadow-[0_6px_22px_rgba(181,0,58,0.28)]"
            >
              Start The Conversation
            </Link>
            <Link
              to="/why-us"
              className="px-8 py-3.5 rounded-full font-semibold text-[#1A1115] hover:text-[#B5003A] bg-[#FFFDF9] border border-[#D99A24]/45"
            >
              Why Choose Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
