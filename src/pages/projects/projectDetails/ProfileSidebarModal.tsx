import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProfileSidebar from "./profileSidebarModal/ProfileSidebar";
import TabSections from "./profileSidebarModal/TabSections";
import { PROFILE_TABS, TabType } from "./profileSidebarModal/types";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export function ProfileSidebarModal({
  open,
  onClose,
  hirePath,
  messagePath,
}: {
  open: boolean;
  onClose: () => void;
  hirePath: string;
  messagePath: string;
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("Cover letter");

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-end items-center'>
      <div
        className='absolute inset-0 bg-gray-darker opacity-30'
        onClick={onClose}
        style={{ cursor: "pointer" }}
      />
      <div
        className='relative bg-white shadow-xl w-full max-w-5xl h-full flex py-8 animate-slideInRight'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar header with back arrow */}
        <div
          className='absolute top-6 left-6 z-10 flex items-center gap-2 cursor-pointer'
          onClick={onClose}
        >
          <ArrowLeft className='w-6 h-6 text-gray-500 hover:text-gray-700 transition' />
        </div>
        {/* 2-column layout */}
        <div className='w-full max-w-sm border-r border-gray-100 bg-white'>
          <ProfileSidebar
            onHireNow={() => {
              onClose();
              navigate(hirePath);
            }}
            onMessage={() => {
              onClose();
              navigate(messagePath);
            }}
          />
        </div>
        <div className='flex-1 min-w-0 overflow-y-auto hide-scrollbar p-6 md:p-4'>
          {/* Tab Navigation */}
          <div className='bg-[#F3F4F6] p-1.5 rounded-full flex flex-wrap gap-1'>
            {PROFILE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-2.5 rounded-full text-sm font-bold transition-all",
                  activeTab === tab
                    ? "bg-white text-[#2D2D2D] shadow-sm"
                    : "text-gray-dark hover:text-gray-dark/70",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Tab Content Rendering */}
          <div className='mt-10 animate-in fade-in duration-500'>
            <TabSections activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}
