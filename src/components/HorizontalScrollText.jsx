import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollText = ({ text }) => {
  const containerRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    // Duplicate text content for seamless looping
    const originalText = textRef.current.innerHTML;
    textRef.current.innerHTML += originalText; // Simple duplication

    const textWidth = textRef.current.offsetWidth / 2; // Width of one segment

    const anim = gsap.to(textRef.current, {
      x: `-${textWidth * 0.7}px`, // Move left by the width of one segment
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current, // Trigger based on the container
        start: "top bottom", // When container top hits viewport bottom
        end: "bottom top", // When container bottom hits viewport top
        scrub: 1, // Adjust scrubbing speed (lower is faster)
        invalidateOnRefresh: true,
      }
    });

    return () => {
       anim.scrollTrigger?.kill();
       gsap.killTweensOf(textRef.current);
    };
  }, [text]); // Re-run if text changes

  return (
    <div ref={containerRef} className="relative h-32 overflow-hidden flex items-center bg-black"> {/* Ensure background */}
      <div ref={textRef} className="horizontal-scroll-text whitespace-nowrap text-8xl font-bold text-red-500/30 py-4 will-change-transform">
        {/* Initial text rendering handled by useEffect */}
        <span dangerouslySetInnerHTML={{ __html: text }}></span>
      </div>
       <style jsx global>{`
          .horizontal-scroll-text {
              display: inline-block; /* Ensures width calculation is correct */
          }
       `}
       </style>
    </div>
  );
};

export default HorizontalScrollText;