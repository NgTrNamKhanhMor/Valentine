import React from "react";
import "../styles/rose.css";
import bgVideo from "../assets/rosepage/bg.mp4";
import pic from "../assets/rosepage/pic.png";
import bear from "../assets/rosepage/bear.png";

interface Props {
  onComplete: () => void;
}

export default function RosePage({ onComplete }: Props) {
  return (
    <div className="rose-page-scroll-container">
      <video className="rose-bg-video" autoPlay muted loop src={bgVideo} />
      <img src={bear} alt="bear" className="rose-left-bear" />
      <img src={pic} alt="pic" className="rose-center-pic" />

      <button className="back-button" onClick={onComplete}>
        but i wanna choose the other
      </button>
    </div>
  );
}
