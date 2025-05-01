import React from 'react';

const Header = ({ currentSection }) => {
  const getSectionName = (id) => {
    switch (id) {
      case 'hero': return 'Home';
      case 'work': return 'Work';
      case 'skills': return 'Skills';
      case 'contact': return 'Contact';
      default: return '';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center bg-black/80 backdrop-blur-sm">
      <div className="logo text-lg md:text-xl font-bold">
        <span className="flex items-center">
          Dev <span className="text-red-500 ml-1">Portfolio</span>
        </span>
      </div>
      <div className="hidden md:block">
        <div className="text-sm font-medium opacity-70 capitalize">
          {getSectionName(currentSection)}
        </div>
      </div>
    </header>
  );
};

export default Header;