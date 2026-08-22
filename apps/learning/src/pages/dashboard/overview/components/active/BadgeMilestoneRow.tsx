import { Award } from "lucide-react";
import type { Badge } from "../../../../../shared/types/dashboard";
import { BadgeCard } from "./BadgeCard";

interface BadgeMilestoneRowProps {
  badges: Badge[];
}

export function BadgeMilestoneRow({ badges }: BadgeMilestoneRowProps) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
        <Award size={16} strokeWidth={1.5} aria-hidden="true" />
        Badges & milestone
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
