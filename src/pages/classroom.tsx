
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Volume2, Settings, Maximize, MessageSquare, 
  HelpCircle, FileText, ChevronRight, Send,
  BookOpen, Users, Download, Zap, Heart, BarChart3, Radio,
  Layout, Bookmark, Share2, MoreHorizontal, CheckCircle2,
  Clock, Award, Headphones
} from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { Link } from "react-router-dom";

const Classroom = () => {
  const { theme } = useThemeStore();
  const [activeTab, setActiveTab] = useState("chat"); 
  const [isPlaying, setIsPlaying] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "Karan Sharma", text: "Sir, does the flux depend on the shape of the Gaussian surface?", time: "4:02 PM", role: "student", avatar: "KS" },
    { id: 2, user: "Priya Das", text: "I think it only depends on the charge enclosed.", time: "4:05 PM", role: "student", avatar: "PD" },
    { id: 3, user: "Dr. RK Verma", text: "Exactly Priya! The surface integral of the electric field remains constant for any closed surface as long as the net charge inside stays the same.", time: "4:06 PM", role: "teacher", avatar: "RK" },
    { id: 4, user: "Amit Mehra", text: "This is so much clearer now. The visual representation helped a lot.", time: "4:08 PM", role: "student", avatar: "AM" },
  ]);

  const playlist = [
    { id: 1, title: "01. Introduction to Electrostatics", duration: "45:20", completed: true },
    { id: 2, title: "02. Coulomb's Law & Field Lines", duration: "52:10", completed: true },
    { id: 3, title: "03. Electric Flux & Area Vector", duration: "48:15", completed: true },
    { id: 4, title: "04. Gauss Law Principles", duration: "1:10:00", active: true },
    { id: 5, title: "05. Applications of Gauss Law", duration: "55:00", locked: true },
    { id: 6, title: "06. Potential Energy & Dipoles", duration: "1:05:00", locked: true },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      user: "You", 
      text: chatInput, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: "student",
      avatar: "Y"
    }]);
    setChatInput("");
  };

  return (
    <div className={`pt-20 min-h-screen transition-all duration-700 font-sans ${
      theme === 'dark' ? "bg-[#05070a]" : "bg-slate-50"
    }`}>
      {/* Background Aesthetic */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] transition-all duration-1000 ${
          theme === 'dark' ? "bg-blue-600/5" : "bg-blue-200/20"
        }`} />
      </div>

      <div className="max-w-[1800px] mx-auto p-6 lg:p-10 relative z-10">
        
        {/* Top Professional Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
               <Link to="/courses" className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600/10 text-blue-500 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                  <Layout size={12} /> Course Dashboard
               </Link>
               <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest opacity-30">/</span>
               <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Lakshya JEE 2026 Batch</span>
            </div>
            <h1 className={`text-3xl md:text-5xl font-black tracking-tight leading-none mb-4 ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>
              Lecture 45: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Gauss's Law & Flux </span>
            </h1>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 px-3 py-1 bg-rose-600/10 text-rose-600 rounded-full border border-rose-600/20 animate-pulse">
                  <Radio size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Live Now</span>
               </div>
               <div className="flex items-center gap-4 text-slate-500">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                     <Users size={14} /> 12.4k Students Online
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                     <Clock size={14} /> 1:45:22 / 2:30:00
                  </div>
               </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
             <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
               theme === 'dark' ? 'bg-white/5 border border-white/10 text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 shadow-sm'
             }`}>
                <Bookmark size={20} />
             </button>
             <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
               theme === 'dark' ? 'bg-white/5 border border-white/10 text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 shadow-sm'
             }`}>
                <Share2 size={20} />
             </button>
             <div className="w-px h-8 bg-slate-800/50 mx-2" />
             <div className="flex items-center gap-4 px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/30">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black">RK</div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 opacity-70">Instructor</p>
                   <p className="text-sm font-black leading-none">Dr. RK Verma</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          
          {/* Main Cinematic Hub */}
          <div className="col-span-12 xl:col-span-9">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative rounded-[3rem] overflow-hidden border transition-all shadow-2xl group ${
                theme === 'dark' ? "bg-black border-white/5 shadow-blue-900/10" : "bg-slate-900 border-slate-200"
              }`}
            >
              {/* Higher Quality Video Placeholder */}
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1932&auto=format&fit=crop" 
                  alt="Board"
                  className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Netflix-style Overlay Controls */}
                <div className="absolute inset-0 flex flex-col justify-between p-10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                         <div className="px-3 py-1 bg-black/40 backdrop-blur-xl rounded-lg border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">HD 1080p</div>
                         <div className="px-3 py-1 bg-blue-600 rounded-lg text-white text-[10px] font-black uppercase tracking-widest">Active Connection</div>
                      </div>
                      <button className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                         <MoreHorizontal size={24} />
                      </button>
                   </div>

                   <center className="pointer-events-none">
                      <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                         {isPlaying ? <Pause size={40} fill="white" className="text-white" /> : <Play size={40} fill="white" className="text-white ml-2" />}
                      </div>
                   </center>

                   <div>
                      {/* Seek Bar */}
                      <div className="w-full h-1.5 bg-white/20 rounded-full mb-8 relative cursor-pointer">
                         <div className="absolute inset-0 bg-white/10 rounded-full" style={{ width: '80%' }} />
                         <div className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_15px_#2563eb]" style={{ width: '45%' }} />
                         <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-600 shadow-xl" style={{ left: '45%' }} />
                      </div>
                      
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-8 text-white">
                            <button className="hover:text-blue-500 transition-colors"><Play size={24} fill="currentColor" /></button>
                            <button className="flex items-center gap-3 group/vol">
                               <Volume2 size={24} />
                               <div className="w-0 group-hover/vol:w-20 overflow-hidden transition-all duration-300">
                                  <div className="w-20 h-1 bg-white/20 rounded-full">
                                     <div className="w-2/3 h-full bg-white rounded-full" />
                                  </div>
                               </div>
                            </button>
                            <span className="text-xs font-black tracking-widest">01:45:22 / 02:30:00</span>
                         </div>
                         <div className="flex items-center gap-8 text-white">
                            <button className="hover:text-blue-500 transition-colors"><Settings size={22} /></button>
                            <button className="hover:text-blue-500 transition-colors"><Maximize size={22} /></button>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Content Tabs & Tools */}
            <div className="mt-12">
               <div className="flex gap-10 border-b border-white/5 mb-10 overflow-x-auto no-scrollbar">
                  {[
                    { id: "overview", label: "Overview", icon: BookOpen },
                    { id: "resources", label: "Resources", icon: FileText },
                    { id: "qa", label: "Q&A Forum", icon: HelpCircle },
                    { id: "notes", label: "My Notes", icon: Award }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative pb-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                        activeTab === tab.id 
                          ? "text-blue-500" 
                          : theme === 'dark' ? "text-slate-500 hover:text-white" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <tab.icon size={14} /> {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full shadow-[0_0_10px_#2563eb]" />
                      )}
                    </button>
                  ))}
               </div>

               <div className="grid lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-8">
                     <div className={`p-10 rounded-[3rem] border ${
                       theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-100 shadow-xl shadow-blue-500/5'
                     }`}>
                        {activeTab === 'overview' && (
                          <div className="space-y-8">
                             <div>
                                <h3 className={`text-2xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>About this Session</h3>
                                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                   In this lecture, we explore the deep connection between symmetry and field lines. 
                                   Dr. Verma breaks down the Gauss Law into intuitive fragments, 
                                   making it easier to solve complex integration problems in electrostatic setups.
                                </p>
                             </div>
                             <div className="grid md:grid-cols-2 gap-6">
                                {["Properties of Flux", "Area Vector Analysis", "Closed Surfaces", "Application 1"].map((tag, i) => (
                                  <div key={i} className={`flex items-center gap-4 p-5 rounded-[1.5rem] border ${
                                    theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'
                                  }`}>
                                     <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                                        <Zap size={18} className="text-blue-500" />
                                     </div>
                                     <span className={`text-sm font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{tag}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                        )}
                        {activeTab === 'resources' && (
                          <div className="space-y-4">
                             {["Lecture_45_Handouts.pdf", "Coulumbs_Principle_Advanced.pdf", "DPP_Set_04.pdf"].map((file, i) => (
                               <div key={i} className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all hover:bg-white/5 ${
                                 theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'
                               }`}>
                                  <div className="flex items-center gap-4">
                                     <FileText className="text-blue-500" size={24} />
                                     <span className={`font-black text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>{file}</span>
                                  </div>
                                  <button className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
                                     <Download size={20} />
                                  </button>
                               </div>
                             ))}
                          </div>
                        )}
                     </div>
                  </div>

                  <div className="lg:col-span-4">
                     <div className={`p-8 rounded-[2.5rem] border ${
                       theme === 'dark' ? 'bg-[#161b2c] border-white/5' : 'bg-white border-slate-200'
                     }`}>
                        <div className="flex items-center gap-4 mb-8">
                           <Headphones size={20} className="text-blue-500" />
                           <h4 className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Session Support</h4>
                        </div>
                        <p className="text-xs font-bold text-slate-500 mb-8 leading-relaxed">Having trouble with audio or visual sync? Our 24/7 technical team is ready to help.</p>
                        <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 hover:bg-blue-600 hover:text-white transition-all">Support Engine</button>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Hub: Playlist & Participation */}
          <div className="col-span-12 xl:col-span-3">
             <div className="space-y-10">
                {/* Lesson Track */}
                <div className={`rounded-[3rem] border overflow-hidden transition-all ${
                  theme === 'dark' ? "bg-white/[0.02] border-white/5 shadow-2xl" : "bg-white border-slate-200 shadow-xl shadow-blue-500/5"
                }`}>
                   <div className={`p-8 border-b ${theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <h4 className={`text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                         <BarChart3 size={16} className="text-blue-500" /> Batch Curriculum
                      </h4>
                   </div>
                   <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto no-scrollbar">
                      {playlist.map(item => (
                        <div key={item.id} className={`p-5 rounded-[1.5rem] flex items-start gap-4 transition-all cursor-pointer ${
                          item.active 
                            ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30" 
                            : item.locked ? "opacity-30 cursor-not-allowed" : theme === 'dark' ? "hover:bg-white/5" : "hover:bg-slate-50"
                        }`}>
                           {item.completed ? <CheckCircle2 size={16} className="text-blue-400 mt-1 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-500 mt-1 shrink-0" />}
                           <div className="flex-1">
                              <p className={`text-xs font-black tracking-tight leading-none mb-2 ${item.active ? 'text-white' : 'text-slate-500'}`}>{item.title}</p>
                              <p className={`text-[10px] font-bold ${item.active ? 'text-blue-100' : 'text-slate-400'}`}>{item.duration}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Interaction Terminal */}
                <div className={`flex flex-col h-[550px] rounded-[3rem] border overflow-hidden relative ${
                  theme === 'dark' ? "bg-white/[0.02] border-white/5 backdrop-blur-3xl" : "bg-white border-slate-200 shadow-2xl shadow-blue-500/5"
                }`}>
                   <div className={`p-6 border-b flex items-center justify-between ${theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                         <MessageSquare size={16} className="text-blue-500" /> Participation
                      </h4>
                      <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[8px] font-black text-white">U</div>
                        ))}
                      </div>
                   </div>

                   <div className="flex-1 overflow-y-auto p-8 no-scrollbar scroll-smooth space-y-6">
                      <AnimatePresence mode="popLayout">
                        {messages.map((msg) => (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id} 
                            className="flex flex-col gap-2"
                          >
                             <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${
                                  msg.role === 'teacher' ? 'bg-blue-600 text-white' : 'text-slate-500 border border-slate-800'
                                }`}>{msg.user}</span>
                                <span className="text-[8px] font-bold text-slate-700">{msg.time}</span>
                             </div>
                             <p className={`text-xs font-bold leading-relaxed p-4 rounded-2xl ${
                               msg.role === 'teacher' ? 'bg-white/10 text-white' : theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-700'
                             }`}>
                                {msg.text}
                             </p>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                   </div>

                   <div className={`p-8 border-t ${theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <form onSubmit={handleSendMessage} className="relative group">
                         <input 
                           type="text" 
                           value={chatInput}
                           onChange={(e) => setChatInput(e.target.value)}
                           placeholder="Ask a doubt..."
                           className={`w-full py-4 px-6 rounded-2xl border outline-none transition-all text-[11px] font-bold ${
                             theme === 'dark' 
                               ? "bg-[#0b0f1a] border-white/10 text-white focus:border-blue-500/50 shadow-inner" 
                               : "bg-white border-slate-200 text-slate-900 focus:border-blue-500 shadow-sm"
                           }`}
                         />
                         <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-600/30">
                           <Send size={16} />
                         </button>
                      </form>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
