import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const exteriorImages = [
  'https://drive.google.com/thumbnail?id=1UKtzp3eeF6SBbBjhSAR0oQfR3kWEDP3G&sz=w1000',
  'https://drive.google.com/thumbnail?id=1yQ-Z8C2Twe19uw17_fkCNXn5aksMxMRD&sz=w1000',
  'https://drive.google.com/thumbnail?id=170qtL4Zwq-DW-NrRyFXXdRTek0IA9iVS&sz=w1000',
  'https://drive.google.com/thumbnail?id=1jllsJFlmpnhmijK_T5vrfSdoW-Yds_Ir&sz=w1000',
  'https://drive.google.com/thumbnail?id=1tp4hd0FuxxxacR9DbnHt491nr-KJOfOy&sz=w1000',
  'https://drive.google.com/thumbnail?id=1Olaa3X8tEODT0F7oXHRRcsH1WRNeKEhZ&sz=w1000',
  'https://drive.google.com/thumbnail?id=1qREtu3pL5VYZwpE0LYL-4MbrjDf8CoRP&sz=w1000',
  'https://drive.google.com/thumbnail?id=15BOrcWwICT9lPfET8UlyAvxnGo1p3T8U&sz=w1000',
  'https://drive.google.com/thumbnail?id=1ei8Jc6m--_Mn7GiYOH5WOZI_gr4FRm_y&sz=w1000',
  'https://drive.google.com/thumbnail?id=1KzzCZi65INehRkRENdit4I3I0hkrVqOc&sz=w1000',
  'https://drive.google.com/thumbnail?id=1_Jm9aUVUKdLqY5gTBkkKCwTAx2OPxyaF&sz=w1000',
  'https://drive.google.com/thumbnail?id=1dUqSE6UKW01g5tWknoZNxkKhq-UPz95R&sz=w1000',
  'https://drive.google.com/thumbnail?id=14R7WjoIMo5N36TAcy4iLioom_34jCrIJ&sz=w1000',
];

const interiorImages = [
  'https://drive.google.com/thumbnail?id=1w4dUN-AbQOmSIwYVWVDQhE18hBaeX1nr&sz=w1000',
  'https://drive.google.com/thumbnail?id=1fG1hzYk66qqfh-IJSvxlCycIBb_4wA24&sz=w1000',
  'https://drive.google.com/thumbnail?id=16r0EEG73ZAF-VyYnY0PmhpV-LoOLxHBE&sz=w1000',
  'https://drive.google.com/thumbnail?id=1eN4okyX6oVPay65Zz2z5WpyVD-NVi5Er&sz=w1000',
  'https://drive.google.com/thumbnail?id=1W6-lCtqPtbsXzNbSA5aI_S4xOOUX6XHT&sz=w1000',
  'https://drive.google.com/thumbnail?id=1E2HPv3_gTBzhwjC5pt4SsgkEQcKbpMMs&sz=w1000',
  'https://drive.google.com/thumbnail?id=1HH2D7EqsGVqwjpy5bQMhGOtnL7jywN6a&sz=w1000',
  'https://drive.google.com/thumbnail?id=1hlUr6RKeFsEJ2Vldomnz_4qdekz09q5l&sz=w1000',
  'https://drive.google.com/thumbnail?id=1997DBhYme18kTWoUH2IdnLeTAdxTMqYb&sz=w1000',
  'https://drive.google.com/thumbnail?id=1Tom1ouv5aze1Ad3lrGzthA85CL8N7iJw&sz=w1000',
  'https://drive.google.com/thumbnail?id=1Yzc9s827B_Z2uJjQc1BieiavQL7qRYx9&sz=w1000',
  'https://drive.google.com/thumbnail?id=1uFm1wFt_dLls1TXEOjTmbVCKSrtH7OY3&sz=w1000',
  'https://drive.google.com/thumbnail?id=1BpyA4Cp8EtTDMYE1YrrSGt2dbwck0yCi&sz=w1000',
];

// Combine and shuffle slightly for a better "All" view, or just alternate
const allPortfolioImages = [
  ...exteriorImages.map(src => ({ src, type: 'exterior' as const })),
  ...interiorImages.map(src => ({ src, type: 'interior' as const }))
].sort((a, b) => {
  // Simple alternating sort to mix interior and exterior
  const aIndex = a.type === 'exterior' ? exteriorImages.indexOf(a.src) : interiorImages.indexOf(a.src);
  const bIndex = b.type === 'exterior' ? exteriorImages.indexOf(b.src) : interiorImages.indexOf(b.src);
  return aIndex - bIndex;
});

type FilterType = 'all' | 'exterior' | 'interior';

