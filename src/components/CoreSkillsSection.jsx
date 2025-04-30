import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { coreSkills } from '../data/portfolioData';
import ParallaxElement from './ParallaxElement';

// Ensure plugin is registered (should only happen once globally, but safe to keep here)
gsap.registerPlugin(ScrollTrigger);

const CoreSkillsSection = ({ id, sectionRef }) => {
    const skillsContainerRef = useRef(); // Ref for the container holding the skill items

    useEffect(() => {
        // --- GUARD CLAUSE: Ensure refs are available before proceeding ---
        if (!sectionRef.current) {
             console.warn("CoreSkillsSection: sectionRef.current not available on mount/update.");
             return; // Exit if section ref is not ready
        }
         if (!skillsContainerRef.current) {
             console.warn("CoreSkillsSection: skillsContainerRef.current not available on mount/update.");
             // Depending on logic, you might want to return here too,
             // or proceed knowing skill animations might not run.
             // Let's allow proceeding but skip skill animations if container isn't ready.
         }

        // --- GSAP Context ---
        const ctx = gsap.context(() => {
            // Section heading/divider animations (Check refs inside context too for safety)
            const heading = sectionRef.current?.querySelector('.section-heading');
            const divider = sectionRef.current?.querySelector('.section-divider');
            if (heading) {
                gsap.fromTo(heading,
                    { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0.3 },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, duration: 1.2, ease: "power4.inOut",
                        scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" }
                    }
                );
            }
             if (divider) {
                 gsap.fromTo(divider,
                     { scaleX: 0, transformOrigin: 'left' },
                     {
                         scaleX: 1, duration: 1.5, ease: "power3.inOut",
                         scrollTrigger: { trigger: divider, start: "top 90%", toggleActions: "play none none none" }
                     }
                 );
             }

            // --- Corrected Skill Animation ---
            // Only run if skillsContainerRef.current is valid
            if (skillsContainerRef.current) {
                 const skillItems = skillsContainerRef.current.querySelectorAll('.skill-item-animated');

                 skillItems.forEach((item, index) => {
                     // Simple fade and slide-up animation with scrub
                     gsap.fromTo(item,
                         { opacity: 0.1, y: 80 },
                         {
                             opacity: 1,
                             y: 0,
                             ease: "power2.out",
                             scrollTrigger: {
                                 trigger: item, // Trigger based on the item itself
                                 start: "top 85%",
                                 end: "bottom 70%",
                                 scrub: 1.5, // Smooth scrubbing effect
                                 // --- REMOVED the problematic containerAnimation ---
                                 // markers: true, // Keep for debugging if needed
                             }
                         }
                     );

                     // Optional: Parallax effect (this remains valid)
                     gsap.to(item, {
                         y: (index % 2 === 0) ? -30 : 30,
                         ease: "none",
                         scrollTrigger: {
                             trigger: sectionRef.current,
                             start: "top bottom",
                             end: "bottom top",
                             scrub: 2.5
                         }
                     });
                 });
             } else {
                  console.warn("CoreSkillsSection: Skipping skill item animations as container ref is not set.");
             }


            // --- Animated Decorative Elements ---
            const decoLines = sectionRef.current?.querySelectorAll('.deco-line'); // Use optional chaining
             if (decoLines && decoLines.length > 0) {
                decoLines.forEach(line => {
                     gsap.to(line, {
                         rotation: Math.random() * 360 - 180,
                         scale: 1 + Math.random() * 0.5,
                         opacity: 0.5 + Math.random() * 0.3,
                         ease: "none",
                         scrollTrigger: {
                             trigger: sectionRef.current,
                             start: "top bottom",
                             end: "bottom top",
                             scrub: 2 + Math.random() * 2
                         }
                     });
                 });
             }

        }, sectionRef); // Scope context to the sectionRef (the ref object itself is correct here)

        return () => {
            // console.log("CoreSkillsSection: Cleaning up GSAP context"); // Debug log
            ctx.revert(); // Cleanup GSAP animations and ScrollTriggers
        };

    // Dependency: run when sectionRef itself changes (typically only on mount)
    // or when component re-renders (which might happen if parent state changes)
    }, [sectionRef]);

    // --- Render Logic ---
    return (
        <section id={id} ref={sectionRef} className="py-24 px-6 md:px-12 relative min-h-screen overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                 <ParallaxElement speed="0.1" className="top-1/4 -left-12 w-24 h-24 bg-red-800/10 rounded-full blur-lg opacity-70"/>
                 <div className="deco-line absolute top-1/5 left-1/4 w-0.5 h-40 bg-red-500/30 opacity-30 transform -rotate-45 scale-100"></div>
                 <div className="deco-line absolute bottom-1/4 right-1/5 w-0.5 h-60 bg-red-500/30 opacity-30 transform rotate-12 scale-100"></div>
                 <div className="deco-line absolute top-1/2 right-1/4 w-32 h-0.5 bg-red-500/30 opacity-30 transform rotate-45 scale-100"></div>
            </div>


            <div className="relative z-10">
                <h2 className="section-heading text-3xl md:text-5xl font-bold mb-4 text-center">
                    <span className="text-red-500">/</span> Core Technologies
                </h2>
                <div className="section-divider w-1/4 h-px bg-red-500/30 mb-16 origin-center mx-auto"></div>

                {/* Container for the animated skills */}
                <div ref={skillsContainerRef} className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-16 text-center">
                    {coreSkills.map((skill, index) => (
                        <div key={index} className="skill-item-animated opacity-0">
                            <span className="font-medium text-lg md:text-xl text-gray-200 hover:text-red-400 transition-colors duration-300">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreSkillsSection;