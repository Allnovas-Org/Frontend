import { TrendUp } from "@phosphor-icons/react";
import type { TrendingTopic } from "../../../../shared/types/community";
import { TopTrendingTopicCard } from "./TopTrendingTopicCard";

interface TopTrendingTopicsSectionProps {
  topics: TrendingTopic[];
}

export function TopTrendingTopicsSection({ topics }: TopTrendingTopicsSectionProps) {
  return (
    <div className="rounded-xl border border-[#7800B3]/30 bg-[#F9F6FF] p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <TrendUp size={18} weight="bold" className="text-[#7800B3]" aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">Top Trending Topics</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {topics.map((topic) => (
          <TopTrendingTopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
