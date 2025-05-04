// src/components/SectionSpecificParallax.jsx
import React, { useState, useEffect } from 'react';
import ParallaxElement from './ParallaxElement'; // Ensure this path is correct

const SectionSpecificParallax = ({ sectionId }) => {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');

        // Function to update state based on media query
        const handleResize = () => {
            setIsLargeScreen(mediaQuery.matches);
        };

        // Initial check
        handleResize();

        // Add listener for changes
        mediaQuery.addEventListener('change', handleResize);

        // Cleanup listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount

    // --- Render Logic ---

    // Do not render anything if not on a large screen
    if (!isLargeScreen) {
        return null;
    }

    // Return null if sectionId doesn't match any defined cases
    let parallaxContent = null;

    // Elements specific to the hero section
    if (sectionId === 'hero') {
        parallaxContent = (
            <> {/* Use Fragment */}
                {/* Large gradient circle */}
                <ParallaxElement
                    speed={0.15} direction={-1}
                    className="top-1/4 -right-64 w-96 h-96 opacity-20"
                    scrollTriggerConfig={{ trigger: "#hero", start: "top bottom", end: "bottom top" }}
                >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 to-purple-700 blur-3xl" />
                </ParallaxElement>

                {/* Small geometric shape */}
                <ParallaxElement
                    speed={0.2} direction={1} rotation={45}
                    className="bottom-32 left-20 w-12 h-12 opacity-60"
                    scrollTriggerConfig={{ trigger: "#hero", start: "top bottom", end: "bottom top" }}
                >
                    <div className="w-full h-full bg-red-500 transform rotate-45" />
                </ParallaxElement>

                {/* Dots pattern */}
                <ParallaxElement
                    speed={0.1} direction={-1}
                    className="top-1/3 right-20 opacity-40"
                    scrollTriggerConfig={{ trigger: "#hero", start: "top bottom", end: "bottom top" }}
                >
                    <div className="flex space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-white" />
                        ))}
                    </div>
                </ParallaxElement>
            </>
        );
    }

    // Elements specific to the work section
    else if (sectionId === 'work') {
         parallaxContent = (
             <>
                 {/* Floating squares */}
                 {[1, 2, 3, 4, 5, 6].map((i) => (
                     <ParallaxElement
                         key={`work-sq-${i}`} speed={0.05 + (i * 0.03)} direction={i % 2 === 0 ? 1 : -1} rotation={i * 10}
                         className={`w-8 h-8 opacity-30 ${
                           i === 1 ? 'top-20 left-1/4' :
                           i === 2 ? 'top-1/3 right-1/3' :
                           i === 3 ? 'bottom-1/4 left-20' :
                           i === 4 ? 'bottom-32 right-1/4' :
                           i === 5 ? 'top-10 right-1/4' :
                           'bottom-10 left-1/3' // Note: original had i===6 check missing, corrected here
                         }`}
                         scrollTriggerConfig={{ trigger: "#work", start: "top bottom", end: "bottom top" }}
                     >
                         <div className="w-full h-full bg-blue-400" />
                     </ParallaxElement>
                 ))}

                 {/* Large faded circle */}
                 <ParallaxElement
                     speed={0.08} direction={-1}
                     className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
                     scrollTriggerConfig={{ trigger: "#work", start: "top bottom", end: "bottom top" }}
                 >
                     <div className="w-full h-full rounded-full border-2 border-white" />
                 </ParallaxElement>
             </>
         );
    }

    // Elements specific to the skills section
    else if (sectionId === 'skills') {
         parallaxContent = (
             <>
                 {/* Diagonal lines */}
                 <ParallaxElement
                     speed={0.15} direction={1}
                     className="top-1/4 -left-20 w-64 h-1 opacity-30 transform rotate-45"
                     scrollTriggerConfig={{ trigger: "#skills", start: "top bottom", end: "bottom top" }}
                 >
                     <div className="w-full h-full bg-purple-500" />
                 </ParallaxElement>
                 <ParallaxElement
                     speed={0.1} direction={-1}
                     className="bottom-1/3 -right-20 w-64 h-1 opacity-30 transform -rotate-45"
                     scrollTriggerConfig={{ trigger: "#skills", start: "top bottom", end: "bottom top" }}
                 >
                     <div className="w-full h-full bg-yellow-500" />
                 </ParallaxElement>

                 {/* Tech-related shape */}
                 <ParallaxElement
                     speed={0.2} direction={1} rotation={-10}
                     className="bottom-20 left-20 w-32 h-32 opacity-20"
                     scrollTriggerConfig={{ trigger: "#skills", start: "top bottom", end: "bottom top" }}
                 >
                     <div className="w-full h-full">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-teal-400">
                             <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                         </svg>
                     </div>
                 </ParallaxElement>
             </>
         );
    }

    // Elements specific to the contact section
    else if (sectionId === 'contact') {
         parallaxContent = (
             <>
                 {/* Gradient blob */}
                 <ParallaxElement
                     speed={0.1} direction={-1}
                     className="top-1/3 -left-32 w-64 h-64 opacity-20"
                     scrollTriggerConfig={{ trigger: "#contact", start: "top bottom", end: "bottom top" }}
                 >
                     <div className="w-full h-full rounded-full bg-gradient-to-r from-teal-400 to-blue-500 blur-2xl" />
                 </ParallaxElement>

                 {/* Floating arrow */}
                 <ParallaxElement
                     speed={0.15} direction={1}
                     className="top-1/4 right-20 opacity-40"
                     scrollTriggerConfig={{ trigger: "#contact", start: "top bottom", end: "bottom top" }}
                 >
                     {/* Simple CSS arrow (adjust size/position if needed) */}
                      <div className="w-8 h-8 border-r-2 border-b-2 border-white transform rotate-45"></div>
                 </ParallaxElement>
             </>
         );
    }


    // Render the container only if there's content for the current section
    if (parallaxContent) {
        return (
            <div className="absolute inset-0 w-full h-full overflow-hidden z-[1] pointer-events-none">
                {parallaxContent}
            </div>
        );
    }

    return null; // Return null if sectionId doesn't match
};

export default SectionSpecificParallax;