import React from "react";
import { ProjectTab } from "../../../types";
import { candidates } from "../candidates/data/candidateData";

interface Props {
  activeTab: ProjectTab;
  onChange: (tab: ProjectTab) => void;
}

export const ProjectTabs = ({ activeTab, onChange }: Props) => {
  const applicationsCount = candidates.length;
  const hireCount = candidates.filter(
    (candidate) => candidate.status === "hired",
  ).length;

  const tabs: { label: string; value: ProjectTab }[] = [
    { label: "Job Post Overview", value: "overview" },
    {
      label: `Review Applications (${applicationsCount})`,
      value: "applications",
    },
    { label: `Hire (${hireCount})`, value: "hire" },
  ];

  return (
    <div className='flex gap-2'>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`rounded-lg px-4 py-2 text-sm ${
            activeTab === tab.value
              ? "bg-primary text-white"
              : "border border-input text-gray-dark"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
