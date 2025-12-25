import React from "react";
import FAQItem from "./FAQItem";
import { FAQ } from "../../../types";

interface GigExtrasData {
  requirements: string[];
  specificRequirements: string[];
  workflow: string[];
  faqs: FAQ[];
}

interface GigExtrasProps {
  data: GigExtrasData;
}

const GigExtras: React.FC<GigExtrasProps> = ({ data }) => {
  return (
    <section className='mt-14 max-w-4xl'>
      {/* Requirements */}
      <div>
        <h3 className='font-semibold mb-3'>What I need from you</h3>
        <ol className='list-decimal pl-5 space-y-1 text-gray-600'>
          {data.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
      {/* Specific Requirements */}
      <div className='mt-8'>
        <h3 className='font-semibold mb-3'>Specific Requirement</h3>
        <ol className='list-decimal pl-5 space-y-1 text-gray-600'>
          {data.specificRequirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
      {/* Workflow */}
      <div className='mt-8'>
        <h3 className='font-semibold mb-3'>How I work</h3>
        <ol className='list-decimal pl-5 space-y-1 text-gray-600'>
          {data.workflow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
      {/* FAQ */}
      <div className='mt-12'>
        <h3 className='font-semibold mb-4'>Frequently Asked Questions</h3>
        <div className='space-y-4'>
          {data.faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GigExtras;
