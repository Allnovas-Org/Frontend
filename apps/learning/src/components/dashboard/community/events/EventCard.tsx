import { Clock, MapPin, Users, VideoCamera } from "@phosphor-icons/react";
import type { CommunityEvent } from "../../../../shared/types/community";

interface EventCardProps {
  event: CommunityEvent;
  isVirtual?: boolean;
}

export function EventCard({ event, isVirtual }: EventCardProps) {
  const {
    title,
    category,
    categoryColorClass,
    description,
    dateMonth,
    dateDay,
    dateWeekday,
    dateColorClass,
    timeRange,
    location,
    attendeeSummary,
    organizerName,
    organizerInitials,
    organizerColorClass,
    ctaLabel,
  } = event;

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)] sm:flex-row sm:p-5">
      <div className={`flex w-full flex-shrink-0 flex-col items-center justify-center rounded-lg py-3 sm:w-20 ${dateColorClass}`}>
        <span className="text-[10px] font-semibold uppercase">{dateMonth}</span>
        <span className="text-2xl font-bold">{dateDay}</span>
        <span className="text-[10px]">{dateWeekday}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-bold text-gray-900 sm:text-base">{title}</p>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${categoryColorClass}`}>
            {category}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{description}</p>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={13} weight="regular" aria-hidden="true" />
            {timeRange}
          </span>
          <span className="flex items-center gap-1">
            {isVirtual ? <VideoCamera size={13} weight="regular" aria-hidden="true" /> : <MapPin size={13} weight="regular" aria-hidden="true" />}
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} weight="regular" aria-hidden="true" />
            {attendeeSummary}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${organizerColorClass}`}>
              {organizerInitials}
            </div>
            <span className="text-xs text-gray-600">by {organizerName}</span>
          </div>
          <button
            type="button"
            className="rounded-full bg-[#F1EFFF] px-4 py-1.5 text-xs font-medium text-[#7800B3] hover:bg-[#E6D2FF]"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
