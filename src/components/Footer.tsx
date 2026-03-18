import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SocialLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -35, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-20 bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none"
          >
            {label}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:text-[#F2C94C] transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="w-5 h-5" />
      </a>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-[#5A4D4C] text-white pt-16 pb-8 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
        
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-bold tracking-widest mb-1">BHUPINDRA PLANNERS</h3>
            <p className="text-xs text-gray-300">We don't build Structures , WE BUILD DREAMS !</p>
          </div>
          
          <div className="flex gap-6">
            <SocialLink 
              href="https://www.instagram.com/bhupindraplanners" 
              icon={Instagram} 
              label="INSTAGRAM" 
            />
            <SocialLink 
              href="https://www.linkedin.com/in/ankit-pathak-12909a100?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              icon={Linkedin} 
              label="LINKEDIN" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm md:text-right">
          <a href="https://wa.me/916283116822" target="_blank" rel="noopener noreferrer" className="text-[#F2C94C] font-bold hover:text-[#F2C94C]/80 transition-colors">Contact Us</a>
          <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">Our Work</a>
          <a href="#philosophy" className="text-gray-300 hover:text-white transition-colors">About Us</a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center">
        <p className="text-xs text-gray-400 tracking-wide">
          &copy; {new Date().getFullYear()} Bhupindra Planners. All assets and designs belong to Bhupindra Planners.
        </p>
      </div>
    </footer>
  );
}
