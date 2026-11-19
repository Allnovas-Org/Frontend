import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpRight,
  Banknote,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  GraduationCap,
  Search,
  ShieldAlert,
  Wallet,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TransactionStatus = "Completed" | "Pending" | "Processing" | "Refunded" | "Disputed" | "On Hold";
type TransactionDirection = "Inflow" | "Outflow";
type TransactionCategory = "Course Payment" | "Internship Payment" | "Other";

type Transaction = {
  id: string;
  party: string;
  email: string;
  role: string;
  type: string;
  category: TransactionCategory;
  date: string;
  direction: TransactionDirection;
  amount: number;
  fee: number;
  status: TransactionStatus;
  method: string;
  channel: string;
  reference: string;
  relatedRecord: string;
  description: string;
  initials: string;
  avatar: string;
};

type ConfirmAction = {
  transactionId: string;
  action: "Process Now" | "Release Hold & Approve" | "Resolve Dispute";
} | null;

const transactions: Transaction[] = [
  {
    id: "TXN-2026-0012",
    party: "Michael Chen",
    email: "michael.chen@example.org",
    role: "Tutor",
    type: "Tutor Payout",
    category: "Other",
    date: "2026-11-14T15:30:00",
    direction: "Outflow",
    amount: 2400000,
    fee: 0,
    status: "On Hold",
    method: "Bank Transfer",
    channel: "Zenith Bank",
    reference: "—",
    relatedRecord: "TP-2026-0103",
    description: "Monthly payout — foundational mathematics course.",
    initials: "MC",
    avatar: "bg-sky-700",
  },
  {
    id: "TXN-2026-0011",
    party: "Jane Smith",
    email: "jane.smith@example.org",
    role: "Tutor",
    type: "Tutor Payout",
    category: "Other",
    date: "2026-11-12T13:22:00",
    direction: "Outflow",
    amount: 1800000,
    fee: 0,
    status: "Pending",
    method: "Bank Transfer",
    channel: "First Bank",
    reference: "—",
    relatedRecord: "TP-2026-0102",
    description: "Monthly payout — learning platform.",
    initials: "JS",
    avatar: "bg-amber-700",
  },
  {
    id: "TXN-2026-0010",
    party: "Eniola Adeyemo",
    email: "eniola.a@example.org",
    role: "Student",
    type: "Course Payment",
    category: "Course Payment",
    date: "2026-11-11T09:14:00",
    direction: "Inflow",
    amount: 150000,
    fee: 3000,
    status: "Completed",
    method: "Card",
    channel: "GTBank",
    reference: "GTB-20261111-001",
    relatedRecord: "CRS-2026-1001",
    description: "Full payment — UI/UX Design Fundamentals.",
    initials: "EA",
    avatar: "bg-violet-700",
  },
  {
    id: "TXN-2026-0009",
    party: "Amina Danladi",
    email: "amina.danladi@example.org",
    role: "Freelancer",
    type: "Freelancer Payment",
    category: "Other",
    date: "2026-11-10T11:05:00",
    direction: "Outflow",
    amount: 850000,
    fee: 0,
    status: "Processing",
    method: "Bank Transfer",
    channel: "Access Bank",
    reference: "—",
    relatedRecord: "FP-2026-0102",
    description: "Project milestone 2 payout — LoanPadi backend project.",
    initials: "AD",
    avatar: "bg-blue-700",
  },
  {
    id: "TXN-2026-0008",
    party: "Sarah Johnson",
    email: "sarah.johnson@example.org",
    role: "Student",
    type: "Refund",
    category: "Course Payment",
    date: "2026-11-08T16:55:00",
    direction: "Outflow",
    amount: 90000,
    fee: 0,
    status: "Refunded",
    method: "Card",
    channel: "GTBank",
    reference: "GTB-20261108-004",
    relatedRecord: "CRS-2026-1003",
    description: "Refund status recorded — Product Design Mastery.",
    initials: "SJ",
    avatar: "bg-rose-700",
  },
  {
    id: "TXN-2026-0007",
    party: "Ibrahim Musa",
    email: "ibrahim.musa@example.org",
    role: "Freelancer",
    type: "Freelancer Payment",
    category: "Other",
    date: "2026-11-06T11:20:00",
    direction: "Outflow",
    amount: 400000,
    fee: 0,
    status: "Disputed",
    method: "Bank Transfer",
    channel: "GTBank",
    reference: "—",
    relatedRecord: "FP-2026-0202",
    description: "Final payment — Bolt Nigeria brand video.",
    initials: "IM",
    avatar: "bg-rose-800",
  },
  {
    id: "TXN-2026-0006",
    party: "Kemi Bello",
    email: "kemi.bello@example.org",
    role: "Student",
    type: "Internship Payment",
    category: "Internship Payment",
    date: "2026-11-04T10:36:00",
    direction: "Inflow",
    amount: 220000,
    fee: 4400,
    status: "Completed",
    method: "Card",
    channel: "Paystack",
    reference: "PS-20261104-006",
    relatedRecord: "INT-2026-0201",
    description: "Internship programme tuition — product design.",
    initials: "KB",
    avatar: "bg-emerald-700",
  },
  {
    id: "TXN-2026-0005",
    party: "Uche Okoro",
    email: "uche.okoro@example.org",
    role: "Client",
    type: "Client Payment",
    category: "Other",
    date: "2026-10-28T14:18:00",
    direction: "Inflow",
    amount: 350000,
    fee: 3500,
    status: "Completed",
    method: "Bank Transfer",
    channel: "GTBank",
    reference: "GTB-20261028-005",
    relatedRecord: "PRJ-2026-0320",
    description: "Project funding — commerce platform redesign.",
    initials: "UO",
    avatar: "bg-cyan-700",
  },
  {
    id: "TXN-2026-0004",
    party: "Dara James",
    email: "dara.james@example.org",
    role: "Freelancer",
    type: "Withdrawal",
    category: "Other",
    date: "2026-10-22T12:05:00",
    direction: "Outflow",
    amount: 125000,
    fee: 1250,
    status: "Completed",
    method: "Bank Transfer",
    channel: "UBA",
    reference: "UBA-20261022-009",
    relatedRecord: "FP-2026-0095",
    description: "Available balance withdrawal.",
    initials: "DJ",
    avatar: "bg-orange-700",
  },
  {
    id: "TXN-2026-0003",
    party: "Yemi Alabi",
    email: "yemi.alabi@example.org",
    role: "Student",
    type: "Course Payment",
    category: "Course Payment",
    date: "2026-09-17T10:20:00",
    direction: "Inflow",
    amount: 120000,
    fee: 2400,
    status: "Pending",
    method: "Card",
    channel: "Paystack",
    reference: "—",
    relatedRecord: "CRS-2026-0931",
    description: "Course enrolment — Data Analytics Essentials.",
    initials: "YA",
    avatar: "bg-indigo-700",
  },
  {
    id: "TXN-2026-0002",
    party: "Tunde Fashola",
    email: "tunde.fashola@example.org",
    role: "Student",
    type: "Internship Payment",
    category: "Internship Payment",
    date: "2026-08-08T09:30:00",
    direction: "Outflow",
    amount: 80000,
    fee: 0,
    status: "Completed",
    method: "Bank Transfer",
    channel: "Access Bank",
    reference: "AB-20260808-002",
    relatedRecord: "INT-2026-0140",
    description: "Internship stipend record — digital marketing.",
    initials: "TF",
    avatar: "bg-fuchsia-700",
  },
  {
    id: "TXN-2026-0001",
    party: "Sarah Ade",
    email: "sarah.ade@example.org",
    role: "Student",
    type: "Internship Payment",
    category: "Internship Payment",
    date: "2026-07-20T13:10:00",
    direction: "Inflow",
    amount: 200000,
    fee: 4000,
    status: "Completed",
    method: "Card",
    channel: "GTBank",
    reference: "GTB-20260720-012",
    relatedRecord: "INT-2026-0108",
    description: "Internship programme tuition — frontend development.",
    initials: "SA",
    avatar: "bg-pink-700",
  },
];

