import type { Icon } from "@phosphor-icons/react";

interface CommunityPageHeaderProps {
  icon: Icon;
  iconColorClass?: string;
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionIcon?: Icon;
  onAction?: () => void;
}

export function CommunityPageHeader({
  icon: Icon,
  iconColorClass = "text-[#7800B3]",
  title,
  subtitle,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
}: CommunityPageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Icon size={24} weight="fill" className={iconColorClass} aria-hidden="true" />
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h1>
        </div>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#7800B3] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5C0090] sm:w-auto"
        >
          {ActionIcon && <ActionIcon size={16} weight="bold" aria-hidden="true" />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}
