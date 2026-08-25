import { ArrowRight } from "lucide-react";

interface RecommendedForYouCardProps {
  eyebrow: string;
  badgeLabel: string;
  title: string;
  description: string;
  tags: string[];
  ctaLabel: string;
  onCtaClick?: () => void;
}

export function RecommendedForYouCard({
  eyebrow,
  badgeLabel,
  title,
  description,
  tags,
  ctaLabel,
  onCtaClick,
}: RecommendedForYouCardProps) {
  return (
    <div>
      <p className="mb-3 text-xs text-gray-400">
        {eyebrow} <span className="font-medium text-gray-700">Recommended for you</span>
      </p>
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-[#0D0614] p-6 sm:flex-row sm:items-center">
        <div>
          <span className="inline-block rounded bg-white/10 px-2 py-1 text-[11px] font-medium text-white">
            {badgeLabel}
          </span>
          <p className="mt-3 text-base font-medium text-white">{title}</p>
          <p className="mt-1 max-w-md text-sm text-gray-300">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-white/10 px-2 py-1 text-[11px] text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onCtaClick}
          className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-[#6A0DAD] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#560A8A]"
        >
          {ctaLabel}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
