import React from "react";

const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  experience: {
    bg: "bg-[#F5EAFB]",
    text: "text-[#6A0DAD]",
  },
  jobType: {
    bg: "bg-[#ECF9EF]",
    text: "text-[#37B04C]",
  },
  nature: {
    bg: "bg-[#FFF4E5]",
    text: "text-[#E18C19]",
  },
};

export interface BadgeProps {
  type: string;
  value: string;
}

const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  const style = BADGE_STYLES[type] || {};
  return (
    <span
      className={`px-1 py-0.5 rounded-lg text-[11px] font-medium border border-transparent ${style.bg} ${style.text}`}
      style={{
        backgroundColor: style.bg?.replace("bg-[", "").replace("]", ""),
        color: style.text?.replace("text-[", "").replace("]", ""),
      }}
    >
      {value}
    </span>
  );
};

export default Badge;
