import React, { useState } from "react";
import {
	Search,
	Favorite,
	FavoriteBorder,
	ChatBubbleOutline,
	Share,
	BookmarkBorder,
	PeopleOutline,
	TrendingUp,
	Groups,
} from "@mui/icons-material";
import { InputAdornment, TextField, Avatar } from "@mui/material";

interface Post {
	id: string;
	author: {
		name: string;
		avatar: string;
		role: string;
		isVerified?: boolean;
		badge?: string;
	};
	timeAgo: string;
	title: string;
	content: string;
	likes: number;
	comments: number;
	shares: number;
	bookmarks: number;
	isLiked?: boolean;
	tag?: string;
}

interface Challenge {
	id: string;
	title: string;
	dateRange: string;
}

const CommunityHub = () => {
	const [activeTab, setActiveTab] = useState<"trending" | "new" | "challenges">(
		"trending",
	);
	const [searchQuery, setSearchQuery] = useState("");

	// Mock data for posts
	const [posts] = useState<Post[]>([
		{
			id: "1",
			author: {
				name: "Jane Cooper",
				avatar: "https://i.pravatar.cc/150?img=1",
				role: "software dev",
				isVerified: true,
				badge: "Resources",
			},
			timeAgo: "2h ago",
			title: "Best color combinations for fintech UI?",
			content:
				"I'm working on a fintech app and trying to establish a trustworthy yet modern color palette. What combinations have worked well for you?",
			likes: 251,
			comments: 25,
			shares: 10,
			bookmarks: 11,
		},
		{
			id: "2",
			author: {
				name: "Jane Cooper",
				avatar: "https://i.pravatar.cc/150?img=2",
				role: "software dev",
				badge: "Resources",
			},
			timeAgo: "2h ago",
			title: "Best Tools for client onboarding as a freelancer?",
			content:
				"I'm working on a fintech app and trying to establish a trustworthy yet modern color palette. What combinations have worked well for you?",
			likes: 251,
			comments: 25,
			shares: 10,
			bookmarks: 11,
		},
		{
			id: "3",
			author: {
				name: "Jane Cooper",
				avatar: "https://i.pravatar.cc/150?img=3",
				role: "software dev",
				isVerified: true,
				badge: "Resources",
			},
			timeAgo: "2h ago",
			title: "i just lauche my saas product! here's what i learn..",
			content:
				"I'm working on a fintech app and trying to establish a trustworthy yet modern color palette. What combinations have worked well for you?",
			likes: 251,
			comments: 25,
			shares: 10,
			bookmarks: 11,
		},
	]);

	// Mock data for challenges
	const [challenges] = useState<Challenge[]>([
		{
			id: "1",
			title: "Design a freelancer dashboard UI",
			dateRange: "Dec 10 - Dec 17, 2025",
		},
		{
			id: "2",
			title: "Design a freelancer dashboard UI",
			dateRange: "Dec 10 - Dec 17, 2025",
		},
		{
			id: "3",
			title: "Design a freelancer dashboard UI",
			dateRange: "Dec 10 - Dec 17, 2025",
		},
		{
			id: "4",
			title: "Design a freelancer dashboard UI",
			dateRange: "Dec 10 - Dec 17, 2025",
		},
	]);

	// Mock data for top contributors
	const [topContributors] = useState([
		{
			id: "1",
			name: "Alex jane",
			avatar: "https://i.pravatar.cc/150?img=10",
			posts: 287,
		},
		{
			id: "2",
			name: "Alex jane",
			avatar: "https://i.pravatar.cc/150?img=11",
			posts: 287,
		},
		{
			id: "3",
			name: "Alex jane",
			avatar: "https://i.pravatar.cc/150?img=12",
			posts: 287,
		},
	]);

	const renderContent = () => {
		if (activeTab === "challenges") {
			return (
				<div className="space-y-4">
					{challenges.map((challenge) => (
						<div
							key={challenge.id}
							className="bg-orange-50 border border-orange-200 rounded-lg p-5"
						>
							<h3 className="font-semibold text-gray-900 mb-2">
								Weekly Challange
							</h3>
							<p className="text-orange-600 font-medium mb-1">
								{challenge.title}
							</p>
							<p className="text-sm text-orange-500">{challenge.dateRange}</p>
						</div>
					))}
				</div>
			);
		}

		return (
			<div className="space-y-4">
				{posts.map((post) => (
					<div
						key={post.id}
						className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-all"
					>
						{/* Post Header */}
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<Avatar
									src={post.author.avatar}
									alt={post.author.name}
									sx={{ width: 48, height: 48 }}
								/>
								<div>
									<div className="flex items-center gap-2">
										<h4 className="font-semibold text-gray-900">
											{post.author.name}
										</h4>
										{post.author.isVerified && (
											<span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
												<span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
												Verified
											</span>
										)}
										{post.author.badge && (
											<span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">
												{post.author.badge}
											</span>
										)}
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-600">
										<span>{post.author.role}</span>
										<span>•</span>
										<span>{post.timeAgo}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Post Content */}
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							{post.title}
						</h3>
						<p className="text-gray-600 mb-4">{post.content}</p>

						{/* Post Actions */}
						<div className="flex items-center gap-6 pt-4 border-t border-gray-100">
							<button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition">
								<Favorite sx={{ fontSize: 20 }} />
								<span>{post.likes} Like</span>
							</button>
							<button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500 transition">
								<ChatBubbleOutline sx={{ fontSize: 20 }} />
								<span>{post.comments} Comments</span>
							</button>
							<button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-500 transition">
								<Share sx={{ fontSize: 20 }} />
								<span>{post.shares} share</span>
							</button>
							<button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-500 transition">
								<BookmarkBorder sx={{ fontSize: 20 }} />
								<span>{post.bookmarks} Bookmark</span>
							</button>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold mb-2">Community Hub</h1>
				<p className="text-gray-600 text-sm mb-6">
					see everything happening across the platform in one place
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
							onClick={() => setActiveTab("trending")}
							className={`px-6 py-3 font-medium transition-colors relative ${
								activeTab === "trending"
									? "text-[#6A0DAD]"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Trending
							{activeTab === "trending" && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6A0DAD]" />
							)}
						</button>
						<button
							onClick={() => setActiveTab("new")}
							className={`px-6 py-3 font-medium transition-colors relative ${
								activeTab === "new"
									? "text-[#6A0DAD]"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							New
							{activeTab === "new" && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6A0DAD]" />
							)}
						</button>
						<button
							onClick={() => setActiveTab("challenges")}
							className={`px-6 py-3 font-medium transition-colors relative ${
								activeTab === "challenges"
									? "text-[#6A0DAD]"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Challenges
							{activeTab === "challenges" && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6A0DAD]" />
							)}
						</button>
					</div>

					{/* Content */}
					{renderContent()}
				</div>

				{/* Right Sidebar */}
				<div className="space-y-6">
					{/* Top Contributors */}
					<div className="bg-white rounded-lg border border-gray-200 p-5">
						<h3 className="font-semibold text-gray-900 mb-4">
							Top Contributor
						</h3>
						<div className="space-y-4">
							{topContributors.map((contributor, index) => (
								<div
									key={contributor.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center gap-3">
										<Avatar
											src={contributor.avatar}
											alt={contributor.name}
											sx={{ width: 40, height: 40 }}
										/>
										<div>
											<h4 className="font-medium text-gray-900 text-sm">
												{contributor.name}
											</h4>
											<p className="text-xs text-gray-600">
												{contributor.posts} post
											</p>
										</div>
									</div>
									<div className="w-8 h-8 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">
										{index + 1}
									</div>
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

export default CommunityHub;
