import type { UpcomingEvent } from "../../../../../shared/types/dashboard";

interface UpcomingEventsListProps {
  events: UpcomingEvent[];
}

const eventLogos = [
  "/huawei.png",
  "/dominos.png",
  "/mcdonalds.png",
  "/pepsi.png",
];

export function UpcomingEventsList({ events }: UpcomingEventsListProps) {
  return (
    <div className="rounded-[28px] border border-[#F1F2F6] bg-[#F8F9FC] p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#1A1325]">
          Upcoming Events
        </h3>

        <button
          type="button"
          className="text-[14px] font-medium text-[#9A97A4] transition-colors hover:text-[#6C4CFF]"
        >
          View All
        </button>
      </div>

      <div className="space-y-5">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="grid grid-cols-[44px_1fr_auto] items-center gap-4"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
              <img
                src={eventLogos[index % eventLogos.length]}
                alt={event.provider}
                className="h-10 w-10 object-contain"
              />
            </div>

            <p className="max-w-[170px] text-[14px] font-medium leading-5 text-[#1A1325]">
              {event.title}
            </p>

            <p className="whitespace-nowrap text-[14px] font-medium text-[#1A1325]">
              {event.provider}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