const statusStyles: Record<TransactionStatus, { badge: string; card: string; icon: string; dot: string }> = {
  Completed: { badge: "bg-emerald-50 text-emerald-700", card: "bg-emerald-950", icon: "bg-emerald-800", dot: "bg-emerald-500" },
  Pending: { badge: "bg-amber-50 text-amber-700", card: "bg-amber-900", icon: "bg-amber-800", dot: "bg-amber-500" },
  Processing: { badge: "bg-violet-50 text-violet-700", card: "bg-violet-950", icon: "bg-violet-800", dot: "bg-violet-500" },
  Refunded: { badge: "bg-gray-100 text-gray-600", card: "bg-gray-500", icon: "bg-gray-600", dot: "bg-gray-400" },
  Disputed: { badge: "bg-rose-50 text-rose-700", card: "bg-rose-950", icon: "bg-rose-900", dot: "bg-rose-500" },
  "On Hold": { badge: "bg-orange-50 text-orange-800", card: "bg-amber-950", icon: "bg-amber-900", dot: "bg-orange-500" },
};

const typeColors: Record<string, string> = {
  "Course Payment": "#7c3aed",
  "Internship Payment": "#a78bfa",
  "Tutor Payout": "#c4b5fd",
  "Freelancer Payment": "#ddd6fe",
  Refund: "#64748b",
  Withdrawal: "#8b5cf6",
  "Client Payment": "#c084fc",
};

