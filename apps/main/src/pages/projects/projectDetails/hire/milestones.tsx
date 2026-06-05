import React, { useState } from "react";
import { Milestone, OfferSummary } from "../../../../types";

interface Props {
  offer: OfferSummary;
  onChangeType: () => void;
  onSubmit: (offer: OfferSummary) => void;
}

const MilestoneOffer = ({ offer, onChangeType, onSubmit }: Props) => {
  const defaultMessage =
    "Looking forward to working with you! Please feel free to reach out if you have any questions.";
  const [milestones, setMilestones] = useState<Milestone[]>(
    offer.milestones.length > 0
      ? offer.milestones
      : [
          {
            id: "milestone-1",
            title: "",
            amount: 0,
            duration: "",
            description: "",
          },
        ],
  );
  const [message, setMessage] = useState(offer.message || defaultMessage);

  const update = (
    id: string,
    field: keyof (typeof milestones)[0],
    value: string | number,
  ) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  };

  const total = milestones.reduce((s, m) => s + m.amount, 0);

  const addMilestone = () => {
    setMilestones((prev) => [
      ...prev,
      {
        id: `milestone-${prev.length + 1}`,
        title: "",
        amount: 0,
        duration: "",
        description: "",
      },
    ]);
  };

  const removeMilestone = (id: string) => {
    if (milestones.length > 1) {
      setMilestones((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className='mx-auto max-w-2xl space-y-6'>
      {/* Global Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold mb-2'>
          Hire for Landing Page Design
        </h1>
        <p className='text-gray-500'>
          Complete the hiring process in 2 simple steps
        </p>
      </div>
      <div className=' rounded-xl border border-input p-6'>
        <div className='mb-6'>
          <p className='text-sm text-gray-500 mb-2'>Step 1 of 2</p>
          <div className='flex justify-between'>
            <h2 className='font-semibold'>Create milestone offer</h2>
            <button
              onClick={onChangeType}
              className='text-sm text-white bg-primary border border-primary px-3 py-2 rounded-md'
            >
              Change type
            </button>
          </div>
        </div>

        <div className='space-y-4'>
          {milestones.map((m, index) => (
            <div
              key={m.id}
              className='rounded-lg border border-input p-4 space-y-2'
            >
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium'>Milestones {index + 1}</p>
                {milestones.length > 1 && (
                  <button
                    type='button'
                    onClick={() => removeMilestone(m.id)}
                    className='text-xs text-red-500 hover:underline'
                  >
                    Remove
                  </button>
                )}
              </div>
              <label className='text-sm text-gray-500'>Milestone Title</label>
              <input
                className='input border border-input px-3 py-2 w-full rounded-md'
                placeholder='Milestone Title'
                value={m.title}
                onChange={(e) => update(m.id, "title", e.target.value)}
              />
              <div className='flex items-center w-full gap-3'>
                <div>
                  <label className='text-sm text-gray-500'>Amount ($)</label>
                  <input
                    type='number'
                    className='input border border-input px-3 py-2 w-full rounded-md'
                    placeholder='Amount ($)'
                    value={m.amount}
                    onChange={(e) =>
                      update(m.id, "amount", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className='text-sm text-gray-500'>Due Date</label>
                  <input
                    className='input border border-input px-3 py-2 w-full rounded-md'
                    type='date'
                    value={m.duration}
                    onChange={(e) => update(m.id, "duration", e.target.value)}
                  />
                </div>
              </div>
              <label className='text-sm text-gray-500'>Description</label>
              <textarea
                className='input border border-input px-3 py-2 w-full h-24 rounded-md'
                placeholder='Description'
                value={m.description || ""}
                onChange={(e) => update(m.id, "description", e.target.value)}
              />
            </div>
          ))}

          <button
            type='button'
            onClick={addMilestone}
            className='text-sm text-primary'
          >
            + Add milestone
          </button>

          <div className='space-y-2'>
            <label className='text-sm text-gray-500'>Message to Designer</label>
            <textarea
              className='input border border-input px-3 py-2 w-full h-24 rounded-md'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <p className='font-medium'>Total = ${total}</p>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            onClick={onChangeType}
            className='rounded-lg border border-primary px-4 py-2 text-sm text-primary'
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSubmit({
                ...offer,
                type: "milestone",
                milestones,
                message,
                budget: total,
              })
            }
            className='bg-primary text-white px-4 py-2 rounded-lg text-sm'
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilestoneOffer;
