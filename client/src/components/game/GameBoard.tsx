import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DraggableItem from "./DraggableItem";
import DropZone from "./DropZone";
import ProgressBar from "./ProgressBar";
import CharacterAnimation from "./CharacterAnimation";
import { useGameState } from "@/lib/stores/useGameState";
import { getLevelData } from "@/lib/game-data";
import { useAudio } from "@/lib/stores/useAudio";

const GameBoard = () => {
  const { currentLevel, completeLevel } = useGameState();
  const { playHit, playSuccess } = useAudio();
  const [score, setScore] = useState(0);
  const [levelData, setLevelData] = useState(getLevelData(currentLevel));
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  
  // Reset game state when level changes
  useEffect(() => {
    setLevelData(getLevelData(currentLevel));
    setScore(0);
    setCompletedItems([]);
    setShowHint(false);
  }, [currentLevel]);
  
  // Check if level is complete
  useEffect(() => {
    if (completedItems.length === levelData.items.length) {
      // Wait a moment to show the success animation
      const timer = setTimeout(() => {
        playSuccess();
        completeLevel();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [completedItems, levelData.items.length, completeLevel, playSuccess]);
  
  const handleCorrectDrop = (itemId: string) => {
    if (!completedItems.includes(itemId)) {
      setCompletedItems([...completedItems, itemId]);
      setScore(score + 1);
      playSuccess();
    }
  };
  
  const handleIncorrectDrop = () => {
    playHit();
  };
  
  const progress = completedItems.length / levelData.items.length;
  
  return (
    <div className="w-full h-full max-w-4xl max-h-[800px] flex flex-col items-center">
      {/* Level header */}
      <motion.div 
        className="w-full flex justify-between items-center py-4 px-6 bg-white rounded-t-2xl shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-primary-700">
          Level {currentLevel}: {levelData.title}
        </h2>
        <button 
          className="px-4 py-2 bg-yellow-400 text-primary-900 rounded-full font-bold shadow-md hover:bg-yellow-300 transition-colors"
          onClick={() => setShowHint(!showHint)}
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
      </motion.div>
      
      {/* Game content */}
      <motion.div 
        className="relative flex-1 w-full bg-blue-50 rounded-b-2xl p-6 flex flex-col items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-green-100" />
          <div className="absolute bottom-10 right-10">
            <CharacterAnimation />
          </div>
        </div>
        
        {/* Instructions */}
        <motion.div 
          className="mb-6 p-4 bg-white rounded-xl shadow-md z-10 max-w-xl text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg text-primary-800">{levelData.instructions}</p>
          {showHint && (
            <p className="mt-2 text-primary-600 italic">{levelData.hint}</p>
          )}
        </motion.div>
        
        {/* Drop zones */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 z-10">
          {levelData.dropZones.map((zone) => (
            <DropZone
              key={zone.id}
              id={zone.id}
              label={zone.label}
              acceptedItems={zone.acceptedItems}
              onCorrectDrop={handleCorrectDrop}
              onIncorrectDrop={handleIncorrectDrop}
              completed={zone.acceptedItems.some(item => completedItems.includes(item))}
            />
          ))}
        </div>
        
        {/* Draggable items */}
        <div className="flex flex-wrap justify-center gap-4 mt-auto p-4 bg-yellow-100 rounded-xl z-10 min-h-[120px]">
          {levelData.items.map((item) => (
            !completedItems.includes(item.id) && (
              <DraggableItem
                key={item.id}
                id={item.id}
                label={item.label}
                type={item.type}
              />
            )
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="w-full mt-4 z-10">
          <ProgressBar progress={progress} />
        </div>
      </motion.div>
    </div>
  );
};

export default GameBoard;
