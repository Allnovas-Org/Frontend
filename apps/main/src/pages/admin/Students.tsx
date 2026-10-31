import React, { useState } from "react";
const students = [
  {
    id: 1,
    name: "Theresa Webb",
    path: "Frontend Development",
    progress: 50,
    status: "Active",
  },
  {
    id: 2,
    name: "Kristin Watson",
    path: "Frontend Development",
    progress: 3.86,
    status: "Active",
  },
  {
    id: 3,
    name: "Savannah Nguyen",
    path: "Frontend Development",
    progress: 50,
    status: "Active",
  },
  {
    id: 4,
    name: "Ralph Edwards",
    path: "Frontend Development",
    progress: 3.86,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Jenny Wilson",
    path: "Frontend Development",
    progress: 3.86,
    status: "Active",
  },
  {
    id: 6,
    name: "Michael Smith",
    path: "Backend Development",
    progress: 4.10,
    status: "Active",
  },
  {
    id: 7,
    name: "Sarah Johnson",
    path: "UI/UX Design",
    progress: 3.75,
    status: "Inactive",
  },
  {
    id: 8,
    name: "David Brown",
    path: "Data Analysis",
    progress: 4.25,
    status: "Active",
  },
  {
    id: 9,
    name: "Emily Davis",
    path: "Product Management",
    progress: 3.95,
    status: "Active",
  },
  {
    id: 10,
    name: "Daniel Garcia",
    path: "DevOps Engineering",
    progress: 4.00,
    status: "Inactive",
  },
  {
    id: 11,
    name: "Sophia Martinez",
    path: "Quality Assurance",
    progress: 3.50,
    status: "Active",
  },
];
const AdminStudents = () => {
  const [selectedStudent, setSelectedStudent] = useState<
    (typeof students)[number] | null
  >(null);
  
const [showMessagePreview, setShowMessagePreview] = useState(false);

const [messageText, setMessageText] = useState("");

const [messageConfirmation, setMessageConfirmation] = useState("");

const [studentList, setStudentList] = useState(students);


  return (
    <div className="w-full">
        
{messageConfirmation && (
  <div className="mb-4 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
    <span>{messageConfirmation}</span>
    <button
      type="button"
      onClick={() => setMessageConfirmation("")}
      className="ml-4 font-bold text-green-700"
    >
      ×
    </button>
  </div>
)}

      <h1 className="text-2xl font-bold text-gray-900">
        Students
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Manage Allnova students and track their learning progress.
      </p>
      {/* Students Table */}
<div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-white">

  <table className="w-full border-collapse text-left">

    <thead className="bg-purple-50">
      <tr>
        <th className="px-4 py-4 text-sm font-semibold">
          Learner
        </th>

        <th className="px-4 py-4 text-sm font-semibold">
          Learning Path
        </th>

        <th className="px-4 py-4 text-sm font-semibold">
          Progress
        </th>

        <th className="px-4 py-4 text-sm font-semibold">
          Status
        </th>

        <th className="px-4 py-4 text-sm font-semibold">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
  
{studentList.map((student, index) => (

  <tr key={index} className="border-t border-gray-200">
    <td className="px-4 py-4">
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
      {student.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)}
    </div>

    <span className="text-sm font-medium text-gray-900">
      {student.name}
    </span>
  </div>
</td>

    <td className="px-4 py-4">
      {student.path}
    </td>

    <td className="px-4 py-4">
  <div className="flex items-center gap-2">
    <div className="h-2.5 w-20 overflow-hidden rounded-full bg-gray-300">
      <div
        className={`h-full rounded-full ${
          student.progress >= 50
            ? "bg-amber-500"
            : "bg-red-400"
        }`}
        style={{ width: `${student.progress}%` }}
      />
    </div>

    <span className="text-sm font-medium text-gray-900">
      {student.progress}%
    </span>
  </div>
</td>

    <td className="px-4 py-4">
  <span
    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
      student.status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-500"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        student.status === "Active"
          ? "bg-green-600"
          : "bg-gray-400"
      }`}
    />

    {student.status}
  </span>
</td>

    <td className="px-4 py-4">
      <button
        type="button"
        onClick={() => setSelectedStudent(student)}
        className="text-sm font-medium text-purple-700"
      >
        View
      </button>
    </td>
  </tr>
))}
</tbody>

  </table>

</div>
{selectedStudent && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Student: {selectedStudent.name}
        </h2>

        <button
          type="button"
          onClick={() => setSelectedStudent(null)}
          className="text-xl text-gray-500 hover:text-gray-900"
        >
          ×
        </button>
      </div>
      <div className="mt-5 space-y-6">

 <div>
  <p className="text-xs text-gray-500">
    Email
  </p>
  <p className="mt-1 text-sm font-medium text-gray-900">
    {selectedStudent.name.toLowerCase().replace(/\s+/g, ".")}@example.com
  </p>
</div>
  <div>
    <p className="text-xs text-gray-500">
      Learning Path
    </p>
    <p className="mt-1 text-sm font-medium text-gray-900">
      {selectedStudent.path}
    </p>
  </div>

  <div>
    <p className="text-xs text-gray-500">
      Progress
    </p>
    <p className="mt-1 text-sm font-medium text-gray-900">
      {selectedStudent.progress}%
    </p>
  </div>

</div>
<div className="mt-4">
  <p className="text-xs text-gray-500">
    Account Status
  </p>

  <span
    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
      selectedStudent.status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-500"
    }`}
  >
    ● {selectedStudent.status}
  </span>
</div>

<div className="mt-4">
  <p className="text-xs text-gray-500">
    Date Joined
  </p>
  <p className="mt-1 text-sm font-medium text-gray-900">
    April 3, 2026
  </p>
</div>

<div className="mt-5 flex items-center justify-between">
  <button
    type="button"
    

onClick={() => setShowMessagePreview(true)}


    className="rounded-md bg-purple-700 px-6 py-2 text-sm font-medium text-white hover:bg-purple-800"
  >
    Message
  </button>
  
<button
  type="button"
  
onClick={() => {
  const newStatus =
    selectedStudent.status === "Active" ? "Inactive" : "Active";

  setStudentList((previousList) =>
    previousList.map((student) =>
      student.id === selectedStudent.id
        ? { ...student, status: newStatus }
        : student
    )
  );

  setSelectedStudent({
    ...selectedStudent,
    status: newStatus,
  });
}}

  className="rounded-md bg-gray-200 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
>
  
{selectedStudent.status === "Active"
  ? "Deactivate Account"
  : "Activate Account"}

</button>

</div>

    </div>
  </div>
)}
   
    
{showMessagePreview && selectedStudent && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Message {selectedStudent.name}
        </h2>
        <button
          type="button"
          onClick={() => setShowMessagePreview(false)}
          className="text-xl text-gray-500"
        >
          ×
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Compose a message to this student.
      </p>
      
<textarea

value={messageText}
onChange={(e) => setMessageText(e.target.value)}

placeholder="Type your message here..."
  rows={4}
  className="mt-4 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-purple-600"
/>

<button
  type="button"
  
onClick={() => {
 
setMessageConfirmation(`Message preview completed for ${selectedStudent.name}. No message was sent.`);

  setMessageText("");
  setShowMessagePreview(false);
}}

  disabled={!messageText.trim()}
  className="mt-4 rounded-lg bg-purple-700 px-6 py-3 text-sm font-medium text-white hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-50"
>
  Send Message
</button>


    </div>
  </div>
)}
 </div>
  );
};

export default AdminStudents;