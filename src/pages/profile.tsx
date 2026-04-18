import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { useStudentDashboard } from "../api/hooks/user/dashboard.hooks";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  BookOpen,
  Settings,
  Award,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { Navigate } from "react-router-dom";

export default function ProfileDashboard() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme } = useThemeStore();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: dashboardData, isLoading } = useStudentDashboard();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "courses", label: "My Learning", icon: BookOpen },
    { id: "achievements", label: "Certifications", icon: Award },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-28 pb-16 transition-colors duration-300 ${theme === "dark" ? "bg-[#0B1120] text-slate-100" : "bg-slate-50 text-slate-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Account Profile</h1>
          <p
            className={`mt-2 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
          >
            Manage your personal settings, view your progress, and access your
            courses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Info Card */}
            <div
              className={`p-6 rounded-2xl border ${
                theme === "dark"
                  ? "bg-[#1e293b] border-slate-800"
                  : "bg-white border-slate-200"
              } shadow-sm`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
                      theme === "dark"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {user?.avatar?.url ? (
                      <img
                        src={user.avatar.url}
                        alt={user.name || "User"}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      user?.name?.charAt(0) || "U"
                    )}
                  </div>
                  {user?.isVerified && (
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1e293b]">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold">
                  {user?.name || "Student"}
                </h3>
                <p
                  className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                >
                  {user?.email}
                </p>

                <div className="mt-4 pt-4 border-t w-full border-slate-200 dark:border-slate-800 flex justify-between text-sm">
                  <span
                    className={`${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Status
                  </span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div
              className={`rounded-2xl border overflow-hidden ${
                theme === "dark"
                  ? "bg-[#1e293b] border-slate-800"
                  : "bg-white border-slate-200"
              } shadow-sm`}
            >
              <nav className="flex flex-col p-2 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? theme === "dark"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-blue-50 text-blue-700"
                          : theme === "dark"
                            ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          isActive
                            ? theme === "dark"
                              ? "text-blue-400"
                              : "text-blue-700"
                            : theme === "dark"
                              ? "text-slate-500"
                              : "text-slate-400"
                        }
                      />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
              <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 mt-2">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {activeTab === "overview" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div
                    className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1e293b] border-slate-800" : "bg-white border-slate-200"} shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow`}
                  >
                    <div
                      className={`p-3 rounded-xl ${theme === "dark" ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"}`}
                    >
                      <BookOpen size={22} />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                      >
                        Enrolled Courses
                      </p>
                      <p className="text-2xl font-bold mt-1">{dashboardData?.enrolledCoursesCount || 0}</p>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div
                    className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1e293b] border-slate-800" : "bg-white border-slate-200"} shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow`}
                  >
                    <div
                      className={`p-3 rounded-xl ${theme === "dark" ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}
                    >
                      <Clock size={22} />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                      >
                        Learning Hours
                      </p>
                      <p className="text-2xl font-bold mt-1">{dashboardData?.learningHours || 0}</p>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div
                    className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1e293b] border-slate-800" : "bg-white border-slate-200"} shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow`}
                  >
                    <div
                      className={`p-3 rounded-xl ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}
                    >
                      <Award size={22} />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                      >
                        Certificates
                      </p>
                      <p className="text-2xl font-bold mt-1">{dashboardData?.certificatesCount || 0}</p>
                    </div>
                  </div>
                </div>

                {/* Profile Information */}
                <div
                  className={`rounded-2xl border ${theme === "dark" ? "bg-[#1e293b] border-slate-800" : "bg-white border-slate-200"} shadow-sm overflow-hidden`}
                >
                  <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-semibold">
                      Personal Information
                    </h3>
                    <p
                      className={`text-sm mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                    >
                      Basic info, like your name and contact details.
                    </p>
                  </div>
                  <div className="divide-y divide-slate-200 dark:divide-slate-800 px-6">
                    <div className="py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-6 px-6 transition-colors">
                      <div
                        className={`text-sm font-medium w-1/3 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                      >
                        Full name
                      </div>
                      <div className="text-sm w-2/3">
                        {user?.name || "Not provided"}
                      </div>
                    </div>
                    <div className="py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-6 px-6 transition-colors">
                      <div
                        className={`text-sm font-medium w-1/3 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                      >
                        Email address
                      </div>
                      <div className="text-sm w-2/3">{user?.email}</div>
                    </div>
                    <div className="py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-6 px-6 transition-colors">
                      <div
                        className={`text-sm font-medium w-1/3 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                      >
                        Phone number
                      </div>
                      <div className="text-sm w-2/3">
                        {user?.phone || "Not provided"}
                      </div>
                    </div>
                    <div className="py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-6 px-6 transition-colors">
                      <div
                        className={`text-sm font-medium w-1/3 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                      >
                        Joined Date
                      </div>
                      <div className="text-sm w-2/3">{joinDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">My Learning</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dashboardData?.courses?.length === 0 && (
                     <div className="col-span-full py-12 text-center text-slate-500">
                       You have not enrolled in any courses yet.
                     </div>
                  )}
                  {dashboardData?.courses.map((course: any, idx: number) => {
                    const gradientClass = idx % 2 === 0 
                      ? "from-blue-600 to-blue-800" 
                      : "from-indigo-700 to-purple-800";
                    const progressColor = idx % 2 === 0 ? "bg-blue-600" : "bg-indigo-600";
                    const progressTextColor = idx % 2 === 0 ? "text-blue-600 dark:text-blue-400" : "text-indigo-600 dark:text-indigo-400";
                    
                    return (
                      <div
                        key={course.id}
                        className={`flex flex-col rounded-2xl border ${theme === "dark" ? "bg-[#1e293b] border-slate-800" : "bg-white border-slate-200"} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}
                      >
                        <div className={`h-32 bg-gradient-to-r ${gradientClass} relative p-6 flex flex-col justify-end`}>
                          <h3 className="text-lg font-bold text-white leading-tight mb-1 truncate">
                            {course.title}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {course.level || "Beginner"}
                          </p>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between text-sm mb-2">
                            <span
                              className={`${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                            >
                              Overall Progress
                            </span>
                            <span className={`font-semibold ${progressTextColor}`}>
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-6 relative overflow-hidden">
                            <div
                              className={`${progressColor} h-full rounded-full transition-all duration-1000`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>

                          <button className="mt-auto w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Certifications & Badges</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Achievement Card 1 */}
                  <div className={`flex items-start gap-4 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center border-4 border-amber-200 dark:border-amber-500/30">
                      <Award size={28} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold">Frontend Developer</h3>
                      <p className={`text-sm mt-1 mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Completed HTML, CSS, and basic JS.</p>
                      <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                        Earned Oct 12, 2025
                      </span>
                    </div>
                  </div>

                  {/* Achievement Card 2 */}
                  <div className={`flex items-start gap-4 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'} shadow-sm opacity-60 grayscale`}>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-slate-200 dark:border-slate-700">
                      <Award size={28} className="text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold">Full-Stack Master</h3>
                      <p className={`text-sm mt-1 mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Requires active enrollment completion.</p>
                      <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                        Locked
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Account Settings</h2>
                </div>

                <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'} shadow-sm overflow-hidden`}>
                  <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-semibold">Profile Details</h3>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Update your user profile information.</p>
                  </div>
                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</label>
                        <input 
                          type="text" 
                          defaultValue={user?.name || ""}
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm ${theme === 'dark' ? 'bg-[#0f172a] border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'} outline-none transition-all`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Phone Number</label>
                        <input 
                          type="text" 
                          defaultValue={user?.phone || ""}
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm ${theme === 'dark' ? 'bg-[#0f172a] border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'} outline-none transition-all`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email || ""}
                        disabled
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm cursor-not-allowed ${theme === 'dark' ? 'bg-[#0f172a]/50 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500'} outline-none`}
                      />
                      <p className={`text-xs mt-1.5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>To change your email address, please contact support.</p>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`rounded-2xl border ${theme === 'dark' ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'} shadow-sm overflow-hidden`}>
                  <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-rose-600 dark:text-rose-500">Danger Zone</h3>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Permanently remove your account and data.</p>
                    </div>
                    <button className="px-5 py-2 whitespace-nowrap border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 text-sm font-medium rounded-lg hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors">
                      Deactivate
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
