import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <div className="relative w-full max-w-lg">
      <Search
        size={16}
        strokeWidth={1.5}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input
        type="text"
        placeholder="Search lesson.."
        className="h-[39px] w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#7800B3] focus:outline-none focus:ring-1 focus:ring-[#7800B3]"
      />
    </div>
  );
}
