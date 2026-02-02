import { motion } from 'framer-motion';

export function MusicNote({ className = "", delay = 0 }) {
  return (
    <motion.div
      className={`text-pink-soft/60 ${className}`}
      initial={{ opacity: 0, y: 20, x: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [20, -40],
        x: [0, Math.random() * 30 - 15],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      ♪
    </motion.div>
  );
}

export function FloatingMusicNotes({ count = 5, className = "" }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <MusicNote 
          key={i} 
          delay={i * 0.5}
          className="absolute text-2xl"
        />
      ))}
    </div>
  );
}
