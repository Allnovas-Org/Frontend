import type { Challenge } from "../../../../../shared/types/dashboard";

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const Icon = challenge.icon;

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.08)]">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9D5BFF] to-[#7800B3]">
        <Icon
          size={20}
          strokeWidth={1.5}
          className="text-white"
          aria-hidden="true"
        />
      </div>
      <p className="text-sm font-bold text-[#3C2172]">{challenge.title}</p>
      <p className="text-xs font-medium text-[#8D6FD1]">{challenge.subtitle}</p>

      <div className="mt-3 flex -space-x-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-6 rounded-full border-2 border-white bg-gray-200"
          />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-3 text-xs">
        <span className="font-bold text-gray-900">${challenge.price}.00</span>
        <span className="flex items-center gap-1 rounded-full border border-gray-200 px-2 py-1 text-gray-500">
          Due in {challenge.dueInDays} days
        </span>
      </div>
    </div>
  );
}
