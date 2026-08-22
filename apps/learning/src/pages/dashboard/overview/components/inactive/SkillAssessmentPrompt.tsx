import { ArrowRight } from "lucide-react";

export function SkillAssessmentPrompt() {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <p className="text-sm font-medium text-gray-800">Not sure where to start?</p>
      <p className="text-xs text-gray-500">
        Answer 5 quick questions and we'll match you with your perfect path
      </p>
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg bg-[#6A0DAD] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#560A8A]"
      >
        Take skill assessment
        <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  );
}
