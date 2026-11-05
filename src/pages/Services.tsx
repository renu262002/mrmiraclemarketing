import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code2,
  Search,
  Share2,
  Target,
  TrendingUp,
  Linkedin,
  Mail,
  MapPin
} from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';
import { ServicesNetworkScene } from '../components/3d/ServicesNetworkScene';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem } from '../types';

const ServiceAnimatedBadge: React.FC<{ iconType: ServiceItem['iconType'] }> = ({ iconType }) => {
  switch (iconType) {
    case 'code':
      return (
        <motion.div
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-[#B5003A]/10 border border-[#B5003A]/30 flex items-center justify-center text-[#B5003A]"
        >
          <Code2 className="w-6 h-6" />
        </motion.div>
      );
    case 'search':
      return (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-[#FFD36A]/40 border border-[#D99A24]/50 flex items-center justify-center text-[#B87B0E]"
        >
          <Search className="w-6 h-6" />
        </motion.div>
      );
    case 'share':
      return (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-[#D41450]/10 border border-[#D41450]/30 flex items-center justify-center text-[#D41450]"
        >
          <Share2 className="w-6 h-6" />
        </motion.div>
      );
    case 'target':
      return (
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-[#B5003A]/10 border border-[#D99A24]/50 flex items-center justify-center text-[#B5003A]"
        >
          <Target className="w-6 h-6" />
        </motion.div>
      );
    case 'ad':
      return (
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-[#FFD36A]/40 border border-[#D99A24]/50 flex items-center justify-center text-[#B87B0E]"
        >
          <TrendingUp className="w-6 h-6" />
        </motion.div>
      );
    case 'linkedin':
      return (
        <motion.div
          animate={{ rotateY: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-[#B5003A]/10 border border-[#B5003A]/30 flex items-center justify-center text-[#B5003A]"
        >
          <Linkedin className="w-6 h-6" />
        </motion.div>
      );
    case 'email':
      return (
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-[#FFD36A]/40 border border-[#D99A24]/50 flex items-center justify-center text-[#B87B0E]"
        >
          <Mail className="w-6 h-6" />
        </motion.div>
      );
    case 'local':
    default:
      return (
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-[#D41450]/10 border border-[#D99A24]/50 flex items-center justify-center text-[#D41450]"
        >
          <MapPin className="w-6 h-6" />
        </motion.div>
      );
  }
};

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Services (8)', match: '' },
    { id: 'engineering', name: 'Engineering & Web', match: 'Engineering' },
    { id: 'organic', name: 'SEO & Local SEO', match: 'Organic' },
    { id: 'social', name: 'Social & LinkedIn', match: 'Social' },
    { id: 'paid', name: 'Meta & Google Ads', match: 'Paid' },
    { id: 'email', name: 'Email Marketing', match: 'Email' }
  ];

  const filteredServices = SERVICES_DATA.filter(service => {
    if (activeFilter === 'all') return true;
    const cat = categories.find(c => c.id === activeFilter);
    return cat?.match ? service.category.toLowerCase().includes(cat.match.toLowerCase()) : true;
  });

  return (
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* 3D Background Network */}
      <ServicesNetworkScene />

      {/* 1. HERO SECTION */}
      <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-[#B5003A] text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#D99A24]" />
            <span>MR Miracle Service Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[#1A1115] leading-tight text-balance">
            Digital Solutions That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B5003A] via-[#D41450] to-[#B87B0E]">
              Move Your Business Forward.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#4A3B41] font-normal max-w-2xl mx-auto leading-relaxed">
            High-performance web platforms, search authority, executive personal branding, lifecycle email automation, and precision paid advertising.
          </p>

          {/* Filter Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFilter === cat.id
                    ? 'bg-gradient-to-r from-[#B5003A] to-[#D41450] text-white font-semibold shadow-[0_6px_18px_rgba(181,0,58,0.28)]'
                    : 'bg-[#FFFDF9] text-[#3A2B31] hover:text-[#B5003A] border border-[#D99A24]/35 hover:border-[#B5003A]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 2. INTERACTIVE 3D SERVICES GRID */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
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

      {/* 3. EXPANDED SERVICE BREAKDOWN: WHAT IT IS, HOW IT HELPS, WHAT WE PROVIDE & CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[#D99A24]/25 bg-gradient-to-b from-transparent via-[#FAF3E6]/75 to-transparent">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold">
              In-Depth Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#1A1115] text-balance">
              How Each Service Drives Business Growth
            </h2>
            <p className="text-[#4A3B41] text-base">
              A complete breakdown of what each service is, how it helps your business, and what MR Miracle delivers.
            </p>
          </div>

          <div className="space-y-8">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.25) }}
                className="p-8 sm:p-10 rounded-3xl glass-panel hover:border-[#B5003A]/45 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Service Identity & Animated Icon */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <ServiceAnimatedBadge iconType={service.iconType} />
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#B5003A]">
                          {service.category}
                        </span>
                        <h3 className="text-2xl font-heading font-bold text-[#1A1115]">
                          {service.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-[#4A3B41] text-sm leading-relaxed">
                      {service.fullDesc}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Link
                        to={`/contact?service=${encodeURIComponent(service.name)}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_6px_18px_rgba(181,0,58,0.25)] transition-all"
                      >
                        <span>{service.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: What It Is, How It Helps, What MR Miracle Provides */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-[#FAF3E6] border border-[#D99A24]/30 space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#B5003A]">
                        What The Service Is
                      </div>
                      <p className="text-[#4A3B41] text-sm leading-relaxed">
                        {service.whatItIs}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FAF3E6] border border-[#D41450]/25 space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#D41450]">
                        How It Helps Businesses
                      </div>
                      <p className="text-[#4A3B41] text-sm leading-relaxed">
                        {service.howItHelps}
                      </p>
                    </div>

                    <div className="md:col-span-2 p-5 rounded-2xl bg-[#FFFDF9] border border-[#D99A24]/35 space-y-3">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#B5003A]">
                        What MR Miracle Provides
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {service.whatWeProvide.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#1A1115] leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#B5003A] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTEGRATED STACK BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto p-8 sm:p-12 rounded-3xl glass-panel-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#B5003A] font-semibold">
                Holistic Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A1115]">
                Need a Comprehensive Full-Funnel Growth Solution?
              </h2>
              <p className="text-[#4A3B41] text-sm sm:text-base leading-relaxed">
                Most growing businesses require more than one isolated service. We often bundle Web Development with SEO, Local SEO, Email Marketing, and paid ad acquisition into an interconnected, high-leverage growth engine.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] shadow-[0_6px_22px_rgba(181,0,58,0.28)] hover:shadow-[0_10px_28px_rgba(212,20,80,0.38)] transition-all"
              >
                Discuss Custom Bundle
              </Link>
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
