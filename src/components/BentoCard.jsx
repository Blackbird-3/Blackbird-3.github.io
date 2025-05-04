import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ExternalLink, ShoppingCart, Zap, BarChart, Code, Users, Clock, Github, Linkedin } from 'lucide-react';

// Map icon names to actual components
const iconMap = {
  ShoppingCart,
  Zap,
  BarChart,
  Code,
  Users,
  Clock,
  Github,
  Linkedin
  // Add others as needed
};

// Helper function to generate responsive grid classes
const getGridClasses = (item) => {
  let classes = " ";
  // Default spans (used if specific breakpoint not defined or for largest)
  const defaultColSpan = item.gridSpan?.lg || item.gridSpan?.base || 12; // Fallback chain
  const defaultRowSpan = item.rowSpan?.lg || item.rowSpan?.base || 1;

  // Base (Mobile First) - assumes container is grid-cols-1 or similar initially
  classes += `col-span-${item.gridSpan?.base || 12} `; // Default full width on mobile
  classes += `row-span-${item.rowSpan?.base || 1} `;

  // Small screens
  if (item.gridSpan?.sm) {
    classes += `sm:col-span-${item.gridSpan.sm} `;
  } else {
    classes += `sm:col-span-6 `; // Default half width if not specified
  }
  if (item.rowSpan?.sm) {
    classes += `sm:row-span-${item.rowSpan.sm} `;
  } // Inherit row span if not specified for sm

  // Large screens (and up)
  if (item.gridSpan?.lg) {
    classes += `lg:col-span-${item.gridSpan.lg} `;
  } else {
    classes += `lg:col-span-${defaultColSpan} `;
  }
  if (item.rowSpan?.lg) {
    classes += `lg:row-span-${item.rowSpan.lg} `;
  } else {
    classes += `lg:row-span-${defaultRowSpan} `;
  }

  return classes;
};

