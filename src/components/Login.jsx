import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


import video1 from '../assets/we1.mp4';
import video2 from '../assets/we2.mp4';
import brsLogo from '../assets/brs-logo.gif';

const videos = [video1, video2];

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('voter');
  const [currentFact, setCurrentFact] = useState(0);
  const [showSwipePrompt, setShowSwipePrompt] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleActivity = () => {
      setHasScrolled(true);
      setShowSwipePrompt(false);
    };
    
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('wheel', handleActivity);
    window.addEventListener('click', handleActivity);
    
    // Show prompt if user hasn't scrolled within 3 seconds
    const promptTimer = setTimeout(() => {
      if (!hasScrolled) {
        setShowSwipePrompt(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('wheel', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearTimeout(promptTimer);
    };
  }, [hasScrolled]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds per video
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'bla') navigate('/bla-dashboard');
    else if (role === 'blo') navigate('/blo-dashboard');
    else navigate('/voter-dashboard');
  };

  const nextFact = () => setCurrentFact((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  const prevFact = () => setCurrentFact((prev) => (prev === 0 ? videos.length - 1 : prev - 1));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-start min-h-screen pt-[5vh] pb-10" 
      style={{ 
        background: 'radial-gradient(circle at center top, #8A0041 0%, #3a001b 50%, #0d0006 100%)'
      }}
    >
      <div className="w-full max-w-[400px] mx-auto">
        
        {/* Unified Magic Card */}
        <div className="magic-card">
          
          {/* Video Header inside the card */}
          <div className="w-full relative flex justify-center items-center" style={{ marginBottom: '-32px' }}>
            {videos.map((vid, index) => (
              <video 
                key={vid}
                src={vid}
                autoPlay 
                loop 
                muted 
                playsInline
                className={`w-full h-auto ${index === 0 ? 'relative' : 'absolute inset-0'}`}
                style={{
                  aspectRatio: '3/4',
                  opacity: currentFact === index ? 1 : 0,
                  transition: 'opacity 1.5s ease-in-out',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  objectFit: 'cover'
                }}
              />
            ))}
          </div>

          <div style={{ padding: '0 2rem 2rem 2rem' }} className="relative z-10">
            <div className="text-center mb-6">
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-100px', marginBottom: '1rem', position: 'relative', zIndex: 30 }}>
                <motion.img 
                  layoutId="brs-logo"
                  src={brsLogo} 
                  alt="BRS Logo"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }} 
                  className="shimmer-once drop-shadow-2xl" 
                  style={{ width: '200px', height: '200px', objectFit: 'contain' }} 
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1" style={{ color: '#ffffff' }}>Welcome back</h2>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Sign in to continue to BRS</p>
            </div>

            <div className="magic-tabs">
               <button 
                  onClick={() => setRole('voter')}
                  className={`magic-tab ${role === 'voter' ? 'active' : ''}`}
                >
                  Voter
                </button>
               <button 
                  onClick={() => setRole('bla')}
                  className={`magic-tab ${role === 'bla' ? 'active' : ''}`}
                >
                  BLA
                </button>
               <button 
                  onClick={() => setRole('blo')}
                  className={`magic-tab ${role === 'blo' ? 'active' : ''}`}
                >
                  BLO
                </button>
            </div>

            <form onSubmit={handleLogin}>
              <div>
                <label className="magic-label">
                  {role === 'voter' ? 'Voter ID (EPIC) / Mobile' : 'Mobile Number'}
                </label>
                <input 
                  type={role === 'voter' ? "text" : "tel"}
                  placeholder={role === 'voter' ? "TSX1234567" : "9876543210"}
                  maxLength={10}
                  required
                  className="magic-input"
                />
              </div>
              
              <button className="magic-btn">
                Log In
              </button>
            </form>
          </div>

        </div>
      </div>
      {/* Swipe Overlay */}
      {showSwipePrompt && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-24 pointer-events-none transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 30%, transparent 100%)' }}>
          <div className="animate-swipe flex flex-col items-center">
            <span style={{ fontSize: '4.5rem', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.6))' }}>👆</span>
            <p className="text-white font-bold mt-2 text-xl tracking-wide" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Swipe to Login</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Login;
