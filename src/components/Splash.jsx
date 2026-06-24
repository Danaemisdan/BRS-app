import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import brsLogo from '../assets/brs-logo.png';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/region');
    }, 4500); // Give enough time to see the beautiful shimmer
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ 
        minHeight: '100vh', 
        width: '100%',
        background: 'radial-gradient(circle at center, #E6006C 0%, #B30054 60%, #8A0041 100%)',
      }}
    >
      <div 
        className="animate-fade-in delay-100" 
        style={{ 
          width: '85vmin', 
          height: '85vmin',
          position: 'relative',
          filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.5))'
        }}
      >
        <motion.img 
          layoutId="brs-logo"
          src={brsLogo} 
          alt="BRS Logo" 
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain' 
          }} 
        />
      </div>
    </motion.div>
  );
};

export default Splash;
