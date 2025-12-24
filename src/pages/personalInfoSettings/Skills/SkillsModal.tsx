import React, { useState } from "react";
import ProfileModal from "../modals/PersonalInfoEditModal";
import { X, Plus, Pencil } from "lucide-react";

const allSkills = [
  "React",
  "TypeScript",
  "Tailwind",
  "Redux",
  "Next.js",
  "Node.js",
  "GraphQL",
  "Sass",
  "Vue.js",
  "Angular",
  "Jest",
  "Cypress",
];

const suggestedTools = [
  { name: "Figma" },
  { name: "Canva" },
  { name: "Adobe XD" },
  { name: "Sketch" },
];

export interface SkillsModalProps {
  open: boolean;
  onClose: () => void;
  skills: string[];
  setSkills: (skills: string[]) => void;
}

const SkillsModal: React.FC<SkillsModalProps> = ({
  open,
  onClose,
  skills,
  setSkills,
}) => {
  const [input, setInput] = useState("");
  const [dropdown, setDropdown] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [localSkills, setLocalSkills] = useState<string[]>(skills);

  React.useEffect(() => {
    setLocalSkills(skills);
  }, [skills, open]);

  React.useEffect(() => {
    if (input) {
      setDropdown(
        allSkills.filter(
          (s) =>
            s.toLowerCase().includes(input.toLowerCase()) &&
            !localSkills.includes(s)
        )
      );
    } else {
      setDropdown([]);
    }
  }, [input, localSkills]);

  const handleAddSkill = () => {
    const skillToAdd = (selected || input).trim();
    if (skillToAdd && !localSkills.includes(skillToAdd)) {
      setLocalSkills([...localSkills, skillToAdd]);
      setInput("");
      setSelected("");
      setDropdown([]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setLocalSkills(localSkills.filter((s) => s !== skill));
  };

  const handleSelectDropdown = (skill: string) => {
    setSelected(skill);
    setInput(skill);
    setDropdown([]);
  };

  const handleAddSuggested = (tool: string) => {
    if (!localSkills.includes(tool)) {
      setLocalSkills([...localSkills, tool]);
    }
  };

  const handleSave = () => {
    setSkills(localSkills);
    onClose();
  };

  if (!open) return null;

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      title='Edit Skills'
      subtitle='Your skills tell clients what you can do. Add all that apply.'
    >
      {/* Skills List */}
      <div className='mb-4'>
        <h3 className='text-base'>Skills</h3>
        <div className='flex flex-wrap gap-2 mb-4 border border-input rounded-lg p-5'>
          {localSkills.map((skill) => (
            <span
              key={skill}
              className='flex items-center bg-primary rounded-full px-4 py-1 text-sm font-medium text-white '
            >
              {skill}
              <button className='ml-2' onClick={() => handleRemoveSkill(skill)}>
                <X className='w-4 h-4 text-white' />
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className='flex items-center gap-2 mb-4 relative'>
        <input
          type='text'
          className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200'
          placeholder='Type a skill...'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelected("");
          }}
          onFocus={() =>
            input &&
            setDropdown(
              allSkills.filter(
                (s) =>
                  s.toLowerCase().includes(input.toLowerCase()) &&
                  !localSkills.includes(s)
              )
            )
          }
        />
        <button
          className='flex items-center gap-1 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-black transition'
          onClick={handleAddSkill}
          disabled={
            !(input.trim() || selected) ||
            localSkills.includes((selected || input).trim())
          }
        >
          <Plus className='w-4 h-4' /> Add
        </button>
        {dropdown.length > 0 && (
          <div className='absolute left-0 top-12 w-full bg-white border border-gray-200 rounded-lg shadow z-10'>
            {dropdown.map((skill) => (
              <div
                key={skill}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                onClick={() => handleSelectDropdown(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Suggested Tools */}
      <div className='mt-4'>
        <div className='text-gray-700 font-semibold mb-2'>Suggested tools:</div>
        <div className='flex flex-wrap gap-2'>
          {suggestedTools.map((tool) => (
            <button
              key={tool.name}
              className='flex items-center gap-1 bg-transparent rounded-full px-4 py-1 text-sm font-medium text-gray-700 border border-input'
              onClick={() => handleAddSuggested(tool.name)}
              type='button'
            >
              <Plus className='w-4 h-4 text-gray-darker' /> {tool.name}
            </button>
          ))}
        </div>
      </div>
      <div className='flex justify-end mt-8'>
        <button
          className='bg-primary rounded-lg px-3 py-2 text-white font-semibold '
          onClick={handleSave}
        >
          Save
        </button>
        {/* <AppButton
          color='bg-primary'
          textColor='text-white'
          onClick={handleSave}
          hideArrow
        >
          Save
        </AppButton> */}
      </div>
    </ProfileModal>
  );
};

export default SkillsModal;
