import { Fire } from "@phosphor-icons/react";
import type { TrendingTopic } from "../../../../shared/types/community";

interface TrendingTopicsCardProps {
  topics: TrendingTopic[];
}

export function TrendingTopicsCard({ topics }: TrendingTopicsCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)]">
      <div className="mb-3 flex items-center gap-2">
        <Fire size={18} weight="fill" className="text-orange-500" aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">Trending topics</p>
      </div>
      <div className="flex flex-col gap-3">
        {topics.map((topic) => (
          <div key={topic.id} className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-300">{topic.rank}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#7800B3]">{topic.hashtag}</p>
              <p className="text-xs text-gray-400">{topic.postCount} posts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
