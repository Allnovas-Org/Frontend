import React from "react";

interface Props {
  label: string;
  value: string | number;
}

const StatsCard = ({ label, value }: Props) => {
  return (
    <div className='rounded-lg border border-input p-5'>
      <p className='text-xl font-semibold'>{value}</p>
      <p className='text-sm text-gray-500'>{label}</p>
    </div>
  );
};

export default StatsCard;
