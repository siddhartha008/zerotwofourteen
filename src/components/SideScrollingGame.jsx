import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelCharacter, HuggingCouple } from './PixelCharacter';
import { ParallaxBackground, WorldElements } from './ParallaxWorld';

// Story scenes with character interactions
const STORY_SCENES = [
  {
    x: 100,
    section: 'school',
    context: "2017 • Day 1 of High School",
    type: 'narration',
  },
  {
    x: 500,
    section: 'school',
    context: "She walked in like she knew everyone...",
    type: 'narration',
  },
  {
    x: 900,
    section: 'school',
    type: 'scene',
    boy: { x: 950, direction: 'right', state: 'idle' },
    girlBubble: null,
    boyBubble: "Timilai Harry Potter ko movie man parcha?",
    context: "She was my high school crush.",
  },
  {
    x: 1100,
    section: 'school',
    type: 'scene',
    boy: { x: 1150, direction: 'right', state: 'idle' },
    girlBubble: "Meh, books are better.",
    boyBubble: null,
    context: null,
  },
  {
    x: 1600,
    section: 'street',
    context: "a few weeks later...",
    type: 'narration',
  },
  {
    x: 1900,
    section: 'street',
    type: 'scene',
    boy: { x: 1950, direction: 'right', state: 'wave' },
    girlBubble: null,
    boyBubble: "Walk home together?",
    context: null,
  },
  {
    x: 2200,
    section: 'street',
    type: 'scene',
    boy: { x: 2250, direction: 'right', state: 'idle' },
    girlBubble: "Sure! See you later.",
    boyBubble: null,
    context: null,
  },
  {
    x: 2600,
    section: 'street',
    type: 'animated_scene',
    id: 'ditched',
    context: "She had already left.",
  },
  // Years section: 1) intro first, 2) she walks through day/night, 3) remaining message at end, 4) walk to exit
  {
    x: 4280,
    section: 'years',
    context: "Years passed. We became good friends. High school ended. I thought that was it...",
    type: 'narration',
  },
  {
    x: 6160,
    section: 'years',
    context: "But the universe had other plans.",
    type: 'narration',
  },
  {
    x: 6175,
    section: 'ldr',
    context: "Kathmandu ↔ Austin • 8,500 miles apart",
    type: 'narration',
  },
  {
    x: 6320,
    section: 'ldr',
    context: "Our long distance started.",
    type: 'narration',
  },
  {
    x: 6350,
    section: 'ldr',
    context: "Although distance introduced us...",
    type: 'narration',
  },
  {
    x: 6400,
    section: 'ldr',
    type: 'animated_scene',
    id: 'ldr_walk',
    context: null,
  },
];

const WORLD_WIDTH = 7000;
const FINAL_X = 6800;
const BOY_FINAL_POSITION = 6900;
const GROUND_LEVEL = 20; // pixels from bottom

// Mini-game constants - full screen width game area
const MINIGAME_START_X = 2700;
const MINIGAME_END_X = 4200;
// Years passing section - wide so character walks all the way to the right
const YEARS_SECTION_END = 6185;
const GRAVITY = 0.8;
const JUMP_FORCE = -15;
const MINIGAME_FLOWERS = [
  { x: 2900, y: 130, collected: false },  // Left
  { x: 3400, y: 150, collected: false },  // Middle
  { x: 3900, y: 150, collected: false },  // End (right)
];
const MINIGAME_OBSTACLES = [
  { x: 3000, width: 50, height: 35 },
  { x: 3500, width: 60, height: 45 },
  { x: 3800, width: 50, height: 40 },
];

