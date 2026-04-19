
import { motion } from 'framer-motion';
import { Zap, BookOpen, Headset, Trophy, Globe, Lock } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const features = [
  {
    title: "Expert Top Faculty",
    desc: "Highly qualified educators with years of experience in mentoring exam toppers.",
    icon: Zap,
    color: "text-blue-500 bg-blue-500/10"
  },
  {
    title: "Interactive Sessions",
    desc: "Real-time engagement and instant doubt clearing to ensure conceptual mastery.",
    icon: Globe,
    color: "text-emerald-500 bg-emerald-500/10"
  },
  {
    title: "Curated Material",
    desc: "Structured study notes and practice modules designed by academic experts.",
    icon: BookOpen,
    color: "text-indigo-500 bg-indigo-500/10"
  },
  {
    title: "Dedicated Support",
    desc: "Personalized mentorship and 24/7 academic guidance to keep you on track.",
    icon: Headset,
    color: "text-rose-500 bg-rose-500/10"
  },
  {
    title: "Rigorous Testing",
    desc: "Periodic mock tests and detailed analytics to measure your progress.",
    icon: Trophy,
    color: "text-amber-500 bg-amber-500/10"
  },
  {
    title: "Learning Archive",
    desc: "Secure access to recorded lectures for unlimited revision anytime, anywhere.",
    icon: Lock,
    color: "text-slate-400 bg-slate-400/10"
  }
];

const WhyChooseUs = () => {
  const { theme } = useThemeStore();

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 ${
      theme === 'dark' ? "bg-slate-900/50" : "bg-slate-50 border-y border-slate-200"
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="text-blue-500 font-semibold tracking-wider text-[10px] md:text-sm uppercase mb-3">Excellence in Learning</h2>
          <h3 className={`text-3xl md:text-4xl font-bold mb-4 md:mb-6 transition-colors ${
            theme === 'dark' ? "text-white" : "text-slate-900"
          }`}>Why Choose Urban Classes?</h3>
          <p className={`text-base md:text-lg font-medium leading-relaxed transition-colors ${
            theme === 'dark' ? "text-slate-400" : "text-slate-600"
          }`}>
            We offer a comprehensive educational ecosystem built on the principles of 
            structured learning, advanced technology, and dedicated mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 md:p-8 border transition-all shadow-sm rounded-2xl md:rounded-3xl ${
                theme === 'dark' 
                  ? "bg-slate-800/40 border-slate-700/50 hover:border-slate-600" 
                  : "bg-white border-slate-200/60 hover:border-blue-200"
              }`}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 ${feature.color} rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6`}>
                <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h4 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 transition-colors ${
                theme === 'dark' ? "text-white" : "text-slate-900"
              }`}>{feature.title}</h4>
              <p className={`text-sm md:text-base leading-relaxed font-medium transition-colors ${
                theme === 'dark' ? "text-slate-400" : "text-slate-600"
              }`}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
