import React from "react";

// Back Arrow icon
export const BackArrowIcon = ({
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width='18'
    height='18'
    fill='none'
    stroke={color}
    strokeWidth='2'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <path d='M19 12H5M11 18l-6-6 6-6' />
  </svg>
);

// Front Arrow icon (opposite of BackArrowIcon)
export const FrontArrowIcon = ({
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width='18'
    height='18'
    fill='none'
    stroke={color}
    strokeWidth='2'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <path d='M5 12h14M13 6l6 6-6 6' />
  </svg>
);

// Magnifier icon for search input
export const MagnifierIcon = ({
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width='18'
    height='18'
    fill='none'
    stroke={color}
    strokeWidth='2'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <circle cx='11' cy='11' r='7' />
    <line x1='21' y1='21' x2='16.65' y2='16.65' />
  </svg>
);

// Most Recent icon
export const RecentIcon = ({
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width='18'
    height='18'
    fill='none'
    stroke={color}
    strokeWidth='2'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <path d='M12 6v6l4 2' />
    <circle cx='12' cy='12' r='10' />
  </svg>
);

// Filter icon
export const FilterIcon = ({
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width='20'
    height='20'
    fill='none'
    stroke={color}
    strokeWidth='2'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <line x1='4' y1='6' x2='20' y2='6' />
    <line x1='8' y1='12' x2='16' y2='12' />
    <line x1='10' y1='18' x2='14' y2='18' />
  </svg>
);

// Chevron Left icon
export const ChevronLeftIcon = ({
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width='20'
    height='20'
    fill='none'
    stroke={color}
    strokeWidth='2'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
  </svg>
);

// Chevron Right icon
export const ChevronRightIcon = ({
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width='20'
    height='20'
    fill='none'
    stroke={color}
    strokeWidth='2'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
  </svg>
);

// Heart icon
export const HeartIcon = ({
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width='20'
    height='20'
    fill='none'
    stroke={color}
    strokeWidth='1.5'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M16.5 7.5a3.75 3.75 0 00-6 0l-.75.75-.75-.75a3.75 3.75 0 10-6 6l.75.75L12 21l7.5-7.5.75-.75a3.75 3.75 0 00-6-6z'
    />
  </svg>
);

// Time icon
export const TimeIcon = ({
  className = "",
  color = "currentColor",
  ...props
}) => (
  <svg
    width='20'
    height='20'
    fill='none'
    stroke={color}
    strokeWidth='1.5'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <circle
      cx='12'
      cy='12'
      r='9'
      stroke='currentColor'
      strokeWidth='1.5'
      fill='none'
    />
    <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' />
  </svg>
);
