import { useState } from "react";
import "../styles/landing.css";
import BackgroundLayout from "./BackgroundLayout";
import { motion } from "framer-motion";

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
        <motion.div
          className="paper-card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Burnt Paper Base */}
          <img src={paperTexture} alt="paper" className="paper-base" />

          {/* Decorative Elements from the picture */}
          <motion.div
            className="tape top-right"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          />
          <motion.div
            className="tape bottom-left"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
          />

          <motion.div
            className="heart-section"
            onClick={handleHeartClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            <img
              src={heartImage}
              alt="Heart"
              className={`heart-image ${isBeating ? "beating" : ""}`}
            />
          </motion.div>

          <motion.p
            className="instruction-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            Click the heart
          </motion.p>
          {/* Butterfly in bottom right */}
          <motion.img
            src={butterflySticker}
            alt="butterfly"
            className="sticker butterfly"
            initial={{ x: 20, y: 20, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          />
        </motion.div>
      </div>
    </BackgroundLayout>
  );
}
