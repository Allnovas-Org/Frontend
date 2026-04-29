import React from 'react'

const UserAvatar = ({ count = 3, width = "w-8", height = "h-8" }: { count?: number; width?: string; height?: string }) => (
  <div className="flex -space-x-2">
    {[...Array(count)].map((_, i) => (
      <div key={i} className={`${width} ${height} rounded-full border-2 border-white bg-gray-200 overflow-hidden`}>
        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
      </div>
    ))}
  </div>
);

export default UserAvatar


