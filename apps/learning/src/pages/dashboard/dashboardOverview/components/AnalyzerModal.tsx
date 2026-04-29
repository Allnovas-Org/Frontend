import React, { useState, useEffect } from "react";
import { X, Search, FolderSync, CircleArrowUp, Palette, Clock, BookOpen, RotateCcw, ArrowRight, CheckCircle2 } from "lucide-react";

type ViewState = "assessment" | "analyzing" | "result";

const AnalyzingView = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
      <div className="relative mb-8">
         <RotateCcw size={80} className="text-blue-500 animate-spin duration-[3s]" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Analyzing your answers</h2>
      
      <div className="w-full max-w-xs space-y-6">
        {[
          { icon: <Search size={24} />, text: "Looking at your interest" },
          { icon: <FolderSync size={24} />, text: "Looking at your interest" },
          { icon: <CircleArrowUp size={24} />, text: "Looking at your interest" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-gray-600 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
            <div className="p-2 border border-gray-200 rounded-full">{item.icon}</div>
            <span className="text-lg font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default AnalyzingView