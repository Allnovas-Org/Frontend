import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
Pie,
Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample revenue data for the dashboard
const revenueData = [
  { month: "Jan", revenue: 12000, expenses: 18000 },
  { month: "Feb", revenue: 8000, expenses: 12000 },
  { month: "Mar", revenue: 28000, expenses: 35000 },
  { month: "Apr", revenue: 45000, expenses: 30000 },
  { month: "May", revenue: 32000, expenses: 15000 },
  { month: "Jun", revenue: 18000, expenses: 22000 },
  { month: "Jul", revenue: 25000, expenses: 30000 },
  { month: "Aug", revenue: 20000, expenses: 18000 },
  { month: "Sep", revenue: 15000, expenses: 12000 },
  { month: "Oct", revenue: 27000, expenses: 25000 },
  { month: "Nov", revenue: 38000, expenses: 35000 },
  { month: "Dec", revenue: 30000, expenses: 42000 },
];

// Sample profit data for the dashboard
const profitData = [
  { month: "Jan", profit: 25000 },
  { month: "Feb", profit: 22000 },
  { month: "Mar", profit: 15000 },
  { month: "Apr", profit: 35000 },
  { month: "May", profit: 42000 },
  { month: "Jun", profit: 28000 },
];
// Sample learning path distribution data
const learningPathData = [
  { name: "Frontend", value: 148, color: "#9333EA" },
  { name: "Marketing", value: 67, color: "#FCA5A5" },
  { name: "Finance", value: 60, color: "#C026D3" },
  { name: "Human Resources", value: 36, color: "#BFDBFE" },
  { name: "Digital Marketing", value: 21, color: "#F97316" },
  { name: "Design", value: 12, color: "#F0ABFC" },
  { name: "Others", value: 5, color: "#FED7AA" },
];

