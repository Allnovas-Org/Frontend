import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { OfferSummary } from "../../../../types";

interface Props {
  offer: OfferSummary;
  onChangeType: () => void;
  onSubmit: (offer: OfferSummary) => void;
}

const FixedPriceOffer = ({ offer, onChangeType, onSubmit }: Props) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      budget: offer.budget || "",
      deadline: offer.duration || "",
      deliverables: offer.deliverables || "",
      message: offer.message || "",
    },
    validationSchema: Yup.object({
      budget: Yup.number()
        .typeError("Budget must be a number")
        .positive("Budget must be greater than 0")
        .required("Project budget is required"),
      deadline: Yup.string().required("Delivery deadline is required"),
      deliverables: Yup.string()
        .min(10, "Provide more details")
        .required("Project deliverables are required"),
      message: Yup.string().optional(),
    }),
    onSubmit: (values) => {
      onSubmit({
        ...offer,
        type: "fixed",
        budget: Number(values.budget),
        duration: values.deadline,
        deliverables: values.deliverables,
        message: values.message,
        milestones: [],
      });
    },
  });

  return (
    <div className='mx-auto max-w-2xl space-y-6'>
      {/* Global Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold mb-2'>
          Hire for Landing Page Design
        </h1>
        <p className='text-gray-dark'>
          Complete the hiring process in 2 simple steps
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className='mx-auto max-w-2xl rounded-xl border border-input p-6 bg-white'
      >
        {/* Header */}
        <div className='mb-6 '>
          <p className='text-sm text-gray-dark mb-2'>Step 1 of 2</p>
          <div className='flex items-center justify-between '>
            <h2 className='font-semibold text-lg'>Create your offer</h2>
            <button
              type='button'
              onClick={onChangeType}
              className='text-sm text-white bg-primary border border-primary px-3 py-2 rounded-md'
            >
              Change type
            </button>
          </div>
        </div>
        <div className='flex items-center w-full gap-3'>
          {/* Project Budget */}
          <div className='mb-4 flex flex-col w-full'>
            <label className='text-sm text-gray-500'>Project Budget</label>
            <input
              type='number'
              name='budget'
              className='rounded-md input mt-1 py-2 px-3 border focus:outline-none border-input'
              placeholder='$1000'
              value={formik.values.budget}
              onChange={formik.handleChange}
            />
            {formik.touched.budget && formik.errors.budget && (
              <p className='text-xs text-primary mt-1'>
                {formik.errors.budget}
              </p>
            )}
          </div>

          {/* Delivery Deadline */}
          <div className='mb-4 flex flex-col w-full'>
            <label className='text-sm text-gray-dark'>Delivery Deadline</label>
            <input
              type='date'
              name='deadline'
              className='rounded-md input mt-1 py-2 px-3 border focus:outline-none border-input'
              value={formik.values.deadline}
              onChange={formik.handleChange}
            />
            {formik.touched.deadline && formik.errors.deadline && (
              <p className='text-xs text-primary mt-1'>
                {formik.errors.deadline}
              </p>
            )}
          </div>
        </div>

        {/* Project Deliverables */}
        <div className='mb-4 flex flex-col w-full'>
          <label className='text-sm text-gray-dark'>Project Deliverables</label>
          <textarea
            name='deliverables'
            className='w-full rounded-md input px-3 border border-input mt-1 h-24'
            placeholder='Describe what will be delivered'
            value={formik.values.deliverables}
            onChange={formik.handleChange}
          />
          {formik.touched.deliverables && formik.errors.deliverables && (
            <p className='text-xs text-primary mt-1'>
              {formik.errors.deliverables}
            </p>
          )}
        </div>

        {/* Message to Designer */}
        <div className='mb-6 flex flex-col w-full'>
          <label className='text-sm text-gray-dark'>Message to Designer</label>
          <textarea
            name='message'
            className='w-full rounded-md input px-3 border border-input mt-1 h-24'
            placeholder='Looking forward to working with you'
            value={formik.values.message}
            onChange={formik.handleChange}
          />
        </div>

        {/* Actions */}
        <div className='flex justify-end gap-3'>
          <button
            type='button'
            onClick={onChangeType}
            className='rounded-md border border-primary px-4 py-2 text-sm text-primary'
          >
            Cancel
          </button>

          <button
            type='submit'
            className='rounded-md bg-primary px-4 py-2 text-sm text-white'
          >
            Proceed to payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default FixedPriceOffer;
