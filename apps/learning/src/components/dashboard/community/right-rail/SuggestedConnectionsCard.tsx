import { Star } from "@phosphor-icons/react";
import type { SuggestedConnection } from "../../../../shared/types/community";

interface SuggestedConnectionsCardProps {
  connections: SuggestedConnection[];
}

export function SuggestedConnectionsCard({ connections }: SuggestedConnectionsCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)]">
      <div className="mb-3 flex items-center gap-2">
        <Star size={18} weight="regular" className="text-[#7800B3]" aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">Suggested connections</p>
      </div>
      <div className="flex flex-col gap-4">
        {connections.map((person) => (
          <div key={person.id} className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${person.avatarColorClass}`}
            >
              {person.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-xs text-gray-400">{person.role}</p>
            </div>
            <button
              type="button"
              className="flex-shrink-0 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              + Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
