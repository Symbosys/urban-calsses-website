
import { motion } from 'framer-motion';
import { Calendar, Users, ChevronRight, Bookmark, Sparkles } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';

import { useCourses } from '../api/hooks/courses/course.hooks';
import { useAuthStore } from '../store/authStore';
import { useToggleWishlist, useWishlist } from '../api/hooks/user/wishlist.hooks';

const BatchSlider = () => {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  const { data, isLoading } = useCourses({ isFeatured: true, limit: 3 });
  const { data: wishlistData } = useWishlist(user?.id || "");
  const { mutate: toggleWishlist, isPending: isToggling } = useToggleWishlist();

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-32 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const courses = data?.courses || [];
  const wishlistIds = new Set(wishlistData?.wishlist?.map(item => item.id) || []);

  const handleToggleWishlist = (courseId: string) => {
    if (!user) return;
    toggleWishlist({ courseId, userId: user.id });
  };

  return (
    <section className={`py-32 transition-colors duration-700 overflow-hidden relative ${
      theme === 'dark' ? "bg-[#0b0f1a]" : "bg-slate-50"
    }`}>
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 ${
              theme === 'dark' ? "bg-blue-600/10 text-blue-400" : "bg-blue-50 text-blue-600"
            }`}>
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Enrollment Phase</span>
            </div>
            <h2 className={`text-4xl md:text-6xl font-black tracking-tighter transition-colors ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>Upcoming Batches</h2>
          </div>
          <Link to="/courses" className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 group">
            Explore All Batches <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {courses.map((course, i) => {
            const isWishlisted = wishlistIds.has(course.id);
            const gradients = [
              "from-blue-600 to-indigo-600",
              "from-rose-600 to-pink-600",
              "from-emerald-600 to-teal-600"
            ];
            const gradient = gradients[i % gradients.length];
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`group relative p-10 rounded-[3rem] border transition-all duration-700 h-full ${
                  theme === 'dark' 
                    ? "bg-[#161b2c]/60 border-white/5 hover:border-blue-500/30" 
                    : "bg-white border-slate-100 shadow-xl shadow-blue-500/5 hover:shadow-2xl"
                }`}
              >
                <div className="flex justify-between items-start mb-10">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    theme === 'dark' ? "bg-white/5 text-blue-400 border border-white/10" : "bg-blue-50 text-blue-600 border border-blue-100"
                  }`}>
                    {course.tags?.[0]?.name || "🔥 Trending"}
                  </span>
                  <button 
                    onClick={() => handleToggleWishlist(course.id)}
                    disabled={isToggling}
                    className={`transition-colors ${isWishlisted ? 'text-blue-500' : 'text-slate-500 hover:text-blue-500'}`}
                  >
                    <Bookmark size={20} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                </div>

                <h4 className={`text-3xl font-black mb-4 tracking-tight transition-colors group-hover:text-blue-500 ${
                  theme === 'dark' ? "text-white" : "text-slate-900"
                }`}>
                  {course.title}
                </h4>
                <p className="text-blue-500 font-bold text-sm mb-10 uppercase tracking-widest">{course.shortDescription}</p>

                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      theme === 'dark' ? "bg-white/5 text-slate-400" : "bg-slate-50 text-slate-500"
                    }`}>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Classes Begin</p>
                      <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>{new Date(course.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      theme === 'dark' ? "bg-white/5 text-slate-400" : "bg-slate-50 text-slate-500"
                    }`}>
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Batch Status</p>
                      <p className={`text-sm font-black text-emerald-500`}>Enrollment Open</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-10 border-t border-slate-800/10">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Fee Plan</p>
                    <p className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>₹{course.price}</p>
                  </div>
                  <Link to={`/course/${course.id}`}>
                    <button className={`p-5 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-2xl transition-all hover:scale-110 active:scale-95`}>
                      <ChevronRight size={24} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BatchSlider;
