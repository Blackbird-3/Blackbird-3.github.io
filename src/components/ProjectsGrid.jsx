import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BentoCard from './BentoCard'; // Import BentoCard
import { bentoItems } from '../data/portfolioData'; // Import the data
import ParallaxElement from './ParallaxElement'; // Import ParallaxElement

gsap.registerPlugin(ScrollTrigger);

const ProjectsGrid = ({ id, sectionRef }) => { // Pass sectionRef for ScrollTrigger
  const gridRef = useRef();

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
        const cards = gridRef.current.querySelectorAll('.bento-item');

        gsap.fromTo(cards,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: {
                    amount: 0.6, // Total time for stagger
                    grid: "auto",
                    from: "start" // Or "center", "edges", "random"
                },
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current, // Trigger animation when grid enters view
                    start: "top 80%", // Start animation sooner
                    toggleActions: "play none none none", // Play once
                    // markers: true, // For debugging
                }
            }
        );

        // Animation for section heading and divider (moved from main component)
         const heading = sectionRef.current?.querySelector('.section-heading');
         const divider = sectionRef.current?.querySelector('.section-divider');

         if (heading) {
            gsap.fromTo(heading,
              { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0.3 },
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                opacity: 1,
                duration: 1.2,
                ease: "power4.inOut",
                scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" }
              }
            );
          }

          if (divider) {
            gsap.fromTo(divider,
              { scaleX: 0, transformOrigin: 'left' }, // Animate scaleX for better performance
              {
                scaleX: 1,
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: { trigger: divider, start: "top 90%", toggleActions: "play none none none" }
              }
            );
          }

    }, gridRef); // Scope animations to gridRef

    return () => ctx.revert(); // Cleanup animations

  }, [sectionRef]); // Rerun if sectionRef changes

  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen py-24 px-6 md:px-12 relative"
    >
      {/* Optional: Decorative parallax shapes */}
      <ParallaxElement speed="0.15" rotation={30} className="-top-10 -right-10 w-20 h-20 bg-red-500/5 rounded-lg blur-sm opacity-50"/>
      <ParallaxElement speed="-0.1" rotation={-15} className="bottom-1/4 left-5 w-16 h-16 border-2 border-red-500/20 rounded-full opacity-60"/>

      <h2 className="section-heading text-3xl md:text-5xl font-bold mb-4 relative z-10">
        <span className="text-red-500">/</span> Selected Works
      </h2>
      <div className="section-divider w-full h-px bg-red-500/30 mb-16 origin-left z-10 relative"></div>

      {/* Updated Responsive Bento Grid Layout Container */}
      <div ref={gridRef} className="bento-grid-container max-w-7xl mx-auto relative z-10">
          {/* Define responsive columns here */}
          <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-[minmax(180px,_auto)]"> {/* Adjust min row height as needed */}
            {bentoItems.map((item) => (
              // BentoCard's inline style will define spans, which grid should respect/adjust based on available columns
              <BentoCard key={item.id} item={item} />
            ))}
          </div>
      </div>
        {/* Global styles removed as they weren't strictly needed with this approach */}
    </section>
  );
};

export default ProjectsGrid;