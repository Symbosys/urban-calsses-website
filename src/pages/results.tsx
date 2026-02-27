import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Search, Target, Users, PlayCircle, Star
} from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { useResults } from "../api/hooks/result/result.hooks";

const stats = [
  { label: "Selections in 2024", value: "22,000+", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Top 100 AIR", value: "180+", icon: Trophy, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "State Toppers", value: "65+", icon: Target, color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Our History", value: "10 Years", icon: Star, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const categories = [
  { id: "all", name: "All Results" },
  { id: "jee", name: "IIT-JEE" },
  { id: "neet", name: "NEET UG" },
  { id: "foundation", name: "Foundations" },
  { id: "boards", name: "Boards" },
];

const ResultsPage = () => {
  const { theme } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: resultsData, isLoading } = useResults();
  const rawToppers = resultsData?.results || [];

  const filteredToppers = useMemo(() => {
    return rawToppers.filter(t => {
      const matchesSearch = t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.rank.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === "all" || t.examName.toLowerCase().includes(selectedCategory.toLowerCase());
      // Assuming year is a number in your type, let's cast or check
      const matchesYear = selectedYear === "all" || t.year.toString() === selectedYear;
      return matchesSearch && matchesCat && matchesYear;
    });
  }, [rawToppers, searchQuery, selectedCategory, selectedYear]);

  return (
    <div className={`pt-24 min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? "bg-[#05080e]" : "bg-white"
    }`}>
      {/* Banner Section - PW Style */}
      <section className={`py-16 md:py-24 border-b ${theme === 'dark' ? 'border-white/5 bg-[#0a0d16]' : 'border-slate-100 bg-[#f8fbff]'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
              <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Our Results Speak</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
            >
              Celebrating the Success of <br />
              <span className="text-blue-600">Our Future Leaders.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-xl font-medium max-w-2xl leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
            >
              Unwavering commitment, exceptional mentorship, and consistent hard work have led to these extraordinary achievements. We take pride in every rank.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 -mt-12">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl shadow-2xl border ${
          theme === 'dark' ? 'bg-[#111827] border-white/5 shadow-black/50' : 'bg-white border-slate-100 shadow-blue-500/10'
        }`}>
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={28} />
              </div>
              <div>
                <h4 className={`text-2xl font-black transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h4>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Navigation & Filters - PW Style */}
        <div className="space-y-8 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
             <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedCategory === cat.id
                        ? "bg-slate-900 text-white shadow-xl"
                        : theme === 'dark' ? "bg-white/5 text-slate-400 hover:bg-white/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
             </div>

             <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Year:</span>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className={`px-6 py-3 rounded-xl border outline-none font-bold text-xs ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="all">All Years</option>
                </select>
             </div>
          </div>

          <div className="relative group max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text" 
                placeholder="Search by student name or rank..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-5 pl-16 pr-8 rounded-2xl border outline-none font-bold transition-all ${
                  theme === 'dark' 
                    ? "bg-white/5 border-white/10 text-white focus:border-blue-500/50" 
                    : "bg-white border-slate-200 text-slate-900 focus:border-blue-500"
                }`}
              />
          </div>
        </div>

        {/* Toppers Cards Grid - Clean PW Layout */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {isLoading ? (
            <div className="col-span-full py-40 flex flex-col items-center justify-center gap-4">
               <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
               <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Loading Champions...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredToppers.map((topper, i) => (
                <motion.div
                  key={topper.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`group relative flex flex-col items-center p-6 rounded-[2rem] border transition-all duration-500 box-border ${
                    theme === 'dark' 
                      ? "bg-[#111827] border-white/5 hover:border-blue-500/40" 
                      : "bg-white border-slate-100 shadow-xl shadow-slate-500/5 hover:shadow-blue-500/10"
                  }`}
                >
                  {/* AIR / Rank Badge - Very PW Style */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 bg-yellow-400 rounded-lg text-black font-black text-[10px] uppercase shadow-md">
                       AIR {topper.rank}
                    </div>
                  </div>

                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-100 relative">
                    <img 
                      src={topper.image?.secure_url || "https://images.unsplash.com/photo-1544717297-fa95b3ee215e?q=80&w=2070&auto=format&fit=crop"} 
                      alt={topper.studentName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Year overlay */}
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded text-white text-[8px] font-bold">
                       {topper.examName} • {topper.year}
                    </div>
                  </div>

                  <div className="text-center w-full">
                    <h5 className={`text-lg font-black truncate mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {topper.studentName}
                    </h5>
                    <p className="text-blue-500 font-bold text-[10px] uppercase tracking-widest mb-4">
                      Score: {topper.college?.substring(0, 15) || "99.9 Percentile"}
                    </p>
                    
                    <button className={`w-full py-3 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all ${
                      theme === 'dark' 
                        ? 'border-white/10 text-white hover:bg-white hover:text-black' 
                        : 'border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white'
                    }`}>
                      Success Story
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Video Stories Section */}
        <section className="mt-40">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                 <h2 className={`text-4xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Topper Interviews</h2>
                 <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-2">Learn the secrets to their extraordinary success</p>
              </div>
              <button className="flex items-center gap-3 text-blue-600 font-black uppercase text-xs tracking-widest">
                 Watch More <PlayCircle size={18} />
              </button>
           </div>

           <div className="grid md:grid-cols-3 gap-10">
              {[1, 2, 3].map(i => (
                <div key={i} className={`group relative aspect-video rounded-3xl overflow-hidden border ${
                  theme === 'dark' ? 'border-white/5' : 'border-slate-100 shadow-2xl shadow-blue-500/5'
                }`}>
                  <img 
                    src={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt="Interview"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all shadow-2xl shadow-blue-600/50">
                       <PlayCircle size={32} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-black text-lg leading-tight uppercase">Journey to AIR {i * 10}</p>
                    <p className="text-white/60 text-[10px] font-bold mt-1">Interview with Akash Verma</p>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* Registration CTA */}
        <section className="mt-40 mb-20 text-center">
           <div className={`p-16 md:p-24 rounded-[4rem] border relative overflow-hidden ${
             theme === 'dark' ? 'bg-[#111827] border-white/5' : 'bg-[#f0f7ff] border-blue-50'
           }`}>
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full" />
              <div className="relative z-10">
                 <h3 className={`text-4xl md:text-6xl font-black mb-10 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Ready to see your name <br /> on this list?
                 </h3>
                 <p className="text-slate-500 font-medium text-lg mb-12 max-w-xl mx-auto">
                    Start your journey with Urban Classes today and get the elite mentorship you need to crack your dream exam.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all">
                       Enroll in Victory Batch
                    </button>
                    <button className={`px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest border transition-all ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-blue-500/5'
                    }`}>
                       Free Career Counseling
                    </button>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default ResultsPage;
