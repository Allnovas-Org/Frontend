import { useState } from "react";
import { PaintBrush, Plus } from "@phosphor-icons/react";
import { CommunityPageHeader } from "../../../../components/dashboard/community/page-header/CommunityPageHeader";
import { EditorsPicksSection } from "../../../../components/dashboard/community/showcase/EditorsPicksSection";
import { ShowcaseFeaturedCard } from "../../../../components/dashboard/community/showcase/ShowcaseFeaturedCard";
import { ShowcaseCompactCard } from "../../../../components/dashboard/community/showcase/ShowcaseCompactCard";
import { PostComposerModal } from "../../../../components/dashboard/community/post-composer/PostComposerModal";
import {
  editorsPicks,
  featuredShowcaseItem,
  showcaseGridItems,
  recentShowcaseUploads,
} from "./data/mockShowcaseData";

const currentUser = { name: "Adeyemi Aduke", avatarUrl: undefined };

export function CommunityShowcasePage() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <CommunityPageHeader
        icon={PaintBrush}
        title="Showcase"
        subtitle="Discover amazing work from talented creators"
        actionLabel="Share your work"
        actionIcon={Plus}
        onAction={() => setIsComposerOpen(true)}
      />

      <EditorsPicksSection picks={editorsPicks} />

      <ShowcaseFeaturedCard item={featuredShowcaseItem} />

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {showcaseGridItems.map((item) => (
          <ShowcaseCompactCard key={item.id} item={item} />
        ))}
      </div>

      {isComposerOpen && (
        <PostComposerModal
          entryPoint="showcase"
          userName={currentUser.name}
          avatarUrl={currentUser.avatarUrl}
          recentImages={recentShowcaseUploads}
          onClose={() => setIsComposerOpen(false)}
        />
      )}
    </div>
  );
}
