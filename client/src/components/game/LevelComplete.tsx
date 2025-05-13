import { motion } from "framer-motion";
import { useGameState } from "@/lib/stores/useGameState";
import { getLevelData } from "@/lib/game-data";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

const LevelComplete = () => {
  const { currentLevel, returnToMenu, nextLevel } = useGameState();
  const [confettiActive, setConfettiActive] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  const levelData = getLevelData(currentLevel);
  const hasNextLevel = currentLevel < 10; // Assuming 10 levels max
  
  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Stop confetti after a few seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 5000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);
  
  // Stars animation variants
  const starVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: (i: number) => ({
      scale: 1,
      rotate: 0,
      transition: { 
        delay: 0.2 + (i * 0.2),
        type: "spring",
        stiffness: 100
      }
    })
  };
  
  return (
    <div className="w-full h-full max-w-4xl max-h-[800px] flex flex-col items-center justify-center">
      {/* Confetti effect */}
      {confettiActive && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      
      {/* Level complete card */}
      <motion.div 
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <motion.h1 
          className="text-4xl font-bold text-primary-700 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Level Complete!
        </motion.h1>
        
        {/* Stars */}
        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="text-yellow-400"
              variants={starVariants}
              custom={i}
              initial="initial"
              animate="animate"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </motion.div>
          ))}
        </div>
        
        <motion.p 
          className="text-xl text-primary-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          You've completed {levelData.title}!
        </motion.p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold shadow-md hover:bg-blue-600 transition-colors"
            onClick={returnToMenu}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Menu
          </motion.button>
          
          {hasNextLevel && (
            <motion.button
              className="px-6 py-3 bg-green-500 text-white rounded-full font-bold shadow-md hover:bg-green-600 transition-colors"
              onClick={nextLevel}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Level
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LevelComplete;
