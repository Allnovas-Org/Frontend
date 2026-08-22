interface CreatePostInputProps {
  userName: string;
  avatarUrl?: string;
  onClick: () => void;
}

export function CreatePostInput({ userName, avatarUrl, onClick }: CreatePostInputProps) {
  return (
    <div className="flex items-center gap-3">
      {avatarUrl ? (
        <img src={avatarUrl} alt={userName} className="h-10 w-10 flex-shrink-0 rounded-full object-cover" />
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-[#7800B3]">
          {userName.charAt(0)}
        </div>
      )}
      <button
        type="button"
        onClick={onClick}
        className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-left text-sm text-gray-400 hover:bg-gray-50"
      >
        Create a post
      </button>
    </div>
  );
}
