import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, Plus, Upload, X } from "lucide-react";
import { AdminAuthenticationError } from "../services/adminDashboardApi";
import { createAdminFreelancer } from "../services/adminFreelancersApi";

const availabilityOptions = [
  "Full Time",
  "Part Time",
  "Internship",
  "Contract",
  "Freelance",
];

const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];
const acceptedImageExtensions = ["jpg", "jpeg", "png", "gif"];
const maxImageSize = 5 * 1024 * 1024;
const fieldClassName =
  "h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-gray-700 placeholder:text-gray-400 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600";
const labelClassName = "mb-1.5 block text-[11px] font-medium text-gray-700";

export default function AddFreelancer() {
  const navigate = useNavigate();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [availability, setAvailability] = useState("");
  const [bio, setBio] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!profilePhoto) {
      setPhotoPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(profilePhoto);
    setPhotoPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [profilePhoto]);

  function addSkill() {
    const skill = skillInput.trim();
    if (skill) {
      setSkills((current) =>
        current.some((existing) => existing.toLowerCase() === skill.toLowerCase())
          ? current
          : [...current, skill]
      );
    }
    setSkillInput("");
  }

  function handleSkillKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    const validType =
      acceptedImageExtensions.includes(extension) &&
      (!file.type || acceptedImageTypes.includes(file.type));
    if (!validType) {
      setProfilePhoto(null);
      setFormMessage("Choose a JPG, PNG, or GIF image.");
      event.target.value = "";
      return;
    }
    if (file.size > maxImageSize) {
      setProfilePhoto(null);
      setFormMessage("The profile picture must be no larger than 5 MB.");
      event.target.value = "";
      return;
    }

    setProfilePhoto(file);
    setFormMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setFormMessage("");

    if (!fullName.trim() || !email.trim() || !jobTitle.trim()) {
      setFormMessage("Full Name, Email Address, and Job Title are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormMessage("Enter a valid email address.");
      return;
    }
    if (
      yearsOfExperience.trim() &&
      (!Number.isFinite(Number(yearsOfExperience)) ||
        Number(yearsOfExperience) < 0)
    ) {
      setFormMessage("Years of Experience must be zero or greater.");
      return;
    }
    if (
      hourlyRate.trim() &&
      (!Number.isFinite(Number(hourlyRate)) || Number(hourlyRate) < 0)
    ) {
      setFormMessage("Hourly Rate must be zero or greater.");
      return;
    }

    if (hourlyRate.trim() || availability) {
      const unsupportedFields = [
        hourlyRate.trim() ? "Hourly Rate" : "",
        availability ? "Availability" : "",
      ].filter(Boolean);
      setFormMessage(
        `${unsupportedFields.join(" and ")} cannot be saved yet because the API does not support ${
          unsupportedFields.length > 1 ? "these fields" : "this field"
        }. Clear ${unsupportedFields.length > 1 ? "them" : "it"} to continue.`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await createAdminFreelancer({
        fullName: fullName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        location: location.trim(),
        title: jobTitle.trim(),
        yearsOfExperience: yearsOfExperience.trim(),
        skills,
        bio: bio.trim(),
        profilePicture: profilePhoto,
      });
      navigate("/admin/freelancers", {
        replace: true,
        state: { freelancerCreated: true },
      });
    } catch (submitError) {
      if (submitError instanceof AdminAuthenticationError) {
        navigate("/sign-in", { replace: true });
        return;
      }

      setFormMessage(
        submitError instanceof Error
          ? submitError.message
          : "Could not create freelancer. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Add New Freelancer
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Fill in the details to add a freelancer to your platform
        </p>
      </header>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <section>
          <label className={labelClassName} htmlFor="freelancer-photo">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-slate-400 bg-slate-50 text-slate-400 hover:border-purple-500"
              aria-label="Choose profile picture"
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Selected profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Upload size={20} />
              )}
            </button>
            <div>
              <input
                ref={photoInputRef}
                id="freelancer-photo"
                type="file"
                accept="image/jpeg,image/png,image/gif,.jpg,.jpeg,.png,.gif"
                onChange={handlePhotoChange}
                className="sr-only"
              />
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="inline-flex h-8 items-center gap-2 rounded-md bg-purple-700 px-3 text-xs font-medium text-white hover:bg-purple-800"
              >
                <Plus size={14} />
                Upload Photo
              </button>
              <p className="mt-1 text-[10px] text-gray-500">
                JPG, PNG or GIF. Max size 5MB
              </p>
              {profilePhoto && (
                <p className="mt-1 max-w-xs truncate text-[10px] text-gray-600">
                  Preview only: {profilePhoto.name}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div>
              <label className={labelClassName} htmlFor="freelancer-full-name">
                Full Name *
              </label>
              <input
                id="freelancer-full-name"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="John Doe"
                className={fieldClassName}
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="freelancer-email">
                Email Address *
              </label>
              <input
                id="freelancer-email"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="john@example.com"
                className={fieldClassName}
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="freelancer-phone">
                Phone Number
              </label>
              <input
                id="freelancer-phone"
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="+1 (555) 000-0000"
                className={fieldClassName}
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="freelancer-location">
                Location
              </label>
              <input
                id="freelancer-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="New York, USA"
                className={fieldClassName}
              />
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            Professional Information
          </h2>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div>
              <label className={labelClassName} htmlFor="freelancer-job-title">
                Job Title *
              </label>
              <input
                id="freelancer-job-title"
                required
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="Senior Product Designer"
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                className={labelClassName}
                htmlFor="freelancer-experience"
              >
                Years of Experience
              </label>
              <input
                id="freelancer-experience"
                type="number"
                min="0"
                step="1"
                value={yearsOfExperience}
                onChange={(event) => setYearsOfExperience(event.target.value)}
                placeholder="5+ years"
                className={fieldClassName}
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="freelancer-rate">
                Hourly Rate (USD)
              </label>
              <input
                id="freelancer-rate"
                type="number"
                min="0"
                step="0.01"
                value={hourlyRate}
                onChange={(event) => setHourlyRate(event.target.value)}
                placeholder="$50 - $100/hr"
                className={fieldClassName}
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="freelancer-availability">
                Availability
              </label>
              <select
                id="freelancer-availability"
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                className={fieldClassName}
              >
                <option value="">Select availability</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <label className={labelClassName} htmlFor="freelancer-skill-input">
            Skills
          </label>
          <div className="flex gap-2">
            <input
              id="freelancer-skill-input"
              value={skillInput}
              onChange={(event) => setSkillInput(event.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Add a skill (press Enter)"
              className={fieldClassName}
            />
            <button
              type="button"
              onClick={addSkill}
              className="h-9 shrink-0 rounded-md bg-gray-100 px-4 text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              Add
            </button>
          </div>
          {skills.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-medium text-purple-800"
                >
                  {skill}
                  <button
                    type="button"
                    aria-label={`Remove ${skill}`}
                    onClick={() =>
                      setSkills((current) =>
                        current.filter((_, skillIndex) => skillIndex !== index)
                      )
                    }
                    className="text-purple-700 hover:text-purple-950"
                  >
                    <X size={12} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-5">
          <label className={labelClassName} htmlFor="freelancer-bio">
            Bio
          </label>
          <textarea
            id="freelancer-bio"
            rows={4}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="Tell us about yourself..."
            className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
          />
        </section>

        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-5 text-amber-900">
          Hourly Rate and Availability are not supported by the API yet. Clear
          those fields to submit; all other entered details will be saved.
        </p>

        {formMessage && (
          <p role="alert" className="mt-3 text-xs text-red-600">
            {formMessage}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/freelancers")}
            disabled={isSubmitting}
            className="h-9 rounded-md border border-slate-300 px-4 text-xs text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-purple-700 px-4 text-xs font-medium text-white hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting && (
              <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
            )}
            {isSubmitting ? "Adding freelancer..." : "Add freelancer"}
          </button>
        </div>
      </form>
    </div>
  );
}
