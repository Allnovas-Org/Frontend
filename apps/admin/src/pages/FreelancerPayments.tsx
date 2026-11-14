import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  MessageSquareText,
  Plus,
  Search,
  ShieldCheck,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import {
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

type PaymentStatus =
  | "Pending Approval"
  | "Approved"
  | "Processing"
  | "Paid"
  | "On Hold"
  | "Rejected"
  | "Request More Information";

type PaymentNote = { date: string; author: string; text: string };
type Payment = {
  id: string;
  freelancer: string;
  initials: string;
  role: string;
  email: string;
  project: string;
  company: string;
  amount: number;
  base: number;
  bonus: number;
  tax: number;
  fee: number;
  status: PaymentStatus;
  submitted: string;
  period: string;
  accountName: string;
  bank: string;
  accountNumber: string;
  receiptReference: string;
  notes: PaymentNote[];
};

const initialPayments: Payment[] = [
  {
    id: "ALN-FP-26041",
    freelancer: "Amara Okafor",
    initials: "AO",
    role: "Product Designer",
    email: "amara.okafor@example.com",
    project: "Mobile banking experience",
    company: "Northstar Labs",
    amount: 685000,
    base: 650000,
    bonus: 50000,
    tax: 0,
    fee: 15000,
    status: "Pending Approval",
    submitted: "13 Nov 2026",
    period: "Nov 2026",
    accountName: "Amara Okafor",
    bank: "Cedar Coast Bank",
    accountNumber: "•••• 3812",
    receiptReference: "ALN-REF-26041",
    notes: [{ date: "13 Nov 2026", author: "System", text: "Payment submitted for admin review." }],
  },
  {
    id: "ALN-FP-26040",
    freelancer: "Chidi Eze",
    initials: "CE",
    role: "Frontend Developer",
    email: "chidi.eze@example.com",
    project: "Customer portal refresh",
    company: "Kora Digital",
    amount: 920000,
    base: 900000,
    bonus: 40000,
    tax: 0,
    fee: 20000,
    status: "Approved",
    submitted: "12 Nov 2026",
    period: "Nov 2026",
    accountName: "Chidi Eze",
    bank: "Cedar Coast Bank",
    accountNumber: "•••• 7205",
    receiptReference: "ALN-REF-26040",
    notes: [{ date: "12 Nov 2026", author: "System", text: "Payment approved. Transfer not confirmed." }],
  },
  {
    id: "ALN-FP-26039",
    freelancer: "Zainab Bello",
    initials: "ZB",
    role: "Content Strategist",
    email: "zainab.bello@example.com",
    project: "Q4 campaign strategy",
    company: "Juniper House",
    amount: 445000,
    base: 420000,
    bonus: 35000,
    tax: 0,
    fee: 10000,
    status: "Processing",
    submitted: "11 Nov 2026",
    period: "Nov 2026",
    accountName: "Zainab Bello",
    bank: "Cedar Coast Bank",
    accountNumber: "•••• 1944",
    receiptReference: "ALN-REF-26039",
    notes: [{ date: "12 Nov 2026", author: "System", text: "Payment is processing. Transfer not confirmed." }],
  },
  {
    id: "ALN-FP-26038",
    freelancer: "Tunde Adebayo",
    initials: "TA",
    role: "Backend Developer",
    email: "tunde.adebayo@example.com",
    project: "Inventory API build",
    company: "Maple Works",
    amount: 1250000,
    base: 1200000,
    bonus: 75000,
    tax: 0,
    fee: 25000,
    status: "Paid",
    submitted: "10 Nov 2026",
    period: "Nov 2026",
    accountName: "Tunde Adebayo",
    bank: "Cedar Coast Bank",
    accountNumber: "•••• 6621",
    receiptReference: "ALN-REF-26038",
    notes: [{ date: "10 Nov 2026", author: "System", text: "Payment marked Paid. Transfer not confirmed." }],
  },
  {
    id: "ALN-FP-26037",
    freelancer: "Ngozi Nwosu",
    initials: "NN",
    role: "UX Researcher",
    email: "ngozi.nwosu@example.com",
    project: "User research sprint",
    company: "Northstar Labs",
    amount: 540000,
    base: 520000,
    bonus: 30000,
    tax: 0,
    fee: 10000,
    status: "On Hold",
    submitted: "09 Nov 2026",
    period: "Nov 2026",
    accountName: "Ngozi Nwosu",
    bank: "Cedar Coast Bank",
    accountNumber: "•••• 8430",
    receiptReference: "ALN-REF-26037",
    notes: [{ date: "11 Nov 2026", author: "Admin", text: "Payment on hold pending a final review of submitted work." }],
  },
  {
    id: "ALN-FP-26036",
    freelancer: "Femi Salami",
    initials: "FS",
    role: "Motion Designer",
    email: "femi.salami@example.com",
    project: "Product launch animations",
    company: "Kora Digital",
    amount: 375000,
    base: 360000,
    bonus: 25000,
    tax: 0,
    fee: 10000,
    status: "Rejected",
    submitted: "08 Nov 2026",
    period: "Nov 2026",
    accountName: "Femi Salami",
    bank: "Cedar Coast Bank",
    accountNumber: "•••• 1576",
    receiptReference: "ALN-REF-26036",
    notes: [{ date: "09 Nov 2026", author: "Admin", text: "Payment rejected; review the submitted milestone details." }],
  },
  {
    id: "ALN-FP-26035",
    freelancer: "Ifeoma Obi",
    initials: "IO",
    role: "Data Analyst",
    email: "ifeoma.obi@example.com",
    project: "Customer insights dashboard",
    company: "Juniper House",
    amount: 760000,
    base: 740000,
    bonus: 35000,
    tax: 0,
    fee: 15000,
    status: "Request More Information",
    submitted: "07 Nov 2026",
    period: "Nov 2026",
    accountName: "Ifeoma Obi",
    bank: "Cedar Coast Bank",
    accountNumber: "•••• 2940",
    receiptReference: "ALN-REF-26035",
    notes: [{ date: "08 Nov 2026", author: "Admin", text: "Please add a short note explaining the final deliverable." }],
  },
  {
    id: "ALN-FP-26034",
    freelancer: "David Ojo",
    initials: "DO",
    role: "Brand Designer",
    email: "david.ojo@example.com",
    project: "Visual identity toolkit",
    company: "Maple Works",
    amount: 510000,
    base: 490000,
    bonus: 30000,
    tax: 0,
    fee: 10000,
    status: "Pending Approval",
    submitted: "06 Nov 2026",
    period: "Nov 2026",
    accountName: "David Ojo",
    bank: "Cedar Coast Bank",
    accountNumber: "•••• 3081",
    receiptReference: "ALN-REF-26034",
    notes: [{ date: "06 Nov 2026", author: "System", text: "Payment submitted for admin review." }],
  },
];

const statusStyles: Record<PaymentStatus, string> = {
  "Pending Approval": "bg-amber-50 text-amber-700 ring-amber-200",
  Approved: "bg-blue-50 text-blue-700 ring-blue-200",
  Processing: "bg-violet-50 text-violet-700 ring-violet-200",
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "On Hold": "bg-orange-50 text-orange-700 ring-orange-200",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  "Request More Information": "bg-slate-100 text-slate-700 ring-slate-200",
};

const statusColors: Record<PaymentStatus, string> = {
  "Pending Approval": "#F59E0B",
  Approved: "#3B82F6",
  Processing: "#8B5CF6",
  Paid: "#10B981",
  "On Hold": "#F97316",
  Rejected: "#F43F5E",
  "Request More Information": "#64748B",
};

const statusBannerContent: Record<PaymentStatus, { title: string; description: string; style: string }> = {
  "Pending Approval": {
    title: "Pending approval",
    description: "Review the submitted work and payout details before making a decision.",
    style: "border-amber-200 bg-amber-50 text-amber-900",
  },
  Approved: {
    title: "Approved",
    description: "Approval recorded. Transfer not confirmed.",
    style: "border-blue-200 bg-blue-50 text-blue-900",
  },
  Processing: {
    title: "Processing",
    description: "Payment is processing. Transfer not confirmed.",
    style: "border-violet-200 bg-violet-50 text-violet-900",
  },
  Paid: {
    title: "Marked Paid",
    description: "Payment status is marked Paid. Transfer not confirmed.",
    style: "border-emerald-200 bg-emerald-50 text-emerald-900",
  },
  "On Hold": {
    title: "Payment on hold",
    description: "This payment is paused while it awaits review.",
    style: "border-orange-200 bg-orange-50 text-orange-900",
  },
  Rejected: {
    title: "Request rejected",
    description: "The decision is recorded. No message was sent to the freelancer.",
    style: "border-rose-200 bg-rose-50 text-rose-900",
  },
  "Request More Information": {
    title: "More information requested",
    description: "A request note is saved to this payment. No notification was sent.",
    style: "border-slate-200 bg-slate-50 text-slate-800",
  },
};

const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const downloadDemoDocument = (payment: Payment, type: "receipt" | "invoice") => {
  const gross = payment.base + payment.bonus;
  const title = type === "receipt" ? "PAYMENT RECORD" : "INVOICE";
  const contents = [
    title,
    "TRANSFER NOT CONFIRMED — NOT A BANK RECEIPT",
    "",
    `Payment ID: ${payment.id}`,
    `Payment reference: ${payment.receiptReference}`,
    `Freelancer: ${payment.freelancer}`,
    `Bank account: ${payment.bank} · ${payment.accountName} · ${payment.accountNumber}`,
    `Project: ${payment.project}`,
    `Client: ${payment.company}`,
    `Gross amount: ${money(gross)}`,
    `Platform fee: ${money(payment.fee)}`,
    `Net payout: ${money(payment.amount)}`,
    `Request date: ${payment.submitted}`,
    "Payment method: Bank transfer (not confirmed)",
    "",
    "This payment record does not confirm or provide evidence of a bank transfer.",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([contents], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `PAYMENT-RECORD-${payment.id}.txt`;
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 1000);
};

const statuses: PaymentStatus[] = [
  "Pending Approval",
  "Approved",
  "Processing",
  "Paid",
  "On Hold",
  "Rejected",
  "Request More Information",
];

type DialogState =
  | { kind: "confirm"; nextStatus: PaymentStatus; title: string; description: string; button: string; needsReason?: boolean }
  | { kind: "information" }
  | { kind: "note" }
  | null;

const monthlyPayouts = [
  { month: "Jun", payout: 4_200_000, earnings: 3_720_000, commission: 480_000 },
  { month: "Jul", payout: 5_100_000, earnings: 4_510_000, commission: 590_000 },
  { month: "Aug", payout: 4_750_000, earnings: 4_210_000, commission: 540_000 },
  { month: "Sep", payout: 6_300_000, earnings: 5_590_000, commission: 710_000 },
  { month: "Oct", payout: 5_800_000, earnings: 5_140_000, commission: 660_000 },
  { month: "Nov", payout: 7_150_000, earnings: 6_340_000, commission: 810_000 },
];

function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}>
      <span className="mr-1.5">•</span>{status}
    </span>
  );
}

