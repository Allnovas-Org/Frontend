import { Construction } from "lucide-react";

interface ComingSoonPageProps {
  sectionName: string;
}

export function ComingSoonPage({ sectionName }: ComingSoonPageProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 py-24 text-center">
      <Construction size={28} strokeWidth={1.5} className="text-gray-300" aria-hidden="true" />
      <p className="text-sm font-medium text-gray-700">{sectionName} is on its way</p>
      <p className="max-w-xs text-xs text-gray-400">
        This part of the dashboard hasn't been built yet. Check back soon.
      </p>
    </div>
  );
}
