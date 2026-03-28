import React, { useState } from "react";
import {
	Groups,
	BookmarkBorder,
	TrendingUp,
	PeopleOutline,
	Favorite,
	ChatBubbleOutline,
	Share,
	BookmarkBorderOutlined,
	AccessTime,
	Send,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";

interface StatCard {
	id: string;
	icon: React.ReactNode;
	count: number;
	label: string;
	color: string;
}

interface Community {
	id: string;
	name: string;
	icon: React.ReactNode;
	description: string;
	posts: string;
	members: string;
	iconBg: string;
}

interface Event {
	id: string;
	type: "Challenge" | "Event";
	title: string;
	date: string;
	time: string;
}

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
	commentsList?: Array<{
		id: string;
		author: string;
		avatar: string;
		content?: string;
	}>;
}

const Dashboard = () => {
	// Toggle between empty and non-empty state
	const [isNewUser, setIsNewUser] = useState(false);
	const [expandedPost, setExpandedPost] = useState<string | null>(null);
	const [commentText, setCommentText] = useState("");

	const stats: StatCard[] = [
		{
			id: "1",
			icon: <Groups sx={{ fontSize: 28 }} />,
			count: 5,
			label: "Communities Joined",
			color: "#8b5cf6",
		},
		{
			id: "2",
			icon: <BookmarkBorder sx={{ fontSize: 28 }} />,
			count: 12,
			label: "Saved post",
			color: "#ec4899",
		},
		{
			id: "3",
			icon: <TrendingUp sx={{ fontSize: 28 }} />,
			count: 24,
			label: "New post",
			color: "#f59e0b",
		},
		{
			id: "4",
			icon: <PeopleOutline sx={{ fontSize: 28 }} />,
			count: 310,
			label: "Followers",
			color: "#10b981",
		},
	];

	const communities: Community[] = [
		{
			id: "1",
			name: "UI/UX Design",
			icon: "🎨",
			description:
				"website UI Design, Mobile App UI Design, Web App UI design, UX Research & User Flow, Wireframing....",
			posts: "1.2k post",
			members: "600 Members",
			iconBg: "#fef3c7",
		},
		{
			id: "2",
			name: "Web Development",
			icon: "💻",
			description:
				"Frontend Dev, Backend DV, Full-Stack Dev, E-Commerce Dev, Web App Dev, landing page Dev....",
			posts: "1.2k post",
			members: "600 Members",
			iconBg: "#dbeafe",
		},
		{
			id: "3",
			name: "Video Editing",
			icon: "🎬",
			description:
				"Motion Graphics, 2D Animation, Explainer Videos, Whiteboard Animation, Video Ads & promos, Intro &...",
			posts: "1.2k post",
			members: "600 Members",
			iconBg: "#fce7f3",
		},
		{
			id: "4",
			name: "Illustration & Digital Art",
			icon: "🎨",
			description:
				"Character Illustration, Children's Book Illustration, concept Art, Potrait illustration, Digital Painting.....",
			posts: "1.2k post",
			members: "600 Members",
			iconBg: "#e9d5ff",
		},
		{
			id: "5",
			name: "Social Media Design & Management",
			icon: "📢",
			description:
				"Instagram post & stories, Facebook Ads Design, Social media Banners Content Calendar Creation",
			posts: "1.2k post",
			members: "600 Members",
			iconBg: "#dbeafe",
		},
		{
			id: "6",
			name: "Presentation Design",
			icon: "📊",
			description:
				"Pitch Decks, Investor Presentations, Company Profiles, Pitch Deck Design, Bussiness Presenta.....",
			posts: "1.2k post",
			members: "600 Members",
			iconBg: "#fed7aa",
		},
		{
			id: "7",
			name: "Graphic Design",
			icon: "❄️",
			description:
				"Logo Design Brand Identity Design, Print Design, Package Design, Bussiness card & Stationery.....",
			posts: "1.2k post",
			members: "600 Members",
			iconBg: "#dbeafe",
		},
		{
			id: "8",
			name: "Mobile App Development",
			icon: "📱",
			description:
				"Android App Dev, iOS App Dev, Cross-Platform App Dev, Hybrid App Dev, Flutter App Dev, App UI/UX...",
			posts: "1.2k post",
			members: "600 Members",
			iconBg: "#e9d5ff",
		},
		{
			id: "9",
			name: "Programing & Tech",
			icon: "🔧",
			description:
				"Software Dev, Script & Automation, Blockchain Dev, Chatbot Dev, API Development & integration.....",
			posts: "1.2k post",
			members: "600 Members",
			iconBg: "#e0e7ff",
		},
	];

	const upcomingEvents: Event[] = [
		{
			id: "1",
			type: "Challenge",
			title: "UI/UX Design Challenge",
			date: "Feb 14,2025",
			time: "3: 00 PM",
		},
		{
			id: "2",
			type: "Event",
			title: "Web Designer Monthly meetup",
			date: "Feb 14,2025",
			time: "3: 00 PM",
		},
		{
			id: "3",
			type: "Event",
			title: "Startup pitch night",
			date: "Feb 14,2025",
			time: "3: 00 PM",
		},
	];

	const trendingPosts: Post[] = [
		{
			id: "1",
			author: {
				name: "Jane Cooper",
				avatar: "https://i.pravatar.cc/150?img=1",
				role: "software dev",
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
			commentsList: [
				{
					id: "c1",
					author: "Mike Rose",
					avatar: "https://i.pravatar.cc/150?img=5",
				},
				{
					id: "c2",
					author: "Mike Rose",
					avatar: "https://i.pravatar.cc/150?img=6",
				},
				{
					id: "c3",
					author: "Mike Rose",
					avatar: "https://i.pravatar.cc/150?img=7",
				},
				{
					id: "c4",
					author: "Mike Rose",
					avatar: "https://i.pravatar.cc/150?img=8",
				},
			],
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
			title: "Best color combinations for fintech UI?",
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
	];

	const suggestedCommunities: Community[] = [
		{
			id: "s1",
			name: "Product Manager",
			icon: "⚙️",
			description: "Learn product strategy and roadmapping",
			posts: "",
			members: "12.5k",
			iconBg: "#e9d5ff",
		},
		{
			id: "s2",
			name: "Data Science",
			icon: "⚙️",
			description: "AI, ML, and analytics discussions",
			posts: "",
			members: "12.5k",
			iconBg: "#dbeafe",
		},
		{
			id: "s3",
			name: "Content Creator",
			icon: "⚙️",
			description: "AI, ML, and analytics discussions",
			posts: "",
			members: "12.5k",
			iconBg: "#e0e7ff",
		},
	];

	// Empty state
	if (isNewUser) {
		return (
			<div>
				{/* Toggle for demo */}
				<button
					onClick={() => setIsNewUser(false)}
					className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
				>
					Toggle to Non-Empty State
				</button>

				<h1 className="text-2xl font-bold mb-2">Dashboard</h1>
				<p className="text-gray-600 text-sm mb-8">Welcome to your Community</p>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					{stats.map((stat) => (
						<div
							key={stat.id}
							className="bg-white rounded-lg p-5 border border-gray-200"
						>
							<div
								className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
								style={{ backgroundColor: stat.color + "20" }}
							>
								<span style={{ color: stat.color }}>{stat.icon}</span>
							</div>
							<h3 className="text-3xl font-bold text-gray-900 mb-1">
								{stat.count}
							</h3>
							<p className="text-sm text-gray-600">{stat.label}</p>
						</div>
					))}
				</div>

				{/* Communities Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
					{communities.map((community) => (
						<div
							key={community.id}
							className="bg-white rounded-lg p-5 border border-gray-200 hover:border-gray-300 transition-colors"
						>
							<div className="flex items-start gap-3 mb-3">
								<div
									className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
									style={{ backgroundColor: community.iconBg }}
								>
									{community.icon}
								</div>
								<div className="flex-1">
									<h3 className="font-semibold text-gray-900 mb-1">
										{community.name}
									</h3>
								</div>
							</div>
							<p className="text-sm text-gray-600 mb-4 line-clamp-2">
								{community.description}
							</p>
							<div className="flex items-center justify-between text-xs text-gray-500">
								<span>{community.posts}</span>
								<span>{community.members}</span>
							</div>
						</div>
					))}
				</div>

				{/* Empty States */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="bg-white rounded-lg p-12 border border-gray-200 flex flex-col items-center justify-center text-center">
						<div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
							<BookmarkBorder sx={{ fontSize: 32, color: "#ec4899" }} />
						</div>
						<h3 className="text-gray-900 font-semibold mb-2">
							No saved posts yet
						</h3>
						<p className="text-sm text-gray-600">
							Start exploring and save posts that interest you for easy access
							later.
						</p>
					</div>

					<div className="bg-white rounded-lg p-12 border border-gray-200 flex flex-col items-center justify-center text-center">
						<div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
							<Groups sx={{ fontSize: 32, color: "#8b5cf6" }} />
						</div>
						<h3 className="text-gray-900 font-semibold mb-2">
							No followers yet
						</h3>
						<p className="text-sm text-gray-600">
							Connect with people in community and grow your network organically
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Non-empty state with content
	return (
		<div>
			{/* Toggle for demo */}
			<button
				onClick={() => setIsNewUser(true)}
				className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
			>
				Toggle to Empty State
			</button>

			<h1 className="text-2xl font-bold mb-2">Dashboard</h1>
			<p className="text-gray-600 text-sm mb-8">
				Welcom back! see what's new in your Community
			</p>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{stats.map((stat) => (
					<div
						key={stat.id}
						className="bg-white rounded-lg p-5 border border-gray-200"
					>
						<div
							className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
							style={{ backgroundColor: stat.color + "20" }}
						>
							<span style={{ color: stat.color }}>{stat.icon}</span>
						</div>
						<h3 className="text-3xl font-bold text-gray-900 mb-1">
							{stat.count}
						</h3>
						<p className="text-sm text-gray-600">{stat.label}</p>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Trending Discussion */}
				<div className="lg:col-span-2">
					<h2 className="text-xl font-semibold mb-4">Trending Discussion</h2>
					<div className="space-y-4">
						{trendingPosts.map((post) => (
							<div
								key={post.id}
								className="bg-white rounded-lg p-6 border border-gray-200"
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
											<h4 className="font-semibold text-gray-900">
												{post.author.name}
											</h4>
											<div className="flex items-center gap-2 text-sm text-gray-600">
												<span>{post.author.role}</span>
												<span>•</span>
												<span>{post.timeAgo}</span>
											</div>
										</div>
									</div>
									{post.author.badge && (
										<span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded">
											{post.author.badge}
										</span>
									)}
								</div>

								{/* Post Content */}
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{post.title}
								</h3>
								<p className="text-gray-600 mb-4">{post.content}</p>

								{/* Post Actions */}
								<div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-sm text-gray-600">
									<button className="flex items-center gap-2 hover:text-red-500 transition">
										<Favorite sx={{ fontSize: 18 }} />
										<span>{post.likes} Like</span>
									</button>
									<button
										onClick={() =>
											setExpandedPost(expandedPost === post.id ? null : post.id)
										}
										className="flex items-center gap-2 hover:text-blue-500 transition"
									>
										<ChatBubbleOutline sx={{ fontSize: 18 }} />
										<span>{post.comments} Comments</span>
									</button>
									<button className="flex items-center gap-2 hover:text-green-500 transition">
										<Share sx={{ fontSize: 18 }} />
										<span>{post.shares} share</span>
									</button>
									<button className="flex items-center gap-2 hover:text-purple-500 transition">
										<BookmarkBorderOutlined sx={{ fontSize: 18 }} />
										<span>{post.bookmarks} Bookmark</span>
									</button>
								</div>

								{/* Expanded Comments Section */}
								{expandedPost === post.id && post.commentsList && (
									<div className="mt-6 pt-6 border-t border-gray-200">
										{/* Comment Input */}
										<div className="flex items-start gap-3 mb-6">
											<Avatar
												src="https://i.pravatar.cc/150?img=50"
												sx={{ width: 40, height: 40 }}
											/>
											<div className="flex-1 relative">
												<textarea
													value={commentText}
													onChange={(e) => setCommentText(e.target.value)}
													placeholder="Write a comment..."
													className="w-full bg-white border border-gray-200 rounded-lg p-3 pr-24 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
													rows={3}
												/>
												<button className="absolute bottom-3 right-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition flex items-center gap-2">
													Send Comment
												</button>
											</div>
										</div>

										{/* Comment Icon */}
										<div className="flex justify-center mb-6">
											<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
												<ChatBubbleOutline
													sx={{ fontSize: 24, color: "#9ca3af" }}
												/>
											</div>
										</div>

										{/* Comments List */}
										<div className="space-y-4">
											{post.commentsList.map((comment) => (
												<div key={comment.id} className="text-gray-700">
													<p className="font-medium">{comment.author}</p>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Right Sidebar */}
				<div className="space-y-6">
					{/* Suggested Communities */}
					<div className="bg-white rounded-lg p-5 border border-gray-200">
						<h3 className="font-semibold text-gray-900 mb-4">
							Suggested Communities
						</h3>
						<div className="space-y-4">
							{suggestedCommunities.map((community) => (
								<div
									key={community.id}
									className="p-4 border border-gray-200 rounded-lg"
								>
									<div className="flex items-start gap-3 mb-2">
										<div
											className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
											style={{ backgroundColor: community.iconBg }}
										>
											{community.icon}
										</div>
										<div className="flex-1">
											<h4 className="font-medium text-gray-900 text-sm">
												{community.name}
											</h4>
											<p className="text-xs text-gray-600">
												{community.description}
											</p>
											<p className="text-xs text-gray-500 mt-1">
												{community.members}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Upcoming Events */}
					<div className="bg-white rounded-lg p-5 border border-gray-200">
						<h3 className="font-semibold text-gray-900 mb-4">Upcoming Event</h3>
						<div className="space-y-3">
							{upcomingEvents.map((event) => (
								<div
									key={event.id}
									className="p-4 border border-gray-200 rounded-lg"
								>
									<span className="text-xs text-purple-600 font-medium">
										⚡ {event.type}
									</span>
									<h4 className="text-sm text-gray-900 font-medium mt-1 mb-2">
										{event.title}
									</h4>
									<div className="flex items-center gap-2 text-xs text-gray-600">
										<AccessTime sx={{ fontSize: 14 }} />
										<span>
											{event.date} . {event.time}
										</span>
									</div>
									<button className="mt-3 text-purple-600 text-xs font-medium hover:text-purple-700">
										Join Event
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
