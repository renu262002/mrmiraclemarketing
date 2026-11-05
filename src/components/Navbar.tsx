import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFFDF9]/92 backdrop-blur-xl border-b border-[#D99A24]/30 py-2.5 shadow-[0_8px_28px_rgba(181,0,58,0.08)]'
            : 'bg-gradient-to-b from-[#FFFDF9]/92 to-transparent py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Uploaded Official MR Miracle Logo */}
          <Link
            to="/"
            className="flex items-center group focus:outline-none shrink-0"
            aria-label="MR Miracle Home"
          >
            <img
              src="/assets/aistudio/mr_miracle_logo.png"
              alt="MR Miracle Digital Marketing Logo"
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#FAF3E6]/90 p-1.5 rounded-full border border-[#D99A24]/30 backdrop-blur-md">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white font-semibold bg-gradient-to-r from-[#B5003A] to-[#D41450] border border-[#FFD36A]/50 shadow-[0_4px_16px_rgba(181,0,58,0.28)]'
                      : 'text-[#3A2B31] hover:text-[#B5003A] hover:bg-[#B5003A]/10'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              to="/contact"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_6px_20px_rgba(181,0,58,0.28)] hover:shadow-[0_8px_24px_rgba(212,20,80,0.38)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <span>Let's Talk</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#FAF3E6] border border-[#D99A24]/35 text-[#1A1115] hover:text-[#B5003A] hover:border-[#B5003A] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-[#FFFDF9]/98 backdrop-blur-2xl border-b border-[#D99A24]/30 px-6 py-6 shadow-2xl transition-all duration-300">
          <div className="flex flex-col space-y-2.5">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#B5003A] to-[#D41450] text-white border border-[#FFD36A]/40'
                      : 'text-[#3A2B31] hover:bg-[#FAF3E6] hover:text-[#B5003A]'
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </NavLink>
            ))}

            <div className="pt-4 border-t border-[#D99A24]/25 flex flex-col gap-3">
              <Link
                to="/contact"
                className="w-full text-center py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] shadow-[0_6px_18px_rgba(181,0,58,0.28)] flex items-center justify-center gap-2"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <div className="text-center text-xs text-[#6E5B62] pt-1">
                {COMPANY_INFO.location} &bull; {COMPANY_INFO.domain}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
