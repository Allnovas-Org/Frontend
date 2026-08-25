import { Heart } from "@phosphor-icons/react";
import type { ShowcaseItem } from "../../../../shared/types/community";

interface ShowcaseCompactCardProps {
  item: ShowcaseItem;
}

export function ShowcaseCompactCard({ item }: ShowcaseCompactCardProps) {
  const { title, description, imageUrl, authorName, authorInitials, authorColorClass, likeCount } = item;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)]">
      <img src={imageUrl} alt={title} className="h-40 w-full object-cover sm:h-52" />
      <div className="p-3">
        <p className="truncate text-sm font-semibold text-gray-900">{title}</p>
        {description && <p className="truncate text-xs text-gray-400">{description}</p>}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-1.5">
            <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${authorColorClass}`}>
              {authorInitials}
            </div>
            <span className="truncate text-xs text-gray-600">{authorName}</span>
          </div>
          <span className="flex flex-shrink-0 items-center gap-1 text-xs text-gray-400">
            <Heart size={13} weight="regular" aria-hidden="true" />
            {likeCount}
          </span>
        </div>
      </div>
    </div>
  );
}
