import { Heart, Eye, ArrowSquareOut } from "@phosphor-icons/react";
import type { ShowcaseItem } from "../../../../shared/types/community";

interface ShowcaseFeaturedCardProps {
  item: ShowcaseItem;
}

export function ShowcaseFeaturedCard({ item }: ShowcaseFeaturedCardProps) {
  const { title, description, category, imageUrl, authorName, authorInitials, authorColorClass, likeCount, viewCount } = item;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[4px_4px_14px_-2px_rgba(0,0,0,0.06)]">
      <div className="relative">
        <img src={imageUrl} alt={title} className="h-56 w-full object-cover sm:h-96" />
        {category && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700">
            {category}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-base font-bold text-gray-900 sm:text-lg">{title}</p>
          <ArrowSquareOut size={18} weight="regular" className="flex-shrink-0 text-gray-400" aria-hidden="true" />
        </div>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${authorColorClass}`}>
              {authorInitials}
            </div>
            <span className="text-sm text-gray-700">{authorName}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Heart size={16} weight="regular" aria-hidden="true" />
              {likeCount}
            </span>
            {viewCount && (
              <span className="flex items-center gap-1">
                <Eye size={16} weight="regular" aria-hidden="true" />
                {viewCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
