import { motion } from 'framer-motion';

// Pixel art speech bubble
export function SpeechBubble({ 
  text, 
  direction = 'right', // tail direction
  className = "",
  delay = 0,
}) {
  return (
    <motion.div
      className={`relative bg-white px-4 py-2 rounded-lg ${className}`}
      initial={{ opacity: 0, scale: 0, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300 }}
      style={{ imageRendering: 'pixelated' }}
    >
      <p className="text-[#2D2D2D] text-sm font-bold whitespace-nowrap">{text}</p>
      {/* Tail */}
      <div 
        className={`absolute bottom-0 w-0 h-0 border-8 border-transparent border-t-white ${
          direction === 'right' ? 'right-4' : 'left-4'
        }`}
        style={{ transform: 'translateY(100%)' }}
      />
    </motion.div>
  );
}

// Pixel envelope flying
export function FlyingPixelEnvelope({ 
  from = { x: 0, y: 50 },
  to = { x: 100, y: 50 },
  delay = 0,
}) {
  return (
    <motion.div
      className="absolute"
      initial={{ x: from.x, y: `${from.y}%`, opacity: 0 }}
      animate={{ 
        x: to.x, 
        y: [`${from.y}%`, `${from.y - 10}%`, `${to.y}%`],
        opacity: [0, 1, 1, 0],
        rotate: [0, -10, 10, 0],
      }}
      transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: 2 }}
    >
      <svg width="32" height="24" viewBox="0 0 32 24" style={{ imageRendering: 'pixelated' }}>
        <rect x="2" y="4" width="28" height="18" fill="#FFE4B5" />
        <path d="M2 4 L16 14 L30 4" stroke="#DEB887" strokeWidth="2" fill="none" />
        <circle cx="16" cy="10" r="4" fill="#FF69B4" />
        <path d="M16 12 L14.5 10 Q16 8 17.5 10 Z" fill="white" />
      </svg>
    </motion.div>
  );
}

// Pixel heart that floats up
export function FloatingPixelHeart({ delay = 0, x = 50 }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%` }}
      initial={{ y: '100%', opacity: 0 }}
      animate={{ 
        y: '-100%', 
        opacity: [0, 1, 1, 0],
        x: [0, 10, -10, 0],
      }}
      transition={{ duration: 4, delay, repeat: Infinity }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
        <rect x="3" y="2" width="4" height="4" fill="#FF69B4" />
        <rect x="9" y="2" width="4" height="4" fill="#FF69B4" />
        <rect x="1" y="4" width="14" height="4" fill="#FF69B4" />
        <rect x="2" y="8" width="12" height="3" fill="#FF69B4" />
        <rect x="4" y="11" width="8" height="2" fill="#FF69B4" />
        <rect x="6" y="13" width="4" height="2" fill="#FF69B4" />
      </svg>
    </motion.div>
  );
}

// Pixel car
export function PixelCar({ 
  x = 0, 
  direction = 'right',
  moving = false,
  className = "" 
}) {
  const flip = direction === 'left' ? -1 : 1;
  
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ 
        transform: `scaleX(${flip})`,
        left: x,
      }}
      animate={moving ? {
        x: direction === 'right' ? [0, 300] : [0, -300],
      } : {}}
      transition={{ duration: 4, ease: "linear" }}
    >
      <svg width="80" height="40" viewBox="0 0 80 40" style={{ imageRendering: 'pixelated' }}>
        {/* Body */}
        <rect x="8" y="16" width="64" height="16" fill="#4A5568" />
        <rect x="16" y="8" width="40" height="12" fill="#4A5568" />
        
        {/* Windows */}
        <rect x="20" y="10" width="14" height="8" fill="#87CEEB" />
        <rect x="38" y="10" width="14" height="8" fill="#87CEEB" />
        
        {/* Wheels */}
        <motion.g
          animate={moving ? { rotate: 360 } : {}}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '20px 36px' }}
        >
          <circle cx="20" cy="36" r="8" fill="#1A202C" />
          <circle cx="20" cy="36" r="4" fill="#4A5568" />
        </motion.g>
        <motion.g
          animate={moving ? { rotate: 360 } : {}}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '60px 36px' }}
        >
          <circle cx="60" cy="36" r="8" fill="#1A202C" />
          <circle cx="60" cy="36" r="4" fill="#4A5568" />
        </motion.g>
        
        {/* Headlights */}
        <rect x="70" y="20" width="4" height="6" fill="#FFD700" />
        <rect x="4" y="20" width="4" height="6" fill="#FF6B6B" />
      </svg>
    </motion.div>
  );
}

// Pixel flower bouquet
export function PixelBouquet({ className = "" }) {
  return (
    <motion.div 
      className={className}
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <svg width="32" height="40" viewBox="0 0 32 40" style={{ imageRendering: 'pixelated' }}>
        {/* Wrapper */}
        <path d="M8 40 L12 20 L20 20 L24 40 Z" fill="#FFB6C1" />
        <rect x="10" y="18" width="12" height="4" fill="#FF69B4" />
        
        {/* Flowers */}
        <circle cx="12" cy="12" r="6" fill="#FF69B4" />
        <circle cx="20" cy="10" r="6" fill="#FFB6C1" />
        <circle cx="16" cy="6" r="6" fill="#FF1493" />
        
        {/* Flower centers */}
        <circle cx="12" cy="12" r="2" fill="#FFD700" />
        <circle cx="20" cy="10" r="2" fill="#FFD700" />
        <circle cx="16" cy="6" r="2" fill="#FFD700" />
        
        {/* Leaves */}
        <ellipse cx="6" cy="16" rx="4" ry="6" fill="#228B22" />
        <ellipse cx="26" cy="14" rx="4" ry="6" fill="#228B22" />
      </svg>
    </motion.div>
  );
}

// Pixel music notes
export function PixelMusicNotes({ className = "" }) {
  return (
    <div className={`absolute ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400"
          style={{ left: i * 20 }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [-20, -60],
            opacity: [0, 1, 0],
            x: [0, (i - 1) * 10],
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
          }}
        >
          ♪
        </motion.div>
      ))}
    </div>
  );
}

