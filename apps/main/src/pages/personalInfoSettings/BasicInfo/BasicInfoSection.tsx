import React from "react";
import { Pencil } from "lucide-react";

export interface BasicInfoSectionData {
  location: string | null;
  languages: string[];
  averageHourlyRate: string | null;
  totalJobsCompleted: string | null;
  recommendations: string | null;
  education: string | null;
  educationDetail: string | null;
  certificationProvider: string | null;
  certification: string | null;
}

interface BasicInfoSectionProps {
  data?: BasicInfoSectionData;
  isLoading?: boolean;
  languageError?: boolean;
}

const freelancerData: BasicInfoSectionData = {
  location: "Nigeria",
  languages: ["English", "French", "German"],
  averageHourlyRate: "$40/hour",
  totalJobsCompleted: "40 Jobs Completed",
  recommendations: "120 recommendations",
  education: "Obafemi Awolowo University",
  educationDetail: "Bsc certificate",
  certificationProvider: "Udemy",
  certification: "UI beginners certificate",
};

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  data = freelancerData,
  isLoading = false,
  languageError = false,
}) => {
  const unavailable = "Unavailable for client accounts";
  const languagesText = isLoading
    ? "Loading saved languages..."
    : languageError
      ? "Could not load saved languages"
      : data.languages.length > 0
        ? data.languages.join(", ")
        : "No saved language preferences";

  return (
  <div className='w-full lg:w-full pr-0 border-none lg:border-r lg:border-gray-200 mb-6 lg:mb-0 flex-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-3 relative shadow-sm'>
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2'>
      <div>
        <p className='text-xs text-gray-500'>Location</p>
        <p className='text-sm text-gray-900 font-medium'>
          {data.location || "Not provided"}
        </p>
      </div>
      {/* <button className='bg-gray-100 rounded-full p-2 text-gray-400 hover:text-gray-600 transition-colors'>
        <span className='sr-only'>Edit Basic Info</span>
        <Pencil size={14} />
      </button> */}
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Language</p>
      <p className='text-sm text-gray-900 font-medium'>{languagesText}</p>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Average hourly rate</p>
      <p className='text-sm text-gray-900 font-medium'>
        {data.averageHourlyRate || unavailable}
      </p>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Total Job Completed</p>
      <p className='text-sm text-gray-900 font-medium'>
        {data.totalJobsCompleted || unavailable}
      </p>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Recommendations</p>
      <p className='text-sm text-gray-900 font-medium'>
        {data.recommendations || unavailable}
      </p>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Education</p>
      <p className='text-sm text-gray-900 font-medium'>
        {data.education || unavailable}
      </p>
      {data.educationDetail && (
        <p className='text-xs text-gray-500'>{data.educationDetail}</p>
      )}
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>
        {data.certificationProvider || "Certification"}
      </p>
      <p className='text-sm text-gray-900 font-medium'>
        {data.certification || unavailable}
      </p>
    </div>
  </div>
  );
};

export default BasicInfoSection;
