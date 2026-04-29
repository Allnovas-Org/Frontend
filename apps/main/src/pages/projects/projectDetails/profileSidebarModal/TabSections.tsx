import React from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Star,
} from "lucide-react";
import { TabType } from "./types";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const CoverLetter = () => (
  <div className='space-y-6 text-[#555] leading-relaxed'>
    <div className='flex justify-between items-start'>
      <h2 className='text-2xl font-bold text-[#2D2D2D]'>Cover letter</h2>
      <div className='text-right'>
        <p className='text-sm text-gray-400'>Proposed bid</p>
        <p className='text-xl font-bold text-[#2D2D2D]'>$80.00/hr</p>
      </div>
    </div>
    <p>
      Hello there, Mark! I've reviewed your website post and attachments and can
      deliver exactly what you are looking for within your proposed timeframe or
      even less. Hit me up, i can exceed your expectations
    </p>
    <div className='space-y-2'>
      <p>Have a look at my portfolio:</p>
      <a href='#' className='text-green-600 underline'>
        https://1dry.ms/1/sAslL92bCe3Xnh/X4pS6cQWajKrV5?e-dcBIXL
      </a>
    </div>
    <ul className='space-y-4'>
      {[1, 2, 3].map((i) => (
        <li key={i} className='flex gap-3'>
          <ArrowRight size={18} className='mt-1 shrink-0 text-gray-400' />
          <p>
            I'll design 10 unique headers, visually striking covers that use
            phrases like "I Freelance" and "Freelancer for Hire" to instantly
            connect with top freelancers
          </p>
        </li>
      ))}
    </ul>
    <div className='pt-4 space-y-4'>
      <h3 className='font-bold text-[#2D2D2D] flex items-center gap-2'>
        <CheckCircle2 size={20} className='text-green-500' /> Why choose me?
      </h3>
      <ul className='space-y-2 pl-7'>
        <li className='list-disc'>I've got sound knowledge of prototyping</li>
        <li className='list-disc'>
          I am very proficient in using Figma, Figjam and other design tools...
        </li>
      </ul>
    </div>
  </div>
);

