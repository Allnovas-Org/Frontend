import React, { useState } from "react";
import { Pencil, MoveUpRight } from "lucide-react";
import Pagination from "../../../components/Pagination";
import ProjectModalSteps from "./ProjectModalSteps";

const ProjectsSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const total = 2;
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-base font-semibold text-gray-800'>Project</h3>
          <p className='text-xs text-input'>Projects from Ajayi Samuel</p>
        </div>
        <button
          className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'
          onClick={() => setOpen(true)}
        >
          <span className='sr-only'>Edit Projects</span>
          <Pencil className='w-4 h-4 text-gray-600' />
        </button>
      </div>
      <ProjectModalSteps
        open={open}
        onClose={() => setOpen(false)}
        onSave={(project) => {}}
      />
      <div className='grid grid-cols-3 gap-4'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className='relative group rounded-lg overflow-hidden shadow-md'
          >
            <img
              src='/images/applicants/proj1.png'
              alt='Project'
              className='w-full h-72 object-cover'
            />
            {/* Overlay */}
            <div className='absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-35 transition'></div>
            {/* View Button */}
            <button
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-gray-lighter font-semibold text-sm gap-2 flex items-center px-8 py-2 rounded-lg shadow-lg'
              style={{ zIndex: 2 }}
            >
              View
              <MoveUpRight className='w-4 h-4' />
            </button>
          </div>
        ))}
      </div>
      {/* Pagination (bottom right) */}
      <div className='flex justify-end mt-4'>
        <Pagination current={page} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default ProjectsSection;
