import type { ActivityDataPoint } from "../../../../../shared/types/dashboard";
import { cn } from "../../../../../shared/utils/cn";

interface ActivityChartProps {
  data: ActivityDataPoint[];
  totalHours: number;
}

export function ActivityChart({ data, totalHours }: ActivityChartProps) {
  const maxHours = Math.max(...data.map((d) => d.hours));
  const peakIndex = data.findIndex((d) => d.hours === maxHours);

  return (
    <div className="rounded-xl bg-white p-6 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-bold text-gray-900">Activity</p>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-[11px] text-gray-500">
          last 7 days
        </span>
      </div>

      <p className="text-2xl font-bold text-gray-900">
        {totalHours}{" "}
        <span className="text-xs font-normal text-gray-400">Hours spent</span>
      </p>

      <div className="mt-6 flex h-32 items-end gap-2">
        {data.map((point, i) => (
          <div
            key={point.day}
            className="flex flex-1 flex-col items-center gap-1"
          >
            {i === peakIndex && (
              <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white">
                {point.hours} hours
              </span>
            )}
            <div
              className={cn(
                "w-full rounded-t",
                i === peakIndex ? "bg-[#8100FF]" : "bg-[#DAC0FF]",
              )}
              style={{ height: `${(point.hours / maxHours) * 60}px` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-2 text-[11px] text-gray-400">
        {data.map((point) => (
          <span key={point.day} className="flex-1 text-center">
            {point.day}
          </span>
        ))}
      </div>
    </div>
  );
}
