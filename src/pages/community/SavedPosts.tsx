import React, { useState } from "react";
import {
	Search,
	BookmarkBorder,
	Bookmark,
	FavoriteBorder,
	Favorite,
	ChatBubbleOutline,
	Share,
	Add,
	ArrowDropDown,
	AutoAwesome,
	ArrowBack,
	Send,
	WorkspacePremium,
	VerifiedOutlined,
} from "@mui/icons-material";
import {
	Avatar,
	Badge,
	Chip,
	IconButton,
	InputAdornment,
	Menu,
	MenuItem,
	TextField,
	Tooltip,
} from "@mui/material";

// ── Types ──────────────────────────────────────────────────────────────────────

type Tab =
	| "All"
	| "Discussion"
	| "Showcase"
	| "Questions"
	| "Jobs"
	| "Resources";

interface Post {
	id: number;
	author: string;
	avatar: string;
	role: string;
	badge?: "top-contributor" | "verified";
	timeAgo: string;
	title: string;
	body: string;
	category: Tab;
	likes: number;
	comments: Comment[];
	shares: number;
	bookmarks: number;
	liked: boolean;
	bookmarked: boolean;
}

interface Comment {
	id: number;
	author: string;
	avatar: string;
	timeAgo: string;
	text: string;
	likes: number;
	liked: boolean;
}