const WorkHistory = () => (
  <div className='space-y-6'>
    <div className='flex justify-between items-end mb-8'>
      <h2 className='text-2xl font-bold'>Work history</h2>
      <div className='text-right'>
        <p className='text-gray-400 text-sm'>Completed project</p>
        <p className='text-xl font-bold'>3/3</p>
      </div>
    </div>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className='flex flex-col md:flex-row gap-6 p-6 border border-gray-100 rounded-3xl hover:border-gray-200 transition-all'
      >
        <div className='w-full md:w-48 h-36 bg-white rounded-2xl overflow-hidden'>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400')] bg-cover" />
        </div>
        <div className='flex-1'>
          <div className='flex justify-between items-start'>
            <h3 className='font-bold text-lg'>
              Landing page design for spotify
            </h3>
            <div className='text-right'>
              <span className='text-green-600 font-bold'>$2,800</span>
              <div className='flex text-yellow-400 mt-1'>
                <Star size={12} fill='currentColor' />
                <Star size={12} fill='currentColor' />
                <Star size={12} fill='currentColor' />
                <Star size={12} fill='currentColor' />{" "}
                <span className='text-gray-400 text-[10px] ml-1'>4/5</span>
              </div>
            </div>
          </div>
          <p className='text-gray-500 text-sm mt-2 line-clamp-2'>
            Landing Page Design refers to the strategic creation of a standalone
            web page specifically crafted to achieve a single, focused
            objective...
          </p>
          <div className='flex flex-wrap gap-2 mt-4'>
            {["UI/UX design", "Figma", "Adobe XD", "Sketch"].map((tag) => (
              <span
                key={tag}
                className='px-3 py-1  rounded-full text-[11px] text-input border border-input'
              >
                {tag}
              </span>
            ))}
          </div>
          <div className='mt-4 flex justify-between text-sm text-gray-500'>
            <span className='inline-flex gap-2'>
              <CalendarDays size={14} className='text-gray-400' />
              Duration: 6 weeks
            </span>
            <span>Completed: 24/07/2024</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ClientsFeedback = () => (
  <div className='space-y-8'>
    <div className='flex justify-between items-center'>
      <h2 className='text-2xl font-bold'>Work history</h2>
      <div className='flex items-center gap-2 text-sm'>
        <Star size={16} className='text-yellow-400 fill-yellow-400' />
        <span className='font-bold'>4.8</span>
        <span className='text-gray-400'>(200 reviews)</span>
      </div>
    </div>
    {[
      { name: "Alex Johnson", company: "Spotify Inc.", date: "July 2024" },
      {
        name: "Olatunji Aina",
        company: "Payflow Solutions",
        date: "June 2024",
      },
      { name: "Emma Rodriguez", company: "ShopEasy Ltd.", date: "July 2024" },
    ].map((client, i) => (
      <div key={i} className='pb-5 border-b border-gray-100 last:border-0'>
        <div className='flex justify-between items-start mb-2'>
          <div className='flex gap-4'>
            <div className='w-11 h-11 rounded-full bg-gray-200 overflow-hidden'>
              <img src={`https://i.pravatar.cc/150?u=${client.name}`} alt='' />
            </div>
            <div>
              <h4 className='font-bold'>{client.name}</h4>
              <p className='text-sm text-gray-500'>{client.company}</p>
            </div>
          </div>
          <div className='text-right'>
            <div className='flex text-yellow-400'>
              <Star size={14} fill='currentColor' />{" "}
              <Star size={14} fill='currentColor' />{" "}
              <Star size={14} fill='currentColor' />{" "}
              <Star size={14} fill='currentColor' />{" "}
              <Star size={14} fill='currentColor' />
            </div>
            <p className='text-xs text-gray-400 mt-1'>{client.date}</p>
          </div>
        </div>
        <p className='text-gray-600 text-sm leading-relaxed'>
          Alex delivered exceptional work on our landing page design. The
          attention to detail and user experience considerations were
          outstanding. The final design exceeded our expectations...
        </p>
        <p className='text-xs text-gray-400 mt-3 italic'>
          Project: Landing page design for Spotify
        </p>
      </div>
    ))}
  </div>
);

const Portfolio = () => (
  <div className='space-y-6'>
    <div className='flex justify-between items-center'>
      <h2 className='text-2xl font-bold'>Portfolio</h2>
      <button className='text-primary text-sm font-medium flex items-center gap-1 hover:underline'>
        View full portfolio <ExternalLink size={14} />
      </button>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className='group border border-input/10 p-4 rounded-3xl overflow-hidden hover:shadow-md transition-shadow'
        >
          <div className='aspect-4/3 bg-gray-100 overflow-hidden'>
            <img
              src={`https://picsum.photos/seed/${i + 20}/600/400`}
              className='w-full rounded-t-3xl h-full object-cover group-hover:scale-105 transition-transform duration-500'
              alt=''
            />
          </div>
          <div className='p-5 space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='text-[11px] px-3 py-1 border border-input rounded-full text-gray-dark'>
                Web Design
              </span>
              <ExternalLink size={16} className='text-gray-dark' />
            </div>
            <h4 className='font-bold text-lg'>Landing Page UI Design</h4>
            <p className='text-xs text-gray-500 line-clamp-2'>
              Modern landing page design for Spotify's podcast feature with
              focus on conversion optimization.
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => (
  <div className='space-y-6'>
    <div className='flex justify-between items-center'>
      <h2 className='text-2xl font-bold'>Skills</h2>
      <p className='text-gray-400 text-sm'>8+ years experience</p>
    </div>
    <div className='divide-y divide-gray-100'>
      {[
        { name: "UI/UX Design", level: "Expert", years: 8 },
        { name: "Figma", level: "Expert", years: 6 },
        { name: "Adobe XD", level: "Advanced", years: 7 },
        { name: "Sketch", level: "Advanced", years: 5 },
        { name: "Prototyping", level: "Expert", years: 8 },
        { name: "User Research", level: "Advanced", years: 6 },
      ].map((skill, i) => (
        <div key={i} className='py-6 flex justify-between items-center group'>
          <div className='space-y-1'>
            <div className='flex items-center gap-3'>
              <h4 className='font-bold text-lg'>{skill.name}</h4>
              <span
                className={cn(
                  "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                  skill.level === "Expert"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-dark text-white",
                )}
              >
                {skill.level}
              </span>
            </div>
            <p className='text-sm text-gray-400'>
              {skill.years} years of experience
            </p>
          </div>
          <Lightbulb
            className='text-orange-300 group-hover:text-orange-400 transition-colors'
            size={16}
          />
        </div>
      ))}
    </div>
  </div>
);

function TabSections({ activeTab }: { activeTab: TabType }) {
  return (
    <>
      {activeTab === "Cover letter" && <CoverLetter />}
      {activeTab === "Work history" && <WorkHistory />}
      {activeTab === "Clients feedback" && <ClientsFeedback />}
      {activeTab === "Portfolio" && <Portfolio />}
      {activeTab === "Skills" && <Skills />}
    </>
  );
}

export default TabSections;
