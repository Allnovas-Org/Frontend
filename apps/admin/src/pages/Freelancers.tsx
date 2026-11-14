
import { useEffect, useState } from "react";
import { UsersRound, GraduationCap, BriefcaseBusiness } from "lucide-react";



const getFreelancerStats = (list: Freelancer[]) => [
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

type Freelancer = {
  id: number;
  name: string;
  email: string;
  skill: string;
  projects: number;
  status: string;
  phone?: string;
  location?: string;
  jobTitle?: string;
  experience?: string;
  hourlyRate?: string;
  availability?: string;
  skills?: string[];
  bio?: string;
  photo?: string | null;
};
const freelancers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    skill: "UI/UX Design",
    projects: 12,
    hourlyRate: "120",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@example.com",
    skill: "Frontend Development",
    projects: 8,
    hourlyRate: "150",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    skill: "Graphic Design",
    projects: 5,
    hourlyRate: "85",
    status: "Pending",
  },
  {
    id: 4,
    name: "Grace Thompson",
    email: "grace@example.com",
    skill: "Content Writing",
    projects: 15,
    hourlyRate: "120",
    status: "Active",
  },
  {
    id: 5,
    name: "Daniel Smith",
    email: "daniel@example.com",
    skill: "Backend Development",
    projects: 3,
    hourlyRate: "100",
    status: "Suspended",
  },
];

export default function Freelancers() {
    
  const [searchTerm, setSearchTerm] = useState("");
  
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
const [selectedFreelancerId, setSelectedFreelancerId] = useState<number | null>(null);

const [freelancerList, setFreelancerList] = useState<Freelancer[]>(freelancers);
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
  phone: "",
location: "",
jobTitle: "",
experience: "",
hourlyRate: "",
availability: "Full Time",
skills: [] as string[],
bio: "",
});
 const [freelancerPhoto, setFreelancerPhoto] = useState<string | null>(null);

const handleAddFreelancer = () => {
 if (  
    !newFreelancer.name.trim() ||
    !newFreelancer.email.trim() ||
    newFreelancer.skills.length === 0
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
      skill: newFreelancer.skills.join(", "),
      phone: newFreelancer.phone.trim(),
location: newFreelancer.location.trim(),
jobTitle: newFreelancer.jobTitle.trim(),
experience: newFreelancer.experience.trim(),
hourlyRate: newFreelancer.hourlyRate.trim(),
availability: newFreelancer.availability,
skills: newFreelancer.skills,
bio: newFreelancer.bio.trim(),
photo: freelancerPhoto,
      projects: 0,
      status: "Pending",
    },
  ]);

 setNewFreelancer({
  name: "",
  email: "",
  skill: "",
  phone: "",
  location: "",
  jobTitle: "",
  experience: "",
  hourlyRate: "",
  availability: "Full Time",
  skills: [] as string[],
  bio: "",
});
setFreelancerPhoto(null);
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
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        
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
    {stat.title === "Active freelancer" ? (
  <UsersRound size={24} strokeWidth={1.8} />
) : stat.title === "Ongoing projects" ? (
  <GraduationCap size={24} strokeWidth={1.8} />
) : (
  <BriefcaseBusiness size={24} strokeWidth={1.8} />
)}
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
<div className="relative mt-5 mb-8 min-h-[220px] overflow-hidden rounded-xl bg-slate-900 p-6 text-white">
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

    <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-200">
      <span>♙ 10 hires this month</span>
      <span>◷ 18 hires this month</span>
    </div>
  </div>

  <div className="pointer-events-none absolute -bottom-36 -right-16 h-48 w-full rounded-[50%] bg-white/5" />
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
      

<div className="flex flex-wrap items-center gap-4">
  <input
    type="text"
    placeholder="Search freelancers by name, email, or skill..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600"
  />

  
</div>


      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 p-5">
          
          <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Active Talent Pool
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage all freelancers currently on the platform
          </p>
        </div>
        <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700"
>
  <option value="All">All</option>
  <option value="Active">Active</option>
  <option value="Pending">Pending</option>
  <option value="Suspended">Suspended</option>
</select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-50 text-gray-700">
              <tr>
                <th className="px-5 py-4 font-semibold">Freelancer</th>
                <th className="px-5 py-4 font-semibold">Skill</th>
                <th className="px-5 py-4 font-semibold">Projects</th>
                <th className="px-5 py-4 font-semibold">Earning</th>
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
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
      {freelancer.photo ? (
        <img
          src={freelancer.photo}
          alt={freelancer.name}
          className="h-full w-full object-cover"
        />
      ) : (
        freelancer.name.charAt(0).toUpperCase()
      )}
    </div>

    <div>
      <p className="font-medium text-gray-900">
        {freelancer.name}
      </p>
      <p className="text-xs text-gray-500">
        {freelancer.email}
      </p>
    </div>
  </div>
