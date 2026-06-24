import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import brsLogo from '../assets/brs-logo.png';
import regionBgVideo from '../assets/region-bg-2.mp4';
import villagesData from '../assets/villages.json';

const RegionSelection = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (selectedRegion) {
      navigate('/login');
    }
  };

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
        
        {/* Unified Magic Card (Exact match to Login layout) */}
        <div className="magic-card">
          
          {/* Video Header inside the card */}
          <div className="w-full relative flex justify-center items-center" style={{ marginBottom: '-32px' }}>
            <video 
              src={regionBgVideo}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto relative"
              style={{
                aspectRatio: '3/4',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                objectFit: 'cover'
              }}
            />
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
              <h2 className="text-2xl font-bold text-white mb-1" style={{ color: '#ffffff' }}>Welcome</h2>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Please select your village or niyojikavargam</p>
            </div>

            <form onSubmit={handleContinue}>
              <div>
                <label className="magic-label">Select Region</label>
                <div className="relative">
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="magic-input appearance-none w-full"
                    required
                    style={{ 
                      color: selectedRegion ? 'white' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" disabled>Choose your area...</option>
                    <optgroup label="Thungathurthi (96)">
                      {villagesData.map((village, idx) => (
                        <option key={idx} value={village} style={{ color: 'black' }}>
                          {village}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="magic-btn"
                disabled={!selectedRegion}
                style={{ opacity: !selectedRegion ? 0.5 : 1 }}
              >
                Continue
              </button>
            </form>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default RegionSelection;
