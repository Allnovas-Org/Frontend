import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SavedJobsContext } from "../../store/SavedJobsContext";
import { InfoBadge } from "./help";
import { SectionTitle, DescriptionList } from "./help";
import Badge from "./Badge";
import { Job } from "../../types";
import { createConversation } from "../../services/messaging.service";
import { getApiErrorMessage } from "../../utils/apiError";

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
  const [messageError, setMessageError] = useState("");
  const [startingConversation, setStartingConversation] = useState(false);
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

  const qualifications =
    Array.isArray(job.qualifications) && job.qualifications.length > 0
      ? job.qualifications
      : job.skills || [];
  const responsibilities = job.responsibilities || [];
  const skills = job.skills || [];

  const handleMessageClient = async () => {
    setMessageError("");
    setStartingConversation(true);
    try {
      const conversation = await createConversation(job.id);
      navigate(`/applicants/messages/${conversation.id}`);
    } catch (error) {
      setMessageError(getApiErrorMessage(error, "Unable to contact this client."));
    } finally {
      setStartingConversation(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex justify-end items-center'>
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
              className='flex w-1/2 items-center justify-center rounded-lg border border-primary px-5 py-2 text-sm font-semibold text-primary transition disabled:opacity-50'
              onClick={() => void handleMessageClient()}
              disabled={startingConversation}
            >
              {startingConversation ? "Opening…" : "Message Client"}
            </button>
            {messageError ? (
              <p role='alert' className='basis-full text-sm text-red-600'>
                {messageError}
              </p>
            ) : null}
          </div>
          <div className='flex gap-3 mt-3'>
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
          <div className='mb-2'>
            <span className='font-medium text-gray-700'>Client</span>
            <div className='text-sm text-gray-500 mt-1'>{job.company}</div>
          </div>
          {/* Border demarcation */}
          <div className='border-t border-gray-200 my-3' />
          <div className='mb-3.5 flex flex-col'>
            <span className='font-medium mb-0.5 text-gray-700'>Budget</span>
            <span className='text-sm text-gray-500 mt-1'>{job.budget || job.price}</span>
          </div>
          <div className='mb-3.5 flex flex-col'>
            <span className='font-medium mb-0.5 text-gray-700'>Duration</span>
            <span className='text-sm text-gray-500 mt-1'>{job.delivery || "Not specified"}</span>
          </div>
          <SectionTitle>Skills</SectionTitle>
          <div className='flex flex-wrap gap-2 mt-2 mb-4'>
            {skills.map((service: string, idx: number) => (
              <InfoBadge key={idx}>{service}</InfoBadge>
            ))}
          </div>
          <p className='text-xs text-gray-500'>
            Verification and payment-provider details are not available in beta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobSidebar;
