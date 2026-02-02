import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelCharacter } from '../components/PixelCharacter';
import { FloatingPixelHeart } from '../components/PixelObjects';

export function FutureScene({ onContinue }) {
  const [phase, setPhase] = useState(0);
  const [visionBoardItems, setVisionBoardItems] = useState([]);

  useEffect(() => {
    const timeline = async () => {
      // Phase 0: Setup
      setPhase(0);
      await wait(2000);
      
      // Phase 1: 2026 - Parents met
      setPhase(1);
      await wait(3000);
      
      // Phase 2: Vision board appears
      setPhase(2);
      // Add vision board items one by one
      for (let i = 0; i < 12; i++) {
        await wait(200);
        setVisionBoardItems(prev => [...prev, i]);
      }
      await wait(2000);
      
      // Phase 3: The trade
      setPhase(3);
      await wait(5000);
      
      // Phase 4: Forever quote
      setPhase(4);
      await wait(4000);
      
      setPhase(5);
    };
    
    timeline();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2a] via-[#2a1a3a] to-[#1a0a2a]" />
      
      {/* Stars */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
      
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <FloatingPixelHeart key={i} delay={i * 0.6} x={10 + i * 9} />
        ))}
      </div>
      
      {/* Header */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
          <span className="text-white font-bold tracking-widest">2026 & BEYOND</span>
        </div>
      </motion.div>
      
      {/* Characters together */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-end gap-2">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <PixelCharacter character="boy" state="happy" direction="right" scale={3} />
        </motion.div>
        
        <motion.div
          className="text-4xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          💕
        </motion.div>
        
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          <PixelCharacter character="girl" state="happy" direction="left" scale={3} />
        </motion.div>
      </div>
      
      {/* Parents met badge */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="absolute top-28 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-pink-400/30">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👨‍👩‍👧</span>
                <span className="text-pink-200">Our parents finally met! 🎉</span>
                <span className="text-2xl">👨‍👩‍👦</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Vision Board */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-center text-pink-300 text-sm mb-4">Our 2023 Vision Board</p>
              
              {/* Grid of goals */}
              <div className="grid grid-cols-4 gap-2 w-64">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-14 h-10 rounded-lg"
                    style={{
                      backgroundColor: visionBoardItems.includes(i)
                        ? ['#FF69B4', '#FFB6C1', '#FF1493', '#FFA07A', '#87CEEB', '#98FB98'][i % 6]
                        : 'transparent',
                      border: '2px dashed rgba(255,255,255,0.2)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: visionBoardItems.includes(i) ? 1 : 0.8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                ))}
              </div>
              
              <motion.p
                className="text-center text-white font-bold mt-4 text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                70+ Goals for 7 Years
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* The trade quote */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-md rounded-3xl p-8 border border-pink-400/40"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(255,105,180,0.2)',
                  '0 0 40px rgba(255,105,180,0.4)',
                  '0 0 20px rgba(255,105,180,0.2)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-white text-xl md:text-2xl leading-relaxed">
                "But Monal, if I could, I would <span className="text-pink-300 font-bold">trade all 70 goals</span> to spend the next <span className="text-pink-300 font-bold">7 lives</span> with you by my side"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Forever quote */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.p
              className="text-pink-300 text-2xl md:text-3xl font-cursive"
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(255,105,180,0.5)',
                  '0 0 20px rgba(255,105,180,0.8)',
                  '0 0 10px rgba(255,105,180,0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              I can't wait to spend the rest of our lives together 💕
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Seven hearts for seven lives */}
      {phase >= 3 && (
        <div className="absolute bottom-48 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(7)].map((_, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15, type: "spring" }}
            >
              ❤️
            </motion.span>
          ))}
        </div>
      )}
      
      {/* Story text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <StoryText key="p0">Looking back at our journey...</StoryText>
          )}
          {phase === 1 && (
            <StoryText key="p1">2026: A huge milestone! 👨‍👩‍👧‍👦</StoryText>
          )}
          {phase === 2 && (
            <StoryText key="p2">Remember our vision board from 2023?</StoryText>
          )}
          {phase === 3 && (
            <StoryText key="p3">Every goal matters, but you matter more</StoryText>
          )}
          {phase === 4 && (
            <StoryText key="p4">Forever yours</StoryText>
          )}
        </AnimatePresence>
      </div>
      
      {/* Continue button */}
      <AnimatePresence>
        {phase >= 5 && (
          <motion.button
            className="absolute bottom-24 left-1/2 -translate-x-1/2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-full shadow-lg shadow-pink-500/30 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
          >
            One question... →
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
