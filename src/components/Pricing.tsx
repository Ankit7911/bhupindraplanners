import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

const plans = [
  {
    name: 'ECONOMICAL PLAN',
    target: 'Essential features',
    price: '24,999/-',
    features: [
      'Ground Floor Plan',
      'First Floor Plan',
      'Guidance',
      '2D & 3D Elevation',
      'Joinery',
      'Detail Drawings (Beams & Columns)',
      'Sanitary Drawings',
      'Electrical Drawings'
    ],
    dark: false,
    link: 'https://wa.link/tcwhkc',
  },
  {
    name: 'STANDARD PLAN',
    target: '',
    price: '36,999/-',
    features: [
      'Ground Floor Plan',
      'First Floor Plan',
      'Guidance',
      '2D & 3D Elevation',
      'Joinery',
      'Detail Drawings (Beams & Columns)',
      'Sanitary Drawings',
      'Electrical Drawings',
      'Interior Static images'
    ],
    boldFeatures: ['Interior Static images'],
    dark: true,
    link: 'https://wa.link/zryjg0',
  },
  {
    name: 'PREMIUM PLAN',
    target: '+ 5000/- Per Room Interior',
    price: '49,999/-',
    features: [
      'Ground Floor Plan',
      'First Floor Plan',
      'Guidance',
      '2D & 3D Elevation',
      'Joinery',
      'Detail Drawings (Beams & Columns)',
      'Sanitary Drawings',
      'Electrical Drawings',
      'Interior Images, Material Guide, Details and Dimensions.'
    ],
    boldFeatures: ['Interior Images, Material Guide, Details and Dimensions.'],
    dark: false,
    link: 'https://wa.link/psls8u',
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-8 md:px-16 lg:px-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-scroll md:bg-fixed"
        style={{
          backgroundImage: 'url("https://drive.google.com/thumbnail?id=1rgvGgTaYnwljhuK9Y_OaVToZQM5zm5jI&sz=w1920-h1080")',
        }}
      >
        <div className="absolute inset-0 bg-[#8C857B]/40 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4 drop-shadow-lg">
            OUR SERVICES
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              key={index}
              className={`relative rounded-3xl p-10 flex flex-col backdrop-blur-xl border transition-all duration-500 ${
                plan.dark 
                  ? 'bg-black/40 border-white/20 text-white md:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
                  : 'bg-white/10 border-white/30 text-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
              }`}
            >
              {plan.dark && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-sm text-gray-200">{plan.target}</p>
              </div>
              
              <div className="mb-8">
                <p className="text-sm mb-1 text-gray-200">Starting from</p>
                <div className="text-3xl font-bold">₹ {plan.price}</div>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="rounded-full p-0.5 mt-0.5 shrink-0 bg-white/20">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={plan.boldFeatures?.includes(feature) ? 'font-bold' : ''}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative w-full py-3 rounded-xl text-sm font-medium transition-all backdrop-blur-md border overflow-hidden shadow-[inset_0_0_10px_rgba(255,255,255,0.1),0_4px_15px_rgba(0,0,0,0.1)] ${
                  plan.dark
                    ? 'bg-white/10 border-white/50 text-white hover:bg-white/20 hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.2),0_4px_20px_rgba(255,255,255,0.2)]'
                    : 'bg-white/5 border-white/40 text-white hover:bg-white/10 hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.2),0_4px_20px_rgba(255,255,255,0.15)]'
                }`}
              >
                <div className="relative h-5 flex flex-col items-center justify-center overflow-hidden">
                  <span className="absolute transition-all duration-500 group-hover:-translate-y-8">
                    Know More
                  </span>
                  <span className="absolute translate-y-8 transition-all duration-500 group-hover:translate-y-0 text-white font-bold">
                    GET QUOTE
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
