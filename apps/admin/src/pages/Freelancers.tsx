
import { useState } from "react";


const getFreelancerStats = (list: typeof freelancers) => [
  { title: "Total Freelancers", value: list.length.toLocaleString() },
  { title: "Active Freelancers", value: list.filter((f) => f.status === "Active").length.toLocaleString() },
  { title: "Pending Verification", value: list.filter((f) => f.status === "Pending").length.toLocaleString() },
  { title: "Suspended Freelancers", value: list.filter((f) => f.status === "Suspended").length.toLocaleString() },
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
  
const [selectedFreelancerId, setSelectedFreelancerId] = useState<number | null>(null);

const [freelancerList, setFreelancerList] = useState(freelancers);



  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-900">
        Freelancers
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Manage Allnova freelancers and track their activities.
      </p>

      {/* Statistics cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        
{getFreelancerStats(freelancerList).map((stat) => (

          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

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

    </div>
  );
}
