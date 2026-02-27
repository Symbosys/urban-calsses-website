import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, Lock, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useSendOtp } from '../../api/hooks/user/auth.hooks';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const { mutate: sendOtp, isPending } = useSendOtp();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;
    
    sendOtp(userEmail, {
      onSuccess: () => {
        navigate('/auth/otp', { state: { email: userEmail } });
      }
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 pt-44 pb-24 relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#0f172a]' : 'bg-slate-50'
    }`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${
          theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400'
        }`} /> 
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${
          theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-400'
        }`} />
      </div>

      <div className="max-w-[1200px] w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-600/20 rotate-3">
                UC
              </div>
              <h2 className={`text-3xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Urban<span className="text-blue-500">Classes</span>
              </h2>
            </div>

            <h1 className={`text-6xl font-black tracking-tighter leading-none mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                Potential.
              </span>
            </h1>

            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: "Secure Access", desc: "Enterprise-grade security for your data." },
                { icon: Zap, title: "Instant Learning", desc: "Start where you left off in seconds." },
                { icon: CheckCircle2, title: "Verified Educators", desc: "Access content from world-class teachers." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-start gap-4"
                >
                  <div className={`p-3 rounded-xl ${
                    theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-100'
                  } border`}>
                    <item.icon className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`relative p-8 lg:p-12 rounded-[2.5rem] border ${
            theme === 'dark' 
              ? 'bg-white/5 border-white/10 backdrop-blur-xl' 
              : 'bg-white border-slate-200 shadow-2xl shadow-blue-500/10'
          }`}
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className={`text-4xl font-black tracking-tight mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Welcome Back
            </h2>
            <p className="text-slate-500 font-medium">
              Enter your email to receive a secure login OTP.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className={`block text-[10px] font-black uppercase tracking-widest ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Email Address
              </label>
              <div className="relative group">
                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${
                  theme === 'dark' ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-600'
                }`} size={20} />
                <input 
                  type="email" 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full py-5 pl-14 pr-6 rounded-2xl border-2 outline-none transition-all text-sm font-bold ${
                    theme === 'dark' 
                      ? 'bg-[#1e293b]/50 border-white/5 text-white focus:border-blue-500/50 focus:bg-[#1e293b]' 
                      : 'bg-slate-50 border-transparent text-slate-900 focus:bg-white focus:border-blue-600/20'
                  }`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="relative w-full group overflow-hidden py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isPending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Continue with Email <ArrowRight size={16} /></>
                )}
              </span>
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-500/10 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Don't have an account?{' '}
              <Link to="/courses" className="text-blue-500 font-bold hover:underline">
                Explore Courses
              </Link>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-1.5 grayscale">
                <Lock size={14} className={theme === 'dark' ? 'text-white' : 'text-slate-900'} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>SSL Encrypted</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
