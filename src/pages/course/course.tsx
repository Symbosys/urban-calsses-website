import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Clock, Users, PlayCircle, 
  Download, Award, Zap, 
  ShieldCheck, BarChart3, ChevronRight, 
  Play, X, MapPin, Calendar
} from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourse } from "../../api/hooks/courses/course.hooks";
import { useCheckout, useVerifyPayment, useCheckEnrollment } from "../../api/hooks/courses/purchase.hooks";
import { useAuthStore } from "../../store/authStore";
import { showWarningMessage, showSuccessMessage } from "../../utils/message";
import OfflineBookingForm from "../../components/course/OfflineBookingForm";

const CourseDetail = () => {
  const { theme } = useThemeStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  
  const { data, isLoading } = useCourse(id || "");
  const { data: enrollmentData } = useCheckEnrollment(id || "", user?.id || "");
  const checkoutMutation = useCheckout();
  const verifyMutation = useVerifyPayment();

  const isEnrolled = enrollmentData?.isEnrolled;
  
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const isProcessing = checkoutMutation.isPending || verifyMutation.isPending;

  // Removed automatic tab switch to Content to keep landing page clean as requested

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      showWarningMessage("Please login to purchase this course");
      navigate("/login");
      return;
    }

    if (isEnrolled) {
      showSuccessMessage("You are already enrolled! Redirecting to course content...");
      navigate(`/course/${id}/learn`);
      return;
    }

    try {
      // 1. Initiate Checkout
      const checkoutData = await checkoutMutation.mutateAsync(id!);

      // 2. Open Razorpay Modal
      const options = {
        key: checkoutData.key_id,
        amount: checkoutData.amount,
        currency: checkoutData.currency,
        name: "Urban Classes",
        description: `Purchase for ${checkoutData.course_title}`,
        order_id: checkoutData.order_id,
        handler: async (response: any) => {
          // 3. Verify Payment on Backend
          try {
            await verifyMutation.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            // Success! Navigate to my courses
            navigate("/my-courses");
          } catch (err) {
            console.error("Verification failed", err);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Checkout failed", err);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#080b14]' : 'bg-slate-50'}`}>
        <div className="relative">
          <div className="w-20 h-20 border-2 border-blue-600/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-20 h-20 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const course = data?.course;

  if (!course) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center ${theme === 'dark' ? 'bg-[#080b14]' : 'bg-slate-50'}`}>
        <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mb-8">
           <X size={48} className="text-rose-500" />
        </div>
        <h2 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Course Not Found</h2>
        <p className="text-slate-500 mb-8 font-medium max-w-md">The course you're looking for doesn't exist or has been removed from our catalog.</p>
        <button 
          onClick={() => navigate('/courses')}
          className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-600/20 active:scale-95 transition-all"
        >
          Explore Full Catalog
        </button>
      </div>
    );
  }

  const quickStats = [
    { icon: Users, label: "Community", val: `${course._count?.enrollments || 0}+` },
    { icon: Clock, label: "Experience", val: `${course.durationMonths} Months` },
    { icon: PlayCircle, label: "Learning Hours", val: `${course.totalLessons * 15}+` },
    { icon: Award, label: "Proficiency", val: course.level.replace('_', ' ') }
  ];


  return (
    <div className={`pt-20 min-h-screen transition-all duration-700 overflow-x-hidden ${
      theme === 'dark' ? "bg-[#080b14]" : "bg-slate-50"
    }`}>
      {/* Decorative Blur Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[150px] transition-all duration-1000 ${
          theme === 'dark' ? "bg-blue-600/5" : "bg-blue-100/30"
        }`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] transition-all duration-1000 ${
          theme === 'dark' ? "bg-indigo-600/5" : "bg-indigo-100/20"
        }`} />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-16">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          
          {/* Left Column: Extensive Details */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <span className="bg-blue-600/10 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest border border-blue-600/20">
                  {course.subCategory?.name || "Professional"}
                </span>
                <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20">
                   <Star size={12} fill="#eab308" className="text-yellow-500" />
                   <span className="text-yellow-600 text-xs font-black">4.9 Rare Course</span>
                </div>
              </div>

              <h1 className={`text-4xl md:text-6xl xl:text-7xl font-black mb-10 leading-[1.05] tracking-tight transition-colors ${
                theme === 'dark' ? "text-white" : "text-slate-900"
              }`}>
                {course.title.split(' ').map((word: string, i: number) => (
                  <span key={i} className={i % 3 === 2 ? "text-blue-600" : ""}> {word} </span>
                ))}
              </h1>

              <p className={`text-lg md:text-xl mb-12 leading-relaxed max-w-3xl transition-colors font-medium ${
                theme === 'dark' ? "text-slate-400" : "text-slate-600"
              }`}>
                {course.shortDescription || course.description}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                 {quickStats.map((stat, i) => (
                   <div key={i} className={`p-6 rounded-3xl border transition-all ${
                     theme === 'dark' ? "bg-white/[0.03] border-white/5" : "bg-white border-slate-100 shadow-sm"
                   }`}>
                     <stat.icon className="text-blue-500 mb-4" size={20} />
                     <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{stat.val}</h4>
                     <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">{stat.label}</p>
                   </div>
                 ))}
              </div>

              {/* Main Content Tabs */}
              <div className="mb-20">
                <div className="flex gap-8 border-b border-white/10 mb-12 overflow-x-auto custom-scrollbar no-scrollbar">
                   {['Overview', 'Curriculum', 'Instructors', 'Reviews'].map((tab: string, i: number) => (
                     <button 
                        key={i} 
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-black uppercase tracking-widest transition-all shrink-0 relative ${
                          activeTab === tab ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                       {tab}
                       {activeTab === tab && (
                         <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                       )}
                     </button>
                   ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'Overview' && (
                      <div className={`p-10 rounded-[3rem] border backdrop-blur-3xl transition-all ${
                        theme === 'dark' ? "bg-white/[0.01] border-white/[0.05]" : "bg-white border-slate-200 shadow-xl shadow-blue-500/5"
                      }`}>
                        <h3 className={`text-2xl font-black mb-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{course.title}: Deep Dive</h3>
                        <div className="prose prose-lg prose-slate max-w-none mb-12">
                           <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                             {course.description || "In-depth professional training designed to take you from foundational understanding to advanced mastery. Our curriculum is structured to follow industry best practices, ensuring you're ready for real-world challenges."}
                           </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          {[
                            { icon: Zap, t: "Accelerated Learning", d: "Proprietary methodology to master topics 2x faster than traditional methods." },
                            { icon: ShieldCheck, t: "Industry Standards", d: "Curriculum designed with Fortune 500 engineering leaders." },
                            { icon: Users, t: "Collaborative Labs", d: "Work on real projects with a high-performance peer community." },
                            { icon: BarChart3, t: "Career Analytics", d: "Deep insights into your learning patterns and job readiness." }
                          ].map((feat: any, i: number) => (
                            <div key={i} className="flex gap-5 group">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${theme === 'dark' ? 'bg-white/5 group-hover:bg-blue-600/20' : 'bg-slate-50 group-hover:bg-blue-50'}`}>
                                <feat.icon size={22} className="text-blue-500" />
                              </div>
                              <div>
                                <h5 className={`font-black text-lg mb-2 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{feat.t}</h5>
                                <p className={`text-sm leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{feat.d}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'Curriculum' && (
                      <div className="space-y-4">
                        {(course.subjects || []).length > 0 ? (
                          course.subjects?.map((subject: any, i: number) => (
                            <div key={subject.id} className={`overflow-hidden rounded-[2.5rem] border transition-all ${
                              theme === 'dark' ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-100 shadow-sm"
                            }`}>
                              <button 
                                onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                                className="w-full p-8 flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-6">
                                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-black">
                                    {i + 1}
                                  </div>
                                  <div className="text-left">
                                    <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{subject.title}</h4>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">
                                      {subject.sections?.length || 0} Dynamic Modules
                                    </p>
                                  </div>
                                </div>
                                <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-500 ${expandedModule === i ? 'rotate-180 bg-blue-600 border-blue-600 text-white' : 'text-slate-500'}`}>
                                   <ChevronRight size={18} className="rotate-90" />
                                </div>
                              </button>
                              
                              <AnimatePresence>
                                {expandedModule === i && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-white/5 bg-black/20"
                                  >
                                    <div className="p-8 pt-0 grid md:grid-cols-2 gap-4">
                                      {subject.sections?.map((section: any) => (
                                        <div key={section.id} className={`flex items-center gap-4 p-5 rounded-2xl border group/sec transition-all ${
                                          theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-blue-500/30' : 'bg-slate-50 border-slate-200/50 hover:border-blue-500/30'
                                        }`}>
                                          <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center group-hover/sec:bg-blue-600 transition-all">
                                            <PlayCircle size={14} className="text-blue-600 group-hover/sec:text-white" />
                                          </div>
                                          <span className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{section.title}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))
                        ) : (
                          <div className={`p-20 text-center rounded-[3rem] border border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                            <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Detailed Curriculum Loading...</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'Instructors' && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {(course.instructors || []).map((inst: any, i: number) => (
                          <div key={i} className={`p-8 rounded-[2.5rem] border flex items-center gap-6 transition-all ${
                            theme === 'dark' ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]" : "bg-white border-slate-100 shadow-sm hover:shadow-md"
                          }`}>
                            <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-xl shrink-0">
                               <img 
                                 src={inst.instructor.avatar?.secure_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${inst.instructor.name}`} 
                                 alt={inst.instructor.name} 
                                 className="w-full h-full object-cover"
                               />
                            </div>
                            <div>
                               <h4 className={`text-xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{inst.instructor.name}</h4>
                               <p className="text-blue-500 text-xs font-black uppercase tracking-widest mb-3">Senior Instructor</p>
                               <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-blue-500/5 flex items-center justify-center cursor-pointer hover:bg-blue-500/20 transition-all">
                                     <Users size={14} className="text-blue-500" />
                                  </div>
                                  <div className="w-8 h-8 rounded-lg bg-indigo-500/5 flex items-center justify-center cursor-pointer hover:bg-indigo-500/20 transition-all">
                                     <Star size={14} className="text-indigo-500" />
                                  </div>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'Reviews' && (
                      <div className={`p-20 text-center rounded-[3rem] border border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                        <div className="flex justify-center mb-6">
                           {[1,2,3,4,5].map(s => <Star key={s} size={24} className="text-yellow-500/20" />)}
                        </div>
                        <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Real Student Feedback Coming Soon</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>


            </motion.div>
          </div>

          {/* Right Column: Checkout Experience */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 pb-20">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2, duration: 0.6 }}
               className={`rounded-[2.5rem] border overflow-hidden shadow-2xl transition-all ${
                theme === 'dark' ? "bg-[#111626] border-white/10" : "bg-white border-slate-200"
               }`}
             >
                <div className="relative aspect-video group cursor-pointer overflow-hidden m-4 rounded-3xl shadow-lg">
                  <img 
                    src={course.thumbnail?.secure_url || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 text-white">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all shadow-xl">
                       <Play fill="white" size={24} />
                    </div>
                    <span className="mt-4 text-xs font-black uppercase tracking-widest">Watch Trailer</span>
                  </div>
                </div>

                <div className="p-8">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="flex flex-col">
                        <span className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>₹{course.price}</span>
                        {course.discountPrice && (
                          <span className="text-slate-500 line-through text-base font-bold opacity-50">₹{course.discountPrice}</span>
                        )}
                      </div>
                      <div className="ml-auto px-4 py-2 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-xl border border-emerald-500/20 uppercase tracking-widest">
                        {course.discountPrice ? `${Math.round(((course.discountPrice - course.price) / course.discountPrice) * 100)}% Savings` : "Elite Enrollment"}
                      </div>
                   </div>

                   <div className="space-y-4 mb-10">
                      <button 
                        onClick={isEnrolled ? () => navigate(`/course/${id}/learn`) : handlePurchase}
                        disabled={isProcessing}
                        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-3 ${
                          isEnrolled 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 shadow-lg' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 shadow-lg'
                        }`}
                      >
                        {isProcessing ? (
                          <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : isEnrolled ? (
                          <>Access Learning Lab <ChevronRight size={18} /></>
                        ) : (
                          "Elite Enrollment"
                        )}
                      </button>
                      
                                         </div>

                   <div className="bg-slate-500/5 rounded-3xl p-6 border border-white/5">
                      <h5 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>What's Included</h5>
                      <div className="space-y-4">
                         {[
                           { icon: MapPin, t: "Offline Center Access" },
                           { icon: ShieldCheck, t: "Professional Certificate" },
                           { icon: Clock, t: "Lifetime Portal Access" },
                           { icon: Users, t: "Private Discord Channel" }
                         ].map((inc: any, i: number) => (
                           <div key={i} className="flex items-center gap-3">
                              <inc.icon size={16} className="text-blue-500 shrink-0" />
                              <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{inc.t}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="mt-6 space-y-4">
                      <button 
                        onClick={() => setIsBookingFormOpen(true)}
                        className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all active:scale-95 flex items-center justify-center gap-3 ${
                          theme === 'dark' ? "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                         <Calendar size={14} /> Book Offline Seat
                      </button>
                      
                      <button className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all active:scale-95 flex items-center justify-center gap-3 ${
                        theme === 'dark' ? "bg-white/5 border-white/5 text-slate-300 hover:opacity-80" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}>
                         <Download size={14} /> Download Brochure
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <AnimatePresence>
        {!isEnrolled && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="lg:hidden fixed bottom-8 left-6 right-6 z-50"
          >
             <button 
               onClick={handlePurchase}
               disabled={isProcessing}
               className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)] active:scale-95 transition-all flex items-center justify-center gap-4"
             >
               {isProcessing ? "Processing..." : `Enroll - ₹${course.price}`}
               <ChevronRight size={20} />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Offline Booking Form Modal */}
      <AnimatePresence>
        {isBookingFormOpen && (
          <OfflineBookingForm 
            courseId={id || ""} 
            onClose={() => setIsBookingFormOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetail;
