
import { motion } from 'framer-motion';
import { Calendar, Users, ChevronRight, Bookmark, Sparkles } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';

const batches = [
  {
    id: 1,
    name: "Lakshya JEE 2026",
    target: "JEE Main & Advanced",
    starts: "Feb 15, 2026",
    price: "₹4,999",
    tag: "🔥 Most Popular",
    color: "blue",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    id: 2,
    name: "Yakeen NEET 2026",
    target: "NEET UG",
    starts: "Feb 20, 2026",
    price: "₹3,499",
    tag: "⭐ Top Selection",
    color: "rose",
    gradient: "from-rose-600 to-pink-600"
  },
  {
    id: 3,
    name: "Super Boards 2025",
    target: "Class 12th Boards",
    starts: "Feb 10, 2026",
    price: "₹2,499",
    tag: "📚 Board Focus",
    color: "emerald",
    gradient: "from-emerald-600 to-teal-600"
  },
];

const BatchSlider = () => {
  const { theme } = useThemeStore();

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
          {batches.map((batch, i) => (
            <motion.div
              key={batch.id}
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
                  {batch.tag}
                </span>
                <button className="text-slate-500 hover:text-blue-500 transition-colors">
                  <Bookmark size={20} />
                </button>
              </div>

              <h4 className={`text-3xl font-black mb-4 tracking-tight transition-colors group-hover:text-blue-500 ${
                theme === 'dark' ? "text-white" : "text-slate-900"
              }`}>
                {batch.name}
              </h4>
              <p className="text-blue-500 font-bold text-sm mb-10 uppercase tracking-widest">{batch.target}</p>

              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    theme === 'dark' ? "bg-white/5 text-slate-400" : "bg-slate-50 text-slate-500"
                  }`}>
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Classes Begin</p>
                    <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>{batch.starts}</p>
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
                  <p className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{batch.price}</p>
                </div>
                <Link to="/courses">
                  <button className={`p-5 rounded-2xl bg-gradient-to-br ${batch.gradient} text-white shadow-2xl transition-all hover:scale-110 active:scale-95`}>
                    <ChevronRight size={24} />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BatchSlider;
