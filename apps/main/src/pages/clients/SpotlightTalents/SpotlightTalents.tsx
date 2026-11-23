import React, { useEffect, useState } from "react";
import {
	Favorite,
	Search,
	TuneOutlined,
} from "@mui/icons-material";
import {
	InputAdornment,
	TextField,
	Pagination,
} from "@mui/material";
import FreelancerCard from "../../../components/FreelancerCard";
import FreelancerInformationOverlay from "./modals/FreelancerInformationOverlay";
import RelevanceOverlay from "./modals/RelevanceOverlay";
import { Link, useNavigate } from "react-router-dom";
import {
	FreelancerDirectoryEntry,
	listFreelancers,
} from "../../../services/freelancers.service";
import { getApiErrorMessage } from "../../../utils/apiError";

interface Freelancer {
	id: string;
	name: string;
	title: string;
	profileImage: string;
	rating: number | null;
	jobCount: number;
	skills: string[];
	hourlyRate: number | null;
	currency: string | null;
	yearsExperience: number;
	about: string;
	portfolio: FreelancerDirectoryEntry["portfolio"];
	category: string;
}

const categories = [
	"All",
	"Web Development",
	"Programming & Tech",
	"Video Editing & Animation",
];

const SpotlightTalents = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("All");
	const [selectedRelevance, setSelectedRelevance] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
	const [savedTalents, setSavedTalents] = useState<string[]>([]);
	const [selectedFreelancer, setSelectedFreelancer] =
		useState<Freelancer | null>(null);
	const [relevanceModalOpen, setRelevanceModalOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		let active = true;
		const timer = window.setTimeout(() => {
			setLoading(true);
			setLoadError("");
			void listFreelancers(searchQuery.trim(), currentPage)
				.then((page) => {
					if (!active) return;
					setFreelancers(page.results.map(mapFreelancer));
					setTotalCount(page.count);
				})
				.catch((error: unknown) => {
					if (active) {
						setLoadError(
							getApiErrorMessage(error, "Unable to load freelancers."),
						);
					}
				})
				.finally(() => {
					if (active) setLoading(false);
				});
		}, 250);
		return () => {
			active = false;
			window.clearTimeout(timer);
		};
	}, [currentPage, searchQuery]);

	const handleToggleSave = (id: string) => {
		setSavedTalents((prev) =>
			prev.includes(id)
				? prev.filter((talentId) => talentId !== id)
				: [...prev, id],
		);
	};

	const handleApplyRelevance = (selected: string[]) => {
		setSelectedRelevance(selected);
	};

	const filteredFreelancers = freelancers.filter(
		(freelancer) =>
			activeCategory === "All" || freelancer.category === activeCategory,
	);

	return (
		<div className="min-h-screen bg-white">
			<div className="mx-auto mb-4 max-w-7xl px-4 py-8">
				<div className="flex flex-row justify-between max-md:flex-col md:items-center">
					<div className="flex gap-4">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => {
									setActiveCategory(category);
									setCurrentPage(1);
								}}
								className="text-sm text-gray-600 transition hover:text-gray-900"
							>
								{category}
							</button>
						))}
					</div>
					<div className="inline-flex gap-4">
						<TextField
							placeholder="Search freelancers"
							value={searchQuery}
							onChange={(event) => {
								setSearchQuery(event.target.value);
								setCurrentPage(1);
							}}
							variant="outlined"
							size="small"
							sx={{
								width: 300,
								backgroundColor: "white",
								"& .MuiOutlinedInput-root": {
									"& fieldset": { borderColor: "#e5e7eb" },
									"&:hover fieldset": { borderColor: "#d1d5db" },
									"&.Mui-focused fieldset": { borderColor: "#9ca3af" },
									height: "40px",
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
							className="flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
						>
							<TuneOutlined sx={{ fontSize: 18 }} />
							Relevance
						</button>
					</div>
				</div>

				<div className="mb-8 mt-8">
					<div className="mb-6 flex items-center justify-between">
						<div>
							<h1 className="mb-2 text-2xl font-semibold">
								Hire top freelancers
							</h1>
							<p className="text-gray-600">
								Check out freelancers with the skills you need for your next job
							</p>
						</div>
					</div>
					<div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
						<button
							onClick={() => setActiveCategory("All")}
							className="hover:text-gray-900"
							aria-label="Show all categories"
						>
							⌂
						</button>
						<span>/</span>
						<button onClick={() => setActiveCategory("All")}>All</button>
						{activeCategory !== "All" ? (
							<>
								<span>/</span>
								<span className="font-medium text-gray-900">{activeCategory}</span>
							</>
						) : null}
						{selectedRelevance.length ? (
							<>
								<span>/</span>
								<span className="font-medium text-gray-900">
									{selectedRelevance[0]}
								</span>
							</>
						) : null}
					</div>
					<div className="flex gap-3">
						<button
							onClick={() => navigate("/clients/post-a-job")}
							className="rounded-lg bg-red-500 px-6 py-2.5 font-medium text-white transition hover:bg-red-600"
						>
							Post a job
						</button>
						<Link
							to="/clients/saved-talents"
							className="flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
						>
							<Favorite sx={{ fontSize: 18 }} />
							Saved Talents
						</Link>
					</div>
				</div>

				{loading ? (
					<p className="py-12 text-center text-gray-500">Loading freelancers…</p>
				) : loadError ? (
					<p role="alert" className="py-12 text-center text-red-600">
						{loadError}
					</p>
				) : filteredFreelancers.length === 0 ? (
					<p className="py-12 text-center text-gray-500">
						No freelancers match this search.
					</p>
				) : (
					<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredFreelancers.map((freelancer) => (
							<FreelancerCard
								key={freelancer.id}
								{...freelancer}
								isSaved={savedTalents.includes(freelancer.id)}
								onToggleSave={handleToggleSave}
								onSeeMore={() => setSelectedFreelancer(freelancer)}
							/>
						))}
					</div>
				)}

				<div className="flex justify-center">
					<Pagination
						count={Math.max(1, Math.ceil(totalCount / 20))}
						page={currentPage}
						onChange={(_, page) => setCurrentPage(page)}
						sx={{
							"& .MuiPaginationItem-root": {
								"&.Mui-selected": {
									backgroundColor: "#6A0DAD",
									color: "white",
									"&:hover": { backgroundColor: "#5a0b92" },
								},
							},
						}}
					/>
				</div>
			</div>

			<RelevanceOverlay
				open={relevanceModalOpen}
				onClose={() => setRelevanceModalOpen(false)}
				selectedRelevance={selectedRelevance}
				onApply={handleApplyRelevance}
			/>

			{selectedFreelancer ? (
				<FreelancerInformationOverlay
					open
					onClose={() => setSelectedFreelancer(null)}
					freelancer={selectedFreelancer}
					isSaved={savedTalents.includes(selectedFreelancer.id)}
					onToggleSave={handleToggleSave}
				/>
			) : null}
		</div>
	);
};

function mapFreelancer(entry: FreelancerDirectoryEntry): Freelancer {
	return {
		id: entry.user_id,
		name: entry.name,
		title: entry.title,
		profileImage: entry.profile_photo || "",
		rating: entry.rating,
		jobCount: entry.review_count,
		skills: entry.skills || [],
		hourlyRate:
			entry.hourly_rate === null ? null : Number(entry.hourly_rate),
		currency: entry.currency,
		yearsExperience: entry.yoe,
		about: entry.shbio || entry.bio || "",
		portfolio: entry.portfolio,
		category: entry.spa?.[0] || "",
	};
}

export default SpotlightTalents;
