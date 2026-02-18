
import { motion } from "framer-motion";
import { ArrowUpRight, Book, GraduationCap, PenTool, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";

const courses = [
  {
    title: "IIT-JEE (Main & Adv)",
    desc: "Rigorous curriculum with daily live sessions, archived lectures, and adaptive practice sets.",
    icon: Layout,
    color: "from-blue-600 to-indigo-600",
    shadow: "shadow-blue-500/20"
  },
  {
    title: "NEET (Pre-Medical)",
    desc: "Detailed focus on NCERT benchmarks with expert-led biology and physics modules.",
    icon: GraduationCap,
    color: "from-rose-600 to-pink-600",
    shadow: "shadow-rose-500/20"
  },
  {
    title: "Class 12th Boards",
    desc: "Complete conceptual coverage with emphasis on board patterns and previous year analysis.",
    icon: Book,
    color: "from-emerald-600 to-teal-600",
    shadow: "shadow-emerald-500/20"
  },
  {
    title: "Class 10th Foundation",
    desc: "Strong foundational learning designed to nurture analytical thinking and competitive readiness.",
    icon: PenTool,
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20"
  },
];

const CourseCardGrid = () => {
  const { theme } = useThemeStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {courses.map((course, i) => (
        <Link to="/courses" key={course.title} className="block group">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`relative p-10 rounded-[3rem] border transition-all duration-700 h-full overflow-hidden ${
              theme === 'dark' 
                ? "bg-[#161b2c]/40 border-white/5 hover:border-white/10" 
                : "bg-white border-slate-100 shadow-xl shadow-blue-500/5 hover:shadow-2xl"
            }`}
          >
            {/* Hover Gradient Effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] transition-opacity duration-700 opacity-20 group-hover:opacity-40 bg-gradient-to-br ${course.color}`} />

            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${course.color} ${course.shadow} flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform duration-500`}>
                <course.icon size={30} />
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
                theme === 'dark' ? "border-white/10 text-white group-hover:bg-white group-hover:text-black" : "border-slate-200 text-slate-900 group-hover:bg-slate-900 group-hover:text-white"
              }`}>
                <ArrowUpRight size={24} />
              </div>
            </div>
            
            <h3 className={`text-3xl font-black mb-6 tracking-tight transition-colors ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>
              {course.title}
            </h3>
            <p className={`text-lg leading-relaxed mb-10 font-medium transition-colors ${
              theme === 'dark' ? "text-slate-400" : "text-slate-500"
            }`}>
              {course.desc}
            </p>
            
            <div className="flex items-center gap-3">
               <div className="flex -space-x-3">
                  {[1,2,3].map(j => (
                    <div key={j} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${course.title}${j}`} alt="student" />
                    </div>
                  ))}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">10k+ Learning Now</span>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default CourseCardGrid;
