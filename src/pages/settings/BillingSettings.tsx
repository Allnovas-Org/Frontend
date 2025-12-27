/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
	Add,
	Download,
	CreditCard as CreditCardIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import AddFirstBillingModal from "./components/billings-modal/AddFirstBillingModal";
import BillingSetupConfirmation from "./components/billings-modal/BillingSetupConfirmation";
import EditBilling from "./components/billings-modal/EditBilling";

interface BillingMethod {
	id: string;
	cardType: string;
	lastFourDigits: string;
	expiryDate: string;
	isDefault: boolean;
}

interface BillingHistoryItem {
	id: string;
	invoiceNumber: string;
	date: string;
	amount: string;
	status: "Paid" | "Pending" | "Failed";
}

const BillingSettings: React.FC = () => {
	// Temporary toggles for prototype
	const [hasBillingMethods, setHasBillingMethods] = useState(false);
	const [hasBillingHistory, setHasBillingHistory] = useState(false);

	const [isAddBillingOpen, setIsAddBillingOpen] = useState(false);
	const [isEditBillingOpen, setIsEditBillingOpen] = useState(false);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [newCardData, setNewCardData] = useState<any>(null);

	// Sample data
	const billingMethod: BillingMethod = {
		id: "1",
		cardType: "Visa",
		lastFourDigits: "4242",
		expiryDate: "12/25",
		isDefault: true,
	};

	const billingHistory: BillingHistoryItem[] = [
		{
			id: "1",
			invoiceNumber: "INV-2025-10-001",
			date: "Oct 23, 2025",
			amount: "$99.00",
			status: "Paid",
		},
		{
			id: "2",
			invoiceNumber: "INV-2025-09-001",
			date: "Sep 23, 2025",
			amount: "$99.00",
			status: "Paid",
		},
		{
			id: "3",
			invoiceNumber: "INV-2025-08-001",
			date: "Aug 23, 2025",
			amount: "$99.00",
			status: "Paid",
		},
	];

	const handleAddBilling = (billingData: any) => {
		const lastFourDigits = billingData.cardNumber.replace(/\s/g, "").slice(-4);
		const expiryDate = `${billingData.expirationMonth}/${billingData.expirationYear}`;

		const newCard = {
			id: Date.now().toString(),
			cardType: "Visa Card",
			lastFourDigits,
			expiryDate,
			isDefault: true,
		};

		setNewCardData(newCard);
		setIsAddBillingOpen(false);
		setIsConfirmationOpen(true);
	};

	const handleUpdateBilling = (cardData: any) => {
		console.log("Updated card:", cardData);
		setIsEditBillingOpen(false);
	};

	const handleConfirmationClose = () => {
		setIsConfirmationOpen(false);
		setNewCardData(null);
		setHasBillingMethods(true);
	};

	return (
		<div className="w-full">
			{/* Temporary Prototype Toggles */}
			<div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
				<p className="text-sm font-semibold text-yellow-900 mb-2">
					Prototype Toggles (Temporary)
				</p>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Switch
							checked={hasBillingMethods}
							onChange={(e) => setHasBillingMethods(e.target.checked)}
							sx={{
								"& .MuiSwitch-switchBase.Mui-checked": {
									color: "#F05658",
								},
								"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
									backgroundColor: "#F05658",
								},
							}}
						/>
						<span className="text-sm text-gray-700">Has Billing Methods</span>
					</div>
					<div className="flex items-center gap-2">
						<Switch
							checked={hasBillingHistory}
							onChange={(e) => setHasBillingHistory(e.target.checked)}
							sx={{
								"& .MuiSwitch-switchBase.Mui-checked": {
									color: "#F05658",
								},
								"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
									backgroundColor: "#F05658",
								},
							}}
						/>
						<span className="text-sm text-gray-700">Has Billing History</span>
					</div>
				</div>
			</div>

			{/* Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-900 mb-1">
					Billing/Payment
				</h2>
				<p className="text-sm text-gray-500">Manage payments and invoices</p>
			</div>

			{/* Billing Method Section */}
			<div className="mb-8">
				<h3 className="text-base font-semibold text-gray-900 mb-4">
					Billing Method
				</h3>

				{!hasBillingMethods ? (
					/* Empty State */
					<div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
						<p className="text-sm text-gray-600 mb-4">
							You haven't set up any billing methods yet. Your billing method
							will be charged only when your available balance from Allnova
							earnings is not sufficient to pay for your Go pro membership
						</p>
						<button
							onClick={() => setIsAddBillingOpen(true)}
							className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
							style={{ color: "#F05658" }}
						>
							<Add fontSize="small" />
							Add a billing method
						</button>
					</div>
				) : (
					/* Has Billing Method */
					<div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
						<div>
							<h4 className="text-base font-semibold text-gray-900 mb-1">
								Visa ending in {billingMethod.lastFourDigits}
							</h4>
							<p className="text-sm text-gray-500">
								Expires {billingMethod.expiryDate}
							</p>
						</div>
						<button
							onClick={() => setIsEditBillingOpen(true)}
							className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
						>
							Update
						</button>
					</div>
				)}
			</div>

			{/* Billing History Section */}
			{hasBillingMethods && (
				<div className="mb-8">
					<h3 className="text-base font-semibold text-gray-900 mb-4">
						Billing History
					</h3>

					{!hasBillingHistory ? (
						/* Empty History State */
						<div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center">
							<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
								<CreditCardIcon sx={{ fontSize: 32, color: "#9CA3AF" }} />
							</div>
							<p className="text-sm text-gray-500">No billing history yet.</p>
						</div>
					) : (
						/* Has Billing History */
						<div className="space-y-3">
							{billingHistory.map((item) => (
								<div
									key={item.id}
									className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
								>
									<div>
										<h4 className="text-base font-semibold text-gray-900 mb-1">
											{item.invoiceNumber}
										</h4>
										<p className="text-sm text-gray-500">{item.date}</p>
									</div>
									<div className="flex items-center gap-4">
										<div className="text-right">
											<p className="text-base font-semibold text-gray-900">
												{item.amount}
											</p>
											<p className="text-sm font-medium text-green-600">
												{item.status}
											</p>
										</div>
										<button className="text-gray-400 hover:text-gray-600">
											<Download />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{/* Subscription Section */}
			{hasBillingMethods && (
				<div>
					<h3 className="text-base font-semibold text-gray-900 mb-4">
						Subscription
					</h3>

					<div className="bg-white border border-gray-200 rounded-lg p-6">
						<div className="flex items-center justify-between mb-6">
							<div>
								<h4 className="text-lg font-semibold text-gray-900 mb-1">
									Pro Plan
								</h4>
								<p className="text-sm text-gray-500">Oct 23, 2025</p>
							</div>
							<span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
								Active
							</span>
						</div>

						<div className="flex gap-3">
							<button
								className="px-6 py-2 text-sm text-white rounded-lg transition"
								style={{ backgroundColor: "#F05658" }}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = "#d94446";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = "#F05658";
								}}
							>
								Change Plan
							</button>
							<button className="px-6 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
								Cancel Subscription
							</button>
						</div>
					</div>

					{/* Link to Payment Methods */}
					<div className="mt-4">
						<Link
							to="/settings/billing/payment-methods"
							className="text-sm font-medium hover:underline"
							style={{ color: "#F05658" }}
						>
							View Payment Methods →
						</Link>
					</div>
				</div>
			)}

			{/* Add First Billing Modal */}
			<AddFirstBillingModal
				open={isAddBillingOpen}
				onClose={() => setIsAddBillingOpen(false)}
				onSave={handleAddBilling}
			/>

			{/* Edit Billing Modal */}
			<EditBilling
				open={isEditBillingOpen}
				onClose={() => setIsEditBillingOpen(false)}
				onUpdate={handleUpdateBilling}
			/>

			{/* Billing Setup Confirmation */}
			{newCardData && (
				<BillingSetupConfirmation
					open={isConfirmationOpen}
					onClose={handleConfirmationClose}
					cardData={{
						cardType: newCardData.cardType,
						lastFourDigits: newCardData.lastFourDigits,
						expiryDate: newCardData.expiryDate,
					}}
				/>
			)}
		</div>
	);
};

export default BillingSettings;
