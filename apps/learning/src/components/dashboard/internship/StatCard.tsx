import { ArrowUp } from "@phosphor-icons/react";
import type { InternshipStat } from "../../../shared/types/internship";

interface StatCardProps {
  stat: InternshipStat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="flex-1 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <p className="text-2xl font-bold text-gray-900 sm:text-3xl">{stat.value}</p>
      <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
      <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
        <ArrowUp size={12} weight="bold" aria-hidden="true" />
        {stat.trendText}
      </p>
    </div>
  );
}
