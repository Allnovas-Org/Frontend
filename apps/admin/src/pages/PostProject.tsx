import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type KeyboardEvent,
  type SetStateAction,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, UploadCloud, X } from "lucide-react";
import { AdminAuthenticationError } from "../services/adminDashboardApi";
import {
  fetchAdminClients,
  type AdminClient,
  type AdminClientsPage,
} from "../services/adminClientsApi";
import { createAdminJob } from "../services/adminJobsApi";

const categories = [
  "Designer",
  "Developer",
  "content writer",
  "web designer",
  "mobile designer",
  "brand designer",
  "Freelance",
];

const inputClassName =
  "h-8 w-full rounded-md border border-slate-300 bg-white px-3 text-[11px] text-slate-700 placeholder:text-slate-400 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600";
const labelClassName = "mb-1.5 block text-[10px] font-medium text-slate-700";

function getClientLabel(client: AdminClient): string {
  const company = client.company_name?.trim();
  const name = [client.first_name, client.last_name]
    .filter((part): part is string => Boolean(part?.trim()))
    .join(" ");
  const contact = client.email?.trim() || client.username?.trim();
  const identity = company || name || "Client";
  return `${identity} · ${contact || `ID ${client.id}`}`;
}

export default function PostProject() {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [budgetType, setBudgetType] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [locationPreference, setLocationPreference] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [requirementInput, setRequirementInput] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<AdminClient | null>(null);
  const [clientSearchInput, setClientSearchInput] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [clientPageNumber, setClientPageNumber] = useState(1);
  const [clientPageUrl, setClientPageUrl] = useState<string | null>(null);
  const [clientsPage, setClientsPage] = useState<AdminClientsPage | null>(null);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsError, setClientsError] = useState("");
  const [clientRetryCount, setClientRetryCount] = useState(0);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setClientSearch(clientSearchInput.trim());
      setClientPageNumber(1);
      setClientPageUrl(null);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [clientSearchInput]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadClients() {
      setClientsLoading(true);
      setClientsError("");

      try {
        const result = await fetchAdminClients({
          search: clientSearch,
          page: clientPageNumber,
          pageUrl: clientPageUrl,
          signal: controller.signal,
        });
        if (active) {
          setClientsPage(result);
        }
      } catch (error) {
        if (error instanceof AdminAuthenticationError) {
          if (active) {
            navigate("/sign-in", { replace: true });
          }
          return;
        }

        if (active && !controller.signal.aborted) {
          setClientsPage(null);
          setClientsError(
            error instanceof Error ? error.message : "Could not load clients."
          );
        }
      } finally {
        if (active) {
          setClientsLoading(false);
        }
      }
    }

    void loadClients();

    return () => {
      active = false;
      controller.abort();
    };
  }, [
    clientPageNumber,
    clientPageUrl,
    clientRetryCount,
    clientSearch,
    navigate,
  ]);

  function addTag(
    value: string,
    setValue: (nextValue: string) => void,
    setItems: Dispatch<SetStateAction<string[]>>
  ) {
    const item = value.trim();
    if (item) {
      setItems((current) =>
        current.some((existing) => existing.toLowerCase() === item.toLowerCase())
          ? current
          : [...current, item]
      );
    }
    setValue("");
  }

  function handleTagKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    addItem: () => void
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      addItem();
    }
  }

  function changeClientPage(direction: "next" | "previous") {
    if (!clientsPage) {
      return;
    }
    const target =
      direction === "next" ? clientsPage.next : clientsPage.previous;
    if (!target) {
      return;
    }
    setClientPageUrl(target);
    setClientPageNumber((current) =>
      direction === "next" ? current + 1 : Math.max(1, current - 1)
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!projectTitle.trim() || !category || !budgetType || !projectDescription.trim()) {
      setFormError("Complete all required fields before posting.");
      return;
    }

    if (!selectedClient?.is_active) {
      setFormError("Select an active client account before posting.");
      return;
    }

    const clientId = Number(selectedClient.id);
    const budget = Number(budgetAmount);
    if (!Number.isSafeInteger(clientId) || clientId <= 0) {
      setFormError("The selected client has an invalid account ID.");
      return;
    }
    if (!budgetAmount.trim() || !Number.isFinite(budget) || budget <= 0) {
      setFormError("Enter a valid budget amount greater than zero.");
      return;
    }

    const additionalDetails = [
      companyName.trim() ? `Company Name: ${companyName.trim()}` : "",
      `Budget Type: ${budgetType}`,
      projectDuration.trim()
        ? `Project Duration: ${projectDuration.trim()}`
        : "",
      locationPreference
        ? `Location Preference: ${locationPreference}`
        : "",
      requirements.length
        ? `Requirements:\n${requirements.map((item) => `- ${item}`).join("\n")}`
        : "",
    ].filter(Boolean);
    const description = [
      projectDescription.trim(),
      "Additional project details:",
      ...additionalDetails,
    ].join("\n\n");

    setIsSubmitting(true);
    try {
      await createAdminJob({
        client: clientId,
        title: projectTitle.trim(),
        description,
        budget,
        currency: "USD",
        category,
        skills: requiredSkills,
      });
      navigate("/admin/freelancers");
    } catch (error) {
      if (error instanceof AdminAuthenticationError) {
        navigate("/sign-in", { replace: true });
      } else {
        setFormError(
          error instanceof Error
            ? error.message
            : "Unable to post the project. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const clients = clientsPage?.results ?? [];
  const activeClients = clients.filter((client) => client.is_active);
  const selectedClientIsOnPage = clients.some(
    (client) => String(client.id) === String(selectedClient?.id)
  );

  return (
    <main className="min-h-screen bg-white px-4 py-6 sm:px-6 sm:py-7">
      <div className="mx-auto w-full max-w-[534px]">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-purple-700"
        >
          <ArrowLeft size={13} />
          Back to Dashboard
        </Link>
        <h1 className="mt-3 text-[14px] font-semibold text-slate-900">
          Post a New Project
        </h1>
        <p className="mt-2 text-[10px] text-slate-500">
          Create a project listing to find the perfect freelancer
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-lg border border-slate-200 bg-white p-5"
        >
          <section>
            <h2 className="mb-2 text-[11px] font-semibold text-slate-900">
              Project Details
            </h2>
            <label className={labelClassName} htmlFor="project-title">
              Project Title *
            </label>
            <input
              id="project-title"
              required
              value={projectTitle}
              onChange={(event) => setProjectTitle(event.target.value)}
              placeholder="e.g., Mobile App UI/UX Design"
              className={inputClassName}
            />

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="company-name">
                  Company Name
                </label>
                <input
                  id="company-name"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  placeholder="Your company name"
                  className={inputClassName}
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="project-category">
                  Category *
                </label>
                <select
                  id="project-category"
                  required
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className={inputClassName}
                >
                  <option value="">Select category</option>
                  {categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className={labelClassName} htmlFor="project-client">
                Client Account *
              </label>
              <div className="space-y-2">
                <input
                  type="search"
                  value={clientSearchInput}
                  onChange={(event) => setClientSearchInput(event.target.value)}
                  placeholder="Search active clients by name, company, or email"
                  className={inputClassName}
                  aria-label="Search client accounts"
                />
                <select
                  id="project-client"
                  required
                  value={selectedClient ? String(selectedClient.id) : ""}
                  disabled={clientsLoading && !clientsPage}
                  onChange={(event) => {
                    const client = activeClients.find(
                      (item) => String(item.id) === event.target.value
                    );
                    setSelectedClient(client ?? null);
                  }}
                  className={inputClassName}
                >
                  <option value="">
                    {clientsLoading
                      ? "Loading client accounts..."
                      : "Select an active client"}
                  </option>
                  {selectedClient && !selectedClientIsOnPage && (
                    <option value={String(selectedClient.id)}>
                      {getClientLabel(selectedClient)}
                    </option>
                  )}
                  {activeClients.map((client) => (
                    <option key={client.id} value={String(client.id)}>
                      {getClientLabel(client)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2 text-[9px] text-slate-500">
                <span>Only active accounts from the client directory are selectable.</span>
                {clientsPage && (
                  <span>
                    {clientsPage.count.toLocaleString()} clients · Page{" "}
                    {clientPageNumber}
                  </span>
                )}
              </div>
              {clientsError ? (
                <div role="alert" className="mt-2 text-[10px] text-red-600">
                  {clientsError}
                  <button
                    type="button"
                    onClick={() =>
                      setClientRetryCount((current) => current + 1)
                    }
                    className="ml-2 font-medium underline"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={!clientsPage?.previous || clientsLoading}
                    onClick={() => changeClientPage("previous")}
                    className="rounded border border-slate-200 px-2 py-1 text-[9px] text-slate-600 disabled:opacity-40"
                  >
                    Previous clients
                  </button>
                  <button
                    type="button"
                    disabled={!clientsPage?.next || clientsLoading}
                    onClick={() => changeClientPage("next")}
                    className="rounded border border-slate-200 px-2 py-1 text-[9px] text-slate-600 disabled:opacity-40"
                  >
                    More clients
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="mt-5">
            <h2 className="mb-2 text-[11px] font-semibold text-slate-900">
              Budget &amp; Timeline
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="budget-type">
                  Budget Type *
                </label>
                <select
                  id="budget-type"
                  required
                  value={budgetType}
                  onChange={(event) => setBudgetType(event.target.value)}
                  className={inputClassName}
                >
                  <option value="">Select budget type</option>
                  <option value="Fixed price">Fixed price</option>
                  <option value="Hourly rate">Hourly rate</option>
                </select>
              </div>
              <div>
                <label className={labelClassName} htmlFor="budget-amount">
                  Budget Amount (USD) *
                </label>
                <input
                  id="budget-amount"
                  required
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={budgetAmount}
                  onChange={(event) => setBudgetAmount(event.target.value)}
                  placeholder="$5,000"
                  className={inputClassName}
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="project-duration">
                  Project Duration
                </label>
                <input
                  id="project-duration"
                  value={projectDuration}
                  onChange={(event) => setProjectDuration(event.target.value)}
                  placeholder="e.g., 2-3 months"
                  className={inputClassName}
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="location-preference">
                  Location Preference
                </label>
                <select
                  id="location-preference"
                  value={locationPreference}
                  onChange={(event) => setLocationPreference(event.target.value)}
                  className={inputClassName}
                >
                  <option value="">Select location</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>
          </section>

          <section className="mt-5">
            <label className={labelClassName} htmlFor="project-description">
              Project Description *
            </label>
            <textarea
              id="project-description"
              required
              rows={5}
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
              placeholder="Describe your project in detail. What are you looking to achieve? What is the scope of work?"
              className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-[11px] text-slate-700 placeholder:text-slate-400 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </section>

          <section className="mt-5">
            <label className={labelClassName} htmlFor="requirement-input">
              Requirements
            </label>
            <div className="flex gap-1.5">
              <input
                id="requirement-input"
                value={requirementInput}
                onChange={(event) => setRequirementInput(event.target.value)}
                onKeyDown={(event) =>
                  handleTagKeyDown(event, () =>
                    addTag(requirementInput, setRequirementInput, setRequirements)
                  )
                }
                placeholder="Add a requirement (press Enter)"
                className={inputClassName}
              />
              <button
                type="button"
                onClick={() =>
                  addTag(requirementInput, setRequirementInput, setRequirements)
                }
                className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md bg-slate-100 px-3 text-[10px] text-slate-700 hover:bg-slate-200"
              >
                <Plus size={12} />
                Add
              </button>
            </div>
            {requirements.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {requirements.map((requirement, index) => (
                  <li
                    key={`${requirement}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-[10px] text-purple-800"
                  >
                    {requirement}
                    <button
                      type="button"
                      aria-label={`Remove requirement ${requirement}`}
                      onClick={() =>
                        setRequirements((current) =>
                          current.filter((_, itemIndex) => itemIndex !== index)
                        )
                      }
                      className="text-purple-700 hover:text-purple-950"
                    >
                      <X size={11} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-5">
            <label className={labelClassName} htmlFor="skill-input">
              Required Skills
            </label>
            <div className="flex gap-1.5">
              <input
                id="skill-input"
                value={skillInput}
                onChange={(event) => setSkillInput(event.target.value)}
                onKeyDown={(event) =>
                  handleTagKeyDown(event, () =>
                    addTag(skillInput, setSkillInput, setRequiredSkills)
                  )
                }
                placeholder="Add required skills (press Enter)"
                className={inputClassName}
              />
              <button
                type="button"
                onClick={() =>
                  addTag(skillInput, setSkillInput, setRequiredSkills)
                }
                className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md bg-slate-100 px-3 text-[10px] text-slate-700 hover:bg-slate-200"
              >
                <Plus size={12} />
                Add
              </button>
            </div>
            {requiredSkills.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {requiredSkills.map((skill, index) => (
                  <li
                    key={`${skill}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-[10px] text-purple-800"
                  >
                    {skill}
                    <button
                      type="button"
                      aria-label={`Remove skill ${skill}`}
                      onClick={() =>
                        setRequiredSkills((current) =>
                          current.filter((_, itemIndex) => itemIndex !== index)
                        )
                      }
                      className="text-purple-700 hover:text-purple-950"
                    >
                      <X size={11} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-5">
            <p className={labelClassName}>Attachments (Optional)</p>
            <div
              aria-disabled="true"
              className="flex h-[108px] cursor-not-allowed flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center"
            >
              <UploadCloud size={26} className="text-slate-400" />
              <p className="mt-2 text-[10px] font-medium text-slate-600">
                File uploads are not supported yet
              </p>
              <p className="mt-1 text-[9px] text-slate-400">
                PDF, DOC, DOCX, PNG, JPG (max 10MB)
              </p>
            </div>
            <p className="mt-1 text-[9px] text-slate-500">
              Attachments cannot be submitted with the current API.
            </p>
          </section>

          <p className="mt-4 text-[9px] leading-4 text-slate-500">
            The current API stores client, title, description, budget, currency,
            category and skills. Company name, budget type, duration, location
            and requirements are included in the description so they are retained.
          </p>

          {formError && (
            <p role="alert" className="mt-3 text-[10px] text-red-600">
              {formError}
            </p>
          )}

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/admin/freelancers")}
              className="h-7 rounded-md border border-slate-300 px-2.5 text-[10px] text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled
              title="Draft saving is not supported by the current API."
              className="h-7 cursor-not-allowed rounded-md border border-purple-300 px-2.5 text-[10px] text-purple-700 opacity-50"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-7 items-center justify-center rounded-md bg-purple-700 px-3 text-[10px] font-medium text-white hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Posting..." : "Post new project"}
            </button>
          </div>
          <p className="mt-2 text-right text-[9px] text-slate-500">
            Draft saving is unavailable because the API does not support draft
            status.
          </p>
        </form>
      </div>
    </main>
  );
}
