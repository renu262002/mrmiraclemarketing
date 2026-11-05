import React from 'react';
import { useLocation } from 'react-router-dom';

interface ParticleSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: string;
  delay: string;
}

const GOLDEN_PARTICLES: ParticleSpec[] = [
  { id: 1, left: '8%', top: '78%', size: 4, duration: '13s', delay: '0s' },
  { id: 2, left: '16%', top: '52%', size: 3, duration: '16s', delay: '2.2s' },
  { id: 3, left: '24%', top: '86%', size: 5, duration: '14s', delay: '4.5s' },
  { id: 4, left: '34%', top: '64%', size: 3, duration: '17s', delay: '1.4s' },
  { id: 5, left: '44%', top: '82%', size: 4, duration: '15s', delay: '3.8s' },
  { id: 6, left: '54%', top: '70%', size: 3, duration: '18s', delay: '0.8s' },
  { id: 7, left: '63%', top: '88%', size: 5, duration: '13.5s', delay: '5.1s' },
  { id: 8, left: '72%', top: '58%', size: 4, duration: '16.5s', delay: '2.7s' },
  { id: 9, left: '81%', top: '80%', size: 3, duration: '14.5s', delay: '6.0s' },
  { id: 10, left: '89%', top: '66%', size: 5, duration: '15.5s', delay: '1.9s' },
  { id: 11, left: '29%', top: '38%', size: 3, duration: '19s', delay: '4.0s' },
  { id: 12, left: '68%', top: '34%', size: 4, duration: '17.5s', delay: '3.1s' },
  { id: 13, left: '93%', top: '44%', size: 3, duration: '16s', delay: '5.5s' },
  { id: 14, left: '12%', top: '32%', size: 4, duration: '18.5s', delay: '2.5s' }
];

const getRouteThemeClass = (pathname: string): string => {
  if (pathname === '/about') return 'bg-theme-about';
  if (pathname === '/services') return 'bg-theme-services';
  if (pathname === '/why-us') return 'bg-theme-why-us';
  if (pathname === '/contact') return 'bg-theme-contact';
  return 'bg-theme-home';
};

export const BackgroundCanvas: React.FC = () => {
  const { pathname } = useLocation();
  const themeClass = getRouteThemeClass(pathname);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700 ${themeClass}`}
      aria-hidden="true"
    >
      {/* Layer 1: Deep Ruby-Red, Crimson-Pink, Metallic-Gold & Champagne-Gold Flowing Mesh */}
      <div className="bg-miracle-mesh absolute -inset-12" />

      {/* Layer 2: Gentle Crimson-Pink & Ruby-Red Light Trail */}
      <div className="bg-crimson-trail absolute -inset-24" />

      {/* Layer 3: Champagne-Gold & Metallic-Gold Illuminated Highlights */}
      <div className="bg-gold-aurora absolute -inset-16" />

      {/* Layer 4: Soft Warm Ivory Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 45%, rgba(250, 242, 228, 0.55) 100%)'
        }}
      />

      {/* Layer 5: Soft CSS Golden Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {GOLDEN_PARTICLES.map(p => (
          <span
            key={p.id}
            className="miracle-particle"
            style={
              {
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--particle-duration': p.duration,
                '--particle-delay': p.delay
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};
