import React, { useState } from "react";
import { Project } from "../../../types";
import { PencilLine, Undo2, CircleX, CircleCheck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { removeProject } from "../store/project.store";
import ActionConfirmModal from "../modal/ActionConfirmModal";
import ActionResultModal from "../modal/ActionResultModal";

export const ProjectSidebar = ({ project }: { project: Project }) => {
  const { client } = project;
  const navigate = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditReadyModal, setShowEditReadyModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleReuse = () => {
    // Route to PostJob and pass project data for autofill
    navigate("/applicants/projects/post-job", {
      state: { reuseProject: project },
    });
  };

  const handleRemove = () => {
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    setShowRemoveModal(false);
    removeProject(project.id);
    navigate("/applicants/projects");
  };

  const cancelRemove = () => {
    setShowRemoveModal(false);
  };

  const confirmEdit = () => {
    setShowEditModal(false);
    setShowEditReadyModal(true);
  };

  return (
    <aside className='space-y-6'>
      <div className='flex flex-col gap-3 text-sm'>
        <button
          className='flex items-center gap-2 rounded px-3 py-2 text-left text-primary hover:bg-primary/10 transition'
          onClick={handleEdit}
        >
          <PencilLine size={16} /> Edit job posting
        </button>
        <button
          className='flex items-center gap-2 rounded px-3 py-2 text-left text-primary hover:bg-primary/10 transition'
          onClick={handleReuse}
        >
          <Undo2 size={16} /> Reuse job posting
        </button>
        <button
          className='flex items-center gap-2 rounded px-3 py-2 text-left text-primary hover:bg-primary/10 transition'
          onClick={handleRemove}
        >
          <CircleX size={16} /> Remove job posting
        </button>
      </div>

      <ActionConfirmModal
        open={showRemoveModal}
        title='Delete project'
        description='Are you sure you want to delete this project?'
        onCancel={cancelRemove}
        onConfirm={confirmRemove}
      />

      <ActionConfirmModal
        open={showEditModal}
        title='Edit project'
        description='Are you sure you want to edit this project?'
        onCancel={() => setShowEditModal(false)}
        onConfirm={confirmEdit}
      />

      <ActionResultModal
        open={showEditReadyModal}
        title='Selected project is ready for editing.'
        description='You can now update this job posting and save your latest changes.'
        secondaryLabel='Go to job postings'
        primaryLabel='Continue to edit'
        onSecondaryClick={() => navigate("/applicants/projects")}
        onPrimaryClick={() =>
          navigate(`/applicants/projects/edit-job/${project.id}`)
        }
      />

      <div>
        <h4 className='flex items-center gap-2 font-semibold'>
          About the client
        </h4>

        <ul className='mt-3 space-y-2 text-sm text-gray-600'>
          {client.paymentVerified && (
            <li className='flex items-center gap-2'>
              <CircleCheck size={16} className='text-green-600 mr-1' />
              <p>Payment method verified</p>
            </li>
          )}
          {client.phoneVerified && (
            <li className='flex gap-2'>
              <CircleCheck size={16} className='text-green-600' />
              <p>Phone number verified</p>
            </li>
          )}
          <li className='flex flex-col gap-2 mb-4'>
            ⭐⭐⭐⭐⭐ {client.rating}
            <p className='text-xs text-gray-dark/70'>
              {client.reviews} of 10 reviews
            </p>
          </li>
          <li className='flex flex-col gap-2 mb-4'>
            <p className='text-sm'>{client.country}</p>
            <p className='text-xs text-gray-dark/70'>
              {client.city} {client.localTime}
            </p>
          </li>
          <li className='flex flex-col gap-2 mb-4'>
            <p className='text-sm'>{client.jobsPosted} jobs posted</p>
            <p className='text-xs text-gray-dark/70'>
              100% hire rate. 1 open job
            </p>
          </li>
          <li className='flex flex-col gap-2'>
            <p className='text-sm'>{client.hireRate} total spent</p>
            <p className='text-xs text-gray-dark/70'>Payment Verified</p>
          </li>
        </ul>
      </div>
    </aside>
  );
};
