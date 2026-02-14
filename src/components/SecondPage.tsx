import { motion } from "framer-motion";
import "../styles/second.css";

// Assets
import scrollBg from "../assets/scroll-bg.png";
import poemBg from "../assets/poem-bg.png";
import chooseBg from "../assets/choose-bg.png";
import butterfly from "../assets/butterfly.png";
import vinylImg from "../assets/vinyl.png";
import flowerImg from "../assets/paper-rose.png";
import flowersSticker from "../assets/flower-2.png";
import lineWithPic from "../assets/line-with-pic.png";
import flowersSticker2 from "../assets/flower-3.png";
import pinkFlower from "../assets/pink-flower.png";
import line from "../assets/line.png";

const poemLines = [
  "Happy Valentine my sweet mango,",
  "I know being in a LDR hasn't been easy for the both of us, we're in a relationship yet at times it can feels so lonely. But I don't want you to miss out on it just because of our distance , so I decided to make this little present for you. I know its not much, and it can't never replace the time that we could've been together, but I hope that this will makes you feel loved no matter how little.",
  "You deserve all the love I could give, my bby Mango.",
];

interface Props {
  onSong: () => void;
  onRose: () => void;
}

export default function SecondPage({ onSong, onRose }: Props) {
  return (
    <div className="second-page-scroll-container">
      <section
        className="section-poem"
        style={{ backgroundImage: `url(${poemBg})` }}
      >
        <div className="decoration-layer">
          <img src={line} className="line" alt="line" />
          <img src={lineWithPic} className="line-across" alt="flowers" />
        </div>
        <motion.img
          src={pinkFlower}
          className="pink-flower"
          alt="flower-decoration"
          animate={{
            rotate: [-5, 5, -5], // Gentle swaying
            scale: [1, 1.05, 1], // Subtle breathing/pulse
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <img src={flowersSticker} className="flower-fixed-left" alt="flowers" />
        <img
          src={flowersSticker2}
          className="flower-fixed-right"
          alt="flowers"
        />
        <motion.div
          className="poem-paper"
          style={{ backgroundImage: `url(${scrollBg})` }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {poemLines.map((line, index) => (
            <motion.div
              key={index}
              className="poem-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.4, duration: 0.8 }}
            >
              {line}
            </motion.div>
          ))}
        </motion.div>

        <motion.img
          src={butterfly}
          className="butterfly-overlay"
          alt="butterfly"
          animate={{
            // Flying around in a small erratic circle/path
            x: [0, 40, -30, 20, 0],
            y: [0, -50, -20, -60, 0],
            rotate: [15, 5, 25, 10, 15],
            // Wing flapping
            scaleX: [1, 0.3, 1],
          }}
          transition={{
            // The flight path duration
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            // The flap duration (must be much faster)
            scaleX: {
              duration: 0.6,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      </section>

      {/* SECTION 2: PICK ONE */}
      <section
        className="section-pick"
        style={{ backgroundImage: `url(${chooseBg})` }}
      >
        <div className="pick-content">
          <div className="pick-one-header">
            <h2 className="pick-title">Pick one</h2>
          </div>

          <div className="choices-grid">
            <motion.div
              className="choice-card"
              whileHover={{ scale: 1.1 }}
              onClick={onSong}
            >
              <motion.img
                src={vinylImg}
                alt="Vinyl"
                className="choice-img"
                /* Continuous spin */
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "linear",
                }}
              />
              <p className="choice-text">Vintage Vinyl</p>
            </motion.div>

            <motion.div
              className="choice-card"
              /* Emphasize on hover: slightly bigger and a gentle tilt */
              whileHover={{
                scale: 1.15,
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                rotate: { duration: 0.5, repeat: Infinity },
              }}
              onClick={onRose}
            >
              <motion.img
                src={flowerImg}
                alt="Flower"
                className="choice-img"
                /* Idle emphasize: gentle breathing */
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <p className="choice-text">Paper Rose</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
