import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How quickly can you assemble a team?',
      answer: 'We can have a team ready within 3-5 days for most projects. For specialized requirements, it may take up to 2 weeks.',
    },
    {
      id: '2',
      question: 'What communication tools do you use?',
      answer: 'What communication tools do you use?',
    },
    {
      id: '3',
      question: 'Can I scale the team up or down?',
      answer: 'Absolutely. With our flexible engagement models, you can adjust team size based on project needs.',
    },
    {
      id: '4',
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes. We offer maintenance, support, and scaling services at hourly rates or as part of extended partnerships.',
    },
    {
      id: '5',
      question: 'What\'s your process for quality assurance?',
      answer: 'We have rigorous QA testing, code reviews, security audits, and performance optimization before every launch.',
    },
    {
      id: '6',
      question: 'How do you handle timezone differences?',
      answer: 'We operate across EST, UTC, and IST timezones with overlapping working hours to ensure continuous progress.',
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="w-full bg-white px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-purple-600 text-sm font-medium mb-2 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Got questions?
            <br />
            We have <span className="text-purple-600">Answers.</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-red-500 text-lg font-bold mt-0.5">Q</span>
                  <span className="text-gray-900 font-semibold text-base">
                    {faq.question}
                  </span>
                </div>
                {openFAQ === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                )}
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;