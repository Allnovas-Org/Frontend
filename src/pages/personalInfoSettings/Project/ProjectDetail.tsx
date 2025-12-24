import React from "react";
import { ProjectData } from "../../../types";

const ProjectDetail: React.FC<{ data: ProjectData }> = ({ data }) => {
  return (
    <div className='bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm max-w-6xl mx-auto flex flex-col md:flex-row gap-12'>
      <div className='flex-1'>
        <h1 className='text-2xl font-bold text-gray-900 mb-10 tracking-tight uppercase'>
          {data.title}
        </h1>

        <section className='mb-8'>
          <h3 className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3'>
            Project Description
          </h3>
          <p className='text-gray-600 text-sm leading-relaxed'>
            {data.description}
          </p>
        </section>

        <section className='mb-10'>
          <h3 className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4'>
            Skill and deliverables
          </h3>
          <div className='flex flex-wrap gap-2'>
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className='px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-xs font-medium border border-gray-100'
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <div className='pt-8 border-t border-gray-50'>
          <p className='text-[10px] text-gray-400 mb-6 uppercase'>
            Published on {data.publishDate}
          </p>
          <a
            href={`https://${data.link}`}
            target='_blank'
            className='text-red-400 hover:text-red-500 underline text-sm block mb-8 transition-colors'
          >
            {data.link}
          </a>
          <button className='text-gray-500 hover:text-gray-900 text-xs font-bold underline transition-colors'>
            Report Issue
          </button>
        </div>
      </div>

      <div className='w-full md:w-80 space-y-10'>
        <figure>
          <img
            src={data.images.dashboard}
            alt='Dashboard'
            className='rounded-xl w-full border border-gray-100 shadow-sm'
          />
          <figcaption className='text-center text-[10px] text-gray-400 mt-2 uppercase font-bold'>
            Dashboard
          </figcaption>
        </figure>
        <figure>
          <img
            src={data.images.gig}
            alt='Gig'
            className='rounded-xl w-full border border-gray-100 shadow-sm'
          />
          <figcaption className='text-center text-[10px] text-gray-400 mt-2 uppercase font-bold'>
            Gig Image
          </figcaption>
        </figure>
        <div>
          <h4 className='text-xs font-bold text-gray-800 mb-4'>
            More by <span className='text-purple-700'>{data.author}</span>
          </h4>
          <div className='grid grid-cols-3 gap-2'>
            {data.images.others.map((img, i) => (
              <img
                key={i}
                src={img}
                className='rounded-lg h-16 w-full object-cover border border-gray-50 cursor-pointer hover:opacity-80'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
