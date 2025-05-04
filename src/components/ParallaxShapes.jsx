import React from 'react';
import ParallaxElement from './ParallaxElement';

/**
 * Component that renders various decorative shapes with parallax effects
 */
const ParallaxShapes = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-[1] pointer-events-none">
      {/* Large gradient circle - slow movement */}
      <ParallaxElement
        speed={0.05}
        direction={-1}
        className="top-0 -left-64 w-96 h-96 opacity-20"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 to-purple-700 blur-3xl" />
      </ParallaxElement>

      {/* Purple blob - moderate speed */}
      <ParallaxElement
        speed={0.1}
        direction={1}
        className="top-1/4 -right-32 w-80 h-80 opacity-30"
        rotation={10}
      >
        <div className="w-full h-full rounded-full bg-purple-600 blur-2xl" />
      </ParallaxElement>

      {/* Small circles - faster movement */}
      <ParallaxElement
        speed={0.2}
        direction={-1}
        className="top-1/3 left-20 w-16 h-16 opacity-40"
        rotation={-5}
      >
        <div className="w-full h-full rounded-full bg-red-400" />
      </ParallaxElement>
      
      {/* Rectangle - medium speed */}
      <ParallaxElement
        speed={0.15}
        direction={1}
        className="bottom-1/4 left-1/4 w-64 h-20 opacity-30"
        rotation={-15}
      >
        <div className="w-full h-full bg-blue-500 rounded-lg blur-sm" />
      </ParallaxElement>
      
      {/* Grid of dots - subtle movement */}
      <ParallaxElement
        speed={0.03}
        direction={-1}
        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20"
      >
        <GridPattern />
      </ParallaxElement>
      
      {/* Diamond shape - fast movement */}
      <ParallaxElement
        speed={0.25}
        direction={1}
        className="bottom-20 right-20 w-32 h-32 opacity-40"
        rotation={45}
      >
        <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 transform rotate-45" />
      </ParallaxElement>
      
      {/* Line elements - varied speeds */}
      <ParallaxElement
        speed={0.1}
        direction={-1}
        className="top-1/4 left-1/3 w-64 h-1 opacity-30"
        rotation={30}
      >
        <div className="w-full h-full bg-teal-400" />
      </ParallaxElement>
      
      <ParallaxElement
        speed={0.18}
        direction={1}
        className="bottom-1/3 right-1/3 w-48 h-1 opacity-30"
        rotation={-20}
      >
        <div className="w-full h-full bg-pink-400" />
      </ParallaxElement>
      
      {/* SVG shape - complex movement */}
      <ParallaxElement
        speed={0.12}
        direction={-1}
        className="bottom-10 left-10 w-40 h-40 opacity-30"
        rotation={15}
      >
        <WavyShape />
      </ParallaxElement>
      
      {/* Custom scroll trigger config */}
      <ParallaxElement
        speed={0.08}
        direction={1}
        className="top-1/2 right-1/4 w-24 h-24 opacity-60"
        scrollTriggerConfig={{
          trigger: "#skills", // Only moves when skills section is in view
          start: "top bottom",
          end: "bottom top",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-300 rounded-full blur-md" />
      </ParallaxElement>
    </div>
  );
};

// Helper component for grid pattern
const GridPattern = () => {
  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full">
      {Array(48).fill().map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-white opacity-30" />
      ))}
    </div>
  );
};

// SVG wavy shape
const WavyShape = () => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path 
        fill="#FF0066" 
        d="M47.4,-51.2C59.2,-35.9,65.4,-17.9,63.5,-1.9C61.5,14.1,51.4,28.2,39.6,42.5C27.8,56.8,13.9,71.2,-1.6,72.8C-17.1,74.4,-34.1,63.2,-45.4,48.9C-56.6,34.6,-62,17.3,-62.1,-0.1C-62.2,-17.4,-57.1,-34.9,-45.9,-50.1C-34.7,-65.4,-17.4,-78.6,0.5,-79.1C18.3,-79.6,36.7,-67.5,47.4,-51.2Z" 
        transform="translate(100 100)" 
        opacity="0.7"
      />
    </svg>
  );
};

export default ParallaxShapes;