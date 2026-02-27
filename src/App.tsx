
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import CoursesPage from "./pages/courses";
// import BatchesPage from "./pages/batch";
import CourseDetail from "./pages/course/course";
import Classroom from "./pages/classroom";
import BlogPage from "./pages/blogs";
import BlogDetail from "./pages/blog-detail";
import ResultsPage from "./pages/results";
import OfflineCentersPage from "./pages/offline";
import LoginPage from "./pages/auth/login.auth";
import OTPPage from "./pages/auth/otp.auth";
import GuestRoute from "./components/GuestRoute";
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
      <Toaster position="bottom-right" expand={true} richColors  />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        {/* <Route path="/batches" element={<BatchesPage />} /> */}
        <Route path="/course/:id" element={<CourseDetail />} />  
        <Route path="/course" element={<CourseDetail />} />
        <Route path="/live-class" element={<Classroom />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/offline" element={<OfflineCentersPage />} />
        <Route path="/auth/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/auth/otp" element={<GuestRoute><OTPPage /></GuestRoute>} />
        <Route path="*" element={<Home />} /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
