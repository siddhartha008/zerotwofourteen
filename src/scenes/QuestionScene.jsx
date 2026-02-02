import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelCharacter } from '../components/PixelCharacter';
import { FloatingPixelHeart } from '../components/PixelObjects';

export function QuestionScene({ onYes }) {
  const [noHovered, setNoHovered] = useState(false);
  const [yesHovered, setYesHovered] = useState(false);
  const [noTransformed, setNoTransformed] = useState(false);
  const [boyState, setBoyState] = useState('idle');

  const handleNoHover = () => {
    if (!noTransformed) {
      setNoHovered(true);
      setNoTransformed(true);
    }
  };

  const handleYesHover = () => {
    setYesHovered(true);
    setBoyState('happy');
  };

  const handleYesLeave = () => {
    setYesHovered(false);
    setBoyState('idle');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Romantic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2a] via-[#2a1a3a] to-[#3a1a4a]" />
      
      {/* Stars */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
      
      {/* Ambient glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-pink-500/20 blur-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <FloatingPixelHeart key={i} delay={i * 0.4} x={5 + i * 8} />
        ))}
      </div>
      
      {/* Boy character - kneeling/proposing style */}
      <motion.div
        className="absolute bottom-48 left-1/2 -translate-x-1/2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <PixelCharacter character="boy" state={boyState} direction="right" scale={4} />
        </motion.div>
        
        {/* Heart offering */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2"
          animate={{ 
            scale: [1, 1.2, 1],
            y: [0, -10, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-5xl">💝</span>
        </motion.div>
      </motion.div>
      
      {/* Main question */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          style={{ textShadow: '0 0 30px rgba(255,105,180,0.5)' }}
        >
          Will you be my
        </motion.h1>
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-pink-400"
          style={{ textShadow: '0 0 40px rgba(255,105,180,0.8)' }}
          animate={{ 
            textShadow: [
              '0 0 40px rgba(255,105,180,0.5)',
              '0 0 60px rgba(255,105,180,0.8)',
              '0 0 40px rgba(255,105,180,0.5)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Valentine?
        </motion.h1>
      </motion.div>
      
      {/* Buttons */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        {/* YES Button */}
        <motion.button
          className={`relative px-12 py-4 text-xl font-bold rounded-full shadow-lg overflow-hidden transition-all duration-300 ${
            yesHovered 
              ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-pink-500/50' 
              : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-pink-500/30'
          }`}
          onMouseEnter={handleYesHover}
          onMouseLeave={handleYesLeave}
          onClick={onYes}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={yesHovered ? 'hover' : 'default'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {yesHovered ? 'OMG YAY! 💕' : 'YES'}
            </motion.span>
          </AnimatePresence>
          
          {/* Sparkles on hover */}
          {yesHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          )}
        </motion.button>
        
        {/* NO Button - transforms to YES */}
        <motion.button
          className={`px-12 py-4 text-xl font-bold rounded-full border-2 transition-all duration-500 ${
            noTransformed
              ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white border-transparent shadow-lg shadow-pink-500/30'
              : 'bg-transparent text-pink-400 border-pink-400 hover:bg-pink-500/10'
          }`}
          onMouseEnter={handleNoHover}
          onClick={noTransformed ? onYes : undefined}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            key={noTransformed ? 'yes' : 'no'}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {noTransformed ? 'YES' : 'NO'}
          </motion.span>
        </motion.button>
      </motion.div>
      
      {/* Hint */}
      <motion.p
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-pink-300/60 text-sm italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        (Like you even have a choice at this point... 😏)
      </motion.p>
      
      {/* Decorative hearts ring around question */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 200;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: Math.cos(angle) * radius,
                top: Math.sin(angle) * radius + 100,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            >
              <span className="text-2xl">💕</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
