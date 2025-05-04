// src/components/ContactSection.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// --- Import Icons directly into this component ---
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';
// Import ParallaxElement if you still use it for background shapes here
import ParallaxElement from './ParallaxElement';

gsap.registerPlugin(ScrollTrigger);

// --- Define socialLinks data DIRECTLY in the component ---
const socialLinks = [
    { name: "Mail", link: "mailto:agarwalshreshth3@gmail.com", Icon: Mail },
    { name: "Github", link: "https://github.com/Blackbird-3", Icon: Github },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/shreshtth-kumar-agarwaal/", Icon: Linkedin },
    { name: "Instagram", link: "https://www.instagram.com/_shreshtth_/", Icon: Instagram },
];
// --- End of local socialLinks definition ---


const ContactSection = ({ id, sectionRef }) => {
    const contentRef = useRef();

    // --- GSAP Animation useEffect (Keep as is) ---
    useEffect(() => {
        if (!contentRef.current || !sectionRef.current) {
            console.warn("Contact section refs not available for animation.");
            return;
        }
        const ctx = gsap.context(() => {
            // ... (GSAP animations for heading, divider, content elements) ...
             const heading = sectionRef.current?.querySelector('.section-heading');
             const divider = sectionRef.current?.querySelector('.section-divider');
             if (heading) { headingAnimation(heading); } // Assuming functions are defined
             if (divider) { dividerAnimation(divider); } // Assuming functions are defined

             const elements = contentRef.current.querySelectorAll('.animate-on-scroll');
             if (elements.length > 0) {
                 elements.forEach((el, index) => {
                     gsap.fromTo(el, { y: 50, opacity: 0 }, {
                         y: 0, opacity: 1, duration: 0.9, delay: index * 0.15, ease: "power3.out",
                         scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
                     });
                 });
             }
        }, sectionRef);
        return () => ctx.revert();
    }, [sectionRef]);

    // --- Prepare Social Link Data (using the locally defined array) ---
    // const mailInfo = socialLinks.find(l => l.name === 'Mail');
    const mailLink = "mailto:agarwalshreshth3@gmail.com";
    const MailIcon = Mail;
    const emailAddress = mailLink ? mailLink.replace('mailto:', '') : ''; // Get email from link

    const otherSocials = [
        { name: "Github", link: "https://github.com/Blackbird-3", Icon: Github },
        { name: "LinkedIn", link: "https://www.linkedin.com/in/shreshtth-kumar-agarwaal/", Icon: Linkedin },
        { name: "Instagram", link: "https://www.instagram.com/_shreshtth_/", Icon: Instagram },
    ];


    // --- Render Logic (remains the same, uses local socialLinks) ---
    return (
        <section
            id={id}
            ref={sectionRef}
            className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 relative overflow-hidden"
        >
            {/* Background Parallax/Decorations */}
            <ParallaxElement speed="0.2" direction={-1} className="hidden md:block bottom-0 right-0 w-1/2 h-1/2 pointer-events-none z-0">
                 <div className="absolute w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ bottom: '15%', right: '10%', animationDuration: '8s' }}></div>
                 <div className="absolute w-48 h-48 bg-red-700/15 rounded-full blur-2xl animate-pulse" style={{ bottom: '25%', right: '25%', animationDuration: '12s', animationDelay: '2s' }}></div>
            </ParallaxElement>


            <div className="max-w-4xl mx-auto w-full relative z-10">
                <h2 className="section-heading text-3xl md:text-5xl font-bold mb-4 relative">
                    <span className="text-red-500">/</span> Get In Touch
                </h2>
                <div className="section-divider w-full h-px bg-red-500/30 mb-16 origin-left"></div>

                <div ref={contentRef} className="contact-content">
                    {/* Introductory Paragraph */}
                    <p className="text-xl md:text-2xl mb-12 max-w-3xl animate-on-scroll opacity-0">
                        Have a project in mind, a question, or just want to say hello? I'm always open to discussing new ideas and collaborations.
                    </p>

                    {/* Mail Link Section */}
                    {mailLink && MailIcon && (
                         <a
                            href={mailLink}
                            className="text-base md:text-3xl lg:text-4xl font-bold text-red-500 hover:text-red-700 transition-colors duration-300 flex items-center group animate-on-scroll opacity-0 mb-16 md:mb-20"
                         >
                            <MailIcon className="mr-3 md:mr-4 transition-transform group-hover:scale-110 flex-shrink-0" size={30} />
                            <span className="truncate">{emailAddress}</span>
                        </a>
                    )}

                    {/* Other Social Links Section */}
                    <div className="animate-on-scroll opacity-0">
                        <h3 className="text-xl font-bold mb-6">Connect with me elsewhere</h3>
                        <div className="social-links flex flex-wrap gap-x-6 gap-y-4">
                            {otherSocials.length > 0 ? (
                                otherSocials.map(({ name, link, Icon }, index) => (
                                    <a
                                        key={`${name}-${index}`}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Connect on ${name}`}
                                        title={`Connect on ${name}`}
                                        className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                                    >
                                        <Icon size={28} />
                                    </a>
                                ))
                             ) : (
                                <p className="text-gray-500 text-sm italic">Other social links not available.</p>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Make sure heading/divider animation functions are defined or included if needed
const headingAnimation = (heading) => {
     if (!heading) return;
     gsap.fromTo(heading,
         { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0.3 },
         { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, duration: 1.2, ease: "power4.inOut",
             scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" }
         }
     );
 };
 const dividerAnimation = (divider) => {
      if (!divider) return;
      gsap.fromTo(divider,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1.5, ease: "power3.inOut",
              scrollTrigger: { trigger: divider, start: "top 90%", toggleActions: "play none none none" }
          }
      );
  };


export default ContactSection;