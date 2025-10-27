import React, { useState } from 'react';

export default function ArticlesFAQ() {
  const [activeTab, setActiveTab] = useState('General');
 const [openFAQ, setOpenFAQ] = useState<number | null>(null);


  const articles = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=300&fit=crop',
      title: 'How to Keep Your Clients, and earn their trust',
      category: 'Business'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      title: 'Getting Started on Allnova: Basics of Allnova',
      category: 'Guide'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
      title: 'Creating A Winning Gig Image: Convert Clients Easily',
      category: 'Marketing'
    }
  ];

  const tabs = ['General', 'Freelancing', 'Account', 'Transfer'];

  const faqs = [
    { question: 'What is Allnova about?', answer: 'Allnova is a platform connecting freelancers with clients worldwide.' },
    { question: 'Who can use Allnova?', answer: 'Anyone looking to hire freelancers or offer their services can use Allnova.' },
    { question: 'How does Allnova insure quality?', answer: 'We have a rigorous vetting process and rating system for all freelancers.' },
    { question: 'Is Allnova available worldwide?', answer: 'Yes, Allnova is accessible globally in over 150 countries.' }
  ];

  const RedCurveArrow = () => (
     <svg 
      width="180" 
      height="40" 
      viewBox="0 0 180 40" 
      fill="none" 
      className="absolute -top-2 left-0 right-0 mx-auto hidden md:block"
      style={{ width: '110%', left: '-5%' }}
    >
      {/* Left curved line with arrow */}
      <path 
        d="M15 35 Q 35 8, 55 15" 
        stroke="#EF4444" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M55 15 L 48 13 M55 15 L 52 21" 
        stroke="#EF4444" 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Right curved line with arrow */}
      <path 
        d="M165 35 Q 145 8, 125 15" 
        stroke="#EF4444" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M125 15 L 132 13 M125 15 L 128 21" 
        stroke="#EF4444" 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="w-full bg-gray-50">
      {/* Articles Section */}
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-purple-600 text-sm font-semibold uppercase tracking-wide mb-2 block">
              Insights
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Latest Articles
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Check out the latest updates and free resources from Allnova.
            </p>
          </div>
          <button className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors hidden md:flex items-center gap-1">
            <span>View All post</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-snug">
                  {article.title}
                </h3>
                <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 inline-block relative">
              Frequently asked questions
              <RedCurveArrow />
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              These are the commonly asked questions on Allnova. Still have some questions?{' '}
              <a href="#" className="text-red-500 hover:text-red-600 font-medium">Email us</a>
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-base">
                    {faq.question}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}