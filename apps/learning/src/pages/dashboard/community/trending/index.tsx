import { useState } from "react";
import { TrendUp, Plus } from "@phosphor-icons/react";
import { CommunityPageHeader } from "../../../../components/dashboard/community/page-header/CommunityPageHeader";
import { FilterPills } from "../../../../components/dashboard/community/filter-pills/FilterPills";
import { PostCard } from "../../../../components/dashboard/community/post-card/PostCard";
import { CommunityRightRail } from "../../../../components/dashboard/community/right-rail/CommunityRightRail";
import { PostComposerModal } from "../../../../components/dashboard/community/post-composer/PostComposerModal";
import { TopTrendingTopicsSection } from "../../../../components/dashboard/community/trending/TopTrendingTopicsSection";
import { HottestPostsSection } from "../../../../components/dashboard/community/trending/HottestPostsSection";
import {
  trendingCategoryOptions,
  trendingFeedPosts,
  topTrendingTopics,
  hottestPosts,
} from "./data/mockTrendingData";
import {
  upcomingEvents,
  trendingTopics,
  suggestedConnections,
  hiringNowJobs,
} from "../feed/data/mockFeedData";

const currentUser = { name: "Adeyemi Aduke", avatarUrl: undefined };

export function CommunityTrendingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="min-w-0 flex-1 space-y-4">
        <CommunityPageHeader
          icon={TrendUp}
          title="Trending"
          subtitle="What's hot in the community right now"
          actionLabel="Make a post"
          actionIcon={Plus}
          onAction={() => setIsComposerOpen(true)}
        />

        <FilterPills
          options={trendingCategoryOptions}
          activeOption={activeCategory}
          onSelect={setActiveCategory}
        />

        <div className="flex flex-col gap-4">
          {trendingFeedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <TopTrendingTopicsSection topics={topTrendingTopics} />

        <HottestPostsSection posts={hottestPosts} />
      </div>

      <CommunityRightRail
        events={upcomingEvents}
        topics={trendingTopics}
        connections={suggestedConnections}
        jobs={hiringNowJobs}
      />

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
