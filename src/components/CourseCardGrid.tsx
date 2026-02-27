
import { motion } from "framer-motion";
import { ArrowUpRight, Book, GraduationCap, PenTool, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";

import { useCourses } from "../api/hooks/courses/course.hooks";
import { useAuthStore } from "../store/authStore";
import { useToggleWishlist, useWishlist } from "../api/hooks/user/wishlist.hooks";
import { Bookmark } from "lucide-react";

const CourseCardGrid = () => {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  const { data, isLoading } = useCourses({ limit: 4 });
  const { data: wishlistData } = useWishlist(user?.id || "");
  const { mutate: toggleWishlist, isPending: isToggling } = useToggleWishlist();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-80 rounded-[3rem] animate-pulse ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`} />
        ))}
      </div>
    );
  }

  const courses = data?.courses || [];
  const wishlistIds = new Set(wishlistData?.wishlist?.map(item => item.id) || []);

  const handleToggleWishlist = (e: React.MouseEvent, courseId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleWishlist({ courseId, userId: user.id });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {courses.map((course, i) => {
        const isWishlisted = wishlistIds.has(course.id);
        const configs = [
          { color: "from-blue-600 to-indigo-600", shadow: "shadow-blue-500/20", icon: Layout },
          { color: "from-rose-600 to-pink-600", shadow: "shadow-rose-500/20", icon: GraduationCap },
          { color: "from-emerald-600 to-teal-600", shadow: "shadow-emerald-500/20", icon: Book },
          { color: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/20", icon: PenTool }
        ];
        const config = configs[i % configs.length];

        return (
          <Link to={`/course/${course.id}`} key={course.id} className="block group">
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
              <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] transition-opacity duration-700 opacity-20 group-hover:opacity-40 bg-gradient-to-br ${config.color}`} />

              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${config.color} ${config.shadow} flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform duration-500`}>
                  <config.icon size={30} />
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
                  theme === 'dark' ? "border-white/10 text-white group-hover:bg-white group-hover:text-black" : "border-slate-200 text-slate-900 group-hover:bg-slate-900 group-hover:text-white"
                }`}>
                  <ArrowUpRight size={24} />
                </div>
              </div>

              <button 
                onClick={(e) => handleToggleWishlist(e, course.id)}
                disabled={isToggling}
                className={`absolute top-10 right-24 z-20 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
                  isWishlisted 
                    ? "bg-blue-600 border-blue-600 text-white" 
                    : theme === 'dark' 
                      ? "border-white/10 text-slate-400 hover:text-white" 
                      : "border-slate-200 text-slate-400 hover:text-blue-500"
                }`}
              >
                <Bookmark size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
              
              <h3 className={`text-3xl font-black mb-6 tracking-tight transition-colors ${
                theme === 'dark' ? "text-white" : "text-slate-900"
              }`}>
                {course.title}
              </h3>
              <p className={`text-lg leading-relaxed mb-10 font-medium transition-colors ${
                theme === 'dark' ? "text-slate-400" : "text-slate-500"
              }`}>
                {course.shortDescription}
              </p>
              
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(j => (
                      <div key={j} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden text-[8px] flex items-center justify-center font-black">
                         {course.title.charAt(0)}
                      </div>
                    ))}
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">10k+ Learning Now</span>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default CourseCardGrid;
