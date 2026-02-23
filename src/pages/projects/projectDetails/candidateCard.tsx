import React, { useState } from "react";
import { Candidate } from "../../../types";
import { useNavigate } from "react-router-dom";
import { ProfileSidebarModal } from "./ProfileSidebarModal";
import {
  Clock,
  BriefcaseBusiness,
  Medal,
  CircleDollarSign,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

interface Props {
  candidate: Candidate;
  isHireView?: boolean;
}

export const CandidateCard = ({ candidate, isHireView }: Props) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const hirePath = `/applicants/projects/hire/${candidate.id}`;
  const messagePath = `/applicants/messages/${candidate.id}`;
  const visibleSkills = candidate.skills.slice(0, 2);
  const remainingSkillsCount = Math.max(
    candidate.skills.length - visibleSkills.length,
    0,
  );

  return (
    <>
      <div className='flex gap-6 border-t border-input p-6 hover:bg-gray-light transition relative'>
        {/* Left */}
        <div className='w-64'>
          <div className='flex items-center gap-3'>
            <img
              src={candidate.avatarUrl}
              alt={candidate.name}
              className='h-12 w-12 rounded-full'
            />
            <div>
              <div className='flex items-center justify-between'>
                <p className='font-semibold'>{candidate.name}</p>
                {candidate.bestMatch && (
                  <span className='rounded-md bg-blue-600 px-2 py-1 text-[8px] text-white'>
                    Best match
                  </span>
                )}
              </div>
              <p className='text-sm text-gray-dark pt-2'>{candidate.title}</p>
              <p className='mt-2 text-sm text-gray-dark'>{candidate.country}</p>

              <p className='mt-1 text-sm'> {candidate.rating} average review</p>
            </div>
          </div>

          <div className='mt-4 flex gap-2'>
            <button className='flex items-center justify-center rounded-full border border-input  px-2 py-2 text-sm w-8 h-8'>
              <ThumbsUp className='w-4 h-4 text-primary' />
            </button>

            <button className='flex items-center justify-center rounded-full border border-input px-2 py-2 w-8 h-8 text-sm '>
              <ThumbsDown className='w-4 h-4 text-primary' />
            </button>
            <button
              className='rounded-lg border border-primary text-primary px-3 py-2 text-sm'
              onClick={() => navigate(messagePath)}
            >
              Message
            </button>

            <button
              disabled={isHireView}
              className={`rounded-lg px-3 py-2 text-sm ${
                isHireView ? "bg-input text-white" : "bg-primary text-white"
              }`}
              onClick={() => navigate(hirePath)}
            >
              Hire
            </button>
          </div>
        </div>

        {/* Middle */}
        <div className='flex-1 space-y-2 text-xs text-gray-600'>
          <p className='flex item-centers gap-2'>
            <Medal className='w-3 h-3 ' /> {candidate.successRate}% job success
            rate
          </p>
          <p className='flex item-centers gap-2'>
            <BriefcaseBusiness className='w-3 h-3' /> {candidate.completedJobs}{" "}
            completed jobs
          </p>
          <p className='flex item-centers gap-2'>
            <Clock className='w-3 h-3 ' /> {candidate.totalHours} total hours
          </p>
          <p className='flex item-centers gap-2'>
            <CircleDollarSign className='w-3 h-3 ' /> {candidate.earned} earned
          </p>

          <div className='flex flex-wrap gap-2'>
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className='rounded-lg border border-input px-3 py-1 text-xs'
              >
                {skill}
              </span>
            ))}
            {remainingSkillsCount > 0 && (
              <span className='rounded-lg border border-input px-3 py-1 text-xs'>
                +{remainingSkillsCount}
              </span>
            )}
          </div>
        </div>

        {/* Right */}
        <div className='w-64'>
          <p className='text-lg font-semibold'>${candidate.hourlyRate}.00/hr</p>

          <p className='mt-2 text-sm text-gray-500'>
            Cover letter — {candidate.coverLetter}
          </p>

          <button
            className='mt-2 text-xs text-primary hover:underline underline'
            onClick={() => setShowSidebar(true)}
          >
            Review proposal
          </button>
        </div>
      </div>
      <ProfileSidebarModal
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        hirePath={hirePath}
        messagePath={messagePath}
      />
    </>
  );
};
