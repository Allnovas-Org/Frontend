import React from 'react'
import { Star, Bookmark } from "lucide-react";
import UserAvatar from "./UserAvatar";



const RecommendedCourseCard = ({
	image,
	instructor,
	title,
	rating,
	reviews,
	students,
	progress,
	price,
}: any) => {

  const TechTag = ({ text, color }: { text: string; color: string }) => (
		<span
			className={`px-3 py-1 rounded-md text-[10px] font-bold border ${color}`}
		>
			{text}
		</span>
  );
  
	return (
		<div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col p-3 hover:shadow-md transition-shadow">
			{/* Thumbnail Area */}
			<div className="relative h-36 rounded-lg overflow-hidden mb-4">
				<img src={image} alt={title} className="w-full h-full object-cover" />
				<span className="absolute bottom-4 border border-green-600 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
					Beginner
				</span>
			</div>

			{/* Instructor & Save */}
			<div className="flex justify-between items-center mb-3">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden" />
					<div>
						<p className="text-xs font-bold text-[#1A1C3D]">
							{instructor.name}
						</p>
						<p className="text-[9px] text-gray-400 font-medium">
							{instructor.role}
						</p>
					</div>
				</div>
				<button className="text-gray-400 hover:text-purple-600 transition-colors">
					<Bookmark size={18} />
				</button>
			</div>

			{/* Ratings */}
			<div className="flex items-center gap-2 mb-3">
				<div className="flex items-center text-orange-400">
					<Star size={12} fill="currentColor" />
					<span className="text-[11px] font-black ml-1">4.9</span>
				</div>
				<span className="text-[10px] text-gray-400 font-medium">
					{reviews} reviews
				</span>
				<div className="flex -space-x-2 ml-auto">
					<UserAvatar width="w-5" height="h-5" />
					<span className="text-[9px] font-bold text-gray-400 ml-3 self-center">
						{students} Students
					</span>
				</div>
			</div>

			{/* Course Title & Tags */}
			<h3 className="text-sm text-[#1A1C3D] uppercase mb-3">
				{title}
			</h3>

			<div className="flex gap-2 mb-4">
				<TechTag
					text="HTML5"
					color="text-blue-600 bg-blue-50 border-blue-100"
				/>
				<TechTag
					text="CSS3"
					color="text-orange-600 bg-orange-50 border-orange-100"
				/>
				<TechTag
					text="Git & GitHub"
					color="text-pink-600 bg-pink-50 border-pink-100"
				/>
			</div>

			{/* What you'll learn */}
			<div className="mb-4">
				<h4 className="text-[11px] font-bold text-[#1A1C3D] mb-2">
					What you'll learn
				</h4>
				<ul className="space-y-1.5">
					{[
						"Understand core concepts",
						"Build real-world projects",
						"Use industry-standard tools",
					].map((text, i) => (
						<li
							key={i}
							className="flex items-start gap-2 text-[10px] text-gray-500 font-medium"
						>
							<span className="mt-1 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
							{text}
						</li>
					))}
				</ul>
			</div>

			{/* Progress */}
			<div className="mb-6">
				<div className="flex justify-between text-[10px] font-bold mb-1.5">
					<span className="text-[#1A1C3D]">Your progress</span>
					<span className="text-gray-400">{progress}%</span>
				</div>
				<div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
					<div
						className="h-full bg-purple-600 rounded-full"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			{/* You'll Build Roadmap */}
			<div className="bg-[#F9FAFB] rounded-2xl p-4 mb-6">
				<h4 className="text-[10px] font-black text-[#1A1C3D] uppercase tracking-widest mb-3">
					You'll build
				</h4>
				<div className="space-y-3">
					{[
						{ id: 1, title: "Responsive portfolio website" },
						{ id: 2, title: "Interactive JavaScript Components" },
					].map((item) => (
						<div key={item.id} className="flex items-center gap-3">
							<span className="w-5 h-5 flex items-center justify-center rounded-md border border-purple-200 text-purple-600 text-[10px] font-black">
								{item.id}
							</span>
							<span className="text-[10px] font-bold text-gray-400">
								{item.title}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Pricing Footer */}
			<div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
				<span className="text-xl font-black text-[#1A1C3D]">${price}</span>
				<div className="bg-[#F3F4F6] px-3 py-1.5 rounded-xl border border-gray-200 flex flex-col">
					<span className="text-[8px] font-bold text-gray-500">
						Start with 50%
					</span>
					<span className="text-[9px] font-black text-[#1A1C3D]">
						$100 Today
					</span>
				</div>
			</div>
		</div>
	);
};

export default RecommendedCourseCard