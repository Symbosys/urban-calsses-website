import { PlayCircle, Download, Clock, Zap, FileText, HelpCircle, Play, ArrowLeft, X } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourse } from "../../api/hooks/courses/course.hooks";
import { useCheckEnrollment } from "../../api/hooks/courses/purchase.hooks";
import { useAuthStore } from "../../store/authStore";
import type { Lesson } from "../../types/courses/course.types";

const CourseContent = () => {
  const { theme } = useThemeStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  
  const { data, isLoading } = useCourse(id || "");
  const { data: enrollmentData } = useCheckEnrollment(id || "", user?.id || "");

  const isEnrolled = enrollmentData?.isEnrolled;
  
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Flatten all lessons for easier navigation
  const allLessons = useMemo(() => {
    if (!data?.course?.subjects) return [];
    return data.course.subjects.flatMap((s: any) => 
      s.sections?.flatMap((sec: any) => sec.lessons || []) || []
    );
  }, [data]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    } else if (!isLoading && !isEnrolled) {
      navigate(`/course/${id}`);
    }
  }, [isAuthenticated, isEnrolled, isLoading, navigate, id]);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
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
        <p className="text-slate-500 mb-8 font-medium max-w-md">The course you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/courses')}
          className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-600/20 active:scale-95 transition-all"
        >
          Explore Full Catalog
        </button>
      </div>
    );
  }

  const videoId = selectedLesson ? getYouTubeId(selectedLesson.video?.secure_url || "") : null;

  return (
    <div className={`min-h-screen flex flex-col pt-20 ${theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
      {/* Navigation Bar for Learning Mode */}
      <div className={`px-8 py-4 border-b flex items-center justify-between ${theme === 'dark' ? 'bg-[#11111a] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
         <button 
           onClick={() => navigate(`/course/${id}`)}
           className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
         >
           <ArrowLeft size={16} /> Course Dashboard
         </button>
         <h2 className={`hidden md:block text-xs font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
           {course.title} • {selectedLesson?.title || "Welcome"}
         </h2>
         <div className="flex items-center gap-4">
            <span className="text-[10px] font-black py-1 px-3 bg-blue-600/10 text-blue-500 rounded-full border border-blue-600/20">Learning Mode</span>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative custom-scrollbar">
          {allLessons.length > 0 ? (
            <div className="max-w-6xl mx-auto p-4 md:p-10">
              {/* Video Player Container */}
              <div className={`aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 border transition-all ${theme === 'dark' ? 'bg-black border-white/5 shadow-blue-500/10' : 'bg-slate-200 border-slate-200 shadow-slate-200'}`}>
                {videoId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
                    title={selectedLesson?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center bg-black/40">
                    <PlayCircle size={64} className="mb-6 opacity-20" />
                    <p className="text-2xl font-black tracking-tight">Lesson Content Coming Soon</p>
                    <p className="text-xs uppercase tracking-widest opacity-50 font-black mt-3">We are finalizing high-quality assets for this module</p>
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="mb-12">
                 <h1 className={`text-4xl font-black mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                   {selectedLesson?.title}
                 </h1>
                 <div className="flex flex-wrap items-center gap-6 mb-8">
                   <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                      <Clock size={14} className="text-blue-500" /> {selectedLesson?.duration || 15} MINS
                   </div>
                   <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                      <Zap size={14} className="text-amber-500" /> Professional Track
                   </div>
                 </div>
                 <p className={`text-xl leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                   {selectedLesson?.description || "In this lesson, we break down the core architecture and practical implementation of the concepts discussed in this module. Follow along with the code-along sections for best results."}
                 </p>
              </div>

              {/* Resources Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                 <div className={`p-8 rounded-[3rem] border transition-all ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <h3 className={`text-lg font-black mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                       <FileText size={20} className="text-blue-500" /> Materials
                    </h3>
                    <div className="space-y-3">
                       {selectedLesson?.attachments && selectedLesson.attachments.length > 0 ? (
                         selectedLesson.attachments.map((file: any, i: number) => (
                           <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-white'}`}>
                              <div className="flex items-center gap-3 text-sm font-black">
                                 <Download size={16} className="text-slate-500" /> {file.name || 'Lecture_Notes.pdf'}
                              </div>
                           </div>
                         ))
                       ) : (
                         <div className="p-10 text-center border border-dashed border-white/5 rounded-3xl opacity-40">
                            <p className="text-[10px] font-black uppercase tracking-widest">No printable resources attached</p>
                         </div>
                       )}
                    </div>
                 </div>
                 <div className={`p-8 rounded-[3rem] border transition-all ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <h3 className={`text-lg font-black mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                       <HelpCircle size={20} className="text-indigo-500" /> Discussions
                    </h3>
                    <p className="text-xs font-bold text-slate-500 mb-8 leading-relaxed">Having trouble? Ask your doubts in the private Discord channel reserved for students of this course.</p>
                    <button className="w-full py-4 rounded-2xl bg-indigo-500/10 text-indigo-500 font-black text-[10px] uppercase tracking-widest border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all">Support Engine</button>
                 </div>
              </div>
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center p-10 text-center">
                <div className="w-32 h-32 bg-blue-600/10 rounded-full flex items-center justify-center mb-10 animate-pulse">
                   <PlayCircle size={64} className="text-blue-500 opacity-20" />
                </div>
                <h2 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Content Under Sync</h2>
                <p className="max-w-md text-slate-500 font-bold mb-10">We are currently syncing the professional learning assets for this course. You'll be notified via email once the modules are ready.</p>
                <button onClick={() => navigate(`/course/${id}`)} className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-600/20">Return to Course Details</button>
             </div>
          )}
        </div>

        {/* Sidebar Playlist */}
        {allLessons.length > 0 && (
          <div className={`w-80 lg:w-96 border-l flex flex-col transition-all duration-500 ${theme === 'dark' ? 'bg-[#0a0a0f] border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="p-8 border-b border-white/5 shrink-0">
              <h3 className={`font-black uppercase tracking-[0.2em] text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Course Syllabus</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
              <div className="space-y-8">
                {(course.subjects || []).map((subject: any) => (
                  <div key={subject.id}>
                    <h4 className={`text-[10px] font-black uppercase tracking-widest mb-4 px-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      <div className="w-1.5 h-4 bg-blue-600 rounded-full" /> {subject.title}
                    </h4>
                    <div className="space-y-2">
                      {subject.sections?.flatMap((sec: any) => sec.lessons || []).map((lesson: any) => {
                        const isActive = selectedLesson?.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson)}
                            className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all text-left group ${
                              isActive 
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                                : theme === 'dark' ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-50 text-slate-600 shadow-sm'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isActive ? 'bg-white/20' : theme === 'dark' ? 'bg-white/5 border border-white/5' : 'bg-white border border-slate-100 shadow-sm'
                            }`}>
                              {isActive ? <div className="w-2 h-2 bg-white rounded-full animate-pulse" /> : <Play size={12} className="opacity-40" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-black truncate">{lesson.title}</p>
                              <p className={`text-[9px] font-black uppercase tracking-wider mt-1 ${isActive ? 'text-white/60' : 'text-slate-500'}`}>
                                {lesson.type} • {lesson.duration || 15} MIN
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
