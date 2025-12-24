import React, { useState } from "react";
import ProfileModal from "../modals/PersonalInfoEditModal";
import { X, Plus, Pencil } from "lucide-react";

const allTools = [
  "Figma",
  "Canva",
  "Adobe XD",
  "Sketch",
  "Photoshop",
  "Illustrator",
  "Zeplin",
  "InVision",
  "Framer",
  "Miro",
  "Marvel",
  "Balsamiq",
];

const suggestedTools = [
  { name: "Figma" },
  { name: "Canva" },
  { name: "Adobe XD" },
  { name: "Sketch" },
];

export interface ToolsModalProps {
  open: boolean;
  onClose: () => void;
  tools: string[];
  setTools: (tools: string[]) => void;
}

const ToolsModal: React.FC<ToolsModalProps> = ({
  open,
  onClose,
  tools,
  setTools,
}) => {
  const [input, setInput] = useState("");
  const [dropdown, setDropdown] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [localTools, setLocalTools] = useState<string[]>(tools);

  React.useEffect(() => {
    setLocalTools(tools);
  }, [tools, open]);

  React.useEffect(() => {
    if (input) {
      setDropdown(
        allTools.filter(
          (t) =>
            t.toLowerCase().includes(input.toLowerCase()) &&
            !localTools.includes(t)
        )
      );
    } else {
      setDropdown([]);
    }
  }, [input, localTools]);

  const handleAddTool = () => {
    const toolToAdd = (selected || input).trim();
    if (toolToAdd && !localTools.includes(toolToAdd)) {
      setLocalTools([...localTools, toolToAdd]);
      setInput("");
      setSelected("");
      setDropdown([]);
    }
  };

  const handleRemoveTool = (tool: string) => {
    setLocalTools(localTools.filter((t) => t !== tool));
  };

  const handleSelectDropdown = (tool: string) => {
    setSelected(tool);
    setInput(tool);
    setDropdown([]);
  };

  const handleAddSuggested = (tool: string) => {
    if (!localTools.includes(tool)) {
      setLocalTools([...localTools, tool]);
    }
  };

  const handleSave = () => {
    setTools(localTools);
    onClose();
  };

  if (!open) return null;

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      title='Edit Tools'
      subtitle='Add the tools you use for your work. Add all that apply.'
    >
      {/* Tools List */}
      <div className='mb-4'>
        <h3 className='text-base'>Tools</h3>
        <div className='flex flex-wrap gap-2 mb-4 border border-input rounded-lg p-5'>
          {localTools.map((tool) => (
            <span
              key={tool}
              className='flex items-center bg-primary rounded-full px-4 py-1 text-sm font-medium text-white '
            >
              {tool}
              <button className='ml-2' onClick={() => handleRemoveTool(tool)}>
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
          placeholder='Type a tool...'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelected("");
          }}
          onFocus={() =>
            input &&
            setDropdown(
              allTools.filter(
                (t) =>
                  t.toLowerCase().includes(input.toLowerCase()) &&
                  !localTools.includes(t)
              )
            )
          }
        />
        <button
          className='flex items-center gap-1 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-black transition'
          onClick={handleAddTool}
          disabled={
            !(input.trim() || selected) ||
            localTools.includes((selected || input).trim())
          }
        >
          <Plus className='w-4 h-4' /> Add
        </button>
        {dropdown.length > 0 && (
          <div className='absolute left-0 top-12 w-full bg-white border border-gray-200 rounded-lg shadow z-10'>
            {dropdown.map((tool) => (
              <div
                key={tool}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                onClick={() => handleSelectDropdown(tool)}
              >
                {tool}
              </div>
            ))}
          </div>
        )}
      </div>
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
      {/* Save Button */}
      <div className='flex justify-end mt-8'>
        <button
          className='bg-primary rounded-lg px-3 py-2 text-white font-semibold '
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </ProfileModal>
  );
};

export default ToolsModal;