const timelineCurrentRing: Record<TransactionStatus, string> = {
  Completed: "border-emerald-500",
  Pending: "border-amber-500",
  Processing: "border-violet-500",
  Refunded: "border-gray-400",
  Disputed: "border-rose-500",
  "On Hold": "border-orange-500",
};

const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const dateTime = (value: string) => {
  const date = new Date(value);
  return {
    date: new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric" }).format(date),
    time: new Intl.DateTimeFormat("en-NG", { hour: "2-digit", minute: "2-digit", hour12: true }).format(date),
  };
};

const csvCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;

function Transactions() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [periodFilter, setPeriodFilter] = useState("Any time");
  const [category, setCategory] = useState<"All" | "Course Payment" | "Internship Payment">("All");
  const [showAll, setShowAll] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [toast, setToast] = useState("");

  const selectedTransaction = transactions.find((transaction) => transaction.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedId && !confirmAction) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
        setConfirmAction(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId, confirmAction]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const searchTerm = search.trim().toLowerCase();
    const cutoff = periodFilter === "This month"
      ? new Date(now.getFullYear(), now.getMonth(), 1)
      : periodFilter === "Last 30 days"
        ? new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        : periodFilter === "Last 90 days"
          ? new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          : null;

    return transactions.filter((transaction) => {
      const matchesCategory = category === "All" || transaction.category === category;
      const matchesStatus = statusFilter === "All statuses" || transaction.status === statusFilter;
      const matchesPeriod = !cutoff || new Date(transaction.date) >= cutoff;
      const searchFields = [transaction.party, transaction.id, transaction.type, transaction.relatedRecord, transaction.reference];
      const matchesSearch = !searchTerm || searchFields.some((field) => field.toLowerCase().includes(searchTerm));
      return matchesCategory && matchesStatus && matchesPeriod && matchesSearch;
    });
  }, [category, periodFilter, search, statusFilter]);

  const visibleTransactions = showAll ? filteredTransactions : filteredTransactions.slice(0, 7);

  const monthlyVolume = useMemo(() => {
    const buckets = new Map<string, { monthDate: Date; inflow: number; outflow: number }>();
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const current = buckets.get(key) ?? { monthDate: new Date(date.getFullYear(), date.getMonth(), 1), inflow: 0, outflow: 0 };
      current[transaction.direction === "Inflow" ? "inflow" : "outflow"] += transaction.amount;
      buckets.set(key, current);
    });
    return [...buckets.values()]
      .sort((a, b) => a.monthDate.getTime() - b.monthDate.getTime())
      .map((bucket) => ({
        month: new Intl.DateTimeFormat("en", { month: "short" }).format(bucket.monthDate),
        inflow: bucket.inflow,
        outflow: bucket.outflow,
      }));
  }, []);

  const typeDistribution = useMemo(() => {
    const counts = new Map<string, number>();
    transactions.forEach((transaction) => counts.set(transaction.type, (counts.get(transaction.type) ?? 0) + 1));
    return [...counts.entries()]
      .map(([name, value]) => ({ name, value, color: typeColors[name] ?? "#c4b5fd" }))
      .sort((a, b) => b.value - a.value);
  }, []);

  const totalVolume = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const pendingPayouts = transactions
    .filter((transaction) => transaction.direction === "Outflow" && ["Pending", "Processing", "On Hold"].includes(transaction.status))
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const paidThisMonth = transactions
    .filter((transaction) => {
      const date = new Date(transaction.date);
      const now = new Date();
      return transaction.status === "Completed" && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalRefunds = transactions
    .filter((transaction) => transaction.status === "Refunded")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const cards = [
    { title: "Total Transactions", value: money(totalVolume), detail: `${transactions.length} transaction records`, icon: ArrowLeftRight, tone: "bg-violet-50 text-violet-700" },
    { title: "Pending Payouts", value: money(pendingPayouts), detail: "Outflow records awaiting action", icon: Clock3, tone: "bg-amber-50 text-amber-700" },
    { title: "Paid This Month", value: money(paidThisMonth), detail: "Records marked Completed this month", icon: Banknote, tone: "bg-emerald-50 text-emerald-700" },
    { title: "Total Refunds", value: money(totalRefunds), detail: "Records marked Refunded", icon: ArrowDownLeft, tone: "bg-gray-100 text-gray-600" },
  ];

  const downloadStatement = (records = visibleTransactions) => {
    if (!records.length) {
      setToast("No transactions to include in the statement.");
      return;
    }
    const headers = ["Party", "Transaction ID", "Type", "Date and Time", "Direction", "Amount (NGN)", "Status", "Payment Method", "Channel", "Reference", "Related Record"];
    const rows = records.map((transaction) => [
      transaction.party,
      transaction.id,
      transaction.type,
      transaction.date,
      transaction.direction,
      transaction.amount,
      transaction.status,
      transaction.method,
      transaction.channel,
      transaction.reference,
      transaction.relatedRecord,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = records.length === 1
      ? `transaction-${records[0].id}-record.csv`
      : "allnova-transactions-statement.csv";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
      link.remove();
    }, 1000);
    setToast(records.length === 1 ? "Transaction record downloaded." : "Transaction statement downloaded.");
  };

  const showAllTransactions = () => {
    setCategory("All");
    setStatusFilter("All statuses");
    setPeriodFilter("Any time");
    setSearch("");
    setShowAll(true);
    document.getElementById("recent-transactions")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeDetails = () => setSelectedId(null);
  const reportPeriod = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date());

  return (
    <div className="space-y-5 pb-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-[28px]">Payment Overview</h1>
          <p className="mt-1.5 text-sm text-gray-500">Platform-wide financial summary · {reportPeriod}</p>
        </div>
        <button
          type="button"
          onClick={() => downloadStatement()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7600C9] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6400AA] focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2"
        >
          <ArrowDownToLine size={17} /> Download Statement
        </button>
      </header>

      <section aria-label="Transaction summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, detail, icon: Icon, tone }) => (
          <article key={title} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-gray-500">{title}</p>
              <span className={`rounded-lg p-2 ${tone}`}><Icon size={17} /></span>
            </div>
            <p className="mt-3 text-xl font-semibold tracking-tight text-gray-900">{value}</p>
            <p className="mt-2 text-[11px] text-gray-500">{detail}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.9fr)]">
        <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Monthly Transaction Volume</h2>
              <p className="mt-1 text-[11px] text-gray-500">
                {monthlyVolume.length ? `${monthlyVolume[0].month}–${monthlyVolume[monthlyVolume.length - 1].month} 2026` : "No transaction history"}
              </p>
            </div>
            <div className="flex gap-4 text-[10px] text-gray-500">
              <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-violet-600" /> Inflow</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-indigo-300" /> Outflow</span>
            </div>
          </div>
          <div className="mt-4 h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyVolume} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="transactionInflowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="transactionOutflowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a5b4fc" stopOpacity={0.16} />
                    <stop offset="95%" stopColor="#a5b4fc" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f1f0f5" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9ca3af" }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fill: "#9ca3af" }}
                  tickFormatter={(value: number) => `${value === 0 ? 0 : (value / 1000000).toFixed(1)}M`}
                  width={38}
                />
                <Tooltip
                  formatter={(value, name) => [money(Number(value)), name === "inflow" ? "Inflow" : "Outflow"]}
                  contentStyle={{ borderRadius: 10, borderColor: "#e5e7eb", fontSize: 12 }}
                />
                <Area type="monotone" dataKey="inflow" stroke="#7c3aed" strokeWidth={2} fill="url(#transactionInflowGradient)" />
                <Area type="monotone" dataKey="outflow" stroke="#a5b4fc" strokeWidth={2} fill="url(#transactionOutflowGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-[10px] text-gray-400">Amounts grouped from the transaction records shown in this report.</p>
        </article>

        <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Transaction Type</h2>
            <p className="mt-1 text-[11px] text-gray-500">Distribution by transaction record count</p>
          </div>
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:items-center xl:flex-col xl:items-stretch">
            <div className="relative h-[154px] w-full max-w-[190px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={typeDistribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={66} paddingAngle={3} stroke="none">
                    {typeDistribution.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} records`, name]} contentStyle={{ borderRadius: 10, borderColor: "#e5e7eb", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-semibold text-gray-900">{transactions.length}</span>
                <span className="text-[10px] text-gray-500">Records</span>
              </div>
            </div>
            <ul className="grid w-full grid-cols-1 gap-x-4 gap-y-2 sm:min-w-0 sm:flex-1 xl:grid-cols-1">
              {typeDistribution.map((item) => (
                <li key={item.name} className="flex min-w-0 items-center gap-2 text-[10px]">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="min-w-0 flex-1 truncate text-gray-600">{item.name}</span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section id="recent-transactions" className="scroll-mt-24 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Recent Transactions</h2>
              <p className="mt-1 text-xs text-gray-500">{filteredTransactions.length} transaction records</p>
            </div>
            <button type="button" onClick={showAllTransactions} className="text-xs font-medium text-violet-700 hover:text-violet-900">
              View All
            </button>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Transaction category">
              {(["All", "Course Payment", "Internship Payment"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={category === value}
                  onClick={() => { setCategory(value); setShowAll(false); }}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    category === value
                      ? "border-violet-700 bg-violet-700 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-violet-200 hover:text-violet-700"
                  }`}
                >
                  {value === "All" ? "All Transactions" : value}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative block sm:w-56">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => { setSearch(event.target.value); setShowAll(false); }}
                  placeholder="Search transactions..."
                  aria-label="Search transactions"
                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />
              </label>
              <label className="relative block sm:w-36">
                <select
                  value={statusFilter}
                  onChange={(event) => { setStatusFilter(event.target.value); setShowAll(false); }}
                  aria-label="Filter by status"
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-xs text-gray-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                >
                  <option>All statuses</option>
                  {(["Completed", "Pending", "Processing", "Refunded", "Disputed", "On Hold"] as const).map((status) => <option key={status}>{status}</option>)}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </label>
              <label className="relative block sm:w-36">
                <select
                  value={periodFilter}
                  onChange={(event) => { setPeriodFilter(event.target.value); setShowAll(false); }}
                  aria-label="Filter by date"
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-xs text-gray-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                >
                  {["Any time", "This month", "Last 30 days", "Last 90 days"].map((period) => <option key={period}>{period}</option>)}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </label>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-violet-50/60">
                {["Party", "Transaction ID", "Type", "Date & Time", "Direction", "Amount", "Status", "Action"].map((heading) => (
                  <th key={heading} scope="col" className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-gray-600 first:pl-4 last:pr-4">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleTransactions.map((transaction) => {
                const time = dateTime(transaction.date);
                return (
                  <tr key={transaction.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70">
                    <td className="px-3 py-3 pl-4">
                      <div className="flex min-w-[150px] items-center gap-2.5">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${transaction.avatar}`}>
                          {transaction.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-gray-900">{transaction.party}</p>
                          <p className="mt-0.5 truncate text-[10px] text-gray-500">{transaction.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <p className="text-xs font-medium text-gray-900">{transaction.id}</p>
                      <p className="mt-0.5 text-[10px] text-gray-500">{transaction.relatedRecord}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex max-w-[130px] truncate rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-medium text-violet-700">{transaction.type}</span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <p className="text-xs text-gray-800">{time.date}</p>
                      <p className="mt-0.5 text-[10px] text-gray-500">{time.time}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${transaction.direction === "Inflow" ? "text-emerald-700" : "text-rose-600"}`}>
                        {transaction.direction === "Inflow" ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />}
                        {transaction.direction}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-gray-900">
                      {transaction.direction === "Outflow" ? "−" : "+"}{money(transaction.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 pr-4">
                      <button type="button" onClick={() => setSelectedId(transaction.id)} className="text-xs font-medium text-violet-700 hover:text-violet-900">
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
              {visibleTransactions.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-500">No transactions match these filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length > 7 && (
          <div className="flex justify-center border-t border-gray-100 p-3">
            <button type="button" onClick={() => setShowAll((value) => !value)} className="text-xs font-medium text-violet-700 hover:text-violet-900">
              {showAll ? "Show fewer" : `Show all ${filteredTransactions.length} records`}
            </button>
          </div>
        )}
      </section>

      {selectedTransaction && (
        <div
          className="fixed inset-0 z-[70] flex justify-end bg-gray-950/40"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDetails();
          }}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="transaction-drawer-title"
            className="flex h-full w-full max-w-[500px] flex-col bg-white shadow-2xl"
          >
            <TransactionDrawerHeader transaction={selectedTransaction} onClose={closeDetails} />
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
              <TransactionSummary transaction={selectedTransaction} />
              <DetailSection title="Transaction Details">
                <DetailRows rows={[
                  ["Transaction ID", selectedTransaction.id],
                  ["Date & Time", `${dateTime(selectedTransaction.date).date} · ${dateTime(selectedTransaction.date).time}`],
                  ["Type", selectedTransaction.type],
                  ["Direction", selectedTransaction.direction],
                  ["Method", selectedTransaction.method],
                  ["Bank / Channel", selectedTransaction.channel],
                  ["Reference", selectedTransaction.reference],
                  ["Related Record", selectedTransaction.relatedRecord],
                ]} />
              </DetailSection>

              <DetailSection title="Party Information">
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/70 p-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${selectedTransaction.avatar}`}>
                    {selectedTransaction.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-gray-900">{selectedTransaction.party}</p>
                    <p className="mt-0.5 truncate text-[10px] text-gray-500">{selectedTransaction.email}</p>
                    <p className="mt-1 text-[10px] text-violet-700">{selectedTransaction.role}</p>
                  </div>
                </div>
              </DetailSection>

              <DetailSection title="Amount Breakdown">
                <DetailRows rows={[
                  ["Gross Amount", money(selectedTransaction.amount)],
                  ["Processing Fee", selectedTransaction.fee ? `−${money(selectedTransaction.fee)}` : "₦0 (waived)"],
                  ["Net Amount", money(selectedTransaction.amount - selectedTransaction.fee)],
                ]} emphasizeLast />
              </DetailSection>

              <DetailSection title="Description">
                <p className="rounded-xl border border-gray-200 bg-gray-50/70 p-3 text-xs leading-5 text-gray-700">{selectedTransaction.description}</p>
              </DetailSection>

              <DetailSection title="Transaction Timeline">
                <TransactionTimeline transaction={selectedTransaction} />
              </DetailSection>
              <p className="rounded-lg bg-gray-50 px-3 py-2 text-[10px] leading-4 text-gray-500">
                Status reflects the transaction record. Bank settlement or refund completion is not independently verified.
              </p>
            </div>
            <TransactionDrawerFooter
              transaction={selectedTransaction}
              onConfirm={(action) => setConfirmAction({ transactionId: selectedTransaction.id, action })}
              onDownload={() => downloadStatement([selectedTransaction])}
              onClose={closeDetails}
            />
          </aside>
        </div>
      )}

      {confirmAction && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-gray-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConfirmAction(null);
          }}
        >
          <section role="dialog" aria-modal="true" aria-labelledby="confirm-title" className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-amber-50 p-2 text-amber-700"><ShieldAlert size={18} /></span>
              <div className="min-w-0 flex-1">
                <h2 id="confirm-title" className="text-base font-semibold text-gray-900">Confirm {confirmAction.action}</h2>
                <p className="mt-2 text-sm leading-5 text-gray-600">
                  This action requires a connected payment service. Confirming here will not initiate, release, settle, or resolve a payment, and no transaction status will be changed.
                </p>
                <p className="mt-2 text-xs text-gray-500">Transaction: {confirmAction.transactionId}</p>
              </div>
              <button type="button" aria-label="Close dialog" onClick={() => setConfirmAction(null)} className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"><X size={18} /></button>
            </div>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setConfirmAction(null)} className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button
                type="button"
                onClick={() => {
                  setToast(`No changes made. ${confirmAction.action} requires a connected payment service.`);
                  setConfirmAction(null);
                }}
                className="rounded-lg bg-[#7600C9] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6400AA]"
              >
                Acknowledge
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[100] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-start gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg sm:left-auto sm:right-6 sm:translate-x-0">
          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${statusStyles[status].badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[status].dot}`} />
      {status}
    </span>
  );
}

function TransactionDrawerHeader({ transaction, onClose }: { transaction: Transaction; onClose: () => void }) {
  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-3.5 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${transaction.avatar}`}>
          {transaction.initials}
        </span>
        <div className="min-w-0">
          <h2 id="transaction-drawer-title" className="truncate text-sm font-semibold text-gray-900">{transaction.id}</h2>
          <p className="mt-0.5 truncate text-[10px] text-gray-500">{transaction.type} · {transaction.party}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <StatusBadge status={transaction.status} />
        <button type="button" aria-label="Close transaction details" onClick={onClose} className="rounded-md border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
          <X size={16} />
        </button>
      </div>
    </header>
  );
}

function TransactionSummary({ transaction }: { transaction: Transaction }) {
  const Icon = transaction.type.includes("Payout") ? Wallet : transaction.type === "Refund" ? ArrowLeftRight : transaction.direction === "Inflow" ? GraduationCap : CreditCard;
  const recordDetail: Record<TransactionStatus, string> = {
    Completed: "Status marked Completed · transfer not independently verified",
    Pending: "Awaiting review · no payment action has been initiated",
    Processing: "Processing status on record · settlement unconfirmed",
    Refunded: "Refund status on record · refund completion unconfirmed",
    Disputed: "Dispute status on record · resolution pending",
    "On Hold": "On hold pending review · no payment action has been initiated",
  };
  const amountCaption = transaction.direction === "Inflow" ? "Amount Received" : "Amount Disbursed";
  return (
    <section className={`rounded-xl p-4 text-white shadow-sm ${statusStyles[transaction.status].card}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className={`rounded-lg p-2 ${statusStyles[transaction.status].icon}`}><Icon size={17} /></span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">{transaction.type}</p>
            <p className="mt-0.5 text-[10px] text-white/70">{transaction.id}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-medium">{transaction.status}</span>
      </div>
      <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.14em] text-white/65">{amountCaption}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{money(transaction.amount)}</p>
      <p className="mt-1 text-[10px] text-white/75">{dateTime(transaction.date).date} · {dateTime(transaction.date).time}</p>
      <p className="mt-2 border-t border-white/15 pt-2 text-[10px] leading-4 text-white/80">{recordDetail[transaction.status]}</p>
    </section>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">{title}</h3>
      {children}
    </section>
  );
}

