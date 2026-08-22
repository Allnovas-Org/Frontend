import { ListChecks, CheckCircle2, Clock } from "lucide-react";

interface ProgressStatisticsProps {
  totalActivityPercent: number;
  inProgress: number;
  completed: number;
  upcoming: number;
}

export function ProgressStatistics({
  totalActivityPercent,
  inProgress,
  completed,
  upcoming,
}: ProgressStatisticsProps) {
  return (
    <div className="flex flex-1 flex-col rounded-xl bg-white p-6 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.08)]">
      <p className="mb-5 text-sm font-bold text-gray-900">
        Progress statistics
      </p>
      <p className="text-2xl font-bold text-gray-900">
        {totalActivityPercent}%{" "}
        <span className="text-xs font-normal text-gray-400">
          Total activity
        </span>
      </p>

      <div className="mt-4 flex h-2 overflow-hidden rounded-full">
        <div className="bg-[#8100FF]" style={{ width: "20%" }} />
        <div className="bg-[#00CA83]" style={{ width: "40%" }} />
        <div className="bg-[#FF7F00]" style={{ width: "40%" }} />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-gray-400">
        <span>20%</span>
        <span>40%</span>
        <span>40%</span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-[#F7F8FA] p-4">
          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#8100FF]">
            <ListChecks
              size={17}
              strokeWidth={1.5}
              className="text-white"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm font-bold text-gray-900">{inProgress}</p>
          <p className="text-[10px] text-gray-400">In progress</p>
        </div>
        <div className="rounded-lg bg-[#F7F8FA] p-4">
          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#00CA83]">
            <CheckCircle2
              size={17}
              strokeWidth={1.5}
              className="text-white"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm font-bold text-gray-900">{completed}</p>
          <p className="text-[10px] text-gray-400">Completed</p>
        </div>
        <div className="rounded-lg bg-[#F7F8FA] p-4">
          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF7F00]">
            <Clock
              size={17}
              strokeWidth={1.5}
              className="text-white"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm font-bold text-gray-900">{upcoming}</p>
          <p className="text-[10px] text-gray-400">Upcoming</p>
        </div>
      </div>
    </div>
  );
}
