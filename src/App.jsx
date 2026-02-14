import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import SecondPage from './components/SecondPage';
import DragStage from './components/DragPage';
import SongPage from './components/SongPage';
import RosePage from './components/RosePage';

function App() {
  const [stage, setStage] = useState(1); 

  const nextStage = () => {
    setStage((prev) => prev + 1);
  };

  const toStep = (step) =>{
    setStage(step)
  }
  return (
   <div className="scrapbook-main-container">
      <div className="content-layer">
         {stage === 1 && (
          <DragStage onComplete={nextStage} />
        )}
        {stage === 2 && (
          <LandingPage onComplete={nextStage} />
        )}
        
        {stage === 3 && (
          <SecondPage onSong={()=>toStep(4)} onRose={()=> toStep(5)}/>
        )}
        {stage === 4 && (
          <SongPage onComplete={() => toStep(3)}/>
        )}
        {stage === 5 && (
          <RosePage onComplete={() => toStep(3)} />
        )}
      </div>
    </div>
  );
}

export default App;