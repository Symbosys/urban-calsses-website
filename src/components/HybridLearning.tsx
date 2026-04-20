
import { motion } from "framer-motion";
import { MapPin, Users, Globe } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

const HybridLearning = () => {
  const { theme } = useThemeStore();

  return (
    <section className="py-16 md:py-24 lg:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border ${
          theme === 'dark' ? "bg-slate-900/50 border-white/5" : "bg-slate-900 border-slate-200"
        }`}>
          <div className="grid lg:grid-cols-2">
            
            {/* Left Content */}
            <div className="p-8 sm:p-12 md:p-16 lg:p-24 text-white flex flex-col justify-center space-y-8 md:space-y-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/30"
              >
                <MapPin className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </motion.div>
              
              <div className="space-y-6 md:space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] md:leading-[0.9] tracking-tighter">
                   Explore Hybrid <br className="hidden md:block" /> Learning.
                </h2>
                <p className="text-slate-400 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-xl">
                  Seamlessly transition between physical classrooms and digital excellence. The future of learning is here.
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Select your nearest center</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select className={`flex-1 bg-white/5 border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 px-6 md:px-8 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-sm ${
                    theme === 'dark' ? 'bg-white/5' : 'bg-slate-800'
                  }`}>
                    <option className="text-slate-900">Choose City</option>
                    <option className="text-secondary text-slate-900">Mumbai</option>
                    <option className="text-secondary text-slate-900">Delhi</option>
                    <option className="text-secondary text-slate-900">Bangalore</option>
                    <option className="text-secondary text-slate-900">Pune</option>
                  </select>
                  <button className="bg-white text-slate-900 font-black px-10 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 shadow-xl shadow-white/5">
                    Explore
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visuals */}
            <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-full overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/10">
                <img 
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-transform duration-[10s] hover:scale-110" 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Classroom"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
              </div>
              
              {/* Floating Stat Panels */}
              <div className="absolute bottom-8 md:bottom-12 inset-x-6 md:inset-x-12 flex gap-4 md:gap-6">
                <motion.div 
                   whileHover={{ y: -10 }}
                   className="bg-white/10 backdrop-blur-2xl p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex-1 text-center border border-white/10 shadow-2xl"
                >
                  <Globe className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 md:mb-4 text-white/50" />
                  <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">50+</p>
                  <p className="text-[8px] md:text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Centres</p>
                </motion.div>
                <motion.div 
                   whileHover={{ y: -10 }}
                   className="bg-white/10 backdrop-blur-2xl p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex-1 text-center border border-white/10 shadow-2xl"
                >
                  <Users className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 md:mb-4 text-white/50" />
                  <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">100k+</p>
                  <p className="text-[8px] md:text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Students</p>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HybridLearning;
