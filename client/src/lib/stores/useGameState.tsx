import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "../utils";

type GameState = "menu" | "playing" | "level_complete";

interface GameStateStore {
  gameState: GameState;
  currentLevel: number;
  completedLevels: number[];
  
  // Actions
  initGame: () => void;
  startLevel: (levelId: number) => void;
  completeLevel: () => void;
  returnToMenu: () => void;
  nextLevel: () => void;
}

export const useGameState = create<GameStateStore>((set, get) => ({
  gameState: "menu",
  currentLevel: 1,
  completedLevels: [],
  
  initGame: () => {
    // Get saved state from localStorage if available
    const savedCompletedLevels = getLocalStorage("completedLevels") || [];
    
    set({
      gameState: "menu",
      currentLevel: 1,
      completedLevels: savedCompletedLevels
    });
  },
  
  startLevel: (levelId: number) => {
    set({
      gameState: "playing",
      currentLevel: levelId
    });
  },
  
  completeLevel: () => {
    const { currentLevel, completedLevels } = get();
    
    // Add current level to completed levels if not already there
    let newCompletedLevels = [...completedLevels];
    if (!completedLevels.includes(currentLevel)) {
      newCompletedLevels.push(currentLevel);
    }
    
    // Save to localStorage
    setLocalStorage("completedLevels", newCompletedLevels);
    
    set({
      gameState: "level_complete",
      completedLevels: newCompletedLevels
    });
  },
  
  returnToMenu: () => {
    set({
      gameState: "menu"
    });
  },
  
  nextLevel: () => {
    const { currentLevel } = get();
    const nextLevel = currentLevel + 1;
    
    set({
      gameState: "playing",
      currentLevel: nextLevel
    });
  }
}));
