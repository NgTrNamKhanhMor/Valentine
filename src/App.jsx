import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import SecondPage from './components/SecondPage';
import DragStage from './components/DragPage';
import SongPage from './components/SongPage';

function App() {
  // Use numbers: 1 = Landing, 2 = Poem, 3 = Drag Game
  const [stage, setStage] = useState(3); 

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
          <SongPage onComplete={()=>{}}/>
        )}
      </div>
    </div>
  );
}

export default App;