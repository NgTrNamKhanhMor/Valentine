import backgroundImage from "../assets/pattern-bg.png";
import "../styles/second.css";

const poemLines = [
  "Take all my loves, my love, yea, take them all;",
  "What hast thou then more than thou hadst before?",
  "No love, my love, that thou mayst true love call—",
  "All mine was thine before thou hadst this more.",
];
const LINE_DURATION = 2; // seconds it takes to type one line
const LINE_GAP = 0.5; // pause between lines

export default function SecondPage() {
  return (
    <div
      className="scrapbook-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="poem-paper">
        {poemLines.map((line, index) => {
          const delay = index * (LINE_DURATION + LINE_GAP);

          return (
            <div key={index} className="poem-line">
              <span
                className="typewriter-text"
                style={{
                  animationDuration: `${LINE_DURATION}s`,
                  animationDelay: `${delay}s`,
                  width: "0",
                  animationFillMode: "forwards",
                }}
              >
                {line}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
