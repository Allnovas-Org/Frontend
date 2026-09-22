import { Code, Bug, Palette, DeviceMobile, Robot } from "@phosphor-icons/react";
import type { Project } from "../../../../../shared/types/dashboard";
import { ProgressBar } from "../../../../../components/dashboard/shared/ProgressBar";

interface ProjectCardProps {
  project: Project;
}

const getProjectIcon = (projectName: string) => {
  switch (projectName) {
    case "App Development":
      return <Code size={30} weight="fill" className="text-white" />;

    case "Software Testing":
      return <Bug size={30} weight="fill" className="text-white" />;

    case "UI/UX Design":
      return <Palette size={30} weight="fill" className="text-white" />;

    case "Mobile Development":
      return <DeviceMobile size={30} weight="fill" className="text-white" />;

    case "Artificial Intelligence":
      return <Robot size={30} weight="fill" className="text-white" />;

    default:
      return <Code size={30} weight="fill" className="text-white" />;
  }
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative mt-8 rounded-[18px] bg-white px-6 pb-6 pt-12 shadow-[10px_12px_28px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[14px_16px_36px_rgba(15,23,42,0.12)]">
      {/* Floating Icon */}
      <div
        className={`absolute -top-8 left-1/2 flex h-[72px] w-[72px] -translate-x-1/2 items-center justify-center rounded-[20px] ring-4 ring-white ${project.iconColorClass} shadow-[0_12px_24px_rgba(15,23,42,0.12),6px_10px_18px_rgba(0,0,0,0.08)]`}
      >
        {getProjectIcon(project.name)}
      </div>

      {/* Title */}
      <div className="text-center">
        <h3 className="text-[17px] font-semibold text-[#3D3F8F]">
          {project.name}
        </h3>

        <p className="mt-1 text-sm text-[#9A86C9]">{project.team}</p>
      </div>

      {/* Team Members */}
      <div className="mt-6 flex justify-center -space-x-3">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt=""
          className="h-9 w-9 rounded-full border-2 border-white object-cover"
        />
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt=""
          className="h-9 w-9 rounded-full border-2 border-white object-cover"
        />
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt=""
          className="h-9 w-9 rounded-full border-2 border-white object-cover"
        />
      </div>

      {/* Progress */}
      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Progress</span>

          <span className="text-sm font-semibold text-gray-700">
            {project.progress}%
          </span>
        </div>

        <ProgressBar value={project.progress} fillClassName="bg-[#71CB85]" />
      </div>
    </div>
  );
}
