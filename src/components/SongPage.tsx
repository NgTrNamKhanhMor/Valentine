import React, { useEffect, useRef, useState } from "react";
import "../styles/song.css";
import starImg from "../assets/songpage/star.png";
import musicalThingy from "../assets/songpage/pngwing.com (6).png";
import audioSrc from "../assets/songpage/audio.mp3";

interface Props {
  onComplete: () => void;
  /** Volume 0.0 - 1.0 (optional). If omitted, audio's default volume is used. */
  volume?: number;
}

export default function SongPage({ onComplete, volume }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // autoplay succeeded
        })
        .catch(() => {
          // autoplay was blocked by browser
          setAutoplayBlocked(true);
        });
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (volume !== undefined) {
      const v = Math.max(0, Math.min(1, volume));
      audio.volume = v;
    }
  }, [volume]);

  return (
    <div className="song-page-scroll-container">
      <audio ref={audioRef} src={audioSrc} preload="auto" loop />

      <img
        src={musicalThingy}
        alt="musicalThingy"
        className="musicalThingy-element musicalThingy-top-left"
      />
      <img src={starImg} alt="star" className="star-element star-1" />
      <img src={starImg} alt="star" className="star-element star-2" />
      <img src={starImg} alt="star" className="star-element star-3" />

      {autoplayBlocked && (
        <button
          onClick={() => {
            audioRef.current?.play();
            setAutoplayBlocked(false);
          }}
          style={{
            position: "fixed",
            top: 12,
            left: 110,
            zIndex: 10000,
            padding: "8px 12px",
            borderRadius: 6,
          }}
        >
          Play audio
        </button>
      )}
    </div>
  );
}
