import { motion } from 'framer-motion';

export function GoldenSnitch({ className = "" }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      animate={{
        x: [0, 30, -20, 40, 0],
        y: [0, -20, 10, -30, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Snitch body */}
      <motion.div
        className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400" />
      </motion.div>
      
      {/* Left wing */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"
        animate={{ rotateY: [0, 45, 0] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      >
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path 
            d="M20 8C20 8 15 0 8 0C4 0 0 4 0 8C0 12 4 16 8 16C15 16 20 8 20 8Z" 
            fill="rgba(255, 255, 255, 0.8)"
          />
          <path 
            d="M18 8C18 8 14 2 8 2C5 2 2 5 2 8" 
            stroke="rgba(200, 200, 200, 0.5)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>
      
      {/* Right wing */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full scale-x-[-1]"
        animate={{ rotateY: [0, -45, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
      >
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path 
            d="M20 8C20 8 15 0 8 0C4 0 0 4 0 8C0 12 4 16 8 16C15 16 20 8 20 8Z" 
            fill="rgba(255, 255, 255, 0.8)"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function MagicSparkles({ count = 20, className = "" }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

export function HogwartsLetter({ className = "" }) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ y: -100, opacity: 0, rotate: -10 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <svg width="80" height="60" viewBox="0 0 80 60">
        {/* Envelope */}
        <rect x="5" y="10" width="70" height="45" rx="3" fill="#F5E6D3" stroke="#8B4513" strokeWidth="1.5"/>
        {/* Flap */}
        <path d="M5 13 L40 35 L75 13" fill="#F5E6D3" stroke="#8B4513" strokeWidth="1.5"/>
        {/* Wax seal */}
        <circle cx="40" cy="28" r="10" fill="#8B0000"/>
        <text x="40" y="32" textAnchor="middle" fill="#FFD700" fontSize="10" fontFamily="serif">H</text>
      </svg>
    </motion.div>
  );
}
