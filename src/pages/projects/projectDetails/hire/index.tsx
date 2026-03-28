import React, { useState } from "react";
import OfferTypeSelector from "./offerSelector";
import FixedPriceOffer from "./fixed";
import MilestoneOffer from "./milestones";
import { SecurePaymentPage } from "./securePayment";
import { OfferSummary, OfferType } from "../../../../types";

type Step = "selectType" | "offerForm" | "payment";

const initialOffer: OfferSummary = {
  projectTitle: "Landing Page Design for Spotify",
  freelancerName: "Alex Johnson",
  type: "fixed",
  duration: "",
  deliverables: "",
  message: "",
  budget: 0,
  milestones: [],
};

const OfferFlow = () => {
  const [step, setStep] = useState<Step>("selectType");
  const [offer, setOffer] = useState<OfferSummary>(initialOffer);

  const handleSelectType = (type: OfferType) => {
    setOffer((prev) => ({
      ...prev,
      type,
      milestones: type === "milestone" ? prev.milestones : [],
    }));
    setStep("offerForm");
  };

  return (
    <div className='py-20 md:py-20 lg:py-32'>
      {step === "selectType" && (
        <OfferTypeSelector onSelect={handleSelectType} />
      )}

      {step === "offerForm" && offer.type === "fixed" && (
        <FixedPriceOffer
          offer={offer}
          onChangeType={() => setStep("selectType")}
          onSubmit={(updated) => {
            setOffer(updated);
            setStep("payment");
          }}
        />
      )}

      {step === "offerForm" && offer.type === "milestone" && (
        <MilestoneOffer
          offer={offer}
          onChangeType={() => setStep("selectType")}
          onSubmit={(updated) => {
            setOffer(updated);
            setStep("payment");
          }}
        />
      )}

      {step === "payment" && (
        <SecurePaymentPage
          offer={offer}
          onEditOffer={() => setStep("offerForm")}
        />
      )}
    </div>
  );
};

export default OfferFlow;
