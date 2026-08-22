import type { Project } from "../../../../../shared/types/dashboard";
import { ProjectCard } from "./ProjectCard";

interface CurrentProjectsSectionProps {
  projects: Project[];
}

export function CurrentProjectsSection({
  projects,
}: CurrentProjectsSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-900">Current Projects</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
