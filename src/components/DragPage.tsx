import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import '../styles/drag.css';
import catGif from '../assets/blue-cat-1.png';
import donut from '../assets/donut.png';
import icecream from '../assets/icecream.png';
import catSmall from '../assets/pink-cat.png';
import BackgroundLayout from './BackgroundLayout';

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
  const constraintsRef = useRef(null); // Reference for the boundary box
  const [items, setItems] = useState<Item[]>([
    { id: 'donut', img: donut, x: '70%', y: '15%', fed: false },
    { id: 'icecream', img: icecream, x: '70%', y: '40%', fed: false },
    { id: 'pinkcat', img: catSmall, x: '70%', y: '65%', fed: false },
  ]);

  const allFed = items.every(item => item.fed);

  useEffect(() => {
    if (allFed) {
      const timer = setTimeout(() => onComplete(), 3000);
      return () => clearTimeout(timer);
    }
  }, [allFed, onComplete]);

  const handleDragEnd = (_: any, info: PanInfo, id: string) => {
    const dropX = info.point.x;
    const dropY = info.point.y;
    const catZoneElement = document.querySelector('.cat-zone');
    if (!catZoneElement) return;

    const catZone = catZoneElement.getBoundingClientRect();

    if (dropX > catZone.left && dropX < catZone.right && dropY > catZone.top && dropY < catZone.bottom) {
      setItems(prev => prev.map(item => item.id === id ? { ...item, fed: true } : item));
    }
  };

  return (
    <BackgroundLayout>
      {/* We attach the Ref here to define the 'playable' area */}
      <div className="drag-area" ref={constraintsRef}>
        <div className="cat-zone">
          <motion.img 
            src={catGif} 
            animate={{ scale: allFed ? 1.4 : 1 }}
            className="main-cat"
          />
        </div>

        <AnimatePresence>
          {items.map((item) => !item.fed && (
            <motion.img
              key={item.id}
              src={item.img}
              drag
              dragConstraints={constraintsRef} 
              dragElastic={0.2} 
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }} 
              style={{ 
                position: 'absolute',
                left: item.x,
                top: item.y
              }}
              onDragEnd={(e, info) => handleDragEnd(e, info, item.id)}
              whileDrag={{ scale: 1.1, zIndex: 100 }}
              className="draggable-item"
              exit={{ scale: 0, opacity: 0 }}
            />
          ))}
        </AnimatePresence>

        {allFed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="success-message">
            <p>Yummy! ❤️</p>
          </motion.div>
        )}
      </div>
    </BackgroundLayout>
  );
}