
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Star, CheckCircle2, Layout, 
  GraduationCap, Book, Sparkles, Zap, ShieldCheck, 
  Trophy, Filter
} from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", name: "All Batches", icon: Layout },
  { id: "jee", name: "IIT-JEE", icon: Zap },
  { id: "neet", name: "NEET", icon: GraduationCap },
  { id: "class12", name: "Class 12th", icon: Book },
  { id: "class10", name: "Foundation", icon: Trophy },
];

const batches = [
  {
    id: "lakshya-jee-26",
    name: "Lakshya JEE 2026",
    target: "JEE Main & Advanced 2026",
    category: "jee",
    price: "4,999",
    originalPrice: "9,999",
    faculty: ["RK", "MS", "AG"],
    rating: 4.9,
    enrolled: "85k+",
    status: "Live Now",
    features: ["Daily Live Classes", "Handwritten Notes", "Doubt Engine"],
    tag: "🔥 Bestseller",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "yakeen-neet-26",
    name: "Yakeen NEET 2026",
    target: "NEET UG 2026",
    category: "neet",
    price: "3,499",
    originalPrice: "7,999",
    faculty: ["SD", "NK", "PS"],
    rating: 4.8,
    enrolled: "62k+",
    status: "Starting Soon",
    features: ["NCERT Modules", "DPP Solutions", "Weekly Mock Tests"],
    tag: "⭐ Top Rated",
    color: "from-rose-600 to-pink-600"
  },
  {
    id: "arjuna-jee-25",
    name: "Arjuna JEE 2025",
    target: "JEE Main & Advanced 2025",
    category: "jee",
    price: "4,499",
    originalPrice: "8,999",
    faculty: ["RK", "VJ", "SS"],
    rating: 4.9,
    enrolled: "120k+",
    status: "Live Now",
    features: ["Adv Level Analysis", "Personalized Mentor", "Test Series"],
    tag: "🎯 High Selection",
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "pariwar-10",
    name: "Foundation Class 10th",
    target: "CBSE & Olympiads",
    category: "class10",
    price: "1,999",
    originalPrice: "3,999",
    faculty: ["MD", "LS"],
    rating: 4.7,
    enrolled: "45k+",
    status: "Live Now",
    features: ["Concept Clarity", "Basic to Adv", "Live Interaction"],
    tag: "🚀 Early Start",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "victory-12",
    name: "Victory Class 12th",
    target: "CBSE & State Boards",
    category: "class12",
    price: "2,499",
    originalPrice: "5,999",
    faculty: ["AG", "NK"],
    rating: 4.8,
    enrolled: "38k+",
    status: "Upcoming",
    features: ["Board Special Notes", "PYQ Discussion", "Sample Papers"],
    tag: "📚 Perfect Score",
    color: "from-emerald-500 to-teal-600"
  }
];

