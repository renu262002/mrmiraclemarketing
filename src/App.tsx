/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { PageTransition } from './components/PageTransition';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { WhyUs } from './pages/WhyUs';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <div className="relative min-h-screen bg-[#FFFDF9] text-[#1A1115] flex flex-col selection:bg-[#B5003A]/20 selection:text-[#B5003A]">
        {/* Ambient 3D particle universe */}
        <BackgroundCanvas />

        {/* Global persistent header navigation */}
        <Navbar />

        {/* Main Content with Route Transitions */}
        <main className="flex-1 relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/services"
              element={
                <PageTransition>
                  <Services />
                </PageTransition>
              }
            />
            <Route
              path="/why-us"
              element={
                <PageTransition>
                  <WhyUs />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global persistent footer */}
        <Footer />
      </div>
    </BrowserRouter>
    </MotionConfig>
  );
}
