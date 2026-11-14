import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import {
  AlertTriangle,
  Bell,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  FileImage,
  Flag,
  Github,
  ImagePlus,
  LogOut,
  Mail,
  MessageCircle,
  Palette,
  Save,
  Shield,
  ShieldCheck,
  Trash2,
  UserRound,
  UserRoundPen,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import adminAvatar from "../assets/demilade.png";

type SettingsSection = "Account" | "Profile" | "Notification" | "Security" | "Preferences" | "Help & Support";
type Appearance = "light" | "dark";
type ProfileData = {
  name: string;
  role: string;
  location: string;
  bio: string;
  skills: string;
  portfolio: string;
  github: string;
  linkedin: string;
  avatar: string;
  cover: string;
};
type AccountData = { name: string; email: string; phone: string };
type NotificationPreferences = {
  courseUpdates: boolean;
  internshipOpportunities: boolean;
  applicationUpdates: boolean;
  paymentReminders: boolean;
  marketingEmails: boolean;
};
type PreferenceData = { appearance: Appearance; language: string; reminders: boolean };
type Notice = { kind: "success" | "error" | "info"; text: string } | null;
type ModalKind = "delete" | "logoutAll" | "twoFactor" | "sessions" | "support" | "report" | null;

const STORAGE_KEYS = {
  account: "allnova-admin-settings-account.v1",
  profile: "allnova-admin-settings-profile.v1",
  notifications: "allnova-admin-settings-notifications.v1",
  preferences: "allnova-admin-settings-preferences.v1",
  supportRequests: "allnova-admin-settings-support-requests.v1",
};
const PROFILE_IMAGE_DB = "allnova-admin-profile-images";
const PROFILE_IMAGE_STORE = "images";
const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024;

const defaultAccount: AccountData = {
  name: "Eniola Adeyemo",
  email: "eniola.a@admin.allnova.tech",
  phone: "+234 803 221 4490",
};

const defaultProfile: ProfileData = {
  name: defaultAccount.name,
  role: "Super Admin",
  location: "Lagos Hub",
  bio: "Product design focused on creating intuitive, user-friendly digital experiences. Currently supporting the Allnova admin team and helping learners, clients, and freelancers succeed.",
  skills: "Administration, Product Design, User Support",
  portfolio: "",
  github: "",
  linkedin: "",
  avatar: adminAvatar,
  cover: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80",
};

const defaultNotifications: NotificationPreferences = {
  courseUpdates: true,
  internshipOpportunities: true,
  applicationUpdates: true,
  paymentReminders: false,
  marketingEmails: false,
};

const defaultPreferences: PreferenceData = {
  appearance: "light",
  language: "en-US",
  reminders: true,
};

const sectionNavigation = [
  { title: "Account", icon: UserRound },
  { title: "Profile", icon: UserRoundPen },
  { title: "Notification", icon: Bell },
  { title: "Security", icon: Shield },
  { title: "Preferences", icon: Palette },
  { title: "Help & Support", icon: CircleHelp },
] as const;

const notificationOptions: { key: keyof NotificationPreferences; title: string; description: string }[] = [
  { key: "courseUpdates", title: "Course Updates", description: "New lessons, materials, and curriculum changes" },
  { key: "internshipOpportunities", title: "Internship Opportunities", description: "Matching roles based on your skills" },
  { key: "applicationUpdates", title: "Application Status Updates", description: "Track application progress and review activity" },
  { key: "paymentReminders", title: "Payment Reminders", description: "Upcoming and outstanding balance alerts" },
  { key: "marketingEmails", title: "Marketing Emails", description: "Product news, tips, and platform announcements" },
];

const faqs = [
  {
    question: "How do I update my account details?",
    answer: "Open Account, edit your name, email, or phone number, then save. Until account services are connected, these values are stored only in this browser.",
  },
  {
    question: "How can I change my password or enable two-factor authentication?",
    answer: "Password changes and two-factor setup require the Allnova identity service. This settings page cannot change credentials or enable 2FA.",
  },
  {
    question: "Where do my notification and appearance preferences apply?",
    answer: "Notification and reminder preferences are saved in this browser. Appearance is applied to the admin interface on this device.",
  },
  {
    question: "How do I get help with an issue?",
    answer: "Use Contact Support to prepare a message or Report a Problem to create a local report draft. Neither is delivered until a support service is connected.",
  },
];

const sectionSubtitles: Record<SettingsSection, string> = {
  Account: "Manage your personal information and contact details.",
  Profile: "Customize how other administrators see your profile.",
  Notification: "Choose what you want to be notified about.",
  Security: "Keep your account safe and secure.",
  Preferences: "Manage appearance, language, and learning reminders.",
  "Help & Support": "Find answers and get help with your account.",
};

function readStored<T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch (error) {
    console.error(`Could not read settings value "${key}".`, error);
    return fallback;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getInitialAccount(): AccountData {
  return readStored(STORAGE_KEYS.account, defaultAccount, (value): value is AccountData =>
    isObject(value) && typeof value.name === "string" && typeof value.email === "string" && typeof value.phone === "string",
  );
}

function getInitialProfile(): ProfileData {
  return readStored(STORAGE_KEYS.profile, defaultProfile, (value): value is ProfileData =>
    isObject(value)
    && typeof value.name === "string"
    && typeof value.role === "string"
    && typeof value.location === "string"
    && typeof value.bio === "string"
    && typeof value.skills === "string"
    && typeof value.portfolio === "string"
    && typeof value.github === "string"
    && typeof value.linkedin === "string"
    && typeof value.avatar === "string"
    && typeof value.cover === "string",
  );
}

function getInitialNotifications(): NotificationPreferences {
  return readStored(STORAGE_KEYS.notifications, defaultNotifications, (value): value is NotificationPreferences =>
    isObject(value)
    && typeof value.courseUpdates === "boolean"
    && typeof value.internshipOpportunities === "boolean"
    && typeof value.applicationUpdates === "boolean"
    && typeof value.paymentReminders === "boolean"
    && typeof value.marketingEmails === "boolean",
  );
}

function getInitialPreferences(): PreferenceData {
  return readStored(STORAGE_KEYS.preferences, defaultPreferences, (value): value is PreferenceData =>
    isObject(value)
    && (value.appearance === "light" || value.appearance === "dark")
    && typeof value.language === "string"
    && typeof value.reminders === "boolean",
  );
}

function openProfileImageDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("Browser image storage is unavailable."));
      return;
    }

    const request = window.indexedDB.open(PROFILE_IMAGE_DB, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(PROFILE_IMAGE_STORE)) {
        request.result.createObjectStore(PROFILE_IMAGE_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Could not open browser image storage."));
    request.onblocked = () => reject(new Error("Browser image storage is blocked by another tab."));
  });
}

