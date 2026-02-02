import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CONFETTI_COLORS = [
  '#FF69B4', // Pink warm
  '#FFB6C1', // Pink soft
  '#FF1493', // Pink deep
  '#FFD700', // Gold
  '#FFF5EE', // Cream
  '#FF85A2', // Light pink
];

function ConfettiPiece({ delay, startX, color }) {
  const randomRotation = Math.random() * 720 - 360;
  const randomX = (Math.random() - 0.5) * 200;
  const duration = Math.random() * 2 + 3;
  
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-sm"
      style={{
        backgroundColor: color,
        left: startX,
        top: -20,
      }}
      initial={{ opacity: 0, y: -20, rotate: 0, x: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, window.innerHeight + 100],
        rotate: [0, randomRotation],
        x: [0, randomX],
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
}

export function ConfettiBurst({ isActive }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (isActive) {
      const newPieces = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        delay: Math.random() * 0.5,
        startX: `${Math.random() * 100}%`,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      }));
      setPieces(newPieces);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          delay={piece.delay}
          startX={piece.startX}
          color={piece.color}
        />
      ))}
    </div>
  );
}

export function HeartBurst({ isActive }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (isActive) {
      const newHearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 0.3,
        startX: 50 + (Math.random() - 0.5) * 20,
        startY: 50,
        size: Math.random() * 20 + 15,
      }));
      setHearts(newHearts);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.startX}%`,
            top: `${heart.startY}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0],
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300 - 100,
          }}
          transition={{
            duration: 1.5,
            delay: heart.delay,
            ease: "easeOut",
          }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="#FF69B4">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
