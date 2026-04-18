import { X, LogOut, User, Mail, Phone, Calendar, ShieldCheck, BookOpen, Clock } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { useNavigate } from "react-router-dom";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSidebar = ({ isOpen, onClose }: ProfileSidebarProps) => {
  const { user, logout } = useAuthStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  if (!isOpen || !user) return null;

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity" 
        onClick={onClose}
        style={{ opacity: isOpen ? 1 : 0 }}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-[101] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme === 'dark' ? 'bg-[#0f172a] border-l border-white/10' : 'bg-white border-l border-slate-200'} overflow-y-auto`}
      >
        <div className="flex flex-col h-full relative">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-state-200/20 sticky top-0 backdrop-blur-md z-10" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <h2 className={`text-lg font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              My Profile
            </h2>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Profile Section */}
          <div className="p-6 relative">
            <div className={`p-6 rounded-3xl border mb-6 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-white/10' : 'bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-sm'}`}>
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
              
              <div className="flex flex-col items-center text-center gap-4 relative z-10">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur opacity-40"></div>
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-lg flex items-center justify-center bg-blue-600 text-3xl font-black text-white">
                    {user?.avatar?.url ? (
                      <img src={user.avatar.url} alt={user.name || "User"} className="w-full h-full object-cover" />
                    ) : (
                      user?.name?.charAt(0) || "U"
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.name || "Student"}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{user.email}</p>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider ${
                  user?.isVerified 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "bg-amber-500/10 text-amber-500"
                }`}>
                  {user?.isVerified && <ShieldCheck size={12} />}
                  {user?.isVerified ? "Verified User" : "Unverified"}
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-3 mb-8">
              <div className={`flex items-center gap-4 p-3 rounded-xl border ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-500">
                  <Phone size={18} />
                </div>
                <div className="flex-1">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Phone</p>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{user.phone || "Not provided"}</p>
                </div>
              </div>

              <div className={`flex items-center gap-4 p-3 rounded-xl border ${theme === 'dark' ? 'bg-[#1e293b]/30 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-500/10 text-indigo-500">
                  <Calendar size={18} />
                </div>
                <div className="flex-1">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Joined</p>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{joinDate}</p>
                </div>
              </div>
            </div>

            {/* Purchases Section */}
            <h3 className={`text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              <BookOpen size={16} className="text-blue-500" /> My Purchases
            </h3>
            
            <div className="space-y-4 mb-8">
              {/* Dummy data for purchases as requested since API doesn't provide it yet */}
              <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${theme === 'dark' ? 'bg-[#1e293b]/50 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Premium UI/UX Design Masterclass</h4>
                  <span className="text-[10px] font-bold px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full">Active</span>
                </div>
                <p className={`text-xs mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Subject: Design & Prototyping</p>
                <div className="flex items-center text-[10px] font-medium text-emerald-500 gap-1 uppercase tracking-widest">
                  <ShieldCheck size={12} /> Full Access
                </div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${theme === 'dark' ? 'bg-[#1e293b]/50 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Advanced Full-Stack Development</h4>
                  <span className="text-[10px] font-bold px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full">Active</span>
                </div>
                <p className={`text-xs mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Subject: Web Development</p>
                <div className="flex items-center text-[10px] font-medium text-emerald-500 gap-1 uppercase tracking-widest">
                  <ShieldCheck size={12} /> Full Access
                </div>
              </div>
            </div>

          </div>

          {/* Footer with Logout */}
          <div className="mt-auto p-6 border-t border-state-200/20" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest border border-rose-500/20`}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
