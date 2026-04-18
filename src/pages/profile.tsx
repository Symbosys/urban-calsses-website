import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { User, Mail, Phone, Calendar, ShieldCheck } from "lucide-react";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";

  return (
    <div className={`min-h-screen pt-32 pb-12 px-6 transition-colors duration-300 ${theme === "dark" ? "bg-[#0f172a] text-white" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">My <span className="text-blue-500">Profile</span></h1>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>
            Manage your personal information and account details
          </p>
        </div>

        <div className={`rounded-[2.5rem] p-8 md:p-12 border shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-700 delay-100 ${
          theme === 'dark' 
            ? 'bg-[#1e293b]/50 border-white/10 shadow-blue-900/20' 
            : 'bg-white border-slate-200 shadow-blue-500/10'
        }`}>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row gap-12 items-center md:items-start">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-5xl font-black text-white">
                  {user?.avatar?.url ? (
                    <img src={user.avatar.url} alt={user.name || "User"} className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0) || "U"
                  )}
                </div>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                user?.isVerified 
                  ? "bg-emerald-500/10 text-emerald-500" 
                  : "bg-amber-500/10 text-amber-500"
              }`}>
                {user?.isVerified && <ShieldCheck size={14} />}
                {user?.isVerified ? "Verified Account" : "Unverified"}
              </div>
            </div>

            {/* Details Section */}
            <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-[#0f172a]/50 border-white/5 hover:bg-[#0f172a]' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <User size={18} className="text-blue-500" />
                    <span className={`text-xs font-bold uppercase tracking-wider flex-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Full Name</span>
                  </div>
                  <p className="text-lg font-bold">{user?.name || "Not provided"}</p>
                </div>

                <div className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-[#0f172a]/50 border-white/5 hover:bg-[#0f172a]' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={18} className="text-rose-500" />
                    <span className={`text-xs font-bold uppercase tracking-wider flex-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</span>
                  </div>
                  <p className="text-lg font-bold truncate" title={user?.email}>{user?.email}</p>
                </div>

                <div className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-[#0f172a]/50 border-white/5 hover:bg-[#0f172a]' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={18} className="text-emerald-500" />
                    <span className={`text-xs font-bold uppercase tracking-wider flex-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Phone Number</span>
                  </div>
                  <p className="text-lg font-bold">{user?.phone || "Not provided"}</p>
                </div>

                <div className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-[#0f172a]/50 border-white/5 hover:bg-[#0f172a]' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar size={18} className="text-indigo-500" />
                    <span className={`text-xs font-bold uppercase tracking-wider flex-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Joined On</span>
                  </div>
                  <p className="text-lg font-bold">{joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
