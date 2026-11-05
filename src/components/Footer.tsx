import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Clock,
  Globe,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/companyData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#FAF3E6]/95 border-t border-[#D99A24]/30 pt-16 pb-12 overflow-hidden z-20">
      {/* Background Lighting Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD36A]/25 rounded-full filter blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B5003A]/10 rounded-full filter blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Upper CTA Banner */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl glass-panel-glow relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gradient-to-br from-[#FFD36A]/35 to-[#B5003A]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[#B5003A] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D99A24]" />
                Next-Gen Growth Partner
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#1A1115] tracking-tight">
                Ready to elevate your digital presence?
              </h3>
              <p className="mt-2 text-[#4A3B41] text-sm sm:text-base">
                Partner with MR Miracle to turn creative strategies into sustainable market leadership.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_6px_22px_rgba(181,0,58,0.28)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[#1A1115] hover:text-[#B5003A] bg-[#FFFDF9] hover:bg-[#FFF8EC] border border-[#D99A24]/45 transition-colors"
              >
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 5 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D99A24]/25">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center group">
              <img
                src="/assets/aistudio/mr_miracle_logo.png"
                alt="MR Miracle Digital Marketing Logo"
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-[#4A3B41] text-sm leading-relaxed max-w-sm">
              {COMPANY_INFO.overview}
            </p>

            <div className="pt-2 text-xs text-[#4A3B41] flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B5003A]" />
                <span>MCA Registered Entity: {COMPANY_INFO.legalName}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D41450]" />
                <span>{COMPANY_INFO.location} &bull; PIN: {COMPANY_INFO.pincode}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#B5003A] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#4A3B41] hover:text-[#B5003A] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D41450]" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#4A3B41] hover:text-[#B5003A] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D41450]" />
                  About Agency
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#4A3B41] hover:text-[#B5003A] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D41450]" />
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/why-us" className="text-[#4A3B41] hover:text-[#B5003A] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D41450]" />
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#4A3B41] hover:text-[#B5003A] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D41450]" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Directory */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#B5003A] font-semibold mb-4">
              Digital Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.map(s => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="text-[#4A3B41] hover:text-[#B5003A] transition-colors block text-xs leading-normal"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Presence */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#B5003A] font-semibold mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs text-[#4A3B41]">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#B5003A] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#1A1115] font-medium">{COMPANY_INFO.contactEmail}</div>
                  <div className="text-[11px] text-[#6E5B62]">Inquiry desk</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#D41450] shrink-0 mt-0.5" />
                <a
                  href={COMPANY_INFO.domain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A1115] font-medium hover:text-[#B5003A] flex items-center gap-1 transition-colors"
                >
                  mrmiracle.in
                  <ArrowUpRight className="w-3 h-3 text-[#6E5B62]" />
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#6E5B62] shrink-0 mt-0.5" />
                <div>{COMPANY_INFO.hours}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E5B62] gap-4">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span>Corporate Branding & Performance Marketing</span>
            <span className="hidden md:inline">&bull;</span>
            <span className="text-[#B5003A] font-medium">Class 35 Trademark Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
