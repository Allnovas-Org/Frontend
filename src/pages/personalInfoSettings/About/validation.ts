import * as Yup from "yup";

export const aboutMeSchema = Yup.object().shape({
  bio: Yup.string()
    .required("About Me is required")
    .max(1000, "Maximum 1000 characters"),
  experience: Yup.string().required("Experience is required"),
  primaryRole: Yup.string().required("Primary role is required"),
  availability: Yup.string().required("Availability is required"),
});
