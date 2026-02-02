import { motion } from 'framer-motion';
import { pathDrawVariants } from '../animations/variants';

export function ConnectionLine({ className = "" }) {
  return (
    <svg 
      className={`absolute w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF69B4" />
          <stop offset="50%" stopColor="#FFB6C1" />
          <stop offset="100%" stopColor="#FF69B4" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 20 100 Q 100 20, 200 100 T 380 100"
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeDasharray="8 4"
        variants={pathDrawVariants}
        initial="initial"
        animate="animate"
      />
    </svg>
  );
}

export function DottedPath({ className = "" }) {
  return (
    <svg 
      className={`w-full ${className}`}
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 0 50 Q 100 10, 200 50 T 400 50"
        fill="none"
        stroke="#FF69B4"
        strokeWidth="2"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
    </svg>
  );
}
