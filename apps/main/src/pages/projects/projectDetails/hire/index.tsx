import React from "react";
import { useNavigate } from "react-router-dom";

const OfferFlow: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="mx-auto max-w-3xl px-6 py-24">
			<div className="rounded-xl border border-amber-200 bg-amber-50 p-8">
				<h1 className="text-2xl font-bold text-gray-900">Payments are not available yet</h1>
				<p className="mt-3 text-gray-700">
					Allnova beta does not process payments, hold funds, or collect card, bank, or cryptocurrency details.
					You can still hire a freelancer and manage the project without making a payment through this app.
				</p>
				<button
					onClick={() => navigate("/clients/projects")}
					className="mt-6 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
				>
					Return to projects
				</button>
			</div>
		</div>
	);
};

export default OfferFlow;
