import { useState } from "react";
import { motion } from "framer-motion";
import { useGameState } from "@/lib/stores/useGameState";
import { getAllLevels } from "@/lib/game-data";
import CharacterAnimation from "./CharacterAnimation";

const MenuScreen = () => {
  const { startLevel } = useGameState();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const levels = getAllLevels();
  
  // Group levels by category
  const categories = Array.from(new Set(levels.map(level => level.category)));
  
  // Staggered animation for menu items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="w-full h-full max-w-4xl flex flex-col items-center">
      {/* Game title */}
      <motion.div
        className="mt-8 mb-12 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <h1 className="text-5xl font-bold text-primary-700 mb-2">Educational Kids Game</h1>
        <p className="text-xl text-primary-600">Learn while having fun!</p>
      </motion.div>
      
      {/* Character */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <CharacterAnimation scale={1.5} />
      </motion.div>
      
      {/* Menu container */}
      <motion.div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {selectedCategory ? (
          <>
            {/* Category header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary-700">{selectedCategory} Levels</h2>
              <button
                className="px-4 py-2 bg-gray-200 text-primary-700 rounded-full hover:bg-gray-300 transition-colors"
                onClick={() => setSelectedCategory(null)}
              >
                Back
              </button>
            </div>
            
            {/* Levels grid */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {levels
                .filter(level => level.category === selectedCategory)
                .map(level => (
                  <motion.button
                    key={level.id}
                    className="p-6 bg-blue-100 hover:bg-blue-200 rounded-xl text-center transition-colors shadow-md"
                    onClick={() => startLevel(level.id)}
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="block text-3xl font-bold text-primary-700 mb-2">{level.id}</span>
                    <span className="text-sm text-primary-600">{level.title}</span>
                  </motion.button>
                ))}
            </motion.div>
          </>
        ) : (
          <>
            {/* Categories */}
            <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center">Choose a Category</h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {categories.map(category => (
                <motion.button
                  key={category}
                  className="p-6 bg-green-100 hover:bg-green-200 rounded-xl text-center transition-colors shadow-md"
                  onClick={() => setSelectedCategory(category)}
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl font-bold text-primary-700">{category}</span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
      
      {/* Footer */}
      <motion.div
        className="text-center text-primary-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>© 2023 Educational Kids Game</p>
      </motion.div>
    </div>
  );
};

export default MenuScreen;
