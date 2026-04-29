import React, { useState } from "react";
import SkillAssessmentModal from "./components/AssesmentModal";
import ActiveUserDashboard from "./components/ActiveUserDashboard";
import InActiveUserDashboard from "./components/InActiveUserDashboard";
import AnalyzingView from "./components/AnalyzerModal";
import ResultView from "./components/ResultModal";


export function DashboardOverviewPage() {
const [open, setOpen] = useState(true);
  const [isActiveUser, setIsActiveUser] = useState(false);
  
  const [view, setView] = useState<
		"idle" | "assessment" | "analyzing" | "result"
	>("idle");


	const handleAssessmentComplete = () => {
		setView("analyzing");
		// Move the timing logic here so it's outside the assessment modal
		setTimeout(() => {
			setView("result");
		}, 3000);
	};

	const handleStart = () => {
    console.log("Setting view to assessment..."); // Add this log!
    setView("assessment");
  };

	const handleFinalConversion = () => {
		setIsActiveUser(true); // Switch the dashboard
		setView("idle"); // Close the result modal
	};

	return (
		<div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
			{/* when there is an active user */}
			{isActiveUser ? (
				<ActiveUserDashboard />
			) : (
				<InActiveUserDashboard onStartAssessment={handleStart} />
			)}

			{/* Render components conditionally based on state */}
			{view === "assessment" && (
				<SkillAssessmentModal
					open={true}
					onClose={() => setView("idle")}
					onComplete={handleAssessmentComplete}
				/>
			)}

			{view === "analyzing" && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
					<div className="bg-white w-full max-w-xl rounded-2xl p-6">
						<AnalyzingView />
					</div>
				</div>
			)}

			{view === "result" && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
					<div className="bg-white w-full max-w-3xl rounded-2xl p-6 overflow-y-auto max-h-[90vh]">
						<ResultView
							onRetake={() => setView("assessment")}
							onStartLearning={handleFinalConversion}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
