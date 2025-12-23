import React, { useState } from "react";
import { CheckCircle2, Circle, FileText, Eye } from "lucide-react";

interface PublishStatusProps {
  percent: number;
  completion: Record<string, boolean>;
  onSaveDraft?: () => void;
}

const SECTIONS = [
  {
    id: "basic",
    name: "Basic Information",
    desc: "Title, category, and service summary",
  },
  { id: "pricing", name: "Pricing", desc: "3 service tiers configured" },
  {
    id: "description",
    name: "Description & FAQ",
    desc: "Detailed description and FAQs",
  },
  {
    id: "requirements",
    name: "Requirements",
    desc: "Client instructions and file uploads",
  },
];

const PublishStatus: React.FC<PublishStatusProps> = ({
  percent,
  completion,
  onSaveDraft,
}) => {
  const [agreed, setAgreed] = useState({
    accurate: false,
    terms: false,
    rights: false,
  });

  return (
    <div className='space-y-6'>
      <div className='p-6 border rounded-xl bg-white shadow-sm'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='font-bold'>Catalogue Completion</h3>
          <span className='text-sm font-bold'>{percent}%</span>
        </div>
        <div className='w-full h-2 bg-gray-100 rounded-full'>
          <div
            className='h-full bg-purple-500 rounded-full'
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className='space-y-3'>
        <h4 className='font-semibold text-gray-700'>Section Status</h4>
        {SECTIONS.map((sec) => (
          <div
            key={sec.id}
            className='flex items-center justify-between p-4 border rounded-lg bg-white border-gray-200'
          >
            <div>
              <p className='text-sm font-bold text-gray-800'>{sec.name}</p>
              <p className='text-xs text-gray-400'>{sec.desc}</p>
            </div>
            {completion[sec.id] ? (
              <CheckCircle2 className='text-purple-500 w-5 h-5' />
            ) : (
              <Circle className='text-gray-200 w-5 h-5' />
            )}
          </div>
        ))}
      </div>
      {/* Terms and Conditions Section */}
      <div className='p-6 border border-gray-100 rounded-xl bg-white space-y-4'>
        <h4 className='text-sm font-bold text-gray-800'>
          Terms and Conditions
        </h4>
        <div className='space-y-3'>
          {[
            {
              id: "accurate",
              text: "I confirm that all information provided is accurate and does not violate any intellectual property rights.",
            },
            {
              id: "terms",
              text: "I agree to the platform's terms of service and order guidelines.",
            },
            {
              id: "rights",
              text: "I understand that my catalogue will be reviewed before going live and may be subject to approval.",
            },
          ].map((item) => (
            <label
              key={item.id}
              className='flex items-start gap-3 cursor-pointer group'
            >
              <input
                type='checkbox'
                className='mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-0'
                onChange={() =>
                  setAgreed((prev) => ({
                    ...prev,
                    [item.id]: !prev[item.id as keyof typeof agreed],
                  }))
                }
              />
              <span className='text-xs text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors'>
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Checkboxes */}
      <div className='flex items-center justify-between space-y-4'>
        <div className='border border-gray-300 p-4 rounded-lg'>
          <label className='flex items-start gap-3 cursor-pointer group'>
            <input
              type='checkbox'
              className='mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-0'
              onChange={onSaveDraft}
            />
            <span className='flex items-center gap-3'>
              <span className='text-left'>
                <p className='text-sm font-bold text-gray-800'>Save as Draft</p>
                <p className='text-[10px] text-gray-400'>
                  Save your progress and publish later
                </p>
              </span>
            </span>
          </label>
        </div>
        <div className='border border-gray-300 p-4 rounded-lg'>
          <label className='flex items-start gap-3 cursor-pointer group'>
            <input
              type='checkbox'
              className='mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-0'
              // No handler for Preview checkbox, just for UI
            />
            <span className='flex items-center gap-3'>
              <span className='text-left'>
                <p className='text-sm font-bold text-gray-800'>Preview</p>
                <p className='text-[10px] text-gray-400'>
                  Review how your catalogue looks before publishing
                </p>
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PublishStatus;
