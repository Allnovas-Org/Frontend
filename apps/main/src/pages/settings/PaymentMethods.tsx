import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentMethods: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="mx-auto w-full max-w-[1200px] p-6">
			<div className="mb-6 flex items-center gap-3">
				<button
					onClick={() => navigate(-1)}
					className="rounded-lg p-2 transition hover:bg-gray-100"
				>
					<span className="sr-only">Go back</span>
					←
				</button>
				<h1 className="text-2xl font-semibold text-gray-900">Payment Methods</h1>
			</div>
			<div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
				<h2 className="font-semibold text-amber-900">Payment methods are disabled</h2>
				<p className="mt-2 text-sm text-amber-900">
					Payment processing is not enabled for the beta. Do not enter or share card, bank, or cryptocurrency details here.
				</p>
			</div>
		</div>
	);
};

export default PaymentMethods;
