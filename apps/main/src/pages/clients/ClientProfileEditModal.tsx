import React, { useState } from "react";
import type { ClientProfileInfo } from "../../services/client-profile.service";
import EditModal from "../personalInfoSettings/modals/EditsModal";

interface Props {
	profile: ClientProfileInfo;
	onClose: () => void;
	onSave: (profile: ClientProfileInfo) => void;
	isSaving: boolean;
	saveBlocked: boolean;
	error: string;
}

const inputClass =
	"w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-purple-500";

const ClientProfileEditModal: React.FC<Props> = ({
	profile,
	onClose,
	onSave,
	isSaving,
	saveBlocked,
	error,
}) => {
	const [values, setValues] = useState({
		title: profile.clientType === "Individual_Client" ? profile.info.title : "",
		bio:
			profile.clientType === "Individual_Client"
				? profile.info.about_you
				: profile.info.company_description,
		website:
			(profile.clientType === "Individual_Client"
				? profile.info.website
				: profile.info.company_website) || "",
		companyName:
			profile.clientType === "Company_Client" ? profile.info.company_name : "",
		companySize:
			profile.clientType === "Company_Client"
				? String(profile.info.company_size)
				: "",
		industry:
			profile.clientType === "Company_Client"
				? profile.info.company_industry
				: "",
	});
	const [validationError, setValidationError] = useState("");

	const setField = (field: keyof typeof values, value: string) => {
		setValues((current) => ({ ...current, [field]: value }));
		setValidationError("");
	};

	const handleSave = () => {
		if (isSaving || saveBlocked) return;
		const website = values.website.trim();
		if (website) {
			try {
				const parsed = new URL(website);
				if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
			} catch {
				setValidationError("Enter a valid website URL beginning with http:// or https://.");
				return;
			}
			if (website.length > 200) {
				setValidationError("Website must be no more than 200 characters.");
				return;
			}
		}

		if (profile.clientType === "Individual_Client") {
			if (!values.title.trim() || values.title.trim().length > 100 || !values.bio.trim()) {
				setValidationError("Enter a professional title (up to 100 characters) and biography.");
				return;
			}
			onSave({
				clientType: profile.clientType,
				info: {
					title: values.title.trim(),
					about_you: values.bio.trim(),
					website: website || null,
				},
			});
			return;
		}

		const size = Number(values.companySize);
		if (
			!values.companyName.trim() ||
			values.companyName.trim().length > 100 ||
			!values.industry.trim() ||
			values.industry.trim().length > 100 ||
			!values.bio.trim() ||
			!values.companySize.trim() ||
			!Number.isInteger(size) ||
			size < 0 ||
			size > 2147483647
		) {
			setValidationError("Enter a company name, industry, description and valid company size.");
			return;
		}
		onSave({
			clientType: profile.clientType,
			info: {
				company_name: values.companyName.trim(),
				company_size: size,
				company_industry: values.industry.trim(),
				company_description: values.bio.trim(),
				company_website: website || null,
			},
		});
	};

	return (
		<EditModal
			isOpen
			onClose={() => { if (!isSaving) onClose(); }}
			title='Edit Profile'
			onSave={handleSave}
			saveDisabled={isSaving || saveBlocked}
		>
			<div className='space-y-4'>
				{(validationError || error) && (
					<p role='alert' className='text-sm text-red-700'>{validationError || error}</p>
				)}
				{isSaving && <p role='status' className='text-sm text-gray-600'>Saving...</p>}
				{profile.clientType === "Individual_Client" ? (
					<label className='block space-y-1.5 text-sm font-medium text-gray-700'>
						Professional Title
						<input className={inputClass} value={values.title} maxLength={100} disabled={isSaving} onChange={(event) => setField("title", event.target.value)} />
					</label>
				) : (
					<>
						<label className='block space-y-1.5 text-sm font-medium text-gray-700'>
							Company Name
							<input className={inputClass} value={values.companyName} maxLength={100} disabled={isSaving} onChange={(event) => setField("companyName", event.target.value)} />
						</label>
						<label className='block space-y-1.5 text-sm font-medium text-gray-700'>
							Company Size
							<input className={inputClass} type='number' min='0' max='2147483647' step='1' value={values.companySize} disabled={isSaving} onChange={(event) => setField("companySize", event.target.value)} />
						</label>
						<label className='block space-y-1.5 text-sm font-medium text-gray-700'>
							Industry
							<input className={inputClass} value={values.industry} maxLength={100} disabled={isSaving} onChange={(event) => setField("industry", event.target.value)} />
						</label>
					</>
				)}
				<label className='block space-y-1.5 text-sm font-medium text-gray-700'>
					{profile.clientType === "Individual_Client" ? "Personal/Business Website (optional)" : "Company Website (optional)"}
					<input className={inputClass} type='url' maxLength={200} value={values.website} disabled={isSaving} onChange={(event) => setField("website", event.target.value)} />
				</label>
				<label className='block space-y-1.5 text-sm font-medium text-gray-700'>
					{profile.clientType === "Individual_Client" ? "About You" : "Company Description"}
					<textarea className={inputClass} rows={6} value={values.bio} disabled={isSaving} onChange={(event) => setField("bio", event.target.value)} />
				</label>
			</div>
		</EditModal>
	);
};

export default ClientProfileEditModal;
