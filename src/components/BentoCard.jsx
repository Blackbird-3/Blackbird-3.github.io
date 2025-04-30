import React from 'react';
// Import ALL icons potentially used by ANY card type directly here for clarity
import {
    ExternalLink,
    ShoppingCart, // Example for detail
    Zap,          // Example for detail / default
    BarChart,     // Example for detail
    Code,         // Example for detail
    Users,        // Example for detail
    Clock,        // For coming-soon
    Github,       // For contact socials
    Linkedin,     // For contact socials
    Mail          // Potentially used if contact card logic changes
    // Add any other icons your specific data might use
} from 'lucide-react';
import { bentoItems } from '../data/portfolioData'; // Import the data


// Map icon string names (used in data for 'detail' type) to actual components
const iconMap = {
    ShoppingCart,
    Zap,
    BarChart,
    Code,
    Users,
    // Add other icons intended for use via string names in 'detail' items
};

const BentoCard = ({ item }) => {
    // Destructure all potentially used properties
    const {
        type,
        title,
        description,
        image,
        items,      // For 'tech'
        icon,       // For 'detail' (expects string name)
        link,       // For 'project'
        email,      // For 'contact'
        socials,    // For 'contact' (expects array with { Icon, link })
        tags,       // For 'project' (optional)
        category,   // For 'project' (optional)
        gridSpan    // Expects { col, row }
    } = item;

    // Basic check for gridSpan, though data should provide it
    if (!gridSpan || typeof gridSpan.col !== 'number' || typeof gridSpan.row !== 'number') {
        console.error('BentoCard item missing valid gridSpan:', item);
        // Provide default span or return null to prevent breaking the grid badly
        return <div style={{ gridColumn: 'span 1', gridRow: 'span 1' }} className="bg-red-900 rounded-xl p-2 text-xs">Error: Invalid Span</div>;
    }

    const gridStyles = {
        gridColumn: `span ${gridSpan.col}`,
        gridRow: `span ${gridSpan.row}`,
    };

    const renderContent = () => {
        switch (type) {
            case 'project':
                return (
                    <div className="group relative w-full h-full overflow-hidden rounded-xl border border-white/10 hover:border-red-500/50 transition-colors duration-300 flex flex-col"> {/* Ensure flex-col for layout */}
                        {image && (
                            <img
                                src={image}
                                alt={title || 'Project image'}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy" // Add lazy loading
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 group-hover:opacity-95 transition-opacity duration-300"></div>
                        <div className="relative z-10 p-4 md:p-6 flex flex-col justify-end flex-grow"> {/* Content relative, flex-grow */}
                            {category && <span className="text-xs text-red-400 mb-1 uppercase tracking-wider">{category}</span>}
                            <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-red-300 transition-colors duration-300">
                                {title}
                            </h3>
                            {description && (
                                <p className="text-sm text-gray-300 mb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                                    {description}
                                </p>
                            )}
                             {/* Optional Tags */}
                             {tags && tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                {tags.map((tag, index) => (
                                    <span key={index} className="text-[10px] bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                                    {tag}
                                    </span>
                                ))}
                                </div>
                             )}
                            {link && (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs text-white hover:text-red-300 transition-colors duration-300 mt-auto pt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out delay-200" // Longer delay
                                >
                                    View Project <ExternalLink className="ml-1.5" size={14} />
                                </a>
                            )}
                        </div>
                    </div>
                );

            case 'tech':
                return (
                    <div className="relative w-full h-full overflow-hidden rounded-xl p-4 md:p-6 bg-gray-900/50 border border-white/10 flex flex-col justify-center">
                        <h3 className="text-sm font-semibold mb-3 text-red-400 uppercase tracking-wider">{title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {items?.map((tech, index) => (
                                <span key={`${tech}-${index}`} className="text-xs md:text-sm bg-gray-700/50 text-gray-300 px-2.5 py-1 rounded-full">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                );

            case 'detail':
                // Use the icon string name from data to look up the component in iconMap
                // Provide a default icon (e.g., Zap) if item.icon is missing or not found
                const IconComponent = icon && iconMap[icon] ? iconMap[icon] : Zap;
                return (
                    <div className="relative w-full h-full overflow-hidden rounded-xl p-4 md:p-6 bg-gray-900/50 border border-white/10 flex flex-col">
                        {IconComponent && <IconComponent size={24} className="text-red-500 mb-3 flex-shrink-0" />} {/* Ensure icon doesn't squash */}
                        <h3 className="text-base md:text-lg font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-gray-400 flex-grow">{description}</p>
                    </div>
                );

            case 'image':
                return (
                    <div className="group relative w-full h-full overflow-hidden rounded-xl border border-white/10">
                        {image && (
                            <img
                                src={image}
                                alt={title || 'Detail image'}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                            />
                        )}
                        {title && <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full text-white text-xs font-semibold">{title}</div>}
                    </div>
                );

            case 'profile':
                return (
                    <div className="relative w-full h-full overflow-hidden rounded-xl p-4 md:p-6 bg-gradient-to-br from-red-900/30 via-black to-black border border-white/10 flex flex-col items-center text-center justify-center">
                        {image && <img src={image} alt="Profile" className="w-16 h-16 rounded-full mb-4 border-2 border-red-500/50 object-cover flex-shrink-0" />}
                        <h3 className="text-lg font-bold mb-1">{title}</h3>
                        <p className="text-sm text-gray-400">{description}</p>
                    </div>
                );

            case 'contact':
                return (
                    <div className="relative w-full h-full overflow-hidden rounded-xl p-4 md:p-6 bg-gray-900/50 border border-white/10 flex flex-col justify-center">
                        <h3 className="text-base md:text-lg font-semibold mb-3 text-center">{title}</h3>
                        {email && <a href={`mailto:${email}`} className="text-red-400 hover:text-red-300 text-center block mb-4 transition-colors">{email}</a>}
                        {/* Ensure socials array exists and has items */}
                        {socials && socials.length > 0 && (
                            <div className="flex justify-center space-x-4 mt-2">
                                {socials.map(({ name, link, Icon }, index) => (
                                    // Check if Icon is a valid component before rendering
                                    Icon && typeof Icon === 'function' ? (
                                         <a key={`${name}-${index}`} href={link} target="_blank" rel="noopener noreferrer" title={name} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <Icon size={20} />
                                        </a>
                                    ) : null // Don't render if Icon is invalid
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'coming-soon':
                return (
                    <div className="relative w-full h-full overflow-hidden rounded-xl p-4 md:p-6 bg-gray-900/50 border border-dashed border-white/20 flex flex-col items-center justify-center text-center">
                        <Clock size={24} className="text-red-500 mb-3 opacity-70" />
                        <h3 className="text-base font-semibold mb-1">{title}</h3>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                );

            default:
                return <div className="bg-gray-800 rounded-xl h-full p-4 text-xs text-center flex items-center justify-center">Unsupported card type: {type}</div>;
        }
    };

    return (
        // Apply grid styles and base classes
        <div
            style={gridStyles}
            className="bento-item animate-fade-in" // Base class for targeting, animation handled by ProjectsGrid GSAP
        >
            {renderContent()}
        </div>
    );
};

export default BentoCard;