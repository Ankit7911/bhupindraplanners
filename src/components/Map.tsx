import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Map() {
  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Visit Our Studio</h2>
        <p className="text-gray-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5 text-gray-400" />
          Come talk to us about your dream project.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 h-[450px] group"
      >
        {/* Google Maps Embed */}
        <iframe 
          src="https://maps.google.com/maps?q=Bhupindra%20Planners%20and%20Sons%20Fatehgarh%20Sahib&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="md:grayscale hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </motion.div>
    </section>
  );
}
