import { ArrowRight } from "lucide-react";
import learningpath from "../../../../../assets/learningpath.png";

export function HeroIllustrationCTA() {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={learningpath}
        alt="Learning path illustration"
        className="mb-6 w-full max-w-md h-auto object-contain"
      />

      <button
        type="button"
        className="flex items-center gap-2 rounded-lg bg-[#6A0DAD] px-50 py-3 text-sm font-medium text-white transition-colors hover:bg-[#560A8A]"
      >
        Explore learning path
        <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  );
}
