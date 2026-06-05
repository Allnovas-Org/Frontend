import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
	Favorite,
	ChatBubbleOutline,
	Share,
	BookmarkBorder,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import ImageModal from "./ImageModal";

interface Comment {
	id: string;
	author: string;
	avatar: string;
	timeAgo: string;
	content?: string;
}

const PostDetail = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { slug, postId } = useParams();
	const [commentText, setCommentText] = useState("");
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// Mock post data
	const post = {
		id: postId,
		author: {
			name: "Jane Cooper",
			avatar: "https://i.pravatar.cc/150?img=1",
			role: "UI/UX designerhty",
			badge: "Top contributor",
		},
		timeAgo: "2h ago",
		title: "Best color combinations for fintech UI?",
		content: `I'm deep into designing a new fintech experience and I don't want to just follow trends — I want the UI to feel safe, credible, and modern all while looking fresh and innovative.

Some color combinations I'm considering like:
• Deep blues vs. navy tones
• Teal and mint as accent colors
• Dark mode vs. light, minimal layouts
• Using gradients vs. flat, bold colors for call-to-actions 🌟

But I'd really love to hear from other designers, product builders, and fintech folks 👇
What palettes have you seen work really well in fintech products?
Your opinions would really help shape this project.`,
		hashtags: [
			"#FintechDesign",
			"#ProductDesign",
			"#UIDesign",
			"#UXDesign",
			"#DesignProcess",
			"#BuildInPublic",
		],
		image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
		likes: 251,
		comments: 25,
		shares: 10,
		bookmarks: 11,
		tag: "questions",
	};

	const comments: Comment[] = [
		{
			id: "1",
			author: "Mike Rose",
			avatar: "https://i.pravatar.cc/150?img=5",
			timeAgo: "1 days ago",
		},
		{
			id: "2",
			author: "Mike Rose",
			avatar: "https://i.pravatar.cc/150?img=6",
			timeAgo: "2 days ago",
		},
		{
			id: "3",
			author: "Mike Rose",
			avatar: "https://i.pravatar.cc/150?img=7",
			timeAgo: "2 days ago",
		},
		{
			id: "4",
			author: "Mike Rose",
			avatar: "https://i.pravatar.cc/150?img=8",
			timeAgo: "2 days ago",
		},
	];

	const handleSubmitComment = () => {
		if (commentText.trim()) {
			console.log("Submitting comment:", commentText);
			setCommentText("");
		}
	};

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="bg-white rounded-lg p-6 border border-gray-200">
				{/* Author */}
				<div className="flex items-center gap-3 mb-6">
					<Avatar src={post.author.avatar} sx={{ width: 48, height: 48 }} />
					<div>
						<div className="flex items-center gap-2">
							<h4 className="font-semibold text-gray-900">
								{post.author.name}
							</h4>
							{post.author.badge && (
								<span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
									{post.author.badge}
								</span>
							)}
							<span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
								{post.tag}
							</span>
						</div>
						<p className="text-sm text-gray-600">{post.author.role}</p>
						<p className="text-xs text-gray-500">{post.timeAgo}</p>
					</div>
				</div>

				{/* Content */}
				<h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
				<div className="text-gray-700 mb-4 whitespace-pre-wrap">
					{post.content}
				</div>

				{/* Hashtags */}
				<div className="flex flex-wrap gap-2 mb-6">
					{post.hashtags.map((tag, index) => (
						<span
							key={index}
							className="text-blue-600 text-sm hover:underline cursor-pointer"
						>
							{tag}
						</span>
					))}
				</div>

				{/* Image */}
				{post.image && (
					<div
						onClick={() => setSelectedImage(post.image)}
						className="mb-6 cursor-pointer"
					>
						<img
							src={post.image}
							alt={post.title}
							className="w-full rounded-lg hover:opacity-95 transition"
						/>
					</div>
				)}

				{/* Actions */}
				<div className="flex items-center gap-6 pb-6 border-b border-gray-100 text-sm text-gray-600">
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

				{/* Comment Section */}
				<div className="mt-6">
					{/* Comment Input */}
					<div className="flex items-start gap-3 mb-6">
						<Avatar
							src="https://i.pravatar.cc/150?img=50"
							sx={{ width: 40, height: 40 }}
						/>
						<div className="flex-1">
							<h4 className="font-medium text-sm mb-2">Post your reply</h4>
							<textarea
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
								placeholder="Write a comment..."
								className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500 min-h-[100px]"
							/>
							<button
								onClick={handleSubmitComment}
								className="mt-3 px-6 py-2 bg-[#6A0DAD] text-white rounded-lg font-medium hover:bg-[#5a0b92] transition"
							>
								Send Comment
							</button>
						</div>
					</div>

					{/* Comments List */}
					<div className="space-y-6">
						{comments.map((comment) => (
							<div key={comment.id} className="flex items-start gap-3">
								<Avatar src={comment.avatar} sx={{ width: 40, height: 40 }} />
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-1">
										<h5 className="font-medium text-sm text-gray-900">
											{comment.author}
										</h5>
										<span className="text-xs text-gray-500">
											{comment.timeAgo}
										</span>
									</div>
									<p className="text-sm text-gray-600">
										{comment.content || "it's nice concept"}
									</p>
									<div className="flex items-center gap-4 mt-2">
										<button className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-500 transition">
											<Favorite sx={{ fontSize: 14 }} />
											<span>251 Like</span>
										</button>
										<button className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-500 transition">
											<ChatBubbleOutline sx={{ fontSize: 14 }} />
											<span>25 Comments</span>
										</button>
										<button className="flex items-center gap-1 text-xs text-gray-600 hover:text-green-500 transition">
											<Share sx={{ fontSize: 14 }} />
											<span>10 share</span>
										</button>
										<button className="flex items-center gap-1 text-xs text-gray-600 hover:text-purple-500 transition">
											<BookmarkBorder sx={{ fontSize: 14 }} />
											<span>11 Bookmark</span>
										</button>
									</div>
								</div>
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

export default PostDetail;
