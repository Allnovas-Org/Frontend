import React from 'react'
import { Flame, Rocket, Calendar, Layout, BookOpen, Clock, MoreHorizontal } from 'lucide-react';
import UserAvatars from "./UserAvatar"

const CurrentProjectCard = ({ title, company, color }: { title: string, company: string, color: string }) => (
  <div className="bg-white relative mt-4 px-6 py-12 rounded-[2rem] border border-neutral-100 shadow-sm flex flex-col items-center text-center transition-transform hover:scale-[1.02]">
    <div className={`w-16 h-16 ${color} absolute -top-6 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-current/20`}>
      <Rocket className="text-white" size={28} />
    </div>
    <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
    <p className="text-purple-400 text-sm mb-6">{company}</p>
    <UserAvatars />
    <div className="w-full mt-8">
       <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-2">
         <span>Progress</span>
         <span>75%</span>
       </div>
       <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
         <div className="w-[75%] h-full bg-green-400" />
       </div>
    </div>
  </div>
);

export default CurrentProjectCard