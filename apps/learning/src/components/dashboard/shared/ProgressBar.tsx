import { cn } from "../../../shared/utils/cn";

interface ProgressBarProps {
  value: number; // 0-100
  trackClassName?: string;
  fillClassName?: string;
  heightClassName?: string;
  /** "solid" for course/project cards, "gradient" for the main overall-progress bar (matches Figma) */
  variant?: "solid" | "gradient";
}

export function ProgressBar({
  value,
  trackClassName,
  fillClassName = "bg-[#6A0DAD]",
  heightClassName = "h-1.5",
  variant = "solid",
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn("w-full rounded-full bg-gray-100", heightClassName, trackClassName)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "rounded-full",
          heightClassName,
          variant === "gradient"
            ? "bg-gradient-to-r from-[#7815BD] to-[#D74BA0]"
            : fillClassName
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