export default function Portfolio() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const filteredImages = allPortfolioImages.filter(img => filter === 'all' || img.type === filter);
  const displayedImages = isExpanded ? filteredImages : filteredImages.slice(0, 5);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex, isMobile, filteredImages.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightboxOpen) return;
    const step = isMobile ? 1 : 2;
    setCurrentIndex((prev) => {
      if (prev - step < 0) {
        const remainder = filteredImages.length % step;
        return filteredImages.length - (remainder === 0 ? step : remainder);
      }
      return prev - step;
    });
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightboxOpen) return;
    const step = isMobile ? 1 : 2;
    setCurrentIndex((prev) => {
      if (prev + step >= filteredImages.length) return 0;
      return prev + step;
    });
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(isMobile ? index : (index % 2 !== 0 ? index - 1 : index));
    setLightboxOpen(true);
  };

  return (
    <section id="portfolio" className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto relative">
      {/* Hidden preloader */}
      <div className="absolute w-0 h-0 opacity-0 overflow-hidden pointer-events-none">
        {allPortfolioImages.map((img, index) => (
          <img key={index} src={img.src} referrerPolicy="no-referrer" loading="lazy" decoding="async" />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-gray-900">Our Work Highlights</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {(['all', 'exterior', 'interior'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setIsExpanded(false); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f 
                  ? 'bg-[#F2C94C] text-black shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 gap-8 space-y-8">
        <AnimatePresence mode="popLayout">
          {displayedImages.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ 
                duration: 0.5, 
                delay: (index % 3) * 0.05,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500"
              onClick={() => openLightbox(index)}
            >
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={img.src} 
                alt={`Portfolio ${img.type}`}
                className="w-full h-auto object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <div className="overflow-hidden">
                  <motion.span 
                    variants={{
                      initial: { y: "100%" },
                      hover: { y: 0 }
                    }}
                    initial="initial"
                    whileHover="hover"
                    className="text-white inline-block transition-transform duration-500 font-medium tracking-widest uppercase text-xs drop-shadow-md border-b border-white/40 pb-1"
                  >
                    View Project
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View All Button */}
      {!isExpanded && filteredImages.length > 5 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => setIsExpanded(true)}
            className="group flex items-center gap-3 px-8 py-4 bg-[#F2C94C] text-black rounded-full font-bold hover:bg-[#F2C94C]/80 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            View All Projects 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}

      {/* Catalogue Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-6 text-white/70 hover:text-white transition-colors z-50 p-2 md:p-4"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div 
            className="relative w-full max-w-6xl h-[70vh] md:h-[85vh] flex items-center justify-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Book Container */}
            <div className="relative w-full h-full flex bg-[#FDFBF7] rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Left Page (Hidden on mobile) */}
              <div className="hidden md:flex flex-1 relative border-r border-black/10 flex-col items-center justify-center p-8 lg:p-12">
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/[0.08] to-transparent pointer-events-none z-10" />
                
                {filteredImages[currentIndex] ? (
                  <motion.img 
                    key={`left-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    src={filteredImages[currentIndex].src} 
                    alt="Left Page"
                    className="w-full h-full object-contain shadow-sm bg-white p-2"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 font-serif italic">Blank Page</div>
                )}
                
                <div className="absolute bottom-6 left-8 text-xs text-gray-400 font-medium tracking-widest">
                  {currentIndex + 1}
                </div>
              </div>

              {/* Right Page (Full width on mobile) */}
              <div className="flex-1 relative flex flex-col items-center justify-center p-6 md:p-8 lg:p-12">
                <div className="hidden md:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/[0.08] to-transparent pointer-events-none z-10" />
                
                {/* Mobile Image */}
                {isMobile && filteredImages[currentIndex] && (
                  <motion.img 
                    key={`mobile-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    src={filteredImages[currentIndex].src} 
                    alt="Page"
                    className="w-full h-full object-contain shadow-sm bg-white p-2"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Desktop Right Image */}
                {!isMobile && filteredImages[currentIndex + 1] ? (
                  <motion.img 
                    key={`desktop-${currentIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    src={filteredImages[currentIndex + 1].src} 
                    alt="Right Page"
                    className="w-full h-full object-contain shadow-sm bg-white p-2"
                    referrerPolicy="no-referrer"
                  />
                ) : !isMobile && (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 font-serif italic">Blank Page</div>
                )}

                <div className="absolute bottom-6 right-8 text-xs text-gray-400 font-medium tracking-widest">
                  {isMobile ? currentIndex + 1 : currentIndex + 2}
                </div>
              </div>

              {/* Center Spine Line */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-black/5 z-20"></div>
            </div>
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-6 text-white/70 hover:text-white transition-colors z-50 p-2 md:p-4"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  );
}