interface SuggestedUser {
	id: number;
	name: string;
	role: string;
	avatar: string;
	posts: number;
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const SUGGESTED_USERS: SuggestedUser[] = [
	{ id: 1, name: "Shayo Benson", role: "Developer", avatar: "SB", posts: 90 },
	{
		id: 2,
		name: "Showale Ayomide",
		role: "Graphics Designer",
		avatar: "SA",
		posts: 50,
	},
	{ id: 3, name: "Odunayo Winner", role: "Marketer", avatar: "OW", posts: 30 },
	{ id: 4, name: "Odunayo Winner", role: "Marketer", avatar: "OW", posts: 30 },
	{
		id: 5,
		name: "Showale Ayomide",
		role: "Graphics Designer",
		avatar: "SA",
		posts: 20,
	},
];

const INITIAL_POSTS: Post[] = [
	{
		id: 1,
		author: "Jane Cooper",
		avatar: "JC",
		role: "Software Developer",
		badge: "top-contributor",
		timeAgo: "2h ago",
		title: "Best Practice for React component architecture?",
		body: "I'm working on a large-scale React application and wondering what the community recommends for structuring components. Should I use atomic design principles or feature-based architecture? I've been working on a large-scale React project and realized that good component architecture isn't optional — it's critical.\n\nRight now, I'm exploring the balance between:\n• Atomic Design (reusable UI building blocks)\n• Feature-based architecture (organizing by business logic)\n\nFrom what I've seen, a hybrid approach feels like the sweet spot:\n– Atomic for shared UI components\n– Feature-based for real product logic\n\nCurious to hear from other developers and designers 🖐\nHow do you structure your React components for scale?\n\n#React #WebDevelopment #Frontend #SoftwareArchitecture #BuildInPublic",
		category: "Showcase",
		likes: 251,
		shares: 10,
		bookmarks: 11,
		liked: false,
		bookmarked: true,
		comments: [
			{
				id: 1,
				author: "Mike Rose",
				avatar: "MR",
				timeAgo: "2 days ago",
				text: "It's a nice concept!",
				likes: 251,
				liked: false,
			},
			{
				id: 2,
				author: "Mike Rose",
				avatar: "MR",
				timeAgo: "2 days ago",
				text: "It's a nice concept!",
				likes: 251,
				liked: false,
			},
			{
				id: 3,
				author: "Mike Rose",
				avatar: "MR",
				timeAgo: "2 days ago",
				text: "It's a nice concept!",
				likes: 251,
				liked: false,
			},
			{
				id: 4,
				author: "Mike Rose",
				avatar: "MR",
				timeAgo: "2 days ago",
				text: "It's a nice concept!",
				likes: 251,
				liked: false,
			},
		],
	},
	{
		id: 2,
		author: "Jane Cooper",
		avatar: "JC",
		role: "Software Developer",
		badge: "verified",
		timeAgo: "2h ago",
		title: "Best Practice for React component architecture?",
		body: "I'm working on a large-scale React application and wondering what the community recommends for structuring components. Should I use atomic design principles or feature-based architecture?",
		category: "Showcase",
		likes: 134,
		shares: 7,
		bookmarks: 5,
		liked: true,
		bookmarked: true,
		comments: [],
	},
	{
		id: 3,
		author: "Jane Cooper",
		avatar: "JC",
		role: "Software Developer",
		badge: "top-contributor",
		timeAgo: "2h ago",
		title: "Best Practice for React component architecture?",
		body: "I'm working on a large-scale React application and wondering what the community recommends for structuring components.",
		category: "Discussion",
		likes: 98,
		shares: 4,
		bookmarks: 8,
		liked: false,
		bookmarked: true,
		comments: [],
	},
	{
		id: 4,
		author: "Jane Cooper",
		avatar: "JC",
		role: "Software Developer",
		badge: "top-contributor",
		timeAgo: "2h ago",
		title: "Best Practice for React component architecture?",
		body: "I'm working on a large-scale React application and wondering what the community recommends for structuring components.",
		category: "Questions",
		likes: 44,
		shares: 2,
		bookmarks: 3,
		liked: false,
		bookmarked: true,
		comments: [],
	},
];

// ── Sub-components ─────────────────────────────────────────────────────────────

const TABS: Tab[] = [
	"All",
	"Discussion",
	"Showcase",
	"Questions",
	"Jobs",
	"Resources",
];

const CATEGORY_COLORS: Record<string, string> = {
	Showcase: "#7c3aed",
	Discussion: "#0ea5e9",
	Questions: "#f59e0b",
	Jobs: "#10b981",
	Resources: "#ef4444",
};

function BadgeChip({ badge }: { badge?: "top-contributor" | "verified" }) {
	if (!badge) return null;
	if (badge === "top-contributor")
		return (
			<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
				<WorkspacePremium sx={{ fontSize: 12 }} /> Top contributor
			</span>
		);
	return (
		<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
			<VerifiedOutlined sx={{ fontSize: 12 }} /> Verified
		</span>
	);
}

function ActionBar({
	likes,
	liked,
	comments,
	shares,
	bookmarks,
	bookmarked,
	size = "sm",
	onLike,
	onBookmark,
}: {
	likes: number;
	liked: boolean;
	comments: number;
	shares: number;
	bookmarks: number;
	bookmarked: boolean;
	size?: "sm" | "lg";
	onLike?: () => void;
	onBookmark?: () => void;
}) {
	const btnCls =
		size === "lg"
			? "flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer select-none"
			: "flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer select-none";

	const iconSz = size === "lg" ? 18 : 15;

	return (
		<div className="flex items-center gap-2 flex-wrap">
			<button
				onClick={onLike}
				className={`${btnCls} ${
					liked ? "text-rose-500 border-rose-200 bg-rose-50" : "text-gray-500"
				}`}
			>
				{liked ? (
					<Favorite sx={{ fontSize: iconSz }} />
				) : (
					<FavoriteBorder sx={{ fontSize: iconSz }} />
				)}
				{likes} Like
			</button>
			<button className={`${btnCls} text-gray-500`}>
				<ChatBubbleOutline sx={{ fontSize: iconSz }} /> {comments} Comments
			</button>
			<button className={`${btnCls} text-gray-500`}>
				<Share sx={{ fontSize: iconSz }} /> {shares} share
			</button>
			<button
				onClick={onBookmark}
				className={`${btnCls} ${
					bookmarked
						? "text-purple-600 border-purple-200 bg-purple-50"
						: "text-gray-500"
				}`}
			>
				{bookmarked ? (
					<Bookmark sx={{ fontSize: iconSz }} />
				) : (
					<BookmarkBorder sx={{ fontSize: iconSz }} />
				)}
				{bookmarks} Bookmark
			</button>
		</div>
	);
}

// ── Empty State ────────────────────────────────────────────────────────────────

function EmptyState({ onAdd }: { onAdd: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center py-20 px-6 text-center">
			<div className="relative mb-6">
				<div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-100 to-violet-200 flex items-center justify-center shadow-lg">
					<Bookmark sx={{ fontSize: 44, color: "#7c3aed" }} />
				</div>
				<div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow">
					<span className="text-white text-sm font-bold">0</span>
				</div>
			</div>
			<h3 className="text-xl font-bold text-gray-900 mb-2">
				No saved posts yet
			</h3>
			<p className="text-gray-500 text-sm max-w-xs mb-6 leading-relaxed">
				Bookmark discussions, showcases, and resources to quickly reference them
				later. Your collection starts here.
			</p>
			<button
				onClick={onAdd}
				className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold text-sm transition-colors shadow"
			>
				<Add sx={{ fontSize: 18 }} /> Explore posts
			</button>
			<div className="mt-10 grid grid-cols-3 gap-3 w-full max-w-xs opacity-40">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="h-20 rounded-xl bg-gray-200 animate-pulse"
						style={{ animationDelay: `${i * 0.15}s` }}
					/>
				))}
			</div>
		</div>
	);
}

