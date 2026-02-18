
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Book, History, Zap, 
  Map, FileCheck, ChevronDown, Bell, Download, 
  Eye, ArrowUpDown, Layout, GraduationCap,
  MoreVertical, Sparkles, Filter, X
} from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", name: "All Resources", icon: Layout },
  { id: "ncert", name: "NCERT Solutions", icon: Book },
  { id: "reference", name: "Reference Books", icon: GraduationCap },
  { id: "pyp", name: "Previous Year Papers", icon: History },
  { id: "formula", name: "Formula Sheets", icon: Zap },
  { id: "mindmap", name: "Mind Maps", icon: Map },
  { id: "sample", name: "Sample Papers", icon: FileCheck },
];

const resources = [
  {
    id: 1,
    category: "ncert",
    title: "Class 12 Physics - Part 1 NCERT Solutions",
    desc: "Complete step-by-step solutions for all textbook chapters including examples and exercises.",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    tag: "SOLUTIONS",
    color: "from-blue-600 to-indigo-600",
    stats: "2.4k Views • 150MB"
  },
  {
    id: 2,
    category: "ncert",
    title: "Class 11 Biology - NCERT Complete Guide",
    desc: "Detailed explanations, diagrams, and solved questions for the entire Class 11 Biology syllabus.",
    img: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070&auto=format&fit=crop",
    tag: "SOLUTIONS",
    color: "from-emerald-500 to-teal-600",
    stats: "1.8k Views • 120MB"
  },
  {
    id: 3,
    category: "reference",
    title: "Organic Chemistry Quick Revision Notes",
    desc: "Summarized reaction mechanisms and key functional group properties for JEE/NEET aspirants.",
    img: "https://images.unsplash.com/photo-1532187841696-608a096c738e?q=80&w=2070&auto=format&fit=crop",
    tag: "NOTES",
    color: "from-orange-500 to-amber-600",
    stats: "3.2k Views • 45MB"
  },
  {
    id: 4,
    category: "formula",
    title: "Calculus & Geometry Ultimate Formula Sheet",
    desc: "All essential integration, differentiation, and 3D geometry formulas in a high-quality printable format.",
    img: "https://images.unsplash.com/photo-1509228468518-180dd4821815?q=80&w=2070&auto=format&fit=crop",
    tag: "FORMULAS",
    color: "from-rose-500 to-pink-600",
    stats: "5.1k Views • 12MB"
  },
  {
    id: 5,
    category: "pyp",
    title: "CBSE Board Exam 2023 - Physics Paper",
    desc: "Original 2023 question paper with detailed marking scheme and expert-suggested answers.",
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop",
    tag: "PAPERS",
    color: "from-purple-600 to-fuchsia-600",
    stats: "8.4k Views • 5MB"
  },
  {
    id: 6,
    category: "mindmap",
    title: "Human Physiology Interactive Mind Map",
    desc: "Connect systems and functions with this comprehensive visual diagram for Biology students.",
    img: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1932&auto=format&fit=crop",
    tag: "MAPS",
    color: "from-indigo-600 to-blue-700",
    stats: "1.2k Views • 8MB"
  },
  {
    id: 7,
    category: "reference",
    title: "Modern Physics by H.C. Verma Vol 2 Notes",
    desc: "Exclusive concepts and additional practice problems for top-tier competitive exams.",
    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop",
    tag: "REFERENCE",
    color: "from-amber-600 to-yellow-700",
    stats: "2.9k Views • 200MB"
  },
  {
    id: 8,
    category: "sample",
    title: "JEE Advanced 2025 Prediction Paper",
    desc: "Mock paper designed by ex-IITians based on the most probable question patterns.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    tag: "PREDICTED",
    color: "from-cyan-500 to-blue-600",
    stats: "450 Views • 15MB"
  }
];

