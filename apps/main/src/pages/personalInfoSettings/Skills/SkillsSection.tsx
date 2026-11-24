import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import SkillsModal from "./SkillsModal";
import { getFreelancerProfile, updateFreelancerProfile } from "../../../services/profile.service";
import { getApiErrorMessage } from "../../../utils/apiError";

interface SkillsSectionProps {
	showEdit?: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ showEdit }) => {
	const [skills, setSkills] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		getFreelancerProfile()
			.then((profile) => {
				if (active) setSkills(profile.skills || []);
			})
			.catch((requestError: unknown) => {
				if (active) setError(getApiErrorMessage(requestError, "Unable to load your skills."));
			})
			.finally(() => {
				if (active) setLoading(false);
			});
		return () => {
			active = false;
		};
	}, []);

	const saveSkills = async (updatedSkills: string[]) => {
		try {
			const profile = await updateFreelancerProfile({ skills: updatedSkills });
			setSkills(profile.skills || updatedSkills);
			setError("");
		} catch (requestError) {
			const message = getApiErrorMessage(requestError, "Unable to save your skills.");
			setError(message);
			throw new Error(message);
		}
	};

	return (
		<div className="relative flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-3">
			<div className="mb-2 flex items-center justify-between">
				<h3 className="text-base font-semibold text-gray-800">Skills</h3>
				{showEdit && (
					<button
						className="rounded-full bg-gray-100 p-2 text-gray-400 transition-colors hover:text-gray-600"
						onClick={() => setOpen(true)}
						aria-label="Edit Skills"
					>
						<Pencil size={14} />
					</button>
				)}
			</div>
			{loading ? (
				<p className="text-sm text-gray-500">Loading skills…</p>
			) : skills.length ? (
				<div className="mt-2 flex flex-wrap gap-2">
					{skills.map((skill) => (
						<span key={skill} className="rounded-full border border-input px-4 py-1 text-sm font-medium text-gray-700">
							{skill}
						</span>
					))}
				</div>
			) : (
				<p className="text-sm text-gray-500">No skills added yet.</p>
			)}
			{error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
			<SkillsModal
				open={open}
				onClose={() => setOpen(false)}
				skills={skills}
				setSkills={setSkills}
				onSave={saveSkills}
			/>
		</div>
	);
};

export default SkillsSection;
