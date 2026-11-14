import { useState } from "react";
import {
  Pencil,
  CircleCheck,
  CircleX,
  CalendarDays,
  Clock3,
  Tag,
  DollarSign,
} from "lucide-react";

export default function ProjectDetails() {
 const [activeModal, setActiveModal] = useState<
  "edit" | "approve" | "reject" | "owner" | null
>(null);
  const [projectTitle, setProjectTitle] = useState(() => {
  return localStorage.getItem("allnova-project-title") || "Mobile App UI/UX Design";
});
  const [editedTitle, setEditedTitle] = useState(projectTitle);
  const [projectStatus, setProjectStatus] = useState(() => {
  return localStorage.getItem("allnova-project-status") || "Active";
});
  const [editedStatus, setEditedStatus] = useState(projectStatus);
 const [projectCategory, setProjectCategory] = useState(() => {
  return localStorage.getItem("allnova-project-category") || "Design";
});
const [editedCategory, setEditedCategory] = useState(projectCategory);
const [projectBudget, setProjectBudget] = useState(() => {
  return Number(localStorage.getItem("allnova-project-budget") ?? 1800);
});

const [editedBudget, setEditedBudget] = useState(projectBudget);
const [projectDeadline, setProjectDeadline] = useState(() => {
  return localStorage.getItem("allnova-project-deadline") || "2026-06-25";
});

const [editedDeadline, setEditedDeadline] = useState(projectDeadline);
const [projectDescription, setProjectDescription] = useState(() => {
  return (
    localStorage.getItem("allnova-project-description") ||
    "Design a fitness tracking mobile application"
  );
});

const [editedDescription, setEditedDescription] = useState(projectDescription);
const [projectProgress, setProjectProgress] = useState(() => {
  return Number(localStorage.getItem("allnova-project-progress") ?? 40);
});
const [editedProgress, setEditedProgress] = useState(projectProgress);
const [rejectionReason, setRejectionReason] = useState("");
const [approvalNotes, setApprovalNotes] = useState("");
    return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-900">
              {projectTitle}
            </h1>

            <span className="rounded-md bg-purple-700 px-3 py-1 text-xs font-medium text-white">
              {projectStatus}
            </span>

            <span className="rounded-full border border-gray-200 px-3 py-1 text-xs">
              Student
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Project ID: #2 • Created on June 25, 2026
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setActiveModal("edit")}className="flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm">
            <Pencil size={16} /> Edit
          </button>

         <button
  onClick={() => {
    setApprovalNotes("");
    setActiveModal("approve");
  }}
  className="flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm"
>
            <CircleCheck size={16} /> Approve
          </button>

         <button
  onClick={() => {
    setRejectionReason("");
    setActiveModal("reject");
  }}
  className="flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm"
>
            <CircleX size={16} /> Reject
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
      <div className="max-w-3xl rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-6 font-semibold text-gray-900">
          Project Overview
        </h2>

        <h3 className="mb-2 font-medium">Description</h3>

        <p className="text-sm text-gray-500">
  {projectDescription}
</p>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-semibold">{projectProgress}%</span>
          </div>

          <div className="h-2 rounded-full bg-gray-200">
            <div
  className="h-2 rounded-full bg-slate-950"
  style={{ width: `${Math.max(0, Math.min(100, projectProgress))}%` }}
