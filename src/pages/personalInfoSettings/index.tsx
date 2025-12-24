import React, { useState, lazy, Suspense } from "react";
const ReviewSection = lazy(() => import("./Review/ReviewSection"));
import TabNav from "./TabNav";
import TipsSidebar from "./TipsSidebar";
import BannerSection from "./BannerSection";
import BasicInfoSection from "./BasicInfo/BasicInfoSection";
import AboutMeSection from "./About/AboutMeSection";
import WorkExperienceSection from "./WorkExperience/WorkExperienceSection";
import SkillsSection from "./Skills/SkillsSection";
import ToolsSection from "./Tools/ToolsSection";
import CatelogSection from "./Catelog/CatelogSection";
import CreateCatalogue from "./Catelog/CreateCatalogue";
import ProjectsSection from "./Project/ProjectsSection";
import { ArrowRight } from "lucide-react";
import { TabType, TabContent } from "../../types";

const cardData = [
  {
    title: "Ready for work",
    desc: "Show recruters that you’re ready to work",
  },
  {
    title: "Visit Community",
    desc: "ask question, create content, connect with other",
  },
  {
    title: "Update",
    desc: "keep your profile update so that recuriters knows you better",
  },
];

const TAB_DATA: Record<TabType, TabContent> = {
  Profile: {
    title: "Tips for a great profile",
    tips: [
      { id: 1, text: "Mention your specialization and what makes you unique" },
      { id: 2, text: "Share your years of experience and key achievements" },
      { id: 3, text: "Use bullet points for easy scanning" },
      { id: 4, text: "Highlight the tools and technologies you master" },
      { id: 5, text: "Keep it clear, human, and authentic" },
    ],
  },
  Portfolio: {
    title: "Tips for your portfolio",
    tips: [
      { id: 1, text: "Showcase your best 3-5 case studies" },
      { id: 2, text: "Include the problem, solution, and final result" },
      { id: 3, text: "High-quality mockups improve visual appeal" },
    ],
  },
  Catalogue: {
    title: "Tips for your Catalogues",
    tips: [
      { id: 1, text: "Set competitive but fair pricing" },
      { id: 2, text: "Clearly define what is included in the package" },
      { id: 3, text: "Use catchy thumbnails for higher click-rates" },
    ],
  },
  Review: {
    title: "Managing Reviews",
    tips: [
      { id: 1, text: "Always reply to feedback to show engagement" },
      { id: 2, text: "Encourage clients to leave detailed reviews" },
    ],
  },
};

const ProfileSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Profile");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showProjectEdit, setShowProjectEdit] = useState(false);
  const [showCreateCatalogue, setShowCreateCatalogue] = useState(false);
  const [showCatalogueEdit, setShowCatalogueEdit] = useState(false);

  const handleEditCatalogue = () => {
    setShowCreateCatalogue(true);
    setShowProjectEdit(true);
  };

  const tabButtonText: Record<TabType, string> = {
    Profile: "Edit Profile",
    Portfolio: "Edit Project",
    Catalogue: "Edit Catalogue",
    Review: "Edit Review",
  };

  React.useEffect(() => {
    setShowProfileEdit(false);
    setShowProjectEdit(false);
    setShowCatalogueEdit(false);
  }, [activeTab]);

  if (showCreateCatalogue) {
    return <CreateCatalogue onClose={() => setShowCreateCatalogue(false)} />;
  }

  return (
    <div className='min-h-screen bg-white'>
      <BannerSection />
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-3 px-4 lg:px-20 pb-8 lg:pb-12'>
        <div className='w-full lg:w-1/5 mb-6 lg:mb-0'>
          <BasicInfoSection />
        </div>
        <div className='w-full lg:w-4/5 flex flex-col gap-2'>
          <div className='flex sm:flex-row sm:items-center flex-col justify-between gap-4'>
            <div className='flex flex-col items-start gap-2'>
              <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
                Ajayi Samuel
              </h2>
              <p className='text-gray-500 text-sm'>
                Product Designer || UI/UX Designer
              </p>
              {/* Edit Pen */}
              {activeTab === "Profile" && showProfileEdit && (
                <button className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'>
                  <span className='sr-only'>Edit Name</span>
                </button>
              )}
            </div>
            <button
              className='bg-transparent text-purple px-4 py-2 rounded-lg font-medium border border-purple transition mt-4 sm:mt-0'
              onClick={() => {
                if (activeTab === "Profile") setShowProfileEdit((v) => !v);
                if (activeTab === "Portfolio") setShowProjectEdit((v) => !v);
                if (activeTab === "Catalogue") setShowCatalogueEdit((v) => !v);
              }}
            >
              {tabButtonText[activeTab]}
            </button>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            {cardData.map((card) => (
              <div
                key={card.title}
                className='w-full sm:w-48 bg-white border border-gray-200 rounded-xl shadow p-2 flex items-center justify-between mb-3 sm:mb-0'
              >
                <div>
                  <h4 className='text-sm font-semibold text-gray-900'>
                    {card.title}
                  </h4>
                  <p className='text-gray-500 text-xs'>{card.desc}</p>
                </div>
                <span className='text-purple bg-white rounded-full p-1 border border-purple w-5 h-5 flex items-center justify-center'>
                  <ArrowRight className='w-5 h-5 text-center' />
                </span>
              </div>
            ))}
          </div>
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className='flex flex-col '>
            <div className='flex-1'>
              {activeTab === "Profile" && (
                <>
                  <div className='flex flex-col-reverse lg:flex-row gap-4 lg:gap-3'>
                    <div className='w-full lg:w-auto order-1 lg:order-2'>
                      <TipsSidebar
                        title={TAB_DATA[activeTab].title}
                        tips={TAB_DATA[activeTab].tips}
                      />
                    </div>
                    <AboutMeSection showEdit={showProfileEdit} />
                  </div>
                  <div className='mt-6'>
                    <SkillsSection showEdit={showProfileEdit} />
                  </div>
                  <div className='mt-6'>
                    <WorkExperienceSection showEdit={showProfileEdit} />
                  </div>
                </>
              )}
              {activeTab === "Portfolio" && (
                <div className='flex flex-col-reverse lg:flex-row gap-6 mt-6'>
                  <div className='w-full lg:w-auto order-1 lg:order-2'>
                    <TipsSidebar
                      title={TAB_DATA[activeTab].title}
                      tips={TAB_DATA[activeTab].tips}
                    />
                  </div>
                  <div className='flex-1'>
                    <ProjectsSection showEdit={showProjectEdit} />
                  </div>
                </div>
              )}
              {activeTab === "Catalogue" && (
                <div className='flex flex-col-reverse lg:flex-row gap-6 mt-6'>
                  <div className='w-full lg:w-auto order-1 lg:order-2'>
                    <TipsSidebar
                      title={TAB_DATA[activeTab].title}
                      tips={TAB_DATA[activeTab].tips}
                    />
                  </div>
                  <div className='flex-1'>
                    <CatelogSection
                      setShowCreateCatalogue={setShowCreateCatalogue}
                      onEditCatalogue={handleEditCatalogue}
                      showEdit={showCatalogueEdit}
                    />
                  </div>
                </div>
              )}
              {activeTab === "Review" && (
                <div className='flex flex-col-reverse lg:flex-row gap-6 mt-6'>
                  <div className='w-full lg:w-auto order-1 lg:order-2'>
                    <TipsSidebar
                      title={TAB_DATA[activeTab].title}
                      tips={TAB_DATA[activeTab].tips}
                    />
                  </div>
                  <div className='flex-1'>
                    <Suspense fallback={<div>Loading reviews...</div>}>
                      <ReviewSection />
                    </Suspense>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
