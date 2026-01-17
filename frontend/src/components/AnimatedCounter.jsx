import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract numeric value from string (e.g., "150+" -> 150, "3.5M+" -> 3.5)
  const getNumericValue = (val) => {
    if (typeof val === 'number') return val;
    const numStr = val.toString().replace(/[^0-9.]/g, '');
    return parseFloat(numStr) || 0;
  };

  const numericTarget = getNumericValue(value);

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = numericTarget * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, numericTarget, duration]);

  // Format display value
  const formatValue = (val) => {
    // Determine decimal places from original value
    const originalStr = value.toString();
    const hasDecimal = originalStr.includes('.');
    
    if (hasDecimal) {
      return val.toFixed(1);
    }
    return Math.round(val);
  };

  // Extract suffix from original value if not provided
  const getSuffix = () => {
    if (suffix) return suffix;
    const originalStr = value.toString();
    const match = originalStr.match(/[+%MKX]+$/);
    return match ? match[0] : '';
  };

  return (
    <span ref={ref}>
      {prefix}{formatValue(displayValue)}{getSuffix()}
    </span>
  );
};

export default AnimatedCounter;
