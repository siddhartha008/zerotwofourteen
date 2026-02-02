// Framer Motion animation variants

// Page/Scene transitions
export const sceneVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
    },
  },
};

// Stagger children animations
export const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const childVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Floating animation for decorative elements
export const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Heart pulse animation
export const heartPulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Star twinkle animation
export const starTwinkleVariants = {
  animate: (delay = 0) => ({
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    },
  }),
};

// Button hover animations
export const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Yes button special animation
export const yesButtonVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0 4px 15px rgba(255, 105, 180, 0.3)",
  },
  hover: {
    scale: 1.1,
    boxShadow: "0 8px 30px rgba(255, 105, 180, 0.5)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Celebration confetti burst
export const confettiBurstVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.5, 1],
    opacity: [0, 1, 1],
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Path drawing animation (for connection lines)
export const pathDrawVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, ease: "easeInOut" },
      opacity: { duration: 0.5 },
    },
  },
};

// Scroll-triggered fade in
export const fadeInUpVariants = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Moon glow animation
export const moonGlowVariants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(245, 245, 220, 0.3)",
      "0 0 40px rgba(245, 245, 220, 0.5)",
      "0 0 20px rgba(245, 245, 220, 0.3)",
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Message envelope animation
export const envelopeVariants = {
  initial: { x: -100, opacity: 0, rotate: -10 },
  animate: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  float: {
    y: [-5, 5, -5],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
