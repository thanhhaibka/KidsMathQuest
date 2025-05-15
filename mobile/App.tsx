import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createGameStore } from './src/stores/gameStore';
import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';
import LevelComplete from './src/screens/LevelComplete';

// Create a store hook with the store
const useGameStore = createGameStore();

export default function App() {
  const { gameState, initGame } = useGameStore();

  // Initialize the game
  useEffect(() => {
    initGame();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {gameState === "menu" && <MenuScreen />}
      {gameState === "playing" && <GameScreen />}
      {gameState === "level_complete" && <LevelComplete />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff', // Light blue background similar to primary-100
  },
});