import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  Award,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  FileBadge,
  FileCheck2,
  GraduationCap,
  Mail,
  MapPin,
  Medal,
  Search,
  ShieldCheck,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import allnovaLogo from "../assets/AllNova black 2 (1).png";

type CertificateStatus = "Eligible" | "Pending Review" | "Issued" | "Rejected";
type EligibilityChecks = {
  progress: number;
  modulesFinished: boolean;
  assessmentScore: number;
  fullyPaid: boolean;
  tutorReview: boolean;
};
type CertificateStudent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  courseShort: string;
  tutor: string;
  tutorEmail: string;
  enrolledAt: string;
  completedAt: string;
  checks: EligibilityChecks;
  quizAverage: number;
  assignmentsPassed: boolean;
  attendance: number;
  status: CertificateStatus;
  certificateRef?: string;
  issuedAt?: string;
  rejectedReason?: string;
};
type MainTab = "Eligible Students" | "Issued Certificates";
type DialogState = { kind: "issue"; studentId: string } | { kind: "reject"; studentId: string } | null;
type LoadResult = { records: CertificateStudent[]; warning: string };

const STORAGE_KEY = "allnova.admin.certificate-records.v1";

const initialStudents: CertificateStudent[] = [
  {
    id: "STU-001",
    name: "Eniola Adeyemo",
    email: "eniola.a@example.org",
    phone: "+234 803 221 4490",
    course: "UI/UX Design Fundamentals",
    courseShort: "UI/UX Design",
    tutor: "Dr. Ngozi Eze",
    tutorEmail: "ngozi.eze@example.org",
    enrolledAt: "2026-03-10",
    completedAt: "2026-07-12",
    checks: { progress: 100, modulesFinished: true, assessmentScore: 94, fullyPaid: true, tutorReview: true },
    quizAverage: 94,
    assignmentsPassed: true,
    attendance: 100,
    status: "Eligible",
  },
  {
    id: "STU-002",
    name: "Fatima Bello",
    email: "fatima.bello@example.org",
    phone: "+234 815 672 3341",
    course: "Digital Marketing Mastery",
    courseShort: "Digital Marketing",
    tutor: "Bisi Okafor",
    tutorEmail: "bisi.okafor@example.org",
    enrolledAt: "2026-04-18",
    completedAt: "2026-07-08",
    checks: { progress: 100, modulesFinished: true, assessmentScore: 68, fullyPaid: true, tutorReview: false },
    quizAverage: 91,
    assignmentsPassed: true,
    attendance: 100,
    status: "Pending Review",
  },
  {
    id: "STU-003",
    name: "Yetunde Adeyemi",
    email: "yetunde.adeyemi@example.org",
    phone: "+234 813 990 4456",
    course: "Frontend Development",
    courseShort: "Frontend Dev",
    tutor: "Tunde Adeyemi",
    tutorEmail: "tunde.adeyemi@example.org",
    enrolledAt: "2026-02-10",
    completedAt: "2026-06-01",
    checks: { progress: 100, modulesFinished: true, assessmentScore: 96, fullyPaid: true, tutorReview: true },
    quizAverage: 96,
    assignmentsPassed: true,
    attendance: 100,
    status: "Issued",
    certificateRef: "CERT-2026-0028",
    issuedAt: "2026-06-03",
  },
  {
    id: "STU-004",
    name: "Wade Warren",
    email: "wade.warren@example.org",
    phone: "+234 802 555 1201",
    course: "UI/UX Design Fundamentals",
    courseShort: "UI/UX Design",
    tutor: "Dr. Ngozi Eze",
    tutorEmail: "ngozi.eze@example.org",
    enrolledAt: "2026-03-14",
    completedAt: "2026-07-12",
    checks: { progress: 100, modulesFinished: true, assessmentScore: 88, fullyPaid: true, tutorReview: true },
    quizAverage: 88,
    assignmentsPassed: true,
    attendance: 96,
    status: "Eligible",
  },
  {
    id: "STU-005",
    name: "Olivia Smith",
    email: "olivia.smith@example.org",
    phone: "+234 809 312 7760",
    course: "UI/UX Design Fundamentals",
    courseShort: "UI/UX Design",
    tutor: "Dr. Ngozi Eze",
    tutorEmail: "ngozi.eze@example.org",
    enrolledAt: "2026-02-15",
    completedAt: "2026-08-20",
    checks: { progress: 100, modulesFinished: true, assessmentScore: 85, fullyPaid: true, tutorReview: true },
    quizAverage: 92,
    assignmentsPassed: true,
    attendance: 98,
    status: "Issued",
    certificateRef: "CERT-2026-0029",
    issuedAt: "2026-08-22",
  },
  {
    id: "STU-006",
    name: "Liam Brown",
    email: "liam.brown@example.org",
    phone: "+234 817 450 1034",
    course: "Data Science Essentials",
    courseShort: "Data Analytics",
    tutor: "Dara Alabi",
    tutorEmail: "dara.alabi@example.org",
    enrolledAt: "2026-05-04",
    completedAt: "—",
    checks: { progress: 90, modulesFinished: false, assessmentScore: 72, fullyPaid: false, tutorReview: true },
    quizAverage: 82,
    assignmentsPassed: false,
    attendance: 88,
    status: "Pending Review",
  },
  {
    id: "STU-007",
    name: "Sophia Davis",
    email: "sophia.davis@example.org",
    phone: "+234 814 301 9912",
    course: "Introduction to Python",
    courseShort: "Programming",
    tutor: "Dr. Ngozi Eze",
    tutorEmail: "ngozi.eze@example.org",
    enrolledAt: "2026-02-02",
    completedAt: "2026-10-30",
    checks: { progress: 100, modulesFinished: true, assessmentScore: 78, fullyPaid: true, tutorReview: true },
    quizAverage: 84,
    assignmentsPassed: true,
    attendance: 92,
    status: "Eligible",
  },
  {
    id: "STU-008",
    name: "Emma Wilson",
    email: "emma.wilson@example.org",
    phone: "+234 816 552 7810",
    course: "Graphic Design Basics",
    courseShort: "Design",
    tutor: "Bisi Okafor",
    tutorEmail: "bisi.okafor@example.org",
    enrolledAt: "2026-06-15",
    completedAt: "—",
    checks: { progress: 78, modulesFinished: true, assessmentScore: 73, fullyPaid: true, tutorReview: false },
    quizAverage: 79,
    assignmentsPassed: true,
    attendance: 91,
    status: "Pending Review",
  },
];