export function SideScrollingGame() {
  const [playerX, setPlayerX] = useState(50);
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState('right');
  const [currentScene, setCurrentScene] = useState(null);
  const [scenesTriggered, setScenesTriggered] = useState([]);
  const [gamePhase, setGamePhase] = useState('intro'); // Start with intro screen
  const [currentSection, setCurrentSection] = useState('school');
  const [showControlHint, setShowControlHint] = useState(true);
  const [showIntro, setShowIntro] = useState(true); // Welcome intro screen

  // Animated scene states
  const [animatedScenePhase, setAnimatedScenePhase] = useState(0);
  const [boyAnimX, setBoyAnimX] = useState(0);
  const [boyAnimState, setBoyAnimState] = useState('idle');
  const [boyAnimDir, setBoyAnimDir] = useState('right');
  const [girlVisible, setGirlVisible] = useState(true);
  const [showBoyBubble, setShowBoyBubble] = useState(false);

  // Mini-game states
  const [playerY, setPlayerY] = useState(0);
  const [velocityY, setVelocityY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [flowersCollected, setFlowersCollected] = useState([false, false, false]);
  const [minigameActive, setMinigameActive] = useState(false);
  const [minigameComplete, setMinigameComplete] = useState(false);
  const [minigameIntro, setMinigameIntro] = useState(false); // Show intro screen
  const [minigameStarted, setMinigameStarted] = useState(false); // Player pressed space to start
  const [showCompletionMessage, setShowCompletionMessage] = useState(false); // Show message after collecting all flowers

  const keysPressed = useRef({ left: false, right: false });
  const gameLoopRef = useRef(null);
  const minigameIntroRef = useRef(minigameIntro);
  const outroAudioRef = useRef(null);

  const isDitchedScene = currentScene?.type === 'animated_scene' && currentScene?.id === 'ditched';
  const isLdrWalkScene = currentScene?.type === 'animated_scene' && currentScene?.id === 'ldr_walk';
  const canDismissAnimatedScene = (isDitchedScene && animatedScenePhase >= 7) || (isLdrWalkScene && animatedScenePhase >= 4);

  // Play "Irresistible" during outro
  useEffect(() => {
    if (gamePhase === 'celebration' && outroAudioRef.current) {
      outroAudioRef.current.volume = 0.5;
      outroAudioRef.current.play().catch(() => { });
    }
  }, [gamePhase]);

  // Hide control hint after first interaction
  useEffect(() => {
    const hideHint = () => {
      setShowControlHint(false);
      window.removeEventListener('keydown', hideHint);
      window.removeEventListener('click', hideHint);
    };
    window.addEventListener('keydown', hideHint);
    window.addEventListener('click', hideHint);
    return () => {
      window.removeEventListener('keydown', hideHint);
      window.removeEventListener('click', hideHint);
    };
  }, []);

  // Determine current section based on position
  useEffect(() => {
    if (playerX < 1500) setCurrentSection('school');
    else if (playerX < MINIGAME_START_X) setCurrentSection('street');
    else if (playerX >= MINIGAME_START_X && playerX < MINIGAME_END_X) setCurrentSection('game');
    else if (playerX < YEARS_SECTION_END) setCurrentSection('years');
    else if (playerX < 6900) setCurrentSection('ldr');
    else setCurrentSection('romantic');
  }, [playerX]);

  // Keep ref in sync with minigameIntro state
  useEffect(() => {
    minigameIntroRef.current = minigameIntro;
  }, [minigameIntro]);

  // Trigger minigame intro when entering game section
  useEffect(() => {
    if (currentSection === 'game' && !minigameIntro && !minigameComplete && !minigameStarted) {
      setMinigameIntro(true);
    }
  }, [currentSection, minigameIntro, minigameComplete, minigameStarted]);

  // Start minigame function
  const startMinigame = useCallback(() => {
    if (minigameIntro && !minigameStarted) {
      setMinigameIntro(false);
      setMinigameStarted(true);
      setMinigameActive(true);
    }
  }, [minigameIntro, minigameStarted]);

  // Mini-game physics loop
  useEffect(() => {
    if (!minigameActive) return;

    const gameLoop = setInterval(() => {
      setVelocityY(prev => prev + GRAVITY);
      setPlayerY(prev => {
        const newY = prev + velocityY;
        if (newY >= 0) {
          setVelocityY(0);
          setIsJumping(false);
          return 0;
        }
        return newY;
      });

      // Check flower collection
      MINIGAME_FLOWERS.forEach((flower, index) => {
        if (!flowersCollected[index]) {
          const playerCenterX = playerX;
          const playerTop = GROUND_LEVEL - playerY + 80;
          const flowerY = flower.y;

          if (Math.abs(playerCenterX - flower.x) < 40 &&
            playerTop > flowerY - 30 && playerTop < flowerY + 30) {
            setFlowersCollected(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        }
      });

      // Check if all flowers collected - show message instead of immediately completing
      if (flowersCollected.every(f => f) && !minigameComplete && !showCompletionMessage) {
        setShowCompletionMessage(true);
      }

      // Auto-stop physics when complete and grounded
      if (minigameComplete && playerY === 0) {
        setMinigameActive(false);
      }
    }, 16);

    return () => clearInterval(gameLoop);
  }, [minigameActive, playerX, playerY, velocityY, flowersCollected, minigameComplete, showCompletionMessage]);

  // Check for story scenes
  useEffect(() => {
    if (gamePhase !== 'playing') return;

    const scene = STORY_SCENES.find(s =>
      Math.abs(playerX - s.x) < 60 && !scenesTriggered.includes(s.x)
    );

    if (scene && !currentScene) {
      setCurrentScene(scene);

      // If it's an animated scene, start the animation
      if (scene.type === 'animated_scene' && scene.id === 'ditched') {
        runDitchedAnimation();
      }
      if (scene.type === 'animated_scene' && scene.id === 'ldr_walk') {
        runLdrWalkAnimation(scene.x);
      }
    }
  }, [playerX, scenesTriggered, currentScene, gamePhase]);

  // Run the "ditched" animated scene
  const runDitchedAnimation = async () => {
    const sceneX = 2600;
    const cameraOffset = window.innerWidth / 2;

    // Phase 1: Girl disappears (she already left)
    setAnimatedScenePhase(1);
    setGirlVisible(false);
    await wait(800);

    // Phase 2: Boy walks in from left looking for her
    setAnimatedScenePhase(2);
    setBoyAnimX(sceneX - 200);
    setBoyAnimState('walk');
    setBoyAnimDir('right');

    // Animate boy walking in
    let bx = sceneX - 200;
    const walkIn = setInterval(() => {
      bx += 4;
      setBoyAnimX(bx);
      if (bx >= sceneX - 50) {
        clearInterval(walkIn);
        setBoyAnimState('idle');
        setShowBoyBubble(true);
      }
    }, 30);

    await wait(2000);

    // Phase 3: Boy looks around, walks left looking for her
    setAnimatedScenePhase(3);
    setShowBoyBubble(false);
    await wait(500);
    setBoyAnimDir('left');
    setBoyAnimState('walk');

    let bx2 = sceneX - 50;
    const walkLeft = setInterval(() => {
      bx2 -= 3;
      setBoyAnimX(bx2);
      if (bx2 <= sceneX - 150) {
        clearInterval(walkLeft);
        setBoyAnimState('idle');
      }
    }, 30);

    await wait(1500);

    // Phase 4: (girl stays hidden)
    setAnimatedScenePhase(4);

    // Phase 5: Boy walks back alone to the left (sad)
    setAnimatedScenePhase(5);
    setBoyAnimDir('left');
    setBoyAnimState('walk');

    let bx3 = sceneX - 150;
    const walkAway = setInterval(() => {
      bx3 -= 3;
      setBoyAnimX(bx3);
      if (bx3 <= sceneX - 400) {
        clearInterval(walkAway);
      }
    }, 30);

    await wait(2500);

    // Phase 6: Boy disappears, then show her (she reappears after he's gone)
    setAnimatedScenePhase(6);
    setGirlVisible(true);

    await wait(500);

    // Phase 7: Done, ready to dismiss
    setAnimatedScenePhase(7);
  };

  const runLdrWalkAnimation = async (sceneX) => {
    const startX = sceneX - 320;
    const reachX = sceneX;

    // Phase 1: Boy walks from LEFT side of screen to center (where she is)
    setAnimatedScenePhase(1);
    setBoyAnimX(startX);
    setBoyAnimState('walk');
    setBoyAnimDir('right');
    setShowBoyBubble(false);

    let bx = startX;
    const walkToHer = setInterval(() => {
      bx += 4;
      setBoyAnimX(bx);
      if (bx >= reachX - 30) {
        clearInterval(walkToHer);
        setBoyAnimState('idle');
        setShowBoyBubble(true);
      }
    }, 30);

    await wait(2800);

    // Phase 2: Show "...love defined us" (already shown when he reached)
    setAnimatedScenePhase(2);
    await wait(2200);

    // Phase 3: Show "the rest is magical history" automatically
    setAnimatedScenePhase(3);
    setShowBoyBubble(false);
    await wait(2500);

    // Phase 4: Automatically go to question/finale
    setAnimatedScenePhase(4);
    await wait(500);

    // Dismiss the scene and go straight to finale
    setScenesTriggered(prev => [...prev, sceneX]);
    setCurrentScene(null);
    setAnimatedScenePhase(0);
    setGirlVisible(true);
    setGamePhase('question');
  };

  // Check for finale trigger (after LDR walk, no more story scenes until outro)
  useEffect(() => {
    if (playerX >= FINAL_X && gamePhase === 'playing') {
      setGamePhase('question');
    }
  }, [playerX, gamePhase]);

  // Game loop
  useEffect(() => {
    const speed = 5;

    const gameLoop = () => {
      if (currentScene || gamePhase !== 'playing') {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      let moving = false;
      let newX = playerX;

      // Block movement during minigame intro (use ref for current value)
      if (minigameIntroRef.current) {
        setIsWalking(false);
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Calculate max X - block at minigame end if flowers not collected
      const inMinigameZone = playerX >= MINIGAME_START_X && playerX < MINIGAME_END_X;
      const maxX = (!minigameComplete && !showCompletionMessage && inMinigameZone)
        ? MINIGAME_END_X - 50
        : WORLD_WIDTH - 100;

      // Block movement during completion message or while jumping in minigame
      const isJumpingInMinigame = inMinigameZone && isJumping;
      const canMove = !showCompletionMessage && !isJumpingInMinigame;

      if (canMove && keysPressed.current.right && playerX < maxX) {
        newX = Math.min(playerX + speed, maxX);
        setDirection('right');
        moving = true;
      } else if (canMove && keysPressed.current.right && inMinigameZone && !minigameComplete && !showCompletionMessage && playerX >= maxX - 10) {
        // Bounce back effect when hitting the wall without all flowers
        newX = playerX - 15;
        setDirection('left');
        moving = true;
      } else if (canMove && keysPressed.current.left && playerX > 0) {
        newX = Math.max(playerX - speed, 0);
        setDirection('left');
        moving = true;
      }

      if (moving) {
        setPlayerX(newX);
        setIsWalking(true);
      } else {
        setIsWalking(false);
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [playerX, currentScene, gamePhase, minigameComplete, showCompletionMessage, isJumping]);

  // Jump function for minigame - only jump when on ground (playerY === 0)
  const jump = useCallback(() => {
    if (playerY === 0 && minigameActive && !isJumping) {
      setVelocityY(JUMP_FORCE);
      setIsJumping(true);
    }
  }, [playerY, minigameActive, isJumping]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = true;
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = true;
      }
      // Jump with ArrowUp or Space (when in minigame and no scene active)
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && minigameActive && !currentScene) {
        jump();
      }
      if ((e.key === ' ' || e.key === 'Enter') && currentScene) {
        // Only dismiss if animated scene is complete
        if (currentScene.type === 'animated_scene') {
          if (canDismissAnimatedScene) {
            dismissScene();
          }
        } else {
          dismissScene();
        }
      }
      // Space to start game from welcome intro
      if (e.key === ' ' && showIntro) {
        e.preventDefault();
        setShowIntro(false);
        setGamePhase('playing');
      }
      // Space to start minigame from intro
      if (e.key === ' ' && minigameIntro && !showIntro) {
        e.preventDefault();
        startMinigame();
      }
      // Space to jump when in minigame and no scene
      if (e.key === ' ' && minigameActive && !currentScene && !minigameIntro && !showIntro && !showCompletionMessage) {
        e.preventDefault();
        jump();
      }
      // Space to dismiss completion message and continue
      if (e.key === ' ' && showCompletionMessage) {
        e.preventDefault();
        setShowCompletionMessage(false);
        setMinigameComplete(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = false;
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentScene, animatedScenePhase, canDismissAnimatedScene, minigameActive, minigameIntro, showIntro, showCompletionMessage, jump, startMinigame]);

  // Touch/mouse controls disabled - arrow keys only
  const handleTouchMove = useCallback(() => {
    // Disabled - use arrow keys only
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Disabled - use arrow keys only
  }, []);

  const dismissScene = () => {
    if (!currentScene) return;
    setScenesTriggered(prev => [...prev, currentScene.x]);
    setCurrentScene(null);
    setAnimatedScenePhase(0);
    setShowBoyBubble(false);
    setGirlVisible(true);
  };

  const handleSceneClick = () => {
    if (!currentScene) return;
    if (currentScene.type === 'animated_scene') {
      if (canDismissAnimatedScene) {
        dismissScene();
      }
    } else {
      dismissScene();
    }
  };

  const handleYes = () => {
    setGamePhase('finale');
    setIsWalking(true);
    setDirection('right');
    let x = playerX;
    const interval = setInterval(() => {
      x += 4;
      setPlayerX(x);
      if (x >= BOY_FINAL_POSITION - 30) {
        clearInterval(interval);
        setIsWalking(false);
        setGamePhase('celebration');
      }
    }, 30);
  };

  // Section-based camera - player moves from left to right within each section
  const getSectionBounds = () => {
    if (playerX < 1500) return { start: 0, end: 1500 };
    if (playerX < MINIGAME_START_X) return { start: 1500, end: MINIGAME_START_X };
    if (playerX < MINIGAME_END_X) return { start: MINIGAME_START_X, end: MINIGAME_END_X };
    if (playerX < YEARS_SECTION_END) return { start: MINIGAME_END_X, end: YEARS_SECTION_END };
    if (playerX < 6900) return { start: YEARS_SECTION_END, end: 6900 };
    return { start: 6900, end: WORLD_WIDTH };
  };

  const section = getSectionBounds();
  const sectionWidth = section.end - section.start;
  const playerInSection = playerX - section.start;
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

  // Camera follows player - linear follow in years section so she walks all the way to the right
  const maxCameraOffset = Math.max(0, sectionWidth - screenWidth);
  const isYearsSection = currentSection === 'years';
  const cameraProgress = isYearsSection
    ? Math.min(1, Math.max(0, playerInSection / sectionWidth)) // linear: she reaches right edge at section end
    : Math.min(1, Math.max(0, (playerInSection - screenWidth * 0.3) / Math.max(1, sectionWidth - screenWidth * 0.6)));
  const cameraX = section.start + (cameraProgress * maxCameraOffset);

  // Find if there's a boy character in the current scene
  const activeSceneBoy = currentScene?.boy;

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[#0a0a1a] select-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Outro background music - Irresistible */}
      <audio
        ref={outroAudioRef}
        src="/irresistible.mp3"
        loop
        preload="auto"
      />

      {/* Parallax Background */}
      <ParallaxBackground scrollX={cameraX} playerX={playerX} section={currentSection} />

      {/* World Elements */}
      <WorldElements scrollX={cameraX} worldWidth={WORLD_WIDTH} />

      {/* Mini-game elements */}
      {currentSection === 'game' && (
        <>
          {/* Collectible Flowers */}
          {MINIGAME_FLOWERS.map((flower, i) => (
            !flowersCollected[i] && (
              <motion.div
                key={`flower-${i}`}
                className="absolute"
                style={{
                  left: flower.x - cameraX,
                  bottom: flower.y,
                  transform: 'translateX(-50%)',
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <svg width="32" height="40" viewBox="0 0 32 40" style={{ imageRendering: 'pixelated' }}>
                  {/* Stem */}
                  <rect x="14" y="20" width="4" height="20" fill="#228B22" />
                  {/* Petals */}
                  <circle cx="10" cy="10" r="8" fill="#FF69B4" />
                  <circle cx="22" cy="10" r="8" fill="#FF69B4" />
                  <circle cx="10" cy="18" r="8" fill="#FF69B4" />
                  <circle cx="22" cy="18" r="8" fill="#FF69B4" />
                  {/* Center */}
                  <circle cx="16" cy="14" r="6" fill="#FFD700" />
                </svg>
              </motion.div>
            )
          ))}

          {/* Flowers collected counter */}
          <div className="absolute top-4 right-4 bg-black/90 px-4 py-3 border-4 border-pink-400 flex items-center gap-3 z-30" style={{ boxShadow: '3px 3px 0 #FF1493' }}>
            <span className="text-pink-200 text-xs" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              {flowersCollected.filter(f => f).length}/3
            </span>
          </div>

          {/* Completion message - wait for space to continue */}
          {showCompletionMessage && (
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 px-8 py-8 border-4 border-pink-400 z-30 max-w-md text-center"
              style={{ boxShadow: '4px 4px 0 #FF1493' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="text-pink-200 text-xs leading-loose mb-6" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                All flowers collected!<br /><br />
                <span className="text-pink-300">Give them to him at the end!</span>
              </p>
              <motion.div
                className="inline-block bg-pink-500 text-white px-6 py-3 border-4 border-pink-300"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px', boxShadow: '3px 3px 0 #FF1493' }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                PRESS SPACE
              </motion.div>
            </motion.div>
          )}
        </>
      )}

      {/* Welcome Intro Screen - Pixelated */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 z-50 bg-[#1a0a2a] flex items-center justify-center"
            style={{ imageRendering: 'pixelated' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Pixel stars background */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-pink-300"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${4 + Math.floor(Math.random() * 4)}px`,
                  height: `${4 + Math.floor(Math.random() * 4)}px`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 1 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
              />
            ))}

            {/* Pixel hearts floating */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  delay: i * 0.5,
                  repeat: Infinity,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
                  <rect x="4" y="4" width="4" height="4" fill="#FF69B4" />
                  <rect x="12" y="4" width="4" height="4" fill="#FF69B4" />
                  <rect x="0" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="4" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="8" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="12" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="16" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="4" y="12" width="4" height="4" fill="#FF69B4" />
                  <rect x="8" y="12" width="4" height="4" fill="#FF69B4" />
                  <rect x="12" y="12" width="4" height="4" fill="#FF69B4" />
                  <rect x="8" y="16" width="4" height="4" fill="#FF69B4" />
                </svg>
              </motion.div>
            ))}

            <motion.div
              className="text-center px-8 py-10 max-w-2xl z-10"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Pixel heart */}
              <motion.div
                className="mb-8 flex justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <svg width="64" height="64" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
                  <rect x="4" y="4" width="4" height="4" fill="#FF1493" />
                  <rect x="12" y="4" width="4" height="4" fill="#FF1493" />
                  <rect x="0" y="8" width="4" height="4" fill="#FF1493" />
                  <rect x="4" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="8" y="8" width="4" height="4" fill="#FF1493" />
                  <rect x="12" y="8" width="4" height="4" fill="#FF1493" />
                  <rect x="16" y="8" width="4" height="4" fill="#FF1493" />
                  <rect x="4" y="12" width="4" height="4" fill="#FF1493" />
                  <rect x="8" y="12" width="4" height="4" fill="#FF1493" />
                  <rect x="12" y="12" width="4" height="4" fill="#FF1493" />
                  <rect x="8" y="16" width="4" height="4" fill="#FF1493" />
                </svg>
              </motion.div>

              <p
                className="text-pink-200/80 text-xs md:text-sm mb-10"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                Use ← → to move
              </p>

              <motion.div
                className="inline-block bg-pink-500 text-white px-6 py-4 cursor-pointer border-4 border-pink-300"
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '12px',
                  boxShadow: '4px 4px 0 #FF1493',
                }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setShowIntro(false);
                  setGamePhase('playing');
                }}
              >
                SPACE to continue
              </motion.div>

              <motion.div
                className="mt-10 flex justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
                  <rect x="4" y="4" width="4" height="4" fill="#FF69B4" />
                  <rect x="12" y="4" width="4" height="4" fill="#FF69B4" />
                  <rect x="0" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="4" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="8" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="12" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="16" y="8" width="4" height="4" fill="#FF69B4" />
                  <rect x="4" y="12" width="4" height="4" fill="#FF69B4" />
                  <rect x="8" y="12" width="4" height="4" fill="#FF69B4" />
                  <rect x="12" y="12" width="4" height="4" fill="#FF69B4" />
                  <rect x="8" y="16" width="4" height="4" fill="#FF69B4" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minigame Intro Screen */}
      <AnimatePresence>
        {minigameIntro && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center px-8 py-10 max-w-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2
                className="text-pink-300 text-xs md:text-sm mb-8 leading-loose"
                style={{ fontFamily: "'Press Start 2P', cursive", textShadow: '2px 2px 0 #FF1493' }}
              >
                Collect all three flowers for Koshish!
              </h2>
              <div className="text-pink-200/80 text-xs mb-8 space-y-3" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                <p>↑ to jump</p>
                <p>← → to move</p>
              </div>
              <motion.div
                className="inline-block bg-pink-500 text-white px-6 py-4 border-4 border-pink-300"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px', boxShadow: '4px 4px 0 #FF1493' }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                PRESS SPACE
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Scene Boy (ditched + LDR walk) */}
      <AnimatePresence>
        {((isDitchedScene && animatedScenePhase >= 2 && animatedScenePhase < 6) || (isLdrWalkScene && animatedScenePhase >= 1)) && (
          <motion.div
            className="absolute z-10"
            style={{
              left: boyAnimX - cameraX,
              bottom: GROUND_LEVEL,
              transform: 'translateX(-50%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PixelCharacter
              character="boy"
              state={boyAnimState}
              direction={boyAnimDir}
              scale={1.5}
            />

            {/* Boy's speech bubble (ditched vs LDR) */}
            <AnimatePresence>
              {showBoyBubble && (
                <motion.div
                  className="absolute -top-28 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="bg-white px-4 py-3 border-4 border-gray-800 w-52 relative" style={{ boxShadow: '3px 3px 0 #333' }}>
                    <p className="text-gray-800 text-xs text-center leading-relaxed" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                      {isLdrWalkScene ? '...love defined us' : 'oops did i just get ditched?'}
                    </p>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "The rest is magical history" message - LDR phase 3 */}
      <AnimatePresence>
        {isLdrWalkScene && animatedScenePhase === 3 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-black/90 px-8 py-6 border-4 border-pink-400" style={{ boxShadow: '4px 4px 0 #FF1493' }}>
              <p className="text-pink-200 text-sm text-center leading-relaxed" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                And the rest is a magical history and a magical future.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene Boy Character (appears during regular scenes) */}
      <AnimatePresence>
        {activeSceneBoy && currentScene && !isDitchedScene && !isLdrWalkScene && (
          <motion.div
            className="absolute z-10"
            style={{
              left: activeSceneBoy.x - cameraX,
              bottom: GROUND_LEVEL,
              transform: 'translateX(-50%)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <PixelCharacter
              character="boy"
              state={activeSceneBoy.state || 'idle'}
              direction={activeSceneBoy.direction || 'left'}
              scale={1.5}
            />

            {/* Boy's speech bubble */}
            {currentScene.boyBubble && (
              <motion.div
                className="absolute -top-28 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white px-4 py-3 border-4 border-gray-800 w-56 relative" style={{ boxShadow: '3px 3px 0 #333' }}>
                  <p className="text-gray-800 text-xs text-center leading-relaxed" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                    {currentScene.boyBubble}
                  </p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-white" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Girl Character (Player) */}
      {gamePhase !== 'celebration' && (
        <AnimatePresence>
          {(girlVisible || !isDitchedScene) && (
            <motion.div
              className="absolute z-10"
              style={{
                left: playerX - cameraX,
                bottom: GROUND_LEVEL - playerY,
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              {/* Show flowers walking during finale, girl character otherwise */}
              {gamePhase === 'finale' ? (
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                >
                  <img
                    src="/flower.png"
                    alt="Flowers"
                    style={{
                      width: '120px',
                      height: 'auto',
                      imageRendering: 'pixelated'
                    }}
                  />
                </motion.div>
              ) : (
                <PixelCharacter
                  character="girl"
                  state={isWalking ? 'walk' : (isJumping ? 'walk' : 'idle')}
                  direction={direction}
                  scale={1.5}
                />
              )}

              {/* Girl's speech bubble */}
              <AnimatePresence>
                {currentScene?.girlBubble && !isDitchedScene && (
                  <motion.div
                    className="absolute -top-28 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-pink-200 px-4 py-3 border-4 border-pink-500 w-56 relative" style={{ boxShadow: '3px 3px 0 #FF1493' }}>
                      <p className="text-gray-800 text-xs text-center leading-relaxed" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                        {currentScene.girlBubble}
                      </p>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-pink-200" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Boy at the end (visible when approaching or during finale) */}
      {((playerX > BOY_FINAL_POSITION - 500 && gamePhase === 'playing' && !currentScene) || gamePhase === 'finale') && (
        <motion.div
          className="absolute z-10"
          style={{
            left: gamePhase === 'finale' ? '50%' : BOY_FINAL_POSITION - cameraX,
            bottom: GROUND_LEVEL,
            transform: 'translateX(-50%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <PixelCharacter
            character="boy"
            state="wave"
            direction="left"
            scale={2.5}
          />
        </motion.div>
      )}

      {/* Celebration: darker overlay + kissing image - focused on text */}
      {gamePhase === 'celebration' && (
        <>
          <div className="absolute inset-0 z-[9] bg-black/75" />
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{ paddingTop: '25%' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <HuggingCouple scale={1.2} />
          </motion.div>
        </>
      )}

      {/* Context/Narration Text - CENTERED */}
      <AnimatePresence>
        {currentScene && currentScene.context && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Click anywhere to continue overlay */}
            <div
              className="absolute inset-0 pointer-events-auto cursor-pointer"
              onClick={handleSceneClick}
            />

            {/* Context text in center - Pixelated */}
            <motion.div
              className="relative z-10 text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-black/90 px-8 py-6 border-4 border-pink-400" style={{ boxShadow: '4px 4px 0 #FF1493' }}>
                <p
                  className="text-pink-200 text-xs md:text-sm leading-loose"
                  style={{ fontFamily: "'Press Start 2P', cursive", textShadow: '2px 2px 0 #1a0a2a' }}
                >
                  {currentScene.context}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click overlay for scenes without context */}
      {currentScene && !currentScene.context && (
        <div
          className="absolute inset-0 z-20 cursor-pointer"
          onClick={handleSceneClick}
        />
      )}

      {/* Initial control hint - only shows once */}
      <AnimatePresence>
        {showControlHint && gamePhase === 'playing' && !currentScene && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="bg-black/90 px-6 py-3 border-4 border-pink-400" style={{ boxShadow: '3px 3px 0 #FF1493' }}>
              <span className="text-pink-200 text-xs" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                ← → to walk • Space to continue
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Valentine Question */}
      <AnimatePresence>
        {gamePhase === 'question' && (
          <ValentineQuestion onYes={handleYes} />
        )}
      </AnimatePresence>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {gamePhase === 'celebration' && (
          <CelebrationOverlay />
        )}
      </AnimatePresence>


    </div>
  );
}

// Helper
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Escape positions for the No button (sides/corners, avoiding center where Yes is)
const NO_BUTTON_ESCAPE_POSITIONS = [
  { left: '8%', top: '20%' },
  { left: '85%', top: '20%' },
  { left: '8%', top: '75%' },
  { left: '85%', top: '75%' },
  { left: '15%', top: '12%' },
  { left: '80%', top: '85%' },
  { left: '90%', top: '40%' },
  { left: '5%', top: '55%' },
];

// Valentine Question Component
function ValentineQuestion({ onYes }) {
  const [noPosition, setNoPosition] = useState(null);

  const moveNoAway = () => {
    const idx = Math.floor(Math.random() * NO_BUTTON_ESCAPE_POSITIONS.length);
    setNoPosition(NO_BUTTON_ESCAPE_POSITIONS[idx]);
  };

  return (
    <motion.div
      className="absolute inset-0 z-40 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 text-center px-8"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div
          className="text-4xl mb-8 text-pink-400 font-bold"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ?
        </motion.div>

        <div
          className="bg-black/90 px-8 py-6 border-4 border-pink-400 mb-12 inline-block"
          style={{ boxShadow: '4px 4px 0 #FF1493' }}
        >
          <h1
            className="text-xl md:text-2xl text-pink-200 leading-relaxed"
            style={{ fontFamily: "'Press Start 2P', cursive", textShadow: '2px 2px 0 #1a0a2a' }}
          >
            Maya, will you be my Valentines?
          </h1>
        </div>

        <div className="relative flex gap-6 justify-center items-center min-h-[80px]">
          <motion.button
            className="px-14 py-5 text-sm font-semibold border-4 border-pink-400 bg-pink-500 text-white"
            style={{ fontFamily: "'Press Start 2P', cursive", boxShadow: '4px 4px 0 #FF1493' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onYes}
          >
            YES
          </motion.button>

          {!noPosition && (
            <motion.button
              className="px-14 py-5 text-sm font-semibold border-4 border-pink-400 bg-transparent text-pink-400 hover:bg-pink-500/20 transition-colors duration-200"
              style={{ fontFamily: "'Press Start 2P', cursive", boxShadow: '3px 3px 0 #FF1493' }}
              onMouseEnter={moveNoAway}
              whileHover={{ scale: 1.05 }}
            >
              NO
            </motion.button>
          )}
        </div>
        {noPosition && (
          <motion.button
            className="px-14 py-5 text-sm font-semibold border-4 border-pink-400 bg-transparent text-pink-400 hover:bg-pink-500/20 transition-colors duration-200 fixed z-50"
            style={{
              fontFamily: "'Press Start 2P', cursive",
              boxShadow: '3px 3px 0 #FF1493',
              left: noPosition.left,
              top: noPosition.top,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onMouseEnter={moveNoAway}
            whileHover={{ scale: 1.05 }}
          >
            NO
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

// Celebration Overlay Component - pixelated text, no floating emojis
function CelebrationOverlay() {
  return (
    <motion.div
      className="absolute inset-0 z-30 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Fireworks only - no floating emojis */}
      {[...Array(6)].map((_, i) => (
        <Firework
          key={i}
          delay={i * 0.4}
          x={10 + i * 15}
          y={10 + (i % 2) * 15}
          color={['#FF69B4', '#FFD700', '#FF6B6B', '#4ADE80', '#60A5FA', '#A855F7'][i]}
        />
      ))}

      {/* Minimal pixel hearts floating up */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 18}%`,
            bottom: '-20px',
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -1200,
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 8 + i,
            delay: i * 1.2,
            repeat: Infinity,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
            <rect x="2" y="2" width="4" height="4" fill="#FF69B4" />
            <rect x="10" y="2" width="4" height="4" fill="#FF69B4" />
            <rect x="0" y="6" width="4" height="4" fill="#FF69B4" />
            <rect x="4" y="6" width="4" height="4" fill="#FF69B4" />
            <rect x="8" y="6" width="4" height="4" fill="#FF69B4" />
            <rect x="12" y="6" width="4" height="4" fill="#FF69B4" />
            <rect x="4" y="10" width="4" height="4" fill="#FF69B4" />
            <rect x="8" y="10" width="4" height="4" fill="#FF69B4" />
            <rect x="6" y="12" width="4" height="4" fill="#FF69B4" />
          </svg>
        </motion.div>
      ))}

      {/* Final message - pixelated */}
      <motion.div
        className="absolute top-16 left-1/2 -translate-x-1/2 text-center w-full px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.h1
          className="text-xl md:text-2xl font-normal text-white mb-6"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            textShadow: '2px 2px 0 #FF1493',
          }}
        >
          I love you, Maya
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-pink-300 mb-4"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          You're always my Valentine
        </motion.p>

        <motion.p
          className="text-xs md:text-sm text-pink-200/80"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          — Forever yours, Koshish
        </motion.p>
      </motion.div>
    </motion.div>
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
        scale: [0, 1, 1.2, 1.5],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              x: [0, Math.cos(angle) * 100],
              y: [0, Math.sin(angle) * 100],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 1,
              delay: delay + 0.2,
              repeat: Infinity,
              repeatDelay: 2 + 0.3,
            }}
          />
        );
      })}
    </motion.div>
  );
}
