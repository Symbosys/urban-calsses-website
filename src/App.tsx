
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import CoursesPage from "./pages/courses";
import BatchesPage from "./pages/batch";
import CourseDetail from "./pages/course/course";
import Classroom from "./pages/classroom";
import StudyMaterial from "./pages/studyMaterial";
import { useThemeStore } from "./store/themeStore";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0f172a] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/batches" element={<BatchesPage />} />
        <Route path="/course/:id" element={<CourseDetail />} />  
        <Route path="/course" element={<CourseDetail />} />
        <Route path="/live-class" element={<Classroom />} />
        <Route path="/study-material" element={<StudyMaterial />} />
        <Route path="*" element={<Home />} /> 
      </Routes>
    </div>
  );
}

export default App;
