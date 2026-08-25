import { CourseCard } from "../../../../../components/dashboard/shared/CourseCard";
import type { Course } from "../../../../../shared/types/dashboard";

interface SuggestedLearningPathSectionProps {
  title: string;
  courses: Course[];
}

export function SuggestedLearningPathSection({
  title,
  courses,
}: SuggestedLearningPathSectionProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-gray-700">{title}</p>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
