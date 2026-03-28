// OfferForm.tsx
import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { OfferSummary } from "../../../../types";

type Props = {
  initialValues: OfferSummary;
  onSubmit: (values: OfferSummary) => void;
};

export const OfferForm = ({ initialValues, onSubmit }: Props) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form className='space-y-6 max-w-3xl'>
          <Field name='projectTitle' placeholder='Project title' />
          <Field name='freelancerName' placeholder='Freelancer name' />
          <Field name='duration' placeholder='Duration' />
          <Field name='budget' type='number' placeholder='Budget' />

          {values.type === "milestone" && (
            <FieldArray name='milestones'>
              {({ push, remove }) => (
                <div className='space-y-4'>
                  {values.milestones.map((_, index) => (
                    <div
                      key={values.milestones[index].id}
                      className='border p-4'
                    >
                      <Field
                        name={`milestones.${index}.title`}
                        placeholder='Milestone title'
                      />
                      <Field
                        name={`milestones.${index}.amount`}
                        type='number'
                        placeholder='Amount'
                      />
                      <Field
                        name={`milestones.${index}.duration`}
                        placeholder='Duration'
                      />
                      <button type='button' onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type='button'
                    onClick={() =>
                      push({
                        id: String(Date.now()),
                        title: "",
                        amount: 0,
                        duration: "",
                      })
                    }
                  >
                    Add milestone
                  </button>
                </div>
              )}
            </FieldArray>
          )}

          <button type='submit'>Continue</button>
        </Form>
      )}
    </Formik>
  );
};
