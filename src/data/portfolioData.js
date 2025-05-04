// src/data/portfolioData.js
import { FaReact, FaNodeJs, FaFigma, FaCss3Alt, FaCodeBranch, FaAws } from 'react-icons/fa'; // Example: Font Awesome
import { SiJavascript, SiTypescript, SiThreedotjs, SiGreensock, SiFlask, SiMongodb, SiFlutter, SiHuggingface } from 'react-icons/si'; // Example: Simple Icons
import { TbBrandCpp } from "react-icons/tb"; // Example: Tabler Icons
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export const coreSkills = [
  { name: "React", Icon: FaReact, color: "#61DAFB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", Icon: FaNodeJs, color: "#68A063" },
  { name: "Python", Icon: SiFlask, color: "#306998" }, // Using Flask icon for Python context
  { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
  { name: "CSS/SCSS/Tailwind", Icon: FaCss3Alt, color: "#1572B6" },
  { name: "Three.js / R3F", Icon: SiThreedotjs, color: "#FFFFFF" },
  { name: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { name: "AWS", Icon: FaAws, color: "#FF9900" },
  { name: "MongoDB", Icon: SiMongodb, color: "#4DB33D" },
  { name: "LLMs / HF", Icon: SiHuggingface, color: "#FFD817"}, // Hugging Face icon
  { name: "Git/Version Control", Icon: FaCodeBranch, color: "#F05032" },
  { name: "C++", Icon: TbBrandCpp, color: "#00599C" },
  { name: "UI/UX Design", Icon: FaFigma, color: "#F24E1E" }, // Figma for UI/UX context
];

export const bentoItems = [
  // --- Project 1: EduQuery ---
  {
    id: "eduquery-proj",
    type: "project",
    title: "EduQuery RAG Chatbot",
    description: "AI-powered educational chatbot that provides accurate, source-backed answers using Retrieval-Augmented Generation.",
    category: "AI / Web App",
    image: "/assets/eduquery.jpeg", // REPLACE
    link: "https://github.com/Blackbird-3/rag_final", // REPLACE
    tags: ["React", "Flask", "RAG"],
    // Adjusted spans for better layout
    gridSpan: { base: 12, sm: 6, lg: 6 },
    rowSpan: { base: 1, sm: 2, lg: 2 },
  },
  {
    id: "eduquery-tech",
    type: "tech",
    title: "EduQuery Stack",
    items: ["React", "Flask", "HuggingFace", "AWS", "Pinecone", "Appwrite", "LangChain", "Python"],
    // Adjusted position
    gridSpan: { base: 12, sm: 3, lg: 3 },
    rowSpan: { base: 1 },
  },
  {
    id: "eduquery-detail",
    type: "detail",
    title: "Core Feature",
    description: "Real-time, context-aware answers from source documents via Retrieval-Augmented Generation.",
    icon: "Code",
    // Adjusted position
    gridSpan: { base: 12, sm: 3, lg: 3 },
    rowSpan: { base: 1 },
  },

  // --- Profile Card ---
  // {
  //   id: "profile-card",
  //   type: "profile",
  //   title: "Alex [Your Name]", // UPDATE NAME
  //   description: "Creative Full Stack Developer.",
  //   image: "/src/assets/b16.jpg", // Placeholder
  //   // Adjusted position for better flow
  //   gridSpan: { base: 12, sm: 6, lg: 3 },
  //   rowSpan: { base: 1, lg: 2 },
  // },

  // --- Project 2: Sound Slice ---
  {
    id: "soundslice-proj",
    type: "project",
    title: "Sound Slice",
    description: "Cross-platform music source separation app built with Flutter. Isolate vocals, drums, bass and more from any song.",
    category: "Mobile App / AI",
    image: "/assets/soundslice.jpeg", // REPLACE
    link: "https://github.com/Blackbird-3/sound_slice", // REPLACE
    tags: ["Flutter", "Dart", "Firebase"],
    // Adjusted size for better proportions
    gridSpan: { base: 12, sm: 6, lg: 5 },
    rowSpan: { base: 1, sm: 2, lg: 2 },
  },
  {
    id: "soundslice-tech",
    type: "tech",
    title: "Sound Slice Stack",
    items: ["Flutter", "Dart", "Firebase Auth/DB", "Demucs", "Replicate", ],
    // Adjusted position
    gridSpan: { base: 12, sm: 3, lg: 2 },
    rowSpan: { base: 1 },
  },
  {
    id: "soundslice-detail",
    type: "detail",
    title: "AI Separation",
    description: "Leverages deep learning models (like Demucs) to isolate vocals, drums, bass, etc.",
    icon: "Zap",
    // Adjusted position
    gridSpan: { base: 12, sm: 3, lg: 2 },
    rowSpan: { base: 1 },
  },

  // --- Contact Card ---
  // {
  //   id: "contact-card",
  //   type: "contact",
  //   title: "Let's Connect",
  //   email: "hello@example.com", // UPDATE EMAIL
  //   socials: [
  //     { name: "Github", link: "#", Icon: Github }, // UPDATE LINKS
  //     { name: "LinkedIn", link: "#", Icon: Linkedin },
  //   ],
  //   // Adjusted position for better flow
  //   gridSpan: { base: 12, sm: 6, lg: 3 },
  //   rowSpan: { base: 1 },
  // },

  // --- Project 3: Pause ---
  {
    id: "pause-proj",
    type: "project",
    title: "Pause: Mental Health App",
    description: "A Flutter application providing tools for mental wellness including guided meditation, mood tracking, and breathing exercises.",
    category: "Mobile App",
    image: "/assets/pause2.jpeg", // REPLACE
    link: "https://github.com/Blackbird-3/Pause", // REPLACE
    tags: ["Flutter", "Dart", "Firebase"],
    // Adjusted size for better visual hierarchy
    gridSpan: { base: 12, sm: 6, lg: 6 },
    rowSpan: { base: 1, sm: 2, lg: 2 },
  },
  {
    id: "pause-tech",
    type: "tech",
    title: "Pause Stack",
    items: ["Flutter", "Dart", "Firebase Auth/DB", "Python", "Animations"],
    // Adjusted position
    gridSpan: { base: 12, sm: 3, lg: 3 },
    rowSpan: { base: 1 },
  },
  {
    id: "pause-detail",
    type: "detail",
    title: "User Wellness",
    description: "Features include guided meditation audio, mood tracking, and calming animations.",
    icon: "Users",
    // Adjusted position
    gridSpan: { base: 12, sm: 3, lg: 3 },
    rowSpan: { base: 1 },
  },

  // --- Coming Soon Project ---
  
  //ADD THE GHOST FONT HERE

  // --- Ghost Font Card ---
  {
    id: "ghost-font",
    type: "project",
    title: "Ghost Font",
    description: "A unique font that creates a shadow effect.",
    image: "/assets/ghost.png", // Placeholder
    link: "https://github.com/Blackbird-3/ghost", // REPLACE
    tags: ["Font", "Design"],
    gridSpan: { base: 12, sm: 6, lg: 3 },
    rowSpan: { base: 1 },
  },
  {
    id: "overload-coming",
    type: "coming-soon",
    title: "Overload Workout Tracker",
    description: "React app for tracking progressive overload.",
    // Adjusted position
    gridSpan: { base: 12, sm: 6, lg: 3 },
    rowSpan: { base: 1 },
  },


  // --- Visual Break / Image Card ---
  // {
  //   id: "visual-break",
  //   type: "image",
  //   title: "UI Detail",
  //   image: "/src/assets/b20.jpg", // Placeholder
  //   gridSpan: { base: 12, sm: 6, lg: 3 },
  //   rowSpan: { base: 1 },
  // },
];

export const socialLinks = [
    { name: "Mail", link: "mailto:agarwalshreshth3@gmail.com", Icon: Mail },
    { name: "Github", link: "https://github.com/Blackbird-3", Icon: Github },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/shreshtth-kumar-agarwaal/", Icon: Linkedin },
    { name: "Instagram", link: "https://www.instagram.com/_shreshtth_/", Icon: Instagram },
];