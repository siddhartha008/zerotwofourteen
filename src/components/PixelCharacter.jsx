import { motion } from 'framer-motion';

// Character using custom images from public folder
export function PixelCharacter({
  character = 'boy',
  state = 'idle', // 'idle', 'walk', 'wave', 'hug'
  direction = 'right',
  scale = 1,
  className = "",
  style = {},
}) {
  const isGirl = character === 'girl';
  const flipX = direction === 'left' ? -1 : 1;

  // Use custom images from public folder
  const imageSrc = isGirl ? '/her.png' : '/him.png';

  return (
    <motion.div
      className={`${className}`}
      style={{
        transform: `scaleX(${flipX}) scale(${scale})`,
        ...style
      }}
      animate={{
        y: state === 'walk' ? [0, -4, 0, -4] : [0, -1, 0],
      }}
      transition={{
        duration: state === 'walk' ? 0.3 : 2,
        repeat: Infinity,
        ease: state === 'walk' ? "linear" : "easeInOut"
      }}
    >
      <img
        src={imageSrc}
        alt={isGirl ? "Her" : "Him"}
        style={{
          width: '120px',
          height: 'auto',
          imageRendering: 'pixelated',
        }}
      />
    </motion.div>
  );
}

// Outro kissing image
export function HuggingCouple({ scale = 1 }) {
  return (
    <motion.div
      className="relative flex items-end justify-center"
      style={{ transform: `scale(${scale})` }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.img
        src="/kissing.png"
        alt="Kissing"
        style={{
          width: '560px',
          height: 'auto',
          imageRendering: 'pixelated',
        }}
      />
    </motion.div>
  );
}
