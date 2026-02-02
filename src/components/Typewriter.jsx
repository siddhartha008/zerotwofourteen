import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Typewriter({ 
  text, 
  delay = 0, 
  speed = 0.05, 
  className = "",
  onComplete = () => {},
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout;
    const startTyping = () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed * 1000);
        } else {
          setIsComplete(true);
          onComplete();
        }
      };
      type();
    };

    const delayTimeout = setTimeout(startTyping, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, delay, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}

export function TypewriterParagraph({ 
  lines, 
  className = "",
  lineClassName = "",
  staggerDelay = 2,
}) {
  const [currentLine, setCurrentLine] = useState(0);

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div key={index} className={lineClassName}>
          {index <= currentLine && (
            <Typewriter 
              text={line}
              delay={index === 0 ? 0 : 0.3}
              onComplete={() => {
                if (index === currentLine && index < lines.length - 1) {
                  setTimeout(() => setCurrentLine(index + 1), staggerDelay * 1000);
                }
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
