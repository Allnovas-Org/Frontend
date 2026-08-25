import { useState } from "react";

interface JobPostFormProps {
  onBack: () => void;
  onPublish: (data: { title: string; description: string; budget: string; tags: string }) => void;
}

export function JobPostForm({ onBack, onPublish }: JobPostFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [tags, setTags] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Job title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g senior react developer"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the role, responsibility, and requirement"
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Budget (Optional)</label>
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g $2000 negotiable"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Skills/Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g React, TypeScript, Figma"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => onPublish({ title, description, budget, tags })}
          className="rounded-lg border border-[#7800B3] px-5 py-2.5 text-sm font-medium text-[#7800B3] hover:bg-[#F9F6FF]"
        >
          Publish now
        </button>
      </div>
    </div>
  );
}
