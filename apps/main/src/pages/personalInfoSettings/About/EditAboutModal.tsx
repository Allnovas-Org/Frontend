import React from "react";
import EditModal from "../modals/EditsModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { aboutMeSchema } from "./validation";

type AboutMeFormData = { bio: string };

export const EditAboutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  initialBio?: string;
  onSave?: (values: AboutMeFormData) => void;
}> = ({ isOpen, onClose, initialBio, onSave }) => {
  const CHARACTER_LIMIT = 1000;

  return (
    <Formik
      initialValues={{
        bio: initialBio || "",
      }}
      validationSchema={aboutMeSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        if (onSave) onSave(values);
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <EditModal
          isOpen={isOpen}
          onClose={onClose}
          title='Edit About Me'
          subtitle='Tell clients who you are, what you do, and why they should hire you.'
          onSave={() =>
            document
              .getElementById("aboutMeForm")
              ?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              )
          }
        >
          <Form id='aboutMeForm' className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700'>
                About Me
              </label>
              <div className='rounded-xl border border-gray-200 p-4 focus-within:ring-2 focus-within:ring-purple-500'>
                <Field
                  as='textarea'
                  name='bio'
                  className='h-48 w-full resize-none border-none text-sm text-gray-600 outline-none'
                  maxLength={CHARACTER_LIMIT}
                />
                <ErrorMessage
                  name='bio'
                  component='div'
                  className='text-xs text-red-500 mt-1'
                />
                <div className='mt-2 flex justify-between text-[10px] text-gray-400'>
                  <span>
                    {values.bio.length}/{CHARACTER_LIMIT} Character
                  </span>
                  <span>{CHARACTER_LIMIT - values.bio.length} Remaining</span>
                </div>
              </div>
            </div>

          </Form>
        </EditModal>
      )}
    </Formik>
  );
};
