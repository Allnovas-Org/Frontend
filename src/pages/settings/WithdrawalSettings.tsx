import React, { useState } from "react";
import { Add, Info } from "@mui/icons-material";
import { Switch, Alert } from "@mui/material";

const WithdrawSettings: React.FC = () => {
	// Temporary toggle for prototype
	const [hasWithdrawalMethods, setHasWithdrawalMethods] = useState(false);

	return (
		<div className="w-full">
			{/* Temporary Prototype Toggle */}
			<div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
				<p className="text-sm font-semibold text-yellow-900 mb-2">
					Prototype Toggle (Temporary)
				</p>
				<div className="flex items-center gap-2">
					<Switch
						checked={hasWithdrawalMethods}
						onChange={(e) => setHasWithdrawalMethods(e.target.checked)}
						sx={{
							"& .MuiSwitch-switchBase.Mui-checked": {
								color: "#F05658",
							},
							"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
								backgroundColor: "#F05658",
							},
						}}
					/>
					<span className="text-sm text-gray-700">Has Withdrawal Methods</span>
				</div>
			</div>

			{/* Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-900 mb-1">Withdraw</h2>
				<p className="text-sm text-gray-500">Manage your withdrawals</p>
			</div>

			{/* Available Balance */}
			<div className="mb-6">
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h3 className="text-base font-semibold text-gray-900 mb-3">
						Available Balance
					</h3>
					<p className="text-3xl font-bold mb-1" style={{ color: "#9333EA" }}>
						$0.00
					</p>
					<p className="text-sm text-gray-500 mb-4">+$0.00 pending</p>

					{/* Warning Alert */}
					<Alert
						severity="warning"
						icon={<Info />}
						sx={{
							borderRadius: "8px",
							backgroundColor: "#FFF4E6",
							color: "#E65100",
							"& .MuiAlert-icon": {
								color: "#F57C00",
							},
						}}
					>
						To withdraw earnings, please set your withdrawal method.
					</Alert>
				</div>
			</div>

			{/* Withdrawal Schedule and Last Withdrawal */}
			<div className="grid grid-cols-2 gap-6 mb-6">
				{/* Withdrawal Schedule */}
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h3 className="text-base font-semibold text-gray-900 mb-3">
						Withdrawal Schedule
					</h3>
					<p className="text-sm text-gray-600">
						You haven't set up a schedule yet. You'll be able to set it once
						you've added a withdrawal method.
					</p>
				</div>

				{/* Last Withdrawal */}
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h3 className="text-base font-semibold text-gray-900 mb-3">
						Last Withdrawal
					</h3>
					<p className="text-sm text-gray-600">
						You haven't made any withdrawals yet.
					</p>
				</div>
			</div>

			{/* Withdrawal Method */}
			<div>
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h3 className="text-base font-semibold text-gray-900 mb-3">
						Withdrawal Method
					</h3>

					{!hasWithdrawalMethods ? (
						/* Empty State */
						<>
							<p className="text-sm text-gray-600 mb-4">
								You haven't set up any withdrawal methods yet. Your withdrawals
								will be activated and you'll be allowed to proceed with them
								only when your available balance from Allnova earnings is above
								the threshold/minimum balance.
							</p>
							<button
								onClick={() => console.log("Add withdrawal method")}
								className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
								style={{ color: "#F05658" }}
							>
								<Add fontSize="small" />
								Add withdrawal method
							</button>
						</>
					) : (
						/* Has Withdrawal Methods */
						<div>
							<p className="text-sm text-gray-600">
								Withdrawal methods will be displayed here
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WithdrawSettings;
