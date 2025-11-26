import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SavedJobsContext } from "../../store/SavedJobsContext";
import JobCard from "../../components/Applicants/JobCard";
import {
  BackArrowIcon,
  FrontArrowIcon,
} from "../../assets/applicants/customIcons";

interface Job {
  id: string;
  position: string;
  company: string;
  logo: string;
  applicants: number;
  badges: Array<{ type: string; value: string }>;
  description: string;
  price: string;
  posted: string;
  postedDate: number;
  hearted?: boolean;
}

interface SavedJobsContextType {
  savedJobs: Job[];
}

const SavedJobs: React.FC = () => {
  const context = useContext(SavedJobsContext) as SavedJobsContextType;
  const savedJobs = context?.savedJobs ?? [];
  const navigate = useNavigate();

  return (
    <div className='max-w-5xl mx-auto py-8 px-4'>
      {savedJobs.length === 0 ? null : (
        <button
          className='flex items-center gap-2 text-primary font-medium text-sm ext-gray-500 mb-9 focus:outline-none'
          onClick={() => navigate("/applicants/find-jobs")}
        >
          <BackArrowIcon className='w-6 h-6' />
          <span>Return to find jobs</span>
        </button>
      )}
      {savedJobs.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-[60vh]'>
          <div className='flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4'>
            <img
              src='/images/applicants/notefavorite.svg'
              alt='Note'
              className='w-8 h-8'
            />
          </div>
          <div className='text-lg font-semibold text-gray-dark mb-4'>
            Never lose track of your dream jobs! Simply click the heart icon on
            any posting to save it and revisit later.
          </div>
          <button
            className='flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-primary-dark transition mt-2'
            onClick={() => navigate("/applicants/find-jobs")}
          >
            <span className='font-medium'>Browse openings</span>
            <FrontArrowIcon className='w-5 h-5' />
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {savedJobs.map((job: Job) => (
            <JobCard key={job.id} job={{ ...job, hearted: true }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
