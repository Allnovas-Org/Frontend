import { CalendarBlank } from "@phosphor-icons/react";
import type { UpcomingEventSummary } from "../../../../shared/types/community";

interface UpcomingEventCardProps {
  events: UpcomingEventSummary[];
}

export function UpcomingEventCard({ events }: UpcomingEventCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)]">
      <div className="mb-3 flex items-center gap-2">
        <CalendarBlank size={18} weight="regular" className="text-gray-700" aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">Upcoming event</p>
      </div>
      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <div key={event.id} className="border-t border-gray-100 pt-3 first:border-t-0 first:pt-0">
            <p className="text-sm font-medium text-gray-800">{event.title}</p>
            <p className="text-xs text-gray-400">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
