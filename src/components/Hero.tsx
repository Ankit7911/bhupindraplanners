import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col overflow-hidden bg-black">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-scroll md:bg-fixed"
        animate={{ 
          scale: [1.1, 1.18, 1.1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          backgroundImage: 'url("https://drive.google.com/thumbnail?id=1rgvGgTaYnwljhuK9Y_OaVToZQM5zm5jI&sz=w1920-h1080")',
          y: backgroundY
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </motion.div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center md:justify-end items-center px-8 py-6 text-white transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-xl shadow-lg py-4' : 'bg-transparent'}`}>
        <div className="flex gap-8 text-sm font-medium tracking-wide">
          <a href="#philosophy" className="hover:text-gray-300 transition-colors">About</a>
          <a href="#portfolio" className="hover:text-gray-300 transition-colors">Explore</a>
          <a href="https://wa.me/916283116822" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 pb-24"
      >
        <motion.img 
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          src="https://drive.google.com/thumbnail?id=13GwpRcebMYPm3ZsGPXTm7-Zgz4W2Zjxr&sz=w1000" 
          alt="Bhupindra Planners Logo" 
          className="w-48 md:w-64 h-auto mb-8 object-contain drop-shadow-2xl"
          referrerPolicy="no-referrer"
        />
        
        <div className="overflow-hidden mb-2">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif text-white tracking-tight"
          >
            We not only build Structures
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h2 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif text-white tracking-tight"
          >
            WE BUILD DREAMS!
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 w-full px-4 md:px-0"
        >
          <a href="#portfolio" className="order-1 px-8 py-3 bg-white/5 backdrop-blur-md border border-white/40 text-white rounded-full text-sm font-medium hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] shadow-[inset_0_0_10px_rgba(255,255,255,0.1),0_4px_30px_rgba(0,0,0,0.1)] transition-all inline-block">
            OUR WORK
          </a>
          <a href="#pricing" className="order-2 md:order-3 px-8 py-3 bg-white/5 backdrop-blur-md border border-white/40 text-white rounded-full text-sm font-medium hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] shadow-[inset_0_0_10px_rgba(255,255,255,0.1),0_4px_30px_rgba(0,0,0,0.1)] transition-all inline-block">
            SERVICES
          </a>
          <div className="order-3 md:order-2 w-full md:w-auto flex justify-center mt-2 md:mt-0">
            <a href="https://wa.me/916283116822" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#F2C94C]/90 backdrop-blur-md border border-[#F2C94C]/60 text-black rounded-full text-sm font-bold hover:bg-[#F2C94C] hover:shadow-[0_8px_32px_rgba(242,201,76,0.4)] shadow-[inset_0_0_20px_rgba(242,201,76,0.5),0_4px_30px_rgba(0,0,0,0.1)] transition-all inline-block">
              CONTACT US
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
      >
        <a href="#portfolio" className="text-white/70 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
}
