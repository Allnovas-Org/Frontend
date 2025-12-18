import React from "react";
import BannerSection from "./BannerSection";
import BasicInfoSection from "./BasicInfo/BasicInfoSection";
import AboutMeSection from "./About/AboutMeSection";
import WorkExperienceSection from "./WorkExperience/WorkExperienceSection";
import SkillsSection from "./Skills/SkillsSection";
import ToolsSection from "./Tools/ToolsSection";
import CatelogSection from "./Catelog/CatelogSection";
import ProjectsSection from "./Project/ProjectsSection";

const ProfileSettings = () => {
  return (
    <div className='min-h-screen bg-white'>
      <BannerSection />
      <div className='flex gap-8 px-20 pt-24 pb-12'>
        <BasicInfoSection />
        <div className='w-4/5 flex flex-col gap-2'>
          <AboutMeSection />
          <WorkExperienceSection />
          <SkillsSection />
          <ToolsSection />
          <CatelogSection />
          <ProjectsSection />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
