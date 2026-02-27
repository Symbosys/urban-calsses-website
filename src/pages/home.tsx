
import Hero from '../components/Hero';
import LiveClasses from '../components/LiveClasses';
import WhyChooseUs from '../components/WhyChooseUs';
import CourseCardGrid from '../components/CourseCardGrid';

import TestimonialSlider from '../components/TestimonialSlider';
import TrustMarquee from '../components/TrustMarquee';
import BatchSlider from '../components/BatchSlider';
import HybridLearning from '../components/HybridLearning';
import FreeLearning from '../components/FreeLearning';
import HallOfFame from '../components/HallOfFame';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const Home = () => {
  const { theme } = useThemeStore();

  return (
    <div className={`min-h-screen transition-all duration-700 overflow-hidden ${
      theme === 'dark' ? "bg-[#0b0f1a]" : "bg-slate-50"
    }`}>
      <Hero />
      
      <div className={`transition-colors duration-300 relative z-20 ${
        theme === 'dark' ? "bg-black/20" : "bg-white"
      }`}>
        <TrustMarquee />
      </div>

      {/* Trending Batches Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
           <div className="flex justify-between items-end">
              <div>
                 <h2 className={`text-4xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Trending Batches</h2>
                 <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-widest">Pick the best batch to accelerate your learning journey</p>
              </div>
              <motion.button 
                whileHover={{ x: 5 }}
                className="text-blue-500 font-black flex items-center gap-2 text-xs uppercase tracking-widest"
              >
                 View All <ArrowRight size={16} />
              </motion.button>
           </div>
        </div>
        <BatchSlider />
      </section>

      {/* Hybrid Learning Section */}
      <HybridLearning />

      {/* Course Grid Section */}
      <section className="container mx-auto px-6 py-32 relative">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] opacity-20 pointer-events-none ${theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-300/20'}`} />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 ${
            theme === 'dark' ? "bg-white/5 text-slate-400 border border-white/10" : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}>
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Curated Learning Streams</span>
          </div>
          <h3 className={`text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none transition-colors ${
            theme === 'dark' ? "text-white" : "text-slate-900"
          }`}>Elite Academic Programs</h3>
          <p className={`text-xl font-medium transition-colors max-w-3xl mx-auto leading-relaxed ${
            theme === 'dark' ? "text-slate-400" : "text-slate-600"
          }`}>
            Architect your success with programs engineered for high performance. 
            From fundamental clarity to competitive mastery.
          </p>
        </motion.div>
        <CourseCardGrid />
      </section>

      {/* Free Learning Section */}
      <FreeLearning />

      <LiveClasses />
      
      <WhyChooseUs />
      
      {/* Hall of Fame / Performers Section */}
      <HallOfFame />
      
      <TestimonialSlider />

      {/* Extreme CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-blue-600 rounded-[4rem] p-16 md:p-32 text-center overflow-hidden shadow-[0_50px_100px_-20px_rgba(37,99,235,0.4)]"
          >
            {/* Animated Glow Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-[50%] -right-[20%] w-[1000px] h-[1000px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />
            
            <h3 className="text-5xl md:text-8xl font-black text-white mb-10 relative z-10 leading-[0.9] tracking-tighter">
               Join The Next <br /> Generation.
            </h3>
            <p className="text-blue-100 text-xl md:text-2xl mb-16 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
               Register now for a FREE diagnostic assessment and unlock your potential with India's most results-driven mentors.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center relative z-10">
              <button className="px-12 py-6 bg-white text-blue-600 font-black text-sm uppercase tracking-widest rounded-3xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95">
                Apply for Admission
              </button>
              <button className="px-12 py-6 bg-blue-700 text-white font-black text-sm uppercase tracking-widest rounded-3xl hover:bg-blue-800 transition-all border border-blue-500/50 active:scale-95 flex items-center justify-center gap-3 shadow-xl">
                 Consult Expert <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
