// src/pages/applicant/work-history/data/projects.ts

// Import images
import card1 from '../../../../assets/workhistory/card1.png';


export const sampleProjects = [
  {
    id: 1,
    title: 'Landing page design for spotify',
    category: 'UI/UX Design',
    status: 'Completed' as const,
    price: '$2,800',
    client: 'Spotify',
    rating: 4,
    description: 'Landing Page Design refers to the strategic creation of a standalone web page specifically crafted to achieve a single, focused objective—typically to convert visitors into leads or customers. This project involved comprehensive research, wireframing, prototyping, and final design delivery with multiple revision rounds.',
    tools: ['Figma', 'Adobe XD'],
    duration: '6 weeks',
    completedDate: '24/07/2024',
    imageUrl: card1, // ✅ Image imported and assigned
  },
  {
    id: 2,
    title: 'Mobile banking app redesign',
    category: 'Mobile Design',
    status: 'Completed' as const,
    price: '$4,500',
    client: 'BankCo',
    rating: 5,
    description: 'Complete redesign of a mobile banking application focusing on user experience, accessibility, modern design patterns, and seamless transaction flows.',
    tools: ['Figma', 'Principle', 'After Effects'],
    duration: '8 weeks',
    completedDate: '15/09/2024',
    imageUrl: card1, // ✅ Image imported and assigned
  },
  {
    id: 3,
    title: 'E-commerce dashboard UI',
    category: 'Dashboard Design',
    status: 'Active' as const,
    price: '$3,200',
    client: 'ShopFlow',
    rating: 0, // no rating yet since active
    description: 'Design of an admin dashboard for a growing e-commerce platform, including analytics, inventory management, and order tracking features.',
    tools: ['Figma', 'Framer'],
    duration: '4 weeks (ongoing)',
    completedDate: 'In progress',
    imageUrl: card1, // ✅ Image imported and assigned
  },
] as const;

export type Project = typeof sampleProjects[number];