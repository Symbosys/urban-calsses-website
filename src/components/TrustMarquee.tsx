
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';

const brands = [
  "METRO CORP", "URBAN GRID", "PLANNING ASSOC.", "CITY LABS", "FUTURE SPACE",
  "METRO CORP", "URBAN GRID", "PLANNING ASSOC.", "CITY LABS", "FUTURE SPACE"
];

const TrustMarquee = () => {
  const { theme } = useThemeStore();

  return (
    <div className={`py-16 overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? "bg-black/40" : "bg-white"
    }`}>
      <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Trusted by Global Educational Partners</p>
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 items-center px-10"
        >
          {brands.map((brand, i) => (
            <span 
              key={i} 
              className={`text-2xl md:text-3xl font-black italic tracking-tighter opacity-30 transition-all cursor-default hover:opacity-100 hover:text-blue-600 ${
                theme === 'dark' ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustMarquee;
