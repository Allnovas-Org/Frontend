import type { InternshipSkillTag } from "../../../shared/types/internship";

interface SkillTagProps {
  tag: InternshipSkillTag;
}

export function SkillTag({ tag }: SkillTagProps) {
  return (
    <span className={`rounded border px-2 py-1 text-xs font-medium ${tag.colorClass}`}>
      {tag.label}
    </span>
  );
}
