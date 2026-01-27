import React, { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage component with lazy loading, blur-up placeholder, and explicit dimensions
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {number} width - Explicit width (prevents CLS)
 * @param {number} height - Explicit height (prevents CLS)
 * @param {string} className - Additional CSS classes
 * @param {string} objectFit - CSS object-fit value (default: 'cover')
 * @param {boolean} eager - Load immediately without lazy loading
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  objectFit = 'cover',
  eager = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager);
  const imgRef = useRef(null);

  useEffect(() => {
    if (eager) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' } // Load images 50px before they enter viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [eager]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%', 
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width} / ${height}` : undefined
      }}
    >
      {/* Blur placeholder */}
      <div
        className={`absolute inset-0 bg-white/5 transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backdropFilter: 'blur(10px)',
        }}
      />
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