const checkLabels = [
  { key: "progress", label: "Course Progress: 100%" },
  { key: "modulesFinished", label: "All Modules Finished" },
  { key: "assessmentScore", label: "Final Assessment Passed (≥70%)" },
  { key: "fullyPaid", label: "Full Course Payment Completed" },
  { key: "tutorReview", label: "Tutor Review Completed" },
] as const;

const dateLabel = (value: string) => {
  if (!value || value === "—") return "—";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
};

const initials = (name: string) =>
  name.split(/\s+/).slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase();

const requirements = (student: CertificateStudent) => ({
  progress: student.checks.progress >= 100,
  modulesFinished: student.checks.modulesFinished,
  assessmentScore: student.checks.assessmentScore >= 70,
  fullyPaid: student.checks.fullyPaid,
  tutorReview: student.checks.tutorReview,
});

const isEligible = (student: CertificateStudent) =>
  Object.values(requirements(student)).every(Boolean);

function loadRecords(): LoadResult {
  if (typeof window === "undefined") return { records: initialStudents, warning: "" };
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return { records: initialStudents, warning: "" };
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isCertificateStudent)) {
      throw new Error("Saved certificate data has an invalid format.");
    }
    return { records: parsed, warning: "" };
  } catch (error) {
    console.error("Could not load saved certificate records.", error);
    return {
      records: initialStudents,
      warning: "Saved certificate records could not be loaded. Showing the current local records.",
    };
  }
}

function isCertificateStudent(value: unknown): value is CertificateStudent {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<CertificateStudent>;
  const checks = record.checks as Partial<EligibilityChecks> | undefined;
  return typeof record.id === "string"
    && typeof record.name === "string"
    && typeof record.email === "string"
    && typeof record.phone === "string"
    && typeof record.course === "string"
    && typeof record.courseShort === "string"
    && typeof record.tutor === "string"
    && typeof record.tutorEmail === "string"
    && typeof record.enrolledAt === "string"
    && typeof record.completedAt === "string"
    && typeof record.quizAverage === "number"
    && typeof record.assignmentsPassed === "boolean"
    && typeof record.attendance === "number"
    && typeof record.status === "string"
    && ["Eligible", "Pending Review", "Issued", "Rejected"].includes(record.status)
    && typeof checks?.progress === "number"
    && typeof checks.modulesFinished === "boolean"
    && typeof checks.assessmentScore === "number"
    && typeof checks.fullyPaid === "boolean"
    && typeof checks.tutorReview === "boolean"
    && (record.certificateRef === undefined || typeof record.certificateRef === "string")
    && (record.issuedAt === undefined || typeof record.issuedAt === "string")
    && (record.rejectedReason === undefined || typeof record.rejectedReason === "string");
}

