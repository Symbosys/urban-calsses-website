
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, 
  Search, Users, 
  ChevronRight, 
  Monitor, BookOpen, Coffee,
  Globe
} from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { useOfflineCenters } from "../api/hooks/offlineCenter/offlineCenter.hooks";

const facilities = [
  { icon: Monitor, label: "Hi-Tech Smart Labs", desc: "Equipped with latest digital learning tools" },
  { icon: BookOpen, label: "Modern Library", desc: "Thousands of books & quiet study zones" },
  { icon: Users, label: "Expert Mentors", desc: "Face-to-face interaction with top faculty" },
  { icon: Coffee, label: "Cafeteria", desc: "Healthy snacks and refreshing environment" },
];

// Initial static data replaced by API hook


const OfflineCentersPage = () => {
  const { theme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const { data, isLoading } = useOfflineCenters({
    city: selectedCity !== "All" ? selectedCity : undefined,
    isActive: true
  });

  const centers = data?.centers || [];
  const cities = ["All", ...Array.from(new Set(centers.map(c => c.city)))];

  const filteredCenters = centers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className={`pt-36 min-h-screen transition-all duration-700 overflow-hidden ${
      theme === 'dark' ? "bg-[#080b14]" : "bg-slate-50"
    }`}>
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] transition-all duration-1000 ${
          theme === 'dark' ? "bg-emerald-600/5" : "bg-emerald-100/20"
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-1000 ${
          theme === 'dark' ? "bg-blue-600/5" : "bg-blue-100/10"
        }`} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 backdrop-blur-xl border ${
            theme === 'dark' ? "bg-white/5 border-white/10 text-emerald-400" : "bg-emerald-50 border-emerald-100 text-emerald-600"
          }`}>
             <Globe size={14} className="animate-spin-slow" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Physical Experience, Digital Learning</span>
          </div>
          <h1 className={`text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none ${
            theme === 'dark' ? "text-white" : "text-slate-900"
          }`}>
            Our Learning <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 text-glow">Centers</span>
          </h1>
          <p className={`text-xl font-medium max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? "text-slate-400" : "text-slate-600"
          }`}>
            Experience the "Elite Hybrid" model at our physical campuses. World-class infrastructure, personalized mentorship, and a focused study environment.
          </p>
        </motion.div>

        {/* Search & City Filter */}
        <div className="max-w-5xl mx-auto mb-20 space-y-8">
           <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative flex-1 w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={22} />
                <input 
                  type="text" 
                  placeholder="Find centers near you..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-6 pl-16 pr-6 rounded-3xl border outline-none font-bold text-lg transition-all shadow-xl ${
                    theme === 'dark' 
                      ? "bg-[#161b2c]/80 border-white/5 text-white focus:border-emerald-500/50 shadow-black/20" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-emerald-500 shadow-emerald-500/5"
                  }`}
                />
              </div>
              <div className="flex flex-wrap gap-3 items-center justify-center">
                 {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedCity === city
                          ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/30"
                          : theme === 'dark' 
                            ? "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10" 
                            : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {city}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Center Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className={`rounded-[2.5rem] border p-10 space-y-6 animate-pulse ${theme === 'dark' ? "bg-[#161b2c]/40 border-white/5" : "bg-white border-slate-100"}`}>
                  <div className="w-full aspect-video rounded-2xl bg-slate-700/20" />
                  <div className="h-8 w-3/4 bg-slate-700/20 rounded-lg" />
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-slate-700/20 rounded-md" />
                    <div className="h-4 w-2/3 bg-slate-700/20 rounded-md" />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <div className="h-14 flex-1 rounded-2xl bg-slate-700/20" />
                    <div className="h-14 w-14 rounded-2xl bg-slate-700/20" />
                  </div>
                </div>
              ))
            ) : filteredCenters.length > 0 ? (
              filteredCenters.map((center) => (
                <motion.div
                  key={center.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`group rounded-[2.5rem] border overflow-hidden flex flex-col transition-all duration-700 ${
                    theme === 'dark' 
                      ? "bg-[#161b2c]/40 border-white/5 hover:border-emerald-500/30" 
                      : "bg-white border-slate-100 shadow-xl shadow-emerald-500/5 hover:shadow-2xl"
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={center.image?.secure_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"} 
                      alt={center.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-2">
                       <MapPin size={16} className="text-emerald-400" />
                       <span className="text-white font-black text-xs uppercase tracking-widest">{center.city}</span>
                    </div>
                  </div>
                  
                  <div className="p-10 flex flex-col flex-1">
                     <h3 className={`text-2xl font-black mb-6 leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{center.name}</h3>
                     
                     <div className="space-y-4 mb-10 flex-1">
                        <div className="flex gap-4">
                           <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/5 flex items-center justify-center">
                              <MapPin size={14} className="text-emerald-500" />
                           </div>
                           <p className={`text-xs font-bold leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                             {center.address}
                           </p>
                        </div>
                        {center.phone && (
                          <div className="flex items-center gap-4">
                            <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/5 flex items-center justify-center">
                                <Phone size={14} className="text-emerald-500" />
                            </div>
                            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{center.phone}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                           <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/5 flex items-center justify-center">
                              <Clock size={14} className="text-emerald-500" />
                           </div>
                           <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>9:00 AM - 8:00 PM</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <button 
                          onClick={() => center.locationUrl && window.open(center.locationUrl, "_blank")}
                          disabled={!center.locationUrl}
                          className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           Get Directions
                        </button>
                        <button 
                          onClick={() => center.email && (window.location.href = `mailto:${center.email}`)}
                          className={`w-14 h-14 flex items-center justify-center rounded-2xl border transition-colors ${
                          theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'
                        }`}>
                           <Mail size={18} className="text-emerald-500" />
                        </button>
                     </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                 <div className="w-20 h-20 bg-emerald-500/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin size={40} className="text-emerald-500/20" />
                 </div>
                 <h3 className={`text-2xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No centers found</h3>
                 <p className="text-slate-500 font-medium">Try searching for a different city or center name.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Facilities Section */}
        <section className="py-24 border-t border-white/5">
           <div className="text-center mb-24">
              <h2 className={`text-5xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>The Elite Ecosystem</h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Standardized facilities across all campuses</p>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {facilities.map((f, i) => (
                 <div key={i} className={`p-10 rounded-[3rem] border transition-all hover:scale-105 ${
                   theme === 'dark' ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-100 shadow-xl shadow-blue-500/5"
                 }`}>
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/5 flex items-center justify-center mb-6">
                       <f.icon size={28} className="text-emerald-500" />
                    </div>
                    <h4 className={`text-xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{f.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-bold">{f.desc}</p>
                 </div>
              ))}
           </div>
        </section>

        {/* CTA */}
        <section className="py-40 relative">
           <div className="absolute inset-0 bg-emerald-600/5 blur-[150px] rounded-full" />
           <div className={`relative p-20 rounded-[4rem] border text-center ${
            theme === 'dark' ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-100 shadow-2xl shadow-emerald-500/10"
           }`}>
              <h2 className={`text-5xl md:text-7xl font-black mb-8 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Join the Hybrid <br />
                <span className="text-emerald-500">Revolution.</span>
              </h2>
              <p className={`text-xl font-medium max-w-2xl mx-auto mb-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Walk into any of our campuses today for a free counseling session and live class demo.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button className="px-12 py-6 bg-emerald-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all">
                    Book Free Visit
                 </button>
                 <button className={`px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-widest border transition-all hover:bg-white/5 ${
                   theme === 'dark' ? "border-white/10 text-white" : "border-slate-200 text-slate-800"
                 }`}>
                    Find Nearest Center <ChevronRight size={16} className="inline ml-2" />
                 </button>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default OfflineCentersPage;
