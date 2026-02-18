
import { motion } from "framer-motion";
import { PlayCircle, Clock, Award, ShieldCheck } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

const freeCourses = [
  {
    title: "Urban Planning Basics",
    desc: "4 hours of core concepts delivered by top mentors.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    icon: Clock
  },
  {
    title: "Bridge Design Workshop",
    desc: "Live hands-on workshop on modern structural design.",
    img: "https://images.unsplash.com/photo-1449156001935-d2863fb72690?q=80&w=2070&auto=format&fit=crop",
    icon: Award
  },
  {
    title: "Smart City Orientation",
    desc: "Introduction to IoT and urban infrastructure.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    icon: ShieldCheck
  }
];

const FreeLearning = () => {
  const { theme } = useThemeStore();

  return (
    <section className={`py-32 transition-colors duration-700 ${
      theme === 'dark' ? "bg-black/20" : "bg-blue-50/50"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className={`px-4 py-1.5 rounded-full mb-6 border ${
               theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-blue-100 border-blue-200 text-blue-600'
             }`}
           >
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open Education</span>
           </motion.div>
           <h2 className={`text-5xl font-black mb-6 tracking-tighter ${
             theme === 'dark' ? "text-white" : "text-slate-900"
           }`}>Start For Free</h2>
           <p className={`text-xl font-medium max-w-2xl ${
             theme === 'dark' ? "text-slate-500" : "text-slate-600"
           }`}>No commitment, just pure learning. Quality education for everyone.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {freeCourses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group p-6 rounded-[2.5rem] border transition-all hover:shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-white/[0.02] border-white/5 hover:border-blue-500/30' 
                  : 'bg-white border-blue-100 shadow-xl shadow-blue-500/5 hover:border-blue-300'
              }`}
            >
              <div className="h-64 rounded-3xl mb-8 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={course.img} 
                  alt={course.title}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                   <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl">
                      <PlayCircle size={24} fill="currentColor" />
                   </div>
                </div>
              </div>
              
              <div className="space-y-4 px-2 pb-4">
                 <h3 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{course.title}</h3>
                 <p className={`text-sm font-bold leading-relaxed ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                    {course.desc}
                 </p>
                 <button className={`w-full py-5 border-2 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                   theme === 'dark'
                    ? 'border-white/10 text-white hover:bg-white hover:text-black'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-600/30'
                 }`}>
                   Watch Now
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeLearning;
