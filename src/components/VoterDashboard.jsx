import React, { useState } from 'react';
import { User, MapPin, CheckCircle, LogOut, Home, ListChecks, Video, AlertTriangle, Image, X, Crown, Share2, Edit2, ChevronLeft, CreditCard, Shield, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import harshaImg from '../assets/Harsha.jpeg';

import poster1 from '../assets/posters/poster1.jpg';
import poster2 from '../assets/posters/poster2.jpg';
import poster3 from '../assets/posters/poster3.jpg';
import poster4 from '../assets/posters/poster4.jpg';
import poster5 from '../assets/posters/poster5.jpg';

import video1 from '../assets/we1.mp4';
import video2 from '../assets/we2.mp4';
import video3 from '../assets/we3.mp4';
import brsLogo from '../assets/brs-logo.png';
import StoryViewer from './StoryViewer';

const VoterDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [previewPoster, setPreviewPoster] = useState(null);
  const [previewTitle, setPreviewTitle] = useState('');
  const [showSubModal, setShowSubModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(''), 3000); };
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [profileName, setProfileName] = useState('M. Venkat Rao');
  const [isPushEnabled, setIsPushEnabled] = useState(true);
  const [isDarkEnabled, setIsDarkEnabled] = useState(true);
  const [isBuying, setIsBuying] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Voter Profile', text: 'Check out my official Voter Profile on the BRS portal!', url: window.location.href });
      } catch (err) { console.error('Error sharing:', err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard!');
    }
  };

  const reelsData = [
    { src: video3, avatar: brsLogo, username: 'BRS Party', time: 'Just now', caption: 'గ్యారంటీ కార్డులతో కమల్ హాసన్ ను మైమరిపించిన బట్టి విక్రమార్క' },

    { src: video1, avatar: brsLogo, username: 'BRS Party', time: '2h ago', caption: 'Latest updates from the party office! Stay tuned for more reels. 🩷 #BRS #Telangana' },
    { src: video2, avatar: brsLogo, username: 'KCR Fans', time: '5h ago', caption: 'Jai Telangana! Jai KCR! 🚗✨' }
  ];

  return (
    <div className="min-h-screen w-full relative text-white" style={{ backgroundColor: '#0d0006' }}>
      {/* Background Gradient */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 50% 0%, #D40068 0%, #700036 40%, #0d0006 100%)', 
          zIndex: 0,
          pointerEvents: 'none'
        }} 
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container relative z-10 pt-8 px-4 pb-28"
      >
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', fontFamily: 'Inter, sans-serif' }}>Voter Status</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>Welcome, Citizen</p>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src={brsLogo}
              alt="BRS Logo"
              style={{ width: '72px', height: '72px', objectFit: 'contain' }}
            />
            
          </div>
        </header>

        <div style={{ position: 'relative' }}>
          
          {/* 1. PROFILE TAB (bhomikproductivitylab/profile-card Replica) */}
          {activeTab === 'profile' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              style={{
                width: '100%',
                maxWidth: '28rem',
                margin: '1rem auto 6rem auto',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '32px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
              }}
            >
              {/* Banner / Cover */}
              <div style={{ height: '144px', width: '100%', position: 'relative', background: 'linear-gradient(to bottom right, #059669, #0d9488, #06b6d4)' }}>
                 <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }} />
              </div>

              {/* Avatar (Overlapping) & Top Buttons */}
              <div style={{ padding: '0 24px', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-68px', marginBottom: '16px' }}>
                <div style={{ position: 'relative', width: '136px', height: '136px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                  {/* Rotating Gradient Ring (Only visible if subscribed) */}
                  {isSubscribed && (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '9999px',
                          background: 'conic-gradient(from 0deg, #fbcfe8, #ec4899, #9d174d, #ec4899, #fbcfe8)',
                          filter: 'blur(2px)',
                          opacity: 0.8
                        }}
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '9999px',
                          background: 'conic-gradient(from 0deg, #fbcfe8, #ec4899, #9d174d, #ec4899, #fbcfe8)'
                        }}
                      />
                    </>
                  )}
                  {/* Avatar Container */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    style={{ position: 'relative', width: '128px', height: '128px', borderRadius: '9999px', padding: '4px', backgroundColor: '#1a000a', zIndex: 10 }}
                  >
                    <img src={harshaImg} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '9999px' }} />
                    <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', backgroundColor: '#ffffff', borderRadius: '9999px', padding: '4px', border: '4px solid #1a000a', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                       <CheckCircle size={18} color="#ec4899" strokeWidth={3} />
                    </div>
                  </motion.div>
                </div>

                <div style={{ display: 'flex', gap: '8px', zIndex: 10, marginBottom: '8px' }}>
                   <button onClick={handleShare} style={{ width: '40px', height: '40px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                      <Share2 size={18} color="#ffffff" />
                   </button>
                   <button onClick={() => setShowEditModal(true)} style={{ padding: '0 16px', height: '40px', borderRadius: '9999px', backgroundColor: '#ffffff', color: '#000000', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <Edit2 size={16} /> Edit
                   </button>
                </div>
              </div>

              {/* Info Section */}
              <div style={{ padding: '0 24px 24px 24px', textAlign: 'left' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif' }}>
                  {profileName}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: '500', fontSize: '14px', marginTop: '4px' }}>Active Voter • Telangana</p>
                
                <p style={{ color: 'rgba(255,255,255,0.9)', marginTop: '16px', lineHeight: '1.6', fontSize: '15px' }}>
                  Proud to be a part of the democratic process! 🇮🇳🗳️
                </p>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px', marginBottom: '24px' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                     <span style={{ fontSize: '24px', fontWeight: '900', color: '#10b981' }}>Active</span>
                     <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Status</span>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                     <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>4</span>
                     <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Times Voted</span>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                     <span style={{ fontSize: '24px', fontWeight: '900', color: '#f472b6' }}>104</span>
                     <span style={{ fontSize: '10px', color: 'rgba(244,114,182,0.7)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Booth</span>
                  </div>
                </div>

                {/* Details List */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)' }}><MapPin size={18} /> <span style={{ fontSize: '14px', fontWeight: '500' }}>Village</span></div>
                      <span style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '14px' }}>Thungathurthi</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)' }}><MapPin size={18} /> <span style={{ fontSize: '14px', fontWeight: '500' }}>Booth No.</span></div>
                      <span style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '14px' }}>104 (Govt Primary)</span>
                   </div>
                   <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)' }}><CreditCard size={18} /> <span style={{ fontSize: '14px', fontWeight: '500' }}>Aadhaar</span></div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontVariantNumeric: 'tabular-nums', fontWeight: 'bold', color: '#f472b6', letterSpacing: '0.1em', fontSize: '14px' }}>XXXX XXXX 4921</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)' }}><Shield size={18} /> <span style={{ fontSize: '14px', fontWeight: '500' }}>EPIC ID</span></div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontVariantNumeric: 'tabular-nums', fontWeight: 'bold', color: '#f472b6', letterSpacing: '0.1em', fontSize: '14px' }}>TS1234567</span>
                   </div>
                </div>

                {/* Settings Menu */}
                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => setShowSubModal(true)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s', cursor: 'pointer' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Crown size={20} color="#ec4899" />
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '16px', color: '#ffffff', flex: 1, textAlign: 'left' }}>My Subscription</span>
                    <ChevronLeft size={20} color="rgba(255,255,255,0.3)" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button onClick={() => setShowSettingsModal(true)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s', cursor: 'pointer' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Settings size={20} color="#ffffff" />
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '16px', color: '#ffffff', flex: 1, textAlign: 'left' }}>App Settings</span>
                    <ChevronLeft size={20} color="rgba(255,255,255,0.3)" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button onClick={() => {
                    setIsLoggingOut(true);
                    setTimeout(() => {
                      navigate('/login');
                    }, 1500);
                  }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.2)', transition: 'background 0.2s', cursor: 'pointer', marginTop: '8px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <LogOut size={20} color="#ef4444" />
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '16px', color: '#ef4444', flex: 1, textAlign: 'left' }}>Log Out</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {/* 2. HISTORY TAB */}
          {activeTab === 'history' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: 0, fontFamily: 'Inter, sans-serif' }}>Vote History</h3>
              
              <div style={{ position: 'relative', paddingLeft: '24px' }}>
                {/* Timeline Line */}
                <div style={{ position: 'absolute', top: '12px', bottom: '12px', left: '11px', width: '2px', backgroundColor: 'rgba(236,72,153,0.3)', borderRadius: '9999px' }} />
                
                {/* 2023 Assembly */}
                <div style={{ position: 'relative', marginBottom: '32px' }}>
                  <div style={{ position: 'absolute', top: '24px', left: '-29px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ec4899', border: '4px solid #1a000a', boxShadow: '0 0 0 2px rgba(236,72,153,0.5)' }} />
                  <div style={{ padding: '24px', borderRadius: '24px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: 0, fontFamily: 'Inter, sans-serif' }}>2023 Assembly Elections</h4>
                      <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(16,185,129,0.2)', color: '#10b981', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid rgba(16,185,129,0.3)' }}>Voted</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: 0, fontWeight: '500' }}>December 2023 • Booth 104</p>
                  </div>
                </div>

                {/* 2019 Lok Sabha */}
                <div style={{ position: 'relative', marginBottom: '32px' }}>
                  <div style={{ position: 'absolute', top: '24px', left: '-29px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ec4899', border: '4px solid #1a000a', boxShadow: '0 0 0 2px rgba(236,72,153,0.5)' }} />
                  <div style={{ padding: '24px', borderRadius: '24px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: 0, fontFamily: 'Inter, sans-serif' }}>2019 Lok Sabha Elections</h4>
                      <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(16,185,129,0.2)', color: '#10b981', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid rgba(16,185,129,0.3)' }}>Voted</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: 0, fontWeight: '500' }}>April 2019 • Booth 104</p>
                  </div>
                </div>

                {/* 2018 Assembly */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '24px', left: '-29px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ec4899', border: '4px solid #1a000a', boxShadow: '0 0 0 2px rgba(236,72,153,0.5)' }} />
                  <div style={{ padding: '24px', borderRadius: '24px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: 0, fontFamily: 'Inter, sans-serif' }}>2018 Assembly Elections</h4>
                      <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(16,185,129,0.2)', color: '#10b981', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid rgba(16,185,129,0.3)' }}>Voted</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: 0, fontWeight: '500' }}>December 2018 • Booth 104</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* 3. REELS TAB */}
          {activeTab === 'reels' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ paddingBottom: '96px' }}>
              <StoryViewer stories={reelsData} onClose={() => {}} />
            </motion.div>
          )}

          {/* 4. REPORTS TAB */}
          {activeTab === 'requests' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: 0, fontFamily: 'Inter, sans-serif' }}>Report Issue</h3>
              </div>

              <div style={{ padding: '24px', borderRadius: '32px', backgroundColor: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', backdropFilter: 'blur(24px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={24} color="#ef4444" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: '0 0 4px 0', fontFamily: 'Inter, sans-serif' }}>Submit a Request</h4>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0, fontWeight: '500' }}>Name change, address update, etc.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Issue Type</label>
                    <select style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '16px', outline: 'none', appearance: 'none' }}>
                      <option value="" style={{ color: '#000' }}>Select an issue...</option>
                      <option value="name" style={{ color: '#000' }}>Name Correction (Form 8)</option>
                      <option value="address" style={{ color: '#000' }}>Address Change (Form 8)</option>
                      <option value="deletion" style={{ color: '#000' }}>Deletion Request (Form 7)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Description</label>
                    <textarea rows="4" placeholder="Briefly describe your issue..." style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '16px', outline: 'none', resize: 'none' }}></textarea>
                  </div>
                  <button style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: '#ef4444', color: '#fff', fontWeight: 'bold', border: 'none', marginTop: '8px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(239,68,68,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Submit Request</button>
                </div>
              </div>
            </motion.div>
          )}

          
          {/* 5. POSTERS TAB */}
          {activeTab === 'posters' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '96px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: 0, fontFamily: 'Inter, sans-serif' }}>Campaign Posters</h3>
                {isSubscribed ? (
                  <div style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.3)', color: '#ec4899', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Premium Active
                  </div>
                ) : (
                  <div onClick={() => setShowSubModal(true)} style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Subscribe
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { id: 1, src: poster5, title: 'Voice For Farmers!' },
                  { id: 2, src: poster1, title: "KTR's Powerful Address" },
                  { id: 3, src: poster2, title: 'KCR Garu Greetings' },
                  { id: 4, src: poster3, title: 'KTR at Party Meet' },
                  { id: 5, src: poster4, title: 'KCR Addressing Cadre' },
                ].map((poster) => (
                  <div 
                    key={poster.id} 
                    onClick={() => {
                      if (!isSubscribed) setShowSubModal(true);
                      else {
                        setPreviewPoster(poster.src);
                        setPreviewTitle(poster.title);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ 
                      borderRadius: '24px', 
                      backgroundColor: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.05)', 
                      overflow: 'hidden', 
                      position: 'relative',
                      aspectRatio: '3/4',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                    }}>
                      <img 
                        src={poster.src} 
                        alt={poster.title} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          filter: !isSubscribed ? 'blur(10px) brightness(0.6)' : 'none',
                          transition: 'all 0.3s'
                        }} 
                      />
                      {!isSubscribed && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                           <Crown size={32} color="rgba(255,255,255,0.8)" style={{ marginBottom: '8px' }} />
                           <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Unlock</span>
                        </div>
                      )}
                    </div>
                    <div style={{ marginTop: '12px', textAlign: 'center', padding: '0 4px' }}>
                      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', fontWeight: '600', margin: 0, fontFamily: 'Inter, sans-serif', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {poster.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}


