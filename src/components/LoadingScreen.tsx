import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#E5DFD3]"
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center">
        <div className="overflow-hidden mb-2">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl font-serif font-bold tracking-[0.3em] text-gray-900 text-center uppercase"
          >
            Bhupindra
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-3xl font-serif font-light tracking-[0.4em] text-gray-700 text-center uppercase"
          >
            Planners
          </motion.h2>
        </div>
      </div>

      <div className="w-48 md:w-64 h-[1px] bg-gray-300 mt-12 overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-gray-900 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
