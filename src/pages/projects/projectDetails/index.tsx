import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ProjectHeader } from "./projectHeader";
import { ProjectTabs } from "./tabs";
import { ProjectDescription } from "./projectDescription";
import { ProjectSidebar } from "./projectSidebar";
import { projects } from "../data/projectData";
import { ProjectTab } from "../../../types";
import { HireCandidates } from "./hireCandidate";
import { ReviewProject } from "./reviewProject";

const ProjectDetailsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<ProjectTab>("overview");

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <Navigate to='/projects' replace />;
  }

  return (
    <div className='mx-auto max-w-6xl px-4 py-20 md:py-20 lg:py-32'>
      <ProjectHeader project={project} />

      <div className='mt-6'>
        <ProjectTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className='mt-8 grid grid-cols-1 gap-10 lg:grid-cols-4'>
        <div className='lg:col-span-3'>
          {activeTab === "overview" && <ProjectDescription project={project} />}
          {activeTab === "applications" && <ReviewProject />}
          {activeTab === "hire" && <HireCandidates />}
        </div>

        <ProjectSidebar project={project} />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
