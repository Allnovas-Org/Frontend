import * as Yup from "yup";
import type { ClientJob, DraftJobPayload, JobBudgetType, JobDuration, JobExperience, PublishedJobPayload } from "../../services/client-jobs.service";

export interface PostJobFormValues {
	title: string;
	description: string;
	category: string;
	freelancers: number | null;
	budgetType: JobBudgetType | "";
	duration: JobDuration | "";
	totalBudget: string;
	skills: string[];
	experienceLevel: JobExperience | "";
}

export const formValues = (job: ClientJob): PostJobFormValues => ({
	title: job.title,
	description: job.description,
	category: job.category,
	freelancers: job.freelancers_needed,
	budgetType: job.budget_type || "",
	duration: job.project_duration || "",
	totalBudget: job.budget || "",
	skills: Array.isArray(job.skills) ? job.skills.filter((skill): skill is string => typeof skill === "string") : [],
	experienceLevel: job.experience_level || "",
});

export const jobPayload = (values: PostJobFormValues, currency = "USD"): DraftJobPayload => ({
	title: values.title.trim(),
	description: values.description.trim(),
	category: values.category.trim(),
	skills: values.skills.map((skill) => skill.trim()),
	freelancers_needed: values.freelancers,
	budget_type: values.budgetType || null,
	budget: values.totalBudget.trim() || null,
	currency,
	project_duration: values.duration || null,
	experience_level: values.experienceLevel || null,
});

export const publishedPayload = (values: PostJobFormValues, currency = "USD"): PublishedJobPayload => {
	const payload = jobPayload(values, currency);
	if (payload.freelancers_needed === null || !payload.budget_type || !payload.budget || !payload.project_duration || !payload.experience_level) {
		throw new Error("Complete the required job fields before posting.");
	}
	return { ...payload, freelancers_needed: payload.freelancers_needed, budget_type: payload.budget_type, budget: payload.budget, project_duration: payload.project_duration, experience_level: payload.experience_level };
};

const budget = Yup.string().test(
	"budget",
	"Enter a positive amount with up to 10 digits and 2 decimal places",
	(value) => !value || (/^(?:\d{1,10}(?:\.\d{0,2})?|\.\d{1,2})$/.test(value) && Number(value) > 0),
);

export const draftJobSchema = Yup.object({
	title: Yup.string().trim().max(255, "Title must be at most 255 characters").required("Project title is required"),
	description: Yup.string(),
	category: Yup.string().max(100, "Category must be at most 100 characters"),
	freelancers: Yup.number().nullable().integer("Enter a whole number").min(1, "At least one freelancer is required").max(2147483647, "Too many freelancers"),
	budgetType: Yup.string().oneOf(["", "fixed", "hourly"]),
	duration: Yup.string().oneOf(["", "less_than_1_month", "1_to_3_months", "3_to_6_months"]),
	totalBudget: budget,
	skills: Yup.array().of(Yup.string().trim().required("Skill cannot be blank")),
	experienceLevel: Yup.string().oneOf(["", "entry", "intermediate", "expert"]),
});

export const postJobSchema = draftJobSchema.shape({
	title: Yup.string().trim().min(5, "Project title must be at least 5 characters").max(255, "Title must be at most 255 characters").required("Project title is required"),
	description: Yup.string().trim().min(20, "Description must be at least 20 characters").required("Project description is required"),
	category: Yup.string().trim().max(100).required("Category is required"),
	freelancers: Yup.number().nullable().integer("Enter a whole number").min(1).max(2147483647).required("Freelancers needed is required"),
	budgetType: Yup.string().oneOf(["fixed", "hourly"], "Select a budget type").required("Budget type is required"),
	duration: Yup.string().oneOf(["less_than_1_month", "1_to_3_months", "3_to_6_months"], "Select a duration").required("Project duration is required"),
	totalBudget: budget.required("Budget is required"),
	skills: Yup.array().of(Yup.string().trim().required("Skill cannot be blank")).min(1, "At least one skill is required").required("At least one skill is required"),
	experienceLevel: Yup.string().oneOf(["entry", "intermediate", "expert"], "Select an experience level").required("Experience level is required"),
});

export const openJobEditSchema = postJobSchema.shape({
	skills: Yup.array().of(Yup.string().trim().required("Skill cannot be blank")).required("Skills are required"),
	totalBudget: Yup.string()
		.matches(/^-?(?:\d{1,10}(?:\.\d{0,2})?|\.\d{1,2})$/, "Enter an amount with up to 10 digits and 2 decimal places")
		.required("Budget is required"),
});
