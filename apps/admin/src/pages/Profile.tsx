import { useEffect, useState, type FormEvent } from "react";
import {
  Activity,
  Check,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  Globe2,
  GraduationCap,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  TicketCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import adminAvatar from "../assets/demilade.png";

type ProfileForm = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

type PasswordForm = {
  current: string;
  next: string;
  confirm: string;
};

type ModalState =
  | { kind: "edit" }
  | { kind: "password" }
  | { kind: "danger"; action: "Deactivate Account" | "Permanently Delete" }
  | null;

const initialProfile: ProfileForm = {
  name: "Eniola Adeyemo",
  email: "eniola.a@admin.allnova.tech",
  phone: "+234 803 221 4490",
  location: "Lagos, Nigeria",
};

const overviewCards = [
  { label: "Applications Reviewed", value: "248", icon: FileCheck2 },
  { label: "Students Managed", value: "1,452", icon: GraduationCap },
  { label: "Payments Processed", value: "₦12.4M", icon: CreditCard },
  { label: "Support Tickets Resolved", value: "312", icon: TicketCheck },
];

const activityItems = [
  { title: "Approved New Tutor Application", detail: "14:20 PM · Global Portal", tone: "bg-violet-600" },
  { title: "Security Audit Completed", detail: "10:45 AM · Security Module", tone: "bg-indigo-600" },
  { title: "Policy Update Published", detail: "Yesterday, 18:30 PM", tone: "bg-gray-400" },
  { title: "User Permission Revoked", detail: "Oct 24, 11:00 AM", tone: "bg-gray-400" },
];

const permissions = [
  { label: "User Management", icon: UsersRound },
  { label: "Financial Reporting", icon: Activity },
  { label: "System Configuration", icon: ShieldCheck },
];

const notificationOptions = [
  { key: "email", label: "Email Notifications" },
  { key: "realtime", label: "Real-time System Alerts" },
  { key: "payments", label: "Payment Alerts" },
  { key: "applications", label: "New Applications" },
  { key: "security", label: "Security Alerts" },
] as const;

type NotificationKey = (typeof notificationOptions)[number]["key"];

const performanceMetrics = [
  { label: "Compliance Rate", value: 98.5, color: "bg-violet-700", textColor: "text-violet-700" },
  { label: "Operational Efficiency", value: 84, color: "bg-indigo-700", textColor: "text-indigo-700" },
  { label: "Response Time Target", value: 92, color: "bg-gray-500", textColor: "text-gray-700" },
];

function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [profileDraft, setProfileDraft] = useState(initialProfile);
  const [password, setPassword] = useState<PasswordForm>({ current: "", next: "", confirm: "" });
  const [modal, setModal] = useState<ModalState>(null);
  const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>({
    email: true,
    realtime: true,
    payments: false,
    applications: false,
    security: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal]);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(""), 3500);
    return () => window.clearTimeout(timeout);
  }, [message]);

  const openEditProfile = () => {
    setProfileDraft(profile);
    setFormErrors({});
    setModal({ kind: "edit" });
  };

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!profileDraft.name.trim()) errors.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileDraft.email.trim())) errors.email = "Enter a valid email address.";
    if (!/^\+?[\d\s()-]{7,20}$/.test(profileDraft.phone.trim())) errors.phone = "Enter a valid phone number.";
    if (!profileDraft.location.trim()) errors.location = "Enter your office location.";
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    setProfile({
      name: profileDraft.name.trim(),
      email: profileDraft.email.trim(),
      phone: profileDraft.phone.trim(),
      location: profileDraft.location.trim(),
    });
    setModal(null);
    setMessage("Profile details updated on this page.");
  };

  const submitPasswordRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!password.current) errors.current = "Enter your current password.";
    if (password.next.length < 8) errors.next = "Use at least 8 characters.";
    if (password.confirm !== password.next) errors.confirm = "Passwords do not match.";
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    setModal(null);
    setPassword({ current: "", next: "", confirm: "" });
    setMessage("Password changes require a secure account service. No password was changed.");
  };

  const confirmDangerAction = () => {
    if (!modal || modal.kind !== "danger") return;
    setModal(null);
    setMessage(`${modal.action} requires backend confirmation. No account changes were made.`);
  };

  const fieldClass =
    "mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100";

  return (
    <div className="mx-auto w-full max-w-[1200px] pb-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">Admin Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your system credentials and view organization-wide metrics.
          </p>
        </div>
        <button
          type="button"
          onClick={openEditProfile}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7600C9] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6400AA] focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2"
        >
          <Check size={16} />
          Save Changes
        </button>
      </header>

      <section aria-label="Profile overview" className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-gray-500">{label}</p>
              <span className="rounded-lg bg-violet-50 p-2 text-violet-700">
                <Icon size={17} />
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">{value}</p>
            <span className="mt-2 block h-1 w-9 rounded-full bg-violet-100" />
          </article>
        ))}
      </section>

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(260px,0.9fr)]">
        <div className="min-w-0 space-y-4">
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div
              role="img"
              aria-label="Flowering branches against a soft sky"
              className="h-36 bg-cover bg-center sm:h-40"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(28, 12, 38, .28), rgba(56, 20, 72, .08)), url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80')",
              }}
            />
            <div className="px-4 pb-4 sm:px-5">
              <div className="flex min-h-[104px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 pb-4 pt-3 sm:px-5">
                <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
                  <div className="h-[76px] w-[76px] shrink-0 -translate-y-9 overflow-hidden rounded-xl border-4 border-white bg-white shadow-sm">
                    <img src={adminAvatar} alt={`${profile.name} profile`} className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="flex min-h-[76px] min-w-0 flex-col justify-center">
                    <h2 className="truncate text-base font-semibold text-gray-900">{profile.name}</h2>
                    <p className="mt-0.5 text-sm text-gray-500">Super Admin <span aria-hidden="true">·</span> Lagos Hub</p>
                  </div>
                </div>
                <div className="flex w-full gap-2 sm:w-auto">
                  <button
                    type="button"
                    onClick={openEditProfile}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-800 transition hover:border-violet-300 hover:bg-violet-50 sm:flex-none"
                  >
                    <UserRound size={14} /> Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFormErrors({}); setModal({ kind: "password" }); }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-800 transition hover:border-violet-300 hover:bg-violet-50 sm:flex-none"
                  >
                    <KeyRound size={14} /> Password
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 divide-x divide-gray-200 rounded-lg bg-gray-50 px-2 py-3 text-center">
                <div><p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">Active Since</p><p className="mt-1 text-xs font-medium text-gray-800">Jan 2022</p></div>
                <div><p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">Total Managed</p><p className="mt-1 text-xs font-medium text-gray-800">12.4k Users</p></div>
                <div><p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">Last Login</p><p className="mt-1 text-xs font-medium text-gray-800">2 mins ago</p></div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-gray-900">Personal Information</h2>
            <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <InfoItem icon={Mail} label="Email Address" value={profile.email} />
              <InfoItem icon={Phone} label="Phone Number" value={profile.phone} />
              <InfoItem icon={MapPin} label="Location / Timezone" value={`${profile.location} (GMT +1)`} />
              <InfoItem icon={Globe2} label="Language" value="English (US), Yoruba" />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-gray-900">Performance Metrics</h2>
            <div className="mt-4 space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-gray-700">{metric.label}</span>
                    <span className={`font-semibold ${metric.textColor}`}>{metric.value}%</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={metric.label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={metric.value}
                    className="h-1.5 overflow-hidden rounded-full bg-gray-100"
                  >
                    <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="min-w-0 space-y-4">
          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-gray-900">System Activity</h2>
            <ol className="mt-4 space-y-0">
              {activityItems.map((item, index) => (
                <li key={item.title} className="relative flex gap-3 pb-5 last:pb-0">
                  <span className="relative flex w-2 shrink-0 justify-center">
                    <span className={`mt-1.5 h-2 w-2 rounded-full ${item.tone}`} />
                    {index < activityItems.length - 1 && <span className="absolute top-3.5 bottom-0 w-px bg-violet-200" />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-4 text-gray-900">{item.title}</p>
                    <p className="mt-1 text-[10px] text-gray-500">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-gray-900">Permissions Matrix</h2>
            <ul className="mt-3 space-y-2">
              {permissions.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2 rounded-lg bg-violet-50/80 px-2.5 py-2">
                  <Icon size={14} className="text-violet-700" />
                  <span className="min-w-0 flex-1 text-xs font-medium text-gray-800">{label}</span>
                  <span aria-label="Enabled" className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-700 text-white">
                    <Check size={11} strokeWidth={3} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-gray-900">Preferences</h2>
            <div className="mt-3 space-y-3">
              {notificationOptions.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between gap-3">
                  <span className="text-xs text-gray-700">{label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifications[key]}
                    aria-label={label}
                    onClick={() => setNotifications((current) => ({ ...current, [key]: !current[key] }))}
                    className={`relative h-5 w-10 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 ${
                      notifications[key] ? "bg-violet-700" : "bg-gray-300"
                    }`}
                  >
                    <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${notifications[key] ? "translate-x-5" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-5 flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50/30 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="max-w-xl">
          <h2 className="text-sm font-semibold text-red-700">Danger Zone</h2>
          <p className="mt-1 text-xs leading-5 text-red-700/80">
            Revoking administrative access is permanent and will log you out immediately.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => setModal({ kind: "danger", action: "Deactivate Account" })}
            className="rounded-lg border border-red-300 bg-white px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
          >
            Deactivate Account
          </button>
          <button
            type="button"
            onClick={() => setModal({ kind: "danger", action: "Permanently Delete" })}
            className="rounded-lg bg-red-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-800"
          >
            Permanently Delete
          </button>
        </div>
      </section>

      <footer className="pt-5 text-center text-[11px] text-gray-500">
        © 2026 Allnova AdminPortal. Version 4.8.2-stable. All rights reserved.
      </footer>

      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-950/40 p-4 backdrop-blur-[1px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModal(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            className="my-auto w-full max-w-md rounded-xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="profile-modal-title" className="text-base font-semibold text-gray-900">
                  {modal.kind === "edit" ? "Edit Profile" : modal.kind === "password" ? "Change Password" : modal.action}
                </h2>
                {modal.kind === "danger" && (
                  <p className="mt-1.5 text-sm leading-5 text-gray-500">
                    This action can’t be completed from this page. Confirm to acknowledge; no account changes will be made.
                  </p>
                )}
                {modal.kind === "password" && (
                  <p className="mt-1.5 text-xs leading-5 text-gray-500">
                    Password updates require a secure account service. Submitting here will not change your password.
                  </p>
                )}
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setModal(null)}
                className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            {modal.kind === "edit" && (
              <form onSubmit={saveProfile} noValidate>
                <div className="space-y-3.5">
                  <FormField label="Full Name" value={profileDraft.name} error={formErrors.name} onChange={(value) => setProfileDraft((draft) => ({ ...draft, name: value }))} className={fieldClass} />
                  <FormField label="Email" type="email" value={profileDraft.email} error={formErrors.email} onChange={(value) => setProfileDraft((draft) => ({ ...draft, email: value }))} className={fieldClass} />
                  <FormField label="Phone" type="tel" value={profileDraft.phone} error={formErrors.phone} onChange={(value) => setProfileDraft((draft) => ({ ...draft, phone: value }))} className={fieldClass} />
                  <FormField label="Office Location" value={profileDraft.location} error={formErrors.location} onChange={(value) => setProfileDraft((draft) => ({ ...draft, location: value }))} className={fieldClass} />
                </div>
                <ModalActions onCancel={() => setModal(null)} submitLabel="Save Changes" />
              </form>
            )}

            {modal.kind === "password" && (
              <form onSubmit={submitPasswordRequest} noValidate>
                <div className="space-y-3.5">
                  <FormField label="Current Password" type="password" autoComplete="current-password" value={password.current} error={formErrors.current} onChange={(value) => setPassword((current) => ({ ...current, current: value }))} className={fieldClass} />
                  <FormField label="New Password" type="password" autoComplete="new-password" value={password.next} error={formErrors.next} onChange={(value) => setPassword((current) => ({ ...current, next: value }))} className={fieldClass} />
                  <FormField label="Confirm New Password" type="password" autoComplete="new-password" value={password.confirm} error={formErrors.confirm} onChange={(value) => setPassword((current) => ({ ...current, confirm: value }))} className={fieldClass} />
                </div>
                <ModalActions onCancel={() => setModal(null)} submitLabel="Update Password" />
              </form>
            )}

            {modal.kind === "danger" && (
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setModal(null)} className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="button" onClick={confirmDangerAction} className="rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800">Confirm</button>
              </div>
            )}
          </section>
        </div>
      )}

      {message && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[110] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-start gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg sm:left-auto sm:right-6 sm:translate-x-0">
          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1.5 flex min-w-0 items-center gap-2 text-xs text-gray-800">
        <Icon size={14} className="shrink-0 text-violet-700" />
        <span className="truncate">{value}</span>
      </p>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  error,
  className,
  ...inputProps
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const id = `profile-field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-gray-600">{label}</label>
      <input
        {...inputProps}
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${className} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`}
      />
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function ModalActions({ onCancel, submitLabel }: { onCancel: () => void; submitLabel: string }) {
  return (
    <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <button type="button" onClick={onCancel} className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Cancel</button>
      <button type="submit" className="rounded-lg bg-[#7600C9] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6400AA]">{submitLabel}</button>
    </div>
  );
}

export default Profile;