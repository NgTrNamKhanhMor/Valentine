import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import "../styles/drag.css";
import paper from "../assets/paper-1.png";
import catGif1 from "../assets/blue-cat-1.png"; // First pic
import catGif2 from "../assets/blue-cat-2.png"; // Second pic
import catGif3 from "../assets/blue-cat-3.png"; // Third picimport donut from '../assets/donut.png';
import donut from "../assets/donut.png";
import icecream from "../assets/icecream.png";
import catSmall from "../assets/pink-cat.png";
import BackgroundLayout from "./BackgroundLayout";

interface Item {
  id: string;
  img: string;
  x: string;
  y: string;
  fed: boolean;
}

interface Props {
  onComplete: () => void;
}

export default function DragStage({ onComplete }: Props) {
  // For random hearts in valentine state
  const [hearts, setHearts] = useState<{ x: number; y: number; id: number }[]>([]);
  const constraintsRef = useRef(null);
  const [gameStep, setGameStep] = useState<
    "start" | "playing" | "celebrating" | "valentine"
  >("start");
  const [catImage, setCatImage] = useState(catGif1);
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [catScale, setCatScale] = useState(1);
  const [items, setItems] = useState<Item[]>([
    { id: "donut", img: donut, x: "75%", y: "13%", fed: false },
    { id: "icecream", img: icecream, x: "75%", y: "69%", fed: false },
    { id: "pinkcat", img: catSmall, x: "10%", y: "50%", fed: false },
  ]);

  const allFed = items.every((item) => item.fed);

  // Step 3 & 4: Sequence after feeding
  useEffect(() => {
    if (allFed && gameStep === "playing") {
      const runSequence = async () => {
        setGameStep("celebrating");
        setCatImage(catGif2); // Image 2

        // Wait 2-3 seconds for user to read the "Congrat" message
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setCatImage(catGif3); // Image 3
        setGameStep("valentine");
      };
      runSequence();
    }
  }, [allFed, gameStep]);

  const handleNoClick = () => {
    setNoButtonScale((prev) => Math.max(0, prev - 0.2));
  };

  const handleDragEnd = (_: any, info: PanInfo, id: string) => {
    if (gameStep !== "playing") return;

    const dropX = info.point.x;
    const dropY = info.point.y;
    const catZoneElement = document.querySelector(".cat-zone");
    if (!catZoneElement) return;

    const catZone = catZoneElement.getBoundingClientRect();

    if (
      dropX > catZone.left &&
      dropX < catZone.right &&
      dropY > catZone.top &&
      dropY < catZone.bottom
    ) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, fed: true } : item)),
      );
      setCatScale(1.2);
      setTimeout(() => setCatScale(1), 200);

      if (id === "pinkcat") {
        // Immediately celebrate when pinkcat is fed
        setGameStep("celebrating");
        setCatImage(catGif2); // Image 2
        setTimeout(() => {
          setCatImage(catGif3); // Image 3
          setGameStep("valentine");
        }, 3000);
      }
    }
  };

  // Generate random hearts when entering valentine state
  useEffect(() => {
    if (gameStep === "valentine") {
      const count = Math.floor(Math.random() * 30) + 36; // 10-20
      const newHearts = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 90, // percent of vw
        y: Math.random() * 80, // percent of vh
      }));
      setHearts(newHearts);
    }
  }, [gameStep]);

  return (
    <BackgroundLayout>
      <div className="drag-area" ref={constraintsRef}>
        {/* The Cat Image */}
        <div className={`cat-zone ${gameStep !== "playing" ? "start" : ""}`}>
          <motion.img
            key={catImage}
            src={catImage}
            animate={{ scale: catScale }}
            transition={{ type: "spring", stiffness: 300 }}
            className="main-cat"
          />
        </div>

        {/* Text and Button UI Overlay */}
        <div className={`ui-overlay ${gameStep === "valentine" ? "end" : ""}`}>
          {gameStep === "start" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="step-ui"
            >
              <h2 className="nub-text">Hungry Nub</h2>
              <button
                className="play-btn-container"
                onClick={() => setGameStep("playing")}
              >
                <img src={paper} alt="Play" className="play-button-bg" loading="lazy" />
                <span className="play-btn-text">Play</span>
              </button>
            </motion.div>
          )}

          {gameStep === "playing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="step-ui"
            >
              <h2 className="nub-text">Feed Nub</h2>
            </motion.div>
          )}

          {gameStep === "celebrating" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="step-ui"
            >
              <h2 className="congrat-text">
                Congrat! You found out what nub want to eat the most!
              </h2>
            </motion.div>
          )}

          {gameStep === "valentine" && (
            <>
              {hearts.map((heart) => (
                <motion.span
                  key={heart.id}
                  className="floating-heart"
                  initial={{
                    y: "100vh",
                    opacity: 0,
                  }}
                    animate={{
                      y: `-${5 + Math.random() * 10}vh`,
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 1.2,
                      repeat: Infinity,
                      delay: 0,
                      times: [0, 0.2, 0.7, 1], // fade out slower at the end
                    }}
                  style={{
                    position: "fixed",
                    left: `${heart.x}vw`,
                    top: `${heart.y}vh`,
                    fontSize: `${1.5 + Math.random()*5}rem`,
                    pointerEvents: "none",
                  }}
                >
                  ❤️
                </motion.span>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="step-ui"
              >
                <h2 className="valentine-text">
                  Will you be the pink Nub for my Valentine?
                </h2>
                <div className="button-group">
                  <button className="btn yes-btn" onClick={onComplete}>
                    Yes
                  </button>
                  <AnimatePresence>
                    {noButtonScale > 0 && (
                      <motion.button
                        className="btn no-btn"
                        animate={{ scale: noButtonScale }}
                        onClick={handleNoClick}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        No
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Draggable Items (Only visible during 'playing') */}
        <AnimatePresence>
          {gameStep === "playing" &&
            items.map(
              (item) =>
                !item.fed && (
                  <motion.img
                    key={item.id}
                    src={item.img}
                    drag
                    dragConstraints={constraintsRef}
                    style={{ position: "absolute", left: item.x, top: item.y }}
                    onDragEnd={(e, info) => handleDragEnd(e, info, item.id)}
                    whileDrag={{ scale: 1.1, zIndex: 100 }}
                    className="draggable-item"
                    exit={{ scale: 0, opacity: 0 }}
                    loading="lazy"
                  />
                ),
            )}
        </AnimatePresence>
      </div>
    </BackgroundLayout>
  );
}
