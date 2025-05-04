import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

const SplineScene = ({ sceneUrl }) => {
  // Reference to store the Spline object
  const splineRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to handle when Spline loads
  const onSplineLoad = (splineApp) => {
    splineRef.current = splineApp;
    setIsLoaded(true);
    
    // Disable zoom functionality in Spline
    if (splineApp) {
      // Try different approaches to disable zoom
      
      // Approach 1: Directly disable zoom if the API allows it
      if (splineApp.setZoomEnabled) {
        splineApp.setZoomEnabled(false);
      }
      
      // Approach 2: Try to access and modify the camera controls
      if (splineApp.runtime && splineApp.runtime.scene) {
        const camera = splineApp.runtime.scene.activeCamera;
        if (camera && camera.controls) {
          // Disable zoom or mouse wheel related properties
          camera.controls.enableZoom = false;
          camera.controls.zoomSpeed = 0;
          
          // If there's a mouseWheel method or property
          if (camera.controls.mouseWheel) {
            camera.controls.mouseWheel.enabled = false;
          }
        }
      }
      
      // Approach 3: Override the wheel event handler on the canvas
      const canvas = splineApp.canvas;
      if (canvas) {
        // Override wheel event on the canvas
        canvas.addEventListener('wheel', (e) => {
          e.stopPropagation();
          e.preventDefault();
          return false;
        }, { passive: false });
      }
    }
  };

  return (
    // Container controls positioning
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* The Spline component itself */}
      <div className="w-full h-full">
        <Spline 
          scene={sceneUrl} 
          onLoad={onSplineLoad} 
          className={isLoaded ? "pointer-events-none" : "pointer-events-auto"}
        />
      </div>

      {/* Create an overlay div that catches mouse events but allows scrolling */}
      <div 
        className="absolute inset-0 z-1"
        style={{ pointerEvents: isLoaded ? 'auto' : 'none' }}
        onWheel={(e) => {
          // Allow default scrolling behavior
          // This div intercepts wheel events before they reach Spline
        }}
      />

      {/* Black box to cover potential Spline watermark */}
      <div
        className="absolute bottom-0 right-0 w-[165px] h-[60px] bg-black z-10"
        aria-hidden="true" // Hide from screen readers
      ></div>
    </div>
  );
};

export default SplineScene;