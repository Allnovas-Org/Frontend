import React, { ReactNode } from "react";
import { InfoBadge } from "./help";
import { Job } from "../../types";

interface JobDetails {
  position: string;
  company: string;
  experience: string;
  budget: string;
  delivery: string;
  about: string;
  qualifications: string[];
  responsibilities: string[];
  skills: string[];
}

const job = {
  position: "Frontend Developer",
  company: "Company Name",
  experience: "2+ years",
  budget: "$1,400 - $2,000",
  delivery: "2-4 weeks",
  about:
    "We are looking for a talented frontend developer to join our remote team. You will work on exciting projects and collaborate with a global team.",
  qualifications: [
    "Bachelor's degree in Computer Science or related field",
    "2+ years experience in frontend development",
    "Proficiency in React and JavaScript",
  ],
  responsibilities: [
    "Develop and maintain web applications",
    "Collaborate with designers and backend developers",
    "Write clean, scalable code",
  ],
  skills: ["React", "JavaScript", "CSS", "HTML", "Git"],
};

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <h3 className='text-lg font-semibold mb-2 mt-6'>{children}</h3>
);

const ApplicationDetails: React.FC = () => (
  <div className='p-4 border border-input rounded-lg '>
    <div>
      {/* Position at Company */}
      <SectionTitle>
        {job.position} at {job.company}
      </SectionTitle>
      <p className='text-gray-600 mb-6'>
        Apply for this exciting opportunity and join our team!
      </p>

      {/* 3 Column: Experience, Budget, Delivery Timeline */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <div className='flex flex-col '>
          <span className='font-semibold text-gray-700'>Experience</span>
          <span className='text-base text-gray-500 mt-2'>{job.experience}</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='font-semibold text-gray-700'>Budget</span>
          <span className='text-base text-gray-500 mt-2'>{job.budget}</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='font-semibold text-gray-700'>Delivery Timeline</span>
          <span className='text-base text-gray-500 mt-2'>{job.delivery}</span>
        </div>
      </div>
    </div>

    {/* About the role */}
    <SectionTitle>About the Role</SectionTitle>
    <p className='text-gray-600 mb-6'>{job.about}</p>

    {/* Qualifications */}
    <SectionTitle>Qualifications</SectionTitle>
    <ul className='list-disc pl-5 mb-6'>
      {job.qualifications.map((q, idx) => (
        <li key={idx} className='text-gray-600 mb-1'>
          {q}
        </li>
      ))}
    </ul>

    {/* Responsibilities */}
    <SectionTitle>Responsibilities</SectionTitle>
    <ul className='list-disc pl-5 mb-6'>
      {job.responsibilities.map((r, idx) => (
        <li key={idx} className='text-gray-600 mb-1'>
          {r}
        </li>
      ))}
    </ul>

    {/* Required Skills */}
    <SectionTitle>Required Skills</SectionTitle>
    <div className='flex flex-wrap gap-2 mt-2 mb-4'>
      {job.skills.map((skill, idx) => (
        <InfoBadge key={idx}>{skill}</InfoBadge>
      ))}
    </div>
  </div>
);

export default ApplicationDetails;
