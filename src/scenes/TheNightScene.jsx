import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RomanticNightScene } from '../components/PixelBackgrounds';
import { PixelCharacter } from '../components/PixelCharacter';
import { PixelMusicNotes, FloatingPixelHeart } from '../components/PixelObjects';

export function TheNightScene({ onContinue }) {
  const [phase, setPhase] = useState(0);
  const [boyX, setBoyX] = useState(35);
  const [girlX, setGirlX] = useState(65);
  const [dancing, setDancing] = useState(false);

  useEffect(() => {
    const timeline = async () => {
      // Phase 0: Setup
      setPhase(0);
      await wait(2000);
      
      // Phase 1: Music starts
      setPhase(1);
      await wait(2000);
      
      // Phase 2: They come together
      setPhase(2);
      animateValue(35, 45, 1500, setBoyX);
      animateValue(65, 55, 1500, setGirlX);
      await wait(1500);
      
      // Phase 3: Dancing
      setPhase(3);
      setDancing(true);
      await wait(4000);
      
      // Phase 4: Her words
      setPhase(4);
      await wait(5000);
      
      // Phase 5: Falling in love again
      setPhase(5);
      await wait(4000);
      
      setPhase(6);
    };
    
    timeline();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <RomanticNightScene />
      
      {/* Music player UI */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-2xl border border-pink-500/30">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
              animate={{ rotate: phase >= 1 ? 360 : 0 }}
              transition={{ duration: 3, repeat: phase >= 1 ? Infinity : 0, ease: "linear" }}
            >
              <span className="text-xl">🎵</span>
            </motion.div>
            <div>
              <p className="text-white font-bold text-sm">Irresistible</p>
              <p className="text-pink-300 text-xs">One Direction</p>
            </div>
            {phase >= 1 && (
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-pink-400 rounded-full"
                    animate={{ height: [8, 20, 8] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Stage/Dance floor spotlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64">
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-pink-500/20 via-transparent to-transparent rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      {/* Boy character */}
      <motion.div
        className="absolute bottom-28"
        style={{ left: `${boyX}%`, transform: 'translateX(-50%)' }}
        animate={dancing ? {
          y: [0, -10, 0],
          rotate: [-3, 3, -3],
        } : {}}
        transition={{ duration: 1, repeat: dancing ? Infinity : 0 }}
      >
        <PixelCharacter 
          character="boy"
          state={dancing ? 'happy' : 'idle'}
          direction="right"
          scale={3}
        />
      </motion.div>
      
      {/* Girl character */}
      <motion.div
        className="absolute bottom-28"
        style={{ left: `${girlX}%`, transform: 'translateX(-50%)' }}
        animate={dancing ? {
          y: [0, -10, 0],
          rotate: [3, -3, 3],
        } : {}}
        transition={{ duration: 1, repeat: dancing ? Infinity : 0, delay: 0.5 }}
      >
        <PixelCharacter 
          character="girl"
          state={dancing ? 'happy' : 'idle'}
          direction="left"
          scale={3}
        />
        
        {/* Her words speech bubble */}
        <AnimatePresence>
          {phase === 4 && (
            <motion.div
              className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-pink-500 text-white px-4 py-3 rounded-2xl shadow-lg shadow-pink-500/50 max-w-[200px]">
                <p className="text-sm font-medium text-center">
                  "I want to protect you from whatever comes in your way"
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-pink-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Heart between them when dancing */}
      {dancing && (
        <motion.div
          className="absolute bottom-44 left-1/2 -translate-x-1/2"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -10, 0],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-4xl">💕</span>
        </motion.div>
      )}
      
      {/* Music notes floating */}
      {phase >= 1 && (
        <>
          <PixelMusicNotes className="left-[30%] bottom-48" />
          <PixelMusicNotes className="right-[30%] bottom-52" />
        </>
      )}
      
      {/* Floating hearts around them */}
      {phase >= 3 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <FloatingPixelHeart key={i} delay={i * 0.4} x={35 + i * 3} />
          ))}
        </div>
      )}
      
      {/* Story text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <StoryText key="p0">The night everything changed...</StoryText>
          )}
          {phase === 1 && (
            <StoryText key="p1">🎵 Irresistible started playing...</StoryText>
          )}
          {phase === 2 && (
            <StoryText key="p2">We started dancing together</StoryText>
          )}
          {phase === 3 && (
            <StoryText key="p3">And in that moment...</StoryText>
          )}
          {phase === 4 && (
            <StoryText key="p4">She said the words that changed everything</StoryText>
          )}
          {phase === 5 && (
            <StoryText key="p5">I fell in love with you ALL OVER AGAIN 💕</StoryText>
          )}
        </AnimatePresence>
      </div>
      
      {/* Sparkle explosion during her words */}
      {phase === 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pink-400 rounded-full"
              style={{
                left: '50%',
                top: '40%',
              }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 300,
                opacity: [1, 0],
                scale: [0, 1.5],
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Continue button */}
      <AnimatePresence>
        {phase >= 6 && (
          <motion.button
            className="absolute bottom-24 left-1/2 -translate-x-1/2 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
          >
            Our future... →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function StoryText({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-black/60 backdrop-blur-sm px-8 py-4 rounded-2xl inline-block"
    >
      <p className="text-white text-lg md:text-xl">{children}</p>
    </motion.div>
  );
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function animateValue(from, to, duration, setter) {
  const start = performance.now();
  const animate = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = easeInOutQuad(progress);
    setter(from + (to - from) * eased);
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
