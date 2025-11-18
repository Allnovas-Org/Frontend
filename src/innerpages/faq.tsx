import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

export default function ArticlesFAQ() {
  const [activeTab, setActiveTab] = useState('General');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      image: '/images/blog-1.png',
      title: 'How to Keep Your Clients, and earn their trust',
      category: 'Business'
    },
    {
      id: 2,
      image: '/images/blog-2.png',
      title: 'Getting Started on Allnova: Basics of Allnova',
      category: 'Guide'
    },
    {
      id: 3,
      image: '/images/blog-3.png',
      title: 'Creating A Winning Gig Image: Convert Clients Easily',
      category: 'Marketing'
    }
  ];

  const tabs = ['General', 'Freelancing', 'Account', 'Transfer'];

  const faqData = {
    General: [
      { question: 'What is Allnovas about?', answer: 'Allnova is a platform connecting freelancers with clients worldwide.' },
      { question: 'Who can use Allnovas?', answer: 'Anyone looking to hire freelancers or offer their services can use Allnova.' },
      { question: 'How does Allnovas ensure quality?', answer: 'We have a rigorous vetting process and rating system for all freelancers.' },
      { question: 'Is Allnovas available worldwide?', answer: 'Yes, Allnova is accessible globally in over 150 countries.' }
    ],
    Freelancing: [
      { question: 'How do I start freelancing on Allnovas?', answer: 'Create an account, complete your profile, and start creating gigs to offer your services.' },
      { question: 'What services can I offer?', answer: 'You can offer any professional service including design, writing, programming, marketing, and more.' },
      { question: 'How do I set my rates?', answer: 'You have full control over your pricing. Research market rates and set competitive prices.' },
      { question: 'When do I get paid?', answer: 'Payment is released after successful project completion and client approval.' }
    ],
    Account: [
      { question: 'How do I create an account?', answer: 'Click on Sign Up, enter your email, create a password, and verify your email address.' },
      { question: 'Can I change my username?', answer: 'Yes, you can change your username once every 60 days in your account settings.' },
      { question: 'How do I verify my account?', answer: 'Complete your profile, upload required documents, and wait for our team to review.' },
      { question: 'Is my data secure?', answer: 'Yes, we use industry-standard encryption and security measures to protect your data.' }
    ],
    Transfer: [
      { question: 'How do I withdraw my earnings?', answer: 'Go to your earnings section and request a withdrawal to your preferred payment method.' },
      { question: 'What payment methods are available?', answer: 'We support PayPal, bank transfer, and various local payment options.' },
      { question: 'Are there any withdrawal fees?', answer: 'Small service fees apply depending on your chosen payment method and amount.' },
      { question: 'How long does a transfer take?', answer: 'Transfers typically process within 3-7 business days depending on the payment method.' }
    ]
  };

  const currentFAQs = faqData[activeTab as keyof typeof faqData];

  
  return (
    <div className="max-w-6xl mx-auto bg-white">
      {/* Articles Section */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <span className="text-purple-600 text-sm font-semibold tracking-wide mb-2 block">
              Insights
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Latest Articles
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Check out the latest updates and free resources from Allnova.
            </p>
          </div>
          <button className="group text-[#F05658] font-semibold cursor-pointer flex items-center gap-2 hover:gap-3 transition-all duration-300">
            View All Posts
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {articles.map((article) => (
            <div key={article.id} className="text-center">
              <div className="mb-4 overflow-hidden rounded-xl">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 px-2">
                {article.title}
              </h3>
              <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 cursor-pointer">
                <span>View Post</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="relative inline-block">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative z-10 px-8">
                  Frequently asked questions
                </h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="543" height="103" viewBox="0 0 543 103" fill="none " className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-full max-w-[543px] hidden md:block" style={{ height: 'auto' }}>
              <path d="M168.27 93.1713C182.963 90.4233 196.768 87.839 210.598 85.2493C218.452 83.773 227.28 82.7641 235.737 81.584C246.259 80.1123 258.431 80.946 270.417 81.4427C310.53 83.1127 348.709 82.3917 385.756 80.3086C420.948 78.3316 454.538 75.3523 483.262 69.685C502.494 65.889 518.233 61.0578 526.712 54.2363C534.665 47.8567 529.421 41.4718 513.603 35.0542C493.345 26.8417 467.262 20.9744 438.7 16.1862C399.893 9.67387 359.926 6.45677 319.399 4.79907C259.999 2.36921 203.685 3.4858 150.167 7.61753C95.6226 11.8309 54.691 21.149 28.5683 35.7544C21.9863 39.436 18.6817 43.6055 20.2513 48.3099C22.8031 55.9735 38.8412 61.3449 60.3893 65.6544C71.8896 67.953 84.2182 69.4444 96.7706 70.3637C119.779 72.0537 142.658 74.0858 165.239 76.9573C167.372 77.2309 169.976 77.403 170.014 78.2889C170.037 79.0732 167.643 78.9885 165.754 78.9556C133.96 78.3352 101.95 77.9428 69.9777 73.5614C39.2743 69.3534 14.8283 62.8469 4.1603 52.756C-3.70243 45.3291 0.354695 38.8392 9.86158 32.9557C21.1718 25.9571 38.092 20.4384 57.2563 15.5604C91.4587 6.8545 132.79 7.60185 179.526 5.67225C223.583 3.8521 269.949 -1.52138 316.732 0.415084C370.814 2.65033 423.422 7.64057 472.626 18.3724C493.687 22.9615 512.795 28.1952 527.207 34.86C542.967 42.142 547.08 49.2038 538.402 56.0679C530.852 62.0395 518.068 66.6669 502.299 70.5196C479.726 76.0485 452.49 79.3138 423.541 81.705C376.108 85.6217 326.202 86.9565 273.347 85.0924C270.519 84.9897 267.672 84.821 264.827 84.631C253.641 83.8922 244.156 84.4 235.467 85.9793C211.228 90.3936 188.58 95.4288 164.997 100.093C160.745 100.932 156.102 97.2207 151.501 97.9051C147.367 98.5237 142.923 103.153 138.47 101.752C133.923 100.323 134.662 98.9133 137.221 97.7612C148.447 92.6875 159.863 87.6496 171.28 82.6117C172.875 81.9048 175.142 81.2694 178.694 81.9356C182.46 82.6465 181.401 83.5872 180.69 84.4389C178.75 86.7428 174.951 88.7001 171.438 90.7075C170.259 91.3737 168.435 91.9344 168.345 93.1482L168.27 93.1713Z" 
              fill="#F05658"
              />
              </svg>
              
            </div>
            
            <p className="text-gray-600 text-sm md:text-base mx-auto mt-6">
              These are the commonly asked questions on Allnovas. Still have some questions? <a href="#" className="text-[#F05658] hover:text-[#f04446] font-medium">Email us</a>
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOpenFAQ(null); // Close any open FAQ when switching tabs
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[#F05658] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {currentFAQs.map((faq, index) => (
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
                    className={`transform transition-transform duration-300 shrink-0 ml-4 ${
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