function CertificateManagement() {
  const [initialLoad] = useState(loadRecords);
  const [students, setStudents] = useState<CertificateStudent[]>(initialLoad.records);
  const [persistenceWarning, setPersistenceWarning] = useState(initialLoad.warning);
  const [mainTab, setMainTab] = useState<MainTab>("Eligible Students");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [generateOpen, setGenerateOpen] = useState(false);
  const [generateSearch, setGenerateSearch] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const selectedStudent = students.find((student) => student.id === selectedId) ?? null;
  const previewStudent = students.find((student) => student.id === previewId) ?? null;

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
      setPersistenceWarning("");
    } catch (error) {
      console.error("Could not persist certificate records in local storage.", error);
      setPersistenceWarning("Local changes could not be saved in this browser.");
    }
  }, [students]);

  useEffect(() => {
    if (!selectedId && !dialog && !generateOpen && !previewId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
        setDialog(null);
        setGenerateOpen(false);
        setPreviewId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId, dialog, generateOpen, previewId]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const visibleStudents = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return students
      .filter((student) => mainTab === "Issued Certificates" ? student.status === "Issued" : student.status !== "Issued")
      .filter((student) => statusFilter === "All statuses" || student.status === statusFilter)
      .filter((student) => !searchTerm || [
        student.name,
        student.email,
        student.id,
        student.course,
        student.tutor,
        student.certificateRef ?? "",
      ].some((value) => value.toLowerCase().includes(searchTerm)))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [mainTab, search, statusFilter, students]);

  const generateCandidates = useMemo(() => {
    const term = generateSearch.trim().toLowerCase();
    return students.filter((student) =>
      student.status === "Eligible"
      && isEligible(student)
      && (!term || [student.name, student.course, student.id].some((value) => value.toLowerCase().includes(term))),
    );
  }, [generateSearch, students]);

  const eligibleCount = students.filter((student) => student.status === "Eligible" && isEligible(student)).length;
  const issuedStudents = students.filter((student) => student.status === "Issued");
  const issuedCount = issuedStudents.length;
  const pendingCount = students.filter((student) => student.status === "Pending Review").length;
  const currentMonth = new Date().toISOString().slice(0, 7);
  const issuedThisMonth = issuedStudents.filter((student) => student.issuedAt?.startsWith(currentMonth)).length;
  const stats = [
    { title: "Eligible Students", value: eligibleCount.toLocaleString(), detail: "All requirements satisfied", icon: GraduationCap, tone: "bg-violet-50 text-violet-700" },
    { title: "Certificates Issued", value: issuedCount.toLocaleString(), detail: "Local certificate records", icon: Award, tone: "bg-indigo-50 text-indigo-700" },
    { title: "Pending Approval", value: pendingCount.toLocaleString(), detail: "Requirements need review", icon: Clock3, tone: "bg-amber-50 text-amber-700" },
    { title: "Issued This Month", value: issuedThisMonth.toLocaleString(), detail: "Based on local issue dates", icon: FileCheck2, tone: "bg-emerald-50 text-emerald-700" },
  ];

  const closeDrawer = () => setSelectedId(null);

  const openStudent = (student: CertificateStudent) => {
    setSelectedId(student.id);
    setGenerateOpen(false);
  };

  const createUniqueReference = () => {
    const knownReferences = new Set(students.map((student) => student.certificateRef).filter(Boolean));
    let reference = "";
    do {
      const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
      reference = `CERT-${new Date().getFullYear()}-${suffix}`;
    } while (knownReferences.has(reference));
    return reference;
  };

  const issueCertificate = (studentId: string) => {
    const student = students.find((item) => item.id === studentId);
    if (!student || student.status !== "Eligible" || !isEligible(student)) {
      setDialog(null);
      setToast("This student does not meet all certificate requirements.");
      return;
    }
    const certificateRef = createUniqueReference();
    const issuedAt = new Date().toISOString().slice(0, 10);
    setStudents((current) => current.map((item) =>
      item.id === studentId
        ? { ...item, status: "Issued", certificateRef, issuedAt }
        : item,
    ));
    setDialog(null);
    setToast("Local certificate record created. Verification and permanent issuance require the certificate service.");
  };

  const rejectEligibility = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dialog || dialog.kind !== "reject") return;
    const reason = rejectReason.trim();
    if (!reason) {
      setRejectError("Enter a reason to record this decision.");
      return;
    }
    const student = students.find((item) => item.id === dialog.studentId);
    if (!student || student.status !== "Eligible") {
      setDialog(null);
      setToast("Only eligible records can be rejected.");
      return;
    }
    setStudents((current) => current.map((item) =>
      item.id === dialog.studentId ? { ...item, status: "Rejected", rejectedReason: reason } : item,
    ));
    setDialog(null);
    setRejectReason("");
    setRejectError("");
    setToast("Eligibility decision recorded locally.");
  };

  const downloadCertificatePdf = async (student: CertificateStudent, preview = false) => {
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFillColor(250, 248, 253);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");
      pdf.setDrawColor(118, 0, 201);
      pdf.setLineWidth(1.4);
      pdf.roundedRect(9, 9, pageWidth - 18, pageHeight - 18, 3, 3, "S");
      pdf.setDrawColor(215, 187, 240);
      pdf.setLineWidth(0.35);
      pdf.roundedRect(13, 13, pageWidth - 26, pageHeight - 26, 2, 2, "S");

      try {
        const logoResponse = await fetch(allnovaLogo);
        if (!logoResponse.ok) throw new Error(`Logo request failed with status ${logoResponse.status}.`);
        const logoBlob = await logoResponse.blob();
        const logoData = await blobToDataUrl(logoBlob);
        pdf.addImage(logoData, "PNG", 24, 21, 43, 13);
      } catch (error) {
        console.error("Could not embed the Allnova logo in the certificate PDF.", error);
        pdf.setTextColor(85, 0, 110);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text("ALLNOVA", 24, 31);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7);
        pdf.text("BY PHOENIX", 25, 35);
      }

      pdf.setTextColor(104, 85, 120);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text("CERTIFICATE OF COMPLETION", pageWidth - 24, 27, { align: "right" });
      pdf.setFontSize(7);
      pdf.setTextColor(112, 95, 128);
      pdf.text(`CERTIFICATE ID  ${student.certificateRef ?? "PREVIEW"}`, pageWidth - 24, 33, { align: "right" });
      pdf.setDrawColor(220, 202, 238);
      pdf.line(24, 43, pageWidth - 24, 43);

      pdf.setTextColor(118, 0, 201);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text("THIS CERTIFIES THAT", pageWidth / 2, 60, { align: "center" });
      pdf.setTextColor(34, 24, 48);
      pdf.setFont("times", "bold");
      pdf.setFontSize(28);
      pdf.text(student.name, pageWidth / 2, 77, { align: "center" });
      pdf.setTextColor(100, 91, 112);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("has successfully completed the course", pageWidth / 2, 87, { align: "center" });
      pdf.setTextColor(118, 0, 201);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      const courseLines = pdf.splitTextToSize(student.course, pageWidth - 70);
      pdf.text(courseLines, pageWidth / 2, 100, { align: "center" });

      const detailLine = courseLines.length > 1 ? 110 : 105;
      pdf.setDrawColor(224, 211, 239);
      pdf.line(37, detailLine, pageWidth - 37, detailLine);
      pdf.setTextColor(115, 105, 127);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text("TUTOR", 39, detailLine + 10);
      pdf.text("COMPLETED", pageWidth - 39, detailLine + 10, { align: "right" });
      pdf.setTextColor(47, 36, 61);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text(student.tutor, 39, detailLine + 16);
      pdf.text(dateLabel(student.completedAt), pageWidth - 39, detailLine + 16, { align: "right" });
      pdf.setDrawColor(224, 211, 239);
      pdf.line(37, detailLine + 23, pageWidth - 37, detailLine + 23);

      pdf.setTextColor(71, 61, 83);
      pdf.setFont("times", "italic");
      pdf.setFontSize(13);
      pdf.text("Allnova Administration", pageWidth / 2, detailLine + 34, { align: "center" });
      pdf.setDrawColor(165, 133, 188);
      pdf.line(pageWidth / 2 - 29, detailLine + 37, pageWidth / 2 + 29, detailLine + 37);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(120, 110, 130);
      pdf.text("ADMINISTRATOR", pageWidth / 2, detailLine + 42, { align: "center" });

      pdf.setDrawColor(118, 0, 201);
      pdf.roundedRect(pageWidth - 43, detailLine + 27, 16, 16, 2, 2, "S");
      pdf.setTextColor(118, 0, 201);
      pdf.setFontSize(6);
      pdf.text("QR", pageWidth - 35, detailLine + 36.5, { align: "center" });
      pdf.setTextColor(105, 95, 118);
      pdf.setFontSize(5);
      pdf.text(["NOT ACTIVE", "Verification unavailable"], pageWidth - 35, detailLine + 46, { align: "center" });

      pdf.setFillColor(255, 242, 210);
      pdf.roundedRect(24, pageHeight - 29, pageWidth - 48, 10, 2, 2, "F");
      pdf.setTextColor(121, 71, 0);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("DEMO / NOT VERIFIED", pageWidth / 2, pageHeight - 22.5, { align: "center" });

      const prefix = preview ? "certificate-preview" : "certificate";
      pdf.save(`${prefix}-${student.id.toLowerCase()}.pdf`);
      setToast(preview ? "Preview PDF downloaded." : "Certificate record PDF downloaded. It is not verified.");
    } catch (error) {
      console.error("Could not generate the certificate PDF.", error);
      setToast("The PDF could not be generated. Please try again.");
    }
  };

  const viewAll = () => {
    setShowAll(true);
    setSearch("");
    setStatusFilter("All statuses");
  };

  return (
    <div className="space-y-5 pb-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-[28px]">Certificate Management</h1>
          <p className="mt-1.5 text-sm text-gray-500">Review student eligibility, issue local certificate records, and manage certificate records.</p>
        </div>
        <button
          type="button"
          onClick={() => { setGenerateSearch(""); setGenerateOpen(true); }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7600C9] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6400AA] focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2"
        >
          <FileBadge size={17} /> Generate Certificate
        </button>
      </header>

      {persistenceWarning && (
        <div role="alert" className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900">
          <AlertTriangle size={15} className="mt-0.5 shrink-0" />
          <span>{persistenceWarning}</span>
        </div>
      )}
      <div className="rounded-lg border border-violet-100 bg-violet-50/60 px-3 py-2 text-[11px] leading-5 text-violet-900">
        Sample certificate records are stored in this browser only. Issuance is unverified and does not create an official credential or public verification record.
      </div>

      <section aria-label="Certificate statistics" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, detail, icon: Icon, tone }) => (
          <article key={title} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-medium text-gray-500">{title}</p>
              <span className={`rounded-lg p-2 ${tone}`}><Icon size={17} /></span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">{value}</p>
            <p className="mt-2 text-[10px] text-gray-500">{detail}</p>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1" role="tablist" aria-label="Certificate records">
              {(["Eligible Students", "Issued Certificates"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={mainTab === tab}
                  onClick={() => { setMainTab(tab); setStatusFilter("All statuses"); setShowAll(false); }}
                  className={`rounded-md px-3 py-2 text-xs font-medium transition ${
                    mainTab === tab ? "bg-white text-violet-800 shadow-sm ring-1 ring-gray-200" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-500">{visibleStudents.length} records</span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative block sm:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => { setSearch(event.target.value); setShowAll(false); }}
                placeholder="Search students, courses..."
                aria-label="Search certificate records"
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-xs outline-none placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />
            </label>
            <label className="relative block sm:w-40">
              <select
                aria-label="Filter by certificate status"
                value={statusFilter}
                onChange={(event) => { setStatusFilter(event.target.value); setShowAll(false); }}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-8 text-xs text-gray-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              >
                <option>All statuses</option>
                {(["Eligible", "Pending Review", "Issued", "Rejected"] as const).map((status) => <option key={status}>{status}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-4 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">{mainTab === "Eligible Students" ? "Student Records" : "Issued Certificates"}</h2>
            <p className="mt-1 text-[11px] text-gray-500">{mainTab === "Eligible Students" ? "Review completion requirements before issuing." : "Local certificate records · not publicly verifiable."}</p>
          </div>
          <button type="button" onClick={viewAll} className="text-xs font-medium text-violet-700 hover:text-violet-900">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] border-collapse text-left">
            <thead>
              <tr className="border-y border-gray-200 bg-violet-50/60">
                {["Student", "Course", "Tutor", "Progress", "Completed", "Status", "Action"].map((heading) => (
                  <th key={heading} scope="col" className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-gray-600 first:pl-5 last:pr-5">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(showAll ? visibleStudents : visibleStudents.slice(0, 8)).map((student) => (
                <tr key={student.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70">
                  <td className="px-3 py-3 pl-5">
                    <div className="flex min-w-[170px] items-center gap-2.5">
                      <Avatar name={student.name} />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-gray-900">{student.name}</p>
                        <p className="mt-0.5 truncate text-[10px] text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <p className="max-w-[180px] truncate text-xs font-medium text-gray-800">{student.course}</p>
                    <p className="mt-0.5 text-[10px] text-gray-500">{student.courseShort}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="inline-flex items-center gap-2 text-xs text-gray-700"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-[9px] font-semibold text-indigo-700">{initials(student.tutor)}</span>{student.tutor}</span>
                  </td>
                  <td className="px-3 py-3">
                    <Progress value={student.checks.progress} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-700">{dateLabel(student.completedAt)}</td>
                  <td className="whitespace-nowrap px-3 py-3"><StatusBadge status={student.status} /></td>
                  <td className="whitespace-nowrap px-3 py-3 pr-5">
                    <div className="flex items-center gap-2">
                      {student.status === "Eligible" && isEligible(student) && (
                        <button type="button" onClick={() => openStudent(student)} className="rounded-full bg-violet-700 px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-violet-800">Issue</button>
                      )}
                      {student.status === "Pending Review" && (
                        <button type="button" onClick={() => openStudent(student)} className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-medium text-gray-600 hover:bg-gray-200">Review</button>
                      )}
                      {student.status === "Rejected" && (
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] text-gray-500">Rejected</span>
                      )}
                      {student.status === "Issued" && (
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-[10px] text-gray-500">Issued</span>
                      )}
                      <button type="button" onClick={() => openStudent(student)} className="px-1 text-[10px] font-medium text-violet-700 hover:text-violet-900">View</button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibleStudents.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-14 text-center text-sm text-gray-500">{search ? "No student records match your search." : "No certificate records in this view."}</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {visibleStudents.length > 8 && (
          <div className="flex justify-center border-t border-gray-100 p-3">
            <button type="button" onClick={() => setShowAll((value) => !value)} className="text-xs font-medium text-violet-700 hover:text-violet-900">{showAll ? "Show fewer" : `View all ${visibleStudents.length} records`}</button>
          </div>
        )}
      </section>

      {selectedStudent && (
        <div className="fixed inset-0 z-[70] flex justify-end bg-gray-950/40" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDrawer(); }}>
          <aside role="dialog" aria-modal="true" aria-labelledby="certificate-drawer-title" className="flex h-full w-full max-w-[500px] flex-col bg-white shadow-2xl">
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={selectedStudent.name} large />
                <div className="min-w-0">
                  <h2 id="certificate-drawer-title" className="truncate text-sm font-semibold text-gray-900">{selectedStudent.name}</h2>
                  <p className="mt-0.5 truncate text-[10px] text-gray-500">{selectedStudent.course}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <StatusBadge status={selectedStudent.status} />
                <button type="button" aria-label="Close student details" onClick={closeDrawer} className="rounded-md border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50"><X size={15} /></button>
              </div>
            </header>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
              <StateBanner student={selectedStudent} />

              <section>
                <SectionHeading>Student Information</SectionHeading>
                <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50/70 p-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={selectedStudent.name} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-gray-900">{selectedStudent.name}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-500"><Mail size={11} />{selectedStudent.email}</p>
                      <p className="mt-0.5 text-[10px] font-medium text-violet-700">{selectedStudent.courseShort}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <InfoCard label="Phone" value={selectedStudent.phone} />
                  <InfoCard label="Student ID" value={selectedStudent.id} />
                </div>
              </section>

              <section>
                <SectionHeading>Course Information</SectionHeading>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <InfoCard label="Course" value={selectedStudent.course} />
                  <InfoCard label="Tutor" value={selectedStudent.tutor} />
                  <InfoCard label="Enrolled" value={dateLabel(selectedStudent.enrolledAt)} />
                  <InfoCard label="Completed" value={dateLabel(selectedStudent.completedAt)} />
                </div>
              </section>

              <section>
                <SectionHeading>Eligibility Checklist</SectionHeading>
                <div className="mt-2 space-y-1.5">
                  {checkLabels.map((item) => {
                    const passed = requirements(selectedStudent)[item.key];
                    const label = item.key === "progress"
                      ? `Course Progress: ${selectedStudent.checks.progress}%`
                      : item.key === "assessmentScore"
                        ? `Final Assessment Passed (≥70%) · ${selectedStudent.checks.assessmentScore}%`
                        : item.label;
                    return (
                      <div key={item.key} className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
                        passed ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"
                      }`}>
                        {passed ? <CheckCircle2 size={14} className="shrink-0" /> : <XCircle size={14} className="shrink-0" />}
                        <span className="text-[10px] font-medium">{label}</span>
                      </div>
                    );
                  })}
                </div>
                {selectedStudent.status === "Pending Review" && (
                  <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-[10px] leading-4 text-amber-900">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                    Certificate issuance is disabled until every requirement is complete.
                  </div>
                )}
                {selectedStudent.status === "Rejected" && selectedStudent.rejectedReason && (
                  <div className="mt-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[10px] leading-4 text-rose-800">
                    <span className="font-semibold">Eligibility decision:</span> {selectedStudent.rejectedReason}
                  </div>
                )}
              </section>

              <section>
                <SectionHeading>Performance Summary</SectionHeading>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <MetricCard value={`${selectedStudent.checks.progress}%`} label="Course Progress" />
                  <MetricCard value={`${selectedStudent.quizAverage}%`} label="Quiz Average" />
                  <MetricCard value={selectedStudent.assignmentsPassed ? "Passed" : "In Progress"} label="Assignments" />
                  <MetricCard value={`${selectedStudent.attendance}%`} label="Attendance" />
                </div>
              </section>

              <section>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <SectionHeading>Certificate Preview</SectionHeading>
                  <button type="button" onClick={() => setPreviewId(selectedStudent.id)} className="text-[10px] font-medium text-violet-700 hover:text-violet-900">Expand preview</button>
                </div>
                <CertificateArtwork student={selectedStudent} />
              </section>
            </div>

            <footer className="shrink-0 border-t border-gray-100 bg-white p-3 sm:px-5">
              {selectedStudent.status === "Eligible" && isEligible(selectedStudent) && (
                <>
                  <button type="button" onClick={() => setDialog({ kind: "issue", studentId: selectedStudent.id })} className="w-full rounded-lg bg-[#7600C9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6400AA]">Issue Certificate</button>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => void downloadCertificatePdf(selectedStudent, true)} className="rounded-lg border border-violet-200 px-3 py-2 text-[10px] font-medium text-violet-700 hover:bg-violet-50">Download Preview</button>
                    <button type="button" onClick={() => setDialog({ kind: "reject", studentId: selectedStudent.id })} className="rounded-lg border border-rose-200 px-3 py-2 text-[10px] font-medium text-rose-700 hover:bg-rose-50">Reject Eligibility</button>
                  </div>
                </>
              )}
              {selectedStudent.status === "Pending Review" && (
                <button type="button" disabled className="w-full cursor-not-allowed rounded-lg bg-gray-400 px-4 py-2.5 text-xs font-semibold text-white" title="Complete all eligibility requirements first">Requirements Not Met</button>
              )}
              {selectedStudent.status === "Issued" && (
                <button type="button" onClick={() => void downloadCertificatePdf(selectedStudent)} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7600C9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6400AA]">
                  <Download size={14} /> Download Certificate
                </button>
              )}
              {selectedStudent.status === "Rejected" && (
                <button type="button" disabled className="w-full cursor-not-allowed rounded-lg bg-gray-400 px-4 py-2.5 text-xs font-semibold text-white">Eligibility Rejected</button>
              )}
            </footer>
          </aside>
        </div>
      )}

      {generateOpen && (
        <Modal title="Generate Certificate" onClose={() => setGenerateOpen(false)}>
          <p className="text-xs leading-5 text-gray-500">Select a student who currently meets every certificate requirement. Issuance creates a local, unverified record only.</p>
          <label className="relative mt-4 block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={generateSearch} onChange={(event) => setGenerateSearch(event.target.value)} placeholder="Search eligible students..." className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
          </label>
          <div className="mt-3 max-h-[45vh] space-y-2 overflow-y-auto">
            {generateCandidates.map((student) => (
              <button key={student.id} type="button" onClick={() => openStudent(student)} className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 text-left hover:border-violet-300 hover:bg-violet-50/50">
                <Avatar name={student.name} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-gray-900">{student.name}</span>
                  <span className="mt-0.5 block truncate text-[10px] text-gray-500">{student.course}</span>
                </span>
                <span className="text-[10px] font-medium text-violet-700">Review →</span>
              </button>
            ))}
            {generateCandidates.length === 0 && (
              <div className="rounded-lg bg-gray-50 px-4 py-8 text-center text-xs text-gray-500">No eligible students available. Students must meet all five requirements.</div>
            )}
          </div>
        </Modal>
      )}

      {dialog?.kind === "issue" && (
        <Modal title="Issue Certificate" onClose={() => setDialog(null)}>
          {(() => {
            const student = students.find((item) => item.id === dialog.studentId);
            if (!student) return <p className="text-sm text-gray-600">This student record is no longer available.</p>;
            return (
              <>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs leading-5 text-emerald-900">
                  <p className="font-semibold">{student.name} · {student.course}</p>
                  <p className="mt-1">All five recorded eligibility checks pass. This will save a certificate record locally and generate an unverified reference. It does not create an official credential or public verification record.</p>
                </div>
                <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button type="button" onClick={() => setDialog(null)} className="rounded-lg border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="button" onClick={() => issueCertificate(student.id)} className="rounded-lg bg-[#7600C9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6400AA]">Create Local Record</button>
                </div>
              </>
            );
          })()}
        </Modal>
      )}

      {dialog?.kind === "reject" && (
        <Modal title="Reject Eligibility" onClose={() => { setDialog(null); setRejectReason(""); setRejectError(""); }}>
          <form onSubmit={rejectEligibility}>
            <p className="text-xs leading-5 text-gray-500">Record why this student is not approved for certificate issuance. This action only changes the local record.</p>
            <label className="mt-4 block text-xs font-medium text-gray-700">
              Reason <span className="text-rose-600">*</span>
              <textarea value={rejectReason} onChange={(event) => { setRejectReason(event.target.value); setRejectError(""); }} rows={4} placeholder="Enter a reason for rejecting eligibility..." className="mt-1.5 w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-xs outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
              {rejectError && <span className="mt-1 block text-[10px] text-rose-600">{rejectError}</span>}
            </label>
            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => { setDialog(null); setRejectReason(""); setRejectError(""); }} className="rounded-lg border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="rounded-lg bg-rose-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-rose-800">Confirm Rejection</button>
            </div>
          </form>
        </Modal>
      )}

      {previewStudent && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-gray-950/55 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewId(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="certificate-preview-title" className="my-auto w-full max-w-4xl rounded-2xl bg-white p-4 shadow-2xl sm:p-6">
            <header className="mb-4 flex items-center justify-between gap-3">
              <div><h2 id="certificate-preview-title" className="text-sm font-semibold text-gray-900">Certificate Preview</h2><p className="mt-1 text-[10px] text-gray-500">DEMO / NOT VERIFIED · Verification service unavailable</p></div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => void downloadCertificatePdf(previewStudent, true)} className="inline-flex items-center gap-1.5 rounded-lg bg-[#7600C9] px-3 py-2 text-[10px] font-semibold text-white hover:bg-[#6400AA]"><Download size={13} /> Download PDF</button>
                <button type="button" aria-label="Close preview" onClick={() => setPreviewId(null)} className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"><X size={15} /></button>
              </div>
            </header>
            <CertificateArtwork student={previewStudent} large />
          </section>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[100] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-start gap-2 rounded-lg bg-gray-900 px-4 py-3 text-xs text-white shadow-lg sm:left-auto sm:right-6 sm:translate-x-0">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" /><span>{toast}</span>
        </div>
      )}
    </div>
  );
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Certificate logo could not be read."));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Certificate logo could not be read."));
    reader.readAsDataURL(blob);
  });
}

