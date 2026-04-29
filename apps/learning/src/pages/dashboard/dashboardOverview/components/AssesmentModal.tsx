import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import ResultView from "./ResultModal"
import AnalyzingView from "./AnalyzerModal"

// Types
interface Option {
  id: string;
  label: string;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: Option[];
}

// Mock Questions
const questions: Question[] = [
  {
    id: 1,
    title: "What interest you the most??",
    subtitle: "Choose the one that feels most true to you",
    options: [
      { id: "design", label: "Designing app & website" },
      { id: "coding", label: "Building software & coding" },
      { id: "ai", label: "Working with AI" },
      { id: "explore", label: "Still exploring" }
    ]
  },
  {
    id: 2,
    title: "What Type of work excite you?",
    subtitle: "Choose the one that feels most true to you",
    options: [
      { id: "creative", label: "Creative design work" },
      { id: "logic", label: "Logic problem solving" },
      { id: "automation", label: "Automation & productivity" },
      { id: "unsure", label: "Not sure yet" }
    ]
  },
  {
    id: 3,
    title: "What Type of work excite you?",
    subtitle: "Choose the one that feels most true to you",
    options: [
      { id: "creative", label: "Creative design work" },
      { id: "logic", label: "Logic problem solving" },
      { id: "automation", label: "Automation & productivity" },
      { id: "unsure", label: "Not sure yet" }
    ]
  },
  {
    id: 4,
    title: "What Type of work excite you?",
    subtitle: "Choose the one that feels most true to you",
    options: [
      { id: "creative", label: "Creative design work" },
      { id: "logic", label: "Logic problem solving" },
      { id: "automation", label: "Automation & productivity" },
      { id: "unsure", label: "Not sure yet" }
    ]
  },
  {
    id: 5,
    title: "What Type of work excite you?",
    subtitle: "Choose the one that feels most true to you",
    options: [
      { id: "creative", label: "Creative design work" },
      { id: "logic", label: "Logic problem solving" },
      { id: "automation", label: "Automation & productivity" },
      { id: "unsure", label: "Not sure yet" }
    ]
  },
  {
    id: 6,
    title: "What is your experience level?",
    subtitle: "Choose the one that feels most true to you",
    options: [
      { id: "2-5", label: "2-5 hours" },
      { id: "5-7", label: "5-7 hours" },
      { id: "7-10", label: "7-10 hours" }
    ]
  }
];

const ProgressDots = ({ current }: { current: number }) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-6 rounded-full ${
            i < current ? "bg-purple-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const OptionCard = ({
  label,
  selected,
  onClick
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-6 py-4 rounded-xl border transition ${
      selected
        ? "border-purple-600 bg-purple-50"
        : "border-gray-300 hover:border-gray-400"
    }`}
  >
    <span className="text-sm font-medium">{label}</span>
  </button>
);
type ViewState = "assessment" | "analyzing" | "result";

const SkillAssessmentModal = ({
	open,
	onClose,
	onComplete
}: {
	open: boolean;
	onClose: () => void;
	onComplete: () => void;
}) => {
	const [step, setStep] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [view, setView] = useState<ViewState>("assessment");


const answeredCount = Object.keys(answers).length;
const progressPercentage = Math.round((answeredCount / questions.length) * 100);

	const question = questions[step];

	// Reset modal when opened
	useEffect(() => {
		if (open) {
			setView("assessment");
			setStep(0);
		}
	}, [open]);


	if (!open) return null;

  const handleNext = () => {
		if (step < questions.length - 1) {
			setStep((prev) => prev + 1);
		} else {
			// Trigger the parent flow instead of internal state change
			onComplete();
		}
	};
	
	

	const handleBack = () => {
		if (step > 0) setStep((prev) => prev - 1);
	};

	const handleSelect = (id: string) => {
		setAnswers((prev) => ({ ...prev, [question.id]: id }));
	};

	const isLast = step === questions.length - 1;

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
			<div className="bg-white w-full max-w-3xl rounded-2xl p-6">
				{/* Header */}
				<div className="flex justify-between items-center mb-4">
					<div className="font-semibold text-purple-600">ALLNOVA</div>
					<div className="flex items-center gap-4">
						<span className="text-sm text-gray-600">Skill assessment</span>
						<button onClick={onClose}>
							<X />
						</button>
					</div>
				</div>

				{/* Progress */}
				<div className="flex justify-between items-center mb-4">
					<span className="text-sm text-gray-600">
						Question {step + 1} of {questions.length}
					</span>
					<span className="text-sm text-gray-600">
						{progressPercentage}% Complete
					</span>
				</div>

				<ProgressDots current={step + 1} />

				{/* Content */}
				<div className="text-center mt-8 mb-6">
					<h2 className="text-xl font-semibold mb-2">{question.title}</h2>
					<p className="text-gray-500 text-sm">{question.subtitle}</p>
				</div>

				<div className="space-y-4">
					{question.options.map((opt) => (
						<OptionCard
							key={opt.id}
							label={opt.label}
							selected={answers[question.id] === opt.id}
							onClick={() => handleSelect(opt.id)}
						/>
					))}
				</div>

				{/* Footer */}
				<div className="flex justify-between items-center mt-8">
					<button
						onClick={handleBack}
						className="text-gray-500 disabled:opacity-30"
						disabled={step === 0}
					>
						Back
					</button>

					<button
						onClick={handleNext}
						className="bg-purple-600 text-white px-6 py-3 rounded-xl"
					>
						{isLast ? "See Result →" : "Next"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SkillAssessmentModal;

