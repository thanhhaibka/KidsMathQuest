import { useState } from "react";
import { motion } from "framer-motion";
import { useDrag } from "react-use-gesture";

interface DraggableItemProps {
  id: string;
  label: string;
  type: string;
}

const DraggableItem = ({ id, label, type }: DraggableItemProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Set up drag gesture handler
  const bindDrag = useDrag(({ down, movement: [x, y], first, last }) => {
    if (first) setIsDragging(true);
    if (last) setIsDragging(false);
    
    setPosition({
      x: down ? x : 0,
      y: down ? y : 0
    });
    
    // When releasing the item, send a custom event with the item's data
    if (last) {
      const event = new CustomEvent('itemDrop', {
        bubbles: true,
        detail: { id, type }
      });
      document.dispatchEvent(event);
    }
  });
  
  // Determine background color based on item type
  const getBgColor = () => {
    switch(type) {
      case 'animal': return 'bg-orange-400';
      case 'fruit': return 'bg-red-400';
      case 'vegetable': return 'bg-green-400';
      case 'number': return 'bg-blue-400';
      case 'letter': return 'bg-purple-400';
      default: return 'bg-gray-400';
    }
  };
  
  return (
    <motion.div
      {...bindDrag()}
      style={{ 
        x: position.x, 
        y: position.y,
        touchAction: 'none' // Prevents scrolling on touch devices while dragging
      }}
      animate={{
        scale: isDragging ? 1.1 : 1,
        boxShadow: isDragging 
          ? '0 10px 25px rgba(0,0,0,0.2)' 
          : '0 2px 5px rgba(0,0,0,0.1)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${getBgColor()} cursor-grab active:cursor-grabbing p-4 rounded-lg text-white font-bold text-center min-w-[100px] z-20`}
      data-item-id={id}
      data-item-type={type}
    >
      {label}
    </motion.div>
  );
};

export default DraggableItem;
