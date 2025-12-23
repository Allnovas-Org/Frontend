import React, { useState } from "react";
import { Pencil } from "lucide-react";
import SkillsModal from "./SkillsModal";

interface SkillsSectionProps {
  showEdit?: boolean;
}
const initialSkills = ["React", "TypeScript", "Tailwind", "Redux", "Next.js"];

const SkillsSection: React.FC<SkillsSectionProps> = ({ showEdit }) => {
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [open, setOpen] = useState(false);

  return (
    <div className='flex-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-3 relative shadow-sm'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-base font-semibold text-gray-800'>Skills</h3>
        {showEdit && (
          <button
            className='bg-gray-100 rounded-full p-2 text-gray-400 hover:text-gray-600 transition-colors'
            onClick={() => setOpen(true)}
          >
            <span className='sr-only'>Edit Skills</span>
            <Pencil size={14} />
          </button>
        )}
      </div>
      <div className='flex flex-wrap gap-2 mt-2'>
        {skills.map((skill) => (
          <span
            key={skill}
            className='bg-transparent rounded-full px-4 py-1 text-sm font-medium text-gray-700 border border-input'
          >
            {skill}
          </span>
        ))}
      </div>
      <SkillsModal
        open={open}
        onClose={() => setOpen(false)}
        skills={skills}
        setSkills={setSkills}
      />
    </div>
  );
};

export default SkillsSection;
