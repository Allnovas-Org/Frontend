import React, { useState } from "react";
import BasicInfo from "./steps/BasicInfo";
import PricingTable from "./steps/PricingTable";
import DescriptionFAQ from "./steps/DescriptionFAQ";
import Requirements from "./steps/Requirements";
import PublishStatus from "./steps/PublishStatus";
import Gallery from "./steps/Gallery";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const STEPS = [
  { id: "basic", label: "Basic Information" },
  { id: "pricing", label: "Pricing" },
  { id: "description", label: "Description & FAQ" },
  { id: "requirements", label: "Requirements" },
  { id: "gallery", label: "Gallery" },
  { id: "publish", label: "Publish" },
];

interface CreateCatalogueProps {
  onClose?: () => void;
}

export interface PricingTier {
  tier: string;
  price: string;
  deliveryTime: string;
  features: string[];
}
export interface Faq {
  q: string;
  a: string;
}
export interface RequirementSpecific {
  label: string;
  required: boolean;
}
export interface RequirementsForm {
  general: string;
  specific: RequirementSpecific[];
  files: boolean[];
  additional: string;
}
export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

export interface CatalogueFormValues {
  title: string;
  category: string;
  summary: string;
  pricing: PricingTier[];
  description: string;
  faqs: Faq[];
  requirements: RequirementsForm;
  gallery: UploadedFile[];
}

const initialValues: CatalogueFormValues & { process?: string } = {
  title: "",
  category: "",
  summary: "",
  pricing: [
    { tier: "Basic", price: "", deliveryTime: "", features: [] },
    { tier: "Standard", price: "", deliveryTime: "", features: [] },
    { tier: "Premium", price: "", deliveryTime: "", features: [] },
  ],
  description: "",
  faqs: [],
  requirements: {
    general: "",
    specific: [],
    files: [false, false, false],
    additional: "",
  },
  process: "",
  gallery: [],
};

const catalogueSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  summary: Yup.string().required("Service summary is required"),
  pricing: Yup.array().of(
    Yup.object().shape({
      tier: Yup.string().required(),
      price: Yup.string().required("Price is required"),
      deliveryTime: Yup.string().required("Delivery time is required"),
      features: Yup.array().of(Yup.string()),
    })
  ),
  description: Yup.string().required("Description is required"),
  process: Yup.string(),
  faqs: Yup.array().of(
    Yup.object().shape({
      q: Yup.string().required("Question required"),
      a: Yup.string().required("Answer required"),
    })
  ),
  gallery: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required(),
        file: Yup.mixed().required(),
        preview: Yup.string().required(),
      })
    )
    .min(1, "At least one image is required"),
  requirements: Yup.object().shape({
    general: Yup.string().required("General instruction required"),
    specific: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().required("Label required"),
        required: Yup.boolean(),
      })
    ),
    files: Yup.array().of(Yup.boolean()),
    additional: Yup.string(),
  }),
});

function getStepCompletion(
  values: CatalogueFormValues,
  errors: Partial<Record<keyof CatalogueFormValues, unknown>>
): Record<string, boolean> {
  // Helper type guards
  function isRequirementsError(
    obj: unknown
  ): obj is { general?: unknown; specific?: unknown } {
    return (
      typeof obj === "object" &&
      obj !== null &&
      ("general" in obj || "specific" in obj)
    );
  }
  function isFaqError(obj: unknown): obj is { q?: unknown; a?: unknown } {
    return (
      typeof obj === "object" && obj !== null && ("q" in obj || "a" in obj)
    );
  }
  function isPricingError(
    obj: unknown
  ): obj is { price?: unknown; deliveryTime?: unknown } {
    return (
      typeof obj === "object" &&
      obj !== null &&
      ("price" in obj || "deliveryTime" in obj)
    );
  }

  return {
    basic:
      !!values.title &&
      !!values.category &&
      !!values.summary &&
      !errors.title &&
      !errors.category &&
      !errors.summary,
    pricing:
      Array.isArray(values.pricing) &&
      values.pricing.every(
        (tier, i) =>
          !!tier.tier &&
          !!tier.price &&
          !!tier.deliveryTime &&
          !(
            errors.pricing &&
            Array.isArray(errors.pricing) &&
            errors.pricing[i] &&
            isPricingError(errors.pricing[i]) &&
            errors.pricing[i].price
          ) &&
          !(
            errors.pricing &&
            Array.isArray(errors.pricing) &&
            errors.pricing[i] &&
            isPricingError(errors.pricing[i]) &&
            errors.pricing[i].deliveryTime
          )
      ),
    description:
      !!values.description &&
      Array.isArray(values.faqs) &&
      values.faqs.length > 0 &&
      values.faqs.every(
        (faq, i) =>
          !!faq.q &&
          !!faq.a &&
          !(
            errors.faqs &&
            Array.isArray(errors.faqs) &&
            errors.faqs[i] &&
            isFaqError(errors.faqs[i]) &&
            errors.faqs[i].q
          ) &&
          !(
            errors.faqs &&
            Array.isArray(errors.faqs) &&
            errors.faqs[i] &&
            isFaqError(errors.faqs[i]) &&
            errors.faqs[i].a
          )
      ) &&
      !errors.description,
    requirements:
      !!values.requirements &&
      !!values.requirements.general &&
      Array.isArray(values.requirements.specific) &&
      values.requirements.specific.length > 0 &&
      values.requirements.specific.every((req) => !!req.label) &&
      !(
        errors.requirements &&
        isRequirementsError(errors.requirements) &&
        errors.requirements.general
      ) &&
      !(
        errors.requirements &&
        isRequirementsError(errors.requirements) &&
        Array.isArray(errors.requirements.specific) &&
        errors.requirements.specific.some(
          (e: unknown) =>
            typeof e === "object" &&
            e !== null &&
            "label" in e &&
            (e as { label?: unknown }).label
        )
      ),
    gallery:
      Array.isArray(values.gallery) &&
      values.gallery.length > 0 &&
      !errors.gallery,
  };
}

