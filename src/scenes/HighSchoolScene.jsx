import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from '../components/Star';
import { MagicSparkles } from '../components/HarryPotter';
import { sceneVariants, containerVariants, childVariants } from '../animations/variants';
import { TEXTS } from '../constants/texts';

function StoryCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`bg-night-lighter/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-pink-soft/20 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

function ChatBubble({ text, isHer = false, delay = 0 }) {
  return (
    <motion.div
      className={`flex ${isHer ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, x: isHer ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
        isHer 
          ? 'bg-pink-warm/20 text-pink-soft rounded-bl-sm' 
          : 'bg-blue-500/20 text-blue-200 rounded-br-sm'
      }`}>
        <p className="text-sm md:text-base">{text}</p>
      </div>
    </motion.div>
  );
}

export function HighSchoolScene({ onContinue }) {
  const [section, setSection] = useState(0);
  const { highSchool } = TEXTS;

  const nextSection = () => {
    if (section < 3) {
      setSection(section + 1);
    } else {
      onContinue();
    }
  };

  return (
    <motion.section
      className="relative min-h-screen bg-gradient-to-b from-[#0a0a1a] via-night to-[#0a0a1a] py-16 px-6 overflow-hidden"
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <StarField count={40} />
      <MagicSparkles count={15} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Section 0: The Intimidating Girl */}
          {section === 0 && (
            <motion.div
              key="section-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StoryCard>
                <h2 className="font-cursive text-3xl md:text-4xl text-pink-soft mb-6">
                  {highSchool.title}
                </h2>
                
                <div className="space-y-4 text-pink-soft/80">
                  {highSchool.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.5 }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                {/* Om Shanti Om reference */}
                <motion.div
                  className="mt-8 p-4 bg-pink-warm/10 rounded-xl border-l-4 border-pink-warm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 }}
                >
                  <p className="text-pink-soft/90 italic">{highSchool.omShanti}</p>
                </motion.div>

                <motion.p
                  className="mt-6 text-pink-soft/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  {highSchool.blankedOut}
                </motion.p>
              </StoryCard>
            </motion.div>
          )}

          {/* Section 1: Harry Potter Conversation */}
          {section === 1 && (
            <motion.div
              key="section-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StoryCard>
                <h3 className="text-center text-pink-soft/60 mb-6 text-sm uppercase tracking-wider">
                  The Conversation
                </h3>
                
                <div className="space-y-4">
                  <ChatBubble 
                    text={highSchool.harryPotter.question} 
                    isHer={false} 
                    delay={0.2} 
                  />
                  
                  <motion.p
                    className="text-center text-pink-soft/60 text-sm py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {highSchool.harryPotter.reaction}
                  </motion.p>
                  
                  <ChatBubble 
                    text="Have you read the books?" 
                    isHer={true} 
                    delay={1.2} 
                  />
                  
                  <ChatBubble 
                    text={highSchool.harryPotter.confession} 
                    isHer={false} 
                    delay={1.8} 
                  />
                  
                  <ChatBubble 
                    text={highSchool.harryPotter.herReaction} 
                    isHer={true} 
                    delay={2.4} 
                  />
                </div>

                <motion.p
                  className="mt-8 text-center text-pink-soft/70 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  {highSchool.harryPotter.aftermath}
                </motion.p>
              </StoryCard>
            </motion.div>
          )}

          {/* Section 2: Walk Home */}
          {section === 2 && (
            <motion.div
              key="section-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StoryCard>
                <motion.span 
                  className="text-pink-warm text-sm uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {highSchool.walkHome.title}
                </motion.span>
                
                <motion.p
                  className="mt-4 text-pink-soft/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {highSchool.walkHome.setup}
                </motion.p>
                
                <motion.p
                  className="mt-4 text-pink-soft/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {highSchool.walkHome.twist}
                </motion.p>
                
                <motion.div
                  className="mt-6 p-6 bg-pink-deep/10 rounded-xl text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  <p className="text-xl text-pink-soft font-semibold">
                    {highSchool.walkHome.punchline}
                  </p>
                </motion.div>
                
                <motion.p
                  className="mt-6 text-pink-soft/60 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  {highSchool.walkHome.aftermath}
                </motion.p>
              </StoryCard>
            </motion.div>
          )}

          {/* Section 3: High School Ends */}
          {section === 3 && (
            <motion.div
              key="section-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                className="mb-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <span className="text-6xl">🎓</span>
              </motion.div>
              
              <motion.p
                className="text-xl md:text-2xl text-pink-soft/80 leading-relaxed max-w-lg mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {highSchool.ending}
              </motion.p>
              
              <motion.div
                className="mt-8 flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="h-px w-12 bg-pink-soft/30" />
                <span className="text-pink-soft/40 text-sm">Or so I thought...</span>
                <div className="h-px w-12 bg-pink-soft/30" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button */}
        <motion.button
          className="mt-12 mx-auto flex items-center gap-2 px-6 py-3 bg-pink-warm/20 hover:bg-pink-warm/30 text-pink-soft rounded-full transition-colors"
          onClick={nextSection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{section < 3 ? 'Continue' : 'Next Chapter'}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.section>
  );
}
