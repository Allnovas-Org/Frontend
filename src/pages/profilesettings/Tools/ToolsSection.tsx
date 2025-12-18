import React from "react";
import { Pencil } from "lucide-react";

const ToolsSection: React.FC = () => (
  <div>
    <div className='flex items-center justify-between mb-2'>
      <h3 className='text-base font-semibold text-gray-800'>Tools</h3>
      <button className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'>
        <span className='sr-only'>Edit Tools</span>
        <Pencil className='w-4 h-4 text-gray-600' />
      </button>
    </div>
    <div className='flex flex-wrap gap-2 mt-2'>
      {["Figma", "VS Code", "Jira", "Slack"].map((tool) => (
        <span
          key={tool}
          className='bg-transparent rounded-full px-4 py-1 text-sm font-medium text-gray-700 border border-input'
        >
          {tool}
        </span>
      ))}
    </div>
  </div>
);

export default ToolsSection;
