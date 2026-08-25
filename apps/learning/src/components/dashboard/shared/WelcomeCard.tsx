import { ProgressBar } from "./ProgressBar";

interface WelcomeCardProps {
  userName: string;
  subtitle: string;
  progress: number;
}

export function WelcomeCard({ userName, subtitle, progress }: WelcomeCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <p className="text-lg font-medium text-gray-900">Welcome back, {userName}</p>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
          <span>overall progress</span>
          <span>{progress}%</span>
        </div>
        <ProgressBar value={progress} variant="gradient" />
      </div>
    </div>
  );
}