/>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 border-t pt-6">
          <div className="flex items-center gap-3">
            <DollarSign className="text-gray-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Budget</p>
              <p className="font-medium">${projectBudget.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="text-gray-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Deadline</p>
              <p className="font-medium">
  {new Date(projectDeadline + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>
            </div>
          </div>




          <div className="flex items-center gap-3">
            <Tag className="text-gray-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">{projectCategory}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock3 className="text-gray-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">45 days</p>
            </div>
          </div>
        </div>
      </div>
    <div className="mt-6 max-w-3xl rounded-xl border border-gray-200 bg-white p-6">
  <h2 className="mb-6 font-semibold text-gray-900">
    Milestones & Timeline
  </h2>

  <div className="space-y-6 border-l-2 border-gray-200 pl-6">
    {[
      { name: "Requirements Gathering", date: "May 15, 2026", done: true },
      { name: "Design Phase", date: "May 28, 2026", done: true },
      { name: "Development", date: "June 10, 2026", done: false },
      { name: "Testing & QA", date: "July 1, 2026", done: false },
      { name: "Deployment", date: "July 15, 2026", done: false },
    ].map((milestone) => (
      <div key={milestone.name} className="relative flex items-start justify-between gap-4">
        <span
          className={`absolute -left-[33px] top-1 h-4 w-4 rounded-full border-2 ${
            milestone.done
              ? "border-slate-950 bg-slate-950"
              : "border-gray-400 bg-white"
          }`}
        />

        <div>
          <p className="text-sm font-medium text-gray-800">
            {milestone.name}
          </p>

          {milestone.name === "Development" && (
            <p className="mt-1 text-xs text-gray-500">
              Currently in progress
            </p>
          )}
        </div>

        <span className="text-xs text-gray-500">
          {milestone.date}
        </span>
      </div>
    ))}
  </div>
</div>
   
         {/* Deliverables & Files */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          Deliverables & Files
        </h2>

        {[
          { name: "Project Proposal.pdf", details: "2.4 MB • May 10, 2026" },
          { name: "Design Mockups.pdf", details: "5.1 MB • May 25, 2026" },
          { name: "Technical Specifications.docx", details: "1.8 MB • June 1, 2026" },
        ].map((file) => (
          <div
            key={file.name}
            className="mb-3 flex items-center justify-between rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-3">
                <span>📄</span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{file.details}</p>
              </div>
            </div>

            <button
              type="button"
              className="text-sm font-medium text-gray-900 hover:text-purple-700"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    
    </div>


<div className="xl:col-span-1 space-y-6 self-start">
<div className="xl:col-span-1 self-start rounded-xl border border-gray-200 bg-white p-5">
  <h2 className="mb-6 text-base font-semibold text-gray-900">
    Project Owner
  </h2>

  <div className="flex items-center gap-3 border-b border-gray-200 pb-5">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
      SM
    </div>

    <div>
      <p className="text-sm font-semibold text-gray-900">
        Sarah Mitchell
      </p>
      <p className="text-xs text-gray-500">Freelancer</p>
    </div>
  </div>

  <div className="mt-5 space-y-3 text-sm text-gray-500">
    <p>ID: USER-2190</p>
    <p>15 Projects Completed</p>
  </div>

  <button
    type="button"
    onClick={() => setActiveModal("owner")}
    className="mt-5 w-full rounded-md border border-gray-200 py-2 text-sm font-medium hover:bg-gray-50"
  >
    View Profile
  </button>
</div>

    

<div className="mt-6 max-w-4xl rounded-xl border border-gray-200 bg-white p-6">
  <h2 className="mb-5 text-base font-semibold text-gray-900">
    Recent Activity
  </h2>

  <div className="space-y-4 text-sm">
    <div className="border-b border-gray-100 pb-3">
      <p className="font-medium text-gray-900">
        Project created
      </p>
      <p className="mt-1 text-xs text-gray-500">
        June 25, 2026
      </p>
    </div>

    <div className="border-b border-gray-100 pb-3">
      <p className="font-medium text-gray-900">
        Project proposal uploaded
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Project document added
      </p>
    </div>

    <div>
      <p className="font-medium text-gray-900">
        Project progress updated to 40%
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Development in progress
      </p>
    </div>
  </div>
</div>

<div className="rounded-xl border border-gray-200 bg-white p-5">
  <h2 className="mb-5 text-base font-semibold text-gray-900">
    Quick Actions
  </h2>

  <div className="space-y-3">
    <button type="button" className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
      Send Message
    </button>

    <button type="button" className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
      Schedule Meeting
    </button>

    <button type="button" className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
      Generate Report
    </button>
  </div>
</div>
</div>
</div>

{activeModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-lg font-semibold">
        {activeModal === "edit"
          ? "Edit Project"
          : activeModal === "approve"
          ? "Approve Project"
          : activeModal === "reject"
  ? "Reject Project"
  : "Project Owner Profile"}
      </h2>
{activeModal === "edit" && (
    <>
  <div className="mb-4">
    <label className="mb-2 block text-sm font-medium text-gray-900">
      Project Title *
    </label>
    <input
      type="text"
      value={editedTitle}
onChange={(e) => setEditedTitle(e.target.value)}
      className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm"
    />
  </div>
<div className="mb-4 grid grid-cols-2 gap-3">
  <div>
    <label className="mb-2 block text-sm font-medium">
      Status *
    </label>
    <select
      value={editedStatus}
onChange={(e) => setEditedStatus(e.target.value)}
      className="w-full rounded-md border border-gray-200 p-3 text-sm"
    >
      <option>Active</option>
      <option>Pending</option>
      <option>Completed</option>
      <option>Cancelled</option>
      <option>Rejected</option>
    </select>
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      Category *
    </label>
    <select
      value={editedCategory}
onChange={(e) => setEditedCategory(e.target.value)}
      className="w-full rounded-md border border-gray-200 p-3 text-sm"
    >
      <option>Design</option>
      <option>Development</option>
      <option>Marketing</option>
      <option>Other</option>
    </select>
  </div>
</div>
<div className="mb-4">
  <label className="mb-2 block text-sm font-medium text-gray-900">
    User Name *
  </label>
  <input
    type="text"
    placeholder="Enter user name"
    className="w-full rounded-md border border-gray-200 p-3 text-sm"
  />
</div>
<div className="mb-4">
  <label className="mb-2 block text-sm font-medium text-gray-900">
    User Email *
  </label>
  <input
    type="email"
    placeholder="user@example.com"
    className="w-full rounded-md border border-gray-200 p-3 text-sm"
  />
</div>
<div className="mb-4">
  <label className="mb-2 block text-sm font-medium text-gray-900">
    Budget ($) *
  </label>
  <input
    type="number"
    min="0"
    value={editedBudget}
onChange={(e) => setEditedBudget(Number(e.target.value))}
    className="w-full rounded-md border border-gray-200 p-3 text-sm"
  />
</div>
<div className="mb-4">
  <label className="mb-2 block text-sm font-medium text-gray-900">
    Progress (%) *
  </label>
  <input
    type="number"
    min="0"
    max="100"
    value={editedProgress}
    onChange={(e) =>
      setEditedProgress(Number(e.target.value))
    }
    className="w-full rounded-md border border-gray-200 p-3 text-sm"
  />
</div>
<div className="mb-4">
  <label className="mb-2 block text-sm font-medium text-gray-900">
    Deadline *
  </label>
  <input
    type="date"
    value={editedDeadline}
onChange={(e) => setEditedDeadline(e.target.value)}
    className="w-full rounded-md border border-gray-200 p-3 text-sm"
  />
</div>
<div className="mb-4">
  <label className="mb-2 block text-sm font-medium text-gray-900">
    Description *
  </label>
  <textarea
    rows={3}
    value={editedDescription}
onChange={(e) => setEditedDescription(e.target.value)}
    className="w-full rounded-md border border-gray-200 p-3 text-sm"
  />
</div>
<div className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-3">
  <p className="mb-2 text-sm font-semibold">
    Project Owner Information
  </p>
  <p className="text-sm text-gray-500">
    Owner: Sarah Mitchell
  </p>
  <p className="text-sm text-gray-500">
    Type: Freelancer
  </p>
  <p className="mt-1 text-xs italic text-gray-400">
    Note: Owner details cannot be changed here
  </p>
</div>
</>
)}
      {activeModal === "edit" && (
      <button
        type="button"
        onClick={() => {
  setEditedTitle(projectTitle);
  setEditedStatus(projectStatus);
  setEditedCategory(projectCategory);
  setEditedBudget(projectBudget);
  setEditedProgress(projectProgress);
  setEditedDeadline(projectDeadline);
setEditedDescription(projectDescription);
  setActiveModal(null);
}}
        className="rounded-md border border-gray-200 px-4 py-2"
      >
        Cancel
      </button>
      )}
    {activeModal === "edit" && (
  <button
    type="button"
    onClick={() => {
  setProjectTitle(editedTitle);
  setProjectStatus(editedStatus);
  setProjectCategory(editedCategory);
  setProjectBudget(editedBudget);
  setProjectProgress(Math.max(0, Math.min(100, editedProgress)));
localStorage.setItem(
  "allnova-project-progress",
  String(Math.max(0, Math.min(100, editedProgress)))
);
  setProjectDeadline(editedDeadline);
  setProjectDescription(editedDescription);
localStorage.setItem("allnova-project-description", editedDescription);
localStorage.setItem("allnova-project-deadline", editedDeadline);
localStorage.setItem("allnova-project-budget", String(editedBudget));
localStorage.setItem("allnova-project-category", editedCategory);
  localStorage.setItem("allnova-project-title", editedTitle);
  localStorage.setItem("allnova-project-status", editedStatus);
  alert("Project changes saved successfully!");
  setActiveModal(null);
}}
    className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
  >
    Save Changes
  </button>
)}
{activeModal === "approve" && (
    <>
    <h3 className="mb-3 text-base font-semibold text-gray-900">
  Confirm Project Approval
</h3>
  <p className="mb-4 text-sm text-gray-600">
  Are you sure you want to approve this project?
  This will change the project status to Active.
</p>
  <div className="mb-4 rounded-lg bg-gray-50 p-4">
  <h3 className="mb-3 font-semibold text-gray-900">
    Project Information
  </h3>

  <p className="text-sm">
    <strong>Project:</strong> {projectTitle}
  </p>

  <p className="mt-2 text-sm">
    <strong>Owner:</strong> Sarah Mitchell
  </p>

  <p className="mt-2 text-sm">
    <strong>Budget:</strong> ${projectBudget.toLocaleString()}
  </p>

  <p className="mt-2 text-sm">
    <strong>Status:</strong> {projectStatus}
  </p>
</div>
  <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-900">
      Approval Notes (Optional)
    </label>
    <textarea
      rows={4}
      value={approvalNotes}
      onChange={(e) => setApprovalNotes(e.target.value)}
      placeholder="Add any comments or instructions for the project owner..."
      className="w-full rounded-md border border-gray-200 p-3 text-sm"
    />
  </div>
  <button
    type="button"
    onClick={() => {
      setProjectStatus("Active");
      localStorage.setItem("allnova-project-status", "Active");
      localStorage.setItem("allnova-project-approval-notes", approvalNotes.trim());
      setApprovalNotes("");
      alert("Project approved successfully!");
setActiveModal(null);
    }}
    className="rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
  >
      Confirm Approval
</button>

<button
  type="button"
  onClick={() => setActiveModal(null)}
  className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium"
>
  Cancel
</button>
  </>
  
)}
{activeModal === "reject" && (
    <>
    <h3 className="mb-3 text-base font-semibold text-gray-900">
  Confirm Project Rejection
</h3>
    <p className="mb-4 text-sm text-gray-600">
  Are you sure you want to reject this project?
  Please provide a reason for the rejection.
</p>
    <div className="mb-4 rounded-lg bg-gray-50 p-4">
  <h3 className="mb-3 font-semibold text-gray-900">
    Project Information
  </h3>

  <p className="text-sm">
    <strong>Project:</strong> {projectTitle}
  </p>

  <p className="mt-2 text-sm">
    <strong>Owner:</strong> Sarah Mitchell
  </p>

  <p className="mt-2 text-sm">
    <strong>Budget:</strong> ${projectBudget.toLocaleString()}
  </p>

  <p className="mt-2 text-sm">
    <strong>Status:</strong> {projectStatus}
  </p>
</div>
    <div className="mb-4">
  <label className="mb-2 block text-sm font-medium text-gray-900">
    Rejection Reason *
  </label>
  <textarea
    rows={4}
    value={rejectionReason}
    onChange={(e) => setRejectionReason(e.target.value)}
    placeholder="Explain why this project is being rejected..."
    className="w-full rounded-md border border-gray-200 p-3 text-sm"
  />
</div>
  <button
    type="button"
    disabled={!rejectionReason.trim()}
    onClick={() => {
        if (!rejectionReason.trim()) {
  alert("Please provide a reason for rejecting this project.");
  return;
}
      setProjectStatus("Rejected");
      localStorage.setItem("allnova-project-status", "Rejected");
      localStorage.setItem("allnova-project-rejection-reason", rejectionReason.trim());
      setRejectionReason("");
      alert("Project rejected successfully!");
      setActiveModal(null);
    }}
    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
  >
    Confirm Rejection
  </button>
  <button
  type="button"
  onClick={() => setActiveModal(null)}
  className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium"
>
  Cancel
</button>
  </>
)}
    {activeModal === "owner" && (
  <div className="space-y-4">
    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Sarah Mitchell
      </h3>
      <p className="text-sm text-gray-500">Freelancer</p>
    </div>

    <div className="space-y-3 text-sm">
      <p><strong>User ID:</strong> USER-2190</p>
      <p><strong>Projects Completed:</strong> 15</p>
      <p><strong>Project:</strong> {projectTitle}</p>
    </div>

    <button
      type="button"
      onClick={() => setActiveModal(null)}
      className="w-full rounded-md bg-purple-700 px-4 py-2 text-white"
    >
      Close Profile
    </button>
  </div>
)}
    </div>
  </div>
)}

</div>
  );
}