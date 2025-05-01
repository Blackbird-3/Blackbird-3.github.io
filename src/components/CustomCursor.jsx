import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power1.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    // Add hover effects for links or buttons if desired
    // e.g., document.querySelectorAll('a, button').forEach(...)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor hidden md:block pointer-events-none fixed top-0 left-0 z-[9999]">
      {/* Make sure z-index is very high */}
      <div className="cursor-dot bg-red-500 w-3 h-3 rounded-full absolute -translate-x-1/2 -translate-y-1/2 mix-blend-difference"></div>
      {/* Optional: Add an outer circle/ring for hover effects */}
      {/* <div className="cursor-ring border-2 border-red-500 w-8 h-8 rounded-full absolute -translate-x-1/2 -translate-y-1/2"></div> */}
    </div>
  );
};

export default CustomCursor;