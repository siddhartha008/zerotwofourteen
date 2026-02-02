import { motion } from 'framer-motion';

// Parallax background layers for the side-scrolling world
export function ParallaxBackground({ scrollX, section = 'school' }) {
  // Different sections have different backgrounds
  const sections = {
    school: {
      sky: 'from-[#87CEEB] to-[#B0E0E6]',
      far: '#6B8E6B',
      mid: '#4A7C4A',
      ground: '#8B7355',
    },
    street: {
      sky: 'from-[#FDB777] to-[#FF8C42]',
      far: '#5D7A5D',
      mid: '#4A6B4A',
      ground: '#4A4A4A',
    },
    night: {
      sky: 'from-[#0a0a1a] to-[#1a1a3a]',
      far: '#1a1a2a',
      mid: '#151525',
      ground: '#1a1a2a',
    },
    romantic: {
      sky: 'from-[#1a0a2a] to-[#2a1a3a]',
      far: '#1a0a1a',
      mid: '#150a15',
      ground: '#1a0a1a',
    },
  };

  const colors = sections[section] || sections.school;

  // Use custom school background image for school section
  if (section === 'school') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Custom school background - parallax scroll */}
        <div
          className="absolute"
          style={{
            backgroundImage: 'url(/school-bg.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat-x',
            imageRendering: 'pixelated',
            width: '130%',
            height: '100%',
            left: 0,
            top: 0,
            transform: `translateX(${-scrollX * 0.4}px)`,
          }}
        />
        {/* Ground for character to walk on */}
        <div
          className="absolute bottom-0 left-0 h-5 bg-[#8B6914]"
          style={{ width: '500%', transform: `translateX(${-scrollX * 0.5}px)` }}
        />
      </div>
    );
  }

  // Use custom golf background for street section (3 months later)
  if (section === 'street') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Custom golf background - parallax scroll */}
        <div
          className="absolute"
          style={{
            backgroundImage: 'url(/golf-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'repeat-x',
            imageRendering: 'pixelated',
            width: '150%',
            height: '100%',
            left: 0,
            transform: `translateX(${-scrollX * 0.4}px)`,
          }}
        />
        {/* Ground for character to walk on */}
        <div
          className="absolute bottom-0 left-0 h-5 bg-[#4A7A4A]"
          style={{ width: '500%', transform: `translateX(${-scrollX * 0.5}px)` }}
        />
      </div>
    );
  }

  // Use custom game background for minigame section
  if (section === 'game') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Custom game background - full screen zoomed in */}
        <img
          src="/gamebg.png"
          alt=""
          className="absolute inset-0 object-cover"
          style={{
            imageRendering: 'pixelated',
            width: '140%',
            height: '114%',

          }}
        />
      </div>
    );
  }

  // Years passing section - day/night ends after Kathmandu message; Our long distance starts in LDR scene
  if (section === 'years') {
    const YEARS_START = 4200;
    const YEARS_END = 6185;
    const yearsWidth = YEARS_END - YEARS_START;
    const progress = Math.max(0, Math.min(1, (scrollX - YEARS_START) / yearsWidth));
    // Slower, smoother fast-forward: 6 day/night cycles with eased transition
    const numCycles = 6;
    const cycle = progress * numCycles * 2; // 0 to 12 (6 day + 6 night)
    const phase = cycle % 1; // 0 to 1 within each half-cycle
    // Smooth ease-in-out per half-cycle (softer than linear)
    const eased = phase * phase * (3 - 2 * phase);
    const isDay = (cycle % 2) < 1;
    const dayStrength = isDay ? eased : (1 - eased);
    const nightStrength = 1 - dayStrength;

    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Day sky */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#98D8E8]"
          style={{ opacity: dayStrength }}
        />
        {/* Sun (day) */}
        <div
          className="absolute w-20 h-20 rounded-full bg-[#FFD700] right-[20%] top-[15%]"
          style={{
            opacity: dayStrength,
            boxShadow: '0 0 60px rgba(255,215,0,0.6)',
          }}
        />
        {/* Clouds hint (day) */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ opacity: dayStrength * 0.3 }}
        >
          <div className="absolute w-40 h-12 rounded-full bg-white/60 top-[20%] left-[10%]" />
          <div className="absolute w-32 h-10 rounded-full bg-white/50 top-[25%] right-[30%]" />
        </div>

        {/* Night sky */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a2a] via-[#1a1a4a] to-[#0a0a3a]"
          style={{ opacity: nightStrength }}
        />
        {/* Twinkling stars (night) */}
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 65}%`,
              backgroundColor: ['#ffffff', '#b0c4de', '#87ceeb', '#e6e6fa'][Math.floor(Math.random() * 4)],
              opacity: nightStrength * (0.4 + Math.random() * 0.6),
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2 + i % 3, repeat: Infinity, delay: (i % 8) * 0.3 }}
          />
        ))}
        {/* Moon (night) */}
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-[#F5F5DC] right-[18%] top-[12%]"
          style={{ opacity: nightStrength }}
          animate={{
            boxShadow: [
              '0 0 30px rgba(245,245,220,0.4)',
              '0 0 50px rgba(245,245,220,0.6)',
              '0 0 30px rgba(245,245,220,0.4)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Ground - fades with time */}
        <div
          className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#1a1a2a] to-transparent"
          style={{ opacity: 0.6 + nightStrength * 0.4 }}
        />
      </div>
    );
  }

  // Use custom LDR background - full viewport (entire screen)
  if (section === 'ldr') {
    return (
      <div className="absolute inset-0 overflow-hidden" style={{ width: '100vw', minWidth: '100%', height: '100vh', minHeight: '100%' }}>
        {/* Custom LDR background - covers entire screen */}
        <img
          src="/ldrbg.png"
          alt=""
          className="absolute object-cover"
          style={{
            imageRendering: 'pixelated',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Ground for character to walk on */}
        <div
          className="absolute bottom-0 left-0 h-5 bg-[#1a1a2a]"
          style={{ width: '500%', transform: `translateX(${-scrollX * 0.5}px)` }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient - no parallax */}
      <div className={`absolute inset-0 bg-gradient-to-b ${colors.sky}`} />

      {/* Stars for night sections */}
      {(section === 'night' || section === 'romantic') && (
        <div className="absolute inset-0">
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
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Moon for night sections */}
      {section === 'night' && (
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-[#F5F5DC] right-[10%] top-[10%]"
          style={{ transform: `translateX(${scrollX * 0.02}px)` }}
          animate={{
            boxShadow: [
              '0 0 30px rgba(245,245,220,0.3)',
              '0 0 50px rgba(245,245,220,0.5)',
              '0 0 30px rgba(245,245,220,0.3)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Sun for day sections */}
      {section === 'school' && (
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-[#FFD700] right-[15%] top-[8%]"
          style={{ transform: `translateX(${scrollX * 0.02}px)` }}
          animate={{
            boxShadow: [
              '0 0 40px rgba(255,215,0,0.4)',
              '0 0 60px rgba(255,215,0,0.6)',
              '0 0 40px rgba(255,215,0,0.4)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Far mountains - slowest parallax */}
      <svg
        className="absolute bottom-32 left-0 h-40 pointer-events-none"
        style={{
          width: '300%',
          transform: `translateX(${-scrollX * 0.1}px)`,
        }}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 L0 80 L100 40 L200 70 L300 30 L400 60 L500 20 L600 50 L700 25 L800 55 L900 35 L1000 65 L1100 45 L1200 75 L1200 120 Z"
          fill={colors.far}
          opacity="0.5"
        />
      </svg>

      {/* Mid hills - medium parallax */}
      <svg
        className="absolute bottom-24 left-0 h-32 pointer-events-none"
        style={{
          width: '400%',
          transform: `translateX(${-scrollX * 0.3}px)`,
        }}
        viewBox="0 0 1600 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0 100 L0 60 L80 30 L160 50 L240 20 L320 45 L400 25 L480 55 L560 30 L640 50 L720 20 L800 40 L880 25 L960 55 L1040 35 L1120 50 L1200 30 L1280 45 L1360 20 L1440 50 L1520 35 L1600 55 L1600 100 Z"
          fill={colors.mid}
        />
      </svg>

      {/* Ground - moves with character */}
      <div
        className="absolute bottom-0 left-0 h-24"
        style={{
          width: '500%',
          transform: `translateX(${-scrollX * 0.5}px)`,
          backgroundColor: colors.ground,
        }}
      >
        {/* Ground texture */}
        {section === 'street' && (
          <div className="absolute top-8 left-0 right-0 h-2 flex gap-12">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="w-16 h-full bg-[#FFD700]" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Foreground elements that scroll with the world
export function WorldElements({ scrollX, worldWidth }) {
  // Elements positioned throughout the world
  // School section (0 - 1500px) - NO elements, using custom bg image
  // Street/Golf section (1500 - 3000px) - NO elements, using custom bg image
  // Night/LDR section (3000 - 4500px) - NO elements, using custom bg image
  const elements = [
    // Nepal section (4500 - 6000px)
    { type: 'tree', x: 4800 },
    { type: 'flowers', x: 5200 },
    { type: 'tree', x: 5600 },

    // LDR/Romantic section - no flowers (using custom background)
  ];

  return (
    <div
      className="absolute bottom-24 left-0 h-64 pointer-events-none"
      style={{
        width: worldWidth,
        transform: `translateX(${-scrollX}px)`,
      }}
    >
      {elements.map((el, i) => (
        <WorldElement key={i} type={el.type} x={el.x} />
      ))}
    </div>
  );
}

function WorldElement({ type, x }) {
  const elements = {
    tree: (
      <svg width="64" height="96" viewBox="0 0 64 96" style={{ imageRendering: 'pixelated' }}>
        <rect x="26" y="56" width="12" height="40" fill="#8B4513" />
        <rect x="12" y="12" width="40" height="12" fill="#228B22" />
        <rect x="8" y="24" width="48" height="12" fill="#2E8B2E" />
        <rect x="12" y="36" width="40" height="12" fill="#228B22" />
        <rect x="18" y="48" width="28" height="10" fill="#2E8B2E" />
      </svg>
    ),
    lamppost: (
      <svg width="32" height="96" viewBox="0 0 32 96" style={{ imageRendering: 'pixelated' }}>
        <rect x="14" y="24" width="4" height="72" fill="#4A4A4A" />
        <rect x="8" y="8" width="16" height="20" fill="#FFD700" />
        <motion.rect
          x="8" y="8" width="16" height="20"
          fill="#FFD700"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    ),
    mailbox: (
      <svg width="32" height="48" viewBox="0 0 32 48" style={{ imageRendering: 'pixelated' }}>
        <rect x="12" y="24" width="8" height="24" fill="#4A4A4A" />
        <rect x="4" y="8" width="24" height="18" fill="#FF6B6B" rx="4" />
        <rect x="2" y="16" width="4" height="6" fill="#FFD700" />
      </svg>
    ),
    bench: (
      <svg width="64" height="40" viewBox="0 0 64 40" style={{ imageRendering: 'pixelated' }}>
        <rect x="4" y="16" width="56" height="8" fill="#8B4513" />
        <rect x="8" y="24" width="8" height="16" fill="#6B4423" />
        <rect x="48" y="24" width="8" height="16" fill="#6B4423" />
      </svg>
    ),
    flowers: (
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          >
            <svg width="16" height="32" viewBox="0 0 16 32" style={{ imageRendering: 'pixelated' }}>
              <rect x="7" y="16" width="2" height="16" fill="#228B22" />
              <circle cx="8" cy="10" r="6" fill={['#FF69B4', '#FFB6C1', '#FF1493'][i % 3]} />
              <circle cx="8" cy="10" r="2" fill="#FFD700" />
            </svg>
          </motion.div>
        ))}
      </div>
    ),
    school: (
      <svg width="160" height="120" viewBox="0 0 160 120" style={{ imageRendering: 'pixelated' }}>
        {/* Building */}
        <rect x="10" y="40" width="140" height="80" fill="#E8DCC8" />
        {/* Roof */}
        <polygon points="80,10 10,40 150,40" fill="#8B4513" />
        {/* Door */}
        <rect x="65" y="70" width="30" height="50" fill="#6B4423" />
        {/* Windows */}
        <rect x="25" y="55" width="25" height="30" fill="#87CEEB" />
        <rect x="110" y="55" width="25" height="30" fill="#87CEEB" />
        {/* Flag */}
        <rect x="76" y="15" width="2" height="25" fill="#4A4A4A" />
        <rect x="78" y="15" width="12" height="8" fill="#FF6B6B" />
      </svg>
    ),
    lockers: (
      <svg width="96" height="80" viewBox="0 0 96 80" style={{ imageRendering: 'pixelated' }}>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={i * 24} y="0" width="22" height="80" fill="#4A90D9" />
            <rect x={i * 24 + 2} y="4" width="18" height="20" fill="#3A7AC4" />
            <circle cx={i * 24 + 18} cy="40" r="2" fill="#2D5A8A" />
          </g>
        ))}
      </svg>
    ),
  };

  return (
    <div
      className="absolute bottom-0"
      style={{ left: x }}
    >
      {elements[type]}
    </div>
  );
}
