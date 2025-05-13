// Game data definition
interface GameItem {
  id: string;
  label: string;
  type: string;
}

interface DropZone {
  id: string;
  label: string;
  acceptedItems: string[];
}

interface LevelData {
  id: number;
  title: string;
  category: string;
  instructions: string;
  hint: string;
  items: GameItem[];
  dropZones: DropZone[];
}

// Game levels data
const gameLevels: LevelData[] = [
  {
    id: 1,
    title: "Farm Animals",
    category: "Animals",
    instructions: "Drag the animals to their correct sounds",
    hint: "Listen carefully to how each animal sounds",
    items: [
      { id: "cow", label: "Cow", type: "animal" },
      { id: "pig", label: "Pig", type: "animal" },
      { id: "duck", label: "Duck", type: "animal" },
      { id: "dog", label: "Dog", type: "animal" },
      { id: "sheep", label: "Sheep", type: "animal" },
      { id: "rooster", label: "Rooster", type: "animal" }
    ],
    dropZones: [
      { id: "1", label: "Moo", acceptedItems: ["cow"] },
      { id: "2", label: "Oink", acceptedItems: ["pig"] },
      { id: "3", label: "Quack", acceptedItems: ["duck"] },
      { id: "4", label: "Woof", acceptedItems: ["dog"] },
      { id: "5", label: "Baa", acceptedItems: ["sheep"] },
      { id: "6", label: "Cock-a-doodle-doo", acceptedItems: ["rooster"] }
    ]
  },
  {
    id: 2,
    title: "Fruits and Colors",
    category: "Colors",
    instructions: "Match the fruits to their colors",
    hint: "Think about the usual color of each fruit",
    items: [
      { id: "apple", label: "Apple", type: "fruit" },
      { id: "banana", label: "Banana", type: "fruit" },
      { id: "orange", label: "Orange", type: "fruit" },
      { id: "grapes", label: "Grapes", type: "fruit" },
      { id: "blueberry", label: "Blueberry", type: "fruit" }
    ],
    dropZones: [
      { id: "1", label: "Red", acceptedItems: ["apple"] },
      { id: "2", label: "Yellow", acceptedItems: ["banana"] },
      { id: "3", label: "Orange", acceptedItems: ["orange"] },
      { id: "4", label: "Purple", acceptedItems: ["grapes"] },
      { id: "5", label: "Blue", acceptedItems: ["blueberry"] }
    ]
  },
  {
    id: 3,
    title: "Simple Addition",
    category: "Math",
    instructions: "Drag the number to the correct sum",
    hint: "Count carefully to find the right answer",
    items: [
      { id: "num1", label: "1", type: "number" },
      { id: "num2", label: "2", type: "number" },
      { id: "num3", label: "3", type: "number" },
      { id: "num4", label: "4", type: "number" },
      { id: "num5", label: "5", type: "number" }
    ],
    dropZones: [
      { id: "1", label: "1 + 0 = ?", acceptedItems: ["num1"] },
      { id: "2", label: "1 + 1 = ?", acceptedItems: ["num2"] },
      { id: "3", label: "2 + 1 = ?", acceptedItems: ["num3"] },
      { id: "4", label: "2 + 2 = ?", acceptedItems: ["num4"] },
      { id: "5", label: "3 + 2 = ?", acceptedItems: ["num5"] }
    ]
  },
  {
    id: 4,
    title: "Alphabet Sounds",
    category: "Letters",
    instructions: "Match the letter to a word that starts with it",
    hint: "Think about the first sound in each word",
    items: [
      { id: "a", label: "A", type: "letter" },
      { id: "b", label: "B", type: "letter" },
      { id: "c", label: "C", type: "letter" },
      { id: "d", label: "D", type: "letter" },
      { id: "e", label: "E", type: "letter" }
    ],
    dropZones: [
      { id: "1", label: "Apple", acceptedItems: ["a"] },
      { id: "2", label: "Ball", acceptedItems: ["b"] },
      { id: "3", label: "Cat", acceptedItems: ["c"] },
      { id: "4", label: "Dog", acceptedItems: ["d"] },
      { id: "5", label: "Elephant", acceptedItems: ["e"] }
    ]
  },
  {
    id: 5,
    title: "Shapes",
    category: "Shapes",
    instructions: "Match the names to the correct shapes",
    hint: "Count the sides and corners of each shape",
    items: [
      { id: "circle", label: "Circle", type: "shape" },
      { id: "square", label: "Square", type: "shape" },
      { id: "triangle", label: "Triangle", type: "shape" },
      { id: "rectangle", label: "Rectangle", type: "shape" },
      { id: "star", label: "Star", type: "shape" }
    ],
    dropZones: [
      { id: "1", label: "○", acceptedItems: ["circle"] },
      { id: "2", label: "□", acceptedItems: ["square"] },
      { id: "3", label: "△", acceptedItems: ["triangle"] },
      { id: "4", label: "▭", acceptedItems: ["rectangle"] },
      { id: "5", label: "★", acceptedItems: ["star"] }
    ]
  },
  {
    id: 6,
    title: "Ocean Animals",
    category: "Animals",
    instructions: "Match the sea creatures to their homes",
    hint: "Think about where each animal lives in the ocean",
    items: [
      { id: "fish", label: "Fish", type: "animal" },
      { id: "dolphin", label: "Dolphin", type: "animal" },
      { id: "crab", label: "Crab", type: "animal" },
      { id: "octopus", label: "Octopus", type: "animal" },
      { id: "starfish", label: "Starfish", type: "animal" }
    ],
    dropZones: [
      { id: "1", label: "Open Water", acceptedItems: ["fish", "dolphin"] },
      { id: "2", label: "Ocean Floor", acceptedItems: ["crab", "starfish"] },
      { id: "3", label: "Coral Reef", acceptedItems: ["octopus"] }
    ]
  },
  {
    id: 7,
    title: "Opposites",
    category: "Words",
    instructions: "Match each word to its opposite",
    hint: "Think about what means the complete opposite",
    items: [
      { id: "hot", label: "Hot", type: "word" },
      { id: "big", label: "Big", type: "word" },
      { id: "fast", label: "Fast", type: "word" },
      { id: "light", label: "Light", type: "word" },
      { id: "up", label: "Up", type: "word" }
    ],
    dropZones: [
      { id: "1", label: "Cold", acceptedItems: ["hot"] },
      { id: "2", label: "Small", acceptedItems: ["big"] },
      { id: "3", label: "Slow", acceptedItems: ["fast"] },
      { id: "4", label: "Dark", acceptedItems: ["light"] },
      { id: "5", label: "Down", acceptedItems: ["up"] }
    ]
  },
  {
    id: 8,
    title: "Vegetables",
    category: "Food",
    instructions: "Match vegetables to their colors",
    hint: "Think about the most common color of each vegetable",
    items: [
      { id: "carrot", label: "Carrot", type: "vegetable" },
      { id: "broccoli", label: "Broccoli", type: "vegetable" },
      { id: "tomato", label: "Tomato", type: "vegetable" },
      { id: "eggplant", label: "Eggplant", type: "vegetable" },
      { id: "corn", label: "Corn", type: "vegetable" }
    ],
    dropZones: [
      { id: "1", label: "Orange", acceptedItems: ["carrot"] },
      { id: "2", label: "Green", acceptedItems: ["broccoli"] },
      { id: "3", label: "Red", acceptedItems: ["tomato"] },
      { id: "4", label: "Purple", acceptedItems: ["eggplant"] },
      { id: "5", label: "Yellow", acceptedItems: ["corn"] }
    ]
  },
  {
    id: 9,
    title: "Subtraction",
    category: "Math",
    instructions: "Drag the number to the correct difference",
    hint: "Subtract the second number from the first",
    items: [
      { id: "num0", label: "0", type: "number" },
      { id: "num1", label: "1", type: "number" },
      { id: "num2", label: "2", type: "number" },
      { id: "num3", label: "3", type: "number" },
      { id: "num4", label: "4", type: "number" }
    ],
    dropZones: [
      { id: "1", label: "3 - 3 = ?", acceptedItems: ["num0"] },
      { id: "2", label: "5 - 4 = ?", acceptedItems: ["num1"] },
      { id: "3", label: "5 - 3 = ?", acceptedItems: ["num2"] },
      { id: "4", label: "7 - 4 = ?", acceptedItems: ["num3"] },
      { id: "5", label: "9 - 5 = ?", acceptedItems: ["num4"] }
    ]
  },
  {
    id: 10,
    title: "Weather",
    category: "Nature",
    instructions: "Match the weather conditions to the right images",
    hint: "Think about what each weather type looks like",
    items: [
      { id: "sunny", label: "Sunny", type: "weather" },
      { id: "rainy", label: "Rainy", type: "weather" },
      { id: "snowy", label: "Snowy", type: "weather" },
      { id: "windy", label: "Windy", type: "weather" },
      { id: "cloudy", label: "Cloudy", type: "weather" }
    ],
    dropZones: [
      { id: "1", label: "☀️", acceptedItems: ["sunny"] },
      { id: "2", label: "🌧️", acceptedItems: ["rainy"] },
      { id: "3", label: "❄️", acceptedItems: ["snowy"] },
      { id: "4", label: "💨", acceptedItems: ["windy"] },
      { id: "5", label: "☁️", acceptedItems: ["cloudy"] }
    ]
  }
];

// Functions to get level data
export const getLevelData = (levelId: number): LevelData => {
  const level = gameLevels.find(level => level.id === levelId);
  if (!level) {
    throw new Error(`Level with ID ${levelId} not found`);
  }
  return level;
};

export const getAllLevels = (): LevelData[] => {
  return gameLevels;
};
