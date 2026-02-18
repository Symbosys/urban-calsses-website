
import { motion } from 'framer-motion';
import { PlayCircle, Users, ArrowRight, Radio } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';

const liveClasses = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Calculus: Limits & Continuity",
    teacher: "Dr. RK Verma",
    students: "3.2k+",
    status: "Live",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    subject: "Physics",
    topic: "Electrostatics: Concept Drill",
    teacher: "MS Sir",
    students: "1.8k+",
    status: "Live",
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    subject: "Chemistry",
    topic: "Organic Chemistry Mechanisms",
    teacher: "Alok Gupta",
    students: "2.5k+",
    status: "In 15m",
    thumbnail: "https://images.unsplash.com/photo-1532187875605-1ef63823db17?q=80&w=2070&auto=format&fit=crop"
  }
];

const LiveClasses = () => {
  const { theme } = useThemeStore();

  return (
    <section className={`py-32 transition-colors duration-700 ${
      theme === 'dark' ? "bg-[#080b14]" : "bg-white"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 ${
              theme === 'dark' ? "bg-red-600/10 text-red-500" : "bg-red-50 text-red-600"
            }`}>
              <Radio size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Learning Dashboard</span>
            </div>
            <h2 className={`text-4xl md:text-6xl font-black tracking-tighter transition-colors ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>Interactive Live Sessions</h2>
          </div>
          <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 group transition-all">
            Full Schedule <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {liveClasses.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-[3rem] overflow-hidden border transition-all duration-700 ${
                theme === 'dark' 
                  ? "bg-[#161b2c]/40 border-white/5 hover:border-blue-500/30" 
                  : "bg-white border-slate-100 shadow-xl shadow-blue-500/5 hover:shadow-2xl"
              }`}
            >
              <div className="relative aspect-video m-4 rounded-[2rem] overflow-hidden">
                <img 
                  src={cls.thumbnail} 
                  alt={cls.topic} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-5 left-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                    cls.status === 'Live' ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/40' : 'bg-blue-600 text-white'
                  }`}>
                    {cls.status === 'Live' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    {cls.status}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
                  <PlayCircle className="text-white w-16 h-16 transform scale-75 group-hover:scale-100 transition-transform duration-500" strokeWidth={1} />
                </div>
              </div>

              <div className="px-8 pb-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">{cls.subject}</span>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                    <Users size={14} /> {cls.students}
                  </div>
                </div>
                <h4 className={`text-2xl font-black mb-10 group-hover:text-blue-500 transition-colors line-clamp-2 leading-tight ${
                  theme === 'dark' ? "text-white" : "text-slate-900"
                }`}>
                  {cls.topic}
                </h4>
                
                <div className={`flex items-center justify-between pt-8 border-t transition-colors ${
                  theme === 'dark' ? "border-slate-800" : "border-slate-100"
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur opacity-20" />
                      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white font-black shadow-lg ${
                        theme === 'dark' ? "bg-slate-700" : "bg-slate-200 text-slate-900"
                      }`}>
                        {cls.teacher.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-black leading-none ${
                        theme === 'dark' ? "text-white" : "text-slate-900"
                      }`}>{cls.teacher}</p>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Lead Faculty</p>
                    </div>
                  </div>
                  <Link to="/live-class">
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-600/30 active:scale-95">
                      Join
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveClasses;