function Avatar({ name, large = false }: { name: string; large?: boolean }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-800 ${large ? "h-10 w-10 text-xs" : "h-8 w-8 text-[10px]"}`} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

function StatusBadge({ status }: { status: CertificateStatus }) {
  const styles: Record<CertificateStatus, string> = {
    Eligible: "bg-emerald-50 text-emerald-700",
    "Pending Review": "bg-amber-50 text-amber-800",
    Issued: "bg-violet-50 text-violet-700",
    Rejected: "bg-rose-50 text-rose-700",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${styles[status]}`}><span className={`h-1.5 w-1.5 rounded-full ${status === "Eligible" ? "bg-emerald-500" : status === "Pending Review" ? "bg-amber-500" : status === "Issued" ? "bg-violet-500" : "bg-rose-500"}`} />{status}</span>;
}

function Progress({ value }: { value: number }) {
  const color = value >= 100 ? "bg-emerald-500" : value >= 75 ? "bg-amber-400" : "bg-rose-400";
  return (
    <div className="flex min-w-[100px] items-center gap-2">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-gray-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} /></div>
      <span className={`text-[10px] font-medium ${value >= 100 ? "text-emerald-700" : "text-amber-700"}`}>{value}%</span>
    </div>
  );
}

function StateBanner({ student }: { student: CertificateStudent }) {
  if (student.status === "Eligible") {
    return <div className="flex items-center gap-3 rounded-xl bg-emerald-950 px-4 py-3 text-white"><span className="rounded-full bg-emerald-800 p-2"><CheckCircle2 size={17} /></span><span><span className="block text-xs font-semibold">Ready for Certification</span><span className="mt-0.5 block text-[10px] text-white/75">All recorded requirements met</span></span></div>;
  }
  if (student.status === "Pending Review") {
    return <div className="flex items-center gap-3 rounded-xl bg-amber-900 px-4 py-3 text-white"><span className="rounded-full bg-amber-800 p-2"><Clock3 size={17} /></span><span><span className="block text-xs font-semibold">Requirements Incomplete</span><span className="mt-0.5 block text-[10px] text-white/75">Review the eligibility checklist below</span></span></div>;
  }
  if (student.status === "Issued") {
    return <div className="flex items-center gap-3 rounded-xl bg-violet-800 px-4 py-3 text-white"><span className="rounded-full bg-white/15 p-2"><Award size={17} /></span><span className="min-w-0"><span className="block text-xs font-semibold">Certificate Record Created</span><span className="mt-0.5 block truncate text-[10px] text-white/75">Ref: {student.certificateRef} · local, not verified</span></span></div>;
  }
  return <div className="flex items-center gap-3 rounded-xl bg-rose-800 px-4 py-3 text-white"><span className="rounded-full bg-white/15 p-2"><XCircle size={17} /></span><span><span className="block text-xs font-semibold">Eligibility Rejected</span><span className="mt-0.5 block text-[10px] text-white/75">A local decision is recorded for this student</span></span></div>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">{children}</h3>;
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50/70 p-2.5"><p className="text-[9px] text-gray-500">{label}</p><p className="mt-1 break-words text-[10px] font-medium text-gray-800">{value}</p></div>;
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return <div className="rounded-lg border border-gray-200 bg-gray-50/70 px-2 py-2.5 text-center"><p className="text-sm font-semibold text-emerald-700">{value}</p><p className="mt-0.5 text-[9px] text-gray-500">{label}</p></div>;
}

