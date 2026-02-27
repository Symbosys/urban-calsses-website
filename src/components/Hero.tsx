import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const banners = [
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    title: "India's Most Trusted Learning Platform",
    subtitle: "Join over 1 Crore+ Students learning with us",
    cta: "Explore Batches",
    color: "#2563eb"
  },
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    title: "Victory Batch for JEE 2026",
    subtitle: "Complete syllabus coverage with Top Educators",
    cta: "Enroll Now",
    color: "#7c3aed"
  },
  {
    image: "https://images.unsplash.com/photo-1501504905953-f8a979207e99?q=80&w=2070&auto=format&fit=crop",
    title: "Free Scholarship Test - 2026",
    subtitle: "Win up to 100% Scholarship on all courses",
    cta: "Register Free",
    color: "#db2777"
  }
];

const Hero = () => {
  const { theme } = useThemeStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className={`relative w-full h-[60vh] md:h-[80vh] lg:h-[85vh] overflow-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#05080e]' : 'bg-slate-50'
    }`}>
      {/* Main Slider Container */}
      <div className="relative w-full h-full group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={banners[currentSlide].image} 
                className="w-full h-full object-cover"
                alt={banners[currentSlide].title}
              />
              {/* Complex Gradient Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full w-full container mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-3xl"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-block px-4 py-1.5 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                >
                  Featured Program
                </motion.span>
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
                  {banners[currentSlide].title}
                </h2>
                <p className="text-lg md:text-2xl text-white/70 font-medium mb-10 max-w-2xl leading-relaxed">
                  {banners[currentSlide].subtitle}
                </p>
                <div className="flex flex-wrap gap-6">
                  <button 
                    style={{ backgroundColor: banners[currentSlide].color }}
                    className="px-10 md:px-14 py-4 md:py-5 text-white text-sm md:text-base font-black uppercase tracking-widest rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-black/20"
                  >
                    {banners[currentSlide].cta}
                  </button>
                  <button className="px-10 md:px-14 py-4 md:py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base font-black uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all">
                    View Schedule
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/5 hover:bg-blue-600/80 backdrop-blur-lg rounded-2xl hidden md:flex items-center justify-center text-white transition-all border border-white/10 hover:border-blue-400/50 shadow-2xl"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/5 hover:bg-blue-600/80 backdrop-blur-lg rounded-2xl hidden md:flex items-center justify-center text-white transition-all border border-white/10 hover:border-blue-400/50 shadow-2xl"
        >
          <ChevronRight size={32} strokeWidth={2.5} />
        </button>

        {/* Indicators Bar at Bottom */}
        <div className="absolute bottom-12 left-0 w-full z-20 flex justify-center gap-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-500 rounded-full h-1.5 ${
                currentSlide === i 
                  ? "w-16 bg-blue-600 shadow-lg shadow-blue-600/50" 
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
