import type { Badge } from "../../../../../shared/types/dashboard";

interface BadgeCardProps {
  badge: Badge;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const Icon = badge.icon;

  return (
    <div
      className={`
    ${badge.colorClass}
    flex h-22 flex-col items-center justify-center
    rounded-lg border
    px-4 py-4
    text-center
    transition-colors duration-200
  `}
    >
      <Icon size={18} strokeWidth={2} className="mb-2" />

      <p className="text-xs font-medium leading-5 text-gray-700">
        {badge.label}
      </p>
    </div>
  );
}
