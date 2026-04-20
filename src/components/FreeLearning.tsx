
import { motion } from "framer-motion";
import { PlayCircle, Loader2 } from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { useFreeCourses } from "../api/hooks/courses/course.hooks";
import { Link } from "react-router-dom";

const FreeLearning = () => {
  const { theme } = useThemeStore();
  const { data, isLoading } = useFreeCourses();

  const courses = data?.courses || [];

  return (
    <section className={`py-16 md:py-32 transition-colors duration-700 ${
      theme === 'dark' ? "bg-black/20" : "bg-blue-50/50"
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className={`px-4 py-1.5 rounded-full mb-6 border ${
               theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-blue-100 border-blue-200 text-blue-600'
             }`}
           >
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open Education</span>
           </motion.div>
           <h2 className={`text-3xl md:text-5xl font-black mb-6 tracking-tighter ${
             theme === 'dark' ? "text-white" : "text-slate-900"
           }`}>Start For Free</h2>
           <p className={`text-lg md:text-xl font-medium max-w-2xl ${
             theme === 'dark' ? "text-slate-500" : "text-slate-600"
           }`}>No commitment, just pure learning. Quality education for everyone.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`p-6 rounded-[2.5rem] border animate-pulse ${
                theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-blue-100'
              }`}>
                <div className="h-48 md:h-64 rounded-3xl bg-slate-200/20 mb-8" />
                <div className="h-6 w-3/4 bg-slate-200/20 rounded mb-4" />
                <div className="h-4 w-full bg-slate-200/20 rounded mb-8" />
                <div className="h-14 w-full bg-slate-200/20 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border transition-all hover:shadow-2xl ${
                  theme === 'dark' 
                    ? 'bg-white/[0.02] border-white/5 hover:border-blue-500/30' 
                    : 'bg-white border-blue-100 shadow-xl shadow-blue-500/5 hover:border-blue-300'
                }`}
              >
                <div className="h-48 md:h-64 rounded-2xl md:rounded-3xl mb-6 md:mb-8 overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={course.thumbnail?.secure_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"} 
                    alt={course.title}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-3">
                     <div className="p-2.5 md:p-3 bg-blue-600 rounded-xl md:rounded-2xl text-white shadow-xl">
                        <PlayCircle className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
                     </div>
                  </div>
                </div>
                
                <div className="space-y-4 px-2 pb-4">
                   <h3 className={`text-lg md:text-xl font-black line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{course.title}</h3>
                   <p className={`text-sm font-bold leading-relaxed line-clamp-2 h-10 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                      {course.shortDescription || "Unlock your potential with this free specialized session."}
                   </p>
                   <Link to={`/courses/${course.slug}`}>
                     <button className={`w-full py-4 md:py-5 border-2 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                       theme === 'dark'
                        ? 'border-white/10 text-white hover:bg-white hover:text-black'
                        : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-600/30'
                     }`}>
                       Watch Now
                     </button>
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className={`text-xl font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              Check back soon for new free courses!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeLearning;
