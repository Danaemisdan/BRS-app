import React, { useState, useEffect, useRef } from 'react';
import { MoreHorizontal, Heart, Send } from 'lucide-react';

const StoryViewer = ({ stories, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log(e));
    }
  }, [currentIndex]);

    useEffect(() => {
    let animationFrameId;
    const updateProgress = () => {
      if (videoRef.current && !isPaused) {
        const current = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        if (duration > 0) {
          setProgress((current / duration) * 100);
        }
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };
    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentIndex, isPaused]);

  const handleVideoEnd = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 3) {
      if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    } else {
      if (currentIndex < stories.length - 1) setCurrentIndex(prev => prev + 1);
      else setCurrentIndex(0);
    }
  };

  return (
    <div 
      style={{
        position: 'relative', width: '100%', maxWidth: '28rem', margin: '0 auto', height: '82vh', backgroundColor: '#000', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', userSelect: 'none', border: '1px solid rgba(255,255,255,0.1)'
      }}
      onPointerDown={() => { setIsPaused(true); videoRef.current?.pause(); }}
      onPointerUp={() => { setIsPaused(false); videoRef.current?.play(); }}
      onPointerLeave={() => { setIsPaused(false); videoRef.current?.play(); }}
    >
      
      {/* Video Background */}
      <video
        ref={videoRef}
        src={stories[currentIndex].src}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        onEnded={handleVideoEnd}
        playsInline
        muted
        autoPlay
        loop={false}
      />

      {/* Top Gradient for readability */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)', pointerEvents: 'none', zIndex: 10 }} />

      {/* Progress Bars (Story Style) */}
      <div style={{ position: 'absolute', top: '20px', left: 0, right: 0, padding: '0 16px', display: 'flex', gap: '6px', zIndex: 20 }}>
        {stories.map((_, idx) => (
          <div key={idx} style={{ height: '4px', flex: 1, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '9999px', overflow: 'hidden', backdropFilter: 'blur(4px)' }}>
            <div 
              style={{ 
                height: '100%', 
                background: 'linear-gradient(to right, #fbcfe8, #ec4899)', // Pink gradient progress bar!
                transition: 'none',
                width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Header Overlay */}
      <div style={{ position: 'absolute', top: '40px', left: '20px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={stories[currentIndex].avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '9999px', border: '1.5px solid rgba(255,255,255,0.5)', objectFit: 'cover', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }} />
          <div style={{ color: '#fff', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
            <p style={{ fontWeight: 'bold', fontSize: '14px', margin: 0, lineHeight: 1.2 }}>{stories[currentIndex].username}</p>
            <p style={{ fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.8)', margin: 0 }}>{stories[currentIndex].time}</p>
          </div>
        </div>
        <button style={{ width: '32px', height: '32px', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', outline: 'none' }}>
          <MoreHorizontal size={20} color="#fff" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
        </button>
      </div>

      {/* Invisible Tap Area to go Prev/Next */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, cursor: 'pointer' }} onClick={handleTap} />

      {/* Bottom Footer overlay */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', paddingTop: '96px', background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6), transparent)', zIndex: 20, pointerEvents: 'none' }}>
        <p style={{ color: '#fff', fontSize: '16px', fontWeight: '500', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))', marginBottom: '20px', pointerEvents: 'auto', lineHeight: 1.4, margin: '0 0 20px 0' }}>
          {stories[currentIndex].caption}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto' }}>
          <input 
            type="text" 
            placeholder="Reply to story..." 
            style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '9999px', padding: '12px 20px', color: '#fff', outline: 'none', fontWeight: '500', fontSize: '14px', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)' }}
          />
          <button style={{ width: '48px', height: '48px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', flexShrink: 0 }}>
            <Heart size={22} color="#fff" />
          </button>
          <button style={{ width: '48px', height: '48px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', flexShrink: 0 }}>
            <Send size={20} color="#fff" style={{ transform: 'translate(1px, -1px)' }} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default StoryViewer;
