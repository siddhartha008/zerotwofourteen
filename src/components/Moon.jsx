import { motion } from 'framer-motion';
import { moonGlowVariants } from '../animations/variants';

export function Moon({ size = 80, className = "" }) {
  return (
    <motion.div
      className={`rounded-full bg-moon relative ${className}`}
      style={{
        width: size,
        height: size,
      }}
      variants={moonGlowVariants}
      animate="animate"
    >
      {/* Moon craters for detail */}
      <div 
        className="absolute rounded-full bg-moon/70"
        style={{
          width: size * 0.15,
          height: size * 0.15,
          top: '20%',
          left: '25%',
        }}
      />
      <div 
        className="absolute rounded-full bg-moon/60"
        style={{
          width: size * 0.1,
          height: size * 0.1,
          top: '50%',
          left: '60%',
        }}
      />
      <div 
        className="absolute rounded-full bg-moon/50"
        style={{
          width: size * 0.08,
          height: size * 0.08,
          top: '65%',
          left: '30%',
        }}
      />
    </motion.div>
  );
}