function FreelancerPayments() {
  const [payments, setPayments] = useState(initialPayments);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [dialogText, setDialogText] = useState("");
  const [toast, setToast] = useState("");

  const selectedPayment = payments.find((payment) => payment.id === selectedId) ?? null;
  const informationRequestNote = selectedPayment
    ? [...selectedPayment.notes].reverse().find((note) => /request/i.test(note.text))
      ?? [...selectedPayment.notes].reverse().find((note) => note.author === "Admin")
    : undefined;
  const filteredPayments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesStatus = statusFilter === "All statuses" || payment.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        [payment.freelancer, payment.email, payment.id, payment.project, payment.company]
          .some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesStatus && matchesQuery;
    });
  }, [payments, query, statusFilter]);

  const distribution = useMemo(
    () =>
      statuses
        .map((status) => ({
          name: status,
          value: payments.filter((payment) => payment.status === status).length,
          color: statusColors[status],
        }))
        .filter((item) => item.value > 0),
    [payments],
  );

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3800);
  };

  const openAction = (nextStatus: PaymentStatus, title: string, description: string, button: string, needsReason = false) => {
    setDialogText("");
    setDialog({ kind: "confirm", nextStatus, title, description, button, needsReason });
  };

  const submitDialog = () => {
    if (!selectedPayment || !dialog) return;
    if ((dialog.kind === "information" || dialog.kind === "note" || (dialog.kind === "confirm" && dialog.needsReason)) && !dialogText.trim()) {
      showToast("Add a short note before continuing.");
      return;
    }

    if (dialog.kind === "confirm") {
      const noteText = dialogText.trim() || `Payment status updated to ${dialog.nextStatus}.`;
      setPayments((current) =>
        current.map((payment) =>
          payment.id === selectedPayment.id
            ? {
                ...payment,
                status: dialog.nextStatus,
                notes: [...payment.notes, { date: "13 Nov 2026", author: "Admin", text: noteText }],
              }
            : payment,
        ),
      );
      showToast("Payment status updated. Transfer not confirmed.");
    } else if (dialog.kind === "information") {
      setPayments((current) =>
        current.map((payment) =>
          payment.id === selectedPayment.id
            ? {
                ...payment,
                status: "Request More Information",
                notes: [...payment.notes, { date: "13 Nov 2026", author: "Admin", text: dialogText.trim() }],
              }
            : payment,
        ),
      );
      showToast("Request saved to the payment record. No notification was sent.");
    } else {
      setPayments((current) =>
        current.map((payment) =>
          payment.id === selectedPayment.id
            ? { ...payment, notes: [...payment.notes, { date: "13 Nov 2026", author: "Admin", text: dialogText.trim() }] }
            : payment,
        ),
      );
      showToast("Note added to the payment record.");
    }
    setDialog(null);
    setDialogText("");
  };

  const generateReport = () => {
    const headers = ["Payment ID", "Freelancer", "Email", "Project", "Company", "Amount (NGN)", "Status", "Period"];
    const rows = filteredPayments.map((payment) => [
      payment.id,
      payment.freelancer,
      payment.email,
      payment.project,
      payment.company,
      String(payment.amount),
      payment.status,
      payment.period,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((field) => `"${field.replace(/"/g, '""')}"`).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "allnova-freelancer-payments.csv";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
      link.remove();
    }, 1000);
    showToast("Payment report downloaded.");
  };

  const paidTotal = payments.filter((payment) => payment.status === "Paid").reduce((sum, payment) => sum + payment.amount, 0);
  const pendingTotal = payments
    .filter((payment) => payment.status === "Pending Approval")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const paidCount = payments.filter((payment) => payment.status === "Paid").length;
  const paymentSuccessRate = payments.length ? Math.round((paidCount / payments.length) * 100) : 0;
  const metrics = [
    { title: "Total freelancer payments", value: money(payments.reduce((sum, payment) => sum + payment.amount, 0)), detail: "Across all payment records", icon: Wallet, tone: "bg-violet-50 text-violet-700" },
    { title: "Pending payments", value: money(pendingTotal), detail: `${payments.filter((payment) => payment.status === "Pending Approval").length} awaiting approval`, icon: Clock3, tone: "bg-amber-50 text-amber-700" },
    { title: "Paid this month", value: money(paidTotal), detail: "Transfer not confirmed", icon: Banknote, tone: "bg-emerald-50 text-emerald-700" },
    { title: "Records marked Paid", value: `${paymentSuccessRate}%`, detail: `${paidCount} of ${payments.length} payment records; transfer not confirmed`, icon: CheckCircle2, tone: "bg-blue-50 text-blue-700" },
  ];

  const actionButtons = (payment: Payment) => {
    switch (payment.status) {
      case "Pending Approval":
        return (
          <>
            <button type="button" onClick={() => openAction("Approved", "Approve this payment?", "This updates the payment record only. No bank transfer will be initiated.", "Approve")} className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800">Approve</button>
            <button type="button" onClick={() => openAction("On Hold", "Put this payment on hold?", "Add a reason so the local review history is clear.", "Place on hold", true)} className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Put on hold</button>
            <button type="button" onClick={() => setDialog({ kind: "information" })} className="rounded-lg border border-violet-200 px-4 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-50">Request information</button>
            <button type="button" onClick={() => openAction("Rejected", "Reject this payment?", "This updates the payment record only. No message will be sent.", "Reject", true)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">Reject</button>
          </>
        );
      case "Approved":
        return (
          <>
            <button type="button" onClick={() => openAction("Processing", "Move to processing?", "This updates the payment record only. No bank transfer will be started.", "Move to processing")} className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800">Move to processing</button>
            <button type="button" onClick={() => openAction("On Hold", "Put this payment on hold?", "Add a reason so the local review history is clear.", "Place on hold", true)} className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Put on hold</button>
            <button type="button" onClick={() => setDialog({ kind: "information" })} className="rounded-lg border border-violet-200 px-4 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-50">Request information</button>
          </>
        );
      case "Processing":
        return (
          <>
            <button type="button" onClick={() => openAction("Paid", "Mark this payment as Paid?", "This updates the payment status only. A bank transfer is not initiated or confirmed.", "Mark as Paid")} className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800">Mark as Paid</button>
            <button type="button" onClick={() => openAction("On Hold", "Put this payment on hold?", "Add a reason so the local review history is clear.", "Place on hold", true)} className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Put on hold</button>
          </>
        );
      case "On Hold":
        return (
          <>
            <button type="button" onClick={() => openAction("Pending Approval", "Resume review?", "The payment returns to the approval queue.", "Resume review")} className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800">Resume review</button>
            <button type="button" onClick={() => openAction("Rejected", "Reject this payment?", "This updates the payment record only. No message will be sent.", "Reject", true)} className="rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">Reject</button>
          </>
        );
      case "Rejected":
        return <button type="button" onClick={() => openAction("Pending Approval", "Reopen this payment?", "This returns the payment to pending approval.", "Reopen for review")} className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800">Reopen for review</button>;
      case "Request More Information":
        return (
          <>
            <button type="button" onClick={() => openAction("Pending Approval", "Mark information as received?", "This updates the payment record only. No notification will be sent.", "Return to review")} className="rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800">Information received</button>
            <button type="button" onClick={() => openAction("Rejected", "Reject this payment?", "This updates the payment record only. No message will be sent.", "Reject", true)} className="rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">Reject</button>
          </>
        );
      case "Paid":
        return <span className="flex items-center gap-2 text-sm text-emerald-700"><ShieldCheck size={17} /> Payment status marked Paid · Transfer not confirmed.</span>;
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-[28px]">Payment Overview</h1>
          </div>
          <p className="mt-1.5 text-sm text-gray-500">Monitor and manage freelancer payments across the platform.</p>
        </div>
        <button type="button" onClick={generateReport} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7600C9] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6400AA]">
          <ArrowDownToLine size={17} /> Generate Report
        </button>
      </div>

      <section aria-label="Payment overview" className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {metrics.map(({ title, value, detail, icon: Icon, tone }) => (
          <article key={title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-[0_2px_8px_rgba(27,20,39,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-gray-500">{title}</p>
                <p className="mt-3 text-[26px] font-semibold tracking-tight text-gray-900">{value}</p>
              </div>
              <span className={`rounded-lg p-2.5 ${tone}`}><Icon size={19} strokeWidth={1.8} /></span>
            </div>
            <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500">{detail}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_2px_8px_rgba(27,20,39,0.04)] xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Monthly payout overview</h2>
              <p className="mt-1 text-xs text-gray-500">Monthly payout totals · Jun–Nov 2026</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"><ArrowUpRight size={14} /> {(((monthlyPayouts[5].payout / monthlyPayouts[4].payout) - 1) * 100).toFixed(1)}% <span className="font-normal text-emerald-700/80">vs last month</span></span>
          </div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyPayouts} margin={{ top: 8, right: 12, left: 2, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#EEEAF2" strokeDasharray="3 4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8B8493" }} dy={8} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#8B8493" }}
                  tickFormatter={(value: number) => `₦${(value / 1_000_000).toFixed(0)}m`}
                  width={38}
                  domain={[0, "dataMax + 1000000"]}
                />
                <Tooltip
                  cursor={{ fill: "#F8F5FC" }}
                  formatter={(value, name) => [money(Number(value)), name]}
                  contentStyle={{ borderRadius: 10, border: "1px solid #E8E4EE", fontSize: 11 }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={30}
                  iconType="circle"
                  iconSize={7}
                  wrapperStyle={{ fontSize: 11, color: "#6B6472", paddingTop: 8 }}
                />
                <Bar name="Payouts" dataKey="payout" fill="#E5D8F7" radius={[4, 4, 0, 0]} maxBarSize={38} />
                <Line name="Freelancer earnings" dataKey="earnings" type="monotone" stroke="#7D35C8" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                <Line name="Commission" dataKey="commission" type="monotone" stroke="#2DAA76" strokeWidth={2} strokeDasharray="4 4" dot={false} activeDot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-[0_2px_8px_rgba(27,20,39,0.04)]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Payment distribution</h2>
              <p className="mt-1 text-xs text-gray-500">Payments by status</p>
            </div>
            <span className="rounded-md bg-violet-50 px-2 py-1 text-[10px] font-medium text-violet-700">This month</span>
          </div>
          <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row sm:gap-1">
            <div className="relative h-44 w-full shrink-0 sm:w-[46%]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={53} outerRadius={70} paddingAngle={2} stroke="none">
                    {distribution.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E8E4EE", fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-semibold text-gray-900">{payments.length}</span>
                <span className="text-[10px] text-gray-500">Payments</span>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-1 sm:gap-y-2">
              {distribution.map((item) => (
                <div key={item.name} className="flex min-w-0 items-center justify-between gap-1 text-[10px]">
                  <span className="flex min-w-0 items-center gap-1.5 text-gray-600"><span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} /><span className="truncate">{item.name}</span></span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
            <p className="mt-1 text-sm text-gray-500">{filteredPayments.length} transactions</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search freelancer or ID" className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 sm:w-60" />
            </label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by payment status" className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
              <option>All statuses</option>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-[13px]">
            <thead className="bg-[#F8F5FC] text-xs text-gray-700">
              <tr>
                <th className="px-4 py-3.5 font-semibold">Freelancer</th>
                <th className="px-4 py-3.5 font-semibold">Payment ID</th>
                <th className="px-4 py-3.5 font-semibold">Amount</th>
                <th className="px-4 py-3.5 font-semibold">Project</th>
                <th className="px-4 py-3.5 font-semibold">Client</th>
                <th className="px-4 py-3.5 font-semibold">Commission</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 font-semibold"><span className="sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="transition hover:bg-gray-50/70">
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-semibold text-violet-800">{payment.initials}</span>
                      <span><span className="block font-medium text-gray-900">{payment.freelancer}</span><span className="mt-0.5 block text-[11px] text-gray-500">{payment.role}</span></span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">{payment.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">{money(payment.amount)}</td>
                  <td className="px-4 py-3 text-gray-700">{payment.project}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">{payment.company}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">{money(payment.fee)}</td>
                  <td className="px-4 py-3"><StatusBadge status={payment.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => setSelectedId(payment.id)} className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 font-medium text-violet-700 hover:bg-violet-50">View <ChevronRight size={15} /></button>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-500">No payments match those filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedPayment && (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Close payment details" onClick={() => setSelectedId(null)} className="absolute inset-0 cursor-default bg-gray-950/40" />
          <aside aria-label="Payment details" className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4 sm:px-7">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-violet-700">Payment Details</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h2 className="text-xl font-bold text-gray-900">{selectedPayment.freelancer}</h2>
                  {(selectedPayment.status === "Pending Approval" || selectedPayment.status === "Approved" || selectedPayment.status === "Processing" || selectedPayment.status === "Paid" || selectedPayment.status === "On Hold" || selectedPayment.status === "Rejected" || selectedPayment.status === "Request More Information") && <StatusBadge status={selectedPayment.status} />}
                </div>
                <p className="mt-0.5 text-xs text-gray-500">{selectedPayment.id} · {selectedPayment.role}</p>
              </div>
              <button type="button" aria-label="Close details" onClick={() => setSelectedId(null)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"><X size={20} /></button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              {selectedPayment.status === "Request More Information" ? (
                <div className="space-y-6">
                  <section className="rounded-xl bg-slate-700 p-5 text-white shadow-sm sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/85">More information required</p>
                        <p className="mt-2 text-sm font-medium text-white/90">Net payout amount</p>
                        <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{money(selectedPayment.amount)}</p>
                      </div>
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">Request More Information</span>
                    </div>
                    <p className="mt-4 border-t border-white/20 pt-3 text-xs leading-5 text-white/85">
                      Awaiting additional details. No notification has been sent.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Information Requested</h3>
                    {informationRequestNote ? (
                      <div className="flex gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <MessageSquareText size={17} className="mt-0.5 shrink-0 text-slate-600" />
                        <div>
                          <p className="text-sm leading-5 text-slate-900">{informationRequestNote.text}</p>
                          <p className="mt-1.5 text-[11px] text-slate-600">{informationRequestNote.author} · {informationRequestNote.date}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">No specific information request recorded.</div>
                    )}
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Breakdown</h3>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      {[
                        ["Project fee", selectedPayment.base],
                        ["Bonus", selectedPayment.bonus],
                        ["Tax", -selectedPayment.tax],
                        ["Platform fee", -selectedPayment.fee],
                      ].map(([label, amount]) => (
                        <div key={String(label)} className="flex justify-between gap-3 border-b border-gray-100 px-4 py-3 text-sm last:border-0">
                          <span className="text-gray-500">{String(label)}</span>
                          <span className="font-medium text-gray-800">{Number(amount) < 0 ? `−${money(Math.abs(Number(amount)))}` : money(Number(amount))}</span>
                        </div>
                      ))}
                      <div className="flex justify-between gap-3 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
                        <span>Net payout</span><span>{money(selectedPayment.amount)}</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Journey</h3>
                    <div className="space-y-0">
                      {[
                        { title: "Submitted", detail: selectedPayment.submitted, state: "complete" },
                        { title: "Admin Review", detail: "Review in progress", state: "complete" },
                        { title: "More Information Requested", detail: "Awaiting additional details · current stage", state: "current" },
                        { title: "Approved", detail: "Not yet approved", state: "pending" },
                        { title: "Processing", detail: "Not started", state: "pending" },
                        { title: "Paid", detail: "Not completed", state: "pending" },
                      ].map((step, index, steps) => (
                        <div key={step.title} className="flex min-h-12 gap-3">
                          <div className="flex w-5 shrink-0 flex-col items-center">
                            {step.state === "complete"
                              ? <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                              : step.state === "current"
                                ? <Clock3 size={17} className="shrink-0 text-slate-600" />
                                : <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-gray-300 bg-white" />}
                            {index < steps.length - 1 && <span className="my-1 w-px flex-1 bg-gray-200" />}
                          </div>
                          <div className="pb-3">
                            <p className={`text-sm font-medium ${step.state === "current" ? "text-slate-800" : step.state === "complete" ? "text-gray-800" : "text-gray-500"}`}>
                              {step.title}{step.state === "current" ? " · Current" : ""}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Freelancer & Project Information</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Freelancer</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.freelancer}</p>
                        <p className="mt-0.5 break-all text-xs text-gray-500">{selectedPayment.email}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Project</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.project}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Client</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.company}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Payment ID</p>
                        <p className="mt-1 break-all text-sm font-medium text-gray-900">{selectedPayment.id}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3 sm:col-span-2">
                        <p className="text-[11px] text-gray-500">Masked bank account</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.bank} · {selectedPayment.accountName} · {selectedPayment.accountNumber}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Admin Notes</h3>
                    {selectedPayment.notes.length > 0 ? (
                      <div className="space-y-2">
                        {selectedPayment.notes.map((note, index) => (
                          <div key={`${note.date}-${index}`} className="flex gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3.5">
                            <MessageSquareText size={17} className="mt-0.5 shrink-0 text-slate-600" />
                            <div>
                              <p className="text-sm leading-5 text-gray-700">{note.text}</p>
                              <p className="mt-1.5 text-[11px] text-gray-500">{note.author} · {note.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-500">No admin notes have been added.</p>
                    )}
                  </section>
                </div>
              ) : selectedPayment.status === "Rejected" ? (
                <div className="space-y-6">
                  <section className="rounded-xl bg-rose-600 p-5 text-white shadow-sm sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/85">Payment rejected</p>
                        <p className="mt-2 text-sm font-medium text-white/90">Net payout amount</p>
                        <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{money(selectedPayment.amount)}</p>
                      </div>
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">Rejected</span>
                    </div>
                    <p className="mt-4 border-t border-white/25 pt-3 text-xs leading-5 text-white/90">
                      Rejection is recorded. No payment was made and no notification was sent.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Reason for Rejection</h3>
                    {selectedPayment.notes.length > 0 ? (
                      <div className="flex gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4">
                        <AlertTriangle size={17} className="mt-0.5 shrink-0 text-rose-700" />
                        <p className="text-sm leading-5 text-rose-950">{selectedPayment.notes[selectedPayment.notes.length - 1].text}</p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">No rejection reason recorded.</div>
                    )}
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Breakdown</h3>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      {[
                        ["Project fee", selectedPayment.base],
                        ["Bonus", selectedPayment.bonus],
                        ["Tax", -selectedPayment.tax],
                        ["Platform fee", -selectedPayment.fee],
                      ].map(([label, amount]) => (
                        <div key={String(label)} className="flex justify-between gap-3 border-b border-gray-100 px-4 py-3 text-sm last:border-0">
                          <span className="text-gray-500">{String(label)}</span>
                          <span className="font-medium text-gray-800">{Number(amount) < 0 ? `−${money(Math.abs(Number(amount)))}` : money(Number(amount))}</span>
                        </div>
                      ))}
                      <div className="flex justify-between gap-3 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                        <span>Net payout</span><span>{money(selectedPayment.amount)}</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Journey</h3>
                    <div className="space-y-0">
                      {[
                        { title: "Submitted", detail: selectedPayment.submitted, state: "complete" },
                        { title: "Admin Review", detail: "Review completed", state: "complete" },
                        { title: "Rejected", detail: "Final status", state: "rejected" },
                      ].map((step, index, steps) => (
                        <div key={step.title} className="flex min-h-12 gap-3">
                          <div className="flex w-5 shrink-0 flex-col items-center">
                            {step.state === "rejected"
                              ? <X size={17} className="shrink-0 rounded-full bg-rose-100 p-0.5 text-rose-700" />
                              : <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />}
                            {index < steps.length - 1 && <span className="my-1 w-px flex-1 bg-gray-200" />}
                          </div>
                          <div className="pb-3">
                            <p className={`text-sm font-medium ${step.state === "rejected" ? "text-rose-800" : "text-gray-800"}`}>{step.title}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs leading-5 text-rose-900">
                      This request was not approved, processed, or paid.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Freelancer & Project Information</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Freelancer</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.freelancer}</p>
                        <p className="mt-0.5 break-all text-xs text-gray-500">{selectedPayment.email}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Project</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.project}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Client</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.company}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Payment ID</p>
                        <p className="mt-1 break-all text-sm font-medium text-gray-900">{selectedPayment.id}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3 sm:col-span-2">
                        <p className="text-[11px] text-gray-500">Masked bank account</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.bank} · {selectedPayment.accountName} · {selectedPayment.accountNumber}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Admin Notes</h3>
                    {selectedPayment.notes.length > 0 ? (
                      <div className="space-y-2">
                        {selectedPayment.notes.map((note, index) => (
                          <div key={`${note.date}-${index}`} className="flex gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3.5">
                            <MessageSquareText size={17} className="mt-0.5 shrink-0 text-rose-600" />
                            <div>
                              <p className="text-sm leading-5 text-gray-700">{note.text}</p>
                              <p className="mt-1.5 text-[11px] text-gray-500">{note.author} · {note.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-500">No admin notes have been added.</p>
                    )}
                  </section>
                </div>
              ) : selectedPayment.status === "On Hold" ? (
                <div className="space-y-6">
                  <section className="rounded-xl bg-orange-500 p-5 text-white shadow-sm sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/85">Payment on hold</p>
                        <p className="mt-2 text-sm font-medium text-white/90">Net payout amount</p>
                        <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{money(selectedPayment.amount)}</p>
                      </div>
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">On Hold</span>
                    </div>
                    <p className="mt-4 border-t border-white/25 pt-3 text-xs leading-5 text-white/90">
                      Paused pending admin review. Transfer not confirmed.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Reason for Hold</h3>
                    {selectedPayment.notes.length > 0 ? (
                      <div className="flex gap-2.5 rounded-xl border border-orange-200 bg-orange-50 p-4">
                        <AlertTriangle size={17} className="mt-0.5 shrink-0 text-orange-700" />
                        <p className="text-sm leading-5 text-orange-950">{selectedPayment.notes[selectedPayment.notes.length - 1].text}</p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">No reason has been provided.</div>
                    )}
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Breakdown</h3>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      {[
                        ["Project fee", selectedPayment.base],
                        ["Bonus", selectedPayment.bonus],
                        ["Tax", -selectedPayment.tax],
                        ["Platform fee", -selectedPayment.fee],
                      ].map(([label, amount]) => (
                        <div key={String(label)} className="flex justify-between gap-3 border-b border-gray-100 px-4 py-3 text-sm last:border-0">
                          <span className="text-gray-500">{String(label)}</span>
                          <span className="font-medium text-gray-800">{Number(amount) < 0 ? `−${money(Math.abs(Number(amount)))}` : money(Number(amount))}</span>
                        </div>
                      ))}
                      <div className="flex justify-between gap-3 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-800">
                        <span>Net payout</span><span>{money(selectedPayment.amount)}</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Journey</h3>
                    <div className="space-y-0">
                      {[
                        { title: "Submitted", detail: selectedPayment.submitted, state: "complete" },
                        { title: "Admin review", detail: "Paused pending review", state: "current" },
                        { title: "Approved", detail: "Not yet approved", state: "pending" },
                        { title: "Processing", detail: "Not started", state: "pending" },
                        { title: "Paid", detail: "Not completed", state: "pending" },
                      ].map((step, index, steps) => (
                        <div key={step.title} className="flex min-h-12 gap-3">
                          <div className="flex w-5 shrink-0 flex-col items-center">
                            {step.state === "complete"
                              ? <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                              : step.state === "current"
                                ? <Clock3 size={17} className="shrink-0 text-orange-600" />
                                : <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-gray-300 bg-white" />}
                            {index < steps.length - 1 && <span className="my-1 w-px flex-1 bg-gray-200" />}
                          </div>
                          <div className="pb-3">
                            <p className={`text-sm font-medium ${step.state === "current" ? "text-orange-800" : step.state === "complete" ? "text-gray-800" : "text-gray-500"}`}>
                              {step.title}{step.state === "current" ? " · On Hold" : ""}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Freelancer & Project Information</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Freelancer</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.freelancer}</p>
                        <p className="mt-0.5 break-all text-xs text-gray-500">{selectedPayment.email}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Project</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.project}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Client</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.company}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Payment ID</p>
                        <p className="mt-1 break-all text-sm font-medium text-gray-900">{selectedPayment.id}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3 sm:col-span-2">
                        <p className="text-[11px] text-gray-500">Masked bank account</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.bank} · {selectedPayment.accountName} · {selectedPayment.accountNumber}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Admin Notes</h3>
                    {selectedPayment.notes.length > 0 ? (
                      <div className="space-y-2">
                        {selectedPayment.notes.map((note, index) => (
                          <div key={`${note.date}-${index}`} className="flex gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3.5">
                            <MessageSquareText size={17} className="mt-0.5 shrink-0 text-orange-600" />
                            <div>
                              <p className="text-sm leading-5 text-gray-700">{note.text}</p>
                              <p className="mt-1.5 text-[11px] text-gray-500">{note.author} · {note.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-500">No admin notes have been added.</p>
                    )}
                  </section>
                </div>
              ) : selectedPayment.status === "Paid" ? (
                <div className="space-y-6">
                  <section className="rounded-xl bg-emerald-600 p-5 text-white shadow-sm sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Payment marked Paid</p>
                        <p className="mt-2 text-sm font-medium text-white/90">Net payout amount</p>
                        <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{money(selectedPayment.amount)}</p>
                      </div>
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">Paid</span>
                    </div>
                    <p className="mt-4 border-t border-white/20 pt-3 text-xs leading-5 text-white/85">
                      Transfer not confirmed.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Breakdown</h3>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      {[
                        ["Project fee", selectedPayment.base],
                        ["Bonus", selectedPayment.bonus],
                        ["Tax", -selectedPayment.tax],
                        ["Platform fee", -selectedPayment.fee],
                      ].map(([label, amount]) => (
                        <div key={String(label)} className="flex justify-between gap-3 border-b border-gray-100 px-4 py-3 text-sm last:border-0">
                          <span className="text-gray-500">{String(label)}</span>
                          <span className="font-medium text-gray-800">{Number(amount) < 0 ? `−${money(Math.abs(Number(amount)))}` : money(Number(amount))}</span>
                        </div>
                      ))}
                      <div className="flex justify-between gap-3 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800">
                        <span>Net payout</span><span>{money(selectedPayment.amount)}</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Journey</h3>
                    <div className="space-y-0">
                      {[
                        { title: "Submitted", detail: selectedPayment.submitted },
                        { title: "Approved", detail: "Status recorded" },
                        { title: "Processing", detail: "Status recorded" },
                        { title: "Paid", detail: "Status marked Paid · transfer not confirmed" },
                      ].map((step, index, steps) => (
                        <div key={step.title} className="flex min-h-12 gap-3">
                          <div className="flex w-5 shrink-0 flex-col items-center">
                            <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                            {index < steps.length - 1 && <span className="my-1 w-px flex-1 bg-emerald-200" />}
                          </div>
                          <div className="pb-3">
                            <p className="text-sm font-medium text-gray-800">{step.title}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-1 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                      Transfer not confirmed.
                    </p>
                  </section>

                  <section>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-gray-900">Payment Receipt</h3>
                      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-violet-700">Payment record</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 p-4 sm:grid-cols-2">
                      <div className="min-w-0"><p className="text-[11px] text-gray-500">Freelancer</p><p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.freelancer}</p></div>
                      <div className="min-w-0"><p className="text-[11px] text-gray-500">Payment ID</p><p className="mt-1 break-all text-sm font-medium text-gray-900">{selectedPayment.id}</p></div>
                      <div className="min-w-0"><p className="text-[11px] text-gray-500">Project</p><p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.project}</p></div>
                      <div className="min-w-0"><p className="text-[11px] text-gray-500">Client</p><p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.company}</p></div>
                      <div className="min-w-0"><p className="text-[11px] text-gray-500">Masked bank account</p><p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.bank} · {selectedPayment.accountName}</p><p className="mt-0.5 text-xs text-gray-500">{selectedPayment.accountNumber}</p></div>
                      <div className="min-w-0"><p className="text-[11px] text-gray-500">Payment reference</p><p className="mt-1 break-all text-sm font-medium text-gray-900">{selectedPayment.receiptReference}</p></div>
                      <div className="rounded-lg bg-violet-50 p-3 sm:col-span-2"><p className="text-[11px] text-violet-700">Net payout</p><p className="mt-1 text-lg font-bold text-violet-800">{money(selectedPayment.amount)}</p></div>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-gray-500">Payment record only. Transfer not confirmed.</p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Admin Notes</h3>
                    <div className="space-y-2">
                      {selectedPayment.notes.map((note, index) => (
                        <div key={`${note.date}-${index}`} className="flex gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3.5">
                          <MessageSquareText size={17} className="mt-0.5 shrink-0 text-violet-600" />
                          <div>
                            <p className="text-sm leading-5 text-gray-700">{note.text}</p>
                            <p className="mt-1.5 text-[11px] text-gray-500">{note.author} · {note.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              ) : selectedPayment.status === "Processing" ? (
                <div className="space-y-6">
                  <section className="rounded-xl bg-[#7600C9] p-5 text-white shadow-sm sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">Payment processing</p>
                    <h3 className="mt-2 text-sm font-medium text-white/90">Net payout amount</h3>
                    <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{money(selectedPayment.amount)}</p>
                    <p className="mt-4 border-t border-white/20 pt-3 text-xs leading-5 text-white/85">
                      Payment is processing. Transfer not confirmed.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Breakdown</h3>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      {[
                        ["Project fee", selectedPayment.base],
                        ["Bonus", selectedPayment.bonus],
                        ["Tax", -selectedPayment.tax],
                        ["Platform fee", -selectedPayment.fee],
                      ].map(([label, amount]) => (
                        <div key={String(label)} className="flex justify-between gap-3 border-b border-gray-100 px-4 py-3 text-sm last:border-0">
                          <span className="text-gray-500">{String(label)}</span>
                          <span className="font-medium text-gray-800">{Number(amount) < 0 ? `−${money(Math.abs(Number(amount)))}` : money(Number(amount))}</span>
                        </div>
                      ))}
                      <div className="flex justify-between gap-3 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800">
                        <span>Net payout</span><span>{money(selectedPayment.amount)}</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Journey</h3>
                    <div className="space-y-0">
                      {[
                        { title: "Submitted", detail: selectedPayment.submitted, state: "complete" },
                        { title: "Approved", detail: "Approval recorded", state: "complete" },
                        { title: "Processing", detail: "Current stage · transfer not confirmed", state: "current" },
                        { title: "Paid", detail: "Pending bank confirmation", state: "pending" },
                      ].map((step, index, steps) => (
                        <div key={step.title} className="flex min-h-12 gap-3">
                          <div className="flex w-5 shrink-0 flex-col items-center">
                            {step.state === "complete"
                              ? <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                              : step.state === "current"
                                ? <Clock3 size={17} className="shrink-0 text-violet-700" />
                                : <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-gray-300 bg-white" />}
                            {index < steps.length - 1 && <span className="my-1 w-px flex-1 bg-gray-200" />}
                          </div>
                          <div className="pb-3">
                            <p className={`text-sm font-medium ${step.state === "current" ? "text-violet-800" : step.state === "complete" ? "text-gray-800" : "text-gray-500"}`}>{step.title}{step.state === "current" ? " · Current" : ""}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Information</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Freelancer</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.freelancer}</p>
                        <p className="mt-0.5 break-all text-xs text-gray-500">{selectedPayment.email}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Project</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.project}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Client</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.company}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3">
                        <p className="text-[11px] text-gray-500">Masked bank account</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.bank} · {selectedPayment.accountName}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{selectedPayment.accountNumber}</p>
                      </div>
                      <div className="min-w-0 rounded-lg border border-gray-200 p-3 sm:col-span-2">
                        <p className="text-[11px] text-gray-500">Payment reference</p>
                        <p className="mt-1 break-all text-sm font-medium text-gray-900">{selectedPayment.receiptReference}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-gray-500">Transfer not confirmed.</p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Admin Notes</h3>
                    <div className="space-y-2">
                      {selectedPayment.notes.map((note, index) => (
                        <div key={`${note.date}-${index}`} className="flex gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3.5">
                          <MessageSquareText size={17} className="mt-0.5 shrink-0 text-violet-600" />
                          <div>
                            <p className="text-sm leading-5 text-gray-700">{note.text}</p>
                            <p className="mt-1.5 text-[11px] text-gray-500">{note.author} · {note.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              ) : selectedPayment.status === "Approved" ? (
                <div className="space-y-6">
                  <section className="rounded-xl bg-[#7600C9] p-5 text-white shadow-sm sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">Payment approved</p>
                        <h3 className="mt-2 text-sm font-medium text-white/90">Net payout amount</h3>
                        <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{money(selectedPayment.amount)}</p>
                      </div>
                      <CheckCircle2 size={24} className="shrink-0 text-white/90" />
                    </div>
                    <p className="mt-4 border-t border-white/20 pt-3 text-xs leading-5 text-white/80">
                      Approval recorded. Transfer not confirmed.
                    </p>
                  </section>

                  <section>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-gray-900">Payment Record</h3>
                      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-violet-700">Record</span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                        <div className="space-y-3 p-4">
                          <div>
                            <p className="text-[11px] text-gray-500">Payment ID</p>
                            <p className="mt-0.5 break-all text-sm font-semibold text-gray-900">{selectedPayment.id}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500">Payment reference</p>
                            <p className="mt-0.5 break-all text-sm font-medium text-gray-800">{selectedPayment.receiptReference}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500">Freelancer</p>
                            <p className="mt-0.5 text-sm font-medium text-gray-800">{selectedPayment.freelancer}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500">Masked bank account</p>
                            <p className="mt-0.5 text-sm font-medium text-gray-800">{selectedPayment.bank} · {selectedPayment.accountName} · {selectedPayment.accountNumber}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500">Project</p>
                            <p className="mt-0.5 text-sm font-medium text-gray-800">{selectedPayment.project}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500">Client</p>
                            <p className="mt-0.5 text-sm font-medium text-gray-800">{selectedPayment.company}</p>
                          </div>
                        </div>
                        <div className="space-y-3 bg-gray-50/60 p-4">
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-gray-500">Gross amount</span>
                            <span className="font-medium text-gray-800">{money(selectedPayment.base + selectedPayment.bonus)}</span>
                          </div>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-gray-500">Platform fee</span>
                            <span className="font-medium text-gray-800">{money(selectedPayment.fee)}</span>
                          </div>
                          <div className="flex justify-between gap-3 rounded-lg bg-violet-100 px-3 py-2.5 text-sm">
                            <span className="font-semibold text-violet-800">Net payout</span>
                            <span className="font-bold text-violet-800">{money(selectedPayment.amount)}</span>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500">Request date</p>
                            <p className="mt-0.5 text-sm font-medium text-gray-800">{selectedPayment.submitted}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500">Payment method</p>
                            <p className="mt-0.5 text-sm font-medium text-gray-800">Bank transfer · not confirmed</p>
                          </div>
                          <p className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-[11px] leading-4 text-amber-900">
                            Payment record only. Transfer not confirmed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Payment Journey</h3>
                    <div className="space-y-0">
                      {[
                        { title: "Payment request submitted", detail: selectedPayment.submitted, complete: true },
                        { title: "Admin approval recorded", detail: "Approved", complete: true },
                        { title: "Bank transfer", detail: "Pending bank confirmation · no transfer initiated", complete: false },
                      ].map((step, index, steps) => (
                        <div key={step.title} className="flex min-h-12 gap-3">
                          <div className="flex w-5 shrink-0 flex-col items-center">
                            {step.complete
                              ? <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
                              : <Clock3 size={17} className="shrink-0 text-amber-600" />}
                            {index < steps.length - 1 && <span className="my-1 w-px flex-1 bg-gray-200" />}
                          </div>
                          <div className="pb-3">
                            <p className={`text-sm font-medium ${step.complete ? "text-gray-800" : "text-amber-800"}`}>{step.title}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-base font-semibold text-gray-900">Admin Note</h3>
                    <div className="flex gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3.5">
                      <MessageSquareText size={17} className="mt-0.5 shrink-0 text-violet-600" />
                      <div>
                        <p className="text-sm leading-5 text-gray-700">{selectedPayment.notes[selectedPayment.notes.length - 1]?.text ?? "No admin note is available."}</p>
                        <p className="mt-1.5 text-[11px] text-gray-500">{selectedPayment.notes[selectedPayment.notes.length - 1]?.author ?? "Admin"} · {selectedPayment.notes[selectedPayment.notes.length - 1]?.date ?? selectedPayment.submitted}</p>
                      </div>
                    </div>
                  </section>
                </div>
              ) : (
                <>
              <div className={`flex flex-wrap items-start justify-between gap-3 rounded-xl p-4 ${
                selectedPayment.status === "Pending Approval"
                  ? "bg-[#7600C9] text-white shadow-sm"
                  : "border border-gray-200 bg-white"
              }`}>
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wide ${selectedPayment.status === "Pending Approval" ? "text-white/75" : "text-gray-500"}`}>Net payout</p>
                  <p className={`mt-1 text-2xl font-bold ${selectedPayment.status === "Pending Approval" ? "text-white" : "text-gray-900"}`}>{money(selectedPayment.amount)}</p>
                  <p className={`mt-1 text-xs ${selectedPayment.status === "Pending Approval" ? "text-white/75" : "text-gray-500"}`}>{selectedPayment.period}</p>
                </div>
                {selectedPayment.status !== "Pending Approval" && <StatusBadge status={selectedPayment.status} />}
              </div>

              <div className="mt-4 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3.5 text-amber-900">
                <span className="mt-0.5 shrink-0"><Clock3 size={17} /></span>
                <div>
                  <p className="text-sm font-semibold">Awaiting your decision</p>
                  <p className="mt-0.5 text-xs leading-5">Review the freelancer’s submission and verification details. Approval updates the payment record only; it will not initiate a transfer.</p>
                </div>
              </div>

              <section className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">Verification checklist</h3>
                <div className="space-y-2.5">
                  {[
                    { label: "Freelancer profile verified", complete: false },
                    {
                      label: "Project milestone reviewed",
                      complete: ["Approved", "Processing", "Paid"].includes(selectedPayment.status),
                    },
                    { label: "Payout details on file", complete: true },
                  ].map(({ label, complete }) => (
                    <div key={label} className={`flex items-center gap-2.5 text-sm ${
                      selectedPayment.status === "Pending Approval"
                        ? complete
                          ? "rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3"
                          : "rounded-lg border border-rose-200 bg-rose-50 px-3 py-3"
                        : ""
                    }`}>
                      {selectedPayment.status === "Pending Approval"
                        ? complete
                          ? <Check size={17} className="shrink-0 text-emerald-700" />
                          : <X size={17} className="shrink-0 text-rose-700" />
                        : complete
                          ? <CheckCircle2 size={17} className="text-emerald-600" />
                          : <Clock3 size={17} className="text-amber-600" />}
                      <span className="text-gray-700">{label}</span>
                      <span className={`ml-auto text-xs ${complete ? "text-emerald-700" : selectedPayment.status === "Pending Approval" ? "text-rose-700" : "text-amber-700"}`}>{complete ? "On file" : label === "Freelancer profile verified" ? "Not recorded" : "Review needed"}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">Freelancer & project</h3>
                <div className={`grid gap-3 ${selectedPayment.status === "Pending Approval" ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
                  <div className="min-w-0 rounded-lg border border-gray-200 p-3"><p className="flex items-center gap-1.5 text-xs text-gray-500"><UserRound size={14} /> Freelancer</p><p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.freelancer}</p><p className="mt-0.5 break-all text-xs text-gray-500">{selectedPayment.email}</p></div>
                  <div className="min-w-0 rounded-lg border border-gray-200 p-3"><p className="flex items-center gap-1.5 text-xs text-gray-500"><Building2 size={14} /> {selectedPayment.status === "Pending Approval" ? "Project & client" : "Company"}</p><p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.status === "Pending Approval" ? selectedPayment.project : selectedPayment.company}</p><p className="mt-0.5 text-xs text-gray-500">{selectedPayment.status === "Pending Approval" ? selectedPayment.company : selectedPayment.project}</p></div>
                </div>
              </section>

              <section className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">Payment breakdown</h3>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  {[
                    ["Project fee", selectedPayment.base],
                    ["Bonus", selectedPayment.bonus],
                    ["Tax withheld", -selectedPayment.tax],
                    ["Platform fee", -selectedPayment.fee],
                  ].map(([label, amount]) => (
                    <div key={String(label)} className="flex justify-between border-b border-gray-100 px-3.5 py-2.5 text-sm last:border-0"><span className="text-gray-500">{String(label)}</span><span className="font-medium text-gray-800">{Number(amount) < 0 ? `−${money(Math.abs(Number(amount)))}` : money(Number(amount))}</span></div>
                  ))}
                  <div className="flex justify-between bg-violet-50 px-3.5 py-3 text-sm font-semibold text-violet-800"><span>Net amount</span><span>{money(selectedPayment.amount)}</span></div>
                </div>
              </section>

              <section className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">Payout details & receipt</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">Bank</p><p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.bank}</p></div>
                  <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">Account</p><p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.accountName} · {selectedPayment.accountNumber}</p></div>
                  <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">Receipt reference</p><p className="mt-1 text-sm font-medium text-gray-900">{selectedPayment.receiptReference}</p></div>
                  <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">Receipt status</p><p className="mt-1 text-sm font-medium text-gray-900">Not issued</p></div>
                </div>
                <p className="mt-2 text-xs text-gray-500">Payment record only. Transfer not confirmed.</p>
              </section>

              <section className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">Payment journey</h3>
                <div className="space-y-0">
                  {["Submitted", "In review", "Approved", "Processing", "Paid"].map((stage, index) => {
                    const completeIndex: Record<PaymentStatus, number> = {
                      "Pending Approval": 0, Approved: 2, Processing: 3, Paid: 4, "On Hold": 1, Rejected: 1, "Request More Information": 1,
                    };
                    const done = index <= completeIndex[selectedPayment.status];
                    const exceptional = index === 1 && (selectedPayment.status === "On Hold" || selectedPayment.status === "Rejected" || selectedPayment.status === "Request More Information");
                    return (
                      <div key={stage} className="flex min-h-9 items-start gap-3">
                        <div className="flex w-4 flex-col items-center">
                          {exceptional ? <AlertTriangle size={15} className="text-amber-600" /> : done ? <Check size={15} className="text-emerald-600" /> : <span className="mt-1 h-2 w-2 rounded-full bg-gray-300" />}
                          {index < 4 && <span className="my-1 min-h-3 w-px flex-1 bg-gray-200" />}
                        </div>
                        <span className={`pb-2 text-xs ${done ? "font-medium text-gray-800" : "text-gray-400"}`}>{exceptional ? selectedPayment.status : stage}{index === 0 ? ` · ${selectedPayment.submitted}` : ""}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Notes & activity</h3>
                  <button type="button" onClick={() => { setDialogText(""); setDialog({ kind: "note" }); }} className="inline-flex items-center gap-1 text-xs font-medium text-violet-700 hover:text-violet-900"><Plus size={14} /> Add note</button>
                </div>
                <div className="space-y-3">
                  {selectedPayment.notes.map((note, index) => (
                    <div key={`${note.date}-${index}`} className="flex gap-2.5 rounded-lg border border-gray-100 p-3">
                      <MessageSquareText size={16} className="mt-0.5 shrink-0 text-gray-400" />
                      <div><p className="text-sm text-gray-700">{note.text}</p><p className="mt-1 text-xs text-gray-400">{note.author} · {note.date}</p></div>
                    </div>
                  ))}
                </div>
              </section>
                </>
              )}
            </div>
            <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-4 sm:px-7">
              {selectedPayment.status === "Pending Approval" ? (
                <>
                  <div className="mb-3 flex items-start gap-2 text-xs text-gray-500"><AlertTriangle size={15} className="shrink-0 text-amber-600" /><span>Actions update this payment record only. No transfer or notification will occur.</span></div>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => openAction("Approved", "Approve this payment?", "This changes the local record only. It will not initiate a bank transfer.", "Approve")} className="rounded-lg bg-violet-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-violet-800">Approve Payout</button>
                    <button type="button" onClick={() => openAction("On Hold", "Put this payment on hold?", "Add a reason so the local review history is clear.", "Place on hold", true)} className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Put On Hold</button>
                    <button type="button" onClick={() => { setDialogText(""); setDialog({ kind: "information" }); }} className="rounded-lg border border-violet-200 px-3 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-50">Request Info</button>
                    <button type="button" onClick={() => openAction("Rejected", "Reject this payment?", "This records a rejection locally; no message will be sent.", "Reject", true)} className="rounded-lg border border-rose-200 px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">Reject</button>
                  </div>
                </>
              ) : selectedPayment.status === "Approved" ? (
                <>
                  <p className="mb-3 text-center text-[11px] leading-4 text-gray-500">Payment records are not proof of payment. Transfer not confirmed.</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => {
                        downloadDemoDocument(selectedPayment, "receipt");
                        showToast("Payment record downloaded. Transfer not confirmed.");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-violet-800"
                    >
                      <ArrowDownToLine size={16} /> Download Receipt
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        downloadDemoDocument(selectedPayment, "invoice");
                        showToast("Invoice downloaded.");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-violet-200 px-3 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-50"
                    >
                      <FileText size={16} /> Invoice
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast(`Project: ${selectedPayment.project} · ${selectedPayment.company}`)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Building2 size={16} /> View Project
                    </button>
                  </div>
                </>
              ) : selectedPayment.status === "Paid" ? (
                <>
                  <p className="mb-3 text-center text-[11px] leading-4 text-gray-500">Payment records are not proof of payment. Transfer not confirmed.</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => {
                        downloadDemoDocument(selectedPayment, "receipt");
                        showToast("Payment record downloaded. Transfer not confirmed.");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      <ArrowDownToLine size={16} /> Download Receipt
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        downloadDemoDocument(selectedPayment, "invoice");
                        showToast("Invoice downloaded.");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 px-3 py-2.5 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
                    >
                      <FileText size={16} /> Download Invoice
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast(`Project: ${selectedPayment.project} · ${selectedPayment.company}`)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Building2 size={16} /> View Project
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3 flex items-start gap-2 text-xs text-gray-500"><AlertTriangle size={15} className="shrink-0 text-amber-600" /><span>Actions update this payment record only. No transfer or notification will occur.</span></div>
                  <div className="flex flex-wrap gap-2">{actionButtons(selectedPayment)}</div>
                </>
              )}
            </div>
          </aside>
        </div>
      )}

      {dialog && selectedPayment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-950/50 p-4">
          <section role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="dialog-title" className="text-lg font-semibold text-gray-900">
                  {dialog.kind === "information" ? "Request more information" : dialog.kind === "note" ? "Add an internal note" : dialog.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {dialog.kind === "information"
                    ? "Write your request. It will be saved here only and will not be sent."
                    : dialog.kind === "note"
                      ? "Add a note to this payment record."
                      : dialog.description}
                </p>
              </div>
              <button type="button" aria-label="Close dialog" onClick={() => setDialog(null)} className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"><X size={19} /></button>
            </div>
            {(dialog.kind === "information" || dialog.kind === "note" || (dialog.kind === "confirm" && dialog.needsReason)) && (
              <label className="mt-4 block text-sm font-medium text-gray-700">
                {dialog.kind === "information" ? "Information requested" : dialog.kind === "note" ? "Note" : "Reason"}
                <textarea value={dialogText} onChange={(event) => setDialogText(event.target.value)} rows={3} placeholder="Add a brief note..." className="mt-1.5 w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm font-normal outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
              </label>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setDialog(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="button" onClick={submitDialog} className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800">
                {dialog.kind === "information" ? "Save request" : dialog.kind === "note" ? "Add note" : dialog.button}
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[70] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-start gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg sm:left-auto sm:right-6 sm:translate-x-0">
          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />{toast}
        </div>
      )}
    </div>
  );
}

export default FreelancerPayments;