</td>

                  <td className="px-5 py-4 text-gray-600">
                    {freelancer.skill}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {freelancer.projects} Completed
                  </td>
<td className="px-5 py-4 text-gray-600">
  {freelancer.hourlyRate ? `$${freelancer.hourlyRate}` : "—"}
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
                      <span className="inline-flex items-center gap-1">
  <span className="text-xs">●</span>
  {freelancer.status}
</span>
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
    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
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
        <div className="mb-4">
  <label className="block text-sm font-semibold text-gray-800">
    Profile Picture
  </label>
  <label className="mt-3 inline-block cursor-pointer rounded-lg bg-purple-700 px-5 py-3 text-sm font-medium text-white">
  + Upload Photo
  <input
    type="file"
    accept="image/png,image/jpeg,image/gif"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setFreelancerPhoto(URL.createObjectURL(file));
      }
    }}
  />
</label>
{freelancerPhoto && (
  <img
    src={freelancerPhoto}
    alt="Freelancer profile preview"
    className="mt-3 h-24 w-24 rounded-full border border-gray-300 object-cover"
  />
)}
</div>
        <h3 className="mt-6 mb-4 text-base font-semibold text-gray-900">
  Personal Information
</h3>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <input
    type="tel"
    placeholder="Phone number"
    value={newFreelancer.phone}
    onChange={(e) =>
      setNewFreelancer({ ...newFreelancer, phone: e.target.value })
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />

  <input
    type="text"
    placeholder="Location"
    value={newFreelancer.location}
    onChange={(e) =>
      setNewFreelancer({ ...newFreelancer, location: e.target.value })
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />
</div>
<h3 className="mt-6 mb-4 text-base font-semibold text-gray-900">
  Professional Information
</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <input
    type="text"
    placeholder="Job title"
    value={newFreelancer.jobTitle}
    onChange={(e) =>
      setNewFreelancer({ ...newFreelancer, jobTitle: e.target.value })
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />

  <input
    type="text"
    placeholder="Years of experience"
    value={newFreelancer.experience}
    onChange={(e) =>
      setNewFreelancer({ ...newFreelancer, experience: e.target.value })
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />
</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <input
    type="text"
    placeholder="Hourly rate (USD)"
    value={newFreelancer.hourlyRate}
    onChange={(e) =>
      setNewFreelancer({ ...newFreelancer, hourlyRate: e.target.value })
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />

  <select
    value={newFreelancer.availability}
    onChange={(e) =>
      setNewFreelancer({ ...newFreelancer, availability: e.target.value })
    }
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
  >
    <option value="Full Time">Full Time</option>
    <option value="Part Time">Part Time</option>
    <option value="Internship">Internship</option>
    <option value="Contract">Contract</option>
    <option value="Freelance">Freelance</option>
  </select>
</div>
        <h3 className="mt-6 mb-3 text-sm font-semibold text-gray-900">
  Skills
</h3>
        <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Skill"
          value={newFreelancer.skill}
onChange={(e) =>
  setNewFreelancer({ ...newFreelancer, skill: e.target.value })
}
          className="w-full rounded-lg border border-gray-300 p-3"
        />
        <button
  type="button"
  onClick={() => {
    const skill = newFreelancer.skill.trim();
    if (!skill || newFreelancer.skills.includes(skill)) return;

    setNewFreelancer({
      ...newFreelancer,
      skills: [...newFreelancer.skills, skill],
      skill: "",
    });
  }}
  className="rounded-lg bg-purple-700 px-5 py-3 text-white"
>
  Add
</button>
</div>
<div className="mt-3 flex flex-wrap gap-2">
  {newFreelancer.skills.map((skill) => (
    <span
      key={skill}
      className="inline-flex items-center gap-2 rounded-lg bg-purple-100 px-3 py-2 text-sm text-purple-700"
    >
      {skill}
      <button
        type="button"
        onClick={() =>
          setNewFreelancer({
            ...newFreelancer,
            skills: newFreelancer.skills.filter((item) => item !== skill),
          })
        }
        className="font-bold text-purple-700"
        aria-label={`Remove ${skill}`}
      >
        ×
      </button>
    </span>
  ))}
</div>
<div className="mt-6">
  <label className="mb-2 block text-sm font-medium text-gray-800">
    Bio
  </label>
  <textarea
    placeholder="Tell us about yourself..."
    value={newFreelancer.bio}
    onChange={(e) =>
      setNewFreelancer({ ...newFreelancer, bio: e.target.value })
    }
    rows={4}
    className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3"
  />
</div>

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
    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
      <h2 className="text-xl font-bold text-gray-900">
        {editingProjectId !== null ? "Edit Project" : "Post New Project"}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {editingProjectId !== null
  ? "Update the details of this project."
  : "Enter the details of the new project."}
      </p>
      <h3 className="mt-6 mb-4 text-base font-semibold text-gray-900">
  Project Details
</h3>
      <label className="mb-2 block text-sm font-medium text-gray-700">
  Project Title *
</label>
      <input
  type="text"
  placeholder="e.g., Mobile App UI/UX Design"
  value={newProject.title}
onChange={(e) =>
  setNewProject({ ...newProject, title: e.target.value })
}
  className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3"
/>
<div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Company Name
  </label>
  <input
    type="text"
    placeholder="Your company name"
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />
</div>
<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Category *
  </label>
  <select
    defaultValue=""
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
  >
    <option value="" disabled>Select category</option>
    <option value="Designer">Designer</option>
    <option value="Developer">Developer</option>
    <option value="Content Writer">Content Writer</option>
    <option value="Web Designer">Web Designer</option>
    <option value="Mobile Designer">Mobile Designer</option>
    <option value="Brand Designer">Brand Designer</option>
    <option value="Freelance">Freelance</option>
  </select>
</div>
</div>
<h3 className="mt-8 mb-4 text-base font-semibold text-gray-900">
  Budget &amp; Timeline
</h3>
<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Budget Type *
  </label>
  <select
    defaultValue="Fixed price"
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
  >
    <option value="Fixed price">Fixed price</option>
    <option value="Hourly rate">Hourly rate</option>
  </select>
</div>
<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Budget Amount (USD) *
  </label>
  <input
    type="number"
    min="0"
    placeholder="$5,000"
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />
</div>
</div>
<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Project Duration
  </label>
  <input
    type="text"
    placeholder="e.g., 2-3 months"
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />
</div>
<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Location Preference
  </label>
  <select
    defaultValue=""
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
  >
    <option value="" disabled>
      Select location preference
    </option>
    <option value="Remote">Remote</option>
    <option value="Hybrid">Hybrid</option>
    <option value="On-site">On-site</option>
  </select>
</div>
</div>
<label className="mt-6 mb-2 block text-sm font-medium text-gray-700">
  Project Description *
</label>
<textarea
  placeholder="Describe your project in detail. What are you looking to achieve? What is the scope of work?"
  value={newProject.description}
onChange={(e) =>
  setNewProject({ ...newProject, description: e.target.value })
}
  rows={4}
  className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3"
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

<div className="mt-6">
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Requirements
  </label>
  <div className="flex items-center gap-2">
  <input
    type="text"
    placeholder="Add a requirement (press Enter)"
    className="w-full rounded-lg border border-gray-300 px-4 py-3"
  />
<button
  type="button"
  className="rounded-lg bg-gray-100 px-5 py-3 text-gray-700"
>
  + Add
</button>
</div>
</div>
      <div className="mt-6">
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Required Skills
  </label>
  <div className="flex items-center gap-2">
    <input
      type="text"
      placeholder="Add required skills (press Enter)"
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
    />
    <button
      type="button"
      className="rounded-lg bg-gray-100 px-5 py-3 text-gray-700"
    >
      Add
    </button>
  </div>
</div>
<div className="mt-8">
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Attachments (Optional)
  </label>

  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 text-center">
    <span className="text-3xl text-gray-400">↑</span>
    <span className="mt-2 text-sm text-gray-600">
      Click to upload a file
    </span>
    <span className="mt-1 text-xs text-gray-400">
      PDF, DOC, DOCX, PNG, JPG (max 10MB)
    </span>
    <input
      type="file"
      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
      className="hidden"
    />
  </label>
</div>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
      <button
        type="button"
        onClick={() => setShowPostProject(false)}
        className="mt-6 rounded-lg border border-gray-300 bg-white px-5 py-2 text-gray-700"
      >
        Cancel
        
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
</div>
)}
    </div>
  );
}
