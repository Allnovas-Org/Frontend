import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Search,
	Add,
	Favorite,
	ChatBubbleOutline,
	Share,
	BookmarkBorder,
} from "@mui/icons-material";
import { Avatar, InputAdornment, TextField } from "@mui/material";
import ImageModal from "./ImageModal";

interface Post {
	id: string;
	author: {
		name: string;
		avatar: string;
		role: string;
		badge?: string;
	};
	timeAgo: string;
	title: string;
	content: string;
	image?: string;
	likes: number;
	comments: number;
	shares: number;
	bookmarks: number;
	tags?: string[];
}

const CategoryDetail = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// Mock category data
	const categoryInfo = {
		name: "UI/UX Design community",
		description:
			"A space for designers to share work, ask questions, and learn from others",
		members: 24500,
		posts: 8500,
		topContributors: 24,
		activeInLast24Hours: 24500,
		joined: false,
	};

	const aboutInfo = {
		whatItsFor:
			"A collaborative space for UI/UX designers to grow their skills, share insights, and connect with peers worldwide.",
		whoItsFor:
			"Designers at all levels - from beginners to seasoned professionals looking to stay current and contribute to the design community",
		postTypesAllowed: ["questions", "job", "Resources", "Showcase"],
		rules: [
			"Be respectful and constructive",
			"No self-promotion spam",
			"Share quality content",
			"Credit original creators",
		],
	};

	const posts: Post[] = [
		{
			id: "1",
			author: {
				name: "Jane Cooper",
				avatar: "https://i.pravatar.cc/150?img=1",
				role: "UI/UX designer",
				badge: "Top contributor",
			},
			timeAgo: "2h ago",
			title: "Best color combinations for fintech UI?",
			content:
				"I'm working on a fintech app and trying to establish a trustworthy yet modern color palette. What combinations have worked well for you? Readmore",
			image:
				"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
			likes: 251,
			comments: 25,
			shares: 10,
			bookmarks: 11,
			tags: ["questions"],
		},
		{
			id: "2",
			author: {
				name: "Jane Cooper",
				avatar: "https://i.pravatar.cc/150?img=2",
				role: "UI/UX designer",
				badge: "Top contributor",
			},
			timeAgo: "2h ago",
			title: "Best color combinations for fintech UI?",
			content:
				"I'm working on a fintech app and trying to establish a trustworthy yet modern color palette. What combinations have worked well for you? Readmore",
			likes: 251,
			comments: 25,
			shares: 10,
			bookmarks: 11,
			tags: ["Showcase"],
		},
	];

	const topContributors = [
		{
			id: "1",
			name: "Sharon Renson",
			role: "Developer",
			avatar: "https://i.pravatar.cc/150?img=10",
			points: 90,
		},
		{
			id: "2",
			name: "Showale Ayomide",
			role: "Graphics Designer",
			avatar: "https://i.pravatar.cc/150?img=11",
			points: 50,
		},
		{
			id: "3",
			name: "Ogunayo Winner",
			role: "Manager",
			avatar: "https://i.pravatar.cc/150?img=12",
			points: 30,
		},
	];

	const trendingTags = [
		"#FIntechUI",
		"#PortfolioReview",
		"#UI/UX",
		"#Innovation",
		"#CodeLine",
		"#HackaThon",
		"#Founder",
		"#NewbieToHTB",
		"#Design",
	];

	const relatedCategories = [
		{
			id: "1",
			name: "Design",
			description: "UI/UX, Logos, Branding, Illustrations",
			members: "600 Members",
		},
	];

	return (
		<div className="w-full">
			{/* Header Card */}
			<div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex-1">
						<h1 className="text-2xl font-bold mb-2">{categoryInfo.name}</h1>
						<p className="text-gray-600 text-sm mb-4">
							{categoryInfo.description}
						</p>
					</div>
					<button className="px-4 py-2 bg-[#6A0DAD] text-white rounded-lg font-medium hover:bg-[#5a0b92] transition whitespace-nowrap ml-4">
						{categoryInfo.joined ? "Joined" : "Join"}
					</button>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-4 gap-4">
					<div className="text-center">
						<div className="flex items-center justify-center gap-2 mb-1">
							<div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
								<span className="text-purple-600">👥</span>
							</div>
						</div>
						<h3 className="text-2xl font-bold text-gray-900">
							{categoryInfo.members.toLocaleString()}
						</h3>
						<p className="text-xs text-gray-600">Members</p>
					</div>
					<div className="text-center">
						<div className="flex items-center justify-center gap-2 mb-1">
							<div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
								<span className="text-purple-600">📝</span>
							</div>
						</div>
						<h3 className="text-2xl font-bold text-gray-900">
							{categoryInfo.posts.toLocaleString()}
						</h3>
						<p className="text-xs text-gray-600">Posts</p>
					</div>
					<div className="text-center">
						<div className="flex items-center justify-center gap-2 mb-1">
							<div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
								<span className="text-orange-600">🏆</span>
							</div>
						</div>
						<h3 className="text-2xl font-bold text-gray-900">
							{categoryInfo.topContributors}
						</h3>
						<p className="text-xs text-gray-600">Top Contribution</p>
					</div>
					<div className="text-center">
						<div className="flex items-center justify-center gap-2 mb-1">
							<div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
								<span className="text-green-600">🟢</span>
							</div>
						</div>
						<h3 className="text-2xl font-bold text-gray-900">
							{categoryInfo.activeInLast24Hours.toLocaleString()}
						</h3>
						<p className="text-xs text-gray-600">Active in last 24 hours</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* About Section */}
					<div className="bg-white rounded-lg p-6 border border-gray-200">
						<h3 className="font-semibold text-lg mb-4">About This community</h3>

						<div className="space-y-4">
							<div>
								<h4 className="font-semibold text-sm mb-2">what it's for</h4>
								<p className="text-sm text-gray-600">{aboutInfo.whatItsFor}</p>
							</div>

							<div>
								<h4 className="font-semibold text-sm mb-2">who it's for</h4>
								<p className="text-sm text-gray-600">{aboutInfo.whoItsFor}</p>
							</div>

							<div>
								<h4 className="font-semibold text-sm mb-2">
									post typed allowed
								</h4>
								<div className="flex flex-wrap gap-2">
									{aboutInfo.postTypesAllowed.map((type, index) => (
										<span
											key={index}
											className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
										>
											{type}
										</span>
									))}
								</div>
							</div>

							<div>
								<h4 className="font-semibold text-sm mb-2">Rules summary</h4>
								<ul className="list-disc list-inside space-y-1">
									{aboutInfo.rules.map((rule, index) => (
										<li key={index} className="text-sm text-gray-600">
											{rule}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Discussion Section */}
					<div>
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-semibold text-lg">
								Design Discussion Categories
							</h3>
							<button className="px-4 py-2 bg-[#6A0DAD] text-white rounded-lg font-medium hover:bg-[#5a0b92] transition flex items-center gap-2">
								<Add sx={{ fontSize: 18 }} />
								Create a Post
							</button>
						</div>

						<p className="text-sm text-gray-600 mb-4">
							Explore conversation, question, and idea from the design community
						</p>

						{/* Search */}
						<div className="flex items-center gap-3 mb-6">
							<Avatar
								src="https://i.pravatar.cc/150?img=50"
								sx={{ width: 40, height: 40 }}
							/>
							<TextField
								placeholder="Search Discussion, skills, topic...."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								variant="outlined"
								size="small"
								fullWidth
								sx={{
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

						{/* Posts */}
						<div className="space-y-4">
							{posts.map((post) => (
								<div
									key={post.id}
									onClick={() =>
										navigate(`/community/categories/${slug}/post/${post.id}`)
									}
									className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition cursor-pointer"
								>
									{/* Author */}
									<div className="flex items-center gap-3 mb-4">
										<Avatar
											src={post.author.avatar}
											sx={{ width: 40, height: 40 }}
										/>
										<div>
											<div className="flex items-center gap-2">
												<h4 className="font-semibold text-gray-900 text-sm">
													{post.author.name}
												</h4>
												{post.author.badge && (
													<span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
														{post.author.badge}
													</span>
												)}
												{post.tags && post.tags[0] && (
													<span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
														{post.tags[0]}
													</span>
												)}
											</div>
											<p className="text-xs text-gray-600">{post.timeAgo}</p>
										</div>
									</div>

									{/* Content */}
									<h3 className="font-semibold text-gray-900 mb-2">
										{post.title}
									</h3>
									<p className="text-sm text-gray-600 mb-4">{post.content}</p>

									{/* Image */}
									{post.image && (
										<div
											onClick={(e) => {
												e.stopPropagation();
												setSelectedImage(post.image || null);
											}}
											className="mb-4 cursor-pointer"
										>
											<img
												src={post.image}
												alt={post.title}
												className="w-full h-64 object-cover rounded-lg hover:opacity-95 transition"
											/>
										</div>
									)}

									{/* Actions */}
									<div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-sm text-gray-600">
										<button className="flex items-center gap-2 hover:text-red-500 transition">
											<Favorite sx={{ fontSize: 18 }} />
											<span>{post.likes} Like</span>
										</button>
										<button className="flex items-center gap-2 hover:text-blue-500 transition">
											<ChatBubbleOutline sx={{ fontSize: 18 }} />
											<span>{post.comments} Comments</span>
										</button>
										<button className="flex items-center gap-2 hover:text-green-500 transition">
											<Share sx={{ fontSize: 18 }} />
											<span>{post.shares} share</span>
										</button>
										<button className="flex items-center gap-2 hover:text-purple-500 transition">
											<BookmarkBorder sx={{ fontSize: 18 }} />
											<span>{post.bookmarks} Bookmark</span>
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right Sidebar */}
				<div className="space-y-6">
					{/* Top Contributors */}
					<div className="bg-white rounded-lg p-5 border border-gray-200">
						<h3 className="font-semibold mb-4">Top Contributors</h3>
						<div className="space-y-4">
							{topContributors.map((contributor) => (
								<div
									key={contributor.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center gap-3">
										<Avatar
											src={contributor.avatar}
											sx={{ width: 40, height: 40 }}
										/>
										<div>
											<h4 className="font-medium text-sm text-gray-900">
												{contributor.name}
											</h4>
											<p className="text-xs text-gray-600">
												{contributor.role}
											</p>
										</div>
									</div>
									<span className="text-sm font-semibold text-gray-900">
										{contributor.points} points
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Trending Tags */}
					<div className="bg-white rounded-lg p-5 border border-gray-200">
						<h3 className="font-semibold mb-4">Trending Tag</h3>
						<div className="flex flex-wrap gap-2">
							{trendingTags.map((tag, index) => (
								<span
									key={index}
									className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 cursor-pointer transition"
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					{/* Related Categories */}
					<div className="bg-white rounded-lg p-5 border border-gray-200">
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-semibold">Design</h3>
							<button className="px-4 py-1.5 bg-[#6A0DAD] text-white text-sm rounded-lg hover:bg-[#5a0b92] transition">
								Follow Categories
							</button>
						</div>
						{relatedCategories.map((category) => (
							<div key={category.id}>
								<p className="text-sm text-gray-600 mb-2">
									{category.description}
								</p>
								<p className="text-xs text-gray-500">{category.members}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Image Modal */}
			{selectedImage && (
				<ImageModal
					imageUrl={selectedImage}
					onClose={() => setSelectedImage(null)}
				/>
			)}
		</div>
	);
};

export default CategoryDetail;
