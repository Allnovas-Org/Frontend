import React, { useState, useMemo } from "react";
import {
  MagnifierIcon,
  RecentIcon,
  FilterIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../assets/applicants/customIcons";
import { SavedJobsProvider } from "../../store/SavedJobsProvider";

import Pagination from "./Pagination";
import FilterDropdown from "./FilterDropdown";
import JobCard from "./JobCard";
import { Job } from "../../types";
import JobSidebar from "./JobSidebar";
import JobApplicationPanel from "./JobApplicationPanel";
import jobs from "../../mockData/jobs";

// This page will list job opportunities for users

interface Filters {
  budget?: string;
  customBudget?: [number, number] | null;
  experience?: string[];
  payment?: string[];
}

const FindJobs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showApplicationPanel, setShowApplicationPanel] =
    useState<boolean>(false);
  const jobsPerPage = 16;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const [search, setSearch] = useState<string>("");
  const [categoryInput, setCategoryInput] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("Most Recent");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({});

  // Collect all categories and subcategories for autocomplete
  const allCategories = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.category).filter(Boolean))),
    [jobs]
  );
  const allSubcategories = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.subcategory).filter(Boolean))),
    [jobs]
  );

  const filteredJobs = jobs
    .filter((job) => {
      const searchTerm = search.trim().toLowerCase();
      const categoryTerm = categoryInput.trim().toLowerCase();
      // If nothing is searched, show all
      if (
        !searchTerm &&
        !categoryTerm &&
        !selectedCategory &&
        !selectedSubcategory
      )
        return true;
      // If searching by category (from input or selected), match jobs with that category
      if (
        (selectedCategory || categoryTerm) &&
        !(selectedSubcategory || searchTerm)
      ) {
        const cat = selectedCategory || categoryTerm;
        return job.category && job.category.toLowerCase() === cat.toLowerCase();
      }
      // If searching by subcategory (from input or selected), match jobs where subcategory is used as position
      if (selectedSubcategory || searchTerm) {
        const sub = selectedSubcategory || searchTerm;
        // Subcategory as position
        if (
          job.subcategory &&
          job.subcategory.toLowerCase() === sub.toLowerCase()
        ) {
          return true;
        }
        // Also allow searching by position
        if (
          job.position &&
          job.position.toLowerCase().includes(sub.toLowerCase())
        ) {
          return true;
        }
        return false;
      }
      return true;
    })
    .filter((job) => {
      // Budget filter
      if (filters.budget) {
        const priceNum = Number(job.price.replace(/[^\d]/g, ""));
        if (filters.budget === "Custom" && filters.customBudget) {
          if (
            priceNum < filters.customBudget[0] ||
            priceNum > filters.customBudget[1]
          )
            return false;
        } else {
          const opt = {
            "$10 - $50": [10, 50],
            "$51 - $100": [51, 100],
            "$101 - $150": [101, 150],
          }[filters.budget];
          if (opt && (priceNum < opt[0] || priceNum > opt[1])) return false;
        }
      }
      // Experience filter
      if (filters.experience && filters.experience.length > 0) {
        if (
          !filters.experience.some((exp: string) =>
            job.badges.some((b) => b.type === "experience" && b.value === exp)
          )
        )
          return false;
      }
      // Payment filter
      if (filters.payment && filters.payment.length > 0) {
        if (
          !filters.payment.some((pay: string) =>
            job.badges.some((b) => b.type === "jobType" && b.value === pay)
          )
        )
          return false;
      }
      return true;
    });

  // Always sort first, then filter by date range
  let jobsWithDate = [...filteredJobs].sort(
    (a, b) => b.postedDate - a.postedDate
  );

  if (sortOption === "Last Week") {
    const now = new Date();
    jobsWithDate = jobsWithDate.filter((job) => {
      const diff = (now.getTime() - job.postedDate) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    });
  } else if (sortOption === "Last Month") {
    const now = new Date();
    jobsWithDate = jobsWithDate.filter((job) => {
      const diff = (now.getTime() - job.postedDate) / (1000 * 60 * 60 * 24);
      return diff <= 30;
    });
  } else if (sortOption === "6 Months Ago") {
    const now = new Date();
    jobsWithDate = jobsWithDate.filter((job) => {
      const diff = (now.getTime() - job.postedDate) / (1000 * 60 * 60 * 24);
      return diff <= 180;
    });
  }

  // Filter by badge if filter is set
  const finalJobs = jobsWithDate;

  // Use subcategory as position if present
  const jobsToShow = finalJobs
    .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
    .map((job) => ({
      ...job,
      position: job.subcategory || job.position,
    }));

  // Helper function for posted text
  function getPostedText(postedDate: number | Date): string {
    const now = new Date();
    const posted =
      typeof postedDate === "number" ? postedDate : postedDate.getTime();
    const diffDays = Math.floor(
      (now.getTime() - posted) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) return "Posted today";
    if (diffDays === 1) return "Posted 1 day ago";
    return `Posted ${diffDays} days ago`;
  }

  return (
    <div className='min-h-screen bg-white px-4 sm:px-6 lg:px-2'>
      {showApplicationPanel ? (
        <JobApplicationPanel
          onClose={() => setShowApplicationPanel(false)}
          job={selectedJob as Job}
        />
      ) : (
        <div className='max-w-6xl mx-auto pt-8'>
          <div className='text-left flex justify-start flex-col'>
            {/* Page Heading */}
            <h1
              className='text-2xl font-bold mb-2  text-heading'
              style={{ textAlign: "justify" }}
            >
              Find Your Dream Job Here
            </h1>
            <p className='text-base mb-8 text-text'>
              Discover the best remote jobs and work from home from top
              companies.
            </p>
          </div>

          {/* Search and filter bar */}
          <div className='flex items-center justify-between mb-10'>
            <div className='relative w-full max-w-lg'>
              <span className='absolute left-3 top-[44%] -translate-y-1/2 flex items-center'>
                <MagnifierIcon color='#D2D6DB' />
              </span>
              <input
                type='text'
                placeholder='Job title/keyword'
                value={categoryInput}
                onChange={(e) => {
                  setCategoryInput(e.target.value);
                  setShowCategoryDropdown(true);
                  setSelectedCategory("");
                  setSelectedSubcategory("");
                }}
                className='w-full pl-10 pr-4 py-2 rounded-lg border border-input text-base shadow-sm text-heading mb-2'
              />
              {showCategoryDropdown && categoryInput.trim() !== "" && (
                <div className='absolute left-0 top-full w-full bg-white border border-input rounded-lg shadow-lg z-20 mt-1 max-h-60 overflow-auto'>
                  {/* Show matching categories */}
                  {allCategories
                    .filter(
                      (cat) =>
                        cat &&
                        cat
                          .toLowerCase()
                          .includes(categoryInput.trim().toLowerCase())
                    )
                    .map((cat) => (
                      <div
                        key={cat}
                        className='px-4 py-2 text-sm hover:bg-primary/10 cursor-pointer'
                        onClick={() => {
                          setSelectedCategory(cat || "");
                          setCategoryInput(cat || "");
                          setShowCategoryDropdown(false);
                          setSelectedSubcategory("");
                        }}
                      >
                        {cat}
                      </div>
                    ))}
                  {/* Show matching subcategories */}
                  {allSubcategories
                    .filter(
                      (sub) =>
                        sub &&
                        sub
                          .toLowerCase()
                          .includes(categoryInput.trim().toLowerCase())
                    )
                    .map((sub) => (
                      <div
                        key={sub}
                        className='px-4 py-2 text-sm hover:bg-primary/10 cursor-pointer'
                        onClick={() => {
                          setSelectedSubcategory(sub || "");
                          setCategoryInput(sub || "");
                          setShowCategoryDropdown(false);
                          setSelectedCategory("");
                        }}
                      >
                        {sub}
                      </div>
                    ))}
                  {/* If nothing matches */}
                  {allCategories
                    .concat(allSubcategories)
                    .filter(
                      (item) =>
                        item &&
                        item
                          .toLowerCase()
                          .includes(categoryInput.trim().toLowerCase())
                    ).length === 0 && (
                    <div className='px-4 py-2 text-sm text-gray-400'>
                      No match found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className='flex items-center space-x-4 ml-4'>
              <div className='relative'>
                <button
                  className='flex items-center border border-input px-4 py-2 rounded-lg text-sm font-normal text-primary bg-transparent'
                  onClick={() => setSortDropdownOpen((v) => !v)}
                  type='button'
                >
                  <img
                    src='/images/applicants/setting.svg'
                    className='mr-2'
                    alt='Recent'
                  />
                  {sortOption}
                </button>
                {sortDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white border border-input rounded-lg shadow-lg z-20'>
                    {[
                      "Most Recent",
                      "Last Week",
                      "Last Month",
                      "6 Months Ago",
                    ].map((option: string) => (
                      <button
                        key={option}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 ${
                          sortOption === option
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSortOption(option);
                          setSortDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        type='button'
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className='relative'>
                <button
                  className='flex items-center border-input border justify-center w-10 h-10 rounded-lg bg-transparent text-primary'
                  aria-label='Filter'
                  onClick={() => setFilterDropdownOpen((v) => !v)}
                >
                  <img
                    className='w-4 h-4'
                    src='/images/applicants/filter.svg'
                    alt='filter'
                  />
                </button>
                <FilterDropdown
                  open={filterDropdownOpen}
                  onClose={() => setFilterDropdownOpen(false)}
                  onApply={(selected: Filters) => {
                    setFilters(selected);
                    setCurrentPage(1);
                  }}
                  onReset={() => setFilters({})}
                  initialFilters={filters}
                />
              </div>
            </div>
          </div>

          {/* Job listings and empty state */}
          {!showApplicationPanel && (
            <>
              {jobs.length === 0 ? (
                <div className='text-center text-lg text-gray-500 py-12'>
                  No jobs available.
                </div>
              ) : jobsToShow.length === 0 ? (
                <div className='text-center text-lg text-gray-500 py-12'>
                  No jobs match your search.
                </div>
              ) : (
                <>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
                    {jobsToShow.map((job, i) => (
                      <div
                        key={job.id}
                        onClick={() => {
                          setSelectedJob(job);
                          setSidebarOpen(true);
                        }}
                        className='cursor-pointer'
                      >
                        <JobCard
                          job={{
                            ...job,
                            posted: getPostedText(job.postedDate),
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Pagination only if jobsToShow is not empty */}
                  {jobsToShow.length > 0 && (
                    <Pagination
                      current={currentPage}
                      total={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              )}
            </>
          )}

          <SavedJobsProvider>
            {/* Job Sidebar Drawer */}
            {sidebarOpen && !showApplicationPanel && (
              <JobSidebar
                job={selectedJob as Job}
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onApplyNow={() => {
                  setSidebarOpen(false);
                  setShowApplicationPanel(true);
                }}
              />
            )}
          </SavedJobsProvider>
        </div>
      )}
    </div>
  );
};

export default FindJobs;
