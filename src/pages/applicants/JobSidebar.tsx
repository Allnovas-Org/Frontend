import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SavedJobsContext } from "../../store/SavedJobsContext";
import { InfoBadge } from "./help";
import { SectionTitle, DescriptionList } from "./help";
import Badge from "./Badge";
import { Job } from "../../types";
import ReviewStars from "./ReviewStars";
import JobApplicationPanel from "./JobApplicationPanel";

import {
  ChevronLeftIcon,
  HeartIcon,
  BackArrowIcon,
} from "../../assets/applicants/customIcons";

export interface JobSidebarProps {
  job: Job;
  open: boolean;
  onClose: () => void;
  onApplyNow: () => void;
}

const JobSidebar: React.FC<JobSidebarProps> = ({
  job,
  open,
  onClose,
  onApplyNow,
}) => {
  const [visible, setVisible] = useState(open);
  const [showApplicationPanel, setShowApplicationPanel] = useState(false);
  const savedJobsContext = useContext(SavedJobsContext);
  if (!savedJobsContext) {
    throw new Error("SavedJobsContext is not provided");
  }
  const { addJob, savedJobs } = savedJobsContext as {
    addJob: (job: Job) => void;
    savedJobs: Job[];
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!open && visible) {
      setTimeout(() => setVisible(false), 300); // match animation duration
    }
  }, [open, visible]);

  // Show sidebar immediately when open
  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  if (!visible) return null;

  // Example data for right column (replace with real job data as needed)
  const qualifications =
    Array.isArray(job.qualifications) && job.qualifications.length > 0
      ? job.qualifications
      : [
          "Bachelor's degree in Computer Science or related field",
          "2+ years experience in frontend development",
          "Proficiency in React and JavaScript",
        ];
  const responsibilities = job.responsibilities || [
    "Develop and maintain web applications",
    "Collaborate with designers and backend developers",
    "Write clean, scalable code",
  ];
  const skills = job.skills || ["React", "JavaScript", "CSS", "HTML", "Git"];

  return (
    <div className='fixed inset-0 z-50 flex justify-end items-center'>
      {showApplicationPanel && (
        <JobApplicationPanel onClose={() => setShowApplicationPanel(false)} />
      )}
      {/* Overlay */}
      <div
        className='absolute inset-0 bg-black opacity-0'
        onClick={onClose}
        style={{ cursor: "pointer" }}
      />
      {/* Sidebar: 2-column layout */}
      <div
        className={`relative bg-white shadow-xl w-full max-w-3xl h-full flex overflow-y-auto hide-scrollbar py-8 ${
          open ? "animate-slideInRight" : "animate-slideOutRight"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar header with back arrow */}
        <div
          className='absolute top-6 left-6 z-10 flex items-center gap-2 cursor-pointer'
          onClick={onClose}
        >
          <BackArrowIcon className='w-6 h-6 text-gray-500 hover:text-gray-700 transition' />
        </div>
        {/* Left column: Job details (2/3) */}
        <div className='flex-2 w-2/3 p-8 flex flex-col relative'>
          {/* Vertical divider */}
          <div
            className='absolute top-0 right-0 bottom-0 w-px bg-gray-200'
            style={{ height: "100%" }}
          />
          <div className='flex items-center justify-between mb-4 flex-wrap gap-y-2'>
            <span className='font-bold text-xl text-heading mr-4'>
              {job.position}
            </span>
            <div className='flex gap-1 mb-4 justify-center'>
              {job.badges.map((badge, idx) => (
                <Badge key={idx} type={badge.type} value={badge.value} />
              ))}
            </div>
          </div>
          <div className='border-t border-gray-200 my-3' />
          {/* About the role */}
          <SectionTitle>About the Role</SectionTitle>
          <div className='mb-4 text-text text-base'>{job.description}</div>
          {/* Qualifications */}
          <SectionTitle>Qualifications</SectionTitle>
          <DescriptionList items={qualifications} />
          {/* Responsibilities */}
          <SectionTitle>Responsibilities</SectionTitle>
          <DescriptionList items={responsibilities} />
          {/* Required Skills */}
          <SectionTitle>Required Skills</SectionTitle>
          <div className='flex flex-wrap gap-2 mt-2 mb-4'>
            {skills.map((skill: string, idx: number) => (
              <InfoBadge key={idx}>{skill}</InfoBadge>
            ))}
          </div>
          {/* Action buttons */}
          <div className='flex gap-3 mt-4'>
            <button
              className='bg-primary text-sm items-center text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-primary-dark transition w-1/2'
              onClick={onApplyNow}
            >
              Apply Now
            </button>
            <button
              className={`flex items-center justify-center text-center text-sm gap-2 px-5 py-2 rounded-lg border border-primary font-semibold transition w-1/2 ${
                savedJobs.some((j: Job) => j.id === job.id)
                  ? "bg-primary text-white justify-center"
                  : "text-primary"
              }`}
              onClick={() => {
                if (!savedJobs.some((j: Job) => j.id === job.id)) {
                  addJob(job);
                }
                setVisible(false);
                setTimeout(() => navigate("/applicants/saved-jobs"), 300);
              }}
              disabled={savedJobs.some((j: Job) => j.id === job.id)}
            >
              {!savedJobs.some((j: Job) => j.id === job.id) && (
                <img
                  src='/images/applicants/archive.svg'
                  alt='archive'
                  className='w-5 h-5'
                />
              )}
              {savedJobs.some((j: Job) => j.id === job.id) ? (
                <span className='w-full text-center'>Saved</span>
              ) : (
                "Save Jobs"
              )}
            </button>
          </div>
        </div>
        {/* Right column: Company info (1/3) */}
        <div className='flex-1 w-1/3 px-5 mb-8 flex flex-col items-stretch justify-start'>
          {/* Top: Company name, verified, logo */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <span className='text-base text-heading font-semibold'>
                {job.company}
              </span>
              {/* Verified icon */}
              <span
                className='inline-flex items-center justify-center '
                style={{ width: 18, height: 18 }}
              >
                <img
                  src='/images/applicants/verified.svg'
                  alt='verified'
                  className='w-4 h-4'
                />
              </span>
            </div>
            <img
              src={job.logo}
              alt={job.company}
              className='w-10 h-10 rounded-xl'
            />
          </div>
          {/* Founded & Location */}
          <div className='mb-2'>
            <span className='font-medium text-gray-700'>Founded</span>
            <div className='text-sm text-gray-500 mt-1'>
              {job.founded || "2012"}
            </div>
          </div>
          <div className='mb-2'>
            <span className='font-semibold text-gray-700'>Location</span>
            <div className='text-sm text-gray-500 mt-1'>
              {job.location || "Remote"}
            </div>
          </div>
          {/* Border demarcation */}
          <div className='border-t border-gray-200 my-3' />
          {/* Other Information */}
          <SectionTitle>Other Information</SectionTitle>
          <div>
            <div className='flex items-center gap-1 mb-2'>
              <span
                className='inline-flex items-center justify-center rounded-full bg-green-100'
                style={{ width: 16, height: 16 }}
              >
                <img
                  src='/images/applicants/tickcircle.svg'
                  alt='tick-circle'
                />
              </span>
              <span className='text-sm font-normal text-gray-700'>
                Payment method verified
              </span>
            </div>
            <div className='flex items-center gap-1 mb-2'>
              <span
                className='inline-flex items-center justify-center rounded-full bg-green-100'
                style={{ width: 16, height: 16 }}
              >
                <img
                  src='/images/applicants/tickcircle.svg'
                  alt='tick-circle'
                />
              </span>
              <span className='text-sm font-normal text-gray-700'>
                Phone number/identity verified
              </span>
            </div>
          </div>
          {/* Reviews */}
          <div className='mb-3.5'>
            <div className='flex items-center gap-1 mb-0.5'>
              <ReviewStars rating={job.rating || 4.5} max={5} />
              <span className='text-xs text-gray-500'>{job.rating || 4.5}</span>
            </div>
            <span className='text-xs text-gray-400'>
              {job.rating || 4.5} of {job.reviewCount || 10} reviews
            </span>
          </div>
          {/* Jobs posted */}
          <div className='mb-3.5 flex flex-col'>
            <span className='font-medium mb-0.5 text-gray-700'>
              15 jobs posted
            </span>
            <span className='text-sm text-gray-500 mt-1'>
              100% hire rate, 1 open job
            </span>
          </div>
          {/* Amount spent */}
          <div className='mb-3.5 flex flex-col'>
            <span className='font-medium mb-0.5 text-gray-700'>
              $16k+ Spent
            </span>
            <span className='text-sm text-gray-500 mt-1'>Payment verified</span>
          </div>
          {/* Amount budget */}
          <div className='mb-3.5 flex flex-col'>
            <span className='font-medium mb-0.5 text-gray-700'>
              $1,400 - $2,000
            </span>
            <span className='text-sm text-gray-500 mt-1'>
              {job.amountBudget || "Budget"}
            </span>
          </div>

          {/* Delivery period */}
          <div className='mb-3.5 flex flex-col'>
            <span className='font-medium mb-0.5 text-gray-700'>2-4 weeks</span>
            <span className='text-sm text-gray-500 mt-1'>
              {job.deliveryPeriod || "Delivery Timeline"}
            </span>
          </div>

          {/* Services as tabs */}
          <SectionTitle>Services</SectionTitle>
          <div className='flex flex-wrap gap-2 mt-2 mb-4'>
            {(
              job.services || [
                "Web Development",
                "UI/UX Design",
                "Consulting",
                "Mobile Apps",
                "Cloud Solutions",
                "SEO",
                "Branding",
                "E-commerce",
                "API Integration",
                "Support & Maintenance",
              ]
            ).map((service: string, idx: number) => (
              <InfoBadge key={idx}>{service}</InfoBadge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSidebar;