const BatchesPage = () => {
  const { theme } = useThemeStore();
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = batches.filter(b => {
    const matchesCat = selectedCat === "all" || b.category === selectedCat;
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || 
                          b.target.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className={`pt-20 min-h-screen transition-all duration-700 ${
      theme === 'dark' ? "bg-[#0b0f1a]" : "bg-slate-50"
    }`}>
      {/* Revolutionary Hero section */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[200px] transition-all duration-1000 ${
            theme === 'dark' ? "bg-blue-600/10" : "bg-blue-200/30"
          }`} />
          <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-1000 ${
            theme === 'dark' ? "bg-indigo-600/5" : "bg-indigo-200/20"
          }`} />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md border ${
              theme === 'dark' ? "bg-white/5 border-white/10 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-600"
            }`}>
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Unlimited Batches — One Goal: Rankers</span>
            </div>
            <h1 className={`text-5xl md:text-8xl font-black mb-8 tracking-tighter transition-colors leading-[0.9] ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>
              Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Potential.</span>
            </h1>
            <p className={`text-xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed ${
              theme === 'dark' ? "text-slate-400" : "text-slate-600"
            }`}>
              Browse through our premium selection of batches designed by India's legendary faculty to secure your seat in top colleges.
            </p>

            {/* Premium Search Container */}
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-focus-within:opacity-40 transition duration-500" />
              <div className="relative">
                 <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={24} />
                 <input 
                   type="text" 
                   placeholder="Search for Lakshya, Yakeen, or targeted exams..."
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className={`w-full py-7 pl-20 pr-8 rounded-[2rem] border outline-none transition-all text-xl font-bold shadow-2xl ${
                    theme === 'dark' 
                      ? "bg-[#161b2c]/80 backdrop-blur-xl border-slate-700/50 text-white focus:border-blue-500/50" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-blue-500"
                   }`}
                 />
                 <button className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                    Search
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Elite Filter Sidebar (Floating on Desktop) */}
            <aside className="lg:col-span-3 xl:w-80">
               <div className={`sticky top-32 p-10 rounded-[3rem] border transition-all ${
                 theme === 'dark' ? 'bg-[#161b2c]/40 border-white/5' : 'bg-white border-slate-200'
               }`}>
                  <div className="flex items-center gap-3 mb-10">
                     <Filter size={18} className="text-blue-500" />
                     <h4 className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Filter Results</h4>
                  </div>
                  
                  <div className="space-y-4">
                     {categories.map((cat) => (
                       <button
                         key={cat.id}
                         onClick={() => setSelectedCat(cat.id)}
                         className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                           selectedCat === cat.id 
                            ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                            : theme === 'dark' ? "text-slate-500 hover:bg-white/5" : "text-slate-600 hover:bg-slate-50"
                         }`}
                       >
                         <cat.icon size={16} /> {cat.name}
                       </button>
                     ))}
                  </div>

                  <div className="mt-16 pt-10 border-t border-white/5">
                     <div className="flex items-center gap-4 mb-6">
                        <Trophy size={18} className="text-yellow-500" />
                        <h4 className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Top Stat</h4>
                     </div>
                     <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">Join 500,000+ Students already learning today.</p>
                  </div>
               </div>
            </aside>

            {/* Batch Cards Grid */}
            <main className="flex-1">
               <AnimatePresence mode="popLayout">
                  {filtered.length > 0 ? (
                    <motion.div 
                      layout
                      className="grid md:grid-cols-1 xl:grid-cols-2 gap-10"
                    >
                       {filtered.map((batch) => (
                         <motion.div
                           layout
                           key={batch.id}
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           transition={{ duration: 0.4 }}
                           className={`group relative rounded-[3rem] border transition-all duration-700 overflow-hidden flex flex-col ${
                            theme === 'dark' 
                              ? "bg-white/[0.02] border-white/5 hover:border-blue-500/30" 
                              : "bg-white border-slate-100 shadow-xl shadow-blue-500/5 hover:shadow-2xl"
                           }`}
                         >
                            {/* Card Content */}
                            <div className="p-10 flex-1">
                               <div className="flex justify-between items-start mb-8">
                                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-br ${batch.color} text-white`}>
                                     {batch.tag}
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                     <Star size={14} className="text-yellow-500" fill="currentColor" strokeWidth={0} />
                                     <span className={`text-xs font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{batch.rating}</span>
                                  </div>
                               </div>

                               <h3 className={`text-3xl font-black mb-3 tracking-tight group-hover:text-blue-500 transition-colors ${
                                 theme === 'dark' ? "text-white" : "text-slate-900"
                               }`}>
                                 {batch.name}
                               </h3>
                               <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-10">{batch.target}</p>

                               <div className="grid grid-cols-2 gap-6 mb-10">
                                  {batch.features.map((f, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                       <CheckCircle2 size={12} className="text-emerald-500" />
                                       <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">{f}</span>
                                    </div>
                                  ))}
                               </div>

                               <div className="flex items-center gap-6 pb-10">
                                  <div className="flex -space-x-3">
                                     {batch.faculty.map((f, j) => (
                                       <div key={j} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-black text-white">
                                          {f}
                                       </div>
                                     ))}
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Renowned Faculty</p>
                                     <p className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>3+ Expert Mentors</p>
                                  </div>
                               </div>
                            </div>

                            {/* Card Bottom CTA */}
                            <div className={`p-10 pt-8 border-t transition-colors flex items-center justify-between ${
                              theme === 'dark' ? "border-white/5 bg-white/[0.01]" : "border-slate-50 bg-slate-50/50"
                            }`}>
                               <div className="flex flex-col">
                                  <div className="flex items-center gap-3">
                                     <span className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>₹{batch.price}</span>
                                     <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-black rounded uppercase">Save 50%</div>
                                  </div>
                                  <span className="text-slate-500 line-through text-xs font-bold opacity-50">₹{batch.originalPrice}</span>
                               </div>
                               
                               <div className="flex items-center gap-4">
                                  <Link to={`/course/${batch.id}`} className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    theme === 'dark' ? "hover:bg-white/5 text-slate-400" : "hover:bg-slate-100 text-slate-600"
                                  }`}>
                                     Explore
                                  </Link>
                                  <Link to="/live-class" className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">
                                     Buy Now
                                  </Link>
                               </div>
                            </div>
                         </motion.div>
                       ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-40"
                    >
                       <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-8">
                          <Search size={40} className="text-blue-500" />
                       </div>
                       <h3 className={`text-3xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No Matches Found</h3>
                       <p className="text-slate-500 font-bold max-w-sm mx-auto uppercase text-[10px] tracking-[0.2em]">Try adjusting your search or category filters.</p>
                    </motion.div>
                  )}
               </AnimatePresence>
            </main>
          </div>
        </div>
      </section>

      {/* Trust Stats Marquee Style Section */}
      <section className={`py-40 mt-20 border-t ${
        theme === 'dark' ? "bg-black border-white/5" : "bg-white border-slate-100"
      }`}>
        <div className="container mx-auto px-6 text-center">
           <h2 className={`text-4xl md:text-6xl font-black mb-16 tracking-tighter ${
             theme === 'dark' ? "text-white" : "text-slate-900"
           }`}>Why Aspirants Trust Us</h2>
           <div className="grid md:grid-cols-4 gap-12">
              {[
                { val: "2,000+", lab: "Live Lessons Daily", icon: Zap },
                { val: "99.9%", lab: "Student Satisfaction", icon: Star },
                { val: "10,000+", lab: "Olympiad Selections", icon: Trophy },
                { val: "24/7", lab: "Doubt Resolution", icon: ShieldCheck }
              ].map((stat) => (
                <div key={stat.lab} className="group">
                   <div className="w-16 h-16 rounded-2xl bg-blue-600/5 flex items-center justify-center mx-auto mb-6 transition-all group-hover:bg-blue-600 group-hover:text-white">
                      <stat.icon size={24} className="text-blue-500 group-hover:text-white transition-colors" />
                   </div>
                   <h4 className={`text-4xl font-black mb-2 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{stat.val}</h4>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.lab}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default BatchesPage;
