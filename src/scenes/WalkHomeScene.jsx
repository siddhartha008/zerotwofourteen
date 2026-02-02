import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StreetScene } from '../components/PixelBackgrounds';
import { PixelCharacter } from '../components/PixelCharacter';
import { SpeechBubble } from '../components/PixelObjects';

export function WalkHomeScene({ onContinue }) {
  const [phase, setPhase] = useState(0);
  const [boyX, setBoyX] = useState(80);
  const [girlX, setGirlX] = useState(40);
  const [boyState, setBoyState] = useState('walk');
  const [girlState, setGirlState] = useState('idle');
  const [timeOfDay, setTimeOfDay] = useState('afternoon');
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timeline = async () => {
      // Phase 0: Boy is rushing, looking for her
      setPhase(0);
      setBoyState('walk');
      animateValue(80, 55, 2000, setBoyX);
      await wait(2000);
      setBoyState('idle');
      
      // Phase 1: He looks around
      setPhase(1);
      await wait(1000);
      setShowBubble(true);
      
      // Phase 2: Realizes she left
      setPhase(2);
      await wait(2000);
      setShowBubble(false);
      
      // Phase 3: She's already gone (way ahead)
      setPhase(3);
      setGirlState('walk');
      animateValue(40, -20, 3000, setGirlX);
      
      await wait(1500);
      setTimeOfDay('evening');
      
      // Phase 4: Boy walks alone, sad
      setPhase(4);
      await wait(2000);
      setBoyState('walk');
      animateValue(55, 30, 4000, setBoyX);
      
      await wait(2000);
      setTimeOfDay('night');
      
      // Phase 5: Becomes friends text
      setPhase(5);
      await wait(3000);
      
      // Phase 6: Fast forward - high school ends
      setPhase(6);
      await wait(3000);
      
      setPhase(7);
    };
    
    timeline();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background - time of day changes */}
      <StreetScene timeOfDay={timeOfDay} />
      
      {/* Phase indicator */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
          <span className="text-white font-bold tracking-widest">3 MONTHS LATER</span>
        </div>
      </motion.div>
      
      {/* Girl character - walking ahead/away */}
      <AnimatePresence>
        {phase < 3 && (
          <motion.div
            className="absolute bottom-24"
            style={{ left: `${girlX}%`, transform: 'translateX(-50%)' }}
            exit={{ opacity: 0 }}
          >
            <PixelCharacter 
              character="girl"
              state={girlState}
              direction="left"
              scale={3}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Boy character */}
      <motion.div
        className="absolute bottom-24"
        style={{ left: `${boyX}%`, transform: 'translateX(-50%)' }}
      >
        <PixelCharacter 
          character="boy"
          state={boyState}
          direction="left"
          scale={3}
        />
        
        {/* Speech bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              className="absolute -top-14 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <SpeechBubble 
                text="Wait... where is she? 👀"
                direction="right"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* "She already left" indicator */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            className="absolute top-1/3 left-[15%] -translate-y-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-pink-500/80 px-4 py-2 rounded-lg">
              <span className="text-white font-bold">← She already left 😅</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Story text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <StoryText key="p0">I asked her to walk home with me... she agreed!</StoryText>
          )}
          {phase === 1 && (
            <StoryText key="p1">After class, I rushed to find her...</StoryText>
          )}
          {phase === 2 && (
            <StoryText key="p2">But she had already left 💀</StoryText>
          )}
          {phase === 3 && (
            <StoryText key="p3">Got ditched on day one... ouch</StoryText>
          )}
          {phase === 4 && (
            <StoryText key="p4">Had to walk all alone...</StoryText>
          )}
          {phase === 5 && (
            <StoryText key="p5">We never talked about it. But we became good friends</StoryText>
          )}
          {phase === 6 && (
            <StoryText key="p6">High school ended... I thought that was it. Just a crush.</StoryText>
          )}
        </AnimatePresence>
      </div>
      
      {/* Time passing effect */}
      <AnimatePresence>
        {phase >= 5 && phase < 7 && (
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Calendar pages flipping */}
            <motion.div
              className="text-white text-6xl font-bold"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📅 Time passes...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
            Years later... →
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Dust/leaves blowing for lonely walk */}
      {phase >= 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-amber-600/60 rounded-full"
              style={{ top: `${60 + Math.random() * 20}%` }}
              initial={{ left: '100%', rotate: 0 }}
              animate={{ 
                left: '-10%',
                rotate: 360 * 3,
                y: [0, -20, 0, 20, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}
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
