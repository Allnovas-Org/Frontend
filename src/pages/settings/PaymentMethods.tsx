/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ArrowBack, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddBilling from "./components/billings-modal/AddBilling";
import EditBilling from "./components/billings-modal/EditBilling";
import ChangeDefaultBilling from "./components/billings-modal/ChangeDefaultBilling";

interface PaymentMethod {
	id: string;
	cardType: string;
	cardholderName: string;
	lastFourDigits: string;
	expiryDate: string;
	isDefault: boolean;
}

const PaymentMethods: React.FC = () => {
	const navigate = useNavigate();

	const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
		{
			id: "1",
			cardType: "VISA",
			cardholderName: "Alex Johnson",
			lastFourDigits: "4242",
			expiryDate: "12/27",
			isDefault: true,
		},
		{
			id: "2",
			cardType: "MC",
			cardholderName: "Alex Johnson",
			lastFourDigits: "4242",
			expiryDate: "12/27",
			isDefault: false,
		},
	]);

	const [isAddCardOpen, setIsAddCardOpen] = useState(false);
	const [isEditCardOpen, setIsEditCardOpen] = useState(false);
	const [isChangeDefaultOpen, setIsChangeDefaultOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState<PaymentMethod | null>(null);
	const [pendingDefaultCard, setPendingDefaultCard] = useState<string | null>(
		null,
	);

	const handleAddCard = (cardData: any) => {
		const lastFourDigits = cardData.cardNumber.replace(/\s/g, "").slice(-4);
		const expiryDate = `${cardData.month}/${cardData.year}`;

		const newCard: PaymentMethod = {
			id: Date.now().toString(),
			cardType: "VISA",
			cardholderName: cardData.cardholderName,
			lastFourDigits,
			expiryDate,
			isDefault: false,
		};

		setPaymentMethods((prev) => [...prev, newCard]);
		setIsAddCardOpen(false);
	};

	const handleEditCard = (card: PaymentMethod) => {
		setSelectedCard(card);
		setIsEditCardOpen(true);
	};

	const handleUpdateCard = (cardData: any) => {
		if (selectedCard) {
			const lastFourDigits = cardData.cardNumber.replace(/\s/g, "").slice(-4);
			const expiryDate = `${cardData.month}/${cardData.year}`;

			setPaymentMethods((prev) =>
				prev.map((card) =>
					card.id === selectedCard.id
						? {
								...card,
								cardholderName: cardData.cardholderName,
								lastFourDigits,
								expiryDate,
						  }
						: card,
				),
			);

			setIsEditCardOpen(false);

			// Ask if user wants to set as default
			setPendingDefaultCard(selectedCard.id);
			setIsChangeDefaultOpen(true);
		}
	};

	const handleSetDefault = () => {
		if (pendingDefaultCard) {
			setPaymentMethods((prev) =>
				prev.map((card) => ({
					...card,
					isDefault: card.id === pendingDefaultCard,
				})),
			);
		}
		setIsChangeDefaultOpen(false);
		setPendingDefaultCard(null);
	};

	const handleCancelSetDefault = () => {
		setIsChangeDefaultOpen(false);
		setPendingDefaultCard(null);
	};

	return (
		<div className="w-full max-w-[1200px] mx-auto p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-3">
					<button
						onClick={() => navigate(-1)}
						className="p-2 hover:bg-gray-100 rounded-lg transition"
					>
						<ArrowBack />
					</button>
					<h1 className="text-2xl font-semibold text-gray-900">
						Payment Methods
					</h1>
				</div>
				<button
					onClick={() => setIsAddCardOpen(true)}
					className="inline-flex items-center gap-2 px-6 py-2 text-sm text-white rounded-lg transition"
					style={{ backgroundColor: "#F05658" }}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = "#d94446";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = "#F05658";
					}}
				>
					<Add fontSize="small" />
					Add New Card
				</button>
			</div>

			{/* Payment Methods List */}
			<div className="space-y-4">
				{paymentMethods.map((method) => (
					<div
						key={method.id}
						className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4"
					>
						{/* Card Icon */}
						<div
							className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
								method.cardType === "VISA" ? "bg-[#F05658]" : "bg-purple-600"
							}`}
						>
							{method.cardType}
						</div>

						{/* Card Details */}
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-1">
								<h3 className="text-base font-semibold text-gray-900">
									{method.cardType === "VISA" ? "Visa" : "Mastercard"} ending in{" "}
									{method.lastFourDigits}
								</h3>
								{method.isDefault && (
									<span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded">
										Default
									</span>
								)}
							</div>
							<p className="text-sm text-gray-500">
								{method.cardholderName} • Expires {method.expiryDate}
							</p>
						</div>

						{/* Edit Button */}
						<button
							onClick={() => handleEditCard(method)}
							className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
						>
							Edit
						</button>
					</div>
				))}
			</div>

			{/* Add Card Modal */}
			<AddBilling
				open={isAddCardOpen}
				onClose={() => setIsAddCardOpen(false)}
				onAdd={handleAddCard}
			/>

			{/* Edit Card Modal */}
			{selectedCard && (
				<EditBilling
					open={isEditCardOpen}
					onClose={() => {
						setIsEditCardOpen(false);
						setSelectedCard(null);
					}}
					onUpdate={handleUpdateCard}
					initialData={{
						cardholderName: selectedCard.cardholderName,
						cardNumber: `**** **** **** ${selectedCard.lastFourDigits}`,
						month: selectedCard.expiryDate.split("/")[0],
						year: selectedCard.expiryDate.split("/")[1],
						cvv: "",
					}}
				/>
			)}

			{/* Change Default Modal */}
			<ChangeDefaultBilling
				open={isChangeDefaultOpen}
				onClose={handleCancelSetDefault}
				onConfirm={handleSetDefault}
			/>
		</div>
	);
};

export default PaymentMethods;
