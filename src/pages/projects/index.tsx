import React, { useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import ProjectCard from "./ProjectCard";
import StatsCard from "./StatsCard";
import { ProjectCategory, ProjectStatus } from "../../types";
import { useDebounce } from "./hook/useDebounce";
import { BriefcaseBusiness, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import { getProjects } from "./store/project.store";

const Projects = () => {
  const [status, setStatus] = useState<string>("All Status");
  const [category, setCategory] = useState<string>("All Categories");
  const [search, setSearch] = useState("");
  const [projectList, setProjectList] = useState(getProjects());
  const debouncedSearch = useDebounce(search, 300);

  const navigate = useNavigate();

  const filteredProjects = useMemo(() => {
    const normalizedSearch = debouncedSearch.toLowerCase().trim();

    return projectList.filter((project) => {
      const matchesSearch =
        !normalizedSearch ||
        project.title.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        status === "All Status" || project.status === status;

      const matchesCategory =
        category === "All Categories" ||
        project.categories.includes(category as ProjectCategory);

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [debouncedSearch, status, category, projectList]);

  const handleProjectDeleted = () => {
    setProjectList(getProjects());
  };

  return (
    <section className='max-w-6xl mx-auto min-h-screen bg-white py-20 md:py-20 lg:py-32 px-4 md:px-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>My Projects</h1>
          <p className='text-sm text-gray-dark'>
            Manage and track all your freelance projects in one place
          </p>
        </div>

        <button
          className='rounded-lg bg-primary px-4 py-2 flex gap-2 text-sm text-white'
          onClick={() => navigate("/applicants/projects/post-job")}
        >
          <Plus className='w-4 h-4' /> Post New Job
        </button>
      </div>

      <div className='w-full mb-6 flex gap-4'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search jobs...'
          className='flex-1 w-full rounded-lg border border-input px-4 py-2 text-sm'
          aria-label='Search projects'
        />

        <div className='flex-1'>
          <Dropdown
            label={status}
            value={status}
            onChange={setStatus}
            options={[
              { label: "All Status", value: "All Status" },
              { label: "Active", value: "Active" },
              { label: "On hold", value: "On hold" },
              { label: "Completed", value: "Completed" },
            ]}
          />
        </div>

        <div className='flex-1'>
          <Dropdown
            label={category}
            value={category}
            onChange={setCategory}
            options={[
              { label: "All Categories", value: "All Categories" },
              { label: "Web Development", value: "Web Development" },
              {
                label: "Mobile App Development",
                value: "Mobile App Development",
              },
              {
                label: "Writing & Translation",
                value: "Writing & Translation",
              },
              {
                label: "Social Media Design & Management",
                value: "Social Media Design & Management",
              },
              { label: "Presentation Design", value: "Presentation Design" },
              {
                label: "Video Editing &Animation",
                value: "Video Editing &Animation",
              },
            ]}
          />
        </div>
      </div>

      <div className='mb-6 grid grid-cols-4 p-7 rounded-md gap-4 border border-input'>
        <StatsCard label='Total Jobs' value={projectList.length} />
        <StatsCard
          label='Active'
          value={projectList.filter((p) => p.status === "Active").length}
        />
        <StatsCard
          label='Total Applications'
          value={projectList.reduce((a, b) => a + b.applications, 0)}
        />
        <StatsCard label='Total Budget' value='$16.5K' />
      </div>

      <div className='space-y-4'>
        {filteredProjects.length === 0 ? (
          <EmptyState
            icon={<BriefcaseBusiness />}
            title='Oops! you don’t have a job post relating to this category.'
            description='You have no job posting on web development so far. Not to worry, you can put one up and get to work with the varieties of talents over the globe!'
            actionLabel='Post New Job'
            onAction={() => navigate("/applicants/projects/post-job")}
          />
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDeleted={handleProjectDeleted}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;

// Routes used while working
{
  /* <Route path='projects' element={<Projects />} />
<Route path='projects/post-job' element={<PostJob />} />
<Route path='projects/edit-job/:jobId' element={<PostJob />} />
<Route path='projects/:projectId' element={<ProjectDetails />} />
<Route path='projects/hire/:candidateId' element={<OfferFlow />} /> */
}
