import { useState } from "react";
import { CreatePostInput } from "../../../../components/dashboard/community/feed/CreatePostInput";
import { FilterPills } from "../../../../components/dashboard/community/filter-pills/FilterPills";
import { PostCard } from "../../../../components/dashboard/community/post-card/PostCard";
import { CommunityRightRail } from "../../../../components/dashboard/community/right-rail/CommunityRightRail";
import { PostComposerModal } from "../../../../components/dashboard/community/post-composer/PostComposerModal";
import { savedCategoryOptions, savedPosts } from "./data/mockSavedData";
import {
  upcomingEvents,
  trendingTopics,
  suggestedConnections,
  hiringNowJobs,
} from "../feed/data/mockFeedData";

const currentUser = { name: "Adeyemi Aduke", avatarUrl: undefined };

export function CommunitySavedPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="min-w-0 flex-1 space-y-4">
        <CreatePostInput
          userName={currentUser.name}
          avatarUrl={currentUser.avatarUrl}
          onClick={() => setIsComposerOpen(true)}
        />

        <FilterPills
          options={savedCategoryOptions}
          activeOption={activeCategory}
          onSelect={setActiveCategory}
        />

        <div className="flex flex-col gap-4">
          {savedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
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
