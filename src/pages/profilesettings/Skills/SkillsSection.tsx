import React, { useState } from "react";
import { Pencil } from "lucide-react";
import SkillsModal from "./SkillsModal";

const initialSkills = ["React", "TypeScript", "Tailwind", "Redux", "Next.js"];

const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-base font-semibold text-gray-800'>Skills</h3>
        <button
          className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'
          onClick={() => setOpen(true)}
        >
          <span className='sr-only'>Edit Skills</span>
          <Pencil className='w-4 h-4 text-gray-600' />
        </button>
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
