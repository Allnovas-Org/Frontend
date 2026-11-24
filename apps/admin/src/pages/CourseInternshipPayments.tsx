import { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
const paymentCards = [
  { title: "Total Internship Payments", amount: "₦12.4M" },
  { title: "Pending Payouts", amount: "₦12.4M" },
  { title: "Paid This Month", amount: "₦12.4M" },
  { title: "Total Internship Payments", amount: "₦12.4M" },
 ]; 
const revenueBreakdownData = [
  { name: "Freelancing", value: 58, color: "#6855F5" },
  { name: "Internship", value: 27, color: "#047857" },
  { name: "Courses", value: 15, color: "#52525B" },
];


const monthlyPaymentData = [
  { month: "JAN", revenue: 45, payouts: 20, transactions: 30 },
  { month: "FEB", revenue: 68, payouts: 25, transactions: 22 },
  { month: "MAR", revenue: 62, payouts: 38, transactions: 45 },
  { month: "APR", revenue: 85, payouts: 75, transactions: 15 },
  { month: "MAY", revenue: 50, payouts: 90, transactions: 40 },
  { month: "JUN", revenue: 100, payouts: 42, transactions: 65 },
];


const recentTransactions = [
  {
    user: "Wade Warren",
    role: "UI/UX Designer",
    paymentId: "#ALN-9284",
    company: "TechNova Ltd",
    position: "Backend Dev",
    amount: "₦450,000",
    status: "Pending",
    email: "wade@example.com",
    learningPath: "Software Development",
    hrContact: "Sarah Johnson",
    schedule: "Monthly",
    period: "October 2026",
    baseStipend: "₦450,000",
    bonus: "₦0",
    tax: "₦0",
    platformFee: "₦0",
    bankReference: "TEST-ALN-2026-001",
    date: "October 15, 2026",
    method: "Bank Transfer",
  },
  {
    user: "Emma Thompson",
    role: "Product Manager",
    paymentId: "#RHT-1230",
    company: "GlobalTech Solutions",
    position: "Frontend Dev",
    amount: "₦600,000",
    status: "Failed",
    email: "emma@example.com",
    learningPath: "Product Management",
    hrContact: "Daniel Brooks",
    schedule: "Monthly",
    period: "October 2026",
    baseStipend: "₦600,000",
    bonus: "₦0",
    tax: "₦0",
    platformFee: "₦0",
    bankReference: "Not available",
    date: "Not available",
    method: "Bank Transfer",
  },
  {
    user: "Liam Johnson",
    role: "Graphic Designer",
    paymentId: "#NRT-4567",
    company: "Creative Minds",
    position: "Design Lead",
    amount: "₦350,000",
    status: "Paid",
    email: "liam@example.com",
    learningPath: "Graphic Design",
    hrContact: "Jessica Adams",
    schedule: "Monthly",
    period: "October 2026",
    baseStipend: "₦350,000",
    bonus: "₦0",
    tax: "₦0",
    platformFee: "₦0",
    bankReference: "TEST-ALN-2026-003",
    date: "October 16, 2026",
    method: "Bank Transfer",
  },
  {
    user: "Olivia Brown",
    role: "Content Strategist",
    paymentId: "#PQT-7890",
    company: "ContentWorks",
    position: "Content Creation",
    amount: "₦400,000",
    status: "Processing",
    email: "olivia@example.com",
    learningPath: "Content Marketing",
    hrContact: "Michael Roberts",
    schedule: "Monthly",
    period: "October 2026",
    baseStipend: "₦400,000",
    bonus: "₦0",
    tax: "₦0",
    platformFee: "₦0",
    bankReference: "Not available",
    date: "Not available",
    method: "Bank Transfer",
  },
  {
    user: "Ethan Martin",
    role: "SEO Specialist",
    paymentId: "#BRT-1122",
    company: "WebGrow Inc.",
    position: "SEO Optimization",
    amount: "₦480,000",
    status: "Pending",
    email: "ethan@example.com",
    learningPath: "Digital Marketing",
    hrContact: "Amanda Wilson",
    schedule: "Monthly",
    period: "October 2026",
    baseStipend: "₦480,000",
    bonus: "₦0",
    tax: "₦0",
    platformFee: "₦0",
    bankReference: "Not available",
    date: "Not available",
    method: "Not available",
  },
  {
    user: "Sophia Lee",
    role: "Data Analyst",
    paymentId: "#DQT-3344",
    company: "DataWise",
    position: "Data Insights",
    amount: "₦520,000",
    status: "Failed",
    email: "sophia@example.com",
    learningPath: "Data Analytics",
    hrContact: "Robert Miller",
    schedule: "Monthly",
    period: "October 2026",
    baseStipend: "₦520,000",
    bonus: "₦0",
    tax: "₦0",
    platformFee: "₦0",
    bankReference: "Not available",
    date: "Not available",
    method: "Bank Transfer",
  },
  {
    user: "Michael Chen",
    role: "Software Engineer",
    paymentId: "#DQT-3345",
    company: "Tech Solutions",
    position: "Application Developer",
    amount: "₦750,000",
    status: "Pending",
    email: "michael@example.com",
    learningPath: "Software Engineering",
    hrContact: "Emily Davis",
    schedule: "Monthly",
    period: "October 2026",
    baseStipend: "₦750,000",
    bonus: "₦0",
    tax: "₦0",
    platformFee: "₦0",
    bankReference: "Not available",
    date: "Not available",
    method: "Not available",
  },
  {
    user: "Aisha Patel",
    role: "Product Manager",
    paymentId: "#DQT-3346",
    company: "Innovate Corp",
    position: "Product Launch",
    amount: "₦620,000",
    status: "Overdue",
    email: "aisha@example.com",
    learningPath: "Product Management",
    hrContact: "James Carter",
    schedule: "Monthly",
    period: "October 2026",
    baseStipend: "₦620,000",
    bonus: "₦0",
    tax: "₦0",
    platformFee: "₦0",
    bankReference: "Not available",
    date: "Not available",
    method: "Not available",
  },
];


export default function CourseInternshipPayments() {
    const [selectedPayment, setSelectedPayment] = useState<
  (typeof recentTransactions)[number] | null
>(null);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Payment Overview
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Platform-wide financial summary for June 2026
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {paymentCards.map((card, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-600">{card.title}</p>

            <h2 className="mt-5 text-2xl font-semibold text-gray-900">
              {card.amount}
            </h2>

            <span className="mt-4 inline-block rounded-full bg-purple-50 px-2 py-1 text-xs text-purple-700">
              Jun 2026
            </span>
          </div>
        ))}
      </div>
<div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">   
{/* Monthly Revenue vs Payouts Chart */}
<div className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
  <h2 className="mb-6 text-sm font-semibold text-gray-900">
    Monthly revenue vs payouts
  </h2>

  <div className="h-72 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={monthlyPaymentData}>
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#6B7280" }}
        />
        <YAxis hide />
        <Tooltip />
        <Bar
          dataKey="revenue"
          fill="#EDE9FE"
          barSize={48}
          radius={[4, 4, 0, 0]}
        />
        <Line
          type="monotone"
          dataKey="payouts"
          stroke="#6855F5"
          strokeWidth={3}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="transactions"
          stroke="#047857"
          strokeWidth={2}
          strokeDasharray="4 4"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
</div>

{/* Revenue Breakdown Chart */}
<div className="min-w-0 rounded-xl border border-gray-200 bg-white p-5">
  <h2 className="mb-4 text-sm font-semibold text-gray-900">
    Revenue breakdown
  </h2>

  <div className="relative h-48 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={revenueBreakdownData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={75}
          stroke="none"
        >
          {revenueBreakdownData.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>

    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-sm font-bold text-gray-900">100%</span>
      <span className="text-xs text-gray-500">Total</span>
    </div>
  </div>

  <div className="mt-4 space-y-3">
    {revenueBreakdownData.map((item) => (
      <div key={item.name} className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-gray-600">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.name}
        </span>
        <span className="font-semibold text-gray-900">{item.value}%</span>
      </div>
    ))}
  </div>
</div>

</div>
<div className="mt-8">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-semibold uppercase text-gray-900">
      Recent Transactions
    </h2>
    <button type="button" className="text-sm font-medium text-purple-700">
      View all
    </button>
  </div>
  <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
  <table className="w-full min-w-[850px] text-left text-sm">
    <thead className="bg-purple-50 text-gray-900">
      <tr>
        {[
          "USER",
          "Payment ID",
          "Company",
          "Position",
          "Amount",
          "Status",
          "Action",
        ].map((heading) => (
          <th key={heading} className="px-4 py-4 font-semibold">
            {heading}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
  {recentTransactions.map((transaction, index) => (
    <tr key={index} className="border-t border-gray-200">
      <td className="px-4 py-4">
        <p className="font-medium text-gray-900">{transaction.user}</p>
        <p className="text-xs text-gray-500">{transaction.role}</p>
      </td>

      <td className="px-4 py-4">{transaction.paymentId}</td>
      <td className="px-4 py-4">{transaction.company}</td>
      <td className="px-4 py-4">{transaction.position}</td>
      <td className="px-4 py-4 font-medium">{transaction.amount}</td>

      <td className="px-4 py-4">
        <span
  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
    transaction.status === "Paid"
      ? "bg-green-100 text-green-700"
      : transaction.status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : transaction.status === "Failed"
      ? "bg-red-100 text-red-700"
      : transaction.status === "Processing"
      ? "bg-purple-100 text-purple-700"
      : transaction.status === "Overdue"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700"
  }`}
>
  ● {transaction.status}
</span>
      </td>

      <td className="px-4 py-4">
        <button
  type="button"
  onClick={() => setSelectedPayment(transaction)}
  className="font-medium text-purple-700"
>
          View
        </button>
      </td>
    </tr>
  ))}
</tbody>
  </table>
</div>
</div>
   {selectedPayment && (
  <div className="fixed inset-0 z-50">
    {/* Dark background */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setSelectedPayment(null)}
    />

    {/* Payment details panel */}
    <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
  Payment Details
</h2>
          <p className="text-sm text-gray-500">
            {selectedPayment.company}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSelectedPayment(null)}
          className="text-2xl text-gray-500 hover:text-gray-900"
        >
          ×
        </button>
      </div>

      <div className="mt-6 flex items-start justify-between rounded-xl bg-gray-50 p-5">
        <div>
        <p className="text-xs uppercase text-gray-500">
          Payment Amount
        </p>
        <h3 className="mt-2 text-3xl font-bold text-gray-900">
          {selectedPayment.amount}
        </h3>
        </div>
        
          <p
  className={`mt-0 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
    selectedPayment.status === "Paid"
      ? "bg-green-100 text-green-700"
      : selectedPayment.status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : selectedPayment.status === "Failed" ||
        selectedPayment.status === "Overdue"
      ? "bg-red-100 text-red-700"
      : "bg-purple-100 text-purple-700"
  }`}
>
  ● {selectedPayment.status}
</p>
       
      </div>
{/* Intern Information */}
<div className="mt-6">
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
    Intern Information
  </h3>

  <div className="grid grid-cols-2 gap-2">
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs text-gray-500">Name</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {selectedPayment.user}
      </p>
    </div>

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs text-gray-500">Email</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {"email" in selectedPayment ? selectedPayment.email : "Not available"}
      </p>
    </div>

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs text-gray-500">Learning Path</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
      {"learningPath" in selectedPayment ? selectedPayment.learningPath : "Not available"}
      </p>
    </div>

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs text-gray-500">Role</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {selectedPayment.role}
      </p>
    </div>
  </div>
</div>
{/* Company Information */}
<div className="mt-6">
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
    Company Information
  </h3>

  <div className="grid grid-cols-2 gap-2">
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs text-gray-500">Company</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {selectedPayment.company}
      </p>
    </div>

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs text-gray-500">HR Contact</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
      {"hrContact" in selectedPayment ? String(selectedPayment.hrContact) : "Not available"}
      </p>
    </div>

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs text-gray-500">Schedule</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
      {"schedule" in selectedPayment ? String(selectedPayment.schedule) : "Not available"}
      </p>
    </div>

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs text-gray-500">Period</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {"period" in selectedPayment ? String(selectedPayment.period) : "Not available"}
      </p>
    </div>
  </div>
</div>
{/* Payment Breakdown */}
<div className="mt-6">
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
    Payment Breakdown
  </h3>

  <div className="overflow-hidden rounded-lg bg-gray-50">
    <div className="flex justify-between border-b border-gray-200 p-3 text-sm">
      <span className="text-gray-500">Base Stipend</span>
      <span className="font-medium">{"baseStipend" in selectedPayment ? String(selectedPayment.baseStipend) : "Not available"}</span>
    </div>

    <div className="flex justify-between border-b border-gray-200 p-3 text-sm">
      <span className="text-gray-500">Bonus</span>
      <span className="font-medium">{"bonus" in selectedPayment ? String(selectedPayment.bonus) : "Not available"}</span>
    </div>

    <div className="flex justify-between border-b border-gray-200 p-3 text-sm">
      <span className="text-gray-500">Tax</span>
      <span className="font-medium">
  {"tax" in selectedPayment ? String(selectedPayment.tax) : "Not available"}
</span>
    </div>

    <div className="flex justify-between border-b border-gray-200 p-3 text-sm">
      <span className="text-gray-500">Platform Fee</span>
      <span className="font-medium">{"platformFee" in selectedPayment ? String(selectedPayment.platformFee) : "Not available"}</span>
    </div>

    <div className="flex justify-between p-3 text-sm font-semibold text-purple-700">
      <span>Net Payment</span>
      <span>{selectedPayment.amount}</span>
    </div>
  </div>
</div>
{/* Payment Proof */}
<div className="mt-6">
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
    Payment Proof
  </h3>

  <div className="grid grid-cols-3 gap-2">
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
      <p className="text-xs text-gray-500">Bank Reference</p>
      <p className="mt-1 text-xs font-semibold text-gray-900">
        {"bankReference" in selectedPayment ? String(selectedPayment.bankReference) : "Not available"}
      </p>
    </div>

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
      <p className="text-xs text-gray-500">Date</p>
      <p className="mt-1 text-xs font-semibold text-gray-900">
      {"date" in selectedPayment ? String(selectedPayment.date) : "Not available"}
      </p>
    </div>

    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
      <p className="text-xs text-gray-500">Method</p>
      <p className="mt-1 text-xs font-semibold text-gray-900">
      {"method" in selectedPayment ? String(selectedPayment.method) : "Not available"}
      </p>
    </div>
  </div>
</div>
<div className="mt-8 flex gap-3">
<button
  type="button"
  
onClick={() => {
  const status = selectedPayment.status;

  if (status === "Pending") {
    if (window.confirm("Are you sure you want to approve this payment?")) {
      alert("Demo only: No payment has been approved. Backend integration is pending.");
    }
  } else if (status === "Processing") {
    alert("Demo only: Invoice download will be available after backend integration.");
  } else if (status === "Paid") {
    alert("Demo only: The payment invoice is not available yet.");
  } else if (status === "Failed") {
    alert("This payment failed. No invoice is available for download.");
  } else if (status === "Overdue") {
    alert("This payment is overdue. No invoice is available for download.");
  }
}}

  className="flex-1 rounded-lg bg-purple-700 py-3 font-medium text-white hover:bg-purple-800"
>
  {selectedPayment.status === "Pending"
    ? "Approve Payment"
    : selectedPayment.status === "Processing"
    ? "Download Invoice"
    : "Invoice"}
</button>
      <button
        type="button"
        onClick={() => setSelectedPayment(null)}
        className="flex-1 rounded-lg border border-gray-300 py-3 text-gray-700"
      >
        Close
      </button>
    </div>
  </div>
  </div>
)}
    </div>
  );
}
