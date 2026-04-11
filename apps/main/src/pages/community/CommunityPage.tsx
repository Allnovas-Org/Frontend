import React, { useState } from "react";
import {
	Search,
	MessageSquare,
	Bell,
	Settings,
	MoreVertical,
	X,
	Heart,
	MessageCircle,
	Share2,
	Bookmark,
	UserPlus,
} from "lucide-react";
import { Avatar, IconButton, InputBase } from "@mui/material";
import {
	Brush,
	Code,
	Edit,
	VideoLibrary,
	Lightbulb,
	MonetizationOn,
} from "@mui/icons-material";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SkillCommunity {
	id: number;
	icon: React.ReactNode;
	label: string;
	members: string;
	color: string;
	bg: string;
}

interface Post {
	id: number;
	author: string;
	role: string;
	time: string;
	title: string;
	body: string;
	image?: string;
	tags?: string[];
	likes: number;
	comments: number;
	shares: number;
	bookmarks: number;
	showClose?: boolean;
}

interface SpotlightUser {
	name: string;
	role: string;
	avatar: string;
	works: string[];
}

interface Guide {
	title: string;
	subtitle: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TABS = [
	"All",
	"Skills",
	"Discussion",
	"Showcases",
	"Guide",
	"Tech Summit",
];

const SKILL_COMMUNITIES: SkillCommunity[] = [
	{
		id: 1,
		icon: <Brush fontSize="small" />,
		label: "Design",
		members: "124 members",
		color: "#F97316",
		bg: "#FFF7ED",
	},
	{
		id: 2,
		icon: <Code fontSize="small" />,
		label: "Development",
		members: "124 members",
		color: "#6366F1",
		bg: "#EEF2FF",
	},
	{
		id: 3,
		icon: <Edit fontSize="small" />,
		label: "Writing",
		members: "8.7k members",
		color: "#10B981",
		bg: "#ECFDF5",
	},
	{
		id: 4,
		icon: <VideoLibrary fontSize="small" />,
		label: "Video Editing",
		members: "124 members",
		color: "#EC4899",
		bg: "#FDF2F8",
	},
	{
		id: 5,
		icon: <Lightbulb fontSize="small" />,
		label: "Beginners Hub",
		members: "124 members",
		color: "#F59E0B",
		bg: "#FFFBEB",
	},
];

const POSTS: Post[] = [
	{
		id: 1,
		author: "Ajayi Samuel",
		role: "Product Designer / UI/UX Designer / Tech Enthusiast",
		time: "2 days ago",
		title: "Creating solution in nigerian medical section?",
		body: "MedApp is a smart digital healthcare platform designed to make medical support available anytime, anywhere. It helps users book appointments with trusted doctors, access instant medical advice, and manage all their health records in one secure place. MedApp also includes a quick symptom checker, personalized health tips, and convenient virtual consultations, making healthcare easier and more accessible for everyone. Whether you need routine care or urgent attention, MedApp connects you to the",
		image:
			"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
		likes: 251,
		comments: 25,
		shares: 10,
		bookmarks: 11,
		showClose: true,
	},
	{
		id: 2,
		author: "Ajayi Samuel",
		role: "Product Designer / UI/UX Designer / Tech Enthusiast",
		time: "2 days ago",
		title: "Best Practice for React component architecture?",
		body: "I'm working on a large-scale React application and wondering what the community recommends for structuring components. Should I use atomic design principles or",
		tags: ["#codeline", "#phyton", "#hml", "#Developer"],
		likes: 251,
		comments: 25,
		shares: 10,
		bookmarks: 11,
		showClose: false,
	},
];

const SPOTLIGHT: SpotlightUser = {
	name: "Alex James",
	role: "Software Engineer",
	avatar:
		"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
	works: [
		"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
		"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
		"https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&q=80",
	],
};

const GUIDES: Guide[] = [
	{
		title: "Price Guide",
		subtitle: "Learn how to price your service confidently",
	},
	{
		title: "Price Guide",
		subtitle: "Learn how to price your service confidently",
	},
	{
		title: "Price Guide",
		subtitle: "Learn how to price your service confidently",
	},
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TopBar() {
	return (
		<div className="flex items-center justify-between px-5 py-3 bg-white sticky top-0 z-10 border-b border-gray-100">
			<div className="flex items-center gap-3 flex-1 min-w-0">
				<Avatar
					src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&q=80"
					sx={{ width: 36, height: 36, flexShrink: 0 }}
				/>
				<div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 flex-1 max-w-lg">
					<Search size={14} className="text-gray-400 shrink-0" />
					<InputBase
						placeholder="Search Discussion, skills, topic......"
						sx={{ fontSize: 13, color: "#9CA3AF", flex: 1 }}
					/>
				</div>
			</div>
			<div className="flex items-center gap-1 ml-3 shrink-0">
				<IconButton size="small">
					<MessageSquare size={18} className="text-gray-600" />
				</IconButton>
				<IconButton size="small">
					<Bell size={18} className="text-gray-600" />
				</IconButton>
				<IconButton size="small">
					<Settings size={18} className="text-gray-600" />
				</IconButton>
			</div>
		</div>
	);
}

function NavTabs({
	active,
	setActive,
}: {
	active: string;
	setActive: (t: string) => void;
}) {
	return (
		<div className="flex gap-1 px-5 py-2.5 bg-white overflow-x-auto border-b border-gray-100">
			{TABS.map((tab) => (
				<button
					key={tab}
					onClick={() => setActive(tab)}
					className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
						active === tab
							? "bg-purple-600 text-white shadow-sm"
							: "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
					}`}
				>
					{tab}
				</button>
			))}
		</div>
	);
}

function WelcomeBanner() {
	return (
		<div className="mx-5 mt-5 mb-5 border border-gray-200 rounded-2xl p-6 bg-white">
			<h2 className="text-xl font-bold text-gray-900 mb-1">
				Welcome to the Freelancer Community
			</h2>
			<p className="text-sm text-gray-500 mb-4">
				Learn, share, grow and connect with thousands of freelancers
			</p>
			<button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
				Ask the Community
			</button>
		</div>
	);
}

function SkillCommunities() {
	return (
		<div className="px-5 mb-5">
			<h3 className="text-base font-semibold text-gray-900 mb-3">
				Explore Skill Communities
			</h3>
			<div className="flex justify-between w-full max-w-4xl gap-4 overflow-x-auto pb-1">
				{SKILL_COMMUNITIES.map((skill) => (
					<div
						key={skill.id}
						className="flex flex-col items-center gap-2 min-w-[88px] cursor-pointer group"
					>
						<div
							className="w-16 h-16 rounded-2xl flex items-center justify-center border border-gray-100 transition-transform group-hover:scale-105"
							style={{ backgroundColor: skill.bg, color: skill.color }}
						>
							{skill.icon}
						</div>
						<span className="text-xs font-medium text-gray-800 text-center leading-tight">
							{skill.label}
						</span>
						<span className="text-[11px] text-gray-400 text-center">
							{skill.members}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function PostCard({ post }: { post: Post }) {
	const [liked, setLiked] = useState(false);
	const [bookmarked, setBookmarked] = useState(false);

	return (
		<div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
			{/* Author row */}
			<div className="flex items-start justify-between px-5 pt-5 pb-2">
				<div className="flex items-center gap-3">
					<Avatar
						src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&q=80"
						sx={{ width: 42, height: 42 }}
					/>
					<div>
						<p className="text-sm font-semibold text-gray-900">{post.author}</p>
						<p className="text-xs text-gray-400 leading-tight">{post.role}</p>
						<p className="text-xs text-gray-400 mt-0.5">{post.time}</p>
					</div>
				</div>
				<div className="flex items-center gap-1.5">
					{!post.showClose && (
						<button className="flex items-center gap-1 text-purple-600 text-xs font-semibold border border-purple-200 rounded-full px-3 py-1 hover:bg-purple-50 transition-colors">
							<UserPlus size={12} /> Follow
						</button>
					)}
					<IconButton size="small">
						<MoreVertical size={16} className="text-gray-400" />
					</IconButton>
					{post.showClose && (
						<IconButton size="small">
							<X size={16} className="text-gray-400" />
						</IconButton>
					)}
				</div>
			</div>

			{/* Content */}
			<div className="px-5 pb-3">
				<h4 className="text-base font-bold text-gray-900 mb-1.5">
					{post.title}
				</h4>
				<p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
					{post.body}{" "}
					{post.showClose && (
						<span className="text-blue-500 font-medium cursor-pointer hover:underline">
							Readmore..
						</span>
					)}
				</p>
			</div>

			{/* Tags */}
			{post.tags && (
				<div className="px-5 pb-3 flex flex-wrap gap-2">
					{post.tags.map((tag) => (
						<span
							key={tag}
							className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 cursor-pointer transition-colors"
						>
							{tag}
						</span>
					))}
				</div>
			)}

			{/* Post image — full width, height capped */}
			{post.image && (
				<img
					src={post.image}
					alt="post visual"
					className="w-full object-cover"
					style={{ maxHeight: "340px", minHeight: "180px" }}
				/>
			)}

			{/* Action bar */}
			<div className="flex items-center gap-5 px-5 py-3 border-t border-gray-100 flex-wrap">
				<button
					onClick={() => setLiked(!liked)}
					className={`flex items-center gap-1.5 text-sm transition-colors ${
						liked ? "text-red-500" : "text-gray-500 hover:text-red-400"
					}`}
				>
					<Heart size={15} fill={liked ? "currentColor" : "none"} />
					{post.likes + (liked ? 1 : 0)} Like
				</button>
				<button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 transition-colors">
					<MessageCircle size={15} /> {post.comments} Comments
				</button>
				<button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-500 transition-colors">
					<Share2 size={15} /> {post.shares} share
				</button>
				<button
					onClick={() => setBookmarked(!bookmarked)}
					className={`flex items-center gap-1.5 text-sm transition-colors ml-auto ${
						bookmarked
							? "text-purple-600"
							: "text-gray-500 hover:text-purple-500"
					}`}
				>
					<Bookmark size={15} fill={bookmarked ? "currentColor" : "none"} />
					{post.bookmarks} Bookmark
				</button>
			</div>
		</div>
	);
}

function TopDiscussions() {
	return (
		<div className="px-5 mb-5">
			<div className="bg-gray-50 rounded-2xl p-5">
				<h3 className="text-base font-semibold text-gray-900 mb-4">
					Top Discussions Today
				</h3>
				{POSTS.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}

function FreelancerSpotlight() {
	return (
		<div className="px-5 mb-5">
			<h3 className="text-base font-semibold text-gray-900 mb-3">
				Freelancer Spotlight
			</h3>

			{/* Profile card */}
			<div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
				<div className="flex items-center gap-4 mb-4">
					<Avatar src={SPOTLIGHT.avatar} sx={{ width: 64, height: 64 }} />
					<div>
						<p className="text-base font-bold text-gray-900">
							{SPOTLIGHT.name}
						</p>
						<p className="text-sm text-gray-400">{SPOTLIGHT.role}</p>
					</div>
				</div>
				<button className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-sm font-medium px-6 py-2 rounded-full transition-colors shadow-sm">
					View profile
				</button>
			</div>

			{/* Work grid — 3 equal columns, aspect-video keeps proportions */}
			<div className="grid grid-cols-3 gap-3">
				{SPOTLIGHT.works.map((src, i) => (
					<div
						key={i}
						className="rounded-xl overflow-hidden aspect-video bg-gray-100"
					>
						<img
							src={src}
							alt={`work-${i}`}
							className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
						/>
					</div>
				))}
			</div>
		</div>
	);
}

function GuidesForFreelancer() {
	return (
		<div className="px-5 mb-8">
			<h3 className="text-base font-semibold text-gray-900 mb-3">
				Guides For Freelancer
			</h3>
			{/* 1-col → 2-col → 3-col as the container grows */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{GUIDES.map((guide, i) => (
					<div
						key={i}
						className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-2.5 hover:shadow-md transition-shadow cursor-pointer"
					>
						<div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
							<MonetizationOn sx={{ fontSize: 20, color: "#3B82F6" }} />
						</div>
						<p className="text-sm font-semibold text-gray-900 leading-tight">
							{guide.title}
						</p>
						<p className="text-xs text-gray-400 leading-relaxed">
							{guide.subtitle}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

// ─── Main Component ───────────────────────────────────────────────────────────
/**
 * CommunityPage
 *
 * Fluid subcomponent — fills whatever space the parent gives it.
 * Pair it with a sidebar in a flex/grid layout, e.g.:
 *
 *   <div className="flex h-screen overflow-hidden">
 *     <Sidebar className="w-64 shrink-0" />
 *     <CommunityPage />   ← fills remaining width, scrolls independently
 *   </div>
 */
export default function CommunityPage() {
	const [activeTab, setActiveTab] = useState("All");

	return (
		// w-full fills remaining flex space; flex-col + overflow lets inner area scroll
		<div className="flex flex-col w-full h-full min-h-0 bg-gray-50 font-sans">
			{/* Sticky top bar + tabs anchored to the top of this panel */}
			<TopBar />
			<NavTabs active={activeTab} setActive={setActiveTab} />

			{/* Content area scrolls independently from the sidebar */}
			<div className="flex-1 overflow-y-auto">
				<WelcomeBanner />
				<SkillCommunities />
				<TopDiscussions />
				<FreelancerSpotlight />
				<GuidesForFreelancer />
			</div>
		</div>
	);
}
