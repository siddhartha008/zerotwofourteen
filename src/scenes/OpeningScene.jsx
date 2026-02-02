import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SchoolHallway } from '../components/PixelBackgrounds';
import { PixelCharacter } from '../components/PixelCharacter';
import { SpeechBubble, PixelBook } from '../components/PixelObjects';

export function OpeningScene({ onContinue }) {
  const [phase, setPhase] = useState(0);
  const [girlX, setGirlX] = useState(120);
  const [boyX, setBoyX] = useState(-50);
  const [boyState, setBoyState] = useState('idle');
  const [girlState, setGirlState] = useState('idle');
  const [boyDirection, setBoyDirection] = useState('right');
  const [girlDirection, setGirlDirection] = useState('left');
  const [showBubble, setShowBubble] = useState(false);
  const [showReaction, setShowReaction] = useState(false);

  useEffect(() => {
    const timeline = async () => {
      // Phase 0: Setup - girl walks in from right
      await wait(500);
      setGirlState('walk');
      animateValue(120, 55, 2000, setGirlX);
      await wait(2000);
      setGirlState('idle');
      setGirlDirection('right');
      
      // Phase 1: Boy enters from left, nervous
      setPhase(1);
      await wait(500);
      setBoyState('walk');
      animateValue(-50, 25, 2500, setBoyX);
      await wait(2500);
      setBoyState('idle');
      
      // Phase 2: Boy approaches, taps shoulder
      setPhase(2);
      await wait(800);
      setBoyState('walk');
      animateValue(25, 40, 1000, setBoyX);
      await wait(1000);
      setBoyState('idle');
      
      // Phase 3: Girl turns around (Om Shanti Om moment)
      setPhase(3);
      await wait(600);
      setGirlDirection('left');
      setGirlState('idle');
      
      // Phase 4: Boy is stunned, asks Harry Potter question
      setPhase(4);
      await wait(1000);
      setShowBubble(true);
      
      // Phase 5: Her reaction
      setPhase(5);
      await wait(2500);
      setShowReaction(true);
      
      // Phase 6: She turns away (books > movies)
      setPhase(6);
      await wait(3000);
      setGirlDirection('right');
      setGirlState('walk');
      animateValue(55, 120, 2000, setGirlX);
      
      // Ready to continue
      setPhase(7);
    };
    
    timeline();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <SchoolHallway />
      
      {/* Year indicator */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
          <span className="text-white font-bold tracking-widest">2017 • HIGH SCHOOL</span>
        </div>
      </motion.div>
      
      {/* Girl character */}
      <motion.div
        className="absolute bottom-28"
        style={{ left: `${girlX}%`, transform: 'translateX(-50%)' }}
      >
        <PixelCharacter 
          character="girl"
          state={girlState}
          direction={girlDirection}
          scale={4}
        />
        
        {/* Her reaction bubble */}
        <AnimatePresence>
          {showReaction && phase >= 5 && phase < 6 && (
            <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <SpeechBubble 
                text="meh, books are better 📚"
                direction="left"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Boy character */}
      <motion.div
        className="absolute bottom-28"
        style={{ left: `${boyX}%`, transform: 'translateX(-50%)' }}
      >
        <PixelCharacter 
          character="boy"
          state={boyState}
          direction={boyDirection}
          scale={4}
        />
        
        {/* His speech bubble */}
        <AnimatePresence>
          {showBubble && phase >= 4 && (
            <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <SpeechBubble 
                text="Timilai Harry Potter man parcha? ⚡"
                direction="right"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Harry Potter book floating */}
      <motion.div
        className="absolute top-1/4 right-[15%]"
        animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <PixelBook open={phase >= 4} />
      </motion.div>
      
      {/* Phase indicator / story text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <StoryText key="p0">Day 1 of high school...</StoryText>
          )}
          {phase === 1 && (
            <StoryText key="p1">I see this beautiful yet intimidating girl</StoryText>
          )}
          {phase === 2 && (
            <StoryText key="p2">She sat right in front of my table</StoryText>
          )}
          {phase === 3 && (
            <StoryText key="p3">She turned around... like that scene from Om Shanti Om</StoryText>
          )}
          {phase === 4 && (
            <StoryText key="p4">I forgot to say hi... instead I asked...</StoryText>
          )}
          {phase === 5 && (
            <StoryText key="p5">Turns out she's a Harry Potter geek! But...</StoryText>
          )}
          {phase === 6 && (
            <StoryText key="p6">We didn't talk for 3 months after that 😭</StoryText>
          )}
        </AnimatePresence>
      </div>
      
      {/* Continue button */}
      <AnimatePresence>
        {phase >= 7 && (
          <motion.button
            className="absolute bottom-24 left-1/2 -translate-x-1/2 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
          >
            3 months later... →
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Magical sparkles during the turn */}
      {phase === 3 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${45 + Math.random() * 20}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Story text component
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

// Helper functions
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
