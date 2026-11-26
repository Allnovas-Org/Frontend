import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { User, Briefcase, Globe, ShieldCheck } from "lucide-react";
import {
  clientLanguageProficiencyLevels,
  completeClientProfile,
  getClientProfilePhoto,
  getClientLanguages,
  getClientVerification,
  replaceClientLanguages,
  submitClientType,
  submitCompanyInfo,
  submitIndividualInfo,
  type ClientLanguagePreference,
  type ClientLanguageProficiency,
  type ClientVerificationResponse,
  type LanguageItem,
} from "../../../../services/client-profile.service";
import { getApiErrorMessage } from "../../../../utils/apiError";
import { useAuthStore } from "../../../../store/useAuthStore";
import ProfileTypeStep from "./steps/ProfileTypeStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import LanguageStep from "./steps/LanguageStep";
import VerificationStep from "./steps/VerificationStep";

interface BasicInfoData {
  companyName: string;
  companySize: string;
  industry: string;
  companyWebsite: string;
  companyDescription: string;
  professionalTitle: string;
  personalWebsite: string;
  aboutYou: string;
}

interface VerificationData {
  profilePhoto: File | null;
  govId: File | null;
  addressVerification: File | null;
  phone: string;
}

const isClientLanguageProficiency = (
  value: string,
): value is ClientLanguageProficiency =>
  (clientLanguageProficiencyLevels as readonly string[]).includes(value);

