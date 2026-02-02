import { motion } from 'framer-motion';

// Pixel art school hallway background
export function SchoolHallway({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] to-[#98D8E8]" />
      
      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#8B7355]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #7A6248 0px, #7A6248 48px, #8B7355 48px, #8B7355 96px)`,
          backgroundSize: '96px 100%',
        }} />
      </div>
      
      {/* Back wall */}
      <div className="absolute top-0 left-0 right-0 h-[60%] bg-[#E8DCC8]">
        {/* Lockers */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute bottom-0 w-16 h-40 bg-[#4A90D9] border-2 border-[#3A7AC4]"
            style={{ left: `${i * 10}%` }}
          >
            <div className="absolute top-2 left-2 right-2 h-4 bg-[#3A7AC4]" />
            <div className="absolute top-1/2 right-2 w-2 h-2 rounded-full bg-[#2D5A8A]" />
          </div>
        ))}
      </div>
      
      {/* Windows */}
      {[...Array(4)].map((_, i) => (
        <div 
          key={i}
          className="absolute top-8 w-20 h-24 bg-[#87CEEB] border-4 border-[#8B7355]"
          style={{ left: `${15 + i * 22}%` }}
        >
          <div className="absolute inset-2 border-2 border-[#6B5344]" />
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#6B5344]" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#6B5344]" />
        </div>
      ))}
    </div>
  );
}

