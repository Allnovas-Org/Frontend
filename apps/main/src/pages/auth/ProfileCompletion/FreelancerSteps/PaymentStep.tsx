import React, { useState } from "react";
import { ChevronDown, DollarSign } from "lucide-react";

const PaymentStep = () => {
	const [hourlyRate, setHourlyRate] = useState("50");
	const [currency, setCurrency] = useState("USD - US Dollar");
	const [hoursPerWeek, setHoursPerWeek] = useState("");
	const [responseTime, setResponseTime] = useState("");

	const availabilityOptions = [
		"Less than 10 hours/week",
		"10-20 hours/week",
		"20-30 hours/week",
		"30+ hours/week",
		"Full-time (40+ hours/week)",
	];

	const responseTimeOptions = [
		"Within 1 hour",
		"Within 2-4 hours",
		"Within 24 hours",
		"Within 48 hours",
	];

	const currencies = [
		"USD - US Dollar",
		"EUR - Euro",
		"GBP - British Pound",
		"NGN - Nigerian Naira",
		"CAD - Canadian Dollar",
	];

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">Payment & Rate Settings</h2>
			<p className="text-gray-600 mb-8">
				Set your rates and payment preferences
			</p>

			{/* Your Hourly Rate */}
			<div className="mb-8">
				<h3 className="font-semibold text-lg mb-4">Your Hourly Rate</h3>

				<div className="grid grid-cols-2 gap-4 mb-4">
					{/* Hourly Rate */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Hourly Rate
						</label>
						<div className="relative">
							<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
								$
							</span>
							<input
								type="number"
								value={hourlyRate}
								onChange={(e) => setHourlyRate(e.target.value)}
								placeholder="50"
								className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
							/>
						</div>
						<p className="text-xs text-gray-500 mt-1">
							Your rate per hour of work
						</p>
					</div>

					{/* Currency */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Currency
						</label>
						<div className="relative">
							<select
								value={currency}
								onChange={(e) => setCurrency(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] appearance-none bg-white"
							>
								{currencies.map((curr) => (
									<option key={curr} value={curr}>
										{curr}
									</option>
								))}
							</select>
							<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
						</div>
					</div>
				</div>

				{/* Rate Recommendations */}
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<h4 className="font-semibold text-blue-900 mb-3">
						Rate Recommendations
					</h4>
					<div className="grid grid-cols-3 gap-4 text-sm">
						<div>
							<p className="text-blue-600 font-medium">Entry Level</p>
							<p className="text-blue-900 font-semibold">$15-30/hour</p>
						</div>
						<div>
							<p className="text-blue-600 font-medium">Intermediate</p>
							<p className="text-blue-900 font-semibold">$30-60/hour</p>
						</div>
						<div>
							<p className="text-blue-600 font-medium">Expert</p>
							<p className="text-blue-900 font-semibold">$60-150+/hour</p>
						</div>
					</div>
				</div>
			</div>

			{/* Availability */}
			<div>
				<h3 className="font-semibold text-lg mb-4">Availability</h3>

				<div className="grid grid-cols-2 gap-4">
					{/* Hours per week */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Hours per week
						</label>
						<div className="relative">
							<select
								value={hoursPerWeek}
								onChange={(e) => setHoursPerWeek(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] appearance-none bg-white"
							>
								<option value="">Select availability</option>
								{availabilityOptions.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
							<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
						</div>
					</div>

					{/* Response Time */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Response Time
						</label>
						<div className="relative">
							<select
								value={responseTime}
								onChange={(e) => setResponseTime(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] appearance-none bg-white"
							>
								<option value="">Select response time</option>
								{responseTimeOptions.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
							<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentStep;
