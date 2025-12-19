import React from 'react';
import { Clock } from 'lucide-react';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
}

const OurProcess: React.FC = () => {
  const processSteps: ProcessStep[] = [
    {
      id: '1',
      number: '01',
      title: 'Discovery & Consultation',
      description: 'We dive deep into your vision, goals, and technical requirements. Understanding your market and users is step one.',
      duration: '1-2 weeks',
    },
    {
      id: '2',
      number: '02',
      title: 'Team Assembly & Proposal',
      description: 'We assemble the perfect team for your project and present a detailed proposal with timeline and deliverables.',
      duration: '3-5 days',
    },
    {
      id: '3',
      number: '03',
      title: 'Design & Development',
      description: 'Iterative development with weekly demos. You get transparent progress reports and can request changes in real-time.',
      duration: 'Varies',
    },
    {
      id: '4',
      number: '04',
      title: 'Testing & Optimization',
      description: 'Rigorous QA testing, performance optimization, and security audits ensure excellence before launch.',
      duration: '2-3 weeks',
    },
    {
      id: '5',
      number: '05',
      title: 'Launch & Support',
      description: 'Seamless deployment and ongoing support. We\'re here for maintenance, updates, and scaling your product.',
      duration: 'Ongoing',
    },
  ];

  return (
    <section className="w-full bg-white px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Process
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            From discovery to launch a transparent, collaborative journey
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <div key={step.id} className="flex gap-6 relative">
              {/* Vertical Line - only show for non-last items */}
              {index < processSteps.length - 1 && (
                <div className="absolute left-[22px] top-12 bottom-0 w-[2px] bg-gray-200"></div>
              )}

              {/* Number Badge */}
              <div className="flex-shrink-0">
                <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-lg">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{step.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;