// Pixel art street/path for walking home
export function StreetScene({ className = "", timeOfDay = 'afternoon' }) {
  const skyColors = {
    afternoon: 'from-[#87CEEB] via-[#FDB777] to-[#FF8C42]',
    evening: 'from-[#1a1a3a] via-[#4A3B6B] to-[#FF6B6B]',
    night: 'from-[#0a0a1a] via-[#1a1a3a] to-[#2a2a4a]',
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Sky */}
      <div className={`absolute inset-0 bg-gradient-to-b ${skyColors[timeOfDay]}`} />
      
      {/* Sun/Moon */}
      {timeOfDay !== 'night' ? (
        <motion.div 
          className="absolute w-16 h-16 rounded-full bg-[#FFD700]"
          style={{ top: '10%', right: '15%' }}
          animate={{ 
            boxShadow: ['0 0 30px #FFD700', '0 0 50px #FFD700', '0 0 30px #FFD700']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ) : (
        <motion.div 
          className="absolute w-12 h-12 rounded-full bg-[#F5F5DC]"
          style={{ top: '15%', right: '20%' }}
          animate={{ 
            boxShadow: ['0 0 20px #F5F5DC', '0 0 40px #F5F5DC', '0 0 20px #F5F5DC']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      
      {/* Mountains far */}
      <svg className="absolute bottom-32 left-0 right-0 h-32" preserveAspectRatio="none" viewBox="0 0 400 100">
        <path d="M0 100 L50 40 L100 70 L150 20 L200 60 L250 30 L300 50 L350 25 L400 60 L400 100 Z" 
              fill="#6B8E6B" opacity="0.5" />
      </svg>
      
      {/* Hills near */}
      <svg className="absolute bottom-20 left-0 right-0 h-24" preserveAspectRatio="none" viewBox="0 0 400 80">
        <path d="M0 80 L80 30 L160 50 L240 20 L320 45 L400 30 L400 80 Z" 
              fill="#4A7C4A" />
      </svg>
      
      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#4A4A4A]">
        {/* Road markings */}
        <div className="absolute top-1/2 left-0 right-0 h-2 flex gap-8 -translate-y-1/2 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-12 h-full bg-[#FFD700]"
              initial={{ x: 0 }}
              animate={{ x: -80 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
      
      {/* Trees */}
      {[10, 30, 60, 85].map((pos, i) => (
        <PixelTree key={i} style={{ left: `${pos}%`, bottom: '20%' }} />
      ))}
    </div>
  );
}

// Pixel art tree
export function PixelTree({ style = {}, size = 1 }) {
  return (
    <div className="absolute" style={{ transform: `scale(${size})`, ...style }}>
      <svg width="48" height="64" viewBox="0 0 48 64" style={{ imageRendering: 'pixelated' }}>
        {/* Trunk */}
        <rect x="20" y="40" width="8" height="24" fill="#8B4513" />
        <rect x="18" y="44" width="4" height="16" fill="#6B3510" />
        
        {/* Leaves */}
        <rect x="8" y="8" width="32" height="8" fill="#228B22" />
        <rect x="4" y="16" width="40" height="8" fill="#2E8B2E" />
        <rect x="8" y="24" width="32" height="8" fill="#228B22" />
        <rect x="12" y="32" width="24" height="8" fill="#2E8B2E" />
        <rect x="16" y="40" width="16" height="4" fill="#228B22" />
      </svg>
    </div>
  );
}

// Night sky with stars for LDR scene
export function NightSkyLDR({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a2a] ${className}`}>
      {/* Stars */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}
      
      {/* Big moon */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-[#F5F5DC] right-[15%] top-[10%]"
        animate={{
          boxShadow: [
            '0 0 30px rgba(245,245,220,0.3)',
            '0 0 60px rgba(245,245,220,0.5)',
            '0 0 30px rgba(245,245,220,0.3)',
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Craters */}
        <div className="absolute w-4 h-4 rounded-full bg-[#E8E8D0] top-4 left-6" />
        <div className="absolute w-3 h-3 rounded-full bg-[#E8E8D0] top-12 left-14" />
        <div className="absolute w-2 h-2 rounded-full bg-[#E8E8D0] top-8 left-4" />
      </motion.div>
      
      {/* Ground silhouettes - two different cities */}
      <svg className="absolute bottom-0 left-0 w-1/2 h-32" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M0 100 L0 60 L20 60 L20 40 L40 40 L40 50 L60 50 L60 30 L80 30 L80 45 L100 45 L100 35 L120 35 L120 55 L140 55 L140 40 L160 40 L160 60 L200 60 L200 100 Z" 
              fill="#1a1a2a" />
        {/* Lit windows */}
        <rect x="25" y="50" width="4" height="4" fill="#FFD700" opacity="0.8" />
        <rect x="65" y="40" width="4" height="4" fill="#FFD700" opacity="0.6" />
        <rect x="105" y="45" width="4" height="4" fill="#FFD700" opacity="0.9" />
      </svg>
      
      <svg className="absolute bottom-0 right-0 w-1/2 h-32" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M0 100 L0 55 L30 55 L30 35 L50 35 L50 45 L70 45 L70 25 L90 25 L90 40 L110 40 L110 50 L140 50 L140 30 L160 30 L160 45 L180 45 L180 60 L200 60 L200 100 Z" 
              fill="#1a1a2a" />
        {/* Lit windows */}
        <rect x="35" y="45" width="4" height="4" fill="#FFD700" opacity="0.7" />
        <rect x="75" y="35" width="4" height="4" fill="#FFD700" opacity="0.8" />
        <rect x="145" y="40" width="4" height="4" fill="#FFD700" opacity="0.9" />
      </svg>
    </div>
  );
}

// Rainy scene for Nepal meetup
export function RainyScene({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Overcast sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4A5568] via-[#718096] to-[#A0AEC0]" />
      
      {/* Rain drops */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 bg-gradient-to-b from-blue-300/60 to-transparent"
          style={{
            height: Math.random() * 20 + 15,
            left: `${Math.random() * 100}%`,
            top: -30,
          }}
          animate={{
            y: ['0vh', '110vh'],
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Clouds */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: `${5 + i * 8}%`, left: `${-20 + i * 30}%` }}
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 60 + i * 10, repeat: Infinity, ease: "linear" }}
        >
          <PixelCloud size={1 + i * 0.2} />
        </motion.div>
      ))}
      
      {/* Road/ground */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#2D3748]">
        {/* Puddles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#4A5568]/50"
            style={{
              width: 40 + Math.random() * 40,
              height: 8,
              left: `${10 + i * 15}%`,
              bottom: 10 + Math.random() * 30,
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

// Pixel cloud
export function PixelCloud({ size = 1, className = "" }) {
  return (
    <div className={className} style={{ transform: `scale(${size})` }}>
      <svg width="80" height="40" viewBox="0 0 80 40" style={{ imageRendering: 'pixelated' }}>
        <rect x="16" y="16" width="48" height="16" fill="#E2E8F0" />
        <rect x="8" y="20" width="16" height="12" fill="#E2E8F0" />
        <rect x="56" y="20" width="16" height="12" fill="#E2E8F0" />
        <rect x="24" y="8" width="24" height="12" fill="#E2E8F0" />
        <rect x="40" y="4" width="16" height="8" fill="#E2E8F0" />
      </svg>
    </div>
  );
}

// Dance floor / romantic scene background
export function RomanticNightScene({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Deep romantic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a1a] via-[#2a1a2a] to-[#1a1020]" />
      
      {/* Stars */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, delay: Math.random() * 3, repeat: Infinity }}
        />
      ))}
      
      {/* Soft ambient lights */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-pink-500/10 blur-3xl"
        style={{ top: '20%', left: '10%' }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"
        style={{ bottom: '30%', right: '15%' }}
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      {/* Floor with soft reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1020] to-transparent" />
      
      {/* Floating hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400/30"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '10%',
            fontSize: 16 + Math.random() * 12,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.6, 0],
            x: [0, (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: i * 0.8,
            repeat: Infinity,
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

// Celebration scene with fireworks
export function CelebrationBackground({ className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Night sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2a] to-[#2a1a3a]" />
      
      {/* Fireworks */}
      {[...Array(5)].map((_, i) => (
        <Firework 
          key={i}
          delay={i * 1.5}
          x={15 + i * 18}
          y={20 + (i % 2) * 15}
          color={['#FF69B4', '#FFD700', '#FF6B6B', '#4ADE80', '#60A5FA'][i]}
        />
      ))}
      
      {/* Stars */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, delay: Math.random() * 3, repeat: Infinity }}
        />
      ))}
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#1a1a2a]" />
    </div>
  );
}

// Firework component
function Firework({ delay = 0, x = 50, y = 30, color = '#FF69B4' }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1.5, 2],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      {/* Firework particles */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              x: [0, Math.cos(angle) * 60],
              y: [0, Math.sin(angle) * 60],
              opacity: [1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: delay + 0.2,
              repeat: Infinity,
              repeatDelay: 3 + 0.7,
            }}
          />
        );
      })}
    </motion.div>
  );
}
