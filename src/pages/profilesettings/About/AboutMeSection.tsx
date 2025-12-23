import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { EditAboutModal } from "./EditAboutModal";
import ToolsModal from "../Tools/ToolsModal";

interface AboutMeSectionProps {
  showEdit: boolean;
}

const AboutTab: React.FC<AboutMeSectionProps> = ({ showEdit }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [toolsModalOpen, setToolsModalOpen] = useState(false);
  const [aboutMeText, setAboutMeText] = useState(
    "I am dedicated freelancer with 5 years of experience in Product designer, using different product design tools to deliver quality works to my clients. I have dedicated my time to improve my skills, by learning from various platforms in order to get better and stay up to date in my field. I have dedicated my time to improve my skills, by learning from various platforms in order to get better and stay up to date in my field. I have dedicated my time to improve my skills, by learning from various platforms in order to get better and stay up to date in my field."
  );
  const [tools, setTools] = useState([
    "Figma",
    "Adobe Xd",
    "Photoshop",
    "Lightroom Xd",
  ]);

  return (
    <div className='flex-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-3 relative shadow-sm'>
      {showEdit && (
        <button
          className='absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors'
          onClick={() => setEditOpen(true)}
        >
          <Pencil size={14} />
        </button>
      )}
      <EditAboutModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        initialBio={aboutMeText}
        onSave={(values) => {
          setAboutMeText(values.bio);
          setEditOpen(false);
        }}
      />

      <section className='mb-8 sm:mb-10'>
        <h2 className='text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 sm:mb-6'>
          About Me
        </h2>
        <div className='space-y-3 sm:space-y-4 text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl'>
          <p>{aboutMeText}</p>
          <button className='text-purple-700 font-semibold hover:underline'>
            Read More...
          </button>
        </div>
      </section>

      <div className='grid grid-cols-1 md:grid-cols-[minmax(0,75px)_1fr_minmax(0,80px)] gap-4 sm:gap-2 md:gap-3 pt-6 sm:pt-8 border-t border-gray-50 items-start'>
        <div className='w-20 sm:w-20'>
          <span className='text-xs text-gray-400 block mb-2'>Experience</span>
          <span className='text-base sm:text-sm font-bold text-gray-800'>
            4+ Years
          </span>
        </div>

        <div className='relative'>
          <div className='flex justify-between items-center'>
            <span className='text-xs text-gray-400 block mb-2 sm:mb-3'>
              Tools
            </span>
            {showEdit && (
              <button
                className='bg-gray-100 rounded-full p-2 text-gray-400 hover:text-gray-600 transition-colors mb-1'
                onClick={() => setToolsModalOpen(true)}
              >
                <Pencil size={14} />
              </button>
            )}
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2'>
            {tools.map((tool) => (
              <span
                key={tool}
                className='px-2 sm:px-3 py-1 border border-gray-200 rounded-full text-xs text-gray-600 text-center truncate'
              >
                {tool}
              </span>
            ))}
          </div>
          <ToolsModal
            open={toolsModalOpen}
            onClose={() => setToolsModalOpen(false)}
            tools={tools}
            setTools={setTools}
          />
        </div>

        <div className='w-20 sm:w-20'>
          <span className='text-xs text-gray-400 block mb-2'>Language</span>
          <span className='text-base sm:text-sm font-bold text-gray-800'>
            English
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
