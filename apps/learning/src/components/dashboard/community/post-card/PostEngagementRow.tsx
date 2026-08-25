import { Heart, ChatCircle, Repeat, BookmarkSimple, Share } from "@phosphor-icons/react";

interface PostEngagementRowProps {
  likeCount: number;
  commentCount: number;
  repostCount: number;
}

export function PostEngagementRow({ likeCount, commentCount, repostCount }: PostEngagementRowProps) {
  return (
    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <button type="button" className="flex items-center gap-1.5 hover:text-gray-700">
          <Heart size={18} weight="regular" aria-hidden="true" />
          {likeCount}
        </button>
        <button type="button" className="flex items-center gap-1.5 hover:text-gray-700">
          <ChatCircle size={18} weight="regular" aria-hidden="true" />
          {commentCount}
        </button>
        <button type="button" className="flex items-center gap-1.5 hover:text-gray-700">
          <Repeat size={18} weight="regular" aria-hidden="true" />
          {repostCount}
        </button>
        <button type="button" className="hidden items-center gap-1.5 hover:text-gray-700 sm:flex">
          <BookmarkSimple size={18} weight="regular" aria-hidden="true" />
          Save
        </button>
      </div>
      <button type="button" aria-label="Share" className="text-gray-400 hover:text-gray-600">
        <Share size={18} weight="regular" aria-hidden="true" />
      </button>
    </div>
  );
}
