import "../styles/background-layout.css";
import brownBackground from "../assets/big-bg.png";

const BackgroundLayout = ({ children }) => {
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