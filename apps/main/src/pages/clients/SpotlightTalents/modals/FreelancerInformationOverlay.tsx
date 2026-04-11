import React, { useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import {
	Close,
	Star,
	LocationOn,
	AccessTime,
	FavoriteBorder,
	Favorite,
	Message,
	WorkOutline,
} from "@mui/icons-material";

interface FreelancerInformationOverlayProps {
	open: boolean;
	onClose: () => void;
	freelancer: {
		id: string;
		name: string;
		title: string;
		profileImage: string;
		rating: number;
		jobCount: number;
		location: string;
		responseTime: string;
		hourlyRate: number;
		jobsCompleted: number;
		totalEarnings: number;
		totalHours: number;
		about: string;
		certifications: string[];
		isAvailable: boolean;
	};
	isSaved?: boolean;
	onToggleSave?: (id: string) => void;
}

const FreelancerInformationOverlay: React.FC<
	FreelancerInformationOverlayProps
> = ({ open, onClose, freelancer, isSaved = false, onToggleSave }) => {
	const [activeTab, setActiveTab] = useState<
		"about" | "portfolio" | "experience" | "reviews"
	>("about");

	const tabs = [
		{ id: "about", label: "About" },
		{ id: "portfolio", label: "Portfolio" },
		{ id: "experience", label: "Experience" },
		{ id: "reviews", label: "Reviews" },
	];

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: 3,
					maxHeight: "90vh",
				},
			}}
		>
			<div className="p-8">
				{/* Header */}
				<div className="flex items-start justify-between mb-6">
					<div className="flex items-start gap-4">
						<img
							src={freelancer.profileImage}
							alt={freelancer.name}
							className="w-20 h-20 rounded-full object-cover"
						/>
						<div>
							<div className="flex items-center gap-2 mb-1">
								<h2 className="text-2xl font-semibold">{freelancer.name}</h2>
								{freelancer.isAvailable && (
									<span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
										Available now
									</span>
								)}
							</div>
							<p className="text-gray-600 mb-2">{freelancer.title}</p>
							<div className="flex items-center gap-4 text-sm text-gray-500">
								<div className="flex items-center gap-1">
									<Star sx={{ fontSize: 16, color: "#fbbf24" }} />
									<span className="font-medium">
										{freelancer.rating}/5 ({freelancer.jobCount} jobs)
									</span>
								</div>
								<div className="flex items-center gap-1">
									<LocationOn sx={{ fontSize: 16 }} />
									<span>{freelancer.location}</span>
								</div>
								<div className="flex items-center gap-1">
									<AccessTime sx={{ fontSize: 16 }} />
									<span>{freelancer.responseTime}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<IconButton
							onClick={() => onToggleSave?.(freelancer.id)}
							sx={{
								color: isSaved ? "#ef4444" : "#9ca3af",
								"&:hover": {
									backgroundColor: isSaved ? "#fee2e2" : "#f3f4f6",
								},
							}}
						>
							{isSaved ? <Favorite /> : <FavoriteBorder />}
						</IconButton>
						<IconButton onClick={onClose}>
							<Close />
						</IconButton>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-4 gap-4 mb-8">
					<div className="p-4 bg-gray-50 rounded-lg">
						<h3 className="text-3xl font-bold mb-1">
							${freelancer.hourlyRate.toFixed(2)}
						</h3>
						<p className="text-sm text-gray-600">Price per hour</p>
					</div>
					<div className="p-4 bg-gray-50 rounded-lg">
						<h3 className="text-3xl font-bold mb-1">
							{freelancer.jobsCompleted}
						</h3>
						<p className="text-sm text-gray-600">Jobs Completed</p>
					</div>
					<div className="p-4 bg-gray-50 rounded-lg">
						<h3 className="text-3xl font-bold mb-1">
							${(freelancer.totalEarnings / 1000).toFixed(1)}K
						</h3>
						<p className="text-sm text-gray-600">Total Earnings</p>
					</div>
					<div className="p-4 bg-gray-50 rounded-lg">
						<h3 className="text-3xl font-bold mb-1">
							{freelancer.totalHours.toLocaleString()}
						</h3>
						<p className="text-sm text-gray-600">Total Hours</p>
					</div>
				</div>

				{/* Tabs */}
				<div className="border-b border-gray-200 mb-6">
					<div className="flex gap-8">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() =>
									setActiveTab(
										tab.id as "about" | "portfolio" | "experience" | "reviews",
									)
								}
								className={`pb-4 font-medium transition-colors relative ${
									activeTab === tab.id
										? "text-gray-900"
										: "text-gray-500 hover:text-gray-700"
								}`}
							>
								{tab.label}
								{activeTab === tab.id && (
									<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
								)}
							</button>
						))}
					</div>
				</div>

				{/* Tab Content */}
				<div className="mb-8 max-h-96 overflow-y-auto">
					{activeTab === "about" && (
						<div>
							<h3 className="text-xl font-semibold mb-4">
								About {freelancer.name}
							</h3>
							<p className="text-gray-700 leading-relaxed mb-6">
								{freelancer.about}
							</p>

							<h4 className="font-semibold mb-3">Certifications</h4>
							<div className="space-y-2">
								{freelancer.certifications.map((cert, index) => (
									<div key={index} className="flex items-center gap-2">
										<div className="w-2 h-2 bg-yellow-500 rounded-full" />
										<span className="text-gray-700">{cert}</span>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === "portfolio" && (
						<div className="text-center py-12 text-gray-500">
							Portfolio content coming soon...
						</div>
					)}

					{activeTab === "experience" && (
						<div className="text-center py-12 text-gray-500">
							Experience content coming soon...
						</div>
					)}

					{activeTab === "reviews" && (
						<div className="text-center py-12 text-gray-500">
							Reviews content coming soon...
						</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className="inline-flex justify-between gap-4 w-full">
					<button
						onClick={onClose}
						className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
					>
						Close
					</button>
					<div className="flex gap-4">
						<button className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition flex items-center justify-center gap-2">
							<Message sx={{ fontSize: 20 }} />
							Message
						</button>
						<button className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-2">
							<WorkOutline sx={{ fontSize: 20 }} />
							Hire Now
						</button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default FreelancerInformationOverlay;