// ── Post Detail View ───────────────────────────────────────────────────────────

function PostDetail({
	post,
	onBack,
	onLike,
	onBookmark,
}: {
	post: Post;
	onBack: () => void;
	onLike: (id: number) => void;
	onBookmark: (id: number) => void;
}) {
	const [reply, setReply] = useState("");

	return (
		<div className="flex flex-col gap-0">
			{/* Back */}
			<button
				onClick={onBack}
				className="flex items-center gap-1.5 text-sm text-purple-700 font-semibold mb-4 hover:underline w-fit"
			>
				<ArrowBack sx={{ fontSize: 16 }} /> Back to saved posts
			</button>

			{/* Post card */}
			<div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
				<div className="flex items-center gap-2 mb-1">
					<Avatar
						sx={{
							width: 32,
							height: 32,
							bgcolor: "#7c3aed",
							fontSize: 13,
							fontWeight: 700,
						}}
					>
						{post.avatar}
					</Avatar>
					<span className="font-semibold text-sm text-gray-900">
						{post.author}
					</span>
					<span className="text-gray-400 text-xs">·</span>
					<span className="text-gray-400 text-xs">Saved 5 days ago</span>
				</div>

				<h2 className="text-2xl font-bold text-gray-900 mt-3 mb-3">
					{post.title}
				</h2>
				<p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
					{post.body}
				</p>

				<div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
					<Avatar
						sx={{
							width: 32,
							height: 32,
							bgcolor: "#7c3aed",
							fontSize: 13,
							fontWeight: 700,
						}}
					>
						{post.avatar}
					</Avatar>
					<span className="font-semibold text-gray-900">{post.author}</span>
					<span>·</span>
					<span>Saved 5 days ago</span>
				</div>

				<div className="mt-4">
					<ActionBar
						likes={post.likes}
						liked={post.liked}
						comments={post.comments.length}
						shares={post.shares}
						bookmarks={post.bookmarks}
						bookmarked={post.bookmarked}
						size="lg"
						onLike={() => onLike(post.id)}
						onBookmark={() => onBookmark(post.id)}
					/>
				</div>

				{/* Reply box */}
				<div className="flex items-center gap-3 mt-5">
					<Avatar
						sx={{ width: 36, height: 36, bgcolor: "#d1d5db", fontSize: 13 }}
					>
						U
					</Avatar>
					<div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50">
						<input
							className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
							placeholder="Post your reply"
							value={reply}
							onChange={(e) => setReply(e.target.value)}
						/>
						<button className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1">
							<Send sx={{ fontSize: 14 }} /> Send Comment
						</button>
					</div>
				</div>
			</div>

			{/* Comments */}
			<div className="mt-4 flex flex-col gap-4">
				{post.comments.map((c) => (
					<div
						key={c.id}
						className="border-b border-gray-100 pb-4 last:border-0"
					>
						<div className="flex items-center justify-between mb-1">
							<div className="flex items-center gap-2">
								<Avatar
									sx={{
										width: 28,
										height: 28,
										bgcolor: "#e9d5ff",
										color: "#7c3aed",
										fontSize: 11,
										fontWeight: 700,
									}}
								>
									{c.avatar}
								</Avatar>
								<span className="font-semibold text-sm text-gray-900">
									{c.author}
								</span>
							</div>
							<span className="text-xs text-gray-400">{c.timeAgo}</span>
						</div>
						<p className="text-sm text-gray-700 ml-9">{c.text}</p>
						<div className="ml-9 mt-2">
							<ActionBar
								likes={c.likes}
								liked={c.liked}
								comments={0}
								shares={10}
								bookmarks={11}
								bookmarked={false}
								size="sm"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

// ── List View ──────────────────────────────────────────────────────────────────

function PostCard({
	post,
	onView,
	onRemove,
	onLike,
	onBookmark,
}: {
	post: Post;
	onView: () => void;
	onRemove: (id: number) => void;
	onLike: (id: number) => void;
	onBookmark: (id: number) => void;
}) {
	return (
		<div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-center gap-2.5">
					<Avatar
						sx={{
							width: 40,
							height: 40,
							bgcolor: "#7c3aed",
							fontSize: 14,
							fontWeight: 700,
						}}
					>
						{post.avatar}
					</Avatar>
					<div>
						<div className="flex items-center gap-1.5 flex-wrap">
							<span className="font-semibold text-sm text-gray-900">
								{post.author}
							</span>
							{post.badge === "verified" && (
								<>
									<span className="text-gray-300">·</span>
									<VerifiedOutlined sx={{ fontSize: 14, color: "#16a34a" }} />
								</>
							)}
							<BadgeChip
								badge={post.badge === "verified" ? undefined : post.badge}
							/>
						</div>
						<p className="text-xs text-gray-500">{post.role}</p>
						<p className="text-xs text-gray-400">{post.timeAgo}</p>
					</div>
				</div>
				<Tooltip title="Remove bookmark">
					<IconButton
						size="small"
						onClick={() => onBookmark(post.id)}
						sx={{ color: "#7c3aed", "&:hover": { bgcolor: "#f5f3ff" } }}
					>
						<Bookmark sx={{ fontSize: 20 }} />
					</IconButton>
				</Tooltip>
			</div>

			<div className="mt-3 flex items-start justify-between gap-2">
				<h3 className="font-bold text-gray-900 text-base leading-snug">
					{post.title}
				</h3>
				<span
					className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border"
					style={{
						color: CATEGORY_COLORS[post.category] || "#6b7280",
						borderColor: CATEGORY_COLORS[post.category] || "#d1d5db",
						background: (CATEGORY_COLORS[post.category] || "#6b7280") + "15",
					}}
				>
					{post.category}
				</span>
			</div>
			<p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
				{post.body}
			</p>

			<div className="mt-4 flex gap-2">
				<button
					onClick={onView}
					className="flex-1 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-sm font-semibold transition-colors"
				>
					View post
				</button>
				<button
					onClick={() => onRemove(post.id)}
					className="flex-1 py-2 border border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl text-sm font-semibold transition-colors"
				>
					Remove from saved
				</button>
			</div>
		</div>
	);
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function SavedPost() {
	const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
	const [activeTab, setActiveTab] = useState<Tab>("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);
	const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
	const [sortLabel, setSortLabel] = useState("Mostly liked");
	const [hasPosts, setHasPosts] = useState(true); // toggle for demo

	const filtered = posts.filter((p) => {
		const matchTab = activeTab === "All" || p.category === activeTab;
		const matchSearch =
			p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.body.toLowerCase().includes(searchQuery.toLowerCase());
		return matchTab && matchSearch;
	});

	const handleLike = (id: number) => {
		setPosts((prev) =>
			prev.map((p) =>
				p.id === id
					? {
							...p,
							liked: !p.liked,
							likes: p.liked ? p.likes - 1 : p.likes + 1,
					  }
					: p,
			),
		);
		if (selectedPost?.id === id) {
			setSelectedPost((prev) =>
				prev
					? {
							...prev,
							liked: !prev.liked,
							likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
					  }
					: prev,
			);
		}
	};

	const handleBookmark = (id: number) => {
		setPosts((prev) =>
			prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p)),
		);
		if (selectedPost?.id === id) {
			setSelectedPost((prev) =>
				prev ? { ...prev, bookmarked: !prev.bookmarked } : prev,
			);
		}
	};

	const handleRemove = (id: number) => {
		setPosts((prev) => prev.filter((p) => p.id !== id));
		if (selectedPost?.id === id) setSelectedPost(null);
	};

	return (
		<div
			className="min-h-screen bg-gray-50"
			style={{ fontFamily: "'DM Sans', sans-serif" }}
		>
			<link
				href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
				rel="stylesheet"
			/>

			<div className="max-w-5xl mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-extrabold text-gray-900">Saved Post</h1>
					<p className="text-sm text-gray-500 mt-0.5">
						Quickly access your favourite discussion, question, and resources
					</p>
				</div>

				{/* Toolbar */}
				<div className="flex items-center gap-3 mb-5 flex-wrap">
					<Avatar
						sx={{
							width: 38,
							height: 38,
							bgcolor: "#7c3aed",
							fontSize: 14,
							fontWeight: 700,
						}}
					>
						U
					</Avatar>
					<div className="flex-1 min-w-[200px]">
						<TextField
							fullWidth
							size="small"
							placeholder="Search Discussion, skills, topic......"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search sx={{ fontSize: 18, color: "#9ca3af" }} />
									</InputAdornment>
								),
								sx: { borderRadius: "12px", bgcolor: "white", fontSize: 13 },
							}}
						/>
					</div>

					{/* Sort */}
					<button
						onClick={(e) => setSortAnchor(e.currentTarget)}
						className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
					>
						{sortLabel} <ArrowDropDown sx={{ fontSize: 20 }} />
					</button>
					<Menu
						anchorEl={sortAnchor}
						open={Boolean(sortAnchor)}
						onClose={() => setSortAnchor(null)}
					>
						{[
							"Mostly liked",
							"Most recent",
							"Most comments",
							"Most shared",
						].map((s) => (
							<MenuItem
								key={s}
								onClick={() => {
									setSortLabel(s);
									setSortAnchor(null);
								}}
								sx={{ fontSize: 13 }}
							>
								{s}
							</MenuItem>
						))}
					</Menu>

					{/* Add new post */}
					<button className="flex items-center gap-1.5 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-sm font-semibold transition-colors shadow">
						Add New Post <Add sx={{ fontSize: 18 }} />
					</button>

					{/* Demo toggle */}
					<Tooltip title="Toggle empty state (demo)">
						<button
							onClick={() => setHasPosts((v) => !v)}
							className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
								hasPosts
									? "border-green-300 bg-green-50 text-green-700"
									: "border-amber-300 bg-amber-50 text-amber-700"
							}`}
						>
							{hasPosts ? "Has posts" : "Empty"}
						</button>
					</Tooltip>
				</div>

				{/* Tabs */}
				<div className="flex gap-1 border-b border-gray-200 mb-5 overflow-x-auto">
					{TABS.map((tab) => (
						<button
							key={tab}
							onClick={() => {
								setActiveTab(tab);
								setSelectedPost(null);
							}}
							className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
								activeTab === tab
									? "border-purple-700 text-purple-700"
									: "border-transparent text-gray-500 hover:text-gray-800"
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Content */}
				{!hasPosts ? (
					<EmptyState onAdd={() => setHasPosts(true)} />
				) : selectedPost ? (
					<PostDetail
						post={selectedPost}
						onBack={() => setSelectedPost(null)}
						onLike={handleLike}
						onBookmark={handleBookmark}
					/>
				) : (
					<div className="flex gap-5">
						{/* Posts list */}
						<div className="flex-1 flex flex-col gap-4 min-w-0">
							{filtered.length === 0 ? (
								<div className="text-center py-16 text-gray-400">
									<BookmarkBorder sx={{ fontSize: 48, opacity: 0.3 }} />
									<p className="mt-2 text-sm">No posts match your search.</p>
								</div>
							) : (
								filtered.map((post) => (
									<PostCard
										key={post.id}
										post={post}
										onView={() => setSelectedPost(post)}
										onRemove={handleRemove}
										onLike={handleLike}
										onBookmark={handleBookmark}
									/>
								))
							)}
						</div>

						{/* Sidebar */}
						<div className="w-64 shrink-0 hidden lg:flex flex-col gap-4">
							{/* Quick tip */}
							<div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-white to-purple-50 p-4">
								<div className="flex items-center gap-2 mb-1">
									<div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
										<AutoAwesome sx={{ fontSize: 18, color: "#7c3aed" }} />
									</div>
									<span className="font-bold text-gray-900 text-sm">
										Quick Tip
									</span>
								</div>
								<p className="text-xs text-gray-500 leading-relaxed">
									Save posts to quickly reference useful resources later
								</p>
							</div>

							{/* Suggested */}
							<div className="rounded-2xl border border-gray-200 bg-white p-4">
								<h4 className="font-bold text-gray-800 text-sm mb-3">
									Suggested Creators
								</h4>
								<div className="flex flex-col gap-3">
									{SUGGESTED_USERS.map((u) => (
										<div key={u.id} className="flex items-center gap-2.5">
											<Avatar
												sx={{
													width: 32,
													height: 32,
													bgcolor: "#f3f4f6",
													color: "#374151",
													fontSize: 11,
													fontWeight: 700,
												}}
											>
												{u.avatar}
											</Avatar>
											<div className="flex-1 min-w-0">
												<p className="text-xs font-semibold text-gray-900 truncate">
													{u.name}
												</p>
												<p className="text-xs text-gray-400 truncate">
													{u.role}
												</p>
											</div>
											<span className="text-xs text-gray-400 font-medium whitespace-nowrap">
												{u.posts} posts
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
