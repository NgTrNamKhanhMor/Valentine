import backgroundImage from "../assets/pattern-bg.png";
import paperTexture from "../assets/ripped-paper.png";
import heartImage from "../assets/3.png";
import flowerSticker from "../assets/flower.png";
import { useState } from "react";

import "../styles/landing.css";

interface Props {
  onComplete: () => void;
}
export default function LandingPage({ onComplete }: Props) {
  const [isBeating, setIsBeating] = useState(false);

  const handleHeartClick = () => {
    if (isBeating) return;
    setIsBeating(true);
    onComplete();
  };
  return (
    <div
      className="scrapbook-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="paper-card">
        <img src={paperTexture} alt="paper" className="paper-base" />
        <img src={flowerSticker} alt="flower" className="sticker flower" />
        <div className="heart-wrapper" onClick={handleHeartClick}>
          <img
            src={heartImage}
            alt="Heart"
            className={`heart-image ${isBeating ? "beating" : ""}`}
          />
        </div>

        <p className="instruction-text">CLICK THE HEART</p>
      </div>
    </div>
  );
}
