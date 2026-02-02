import { motion } from 'framer-motion';
import { envelopeVariants } from '../animations/variants';

export function Envelope({ size = 60, className = "" }) {
  return (
    <motion.div
      className={`relative ${className}`}
      variants={envelopeVariants}
      initial="initial"
      animate={["animate", "float"]}
    >
      <svg width={size} height={size * 0.75} viewBox="0 0 80 60">
        {/* Envelope body */}
        <rect 
          x="5" y="10" 
          width="70" height="45" 
          rx="4"
          fill="#FFF5EE"
          stroke="#FFB6C1"
          strokeWidth="2"
        />
        {/* Envelope flap */}
        <path 
          d="M 5 14 L 40 35 L 75 14" 
          fill="none"
          stroke="#FFB6C1"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Heart seal */}
        <circle cx="40" cy="25" r="8" fill="#FF69B4" />
        <path 
          d="M40 29l-1-0.9C36.6 26.1 35 24.6 35 22.8c0-1.5 1.2-2.8 2.8-2.8.9 0 1.7.4 2.2 1 .5-.6 1.3-1 2.2-1 1.5 0 2.8 1.2 2.8 2.8 0 1.8-1.6 3.3-4 5.3L40 29z"
          fill="white"
        />
      </svg>
    </motion.div>
  );
}

export function FlyingEnvelope({ delay = 0, startX = 0, endX = 100 }) {
  return (
    <motion.div
      className="absolute"
      initial={{ x: startX, y: 0, opacity: 0, rotate: -15 }}
      animate={{
        x: [startX, endX],
        y: [0, -20, 0, -10, 0],
        opacity: [0, 1, 1, 1, 0],
        rotate: [-15, 5, -10, 5, -15],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
    >
      <Envelope size={40} />
    </motion.div>
  );
}
