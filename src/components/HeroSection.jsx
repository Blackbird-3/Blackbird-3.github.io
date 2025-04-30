// src/components/HeroSection.jsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import SplineScene from './SplineScene';
import ContactButton from './ContactButton';

const HeroSection = ({ id, innerRef, scrollToSection }) => {

  useEffect(() => {
    // Animation logic targets '.hero-title-char' - Ensure this class remains on ALL chars
    const heroTitleChars = innerRef.current?.querySelectorAll('.hero-title-char');
    const heroSubtitle = innerRef.current?.querySelector('.hero-subtitle');
    const ctaButton = innerRef.current?.querySelector('.cta-button');
    // Scroll hint element removed/changed in PortfolioPage.jsx
    // const scrollHint = innerRef.current?.querySelector('.scroll-hint');

    if (!heroTitleChars || !heroSubtitle || !ctaButton) {
        console.warn("Hero elements not found for animation.");
        return;
    }
    // Reset states before animation
    gsap.killTweensOf([heroTitleChars, heroSubtitle, ctaButton]); // Kill previous tweens if component re-renders
    gsap.set(heroTitleChars, { y: 100, opacity: 0, overwrite: 'auto' });
    gsap.set(heroSubtitle, { y: 30, opacity: 0, overwrite: 'auto' });
    gsap.set(ctaButton, { y: 20, opacity: 0, overwrite: 'auto' });
    // gsap.set(scrollHint, { opacity: 0 }); // Scroll hint animation removed as element changed

    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(heroTitleChars, {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 1.2,
        ease: "power4.out",
      })
      .to(heroSubtitle, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5")
      .to(ctaButton, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.3");
      // .to(scrollHint, { // Animation for old scroll hint removed
      //     opacity: 1,
      //     duration: 0.5,
      // }, "-=0.2");

  }, [innerRef]);

  // --- Corrected Name Logic ---
  const name = "Shreshtth"; // Your Name
  const titleLine1Prefix = "Hi, I'm ";
  const titleLine1Suffix = ", a";
  const titleLine2 = "Creative Developer";

  // Helper function to render characters with the animation class
  const renderChars = (text, keyPrefix) => {
    return text.split('').map((char, index) => (
      <span key={`${keyPrefix}-${index}`} className="hero-title-char inline-block">
        {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space */}
      </span>
    ));
  };

  return (
    <section
      id={id}
      ref={innerRef}
      className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden"
    >
      {/* Spline Background - URL updated via props */}
      <SplineScene sceneUrl="https://prod.spline.design/FKaSNIz9VA9A8AUX/scene.splinecode" />

      {/* Content */}
      <div className="hero-content relative z-10 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight hero-title">
          {/* Render prefix */}
          {renderChars(titleLine1Prefix, 'prefix')}

          {/* Render name with color and animation class */}
          <span className="inline-block text-red-500">
            {renderChars(name, 'name')}
          </span>

          {/* Render suffix */}
          {renderChars(titleLine1Suffix, 'suffix')}

          <br />

          {/* Render second line */}
          {renderChars(titleLine2, 'line2')}
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
          I craft immersive digital experiences that blend cutting-edge technology with thoughtful design. Specializing in interactive websites and applications that leave a lasting impression.
        </p>
        
        <button
          onClick={() => scrollToSection('contact')}
          className=" transition-colors duration-300 mx-auto group" style={{}}
        >
          <ContactButton/>
          
        </button>
      </div>

      {/* Scroll hint moved and restyled in PortfolioPage.jsx */}

    </section>
  );
};

export default HeroSection;