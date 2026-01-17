import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MysticCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Mouse position state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the follower
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 16); // Center the 32px cursor
      mouseY.set(e.clientY - 16);
      
      // Check if hovering over clickable elements
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON'
      );
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Cursor (Small Gold Dot) - Follows instantly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#c9a961] rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: mouseX, // Using raw value for instant movement (offset correction needed manually if not using spring)
          y: mouseY,
          translateX: 12, // Re-center based on wrapper offset
          translateY: 12 
        }}
      />

      {/* Aura Follower (Glowing Ring) - Follows with delay */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#c9a961]/50 rounded-full pointer-events-none z-[100] flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          backgroundColor: isPointer ? 'rgba(201, 169, 97, 0.1)' : 'transparent',
          borderColor: isPointer ? 'rgba(201, 169, 97, 0.8)' : 'rgba(201, 169, 97, 0.4)'
        }}
      >
        <div className="w-1 h-1 bg-[#c9a961]/30 rounded-full blur-[2px]" />
      </motion.div>
    </>
  );
};

export default MysticCursor;
