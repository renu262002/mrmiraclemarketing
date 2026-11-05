import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../types';

interface FaqAccordionProps {
  items: FAQItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'glass-panel-glow border-[#D99A24]/55'
                : 'glass-panel border-[#D99A24]/25 hover:border-[#B5003A]/40'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B5003A]"
            >
              <span className="font-heading font-semibold text-base sm:text-lg text-[#1A1115]">
                {item.question}
              </span>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? 'bg-gradient-to-r from-[#B5003A] to-[#D41450] text-white rotate-180'
                    : 'bg-[#FAF3E6] text-[#B5003A] border border-[#D99A24]/40'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-[#4A3B41] leading-relaxed border-t border-[#D99A24]/20">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
