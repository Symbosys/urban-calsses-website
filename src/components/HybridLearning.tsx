
import { motion } from "framer-motion";
import { MapPin, Users, Globe } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

const HybridLearning = () => {
  const { theme } = useThemeStore();

  return (
    <section className="py-24 lg:py-40">
      <div className="container mx-auto px-6">
        <div className={`relative rounded-[4rem] overflow-hidden border ${
          theme === 'dark' ? "bg-slate-900/50 border-white/5" : "bg-slate-900 border-slate-200"
        }`}>
          <div className="grid lg:grid-cols-2">
            
            {/* Left Content */}
            <div className="p-12 lg:p-24 text-white flex flex-col justify-center space-y-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/30"
              >
                <MapPin size={36} className="text-white" />
              </motion.div>
              
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-black leading-[0.9] tracking-tighter">
                  Experience Hybrid Learning at <span className="text-blue-500">Urban Vidyapeeth.</span>
                </h2>
                <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
                  Bring your dreams to reality with our world-class offline infrastructure. India's best faculty is now in your city.
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Select your nearest center</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select className={`flex-1 bg-white/5 border-white/10 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-sm ${
                    theme === 'dark' ? 'bg-white/5' : 'bg-slate-800'
                  }`}>
                    <option className="text-slate-900">Choose City</option>
                    <option className="text-secondary text-slate-900">Mumbai</option>
                    <option className="text-secondary text-slate-900">Delhi</option>
                    <option className="text-secondary text-slate-900">Bangalore</option>
                    <option className="text-secondary text-slate-900">Pune</option>
                  </select>
                  <button className="bg-white text-slate-900 font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 shadow-xl shadow-white/5">
                    Explore
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visuals */}
            <div className="relative min-h-[500px] lg:min-h-full overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/10">
                <img 
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-transform duration-[10s] hover:scale-110" 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Classroom"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
              </div>
              
              {/* Floating Stat Panels */}
              <div className="absolute bottom-12 inset-x-12 flex gap-6">
                <motion.div 
                   whileHover={{ y: -10 }}
                   className="bg-white/10 backdrop-blur-2xl p-8 rounded-[2.5rem] flex-1 text-center border border-white/10 shadow-2xl"
                >
                  <Globe className="mx-auto mb-4 text-white/50" />
                  <p className="text-4xl font-black text-white tracking-tighter">50+</p>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Centres</p>
                </motion.div>
                <motion.div 
                   whileHover={{ y: -10 }}
                   className="bg-white/10 backdrop-blur-2xl p-8 rounded-[2.5rem] flex-1 text-center border border-white/10 shadow-2xl"
                >
                  <Users className="mx-auto mb-4 text-white/50" />
                  <p className="text-4xl font-black text-white tracking-tighter">100k+</p>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Offline Students</p>
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
