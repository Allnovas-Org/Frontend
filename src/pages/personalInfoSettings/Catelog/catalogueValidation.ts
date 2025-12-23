import * as Yup from "yup";

export const catalogueSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  summary: Yup.string().required("Service summary is required"),
  pricing: Yup.array().of(
    Yup.object().shape({
      tier: Yup.string().required(),
      price: Yup.number().required("Price is required"),
      deliveryTime: Yup.string().required("Delivery time is required"),
      features: Yup.array().of(Yup.string()),
    })
  ),
  description: Yup.string().required("Description is required"),
  faqs: Yup.array().of(
    Yup.object().shape({
      q: Yup.string().required("Question required"),
      a: Yup.string().required("Answer required"),
    })
  ),
});