</div>
      </motion.div>

      
          
          

      <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)' }}>
          
          {/* Profile (Home) */}
          <div className="relative group cursor-pointer" onClick={() => setActiveTab('profile')}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px' }} className={`relative flex items-center justify-center transition-all duration-300 transform group-hover:scale-125 group-hover:-translate-y-2 z-10 ${activeTab === 'profile' ? 'bg-white/15 text-pink-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              <Home size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            </div>
            {activeTab === 'profile' && <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ec4899', boxShadow: '0 0 10px rgba(236, 72, 153,1)' }} />}
          </div>

          {/* History */}
          <div className="relative group cursor-pointer" onClick={() => setActiveTab('history')}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px' }} className={`relative flex items-center justify-center transition-all duration-300 transform group-hover:scale-125 group-hover:-translate-y-2 z-10 ${activeTab === 'history' ? 'bg-white/15 text-pink-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              <ListChecks size={24} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
            </div>
            {activeTab === 'history' && <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ec4899', boxShadow: '0 0 10px rgba(236, 72, 153,1)' }} />}
          </div>

          {/* Updates (Reels) */}
          <div className="relative group cursor-pointer" onClick={() => setActiveTab('reels')}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px' }} className={`relative flex items-center justify-center transition-all duration-300 transform group-hover:scale-125 group-hover:-translate-y-2 z-10 ${activeTab === 'reels' ? 'bg-white/15 text-pink-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              <Video size={24} strokeWidth={activeTab === 'reels' ? 2.5 : 2} />
            </div>
            {activeTab === 'reels' && <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ec4899', boxShadow: '0 0 10px rgba(236, 72, 153,1)' }} />}
          </div>

          {/* Requests */}
          <div className="relative group cursor-pointer" onClick={() => setActiveTab('requests')}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px' }} className={`relative flex items-center justify-center transition-all duration-300 transform group-hover:scale-125 group-hover:-translate-y-2 z-10 ${activeTab === 'requests' ? 'bg-white/15 text-pink-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              <AlertTriangle size={24} strokeWidth={activeTab === 'requests' ? 2.5 : 2} />
            </div>
            {activeTab === 'requests' && <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ec4899', boxShadow: '0 0 10px rgba(236, 72, 153,1)' }} />}
          </div>

        </div>
      </div>

      {/* Logout Loader Modal */}
      {isLoggingOut && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
             <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid rgba(239,68,68,0.2)', borderTopColor: '#ef4444' }} />
          </motion.div>
          <p style={{ color: '#ef4444', marginTop: '24px', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Inter, sans-serif' }}>Logging out...</p>
        </div>
      )}

    
      {/* Toast Notification */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }} 
        animate={{ y: toastMessage ? 0 : 100, opacity: toastMessage ? 1 : 0 }} 
        style={{ position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ec4899', color: '#fff', padding: '12px 24px', borderRadius: '9999px', fontWeight: 'bold', zIndex: 10001, pointerEvents: 'none', boxShadow: '0 10px 20px rgba(236,72,153,0.3)', fontFamily: 'Inter, sans-serif' }}
      >
        {toastMessage}
      </motion.div>

      {showSubModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ position: 'relative', backgroundColor: '#1a000a', borderRadius: '32px', padding: '32px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setShowSubModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={24} /></button>
            <div style={{ width: '64px', height: '64px', borderRadius: '24px', backgroundColor: 'rgba(236,72,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Crown size={32} color="#ec4899" />
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>BRS Pro Member</h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: '32px', fontWeight: '500' }}>Support the party and unlock an exclusive pink ring for your profile, plus access to premium posters.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={() => { setIsSubscribed(true); setShowSubModal(false); showToast('Subscribed Successfully!'); }} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: '#ec4899', color: '#fff', fontWeight: '900', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(236,72,153,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subscribe for ₹99/mo</button>
            </div>
          </motion.div>
        </div>
      )}
    
      {/* Edit Profile Modal */}
      {showEditModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ position: 'relative', backgroundColor: '#1a000a', borderRadius: '32px', padding: '32px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setShowEditModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={24} /></button>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Edit Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '8px', display: 'block', textAlign: 'left' }}>Name</label>
                <input value={profileName} onChange={(e) => setProfileName(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '16px', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
              </div>
              <button onClick={() => { showToast('Profile Saved!'); setShowEditModal(false); }} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: '#ec4899', color: '#fff', fontWeight: 'bold', border: 'none', marginTop: '8px', cursor: 'pointer' }}>Save Changes</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ position: 'relative', backgroundColor: '#1a000a', borderRadius: '32px', padding: '32px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setShowSettingsModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={24} /></button>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>App Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>Push Notifications</span>
                <div style={{ width: '48px', height: '24px', backgroundColor: '#ec4899', borderRadius: '9999px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>Dark Mode</span>
                <div style={{ width: '48px', height: '24px', backgroundColor: '#ec4899', borderRadius: '9999px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }} />
                </div>
              </div>
              <button onClick={() => { showToast('Preferences Saved!'); setShowSettingsModal(false); }} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: '#ec4899', color: '#fff', fontWeight: 'bold', border: 'none', marginTop: '8px', cursor: 'pointer' }}>Done</button>
            </div>
          </motion.div>
        </div>
      )}
    
      
      {/* Full Screen Poster Preview */}
      {previewPoster && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 11000, display: 'flex', flexDirection: 'column', backdropFilter: 'blur(10px)' }}>
          <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setPreviewPoster(null)} style={{ width: '48px', height: '48px', borderRadius: '24px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
            <p style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: 0, fontFamily: 'Inter, sans-serif' }}>{previewTitle}</p>
            <button onClick={() => { showToast('Saved to Camera Roll!'); setPreviewPoster(null); }} style={{ padding: '12px 24px', borderRadius: '9999px', backgroundColor: '#ec4899', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif' }}>
              Download
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px 48px 24px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
              <img src={previewPoster} alt="Preview" style={{ width: '100%', height: 'auto', display: 'block' }} />
              
              {/* Watermark Overlay */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(236,72,153,0.95) 0%, rgba(236,72,153,0.7) 50%, transparent 100%)', padding: '40px 16px 16px 16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', pointerEvents: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={harshaImg} alt="User" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', objectFit: 'cover' }} />
                  <div>
                    <p style={{ color: '#fff', fontSize: '15px', fontWeight: '800', margin: 0, fontFamily: 'Inter, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{profileName}</p>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '10px', fontWeight: '700', margin: 0, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>BRS Pro Member</p>
                  </div>
                </div>
                <img src={brsLogo} alt="BRS" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default VoterDashboard;
