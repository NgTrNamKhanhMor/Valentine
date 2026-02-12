import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import SecondPage from './components/SecondPage';

function App() {
  const [stage, setStage] = useState('landing'); 

  // High-level function to move between scenes
  const nextStage = (next) => {
    setStage(next);
  };
  console.log(stage)
  return (
   <div className="scrapbook-main-container">
      <div className="background-layer" />

      {/* Stage Controller */}
      <div className="content-layer">
        {stage === 'landing' && (
          <LandingPage onComplete={() => nextStage('poem')} />
        )}
        
        {stage === 'poem' && (
          <SecondPage onComplete={() => nextStage('next_feature_here')} />
        )}
        
        {/* ADD MORE STAGES HERE LATER */}
      </div>
    </div>
  );
}

export default App;