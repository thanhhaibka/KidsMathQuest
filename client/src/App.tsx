import { useEffect } from "react";
import { motion } from "framer-motion";
import MenuScreen from "./components/game/MenuScreen";
import GameBoard from "./components/game/GameBoard";
import LevelComplete from "./components/game/LevelComplete";
import AudioManager from "./components/game/AudioManager";
import { useGameState } from "./lib/stores/useGameState";

function App() {
  const { gameState, initGame } = useGameState();

  // Initialize the game
  useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-primary-100 font-sans">
      <AudioManager />
      
      {/* Game container with background */}
      <motion.div 
        className="relative w-full h-full flex flex-col items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {gameState === "menu" && <MenuScreen />}
        {gameState === "playing" && <GameBoard />}
        {gameState === "level_complete" && <LevelComplete />}
      </motion.div>
    </div>
  );
}

export default App;
