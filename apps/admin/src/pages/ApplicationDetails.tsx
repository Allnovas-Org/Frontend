import { useState } from "react";
type ApplicationDetailsProps = {
  application: {
    id: number;
    name: string;
    role: string;
    company: string;
    applied: string;
    status: string;
    assigned: string;
    type: string;
  };
  notes: string[];
  onAddNote: (note: string) => void;
  isClaimed: boolean;
  onClaim: () => void;
  onReject: () => void;
  onMoveToReview: () => void;
  onClose: () => void;
};

export default function ApplicationDetails({
  application,
  notes,
  onAddNote,
  isClaimed,
  onClaim,
  onReject,
  onMoveToReview,
  onClose,
}: ApplicationDetailsProps) {
  const [note, setNote] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  

  return (
    <div className="fixed inset-0 z-50">
      {/* Darkened background */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Right-side panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-[500px] overflow-y-auto bg-white p-6 shadow-xl">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {application.name}
            </h2>
           <p className="mt-1 text-sm text-gray-500">
  {application.role} · {application.company}
</p>
          </div>
          <div className="mt-6">
  {isClaimed ? (
    <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-4">
      <div>
        <p className="text-sm font-semibold text-green-800">
          Claimed by You
        </p>
        <p className="text-xs text-green-600">
          You are responsible for reviewing this application.
        </p>
      </div>
      <span className="rounded-full bg-green-700 px-3 py-1 text-xs text-white">
        ✓ Claimed
      </span>
    </div>
  ) : (
    <div className="flex items-center justify-between rounded-lg border border-orange-300 bg-orange-50 p-4">
      <p className="text-sm text-orange-600">
        ⚠ This application is unclaimed
      </p>
      <button
        type="button"
        onClick={onClaim}
        className="text-sm font-semibold text-purple-700 underline"
      >
        Claim it
      </button>
    </div>
  )}
</div>

<div className="mt-6">
  <p className="mb-4 text-sm font-medium text-gray-500">
    Application stage
  </p>

  <div className="relative grid grid-cols-4 gap-2">
  <div className="absolute left-[12.5%] right-[12.5%] top-[18px] h-[2px] bg-gray-200" />
  <div
  className="absolute left-[12.5%] top-[18px] h-[2px] bg-purple-700"
  style={{
    width: `${
      Math.max(
        0,
        ["Applied", "Review", "Interview", "Offer"].findIndex(
          (stage) =>
            stage.toLowerCase() === application.status.toLowerCase()
        )
      ) * 25
    }%`,
  }}
/>
    {["Applied", "Review", "Interview", "Offer"].map(
      (stage, index) => {
        const stages = ["Applied", "Review", "Interview", "Offer"];
        const currentStage = stages.findIndex(
          (item) =>
            item.toLowerCase() === application.status.toLowerCase()
        );

        const isCompleted =
  currentStage >= 0 && index < currentStage;

        return (
          <div key={stage} className="relative z-10 text-center">
            <div
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                isCompleted
  ? "border-purple-700 bg-purple-700 text-white"
  : index === currentStage
  ? "border-purple-700 bg-white text-purple-700"
  : "border-gray-200 bg-white text-gray-400"
              }`}
            >
              {isCompleted ? "✓" : index + 1}
            </div>

            <p
  className={`mt-2 text-xs ${
    index === currentStage
      ? "font-medium text-purple-700"
      : "text-gray-500"
  }`}
>
              {stage}
            </p>
          </div>
        );
      }
    )}
  </div>
</div>
<div className="mt-8">
  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
    Applicant Profile
  </h3>

  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-700 text-sm font-semibold text-white">
      {application.name
        .split(" ")
        .map((name) => name[0])
        .slice(0, 2)
        .join("")}
    </div>

    <div>
      <p className="font-semibold text-gray-900">
        {application.name}
      </p>

      <p className="text-sm capitalize text-gray-500">
        {application.type} · {application.status}
      </p>
    </div>
  </div>
</div>
<div className="mt-6 grid grid-cols-2 gap-3">
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
    <p className="text-xs text-gray-500">Email</p>
    <p className="mt-1 break-words text-sm font-medium">
      Not provided
    </p>
  </div>

  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
    <p className="text-xs text-gray-500">Phone</p>
    <p className="mt-1 text-sm font-medium">
      Not provided
    </p>
  </div>

  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
    <p className="text-xs text-gray-500">Portfolio</p>
    <p className="mt-1 text-sm font-medium">
      Not provided
    </p>
  </div>

  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
    <p className="text-xs text-gray-500">Applied</p>
    <p className="mt-1 text-sm font-medium">
      {application.applied}
    </p>
  </div>
</div>
<div className="mt-6 rounded-xl bg-gray-50 p-4">
  <p className="mb-2 text-xs font-medium text-gray-500">
    Bio
  </p>

  <p className="text-sm leading-relaxed text-gray-700">
    No biography provided for this applicant yet.
  </p>
</div>
<div className="mt-6">
  <h3 className="mb-3 text-xs font-medium text-gray-500">
    Skills
  </h3>

  <div className="flex flex-wrap gap-2">
    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700">
      No skills provided yet
    </span>
  </div>
  <div className="mt-8">
  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
    Staff Notes
  </h3>
  <textarea
  value={note}
onChange={(e) => setNote(e.target.value)}
  placeholder="Add a note for your team..."
  rows={3}
  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-700 outline-none focus:border-purple-600"
/>
<button
  type="button"
  onClick={() => {
  if (note.trim() === "") return;
  onAddNote(note.trim());
  setNote("");
}}
  className="mt-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
>
  Add Note
</button>
{notes.map((savedNote, index) => (
  <div
    key={index}
    className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
  >
    <p className="text-sm text-gray-700">
      {savedNote}
    </p>
  </div>
))}
</div>
</div>
 <div className="mt-6 flex items-center gap-2 border-t border-gray-200 pt-4">
  <button
    type="button"
    onClick={onClose}
    className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
  >
    Close
  </button>
<button
  type="button"
  onClick={() => setShowRejectModal(true)}
  className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
>
  ✕ Reject
</button>
<button
onClick={() => onMoveToReview()}
  type="button"
  className="flex-1 rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800"
>
  Move to Review →
</button>
</div>         
          
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-900"
            aria-label="Close application details"
          >
            ×
          </button>
        </div>
      </div>
    {showRejectModal && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
      <div className="mb-4 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl text-purple-700">
          →
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Reject this application?
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          You're about to reject {application.name}'s application.
          Optionally add a reason for your team.
        </p>
      </div>

      <textarea
        value={rejectionReason}
        onChange={(e) => setRejectionReason(e.target.value)}
        placeholder="Reason for rejection (optional)..."
        rows={3}
        className="w-full rounded-lg border border-gray-200 p-3 text-sm"
      />

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setShowRejectModal(false)}
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-gray-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
  onReject();
  setShowRejectModal(false);
}}
          className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Confirm rejection
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
