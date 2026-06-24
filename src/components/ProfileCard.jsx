import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Shield, CheckCircle, Edit2, Share } from 'lucide-react';

const ProfileCard = ({ user, stats, theme }) => {
  const isBLO = theme === 'blo';
  
  // Conditionally assign colors based on theme so Tailwind classes are simple and compile correctly
  const bannerGradient = isBLO 
    ? "from-emerald-600 via-teal-600 to-cyan-500" 
    : "from-pink-600 via-purple-600 to-amber-500";
  
  const checkIconColor = isBLO ? "text-emerald-500" : "text-pink-500";
  const accentText = isBLO ? "text-emerald-400" : "text-pink-400";
  const accentTextMuted = isBLO ? "text-emerald-400/70" : "text-pink-400/70";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-2xl rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] mt-4 mb-32"
    >
      {/* Banner / Cover */}
      <div className={`h-36 w-full bg-gradient-to-br ${bannerGradient} relative`}>
         <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Avatar (Overlapping) */}
      <div className="px-6 relative flex justify-between items-end -mt-16 mb-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative w-32 h-32 rounded-[28px] p-1 bg-[#1a000a] shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10"
        >
          <img src={user.avatar} className="w-full h-full object-cover rounded-[24px]" alt="Avatar" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border-4 border-[#1a000a] shadow-lg">
             <CheckCircle size={18} className={checkIconColor} strokeWidth={3} />
          </div>
        </motion.div>

        <div className="flex gap-2 z-10 mb-2">
           <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors shadow-xl">
              <Share size={18} className="text-white" />
           </button>
           <button className="px-4 h-10 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-white/90 transition-colors shadow-xl">
              <Edit2 size={16} /> Edit
           </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 pb-6 text-left">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {user.name}
        </h1>
        <p className="text-white/60 font-medium text-sm mt-1">{user.role}</p>
        
        <p className="text-white/90 mt-4 leading-relaxed text-[15px]">
          {user.bio}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-6 mb-6">
          <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 transition-colors hover:bg-white/10">
             <span className="text-2xl font-black text-white">{stats.approved}</span>
             <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">Verified</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 transition-colors hover:bg-white/10">
             <span className="text-2xl font-black text-white">{stats.pending}</span>
             <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">Pending</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 transition-colors hover:bg-white/10">
             <span className={`text-2xl font-black ${accentText}`}>{stats.booth}</span>
             <span className={`text-[10px] ${accentTextMuted} font-bold uppercase tracking-widest mt-1`}>Booth</span>
          </div>
        </div>

        {/* Details List */}
        <div className="bg-white/5 rounded-3xl p-5 border border-white/5 space-y-4 shadow-inner">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-white/60"><MapPin size={18} /> <span className="text-sm font-medium">Village</span></div>
              <span className="font-bold text-white text-sm">{user.village}</span>
           </div>
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-white/60"><MapPin size={18} /> <span className="text-sm font-medium">Booth No.</span></div>
              <span className="font-bold text-white text-sm">{user.boothName}</span>
           </div>
           <div className="h-px w-full bg-white/10" />
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-white/60"><CreditCard size={18} /> <span className="text-sm font-medium">Aadhaar</span></div>
              <span className={`font-mono font-bold ${accentText} tracking-widest text-sm`}>{user.aadhaar}</span>
           </div>
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-white/60"><Shield size={18} /> <span className="text-sm font-medium">{user.idLabel}</span></div>
              <span className={`font-mono font-bold ${accentText} tracking-widest text-sm`}>{user.idValue}</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ProfileCard;
