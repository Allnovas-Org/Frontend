import { Sparkle } from "@phosphor-icons/react";
import { FeaturedOpportunityCard } from "./FeaturedOpportunityCard";

interface FeaturedOpportunity {
  id: string;
  companyName: string;
  title: string;
  salaryRange: string;
}

interface FeaturedOpportunitiesSectionProps {
  opportunities: FeaturedOpportunity[];
}

export function FeaturedOpportunitiesSection({ opportunities }: FeaturedOpportunitiesSectionProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <Sparkle size={18} weight="fill" className="text-[#7800B3]" aria-hidden="true" />
        <p className="text-sm font-bold text-gray-900">Featured Opportunities</p>
      </div>
      <p className="mt-1 text-xs text-gray-400">Hand-picked opportunities from verified companies</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        {opportunities.map((opp) => (
          <FeaturedOpportunityCard
            key={opp.id}
            companyName={opp.companyName}
            title={opp.title}
            salaryRange={opp.salaryRange}
          />
        ))}
      </div>
    </div>
  );
}