async function saveProfileImage(field: "avatar" | "cover", image: Blob): Promise<void> {
  const database = await openProfileImageDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(PROFILE_IMAGE_STORE, "readwrite");
      transaction.objectStore(PROFILE_IMAGE_STORE).put(image, field);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error("Could not save the selected image."));
      transaction.onabort = () => reject(transaction.error ?? new Error("Saving the selected image was interrupted."));
    });
  } finally {
    database.close();
  }
}

async function readProfileImage(field: "avatar" | "cover"): Promise<Blob | null> {
  const database = await openProfileImageDatabase();
  try {
    return await new Promise<Blob | null>((resolve, reject) => {
      const transaction = database.transaction(PROFILE_IMAGE_STORE, "readonly");
      const request = transaction.objectStore(PROFILE_IMAGE_STORE).get(field);
      request.onsuccess = () => resolve(request.result instanceof Blob ? request.result : null);
      request.onerror = () => reject(request.error ?? new Error("Could not read the saved image."));
      transaction.onabort = () => reject(transaction.error ?? new Error("Reading the saved image was interrupted."));
    });
  } finally {
    database.close();
  }
}

function Settings() {
  const [section, setSection] = useState<SettingsSection>("Account");
  const [account, setAccount] = useState(getInitialAccount);
  const [accountDraft, setAccountDraft] = useState(getInitialAccount);
  const [profileDraft, setProfileDraft] = useState(getInitialProfile);
  const [avatarPreview, setAvatarPreview] = useState(profileDraft.avatar);
  const [coverPreview, setCoverPreview] = useState(profileDraft.cover);
  const [notifications, setNotifications] = useState(getInitialNotifications);
  const [preferences, setPreferences] = useState(getInitialPreferences);
  const [notice, setNotice] = useState<Notice>(null);
  const [modal, setModal] = useState<ModalKind>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [accountSaving, setAccountSaving] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileEditing, setProfileEditing] = useState(false);
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [passwordVisibility, setPasswordVisibility] = useState({ current: false, next: false, confirm: false });
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });
  const [problemForm, setProblemForm] = useState({ subject: "", description: "" });
  const [supportScreenshot, setSupportScreenshot] = useState<{ file: File; url: string } | null>(null);
  const [supportScreenshotError, setSupportScreenshotError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const reportScreenshotRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const profileImageSources = useRef({ avatar: profileDraft.avatar, cover: profileDraft.cover });
  const profilePreviewUrls = useRef<string[]>([]);
  const imageSelectionVersions = useRef({ avatar: 0, cover: 0 });

  const isDark = preferences.appearance === "dark";
  const outerClass = isDark ? "bg-[#100c14] text-gray-100" : "bg-white text-gray-900";
  const surfaceClass = isDark ? "border-white/10 bg-[#19131f] text-gray-100" : "border-gray-200 bg-white text-gray-900";
  const softSurfaceClass = isDark ? "border-white/10 bg-[#211a29]" : "border-gray-200 bg-gray-50/70";
  const labelClass = isDark ? "text-gray-300" : "text-gray-600";
  const mutedClass = isDark ? "text-gray-400" : "text-gray-500";
  const inputClass = `mt-1.5 w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
    isDark ? "border-white/10 bg-[#100c14] text-gray-100 placeholder:text-gray-500" : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
  }`;

  useEffect(() => {
    document.documentElement.dataset.adminAppearance = preferences.appearance;
    document.documentElement.style.colorScheme = preferences.appearance;
  }, [preferences.appearance]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal]);

  useEffect(() => () => {
    if (supportScreenshot) URL.revokeObjectURL(supportScreenshot.url);
  }, [supportScreenshot]);

  useEffect(() => {
    let active = true;
    const loadImage = async (field: "avatar" | "cover") => {
      try {
        let image = await readProfileImage(field);
        const legacySource = profileDraft[field];
        if (!image && legacySource.startsWith("data:image/")) {
          const response = await fetch(legacySource);
          if (!response.ok) throw new Error("Could not migrate the saved profile image.");
          image = await response.blob();
          await saveProfileImage(field, image);
          try {
            const storedProfile = readStored<ProfileData>(STORAGE_KEYS.profile, defaultProfile, (value): value is ProfileData =>
              isObject(value) && typeof value.avatar === "string" && typeof value.cover === "string",
            );
            window.localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify({
              ...storedProfile,
              avatar: defaultProfile.avatar,
              cover: defaultProfile.cover,
            }));
          } catch (error) {
            console.error("Could not update legacy profile image data in local storage.", error);
          }
        }
        if (image && active && imageSelectionVersions.current[field] === 0) {
          const previewUrl = URL.createObjectURL(image);
          profilePreviewUrls.current.push(previewUrl);
          profileImageSources.current[field] = previewUrl;
          if (field === "avatar") setAvatarPreview(previewUrl);
          else setCoverPreview(previewUrl);
        }
      } catch (error) {
        console.error(`Could not load the saved ${field} image.`, error);
        if (active) setNotice({ kind: "error", text: "A saved profile image could not be loaded. Choose it again to replace it." });
      }
    };

    void loadImage("avatar");
    void loadImage("cover");
    return () => {
      active = false;
      profilePreviewUrls.current.forEach((url) => URL.revokeObjectURL(url));
      profilePreviewUrls.current = [];
    };
  }, []);

  const persist = <T,>(key: string, value: T, successText: string) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setNotice({ kind: "success", text: successText });
      return true;
    } catch (error) {
      console.error(`Could not save settings value "${key}".`, error);
      setNotice({ kind: "error", text: "Could not save in this browser. Check available storage and try again." });
      return false;
    }
  };

  const submitAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!accountDraft.name.trim()) nextErrors.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountDraft.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!/^\+?[\d\s()-]{7,20}$/.test(accountDraft.phone.trim())) nextErrors.phone = "Enter a valid phone number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const next = {
      name: accountDraft.name.trim(),
      email: accountDraft.email.trim(),
      phone: accountDraft.phone.trim(),
    };
    setAccountSaving(true);
    if (persist(STORAGE_KEYS.account, next, "Account details saved in this browser. No account service is connected.")) {
      setAccount(next);
      setAccountDraft(next);
      setProfileDraft((current) => ({ ...current, name: next.name }));
    }
    setAccountSaving(false);
  };

  const submitProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!profileDraft.name.trim()) nextErrors.profileName = "Enter your name.";
    if (profileDraft.bio.length > 500) nextErrors.bio = "Keep your biography under 500 characters.";
    if (!isOptionalUrl(profileDraft.portfolio)) nextErrors.portfolio = "Enter a valid web URL.";
    if (!isOptionalUrl(profileDraft.github)) nextErrors.github = "Enter a valid web URL.";
    if (!isOptionalUrl(profileDraft.linkedin)) nextErrors.linkedin = "Enter a valid web URL.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const next = {
      ...profileDraft,
      name: profileDraft.name.trim(),
      location: profileDraft.location.trim(),
      bio: profileDraft.bio.trim(),
      skills: profileDraft.skills.trim(),
      avatar: defaultProfile.avatar,
      cover: defaultProfile.cover,
    };
    setProfileSaving(true);
    if (persist(STORAGE_KEYS.profile, next, "Profile saved in this browser. No profile service is connected.")) {
      setAccount((current) => ({ ...current, name: next.name }));
      setProfileEditing(false);
    }
    setProfileSaving(false);
  };

  const handleImage = async (event: ChangeEvent<HTMLInputElement>, field: "avatar" | "cover") => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setNotice({ kind: "error", text: "Choose a JPG, PNG, or WebP image." });
      return;
    }
    if (file.size > MAX_PROFILE_IMAGE_SIZE) {
      setNotice({ kind: "error", text: "Choose an image no larger than 5 MB." });
      return;
    }
    imageSelectionVersions.current[field] += 1;
    const previewUrl = URL.createObjectURL(file);
    profilePreviewUrls.current.push(previewUrl);
    const previousUrl = profileImageSources.current[field];
    if (previousUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previousUrl);
      profilePreviewUrls.current = profilePreviewUrls.current.filter((url) => url !== previousUrl);
    }
    profileImageSources.current[field] = previewUrl;
    if (field === "avatar") setAvatarPreview(previewUrl);
    else setCoverPreview(previewUrl);
    setNotice({ kind: "info", text: `${field === "avatar" ? "Profile photo" : "Cover photo"} preview updated; saving locally...` });
    try {
      await saveProfileImage(field, file);
      setNotice({ kind: "success", text: `${field === "avatar" ? "Profile photo" : "Cover photo"} saved in this browser only. No image upload service is connected.` });
    } catch (error) {
      console.error(`Could not save the selected ${field} image.`, error);
      setNotice({ kind: "error", text: "The image preview is available for this session, but could not be saved in this browser." });
    }
  };

  const updateNotification = (key: keyof NotificationPreferences) => {
    const next = { ...notifications, [key]: !notifications[key] };
    if (persist(STORAGE_KEYS.notifications, next, "Notification preference saved in this browser.")) setNotifications(next);
  };

  const updatePreference = (next: PreferenceData, text: string) => {
    if (persist(STORAGE_KEYS.preferences, next, text)) setPreferences(next);
  };

  const submitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!password.current) nextErrors.current = "Enter your current password.";
    if (password.next.length < 12) nextErrors.next = "Use at least 12 characters.";
    if (!/[A-Z]/.test(password.next) || !/[a-z]/.test(password.next) || !/\d/.test(password.next)) {
      nextErrors.next = "Use upper- and lowercase letters and at least one number.";
    }
    if (password.confirm !== password.next) nextErrors.confirm = "Passwords do not match.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setPassword({ current: "", next: "", confirm: "" });
    setNotice({ kind: "info", text: "Password change is unavailable until an identity service is connected. No password was changed." });
  };

  const handleSupportScreenshot = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setSupportScreenshotError("Select an image file.");
      return;
    }
    if (file.size > 3_000_000) {
      setSupportScreenshotError("Choose an image smaller than 3 MB.");
      return;
    }
    setSupportScreenshotError("");
    setSupportScreenshot((previous) => {
      if (previous) URL.revokeObjectURL(previous.url);
      return { file, url: URL.createObjectURL(file) };
    });
  };

  const submitSupportRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = modal === "support" ? contactForm.subject.trim() : problemForm.subject.trim();
    const description = modal === "support" ? contactForm.message.trim() : problemForm.description.trim();
    const nextErrors: Record<string, string> = {};
    if (!subject) nextErrors.subject = "Enter a subject.";
    if (subject.length > 120) nextErrors.subject = "Keep the subject under 120 characters.";
    if (!description) nextErrors.description = "Enter a message.";
    if (description.length < 10) nextErrors.description = "Add at least 10 characters.";
    if (description.length > 3000) nextErrors.description = "Keep the message under 3,000 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      const saved = readStored<unknown[]>(STORAGE_KEYS.supportRequests, [], Array.isArray);
      const requests = [
        ...saved,
        {
          id: `local-${Date.now()}`,
          kind: modal === "support" ? "support" : "problem",
          subject,
          description,
          screenshotName: modal === "report" ? supportScreenshot?.file.name ?? "" : "",
          createdAt: new Date().toISOString(),
          delivery: "local-only",
        },
      ];
      window.localStorage.setItem(STORAGE_KEYS.supportRequests, JSON.stringify(requests));
      setModal(null);
      setContactForm({ subject: "", message: "" });
      setProblemForm({ subject: "", description: "" });
      setSupportScreenshot(null);
      setNotice({ kind: "info", text: "Saved on this device only. The support request was not sent." });
    } catch (error) {
      console.error("Could not save the local support request.", error);
      setNotice({ kind: "error", text: "Could not save this request in the browser. Try again." });
    }
  };

  const requestAccountDeletion = () => {
    setModal(null);
    setNotice({ kind: "info", text: "Account deletion is unavailable without an account service. No account data was deleted." });
  };

  const requestLogoutAll = () => {
    setModal(null);
    setNotice({ kind: "info", text: "Session revocation is unavailable without an authentication service. No sessions were changed." });
  };

  const switchSection = (next: SettingsSection) => {
    setSection(next);
    setErrors({});
    setNotice(null);
    setModal(null);
  };

  const sectionPanelClass = `rounded-xl border p-4 shadow-sm sm:p-5 ${surfaceClass}`;

  return (
    <div id="admin-settings" data-theme={preferences.appearance} className={`min-h-[calc(100vh-7rem)] rounded-xl transition-colors ${outerClass}`}>
      {notice && (
        <div role={notice.kind === "error" ? "alert" : "status"} className={`mb-4 flex items-start gap-2 rounded-lg border px-3.5 py-3 text-xs ${
          notice.kind === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : notice.kind === "error" ? "border-rose-200 bg-rose-50 text-rose-800"
              : "border-violet-200 bg-violet-50 text-violet-900"
        }`}>
          {notice.kind === "success" ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : notice.kind === "error" ? <AlertTriangle size={16} className="mt-0.5 shrink-0" /> : <ShieldCheck size={16} className="mt-0.5 shrink-0" />}
          <span>{notice.text}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setNotice(null)} className="ml-auto rounded p-0.5 opacity-70 hover:opacity-100"><X size={14} /></button>
        </div>
      )}

      <div className="grid items-start gap-5 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[245px_minmax(0,1fr)]">
        <nav aria-label="Settings sections" className={`rounded-xl border p-2 shadow-sm ${surfaceClass}`}>
          <div className={`px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${mutedClass}`}>Settings</div>
          <div className="space-y-1">
            {sectionNavigation.map(({ title, icon: Icon }) => (
              <button
                key={title}
                type="button"
                aria-current={section === title ? "page" : undefined}
                onClick={() => switchSection(title)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition ${
                  section === title
                    ? "bg-[#100018] text-white"
                    : isDark ? "text-gray-300 hover:bg-white/5 hover:text-white" : "text-gray-600 hover:bg-violet-50 hover:text-violet-800"
                }`}
              >
                <Icon size={16} />
                <span className="flex-1">{title}</span>
                <ChevronRight size={14} className={section === title ? "opacity-70" : "opacity-0"} />
              </button>
            ))}
          </div>
          <div className={`mx-2 my-3 border-t ${isDark ? "border-white/10" : "border-gray-100"}`} />
          <Link to="/admin/profile" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition ${isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-violet-50 hover:text-violet-800"}`}>
            <UserRound size={16} /> Admin Profile
          </Link>
        </nav>

        <main className="min-w-0">
          <header className="mb-4">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{section}</h1>
            <p className={`mt-1 text-xs sm:text-sm ${mutedClass}`}>{sectionSubtitles[section]}</p>
          </header>

          {section === "Account" && (
            <div className="space-y-4">
              <form onSubmit={submitAccount} className={sectionPanelClass} noValidate>
                <PanelLabel>BASIC INFO</PanelLabel>
                <div className="mt-3 space-y-3">
                  <TextField label="Full Name" value={accountDraft.name} onChange={(value) => setAccountDraft((current) => ({ ...current, name: value }))} error={errors.name} inputClass={inputClass} labelClass={labelClass} />
                  <TextField label="Email Address" value={accountDraft.email} onChange={(value) => setAccountDraft((current) => ({ ...current, email: value }))} error={errors.email} type="email" inputClass={inputClass} labelClass={labelClass} />
                  <TextField label="Phone Number" value={accountDraft.phone} onChange={(value) => setAccountDraft((current) => ({ ...current, phone: value }))} error={errors.phone} type="tel" inputClass={inputClass} labelClass={labelClass} />
                </div>
                <LocalStateHint isDark={isDark}>Account changes are saved in this browser only. No account API or authenticated-user profile is available.</LocalStateHint>
                <button type="submit" disabled={accountSaving} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#7600C9] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#6400AA] disabled:opacity-50">
                  <Save size={14} />{accountSaving ? "Saving..." : "Save Changes"}
                </button>
              </form>

              <section className="rounded-xl border border-rose-200 bg-rose-50 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-rose-100 p-2 text-rose-700"><Trash2 size={17} /></span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-semibold text-rose-800">Danger Zone</h2>
                    <p className="mt-1 text-xs leading-5 text-rose-700">Account deletion permanently removes account data. The account service is not connected here, so no account can be deleted from this page.</p>
                    <button type="button" onClick={() => setModal("delete")} className="mt-3 rounded-lg border border-rose-300 bg-white px-3.5 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100">Delete Account</button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {section === "Profile" && (
            <form onSubmit={submitProfile} className="space-y-4" noValidate>
              <section className={`overflow-hidden rounded-xl border shadow-sm ${surfaceClass}`}>
                <div className="relative h-36 sm:h-44">
                  <img src={coverPreview} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1c0c26]/25 to-[#381448]/10" />
                  <input ref={coverInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleImage(event, "cover")} className="hidden" />
                  <button type="button" onClick={() => coverInputRef.current?.click()} className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-2 text-[10px] font-medium text-gray-800 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"><ImagePlus size={13} />Change Cover</button>
                </div>
                <div className="px-4 pb-4 sm:px-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative z-10 -mt-9 h-[76px] w-[76px] shrink-0 rounded-xl border-4 border-white bg-white shadow-sm">
                        <img src={avatarPreview} alt={`${profileDraft.name} profile`} className="h-full w-full rounded-lg object-cover object-top" />
                        <button type="button" aria-label="Change profile photo" title="Change profile photo" onClick={() => avatarInputRef.current?.click()} className="absolute -bottom-2 -right-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#7600C9] text-white shadow-md transition hover:bg-[#6400AA] focus:outline-none focus:ring-2 focus:ring-violet-300">
                          <Camera size={14} />
                        </button>
                      </div>
                      <div className="min-w-0 pt-2">
                        <h2 className="truncate text-sm font-semibold">{profileDraft.name || account.name}</h2>
                        <p className={`mt-0.5 truncate text-xs ${mutedClass}`}>{profileDraft.role} · {profileDraft.location}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <input ref={avatarInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleImage(event, "avatar")} className="hidden" />
                      <button type="button" onClick={() => { setProfileEditing(true); window.requestAnimationFrame(() => aboutRef.current?.focus()); }} className="rounded-lg bg-[#7600C9] px-3 py-2 text-[10px] font-semibold text-white hover:bg-[#6400AA]">Edit Profile</button>
                      <button type="button" onClick={() => { setErrors({}); setSection("Security"); }} className={`rounded-lg border px-3 py-2 text-[10px] font-medium ${isDark ? "border-white/10 hover:bg-white/5" : "border-gray-200 hover:bg-gray-50"}`}>Password</button>
                      <button type="button" onClick={() => avatarInputRef.current?.click()} className={`rounded-lg border px-3 py-2 text-[10px] font-medium ${isDark ? "border-white/10 hover:bg-white/5" : "border-gray-200 hover:bg-gray-50"}`}><ImagePlus size={13} className="mr-1 inline" />Profile Photo</button>
                    </div>
                  </div>
                  <div className={`mt-4 grid grid-cols-3 divide-x rounded-lg px-2 py-3 text-center ${isDark ? "divide-white/10 bg-black/10" : "divide-gray-200 bg-gray-50"}`}>
                    <StatCell label="Active Since" value="Not connected" isDark={isDark} />
                    <StatCell label="Total Managed" value="Not connected" isDark={isDark} />
                    <StatCell label="Last Login" value="Not connected" isDark={isDark} />
                  </div>
                  <p className={`mt-3 text-[10px] ${mutedClass}`}>Administrator statistics are unavailable without an account or analytics service. Profile edits are saved in this browser only.</p>
                </div>
              </section>

              <section className={sectionPanelClass}>
                <div className="flex items-center justify-between gap-2">
                  <PanelLabel>ABOUT</PanelLabel>
                  <span className={`text-[10px] ${mutedClass}`}>{profileDraft.bio.length}/500</span>
                </div>
                <TextField label="Full Name" value={profileDraft.name} onChange={(value) => setProfileDraft((current) => ({ ...current, name: value }))} disabled={!profileEditing} error={errors.profileName} inputClass={inputClass} labelClass={labelClass} />
                <textarea ref={aboutRef} value={profileDraft.bio} maxLength={520} disabled={!profileEditing} onChange={(event) => setProfileDraft((current) => ({ ...current, bio: event.target.value }))} rows={4} className={`${inputClass} resize-y disabled:opacity-70`} aria-label="Biography" />
                {errors.bio && <FieldError>{errors.bio}</FieldError>}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <TextField label="Location" value={profileDraft.location} onChange={(value) => setProfileDraft((current) => ({ ...current, location: value }))} disabled={!profileEditing} inputClass={inputClass} labelClass={labelClass} />
                  <TextField label="Skills" value={profileDraft.skills} onChange={(value) => setProfileDraft((current) => ({ ...current, skills: value }))} disabled={!profileEditing} inputClass={inputClass} labelClass={labelClass} />
                  <TextField label="Portfolio Link" value={profileDraft.portfolio} onChange={(value) => setProfileDraft((current) => ({ ...current, portfolio: value }))} disabled={!profileEditing} error={errors.portfolio} placeholder="https://example.com" inputClass={inputClass} labelClass={labelClass} />
                  <TextField label="GitHub" value={profileDraft.github} onChange={(value) => setProfileDraft((current) => ({ ...current, github: value }))} disabled={!profileEditing} error={errors.github} placeholder="https://github.com/username" inputClass={inputClass} labelClass={labelClass} />
                  <TextField label="LinkedIn" value={profileDraft.linkedin} onChange={(value) => setProfileDraft((current) => ({ ...current, linkedin: value }))} disabled={!profileEditing} error={errors.linkedin} placeholder="https://linkedin.com/in/username" inputClass={inputClass} labelClass={labelClass} />
                </div>
                <LocalStateHint isDark={isDark}>No profile API is configured. Saving updates local settings only.</LocalStateHint>
                <button type="submit" disabled={!profileEditing || profileSaving} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#7600C9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6400AA] disabled:cursor-not-allowed disabled:opacity-50"><Save size={14} />{profileSaving ? "Saving..." : "Save Changes"}</button>
              </section>
            </form>
          )}

          {section === "Notification" && (
            <section className={sectionPanelClass}>
              <PanelLabel>NOTIFICATION PREFERENCES</PanelLabel>
              <div className="mt-2">
                {notificationOptions.map((option, index) => (
                  <PreferenceRow key={option.key} title={option.title} description={option.description} isDark={isDark} last={index === notificationOptions.length - 1}>
                    <Switch checked={notifications[option.key]} label={option.title} onChange={() => updateNotification(option.key)} />
                  </PreferenceRow>
                ))}
              </div>
              <LocalStateHint isDark={isDark}>Preferences are saved in this browser. They do not update a notification service.</LocalStateHint>
            </section>
          )}

          {section === "Security" && (
            <div className="space-y-4">
              <form onSubmit={submitPassword} noValidate className={sectionPanelClass}>
                <PanelLabel>PASSWORD</PanelLabel>
                <div className="mt-3 space-y-3">
                  <PasswordField label="Current Password" value={password.current} visible={passwordVisibility.current} error={errors.current} onChange={(value) => setPassword((current) => ({ ...current, current: value }))} onToggle={() => setPasswordVisibility((current) => ({ ...current, current: !current.current }))} inputClass={inputClass} labelClass={labelClass} autoComplete="current-password" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <PasswordField label="New Password" value={password.next} visible={passwordVisibility.next} error={errors.next} onChange={(value) => setPassword((current) => ({ ...current, next: value }))} onToggle={() => setPasswordVisibility((current) => ({ ...current, next: !current.next }))} inputClass={inputClass} labelClass={labelClass} autoComplete="new-password" />
                    <PasswordField label="Confirm Password" value={password.confirm} visible={passwordVisibility.confirm} error={errors.confirm} onChange={(value) => setPassword((current) => ({ ...current, confirm: value }))} onToggle={() => setPasswordVisibility((current) => ({ ...current, confirm: !current.confirm }))} inputClass={inputClass} labelClass={labelClass} autoComplete="new-password" />
                  </div>
                </div>
                <p className={`mt-3 text-[10px] leading-4 ${mutedClass}`}>Use at least 12 characters, including uppercase, lowercase, and a number. Password fields are never saved in browser storage.</p>
                <button type="submit" className="mt-4 rounded-lg bg-[#7600C9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6400AA]">Change Password</button>
                <LocalStateHint isDark={isDark}>Password changes require an identity provider. Submitting will not change your password.</LocalStateHint>
              </form>

              <section className={sectionPanelClass}>
                <PanelLabel>ACCESS & AUTHENTICATION</PanelLabel>
                <PreferenceRow title="Two-factor authentication" description="Add an extra layer of security to your account." isDark={isDark}>
                  <button type="button" onClick={() => setModal("twoFactor")} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-semibold text-amber-800">Not connected</button>
                </PreferenceRow>
                <PreferenceRow title="Active Sessions" description="Session details are available from the identity service." isDark={isDark}>
                  <button type="button" onClick={() => setModal("sessions")} className="rounded-lg border border-gray-200 px-3 py-1.5 text-[10px] font-medium text-gray-700 hover:bg-gray-50">View status</button>
                </PreferenceRow>
                <PreferenceRow title="Logout From All Devices" description="Revoke every active session on all devices." isDark={isDark} last>
                  <button type="button" onClick={() => setModal("logoutAll")} className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-1.5 text-[10px] font-medium text-rose-700 hover:bg-rose-100">Logout all</button>
                </PreferenceRow>
                <LocalStateHint isDark={isDark}>2FA, session status, and logout require a connected authentication service. They are not active from this page.</LocalStateHint>
              </section>
            </div>
          )}

          {section === "Preferences" && (
            <div className="space-y-4">
              <section className={sectionPanelClass}>
                <PanelLabel>APPEARANCE</PanelLabel>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <ThemeChoice isDark={isDark} selected={preferences.appearance === "light"} label="Light" appearance="light" onClick={() => updatePreference({ ...preferences, appearance: "light" }, "Light appearance saved and applied to the admin interface.")} />
                  <ThemeChoice isDark={isDark} selected={preferences.appearance === "dark"} label="Dark" appearance="dark" onClick={() => updatePreference({ ...preferences, appearance: "dark" }, "Dark appearance saved and applied to the admin interface.")} />
                </div>
              </section>
              <section className={sectionPanelClass}>
                <PanelLabel>LANGUAGE & LEARNING</PanelLabel>
                <label className={`mt-3 block max-w-sm text-xs font-medium ${labelClass}`}>
                  Language preference
                  <span className="relative mt-1.5 block">
                    <select value={preferences.language} onChange={(event) => updatePreference({ ...preferences, language: event.target.value }, "Language preference saved. The interface remains in English until translations are available.")} className={inputClass}>
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="yo">Yorùbá (preference only)</option>
                      <option value="fr">Français (preference only)</option>
                    </select>
                    <ChevronDown size={14} className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${mutedClass}`} />
                  </span>
                </label>
                <p className={`mt-2 text-[10px] ${mutedClass}`}>Language selection is a preference only; untranslated languages are not represented as available translations.</p>
                <div className={`mt-4 border-t pt-4 ${isDark ? "border-white/10" : "border-gray-100"}`}>
                  <PreferenceRow title="Learning Reminders" description="Daily nudges to keep your learning streak going." isDark={isDark} last>
                    <Switch checked={preferences.reminders} label="Learning reminders" onChange={() => updatePreference({ ...preferences, reminders: !preferences.reminders }, "Learning reminder preference saved in this browser.")} />
                  </PreferenceRow>
                </div>
              </section>
            </div>
          )}

          {section === "Help & Support" && (
            <div className="space-y-3">
              <HelpAction isDark={isDark} icon={<Mail size={17} />} title="Contact Support" description="Prepare a support request for the Allnova team." onClick={() => { setErrors({}); setModal("support"); }} />
              <HelpAction isDark={isDark} icon={<CircleHelp size={17} />} title="FAQ" description="Quick answers to common questions." onClick={() => setOpenFaq((current) => current === null ? 0 : null)} />
              <HelpAction isDark={isDark} icon={<Flag size={17} />} title="Report a Problem" description="Describe a bug or unexpected experience." onClick={() => { setErrors({}); setSupportScreenshotError(""); setModal("report"); }} />
              {openFaq !== null && (
                <section className={sectionPanelClass}>
                  <PanelLabel>FREQUENTLY ASKED QUESTIONS</PanelLabel>
                  <div className="mt-2">
                    {faqs.map((faq, index) => (
                      <div key={faq.question} className={`border-b last:border-b-0 ${isDark ? "border-white/10" : "border-gray-100"}`}>
                        <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq((current) => current === index ? null : index)} className="flex w-full items-center justify-between gap-3 py-3 text-left text-xs font-medium">
                          {faq.question}<ChevronDown size={14} className={`shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                        </button>
                        {openFaq === index && <p className={`pb-3 text-xs leading-5 ${mutedClass}`}>{faq.answer}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
              <LocalStateHint isDark={isDark}>Support forms save locally in this browser. There is no helpdesk or support API connected.</LocalStateHint>
            </div>
          )}
        </main>
      </div>

      {modal && (
        <SettingsModal title={modalTitle(modal)} onClose={() => setModal(null)} isDark={isDark}>
          {modal === "delete" && (
            <ConfirmationMessage
              icon={<Trash2 size={19} />}
              tone="danger"
              description="Deleting an account is permanent. No authenticated account deletion service is available here, and confirming will not delete anything."
              confirmLabel="Acknowledge"
              onCancel={() => setModal(null)}
              onConfirm={requestAccountDeletion}
            />
          )}
          {modal === "logoutAll" && (
            <ConfirmationMessage
              icon={<LogOut size={19} />}
              tone="danger"
              description="This would sign out all active devices. An authentication service is not connected, so confirming will not revoke sessions or log you out."
              confirmLabel="Acknowledge"
              onCancel={() => setModal(null)}
              onConfirm={requestLogoutAll}
            />
          )}
          {modal === "twoFactor" && <UnavailablePanel text="Two-factor authentication cannot be enabled or checked until an identity service is connected. No security setting was changed." />}
          {modal === "sessions" && <UnavailablePanel text="Active session information is not available in this frontend. Connect the authentication service to view or manage sessions." />}
          {(modal === "support" || modal === "report") && (
            <form onSubmit={submitSupportRequest} noValidate>
              <p className={`mb-4 text-xs leading-5 ${mutedClass}`}>
                This form stores a local request draft only. It will not be sent until a support backend is connected.
              </p>
              <TextField
                label="Subject"
                value={modal === "support" ? contactForm.subject : problemForm.subject}
                onChange={(value) => modal === "support"
                  ? setContactForm((current) => ({ ...current, subject: value }))
                  : setProblemForm((current) => ({ ...current, subject: value }))}
                error={errors.subject}
                inputClass={inputClass}
                labelClass={labelClass}
              />
              <label className={`mt-3 block text-xs font-medium ${labelClass}`}>
                {modal === "support" ? "Message" : "Description"}
                <textarea
                  value={modal === "support" ? contactForm.message : problemForm.description}
                  onChange={(event) => modal === "support"
                    ? setContactForm((current) => ({ ...current, message: event.target.value }))
                    : setProblemForm((current) => ({ ...current, description: event.target.value }))}
                  rows={5}
                  maxLength={3100}
                  className={`${inputClass} resize-y`}
                />
                {errors.description && <FieldError>{errors.description}</FieldError>}
              </label>
              {modal === "report" && (
                <div className="mt-3">
                  <input ref={reportScreenshotRef} type="file" accept="image/*" onChange={handleSupportScreenshot} className="hidden" />
                  <button type="button" onClick={() => reportScreenshotRef.current?.click()} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${isDark ? "border-white/10 hover:bg-white/5" : "border-gray-200 hover:bg-gray-50"}`}><FileImage size={14} />Attach Screenshot (Optional)</button>
                  {supportScreenshot && <p className={`mt-2 truncate text-[10px] ${mutedClass}`}>{supportScreenshot.file.name} · local preview only <button type="button" onClick={() => setSupportScreenshot(null)} className="ml-2 text-rose-600">Remove</button></p>}
                  {supportScreenshotError && <FieldError>{supportScreenshotError}</FieldError>}
                </div>
              )}
              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setModal(null)} className={`rounded-lg border px-4 py-2.5 text-xs font-medium ${isDark ? "border-white/10 text-gray-200 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>Cancel</button>
                <button type="submit" className="rounded-lg bg-[#7600C9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6400AA]">Save Local Draft</button>
              </div>
            </form>
          )}
        </SettingsModal>
      )}
    </div>
  );
}

function isOptionalUrl(value: string) {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function modalTitle(modal: ModalKind) {
  if (modal === "delete") return "Delete Account";
  if (modal === "logoutAll") return "Logout From All Devices";
  if (modal === "twoFactor") return "Two-Factor Authentication";
  if (modal === "sessions") return "Active Sessions";
  if (modal === "support") return "Contact Support";
  return "Report a Problem";
}

function PanelLabel({ children }: { children: ReactNode }) {
  return <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">{children}</h2>;
}

function FieldError({ children }: { children: ReactNode }) {
  return <span className="mt-1 block text-[10px] text-rose-600">{children}</span>;
}

function TextField({
  label,
  value,
  onChange,
  inputClass,
  labelClass,
  error,
  ...props
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  inputClass: string;
  labelClass: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const id = `settings-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <label htmlFor={id} className={`block text-xs font-medium ${labelClass}`}>
      {label}
      <input {...props} id={id} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} className={`${inputClass} ${error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : ""}`} />
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function PasswordField({
  label,
  value,
  visible,
  onChange,
  onToggle,
  error,
  inputClass,
  labelClass,
  autoComplete,
}: {
  label: string;
  value: string;
  visible: boolean;
  onChange: (value: string) => void;
  onToggle: () => void;
  error?: string;
  inputClass: string;
  labelClass: string;
  autoComplete: string;
}) {
  const id = `settings-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <label htmlFor={id} className={`block text-xs font-medium ${labelClass}`}>
      {label}
      <span className="relative block">
        <input id={id} type={visible ? "text" : "password"} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} className={`${inputClass} pr-10`} aria-invalid={Boolean(error)} />
        <button type="button" aria-label={visible ? `Hide ${label}` : `Show ${label}`} onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-700">{visible ? <EyeOff size={15} /> : <Eye size={15} />}</button>
      </span>
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function Switch({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={onChange} className={`relative h-5 w-10 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 ${checked ? "bg-[#7600C9]" : "bg-gray-300"}`}>
      <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : ""}`} />
    </button>
  );
}

function PreferenceRow({ title, description, children, isDark, last = false }: { title: string; description: string; children: ReactNode; isDark: boolean; last?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 py-3 ${last ? "" : `border-b ${isDark ? "border-white/10" : "border-gray-200"}`}`}>
      <div className="min-w-0">
        <p className="text-xs font-medium">{title}</p>
        <p className={`mt-0.5 text-[10px] leading-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{description}</p>
      </div>
      {children}
    </div>
  );
}

function ThemeChoice({ selected, label, appearance, isDark, onClick }: { selected: boolean; label: string; appearance: Appearance; isDark: boolean; onClick: () => void }) {
  const dark = appearance === "dark";
  const selectedClass = selected
    ? isDark ? "border-violet-400 bg-violet-950/40 ring-1 ring-violet-500/40" : "border-violet-300 bg-violet-50 ring-1 ring-violet-200"
    : isDark ? "border-white/10 hover:border-violet-400" : "border-gray-200 hover:border-violet-200";
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`rounded-lg border p-3 text-left transition ${selectedClass}`}>
      <span className={`block h-10 rounded-md ${dark ? "bg-[#100018]" : "bg-white"} ${selected ? "ring-1 ring-violet-100" : "border border-gray-100"}`} />
      <span className={`mt-2 flex items-center justify-between text-xs font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>{label}{selected && <Check size={14} className="text-violet-500" />}</span>
    </button>
  );
}

function StatCell({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  return <div className="px-1"><p className={`text-[8px] font-semibold uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}>{label}</p><p className="mt-1 text-[10px] font-medium">{value}</p></div>;
}

function LocalStateHint({ children, isDark }: { children: ReactNode; isDark: boolean }) {
  return <p className={`mt-3 flex items-start gap-1.5 text-[10px] leading-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}><ShieldCheck size={12} className="mt-0.5 shrink-0" />{children}</p>;
}

function HelpAction({ icon, title, description, isDark, onClick }: { icon: ReactNode; title: string; description: string; isDark: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${isDark ? "border-white/10 bg-[#19131f] hover:border-violet-400 hover:bg-white/5" : "border-gray-200 bg-white hover:border-violet-200 hover:bg-violet-50/40"}`}>
      <span className="rounded-lg bg-violet-50 p-2 text-violet-700">{icon}</span>
      <span className="min-w-0 flex-1"><span className={`block text-xs font-medium ${isDark ? "text-gray-100" : "text-gray-900"}`}>{title}</span><span className={`mt-0.5 block text-[10px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>{description}</span></span>
      <ChevronRight size={15} className="text-gray-400" />
    </button>
  );
}

function SettingsModal({ title, children, onClose, isDark }: { title: string; children: ReactNode; onClose: () => void; isDark: boolean }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="settings-modal-title" className={`my-auto w-full max-w-lg rounded-xl border p-5 shadow-2xl sm:p-6 ${isDark ? "border-white/10 bg-[#19131f] text-gray-100" : "border-gray-100 bg-white text-gray-900"}`}>
        <header className="mb-4 flex items-center justify-between gap-3"><h2 id="settings-modal-title" className="text-base font-semibold">{title}</h2><button type="button" aria-label="Close dialog" onClick={onClose} className={`rounded-md p-1.5 ${isDark ? "text-gray-400 hover:bg-white/10 hover:text-white" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"}`}><X size={17} /></button></header>
        {children}
      </section>
    </div>
  );
}

function ConfirmationMessage({ icon, tone, description, confirmLabel, onCancel, onConfirm }: { icon: ReactNode; tone: "danger"; description: string; confirmLabel: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <>
      <div className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-900"><span className="shrink-0">{icon}</span><p className="text-xs leading-5">{description}</p></div>
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="rounded-lg border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
        <button type="button" onClick={onConfirm} className={`rounded-lg px-4 py-2.5 text-xs font-semibold text-white ${tone === "danger" ? "bg-rose-700 hover:bg-rose-800" : "bg-[#7600C9] hover:bg-[#6400AA]"}`}>{confirmLabel}</button>
      </div>
    </>
  );
}

function UnavailablePanel({ text }: { text: string }) {
  return <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900"><AlertTriangle size={17} className="mt-0.5 shrink-0" /><p className="text-xs leading-5">{text}</p></div>;
}

export default Settings;