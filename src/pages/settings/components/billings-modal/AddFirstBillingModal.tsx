import React, { useState } from "react";
import {
	Dialog,
	TextField,
	Select,
	MenuItem,
	FormControl,
	Radio,
	RadioGroup,
	FormControlLabel,
} from "@mui/material";
import { CreditCard, Lock } from "@mui/icons-material";

interface AddFirstBillingModalProps {
	open: boolean;
	onClose: () => void;
	onSave: (billingData: BillingData) => void;
}

interface BillingData {
	cardNumber: string;
	firstName: string;
	lastName: string;
	expirationMonth: string;
	expirationYear: string;
	securityCode: string;
	country: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	postalCode: string;
}

const AddFirstBillingModal: React.FC<AddFirstBillingModalProps> = ({
	open,
	onClose,
	onSave,
}) => {
	const [billingData, setBillingData] = useState<BillingData>({
		cardNumber: "",
		firstName: "",
		lastName: "",
		expirationMonth: "",
		expirationYear: "",
		securityCode: "",
		country: "USA",
		addressLine1: "",
		addressLine2: "",
		city: "",
		postalCode: "",
	});

	const handleChange = (field: keyof BillingData, value: string) => {
		setBillingData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCardNumberChange = (value: string) => {
		const cleaned = value.replace(/\D/g, "");
		const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
		handleChange("cardNumber", formatted.slice(0, 19));
	};

	const handleSave = () => {
		onSave(billingData);
	};

	const isFormValid =
		billingData.cardNumber.replace(/\s/g, "").length === 16 &&
		billingData.firstName &&
		billingData.lastName &&
		billingData.expirationMonth &&
		billingData.expirationYear &&
		billingData.securityCode &&
		billingData.country &&
		billingData.addressLine1 &&
		billingData.city;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: "12px",
					maxHeight: "90vh",
					maxWidth: "600px",
				},
			}}
		>
			<div className="p-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900 mb-1">
							Billing/Payment
						</h2>
						<p className="text-sm text-gray-500">
							Manage payments and invoices
						</p>
					</div>
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Cancel
					</button>
				</div>

				{/* Add a Billing Method */}
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Add a Billing Method
				</h3>

				{/* Payment Card Selection */}
				<div className="mb-6">
					<RadioGroup value="payment-card">
						<div className="border border-gray-200 rounded-lg p-4">
							<FormControlLabel
								value="payment-card"
								control={
									<Radio
										sx={{
											color: "#F05658",
											"&.Mui-checked": {
												color: "#F05658",
											},
										}}
									/>
								}
								label={
									<div>
										<span className="font-semibold text-gray-900">
											Payment card
										</span>
										<span className="text-sm text-gray-500 ml-2">
											Visa, Mastercard, American Express, Discover, Diners
										</span>
									</div>
								}
							/>
						</div>
					</RadioGroup>
				</div>

				{/* Card Details */}
				<div className="space-y-4 mb-6">
					{/* Card Number */}
					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							Card Number
						</label>
						<TextField
							fullWidth
							placeholder="1234 6678 9102 3466"
							value={billingData.cardNumber}
							onChange={(e) => handleCardNumberChange(e.target.value)}
							InputProps={{
								startAdornment: <CreditCard className="mr-2 text-gray-400" />,
							}}
							size="small"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "8px",
								},
							}}
						/>
						<p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
							<Lock sx={{ fontSize: 14 }} />
							Securely stored
						</p>
					</div>

					{/* First Name and Last Name */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								First Name
							</label>
							<TextField
								fullWidth
								placeholder="Alex"
								value={billingData.firstName}
								onChange={(e) => handleChange("firstName", e.target.value)}
								size="small"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								Last Name
							</label>
							<TextField
								fullWidth
								placeholder="Johnson"
								value={billingData.lastName}
								onChange={(e) => handleChange("lastName", e.target.value)}
								size="small"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
					</div>

					{/* Expiration Month, Year, Security Code */}
					<div className="grid grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								Expiration Month
							</label>
							<TextField
								fullWidth
								placeholder="MM"
								value={billingData.expirationMonth}
								onChange={(e) =>
									handleChange("expirationMonth", e.target.value)
								}
								inputProps={{ maxLength: 2 }}
								size="small"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								Expiration Year
							</label>
							<TextField
								fullWidth
								placeholder="YY"
								value={billingData.expirationYear}
								onChange={(e) => handleChange("expirationYear", e.target.value)}
								inputProps={{ maxLength: 2 }}
								size="small"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								Security Code
							</label>
							<TextField
								fullWidth
								placeholder="3 digits"
								value={billingData.securityCode}
								onChange={(e) => handleChange("securityCode", e.target.value)}
								inputProps={{ maxLength: 3 }}
								size="small"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
					</div>
				</div>

				{/* Billing Address */}
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Billing Address
				</h3>

				<div className="space-y-4 mb-6">
					{/* Country */}
					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							Country
						</label>
						<FormControl fullWidth size="small">
							<Select
								value={billingData.country}
								onChange={(e) => handleChange("country", e.target.value)}
								sx={{ borderRadius: "8px" }}
							>
								<MenuItem value="USA">USA</MenuItem>
								<MenuItem value="Canada">Canada</MenuItem>
								<MenuItem value="UK">UK</MenuItem>
								<MenuItem value="Australia">Australia</MenuItem>
							</Select>
						</FormControl>
					</div>

					{/* Address Line 1 */}
					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							Address Line 1
						</label>
						<TextField
							fullWidth
							placeholder=""
							value={billingData.addressLine1}
							onChange={(e) => handleChange("addressLine1", e.target.value)}
							size="small"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "8px",
								},
							}}
						/>
					</div>

					{/* Address Line 2 */}
					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							Address Line 2 <span className="text-gray-500">(optional)</span>
						</label>
						<TextField
							fullWidth
							placeholder=""
							value={billingData.addressLine2}
							onChange={(e) => handleChange("addressLine2", e.target.value)}
							size="small"
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "8px",
								},
							}}
						/>
					</div>

					{/* City and Postal Code */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								City
							</label>
							<TextField
								fullWidth
								placeholder=""
								value={billingData.city}
								onChange={(e) => handleChange("city", e.target.value)}
								size="small"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-900 mb-2">
								Postal Code <span className="text-gray-500">(optional)</span>
							</label>
							<TextField
								fullWidth
								placeholder=""
								value={billingData.postalCode}
								onChange={(e) => handleChange("postalCode", e.target.value)}
								size="small"
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "8px",
									},
								}}
							/>
						</div>
					</div>
				</div>

				{/* Save Button */}
				<button
					onClick={handleSave}
					disabled={!isFormValid}
					className="px-8 py-3 text-base text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
					style={{ backgroundColor: "#F05658" }}
					onMouseEnter={(e) => {
						if (isFormValid) {
							e.currentTarget.style.backgroundColor = "#d94446";
						}
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = "#F05658";
					}}
				>
					Save
				</button>
			</div>
		</Dialog>
	);
};

export default AddFirstBillingModal;
