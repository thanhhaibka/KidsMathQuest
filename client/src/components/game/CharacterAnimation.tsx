import { motion } from "framer-motion";

interface CharacterAnimationProps {
  scale?: number;
}

const CharacterAnimation = ({ scale = 1 }: CharacterAnimationProps) => {
  return (
    <div style={{ transform: `scale(${scale})` }}>
      <motion.div
        className="relative w-32 h-32"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {/* Character body */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-500 rounded-full overflow-hidden"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {/* Face */}
          <div className="absolute top-1/4 left-0 right-0 flex justify-center">
            {/* Eyes */}
            <div className="flex space-x-4">
              <motion.div 
                className="w-3 h-4 bg-white rounded-full relative"
                animate={{
                  scaleY: [1, 0.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  repeatDelay: 3
                }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full" />
              </motion.div>
              <motion.div 
                className="w-3 h-4 bg-white rounded-full relative"
                animate={{
                  scaleY: [1, 0.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  repeatDelay: 3
                }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full" />
              </motion.div>
            </div>
          </div>
          
          {/* Mouth */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-red-400 rounded-b-full"
            animate={{
              scaleX: [1, 0.8, 1],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              repeatDelay: 2
            }}
          />
        </motion.div>
        
        {/* Antenna */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-blue-700"
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CharacterAnimation;
