import React, { useState } from "react";
import {
	Dialog,
	IconButton,
	TextField,
	Select,
	MenuItem,
	FormControl,
	Alert,
} from "@mui/material";
import { Close, Info } from "@mui/icons-material";

interface EditBillingProps {
	open: boolean;
	onClose: () => void;
	onUpdate: (cardData: CardData) => void;
	initialData?: CardData;
}

interface CardData {
	cardholderName: string;
	cardNumber: string;
	month: string;
	year: string;
	cvv: string;
}

const EditBilling: React.FC<EditBillingProps> = ({
	open,
	onClose,
	onUpdate,
	initialData = {
		cardholderName: "Mark Brun",
		cardNumber: "4242 4242 4242 4242",
		month: "",
		year: "",
		cvv: "",
	},
}) => {
	const [cardData, setCardData] = useState<CardData>(initialData);

	const handleChange = (field: keyof CardData, value: string) => {
		setCardData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCardNumberChange = (value: string) => {
		// Remove non-digits and format with spaces
		const cleaned = value.replace(/\D/g, "");
		const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
		handleChange("cardNumber", formatted.slice(0, 19)); // Max 16 digits + 3 spaces
	};

	const handleUpdate = () => {
		onUpdate(cardData);
	};

	// Generate month options
	const months = Array.from({ length: 12 }, (_, i) => {
		const month = String(i + 1).padStart(2, "0");
		return month;
	});

	// Generate year options (current year + 10 years)
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 11 }, (_, i) => String(currentYear + i));

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="sm"
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: "12px",
					padding: "8px",
				},
			}}
		>
			{/* Header */}
			<div className="flex items-start justify-between p-4 pb-2">
				<h2 className="text-xl font-semibold text-gray-900">Update Card</h2>
				<IconButton onClick={onClose} size="small" sx={{ color: "gray" }}>
					<Close />
				</IconButton>
			</div>

			<div className="px-6 pb-6 space-y-4">
				{/* Security Info Alert */}
				<Alert
					severity="success"
					icon={<Info />}
					sx={{
						borderRadius: "8px",
						backgroundColor: "#E8F5E9",
						color: "#2E7D32",
						"& .MuiAlert-icon": {
							color: "#4CAF50",
						},
					}}
				>
					Your payment information is secured with bank-level encryption
				</Alert>

				{/* Cardholder Name */}
				<div>
					<label className="block text-sm font-medium text-gray-900 mb-2">
						Cardholder Name
					</label>
					<FormControl fullWidth>
						<Select
							value={cardData.cardholderName}
							onChange={(e) => handleChange("cardholderName", e.target.value)}
							size="small"
							sx={{ borderRadius: "8px" }}
						>
							<MenuItem value="Mark Brun">Mark Brun</MenuItem>
							<MenuItem value="John Doe">John Doe</MenuItem>
							<MenuItem value="Jane Smith">Jane Smith</MenuItem>
						</Select>
					</FormControl>
				</div>

				{/* Card Number */}
				<div>
					<label className="block text-sm font-medium text-gray-900 mb-2">
						Card Number
					</label>
					<TextField
						fullWidth
						placeholder="4242 4242 4242 4242"
						value={cardData.cardNumber}
						onChange={(e) => handleCardNumberChange(e.target.value)}
						size="small"
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "8px",
							},
						}}
					/>
				</div>

				{/* Month, Year, CVV */}
				<div className="grid grid-cols-3 gap-3">
					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							Month
						</label>
						<FormControl fullWidth size="small">
							<Select
								value={cardData.month}
								onChange={(e) => handleChange("month", e.target.value)}
								displayEmpty
								sx={{ borderRadius: "8px" }}
							>
								<MenuItem value="" disabled>
									MM
								</MenuItem>
								{months.map((month) => (
									<MenuItem key={month} value={month}>
										{month}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							Year
						</label>
						<FormControl fullWidth size="small">
							<Select
								value={cardData.year}
								onChange={(e) => handleChange("year", e.target.value)}
								displayEmpty
								sx={{ borderRadius: "8px" }}
							>
								<MenuItem value="" disabled>
									YYYY
								</MenuItem>
								{years.map((year) => (
									<MenuItem key={year} value={year}>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							CVV
						</label>
						<FormControl fullWidth size="small">
							<Select
								value={cardData.cvv}
								onChange={(e) => handleChange("cvv", e.target.value)}
								displayEmpty
								sx={{ borderRadius: "8px" }}
							>
								<MenuItem value="" disabled>
									123
								</MenuItem>
								<MenuItem value="123">123</MenuItem>
								<MenuItem value="456">456</MenuItem>
								<MenuItem value="789">789</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3 pt-2">
					<button
						onClick={onClose}
						className="flex-1 px-6 py-3 text-base text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Cancel
					</button>
					<button
						onClick={handleUpdate}
						className="flex-1 px-6 py-3 text-base text-white rounded-lg transition"
						style={{ backgroundColor: "#F05658" }}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#d94446";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#F05658";
						}}
					>
						Update Card
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default EditBilling;
