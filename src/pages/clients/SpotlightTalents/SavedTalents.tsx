import React, { useState } from "react";
import {
	Search,
	TuneOutlined,
	KeyboardArrowDown,
	SearchOutlined,
} from "@mui/icons-material";
import {
	InputAdornment,
	TextField,
	MenuItem,
	Select,
	FormControl,
} from "@mui/material";
import FreelancerCard from "../../../components/FreelancerCard";
import FreelancerInformationOverlay from "./modals/FreelancerInformationOverlay";
import RelevanceOverlay from "./modals/RelevanceOverlay";
import { Link } from "react-router-dom";

interface Freelancer {
	id: string;
	name: string;
	title: string;
	profileImage: string;
	rating: number;
	jobCount: number;
	skills: string[];
	hourlyRate: number;
	location: string;
	responseTime: string;
	jobsCompleted: number;
	totalEarnings: number;
	totalHours: number;
	about: string;
	certifications: string[];
	isAvailable: boolean;
	category: string;
}

const SavedTalents = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [selectedRelevance, setSelectedRelevance] = useState<string[]>([]);
	const [savedTalents, setSavedTalents] = useState<string[]>([]);
	const [selectedFreelancer, setSelectedFreelancer] =
		useState<Freelancer | null>(null);
	const [relevanceModalOpen, setRelevanceModalOpen] = useState(false);

	// Mock saved freelancers data
	const [freelancers] = useState<Freelancer[]>([
		{
			id: "1",
			name: "Alex Johnson",
			title: "Full-Stack Developer",
			profileImage: "https://i.pravatar.cc/150?img=1",
			rating: 5.0,
			jobCount: 33,
			skills: ["Figma", "Wireframing", "Prototyping", "Graphics design"],
			hourlyRate: 20.0,
			location: "San Francisco, CA",
			responseTime: "Responds immediately",
			jobsCompleted: 33,
			totalEarnings: 16500,
			totalHours: 2131,
			about:
				"I am an experienced web developer with a strong foundation in crafting dynamic, user-focused websites.",
			certifications: [
				"AWS Certified Developer - Associate",
				"Google Cloud Professional Cloud Architect",
			],
			isAvailable: true,
			category: "Web Development",
		},
		{
			id: "2",
			name: "Oluwakayode Akorede",
			title: "Product Designer",
			profileImage: "https://i.pravatar.cc/150?img=2",
			rating: 5.0,
			jobCount: 33,
			skills: ["Web dev", "Front-end dev", "Back-end dev", "React"],
			hourlyRate: 20.0,
			location: "Lagos, Nigeria",
			responseTime: "Responds within hours",
			jobsCompleted: 33,
			totalEarnings: 16500,
			totalHours: 2131,
			about:
				"Product designer with a passion for creating intuitive interfaces.",
			certifications: ["Google UX Design Certificate"],
			isAvailable: true,
			category: "Design",
		},
		{
			id: "3",
			name: "Jemmy June",
			title: "Web Developer",
			profileImage: "https://i.pravatar.cc/150?img=3",
			rating: 5.0,
			jobCount: 33,
			skills: ["Figma", "Wireframing", "Prototyping", "Graphics design"],
			hourlyRate: 20.0,
			location: "New York, NY",
			responseTime: "Responds immediately",
			jobsCompleted: 33,
			totalEarnings: 16500,
			totalHours: 2131,
			about: "Full-stack web developer specializing in modern JavaScript.",
			certifications: ["Meta React Certification"],
			isAvailable: false,
			category: "Web Development",
		},
		{
			id: "4",
			name: "Abigail Ackins",
			title: "Web Developer",
			profileImage: "https://i.pravatar.cc/150?img=4",
			rating: 5.0,
			jobCount: 33,
			skills: ["Code ex", "Node.js", "Back-end dev", "React"],
			hourlyRate: 20.0,
			location: "Austin, TX",
			responseTime: "Responds within a day",
			jobsCompleted: 33,
			totalEarnings: 16500,
			totalHours: 2131,
			about: "Backend specialist with expertise in scalable architectures.",
			certifications: ["AWS Solutions Architect"],
			isAvailable: true,
			category: "Web Development",
		},
		{
			id: "5",
			name: "Wang Yichen",
			title: "UI/UX Designer",
			profileImage: "https://i.pravatar.cc/150?img=5",
			rating: 5.0,
			jobCount: 33,
			skills: ["Figma", "User-interface", "Wireframing", "Prototyping"],
			hourlyRate: 20.0,
			location: "Shanghai, China",
			responseTime: "Responds immediately",
			jobsCompleted: 33,
			totalEarnings: 16500,
			totalHours: 2131,
			about: "Creative UI/UX designer focused on user-centered design.",
			certifications: ["Adobe Certified Expert"],
			isAvailable: true,
			category: "Design",
		},
		{
			id: "6",
			name: "Tim Fredo",
			title: "Video Editor",
			profileImage: "https://i.pravatar.cc/150?img=6",
			rating: 5.0,
			jobCount: 33,
			skills: ["2D animation", "3D animation", "Video editing"],
			hourlyRate: 20.0,
			location: "Los Angeles, CA",
			responseTime: "Responds within hours",
			jobsCompleted: 33,
			totalEarnings: 16500,
			totalHours: 2131,
			about: "Professional video editor with 10+ years of experience.",
			certifications: ["Adobe Premiere Pro Certified"],
			isAvailable: true,
			category: "Video Editing",
		},
		{
			id: "7",
			name: "Vivian Kane",
			title: "Web Developer",
			profileImage: "https://i.pravatar.cc/150?img=7",
			rating: 5.0,
			jobCount: 33,
			skills: ["Code ex", "Node.js", "Back-end dev", "React"],
			hourlyRate: 20.0,
			location: "Seattle, WA",
			responseTime: "Responds immediately",
			jobsCompleted: 33,
			totalEarnings: 16500,
			totalHours: 2131,
			about: "Full-stack developer passionate about clean code.",
			certifications: ["MongoDB Certified Developer"],
			isAvailable: true,
			category: "Web Development",
		},
		{
			id: "8",
			name: "John Konrad",
			title: "Product Designer",
			profileImage: "https://i.pravatar.cc/150?img=8",
			rating: 5.0,
			jobCount: 33,
			skills: ["Figma", "User-interface", "Wireframing", "Prototyping"],
			hourlyRate: 20.0,
			location: "Berlin, Germany",
			responseTime: "Responds within a day",
			jobsCompleted: 33,
			totalEarnings: 16500,
			totalHours: 2131,
			about: "Product designer with a focus on SaaS applications.",
			certifications: ["Figma Advanced Certificate"],
			isAvailable: true,
			category: "Design",
		},
		{
			id: "9",
			name: "Emilia Sophie Schmidt",
			title: "Video Editor",
			profileImage: "https://i.pravatar.cc/150?img=9",
			rating: 5.0,
			jobCount: 33,
			skills: ["2D animation", "3D animation", "Video editing"],
			hourlyRate: 20.0,
			location: "Munich, Germany",
			responseTime: "Responds immediately",
			jobsCompleted: 33,
			totalEarnings: 16500,
			totalHours: 2131,
			about: "Creative video editor specializing in motion graphics.",
			certifications: ["After Effects Specialist"],
			isAvailable: true,
			category: "Video Editing",
		},
	]);

	// Initialize saved talents
	React.useEffect(() => {
		setSavedTalents(freelancers.map((f) => f.id));
	}, [freelancers]);

	const handleToggleSave = (id: string) => {
		setSavedTalents((prev) =>
			prev.includes(id)
				? prev.filter((talentId) => talentId !== id)
				: [...prev, id],
		);
	};

	const handleSeeMore = (id: string) => {
		const freelancer = freelancers.find((f) => f.id === id);
		if (freelancer) {
			setSelectedFreelancer(freelancer);
		}
	};

	const handleApplyRelevance = (selected: string[]) => {
		setSelectedRelevance(selected);
	};

	const savedFreelancers = freelancers.filter((f) =>
		savedTalents.includes(f.id),
	);

	const filteredFreelancers = savedFreelancers.filter((freelancer) => {
		if (
			selectedCategory !== "All Categories" &&
			freelancer.category !== selectedCategory
		) {
			return false;
		}
		if (searchQuery) {
			return (
				freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				freelancer.skills.some((skill) =>
					skill.toLowerCase().includes(searchQuery.toLowerCase()),
				)
			);
		}
		return true;
	});

	// Empty state
	if (savedFreelancers.length === 0) {
		return (
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 py-8">
					<h1 className="text-2xl font-bold mb-1">Saved Talents</h1>
					<p className="text-gray-600 text-sm mb-8">
						Keep track of talents you'd like to hire
					</p>

					{/* Search and Filters */}
					<div className="flex gap-3 mb-12">
						<TextField
							placeholder="Search by name or keyword"
							variant="outlined"
							size="small"
							sx={{
								width: 300,
								backgroundColor: "white",
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderColor: "#e5e7eb",
									},
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search sx={{ color: "#9ca3af", fontSize: 20 }} />
									</InputAdornment>
								),
							}}
						/>
						<button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
							<TuneOutlined sx={{ fontSize: 18 }} />
							Relevance
						</button>
						<FormControl size="small" sx={{ minWidth: 180 }}>
							<Select
								value="All Categories"
								displayEmpty
								sx={{
									backgroundColor: "white",
									"& .MuiOutlinedInput-notchedOutline": {
										borderColor: "#e5e7eb",
									},
								}}
							>
								<MenuItem value="All Categories">All Categories</MenuItem>
							</Select>
						</FormControl>
					</div>

					{/* Empty State Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
						{[
							{
								emoji: "❓",
								title: "Your Next Superstar",
							},
							{
								emoji: "💡",
								title: "Vision-ready Talent",
							},
							{
								emoji: "🎯",
								title: "Strategic Partner",
							},
						].map((card, index) => (
							<div
								key={index}
								className="bg-gray-50 rounded-2xl p-12 flex flex-col items-center justify-center border border-gray-200"
							>
								<div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
									<span className="text-3xl">{card.emoji}</span>
								</div>
								<h3 className="text-gray-700 text-base font-medium text-center">
									{card.title}
								</h3>
							</div>
						))}
					</div>

					<div className="text-center">
						<p className="text-gray-500 mb-6 text-sm">
							You haven't saved any talent yet. Save talents to easily find them
							again.
						</p>
						<Link
							to="/clients"
							className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition flex items-center gap-2 mx-auto"
						>
							<SearchOutlined sx={{ fontSize: 18 }} />
							Spotlight Talent
						</Link>
					</div>
				</div>
			</div>
		);
	}

	// With saved talents
	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-2xl font-bold mb-1">Saved Talents</h1>
						<p className="text-gray-600 text-sm">
							Keep track of talents you'd like to hire
						</p>
					</div>
					<Link
						to="/clients"
						className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition flex items-center gap-2"
					>
						<SearchOutlined sx={{ fontSize: 18 }} />
						Spotlight Talent
					</Link>
				</div>

				{/* Search and Filters */}
				<div className="flex gap-3 mb-8">
					<TextField
						placeholder="Search by name or keyword"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						variant="outlined"
						size="small"
						sx={{
							width: 300,
							backgroundColor: "white",
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "#e5e7eb",
								},
								"&:hover fieldset": {
									borderColor: "#d1d5db",
								},
								"&.Mui-focused fieldset": {
									borderColor: "#9ca3af",
								},
							},
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search sx={{ color: "#9ca3af", fontSize: 20 }} />
								</InputAdornment>
							),
						}}
					/>
					<button
						onClick={() => setRelevanceModalOpen(true)}
						className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2"
					>
						<TuneOutlined sx={{ fontSize: 18 }} />
						Relevance
					</button>
					<FormControl size="small" sx={{ minWidth: 180 }}>
						<Select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							displayEmpty
							sx={{
								backgroundColor: "white",
								"& .MuiOutlinedInput-notchedOutline": {
									borderColor: "#e5e7eb",
								},
								"&:hover .MuiOutlinedInput-notchedOutline": {
									borderColor: "#d1d5db",
								},
								"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
									borderColor: "#9ca3af",
								},
							}}
							IconComponent={KeyboardArrowDown}
						>
							<MenuItem value="All Categories">All Categories</MenuItem>
							<MenuItem value="Web Development">Web Development</MenuItem>
							<MenuItem value="Design">Design</MenuItem>
							<MenuItem value="Video Editing">Video Editing</MenuItem>
						</Select>
					</FormControl>
				</div>

				{/* Freelancers Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredFreelancers.map((freelancer) => (
						<FreelancerCard
							key={freelancer.id}
							{...freelancer}
							isSaved={savedTalents.includes(freelancer.id)}
							onToggleSave={handleToggleSave}
							onSeeMore={handleSeeMore}
						/>
					))}
				</div>
			</div>

			{/* Modals */}
			<RelevanceOverlay
				open={relevanceModalOpen}
				onClose={() => setRelevanceModalOpen(false)}
				selectedRelevance={selectedRelevance}
				onApply={handleApplyRelevance}
			/>

			{selectedFreelancer && (
				<FreelancerInformationOverlay
					open={!!selectedFreelancer}
					onClose={() => setSelectedFreelancer(null)}
					freelancer={selectedFreelancer}
					isSaved={savedTalents.includes(selectedFreelancer.id)}
					onToggleSave={handleToggleSave}
				/>
			)}
		</div>
	);
};

export default SavedTalents;
