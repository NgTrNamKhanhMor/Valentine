import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import SecondPage from './components/SecondPage';
import DragStage from './components/DragPage';

function App() {
  // Use numbers: 1 = Landing, 2 = Poem, 3 = Drag Game
  const [stage, setStage] = useState(1); 

  const nextStage = () => {
    setStage((prev) => prev + 1);
  };

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
          <SecondPage onComplete={nextStage} />
        )}
        {stage === 4 && (
          <div className="final-screen">Final Surprise Here!</div>
        )}
      </div>
    </div>
  );
}

export default App;