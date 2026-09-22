import { useState } from "react";

// TODO: replace fields once the real "Insight" post Figma screen is shared.

interface InsightPostFormProps {
  onBack: () => void;
  onPublish: (data: { idea: string; tags: string }) => void;
}

export function InsightPostForm({ onBack, onPublish }: InsightPostFormProps) {
  const [idea, setIdea] = useState("");
  const [tags, setTags] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Share your idea</label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="What's on your mind?"
          rows={5}
          className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g #productivity, #design"
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
          onClick={() => onPublish({ idea, tags })}
          className="rounded-lg border border-[#7800B3] px-5 py-2.5 text-sm font-medium text-[#7800B3] hover:bg-[#F9F6FF]"
        >
          Publish now
        </button>
      </div>
    </div>
  );
}
