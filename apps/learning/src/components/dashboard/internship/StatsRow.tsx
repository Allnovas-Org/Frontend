import type { InternshipStat } from "../../../shared/types/internship";
import { StatCard } from "./StatCard";

interface StatsRowProps {
  stats: InternshipStat[];
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
