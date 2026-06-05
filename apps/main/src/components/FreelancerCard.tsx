import React from "react";
import {
	Star,
	ArrowForward,
	Favorite,
	FavoriteBorder,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface FreelancerCardProps {
	id: string;
	name: string;
	title: string;
	profileImage: string;
	rating: number;
	jobCount: number;
	skills: string[];
	hourlyRate: number;
	isSaved?: boolean;
	onToggleSave?: (id: string) => void;
	onSeeMore?: (id: string) => void;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({
	id,
	name,
	title,
	profileImage,
	rating,
	jobCount,
	skills,
	hourlyRate,
	isSaved = false,
	onToggleSave,
	onSeeMore,
}) => {
	return (
		<div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all cursor-pointer group relative">
			{/* Save Button - Always visible */}
			{onToggleSave && (
				<IconButton
					onClick={(e) => {
						e.stopPropagation();
						onToggleSave(id);
					}}
					className="absolute top-3 right-3"
					size="small"
					sx={{
						color: isSaved ? "#ef4444" : "#d1d5db",
						"&:hover": {
							backgroundColor: isSaved ? "#fee2e2" : "#f3f4f6",
						},
					}}
				>
					{isSaved ? (
						<Favorite sx={{ fontSize: 20 }} />
					) : (
						<FavoriteBorder sx={{ fontSize: 20 }} />
					)}
				</IconButton>
			)}

			{/* Profile Section */}
			<div className="flex items-start gap-3 mb-4">
				<img
					src={profileImage}
					alt={name}
					className="w-12 h-12 rounded-full object-cover"
				/>
				<div className="flex-1">
					<h3 className="font-semibold text-gray-900">{name}</h3>
					<p className="text-sm text-gray-600">{title}</p>
				</div>
			</div>

			{/* Rating */}
			<div className="flex items-center gap-1 mb-4">
				<Star sx={{ fontSize: 16, color: "#fbbf24" }} />
				<span className="text-sm font-medium">
					{rating}/5 ({jobCount} jobs)
				</span>
			</div>

			{/* Skills */}
			<div className="flex flex-wrap gap-2 mb-4">
				{skills.slice(0, 4).map((skill, index) => (
					<span
						key={index}
						className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
					>
						{skill}
					</span>
				))}
			</div>

			{/* Price and CTA */}
			<div className="flex items-center justify-between pt-4 border-t border-gray-100">
				<span className="text-lg font-semibold">
					${hourlyRate.toFixed(2)}/hr
				</span>
				<button
					onClick={(e) => {
						e.stopPropagation();
						onSeeMore?.(id);
					}}
					className="text-red-500 font-medium flex items-center gap-1 hover:gap-2 transition-all"
				>
					See more
					<ArrowForward sx={{ fontSize: 16 }} />
				</button>
			</div>
		</div>
	);
};

export default FreelancerCard;
