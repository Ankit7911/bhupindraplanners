/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Expertise from './components/Expertise';
import Info from './components/Info';
import Pricing from './components/Pricing';
import CostEstimator from './components/CostEstimator';
import Testimonials from './components/Testimonials';
import Map from './components/Map';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("App mounted");
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <div className="min-h-screen bg-[#E5DFD3] font-sans text-gray-900">
        <Hero />
        <Expertise />
        <Portfolio />
        <Info />
        <Pricing />
        <CostEstimator />
        <Testimonials />
        <Map />
        <Footer />
      </div>
    </>
  );
}
