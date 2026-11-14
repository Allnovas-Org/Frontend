import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Archive,
  ArchiveRestore,
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCheck,
  FileText,
  GraduationCap,
  ImagePlus,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Pin,
  PinOff,
  Search,
  Send,
  ShieldCheck,
  Smile,
  X,
} from "lucide-react";

type ContactRole = "Student" | "Freelancer" | "Client" | "Administrator";
type MessageFile = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  kind: "image" | "document" | "audio";
  previewUrl?: string;
  audioSrc?: string;
};
type ChatMessage = {
  id: string;
  text: string;
  timestamp: string;
  from: "contact" | "admin";
  attachments?: MessageFile[];
  locallySaved?: boolean;
};
type Conversation = {
  id: string;
  contact: {
    name: string;
    role: ContactRole;
    email: string;
    initials: string;
    color: string;
  };
  messages: ChatMessage[];
  unreadCount: number;
  pinned: boolean;
  archived: boolean;
  authorized: boolean;
};
type ConversationTab = "All" | "Unread" | "Pinned" | "Archived";
type PendingAttachment = MessageFile & { file: File };

const sampleImage = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#ede9fe"/><stop offset="1" stop-color="#c4b5fd"/></linearGradient></defs><rect width="640" height="360" rx="24" fill="url(#g)"/><circle cx="500" cy="82" r="44" fill="#fff" fill-opacity=".52"/><path d="M0 300 180 150l100 94 105-120 255 236H0z" fill="#8b5cf6" fill-opacity=".48"/><text x="34" y="52" font-family="Arial,sans-serif" font-size="21" fill="#4c1d95">Course workshop</text></svg>',
)}`;

const initialConversations: Conversation[] = [
  {
    id: "conv-ama",
    contact: {
      name: "Ama Okafor",
      role: "Student",
      email: "ama.okafor@example.org",
      initials: "AO",
      color: "bg-sky-700",
    },
    messages: [
      { id: "ama-1", text: "Hello, I have a question about the course project.", timestamp: "2026-11-13T10:14:00", from: "contact" },
      { id: "ama-2", text: "Of course, how can I help?", timestamp: "2026-11-13T10:26:00", from: "admin" },
      { id: "ama-3", text: "I attached the workshop notes and my draft for reference.", timestamp: "2026-11-13T10:31:00", from: "contact", attachments: [
        { id: "ama-img-1", name: "course-workshop.png", mimeType: "image/svg+xml", size: 0, kind: "image", previewUrl: sampleImage },
        { id: "ama-doc-1", name: "course-outline.pdf", mimeType: "application/pdf", size: 248000, kind: "document" },
      ] },
      { id: "ama-4", text: "Thanks, I’ll review the course materials.", timestamp: "2026-11-13T10:42:00", from: "admin" },
      { id: "ama-5", text: "Thank you!", timestamp: "2026-11-14T09:05:00", from: "contact" },
    ],
    unreadCount: 0,
    pinned: false,
    archived: false,
    authorized: true,
  },
  {
    id: "conv-mark",
    contact: {
      name: "Mark Brun",
      role: "Freelancer",
      email: "mark.brun@example.org",
      initials: "MB",
      color: "bg-emerald-700",
    },
    messages: [
      { id: "mark-1", text: "I’ve shared the latest project update with the client.", timestamp: "2026-11-14T08:30:00", from: "contact" },
      { id: "mark-2", text: "Great, thank you for the update.", timestamp: "2026-11-14T08:42:00", from: "admin" },
    ],
    unreadCount: 2,
    pinned: true,
    archived: false,
    authorized: true,
  },
  {
    id: "conv-sarah",
    contact: {
      name: "Sarah Johnson",
      role: "Client",
      email: "sarah.johnson@example.org",
      initials: "SJ",
      color: "bg-rose-700",
    },
    messages: [
      { id: "sarah-1", text: "Could you let me know when the revised project brief is available?", timestamp: "2026-11-14T07:45:00", from: "contact" },
    ],
    unreadCount: 1,
    pinned: false,
    archived: false,
    authorized: true,
  },
  {
    id: "conv-chika",
    contact: {
      name: "Chika Nwosu",
      role: "Administrator",
      email: "chika.nwosu@example.org",
      initials: "CN",
      color: "bg-violet-700",
    },
    messages: [
      { id: "chika-1", text: "The updated onboarding checklist is ready for review.", timestamp: "2026-11-12T15:15:00", from: "contact" },
      { id: "chika-2", text: "I’ll take a look this afternoon.", timestamp: "2026-11-12T15:28:00", from: "admin" },
    ],
    unreadCount: 0,
    pinned: true,
    archived: false,
    authorized: true,
  },
  {
    id: "conv-tunde",
    contact: {
      name: "Tunde Adebayo",
      role: "Student",
      email: "tunde.adebayo@example.org",
      initials: "TA",
      color: "bg-amber-700",
    },
    messages: [
      { id: "tunde-1", text: "I appreciate your help with my enrollment.", timestamp: "2026-11-10T12:06:00", from: "contact" },
    ],
    unreadCount: 0,
    pinned: false,
    archived: true,
    authorized: true,
  },
];

const tabs: ConversationTab[] = ["All", "Unread", "Pinned", "Archived"];
const emojiOptions = ["🙂", "👋", "👍", "🎉", "💡", "🙏", "✅", "😊"];

const timestampLabel = (value: string) => {
  const date = new Date(value);
  const now = new Date("2026-11-14T12:00:00");
  if (date.toDateString() === now.toDateString()) {
    return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(date);
  }
  const dayDifference = Math.floor((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
  if (dayDifference <= 1) return "Yesterday";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
};

const messageTime = (value: string) =>
  new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(value));

const dateSeparator = (value: string) => {
  const date = new Date(value);
  if (date.toDateString() === new Date("2026-11-14T12:00:00").toDateString()) return "Today";
  if (date.toDateString() === new Date("2026-11-13T12:00:00").toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(date);
};

const formatFileSize = (size: number) => {
  if (!size) return "Attachment";
  return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

function Messages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState<string | null>(initialConversations[0]?.id ?? null);
  const [activeTab, setActiveTab] = useState<ConversationTab>("All");
  const [search, setSearch] = useState("");
  const [messageText, setMessageText] = useState("");
  const [pendingFiles, setPendingFiles] = useState<PendingAttachment[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) ?? null;

  const visibleConversations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return conversations
      .filter((conversation) => conversation.authorized)
      .filter((conversation) => {
        switch (activeTab) {
          case "Unread": return conversation.unreadCount > 0 && !conversation.archived;
          case "Pinned": return conversation.pinned && !conversation.archived;
          case "Archived": return conversation.archived;
          default: return !conversation.archived;
        }
      })
      .filter((conversation) => {
        if (!query) return true;
        const latest = conversation.messages[conversation.messages.length - 1];
        return [
          conversation.contact.name,
          conversation.contact.role,
          conversation.contact.email,
          latest?.text ?? "",
        ].some((value) => value.toLowerCase().includes(query));
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned && activeTab !== "Pinned") return a.pinned ? -1 : 1;
        const lastA = a.messages[a.messages.length - 1]?.timestamp ?? "";
        const lastB = b.messages[b.messages.length - 1]?.timestamp ?? "";
        return lastB.localeCompare(lastA);
      });
  }, [activeTab, conversations, search]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [selectedId, selectedConversation?.messages.length]);

  useEffect(() => () => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const selectConversation = (conversation: Conversation) => {
    setSelectedId(conversation.id);
    setMobileChatOpen(true);
    setConversations((current) => current.map((item) =>
      item.id === conversation.id ? { ...item, unreadCount: 0 } : item,
    ));
    setMenuId(null);
  };

  const updateConversation = (id: string, update: Partial<Pick<Conversation, "pinned" | "archived" | "unreadCount">>) => {
    setConversations((current) => current.map((conversation) =>
      conversation.id === id ? { ...conversation, ...update } : conversation,
    ));
    if (update.archived === true && selectedId === id) {
      setSelectedId(null);
      setMobileChatOpen(false);
    }
    setMenuId(null);
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const attachments = selectedFiles.map((file): PendingAttachment => {
      const kind: MessageFile["kind"] = file.type.startsWith("image/") ? "image" : file.type.startsWith("audio/") ? "audio" : "document";
      const previewUrl = kind === "image" || kind === "audio" ? URL.createObjectURL(file) : undefined;
      if (previewUrl) objectUrlsRef.current.push(previewUrl);
      return {
        id: `file-${crypto.randomUUID()}`,
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        kind,
        previewUrl,
        audioSrc: kind === "audio" ? previewUrl : undefined,
        file,
      };
    });
    setPendingFiles((current) => [...current, ...attachments]);
    event.target.value = "";
    if (attachments.length) setToast("Files are available locally for preview only; uploads are not connected.");
  };

  const removePendingFile = (attachmentId: string) => {
    setPendingFiles((current) => {
      const removed = current.find((attachment) => attachment.id === attachmentId);
      if (removed?.previewUrl) {
        URL.revokeObjectURL(removed.previewUrl);
        objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== removed.previewUrl);
      }
      return current.filter((attachment) => attachment.id !== attachmentId);
    });
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = messageText.trim();
    if (!selectedConversation || (!text && pendingFiles.length === 0)) return;
    const timestamp = new Date().toISOString();
    const attachments: MessageFile[] = pendingFiles.map(({ file: _file, ...attachment }) => attachment);
    const nextMessage: ChatMessage = {
      id: `local-${crypto.randomUUID()}`,
      text,
      timestamp,
      from: "admin",
      attachments: attachments.length ? attachments : undefined,
      locallySaved: true,
    };
    setConversations((current) => current.map((conversation) =>
      conversation.id === selectedConversation.id
        ? { ...conversation, messages: [...conversation.messages, nextMessage] }
        : conversation,
    ));
    setMessageText("");
    setPendingFiles([]);
    setShowEmojiPicker(false);
    setToast("Saved in this page only. The message was not sent to the contact.");
  };

  const renderEmptyConversationList = () => {
    if (search.trim()) {
      return (
        <EmptyState
          icon={<Search size={22} />}
          title="No conversations found"
          description="Try another name, role, or message keyword."
        />
      );
    }
    const emptyCopy: Record<ConversationTab, { title: string; description: string }> = {
      All: { title: "No conversations yet", description: "Authorized conversations will appear here." },
      Unread: { title: "You're all caught up", description: "Unread conversations will appear here." },
      Pinned: { title: "No pinned conversations", description: "Pin a conversation to keep it close at hand." },
      Archived: { title: "No archived conversations", description: "Archived conversations will appear here." },
    };
    return <EmptyState icon={<MessageCircle size={23} />} {...emptyCopy[activeTab]} />;
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col pb-4">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-[28px]">Messages</h1>
          <p className="mt-1 text-sm text-gray-500">Review conversations with students, freelancers, clients, and administrators.</p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-medium text-amber-800">
          Local conversation view · sending unavailable
        </span>
      </header>

      <section className="grid min-h-[600px] flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:grid-cols-[minmax(245px,0.8fr)_minmax(0,1.65fr)] xl:grid-cols-[330px_minmax(0,1fr)]">
        <aside className={`min-h-[560px] min-w-0 flex-col border-r border-gray-200 md:flex ${mobileChatOpen ? "hidden" : "flex"}`}>
          <div className="border-b border-gray-100 px-4 pt-3">
            <div className="grid grid-cols-4" role="tablist" aria-label="Conversation filters">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 px-1 py-3 text-xs font-medium transition ${
                    activeTab === tab
                      ? "border-violet-700 text-violet-700"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 py-3">
              <label className="relative min-w-0 flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search conversations..."
                  aria-label="Search conversations"
                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />
              </label>
              <span title="Conversation access is determined by the connected account service" className="rounded-lg border border-gray-200 p-2 text-gray-400">
                <ShieldCheck size={15} />
              </span>
            </div>
          </div>
          {activeTab !== "All" && (
            <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-2.5 text-[11px] font-medium text-gray-500">
              {activeTab === "Unread" ? <MessageCircle size={14} /> : activeTab === "Pinned" ? <Pin size={14} /> : <Archive size={14} />}
              {activeTab === "Unread" ? "Unread conversations" : activeTab === "Pinned" ? "Pinned conversations" : "Archived conversations"}
            </div>
          )}
          <div className="min-h-0 flex-1 overflow-y-auto">
            {visibleConversations.length === 0
              ? renderEmptyConversationList()
              : visibleConversations.map((conversation) => (
                <ConversationRow
                  key={conversation.id}
                  conversation={conversation}
                  active={selectedId === conversation.id}
                  menuOpen={menuId === conversation.id}
                  onSelect={() => selectConversation(conversation)}
                  onMenu={() => setMenuId((current) => current === conversation.id ? null : conversation.id)}
                  onPin={() => updateConversation(conversation.id, { pinned: !conversation.pinned })}
                  onArchive={() => updateConversation(conversation.id, { archived: !conversation.archived })}
                  onRead={() => updateConversation(conversation.id, { unreadCount: conversation.unreadCount ? 0 : 1 })}
                />
              ))}
          </div>
          <div className="border-t border-gray-100 px-4 py-2.5 text-[10px] leading-4 text-gray-400">
            Conversation access is restricted by account permissions when connected.
          </div>
        </aside>

        <section className={`min-h-[560px] min-w-0 flex-col ${mobileChatOpen ? "flex" : "hidden md:flex"}`} aria-label="Active conversation">
          {selectedConversation ? (
            <>
              <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-3.5 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    aria-label="Back to conversations"
                    onClick={() => setMobileChatOpen(false)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
                  >
                    <ArrowLeft size={17} />
                  </button>
                  <Avatar contact={selectedConversation.contact} size="h-10 w-10" />
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-gray-900">{selectedConversation.contact.name}</h2>
                    <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500">
                      <RoleIcon role={selectedConversation.contact.role} />
                      {selectedConversation.contact.role}
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{selectedConversation.contact.email}</span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label={selectedConversation.pinned ? "Unpin conversation" : "Pin conversation"}
                    onClick={() => updateConversation(selectedConversation.id, { pinned: !selectedConversation.pinned })}
                    className={`rounded-lg p-2 transition hover:bg-violet-50 ${selectedConversation.pinned ? "text-violet-700" : "text-gray-500 hover:text-violet-700"}`}
                  >
                    {selectedConversation.pinned ? <PinOff size={17} /> : <Pin size={17} />}
                  </button>
                  <button
                    type="button"
                    aria-label={selectedConversation.archived ? "Unarchive conversation" : "Archive conversation"}
                    onClick={() => updateConversation(selectedConversation.id, { archived: !selectedConversation.archived })}
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-violet-50 hover:text-violet-700"
                  >
                    {selectedConversation.archived ? <ArchiveRestore size={17} /> : <Archive size={17} />}
                  </button>
                </div>
              </header>

              <div className="flex shrink-0 items-center justify-between border-b border-violet-100 bg-violet-50/50 px-4 py-2 text-[10px] text-violet-800 sm:px-5">
                <span>Messages saved in this view are not delivered to contacts.</span>
                <button
                  type="button"
                  onClick={() => updateConversation(selectedConversation.id, { unreadCount: 0 })}
                  className="shrink-0 font-medium underline decoration-violet-300 underline-offset-2 hover:text-violet-950"
                >
                  Mark as read
                </button>
              </div>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-white px-3 py-4 sm:px-5">
                <div className="mx-auto max-w-md rounded-lg bg-gray-50 px-3 py-2 text-center text-[10px] leading-4 text-gray-500">
                  Conversation preview · messages shown here are local page data.
                </div>
                <MessageHistory conversation={selectedConversation} />
                <div ref={messageEndRef} />
              </div>

              <form onSubmit={sendMessage} className="relative shrink-0 border-t border-gray-100 bg-white p-3 sm:p-4">
                {pendingFiles.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {pendingFiles.map((file) => (
                      <div key={file.id} className="flex max-w-full items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-2.5 py-1.5 text-[10px] text-violet-800">
                        {file.kind === "image" ? <ImagePlus size={13} /> : <FileText size={13} />}
                        <span className="max-w-[160px] truncate">{file.name}</span>
                        <span className="text-violet-500">Local only</span>
                        <button type="button" aria-label={`Remove ${file.name}`} onClick={() => removePendingFile(file.id)} className="rounded p-0.5 hover:bg-violet-100">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {showEmojiPicker && (
                  <div className="absolute bottom-[calc(100%-0.5rem)] left-12 z-20 grid grid-cols-4 gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    {emojiOptions.map((emoji) => (
                      <button key={emoji} type="button" onClick={() => setMessageText((text) => `${text}${emoji}`)} className="rounded-lg p-2 text-lg hover:bg-violet-50">
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt,.csv,audio/*"
                    onChange={handleFileSelection}
                    className="hidden"
                    aria-label="Choose attachment"
                  />
                  <button type="button" aria-label="Attach files" onClick={() => fileInputRef.current?.click()} className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-white hover:text-violet-700">
                    <Paperclip size={17} />
                  </button>
                  <textarea
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                      }
                    }}
                    rows={1}
                    placeholder="Write a message..."
                    aria-label="Message text"
                    className="max-h-28 min-h-9 min-w-0 flex-1 resize-y bg-transparent px-1 py-2 text-xs text-gray-800 outline-none placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    aria-label="Choose emoji"
                    aria-expanded={showEmojiPicker}
                    onClick={() => setShowEmojiPicker((current) => !current)}
                    className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-white hover:text-violet-700"
                  >
                    <Smile size={17} />
                  </button>
                  <button
                    type="submit"
                    disabled={!messageText.trim() && pendingFiles.length === 0}
                    className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#7600C9] px-3 text-xs font-semibold text-white transition hover:bg-[#6400AA] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send size={14} /> <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-[9px] text-gray-400">
                  <span>Sending is unavailable; saved messages stay in this page only.</span>
                  <span>File selection previews locally and does not upload.</span>
                </div>
              </form>
            </>
          ) : (
            <EmptyState
              className="min-h-[560px] flex-1"
              icon={<MessageCircle size={25} />}
              title={visibleConversations.length ? "Select a conversation" : "Conversations will appear here"}
              description={visibleConversations.length ? "Choose an authorized contact from the conversation list." : "No conversations are available in this view."}
            />
          )}
        </section>
      </section>

      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[80] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-start gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg sm:left-auto sm:right-6 sm:translate-x-0">
          <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

function ConversationRow({
  conversation,
  active,
  menuOpen,
  onSelect,
  onMenu,
  onPin,
  onArchive,
  onRead,
}: {
  conversation: Conversation;
  active: boolean;
  menuOpen: boolean;
  onSelect: () => void;
  onMenu: () => void;
  onPin: () => void;
  onArchive: () => void;
  onRead: () => void;
}) {
  const latest = conversation.messages[conversation.messages.length - 1];
  const preview = latest?.text || latest?.attachments?.[0]?.name || "No messages yet";
  return (
    <article className={`group relative border-b border-gray-100 transition ${active ? "bg-violet-50/70" : "hover:bg-gray-50"}`}>
      <button type="button" onClick={onSelect} className="flex w-full min-w-0 items-center gap-3 px-3 py-3 text-left sm:px-4">
        <Avatar contact={conversation.contact} size="h-10 w-10" />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-xs font-semibold text-gray-900">{conversation.contact.name}</span>
            {conversation.pinned && <Pin size={11} className="shrink-0 fill-violet-100 text-violet-600" />}
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-500">
            <RoleIcon role={conversation.contact.role} />
            {conversation.contact.role}
          </span>
          <span className="mt-1 block truncate text-[10px] text-gray-500">{preview}</span>
        </span>
        <span className="flex h-12 shrink-0 flex-col items-end justify-between">
          <span className="text-[9px] text-gray-400">{latest ? timestampLabel(latest.timestamp) : ""}</span>
          {conversation.unreadCount > 0 && (
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-violet-700 px-1 text-[9px] font-semibold text-white">
              {conversation.unreadCount}
            </span>
          )}
        </span>
      </button>
      <button
        type="button"
        aria-label={`More actions for ${conversation.contact.name}`}
        aria-expanded={menuOpen}
        onClick={(event) => { event.stopPropagation(); onMenu(); }}
        className="absolute right-2 top-10 rounded-md p-1 text-gray-400 opacity-0 transition hover:bg-white hover:text-gray-700 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-violet-300 group-hover:opacity-100"
      >
        <MoreVertical size={15} />
      </button>
      {menuOpen && (
        <div className="absolute right-2 top-[68px] z-30 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          <ActionMenuItem icon={conversation.pinned ? <PinOff size={14} /> : <Pin size={14} />} onClick={onPin}>
            {conversation.pinned ? "Unpin" : "Pin"} conversation
          </ActionMenuItem>
          <ActionMenuItem icon={conversation.archived ? <ArchiveRestore size={14} /> : <Archive size={14} />} onClick={onArchive}>
            {conversation.archived ? "Unarchive" : "Archive"}
          </ActionMenuItem>
          <ActionMenuItem icon={<CheckCheck size={14} />} onClick={onRead}>
            {conversation.unreadCount > 0 ? "Mark as read" : "Mark as unread"}
          </ActionMenuItem>
        </div>
      )}
    </article>
  );
}

function MessageHistory({ conversation }: { conversation: Conversation }) {
  let previousDate = "";
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {conversation.messages.map((message) => {
        const currentDate = new Date(message.timestamp).toDateString();
        const shouldShowDate = currentDate !== previousDate;
        previousDate = currentDate;
        const isOutgoing = message.from === "admin";
        return (
          <div key={message.id}>
            {shouldShowDate && (
              <div className="my-2 flex justify-center">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium text-gray-500">{dateSeparator(message.timestamp)}</span>
              </div>
            )}
            <div className={`flex items-end gap-2 ${isOutgoing ? "justify-end" : "justify-start"}`}>
              {!isOutgoing && <Avatar contact={conversation.contact} size="h-7 w-7" />}
              <div className={`max-w-[82%] sm:max-w-[75%] ${isOutgoing ? "items-end" : "items-start"} flex flex-col`}>
                {(message.text || message.attachments?.length) && (
                  <div className={`rounded-2xl px-3.5 py-2.5 ${
                    isOutgoing
                      ? "rounded-br-md bg-[#7600C9] text-white"
                      : "rounded-bl-md bg-gray-100 text-gray-800"
                  }`}>
                    {message.text && <p className="whitespace-pre-wrap break-words text-xs leading-5">{message.text}</p>}
                    {message.attachments?.map((attachment) => (
                      <MessageAttachment key={attachment.id} attachment={attachment} outgoing={isOutgoing} />
                    ))}
                  </div>
                )}
                <div className={`mt-1 flex items-center gap-1.5 text-[9px] text-gray-400 ${isOutgoing ? "justify-end" : ""}`}>
                  <span>{messageTime(message.timestamp)}</span>
                  {isOutgoing && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{message.locallySaved ? "Saved locally · not sent" : "Not sent"}</span>
                    </>
                  )}
                </div>
              </div>
              {isOutgoing && <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[9px] font-semibold text-violet-800">AD</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MessageAttachment({ attachment, outgoing }: { attachment: MessageFile; outgoing: boolean }) {
  if (attachment.kind === "image" && attachment.previewUrl) {
    return (
      <a href={attachment.previewUrl} target="_blank" rel="noreferrer" className="mt-2 block overflow-hidden rounded-lg">
        <img src={attachment.previewUrl} alt={attachment.name} className="max-h-56 w-full max-w-sm object-cover" />
        <span className={`mt-1 block text-[9px] ${outgoing ? "text-violet-100" : "text-gray-500"}`}>{attachment.name}</span>
      </a>
    );
  }
  if (attachment.kind === "audio" && attachment.audioSrc) {
    return (
      <div className={`mt-2 rounded-lg p-2 ${outgoing ? "bg-white/10" : "bg-white"}`}>
        <audio controls preload="none" src={attachment.audioSrc} className="h-8 max-w-full" aria-label={`Voice message: ${attachment.name}`} />
        <span className={`mt-1 block text-[9px] ${outgoing ? "text-violet-100" : "text-gray-500"}`}>{attachment.name}</span>
      </div>
    );
  }
  if (attachment.kind === "audio") {
    return <p className={`mt-2 flex items-center gap-2 rounded-lg px-2 py-2 text-[10px] ${outgoing ? "bg-white/10 text-violet-100" : "bg-white text-gray-500"}`}>Audio unavailable · no valid source</p>;
  }
  return (
    <div className={`mt-2 flex min-w-[180px] items-center gap-2.5 rounded-lg p-2.5 ${outgoing ? "bg-white/10" : "bg-white"}`}>
      <span className={`rounded-lg p-2 ${outgoing ? "bg-white/15" : "bg-violet-50 text-violet-700"}`}><FileText size={16} /></span>
      <span className="min-w-0">
        <span className="block max-w-[180px] truncate text-[10px] font-medium">{attachment.name}</span>
        <span className={`mt-0.5 block text-[9px] ${outgoing ? "text-violet-100" : "text-gray-500"}`}>{formatFileSize(attachment.size)} · attachment</span>
      </span>
    </div>
  );
}

function Avatar({ contact, size }: { contact: Conversation["contact"]; size: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${contact.color} ${size}`} aria-hidden="true">
      {contact.initials}
    </span>
  );
}

function RoleIcon({ role }: { role: ContactRole }) {
  const iconClass = "h-3 w-3 shrink-0";
  if (role === "Student") return <GraduationCap className={iconClass} />;
  if (role === "Freelancer") return <BriefcaseBusiness className={iconClass} />;
  if (role === "Client") return <Building2 className={iconClass} />;
  return <ShieldCheck className={iconClass} />;
}

function EmptyState({
  icon,
  title,
  description,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center ${className}`}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-700">{icon}</span>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1.5 max-w-xs text-xs leading-5 text-gray-500">{description}</p>
    </div>
  );
}

function ActionMenuItem({ icon, children, onClick }: { icon: React.ReactNode; children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs text-gray-700 hover:bg-violet-50 hover:text-violet-800">
      {icon}
      {children}
    </button>
  );
}

export default Messages;