import React from 'react';
import { motion } from 'framer-motion';

const UrgencyBadge = ({ text = "Solo 3 cupos este mes", position = "top" }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
      className={`absolute ${position === 'top' ? '-top-3 left-1/2 -translate-x-1/2' : 'top-full mt-2 left-1/2 -translate-x-1/2'} 
                  bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full
                  shadow-lg whitespace-nowrap z-10`}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="flex items-center gap-1.5"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        {text}
      </motion.div>
    </motion.div>
  );
};

export default UrgencyBadge;
