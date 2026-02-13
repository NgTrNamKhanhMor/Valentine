import "../styles/background-layout.css";
import cornerImg from "../assets/map-background.png";
import rippedPaper from "../assets/brown-paper.png"; // Your ripped texture
import brownBackground from "../assets/brown-background.png";

const BackgroundLayout = ({ children }) => {
  return (
    <div className="scrapbook-root">
      {/* Top Left Corner Group */}
      <div className="corner-group tl">
        <img src={cornerImg} className="map-layer" alt="" />
        <img src={rippedPaper} className="ripped-layer" alt="" />
      </div>

      {/* Top Right Corner Group */}
      <div className="corner-group tr">
        <img src={cornerImg} className="map-layer" alt="" />
        <img src={rippedPaper} className="ripped-layer" alt="" />
      </div>

      {/* Bottom Left Corner Group */}
      <div className="corner-group bl">
        <img src={cornerImg} className="map-layer" alt="" />
        <img src={rippedPaper} className="ripped-layer" alt="" />
      </div>

      {/* Bottom Right Corner Group */}
      <div className="corner-group br">
        <img src={cornerImg} className="map-layer" alt="" />
        <img src={rippedPaper} className="ripped-layer" alt="" />
      </div>

      <div className="main-board" style={{ backgroundImage: `url(${brownBackground})` }}>
        <div className="stage-content">{children}</div>
      </div>
    </div>
  );
};

export default BackgroundLayout;