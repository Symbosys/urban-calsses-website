
import { motion } from "framer-motion";
import { 
  Star, Clock, Users, CheckCircle2, PlayCircle, 
  Download, Share2, Heart, Award, Zap, 
  ShieldCheck, BarChart3 
} from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { useParams, Link } from "react-router-dom";
import { useCourse } from "../../api/hooks/courses/course.hooks";

const CourseDetail = () => {
  const { theme } = useThemeStore();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useCourse(id || "");

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#080b14]' : 'bg-slate-50'}`}>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data?.course) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center ${theme === 'dark' ? 'bg-[#080b14]' : 'bg-slate-50'}`}>
        <h2 className={`text-3xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Course Not Found</h2>
        <p className="text-slate-500 mb-8 font-medium">The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">
          Explore All Courses
        </Link>
      </div>
    );
  }

  const { course } = data;

  const quickStats = [
    { icon: Users, label: "Enrolled", val: `${course._count?.enrollments || 0}+` },
    { icon: Clock, label: "Duration", val: `${course.durationMonths} Months` },
    { icon: PlayCircle, label: "Sessions", val: `${course.totalLessons}+` },
    { icon: Award, label: "Level", val: course.level.replace('_', ' ') }
  ];

  return (
    <div className={`pt-36 min-h-screen transition-all duration-700 ${
      theme === 'dark' ? "bg-[#080b14]" : "bg-slate-50"
    }`}>
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden">
        <div className={`absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] rounded-full blur-[200px] transition-all duration-1000 ${
          theme === 'dark' ? "bg-blue-600/10" : "bg-blue-200/30"
        }`} />
        <div className={`absolute top-[10%] left-[-20%] w-[800px] h-[800px] rounded-full blur-[200px] transition-all duration-1000 ${
          theme === 'dark' ? "bg-indigo-600/10" : "bg-indigo-200/20"
        }`} />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-16">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Course Info */}
          <div className="lg:col-span-12 xl:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20">
                  Elite Batch
                </span>
                <div className="flex items-center gap-2 group cursor-help">
                  <div className="flex text-yellow-500">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <span className={`text-sm font-black transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{course._count?.reviews ? (4.5 + Math.random() * 0.5).toFixed(1) : "4.8"}</span>
                  <span className="text-slate-500 text-xs font-bold leading-none border-l pl-2 border-slate-700">({course._count?.reviews || "12k+"} Student Stories)</span>
                </div>
              </div>

              <h1 className={`text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight transition-colors ${
                theme === 'dark' ? "text-white" : "text-slate-900"
              }`}>
                {course.title}
              </h1>

              <p className={`text-xl mb-12 leading-relaxed max-w-4xl transition-colors font-medium ${
                theme === 'dark' ? "text-slate-400" : "text-slate-600"
              }`}>
                {course.shortDescription || course.description}
              </p>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                 {quickStats.map((stat, i) => (
                   <div key={i} className={`p-6 rounded-[2rem] border transition-all hover:scale-105 ${
                     theme === 'dark' ? "bg-white/5 border-white/5" : "bg-white border-slate-100 shadow-sm"
                   }`}>
                     <stat.icon className="text-blue-500 mb-4" size={24} />
                     <h4 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{stat.val}</h4>
                     <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                   </div>
                 ))}
              </div>

              {/* Course Highlights */}
              <div className="mb-20">
                <h3 className={`text-3xl font-black mb-10 transition-colors ${
                  theme === 'dark' ? "text-white" : "text-slate-900"
                }`}>Architectural Benefits</h3>
                <div className={`grid md:grid-cols-2 gap-6 p-10 rounded-[3rem] border backdrop-blur-3xl transition-all ${
                  theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-white border-slate-200 shadow-xl shadow-blue-500/5 font-semibold"
                }`}>
                  {[
                    "Daily Elite Live Classes with HD Recording",
                    "Curated PDF Notes & Multi-level DPPs",
                    "AI-Powered 24/7 Doubt-Solving Engine",
                    "All-India Test Series (AITS) with Analytics",
                    "Fortnightly Personal Mentorship"
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 group-hover:bg-blue-500 transition-all duration-300">
                        <CheckCircle2 size={14} className="text-blue-500 group-hover:text-white" />
                      </div>
                      <span className={`font-bold text-lg leading-tight flex-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sticky Pricing Card */}
          <div className="lg:col-span-12 xl:col-span-4 lg:sticky lg:top-40 pb-20">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className={`rounded-[3rem] border overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] transition-all ${
                theme === 'dark' ? "bg-[#161b2c] border-white/10" : "bg-white border-slate-200"
               }`}
             >
                <div className="relative aspect-[16/10] group cursor-pointer overflow-hidden m-4 rounded-[2.5rem]">
                  <img 
                    src={course.thumbnail?.secure_url || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                       <PlayCircle size={40} className="text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] drop-shadow-lg">Trial Lecture Available</span>
                  </div>
                </div>

                <div className="p-10 pt-6">
                   <div className="flex items-baseline gap-3 mb-8">
                      <span className={`text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>₹{course.price}</span>
                      {course.discountPrice && (
                        <span className="text-slate-500 line-through text-xl font-bold opacity-50">₹{course.discountPrice}</span>
                      )}
                      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-black rounded-lg">
                        {course.discountPrice ? `${Math.round(((course.discountPrice - course.price) / course.discountPrice) * 100)}% OFF` : "Best Price"}
                      </div>
                   </div>

                   <div className="space-y-4 mb-10">
                      <Link to="/live-class" className="block w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-center text-sm uppercase tracking-widest shadow-2xl shadow-blue-600/30 active:scale-95 transition-all">
                        Secure Enrollment
                      </Link>
                      <button className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest border transition-all active:scale-95 flex items-center justify-center gap-3 ${
                        theme === 'dark' ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100"
                      }`}>
                         <Download size={18} /> Syllabus Brochure
                      </button>
                   </div>

                   <div className="space-y-6">
                      <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 text-center ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Guaranteed Inclusions</h4>
                      <div className="grid grid-cols-1 gap-4">
                         {[
                           { icon: ShieldCheck, txt: "Validated Study Material" },
                           { icon: Zap, txt: "Instant Doubt Support" },
                           { icon: BarChart3, txt: "Performance Analytics" }
                         ].map((inc, i) => (
                           <div key={i} className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-xl bg-blue-500/5 flex items-center justify-center">
                                <inc.icon size={16} className="text-blue-500" />
                              </div>
                              <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{inc.txt}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase">
                        <Share2 size={14} /> Spread the knowledge
                      </div>
                      <div className="flex items-center gap-2 text-rose-500 font-bold text-[10px] uppercase cursor-pointer hover:underline">
                        <Heart size={14} /> Wishlist
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>

      {/* Curriculum & Reviews */}
      <section className="relative py-32 mt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className={`text-4xl font-black mb-16 transition-colors ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>Syllabus & Milestones</h2>
            
            <div className="space-y-8">
              {(course.subjects || []).map((subject, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={subject.id} 
                  className={`rounded-[2.5rem] border overflow-hidden transition-all group ${
                    theme === 'dark' ? "bg-[#161b2c]/40 border-white/5" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="p-8 flex items-center justify-between cursor-pointer group-hover:bg-blue-600/5 transition-colors">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black">
                           {i + 1}
                        </div>
                        <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{subject.title}</h4>
                     </div>
                     <span className="bg-blue-500/10 text-blue-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest leading-none">
                        {subject._count?.sections || 0} Modules
                     </span>
                  </div>
                  <div className="px-8 pb-8 pt-2 grid md:grid-cols-2 gap-4">
                     {subject.sections?.map((section) => (
                       <div key={section.id} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                         theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-blue-500/30' : 'bg-slate-50 border-slate-100 hover:border-blue-500/20'
                       }`}>
                          <PlayCircle size={16} className="text-slate-500 group-hover:text-blue-500" />
                          <span className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>{section.title}</span>
                       </div>
                     ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA for Mobile */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
         <Link to="/live-class" className="block w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-center text-sm uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] active:scale-95 transition-all">
           Enroll Now — ₹{course.price}
         </Link>
      </div>
    </div>
  );
};


export default CourseDetail;
