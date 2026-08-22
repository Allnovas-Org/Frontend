import { Info } from "lucide-react";
import { cn } from "../../../shared/utils/cn";

interface DailyStreakCardProps {
  streakCount: number;
  filledDays: number;
}

export function DailyStreakCard({
  streakCount,
  filledDays,
}: DailyStreakCardProps) {
  const days = Array.from({ length: 7 }, (_, i) => i < filledDays);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-gray-900">Daily Streak</h3>

          <Info size={14} className="text-gray-400" strokeWidth={1.75} />
        </div>

        <div className="flex items-center gap-1">
          <span className="text-3xl font-semibold text-gray-900">
            {streakCount}
          </span>

          <span
            className="select-none text-lg leading-none"
            role="img"
            aria-label="Fire"
          >
            🔥
          </span>
        </div>
      </div>

      {/* Weekly streak */}
      <div className="mt-6 flex gap-3">
        {days.map((filled, index) => (
          <div
            key={index}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border",
              filled
                ? "border-orange-200 bg-white"
                : "border-gray-300 bg-white",
            )}
          >
            {filled ? (
              <span className="text-base leading-none select-none">🔥</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
