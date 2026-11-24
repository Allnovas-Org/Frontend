import React from "react";

const BillingSettings: React.FC = () => (
	<div className="w-full">
		<div className="mb-6">
			<h2 className="mb-1 text-2xl font-semibold text-gray-900">Billing and Payments</h2>
			<p className="text-sm text-gray-500">Billing services are not available during the beta.</p>
		</div>
		<div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
			<h3 className="font-semibold text-amber-900">Payments are disabled</h3>
			<p className="mt-2 text-sm text-amber-900">
				Allnova does not currently charge subscriptions, process payments, hold funds, or provide invoices.
				No card or bank information is needed to use the beta.
			</p>
		</div>
	</div>
);

export default BillingSettings;
