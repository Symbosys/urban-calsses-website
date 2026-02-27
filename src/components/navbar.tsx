
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown, LogOut } from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Blogs", path: "/blogs" },
    { name: "Courses", path: "/courses", dropdown: true },
    // { name: "Batches", path: "/batches" },
    { name: "Results", path: "/results" },
    { name: "Offline Centres", path: "/offline" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-6">
        <div className={`relative flex items-center justify-between h-20 px-10 rounded-[2.5rem] transition-all duration-700 border shadow-2xl ${
          scrolled 
            ? theme === 'dark' 
              ? "bg-[#0f172a]/80 backdrop-blur-2xl border-white/10 shadow-blue-900/40" 
              : "bg-white/90 backdrop-blur-2xl border-slate-200/50 shadow-blue-500/10"
            : "bg-transparent border-transparent shadow-none"
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group shrink-0">
            <div className="relative">
               <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
               <div className="relative w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg transform group-hover:rotate-6 transition-transform">
                 UC
               </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className={`text-2xl font-black tracking-tighter transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Urban<span className="text-blue-500">Classes</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-500/60 leading-none">Elite Education</span>
            </div>
          </Link>

          {/* Premium Search Integration */}
          <div className="hidden xl:flex flex-1 max-w-sm mx-12">
            <div className="relative w-full group">
               <div className="absolute inset-0 bg-blue-600/5 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
              
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 shrink-0">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`relative text-[10px] font-black uppercase tracking-[0.2em] transition-all group flex items-center gap-1.5 ${
                  location.pathname === link.path 
                    ? "text-blue-500" 
                    : theme === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={12} className="opacity-50" />}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            <button
              onClick={toggleTheme}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95 border ${
                theme === 'dark' 
                  ? "bg-white/5 text-yellow-400 border-white/10 hover:bg-white/10" 
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all ${
                    theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-blue-600/20 hover:bg-blue-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <ChevronDown size={14} className={theme === 'dark' ? 'text-white' : 'text-slate-900'} />
                </button>

                {showUserDropdown && (
                  <div className={`absolute right-0 mt-4 w-64 rounded-3xl border shadow-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-300 ${
                    theme === 'dark' ? 'bg-[#0f172a] border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                      <p className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Logged in as</p>
                      <p className={`text-sm font-black truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user?.name}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all text-xs font-black uppercase tracking-widest"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth/login" className={`px-6 py-3.5 border-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}>
                 Login
              </Link>
            )}
            <Link
              to="/courses"
              // className="relative group overflow-hidden px-8 py-3.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-2xl transition-all shadow-xl shadow-blue-600/30 active:scale-95"
            >
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2 text-white"> */}
                {/* Enroll Now <ArrowRight size={14} /> */}
              {/* </span> */}
            </Link>
          </div>

          {/* Mobile UI */}
          <div className="lg:hidden flex items-center gap-3">
             <button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 border ${
                  theme === 'dark' 
                    ? "bg-white/5 text-yellow-400 border-white/10" 
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                theme === 'dark' ? "bg-white/5 text-slate-300" : "bg-slate-100 text-slate-600"
              }`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Extreme Premium Mobile Menu */}
      {menuOpen && (
        <div className={`lg:hidden fixed inset-0 z-[90] p-6 pt-32 animate-in fade-in slide-in-from-top-10 duration-500 overflow-y-auto ${
          theme === 'dark' ? "bg-[#0b0f1a]" : "bg-slate-50"
        }`}>
          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <Link 
                key={link.name}
                to={link.path} 
                style={{ animationDelay: `${i * 100}ms` }}
                className={`text-4xl font-black uppercase tracking-tighter transition-all animate-in slide-in-from-left-4 ${
                  location.pathname === link.path 
                    ? "text-blue-500" 
                    : theme === 'dark' ? "text-slate-200" : "text-slate-800"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-slate-800 my-4" />
            <Link 
              to="/courses" 
              className="py-6 bg-blue-600 text-white font-black uppercase tracking-widest rounded-3xl text-center shadow-2xl shadow-blue-600/30"
              onClick={() => setMenuOpen(false)}
            >
              Book Free Counselling
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
