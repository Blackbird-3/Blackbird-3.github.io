import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Keep for potential fallbacks, though Lenis handles scrolling
import Lenis from '@studio-freight/lenis'; // Import Lenis
import { ChevronRight } from 'lucide-react'; // Icon for Connect button

// Import Components (ensure paths are correct)
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import HeroSection from './components/HeroSection';
import HorizontalScrollText from './components/HorizontalScrollText';
import ProjectsGrid from './components/ProjectsGrid';
import CoreSkillsSection from './components/CoreSkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SectionSpecificParallax from './components/SectionSpecificParallax';
import useIsMobile from './data/useIsMobile';

// Register GSAP plugins (Only once)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function PortfolioPage() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showConnectButton, setShowConnectButton] = useState(false); // State for connect button visibility
  const lenisRef = useRef(null); // Ref to store Lenis instance
  const isMobile = useIsMobile(768);

  // Refs for each section
  const heroRef = useRef();
  const workRef = useRef();
  const skillsRef = useRef();
  const contactRef = useRef();
  const dropletSectionRef = useRef();
  const sections = [
      { id: 'hero', ref: heroRef },
      { id: 'work', ref: workRef },
      { id: 'skills', ref: skillsRef },
      { id: 'contact', ref: contactRef },
  ];

  const mainContainerRef = useRef();
  const dropletRefs = useRef([]);

  // --- Lenis Smooth Scroll Setup & Scroll Tracking ---
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
        smoothWheel: true,
        smoothTouch: false,
        lerp: 0.1, // Lower = smoother
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });
    lenisRef.current = lenis; // Store instance

    // Get scroll updates from Lenis
    lenis.on('scroll', (e) => {
      // Update scroll progress
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const progress = e.scroll / (docHeight - winHeight);
      setScrollProgress(Math.min(1, Math.max(0, progress)));

      // Update connect button visibility
      setShowConnectButton(e.scroll > 50); // Show after scrolling 50px

      // Update GSAP ScrollTrigger
      ScrollTrigger.update(e);
    });

    // Integrate Lenis with GSAP ticker for synchronization
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Run Lenis's RequestAnimationFrame loop
    });
    gsap.ticker.lagSmoothing(0); // Optional: Adjust lag smoothing

    // Set up ScrollTriggers for section tracking (using Lenis scroll)
    const triggers = sections.map(({ id, ref }) => {
        if (!ref.current) return null;
        return ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 40%',
            end: 'bottom 40%',
            onEnter: () => setCurrentSection(id),
            onEnterBack: () => setCurrentSection(id),
            // markers: true,
        });
    }).filter(Boolean);

    // Cleanup
    return () => {
      lenis.destroy(); // Destroy Lenis instance
      lenisRef.current = null;
      triggers.forEach(trigger => trigger.kill());
      ScrollTrigger.getAll().forEach(t => t.kill()); // Kill any others
      gsap.ticker.remove(lenis.raf); // Remove lenis raf from ticker
    };
  }, []); // Run once on mount

  // --- Enhanced Responsive Droplet Animation useEffect ---
  useEffect(() => {
    // Make sure droplet refs and section ref are populated
    if (!dropletSectionRef.current || dropletRefs.current.length === 0) return;

    const validDropletRefs = dropletRefs.current.filter(Boolean);
    if (validDropletRefs.length === 0) return;

    const ctx = gsap.context(() => {
      // Adjust timing based on device
      const scrubValue = isMobile ? 1 : 2; // Faster scrub on mobile
      const endValue = isMobile ? "+=150%" : "+=200%"; // Shorter scroll duration on mobile
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: dropletSectionRef.current,
          start: "top top", 
          end: endValue,
          pin: true,
          scrub: scrubValue,
          anticipatePin: 1,
        }
      });

      // Create layers of droplets with different speeds for parallax effect
      validDropletRefs.forEach((droplet, index) => {
        // Determine which speed layer this droplet belongs to
        const speedLayer = index % 3; // 0 = fast/foreground, 1 = medium/midground, 2 = slow/background
        
        // Set parameters based on the speed layer and device type
        let speedMultiplier, distanceMultiplier, durationBase, easing;
        
        if (isMobile) {
          // Mobile speeds (generally faster to accommodate shorter attention spans)
          switch(speedLayer) {
            case 0: // Foreground - fastest
              speedMultiplier = 1.3;
              distanceMultiplier = 1.0;
              durationBase = 0.8;
              easing = "power1.in";
              break;
            case 1: // Midground
              speedMultiplier = 0.9;
              distanceMultiplier = 0.9;
              durationBase = 1.8;
              easing = "power1.inOut";
              break;
            case 2: // Background - slowest
              speedMultiplier = 0.5;
              distanceMultiplier = 0.8;
              durationBase = 3.0;
              easing = "sine.in";
              break;
          }
        } else {
          // Desktop speeds (can be slower and more dramatic)
          switch(speedLayer) {
            case 0: // Foreground - fastest
              speedMultiplier = 1.5;
              distanceMultiplier = 1.2;
              durationBase = 1.0;
              easing = "power1.in";
              break;
            case 1: // Midground
              speedMultiplier = 1.0;
              distanceMultiplier = 1.0;
              durationBase = 2.5;
              easing = "power1.inOut";
              break;
            case 2: // Background - slowest
              speedMultiplier = 0.5;
              distanceMultiplier = 0.8;
              durationBase = 4.0;
              easing = "sine.in";
              break;
          }
        }
        
        // Calculate travel parameters with randomness within each layer
        const travelDistance = (100 + Math.random() * 80) * distanceMultiplier; 
        const duration = (durationBase + Math.random() * 2) * speedMultiplier;
        
        // Add slight horizontal movement for some droplets (less on mobile)
        const horizontalMovement = speedLayer === 1 ? 
          (Math.random() > 0.5 ? Math.random() * (isMobile ? 5 : 10) : 
                                 Math.random() * (isMobile ? -5 : -10)) : 0;
        
        // Delay start time based on speed layer for continuous flow
        const startPos = index * 0.03 + speedLayer * 0.2;
        
        // Create the animation
        tl.to(droplet, {
          y: `${travelDistance}vh`, 
          x: horizontalMovement + 'vw',
          opacity: speedLayer === 0 ? 0 : 0.1,
          ease: easing,
          duration: duration,
        }, startPos);
      });

    }, dropletSectionRef);

    return () => ctx.revert(); // Cleanup
  }, [dropletRefs.current.length, isMobile]);

  // --- Scroll To Section Function (using Lenis) ---
  const scrollToSection = (sectionId) => {
    const targetSection = sections.find(sec => sec.id === sectionId);
    if (targetSection?.ref?.current && lenisRef.current) {
        lenisRef.current.scrollTo(targetSection.ref.current, {
            offset: 0, // Adjust if needed
            duration: 2.2, // Adjust duration (Lenis uses seconds)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Example ease out expo
        });
    } else if (targetSection?.ref?.current) {
        // Fallback if Lenis isn't ready (optional)
         console.warn("Lenis not ready, using GSAP fallback for scroll");
         gsap.to(window, {
            duration: 1.8,
            scrollTo: { y: targetSection.ref.current, offsetY: 0 },
            ease: "expo.inOut"
          });
    } else {
        console.warn(`Section with id "${sectionId}" not found.`);
    }
  };

  return (
    <div ref={mainContainerRef} className="bg-black text-white min-h-screen overflow-x-hidden font-sans relative">
      <CustomCursor />
      <ScrollProgressIndicator progress={scrollProgress} />
      {/* <Header currentSection={currentSection} /> */}

      {/* Global background parallax elements */}
      {/* <ParallaxShapes /> */}
      
      {/* Section-specific parallax elements */}
      <SectionSpecificParallax sectionId={currentSection} />

      {/* Connect button - Conditionally Rendered */}
      {showConnectButton && currentSection !== 'contact' && (
         <button // Use button for accessibility
            onClick={() => scrollToSection('contact')}
            title="Connect"
            className="fixed left-6 bottom-6 z-30 flex items-center space-x-2 cursor-pointer group p-2 bg-black/30 backdrop-blur-sm rounded-md hover:bg-red-500/20 transition-colors" // Added subtle bg
         >
            <ChevronRight size={18} className="text-red-500 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
            <span className="text-xs tracking-widest opacity-70 group-hover:opacity-100 transition-opacity font-semibold uppercase text-white">
              Connect
            </span>
         </button>
      )}

      {/* Page Content */}
      <main className="relative z-[5]">
        {/* Pass scrollToSection down */}
        <HeroSection id="hero" innerRef={heroRef} scrollToSection={scrollToSection} />

        <HorizontalScrollText text="CREATIVE DEVELOPER • AI ENTHUSIAST • INTERACTIVE EXPERIENCES • " />

        <ProjectsGrid id="work" sectionRef={workRef}/>

        <CoreSkillsSection id="skills" sectionRef={skillsRef}/>

        {/* === ENHANCED Droplet Animation Section with Parallax Effect === */}
<section ref={dropletSectionRef} className="relative h-[300vh] overflow-hidden bg-gradient-to-b from-black to-black/90"> {/* Height determines scroll duration */}
  {/* Center card with fixed positioning for consistent centering across devices */}
  <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center z-10">
    <div className="w-full px-4 md:px-0 max-w-sm md:max-w-md">
      {/* Card with consistent styling */}
      <div className="bg-black/70 backdrop-blur-md border border-red-500/30 rounded-xl p-6 md:p-8 shadow-xl shadow-red-500/20 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-red-400">Beyond Boundaries</h3>
        <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">Creating digital experiences that blend technology with imagination. Where code meets creativity.</p>
        <div className="h-1 w-16 mx-auto md:mx-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
      </div>
    </div>
  </div>
  
  {/* Container for absolutely positioned droplets within this section */}
  <div className="absolute inset-0">
    {[...Array(45)].map((_, i) => { // Use appropriate number of droplets for both mobile and desktop
      // Determine which speed layer this droplet belongs to (for visual coordination with animation)
      const speedLayer = i % 3; // 0 = foreground, 1 = midground, 2 = background
      
      // Set visual properties based on the speed layer for consistent parallax effect
      // Adjust sizes to be mobile-friendly with rem units
      let sizeBase, opacityBase, blurBase;
      
      switch(speedLayer) {
        case 0: // Foreground - larger, more opaque
          sizeBase = 3; // Smaller on mobile
          opacityBase = 0.8;
          blurBase = 0.5;
          break;
        case 1: // Midground - medium
          sizeBase = 2.5;
          opacityBase = 0.6; 
          blurBase = 1.5;
          break;
        case 2: // Background - smaller, more transparent
          sizeBase = 2;
          opacityBase = 0.4;
          blurBase = 2;
          break;
      }
      
      // Calculate visual properties with randomness within each layer
      // Use smaller size ranges for better mobile compatibility
      const size = Math.random() * 3 + sizeBase;
      const width = size / (4 + speedLayer); // Keep foreground droplets thinner
      const left = Math.random() * 95; // Random horizontal position %
      
      // Distribute droplets across a much larger vertical space
      // Stagger vertical positions more for background droplets
      const initialY = -(Math.random() * (200 + speedLayer * 50) + 10);
      
      // Apply layer-appropriate opacity with randomness
      const opacity = Math.random() * 0.3 + opacityBase;
      
      // Apply layer-appropriate blur with randomness
      const blur = Math.random() * 2 + blurBase;
      
      // Pulse animation frequency varies by layer
      const shouldPulse = speedLayer === 0 ? (i % 4 === 0) : (i % 7 === 0);
      const pulseSpeed = 1 + Math.random() * (3 - speedLayer); // Faster pulse for foreground
      const delay = Math.random() * 1.2; // Random delay for staggered effect

      return (
        <div
          key={i}
          ref={el => dropletRefs.current[i] = el} // Add ref to array
          className={`absolute rounded-full ${
            speedLayer === 0 
              ? 'bg-gradient-to-b from-red-400 to-red-600' // Foreground - bright
              : speedLayer === 1 
                ? 'bg-gradient-to-b from-red-500 to-red-700' // Midground - medium
                : 'bg-gradient-to-b from-red-600 to-red-800' // Background - darker
          }`}
          style={{
            width: `${width}rem`, 
            height: `${size}rem`,
            left: `${left}%`,
            top: `${initialY}vh`,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            // Apply pulse animation to selected droplets
            animation: shouldPulse ? `pulse ${pulseSpeed}s infinite ${delay}s` : 'none',
          }}
        ></div>
      );
    })}
  </div>
</section>
{/* === End Enhanced Droplet Section === */}

        <ContactSection id="contact" sectionRef={contactRef}/>
      </main>

      <Footer />
    </div>
  );
}