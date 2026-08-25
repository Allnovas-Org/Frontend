import { useState } from "react";
import { CalendarBlank, Plus } from "@phosphor-icons/react";
import { CommunityPageHeader } from "../../../../components/dashboard/community/page-header/CommunityPageHeader";
import { FilterPills } from "../../../../components/dashboard/community/filter-pills/FilterPills";
import { FeaturedEventCard } from "../../../../components/dashboard/community/events/FeaturedEventCard";
import { EventCard } from "../../../../components/dashboard/community/events/EventCard";
import { PostComposerModal } from "../../../../components/dashboard/community/post-composer/PostComposerModal";
import { eventCategoryOptions, featuredEvent, upcomingEventsList } from "./data/mockEventsData";

const currentUser = { name: "Adeyemi Aduke", avatarUrl: undefined };

export function CommunityEventsPage() {
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <CommunityPageHeader
        icon={CalendarBlank}
        title="Events"
        subtitle="Connect, learn, and grow with the community"
        actionLabel="Make a post"
        actionIcon={Plus}
        onAction={() => setIsComposerOpen(true)}
      />

      <FilterPills
        options={eventCategoryOptions}
        activeOption={activeCategory}
        onSelect={setActiveCategory}
      />

      <FeaturedEventCard {...featuredEvent} />

      <div className="flex items-center gap-2">
        <CalendarBlank size={18} weight="regular" className="text-gray-700" aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">Upcoming Events</p>
      </div>

      <div className="flex flex-col gap-4">
        {upcomingEventsList.map((event) => (
          <EventCard key={event.id} event={event} isVirtual={event.location.toLowerCase().includes("virtual")} />
        ))}
      </div>

      {isComposerOpen && (
        <PostComposerModal
          entryPoint="general"
          userName={currentUser.name}
          avatarUrl={currentUser.avatarUrl}
          onClose={() => setIsComposerOpen(false)}
        />
      )}
    </div>
  );
}
