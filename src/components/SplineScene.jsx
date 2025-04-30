import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineScene = ({ sceneUrl }) => {
  return (
    // Container controls positioning - REMOVED hidden lg:block
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* The Spline component itself */}
      <div className="w-full h-full pointer-events-auto">
         <Spline scene={sceneUrl} />
      </div>

      {/* Black box to cover potential Spline watermark */}
      {/* NOTE: This might violate Spline's free tier ToS. Use with caution. */}
      <div
        className="absolute bottom-0 right-0 w-[165px] h-[60px] bg-black z-10"
        aria-hidden="true" // Hide from screen readers
      ></div>
    </div>
  );
};

export default SplineScene;