import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  User,
  LogIn,
  LogOut,
  Fingerprint,
} from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/Urban Classes Logo - 1 (1).png";

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
        <div
          className={`relative flex items-center justify-between h-16 md:h-20 px-4 md:px-10 rounded-2xl md:rounded-[2.5rem] transition-all duration-700 border shadow-2xl ${
            scrolled
              ? theme === "dark"
                ? "bg-[#0f172a]/80 backdrop-blur-2xl border-white/10 shadow-blue-900/40"
                : "bg-white/90 backdrop-blur-2xl border-slate-200/50 shadow-blue-500/10"
              : "bg-transparent border-transparent shadow-none"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-11 h-11  rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg transform group-hover:rotate-6 transition-transform overflow-hidden">
                <img
                  src={logo}
                  alt="UC Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span
                className={`text-2xl font-black tracking-tighter transition-colors ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                Urban<span className="text-blue-500">Classes</span>
              </span>
              {/* <span className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-500/60 leading-none">
                Elite Education
              </span> */}
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
                    : theme === "dark"
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown size={12} className="opacity-50" />
                )}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? "w-full" : ""}`}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            <button
              onClick={toggleTheme}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95 border ${
                theme === "dark"
                  ? "bg-white/5 text-yellow-400 border-white/10 hover:bg-white/10"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all ${
                  theme === "dark"
                    ? "border-white/10 hover:bg-white/5"
                    : "border-blue-600/20 hover:bg-blue-50"
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                  {isAuthenticated ? (
                    user?.name?.charAt(0) || "U"
                  ) : (
                    <User size={14} />
                  )}
                </div>
                <ChevronDown
                  size={14}
                  className={theme === "dark" ? "text-white" : "text-slate-900"}
                />
              </button>

              {showUserDropdown && (
                <div
                  className={`absolute right-0 mt-4 w-64 rounded-3xl border shadow-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-300 ${
                    theme === "dark"
                      ? "bg-[#0f172a] border-white/10"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="px-4 py-3 border-b border-white/5 mb-2">
                    <p
                      className={`text-xs font-black uppercase tracking-widest ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {isAuthenticated ? "Logged in as" : "Account actions"}
                    </p>
                    <p
                      className={`text-sm font-black truncate ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                    >
                      {isAuthenticated ? user?.name : "Guest User"}
                    </p>
                  </div>

                  {/* Profile Button */}
                  <Link
                    to="/profile"
                    onClick={() => setShowUserDropdown(false)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-widest mb-1 ${
                      theme === "dark"
                        ? "text-slate-300 hover:bg-white/5"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <User size={16} /> Profile
                  </Link>

                  {/* Login Button */}
                  <Link
                    to="/auth/login"
                    onClick={() => setShowUserDropdown(false)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-widest mb-1 ${
                      theme === "dark"
                        ? "text-blue-400 hover:bg-blue-500/10"
                        : "text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Fingerprint size={16} /> Login
                  </Link>

                  {/* Logout Button */}
                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all text-xs font-black uppercase tracking-widest"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  )}
                </div>
              )}
            </div>
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
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            {/* Direct Login/Profile on Mobile */}
            <div className="flex items-center gap-2 pr-2 border-r border-slate-500/20 mr-1">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-[10px] shadow-lg transition-all active:scale-95 ${
                    theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
                  }`}
                >
                  {user?.name?.charAt(0) || "U"}
                </Link>
              ) : (
                <Link
                  to="/auth/login"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 border ${
                    theme === "dark"
                      ? "bg-white/5 text-blue-400 border-white/10"
                      : "bg-blue-50 text-blue-600 border-blue-100"
                  }`}
                >
                  <Fingerprint size={18} />
                </Link>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => logout()}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 border ${
                    theme === "dark"
                      ? "bg-white/5 text-rose-500 border-white/10"
                      : "bg-rose-50 text-rose-500 border-rose-100"
                  }`}
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 border ${
                theme === "dark"
                  ? "bg-white/5 text-yellow-400 border-white/10"
                  : "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                theme === "dark"
                  ? "bg-white/5 text-slate-300"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Extreme Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`absolute right-0 top-0 h-full w-[80%] max-w-sm p-8 shadow-2xl flex flex-col ${
                theme === "dark"
                  ? "bg-[#0f172a] border-l border-white/10"
                  : "bg-white border-l border-slate-200"
              }`}
            >
              <div className="flex justify-between items-center mb-12">
                <span
                  className={`text-xl font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  Navigation
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    theme === "dark"
                      ? "bg-white/5 text-slate-300"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-3xl font-black uppercase tracking-tighter transition-all ${
                      location.pathname === link.path
                        ? "text-blue-500"
                        : theme === "dark"
                          ? "text-slate-200 hover:text-white"
                          : "text-slate-800 hover:text-blue-600"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5">
                <Link
                  to="/courses"
                  className="block w-full py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl text-center shadow-lg shadow-blue-600/30 active:scale-95"
                  onClick={() => setMenuOpen(false)}
                >
                  Explore Programs
                </Link>
                <p className="text-center mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                  Urban Classes © 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
