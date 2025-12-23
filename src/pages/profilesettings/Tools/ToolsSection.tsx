import React, { useState } from "react";
import { Pencil } from "lucide-react";
import ToolsModal from "./ToolsModal";

const initialTools = ["Figma", "VS Code", "Jira", "Slack"];

const ToolsSection: React.FC = () => {
  const [tools, setTools] = useState<string[]>(initialTools);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-base font-semibold text-gray-800'>Tools</h3>
        <button
          className='bg-gray-100 rounded-full p-1 shadow hover:bg-gray-100 transition '
          onClick={() => setOpen(true)}
        >
          <span className='sr-only'>Edit Tools</span>
          <Pencil className='w-4 h-4 text-gray-600' />
        </button>
      </div>
      <div className='flex flex-wrap gap-2 mt-2'>
        {tools.map((tool) => (
          <span
            key={tool}
            className='bg-transparent rounded-full px-4 py-1 text-sm font-medium text-gray-700 border border-input'
          >
            {tool}
          </span>
        ))}
      </div>
      <ToolsModal
        open={open}
        onClose={() => setOpen(false)}
        tools={tools}
        setTools={setTools}
      />
    </div>
  );
};

export default ToolsSection;
