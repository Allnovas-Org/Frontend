import { cn } from "../../../shared/utils/cn";

interface FilterPillsProps {
  options: string[];
  activeOption: string;
  onSelect: (option: string) => void;
}

export function FilterPills({ options, activeOption, onSelect }: FilterPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={cn(
            "flex-shrink-0 whitespace-nowrap rounded-lg border px-4 py-2 text-sm transition-colors",
            option === activeOption
              ? "border-[#7800B3] bg-[#7800B3] font-medium text-white"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
