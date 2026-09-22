import { Fire, ArrowUpRight } from "@phosphor-icons/react";
import type { TrendingTopic } from "../../../../shared/types/community";

interface TopTrendingTopicCardProps {
  topic: TrendingTopic;
}

export function TopTrendingTopicCard({ topic }: TopTrendingTopicCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <p className="text-sm font-bold text-gray-900">{topic.hashtag}</p>
        <Fire size={16} weight="fill" className="text-orange-500" aria-hidden="true" />
      </div>
      <p className="mt-1 text-xs text-gray-400">{topic.postCount} posts</p>
      {typeof topic.changePercent === "number" && (
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />+{topic.changePercent}%
        </p>
      )}
    </div>
  );
}