function DetailRows({ rows, emphasizeLast = false }: { rows: [string, string][]; emphasizeLast?: boolean }) {
  return (
    <dl className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50/70">
      {rows.map(([label, value], index) => (
        <div key={label} className={`flex items-center justify-between gap-4 border-b border-gray-200 px-3 py-2 last:border-b-0 ${emphasizeLast && index === rows.length - 1 ? "bg-violet-50/80" : ""}`}>
          <dt className="shrink-0 text-[10px] text-gray-500">{label}</dt>
          <dd className={`min-w-0 break-all text-right text-[10px] ${emphasizeLast && index === rows.length - 1 ? "font-semibold text-violet-800" : "font-medium text-gray-800"}`}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function TransactionTimeline({ transaction }: { transaction: Transaction }) {
  const events: Record<TransactionStatus, { title: string; detail: string; state: "complete" | "current" | "pending" }[]> = {
    Completed: [
      { title: "Transaction recorded", detail: dateTime(transaction.date).date, state: "complete" },
      { title: "Status marked Completed", detail: "Record status only", state: "current" },
      { title: "Transfer confirmation", detail: "Not available", state: "pending" },
    ],
    Pending: [
      { title: "Transaction recorded", detail: dateTime(transaction.date).date, state: "complete" },
      { title: "Awaiting review", detail: "Current record status", state: "current" },
      { title: "Payment processing", detail: "Not started", state: "pending" },
    ],
    Processing: [
      { title: "Transaction recorded", detail: dateTime(transaction.date).date, state: "complete" },
      { title: "Processing status", detail: "Current record status", state: "current" },
      { title: "Settlement confirmation", detail: "Not available", state: "pending" },
    ],
    Refunded: [
      { title: "Transaction recorded", detail: dateTime(transaction.date).date, state: "complete" },
      { title: "Refund status recorded", detail: "Current record status", state: "current" },
      { title: "Refund confirmation", detail: "Not available", state: "pending" },
    ],
    Disputed: [
      { title: "Transaction recorded", detail: dateTime(transaction.date).date, state: "complete" },
      { title: "Dispute recorded", detail: "Current record status", state: "current" },
      { title: "Review outcome", detail: "Awaiting review", state: "pending" },
    ],
    "On Hold": [
      { title: "Transaction recorded", detail: dateTime(transaction.date).date, state: "complete" },
      { title: "Placed on hold", detail: "Current record status", state: "current" },
      { title: "Review outcome", detail: "Awaiting review", state: "pending" },
    ],
  };
  return (
    <ol className="space-y-0">
      {events[transaction.status].map((event, index, list) => (
        <li key={event.title} className="relative flex gap-3 pb-4 last:pb-0">
          <span className="relative flex w-4 shrink-0 justify-center">
            <span className={`z-10 mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
              event.state === "complete"
                ? "border-violet-600 bg-violet-600 text-white"
                : event.state === "current"
                  ? `${timelineCurrentRing[transaction.status]} bg-white`
                  : "border-gray-300 bg-white"
            }`}>
              {event.state === "complete" ? <Check size={10} strokeWidth={3} /> : event.state === "current" ? <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[transaction.status].dot}`} /> : null}
            </span>
            {index < list.length - 1 && <span className={`absolute top-4 bottom-0 w-px ${event.state === "complete" ? "bg-violet-300" : "bg-gray-200"}`} />}
          </span>
          <div className="min-w-0">
            <p className={`text-[11px] font-medium ${event.state === "pending" ? "text-gray-400" : "text-gray-800"}`}>{event.title}</p>
            <p className="mt-0.5 text-[9px] text-gray-500">{event.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function TransactionDrawerFooter({
  transaction,
  onConfirm,
  onDownload,
  onClose,
}: {
  transaction: Transaction;
  onConfirm: (action: NonNullable<ConfirmAction>["action"]) => void;
  onDownload: () => void;
  onClose: () => void;
}) {
  const action = transaction.status === "Pending"
    ? "Process Now"
    : transaction.status === "On Hold"
      ? "Release Hold & Approve"
      : transaction.status === "Disputed"
        ? "Resolve Dispute"
        : null;
  return (
    <footer className="shrink-0 border-t border-gray-100 bg-white px-4 py-3 sm:px-5">
      {action && (
        <button
          type="button"
          onClick={() => onConfirm(action)}
          className="mb-2.5 w-full rounded-lg bg-[#7600C9] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#6400AA]"
        >
          {action}
        </button>
      )}
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={onDownload} className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-800 hover:bg-emerald-100">
          <ArrowDownToLine size={14} /> Download Record
        </button>
        <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-3 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
          Close
        </button>
      </div>
      <p className="mt-2 text-center text-[9px] leading-4 text-gray-400">Downloads contain transaction records, not bank receipts or proof of settlement.</p>
    </footer>
  );
}

export default Transactions;