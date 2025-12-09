import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import React from "react";

interface AppButtonProps {
  children: ReactNode;
  color?: string;
  textColor?: string;
  onClick?: () => void;
}

export default function AppButton({
  children,
  color = "bg-purple-600",
  textColor = "text-white",
  onClick,
}: AppButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group 
        relative 
        ${color} ${textColor}
        font-medium px-6 py-3 rounded-lg
        flex items-center
        transition-all duration-300
        overflow-hidden
        w-fit
      `}
    >
      {/* Arrow (starts on the left) */}
      <span
        className="
          absolute left-3 
          transition-all duration-300
          group-hover:left-[85%]
        "
      >
        <ArrowRight className="w-5 h-5" />
      </span>

      {/* Text (moves slightly left on hover) */}
      <span
        className="
          ml-5
          transition-transform duration-300
          group-hover:-translate-x-2
        "
      >
        {children}
      </span>
    </button>
  );
}
