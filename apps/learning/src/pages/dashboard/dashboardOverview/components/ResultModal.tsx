import React, { useState, useEffect } from "react";
import {Palette, Clock, BookOpen, RotateCcw, ArrowRight, CheckCircle2 } from "lucide-react";



const ResultView = ({ onRetake, onStartLearning }: { onRetake: () => void, onStartLearning: () => void }) => {
  const skills = [
    "UI/UX Design", "Figma & Design Tools", 
    "Color Theory & Typography", "Design System",
    "Prototyping & Wireframing", "Responsive Design"
  ];

  return (
    <div className="animate-in zoom-in-95 duration-500">
      <div className="text-center mb-6">
        <p className="text-gray-500 text-sm mb-4">Your recommended path</p>
        <div className="inline-flex p-3 bg-purple-100 text-purple-700 rounded-full mb-4">
          <Palette size={32} />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-tight">Design & Creative Plan</h2>
        <p className="text-gray-500">Shape the future through visual storytelling</p>
      </div>

      <div className="space-y-4">
        {/* Why this fits */}
        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
          <h3 className="font-bold text-sm mb-1">Why this fits you</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Based on your interest in creativity and visual problem solving, this path aligns with your strengths and goals.
          </p>
        </div>

        {/* Path Overview */}
        <div className="p-4 border border-gray-100 rounded-xl">
          <h3 className="font-bold text-sm mb-1">Path overview</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
             Based on your interest in creativity and visual problem solving, this path aligns with your strengths and goals.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="p-4 border border-gray-100 rounded-xl">
          <h3 className="font-bold text-sm mb-3">Skills you will learn</h3>
          <div className="grid grid-cols-2 gap-y-3">
            {skills.map(skill => (
              <div key={skill} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2 size={14} className="text-gray-400" />
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600">
          <Clock size={16} /> 2-5 months
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600">
          <BookOpen size={16} /> Beginner friendly
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <button className="flex items-center justify-center gap-2 bg-[#6D11B1] text-white py-3 rounded-xl font-semibold hover:bg-[#5A0E94] transition"
          onClick={onStartLearning}>
          Start Learning <ArrowRight size={18} />
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-200 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
          View learning path <ArrowRight size={18} />
        </button>
      </div>

      <button onClick={onRetake} className="w-full flex items-center justify-center gap-2 mt-6 text-gray-500 text-sm hover:text-gray-800 transition">
        <RotateCcw size={16} /> Retake Assessment
      </button>
    </div>
  );
};

export default ResultView