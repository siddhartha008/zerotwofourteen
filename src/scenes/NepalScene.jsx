import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RainyScene } from '../components/PixelBackgrounds';
import { PixelCharacter } from '../components/PixelCharacter';
import { PixelCar, PixelBouquet, SpeechBubble } from '../components/PixelObjects';

export function NepalScene({ onContinue }) {
  const [phase, setPhase] = useState(0);
  const [carX, setCarX] = useState(-30);
  const [girlX, setGirlX] = useState(75);
  const [girlState, setGirlState] = useState('idle');
  const [showDadBubble, setShowDadBubble] = useState(false);

  useEffect(() => {
    const timeline = async () => {
      // Phase 0: Setup - rainy day
      setPhase(0);
      await wait(2000);
      
      // Phase 1: The ultimatum
      setPhase(1);
      setShowDadBubble(true);
      await wait(4000);
      setShowDadBubble(false);
      
      // Phase 2: Car drives in (with dad in backseat lol)
      setPhase(2);
      await wait(500);
      animateValue(-30, 30, 3000, setCarX);
      await wait(3500);
      
      // Phase 3: She walks towards car
      setPhase(3);
      setGirlState('walk');
      animateValue(75, 50, 2000, setGirlX);
      await wait(2000);
      setGirlState('idle');
      
      // Phase 4: Dad giving looks
      setPhase(4);
      await wait(3000);
      
      // Phase 5: Off to Fresh Farms
      setPhase(5);
      await wait(500);
      animateValue(30, 110, 4000, setCarX);
      animateValue(50, 110, 4000, setGirlX);
      
      await wait(4500);
      setPhase(6);
    };
    
    timeline();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <RainyScene />
      
      {/* Header */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
          <span className="text-white font-bold tracking-widest">🇳🇵 NEPAL 2023</span>
        </div>
      </motion.div>
      
      {/* Subtitle */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-pink-300 text-sm">1.5 years virtual • First real meetup</span>
      </motion.div>
      
      {/* Dad ultimatum popup */}
      <AnimatePresence>
        {showDadBubble && (
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <div className="bg-red-900/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">👨</span>
                <span className="text-white font-bold">Dad:</span>
              </div>
              <p className="text-red-200 text-lg font-bold">
                "Take the scooty, or I'm coming in the car with you!"
              </p>
              <p className="text-red-300 text-sm mt-2">I took the car. 🚗</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Car with dad visible */}
      <motion.div
        className="absolute bottom-20"
        style={{ left: `${carX}%`, transform: 'translateX(-50%)' }}
      >
        <div className="relative">
          <PixelCar direction="right" />
          
          {/* Dad emoji in backseat */}
          {phase >= 2 && phase < 5 && (
            <motion.div
              className="absolute -top-2 left-1/3 text-xl"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              👨
            </motion.div>
          )}
          
          {/* Boy driving */}
          {phase >= 2 && (
            <motion.div
              className="absolute -top-8 right-1/4"
              animate={{ y: [-1, 1, -1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <PixelCharacter character="boy" state="idle" direction="right" scale={1.5} />
            </motion.div>
          )}
          
          {/* Dad's look speech bubble */}
          {phase === 4 && (
            <motion.div
              className="absolute -top-16 left-1/4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <SpeechBubble text="👀 (He knows...)" direction="left" />
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Girl waiting with bouquet */}
      <motion.div
        className="absolute bottom-24"
        style={{ left: `${girlX}%`, transform: 'translateX(-50%)' }}
      >
        <div className="relative">
          <PixelCharacter 
            character="girl"
            state={girlState}
            direction="left"
            scale={3}
          />
          
          {/* Bouquet */}
          {phase >= 0 && phase < 5 && (
            <motion.div
              className="absolute -right-8 top-8"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <PixelBouquet />
            </motion.div>
          )}
          
          {/* Nervous wave indicator */}
          {phase >= 3 && phase < 5 && (
            <motion.div
              className="absolute -top-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span 
                className="text-2xl"
                animate={{ rotate: [-15, 15, -15] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                👋
              </motion.span>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* White dress sparkle effect */}
      {phase >= 3 && phase < 5 && (
        <motion.div
          className="absolute pointer-events-none"
          style={{ left: `${girlX}%`, bottom: '20%', transform: 'translateX(-50%)' }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: (Math.random() - 0.5) * 60,
                top: (Math.random() - 0.5) * 80,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Story text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <StoryText key="p0">It was raining. Perfect timing for our first meetup 🌧️</StoryText>
          )}
          {phase === 1 && (
            <StoryText key="p1">I convinced dad to let me take the car but...</StoryText>
          )}
          {phase === 2 && (
            <StoryText key="p2">Plot twist: Dad decided to join 😭</StoryText>
          )}
          {phase === 3 && (
            <StoryText key="p3">She walked towards me in her pretty white dress... 💐</StoryText>
          )}
          {phase === 4 && (
            <StoryText key="p4">Dad gave me THE LOOK. He definitely knew.</StoryText>
          )}
          {phase === 5 && (
            <StoryText key="p5">Off to Fresh Farms! 🌾 (more nervous about driving tbh)</StoryText>
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
            That night... →
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
