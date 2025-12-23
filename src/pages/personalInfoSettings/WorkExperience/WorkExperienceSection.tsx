import React, { useState } from "react";
import { Pencil } from "lucide-react";
import WorkExperienceModal from "./WorkExperienceModal";
import { WorkExperience } from "../../../types";

interface WorkExperienceSectionProps {
  showEdit: boolean;
}

const colorClasses = [
  "bg-purple text-white",
  "bg-blue-500 text-white",
  "bg-green-500 text-white",
  "bg-yellow-500 text-white",
];

const defaultExperiences: WorkExperience[] = [
  {
    jobTitle: "Frontend Developer",
    company: "Acme Corp",
    stillWorking: true,
    jobDescription: "Developed and maintained web applications.",
    startMonth: "Jan",
    startYear: "2022",
    endMonth: "",
    endYear: "",
  },
];

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({
  showEdit,
}) => {
  const [experiences, setExperiences] =
    useState<WorkExperience[]>(defaultExperiences);
  const [open, setOpen] = useState(false);

  return (
    <div className='flex-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-3 relative shadow-sm'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-base font-semibold text-gray-800'>
          Work Experience
        </h3>
        {showEdit && (
          <button
            className='bg-gray-100 rounded-full p-2 text-gray-400 hover:text-gray-600 transition-colors'
            onClick={() => setOpen(true)}
          >
            <span className='sr-only'>Edit Work Experience</span>
            <Pencil size={14} />
          </button>
        )}
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {experiences.map((exp, i) => (
          <div
            key={i}
            className='bg-transparent border border-gray-light rounded-lg p-4 flex flex-col relative shadow-sm'
          >
            <div className='flex items-start gap-3'>
              <div
                className={`w-6 h-6 text-xs rounded-full flex items-center justify-center font-medium uppercase ${
                  colorClasses[i % colorClasses.length]
                }`}
              >
                {exp.jobTitle
                  .split(" ")
                  .map((w: string) => w[0])
                  .join("")}
              </div>
              <div>
                <div className='font-semibold text-gray-900 text-sm'>
                  {exp.jobTitle}
                </div>
                <div className='text-gray-500 text-sm'>{exp.company}</div>
              </div>
            </div>
            <div className='mt-4 text-xs text-gray-400'>
              {exp.stillWorking
                ? `${exp.startMonth} ${exp.startYear} - Present`
                : `${exp.startMonth} ${exp.startYear} - ${exp.endMonth} ${exp.endYear}`}
            </div>
            <div className='border-b border-gray-200 my-1'></div>
            <div className='text-right text-primary text-xs cursor-pointer font-medium'>
              More details
            </div>
          </div>
        ))}
      </div>
      <WorkExperienceModal
        open={open}
        onClose={() => setOpen(false)}
        experiences={experiences}
        setExperiences={setExperiences}
      />
    </div>
  );
};

export default WorkExperienceSection;
