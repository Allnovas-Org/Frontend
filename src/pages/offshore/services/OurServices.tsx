import React from 'react';
import { Paintbrush, Monitor, Settings, Palette, Hexagon, Users } from 'lucide-react';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  details: string[];
}

const ServicesGrid: React.FC = () => {
  const [selectedService, setSelectedService] = React.useState('1');

  const services: Service[] = [
    {
      id: '1',
      icon: <Paintbrush className="w-5 h-5" />,
      title: 'UI/UX Design',
      description: 'Intuitive, beautiful interfaces crafted to delight users. We design for every device, every interaction, and every user\'s journey.',
      bgColor: 'bg-red-50',
      details: [
        'Wireframing & Prototyping',
        'User Research',
        'Design Systems',
        'Interactive Mockups',
      ],
    },
    {
      id: '2',
      icon: <Monitor className="w-5 h-5" />,
      title: 'Frontend Development',
      description: 'Responsive performant frontend built with modern frameworks. Your users deserve speed and elegance.',
      bgColor: 'bg-white',
      details: [
        'React & Next.js ',
        'Vue & Angular',
        'Mobile-Responsiveness',
        'Web 3 Integrations',
      ],
    },
    {
      id: '3',
      icon: <Settings className="w-5 h-5" />,
      title: 'Backend Development',
      description: 'Scalable, secure backends powering millions of transactions. We build system that grows with you.',
      bgColor: 'bg-white',
      details: [
        'Node.js & Python',
        'Database Design',
        'API Development',
        'Cloud Architecture',
      ],
    },
    {
      id: '4',
      icon: <Palette className="w-5 h-5" />,
      title: 'Brand & Product Design',
      description: 'Complete brand identities and product strategies that resonate with your market.',
      bgColor: 'bg-white',
      details: [
        'Logo & Branding',
        'Product Strategy',
        'Marketing Collateral',
        'Brand Guidelines',
      ],
    },
    {
      id: '5',
      icon: <Hexagon className="w-5 h-5" />,
      title: 'Web3 & Blockchain',
      description: 'NFTs, DeFi platforms, and smart contracts. Build the future with blockchain experience.',
      bgColor: 'bg-white',
      details: [
        'Smart Contract ',
        'DApp Development',
        'NFT Platforms',
        'Blockchain Integration',
      ],
    },
    {
      id: '6',
      icon: <Users className="w-5 h-5" />,
      title: 'Project Management',
      description: 'Expert leadership ensuring your project stays on track, on time and on budget.',
      bgColor: 'bg-white',
      details: [
        'Agile/Scrum ',
        'Roadmap Planning',
        'Stakeholder Management',
        'Risk Mitigation',
      ],
    },
  ];

  const activeService = services.find(s => s.id === selectedService);

  return (
    <section className="w-full bg-gray-50 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Services
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Complete digital solutions for every stage of your product lifecycle
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service) => {
            const isActive = service.id === selectedService;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`${isActive ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200'} border-2 rounded-xl p-6 hover:border-purple-300 hover:shadow-md transition-all text-left w-full`}
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className={isActive ? 'text-red-500' : 'text-gray-700'}>
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Service Details Card */}
        {activeService && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-white">
                  {activeService.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {activeService.title}
              </h3>
            </div>

            <p className="text-gray-700 text-sm mb-6 leading-relaxed">
              {activeService.description}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeService.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;