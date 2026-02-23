import React from "react";
import { Project } from "../../../types";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Project;
}

export const ProjectHeader = ({ project }: Props) => {
  const navigate = useNavigate();

  return (
    <div className='flex items-start justify-between gap-4'>
      <div>
        <h1 className='text-xl font-semibold'>{project.title}</h1>
        <p className='text-sm text-gray-500'>{project.subtitle}</p>
      </div>

      <button
        onClick={() => navigate("/applicants/projects/post-job")}
        className='rounded-lg bg-primary px-4 py-2 text-sm text-white flex items-center'
      >
        <Plus className='w-4 h-4 mr-1' /> Post New Job
      </button>
    </div>
  );
};