function CertificateArtwork({ student, large = false }: { student: CertificateStudent; large?: boolean }) {
  const reference = student.certificateRef ?? `PREVIEW · ${student.id}`;
  return (
    <div className={`relative overflow-hidden rounded-xl border-2 border-violet-600 bg-[#fcfaff] shadow-sm ${large ? "p-5 sm:p-9" : "p-3 sm:p-4"}`}>
      <div className={`pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] whitespace-nowrap border-2 border-rose-500/60 px-3 py-1.5 font-bold tracking-[0.2em] text-rose-500/70 ${large ? "text-xl sm:text-3xl" : "text-[10px] sm:text-xs"}`}>
        DEMO / NOT VERIFIED
      </div>
      <div className="relative z-0">
        <div className="flex items-start justify-between gap-3">
          <img src={allnovaLogo} alt="Allnova by Phoenix" className={`${large ? "h-8 w-32 sm:h-10 sm:w-40" : "h-5 w-20 sm:h-6 sm:w-24"} object-contain object-left`} />
          <div className="text-right">
            <p className={`font-serif text-gray-500 ${large ? "text-sm" : "text-[8px] sm:text-[9px]"}`}>Certificate of Completion</p>
            <p className={`mt-1 font-mono text-violet-700 ${large ? "text-[10px]" : "text-[6px] sm:text-[7px]"}`}>{reference}</p>
          </div>
        </div>
        <div className={`mt-3 border-t border-violet-100 ${large ? "pt-8 sm:pt-10" : "pt-4 sm:pt-5"} text-center`}>
          <p className={`font-medium tracking-[0.2em] text-gray-400 ${large ? "text-xs" : "text-[6px] sm:text-[7px]"}`}>THIS CERTIFIES THAT</p>
          <h3 className={`mt-2 font-serif font-semibold text-gray-900 ${large ? "text-2xl sm:text-4xl" : "text-sm sm:text-lg"}`}>{student.name}</h3>
          <p className={`mt-1 text-gray-500 ${large ? "text-sm" : "text-[7px] sm:text-[8px]"}`}>has successfully completed</p>
          <p className={`mt-1 font-semibold text-violet-700 ${large ? "text-lg sm:text-2xl" : "text-[9px] sm:text-xs"}`}>{student.course}</p>
        </div>
        <div className={`mt-4 grid grid-cols-[1fr_auto_1fr] items-end border-y border-violet-100 ${large ? "py-5 sm:mt-8" : "py-2.5 sm:mt-5"}`}>
          <div><p className={`text-gray-400 ${large ? "text-[10px]" : "text-[6px] sm:text-[7px]"}`}>Tutor</p><p className={`mt-1 font-medium text-gray-800 ${large ? "text-sm" : "text-[7px] sm:text-[8px]"}`}>{student.tutor}</p></div>
          <div className={`flex flex-col items-center justify-center rounded-lg border border-violet-300 text-violet-700 ${large ? "h-14 w-14 p-2" : "h-7 w-7 p-1"}`}>
            <ShieldCheck className={large ? "h-6 w-6" : "h-4 w-4"} />
            <span className={`${large ? "text-[7px]" : "text-[4px]"}`}>NOT ACTIVE</span>
          </div>
          <div className="text-right"><p className={`text-gray-400 ${large ? "text-[10px]" : "text-[6px] sm:text-[7px]"}`}>Completed</p><p className={`mt-1 font-medium text-gray-800 ${large ? "text-sm" : "text-[7px] sm:text-[8px]"}`}>{dateLabel(student.completedAt)}</p></div>
        </div>
        <div className={`text-center ${large ? "pt-4" : "pt-2"}`}>
          <p className={`font-serif italic text-gray-600 ${large ? "text-base" : "text-[8px] sm:text-[9px]"}`}>Allnova Administration</p>
          <p className={`mt-1 tracking-[0.16em] text-gray-400 ${large ? "text-[9px]" : "text-[5px] sm:text-[6px]"}`}>ADMINISTRATOR SIGNATURE</p>
        </div>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title" className="my-auto w-full max-w-lg rounded-xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-6">
        <header className="mb-4 flex items-center justify-between gap-3">
          <h2 id="certificate-modal-title" className="text-base font-semibold text-gray-900">{title}</h2>
          <button type="button" aria-label="Close dialog" onClick={onClose} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"><X size={17} /></button>
        </header>
        {children}
      </section>
    </div>
  );
}

export default CertificateManagement;