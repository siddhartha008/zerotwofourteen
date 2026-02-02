import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { yesButtonVariants, buttonVariants } from '../animations/variants';
import { TEXTS } from '../constants/texts';

export function YesButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="relative px-12 py-4 bg-gradient-to-r from-pink-warm to-pink-deep text-white text-xl font-semibold rounded-full shadow-lg overflow-hidden"
      variants={yesButtonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isHovered ? 'hover' : 'default'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {isHovered ? TEXTS.question.buttons.yesHover : TEXTS.question.buttons.yes}
        </motion.span>
      </AnimatePresence>
      
      {/* Sparkle effects on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  );
}

export function NoButton() {
  const [text, setText] = useState(TEXTS.question.buttons.no);
  const [hasTransformed, setHasTransformed] = useState(false);

  const handleHover = () => {
    if (!hasTransformed) {
      setText(TEXTS.question.buttons.yes);
      setHasTransformed(true);
    }
  };

  return (
    <motion.button
      className={`px-12 py-4 text-xl font-semibold rounded-full border-2 transition-all duration-500 ${
        hasTransformed
          ? 'bg-gradient-to-r from-pink-warm to-pink-deep text-white border-transparent shadow-lg'
          : 'bg-transparent text-pink-warm border-pink-warm hover:bg-pink-soft/20'
      }`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={handleHover}
    >
      <motion.span
        key={text}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="block"
      >
        {text}
      </motion.span>
    </motion.button>
  );
}
