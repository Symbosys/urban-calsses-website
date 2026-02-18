
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Award, Sparkles } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const testimonials = [
  {
    id: 1,
    name: "Aryan Kapoor",
    role: "IIT Delhi (JEE Adv AIR 452)",
    text: "The conceptual clarity and personal mentorship I received at Urban Classes were fundamental to my success. The teachers truly care about student growth.",
    image: "https://i.pravatar.cc/150?u=aryan",
    achievement: "IIT DELHI — AIR 452"
  },
  {
    id: 2,
    name: "Sanya Malhotra",
    role: "AIIMS Delhi (NEET AIR 28)",
    text: "The doubt-solving engine and NCERT focused modules allowed me to secure my dream seat. Truly the best platform for medical aspirants.",
    image: "https://i.pravatar.cc/150?u=sanya",
    achievement: "AIIMS DELHI — AIR 28"
  },
  {
    id: 3,
    name: "Rahul Deshmukh",
    role: "NIT Surathkal (JEE Main 99.8%ile)",
    text: "Structured study plans and consistent mocks built my confidence. The analytics provided after each test were extremely insightful.",
    image: "https://i.pravatar.cc/150?u=rahul",
    achievement: "NIT SURATHKAL — 99.8%ile"
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useThemeStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={`py-32 transition-colors duration-700 overflow-hidden relative ${
      theme === 'dark' ? "bg-[#080b14]" : "bg-white"
    }`}>
      {/* Dynamic Background Elements */}
      <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none ${
        theme === 'dark' ? "bg-indigo-600/5" : "bg-indigo-100/40"
      }`} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 ${
            theme === 'dark' ? "bg-amber-500/10 text-amber-500" : "bg-amber-50 text-amber-600"
          }`}>
             <Award size={14} className="animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Legacy of Success</span>
          </div>
          <h2 className={`text-4xl md:text-6xl font-black tracking-tighter transition-colors ${
            theme === 'dark' ? "text-white" : "text-slate-900"
          }`}>Real Stories, Real Results</h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className={`relative grid lg:grid-cols-2 items-center gap-16 p-12 lg:p-20 rounded-[4rem] border backdrop-blur-3xl transition-all ${
                theme === 'dark' ? "bg-[#161b2c]/60 border-white/5" : "bg-white border-slate-100 shadow-2xl shadow-blue-500/5 font-semibold"
              }`}
            >
              {/* Left Side: Large Image & Badge */}
              <div className="relative order-2 lg:order-1">
                 <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                   <img src={testimonials[currentIndex].image} className="w-full h-full object-cover" alt="Student" />
                   <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />
                   <div className="absolute bottom-10 left-10">
                      <div className="flex text-yellow-500 mb-2">
                         {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" strokeWidth={0} />)}
                      </div>
                      <h4 className="text-white text-3xl font-black tracking-tight">{testimonials[currentIndex].name}</h4>
                      <p className="text-blue-400 text-xs font-black uppercase tracking-widest mt-1">{testimonials[currentIndex].role}</p>
                   </div>
                 </div>
                 {/* Floating Achievement Banner */}
                 <div className="absolute -top-6 -right-6 lg:-right-10 px-8 py-6 bg-blue-600 text-white rounded-[2rem] shadow-2xl transform rotate-3 flex items-center gap-4">
                    <Sparkles size={24} className="text-white/80" />
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/60 leading-none mb-1">PROUD ALUMNI</p>
                      <p className="text-xl font-black leading-none">{testimonials[currentIndex].achievement}</p>
                    </div>
                 </div>
              </div>

              {/* Right Side: Text Quote */}
              <div className="order-1 lg:order-2">
                 <Quote size={80} className="text-blue-600/10 mb-8" />
                 <p className={`text-2xl lg:text-3xl font-bold leading-relaxed transition-colors mb-12 ${
                   theme === 'dark' ? "text-slate-300 italic" : "text-slate-700 italic"
                 }`}>
                   "{testimonials[currentIndex].text}"
                 </p>
                 <div className="flex items-center gap-6">
                   <button 
                     onClick={prev}
                     className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all active:scale-90 ${
                       theme === 'dark' ? "border-white/10 text-white hover:bg-white/5" : "border-slate-200 text-slate-900 hover:bg-slate-50"
                     }`}
                   >
                     <ChevronLeft size={24} />
                   </button>
                   <button 
                     onClick={next}
                     className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-600 text-white shadow-xl shadow-blue-600/30 transition-all active:scale-90"
                   >
                     <ChevronRight size={24} />
                   </button>
                   <div className="flex gap-2 ml-4">
                      {testimonials.map((_, i) => (
                        <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-700'}`} />
                      ))}
                   </div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
