
import { useEffect, useState } from "react";



const getFreelancerStats = (list: typeof freelancers) => [
  {
    title: "Active freelancer",
    value: list.filter((f) => f.status === "Active").length.toLocaleString(),
  },
  {
    title: "Ongoing projects",
    value: "48",
  },
  {
    title: "Freelancer earning",
    value: "1,240",
  },
];

const freelancers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    skill: "UI/UX Design",
    projects: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@example.com",
    skill: "Frontend Development",
    projects: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    skill: "Graphic Design",
    projects: 5,
    status: "Pending",
  },
  {
    id: 4,
    name: "Grace Thompson",
    email: "grace@example.com",
    skill: "Content Writing",
    projects: 15,
    status: "Active",
  },
  {
    id: 5,
    name: "Daniel Smith",
    email: "daniel@example.com",
    skill: "Backend Development",
    projects: 3,
    status: "Suspended",
  },
];

export default function Freelancers() {
    
  const [searchTerm, setSearchTerm] = useState("");
  
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
const [selectedFreelancerId, setSelectedFreelancerId] = useState<number | null>(null);

const [freelancerList, setFreelancerList] = useState(freelancers);
const [showAddFreelancer, setShowAddFreelancer] = useState(false);
const [showPostProject, setShowPostProject] = useState(false);
const [newProject, setNewProject] = useState({
  title: "",
  description: "",
  budget: "",
  deadline: "",
});
const [projectList, setProjectList] = useState<
  {
    id: number;
    title: string;
    description: string;
    budget: string;
    deadline: string;
  }[]
>(() => {
  try {
    const saved = localStorage.getItem("allnova_admin_projects");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});
const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
useEffect(() => {
  localStorage.setItem(
    "allnova_admin_projects",
    JSON.stringify(projectList)
  );
}, [projectList]);
const [newFreelancer, setNewFreelancer] = useState({
    
  name: "",
  email: "",
  skill: "",
});
const handleAddFreelancer = () => {
  if (
    !newFreelancer.name.trim() ||
    !newFreelancer.email.trim() ||
    !newFreelancer.skill.trim()
  ) {
    alert("Please fill in all fields.");
    return;
  }

  setFreelancerList((previous) => [
    ...previous,
    {
      id: Date.now(),
      name: newFreelancer.name.trim(),
      email: newFreelancer.email.trim(),
      skill: newFreelancer.skill.trim(),
      projects: 0,
      status: "Pending",
    },
  ]);

  setNewFreelancer({
    name: "",
    email: "",
    skill: "",
  });

  setShowAddFreelancer(false);
};


  return (
    <div className="w-full">
      <div className="flex flex-wrap items-start justify-between gap-4">
  <div>
    <h1 className="text-2xl font-bold text-gray-900">
      Freelancers
    </h1>

    <p className="mt-2 text-sm text-gray-500">
      Manage freelancers, projects, and talent activities.
    </p>
  </div>

  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      onClick={() => setShowAddFreelancer(true)}
      className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
    >
      + Add freelancer
    </button>

    <button
      type="button"
      onClick={() => {
  setEditingProjectId(null);
  setNewProject({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });
  setShowPostProject(true);
}}
      className="rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-purple-50"
    >
      + Post project
    </button>
  </div>
</div>

      {/* Statistics cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        
{getFreelancerStats(freelancerList).map((stat) => (

          <div
            key={stat.title}
            className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            
<div className="absolute right-5 top-5">
  <div
    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
      stat.title === "Active freelancer"
        ? "bg-purple-100 text-purple-600"
        : stat.title === "Ongoing projects"
          ? "bg-pink-100 text-pink-600"
          : "bg-green-100 text-green-700"
    }`}
  >
    <span className="text-2xl">
      {stat.title === "Active freelancer"
        ? "♙"
        : stat.title === "Ongoing projects"
          ? "✧"
          : "▣"}
    </span>
  </div>
</div>

            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {stat.value}
            </h2>
            <p className="mt-5 text-sm text-gray-500">
  <span className="mr-2 font-semibold text-teal-500">
    ↗ {stat.title === "Freelancer earning" ? "1.8%" : "1.3%"}
  </span>
  {stat.title === "Freelancer earning"
    ? "Up from yesterday"
    : "Up from past week"}
</p>
          </div>
        ))}
      </div>

      {/* Top Hiring Partner */}
<div className="relative mt-5 mb-8 overflow-hidden rounded-xl bg-slate-900 p-6 text-white">
  <div className="relative z-10">
    <p className="text-sm text-gray-200">
      <span className="mr-2 text-yellow-400">★</span>
      Top Hiring Partner
    </p>

    <h2 className="mt-3 text-3xl font-bold">
      Stripe
    </h2>

    <p className="mt-2 max-w-md text-sm text-gray-300">
      Actively hiring frontend and backend talents through the
      Allnova ecosystem.
    </p>

    <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-200">
      <span>♙ 10 hires this month</span>
      <span>◷ 18 hires this month</span>
    </div>
  </div>

  <div className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-full rounded-[50%] bg-white/10" />
</div>
      {projectList.length > 0 && (
  <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
    <h2 className="text-lg font-semibold text-gray-900">
      Posted Projects
    </h2>
    <p className="mt-1 text-sm text-gray-500">
      Projects added from the Post Project form.
    </p>

    <div className="mt-4 space-y-3">
      {projectList.map((project) => (
        <div
          key={project.id}
          className="rounded-lg border border-gray-200 p-4"
        >
          <h3 className="font-semibold text-gray-900">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {project.description}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Budget: ${project.budget} | Deadline: {project.deadline}
          </p>
        <button
  type="button"
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjectList((previous) =>
        previous.filter((item) => item.id !== project.id)
      );
    }
  }}
  className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
>
  Delete Project
</button>
        <button
  type="button"
  onClick={() => {
    setEditingProjectId(project.id);
    setNewProject({
  title: project.title,
  description: project.description,
  budget: project.budget,
  deadline: project.deadline,
});
setShowPostProject(true);
  }}
  className="ml-3 mt-3 rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white"
>
  Edit Project
</button>
        </div>
      ))}
    </div>
  </div>
)}
      {/* Freelancers table */}
      

