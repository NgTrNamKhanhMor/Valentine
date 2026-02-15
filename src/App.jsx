import { useState, useRef, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import SecondPage from './components/SecondPage';
import DragStage from './components/DragPage';
import dragMusic from './assets/dragmusic.mp3';
import SongPage from './components/SongPage';
import RosePage from './components/RosePage';


function App() {
  const [stage, setStage] = useState(1);
  const audioRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);

  // Play music after first user click
  useEffect(() => {
    if (!musicStarted && (stage === 1 || stage === 2 || stage === 3)) {
      const handleUserInteraction = () => {
        if (audioRef.current) {
          audioRef.current.volume = 0.25;
          audioRef.current.loop = true;
          audioRef.current.play().then(() => setMusicStarted(true)).catch(() => {});
        }
        window.removeEventListener('pointerdown', handleUserInteraction);
      };
      window.addEventListener('pointerdown', handleUserInteraction);
      return () => window.removeEventListener('pointerdown', handleUserInteraction);
    }
    // Pause music if leaving these pages
    if (!(stage === 1 || stage === 2 || stage === 3) && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setMusicStarted(false);
    }
  }, [stage, musicStarted]);

  const nextStage = () => {
    setStage((prev) => prev + 1);
  };

  const toStep = (step) => {
    setStage(step);
  };

  return (
    <div className="scrapbook-main-container">
      {/* Global audio element, hidden */}
      <audio ref={audioRef} src={dragMusic} style={{ display: 'none' }} preload="auto" />
      <div className="content-layer">
        {stage === 1 && <DragStage onComplete={nextStage} />}
        {stage === 2 && <LandingPage onComplete={nextStage} />}
        {stage === 3 && <SecondPage onSong={() => toStep(4)} onRose={() => toStep(5)} />}
        {stage === 4 && <SongPage onComplete={() => toStep(3)} />}
        {stage === 5 && <RosePage onComplete={() => toStep(3)} />}
      </div>
    </div>
  );
}

export default App;