
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calendar, Clock, 
  ArrowRight, 
  Bookmark, Share2,
  Newspaper
} from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { useBlogs } from "../api/hooks/blogs/blog.hooks";
import { Link } from "react-router-dom";
import type { Blog } from "../types/blogs/blog.types";

const categories = [
  { id: "all", name: "All Posts" },
  { id: "strategy", name: "Exam Strategy" },
  { id: "updates", name: "Latest Updates" },
  { id: "tips", name: "Study Tips" },
  { id: "career", name: "Career Guidance" },
];

const BlogPage = () => {
  const { theme } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Use debounced search to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading } = useBlogs({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    search: debouncedSearch || undefined,
  });

  const blogPosts = data?.blogs || [];
  const featuredPost = blogPosts.find((p: Blog) => p.isPublished); // Simple logic for featured

  return (
    <div className={`pt-36 min-h-screen transition-all duration-700 overflow-hidden ${
      theme === 'dark' ? "bg-[#080b14]" : "bg-slate-50"
    }`}>
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] transition-all duration-1000 ${
          theme === 'dark' ? "bg-indigo-600/5" : "bg-indigo-100/20"
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-1000 ${
          theme === 'dark' ? "bg-rose-600/5" : "bg-rose-100/10"
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
            theme === 'dark' ? "bg-white/5 border-white/10 text-rose-400" : "bg-rose-50 border-rose-100 text-rose-600"
          }`}>
             <Newspaper size={14} className="animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">The Insight Core</span>
          </div>
          <h1 className={`text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none ${
            theme === 'dark' ? "text-white" : "text-slate-900"
          }`}>
            Urban <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 text-glow">Insights</span>
          </h1>
          <p className={`text-xl font-medium max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? "text-slate-400" : "text-slate-600"
          }`}>
            Stay ahead with the latest in academic strategy, exam trends, and elite learning tips curated by India's top mentors.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "all" && !searchQuery && (
          <Link to={`/blogs/${featuredPost.slug}`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative mb-32 rounded-[4rem] border overflow-hidden group cursor-pointer ${
                theme === 'dark' ? "bg-[#161b2c]/40 border-white/5" : "bg-white border-slate-100 shadow-2xl shadow-blue-500/5"
              }`}
            >
              <div className="grid lg:grid-cols-2">
                 <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                    <img src={featuredPost.thumbnail?.secure_url || "https://images.unsplash.com/photo-1532187875605-1ef63823db17?q=80&w=2070&auto=format&fit=crop"} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
                 </div>
                 <div className="p-12 lg:p-20 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                       <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Featured Post</span>
                       <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{featuredPost.category}</span>
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-black mb-8 leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {featuredPost.title}
                    </h2>
                    <p className={`text-lg mb-12 font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-700 overflow-hidden shrink-0">
                            {featuredPost.authorImage?.secure_url && (
                               <img src={featuredPost.authorImage.secure_url} alt="" className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div>
                             <p className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{featuredPost.authorName}</p>
                             <p className="text-[10px] text-slate-500 font-bold">{new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString()} • 5 min read</p>
                          </div>
                       </div>
                       <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-600/30 hover:scale-110 transition-transform">
                          <ArrowRight size={20} />
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-20">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30"
                    : theme === 'dark' 
                      ? "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10" 
                      : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search insights..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-5 pl-14 pr-6 rounded-2xl border outline-none font-bold transition-all ${
                theme === 'dark' 
                  ? "bg-[#161b2c]/60 border-white/10 text-white focus:border-blue-500/50" 
                  : "bg-white border-slate-200 text-slate-900 focus:border-blue-500"
              }`}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 pb-40">
           <AnimatePresence mode="popLayout">
             {isLoading ? (
               [1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className="animate-pulse bg-slate-200/50 dark:bg-slate-800/50 h-96 rounded-[3rem]" />
               ))
             ) : (
               blogPosts.length > 0 ? blogPosts.map((post: Blog) => (
                  <Link to={`/blogs/${post.slug}`} key={post.id}>
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`group rounded-[3rem] border transition-all duration-700 h-full flex flex-col ${
                        theme === 'dark' 
                          ? "bg-[#161b2c]/60 border-white/5 hover:border-blue-500/30" 
                          : "bg-white border-slate-100 shadow-xl shadow-blue-500/5 hover:shadow-2xl"
                      }`}
                    >
                       <div className="relative aspect-video m-4 rounded-[2.5rem] overflow-hidden">
                          <img src={post.thumbnail?.secure_url || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                          <div className="absolute top-6 left-6">
                             <span className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl text-white font-black text-[10px] uppercase tracking-widest">
                                {post.category || "General"}
                             </span>
                          </div>
                       </div>

                       <div className="p-10 pt-4 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-6 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                             <Calendar size={12} /> {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                             <span className="mx-2">•</span>
                             <Clock size={12} /> 5 min read
                          </div>
                          <h3 className={`text-2xl font-black mb-6 leading-tight transition-colors group-hover:text-blue-500 ${
                            theme === 'dark' ? "text-white" : "text-slate-900"
                          }`}>
                             {post.title}
                          </h3>
                          <p className={`text-base font-medium transition-colors flex-1 mb-10 line-clamp-3 ${
                            theme === 'dark' ? "text-slate-400" : "text-slate-600"
                          }`}>
                             {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between pt-8 border-t border-white/5">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-slate-700 overflow-hidden">
                                  {post.authorImage?.secure_url && (
                                     <img src={post.authorImage.secure_url} alt="" className="w-full h-full object-cover" />
                                  )}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{post.authorName || "Team Urban"}</span>
                             </div>
                             <div className="flex gap-4">
                                <button className="text-slate-500 hover:text-blue-500 transition-colors">
                                   <Bookmark size={18} />
                                </button>
                                <button className="text-slate-500 hover:text-blue-500 transition-colors">
                                   <Share2 size={18} />
                                </button>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  </Link>
               )) : (
                <div className="col-span-full h-96 flex items-center justify-center border rounded-[3rem] border-dashed">
                    <p className="text-muted-foreground font-bold">No articles found in this category.</p>
                </div>
               )
             )}
           </AnimatePresence>
        </div>

        {/* Newsletter Section */}
        <section className="relative py-40 border-t border-white/5">
           <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full opacity-50" />
           <div className={`relative p-20 rounded-[4rem] border flex flex-col lg:flex-row items-center gap-16 ${
            theme === 'dark' ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-100 shadow-2xl shadow-blue-500/10"
           }`}>
               <div className="flex-1 text-center lg:text-left">
                  <h2 className={`text-5xl md:text-6xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Never Miss an <br />
                    <span className="text-blue-500">Expert Update.</span>
                  </h2>
                  <p className={`text-lg font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Join 50,000+ aspirants who receive our weekly newsletter on exam strategies and trending academic updates.
                  </p>
               </div>
               <div className="w-full lg:w-auto shrink-0">
                  <div className="relative flex flex-col sm:flex-row gap-4">
                     <input 
                        type="email" 
                        placeholder="Enter your email"
                        className={`px-8 py-5 rounded-2xl border outline-none min-w-[300px] font-bold ${
                          theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-slate-50 border-slate-200"
                        }`}
                     />
                     <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all">
                        Subscribe
                     </button>
                  </div>
               </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
