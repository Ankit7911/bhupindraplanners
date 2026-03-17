import React from 'react';
import { motion } from 'motion/react';

export default function Logo({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 8px rgba(242, 201, 76, 0.3))" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`flex flex-col items-center cursor-pointer ${className}`}
    >
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <path d="M 20 20 L 80 20 A 15 15 0 0 1 80 50 L 20 50 L 20 80" stroke="currentColor" strokeWidth="10" strokeLinejoin="miter" />
        <path d="M 50 50 L 50 80 L 80 80 A 15 15 0 0 0 80 50" stroke="#F2C94C" strokeWidth="10" strokeLinejoin="miter" />
      </svg>
      <div className="font-bold tracking-widest text-xs mt-2 text-center leading-tight whitespace-nowrap">
        BHUPINDRA<br/>PLANNERS
      </div>
    </motion.div>
  );
}
