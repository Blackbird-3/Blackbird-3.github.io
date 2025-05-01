import React from 'react';

const ScrollProgressIndicator = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
      <div
        className="bg-red-500 h-full"
        style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }} // Linear transition is smoother
      ></div>
    </div>
  );
};

export default ScrollProgressIndicator;