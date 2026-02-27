import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowRight, RefreshCcw, ShieldCheck, Mail } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useVerifyOtp, useSendOtp } from '../../api/hooks/user/auth.hooks';
import { useAuthStore } from '../../store/authStore';

const OTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const { theme } = useThemeStore();
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'user@example.com';

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useSendOtp();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (!cleanValue && value !== '') return;

    if (cleanValue.length > 1) {
      const digit = cleanValue.slice(-1);
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);
      
      if (index < 3) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);

    // Auto-focus next input
    if (cleanValue && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 4) return;
    
    verifyOtp({ email, otp: otpCode }, {
      onSuccess: (data) => {
        setAuth(data.user, data.token);
        navigate('/');
      }
    });
  };

  const handleResend = () => {
    resendOtp(email, {
      onSuccess: () => {
        setTimer(30);
      }
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 pt-44 pb-24 relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#0f172a]' : 'bg-slate-50'
    }`}>
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className={`absolute top-[-5%] right-[-5%] w-[45%] h-[45%] rounded-full blur-[130px] opacity-15 ${
          theme === 'dark' ? 'bg-blue-600' : 'bg-blue-300'
        }`} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full p-8 lg:p-12 rounded-[3rem] border relative z-10 ${
          theme === 'dark' 
            ? 'bg-white/5 border-white/10 backdrop-blur-2xl px-4' 
            : 'bg-white border-slate-200 shadow-2xl shadow-blue-500/10'
        }`}
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-blue-600" size={32} />
          </div>
          <h2 className={`text-3xl font-black tracking-tight mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Verify Account
          </h2>
          <div className="flex items-center justify-center gap-2 text-slate-500 font-medium text-sm">
            <Mail size={14} />
            <p>Sent to <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{email}</span></p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-10">
          <div className="flex justify-center gap-3 md:gap-4">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-14 h-16 md:w-16 md:h-20 text-center text-3xl font-black rounded-2xl border-2 transition-all outline-none ${
                  theme === 'dark'
                    ? 'bg-[#1e293b]/50 border-white/5 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                    : 'bg-slate-50 border-slate-100 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'
                }`}
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isVerifying || otp.join('').length < 4}
            className="group relative w-full overflow-hidden py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isVerifying ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Verify & Login <ArrowRight size={16} /></>
              )}
            </span>
          </button>
        </form>

        <div className="mt-10 text-center">
          {timer > 0 ? (
            <p className="text-slate-500 text-sm font-medium">
              Resend code in <span className="text-blue-500 font-bold">{timer}s</span>
            </p>
          ) : (
            <button 
              onClick={handleResend}
              disabled={isResending}
              className="flex items-center justify-center gap-2 mx-auto text-blue-500 font-bold text-sm hover:underline group disabled:opacity-50"
            >
              <RefreshCcw size={14} className={`group-hover:rotate-180 transition-transform duration-500 ${isResending ? 'animate-spin' : ''}`} />
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          )}
        </div>

        <Link 
          to="/auth/login" 
          className={`mt-12 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest ${
            theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-blue-600'
          } transition-colors`}
        >
          <ArrowRight size={14} className="rotate-180" />
          Change Email Address
        </Link>
      </motion.div>
    </div>
  );
};

export default OTPPage;
