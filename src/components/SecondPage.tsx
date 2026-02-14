import { motion } from "framer-motion";
import "../styles/second.css";

// Assets
import scrollBg from "../assets/scroll-bg.png";
import poemBg from "../assets/poem-bg.png";
import chooseBg from "../assets/choose-bg.png";
import butterfly from "../assets/butterfly.png";
import vinylImg from "../assets/vinyl.png";
import flowerImg from "../assets/paper-rose.png";
import pickImg from "../assets/pick.png";
import flowersSticker from "../assets/flower-2.png";
import flowersSticker2 from "../assets/flower-3.png";
import pinkFlower from "../assets/pink-flower.png";

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
        <img
          src={flowersSticker2}
          className="flower-fixed-right"
          alt="flowers"
        />
        <img
          src={scrollBg}
          className="poem-paper"
          alt="poem-paper"
          style={{ width: '40vw', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        />

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
            <img src={pickImg} alt="Pick one" className="pick-title" loading="lazy" />
          </div>

          <div className="choices-grid">
            <motion.div
              className="choice-card vinyl-choice"
              whileHover={{ scale: 1.1 }}
              onClick={onSong}
            >
              <motion.img
                src={vinylImg}
                alt="Vinyl"
                className="choice-img"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 16,
                  ease: "linear",
                }}
              />
              <p className="choice-text">Vintage Vinyl</p>
            </motion.div>

            <motion.div
              className="choice-card flower-choice"
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
