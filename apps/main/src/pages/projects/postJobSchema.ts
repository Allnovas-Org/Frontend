import * as Yup from "yup";

export const postJobSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(5, "Project title must be at least 5 characters")
    .required("Project title is required"),

  description: Yup.string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .required("Project description is required"),

  category: Yup.string().required("Category is required"),

  freelancers: Yup.number()
    .min(1, "At least one freelancer is required")
    .required(),

  budgetType: Yup.string().required("Budget type is required"),

  duration: Yup.string().required("Project duration is required"),

  totalBudget: Yup.number()
    .typeError("Total budget must be a number")
    .positive("Budget must be greater than zero")
    .required("Total budget is required"),

  skills: Yup.array().of(Yup.string()).min(1, "At least one skill is required"),

  experienceLevel: Yup.string().required("Experience level is required"),
});
