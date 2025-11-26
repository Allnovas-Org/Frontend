import React, { useState } from "react";
import { HeartIcon, TimeIcon } from "../../assets/applicants/customIcons";
import Badge from "./Badge";

interface BadgeType {
  type: string;
  value: string;
}

export interface Job {
  id: string;
  position: string;
  company: string;
  logo: string;
  applicants: number;
  badges: BadgeType[];
  description: string;
  price: string;
  posted: string;
  postedDate: number;
  hearted?: boolean;
}

interface JobCardProps {
  job: Job;
}

// Truncate description to 2 lines (with ... at the end)
const truncate = (text: string, max: number = 120): string =>
  text.length > max ? text.slice(0, max) + "..." : text;

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const isHearted = job.hearted || liked;
  const heartIcon = "/images/applicants/heart.svg";
  const heartedIcon = "/images/applicants/hearted.svg";

  return (
    <div className='border border-input bg-transparent rounded-xl p-3 flex flex-col justify-between min-h-[220px] hover:shadow-xl hover:z-10 hover:border-white '>
      {/* Top row: logo, info, heart */}
      <div className='flex items-start'>
        {/* Company logo */}
        <div className='w-9 h-9 flex items-center justify-center bg-input rounded-lg mr-4'>
          <img
            src={job.logo}
            alt={job.company}
            className='w-10 h-10 object-contain'
          />
        </div>
        {/* Position, name, applicants */}
        <div className='flex-2 flex flex-col items-start'>
          <span className='font-semibold text-left text-heading text-sm mb-1'>
            {job.position}
          </span>
          <div className='flex items-start text-xs w-full gap-2 mb-1'>
            <span className='text-text text-[11px]'>{job.company}</span>
            <span className='mx-2 w-2 h-2 rounded-full bg-input inline-block'></span>
            <span className='text-[11px] text-gray-500 '>
              {job.applicants} Applicants
            </span>
          </div>
        </div>
        {/* Love icon */}
        <button
          className='ml-4'
          aria-label='Like job'
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setLiked((v) => !v);
          }}
        >
          <img
            src={isHearted ? heartedIcon : heartIcon}
            alt='heart'
            className='w-5 h-5'
          />
        </button>
      </div>
      {/* Badge indicators */}
      <div className='flex gap-2 justify-center'>
        {job.badges.map((badge: BadgeType, idx: number) => (
          <Badge key={idx} type={badge.type} value={badge.value} />
        ))}
      </div>
      {/* Job description */}
      <div className='text-text text-xs line-clamp-2'>
        {truncate(job.description)}
      </div>
      {/* Line demarcator */}
      <div className='border-t border-input' />
      {/* Bottom row: price/hours, posted info */}
      <div className='flex items-center justify-between'>
        <span className='font-semibold text-heading text-sm'>{job.price}</span>
        <span className='flex items-center text-xs text-gray-500'>
          <img
            src='/images/applicants/clock.svg'
            className='mr-1'
            alt='clock'
          />
          {job.posted}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
