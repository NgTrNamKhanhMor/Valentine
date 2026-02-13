import { useState } from "react";
import "../styles/landing.css";
import BackgroundLayout from "./BackgroundLayout";

// Assets
import paperTexture from "../assets/paper-cut.png"; // The burnt-edge paper
import heartImage from "../assets/origami-heart.png";
import butterflySticker from "../assets/butterfly.png"; // New asset based on pic
// You can use a small semi-transparent div for tape or a tape.png

interface Props {
  onComplete: () => void;
}

export default function LandingPage({ onComplete }: Props) {
  const [isBeating, setIsBeating] = useState(false);

  const handleHeartClick = () => {
    if (isBeating) return;
    setIsBeating(true);
    // Add a slight delay so they see the beat before moving on
    setTimeout(() => {
        onComplete();
    }, 800);
  };

  return (
    <BackgroundLayout>
      <div className="landing-container">
        <div className="paper-card">
          {/* Burnt Paper Base */}
          <img src={paperTexture} alt="paper" className="paper-base" />
          
          {/* Decorative Elements from the picture */}
          <div className="tape top-right" />
          <div className="tape bottom-left" />
          
          <div className="heart-section" onClick={handleHeartClick}>
            <img
              src={heartImage}
              alt="Heart"
              className={`heart-image ${isBeating ? "beating" : ""}`}
            />
          </div>

          <p className="instruction-text">Click the heart</p>

          {/* Butterfly in bottom right */}
          <img src={butterflySticker} alt="butterfly" className="sticker butterfly" />
        </div>
      </div>
    </BackgroundLayout>
  );
}