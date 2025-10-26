export interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  quote: string;
  image: string;
  rating: number; // Rating out of 5 (can be decimal like 4.5)
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Gordon",
    title: "Product Designer",
    company: "Allnovas",
    quote:
      "Allnovas has saved us thousands of hours of work. We are able to spin up projects faster and take on more clients.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Marketing Director",
    company: "TechStart",
    quote:
      "The quality of freelancers on Allnovas is exceptional. We've built our entire creative team through this platform.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    title: "CEO",
    company: "InnovateCo",
    quote:
      "Allnovas transformed how we scale our business. Finding skilled talent has never been easier.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
    rating: 4,
  },
];