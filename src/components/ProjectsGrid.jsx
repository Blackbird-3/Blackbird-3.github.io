import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BentoCard from './BentoCard';
import { bentoItems } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const ProjectsGrid = ({ id, sectionRef }) => {
  const gridRef = useRef();
  const [activeFilter, setActiveFilter] = useState('all');
  const decorativeShapesRef = useRef([]);
  const floatingElementsRef = useRef([]);
  const timelineRef = useRef(null);

  // Filter items based on active filter
  const filteredItems = activeFilter === 'all' 
    ? bentoItems 
    : bentoItems.filter(item => item.tags && item.tags.includes(activeFilter));

  // Add unique tags for filtering
  const allTags = ['all', ...new Set(bentoItems.flatMap(item => item.tags || []))].slice(0, 7);

  // Reset decorative refs
  const resetRefs = () => {
    decorativeShapesRef.current = [];
    floatingElementsRef.current = [];
  };

  // Add a decorative element ref
  const addShapeRef = (el) => {
    if (el && !decorativeShapesRef.current.includes(el)) {
      decorativeShapesRef.current.push(el);
    }
  };

  // Add a floating element ref
  const addFloatingRef = (el) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  useEffect(() => {
    resetRefs();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    
    // Create a GSAP context
    const ctx = gsap.context(() => {
      // Animation for section heading and divider
      const heading = sectionRef.current?.querySelector('.section-heading');
      const divider = sectionRef.current?.querySelector('.section-divider');
      const filterButtons = document.querySelectorAll('.filter-button');

      // Timeline for coordinated animations
      timelineRef.current = gsap.timeline();

      // Heading animation
      if (heading) {
        gsap.fromTo(heading,
          { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0.3 },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { 
              trigger: heading, 
              start: "top 85%", 
              toggleActions: "play none none none" 
            }
          }
        );
      }

      // Divider animation
      if (divider) {
        gsap.fromTo(divider,
          { width: 0, opacity: 0.5 },
          {
            width: "100%",
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: { 
              trigger: divider, 
              start: "top 90%", 
              toggleActions: "play none none none" 
            }
          }
        );
      }

      // Filter buttons animation
      gsap.fromTo(filterButtons,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { 
            trigger: filterButtons[0], 
            start: "top 90%", 
            toggleActions: "play none none none" 
          }
        }
      );

      // Animate decorative shapes
      if (decorativeShapesRef.current.length > 0) {
        decorativeShapesRef.current.forEach((el, index) => {
          // Initial position and opacity
          gsap.set(el, { opacity: 0, scale: 0.5, rotation: index % 2 === 0 ? 45 : -45 });
          
          // Reveal animation on scroll
          gsap.to(el, {
            opacity: 0.6,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          });
          
          // Continuous animation
          gsap.to(el, {
            y: `random(-${20 + index * 5}, ${20 + index * 5})`,
            x: `random(-${10 + index * 3}, ${10 + index * 3})`,
            rotation: `random(-${8 + index}, ${8 + index})`,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
          });
        });
      }

      // Floating elements animation
      if (floatingElementsRef.current.length > 0) {
        floatingElementsRef.current.forEach((el, index) => {
          // Set initial state
          gsap.set(el, { opacity: 0, y: 50 });
          
          // Animate in
          gsap.to(el, {
            opacity: 0.8,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none none"
            }
          });
          
          // Constant floating animation
          const duration = 5 + Math.random() * 7;
          const delay = index * 0.2;
          
          gsap.to(el, { 
            y: "random(-15, 15)", 
            x: "random(-10, 10)",
            rotation: index % 2 === 0 ? "random(-8, 8)" : 0,
            duration: duration,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }

      // Animate each grid item with staggered entrance
      const animateGridItems = () => {
        const cards = gridRef.current.querySelectorAll('.bento-item');
        
        // Reset all cards
        gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });
        
        // Staggered animation for each card
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: {
            amount: 0.8,  // Increase the total stagger time
            grid: [3, 4], // Approximate grid layout
            from: "start" // Start from the first element
          },
          duration: 1,
          ease: "power3.out",
          clearProps: "scale", // Clear scale after animation to allow hover effects
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          }
        });
        
        // Custom hover and scroll effects for each card
        cards.forEach((card, index) => {
          // Create hover timeline for each card
          const hoverTl = gsap.timeline({ paused: true });
          
          // Detect card type
          const isProjectCard = card.querySelector('.project-image');
          const animationElements = card.querySelectorAll('.animate-on-hover');
          const cardContent = isProjectCard ? card.querySelector('.project-content') : card;
          
          if (isProjectCard) {
            const projectImage = card.querySelector('.project-image');
            
            hoverTl
              .to(card, { 
                y: -8, 
                boxShadow: "0 15px 30px rgba(0,0,0,0.3), 0 5px 15px rgba(255,0,0,0.1)",
                duration: 0.4, 
                ease: "power2.out" 
              })
              .to(projectImage, { 
                scale: 1.08, 
                duration: 0.8, 
                ease: "power2.out" 
              }, "-=0.4")
              .to(animationElements, { 
                y: 0, 
                opacity: 1, 
                stagger: 0.08, 
                duration: 0.5, 
                ease: "power2.out" 
              }, "-=0.6");
          } else {
            // For non-project cards
            hoverTl
              .to(card, { 
                y: -5, 
                scale: 1.02,
                borderColor: "rgba(255,50,50,0.4)",
                duration: 0.4, 
                ease: "power2.out" 
              });
          }
          
          // Set up hover events
          card.addEventListener('mouseenter', () => hoverTl.play());
          card.addEventListener('mouseleave', () => hoverTl.reverse());
          
          // Parallax effect on scroll
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              // Different parallax speeds based on card position
              const speed = index % 4 === 0 ? 0.1 : 
                           index % 4 === 1 ? -0.05 : 
                           index % 4 === 2 ? 0.06 : -0.08;
                           
              gsap.to(card, {
                y: self.progress * -40 * speed,
                duration: 0.5,
                overwrite: 'auto'
              });
            }
          });
        });
      };
      
      // Run grid animations
      animateGridItems();
      
      // Return animation reset functions for filter changes
      return { 
        resetGridAnimations: animateGridItems 
      };
    }, gridRef);

    return () => ctx.revert(); // Cleanup animations
  }, [sectionRef, activeFilter]); // Rerun when sectionRef or activeFilter changes

  // Handle filter change
  const handleFilterChange = (filter) => {
    if (filter === activeFilter) return;
    
    // Use GSAP to animate out current items, then change filter, then animate in new items
    const cards = gridRef.current.querySelectorAll('.bento-item');
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveFilter(filter);
        // Let React update the DOM before animating new cards
        setTimeout(() => {
          if (timelineRef.current) {
            timelineRef.current.resetGridAnimations?.();
          }
        }, 50);
      }
    });
    
    tl.to(cards, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      stagger: {
        amount: 0.3,
        grid: "auto",
        from: "end"
      },
      duration: 0.4,
      ease: "power1.in"
    });
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen py-28 px-6 md:px-10 lg:px-20 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div ref={addShapeRef} className="absolute top-32 right-8 w-48 h-48 rounded-full bg-gradient-to-br from-red-500/10 to-transparent blur-xl"></div>
      <div ref={addShapeRef} className="absolute -bottom-36 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl"></div>
      <div ref={addShapeRef} className="absolute top-1/4 left-1/5 w-36 h-36 border border-red-500/10 rounded-md rotate-12 opacity-30"></div>
      <div ref={addShapeRef} className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-white/5 rounded-full opacity-20"></div>
      
      {/* Floating elements */}
      <div ref={addFloatingRef} className="absolute top-64 right-10 w-6 h-6 bg-red-500/20 rounded-full blur-sm"></div>
      <div ref={addFloatingRef} className="absolute bottom-1/3 left-1/4 w-8 h-8 border border-red-500/30 rounded-full"></div>
      <div ref={addFloatingRef} className="absolute top-1/2 right-1/3 w-12 h-1 bg-gradient-to-r from-red-500/30 to-transparent"></div>
      <div ref={addFloatingRef} className="absolute bottom-64 right-1/4 w-3 h-12 bg-gradient-to-b from-red-500/20 to-transparent"></div>
      <div ref={addFloatingRef} className="absolute top-1/4 left-10 w-4 h-4 border-2 border-red-500/40 rotate-45"></div>
      
      {/* More dynamic decorative elements */}
      <div className="absolute top-10 left-1/2 w-px h-40 bg-gradient-to-b from-red-500/0 via-red-500/20 to-transparent"></div>
      <div className="absolute bottom-20 right-20 w-32 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
      <div className="absolute top-1/2 left-5 w-2 h-2 bg-red-500/40 rounded-full"></div>
      <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-red-500/30 rounded-full"></div>
      <div className="absolute top-96 left-1/4 w-1 h-1 bg-white/60 rounded-full shadow-glow"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="section-heading text-4xl md:text-5xl font-bold mb-4 relative z-10 text-center">
          <span className="text-red-500">/</span> Selected Works
        </h2>
        <div className="section-divider w-full h-px bg-red-500/30 mb-16 origin-left"></div>
        
        {/* Project filters */}
        <div className="mb-20 flex flex-wrap gap-4 justify-center">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleFilterChange(tag)}
              className={`filter-button text-sm md:text-base px-5 py-2.5 rounded-full transition-all duration-300 capitalize ${
                activeFilter === tag 
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Bento Grid Container with more spacing */}
        <div ref={gridRef} className="bento-grid-container relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 md:gap-12 auto-rows-[minmax(280px,_auto)]">
            {filteredItems.map((item) => (
              <BentoCard key={item.id || item.title} item={item} />
            ))}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-gray-800/70 to-gray-900/90 flex items-center justify-center border border-gray-700/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">No projects found</h3>
              <p className="text-gray-400 max-w-md">There are no projects matching your selected filter. Try selecting a different technology.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;