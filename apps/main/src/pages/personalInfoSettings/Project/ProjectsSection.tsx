import React, { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
	PortfolioItem,
	createPortfolioItem,
	deletePortfolioItem,
	listPortfolioItems,
	updatePortfolioItem,
} from "../../../services/profile.service";
import { getApiErrorMessage } from "../../../utils/apiError";

interface ProjectForm {
	title: string;
	description: string;
	url: string;
	skills: string;
}

const emptyForm: ProjectForm = { title: "", description: "", url: "", skills: "" };

interface ProjectsSectionProps {
	showEdit?: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ showEdit }) => {
	const [items, setItems] = useState<PortfolioItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [form, setForm] = useState<ProjectForm>(emptyForm);
	const [formOpen, setFormOpen] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		listPortfolioItems()
			.then((result) => {
				if (active) setItems(result);
			})
			.catch((requestError: unknown) => {
				if (active) setError(getApiErrorMessage(requestError, "Unable to load portfolio projects."));
			})
			.finally(() => {
				if (active) setLoading(false);
			});
		return () => {
			active = false;
		};
	}, []);

	const startEditing = (item: PortfolioItem) => {
		setEditingId(item.id);
		setForm({
			title: item.title,
			description: item.description,
			url: item.url,
			skills: item.skills.join(", "),
		});
		setFormOpen(true);
		setError("");
	};

	const resetForm = () => {
		setEditingId(null);
		setForm(emptyForm);
		setFormOpen(false);
	};

	const saveItem = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSaving(true);
		setError("");
		const payload = {
			title: form.title.trim(),
			description: form.description.trim(),
			url: form.url.trim(),
			skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
		};
		try {
			if (editingId === null) {
				const created = await createPortfolioItem(payload);
				setItems((current) => [created, ...current]);
			} else {
				const updated = await updatePortfolioItem(editingId, payload);
				setItems((current) =>
					current.map((item) => (item.id === updated.id ? updated : item)),
				);
			}
			resetForm();
		} catch (requestError) {
			setError(getApiErrorMessage(requestError, "Unable to save this portfolio project."));
		} finally {
			setSaving(false);
		}
	};

	const removeItem = async (id: number) => {
		setError("");
		try {
			await deletePortfolioItem(id);
			setItems((current) => current.filter((item) => item.id !== id));
		} catch (requestError) {
			setError(getApiErrorMessage(requestError, "Unable to delete this portfolio project."));
		}
	};

	return (
		<section>
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h3 className="text-base font-semibold text-gray-darker">Portfolio projects</h3>
					<p className="text-xs text-gray-dark-20">Projects you have added to your portfolio</p>
				</div>
				{showEdit && (
					<button
						type="button"
						onClick={() => {
							resetForm();
							setFormOpen(true);
						}}
						className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
					>
						<Plus className="h-4 w-4" />
						Add project
					</button>
				)}
			</div>

			{formOpen && showEdit && (
				<form onSubmit={saveItem} className="mb-6 space-y-3 rounded-xl border border-gray-200 p-4">
					<label className="block text-sm font-medium text-gray-700">
						Title
						<input required maxLength={150} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
					</label>
					<label className="block text-sm font-medium text-gray-700">
						Description
						<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 p-2" rows={3} />
					</label>
					<label className="block text-sm font-medium text-gray-700">
						Project URL
						<input type="url" value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
					</label>
					<label className="block text-sm font-medium text-gray-700">
						Skills (comma separated)
						<input value={form.skills} onChange={(event) => setForm({ ...form, skills: event.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
					</label>
					<div className="flex gap-3">
						<button disabled={saving} className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50">
							{saving ? "Saving…" : "Save project"}
						</button>
						<button type="button" onClick={resetForm} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700">
							Cancel
						</button>
					</div>
				</form>
			)}

			{error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
			{loading ? (
				<p className="py-8 text-center text-gray-500">Loading portfolio…</p>
			) : items.length ? (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{items.map((item) => (
						<article key={item.id} className="rounded-lg border border-gray-200 p-5">
							<div className="flex items-start justify-between gap-3">
								<h4 className="font-semibold text-gray-900">{item.title}</h4>
								{showEdit && (
									<div className="flex gap-2">
										<button type="button" onClick={() => startEditing(item)} aria-label={`Edit ${item.title}`} className="rounded p-1 text-gray-500 hover:bg-gray-100">
											<Pencil className="h-4 w-4" />
										</button>
										<button type="button" onClick={() => removeItem(item.id)} aria-label={`Delete ${item.title}`} className="rounded p-1 text-red-600 hover:bg-red-50">
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								)}
							</div>
							{item.description && <p className="mt-3 whitespace-pre-wrap text-sm text-gray-600">{item.description}</p>}
							{item.url && (
								<a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-block break-all text-sm text-blue-700 underline">
									{item.url}
								</a>
							)}
							{item.skills.length > 0 && (
								<div className="mt-4 flex flex-wrap gap-2">
									{item.skills.map((skill) => <span key={skill} className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">{skill}</span>)}
								</div>
							)}
						</article>
					))}
				</div>
			) : (
				<p className="rounded-lg border border-dashed border-gray-300 py-10 text-center text-sm text-gray-500">
					No portfolio projects yet.
				</p>
			)}
		</section>
	);
};

export default ProjectsSection;
