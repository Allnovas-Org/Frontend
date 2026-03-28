import React from "react";
import { Project } from "../../../types";
import { Globe } from "lucide-react";
import { formatPostedDate } from "../../../utils/helpers";

export const ProjectDescription = ({ project }: { project: Project }) => {
  return (
    <div className='space-y-6'>
      <div className='flex gap-4 text-sm text-gray-500'>
        <span className='text-input'>{formatPostedDate(project.postedAt)}</span>
        <span className='text-gray-dark '>
          <Globe className='w-4 h-4 inline-block' /> {project.location}
        </span>
      </div>

      <section>
        <h3 className='font-semibold'>About the role</h3>
        <p className='mt-2 text-sm text-gray-400 leading-relaxed'>
          {project.description}
        </p>
      </section>

      <section>
        <h3 className='font-semibold'>Qualification</h3>
        <ul className='mt-2 list-disc pl-5 text-sm text-gray-400'>
          {project.qualifications.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </section>

      {project.responsibilities && project.responsibilities.length > 0 && (
        <section>
          <h3 className='font-semibold'>Responsibilities</h3>
          <ul className='mt-2 list-disc pl-5 text-sm text-gray-400'>
            {project.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className='font-semibold'>Required Skills</h3>
        <div className='mt-2 flex flex-wrap gap-2'>
          {project.skills.map((skill) => (
            <span
              key={skill}
              className='px-1 py-1 rounded-lg border border-input text-[8px] text-gray-700 bg-gray-50'
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
