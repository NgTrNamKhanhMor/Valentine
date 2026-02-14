import React, { useState, useRef, useEffect } from "react";
import roseMusic from "../assets/rosemusic.mp3";
import "../styles/rose.css";
import bgVideo from "../assets/rosepage/bg.mp4";
import pic from "../assets/rosepage/pic.png";
import bear from "../assets/rosepage/bear.png";
import flipflip from "../assets/rosepage/flipflip.png";
import text2 from "../assets/rosepage/text2.png";

interface Props {
  onComplete: () => void;
}

const RosePage: React.FC<Props> = ({ onComplete }) => {
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="rose-page-scroll-container" style={{ position: 'relative' }}>
      <audio ref={audioRef} src={roseMusic} autoPlay loop style={{ display: 'none' }} />
      <video className="rose-bg-video" autoPlay muted loop src={bgVideo} />
      <img src={bear} alt="bear" className="rose-left-bear" loading="lazy" />
      <img src={text2} alt="text2" className="rose-text2" loading="lazy" />
      {/* Flipable Text and Arrow */}
      <div className="rose-flipable-hint" style={{ position: 'absolute', left: 'calc(50% - 420px)', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
        <span style={{ fontFamily: 'Genty Sans, sans-serif', fontSize: '1.2rem', color: '#d81b60', marginBottom: '8px', fontWeight: 'bold', textShadow: '1px 1px 3px #fff' }}>flipable btw</span>
        {/* Arrow SVG (pointing right) */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 24h32M40 24l-8-8M40 24l-8 8" stroke="#d81b60" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div
        className={`rose-flip-card${flipped ? " flipped" : ""}`}
        onClick={handleFlip}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") handleFlip();
        }}
        aria-pressed={flipped}
        role="button"
        style={{ cursor: 'pointer' }}
      >
        <div className="rose-flip-card-inner">
          <img src={pic} alt="pic" className="rose-flip-card-front" loading="lazy" />
          <img src={flipflip} alt="flipflip" className="rose-flip-card-back" loading="lazy" />
        </div>
      </div>

      <button className="back-button" onClick={onComplete}>
        but i wanna choose the other
      </button>
    </div>
  );
};

export default RosePage;
