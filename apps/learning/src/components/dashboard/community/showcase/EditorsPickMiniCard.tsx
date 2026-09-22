import { Heart } from "@phosphor-icons/react";

interface EditorsPickMiniCardProps {
  imageUrl: string;
  title: string;
  authorName: string;
  likeCount: string;
}

export function EditorsPickMiniCard({ imageUrl, title, authorName, likeCount }: EditorsPickMiniCardProps) {
  return (
    <div className="flex-1">
      <div className="overflow-hidden rounded-lg">
        <img src={imageUrl} alt={title} className="h-28 w-full object-cover sm:h-32" />
      </div>
      <p className="mt-2 truncate text-sm font-semibold text-gray-900">{title}</p>
      <div className="mt-0.5 flex items-center justify-between">
        <p className="truncate text-xs text-gray-400">{authorName}</p>
        <span className="flex flex-shrink-0 items-center gap-1 text-xs text-gray-400">
          <Heart size={12} weight="fill" aria-hidden="true" />
          {likeCount}
        </span>
      </div>
    </div>
  );
}
