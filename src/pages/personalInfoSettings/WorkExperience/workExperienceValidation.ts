import * as Yup from "yup";

export const workExperienceValidationSchema = Yup.object().shape({
  work: Yup.array().of(
    Yup.object().shape({
      jobTitle: Yup.string().required("Job title is required"),
      company: Yup.string().required("Company's name is required"),
      jobDescription: Yup.string().required("Job description is required"),
      startMonth: Yup.string().required("Start month is required"),
      startYear: Yup.string().required("Start year is required"),
      endMonth: Yup.string().when("stillWorking", {
        is: (val: boolean) => !val,
        then: (schema) => schema.required("End month is required"),
        otherwise: (schema) => schema,
      }),
      endYear: Yup.string().when("stillWorking", {
        is: (val: boolean) => !val,
        then: (schema) => schema.required("End year is required"),
        otherwise: (schema) => schema,
      }),
      stillWorking: Yup.boolean(),
    })
  ),
});
