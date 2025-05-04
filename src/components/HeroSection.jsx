// src/components/HeroSection.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplineScene from './SplineScene';
import ContactButton from './ContactButton';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ id, innerRef, scrollToSection }) => {
  const contentRef = useRef();
  const scrollHintRef = useRef();
  
  useEffect(() => {
    // Animation setup - runs once when component mounts
    const content = contentRef.current;
    const title = content.querySelector('.hero-title');
    const titleChars = content.querySelectorAll('.hero-title-char');
    const subtitle = content.querySelector('.hero-subtitle');
    const ctaButton = content.querySelector('.cta-button-wrapper');
    
    // Reset initial states
    gsap.set([title, subtitle, ctaButton], { autoAlpha: 1 }); // Set parent containers visible
    gsap.set(titleChars, { y: 100, opacity: 0 });
    gsap.set(subtitle, { y: 30, opacity: 0 });
    gsap.set(ctaButton, { y: 20, opacity: 0, scale: 0.9 });
    gsap.set(scrollHintRef.current, { opacity: 0, y: 20 });
    
    // Create main timeline
    const tl = gsap.timeline({ 
      delay: 0.5,
      defaults: { ease: "power3.out" }
    });
    
    // Add animations to timeline
    tl.to(titleChars, {
      y: 0,
      opacity: 1,
      stagger: 0.02, // Slightly faster stagger for smoother effect
      duration: 1,
      ease: "back.out(1.2)"
    })
    .to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 1.2,
    }, "-=0.6") // Start before title animation completes
    .to(ctaButton, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.8") // Start before subtitle animation completes
    .to(scrollHintRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, "-=0.4"); // Start before button animation completes
    
    // Create scroll-based animations
    ScrollTrigger.create({
      trigger: innerRef.current,
      start: "top top",
      end: "bottom top",
      onEnter: () => {},
      onLeave: () => {
        // Optional: add animations when scrolling away from hero section
      },
      onEnterBack: () => {
        // Optional: add animations when scrolling back to hero section
      }
    });
    
    // Scroll hint fade out animation
    ScrollTrigger.create({
      trigger: innerRef.current,
      start: "top top",
      end: "top+=200 top",
      scrub: true,
      onUpdate: (self) => {
        gsap.to(scrollHintRef.current, {
          opacity: 1 - self.progress,
          duration: 0.1,
          overwrite: "auto"
        });
      }
    });
    
    return () => {
      // Clean up animations when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [innerRef]);
  
  // Your name and text content
  const name = "Shreshtth";
  const titleLine1Prefix = "Hi, I'm ";
  const titleLine1Suffix = ", a";
  const titleLine2 = "Creative Developer";
  
  // Helper function to render characters with animation class
  const renderChars = (text, keyPrefix) => {
    return text.split('').map((char, index) => (
      <span 
        key={`${keyPrefix}-${index}`} 
        className="hero-title-char inline-block"
        style={{ display: 'inline-block', willChange: 'transform, opacity' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };
  
  return (
    <section
      id={id}
      ref={innerRef}
      className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden"
    >
      {/* Spline Background */}
      <SplineScene sceneUrl="https://prod.spline.design/FKaSNIz9VA9A8AUX/scene.splinecode" />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="hero-content relative z-10 text-center max-w-5xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight hero-title">
          {/* Line 1 */}
          <span className="block overflow-hidden">
            {renderChars(titleLine1Prefix, 'prefix')}
            <span className="text-red-500">
              {renderChars(name, 'name')}
            </span>
            {renderChars(titleLine1Suffix, 'suffix')}
          </span>
          
          {/* Line 2 */}
          <span className="block overflow-hidden mt-2">
            {renderChars(titleLine2, 'line2')}
          </span>
        </h1>
        
        <div className="overflow-hidden">
          <p className="hero-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
          I craft immersive digital experiences that blend cutting-edge technology with thoughtful design.
          Specializing in Generative AI solutions and intelligent applications that leave a lasting impact.
          </p>
        </div>
        
        <div 
          className="transition-colors duration-300 mx-auto group cta-button-wrapper"
          onClick={() => scrollToSection('contact')}
        >
          <ContactButton />
        </div>
      </div>
      
      {/* Scroll Down Hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group z-20"
        onClick={() => scrollToSection('work')}
        title="Scroll Down"
      >
        <span className="text-xs mb-2 tracking-widest opacity-70 group-hover:opacity-100 transition-opacity uppercase">
          Scroll
        </span>
        <div className="scroll-indicator w-6 h-10 border-2 border-white/70 rounded-full flex justify-center opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;