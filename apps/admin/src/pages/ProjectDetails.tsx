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
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-900">
              Mobile App UI/UX Design
            </h1>

            <span className="rounded-md bg-purple-700 px-3 py-1 text-xs font-medium text-white">
              Active
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
          <button className="flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm">
            <Pencil size={16} /> Edit
          </button>

          <button className="flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm">
            <CircleCheck size={16} /> Approve
          </button>

          <button className="flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm">
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
          Design a fitness tracking mobile application
        </p>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-semibold">40%</span>
          </div>

          <div className="h-2 rounded-full bg-gray-200">
            <div className="h-2 w-[40%] rounded-full bg-slate-950" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 border-t pt-6">
          <div className="flex items-center gap-3">
            <DollarSign className="text-gray-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Budget</p>
              <p className="font-medium">$1,800</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="text-gray-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Deadline</p>
              <p className="font-medium">June 25, 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Tag className="text-gray-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">Design</p>
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
</div>
  );
}