import React, { useEffect, useRef, useState } from "react";
import "../styles/song.css";
import starImg from "../assets/songpage/star.png";
import musicalThingy from "../assets/songpage/musicalThingy.png";
import threePic from "../assets/songpage/3pic.png";
import tvPic from "../assets/songpage/tv.png";
import titlePic from "../assets/songpage/title.png";
import audioSrc from "../assets/songpage/audio.mp3";

interface Props {
  onComplete: () => void;
  /** Volume 0.0 - 1.0 (optional). If omitted, audio's default volume is used. */
  volume?: number;
}

export default function SongPage({ onComplete, volume }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [currentVolume, setCurrentVolume] = useState<number>(
    volume !== undefined ? Math.max(0, Math.min(1, volume)) : 0.5
  );
  const [muted, setMuted] = useState(false);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = currentVolume;
    audio.muted = muted;
  }, [currentVolume, muted]);

  return (
    <div className="song-page-scroll-container">
      <audio ref={audioRef} src={audioSrc} preload="auto" loop />

      <div className="musicalThingy-wrapper">
        <img
          src={musicalThingy}
          alt="musicalThingy"
          className="musicalThingy-element musicalThingy-top-left"
        />
      </div>
        <div className="three-pic-wrapper">
          <img src={threePic} alt="three-pic" className="three-pic" />
        </div>
        <img src={titlePic} alt="title" className="title-center" />
        <img src={tvPic} alt="tv" className="tv-center" />
      <img src={starImg} alt="star" className="star-element star-1" />
      <img src={starImg} alt="star" className="star-element star-2" />
      <img src={starImg} alt="star" className="star-element star-3" />

      {autoplayBlocked && (
        <button
          onClick={() => {
            audioRef.current?.play();
            setAutoplayBlocked(false);
          }}
          className="autoplay-play-btn"
        >
          Play audio
        </button>
      )}

      <div className="control-container">
        <button
          onClick={() => setMuted((m) => !m)}
          className="volume-button"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : currentVolume > 0.5 ? "🔊" : "🔉"}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : currentVolume}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setCurrentVolume(v);
            if (v > 0 && muted) setMuted(false);
          }}
          className="volume-range"
          aria-label="Volume"
        />
      </div>

      <button className="back-button" onClick={onComplete}>
        but i wanna choose the other
      </button>
    </div>
  );
}
