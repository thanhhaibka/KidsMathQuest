import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface DropZoneProps {
  id: string;
  label: string;
  acceptedItems: string[];
  onCorrectDrop: (itemId: string) => void;
  onIncorrectDrop: () => void;
  completed: boolean;
}

const DropZone = ({ 
  id, 
  label, 
  acceptedItems, 
  onCorrectDrop, 
  onIncorrectDrop,
  completed
}: DropZoneProps) => {
  const [isOver, setIsOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Function to check if dropped item is within this drop zone
    const isInDropZone = (x: number, y: number) => {
      if (!zoneRef.current) return false;
      
      const rect = zoneRef.current.getBoundingClientRect();
      return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );
    };
    
    // Handle item drop event
    const handleItemDrop = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { id: itemId } = customEvent.detail;
      
      // Get the current mouse position
      const mouseX = (event as MouseEvent).clientX || 0;
      const mouseY = (event as MouseEvent).clientY || 0;
      
      // Check if the item is dropped within this zone
      if (isInDropZone(mouseX, mouseY)) {
        // Check if this zone accepts the dropped item
        if (acceptedItems.includes(itemId)) {
          setIsCorrect(true);
          onCorrectDrop(itemId);
          setTimeout(() => setIsCorrect(false), 1000);
        } else {
          setIsIncorrect(true);
          onIncorrectDrop();
          setTimeout(() => setIsIncorrect(false), 1000);
        }
      }
    };
    
    // Add event listeners
    document.addEventListener('itemDrop', handleItemDrop);
    
    // Cleanup
    return () => {
      document.removeEventListener('itemDrop', handleItemDrop);
    };
  }, [acceptedItems, onCorrectDrop, onIncorrectDrop]);
  
  return (
    <motion.div
      ref={zoneRef}
      className={`
        relative w-36 h-36 rounded-xl flex items-center justify-center
        border-2 border-dashed transition-colors
        ${completed ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'}
        ${isOver && !completed ? 'border-blue-500 bg-blue-50' : ''}
        ${isCorrect ? 'border-green-500 bg-green-100' : ''}
        ${isIncorrect ? 'border-red-500 bg-red-100' : ''}
      `}
      onMouseEnter={() => !completed && setIsOver(true)}
      onMouseLeave={() => !completed && setIsOver(false)}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: isCorrect ? [-5, 0, -5, 0] : 0,
        x: isIncorrect ? [-5, 5, -5, 5, 0] : 0
      }}
      transition={{ 
        duration: 0.5, 
        delay: parseInt(id) * 0.1,
        y: { duration: 0.3, times: [0, 0.3, 0.6, 1] },
        x: { duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] }
      }}
    >
      <p className="text-lg font-bold text-primary-700 text-center">{label}</p>
      
      {/* Show check mark icon when completed */}
      {completed && (
        <motion.div 
          className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DropZone;