const AdminDashboard = () => {
  return (
    <div className="w-full">

      {/* Welcome Section */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        {/* Welcome Text */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, Admin
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Here's what's happening on Allnova today.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">

          <button
            type="button"
            className="rounded-lg bg-purple-700 px-5 py-3 text-sm font-medium text-white hover:bg-purple-800"
          >
            + Add Freelancer
          </button>

          <button
            type="button"
            className="rounded-lg border border-purple-700 bg-white px-5 py-3 text-sm font-medium text-purple-700 hover:bg-purple-50"
          >
            + Post Project
          </button>

        </div>

      </div>

      {/* Dashboard Statistics */}

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

  {/* Total Learners */}
  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

    <div className="flex items-start justify-between">

      <div>
        <p className="text-sm text-gray-500">
          Total Learners
        </p>

        <h2 className="mt-3 text-3xl font-bold text-gray-900">
          12,450
        </h2>
      </div>

      <div className="rounded-xl bg-purple-100 p-4 text-2xl">
        👥
      </div>

    </div>

    <p className="mt-5 text-sm text-gray-500">
      <span className="font-semibold text-green-500">
        ↗ 1.3%
      </span>
      {" "}Up from past week
    </p>

  </div>

  {/* Active Courses */}
  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

    <div className="flex items-start justify-between">

      <div>
        <p className="text-sm text-gray-500">
          Active Courses
        </p>

        <h2 className="mt-3 text-3xl font-bold text-gray-900">
          48
        </h2>
      </div>

      <div className="rounded-xl bg-pink-100 p-4 text-2xl">
        🎓
      </div>

    </div>

    <p className="mt-5 text-sm text-gray-500">
      <span className="font-semibold text-green-500">
        ↗ 1.3%
      </span>
      {" "}Up from past week
    </p>

  </div>

  {/* Internship Applications */}
  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

    <div className="flex items-start justify-between">

      <div>
        <p className="text-sm text-gray-500">
          Internship Applications
        </p>

        <h2 className="mt-3 text-3xl font-bold text-gray-900">
          1,240
        </h2>
      </div>

      <div className="rounded-xl bg-green-100 p-4 text-2xl">
        💼
      </div>

    </div>

    <p className="mt-5 text-sm text-gray-500">
      <span className="font-semibold text-green-500">
        ↗ 1.8%
      </span>
      {" "}Up from yesterday
    </p>

  </div>

</div>

{/* Revenue and Profit Charts */}

<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

  {/* Total Revenue */}
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900">
        Total Revenue
      </h2>

      <div className="flex gap-3 text-sm text-gray-500">
        <button className="rounded border px-3 py-1">Day</button>
        <button>Week</button>
        <button>Month</button>
      </div>
    </div>

   <div className="mt-8 h-64 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={revenueData}
      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        vertical={true}
        horizontal={false}
        stroke="#E5E7EB"
      />

      <XAxis
        dataKey="month"
        tick={{ fontSize: 12, fill: "#9CA3AF" }}
        axisLine={false}
        tickLine={false}
      />

      <YAxis hide />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#6488FF"
        strokeWidth={2}
        dot={false}
        activeDot={{ r: 6 }}
      />

      <Line
        type="monotone"
        dataKey="expenses"
        stroke="#6EE7B7"
        strokeWidth={2}
        dot={false}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

  </div>

  {/* Total Profit */}
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

    <h2 className="text-lg font-semibold text-gray-900">
      Total Profit
    </h2>

   <div className="mt-8 h-64 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={profitData}
      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="#A78BFA"
            stopOpacity={0.25}
          />
          <stop
            offset="100%"
            stopColor="#A78BFA"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>

      <CartesianGrid
        strokeDasharray="3 3"
        vertical={true}
        horizontal={false}
        stroke="#E5E7EB"
      />

      <XAxis
        dataKey="month"
        tick={{ fontSize: 12, fill: "#9CA3AF" }}
        axisLine={false}
        tickLine={false}
      />

      <YAxis hide />

      <Tooltip />

      <Area
        type="monotone"
        dataKey="profit"
        stroke="#A78BFA"
        strokeWidth={2}
        strokeDasharray="4 3"
        fill="url(#profitGradient)"
        activeDot={{ r: 6 }}
      />
    </AreaChart>
  </ResponsiveContainer>
</div>

  </div>

</div>

{/* Learning Path Distribution */}
<div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

  <h2 className="text-lg font-semibold text-gray-900">
    Learning Path Distribution
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Student enrollment by path
  </p>

  <div className="mt-6 flex flex-col items-center gap-8 lg:flex-row">

    {/* Circular Chart */}
    <div className="h-80 w-full lg:w-1/2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={learningPathData}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={130}
            paddingAngle={0}
            dataKey="value"
          >
            {learningPathData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Chart Legend */}
    <div className="w-full lg:w-1/2">
      <h3 className="mb-4 font-semibold text-gray-900">
        Job Titles
      </h3>

      {learningPathData.map((item, index) => (
        <div
          key={index}
          className="mb-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            <span className="text-sm text-gray-600">
              {item.name}
            </span>
          </div>

          <span className="text-sm text-gray-500">
            {(
              (item.value /
                learningPathData.reduce(
                  (total, path) => total + path.value,
                  0
                )) *
              100
            ).toFixed(2)}
            %
          </span>
        </div>
      ))}
    </div>

  </div>
</div>
{/* Recent Learners Section */}
<div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

  <div className="mb-5 flex items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Recent Learners
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Latest students enrolled on Allnova
      </p>
    </div>

    <button className="text-sm font-medium text-purple-700">
      View All
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">

      <thead className="bg-purple-50 text-gray-700">
        <tr>
          <th className="px-4 py-4">Learner</th>
          <th className="px-4 py-4">Learning Path</th>
          <th className="px-4 py-4">Progress</th>
          <th className="px-4 py-4">Status</th>
          <th className="px-4 py-4">Action</th>
        </tr>
      </thead>

      <tbody>
        {[
          { name: "Theresa Webb", progress: 50, status: "Active" },
          { name: "Kristin Watson", progress: 3.86, status: "Active" },
          { name: "Savannah Nguyen", progress: 50, status: "Active" },
          { name: "Ralph Edwards", progress: 3.86, status: "Inactive" },
          { name: "Jenny Wilson", progress: 75, status: "Active" },
        ].map((learner, index) => (
          <tr key={index} className="border-b border-gray-100">

            <td className="px-4 py-4 font-medium text-gray-900">
              {learner.name}
            </td>

            <td className="px-4 py-4 text-gray-600">
              Frontend Development
            </td>

            <td className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-orange-400"
                    style={{ width: `${learner.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  {learner.progress}%
                </span>
              </div>
            </td>

            <td className="px-4 py-4">
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  learner.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {learner.status}
              </span>
            </td>

            <td className="px-4 py-4">
              <button className="font-medium text-purple-700 hover:underline">
                View
              </button>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>

{/* Recruiters & Companies Section */}
<div className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="mb-6 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-semibold text-gray-900">
        Recruiters & Companies
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Manage platform hiring partners
      </p>
    </div>

    <button className="text-sm font-medium text-purple-600 hover:underline">
      View All
    </button>
  </div>
{/* Recruiters & Companies Table */}
<div className="overflow-x-auto">
  <table className="w-full border-collapse text-left">
    <thead className="bg-purple-50">
      <tr>
        <th className="px-4 py-4 text-sm font-semibold">
          Company
        </th>
        <th className="px-4 py-4 text-sm font-semibold">
          Recruiters
        </th>
        <th className="px-4 py-4 text-sm font-semibold">
          Opportunities
        </th>
        <th className="px-4 py-4 text-sm font-semibold">
          Performance
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
  <tr className="border-b border-gray-100">
    <td className="px-4 py-4">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
      TN
    </div>

    <div>
      <p className="text-sm font-medium text-gray-900">
        TechNova Solutions
      </p>
      <p className="text-xs text-gray-500">
        Technology Company
      </p>
    </div>
  </div>
</td>

    <td className="px-4 py-4 text-sm text-gray-600">
      5 Recruiters
    </td>

    <td className="px-4 py-4 text-sm text-gray-600">
      12 Roles
    </td>

    <td className="px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="h-2 w-24 rounded-full bg-gray-200">
          <div className="h-2 w-full rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm text-green-600">100%</span>
      </div>
    </td>

    <td className="px-4 py-4">
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
        Verified
      </span>
    </td>

    <td className="px-4 py-4">
      <button className="text-sm font-medium text-purple-600 hover:underline">
        View
      </button>
    </td>
  </tr>
  {/* Second Company */}
<tr className="border-b border-gray-100">
 <td className="px-4 py-4">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">
      CH
    </div>

    <div>
      <p className="text-sm font-medium text-gray-900">
        CreativeHub Agency
      </p>
      <p className="text-xs text-gray-500">
        Creative & Design Agency
      </p>
    </div>
  </div>
</td>

  <td className="px-4 py-4 text-sm text-gray-600">
    3 Recruiters
  </td>

  <td className="px-4 py-4 text-sm text-gray-600">
    10 Roles
  </td>

  <td className="px-4 py-4">
    <div className="flex items-center gap-3">
      <div className="h-2 w-24 rounded-full bg-gray-200">
        <div className="h-2 w-[85%] rounded-full bg-yellow-500"></div>
      </div>
      <span className="text-sm text-yellow-600">85%</span>
    </div>
  </td>

  <td className="px-4 py-4">
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
      Pending
    </span>
  </td>

  <td className="px-4 py-4">
    <button className="text-sm font-medium text-purple-600 hover:underline">
      View
    </button>
  </td>
</tr>

{/* Third Company */}
<tr className="border-b border-gray-100">
 <td className="px-4 py-4">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
      DW
    </div>

    <div>
      <p className="text-sm font-medium text-gray-900">
        DigitalWorks Ltd
      </p>
      <p className="text-xs text-gray-500">
        Digital Solutions Company
      </p>
    </div>
  </div>
</td>

  <td className="px-4 py-4 text-sm text-gray-600">
    4 Recruiters
  </td>

  <td className="px-4 py-4 text-sm text-gray-600">
    15 Roles
  </td>

  <td className="px-4 py-4">
    <div className="flex items-center gap-3">
      <div className="h-2 w-24 rounded-full bg-gray-200">
        <div className="h-2 w-[90%] rounded-full bg-green-500"></div>
      </div>
      <span className="text-sm text-green-600">90%</span>
    </div>
  </td>

  <td className="px-4 py-4">
    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
      Active
    </span>
  </td>

  <td className="px-4 py-4">
    <button className="text-sm font-medium text-purple-600 hover:underline">
      View
    </button>
  </td>
</tr>
</tbody>
  </table>
</div>

</div>
    </div>
  );
};

export default AdminDashboard;