const BentoCard = ({ item }) => {
  const { type, title, description, image, items, icon, link, email, socials, tags } = item;
  const gridPlacementClasses = getGridClasses(item);
  
  // Refs for animations
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const decorativeElementsRef = useRef([]);
  
  // Add decorative element to ref array
  const addDecorRef = (el) => {
    if (el && !decorativeElementsRef.current.includes(el)) {
      decorativeElementsRef.current.push(el);
    }
  };
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Initialize GSAP context for this card
    const ctx = gsap.context(() => {
      // Card entrance animation is handled in the parent ProjectsGrid
      
      // Set up hover animations
      const hoverTimeline = gsap.timeline({ paused: true });
      
      // Different animations based on card type
      if (type === 'project') {
        // Project card hover
        const projectImage = cardRef.current.querySelector('.project-image');
        const animationElements = cardRef.current.querySelectorAll('.animate-on-hover');
        const decorElements = decorativeElementsRef.current;
        
        hoverTimeline
          .to(cardRef.current, { 
            y: -12, 
            boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 8px 20px rgba(255,0,0,0.15)",
            borderColor: "rgba(255,70,70,0.5)",
            duration: 0.5, 
            ease: "power3.out" 
          })
          .to(projectImage, { 
            scale: 1.12, 
            filter: "brightness(1.1)",
            duration: 1, 
            ease: "power2.out" 
          }, "-=0.5")
          .to(animationElements, { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1, 
            duration: 0.6, 
            ease: "power2.out" 
          }, "-=0.8");
          
        // Animate decorative elements if they exist
        if (decorElements.length > 0) {
          hoverTimeline.to(decorElements, {
            scale: 1.3,
            opacity: 0.9,
            stagger: 0.1,
            rotate: "random(-20, 20)",
            duration: 0.7,
            ease: "back.out(1.7)"
          }, "-=0.9");
        }
      } else if (type === 'detail' || type === 'tech' || type === 'contact') {
        // Detail, tech, contact card hover
        const iconElement = cardRef.current.querySelector('.card-icon');
        const textElements = cardRef.current.querySelectorAll('.text-element');
        
        hoverTimeline
          .to(cardRef.current, { 
            y: -8, 
            scale: 1.02, 
            borderColor: "rgba(255,70,70,0.5)",
            boxShadow: "0 15px 30px rgba(0,0,0,0.2), 0 5px 15px rgba(255,0,0,0.1)",
            background: "linear-gradient(130deg, rgba(30,30,30,0.9), rgba(20,20,20,0.95))",
            duration: 0.5, 
            ease: "power2.out" 
          });
          
        if (iconElement) {
          hoverTimeline.to(iconElement, {
            scale: 1.2,
            color: "#ff4545",
            rotate: 15,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)"
          }, "-=0.5");
        }
        
        if (textElements.length > 0) {
          hoverTimeline.to(textElements, {
            y: -3,
            color: "#ffffff",
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out"
          }, "-=0.6");
        }
      } else if (type === 'image') {
        // Image card hover
        hoverTimeline
          .to(cardRef.current, { 
            y: -10, 
            boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 8px 20px rgba(255,0,0,0.15)",
            borderColor: "rgba(255,70,70,0.5)",
            duration: 0.5, 
            ease: "power3.out" 
          })
          .to(cardRef.current.querySelector('img'), {
            scale: 1.08,
            filter: "brightness(1.1) contrast(1.05)",
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.5");
      }
      
      // Set up hover events
      cardRef.current.addEventListener('mouseenter', () => hoverTimeline.play());
      cardRef.current.addEventListener('mouseleave', () => hoverTimeline.reverse());
      
      // Animate decorative elements
      const decorElements = decorativeElementsRef.current;
      if (decorElements.length > 0) {
        decorElements.forEach((el, index) => {
          // Initial state
          gsap.set(el, { opacity: 0, scale: 0.5 });
          
          // Appear on scroll (this will be coordinated with the parent grid's animation)
          gsap.to(el, {
            opacity: 0.7,
            scale: 1,
            duration: 1,
            delay: 0.1 * index + 0.5, // Staggered delay after parent card animates in
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          });
          
          // Continuous subtle animation
          gsap.to(el, {
            y: `random(-${10 + index * 2}, ${10 + index * 2})`,
            x: `random(-${5 + index}, ${5 + index})`,
            rotation: `random(-${5 + index * 2}, ${5 + index * 2})`,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
          });
        });
      }
    }, cardRef);
    
    return () => ctx.revert(); // Clean up animations
  }, [type]);

  const renderContent = () => {
    switch (type) {
      case 'project':
        return (
          <div ref={cardRef} className="group relative w-full h-full overflow-hidden rounded-2xl border-2 border-white/10 hover:border-red-500/50 transition-all duration-500 bg-black/20 backdrop-blur-md">
            {/* Decorative elements */}
            <div ref={addDecorRef} className="absolute top-5 right-5 w-12 h-12 rounded-full bg-red-500/10 blur-xl"></div>
            <div ref={addDecorRef} className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-blue-500/10 blur-xl"></div>
            <div ref={addDecorRef} className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500/30 rounded-full"></div>
            
            <img
              src={image}
              alt={title}
              className="project-image absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>
            <div ref={contentRef} className="project-content absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              {item.category && (
                <span className="text-xs text-red-400 mb-3 uppercase tracking-wider font-medium">{item.category}</span>
              )}
              <h3 className="text-element text-xl md:text-2xl lg:text-3xl font-bold mb-4 group-hover:text-red-300 transition-colors duration-300">
                {title}
              </h3>
              <p className="animate-on-hover text-sm md:text-base text-gray-300 mb-5 opacity-0 translate-y-6 transition-all duration-500 ease-out">
                {description}
              </p>
              {tags && (
                <div className="animate-on-hover flex flex-wrap gap-2 mb-5 opacity-0 translate-y-6 transition-all duration-500 ease-out delay-100">
                  {tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs px-3 py-1.5 bg-white/10 rounded-full text-gray-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
                  {tags.length > 3 && (
                    <span className="text-xs px-3 py-1.5 bg-white/10 rounded-full text-gray-300 border border-white/5">
                      +{tags.length - 3}
                    </span>
                  )}
                </div>
              )}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animate-on-hover inline-flex items-center text-sm font-medium text-white hover:text-red-300 transition-colors duration-300 mt-auto opacity-0 translate-y-6 transition-all duration-500 ease-out delay-200"
                >
                  View Project <ExternalLink className="ml-2" size={16} />
                </a>
              )}
            </div>
          </div>
        );

      case 'tech':
        return (
          <div ref={cardRef} className="w-full h-full overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/20 border-2 border-white/10 hover:border-red-500/30 transition-all duration-700 flex flex-col justify-center backdrop-blur-md">
            {/* Decorative elements */}
            <div ref={addDecorRef} className="absolute top-6 right-6 w-10 h-10 border border-red-500/20 rounded-full"></div>
            <div ref={addDecorRef} className="absolute bottom-10 left-10 w-20 h-1 bg-gradient-to-r from-red-500/30 to-transparent"></div>
            
            <h3 className="text-element text-sm font-semibold mb-6 text-red-400 uppercase tracking-wider">{title}</h3>
            <div className="flex flex-wrap gap-3">
              {items?.map((tech, index) => (
                <span 
                  key={index} 
                  className="text-element text-xs md:text-sm bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-lg transition-all duration-300 border border-white/5 hover:border-red-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        );

      case 'detail':
        const IconComponent = icon ? iconMap[icon] : Zap; // Default icon
        return (
          <div ref={cardRef} className="w-full h-full overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/20 border-2 border-white/10 hover:border-red-500/30 transition-all duration-700 flex flex-col justify-between backdrop-blur-md">
            {/* Decorative elements */}
            <div ref={addDecorRef} className="absolute top-1/3 right-6 w-16 h-16 border border-white/5 rounded-full opacity-20"></div>
            <div ref={addDecorRef} className="absolute bottom-1/3 left-8 w-2 h-10 bg-gradient-to-b from-red-500/20 to-transparent"></div>
            
            {IconComponent && <IconComponent size={32} className="card-icon text-red-500 mb-6 transition-all duration-300" />}
            <h3 className="text-element text-lg md:text-xl lg:text-2xl font-semibold mb-4">{title}</h3>
            <p className="text-element text-sm md:text-base text-gray-400 flex-grow">{description}</p>
          </div>
        );

      case 'image':
        return (
          <div ref={cardRef} className="group relative w-full h-full overflow-hidden rounded-2xl border-2 border-white/10 hover:border-red-500/20 transition-all duration-700">
            <img
              src={image}
              alt={title || 'Detail image'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {title && (
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent text-white backdrop-blur-sm">
                <span className="text-sm md:text-base lg:text-lg font-medium">{title}</span>
              </div>
            )}
          </div>
        );

      case 'profile':
        return (
          <div ref={cardRef} className="w-full h-full overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-red-900/20 via-black to-black border-2 border-white/10 hover:border-red-500/30 transition-all duration-700 flex flex-col items-center text-center justify-center backdrop-blur-md">
            {/* Decorative elements */}
            <div ref={addDecorRef} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-red-500/10 blur-xl"></div>
            <div ref={addDecorRef} className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-blue-500/10 blur-xl"></div>
            
            {image && (
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-700 blur-md opacity-50 scale-110 animate-pulse"></div>
                <img 
                  src={image} 
                  alt="Profile" 
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-red-500/50 hover:border-red-400 transition-colors duration-300 object-cover"
                />
              </div>
            )}
            <h3 className="text-element text-xl md:text-2xl font-bold mb-3">{title}</h3>
            <p className="text-element text-sm md:text-base text-gray-400">{description}</p>
          </div>
        );

      case 'contact':
        return (
          <div ref={cardRef} className="w-full h-full overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/20 border-2 border-white/10 hover:border-red-500/30 transition-all duration-700 flex flex-col justify-center items-center text-center backdrop-blur-md">
            {/* Decorative elements */}
            <div ref={addDecorRef} className="absolute top-10 right-10 w-20 h-20 rounded-full bg-red-500/10 blur-xl"></div>
            <div ref={addDecorRef} className="absolute bottom-10 left-10 w-16 h-16 border border-white/10 rounded-full"></div>
            
            <h3 className="text-element text-lg md:text-xl lg:text-2xl font-semibold mb-5">{title}</h3>
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-element text-red-400 hover:text-red-300 text-center block mb-6 transition-colors text-base md:text-lg relative group"
              >
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                {email}
              </a>
            )}
            {socials && (
              <div className="flex justify-center space-x-6 mt-3">
                {socials.map(({ link, Icon }, index) => {
                  const SocialIcon = iconMap[Icon] || Icon; // Use from iconMap or direct Icon
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-500 transition-colors hover:scale-110 transform duration-300"
                    >
                      <SocialIcon size={26} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'coming-soon':
        return (
          <div ref={cardRef} className="w-full h-full overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/20 border-2 border-dashed border-white/20 hover:border-red-500/20 transition-all duration-700 flex flex-col items-center justify-center text-center backdrop-blur-md">
            {/* Decorative elements */}
            <div ref={addDecorRef} className="absolute top-1/4 right-1/4 w-12 h-12 border border-white/10 rounded-full opacity-30"></div>
            <div ref={addDecorRef} className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-red-500/40 rounded-full"></div>
            
            <Clock size={34} className="card-icon text-red-500 mb-5 opacity-70" />
            <h3 className="text-element text-lg md:text-xl font-semibold mb-3">{title} - Coming Soon</h3>
            <p className="text-element text-sm md:text-base text-gray-500">{description}</p>
          </div>
        );

      default:
        return <div ref={cardRef} className="bg-gray-800 rounded-xl h-full">Unsupported type</div>;
    }
  };

  return (
    <div
      className={`bento-item animate-fade-in ${gridPlacementClasses}`}
    >
      {renderContent()}
    </div>
  );
};

export default BentoCard;