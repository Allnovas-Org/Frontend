import React, { useState } from "react";
import { Pencil, Clock } from "lucide-react";
import Pagination from "../../../components/Pagination";

const CatelogSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const total = 2;
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-800'>Catelog</h3>
        <button className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'>
          <span className='sr-only'>Edit Catelog</span>
          <Pencil className='w-4 h-4 text-gray-600' />
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        {[1, 2].map((i) => (
          <div
            key={i}
            className='flex bg-gray-50 rounded-lg shadow-sm p-4 gap-4 items-start w-3xl h-64'
          >
            <img
              src='/images/applicants/cat1.png'
              alt={`Catelog ${i}`}
              className='w-72 h-full object-cover rounded-lg'
            />
            <div className='flex-1 flex flex-col justify-between h-full'>
              <div>
                <h4 className='font-semibold text-gray-900'>Catelog Title</h4>
                <div className='flex justify-between'>
                  <p className='text-gray-500 text-sm'>From: Acme Corp</p>
                  <p className='text-xs text-gray-400 mt-1'>
                    <Clock className='inline w-3 h-3 mr-1' /> Duration: 6 months
                  </p>
                </div>
              </div>
              <button className='mt-2 ml-auto bg-transparent text-primary px-7 py-3 border border-primary rounded-lg text-xs flex items-center gap-1 hover:bg-transparent transition'>
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination (bottom left) */}
      <div className='flex justify-start mt-4'>
        <Pagination current={page} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default CatelogSection;
