
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const Footer = () => {
  const { theme } = useThemeStore();

  return (
    <footer className={`transition-colors duration-300 border-t ${
      theme === 'dark' 
        ? "bg-[#0f172a] text-slate-400 border-slate-800" 
        : "bg-slate-50 text-slate-600 border-slate-200"
    } py-16`}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">
                UC
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${
                theme === 'dark' ? "text-white" : "text-slate-900"
              }`}>UrbanClasses</span>
            </div>
            <p className="mb-8 leading-relaxed font-medium text-sm">
              Empowering students with accessible, high-quality online education designed to unlock your full potential and achieve your career goals.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className={`w-9 h-9 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border ${
                  theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                }`}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-wider transition-colors ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Study Material</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Course Catalog</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Academic Calendar</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-wider transition-colors ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>Top Programs</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-500 transition-colors">IIT-JEE Prep</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">NEET-UG Modules</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">12th Boards Master</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">10th Foundations</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Scholarship Tests</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-bold mb-6 text-sm uppercase tracking-wider transition-colors ${
              theme === 'dark' ? "text-white" : "text-slate-900"
            }`}>Connect</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 shrink-0" size={18} />
                <span className="leading-relaxed">123 Learning Lane, Knowledge Park, Kota, Rajasthan, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-blue-500 shrink-0" size={18} />
                <span>+91 98765 00000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-500 shrink-0" size={18} />
                <span>info@urbanclasses.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t text-xs font-medium flex flex-col md:flex-row justify-between items-center gap-6 transition-colors ${
          theme === 'dark' ? "border-slate-800" : "border-slate-200"
        }`}>
          <p>© 2026 Urban Classes. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
