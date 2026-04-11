import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, KeyboardArrowDown } from "@mui/icons-material";
import {
	Avatar,
	InputAdornment,
	TextField,
	MenuItem,
	Select,
	FormControl,
} from "@mui/material";

interface Category {
	id: string;
	name: string;
	icon: string;
	iconBg: string;
	description: string;
	posts: string;
	members: string;
	slug: string;
}

const Categories = () => {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("Most Active");

	const categories: Category[] = [
		{
			id: "1",
			name: "UI/UX Design",
			icon: "🎨",
			iconBg: "#fef3c7",
			description:
				"website UI Design, Mobile App UI Design, Web App UI design, UX Research & User Flow, Wireframing....",
			posts: "1.2k post",
			members: "600 Members",
			slug: "uiux-design",
		},
		{
			id: "2",
			name: "Web Development",
			icon: "💻",
			iconBg: "#dbeafe",
			description:
				"Frontend Dev, Backend DV, Full-Stack Dev, E-Commerce Dev, Web App Dev, landing page Dev....",
			posts: "1.2k post",
			members: "600 Members",
			slug: "web-development",
		},
		{
			id: "3",
			name: "Video Editing",
			icon: "🎬",
			iconBg: "#fce7f3",
			description:
				"Motion Graphics, 2D Animation, Explainer Videos, Whiteboard Animation, Video Ads & promos, Intro &...",
			posts: "1.2k post",
			members: "600 Members",
			slug: "video-editing",
		},
		{
			id: "4",
			name: "Illustration & Digital Art",
			icon: "🎨",
			iconBg: "#e9d5ff",
			description:
				"Character Illustration, Children's Book Illustration, concept Art, Potrait illustration, Digital Painting.....",
			posts: "1.2k post",
			members: "600 Members",
			slug: "illustration-digital-art",
		},
		{
			id: "5",
			name: "Social Media Design & Management",
			icon: "📢",
			iconBg: "#dbeafe",
			description:
				"Instagram post & stories, Facebook Ads Design, Social media Banners Content Calendar Creation",
			posts: "1.2k post",
			members: "600 Members",
			slug: "social-media-design",
		},
		{
			id: "6",
			name: "Presentation Design",
			icon: "📊",
			iconBg: "#fed7aa",
			description:
				"Pitch Decks, Investor Presentations, Company Profiles, Pitch Deck Design, Bussiness Presenta.....",
			posts: "1.2k post",
			members: "600 Members",
			slug: "presentation-design",
		},
		{
			id: "7",
			name: "Graphic Design",
			icon: "❄️",
			iconBg: "#dbeafe",
			description:
				"Logo Design Brand Identity Design, Print Design, Package Design, Bussiness card & Stationery.....",
			posts: "1.2k post",
			members: "600 Members",
			slug: "graphic-design",
		},
		{
			id: "8",
			name: "Mobile App Development",
			icon: "📱",
			iconBg: "#e9d5ff",
			description:
				"Andriod App Dev, iOS App Dev, Cross-Platform App Dev, Hybrid App Dev, Flutter App Dev, App UI/UX...",
			posts: "1.2k post",
			members: "600 Members",
			slug: "mobile-app-development",
		},
		{
			id: "9",
			name: "Programing & Tech",
			icon: "🔧",
			iconBg: "#e0e7ff",
			description:
				"Software Dev, Script & Automation, Blockchain Dev, Chatbot Dev, API Development & integration.....",
			posts: "1.2k post",
			members: "600 Members",
			slug: "programming-tech",
		},
	];

	const filteredCategories = categories.filter((category) =>
		category.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const handleCategoryClick = (slug: string) => {
		navigate(`/community/categories/${slug}`);
	};

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold mb-2">Categories</h1>
				<p className="text-gray-600 text-sm">
					Browse discussion by skill and topic
				</p>
			</div>

			{/* Search and Filter */}
			<div className="flex items-center gap-4 mb-8">
				<Avatar
					src="https://i.pravatar.cc/150?img=50"
					sx={{ width: 48, height: 48 }}
				/>
				<TextField
					placeholder="Search Catergories"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					variant="outlined"
					size="small"
					fullWidth
					sx={{
						maxWidth: 600,
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
				<FormControl size="small" sx={{ minWidth: 180 }}>
					<Select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
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
						<MenuItem value="Most Active">Most Active</MenuItem>
						<MenuItem value="Newest">Newest</MenuItem>
						<MenuItem value="Most Popular">Most Popular</MenuItem>
					</Select>
				</FormControl>
			</div>

			{/* Categories Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredCategories.map((category) => (
					<div
						key={category.id}
						onClick={() => handleCategoryClick(category.slug)}
						className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
					>
						<div className="flex items-start gap-3 mb-4">
							<div
								className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
								style={{ backgroundColor: category.iconBg }}
							>
								{category.icon}
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-gray-900 text-lg mb-1">
									{category.name}
								</h3>
							</div>
						</div>
						<p className="text-sm text-gray-600 mb-4 line-clamp-2">
							{category.description}
						</p>
						<div className="flex items-center justify-between text-xs text-gray-500">
							<span>{category.posts}</span>
							<span>{category.members}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories;
