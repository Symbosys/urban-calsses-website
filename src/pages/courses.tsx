import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Zap,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { Link } from "react-router-dom";

import { useCourses } from "../api/hooks/courses/course.hooks";
import { useCategories } from "../api/hooks/courses/category.hooks";

const CoursesPage = () => {
  const { theme } = useThemeStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categoryData } = useCategories();
  const { data: coursesData, isLoading: coursesLoading } = useCourses({
    categoryId: selectedCategoryId === "all" ? undefined : selectedCategoryId,
    search: searchQuery || undefined,
  });

  const categories = [
    {
      id: "all",
      name: "All Batches",
      icon: Sparkles,
      color: "from-blue-500 to-indigo-600",
    },
    ...(categoryData?.categories || []).map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon || GraduationCap,
      color: "from-blue-500 to-indigo-600",
    })),
  ];

  const courses = coursesData?.courses || [];

  return (
    <div
      className={`pt-24 sm:pt-32 md:pt-36 min-h-screen transition-colors duration-500 overflow-x-clip relative ${
        theme === "dark" ? "bg-[#0b0f1a]" : "bg-slate-50"
      }`}
    >
      {/* Dynamic Background Elements - Optimized for Total Stability */}
      {/* Note: The horizontal slide glitch was caused by absolute elements using negative percentages (e.g., -20%) 
          which extend beyond the viewport. Using centered orbs with translate-x-1/2 and overflow-x-clip 
          is the standard professional fix to ensure the document width remains locked to the viewport. */}
      <div className="absolute top-0 left-0 w-full h-[500px] sm:h-[800px] pointer-events-none opacity-40 md:opacity-50 overflow-hidden select-none">
        <div
          className={`absolute top-[-5%] left-0 -translate-x-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] rounded-full blur-[80px] md:blur-[150px] transition-colors duration-1000 ${
            theme === "dark" ? "bg-blue-600/10" : "bg-blue-200/30"
          }`}
        />
        <div
          className={`absolute top-[5%] right-0 translate-x-1/2 w-[250px] sm:w-[600px] h-[250px] sm:h-[600px] rounded-full blur-[80px] md:blur-[150px] transition-colors duration-1000 ${
            theme === "dark" ? "bg-indigo-600/10" : "bg-indigo-200/30"
          }`}
        />
      </div>

      {/* Hero & Search Section */}
      <section className="relative py-12 sm:py-20 md:py-24 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-8 sm:mb-16"
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 sm:mb-8 backdrop-blur-md border ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 text-blue-400"
                  : "bg-blue-50 border-blue-100 text-blue-600"
              }`}
            >
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest">
                Premium Learning Experience
              </span>
            </div>
            <h1
              className={`text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tight leading-[1.1] transition-colors ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Find Your Path to <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                Greatness
              </span>
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed transition-colors px-2 ${
                theme === "dark" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Choose from our curated collection of elite batches designed by
              India's top educators to help you ace your dreams.
            </p>
          </motion.div>

          {/* Search Box - Responsive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto relative mb-12 sm:mb-20"
          >
            <div
              className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl md:rounded-3xl blur opacity-10 sm:opacity-20 transition duration-1000 group-focus-within:opacity-40`}
            ></div>
            <div className="relative group">
              <Search
                className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for JEE, NEET, or Specific Batch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-4 sm:py-6 pl-12 sm:pl-16 pr-4 sm:pr-6 rounded-xl sm:rounded-2xl border outline-none transition-all text-sm sm:text-xl shadow-xl md:shadow-2xl ${
                  theme === "dark"
                    ? "bg-[#161b2c]/80 backdrop-blur-xl border-slate-700/50 text-white focus:border-blue-500/50"
                    : "bg-white border-slate-200 text-slate-900 focus:border-blue-500 shadow-blue-500/5"
                }`}
              />
            </div>
          </motion.div>

          {/* Categories Selector - Refined for Anti-Glitch Scrolling */}
          <div className="relative">
            <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-3 sm:gap-4 pb-6 scrollbar-hide">
              {categories.map((cat, i) => {
                const Icon =
                  typeof cat.icon === "function" ? cat.icon : GraduationCap;
                const iconObj = cat.icon as any;
                const hasImageUrl =
                  iconObj && typeof iconObj === "object" && iconObj.secure_url;

                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`relative flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-tight transition-all active:scale-95 group overflow-hidden shrink-0 ${
                      selectedCategoryId === cat.id
                        ? "text-white shadow-lg sm:shadow-2xl"
                        : theme === "dark"
                          ? "bg-[#161b2c]/60 text-slate-400 hover:text-white border border-slate-800"
                          : "bg-white text-slate-600 hover:text-blue-600 border border-slate-200 shadow-sm"
                    }`}
                  >
                    {selectedCategoryId === cat.id && (
                      <motion.div
                        layoutId="category-bg"
                        className={`absolute inset-0 bg-gradient-to-br ${cat.color}`}
                      />
                    )}
                    {hasImageUrl ? (
                      <img
                        src={iconObj.secure_url}
                        alt=""
                        className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 object-contain"
                        loading="lazy"
                    />
                    ) : (
                      <Icon size={14} className="relative z-10 sm:size-[18px]" />
                    )}
                    <span className="relative z-10">{cat.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="relative pb-24 sm:pb-32">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatePresence mode="popLayout">
            {coursesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={`aspect-[4/5] rounded-[1.5rem] sm:rounded-[2.5rem] animate-pulse ${theme === "dark" ? "bg-white/5" : "bg-slate-200"}`}
                  />
                ))}
              </div>
            ) : courses.length > 0 ? (
              <motion.div
                layout={false}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"
              >
                {courses.map((course: any) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={`/course/${course.id}`}
                      className="block h-full group"
                    >
                      <div
                        className={`relative h-full border transition-all duration-500 rounded-[1.8rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col ${
                          theme === "dark"
                            ? "bg-[#161b2c]/40 border-slate-800/50 hover:border-blue-500/40 hover:bg-[#1c233a] shadow-2xl shadow-blue-900/10"
                            : "bg-white border-slate-200 hover:border-blue-500/30 shadow-xl hover:shadow-2xl shadow-blue-500/5"
                        }`}
                      >
                        {/* Course Image Area */}
                        <div className="relative aspect-[16/11] overflow-hidden m-3 sm:m-4 rounded-[1.4rem] sm:rounded-[2rem]">
                          <img
                            src={
                              course.thumbnail?.secure_url ||
                              "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
                            }
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                            loading="lazy"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500`}
                          />

                          {/* Badge */}
                          <div className="absolute top-4 sm:top-5 left-4 sm:left-5">
                            <div className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-[9px] sm:text-[10px] font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase tracking-[0.1em] sm:tracking-[0.15em] flex items-center gap-1.5 sm:gap-2">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-500 animate-pulse" />
                              {course.level?.replace("_", " ") || "Featured"}
                            </div>
                          </div>

                          {/* Hover Overlay - Only shows on hover on large screens, or simplified on mobile */}
                          <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="bg-white text-black px-6 py-3 rounded-full font-black text-sm uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                              View Batch <ArrowRight size={16} />
                            </div>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="px-5 sm:px-8 pb-6 sm:pb-8 flex-1 flex flex-col">
                          <div className="flex justify-between items-center mb-4 sm:mb-5">
                            <span className="px-2.5 py-1 bg-blue-600/10 text-blue-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.05em] sm:tracking-[0.1em] rounded-lg border border-blue-500/20">
                              {course.subCategory?.name || "Premium Batch"}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <Star
                                size={12}
                                className="text-yellow-500"
                                fill="currentColor"
                                strokeWidth={0}
                              />
                              <span
                                className={`text-[11px] sm:text-xs font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                              >
                                {course._count?.reviews
                                  ? (
                                      4.5 +
                                      (course.title.length % 5) / 10
                                    ).toFixed(1)
                                  : "4.8"}
                              </span>
                              <span className="text-slate-500 text-[9px] sm:text-[10px] font-bold">
                                ({course._count?.enrollments || "12k+"})
                              </span>
                            </div>
                          </div>

                          <h3
                            className={`text-lg sm:text-2xl font-black mb-4 sm:mb-6 leading-tight transition-colors group-hover:text-blue-500 ${
                              theme === "dark" ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {course.title}
                          </h3>

                          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                            {(
                              course.tags?.slice(0, 3) || [
                                "Elite Faculty",
                                "Study Material",
                                "Test Series",
                              ]
                            ).map((f: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2.5 sm:gap-3"
                              >
                                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500/10">
                                  <CheckCircle2
                                    size={10}
                                    className="text-blue-500 sm:size-[12px]"
                                  />
                                </div>
                                <span
                                  className={`text-xs sm:text-sm font-semibold transition-colors ${
                                    theme === "dark"
                                      ? "text-slate-400"
                                      : "text-slate-600"
                                  }`}
                                >
                                  {typeof f === "string" ? f : f.name}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Price & Action */}
                          <div
                            className={`mt-auto pt-6 sm:pt-8 border-t flex items-center justify-between ${
                              theme === "dark"
                                ? "border-slate-800"
                                : "border-slate-100"
                            }`}
                          >
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <span
                                  className={`text-xl sm:text-3xl font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                                >
                                  ₹{course.price}
                                </span>
                                {course.discountPrice && (
                                  <span className="bg-emerald-500/10 text-emerald-500 text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded uppercase leading-none">
                                    Save{" "}
                                    {Math.round(
                                      ((course.discountPrice - course.price) /
                                        course.discountPrice) *
                                        100,
                                    )}
                                    %
                                  </span>
                                )}
                              </div>
                              {course.discountPrice && (
                                <span className="text-slate-500 line-through text-[11px] sm:text-sm font-bold opacity-50">
                                  ₹{course.discountPrice}
                                </span>
                              )}
                            </div>

                            <button className="relative overflow-hidden group/btn px-6 sm:px-8 py-2.5 sm:py-3.5 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm uppercase tracking-wider transition-all shadow-lg sm:shadow-xl shadow-blue-600/25 active:scale-95">
                              <span className="relative z-10">Join</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 sm:py-32"
              >
                <div className="relative inline-block mb-8 sm:mb-10">
                  <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-xl animate-pulse"></div>
                  <div
                    className={`relative w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-inner ${
                      theme === "dark"
                        ? "bg-slate-800 text-slate-500"
                        : "bg-white text-slate-400"
                    }`}
                  >
                    <Search size={30} className="sm:size-[40px]" />
                  </div>
                </div>
                <h3
                  className={`text-2xl sm:text-3xl font-black mb-3 sm:mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  No Matches Found
                </h3>
                <p className="text-slate-500 font-bold max-w-xs sm:max-w-sm mx-auto text-sm sm:text-base">
                  We couldn't find any batches matching your criteria. Try
                  widening your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategoryId("all");
                    setSearchQuery("");
                  }}
                  className="mt-8 sm:mt-10 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-blue-500 font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all text-xs sm:text-sm"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Section - Responsive Grid */}
      <section
        className={`py-16 sm:py-24 md:py-32 border-t ${
          theme === "dark"
            ? "bg-[#080b14] border-slate-800"
            : "bg-white border-slate-100"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
            {[
              {
                icon: Zap,
                label: "Live Interactive Classes",
                value: "Daily 8+ hrs",
              },
              {
                icon: ShieldCheck,
                label: "Expert Doubt Resolution",
                value: "24/7 Engine",
              },
              { icon: Trophy, label: "Top Rankers Produced", value: "10,000+" },
              {
                icon: Sparkles,
                label: "Structured Study Plans",
                value: "100% Success",
              },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-600/5 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <item.icon
                    size={20}
                    className="text-blue-500 group-hover:text-white transition-colors sm:size-[28px]"
                  />
                </div>
                <h4
                  className={`text-sm sm:text-lg font-black mb-1 sm:mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {item.value}
                </h4>
                <p className="text-slate-500 text-[8px] sm:text-xs font-bold uppercase tracking-widest leading-tight">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
