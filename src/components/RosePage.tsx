import React, { useState } from "react";
import "../styles/rose.css";
import bgVideo from "../assets/rosepage/bg.mp4";
import pic from "../assets/rosepage/pic.png";
import bear from "../assets/rosepage/bear.png";
import flipflip from "../assets/rosepage/flipflip.png";
import text2 from "../assets/rosepage/text2.png";

interface Props {
  onComplete: () => void;
}

export default function RosePage({ onComplete }: Props) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="rose-page-scroll-container">
      <video className="rose-bg-video" autoPlay muted loop src={bgVideo} />
      <img src={bear} alt="bear" className="rose-left-bear" loading="lazy" />
      <img src={text2} alt="text2" className="rose-text2" loading="lazy" />
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
}