export const CreateCatalogue: React.FC<CreateCatalogueProps> = ({
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Formik<CatalogueFormValues>
      initialValues={initialValues}
      validationSchema={catalogueSchema}
      validateOnMount
      onSubmit={(values) => {
        alert("Catalogue published!\n" + JSON.stringify(values, null, 2));
      }}
    >
      {({ values, errors, isValid, isSubmitting }) => {
        const completion = getStepCompletion(values, errors);
        const completedCount = Object.values(completion).filter(Boolean).length;
        const totalCount = Object.keys(completion).length;
        const percent = Math.round((completedCount / totalCount) * 100);

        const handleSaveDraft = () => {
          alert("Draft saved!");
        };

        return (
          <Form className='max-w-6xl mx-auto p-6 bg-white min-h-screen relative'>
            {/* Back Arrow */}
            {onClose && (
              <button
                className='absolute top-6 right-6 text-gray-500 hover:text-gray-800 text-2xl'
                onClick={onClose}
                aria-label='Back'
              >
                &#8592;
              </button>
            )}
            <header className='mb-8'>
              <h1 className='text-2xl font-bold text-gray-900'>
                Create Your Catalogue
              </h1>
              <p className='text-sm text-gray-500'>
                Complete each section to publish your service offering.
              </p>
            </header>

            {/* Navigation Tabs */}
            <nav className='flex border-b border-gray-200 mb-8 overflow-x-auto'>
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    index === currentStep
                      ? "border-red-500 text-red-500"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {step.label}
                  {completion[step.id as keyof typeof completion] !==
                    undefined && (
                    <span
                      className={`ml-2 text-xs ${
                        completion[step.id as keyof typeof completion]
                          ? "text-green-500"
                          : "text-gray-300"
                      }`}
                    >
                      ●
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <main className='min-h-[500px]'>
              {currentStep === 0 && <BasicInfo />}
              {currentStep === 1 && <PricingTable />}
              {currentStep === 2 && <DescriptionFAQ />}
              {currentStep === 3 && <Requirements />}
              {currentStep === 4 && <Gallery />}
              {currentStep === 5 && (
                <PublishStatus
                  percent={percent}
                  completion={completion}
                  onSaveDraft={handleSaveDraft}
                />
              )}
            </main>

            <footer className='mt-12 flex justify-between items-center pt-6'>
              <button
                type='button'
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className='px-6 py-2 border rounded-lg text-sm font-medium disabled:opacity-30'
              >
                ← Previous
              </button>
              {currentStep === 5 ? (
                <div className='flex gap-4'>
                  <button
                    type='button'
                    onClick={handleSaveDraft}
                    className='px-8 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100'
                  >
                    Save as Draft
                  </button>
                  <button
                    type='submit'
                    disabled={
                      !isValid ||
                      !Object.values(completion).every(Boolean) ||
                      isSubmitting
                    }
                    className='px-8 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50'
                  >
                    {isSubmitting ? "Publishing..." : "Publish"}
                  </button>
                </div>
              ) : (
                <button
                  type='button'
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className='px-8 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600'
                >
                  Next →
                </button>
              )}
            </footer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateCatalogue;
