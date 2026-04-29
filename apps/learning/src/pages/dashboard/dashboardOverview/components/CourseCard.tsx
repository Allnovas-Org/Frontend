import React from "react";
import { Bookmark } from "lucide-react";

const CourseCard = () => {
	return (
		<div className="bg-white p-2 rounded-xl shadow-sm overflow-hidden border border-neutral-200">
			<div className="relative">
				<img
					src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
					className="h-40 w-full object-cover rounded-xl"
					alt="Course thumbnail"
				/>
				<span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
					Beginner
				</span>
			</div>

			<div className="p-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-gray-300 rounded-full" />
						<div>
							<p className="text-sm font-medium">Adebayo</p>
							<p className="text-xs text-gray-500">Senior Frontend Engineer</p>
						</div>
					</div>
					<Bookmark size={16} className="text-purple-600" />
				</div>

				<h3 className="font-semibold text-sm mb-2">
					FULL-STACK WEB DEVELOPMENT
				</h3>
				<p className="text-xs text-gray-500 mb-3">
					From your first HTML tag to deploying a complete web app.
				</p>

				<ul className="text-xs text-gray-600 space-y-1 mb-3">
					{[1, 2, 3].map((m) => (
						<li key={m} className="flex items-center gap-2">
							<span className="w-2 h-2 bg-purple-600 rounded-full" />
							Milestone {m} — Build feature
						</li>
					))}
				</ul>
				<div className="flex justify-between rounded-xl items-center mt-4 border border-neutral-100 p-2">
					<span className="font-semibold">$200</span>
					<button className="text-xs border border-neutral-100 px-3 py-1 rounded-lg">
						Start with 50%
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
