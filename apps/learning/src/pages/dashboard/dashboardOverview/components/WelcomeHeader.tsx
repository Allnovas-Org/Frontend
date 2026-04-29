import React from 'react'
import { Flame, Rocket, Calendar, Layout, BookOpen, Clock, MoreHorizontal } from 'lucide-react';
import ProgressBar from "./ProgressBar"


const WelcomeHeader = () => (
  <div className="flex flex-col md:flex-row gap-6 mb-8">
    <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, Shemilore</h1>
      <p className="text-gray-500 text-sm mb-6">You're 24% closer to becoming a product designer</p>
      <ProgressBar progress={24} colorClass="bg-gradient-to-r from-purple-600 to-pink-500" />
    </div>
    
    <div className="w-full md:w-80 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-gray-900">Daily Streak</span>
        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
          <span className="text-orange-600 font-bold">56</span>
          <Flame size={16} className="text-orange-500 fill-orange-500" />
        </div>
      </div>
      <div className="flex justify-between">
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center border ${i < 3 ? 'border-orange-200 bg-orange-50' : 'border-gray-100'}`}>
            {i < 3 && <Flame size={14} className="text-orange-500 fill-orange-500" />}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WelcomeHeader