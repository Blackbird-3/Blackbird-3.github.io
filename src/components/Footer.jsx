import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto text-center md:text-left">
        <div className="text-gray-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Shreshtth Kumar Agarwaal. All rights reserved. {/* Update Name */}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>Crafted with passion</span>
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mx-2.5"></div> {/* Slightly larger dot */}
          <span>Based in New Delhi</span> {/* Update Location */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;