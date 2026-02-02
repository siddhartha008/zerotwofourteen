import { motion } from 'framer-motion';
import { StarField } from '../components/Star';
import { Moon } from '../components/Moon';
import { Heart } from '../components/Heart';
import { sceneVariants, containerVariants, childVariants } from '../animations/variants';
import { TEXTS } from '../constants/texts';

export function RightTimeScene({ onContinue }) {
  const { rightTime } = TEXTS;

  return (
    <motion.section
      className="relative min-h-screen bg-gradient-to-b from-night via-[#1a1a3a] to-night flex flex-col items-center justify-center py-16 px-6 overflow-hidden"
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <StarField count={60} />
      
      {/* Moon and Sun visual */}
      <div className="absolute top-10 right-10 md:top-20 md:right-20">
        <Moon size={60} />
      </div>
      
      {/* Sun on the opposite side */}
      <motion.div
        className="absolute bottom-20 left-10 md:bottom-32 md:left-20 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400"
        animate={{
          boxShadow: [
            "0 0 20px rgba(255, 200, 0, 0.4)",
            "0 0 40px rgba(255, 200, 0, 0.6)",
            "0 0 20px rgba(255, 200, 0, 0.4)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 text-center max-w-2xl"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Title */}
        <motion.h2
          className="font-cursive text-4xl md:text-5xl lg:text-6xl text-pink-soft mb-4"
          variants={childVariants}
        >
          {rightTime.title}
        </motion.h2>
        
        <motion.p
          className="text-xl md:text-2xl text-pink-warm mb-12"
          variants={childVariants}
        >
          {rightTime.subtitle}
        </motion.p>

        {/* Main text */}
        <motion.div
          className="bg-night-lighter/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-pink-soft/20 mb-8"
          variants={childVariants}
        >
          <p className="text-lg text-pink-soft/80 leading-relaxed mb-6">
            {rightTime.mainText}
          </p>
          
          <p className="text-pink-soft/70 mb-6">
            {rightTime.reflection}
          </p>
          
          <div className="flex items-center justify-center gap-2 text-pink-soft/60">
            <span>{rightTime.tedMosby}</span>
            <span className="text-xs text-pink-soft/40">{rightTime.reference}</span>
          </div>
        </motion.div>

        {/* Destiny quote */}
        <motion.p
          className="text-lg md:text-xl text-pink-soft/80 mb-4 italic"
          variants={childVariants}
        >
          "{rightTime.destiny}"
        </motion.p>

        {/* Poetic line with visual */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          variants={childVariants}
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Moon size={30} />
          </motion.div>
          
          <p className="text-pink-warm font-cursive text-2xl">
            {rightTime.poetic}
          </p>
          
          <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400"
            animate={{ 
              y: [5, -5, 5],
              boxShadow: [
                "0 0 10px rgba(255, 200, 0, 0.3)",
                "0 0 20px rgba(255, 200, 0, 0.5)",
                "0 0 10px rgba(255, 200, 0, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Floating hearts */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          variants={childVariants}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-5, 5, -5],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Heart size={16 + i * 4} color={`rgba(255, 105, 180, ${0.4 + i * 0.15})`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Continue */}
        <motion.button
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-pink-warm/20 hover:bg-pink-warm/30 text-pink-soft rounded-full transition-colors"
          onClick={onContinue}
          variants={childVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>The LDR Chapter</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
