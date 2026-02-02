import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { StarField } from '../components/Star';
import { Heart } from '../components/Heart';
import { Envelope } from '../components/Envelope';
import { DottedPath } from '../components/ConnectionLine';
import { sceneVariants, containerVariants, childVariants, fadeInUpVariants } from '../animations/variants';
import { TEXTS } from '../constants/texts';

function Milestone({ year, text, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center gap-6 md:gap-8"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline dot */}
      <div className="relative">
        <motion.div
          className="w-4 h-4 rounded-full bg-pink-warm"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
        {!isLast && (
          <div className="absolute top-4 left-1/2 w-0.5 h-16 md:h-24 bg-gradient-to-b from-pink-warm to-pink-soft/30 -translate-x-1/2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-16 md:pb-24">
        <motion.div
          className="bg-night-lighter/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-pink-soft/20"
          whileHover={{ scale: 1.02, borderColor: 'rgba(255, 182, 193, 0.4)' }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart size={16} color="#FF69B4" />
            <span className="text-pink-warm font-semibold">{year}</span>
          </div>
          <p className="text-pink-soft/80 text-sm md:text-base">{text}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function JourneyScene({ onContinue }) {
  const { milestones } = TEXTS.journey;

  return (
    <motion.section
      className="relative min-h-screen bg-gradient-to-b from-night to-night-lighter py-20 px-6 overflow-hidden"
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background */}
      <StarField count={40} />

      {/* Floating envelopes representing messages */}
      <div className="absolute top-20 left-10 opacity-30">
        <Envelope size={40} />
      </div>
      <div className="absolute top-40 right-16 opacity-20">
        <Envelope size={50} />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-lg mx-auto"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={childVariants}>
          <h2 className="font-cursive text-4xl md:text-5xl text-pink-soft mb-4">
            {TEXTS.journey.title}
          </h2>
          <p className="text-pink-soft/60">
            {TEXTS.journey.subtitle}
          </p>
        </motion.div>

        {/* Decorative path */}
        <motion.div
          className="absolute top-32 left-0 right-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.5 }}
        >
          <DottedPath />
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-4">
          {milestones.map((milestone, index) => (
            <Milestone
              key={milestone.year}
              year={milestone.year}
              text={milestone.text}
              index={index}
              isLast={index === milestones.length - 1}
            />
          ))}
        </div>

        {/* Continue section */}
        <motion.div
          className="text-center mt-8"
          variants={fadeInUpVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.button
            className="group flex flex-col items-center gap-2 mx-auto text-pink-soft/60 hover:text-pink-soft transition-colors"
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm tracking-wider uppercase">And now...</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
