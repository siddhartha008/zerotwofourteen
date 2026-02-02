import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CelebrationBackground } from '../components/PixelBackgrounds';
import { PixelCharacter } from '../components/PixelCharacter';
import { ConfettiBurst, HeartBurst } from '../components/Confetti';

export function CelebrationScene() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Trigger celebration effects
    setShowConfetti(true);
    
    const timeline = async () => {
      await wait(500);
      setPhase(1);
      await wait(2000);
      setPhase(2);
      await wait(3000);
      setPhase(3);
    };
    
    timeline();

    // Re-trigger confetti
    const interval = setInterval(() => {
      setShowConfetti(false);
      setTimeout(() => setShowConfetti(true), 100);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with fireworks */}
      <CelebrationBackground />
      
      {/* Confetti */}
      <ConfettiBurst isActive={showConfetti} />
      <HeartBurst isActive={showConfetti} />
      
      {/* Characters celebrating */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-end gap-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        {/* Boy jumping */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          <PixelCharacter character="boy" state="happy" direction="right" scale={4} />
        </motion.div>
        
        {/* Big heart between them */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ 
            scale: { duration: 0.8, repeat: Infinity },
            rotate: { duration: 1, repeat: Infinity },
          }}
        >
          <span className="text-6xl">💕</span>
        </motion.div>
        
        {/* Girl jumping */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [5, -5, 5],
          }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
        >
          <PixelCharacter character="girl" state="happy" direction="left" scale={4} />
        </motion.div>
      </motion.div>
      
      {/* Title */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-4"
          animate={{
            textShadow: [
              '0 0 30px rgba(255,105,180,0.5)',
              '0 0 60px rgba(255,105,180,0.8)',
              '0 0 30px rgba(255,105,180,0.5)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          I KNEW YOU'D SAY YES! 🎉
        </motion.h1>
        <motion.p
          className="text-2xl text-pink-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          You always do 💕
        </motion.p>
      </motion.div>
      
      {/* Message card */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.5 }}
        transition={{ type: "spring", delay: 0.3 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-pink-400/30">
          <p className="text-white text-xl text-center mb-6">
            Here's to our <span className="text-pink-400 font-bold">4th Valentine's Day</span> together, and to forever more.
          </p>
          
          <div className="border-t border-pink-400/20 pt-6">
            <p className="text-pink-300/80 text-center mb-2">Forever yours,</p>
            <motion.p
              className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Koshish 💝
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      {/* Footer */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
      >
        <motion.div
          className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-pink-400/30"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(255,105,180,0.2)',
              '0 0 40px rgba(255,105,180,0.4)',
              '0 0 20px rgba(255,105,180,0.2)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-3xl">❤️</span>
          <span className="text-white text-xl font-bold">Happy Valentine's Day, Monal!</span>
          <span className="text-3xl">❤️</span>
        </motion.div>
      </motion.div>
      
      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['💕', '✨', '🎉', '💝', '🥰', '💖', '🌟', '💗'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{ left: `${5 + i * 12}%` }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ 
              y: '-100vh',
              opacity: [0, 1, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
      
      {/* 4 years badge */}
      <motion.div
        className="absolute top-4 right-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
      >
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-full">
          <span className="text-white font-bold text-sm">4th Valentine's Day 💕</span>
        </div>
      </motion.div>
    </div>
  );
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
