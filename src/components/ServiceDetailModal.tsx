import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, ArrowRight, Layers, Cpu, TrendingUp } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  const navigate = useNavigate();

  if (!service) return null;

  const handleConsult = () => {
    onClose();
    navigate(`/contact?service=${encodeURIComponent(service.name)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#1A1115]/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FFFDF9] border border-[#D99A24]/45 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#FFD36A]/30 to-[#B5003A]/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#FAF3E6] border border-[#D99A24]/35 text-[#4A3B41] hover:text-[#B5003A] hover:border-[#B5003A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B5003A] mb-2">
              {service.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A1115]">
              {service.name}
            </h3>
            <p className="mt-2 text-[#4A3B41] text-sm sm:text-base leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF3E6] border border-[#D99A24]/35 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#B5003A] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase tracking-wider text-[#B5003A] font-semibold">
                Core Impact & Key Metric
              </div>
              <div className="text-sm text-[#1A1115] font-medium mt-0.5">
                {service.metricFocus}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#1A1115] font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D41450]" />
              Strategic Deliverables
            </h4>
            <ul className="space-y-2.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#4A3B41]">
                  <CheckCircle className="w-4 h-4 text-[#B5003A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#1A1115] font-semibold mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#D99A24]" />
              Platforms & Tooling
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-[#1A1115] font-medium">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#FAF3E6] border border-[#D99A24]/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#D99A24]/25 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-medium text-[#4A3B41] hover:text-[#1A1115] transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleConsult}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#B5003A] to-[#D41450] hover:from-[#D41450] hover:to-[#B5003A] shadow-[0_6px_20px_rgba(181,0,58,0.28)] transition-all"
            >
              <span>Consult on {service.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
