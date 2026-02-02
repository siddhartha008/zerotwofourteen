import { motion } from 'framer-motion';
import { heartPulseVariants } from '../animations/variants';

export function Heart({ 
  size = 24, 
  color = "#FF69B4", 
  pulse = false,
  className = "",
  style = {} 
}) {
  const Wrapper = pulse ? motion.div : 'div';
  const wrapperProps = pulse ? {
    variants: heartPulseVariants,
    animate: "animate",
  } : {};

  return (
    <Wrapper className={`inline-block ${className}`} style={style} {...wrapperProps}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill={color}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </Wrapper>
  );
}

export function FloatingHearts({ count = 8 }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 16 + 12,
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 2,
    left: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.4 + 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: heart.left, bottom: -50 }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 50],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart size={heart.size} color={`rgba(255, 105, 180, ${heart.opacity})`} />
        </motion.div>
      ))}
    </div>
  );
}
