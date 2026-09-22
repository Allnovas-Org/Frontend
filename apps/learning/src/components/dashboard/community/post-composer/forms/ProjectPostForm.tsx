import { useState } from "react";

// TODO: replace fields once the real "Project" post Figma screen is shared.

interface ProjectPostFormProps {
  onBack: () => void;
  onPublish: (data: { title: string; description: string; link: string; tags: string }) => void;
}

export function ProjectPostForm({ onBack, onPublish }: ProjectPostFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Project title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g Fintech dashboard redesign"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What did you build and why?"
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Link (Optional)</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="e.g https://..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g Figma, UI/UX, Fintech"
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
          onClick={() => onPublish({ title, description, link, tags })}
          className="rounded-lg border border-[#7800B3] px-5 py-2.5 text-sm font-medium text-[#7800B3] hover:bg-[#F9F6FF]"
        >
          Publish now
        </button>
      </div>
    </div>
  );
}
