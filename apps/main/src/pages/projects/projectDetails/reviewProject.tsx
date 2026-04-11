import React, { useMemo, useState } from "react";
import { candidates } from "../candidates/data/candidateData";
import { ApplicationStatus } from "../../../types";
import { useNavigate } from "react-router-dom";
import { CandidateCard } from "./candidateCard";
import { useDebounce } from "../hook/useDebounce";
import { Candidate } from "../../../types";
import { Settings2, BriefcaseBusiness } from "lucide-react";
import EmptyState from "../EmptyState";

type SortOption =
  | "bestMatch"
  | "recent"
  | "oldest"
  | "highBudget"
  | "lowBudget";

export const ReviewProject: React.FC = () => {
  const filters = useMemo<{ label: string; value: ApplicationStatus }[]>(() => {
    const shortlistedCount = candidates.filter(
      (candidate) => candidate.status === "shortlisted",
    ).length;
    const interviewedCount = candidates.filter(
      (candidate) => candidate.status === "interviewed",
    ).length;
    const messagedCount = candidates.filter(
      (candidate) => candidate.status === "messaged",
    ).length;

    return [
      { label: `All applications (${candidates.length})`, value: "all" },
      { label: `Shortlisted (${shortlistedCount})`, value: "shortlisted" },
      { label: `Interviewed (${interviewedCount})`, value: "interviewed" },
      { label: `Messaged (${messagedCount})`, value: "messaged" },
    ];
  }, []);

  const [activeFilter, setActiveFilter] = useState<ApplicationStatus>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("bestMatch");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterType, setFilterType] = useState<"category" | "budget" | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(candidates.flatMap((candidate) => candidate.skills))),
    [],
  );
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search, 300);

  const filteredCandidates = useMemo(() => {
    let result: Candidate[] = [...candidates];

    // 1. Status filter
    if (activeFilter !== "all") {
      result = result.filter((c) => c.status === activeFilter);
    }

    // 2. Category filter
    if (selectedCategory) {
      result = result.filter((c) => c.skills.includes(selectedCategory));
    }

    // 3. Budget filter
    if (selectedBudget) {
      if (selectedBudget === "low") {
        result = result.filter((c) => c.hourlyRate <= 25);
      } else if (selectedBudget === "medium") {
        result = result.filter((c) => c.hourlyRate > 25 && c.hourlyRate <= 50);
      } else if (selectedBudget === "high") {
        result = result.filter((c) => c.hourlyRate > 50);
      }
    }

    // 4. Search filter (debounced)
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.title.toLowerCase().includes(query) ||
          c.skills.some((skill) => skill.toLowerCase().includes(query)),
      );
    }

    if (sortBy === "bestMatch") {
      result = result.filter((candidate) => Boolean(candidate.bestMatch));
    }

    // 5. Sorting
    switch (sortBy) {
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime(),
        );
        break;

      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime(),
        );
        break;

      case "highBudget":
        result.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;

      case "lowBudget":
        result.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;

      case "bestMatch":
      default:
        result.sort((a, b) => {
          const aMatch =
            typeof a.bestMatch === "boolean"
              ? a.bestMatch
                ? 1
                : 0
              : Number(a.bestMatch) || 0;
          const bMatch =
            typeof b.bestMatch === "boolean"
              ? b.bestMatch
                ? 1
                : 0
              : Number(b.bestMatch) || 0;
          return bMatch - aMatch;
        });
    }

    return result;
  }, [debouncedSearch, sortBy, activeFilter, selectedCategory, selectedBudget]);

  return (
    <section>
      {/* Filter tabs  */}
      <div className='flex gap-6 border-b border-input text-sm'>
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`pb-3 text-xs ${
              activeFilter === filter.value
                ? "border-b-2 border-primary text-primary"
                : "text-gray-dark"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search & Sort */}
      <div className='mt-6 flex flex-wrap items-center justify-between gap-4 relative'>
        <input
          placeholder='Search'
          className='w-64 rounded-lg border border-input px-4 py-2 text-sm'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className='flex items-center gap-4 text-sm'>
          <button className='text-primary'>Advanced search</button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className='rounded-lg border border-input outline-none focus:outline-none px-3 py-2'
          >
            <option value='bestMatch'>Best match</option>
            <option value='recent'>Most recent</option>
            <option value='oldest'>Oldest first</option>
            <option value='highBudget'>Highest budget to lowest</option>
            <option value='lowBudget'>Lowest budget to highest</option>
          </select>

          <button
            className='rounded-lg border border-input outline-none focus:outline-none px-4 py-2 flex gap-2 text-sm text-primary'
            onClick={() => setShowFilterDropdown((prev) => !prev)}
          >
            <Settings2 className='w-4 h-4 inline-block text-primary' />
            Filters
          </button>

          {showFilterDropdown && (
            <div className='absolute top-12 right-0 z-10 bg-white border border-input rounded-lg shadow-lg w-56 p-4'>
              {!filterType ? (
                <>
                  <button
                    className='w-full text-left py-2 px-3 hover:bg-gray-50  mb-2 '
                    onClick={() => setFilterType("category")}
                  >
                    Category
                  </button>
                  <button
                    className='w-full text-left py-2 px-3 hover:bg-gray-50 '
                    onClick={() => setFilterType("budget")}
                  >
                    Budget type
                  </button>
                </>
              ) : filterType === "category" ? (
                <>
                  <div className='mb-2 text-xs'>Select Category</div>
                  <div className='space-y-1'>
                    <button
                      className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-50 ${
                        !selectedCategory ? "bg-gray-50 text-primary" : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory(null);
                        setShowFilterDropdown(false);
                        setFilterType(null);
                      }}
                    >
                      All
                    </button>
                    {categoryOptions.map((category) => (
                      <button
                        key={category}
                        className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-50 ${
                          selectedCategory === category
                            ? "bg-gray-50 text-primary"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowFilterDropdown(false);
                          setFilterType(null);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <button
                    className='mt-2 text-xs text-gray-500 underline'
                    onClick={() => setFilterType(null)}
                  >
                    Back
                  </button>
                </>
              ) : (
                <>
                  <div className='mb-2 text-xs'>Select Budget Type</div>
                  <div className='space-y-1'>
                    <button
                      className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-50 ${
                        !selectedBudget ? "bg-gray-50 text-primary" : ""
                      }`}
                      onClick={() => {
                        setSelectedBudget(null);
                        setShowFilterDropdown(false);
                        setFilterType(null);
                      }}
                    >
                      All
                    </button>
                    <button
                      className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-50 ${
                        selectedBudget === "low"
                          ? "bg-gray-50 text-primary"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedBudget("low");
                        setShowFilterDropdown(false);
                        setFilterType(null);
                      }}
                    >
                      Low (&le; $25/hr)
                    </button>
                    <button
                      className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-50 ${
                        selectedBudget === "medium"
                          ? "bg-gray-50 text-primary"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedBudget("medium");
                        setShowFilterDropdown(false);
                        setFilterType(null);
                      }}
                    >
                      Medium ($26-$50/hr)
                    </button>
                    <button
                      className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-50 ${
                        selectedBudget === "high"
                          ? "bg-gray-50 text-primary"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedBudget("high");
                        setShowFilterDropdown(false);
                        setFilterType(null);
                      }}
                    >
                      High (&gt; $50/hr)
                    </button>
                  </div>
                  <button
                    className='mt-2 text-xs text-gray-500 underline'
                    onClick={() => setFilterType(null)}
                  >
                    Back
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='mt-6 space-y-6'>
        {filteredCandidates.length === 0 ? (
          <EmptyState
            title='Oops! you don’t have an active job post relating to this category.'
            description='You have no active job posting on web development so far. Not to worry, you can put one up and get to work with the varieties of talents over the globe!'
            icon={<BriefcaseBusiness size={16} className='text-input' />}
            actionLabel='Post a job'
            onAction={() => {
              navigate("/clients/post-a-job");
            }}
          />
        ) : (
          filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))
        )}
      </div>
    </section>
  );
};
