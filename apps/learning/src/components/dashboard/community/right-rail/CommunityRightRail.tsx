import type {
  UpcomingEventSummary,
  TrendingTopic,
  SuggestedConnection,
} from "../../../../shared/types/community";
import { UpcomingEventCard } from "./UpcomingEventCard";
import { TrendingTopicsCard } from "./TrendingTopicsCard";
import { SuggestedConnectionsCard } from "./SuggestedConnectionsCard";
import { HiringNowCard } from "./HiringNowCard";

interface CommunityRightRailProps {
  events: UpcomingEventSummary[];
  topics: TrendingTopic[];
  connections: SuggestedConnection[];
  jobs: { id: string; title: string; meta: string }[];
}

export function CommunityRightRail({ events, topics, connections, jobs }: CommunityRightRailProps) {
  return (
    <aside className="hidden w-80 flex-shrink-0 flex-col gap-4 lg:flex">
      <UpcomingEventCard events={events} />
      <TrendingTopicsCard topics={topics} />
      <SuggestedConnectionsCard connections={connections} />
      <HiringNowCard jobs={jobs} />
    </aside>
  );
}
