import { Briefcase, Question, Rocket, Lightbulb } from "@phosphor-icons/react";
import type { PostType } from "../../../../shared/types/community";

interface PostTypeOption {
  type: PostType;
  label: string;
  description: string;
  icon: typeof Briefcase;
  iconColorClass: string;
}

const options: PostTypeOption[] = [
  { type: "job", label: "Job", description: "Post a role or gig", icon: Briefcase, iconColorClass: "text-amber-600" },
  { type: "question", label: "Question", description: "Ask the community", icon: Question, iconColorClass: "text-gray-500" },
  { type: "project", label: "Project", description: "Share your work", icon: Rocket, iconColorClass: "text-[#7800B3]" },
  { type: "insight", label: "Insight", description: "Share an idea", icon: Lightbulb, iconColorClass: "text-emerald-600" },
];

interface PostTypeSelectorProps {
  onSelect: (type: PostType) => void;
}

export function PostTypeSelector({ onSelect }: PostTypeSelectorProps) {
  return (
    <div>
      <p className="mb-4 text-sm text-gray-600">What kind of post would you like to share?</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.type}
              type="button"
              onClick={() => onSelect(option.type)}
              className="flex flex-col items-start gap-2 rounded-lg border border-gray-200 p-4 text-left hover:border-[#7800B3] hover:bg-[#F9F6FF]"
            >
              <Icon size={22} weight="regular" className={option.iconColorClass} aria-hidden="true" />
              <p className="text-sm font-semibold text-gray-900">{option.label}</p>
              <p className="text-xs text-gray-400">{option.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
