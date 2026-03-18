import React from 'react';
import { motion } from 'motion/react';
import { Sun, Wind, Sparkles } from 'lucide-react';

export default function Expertise() {
  const bgImage = "https://drive.google.com/thumbnail?id=1BpyA4Cp8EtTDMYE1YrrSGt2dbwck0yCi&sz=w1920";

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-24 px-6">
      {/* Background Image - Last Interior Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Very light gradient just for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-sm font-bold tracking-wider uppercase mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#F2C94C]" /> Our Expertise
          </span>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Mastering Natural Light <br /> & Fresh Air Circulation
          </h2>
          
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
            We specialize in creating homes that breathe. Our designs prioritize cross-ventilation and strategic window placement to flood your living spaces with healthy, natural light and continuous fresh air.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-left shadow-2xl transition-all duration-300"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="w-14 h-14 rounded-2xl bg-[#F2C94C] flex items-center justify-center mb-6 shadow-lg shadow-[#F2C94C]/20"
              >
                <motion.div
                  animate={{ 
                    y: [12, -8, 12],
                    x: [-12, 0, 12],
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.1, 0.8]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sun className="w-8 h-8 text-black" />
                </motion.div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-white">Natural Lighting</h3>
              <p className="text-gray-100 leading-relaxed font-medium">
                Strategic orientation and large openings ensure that every corner of your home is illuminated by the sun, reducing energy costs and boosting well-being.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-left shadow-2xl transition-all duration-300"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.4
                }}
                className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-lg shadow-white/10"
              >
                <motion.div
                  animate={{ 
                    x: [-15, 15],
                    y: [0, -5, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Wind className="w-8 h-8 text-black" />
                </motion.div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-white">Air Circulation</h3>
              <p className="text-gray-100 leading-relaxed font-medium">
                Our layouts are engineered for cross-ventilation, ensuring a constant flow of fresh air that keeps your home cool, healthy, and odor-free naturally.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
