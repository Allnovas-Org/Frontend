import { Star, Users, Bookmark } from "lucide-react";
import type { Course } from "../../../shared/types/dashboard";
import { ProgressBar } from "./ProgressBar";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const {
    thumbnailUrl,
    level,
    instructorName,
    instructorTitle,
    rating,
    reviews,
    students,
    title,
    description,
    tags,
    learnPoints,
    buildItems,
    milestones,
    meta,
    price,
    discountPrice,
    progress,
  } = course;

  return (
    <div className="flex w-[420px] flex-shrink-0 flex-col rounded-xl border border-[#E8EAEC] bg-white p-[18px]">
      {/* Thumbnail - inset within card padding, rounded on all corners, not full-bleed */}
      <div className="relative h-[184px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#1E002C] to-[#3A0A4D]">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute bottom-3 left-3 flex items-center rounded-md border border-[#009447] bg-[#3A3346] px-3 py-1.5 text-xs text-white">
          {level}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        {/* Instructor row */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-300" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              {instructorName}
            </p>
            <p className="truncate text-xs text-gray-400">{instructorTitle}</p>
          </div>
          <Bookmark
            size={16}
            strokeWidth={1.5}
            className="flex-shrink-0 text-[#7800B3]"
            aria-hidden="true"
          />
        </div>

        {/* Rating row */}
        <div className="mt-2.5 flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Star
              size={13}
              strokeWidth={0}
              className="fill-amber-400 text-amber-400"
            />
            <span className="font-semibold text-gray-900">{rating}</span>
            {reviews.toLocaleString()} reviews
          </span>
          <span className="flex items-center gap-1 rounded bg-gray-50 px-1.5 py-0.5 text-[11px] text-gray-500">
            <Users size={12} strokeWidth={1.5} />
            {students} Students
          </span>
        </div>

        {/* Title + description */}
        <p className="mt-3 text-sm font-bold uppercase tracking-wide text-gray-900">
          {title}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-violet-50 px-2 py-0.5 text-[11px] text-[#7800B3]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {learnPoints && learnPoints.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-700">
              What you'll learn
            </p>
            <ul className="mt-1.5 space-y-1 text-xs text-gray-500">
              {learnPoints.map((point) => (
                <li key={point} className="flex gap-1.5">
                  <span aria-hidden="true">&bull;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Milestone list - each row with purple bullet + divider line beneath (except last) */}
        {milestones && milestones.length > 0 && (
          <ul className="mt-3">
            {milestones.map((milestone, i) => (
              <li
                key={milestone}
                className={
                  "flex items-center gap-2.5 py-2.5 text-xs text-gray-600" +
                  (i < milestones.length - 1
                    ? " border-b border-[#C7C5C8]/60"
                    : "")
                }
              >
                <span
                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7800B3]"
                  aria-hidden="true"
                />
                <span>
                  Milestone {i + 1} &mdash; {milestone}
                </span>
              </li>
            ))}
          </ul>
        )}

        {typeof progress === "number" && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px] text-gray-500">
              <span>Your progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} heightClassName="h-1" />
          </div>
        )}

        {buildItems && buildItems.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-700">You'll build</p>
            <ul className="mt-1.5 space-y-1.5">
              {buildItems.map((item) => (
                <li
                  key={item.order}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border border-violet-200 text-[10px] text-[#7800B3]">
                    {item.order}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Meta pills row */}
        {meta && (
          <div className="mt-3.5 flex gap-2 text-[11px] text-gray-600">
            <span className="rounded-md border border-gray-200 px-2.5 py-1">
              {meta.milestoneCount} Milestone
            </span>
            <span className="rounded-md border border-gray-200 px-2.5 py-1">
              {meta.volume} Volume
            </span>
            <span className="rounded-md border border-gray-200 px-2.5 py-1">
              {meta.durationMonths} months
            </span>
          </div>
        )}

        {/* Price row */}
        <div className="mt-4 flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          {discountPrice && (
            <span className="rounded-md border border-gray-200 px-2.5 py-1.5 text-right text-[11px] leading-tight text-gray-500">
              Start with 50%
              <br />${discountPrice} Today
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
