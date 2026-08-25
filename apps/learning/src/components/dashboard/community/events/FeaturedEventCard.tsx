import { CalendarBlank, Clock, Users, VideoCamera } from "@phosphor-icons/react";

interface FeaturedEventCardProps {
  title: string;
  description: string;
  isVirtual: boolean;
  date: string;
  time: string;
  attendeeSummary: string;
  onRegister?: () => void;
  onLearnMore?: () => void;
}

export function FeaturedEventCard({
  title,
  description,
  isVirtual,
  date,
  time,
  attendeeSummary,
  onRegister,
  onLearnMore,
}: FeaturedEventCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)] sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#7800B3] px-3 py-1 text-xs font-medium text-white">Featured</span>
        {isVirtual && (
          <span className="flex items-center gap-1 text-xs font-medium text-[#7800B3]">
            <VideoCamera size={14} weight="fill" aria-hidden="true" />
            Virtual
          </span>
        )}
      </div>

      <p className="mt-3 text-lg font-bold text-gray-900 sm:text-xl">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
        <div className="flex items-center gap-2">
          <CalendarBlank size={18} weight="regular" className="text-gray-400" aria-hidden="true" />
          <div>
            <p className="text-xs text-gray-400">Date</p>
            <p className="text-sm font-medium text-gray-800">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} weight="regular" className="text-gray-400" aria-hidden="true" />
          <div>
            <p className="text-xs text-gray-400">Time</p>
            <p className="text-sm font-medium text-gray-800">{time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users size={18} weight="regular" className="text-gray-400" aria-hidden="true" />
          <div>
            <p className="text-xs text-gray-400">Attendees</p>
            <p className="text-sm font-medium text-gray-800">{attendeeSummary}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onRegister}
          className="flex-1 rounded-lg bg-[#7800B3] py-2.5 text-sm font-medium text-white hover:bg-[#5C0090]"
        >
          Register Now
        </button>
        <button
          type="button"
          onClick={onLearnMore}
          className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
