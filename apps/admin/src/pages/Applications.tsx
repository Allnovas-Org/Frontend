
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationDetails from "./ApplicationDetails";

export default function Applications() {
    const navigate = useNavigate();
    
const [statusFilter, setStatusFilter] = useState("all");

    
const [activeTab, setActiveTab] = useState("student");
const [showDetails, setShowDetails] = useState(false);
const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);
const [applicationNotes, setApplicationNotes] = useState<Record<number, string[]>>(() => {
  try {
    const savedNotes = localStorage.getItem("allnova-application-notes");
    return savedNotes ? JSON.parse(savedNotes) : {};
  } catch {
    return {};
  }
});
useEffect(() => {
  localStorage.setItem(
    "allnova-application-notes",
    JSON.stringify(applicationNotes)
  );
}, [applicationNotes]);
const [claimedApplications, setClaimedApplications] = useState<Record<number, boolean>>(() => {
  try {
    const savedClaims = localStorage.getItem("allnova-application-claims");
    return savedClaims ? JSON.parse(savedClaims) : {};
  } catch {
    return {};
  }
});
useEffect(() => {
  localStorage.setItem(
    "allnova-application-claims",
    JSON.stringify(claimedApplications)
  );
}, [claimedApplications]);

const [applicationStatuses, setApplicationStatuses] = useState<Record<number, string>>(() => {
  try {
    const savedStatuses = localStorage.getItem("allnova-application-statuses");
    return savedStatuses ? JSON.parse(savedStatuses) : {};
  } catch {
    return {};
  }
});
useEffect(() => {
  localStorage.setItem(
    "allnova-application-statuses",
    JSON.stringify(applicationStatuses)
  );
}, [applicationStatuses]);
const applications = [
  {
    id: 1,
    name: "Wade Warren",
    role: "Frontend Developer",
    company: "TechBridge Lagos",
    applied: "Jun 10, 2026",
    status: "Review",
    assigned: "Tunde A.",
    type: "student",
  },
  {
    id: 2,
    name: "Emma Johnson",
    role: "Mobile Developer",
    company: "Creative Hub Berlin",
    applied: "Jul 15, 2026",
    status: "Applied",
    assigned: "Unclaimed",
    type: "student",
  },
  {
    id: 3,
    name: "Liam Smith",
    role: "Backend Developer",
    company: "Innovatech New York",
    applied: "Aug 22, 2026",
    status: "Interview",
    assigned: "John D.",
    type: "student",
  },
  {
    id: 4,
    name: "Olivia Brown",
    role: "Data Analyst",
    company: "Design Studio Tokyo",
    applied: "Sep 5, 2026",
    status: "Rejected",
    assigned: "Alice K.",
    type: "student",
  },
  {
    id: 5,
    name: "Ava Wilson",
    role: "Data Scientist",
    company: "Creative Labs Sydney",
    applied: "Nov 18, 2026",
    status: "Offer",
    assigned: "Unclaimed",
    type: "student",
  },

{
  id: 6,
  name: "Daniel Carter",
  role: "Frontend Developer",
  company: "TechBridge Lagos",
  applied: "Jun 15, 2026",
  status: "Review",
  assigned: "Tunde A.",
  type: "freelancer",
},

{
  id: 7,
  name: "Sophia Martinez",
  role: "Full Stack Developer",
  company: "Design Factory Toronto",
  applied: "Dec 12, 2026",
  status: "Rejected",
  assigned: "Kevin P.",
  type: "freelancer",
},


{
  id: 8,
  name: "Mason Lee",
  role: "Cloud Engineer",
  company: "Digital Creations London",
  applied: "Jan 8, 2027",
  status: "Interview",
  assigned: "Emma T.",
  type: "freelancer",
},


{
  id: 9,
  name: "Isabella Garcia",
  role: "AI Developer",
  company: "Pixel Perfect Amsterdam",
  applied: "Feb 25, 2027",
  status: "Offer",
  assigned: "Unclaimed",
  type: "freelancer",
},


{
  id: 10,
  name: "Lucas Hall",
  role: "Systems Analyst",
  company: "NextGen Studios Chicago",
  applied: "Mar 15, 2027",
  status: "Interview",
  assigned: "Tunde A.",
  type: "freelancer",
},


{
  id: 11,
  name: "Charlotte Young",
  role: "Network Engineer",
  company: "Design Hub Hong Kong",
  applied: "Apr 20, 2027",
  status: "Offer",
  assigned: "Ethan S.",
  type: "freelancer",
},

];

const selectedApplicationData = applications.find(
  (application) => application.id === selectedApplicationId
);

