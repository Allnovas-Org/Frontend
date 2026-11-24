import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { EditAboutModal } from "./EditAboutModal";
import ToolsModal from "../Tools/ToolsModal";
import {
	getFreelancerProfile,
	updateFreelancerProfile,
} from "../../../services/profile.service";
import { getApiErrorMessage } from "../../../utils/apiError";

interface AboutMeSectionProps {
	showEdit: boolean;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ showEdit }) => {
	const [editOpen, setEditOpen] = useState(false);
	const [toolsModalOpen, setToolsModalOpen] = useState(false);
	const [aboutMeText, setAboutMeText] = useState("");
	const [tools, setTools] = useState<string[]>([]);
	const [yearsOfExperience, setYearsOfExperience] = useState<number | null>(null);
	const [languages, setLanguages] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		getFreelancerProfile()
			.then((profile) => {
				if (!active) return;
				setAboutMeText(profile.bio || "");
				setTools(profile.tat || []);
				setYearsOfExperience(profile.yoe);
				setLanguages(
					Array.isArray(profile.lang)
						? profile.lang
								.map((language) => {
									if (typeof language === "string") return language;
									if (language && typeof language === "object" && "language" in language) {
										return String(language.language);
									}
									return "";
								})
								.filter(Boolean)
						: [],
				);
			})
			.catch((requestError: unknown) => {
				if (active) setError(getApiErrorMessage(requestError, "Unable to load your profile."));
			})
			.finally(() => {
				if (active) setLoading(false);
			});
		return () => {
			active = false;
		};
	}, []);

	const saveBio = async (values: { bio: string }) => {
		try {
			const profile = await updateFreelancerProfile({ bio: values.bio.trim() });
			setAboutMeText(profile.bio || "");
			setEditOpen(false);
			setError("");
		} catch (requestError) {
			setError(getApiErrorMessage(requestError, "Unable to save your bio."));
		}
	};

	const saveTools = async (updatedTools: string[]) => {
		try {
			const profile = await updateFreelancerProfile({ tat: updatedTools });
			setTools(profile.tat || updatedTools);
			setError("");
		} catch (requestError) {
			const message = getApiErrorMessage(requestError, "Unable to save your tools.");
			setError(message);
			throw new Error(message);
		}
	};

	return (
		<div className="relative flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-3">
			{showEdit && (
				<button
					className="absolute right-6 top-6 rounded-full bg-gray-100 p-2 text-gray-400 transition-colors hover:text-gray-600"
					onClick={() => setEditOpen(true)}
					aria-label="Edit bio"
				>
					<Pencil size={14} />
				</button>
			)}
			<EditAboutModal
				isOpen={editOpen}
				onClose={() => setEditOpen(false)}
				initialBio={aboutMeText}
				onSave={saveBio}
			/>

			<section className="mb-8 sm:mb-10">
				<h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-800 sm:mb-6 sm:text-sm">
					About Me
				</h2>
				<p className="max-w-2xl whitespace-pre-wrap text-xs leading-relaxed text-gray-500 sm:text-sm">
					{loading ? "Loading profile…" : aboutMeText || "Add a short bio to tell clients about your work."}
				</p>
			</section>

			<div className="grid items-start gap-4 border-t border-gray-50 pt-6 sm:pt-8 md:grid-cols-[minmax(0,75px)_1fr_minmax(0,100px)] md:gap-3">
				<div>
					<span className="mb-2 block text-xs text-gray-400">Experience</span>
					<span className="text-sm font-bold text-gray-800">
						{yearsOfExperience === null
							? "—"
							: `${yearsOfExperience} ${yearsOfExperience === 1 ? "year" : "years"}`}
					</span>
				</div>

				<div className="relative">
					<div className="flex items-center justify-between">
						<span className="mb-2 block text-xs text-gray-400 sm:mb-3">Tools</span>
						{showEdit && (
							<button
								className="mb-1 rounded-full bg-gray-100 p-2 text-gray-400 transition-colors hover:text-gray-600"
								onClick={() => setToolsModalOpen(true)}
								aria-label="Edit tools"
							>
								<Pencil size={14} />
							</button>
						)}
					</div>
					<div className="grid grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-2">
						{tools.length ? tools.map((tool) => (
							<span key={tool} className="truncate rounded-full border border-gray-200 px-2 py-1 text-center text-xs text-gray-600 sm:px-3">
								{tool}
							</span>
						)) : <span className="text-xs text-gray-500">Not provided</span>}
					</div>
					<ToolsModal
						open={toolsModalOpen}
						onClose={() => setToolsModalOpen(false)}
						tools={tools}
						setTools={setTools}
						onSave={saveTools}
					/>
				</div>

				<div>
					<span className="mb-2 block text-xs text-gray-400">Languages</span>
					<span className="text-sm font-bold text-gray-800">
						{languages.length ? languages.join(", ") : "Not provided"}
					</span>
				</div>
			</div>
			{error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default AboutMeSection;
