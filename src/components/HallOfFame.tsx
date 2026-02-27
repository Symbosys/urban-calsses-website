
import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

import { useInstructors } from "../api/hooks/instructor/instructor.hooks";

const HallOfFame = () => {
  const { theme } = useThemeStore();
  const { data, isLoading } = useInstructors({ limit: 5 });

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const instructors = data?.instructors || [];

  return (
    <section className="py-24 lg:py-40">
      <div className="container mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="max-w-4xl mx-auto mb-20"
        >
           <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 ${
             theme === 'dark' ? "bg-white/5 text-slate-400 border border-white/10" : "bg-slate-100 text-slate-600 border border-slate-200"
           }`}>
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Legacy of Excellence</span>
           </div>
           <h2 className={`text-5xl md:text-7xl font-black mb-6 tracking-tighter ${
             theme === 'dark' ? "text-white" : "text-slate-900"
           }`}>Our Top Performers</h2>
           <p className={`text-xl font-medium max-w-2xl mx-auto leading-relaxed ${
             theme === 'dark' ? "text-slate-500" : "text-slate-600"
           }`}>Witness the success stories of students who made it to the top firms.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {instructors.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6 group"
            >
              <div className={`aspect-square rounded-[2.5rem] overflow-hidden border-8 transition-all duration-700 group-hover:scale-105 group-hover:rotate-3 shadow-2xl ${
                theme === 'dark' ? 'border-white/5 shadow-white/5' : 'border-white shadow-blue-500/10'
              }`}>
                <img 
                  alt={p.name || ""} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" 
                  src={p.avatar?.secure_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"} 
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <p className={`text-lg font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{p.name}</p>
                <div className="flex items-center justify-center gap-2">
                   <Award size={12} className="text-blue-500" />
                   <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{p.specialization || "Expert Faculty"}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button 
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           className={`mt-24 px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all ${
             theme === 'dark' ? "bg-white text-black" : "bg-slate-900 text-white"
           }`}
        >
           View Hall of Fame
        </motion.button>
      </div>
    </section>
  );
};

export default HallOfFame;