const selectedApplication = selectedApplicationData
  ? {
      ...selectedApplicationData,
      status:
        applicationStatuses[selectedApplicationData.id] ??
        selectedApplicationData.status,
    }
  : undefined;


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Application management
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Review and manage student internship and freelancer job applications
      </p>
      
<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
  {[
    { title: "Total Applications", value: 248, badge: "This month" },
    { title: "Pending Review", value: 64, badge: "Needs attention" },
    { title: "Interviews", value: 32, badge: "This month" },
    { title: "Offers", value: 18, badge: "This month" },
  ].map((stat) => (
    <div
      key={stat.title}
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <p className="text-sm text-gray-500">{stat.title}</p>

      <h2 className="mt-4 text-3xl font-semibold text-gray-900">
        {stat.value}
      </h2>

      <span className="mt-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700">
        {stat.badge}
      </span>
    </div>
  ))}
</div>

<div className="mt-6 flex flex-wrap items-center justify-between gap-4">
  <div className="flex rounded-lg border border-gray-200 bg-white p-1">
    <button
      type="button"
      
onClick={() => setActiveTab("student")}

className={`rounded-md px-4 py-2 text-sm font-medium ${
  activeTab === "student"
    ? "bg-purple-700 text-white"
    : "text-gray-600"
}`}

    >
      Student Applications
    </button>

    <button
      type="button"
      
onClick={() => setActiveTab("freelancer")}

      
className={`rounded-md px-4 py-2 text-sm font-medium ${
  activeTab === "freelancer"
    ? "bg-purple-700 text-white"
    : "text-gray-600"
}`}

    >
      Freelancer Applications
    </button>
  </div>

  <select
    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
    
value={statusFilter}
onChange={(e) => setStatusFilter(e.target.value)}

  >
    <option value="all">All</option>
    <option value="applied">Applied</option>
    <option value="review">Review</option>
    <option value="interview">Interview</option>
    <option value="offer">Offer</option>
    <option value="rejected">Rejected</option>
  </select>
</div>

<div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
  <table className="w-full min-w-[900px] text-left text-sm">
    <thead className="bg-purple-50 text-gray-800">
      <tr>
        <th className="px-4 py-4 font-semibold">Applicant</th>
        <th className="px-4 py-4 font-semibold">Role</th>
        <th className="px-4 py-4 font-semibold">Company</th>
        <th className="px-4 py-4 font-semibold">Applied</th>
        <th className="px-4 py-4 font-semibold">Status</th>
        <th className="px-4 py-4 font-semibold">Assigned</th>
        <th className="px-4 py-4 font-semibold">Action</th>
      </tr>
    </thead>

    
<tbody className="divide-y divide-gray-100">
  
{applications
  
.filter(
  (application) =>
    application.type === activeTab &&
    (statusFilter === "all" ||
      (applicationStatuses[application.id] ?? application.status).toLowerCase() ===
        statusFilter)
)
  .map((application) => (

    <tr key={application.id} className="hover:bg-gray-50">
      <td className="px-4 py-4 font-medium text-gray-900">
        {application.name}
      </td>

      <td className="px-4 py-4">{application.role}</td>

      <td className="px-4 py-4">{application.company}</td>

      <td className="px-4 py-4 text-gray-600">
        {application.applied}
      </td>

      <td className="px-4 py-4">
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
          {applicationStatuses[application.id] ?? application.status}
        </span>
      </td>

      <td className="px-4 py-4">{application.assigned}</td>

      <td className="px-4 py-4">
        <button
          type="button"
          onClick={() => {
  setSelectedApplicationId(application.id);
  setShowDetails(true);
}}
          className="font-medium text-purple-700 hover:underline"
        >
          View
        </button>
      </td>
    </tr>
  ))}
</tbody>

  </table>
</div>

          {showDetails && selectedApplication && (
  <ApplicationDetails
    application={selectedApplication}
    notes={applicationNotes[selectedApplication.id] ?? []}
    isClaimed={claimedApplications[selectedApplication.id] ?? false}
    onAddNote={(newNote) => {
  setApplicationNotes((previousNotes) => ({
    ...previousNotes,
    [selectedApplication.id]: [
      ...(previousNotes[selectedApplication.id] ?? []),
      newNote,
    ],
  }));
}}
onClaim={() => {
  setClaimedApplications((previousClaims) => ({
    ...previousClaims,
    [selectedApplication.id]: true,
  }));
}}
onReject={() => {
  setApplicationStatuses((previousStatuses) => ({
    ...previousStatuses,
    [selectedApplication.id]: "Rejected",
  }));
}}    
onMoveToReview={() => {
  setApplicationStatuses((previousStatuses) => ({
    ...previousStatuses,
    [selectedApplication.id]: "Review",
  }));
}}
onClose={() => setShowDetails(false)}
  />
)}
    </div>
  );
}