// Harry Potter themed pixel wand with sparkles
export function PixelWand({ casting = false, className = "" }) {
  return (
    <motion.div className={`relative ${className}`}>
      <svg width="48" height="12" viewBox="0 0 48 12" style={{ imageRendering: 'pixelated' }}>
        {/* Wand */}
        <rect x="0" y="4" width="40" height="4" fill="#8B4513" />
        <rect x="0" y="4" width="8" height="4" fill="#DEB887" />
      </svg>
      
      {/* Sparkles when casting */}
      {casting && (
        <div className="absolute right-0 top-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, (Math.random() - 0.5) * 40],
                y: [0, (Math.random() - 0.5) * 40],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Pixel book (Harry Potter style)
export function PixelBook({ open = false, className = "" }) {
  return (
    <div className={className}>
      <svg width="40" height="32" viewBox="0 0 40 32" style={{ imageRendering: 'pixelated' }}>
        {open ? (
          <>
            {/* Open book */}
            <rect x="2" y="4" width="16" height="24" fill="#8B0000" />
            <rect x="22" y="4" width="16" height="24" fill="#8B0000" />
            <rect x="4" y="6" width="12" height="20" fill="#FFF8DC" />
            <rect x="24" y="6" width="12" height="20" fill="#FFF8DC" />
            {/* Text lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="5" y={8 + i * 4} width="10" height="2" fill="#2D2D2D" opacity="0.3" />
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="25" y={8 + i * 4} width="10" height="2" fill="#2D2D2D" opacity="0.3" />
            ))}
            {/* Spine */}
            <rect x="18" y="4" width="4" height="24" fill="#6B0000" />
          </>
        ) : (
          <>
            {/* Closed book */}
            <rect x="8" y="2" width="24" height="28" fill="#8B0000" />
            <rect x="6" y="4" width="2" height="24" fill="#FFD700" />
            <rect x="10" y="4" width="20" height="24" fill="#6B0000" />
            {/* HP style emblem */}
            <rect x="16" y="10" width="8" height="8" fill="#FFD700" />
          </>
        )}
      </svg>
    </div>
  );
}
