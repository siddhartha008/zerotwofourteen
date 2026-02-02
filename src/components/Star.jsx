import { motion } from 'framer-motion';
import { starTwinkleVariants } from '../animations/variants';

export function Star({ 
  size = 4, 
  delay = 0, 
  className = "",
  style = {} 
}) {
  return (
    <motion.div
      className={`absolute rounded-full bg-star ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      variants={starTwinkleVariants}
      animate="animate"
      custom={delay}
    />
  );
}

export function StarField({ count = 50 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <Star
          key={star.id}
          size={star.size}
          delay={star.delay}
          style={{ left: star.left, top: star.top }}
        />
      ))}
    </div>
  );
}
