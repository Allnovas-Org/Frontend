import { useState } from "react";
import { Briefcase, Plus, CheckCircle } from "@phosphor-icons/react";
import { CommunityPageHeader } from "../../../../components/dashboard/community/page-header/CommunityPageHeader";
import { FilterPills } from "../../../../components/dashboard/community/filter-pills/FilterPills";
import { FeaturedOpportunitiesSection } from "../../../../components/dashboard/community/opportunities/FeaturedOpportunitiesSection";
import { OpportunityCard } from "../../../../components/dashboard/community/opportunities/OpportunityCard";
import { PostComposerModal } from "../../../../components/dashboard/community/post-composer/PostComposerModal";
import {
  opportunityTypeOptions,
  featuredOpportunities,
  recentOpportunities,
  activeOpportunitiesCount,
} from "./data/mockOpportunitiesData";

const currentUser = {
  name: "Adeyemi Aduke",
  avatarUrl: undefined,
};

export function CommunityOpportunitiesPage() {
  const [activeType, setActiveType] = useState("All Types");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <CommunityPageHeader
        icon={Briefcase}
        title="Opportunities"
        subtitle="Find your next project, job, or collaboration"
        actionLabel="Make a post"
        actionIcon={Plus}
        onAction={() => setIsComposerOpen(true)}
      />

      <FilterPills
        options={opportunityTypeOptions}
        activeOption={activeType}
        onSelect={setActiveType}
      />

      <FeaturedOpportunitiesSection
        opportunities={featuredOpportunities}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle
            size={18}
            weight="fill"
            className="text-emerald-500"
            aria-hidden="true"
          />

          <p className="text-sm font-bold text-gray-900">
            Recent Opportunities
          </p>
        </div>

        <span className="text-xs text-gray-400">
          {activeOpportunitiesCount} active opportunities
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {recentOpportunities.map((job) => (
          <OpportunityCard key={job.id} job={job} />
        ))}
      </div>

      {isComposerOpen && (
        <PostComposerModal
          entryPoint="general"
          userName={currentUser.name}
          avatarUrl={currentUser.avatarUrl}
          onClose={() => setIsComposerOpen(false)}
        />
      )}
    </div>
  );
}