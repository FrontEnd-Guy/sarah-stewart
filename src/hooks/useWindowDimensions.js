import { useEffect, useState, useCallback } from 'react';

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    typeof window !== 'undefined' ? window.innerWidth : undefined
  );

  const handleResize = useCallback(() => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
      setWindowDimensions(window.innerWidth);
    }, 500);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(window.resizeTimeout);
      };
    }
  }, [handleResize]);

  return windowDimensions;
}