const ClientProfileCompletion = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileType, setProfileType] = useState<
    "individual" | "company" | null
  >(null);
  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    companyName: "",
    companySize: "",
    industry: "",
    companyWebsite: "",
    companyDescription: "",
    professionalTitle: "",
    personalWebsite: "",
    aboutYou: "",
  });
  const [languages, setLanguages] = useState<LanguageItem[]>([
    { language: "", proficiency_level: "" },
  ]);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(false);
  const [languagesLoaded, setLanguagesLoaded] = useState(false);
  const [languageLoadError, setLanguageLoadError] = useState("");
  const [verification, setVerification] = useState<VerificationData>({
    profilePhoto: null,
    govId: null,
    addressVerification: null,
    phone: "",
  });
  const [registeredPhone, setRegisteredPhone] = useState("");
  const [hasGovernmentId, setHasGovernmentId] = useState(false);
  const [hasAddressDocument, setHasAddressDocument] = useState(false);
  const [existingProfilePhotoPreview, setExistingProfilePhotoPreview] =
    useState<string | null>(null);
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const [verificationLoaded, setVerificationLoaded] = useState(false);
  const [verificationLoadError, setVerificationLoadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const completionInFlight = useRef(false);
  const languagesInFlight = useRef(false);
  const verificationInFlight = useRef(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clientUserId = useAuthStore((state) => state.user?.id);

  const loadLanguages = useCallback(async () => {
    if (languagesInFlight.current) return;
    languagesInFlight.current = true;
    setIsLoadingLanguages(true);
    setLanguageLoadError("");

    try {
      const response = await getClientLanguages();
      if (!Array.isArray(response.languages)) {
        throw new Error("The server returned an invalid language response.");
      }

      setLanguages(
        response.languages.length > 0
          ? response.languages
          : [{ language: "", proficiency_level: "" }],
      );
      setLanguagesLoaded(true);
    } catch (err) {
      setLanguagesLoaded(false);
      setLanguageLoadError(
        getApiErrorMessage(err, "Failed to load saved language preferences."),
      );
    } finally {
      languagesInFlight.current = false;
      setIsLoadingLanguages(false);
    }
  }, []);

  useEffect(() => {
    if (
      currentStep === 3 &&
      !languagesLoaded &&
      !languageLoadError &&
      !isLoadingLanguages
    ) {
      void loadLanguages();
    }
  }, [
    currentStep,
    isLoadingLanguages,
    languageLoadError,
    languagesLoaded,
    loadLanguages,
  ]);

  const loadVerification = useCallback(async () => {
    if (verificationInFlight.current) return;
    verificationInFlight.current = true;
    setIsLoadingVerification(true);
    setVerificationLoadError("");
    setError("");

    try {
      const response: ClientVerificationResponse = await getClientVerification();
      setRegisteredPhone(response.phone);
      setVerification((current) => ({ ...current, phone: response.phone }));
      setHasGovernmentId(response.has_government_id);
      setHasAddressDocument(response.has_address_document);
      setExistingProfilePhotoPreview(null);

      if (response.profile_photo_url) {
        try {
          const photoBlob = await getClientProfilePhoto();
          setExistingProfilePhotoPreview(URL.createObjectURL(photoBlob));
        } catch (photoError) {
          setError(
            getApiErrorMessage(
              photoError,
              "Could not load the saved profile photo. You can upload a replacement.",
            ),
          );
        }
      }

      setVerificationLoaded(true);
    } catch (err) {
      setVerificationLoaded(false);
      setVerificationLoadError(
        getApiErrorMessage(err, "Failed to load verification information."),
      );
    } finally {
      verificationInFlight.current = false;
      setIsLoadingVerification(false);
    }
  }, []);

  useEffect(() => {
    if (
      currentStep === 4 &&
      !verificationLoaded &&
      !verificationLoadError &&
      !isLoadingVerification
    ) {
      void loadVerification();
    }
  }, [
    currentStep,
    isLoadingVerification,
    loadVerification,
    verificationLoadError,
    verificationLoaded,
  ]);

  useEffect(() => {
    return () => {
      if (existingProfilePhotoPreview) {
        URL.revokeObjectURL(existingProfilePhotoPreview);
      }
    };
  }, [existingProfilePhotoPreview]);

  const steps = [
    { id: 1, icon: User, label: "Profile Type" },
    { id: 2, icon: Briefcase, label: "Basic Info" },
    { id: 3, icon: Globe, label: "Language" },
    { id: 4, icon: ShieldCheck, label: "Verification" },
  ];

  const submitCurrentStep = async (): Promise<boolean> => {
    if (currentStep === 1) {
      if (!profileType) {
        setError("Please select a client type");
        return false;
      }
      await submitClientType({ client_type: profileType });
    } else if (currentStep === 2) {
      if (profileType === "individual") {
        if (!basicInfo.professionalTitle.trim()) {
          setError("Professional title is required");
          return false;
        }
        if (!basicInfo.aboutYou.trim()) {
          setError("Please tell us about yourself");
          return false;
        }

        await submitIndividualInfo({
          title: basicInfo.professionalTitle,
          about_you: basicInfo.aboutYou,
          website: basicInfo.personalWebsite || undefined,
        });
      } else {
        if (!basicInfo.companyName.trim()) {
          setError("Company name is required");
          return false;
        }
        if (!basicInfo.companySize) {
          setError("Company size is required");
          return false;
        }
        if (!basicInfo.industry) {
          setError("Industry is required");
          return false;
        }
        if (!basicInfo.companyDescription.trim()) {
          setError("Company description is required");
          return false;
        }

        await submitCompanyInfo({
          company_name: basicInfo.companyName,
          company_size: parseInt(basicInfo.companySize.split("-")[0]) || 0,
          company_industry: basicInfo.industry,
          company_description: basicInfo.companyDescription,
          company_website: basicInfo.companyWebsite || undefined,
        });
      }
    } else if (currentStep === 3) {
      if (!languagesLoaded) {
        setError("Load saved language preferences before saving changes.");
        return false;
      }

      const languagePreferences: ClientLanguagePreference[] = [];
      const seenLanguages = new Set<string>();

      for (const item of languages) {
        const language = item.language.trim();
        const proficiency = item.proficiency_level;

        if (!language && !proficiency) continue;
        if (!language || !proficiency) {
          setError("Select both a language and its proficiency level.");
          return false;
        }
        if (!isClientLanguageProficiency(proficiency)) {
          setError("Select a valid proficiency level for each language.");
          return false;
        }

        const normalizedLanguage = language.toLocaleLowerCase();
        if (seenLanguages.has(normalizedLanguage)) {
          setError("Each language can only be selected once.");
          return false;
        }

        seenLanguages.add(normalizedLanguage);
        languagePreferences.push({
          language,
          proficiency_level: proficiency,
        });
      }

      const savedLanguages = await replaceClientLanguages(languagePreferences);
      if (clientUserId) {
        queryClient.setQueryData(["client-languages", clientUserId], savedLanguages);
      }
    }

    return true;
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      if (!(await submitCurrentStep())) return;
      if (currentStep < 4) setCurrentStep((prev) => prev + 1);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to save. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveAndContinueLater = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      if (await submitCurrentStep()) navigate("/clients");
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to save. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = async () => {
    if (completionInFlight.current) return;
    if (!verificationLoaded) {
      setError("Load verification information before completing your profile.");
      return;
    }

    const phone = verification.phone.trim();
    const phoneToSubmit =
      phone && phone !== registeredPhone.trim() ? phone : undefined;
    if (phoneToSubmit && !/^\+[0-9]{7,15}$/.test(phoneToSubmit)) {
      setError("Enter a phone number with a + followed by 7 to 15 digits.");
      return;
    }

    completionInFlight.current = true;
    setIsSubmitting(true);
    setError("");

    try {
      const response = await completeClientProfile({
        profile_photo: verification.profilePhoto || undefined,
        gov_id: verification.govId || undefined,
        add_ver: verification.addressVerification || undefined,
        phone: phoneToSubmit,
      });

      if (response.profile_completed === true) {
        if (clientUserId) {
          queryClient.setQueryData(["client-verification", clientUserId], response);
          if (verification.profilePhoto) {
            void queryClient.invalidateQueries({
              queryKey: ["client-profile-photo", clientUserId],
              refetchType: "none",
            });
          }
        }
        navigate("/clients");
      } else {
        setError(
          response.message ||
            "The backend did not confirm profile completion. Please try again.",
        );
      }
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Failed to complete your profile. Please try again."),
      );
    } finally {
      completionInFlight.current = false;
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / steps.length) * 100;
  const stepLoadError =
    currentStep === 3
      ? languageLoadError
      : currentStep === 4
        ? verificationLoadError
        : "";
  const isLoadingCurrentStep =
    (currentStep === 3 && isLoadingLanguages) ||
    (currentStep === 4 && isLoadingVerification);
  const isNavigationDisabled =
    isSubmitting ||
    (currentStep === 3 && (isLoadingLanguages || !languagesLoaded));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg md:text-xl font-semibold">
              Complete Your Profile
            </h1>
            <span className="text-xs text-gray-600">
              {currentStep} of {steps.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8">
            <div
              className="h-full bg-gray-800 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Step Icons */}
          <div className="flex justify-between items-center">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = step.id < currentStep;
              const isActive = step.id === currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      isCompleted || isActive ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <span
                    className={`text-xs md:text-sm text-center ${
                      isActive ? "font-semibold text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {(error || stepLoadError) && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {stepLoadError || error}
            {stepLoadError && !isLoadingCurrentStep && (
              <button
                type="button"
                onClick={() =>
                  void (currentStep === 3 ? loadLanguages() : loadVerification())
                }
                className="ml-2 underline"
              >
                Retry
              </button>
            )}
          </div>
        )}
        {currentStep === 3 && isLoadingLanguages && (
          <p className="mb-6 text-sm text-gray-600" role="status">
            Loading saved language preferences...
          </p>
        )}
        {currentStep === 4 && isLoadingVerification && (
          <p className="mb-6 text-sm text-gray-600" role="status">
            Loading existing verification information...
          </p>
        )}

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <ProfileTypeStep
              setProfileType={setProfileType}
              selectedType={profileType}
            />
          )}
          {currentStep === 2 && (
            <BasicInfoStep
              profileType={profileType}
              data={basicInfo}
              setData={setBasicInfo}
            />
          )}
          {currentStep === 3 && (
            <LanguageStep
              languages={languages}
              setLanguages={setLanguages}
              disabled={isLoadingLanguages || !languagesLoaded}
            />
          )}
          {currentStep === 4 && (
            <VerificationStep
              data={verification}
              setData={setVerification}
              existingProfilePhotoPreview={existingProfilePhotoPreview}
              hasGovernmentId={hasGovernmentId}
              hasAddressDocument={hasAddressDocument}
              disabled={
                isLoadingVerification || !verificationLoaded || isSubmitting
              }
              onError={setError}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="w-full flex justify-between items-center pt-6 md:pt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-xs md:text-sm ${
              currentStep === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          <div className="flex gap-3">
            {currentStep < 4 && (
              <button
                onClick={handleSaveAndContinueLater}
                disabled={isNavigationDisabled}
                className="px-3 md:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-xs md:text-sm"
              >
                Save & Continue Later
              </button>
            )}

            {currentStep === 4 ? (
              <button
                onClick={handleComplete}
                disabled={
                  isSubmitting || isLoadingVerification || !verificationLoaded
                }
                className="px-4 md:px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition flex items-center gap-2 text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingVerification
                  ? "Loading..."
                  : isSubmitting
                    ? "Submitting..."
                    : "Complete Profile"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isNavigationDisabled}
                className="px-4 md:px-5 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Next"}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileCompletion;