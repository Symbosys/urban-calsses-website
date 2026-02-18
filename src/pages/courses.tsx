
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, ArrowRight, CheckCircle2, GraduationCap, Book, Sparkles, Zap, ShieldCheck, Trophy } from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", name: "All Batches", icon: Sparkles, color: "from-blue-500 to-indigo-600" },
  { id: "jee", name: "IIT-JEE", icon: Zap, color: "from-orange-500 to-red-600" },
  { id: "neet", name: "NEET UG", icon: GraduationCap, color: "from-emerald-500 to-teal-600" },
  { id: "boards", name: "Class 12th", icon: Book, color: "from-purple-500 to-pink-600" },
  { id: "foundation", name: "Foundation", icon: Trophy, color: "from-amber-500 to-yellow-600" },
];

const courseListing = [
  {
    id: "jee-2026",
    title: "Lakshya JEE 2026",
    category: "jee",
    exam: "JEE Main & Advanced",
    price: "4,999",
    originalPrice: "9,999",
    rating: 4.9,
    enrolled: "85k+",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    features: ["Daily Live Classes", "PDF Notes & DPPs", "Doubt Solving Engine"],
    tag: "🔥 Most Popular",
    gradient: "from-blue-600/20 to-indigo-600/20"
  },
  {
    id: "neet-2026",
    title: "Yakeen NEET 2026",
    category: "neet",
    exam: "NEET UG",
    price: "3,499",
    originalPrice: "7,999",
    rating: 4.8,
    enrolled: "62k+",
    image: "https://images.unsplash.com/photo-1532187875605-1ef63823db17?q=80&w=2070&auto=format&fit=crop",
    features: ["Expert Biology Modules", "Physics Drill Sets", "24/7 Doubts"],
    tag: "⭐ Top Rated",
    gradient: "from-emerald-600/20 to-teal-600/20"
  },
  {
    id: "boards-12",
    title: "Super Boards 12th",
    category: "boards",
    exam: "CBSE & State Boards",
    price: "2,499",
    originalPrice: "4,999",
    rating: 4.7,
    enrolled: "45k+",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
    features: ["NCERT Coverage", "PYQ Analysis", "Sample Papers"],
    tag: "📚 Academic Excellence",
    gradient: "from-purple-600/20 to-pink-600/20"
  },
  {
    id: "foundation-10",
    title: "Foundation Plus 10",
    category: "foundation",
    exam: "Class 10th & Olympiad",
    price: "1,999",
    originalPrice: "3,999",
    rating: 4.9,
    enrolled: "38k+",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
    features: ["Concept Clarity", "Analytical Skills", "Mental Ability"],
    tag: "🚀 Early Pro",
    gradient: "from-amber-600/20 to-yellow-600/20"
  },
  {
    id: "jee-crash",
    title: "JEE Fastrack 2025",
    category: "jee",
    exam: "JEE Main Sprint",
    price: "1,499",
    originalPrice: "2,999",
    rating: 4.6,
    enrolled: "25k+",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop",
    features: ["Rank Booster Kit", "Last 10 Year PYQs", "Formula Sheets"],
    tag: "⚡ Turbo Batch",
    gradient: "from-red-600/20 to-orange-600/20"
  },
  {
    id: "neet-dropper",
    title: "Arjun NEET Droppers",
    category: "neet",
    exam: "NEET Repeaters",
    price: "3,999",
    originalPrice: "8,999",
    rating: 4.8,
    enrolled: "54k+",
    image: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=2070&auto=format&fit=crop",
    features: ["Intensive Practice", "Doubt Classes", "Personal Tracker"],
    tag: "🏹 Mission NEET",
    gradient: "from-indigo-600/20 to-blue-600/20"
  }
];

const CoursesPage = () => {
  const { theme } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courseListing.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.exam.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`pt-20 min-h-screen transition-colors duration-500 overflow-hidden ${
      theme === 'dark' ? "bg-[#0b0f1a]" : "bg-slate-50"
    }`}>
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none opacity-50">
        <div className={`absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] transition-colors duration-1000 ${
          theme === 'dark' ? "bg-blue-600/10" : "bg-blue-200/20"
        }`} />
        <div className={`absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000 ${
          theme === 'dark' ? "bg-indigo-600/10" : "bg-indigo-200/20"
        }`} />
      </div>

      {/* Hero & Search Section */}
      <section className="relative py-24 pb-32">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md border ${
              theme === 'dark' ? "bg-white/5 border-white/10 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-600"
            }`}>
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Premium Learning Experience</span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tight transition-colors ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>
              Find Your Path to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Greatness</span>
            </h1>
            <p className={`text-xl font-medium max-w-2xl mx-auto leading-relaxed transition-colors ${
              theme === 'dark' ? "text-slate-400" : "text-slate-600"
            }`}>
              Choose from our curated collection of elite batches designed by India's top educators to help you ace your dreams.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto relative mb-20"
          >
            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-focus-within:opacity-100`}></div>
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="Search for JEE, NEET, or Specific Batch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-6 pl-16 pr-6 rounded-2xl border outline-none transition-all text-xl shadow-2xl ${
                  theme === 'dark' 
                    ? "bg-[#161b2c]/80 backdrop-blur-xl border-slate-700/50 text-white focus:border-blue-500/50" 
                    : "bg-white border-slate-200 text-slate-900 focus:border-blue-500 shadow-blue-500/5"
                }`}
              />
            </div>
          </motion.div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold tracking-tight transition-all active:scale-95 group overflow-hidden ${
                  selectedCategory === cat.id
                    ? "text-white shadow-2xl"
                    : theme === 'dark'
                      ? "bg-[#161b2c]/60 text-slate-400 hover:text-white border border-slate-800"
                      : "bg-white text-slate-600 hover:text-blue-600 border border-slate-200 shadow-sm"
                }`}
              >
                {selectedCategory === cat.id && (
                  <motion.div 
                    layoutId="category-bg"
                    className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} 
                  />
                )}
                <cat.icon size={20} className="relative z-10" />
                <span className="relative z-10">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="relative pb-32">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="popLayout">
            {filteredCourses.length > 0 ? (
              <motion.div 
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Link to={`/course/${course.id}`} className="block h-full group">
                      <div className={`relative h-full border transition-all duration-500 rounded-[2.5rem] overflow-hidden flex flex-col ${
                        theme === 'dark' 
                          ? "bg-[#161b2c]/40 border-slate-800/50 hover:border-blue-500/40 hover:bg-[#1c233a] shadow-2xl shadow-blue-900/10" 
                          : "bg-white border-slate-200 hover:border-blue-500/30 shadow-xl hover:shadow-2xl shadow-blue-500/5"
                      }`}>
                        {/* Course Image Area */}
                        <div className="relative aspect-[16/11] overflow-hidden m-4 rounded-[2rem]">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40`} />
                          
                          {/* Badge */}
                          <div className="absolute top-5 left-5">
                            <div className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                               {course.tag}
                            </div>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                             <div className="bg-white text-black px-6 py-3 rounded-full font-black text-sm uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                               View Batch <ArrowRight size={16} />
                             </div>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="px-8 pb-8 flex-1 flex flex-col">
                          <div className="flex justify-between items-center mb-5">
                            <span className="px-3 py-1 bg-blue-600/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg border border-blue-500/20">
                              {course.exam}
                            </span>
                            <div className="flex items-center gap-1.5">
                               <Star size={14} className="text-yellow-500" fill="currentColor" strokeWidth={0} />
                               <span className={`text-xs font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{course.rating}</span>
                               <span className="text-slate-500 text-[10px] font-bold">({course.enrolled})</span>
                            </div>
                          </div>

                          <h3 className={`text-2xl font-black mb-6 leading-tight transition-colors group-hover:text-blue-500 ${
                            theme === 'dark' ? "text-white" : "text-slate-900"
                          }`}>
                            {course.title}
                          </h3>

                          <div className="space-y-4 mb-10">
                            {course.features.map((f, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10">
                                  <CheckCircle2 size={12} className="text-blue-500" />
                                </div>
                                <span className={`text-sm font-semibold transition-colors ${
                                  theme === 'dark' ? "text-slate-400" : "text-slate-600"
                                }`}>{f}</span>
                              </div>
                            ))}
                          </div>

                          {/* Price & Action */}
                          <div className={`mt-auto pt-8 border-t flex items-center justify-between ${
                            theme === 'dark' ? "border-slate-800" : "border-slate-100"
                          }`}>
                            <div className="flex flex-col">
                               <div className="flex items-center gap-2">
                                 <span className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>₹{course.price}</span>
                                 <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-2 py-0.5 rounded uppercase leading-none">Save 50%</span>
                               </div>
                               <span className="text-slate-500 line-through text-sm font-bold opacity-50">₹{course.originalPrice}</span>
                            </div>
                            
                            <button className="relative overflow-hidden group/btn px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-blue-600/25 active:scale-95">
                              <span className="relative z-10">Join Batch</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <div className="relative inline-block mb-10">
                  <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-xl animate-pulse"></div>
                  <div className={`relative w-28 h-28 rounded-full flex items-center justify-center shadow-inner ${
                    theme === 'dark' ? "bg-slate-800 text-slate-500" : "bg-white text-slate-400"
                  }`}>
                    <Search size={40} />
                  </div>
                </div>
                <h3 className={`text-3xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No Matches Found</h3>
                <p className="text-slate-500 font-bold max-w-sm mx-auto">We couldn't find any batches matching your criteria. Try widening your filters.</p>
                <button 
                  onClick={() => {setSelectedCategory("all"); setSearchQuery("");}}
                  className="mt-10 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-blue-500 font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Section */}
      <section className={`py-32 border-t ${
        theme === 'dark' ? "bg-[#080b14] border-slate-800" : "bg-white border-slate-100"
      }`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
             {[
               { icon: Zap, label: "Live Interactive Classes", value: "Daily 8+ hrs" },
               { icon: ShieldCheck, label: "Expert Doubt Resolution", value: "24/7 Engine" },
               { icon: Trophy, label: "Top Rankers Produced", value: "10,000+" },
               { icon: Sparkles, label: "Structured Study Plans", value: "100% Success" }
             ].map((item, i) => (
               <div key={i} className="group">
                 <div className="w-16 h-16 rounded-2xl bg-blue-600/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                   <item.icon size={28} className="text-blue-500 group-hover:text-white transition-colors" />
                 </div>
                 <h4 className={`text-lg font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.value}</h4>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{item.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
