import React, { useState } from "react";
import {
	Search,
	ChatBubbleOutline,
	PersonRemove,
	PersonAdd,
	PeopleOutline,
	TrendingUp,
	Groups,
} from "@mui/icons-material";
import { InputAdornment, TextField, Avatar } from "@mui/material";

interface User {
	id: string;
	name: string;
	avatar: string;
	role: string;
	skills: string[];
	isVerified?: boolean;
	badge?: string;
}

const Followers = () => {
	const [activeTab, setActiveTab] = useState<"followers" | "following">(
		"followers",
	);
	const [searchQuery, setSearchQuery] = useState("");

	// Mock data for followers
	const [followers] = useState<User[]>([
		{
			id: "1",
			name: "Marvin McKinney",
			avatar: "https://i.pravatar.cc/150?img=1",
			role: "UI/UX",
			skills: ["Product Designer"],
			isVerified: true,
		},
		{
			id: "2",
			name: "Annette Black",
			avatar: "https://i.pravatar.cc/150?img=2",
			role: "",
			skills: ["Developer"],
		},
		{
			id: "3",
			name: "Wade Warren",
			avatar: "https://i.pravatar.cc/150?img=3",
			role: "UI/UX",
			skills: ["Developer"],
			isVerified: true,
		},
		{
			id: "4",
			name: "Floyd Miles",
			avatar: "https://i.pravatar.cc/150?img=4",
			role: "UI/UX",
			skills: ["Graphics Designer"],
			isVerified: true,
		},
		{
			id: "5",
			name: "Savannah Nguyen",
			avatar: "https://i.pravatar.cc/150?img=5",
			role: "",
			skills: ["Graphics Designer"],
		},
		{
			id: "6",
			name: "Leslie Alexander",
			avatar: "https://i.pravatar.cc/150?img=6",
			role: "UI/UX",
			skills: ["Graphics Designer"],
			badge: "Top Contributor",
		},
		{
			id: "7",
			name: "Robert Fox",
			avatar: "https://i.pravatar.cc/150?img=7",
			role: "Crypto Trader",
			skills: ["Content Writer"],
		},
		{
			id: "8",
			name: "Jane Cooper",
			avatar: "https://i.pravatar.cc/150?img=8",
			role: "UI/UX",
			skills: ["Graphics Designer"],
			badge: "Top Contributor",
		},
		{
			id: "9",
			name: "Kristin Watson",
			avatar: "https://i.pravatar.cc/150?img=9",
			role: "Brand Design",
			skills: ["Graphics Designer"],
			isVerified: true,
		},
		{
			id: "10",
			name: "Bessie Cooper",
			avatar: "https://i.pravatar.cc/150?img=10",
			role: "Product Manager",
			skills: ["Content Writer"],
			isVerified: true,
		},
		{
			id: "11",
			name: "Devon Lane",
			avatar: "https://i.pravatar.cc/150?img=11",
			role: "Video Editor",
			skills: ["Social Media manager"],
			badge: "Top Contributor",
			isVerified: true,
		},
		{
			id: "12",
			name: "Guy Hawkins",
			avatar: "https://i.pravatar.cc/150?img=12",
			role: "Social Media manager",
			skills: ["Video Editor"],
		},
		{
			id: "13",
			name: "Wade Warren",
			avatar: "https://i.pravatar.cc/150?img=13",
			role: "Product Manager",
			skills: ["Content Writer"],
			isVerified: true,
		},
		{
			id: "14",
			name: "Jerome Bell",
			avatar: "https://i.pravatar.cc/150?img=14",
			role: "Video Editor",
			skills: ["Social Media manager"],
			badge: "Top Contributor",
			isVerified: true,
		},
	]);

	// Mock data for suggestions
	const [suggestions] = useState<User[]>([
		{
			id: "s1",
			name: "Marvin McKinney",
			avatar: "https://i.pravatar.cc/150?img=15",
			role: "UI/UX",
			skills: ["Client"],
		},
		{
			id: "s2",
			name: "Leslie Alexander",
			avatar: "https://i.pravatar.cc/150?img=16",
			role: "Frontend",
			skills: ["Founder"],
		},
		{
			id: "s3",
			name: "Marvin McKinney",
			avatar: "https://i.pravatar.cc/150?img=17",
			role: "",
			skills: ["product Designer"],
		},
	]);

	const filteredUsers = followers.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.skills.some((skill) =>
				skill.toLowerCase().includes(searchQuery.toLowerCase()),
			),
	);

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold mb-2">Followers</h1>
				<p className="text-gray-600 text-sm mb-6">
					Manage your connections and community work
				</p>

				{/* Search Bar */}
				<div className="flex items-center gap-4">
					<Avatar
						src="https://i.pravatar.cc/150?img=50"
						sx={{ width: 48, height: 48 }}
					/>
					<TextField
						placeholder="Search all user"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						variant="outlined"
						size="small"
						fullWidth
						sx={{
							maxWidth: 400,
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
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content - Left Side */}
				<div className="lg:col-span-2">
					{/* Tabs */}
					<div className="flex border-b border-gray-200 mb-6">
						<button
							onClick={() => setActiveTab("followers")}
							className={`px-6 py-3 font-medium transition-colors relative ${
								activeTab === "followers"
									? "text-[#6A0DAD]"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Followers
							{activeTab === "followers" && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6A0DAD]" />
							)}
						</button>
						<button
							onClick={() => setActiveTab("following")}
							className={`px-6 py-3 font-medium transition-colors relative ${
								activeTab === "following"
									? "text-[#6A0DAD]"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Following
							{activeTab === "following" && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6A0DAD]" />
							)}
						</button>
					</div>

					{/* Users List */}
					<div className="space-y-4">
						{filteredUsers.map((user) => (
							<div
								key={user.id}
								className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all flex items-center justify-between"
							>
								<div className="flex items-center gap-3">
									<Avatar
										src={user.avatar}
										alt={user.name}
										sx={{ width: 48, height: 48 }}
									/>
									<div>
										<div className="flex items-center gap-2 mb-1">
											<h3 className="font-semibold text-gray-900">
												{user.name}
											</h3>
											{user.isVerified && (
												<span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
													<span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
													Verified
												</span>
											)}
											{user.badge && (
												<span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
													{user.badge}
												</span>
											)}
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600">
											{user.role && <span>{user.role}</span>}
											{user.skills.map((skill, index) => (
												<span key={index}>{skill}</span>
											))}
										</div>
									</div>
								</div>

								<div className="flex items-center gap-2">
									<button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
										<ChatBubbleOutline
											sx={{ fontSize: 20, color: "#6b7280" }}
										/>
									</button>
									<button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
										<PersonRemove sx={{ fontSize: 18 }} />
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Right Sidebar */}
				<div className="space-y-6">
					{/* People You May Like */}
					<div className="bg-white rounded-lg border border-gray-200 p-5">
						<h3 className="font-semibold text-gray-900 mb-4">
							People you may like
						</h3>
						<div className="space-y-4">
							{suggestions.map((user) => (
								<div
									key={user.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center gap-3">
										<Avatar
											src={user.avatar}
											alt={user.name}
											sx={{ width: 40, height: 40 }}
										/>
										<div>
											<h4 className="font-medium text-gray-900 text-sm">
												{user.name}
											</h4>
											<div className="flex items-center gap-1 text-xs text-gray-600">
												{user.role && <span>{user.role}</span>}
												{user.skills.map((skill, index) => (
													<span
														key={index}
														className="px-2 py-0.5 bg-gray-100 rounded-full"
													>
														{skill}
													</span>
												))}
											</div>
										</div>
									</div>
									<button className="px-3 py-1.5 bg-[#6A0DAD] text-white text-xs rounded-lg hover:bg-[#5a0b92] transition flex items-center gap-1">
										<PersonAdd sx={{ fontSize: 16 }} />
										follow
									</button>
								</div>
							))}
						</div>
					</div>

					{/* Community Stats */}
					<div className="bg-white rounded-lg border border-gray-200 p-5">
						<h3 className="font-semibold text-gray-900 mb-4">
							Community Stats
						</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<PeopleOutline sx={{ fontSize: 20, color: "#6A0DAD" }} />
									<span>Followers</span>
								</div>
								<span className="font-semibold text-gray-900">10</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<TrendingUp sx={{ fontSize: 20, color: "#ec4899" }} />
									<span>Following</span>
								</div>
								<span className="font-semibold text-gray-900">21</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Groups sx={{ fontSize: 20, color: "#10b981" }} />
									<span>Communities</span>
								</div>
								<span className="font-semibold text-gray-900">12</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Followers;
