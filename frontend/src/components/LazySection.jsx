import React, { Suspense, useState, useEffect, useRef } from 'react';

/**
 * LazySection wrapper component for lazy-loading sections
 * Only loads the component when it's about to enter the viewport
 * @param {React.Component} component - The lazy-loaded component
 * @param {object} props - Props to pass to the component
 * @param {string} fallback - Optional fallback content while loading
 * @param {string} rootMargin - IntersectionObserver rootMargin (default: '100px')
 */
const LazySection = ({ 
  component: Component, 
  fallback = null,
  rootMargin = '100px',
  ...props 
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  const LoadingFallback = () => (
    <div className="min-h-[200px] bg-transparent" aria-hidden="true">
      {fallback}
    </div>
  );

  return (
    <div ref={sectionRef}>
      {shouldLoad ? (
        <Suspense fallback={<LoadingFallback />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <LoadingFallback />
      )}
    </div>
  );
};

export default LazySection;
