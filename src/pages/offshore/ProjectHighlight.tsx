import React from 'react';
import { Building2, Coins, ShoppingBag, Gamepad2 } from 'lucide-react';

interface ProjectStat {
  label: string;
  value: string;
}

interface Project {
  id: string;
  location: string;
  title: string;
  company: string;
  description: string;
  stats: ProjectStat[];
  technologies: string[];
  icon: React.ReactNode;
  iconBgColor: string;
}

const ProjectHighlight: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      location: 'USA-BASED',
      title: 'Medical Diagnostic AI Platform',
      company: 'Global HealthTech Company',
      description: 'Complete end to end development and successful handoff of a production medical AI platform serving users across 50+ countries',
      stats: [
        { label: '500k+ Users', value: '500k+ Users' },
        { label: '3-Months Delivery', value: '3-Months Delivery' },
        { label: '500k+ Users', value: '500k+ Users' },
      ],
      technologies: ['React', 'Python', 'ML', 'AWS'],
      icon: <Building2 className="w-6 h-6" />,
      iconBgColor: 'bg-red-100',
    },
    {
      id: '2',
      location: 'SINGAPORE-BASED',
      title: 'Real-Time Crypto Trading Dashboard',
      company: 'International Fintech Firm',
      description: 'Built nad delivered a mission-critical trading platform handling billions in a daily transactions with seamless go-live supports.',
      stats: [
        { label: '$2Bk+ TVL', value: '$2Bk+ TVL' },
        { label: 'Zero Downtime Handoff', value: 'Zero Downtime Handoff' },
        { label: '150k Daily Users', value: '150k Daily Users' },
      ],
      technologies: ['Next.js', 'Web3', 'Node.js', 'PostgreSQL'],
      icon: <Coins className="w-6 h-6" />,
      iconBgColor: 'bg-yellow-100',
    },
    {
      id: '3',
      location: 'GERMANY-BASED',
      title: 'Multi-Region E-commerce Marketplace',
      company: 'European Retail Enterprise',
      description: 'Architected and deployed a scalable market place across Europe with successful transitions to client\'s internal team',
      stats: [
        { label: '1M+ Products', value: '1M+ Products' },
        { label: '6 Regions Live', value: '6 Regions Live' },
        { label: '90+Days Launch', value: '90+Days Launch' },
      ],
      technologies: ['Node.js', 'React', 'Kubernetes', 'PostgreSQL'],
      icon: <ShoppingBag className="w-6 h-6" />,
      iconBgColor: 'bg-pink-100',
    },
    {
      id: '4',
      location: 'JAPAN-BASED',
      title: 'Multiplayer Gaming Backend',
      company: 'Asian Gaming Studio',
      description: 'Engineered highly performant multiplayer infrastructure , trained client team, and delivered full operational ownership.',
      stats: [
        { label: '5m+ Players', value: '5m+ Players' },
        { label: 'Sub-100ms Latency', value: 'Sub-100ms Latency' },
        { label: 'Successful Handoff', value: 'Successful Handoff' },
      ],
      technologies: ['GO', 'Kubernetes', 'Redis', 'WebSockets'],
      icon: <Gamepad2 className="w-6 h-6" />,
      iconBgColor: 'bg-gray-200',
    },
  ];

  return (
   <section className="w-full bg-gray-50 px-4 py-16 md:py-24 flex justify-center items-center min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-purple-600 text-sm font-medium mb-2 block">
            Project Highlight
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Projects We've Delivered Globally
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl">
            Successful handoffs and lasting partnerships with clients across the world. From start to finish, we deliver excellence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-purple-300 border border-transparent transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`${project.iconBgColor} p-3 rounded-lg flex-shrink-0`}>
                  {project.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-xs text-gray-600 font-medium">
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-purple-600 font-medium">
                    {project.company}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                {project.stats.map((stat, index) => (
                  <div key={index} className="flex-1 min-w-[120px]">
                    <p className="text-sm font-medium text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectHighlight;