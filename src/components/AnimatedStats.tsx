
import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";

const stats = [
  { label: "Students Enrolled", value: "120k+" },
  { label: "Expert Faculty", value: "450+" },
  { label: "Daily Live Hours", value: "350+" },
  { label: "Success Ratio", value: "94%" },
];

const AnimatedStats = () => {
  const { theme } = useThemeStore();

  return (
    <section className={`py-20 transition-colors duration-300 ${
      theme === 'dark' ? "bg-slate-900/50" : "bg-white"
    }`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <h3 className={`text-4xl md:text-5xl font-bold mb-2 transition-colors ${
                theme === 'dark' ? "text-white" : "text-blue-600"
              }`}>{stat.value}</h3>
              <p className={`font-medium text-sm md:text-base uppercase tracking-wider transition-colors ${
                theme === 'dark' ? "text-slate-400" : "text-slate-600"
              }`}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
