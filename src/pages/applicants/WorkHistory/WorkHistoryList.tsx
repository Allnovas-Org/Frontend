// WorkHistoryList.tsx
import React from 'react';
import WorkHistoryCard from './WorkHistoryCard';
import { sampleProjects } from './data/projects';

const WorkHistoryList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-16 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Work History</h1>
        <span className="text-sm text-gray-500">
          Showing {sampleProjects.length} of {sampleProjects.length} projects
        </span>
      </div>

      {/* Project Cards */}
      <div className="space-y-6">
        {sampleProjects.map((project) => (
          <WorkHistoryCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default WorkHistoryList;