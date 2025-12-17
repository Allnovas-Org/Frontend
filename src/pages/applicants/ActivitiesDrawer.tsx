import React from "react";
import { X } from "lucide-react";

//Activity data structure
type Activity = {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
};

type ActivitiesByDate = {
  [date: string]: Activity[];
};

interface ActivitiesDrawerProps {
  open: boolean;
  onClose: () => void;
  activities: ActivitiesByDate;
}

// Helper to get total activities for "Today"
const getTodayCount = (activities: ActivitiesByDate) =>
  activities["Today"] ? activities["Today"].length : 0;

// Helper to get total activities overall
const getTotalCount = (activities: ActivitiesByDate) =>
  Object.values(activities).reduce((acc, arr) => acc + arr.length, 0);

const ActivitiesDrawer: React.FC<ActivitiesDrawerProps> = ({
  open,
  onClose,
  activities,
}) => {
  const drawerRef = React.useRef<HTMLDivElement>(null);
  // Close drawer when clicking outside
  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);
  // Use slideInRight when opening, slideOutRight when closing
  const sidebarClass = open
    ? "animate-slideInRight fixed top-0 right-0 w-[450px] bg-white shadow-lg z-[100] transition-all duration-300"
    : "animate-slideOutRight fixed top-0 right-0 w-[450px] bg-white shadow-lg z-[100] pointer-events-none transition-all duration-300";

  return (
    <aside
      ref={drawerRef}
      className={sidebarClass}
      style={{ maxWidth: "100vw" }}
    >
      {/* Header Section */}
      <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
        <div>
          <h2 className='text-lg font-bold flex items-center gap-2'>
            All Activities{" "}
            <span className='text-base font-semibold text-gray-500'>
              ({getTotalCount(activities)})
            </span>
          </h2>
          <p className='text-sm text-gray-dark mt-1'>Latest updates</p>
        </div>
        <button
          onClick={onClose}
          aria-label='Close drawer'
          className='p-2 rounded-full hover:bg-gray-100 focus:outline-none'
        >
          <X className='w-5 h-5 text-gray-600' />
        </button>
      </div>
      {/* Activities List Grouped by Date */}
      <div className='overflow-y-auto h-[calc(100vh-80px)] px-6 py-4'>
        {Object.entries(activities).map(([date, acts]) => (
          <div key={date} className='mb-6'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-base font-semibold text-gray-dark'>
                {date}
                {date === "Today" && (
                  <span className='text-base font-semibold text-gray-dark ml-1'>
                    ({acts.length})
                  </span>
                )}
              </span>
            </div>
            <ul className='space-y-4'>
              {acts.map((activity) => (
                <li key={activity.id} className='flex gap-3 items-start'>
                  {/* Activity Icon (already styled in ApplicantsNavbar) */}
                  {activity.icon}
                  {/* Activity Details */}
                  <div className='flex-1'>
                    <div className='font-medium text-gray-900'>
                      {activity.title}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {activity.subtitle}
                    </div>
                    <div className='flex items-center gap-1 text-xs text-gray-light'>
                      {activity.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* If no activities, show empty state */}
        {getTotalCount(activities) === 0 && (
          <div className='text-center text-gray-400 py-10'>
            No activities yet.
          </div>
        )}
      </div>
    </aside>
  );
};

export default ActivitiesDrawer;
