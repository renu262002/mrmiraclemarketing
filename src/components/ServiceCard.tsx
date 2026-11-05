import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { ServiceItem } from '../types';
import { ServiceMiniCanvas } from './3d/ServiceMiniCanvas';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onSelect: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateX: Number((-y * 8).toFixed(2)),
      rotateY: Number((x * 8).toFixed(2))
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.36),
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: isHovered
          ? 'transform 0.12s ease-out, border-color 0.35s ease, box-shadow 0.35s ease'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease'
      }}
      className="group relative rounded-3xl glass-panel overflow-hidden flex flex-col justify-between border border-[#D99A24]/30 hover:border-[#B5003A]/55 hover:shadow-[0_20px_44px_-12px_rgba(181,0,58,0.16),0_0_28px_-4px_rgba(255,211,106,0.35)]"
    >
      {/* Subtle Champagne Gold & Crimson Hover Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#FFD36A]/15 via-transparent to-[#D41450]/8 z-0"
        aria-hidden="true"
      />

      <div>
        {/* Service Image Header with Zoom & Measured Scrim */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF3E6]">
          {!imgError ? (
            <img
              src={service.image}
              alt={service.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FAF3E6] via-[#FFFDF9] to-[#F5E6CC] flex items-center justify-center p-6 text-center">
              <span className="font-heading font-bold text-lg text-[#B5003A]">{service.name}</span>
            </div>
          )}

          {/* Measured Dark Scrim at Bottom of Photo for Crisp Category Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1115]/85 via-[#1A1115]/25 to-transparent" />

          {/* Floating 3D Object Preview in Bottom-Right of Image */}
          <div className="absolute bottom-2 right-3 z-10 rounded-2xl bg-[#1A1115]/80 backdrop-blur-md border border-[#FFD36A]/45 p-1 shadow-lg">
            <ServiceMiniCanvas iconType={service.iconType} isHovered={isHovered} />
          </div>

          {/* Category Label */}
          <div className="absolute bottom-4 left-6 z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFD36A]">
              {service.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 relative z-10">
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1A1115] group-hover:text-[#B5003A] transition-colors">
            {service.name}
          </h3>

          <p className="mt-2.5 text-[#4A3B41] text-sm leading-relaxed">
            {service.shortDesc}
          </p>

          {/* Key Deliverables */}
          <ul className="mt-5 space-y-2 border-t border-[#D99A24]/25 pt-4">
            {service.deliverables.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-[#4A3B41]">
                <Check className="w-3.5 h-3.5 text-[#B5003A] shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#D99A24]/25 flex items-center justify-between relative z-10">
        <button
          onClick={() => onSelect(service)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#B5003A] bg-[#FAF3E6] border border-[#D99A24]/45 hover:bg-gradient-to-r hover:from-[#B5003A] hover:to-[#D41450] hover:text-white hover:border-[#B5003A] transition-all duration-300 focus:outline-none"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </button>

        <Link
          to={`/contact?service=${encodeURIComponent(service.name)}`}
          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] transition-all shadow-[0_4px_14px_rgba(181,0,58,0.25)]"
          title={`Inquire about ${service.name}`}
        >
          <span>Inquire</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};
