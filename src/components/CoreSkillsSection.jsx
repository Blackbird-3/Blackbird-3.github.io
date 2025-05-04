import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { coreSkills } from "../data/portfolioData";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CoreSkillsSection = ({ id, sectionRef }) => {
  const skillsContainerRef = useRef(null);
  const skillsTrackRef = useRef(null);
  const headingRef = useRef(null);
  const skillRefs = useRef([]);
  const shapesRefs = useRef([]);

  // Clear refs array on each render
  skillRefs.current = [];
  shapesRefs.current = [];

  // Add to refs helper function
  const addToSkillRefs = (el) => {
    if (el && !skillRefs.current.includes(el)) {
      skillRefs.current.push(el);
    }
  };

  const addToShapesRefs = (el) => {
    if (el && !shapesRefs.current.includes(el)) {
      shapesRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Guard clause
    if (!sectionRef.current || !skillsContainerRef.current || !skillsTrackRef.current) return;

    // Create GSAP context for clean animation management
    const ctx = gsap.context(() => {
      // --- SECTION ENTRANCE ANIMATION ---
      // Hero title reveal with clip path
      gsap.fromTo(
        headingRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          opacity: 0.4,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 70%",
          },
        }
      );

      // --- BACKGROUND SHAPES PARALLAX ANIMATIONS ---
      // Each shape moves at different speeds
      shapesRefs.current.forEach((shape, index) => {
        // Calculate random parameters for more organic movement
        const direction = index % 2 === 0 ? 1 : -1;
        const speed = 0.5 + Math.random() * 0.5;
        const rotationSpeed = Math.random() * 180;
        const scaleVariation = 0.1 + Math.random() * 0.3;

        // Parallax movement
        gsap.to(shape, {
          y: `${direction * -150}`,
          x: `${((index % 3) - 1) * 50}`,
          rotation: direction * rotationSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: speed,
          },
        });

        // Subtle breathing animation independent of scroll
        gsap.to(shape, {
          scale: 1 + scaleVariation,
          opacity: 0.1 + Math.random() * 0.15,
          duration: 2 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // --- HORIZONTAL GRID LAYOUT WITH SCROLL-DRIVEN ANIMATION ---
      // Create the horizontal scrolling effect for skills
      if (skillsContainerRef.current && skillsTrackRef.current && skillRefs.current.length > 0) {
        // Calculate the total width of skills content
        const trackWidth = skillsTrackRef.current.offsetWidth;
        const containerWidth = skillsContainerRef.current.offsetWidth;
        
        // Only create horizontal scroll if content is wider than container
        if (trackWidth > containerWidth) {
          const distance = trackWidth - containerWidth;
          
          // Create a ScrollTrigger for horizontal scrolling
          ScrollTrigger.create({
            trigger: skillsContainerRef.current,
            start: "top 70%",
            end: "bottom 20%",
            scrub: 1,
            // markers: true, // Enable for debugging
            onUpdate: (self) => {
              // Calculate the distance to scroll based on progress
              const scrollDistance = distance * self.progress;
              
              // Apply the transform to the skills track
              gsap.set(skillsTrackRef.current, {
                x: -scrollDistance,
              });

              // Synchronize the scrollbar position
              skillsContainerRef.current.scrollLeft = scrollDistance;
            }
          });
        }
      }

      // Add animation for each skill item
      skillRefs.current.forEach((skill, index) => {
        // Set initial state
        gsap.set(skill, {
          opacity: 0,
          y: 30,
          scale: 0.9
        });

        // Create staggered entrance animation
        gsap.to(skill, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.05, // Staggered effect
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: skillsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Add hover interactions to all skills
      skillRefs.current.forEach((skill) => {
        const icon = skill.querySelector(".skill-icon");
        const bg = skill.querySelector(".skill-bg");
        const text = skill.querySelector(".skill-name");

        // Create hover animation
        skill.addEventListener("mouseenter", () => {
          gsap.to(skill, { y: -10, scale: 1.05, duration: 0.3 });
          gsap.to(icon, { scale: 1.2, duration: 0.3 });
          gsap.to(bg, { scale: 1.5, opacity: 0.25, duration: 0.4 });
          gsap.to(text, { fontWeight: "600", duration: 0.2 });
        });

        skill.addEventListener("mouseleave", () => {
          gsap.to(skill, { y: 0, scale: 1, duration: 0.3 });
          gsap.to(icon, { scale: 1, duration: 0.3 });
          gsap.to(bg, { scale: 1, opacity: 0.15, duration: 0.4 });
          gsap.to(text, { fontWeight: "500", duration: 0.2 });
        });
      });

      // --- INTERSECTION OBSERVER FOR SKILL HIGHLIGHTING ---
      // Create observer to highlight skills as they enter viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                backgroundColor: "rgba(30, 30, 30, 0.3)",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                duration: 0.5,
              });
            } else {
              gsap.to(entry.target, {
                backgroundColor: "transparent",
                boxShadow: "none",
                duration: 0.5,
              });
            }
          });
        },
        { threshold: 0.7 }
      );

      skillRefs.current.forEach((skill) => {
        observer.observe(skill);
      });

      // Clean up observer on component unmount
      return () => {
        skillRefs.current.forEach((skill) => {
          observer.unobserve(skill);
        });
      };
    }, sectionRef);

    // Clean up all GSAP animations
    return () => {
      ctx.revert();
    };
  }, [sectionRef]);

  // Add touch scroll for mobile
  useEffect(() => {
    if (!skillsContainerRef.current) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    const container = skillsContainerRef.current;
    
    const handleMouseDown = (e) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX || e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    
    const handleMouseLeave = () => {
      isDown = false;
      container.classList.remove('active');
    };
    
    const handleMouseUp = () => {
      isDown = false;
      container.classList.remove('active');
    };
    
    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk;
    };
    
    // Desktop events
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    
    // Mobile touch events
    container.addEventListener('touchstart', handleMouseDown);
    container.addEventListener('touchend', handleMouseUp);
    container.addEventListener('touchmove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      
      container.removeEventListener('touchstart', handleMouseDown);
      container.removeEventListener('touchend', handleMouseUp);
      container.removeEventListener('touchmove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !skillsContainerRef.current || !skillsTrackRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate the total width of skills content
      const trackWidth = skillsTrackRef.current.offsetWidth;
      const containerWidth = skillsContainerRef.current.offsetWidth;

      // Only create horizontal scroll if content is wider than container
      if (trackWidth > containerWidth) {
        const distance = trackWidth - containerWidth;

        // Create a ScrollTrigger for horizontal scrolling
        ScrollTrigger.create({
          trigger: skillsContainerRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1,
          onUpdate: (self) => {
            // Calculate the distance to scroll based on progress
            const scrollDistance = distance * self.progress;

            // Apply the transform to the skills track
            gsap.set(skillsTrackRef.current, {
              x: -scrollDistance,
            });

            // Synchronize the scrollbar position
            skillsContainerRef.current.scrollLeft = scrollDistance;
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [sectionRef]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative min-h-[150vh] py-32 px-4 overflow-hidden perspective"
    >
      {/* Heading */}
      <div className="relative text-center z-30 mb-16 px-6">
        <h2
          ref={headingRef}
          className="section-heading text-4xl md:text-5xl font-bold mb-4 relative z-10"
        >
          <span className="text-red-500">/</span> Core Technologies
        </h2>
        <div className="section-divider w-full h-px bg-red-500/30 mb-16 origin-left"></div>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Key tools and technologies I use to build modern digital experiences
        </p>
      </div>

      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid lines for tech feel */}
        <div className="absolute inset-0 opacity-25">
          {/* Horizontal grid lines */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent absolute top-1/6"></div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent absolute top-1/4"></div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent absolute top-1/3"></div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent absolute top-2/4"></div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent absolute top-2/3"></div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent absolute top-3/4"></div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent absolute top-5/6"></div>

          {/* Vertical grid lines */}
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent absolute left-1/6"></div>
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent absolute left-1/4"></div>
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent absolute left-1/3"></div>
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent absolute left-2/4"></div>
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent absolute left-2/3"></div>
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent absolute left-3/4"></div>
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent absolute left-5/6"></div>
        </div>
      </div>

      {/* Horizontal Scrolling Skills Section */}
      <div
        ref={skillsContainerRef}
        className="relative z-20 mt-20 overflow-hidden cursor-grab skills-container"
      >
        <div 
          ref={skillsTrackRef}
          className="skills-track flex flex-nowrap gap-6 px-8 md:px-16 py-8 w-max mx-auto"
        >
          {coreSkills.map((skill, index) => (
            <div
              key={index}
              ref={addToSkillRefs}
              className="skill-item flex flex-col items-center justify-center p-6 relative cursor-pointer min-w-[180px] rounded-lg backdrop-blur-sm transition-all duration-300 transform-gpu"
            >
              {/* Background glow */}
              <div
                className="skill-bg absolute w-24 h-24 rounded-full opacity-10 transform-gpu"
                style={{ backgroundColor: skill.color || "#444" }}
              ></div>

              {/* Icon Container */}
              <div
                className="skill-icon relative z-10 mb-6 text-5xl md:text-6xl transform-gpu transition-all"
                style={{ color: skill.color || "white" }}
              >
                {skill.Icon ? (
                  <skill.Icon />
                ) : (
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                )}
              </div>

              {/* Skill Name */}
              <div className="relative text-center">
                <span className="skill-name font-medium text-base md:text-lg text-gray-100 relative z-10">
                  {skill.name}
                </span>
                <div
                  className="w-0 h-0.5 absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-70"
                  style={{ backgroundColor: skill.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Interactive Skill Showcase */}
      <div className="showcase-container relative z-10 mt-20 h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="relative text-center max-w-md mx-auto z-30 bg-black/20 backdrop-blur-sm p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">
            Full-Stack Development
          </h3>
          <p className="text-gray-300">
            From front-end interfaces to back-end systems, I leverage modern
            technologies to build complete digital experiences that are
            performant, accessible, and visually impressive.
          </p>
        </div>
      </div>

      {/* Bottom section with stats */}
      <div className="relative z-30 mt-32 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 backdrop-blur-sm bg-black/20 rounded-lg transform hover:scale-105 transition-all duration-300">
          <div className="text-4xl font-bold text-red-400">
            {coreSkills.length}+
          </div>
          <div className="text-gray-300 mt-2">Technologies</div>
        </div>
        <div className="text-center p-6 backdrop-blur-sm bg-black/20 rounded-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex justify-center">
            <img
              src="https://hitscounter.dev/api/hit?url=shreshtth.me&label=&icon=eye&color=%23dc3545"
              alt="Website Views"
              className="w-40"
            />
          </div>
          <div className="text-gray-300 mt-2">Website Views</div>
          <div className="text-gray-300 mt-2">Today/Total</div>
        </div>

        <div className="text-center p-6 backdrop-blur-sm bg-black/20 rounded-lg transform hover:scale-105 transition-all duration-300">
          <div className="text-4xl font-bold text-green-400">5</div>
          <div className="text-gray-300 mt-2">
            Internships / Freelance Projects
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }

        .feature-skill-3d {
          position: absolute;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition: transform 0.3s ease;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Custom scrollbar for the skills container */
        .skills-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 59, 59, 0.5) rgba(0, 0, 0, 0.2);
          overflow-x: auto;
          overflow-y: hidden;
        }
        
        .skills-container::-webkit-scrollbar {
          height: 6px;
        }
        
        .skills-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        
        .skills-container::-webkit-scrollbar-thumb {
          background: rgba(255, 59, 59, 0.5);
          border-radius: 10px;
        }
        
        .skills-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 59, 59, 0.7);
        }
        
        /* Active state for drag scrolling */
        .skills-container.active {
          cursor: grabbing;
        }
      `}</style>
    </section>
  );
};

export default CoreSkillsSection;