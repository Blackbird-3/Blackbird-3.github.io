import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedShapes = ({ containerRef }) => {
  const shapesRef = useRef([]);
  
  const addToRefs = (el) => {
    if (el && !shapesRef.current.includes(el)) {
      shapesRef.current.push(el);
    }
  };
  
  useEffect(() => {
    if (!containerRef?.current || shapesRef.current.length === 0) return;
    
    const ctx = gsap.context(() => {
      // Set initial states for all shapes
      shapesRef.current.forEach((shape, index) => {
        gsap.set(shape, { 
          opacity: 0,
          scale: 0.5,
          rotation: index % 2 === 0 ? 15 : -15
        });
      });
      
      // Create a staggered entrance animation
      gsap.to(shapesRef.current, {
        opacity: 0.7,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Create unique continuous animation for each shape
      shapesRef.current.forEach((shape, index) => {
        // Different animation based on shape type
        if (shape.classList.contains('circle')) {
          // Floating animation for circles
          gsap.to(shape, {
            y: `random(-${15 + index * 5}, ${15 + index * 5})`,
            x: `random(-${10 + index * 3}, ${10 + index * 3})`,
            rotation: `random(-${5}, ${5})`,
            duration: 5 + index * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
          });
        } else if (shape.classList.contains('rect')) {
          // Rotation animation for rectangles
          gsap.to(shape, {
            rotation: `random(-${10 + index * 2}, ${10 + index * 2})`,
            scale: 0.95 + Math.random() * 0.1,
            duration: 7 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
          });
        } else if (shape.classList.contains('line')) {
          // Pulse animation for lines
          gsap.to(shape, {
            scaleX: 0.8 + Math.random() * 0.4,
            opacity: 0.4 + Math.random() * 0.3,
            duration: 4 + index * 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.15
          });
        } else {
          // Default animation for other shapes
          gsap.to(shape, {
            y: `random(-10, 10)`,
            x: `random(-8, 8)`,
            rotation: `random(-${6 + index}, ${6 + index})`,
            duration: 6 + Math.random() * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
          });
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [containerRef]);

  return (
    <>
      {/* Radial gradient backgrounds */}
      <div ref={addToRefs} className="circle absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-red-500/10 to-transparent blur-xl"></div>
      <div ref={addToRefs} className="circle absolute -bottom-32 left-16 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl"></div>
      
      {/* Geometric shapes */}
      <div ref={addToRefs} className="rect absolute top-1/3 left-1/5 w-16 h-16 border border-red-500/10 rounded-md rotate-12 opacity-0"></div>
      <div ref={addToRefs} className="rect absolute bottom-1/4 right-1/5 w-12 h-12 border border-white/5 rounded-sm rotate-45 opacity-0"></div>
      <div ref={addToRefs} className="circle absolute top-64 right-1/4 w-8 h-8 border border-red-500/20 rounded-full opacity-0"></div>
      
      {/* Lines */}
      <div ref={addToRefs} className="line absolute top-1/2 left-10 w-20 h-px bg-gradient-to-r from-red-500/30 to-transparent opacity-0"></div>
      <div ref={addToRefs} className="line absolute bottom-1/3 right-20 w-16 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0"></div>
      
      {/* Small accent elements */}
      <div ref={addToRefs} className="absolute top-40 left-1/4 w-2 h-2 bg-red-500/50 rounded-full opacity-0"></div>
      <div ref={addToRefs} className="absolute bottom-32 right-1/3 w-3 h-3 bg-red-500/40 rounded-full opacity-0"></div>
      <div ref={addToRefs} className="absolute top-1/2 right-16 w-1 h-1 bg-white/70 rounded-full shadow-glow opacity-0"></div>
      
      {/* Unique decorative elements */}
      <div ref={addToRefs} className="rect absolute top-1/4 right-1/3 w-10 h-10 border-2 border-dashed border-red-500/15 rotate-45 opacity-0"></div>
      <div ref={addToRefs} className="rect absolute bottom-40 left-1/4 w-12 h-1 bg-gradient-to-r from-red-500/20 via-red-500/10 to-transparent opacity-0"></div>
    </>
  );
};

export default AnimatedShapes;