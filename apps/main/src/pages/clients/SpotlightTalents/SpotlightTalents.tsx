import React, { useState } from "react";
import {
	Search,
	TuneOutlined,
	Favorite,
	Add,
	KeyboardArrowDown,
} from "@mui/icons-material";
import {
	InputAdornment,
	TextField,
	MenuItem,
	Select,
	FormControl,
	Pagination,
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

const SpotlightTalents = () => {
	const [searchQuery, setSearchQuery] = useState("");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [activeCategory, setActiveCategory] = useState("All");
	const [selectedRelevance, setSelectedRelevance] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [savedTalents, setSavedTalents] = useState<string[]>([]);
	const [selectedFreelancer, setSelectedFreelancer] =
		useState<Freelancer | null>(null);
	const [relevanceModalOpen, setRelevanceModalOpen] = useState(false);

	// Mock data - replace with actual data
  const [freelancers] = useState<Freelancer[]>([
    {
      id: "1",
      name: "Alex Johnson",
      title: "Product Designer",
      profileImage: "https://i.pravatar.cc/150?img=1",
      rating: 5.0,
      jobCount: 33,
      skills: ["Figma", "User-interface", "Wireframing", "Prototyping"],
      hourlyRate: 20.0,
      location: "San Francisco, CA",
      responseTime: "Responds immediately",
      jobsCompleted: 33,
      totalEarnings: 16500,
      totalHours: 2131,
      about:
        "I am an experienced web developer with a strong foundation in crafting dynamic, user-focused websites. My expertise spans front-end and back-end technologies, ensuring seamless functionality and engaging designs. I thrive on solving complex challenges, delivering responsive and accessible solutions. With a passion for innovation, I continuously adapt to evolving industry trends. I'm a passionate full-stack developer with over 5 years of experience building scalable web applications. I specialize in React, Node.js, and modern web technologies. My approach combines clean code practices with user-centered design to deliver exceptional digital experiences.",
      certifications: [
        "AWS Certified Developer - Associate",
        "Google Cloud Professional Cloud Architect",
        "Meta React Certification",
      ],
      isAvailable: true,
      category: "Web Development",
    },
    {
      id: "2",
      name: "Maria Garcia",
      title: "Video Editor & Animator",
      profileImage: "https://i.pravatar.cc/150?img=2",
      rating: 4.9,
      jobCount: 45,
      skills: ["Adobe Premiere Pro", "After Effects", "Final Cut Pro"],
      hourlyRate: 35.0,
      location: "New York, NY",
      responseTime: "Within a few hours",
      jobsCompleted: 42,
      totalEarnings: 25000,
      totalHours: 3500,
      about:
        "Creative and detail-oriented video editor with a passion for storytelling. I bring visions to life through compelling narratives and stunning visuals. Proficient in the latest video editing software and techniques.",
      certifications: ["Adobe Certified Expert - Premiere Pro"],
      isAvailable: true,
      category: "Video Editing & Animation",
    },
    {
      id: "3",
      name: "David Smith",
      title: "Full-Stack Developer",
      profileImage: "https://i.pravatar.cc/150?img=3",
      rating: 4.8,
      jobCount: 50,
      skills: ["React", "Node.js", "Python", "Django", "AWS"],
      hourlyRate: 50.0,
      location: "Austin, TX",
      responseTime: "Responds within a day",
      jobsCompleted: 48,
      totalEarnings: 80000,
      totalHours: 5000,
      about:
        "Experienced full-stack developer specializing in building robust and scalable web applications. I enjoy tackling complex problems and delivering high-quality code. Let's build something great together.",
      certifications: ["AWS Certified Solutions Architect"],
      isAvailable: false,
      category: "Programming & Tech",
    },
    {
      id: "4",
      name: "Sophia Chen",
      title: "UI/UX Designer",
      profileImage: "https://i.pravatar.cc/150?img=4",
      rating: 5.0,
      jobCount: 25,
      skills: ["Sketch", "InVision", "Adobe XD", "User Research"],
      hourlyRate: 45.0,
      location: "Los Angeles, CA",
      responseTime: "Responds immediately",
      jobsCompleted: 25,
      totalEarnings: 35000,
      totalHours: 1500,
      about:
        "A user-centric UI/UX designer dedicated to creating intuitive and beautiful digital experiences. I bridge the gap between user needs and business goals to create products that are both functional and delightful.",
      certifications: ["Nielsen Norman Group UX Certification"],
      isAvailable: true,
      category: "Web Development",
    },
  ]);

  const categories = [
    "All",
    "Web Development",
    "Programming & Tech",
    "Video Editing & Animation",
  ];

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

	const filteredFreelancers = freelancers.filter((freelancer) => {
		if (activeCategory !== "All" && freelancer.category !== activeCategory) {
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

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 py-8 mb-4">
				{/* Category Pills - Top Navigation */}
				<div className="flex max-md:flex-col md:items-center flex-row justify-between">
					<div className="flex gap-4">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setActiveCategory(category)}
								className="text-gray-600 hover:text-gray-900 transition text-sm"
							>
								{category}
							</button>
						))}
					</div>
					{/* Search and Filters */}
					<div className="inline-flex gap-4">
						<TextField
							placeholder="Search category"
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
									// Adjust height to match button
									height: "40px", // or "42px" depending on your exact button height
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
							className="px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2"
						>
							<TuneOutlined sx={{ fontSize: 18 }} />
							Relevance
						</button>
					</div>
				</div>

				{/* Header Section */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h1 className="text-2xl font-semibold mb-2">
								Hire top freelancers
							</h1>
							<p className="text-gray-600">
								Check out freelancers with the skills you need for your next job
							</p>
						</div>
					</div>

					{/* Breadcrumb Navigation */}
					<div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
						<button
							onClick={() => setActiveCategory("All")}
							className="flex items-center gap-1 hover:text-gray-900"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
						</button>
						<span>/</span>
						<button
							onClick={() => setActiveCategory("All")}
							className="hover:text-gray-900"
						>
							All
						</button>
						{activeCategory !== "All" && (
							<>
								<span>/</span>
								<span className="text-gray-900 font-medium">
									{activeCategory}
								</span>
							</>
						)}
						{selectedRelevance.length > 0 && (
							<>
								<span>/</span>
								<span className="text-gray-900 font-medium">
									{selectedRelevance[0]}
								</span>
							</>
						)}
					</div>
					<div className="flex gap-3">
						<button className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition">
							Post a job
						</button>
						<Link
							to="/clients/saved-talents"
							className="px-6 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center gap-2"
						>
							<Favorite sx={{ fontSize: 18 }} />
							Saved Talents
						</Link>
					</div>
				</div>

				{/* Freelancers Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

				{/* Pagination */}
				<div className="flex justify-center">
					<Pagination
						count={10}
						page={currentPage}
						onChange={(_, page) => setCurrentPage(page)}
						sx={{
							"& .MuiPaginationItem-root": {
								"&.Mui-selected": {
									backgroundColor: "#6A0DAD",
									color: "white",
									"&:hover": {
										backgroundColor: "#5a0b92",
									},
								},
							},
						}}
					/>
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

export default SpotlightTalents;
