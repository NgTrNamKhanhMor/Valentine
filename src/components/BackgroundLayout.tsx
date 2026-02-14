import "../styles/background-layout.css";
import brownBackground from "../assets/big-bg.png";
import { ReactNode } from "react";

const BackgroundLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="scrapbook-root">
      <div className="main-board" style={{ backgroundImage: `url(${brownBackground})` }}>
        <div className="stage-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackgroundLayout;