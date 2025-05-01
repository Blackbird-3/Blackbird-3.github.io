// src/data/portfolioData.js

import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export const coreSkills = [
  { name: "React", level: 95 },
  { name: "JavaScript", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "UI/UX Design", level: 90 },
  { name: "Three.js / R3F", level: 82 }, // Updated
  { name: "GSAP", level: 78 },
  { name: "CSS/SCSS/Tailwind", level: 94 } // Updated
];

export const bentoItems = [
  // --- Project 1 Group ---
  {
    id: 1,
    type: "project", // 'project', 'tech', 'detail', 'image', 'profile', 'contact'
    title: "E-Commerce Platform",
    description: "Modern shopping experience blending performance and design.",
    category: "Web Development",
    image: "/assets/b5.png", // Main project image
    gridSpan: { col: 7, row: 2 }, // Spanning columns and rows
    link: "#",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"]
  },
  {
    id: 2,
    type: "tech",
    title: "Core Technologies",
    items: ["React", "Node.js", "MongoDB"],
    gridSpan: { col: 5, row: 1 },
  },
  {
    id: 3,
    type: "detail",
    title: "Key Feature",
    description: "Real-time inventory updates and seamless checkout flow.",
    icon: "ShoppingCart", // Example: Map to Lucide icon
    gridSpan: { col: 5, row: 1 },
  },
  // --- Project 2 Group ---
  {
    id: 4,
    type: "project",
    title: "AI Chatbot Interface",
    description: "Sleek UI/UX for natural language processing.",
    category: "UI/UX & AI",
    image: "/assets/b16.jpg",
    gridSpan: { col: 5, row: 2 },
    link: "#",
    tags: ["React", "Python", "NLP", "Figma"]
  },
   {
    id: 5,
    type: "tech",
    title: "AI & UI Tools",
    items: ["Python", "NLTK", "Figma", "GSAP"],
    gridSpan: { col: 3, row: 1 },
  },
  // --- Filler / Other Cards ---
   {
    id: 6,
    type: "image",
    title: "Visual Detail",
    image: "/assets/b19.jpg", // Could be a zoomed-in detail or related graphic
    gridSpan: { col: 4, row: 1 },
  },
  {
    id: 7,
    type: "profile", // Example: Mini about/profile card
    title: "Alex - Creative Dev",
    description: "Focusing on interactive & performant web solutions.",
    image: "/assets/profile-placeholder.png", // Placeholder for a profile pic
    gridSpan: { col: 4, row: 2 },
  },

  {
    id: 8,
    type: "contact",
    title: "Let's Collaborate",
    email: "hello@example.com",
    socials: [
      { name: "Github", link: "#", Icon: Github },
      { name: "LinkedIn", link: "#", Icon: Linkedin },
    ],
    gridSpan: { col: 5, row: 1 },
  },
  {
    id: 9,
    type: "coming-soon",
    title: "Blockchain Explorer",
    description: "Web3 project under development.",
    gridSpan: { col: 3, row: 1 },
  },
];


export const socialLinks = [
    { name: "Mail", link: "mailto:hello@example.com", Icon: Mail },
    { name: "Github", link: "#", Icon: Github },
    { name: "LinkedIn", link: "#", Icon: Linkedin },
    { name: "Instagram", link: "#", Icon: Instagram },
];