import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://wa.me/916283116822"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20
          }}
          className="fixed bottom-8 right-8 z-[100] flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-shadow"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-8 h-8 fill-current" />
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ 
              duration: 4, 
              times: [0, 0.1, 0.9, 1], 
              repeat: Infinity, 
              repeatDelay: 5 
            }}
            className="absolute right-20 bg-white text-black text-sm font-bold py-2 px-4 rounded-xl shadow-xl whitespace-nowrap pointer-events-none border border-gray-100"
          >
            Need help? Chat with us!
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
