
import { useState } from "react";
import { Eye, MoreVertical, CalendarDays, Tag, Plus } from "lucide-react";

type ProjectType = "student" | "freelancer";

type Project = {
  id: number;
  title: string;
  description: string;
  type: ProjectType;
  owner: string;
  progress: number;
  budget: string;
  deadline: string;
  category: string;
  status: string;
};

const owners = [
  "Alex Johnson",
  "Sarah Mitchell",
  "Dianne Russell",
  "Alex Johnson",
  "Albert Flores",
  "Jerome Bell",
  "Marvin McKinney",
  "Cody Fisher",
  "Robert Fox",
  "Kristin Watson",
  "Leslie Alexander",
  "Jane Cooper",
];

const projects: Project[] = Array.from({ length: 12 }, (_, index) => {
  
const isStudent = index % 2 === 0;


  return {
    id: index + 1,
    title: isStudent
      ? "E-commerce Website Development"
      : "Mobile App UI/UX Design",
    description: isStudent
      ? "Build a modern e-commerce platform with React and Node.js"
      : "Design a fitness tracking mobile application",
    type: isStudent ? "student" : "freelancer",
    owner: owners[index],
    progress: isStudent ? 65 : 45,
    budget: "$2,500",
    deadline: "Jul 15, 2026",
    category: "Web Development",
    status: "Active",
  };
});

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All Projects");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    const matchesTab =
      activeTab === "All Projects" ||
      (activeTab === "Students" && project.type === "student") ||
      (activeTab === "Freelancers" && project.type === "freelancer");

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesTab && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Projects Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all student and freelancer projects
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-white p-1">
          {["All Projects", "Students", "Freelancers"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-3 py-2 text-xs font-medium ${
                activeTab === tab
                  ? "border border-purple-300 bg-purple-50 text-purple-700"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab} (
              {tab === "All Projects"
                ? projects.length
                : projects.filter(
                    (p) =>
                      p.type ===
                      (tab === "Students" ? "student" : "freelancer")
                  ).length}
              )
            </button>
          ))}
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600"
        >
          
<option value="All">All Status</option>
<option value="Active">Active</option>
<option value="Pending">Pending</option>
<option value="Completed">Completed</option>
<option value="Cancel">Cancel</option>

        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-purple-700 px-2 py-1 text-xs font-medium text-white">
                  {project.status}
                </span>
                <span className="rounded-full border border-gray-200 px-2 py-1 text-xs capitalize text-gray-700">
                  {project.type}
                </span>
              </div>
              <MoreVertical size={18} className="text-gray-700" />
            </div>

            <h2 className="text-sm font-semibold text-gray-900">
              {project.title}
            </h2>
            <p className="mt-1 min-h-10 text-xs leading-5 text-gray-400">
              {project.description}
            </p>

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Progress</span>
              <span className="font-semibold text-gray-900">
                {project.progress}%
              </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-purple-700"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                {project.owner
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">
                  {project.owner}
                </p>
                <p className="text-xs text-gray-400">Project Owner</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>{project.budget}</span>
              <span className="flex items-center gap-1">
                <CalendarDays size={13} />
                {project.deadline}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <Tag size={13} />
              {project.category}
            </div>

            <button
              type="button"
             onClick={() => window.location.href = `/admin/projects/${project.id}`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Eye size={16} />
              View Project
            </button>
           
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-500">
          No projects match this filter.
        </p>
      )}
    </div>
  );
}