const StudyMaterial = () => {
  const { theme } = useThemeStore();
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesCat = activeCat === "all" || res.category === activeCat;
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           res.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCat, searchQuery]);

  return (
    <div className={`min-h-screen flex transition-all duration-700 pt-24 ${
      theme === 'dark' ? "bg-[#05070a]" : "bg-slate-50"
    }`}>
      
      {/* 🏛 ELITE DASHBOARD SIDEBAR */}
      <aside className={`w-80 h-[calc(100vh-6rem)] sticky top-24 flex-shrink-0 border-r flex flex-col px-6 pb-10 transition-all duration-500 overflow-y-auto ${
        theme === 'dark' ? 'bg-[#0b0f1a]/50 backdrop-blur-xl border-white/5' : 'bg-white border-slate-200'
      }`}>
        <div className="py-8 space-y-2">
           <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] px-6 mb-6 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              Browse Library
           </h4>
           <div className="space-y-1">
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setActiveCat(cat.id)}
                 className={`w-full group relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                   activeCat === cat.id 
                     ? "bg-blue-600/10 text-blue-500" 
                     : theme === 'dark' ? "text-slate-500 hover:text-slate-200 hover:bg-white/5" : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                 }`}
               >
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                   activeCat === cat.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-500/10 group-hover:bg-blue-600/10 group-hover:text-blue-500'
                 }`}>
                    <cat.icon size={16} strokeWidth={2.5} />
                 </div>
                 <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
                 {activeCat === cat.id && (
                   <motion.div 
                     layoutId="sidebar-active"
                     className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                   />
                 )}
               </button>
             ))}
           </div>
        </div>

        {/* 💎 PREMIUM UPGRADE WIDGET */}
        <div className="mt-auto">
           <div className={`p-6 rounded-3xl relative overflow-hidden group border transition-all ${
             theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-white/10' 
              : 'bg-gradient-to-br from-blue-600 to-indigo-700 border-transparent shadow-xl shadow-blue-500/20'
           }`}>
             <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4">
                   <Sparkles size={20} className="text-blue-200" />
                </div>
                <h5 className="text-white text-sm font-black uppercase tracking-widest mb-2">Urban Pro</h5>
                <p className="text-blue-100/70 text-[10px] font-bold leading-relaxed mb-6">Unlock paper prediction AI and limited edition resources.</p>
                <button className="w-full py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg shadow-black/10">
                   Upgrade Now
                </button>
             </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
           </div>
        </div>
      </aside>

      {/* 🚀 MAIN CONTENT ENGINE */}
      <main className="flex-1 px-8 lg:px-16 pb-32">
        <div className="max-w-[1400px] mx-auto">
           
           {/* 🔍 TOP INTERACTION LAYER */}
           <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 py-10 border-b border-white/5 mb-12">
              <div className="flex-1 w-full max-w-3xl">
                 <div className="relative group">
                    <Search className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${theme === 'dark' ? 'text-slate-600 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-600'}`} size={20} />
                    <input 
                       type="text" 
                       placeholder="Find your resource..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className={`w-full py-5 pl-16 pr-14 rounded-2xl outline-none border transition-all text-sm font-bold ${
                        theme === 'dark' 
                          ? "bg-[#0b0f1a] border-white/5 text-white focus:bg-[#111625] focus:border-blue-500/30" 
                          : "bg-white border-slate-200 text-slate-900 focus:shadow-xl focus:shadow-blue-500/5 focus:border-blue-500/20"
                       }`}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-500/10 rounded-lg transition-colors"
                      >
                         <X size={16} className="text-slate-500" />
                      </button>
                    )}
                 </div>
              </div>

              <div className="flex items-center gap-10">
                 <div className="flex items-center gap-6">
                    <button className={`w-12 h-12 rounded-2xl flex items-center justify-center relative transition-all border ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-200 shadow-sm'
                    }`}>
                       <Bell size={20} />
                       <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full border-2 border-inherit" />
                    </button>
                    <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
                    }`}>
                       <Filter size={18} />
                    </button>
                 </div>

                 <div className={`flex items-center gap-5 p-2 pr-6 rounded-2xl border transition-all cursor-pointer group ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:border-blue-200 shadow-sm'
                 }`}>
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform">
                       <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop" className="w-full h-full object-cover" alt="User" />
                    </div>
                    <div>
                       <p className={`text-xs font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>A. Johnson</p>
                       <p className="text-[9px] font-black uppercase tracking-widest text-blue-500 leading-none mt-1">Class 12th</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* 📢 DYNAMIC PAGE HEADER */}
           <div className="flex items-center justify-between mb-12">
              <div>
                 <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
                    <Link to="/" className="hover:text-blue-500 transition-colors">Portal</Link>
                    <span>/</span>
                    <span className={theme === 'dark' ? "text-slate-300" : "text-slate-700"}>{categories.find(c => c.id === activeCat)?.name}</span>
                 </nav>
                 <h1 className={`text-3xl lg:text-5xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {activeCat === 'all' ? 'Universal Resource Hub' : categories.find(c => c.id === activeCat)?.name}
                 </h1>
              </div>

              <div className="flex items-center gap-4">
                 <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">{filteredResources.length} Assets Found</p>
                 <div className="w-px h-8 bg-slate-500/20" />
                 <button 
                  onClick={() => setSortBy(sortBy === 'latest' ? 'popular' : 'latest')}
                  className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                 >
                    <ArrowUpDown size={14} /> {sortBy === 'latest' ? 'Sort: Newest' : 'Sort: Most Viewed'}
                 </button>
              </div>
           </div>

           {/* 📚 RESOURCE GRID ENGINE */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredResources.map((res, i) => (
                  <motion.div
                    key={res.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ delay: i * 0.03, duration: 0.4 }}
                    className={`group relative rounded-[2.5rem] overflow-hidden border transition-all duration-500 ${
                      theme === 'dark' 
                        ? 'bg-[#0b0f1a]/50 border-white/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10' 
                        : 'bg-white border-slate-100 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:border-blue-300'
                    }`}
                  >
                    {/* Visual Anchor */}
                    <div className="h-56 relative overflow-hidden">
                       <img 
                        src={res.img} 
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:rotate-1" 
                        alt="" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                       
                       {/* Tag Overlay */}
                       <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white shadow-xl bg-gradient-to-r ${res.color}`}>
                          {res.tag}
                       </div>

                       {/* Interactive Hover Shield */}
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-2xl shadow-blue-600/40 hover:scale-110 transition-transform">
                             <Eye size={28} />
                          </button>
                       </div>
                    </div>

                    {/* Meta Engine */}
                    <div className="p-8 pt-6">
                       <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">{res.category}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{res.stats}</span>
                       </div>
                       <h3 className={`text-lg font-black tracking-tight leading-tight mb-4 group-hover:text-blue-500 transition-colors line-clamp-2 ${
                         theme === 'dark' ? 'text-white' : 'text-slate-900'
                       }`}>
                          {res.title}
                       </h3>
                       <p className={`text-[11px] font-medium leading-relaxed mb-8 line-clamp-3 ${
                         theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                       }`}>
                          {res.desc}
                       </p>

                       {/* Action Matrix */}
                       <div className="flex gap-4">
                          <button className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                            theme === 'dark' 
                              ? 'border-white/10 text-slate-300 hover:bg-white/5' 
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}>
                             <History size={14} /> Preview
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all">
                             <Download size={14} /> Get PDF
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* 🧙 MAGIC SKELETON PLACEHOLDER */}
              {filteredResources.length < 8 && Array.from({ length: 4 - (filteredResources.length % 4) }).map((_, idx) => (
                <div key={`skeleton-${idx}`} className={`rounded-[2.5rem] border border-dashed flex flex-col items-center justify-center p-12 gap-6 transition-all border-slate-500/20 opacity-30`}>
                   <div className="w-20 h-20 rounded-full bg-slate-500/10 flex items-center justify-center">
                      <MoreVertical size={24} className="text-slate-500" />
                   </div>
                   <div className="space-y-2 w-full">
                      <div className="h-2 bg-slate-500/20 rounded-full w-full" />
                      <div className="h-2 bg-slate-500/20 rounded-full w-2/3 mx-auto" />
                   </div>
                </div>
              ))}
           </div>

           {/* 🌊 GLOBAL PAGING CONTROL */}
           <div className="mt-24 text-center">
              <button className={`group relative inline-flex items-center gap-4 px-12 py-6 rounded-[2.5rem] border transition-all duration-500 hover:scale-105 active:scale-95 ${
                 theme === 'dark' 
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                  : 'bg-white border-slate-200 text-slate-900 shadow-2xl shadow-blue-500/10'
              }`}>
                 <span className="text-[10px] font-black uppercase tracking-[0.25em]">Manifest More Resources</span>
                 <ChevronDown size={18} className="text-blue-500 group-hover:translate-y-1 transition-transform" />
              </button>
           </div>

        </div>
      </main>
    </div>
  );
};

export default StudyMaterial;
