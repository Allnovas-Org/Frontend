import { Lightning } from "@phosphor-icons/react";
import type { Post } from "../../../../shared/types/community";
import { PostCard } from "../post-card/PostCard";

interface HottestPostsSectionProps {
  posts: Post[];
}

export function HottestPostsSection({ posts }: HottestPostsSectionProps) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Lightning size={18} weight="fill" className="text-[#7800B3]" aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">Hottest Posts Right Now</p>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
