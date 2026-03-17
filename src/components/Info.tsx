import React from 'react';
import { motion } from 'motion/react';

export default function Info() {
  return (
    <section id="philosophy" className="py-24 px-8 md:px-16 lg:px-24 max-w-4xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <div className="overflow-hidden mb-8">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
            >
              Our Philosophy
            </motion.h3>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 text-xl leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            We believe that good architectural design is not just about creating an intelligent blend of style, form and function. It is also a form of storytelling. Every space we design reflects the unique dreams and aspirations of the people who will inhabit it.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 0.8,
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/40 shadow-sm max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-serif font-bold mb-6 text-gray-900">Reach out</h3>
            <div className="text-gray-900 flex flex-col items-center gap-4 w-full">
              <motion.a 
                whileHover={{ x: 5 }}
                href="mailto:ankitpathak2002@gmail.com" 
                className="hover:text-black transition-colors flex items-center gap-3 w-full max-w-full overflow-hidden justify-center"
              >
                <span className="shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">✉️</span>
                <span className="text-[13px] xs:text-sm sm:text-base md:text-lg truncate md:overflow-visible">ankitpathak2002@gmail.com</span>
              </motion.a>
              <div className="flex flex-col gap-4 w-full items-center">
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="tel:+916283116822" 
                  className="hover:text-black transition-colors flex items-center gap-3 w-full max-w-full overflow-hidden justify-center"
                >
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">📞</span>
                  <span className="text-base md:text-lg truncate md:overflow-visible">+91 628311 6822</span>
                </motion.a>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="tel:+918146421901" 
                  className="hover:text-black transition-colors flex items-center gap-3 w-full max-w-full overflow-hidden justify-center"
                >
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">📞</span>
                  <span className="text-base md:text-lg truncate md:overflow-visible">+91 81464 21901</span>
                </motion.a>
              </div>
              <motion.a 
                whileHover={{ x: 5 }}
                href="https://www.instagram.com/bhupindraplanners" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-black transition-colors flex items-center gap-3 w-full max-w-full overflow-hidden justify-center"
              >
                <span className="shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">📸</span>
                <span className="text-base md:text-lg truncate md:overflow-visible">@bhupindra planners</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
