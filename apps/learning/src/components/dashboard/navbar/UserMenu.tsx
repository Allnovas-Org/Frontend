import { Bell, Settings } from "lucide-react";

interface UserMenuProps {
  userName: string;
  avatarUrl?: string;
}

export function UserMenu({ userName, avatarUrl }: UserMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Notifications"
        className="text-gray-700 hover:text-gray-900"
      >
        <Bell size={22} strokeWidth={1.5} />
      </button>

      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={userName}
          className="h-9 w-9 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-[#7800B3]">
          {userName.charAt(0)}
        </div>
      )}

      <button
        type="button"
        aria-label="Settings"
        className="text-gray-700 hover:text-gray-900"
      >
        <Settings size={22} strokeWidth={1.5} />
      </button>
    </div>
  );
}
