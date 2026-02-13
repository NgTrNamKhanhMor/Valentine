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
import flowersSticker2 from "../assets/flower-3.png";

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

        <img src={butterfly} className="butterfly-overlay" alt="butterfly" />

        <div className="scroll-hint">Scroll down to pick ⏷</div>
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
              <img src={vinylImg} alt="Vinyl" className="choice-img" />
              <p className="choice-text">Vintage Vinyl</p>
            </motion.div>

            <motion.div
              className="choice-card"
              whileHover={{ scale: 1.1 }}
              onClick={onRose}
            >
              <img src={flowerImg} alt="Flower" className="choice-img" />
              <p className="choice-text">Paper Rose</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
