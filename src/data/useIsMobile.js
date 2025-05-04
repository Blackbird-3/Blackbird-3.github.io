// Add this custom hook in your project (e.g., hooks/useIsMobile.js)

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current device is mobile
 * @param {number} breakpoint - Width in pixels below which is considered mobile
 * @returns {boolean} isMobile - Whether the current viewport is mobile-sized
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if window width is below breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Run on mount
    checkMobile();

    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;