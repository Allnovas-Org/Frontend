export default function AvailableJob() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Available Job
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Monitor and manage available jobs, hiring partners, and opportunities on the platform.
      </p>
      
<div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
          N
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Notion</h3>
          <p className="text-sm text-gray-500">Bessie Cooper</p>
        </div>
      </div>
      
<span
  className={`rounded-full px-3 py-1 text-xs font-medium ${
    [2, 4].includes(index)
      ? "bg-yellow-50 text-yellow-600"
      : "bg-green-50 text-green-600"
  }`}
>
  {[2, 4].includes(index) ? "Pending" : "Verified"}
</span>

    </div>

    <div className="mt-6 flex gap-3">
      <div className="rounded-md border border-gray-200 px-3 py-2 text-sm">
        <p className="text-gray-500">Hires</p>
        <p className="font-semibold">18</p>
      </div>
      <div className="rounded-md border border-gray-200 px-3 py-2 text-sm">
        <p className="text-gray-500">Roles</p>
        <p className="font-semibold">12</p>
      </div>
    </div>

    <div className="mt-6 flex flex-wrap gap-2">
      {["React", "Node.js", "Figma", "Next.js"].map((skill) => (
        <span key={skill} className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-500">
          {skill}
        </span>
      ))}
    </div>
  </div>
))}
</div>

    </div>
  );
}