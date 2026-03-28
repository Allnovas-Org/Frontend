import React from "react";
import {
  CheckCircle2,
  Heart,
  MapPin,
  MessageSquareText,
  MoreHorizontal,
  Star,
  ThumbsDown,
  ThumbsUp,
  UserRoundPlus,
  Zap,
} from "lucide-react";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const ActionButton = ({
  children,
  variant = "primary",
  icon,
  iconPosition = "right",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "secondary";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseStyles =
    "group inline-flex items-center gap-2 h-[52px] rounded-xl px-2 transition-all duration-200 text-sm font-semibold ";
  const variants = {
    primary: "bg-primary text-white ",
    secondary: "bg-[#2A2A2A] text-white hover:bg-[#333333]",
    outline:
      "bg-transparent border border-[#F85656] text-[#F85656] hover:bg-primary",
  };
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        iconPosition === "left" ? "flex-row-reverse pl-6" : "pl-6",
        className,
      )}
      {...props}
    >
      {icon && <div className='flex items-center '>{icon}</div>}
      <span className='px-2 whitespace-nowrap'>{children}</span>
    </button>
  );
};

const QuickStat = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className='flex flex-col items-center gap-2 cursor-pointer group'>
    <div className='text-gray-400 group-hover:text-gray-600'>{icon}</div>
    <span className='text-[11px] text-gray-500 font-medium'>{label}</span>
  </div>
);

function ProfileSidebar({
  onHireNow,
  onMessage,
}: {
  onHireNow: () => void;
  onMessage: () => void;
}) {
  return (
    <div className='space-y-5 p-6 md:p-4'>
      <div className='flex flex-col items-start gap-4'>
        <div className='relative'>
          <img
            src='/images/applicants/avatar2.png'
            alt='Alex'
            className='w-16 h-16 rounded-2xl object-cover'
          />
          <div className='absolute -bottom-2 -right-32 bg-white p-1 rounded-lg shadow-sm border border-blue-50'>
            <span className='text-[8px] font-bold text-blue-500 flex items-center gap-1'>
              <Zap size={10} /> Available now
            </span>
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold flex items-center gap-2'>
            Alex Johnson{" "}
            <CheckCircle2 size={20} className=' fill-blue-500 text-white' />
            <Heart size={14} className='text-primary ml-1' />
          </h1>
          <p className='text-gray-dark text-base mt-1 leading-relaxed'>
            Senior UI/UX Designer | Figma expert | QUICK turnaround | Speed
          </p>
          <div className='flex items-center gap-2 text-gray-dark/5 text-xs mt-3'>
            <MapPin size={14} /> California, USA - 12:43 PM local time
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2 bg-gray-light p-4 rounded-lg text-center'>
        <div>
          <p className='text-sm text-gray-dark mb-1'>Total earnings</p>
          <p className='font-bold text-lg'>$16.5K</p>
        </div>
        <div className='border-x border-gray-200'>
          <p className='text-sm text-gray-dark mb-1'>Total jobs</p>
          <p className='font-bold text-lg'>290</p>
        </div>
        <div>
          <p className='text-sm text-gray-dark mb-1'>Total hours</p>
          <p className='font-bold text-lg'>2,131</p>
        </div>
      </div>

      <div className='flex gap-3'>
        <ActionButton
          className='flex-1'
          icon={<UserRoundPlus size={16} />}
          onClick={onHireNow}
        >
          Hire Now
        </ActionButton>
        <ActionButton
          variant='outline'
          className='flex-1'
          icon={<MessageSquareText size={16} />}
          onClick={onMessage}
        >
          Message
        </ActionButton>
      </div>

      <div className='flex justify-between px-2 pt-4'>
        <QuickStat
          icon={<Star className='text-yellow-400 fill-yellow-400' />}
          label='4.8 (200)'
        />
        <QuickStat
          icon={<ThumbsUp size={18} className='' />}
          label='Shortlisted'
        />
        <QuickStat icon={<ThumbsDown size={18} />} label='Ineligible' />
        <QuickStat icon={<MoreHorizontal size={18} />} label='More' />
      </div>
    </div>
  );
}

export default ProfileSidebar;
