import { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Mail, Phone, MessageSquare, Calendar, CheckCircle2 } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { useOfflineBatches } from "../../api/hooks/offlineCenter/offlineBatch.hooks";
import { useCreateOfflineBooking } from "../../api/hooks/offlineCenter/offlineBooking.hooks";
import { showSuccessMessage, showErrorMessage, showWarningMessage } from "../../utils/message";

interface OfflineBookingFormProps {
  courseId: string;
  onClose: () => void;
}

const OfflineBookingForm = ({ courseId, onClose }: OfflineBookingFormProps) => {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    message: "",
    batchId: ""
  });

  const { data: batchesData, isLoading: batchesLoading } = useOfflineBatches({ courseId, isActive: true });
  const createBookingMutation = useCreateOfflineBooking();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.batchId) {
      showWarningMessage("Please select a batch");
      return;
    }

    try {
      await createBookingMutation.mutateAsync({
        ...formData,
        userId: user?.id || null
      });
      showSuccessMessage("Seat booking request submitted successfully!");
      onClose();
    } catch (err) {
      showErrorMessage(err as any);
    }
  };

  const batches = batchesData?.batches || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={`w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl relative ${
          theme === 'dark' ? "bg-[#111626] border border-white/10" : "bg-white border border-slate-200"
        }`}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
        >
          <X className={theme === 'dark' ? "text-slate-400" : "text-slate-500"} size={20} />
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="text-blue-500" size={32} />
            </div>
            <h2 className={`text-3xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Book Your Offline Seat</h2>
            <p className="text-slate-500 text-sm font-medium">Fill in your details to secure a spot in our offline batch.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all ${
                      theme === 'dark' 
                        ? "bg-white/5 border-white/5 text-white focus:border-blue-500/50" 
                        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500/50"
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all ${
                      theme === 'dark' 
                        ? "bg-white/5 border-white/5 text-white focus:border-blue-500/50" 
                        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500/50"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all ${
                    theme === 'dark' 
                      ? "bg-white/5 border-white/5 text-white focus:border-blue-500/50" 
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500/50"
                  }`}
                />
              </div>
            </div>

            {/* Batch Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Select Batch</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <select 
                  name="batchId"
                  required
                  value={formData.batchId}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none appearance-none transition-all ${
                    theme === 'dark' 
                      ? "bg-white/5 border-white/5 text-white focus:border-blue-500/50" 
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500/50"
                  }`}
                >
                  <option value="" disabled className={theme === 'dark' ? "bg-[#111626]" : "bg-white"}>Choose a batch</option>
                  {batchesLoading ? (
                    <option disabled>Loading batches...</option>
                  ) : batches.length > 0 ? (
                    batches.map((batch) => (
                      <option key={batch.id} value={batch.id} className={theme === 'dark' ? "bg-[#111626]" : "bg-white"}>
                        {batch.name} - {batch.center?.name} ({batch.startTime} - {batch.endTime})
                      </option>
                    ))
                  ) : (
                    <option disabled>No batches available</option>
                  )}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message (Optional)</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-slate-500" size={18} />
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or questions?"
                  rows={3}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all resize-none ${
                    theme === 'dark' 
                      ? "bg-white/5 border-white/5 text-white focus:border-blue-500/50" 
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500/50"
                  }`}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={createBookingMutation.isPending || batches.length === 0}
              className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                createBookingMutation.isPending || batches.length === 0
                  ? 'bg-slate-500 cursor-not-allowed text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              }`}
            >
              {createBookingMutation.isPending ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Submit Booking <CheckCircle2 size={18} /></>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OfflineBookingForm;
