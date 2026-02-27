
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, ArrowLeft, 
  Share2, Bookmark,
  Newspaper
} from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { useBlog, useBlogs } from "../api/hooks/blogs/blog.hooks";

const BlogDetail = () => {
  const { slug } = useParams();
  const { theme } = useThemeStore();
  const { data: blogData, isLoading } = useBlog(slug as string);
  const { data: blogsData } = useBlogs({ category: blogData?.blog?.category });

  if (isLoading) {
    return (
      <div className="pt-40 container mx-auto px-6">
        <div className="animate-pulse space-y-8">
            <div className="h-96 w-full bg-slate-200 dark:bg-slate-800 rounded-[3rem]" />
            <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="space-y-4">
               <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
               <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
               <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>
        </div>
      </div>
    );
  }

  const blog = blogData?.blog;
  if (!blog) return <div className="pt-40 text-center">Post not found</div>;

  const relatedPosts = blogsData?.blogs?.filter((p: any) => p.id !== blog.id).slice(0, 3) || [];

  return (
    <div className={`pt-36 min-h-screen transition-all duration-700 ${
      theme === 'dark' ? "bg-[#080b14] text-white" : "bg-slate-50 text-slate-900"
    }`}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Navigation / Back */}
        <div className="max-w-4xl mx-auto mb-12">
            <Link to="/blogs" className="group flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <ArrowLeft size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Back to Insights</span>
            </Link>
        </div>

        {/* Header Section */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <div className="flex items-center gap-3 mb-8">
                <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                    {blog.category || "Insight"}
                </span>
                <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <Calendar size={12} /> {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                    <span className="mx-2">•</span>
                    <Clock size={12} /> 5 min read
                </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-tight">
                {blog.title}
            </h1>

            <div className="flex items-center justify-between py-10 border-y border-white/5 mb-12">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-700 overflow-hidden shrink-0 shadow-xl">
                        {blog.authorImage?.secure_url && <img src={blog.authorImage.secure_url} alt="" className="w-full h-full object-cover" loading="lazy" />}
                    </div>
                    <div>
                        <p className="text-bases font-black">{blog.authorName || "Team Urban"}</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Content Specialist</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                        <Share2 size={18} />
                    </button>
                    <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-xl">
                        <Bookmark size={18} />
                    </button>
                 </div>
            </div>
        </motion.div>

        {/* Banner Image */}
        <div className="max-w-6xl mx-auto mb-20 rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
                src={blog.thumbnail?.secure_url || "https://images.unsplash.com/photo-1532187875605-1ef63823db17?q=80&w=2070&auto=format&fit=crop"} 
                alt={blog.title} 
                className="w-full aspect-[21/9] object-cover" 
                loading="lazy"
            />
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_300px] gap-20 pb-40">
            <article className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl font-medium leading-relaxed text-slate-400 italic mb-12 border-l-4 border-blue-600 pl-8">
                    {blog.excerpt}
                </p>
                <div 
                  className="blog-content leading-loose font-medium text-slate-300 space-y-8"
                  dangerouslySetInnerHTML={{ __html: blog.content }} 
                />
            </article>

            {/* Sidebar / Related Posts */}
            <aside className="space-y-16">
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8 flex items-center gap-2">
                       <Newspaper size={14} /> Related Insights
                   </h4>
                   <div className="space-y-6">
                       {relatedPosts.map((post: any) => (
                           <Link key={post.id} to={`/blogs/${post.slug}`} className="group block">
                               <div className="aspect-video rounded-3xl overflow-hidden mb-4 border border-white/5 shadow-xl">
                                   <img src={post.thumbnail?.secure_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" />
                               </div>
                               <h5 className="font-black text-sm group-hover:text-blue-500 transition-colors line-clamp-2">{post.title}</h5>
                           </Link>
                       ))}
                   </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                    <h4 className="text-xl font-black mb-4 relative z-10">Get more tips directly.</h4>
                    <p className="text-xs font-bold text-blue-100 mb-8 leading-relaxed opacity-80">Join our community of elite learners receiving weekly strategic updates.</p>
                    <div className="relative z-10 space-y-3">
                        <input placeholder="Your email" className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 outline-none text-xs font-bold placeholder:text-blue-100/50" />
                        <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-black/10 active:scale-95 transition-all">Join Free</button>
                    </div>
                </div>
            </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
