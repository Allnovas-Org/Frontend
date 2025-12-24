import React, { useState } from "react";
import { Pencil, MoveUpRight } from "lucide-react";
import Pagination from "../../../components/Pagination";
import ProjectModalSteps from "./ProjectModalSteps";
import ProfileModal from "../modals/PersonalInfoEditModal";
import ProjectDetail from "./ProjectDetail";
import { ProjectData } from "../../../types";

const MOCK_PROJECTS: ProjectData[] = [
  {
    title: "E-commerce Dashboard",
    description:
      "A modern dashboard for managing e-commerce analytics, sales, and inventory.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    publishDate: "2025-05-01",
    link: "ecommerce-dashboard.com",
    author: "Ajayi Samuel",
    images: {
      dashboard: "/images/applicants/proj1.png",
      gig: "/images/applicants/proj2.png",
      others: [
        "/images/applicants/proj3.png",
        "/images/applicants/proj2.png",
        "/images/applicants/proj1.png",
      ],
    },
  },
];

interface ProjectsSectionProps {
  showEdit?: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ showEdit }) => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const total = 2;
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-base font-semibold text-gray-800'>Project</h3>
          <p className='text-xs text-input'>Projects from Ajayi Samuel</p>
        </div>
        {showEdit && (
          <button
            className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'
            onClick={() => setOpen(true)}
          >
            <span className='sr-only'>Edit Projects</span>
            <Pencil className='w-4 h-4 text-gray-600' />
          </button>
        )}
      </div>
      <ProjectModalSteps
        open={open}
        onClose={() => setOpen(false)}
        onSave={(_project) => {}}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {MOCK_PROJECTS.map((project, i) => (
          <div
            key={i}
            className='relative group rounded-lg overflow-hidden shadow-md'
          >
            <img
              src={project.images.dashboard}
              alt={project.title}
              className='w-full h-72 object-cover'
            />
            <div className='absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-35 transition'></div>
            <button
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-gray-lighter font-semibold text-sm gap-2 flex items-center px-8 py-2 rounded-lg shadow-lg'
              style={{ zIndex: 2 }}
              onClick={() => setSelectedProject(project)}
            >
              View
              <MoveUpRight className='w-4 h-4' />
            </button>
          </div>
        ))}
      </div>
      <ProfileModal
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ""}
        subtitle={selectedProject?.author ? `By ${selectedProject.author}` : ""}
        className='max-w-6xl'
      >
        {selectedProject && <ProjectDetail data={selectedProject} />}
      </ProfileModal>
      <div className='flex justify-end mt-4'>
        <Pagination current={page} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default ProjectsSection;
