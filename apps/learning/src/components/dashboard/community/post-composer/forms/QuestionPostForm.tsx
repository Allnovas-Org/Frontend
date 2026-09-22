import { useState } from "react";

interface QuestionPostFormProps {
  onBack: () => void;
  onPublish: (data: { question: string; context: string; tags: string }) => void;
}

export function QuestionPostForm({ onBack, onPublish }: QuestionPostFormProps) {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [tags, setTags] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Your question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g how do i break into product management"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">More context</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Add background or what you have tried......."
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g #career, #product, #advice"
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
          onClick={() => onPublish({ question, context, tags })}
          className="rounded-lg border border-[#7800B3] px-5 py-2.5 text-sm font-medium text-[#7800B3] hover:bg-[#F9F6FF]"
        >
          Publish now
        </button>
      </div>
    </div>
  );
}
