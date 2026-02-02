import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NightSkyLDR } from '../components/PixelBackgrounds';
import { PixelCharacter } from '../components/PixelCharacter';
import { FlyingPixelEnvelope, FloatingPixelHeart } from '../components/PixelObjects';

export function LDRScene({ onContinue }) {
  const [phase, setPhase] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const timeline = async () => {
      // Phase 0: Intro
      setPhase(0);
      await wait(2000);
      
      // Phase 1: Messages start flying
      setPhase(1);
      await wait(1000);
      
      // Increment messages
      const msgInterval = setInterval(() => {
        setMessageCount(c => c + 1);
      }, 800);
      
      await wait(5000);
      clearInterval(msgInterval);
      
      // Phase 2: They said LDR never works
      setPhase(2);
      await wait(3000);
      
      // Phase 3: But we made it work
      setPhase(3);
      await wait(3000);
      
      // Phase 4: Drunk call story
      setPhase(4);
      await wait(4000);
      
      // Phase 5: The dynamics
      setPhase(5);
      await wait(3000);
      
      setPhase(6);
    };
    
    timeline();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <NightSkyLDR />
      
      {/* Header */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
          <span className="text-white font-bold tracking-widest">KATHMANDU ↔ AUSTIN</span>
        </div>
      </motion.div>
      
      {/* Distance indicator */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-pink-300 text-sm">8,500+ miles apart</span>
      </motion.div>
      
      {/* Left city - Her (Kathmandu) */}
      <div className="absolute bottom-32 left-[15%]">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <PixelCharacter 
            character="girl"
            state={phase >= 1 ? 'wave' : 'idle'}
            direction="right"
            scale={3}
          />
        </motion.div>
        <motion.div 
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-pink-300 text-xs bg-black/50 px-2 py-1 rounded">🇳🇵 Monal</span>
        </motion.div>
        
        {/* Phone in hand effect */}
        {phase >= 1 && (
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-2xl">📱</span>
          </motion.div>
        )}
      </div>
      
      {/* Right city - Him (Austin) */}
      <div className="absolute bottom-32 right-[15%]">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          <PixelCharacter 
            character="boy"
            state={phase >= 1 ? 'wave' : 'idle'}
            direction="left"
            scale={3}
          />
        </motion.div>
        <motion.div 
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-blue-300 text-xs bg-black/50 px-2 py-1 rounded">🇺🇸 Koshish</span>
        </motion.div>
        
        {/* Phone in hand effect */}
        {phase >= 1 && (
          <motion.div
            className="absolute -top-4 -left-4"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-2xl">📱</span>
          </motion.div>
        )}
      </div>
      
      {/* Flying messages between them */}
      {phase >= 1 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <FlyingPixelEnvelope
              key={`left-${i}`}
              from={{ x: window.innerWidth * 0.2, y: 50 }}
              to={{ x: window.innerWidth * 0.8, y: 50 }}
              delay={i * 1.2}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <FlyingPixelEnvelope
              key={`right-${i}`}
              from={{ x: window.innerWidth * 0.8, y: 45 }}
              to={{ x: window.innerWidth * 0.2, y: 45 }}
              delay={i * 1.2 + 0.6}
            />
          ))}
        </div>
      )}
      
      {/* Floating hearts */}
      {phase >= 1 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <FloatingPixelHeart key={i} delay={i * 0.5} x={20 + i * 8} />
          ))}
        </div>
      )}
      
      {/* Connection line */}
      {phase >= 1 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '45%' }}>
          <motion.line
            x1="20%"
            y1="0"
            x2="80%"
            y2="0"
            stroke="#FF69B4"
            strokeWidth="2"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
      )}
      
      {/* Drunk call popup */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-2xl p-6 max-w-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🍷</span>
              <span className="text-4xl">📞</span>
            </div>
            <p className="text-white text-sm">
              Drunk calling Monal at 2am to convince her to book a flight to Austin...
            </p>
            <p className="text-pink-300 text-xs mt-2">Almost bought surprise tickets too!</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Dynamics badges */}
      <AnimatePresence>
        {phase === 5 && (
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-blue-500/30 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/50">
              <span className="text-blue-200">🏃 The impatient one</span>
            </div>
            <span className="text-pink-400 text-2xl">♥</span>
            <div className="bg-pink-500/30 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-400/50">
              <span className="text-pink-200">🧘‍♀️ The collected one</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Story text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <StoryText key="p0">Right person. Right time. Just 8,500 miles apart.</StoryText>
          )}
          {phase === 1 && (
            <StoryText key="p1">Messages flying across timezones...</StoryText>
          )}
          {phase === 2 && (
            <StoryText key="p2">"LDR never works" they said. "It's too hard."</StoryText>
          )}
          {phase === 3 && (
            <StoryText key="p3">But you made it so easy for us 💕</StoryText>
          )}
          {phase === 4 && (
            <StoryText key="p4">Even if I got a little... impatient sometimes 😅</StoryText>
          )}
          {phase === 5 && (
            <StoryText key="p5">Our perfect balance</StoryText>
          )}
        </AnimatePresence>
      </div>
      
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
            Nepal 2023 →
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
