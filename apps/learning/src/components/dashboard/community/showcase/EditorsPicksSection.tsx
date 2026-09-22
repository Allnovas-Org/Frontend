import { Medal } from "@phosphor-icons/react";
import { EditorsPickMiniCard } from "./EditorsPickMiniCard";

interface EditorsPick {
  id: string;
  imageUrl: string;
  title: string;
  authorName: string;
  likeCount: number;
}

interface EditorsPicksSectionProps {
  picks: EditorsPick[];
}

export function EditorsPicksSection({ picks }: EditorsPicksSectionProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <Medal size={18} weight="fill" className="text-[#7800B3]" aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">Editor's Picks</p>
        <span className="text-xs text-gray-400">&middot; This week</span>
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        {picks.map((pick) => (
          <EditorsPickMiniCard
            key={pick.id}
            imageUrl={pick.imageUrl}
            title={pick.title}
            authorName={pick.authorName}
            likeCount={String(pick.likeCount)}
          />
        ))}
      </div>
    </div>
  );
}