<div className="mb-4 flex flex-wrap items-center gap-4">
  <input
    type="text"
    placeholder="Search freelancers by name, email, or skill..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-purple-600"
  >
    <option value="All">All Statuses</option>
    <option value="Active">Active</option>
    <option value="Pending">Pending</option>
    <option value="Suspended">Suspended</option>
  </select>
  <select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm"
>
  <option value="All">All Categories</option>
  <option value="Design">Design</option>
  <option value="Developer">Developer</option>
  <option value="Data & AI">Data & AI</option>
  <option value="Product Management">Product Management</option>
  <option value="Content Writing">Content Writing</option>
  <option value="Social Media">Social Media</option>
  <option value="No-Code">No-Code</option>
  <option value="Quality Assurance">Quality Assurance</option>
</select>
</div>


      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">
            All Freelancers
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage registered freelancers.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Freelancer</th>
                <th className="px-5 py-4 font-semibold">Skill</th>
                <th className="px-5 py-4 font-semibold">Projects</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              
{freelancerList
  .filter((freelancer) => {
    const search = searchTerm.toLowerCase().trim();
    
    if (statusFilter !== "All" && freelancer.status !== statusFilter) {
      return false;
    }
if (categoryFilter !== "All") {
  const skill = freelancer.skill.toLowerCase();
  const category = categoryFilter.toLowerCase();

  const matchesCategory =
  category === "developer"
    ? skill.includes("develop") || skill.includes("programmer")
    : skill.includes(category);

if (!matchesCategory) {
    return false;
  }
}

    return (
      freelancer.name.toLowerCase().includes(search) ||
      freelancer.email.toLowerCase().includes(search) ||
      freelancer.skill.toLowerCase().includes(search)
    );
  })
  .map((freelancer) => (

                <tr
                  key={freelancer.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {freelancer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {freelancer.email}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {freelancer.skill}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {freelancer.projects}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        freelancer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : freelancer.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {freelancer.status}
                    </span>
                  </td>

                  
<td className="px-5 py-4">
  <button
    type="button"
    onClick={() => setSelectedFreelancerId(freelancer.id)}
    className="text-sm font-medium text-purple-700 hover:underline"
  >
    View
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
{selectedFreelancerId !== null && (() => {
  const freelancer = freelancerList.find(
    (item) => item.id === selectedFreelancerId
  );

  if (!freelancer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Freelancer Profile
          </h2>

          <button
            type="button"
            onClick={() => setSelectedFreelancerId(null)}
            className="text-2xl text-gray-500 hover:text-gray-900"
            aria-label="Close freelancer profile"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <p><strong>Name:</strong> {freelancer.name}</p>
          <p><strong>Email:</strong> {freelancer.email}</p>
          <p><strong>Skill:</strong> {freelancer.skill}</p>
          <p><strong>Projects:</strong> {freelancer.projects}</p>
          <p><strong>Status:</strong> {freelancer.status}</p>
          
{freelancer.status === "Pending" && (
  <button
    type="button"
    onClick={() => {
      setFreelancerList((previous) =>
        previous.map((item) =>
          item.id === freelancer.id
            ? { ...item, status: "Active" }
            : item
        )
      );
    }}
    className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
  >
    Approve Freelancer
  </button>
)}

{freelancer.status === "Active" && (
  <button
    type="button"
    onClick={() => {
      setFreelancerList((previous) =>
        previous.map((item) =>
          item.id === freelancer.id
            ? { ...item, status: "Suspended" }
            : item
        )
      );
    }}
    className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
  >
    Suspend Freelancer
  </button>
)}

{freelancer.status === "Suspended" && (
  <button
    type="button"
    onClick={() => {
      setFreelancerList((previous) =>
        previous.map((item) =>
          item.id === freelancer.id
            ? { ...item, status: "Active" }
            : item
        )
      );
    }}
    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
  >
    Reactivate Freelancer
  </button>
)}



        </div>

        <button
          type="button"
          onClick={() => setSelectedFreelancerId(null)}
          className="mt-6 rounded-lg bg-purple-700 px-5 py-2 text-sm font-medium text-white hover:bg-purple-800"
        >
          Close
        </button>
      </div>
    </div>
  );
})()}
{showAddFreelancer && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Add Freelancer
        </h2>

        <button
          type="button"
          onClick={() => setShowAddFreelancer(false)}
          className="text-2xl text-gray-500 hover:text-gray-900"
        >
          ×
        </button>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Enter the details of the new freelancer.
      </p>

      <div className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Full name"
          value={newFreelancer.name}
onChange={(e) =>
  setNewFreelancer({ ...newFreelancer, name: e.target.value })
}
          className="w-full rounded-lg border border-gray-300 p-3"
        />

        <input
          type="email"
          placeholder="Email address"
          value={newFreelancer.email}
onChange={(e) =>
  setNewFreelancer({ ...newFreelancer, email: e.target.value })
}
          className="w-full rounded-lg border border-gray-300 p-3"
        />

        <input
          type="text"
          placeholder="Skill"
          value={newFreelancer.skill}
onChange={(e) =>
  setNewFreelancer({ ...newFreelancer, skill: e.target.value })
}
          className="w-full rounded-lg border border-gray-300 p-3"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowAddFreelancer(false)}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAddFreelancer}
            className="rounded-lg bg-purple-700 px-4 py-2 text-white"
          >
            Add Freelancer
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    {showPostProject && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
      <h2 className="text-xl font-bold text-gray-900">
        {editingProjectId !== null ? "Edit Project" : "Post New Project"}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {editingProjectId !== null
  ? "Update the details of this project."
  : "Enter the details of the new project."}
      </p>
      <input
  type="text"
  placeholder="Project title"
  value={newProject.title}
onChange={(e) =>
  setNewProject({ ...newProject, title: e.target.value })
}
  className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3"
/>
<textarea
  placeholder="Project description"
  value={newProject.description}
onChange={(e) =>
  setNewProject({ ...newProject, description: e.target.value })
}
  rows={4}
  className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3"
/>
<input
  type="number"
  placeholder="Project budget ($)"
  min="0"
  className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3"
  value={newProject.budget}
onChange={(e) =>
  setNewProject({ ...newProject, budget: e.target.value })
}
/>
<div className="mt-4">
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Project deadline
  </label>
  <input
    type="date"
    value={newProject.deadline}
onChange={(e) =>
  setNewProject({ ...newProject, deadline: e.target.value })
}
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
    
  />
</div>

      <button
        type="button"
        onClick={() => setShowPostProject(false)}
        className="mt-6 rounded-lg bg-purple-700 px-5 py-2 text-white"
      >
        Close
      </button>
      <button
  type="button"
  onClick={() => {
    if (!newProject.title.trim()) {
      alert("Please enter a project title.");
      return;
    }

   if (editingProjectId !== null) {
  setProjectList((previous) =>
    previous.map((project) =>
      project.id === editingProjectId
        ? {
            ...project,
            title: newProject.title.trim(),
            description: newProject.description.trim(),
            budget: newProject.budget,
            deadline: newProject.deadline,
          }
        : project
    )
  );
} else {
  setProjectList((previous) => [
    ...previous,
    {
      id: Date.now(),
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      budget: newProject.budget,
      deadline: newProject.deadline,
    },
  ]);
}
    alert(
  editingProjectId !== null
    ? "Project updated successfully!"
    : "Project created successfully!"
);
    setShowPostProject(false);
    setEditingProjectId(null);
  }}
  className="ml-3 rounded-lg bg-green-600 px-5 py-2 text-white"
>
  {editingProjectId !== null ? "Save Changes" : "Post Project"}
</button>
    </div>
  </div>
)}
    </div>
  );
}
