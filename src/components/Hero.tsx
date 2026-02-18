
import { motion } from 'framer-motion';
import { 
  Play, ArrowRight, Sparkles, Zap, ShieldCheck, 
  BookOpen, Building2, TrendingUp, Award
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { theme } = useThemeStore();

  const goals = [
    { name: "School", icon: BookOpen, color: "bg-blue-500/10 text-blue-500" },
    { name: "JEE", icon: Zap, color: "bg-orange-500/10 text-orange-500" },
    { name: "NEET", icon: ShieldCheck, color: "bg-rose-500/10 text-rose-500" },
    { name: "Govt Exams", icon: Building2, color: "bg-emerald-500/10 text-emerald-500" },
  ];

  return (
    <section className={`relative pt-32 lg:pt-16 pb-20 lg:pb-32 overflow-hidden transition-colors duration-700 ${
      theme === 'dark' ? 'bg-[#05080e]' : 'bg-[#f0f7ff]'
    }`}>
      {/* Revolutionary Geometric Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0" style={{ 
           backgroundImage: 'radial-gradient(#1b4dff 1px, transparent 1px)', 
           backgroundSize: '40px 40px' 
         }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Intelligence & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div>
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 backdrop-blur-xl border ${
                   theme === 'dark' ? "bg-white/5 border-white/10 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-600"
                 }`}
               >
                 <Sparkles size={14} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">India's Most Loved Learning Platform</span>
               </motion.div>

               <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9] ${
                 theme === 'dark' ? "text-white" : "text-slate-900"
               }`}>
                 Empowering <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Future Leaders.</span>
               </h1>
               
               <p className={`text-lg md:text-xl font-medium max-w-xl leading-relaxed ${
                 theme === 'dark' ? "text-slate-400" : "text-slate-600"
               }`}>
                 Quality education that is affordable and accessible for every student. Start your journey towards excellence today with our expert-led courses.
               </p>
            </div>

            {/* Goal Selection Matrix */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-4">
                  <span className="w-10 h-px bg-slate-800" /> Select Your Goal
               </h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {goals.map((goal, i) => (
                    <motion.div
                      key={goal.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className={`group cursor-pointer p-6 rounded-3xl border transition-all flex flex-col items-center justify-center gap-3 ${
                        theme === 'dark' 
                          ? "bg-white/[0.02] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05]" 
                          : "bg-white border-slate-100 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:border-blue-200"
                      }`}
                    >
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${goal.color}`}>
                          <goal.icon size={28} strokeWidth={2.5} />
                       </div>
                       <span className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                          {goal.name}
                       </span>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
               <Link 
                 to="/courses"
                 className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
               >
                  Explore Batches <ArrowRight size={18} />
               </Link>
               <button className={`flex items-center gap-4 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 ${
                 theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900 shadow-xl shadow-blue-500/5"
               }`}>
                  <Play size={18} fill="currentColor" /> Watch Demo
               </button>
            </div>

            <div className="flex items-center gap-6">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-full border-4 ${theme === 'dark' ? 'border-[#05080e]' : 'border-white'} bg-slate-700 flex items-center justify-center text-[10px] font-black text-white`}>
                       U{i}
                    </div>
                  ))}
               </div>
               <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  Joined by <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>1.2 Crore+</span> students
               </p>
            </div>
          </motion.div>

          {/* Right Column: Featured Educator Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
             <div className="relative w-full max-w-lg">
                <div className={`relative z-10 rounded-[3rem] overflow-hidden border-8 transition-colors ${
                  theme === 'dark' ? "border-white/10" : "border-white shadow-2xl"
                }`}>
                   <img 
                     src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" 
                     className="w-full h-full object-cover grayscale-0 hover:scale-105 transition-transform duration-[3s]"
                     alt="Lead Educator"
                   />
                   <div className="absolute bottom-0 inset-x-0 p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                      <h4 className="text-3xl font-black text-white mb-1">Dr. Sanya Verma</h4>
                      <p className="text-sm font-bold text-white/70 uppercase tracking-widest">Head of Academic Excellence</p>
                   </div>
                </div>

                {/* Floating Elite Badges */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute -top-10 -right-10 p-6 bg-yellow-400 rounded-3xl shadow-2xl rotate-6 border-4 border-white z-20"
                >
                   <div className="flex items-center gap-4">
                      <Award size={32} className="text-secondary" />
                      <div>
                        <p className="text-[10px] font-black text-secondary leading-none uppercase mb-1">Top Rated</p>
                        <p className="text-xl font-black text-secondary">Educator</p>
                      </div>
                   </div>
                </motion.div>

                <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                   className={`absolute -bottom-8 -left-12 p-8 rounded-3xl border z-20 flex items-center gap-6 shadow-2xl transition-all ${
                     theme === 'dark' ? "bg-slate-900 border-white/10" : "bg-white border-slate-100"
                   }`}
                >
                   <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                      <TrendingUp size={28} className="text-emerald-500" />
                   </div>
                   <div>
                      <p className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>95% Success</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Student Ratio</p>
                   </div>
                </motion.div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
