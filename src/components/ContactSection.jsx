import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socialLinks } from '../data/portfolioData'; // Import social links
import ParallaxElement from './ParallaxElement'; // Import ParallaxElement

gsap.registerPlugin(ScrollTrigger);

const ContactSection = ({ id, innerRef, sectionRef }) => { // innerRef might not be needed here, using sectionRef
    const contentRef = useRef(); // Ref specifically for the content area to animate

    useEffect(() => {
        if (!contentRef.current || !sectionRef.current) {
            console.warn("Contact section refs not available for animation.");
            return;
        }

        const ctx = gsap.context(() => {
            // Section heading/divider animations (assuming these elements are direct children of sectionRef)
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

            // Animate content elements specifically within the contentRef container
            const elements = contentRef.current.querySelectorAll('.animate-on-scroll');
            if (elements.length > 0) {
                elements.forEach((el, index) => {
                    gsap.fromTo(el,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.9,
                            delay: index * 0.15, // Staggered delay
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 85%", // Animate when element enters view
                                toggleActions: "play none none none"
                            }
                        }
                    );
                });
            } else {
                 console.warn("No '.animate-on-scroll' elements found within contact contentRef.");
            }

        }, sectionRef); // Scope context to the sectionRef

        return () => ctx.revert(); // Cleanup GSAP animations and ScrollTriggers

    }, [sectionRef]); // Dependency array

    // Find Mail link details safely
    const mailInfo = socialLinks && Array.isArray(socialLinks) ? socialLinks.find(l => l.name === 'Mail') : null;
    const mailLink = mailInfo?.link || '#'; // Fallback href
    const MailIcon = mailInfo && typeof mailInfo.Icon === 'function' ? mailInfo.Icon : null; // Get the Mail icon component

    // Filter other social links safely
    const otherSocials = socialLinks && Array.isArray(socialLinks)
        ? socialLinks.filter(l => l.name !== 'Mail' && typeof l.Icon === 'function') // Also check Icon validity here
        : [];

    return (
        <section
            id={id}
            ref={sectionRef} // Use the main section ref passed down
            className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 relative overflow-hidden"
        >
            {/* Animated decorative shapes/gradients */}
            <ParallaxElement speed="0.2" direction={-1} className="hidden md:block bottom-0 right-0 w-1/2 h-1/2 pointer-events-none z-0">
                <div
                    className="absolute w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ bottom: '15%', right: '10%', animationDuration: '8s' }}
                ></div>
                <div
                    className="absolute w-48 h-48 bg-red-700/15 rounded-full blur-2xl animate-pulse"
                    style={{ bottom: '25%', right: '25%', animationDuration: '12s', animationDelay: '2s' }}
                ></div>
            </ParallaxElement>


            <div className="max-w-4xl mx-auto w-full relative z-10"> {/* Ensure content is above parallax */}
                <h2 className="section-heading text-3xl md:text-5xl font-bold mb-4 relative">
                    <span className="text-red-500">/</span> Get In Touch
                </h2>
                <div className="section-divider w-full h-px bg-red-500/30 mb-16 origin-left"></div>

                {/* Specific container for content to be animated */}
                <div ref={contentRef} className="contact-content">
                    <p className="text-xl md:text-2xl mb-12 max-w-3xl animate-on-scroll opacity-0"> {/* Add opacity-0 for GSAP */}
                        Have a project in mind, a question, or just want to say hello? I'm always open to discussing new ideas and collaborations.
                    </p>

                    {/* Mail link - Check if MailIcon exists */}
                    {MailIcon && (
                         <a
                            href={mailLink}
                            className="text-2xl md:text-4xl font-bold hover:text-red-500 transition-colors duration-300 flex items-center group animate-on-scroll opacity-0" // Add opacity-0
                         >
                            <MailIcon className="mr-4 transition-transform group-hover:scale-110 flex-shrink-0" size={32} /> {/* Use the found Icon */}
                            hello@example.com {/* Keep email static or pull from data */}
                        </a>
                    )}


                    {/* Other social links */}
                    <div className="mt-20 pt-12 border-t border-gray-800 animate-on-scroll opacity-0"> {/* Add opacity-0 */}
                        <h3 className="text-xl font-bold mb-6">Connect with me elsewhere</h3>
                        <div className="social-links flex flex-wrap gap-x-6 gap-y-4"> {/* Added flex-wrap and gap-y */}
                            {otherSocials.length > 0 ? (
                                otherSocials.map(({ name, link, Icon }, index) => (
                                    // Icon validity already checked in filter, but good practice
                                    <a
                                        key={`${name}-${index}`}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Connect on ${name}`}
                                        className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                                    >
                                        <Icon size={28} />
                                    </a>
                                ))
                             ) : (
                                <p className="text-gray-500 text-sm">Social links coming soon.</p>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;