import type { Post } from "../../../../shared/types/community";
import { PostImageGrid } from "./PostImageGrid";
import { PostEngagementRow } from "./PostEngagementRow";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { author, postedAt, body, images, tags, likeCount, commentCount, repostCount } = post;

  return (
    <div className="rounded-xl bg-white p-4 shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)] sm:p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${author.avatarColorClass}`}
        >
          {author.avatarInitials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{author.name}</p>
          <p className="truncate text-xs text-gray-400">
            {author.role} &middot; {postedAt}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-700">{body}</p>

      {images && images.length > 0 && <PostImageGrid images={images} />}

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded bg-gray-50 px-2 py-1 text-[11px] text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      )}

      <PostEngagementRow likeCount={likeCount} commentCount={commentCount} repostCount={repostCount} />
    </div>
  );
}
