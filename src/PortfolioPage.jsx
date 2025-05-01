import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ChevronRight } from 'lucide-react';

// Import Components
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import ParallaxElement from './components/ParallaxElement'; // For main background elements
import HeroSection from './components/HeroSection';
import HorizontalScrollText from './components/HorizontalScrollText';
import ProjectsGrid from './components/ProjectsGrid';
import CoreSkillsSection from './components/CoreSkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Register GSAP plugins (Only once)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function PortfolioPage() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs for each section
  const heroRef = useRef();
  const workRef = useRef();
  const skillsRef = useRef(); // Renamed for clarity
  const contactRef = useRef();
  const sections = [ // Array for easier mapping
      { id: 'hero', ref: heroRef },
      { id: 'work', ref: workRef },
      { id: 'skills', ref: skillsRef },
      { id: 'contact', ref: contactRef },
  ];

  const mainContainerRef = useRef(); // Ref for the main scrollable container if needed

  // --- Global Effects (Scroll Progress, Section Tracking) ---
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight; // Use scrollHeight
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(Math.min(1, Math.max(0, scrollPercent))); // Clamp between 0 and 1
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // Set up ScrollTriggers for section tracking
    const triggers = sections.map(({ id, ref }) => {
        if (!ref.current) return null;
        return ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 40%', // Adjust trigger points as needed
            end: 'bottom 40%',
            onEnter: () => setCurrentSection(id),
            onEnterBack: () => setCurrentSection(id),
            // markers: true, // Uncomment for debugging section triggers
        });
    }).filter(Boolean); // Remove null entries if refs aren't ready

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      triggers.forEach(trigger => trigger.kill()); // Kill section tracking triggers
      ScrollTrigger.getAll().forEach(t => t.kill()); // Kill any remaining triggers (safety net)
      gsap.killTweensOf(window); // Kill scroll-to tweens
    };
  }, [sections]); // Run once on mount and when sections change

  // --- Smooth Scroll Function ---
    const scrollToSection = (sectionId) => {
    const targetSection = sections.find(sec => sec.id === sectionId);
    if (targetSection && targetSection.ref.current) {
      gsap.to(window, {
        duration: 1.8, // Slightly longer duration for more smoothness
        scrollTo: {
          y: targetSection.ref.current,
          offsetY: 0 // Adjust if needed
        },
        // Consider 'expo.inOut' for a more pronounced ease, or keep 'power3.inOut'
        ease: "expo.inOut"
      });
    } else {
        console.warn(`Section with id "${sectionId}" not found.`);
    }
  };


  // --- Scroll Down Indicator Logic ---
  const getNextSection = () => {
      const currentIndex = sections.findIndex(sec => sec.id === currentSection);
      const nextIndex = (currentIndex + 1) % sections.length;
      return sections[nextIndex]?.id || sections[0]?.id; // Loop back to start
  };

  return (
    <div ref={mainContainerRef} className="bg-black text-white min-h-screen overflow-x-hidden font-sans relative">
      <CustomCursor />
      <ScrollProgressIndicator progress={scrollProgress} />
      {/* <Header currentSection={currentSection} /> */}

      {/* Main background parallax elements */}
      <ParallaxElement
        speed="0.2"
        direction="-1"
        className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-500/5 blur-3xl opacity-50"
      />
      <ParallaxElement
        speed="0.1"
        className="fixed top-3/4 right-1/4 w-80 h-80 rounded-full bg-red-500/10 blur-3xl opacity-60"
      />
       <ParallaxElement
        speed="0.15"
        direction="-1"
        offset="-200"
        rotation={-45} // Add rotation
        className="fixed top-1/2 left-1/3 w-40 h-40 bg-red-800/10 blur-2xl opacity-70 rounded-xl" // Shape variation
      />

      {/* Scroll down indicator */}
      {currentSection !== 'contact' && ( // Hide on last section
         <div
         // MOVED TO LEFT: changed right-6 to left-6
         className="fixed left-6 bottom-6 z-30 flex items-center space-x-2 cursor-pointer group"
         onClick={() => scrollToSection('contact')} // Explicitly scroll to contact
         title="Connect"
      >
         {/* Use ChevronRight pointing towards content */}
         <ChevronRight size={18} className="text-red-500 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
         {/* CHANGED TEXT */}
         <span className="text-xs tracking-widest opacity-70 group-hover:opacity-100 transition-opacity font-semibold uppercase">
           Connect
         </span>
      </div>
   )}


      {/* Page Content */}
      <main className="relative z-[5]">
        {/* Pass the updated scrollToSection if needed by Hero, although button already calls it */}
        <HeroSection id="hero" innerRef={heroRef} scrollToSection={scrollToSection} />

        <HorizontalScrollText text="CREATIVE DEVELOPER • AI ENTHUSIAST • INTERACTIVE EXPERIENCES • " />

        {/* Pass section refs */}
        <ProjectsGrid id="work" innerRef={workRef} sectionRef={workRef}/>

        <CoreSkillsSection id="skills" sectionRef={skillsRef}/> {/* Pass only sectionRef */}

        <ContactSection id="contact" sectionRef={contactRef}/> {/* Pass only sectionRef */}
      </main>

      <Footer />

       {/* Global Styles - Keep minimal, prefer Tailwind */}
       <style jsx global>{`
        body {
          background-color: black;
          color: white;
          /* Consider adding smooth scrolling if not handled by browser */
          /* scroll-behavior: smooth; */
        }
        /* Add any other essential global styles */
       `}</style>
    </div>
  );
}