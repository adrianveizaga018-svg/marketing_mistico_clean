import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MysticCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Check if mobile/tablet IMMEDIATELY before any render
  const checkIsMobile = () => {
    // Must match the CSS media query (min-width: 1024px)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmallScreen = window.innerWidth < 1024;
    return isTouch || isSmallScreen;
  };
  
  const [isMobile, setIsMobile] = useState(checkIsMobile);
  
  // Mouse position state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the follower
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Update mobile detection on resize
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener('resize', handleResize);

    const moveCursor = (e) => {
      if (isMobile) return;
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
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY, isMobile]);

  // Early return if mobile - don't render cursor at all
  if (isMobile) return null;

  return (
    <>
      {/* Main Cursor (Small Gold Dot) - Follows instantly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#c9a961] rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: mouseX, 
          y: mouseY,
          translateX: 12, 
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
