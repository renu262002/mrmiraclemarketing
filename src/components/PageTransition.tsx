import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-[calc(100vh-140px)]"
    >
      {children}
    </motion.div>
  );
};
