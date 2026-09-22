interface FeaturedOpportunityCardProps {
  companyName: string;
  title: string;
  salaryRange: string;
}

export function FeaturedOpportunityCard({ companyName, title, salaryRange }: FeaturedOpportunityCardProps) {
  return (
    <div className="flex-1 rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-xs font-semibold text-[#7800B3]">{companyName}</p>
      <p className="mt-1 text-sm font-bold text-gray-900">{title}</p>
      <p className="mt-1 text-xs text-gray-500">{salaryRange}</p>
    </div>
  );
}
