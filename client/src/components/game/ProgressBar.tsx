import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 to 1
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  // Ensure progress is between 0 and 1
  const clampedProgress = Math.max(0, Math.min(progress, 1));
  
  // Calculate percentage for display
  const percentage = Math.round(clampedProgress * 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white drop-shadow-md">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
