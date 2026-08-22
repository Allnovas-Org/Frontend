interface CourseHighlightCardProps {
  groupLabel: string;
  levelLabel: string;
  title: string;
  description: string;
  participantCount: number;
  courseProgress: number;
  onContinue?: () => void;
}

export function CourseHighlightCard({
  groupLabel,
  levelLabel,
  title,
  description,
  courseProgress,
  onContinue,
}: CourseHighlightCardProps) {
  return (
    <div className="flex flex-1 flex-col rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.08)]">
      <div className="mb-3 flex gap-2">
        <span className="rounded-full bg-[#D7F5E7] px-3 py-1 text-[11px] font-medium text-[#006532]">
          {groupLabel}
        </span>
        <span className="rounded-full bg-[#E6D2FF] px-3 py-1 text-[11px] font-medium text-[#8D00FF]">
          {levelLabel}
        </span>
      </div>
      <p className="text-base font-bold text-gray-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-gray-500">
        {description}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-[#F7F8FA] p-3">
          <p className="mb-2 text-[11px] text-gray-500">Participants</p>
          <div className="flex -space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-2 border-white bg-gray-300"
              />
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-[#F7F8FA] p-3">
          <p className="mb-2 text-[11px] text-gray-500">Course progress</p>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F9EB96]">
            <div
              className="h-full rounded-full bg-[#FFD600]"
              style={{ width: `${courseProgress}%` }}
            />
          </div>
          <p className="mt-1 text-xs font-semibold text-gray-900">
            {courseProgress}%
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-auto w-full rounded-lg bg-[#7800B3] py-2.5 text-sm font-medium text-white hover:bg-[#5C0090]"
      >
        Continue learning
      </button>
    </div>
  );
}
