import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxElement = ({
  children,
  speed = 0.1,
  direction = 1,
  offset = 0,
  className = '',
  rotation = 0, // Add rotation property
  scrollTriggerConfig = {}, // Allow custom ScrollTrigger config
}) => {
  const elementRef = useRef();

  useEffect(() => {
    if (!elementRef.current) return;

    const trigger = scrollTriggerConfig.trigger || document.body;
    const start = scrollTriggerConfig.start || "top bottom"; // Start earlier
    const end = scrollTriggerConfig.end || "bottom top"; // End later

    const anim = gsap.to(elementRef.current, {
      y: () => direction * (ScrollTrigger.maxScroll(window) * parseFloat(speed)) + parseInt(offset),
      rotation: rotation, // Animate rotation
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: end,
        scrub: true, // Smoother scrubbing
        invalidateOnRefresh: true,
        ...scrollTriggerConfig, // Spread custom config
      }
    });

    return () => {
      anim.scrollTrigger?.kill(); // Kill the specific ScrollTrigger instance
      gsap.killTweensOf(elementRef.current);
    };
    // Rerun if props change that affect animation
  }, [speed, direction, offset, rotation, className, scrollTriggerConfig]);

  return (
    <div ref={elementRef} className={`absolute pointer-events-none ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxElement;