import { useState } from "react";
import { X } from "@phosphor-icons/react";
import type { PostType } from "../../../../shared/types/community";
import { PostTypeSelector } from "./PostTypeSelector";
import { JobPostForm } from "./forms/JobPostForm";
import { QuestionPostForm } from "./forms/QuestionPostForm";
import { ProjectPostForm } from "./forms/ProjectPostForm";
import { InsightPostForm } from "./forms/InsightPostForm";
import { ShowcaseComposerForm } from "./ShowcaseComposerForm";

interface PostComposerModalProps {
  entryPoint: "general" | "showcase";
  userName: string;
  avatarUrl?: string;
  recentImages?: string[];
  onClose: () => void;
}

export function PostComposerModal({
  entryPoint,
  userName,
  avatarUrl,
  recentImages = [],
  onClose,
}: PostComposerModalProps) {
  const [postType, setPostType] = useState<PostType | null>(null);

  const step = entryPoint === "showcase" ? "showcase" : postType === null ? "select-type" : "form";

  const title = entryPoint === "showcase" ? "Create" : step === "select-type" ? "Create" : "Post Details";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4">
      <div className="flex h-[92vh] w-full flex-col rounded-t-2xl bg-white p-5 sm:h-auto sm:max-h-[85vh] sm:max-w-md sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X size={22} weight="bold" aria-hidden="true" />
          </button>
        </div>

        {step !== "showcase" && (
          <div className="mt-4 flex gap-2">
            <span className={`h-1 flex-1 rounded-full ${step !== "select-type" ? "bg-[#7800B3]" : "bg-[#7800B3]"}`} />
            <span className={`h-1 flex-1 rounded-full ${step === "form" ? "bg-[#7800B3]" : "bg-gray-200"}`} />
          </div>
        )}

        <div className="mt-5 flex-1 overflow-y-auto">
          {step === "select-type" && <PostTypeSelector onSelect={setPostType} />}

          {step === "form" && postType === "job" && (
            <JobPostForm onBack={() => setPostType(null)} onPublish={(data) => console.log(data)} />
          )}
          {step === "form" && postType === "question" && (
            <QuestionPostForm onBack={() => setPostType(null)} onPublish={(data) => console.log(data)} />
          )}
          {step === "form" && postType === "project" && (
            <ProjectPostForm onBack={() => setPostType(null)} onPublish={(data) => console.log(data)} />
          )}
          {step === "form" && postType === "insight" && (
            <InsightPostForm onBack={() => setPostType(null)} onPublish={(data) => console.log(data)} />
          )}

          {step === "showcase" && (
            <ShowcaseComposerForm
              userName={userName}
              avatarUrl={avatarUrl}
              recentImages={recentImages}
              onPublish={(data) => console.log(data)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
