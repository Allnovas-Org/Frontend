import React, { useState } from "react";
import { Switch } from "@mui/material";

interface NotificationPreferences {
	newMessages: boolean;
	projectProposals: boolean;
	paymentUpdates: boolean;
	newReviews: boolean;
	marketingEmails: boolean;
	weeklyDigest: boolean;
}

interface NotificationChannels {
	emailNotifications: boolean;
	pushNotifications: boolean;
	smsAlerts: boolean;
}

const NotificationsSettings: React.FC = () => {
	const [preferences, setPreferences] = useState<NotificationPreferences>({
		newMessages: true,
		projectProposals: true,
		paymentUpdates: true,
		newReviews: false,
		marketingEmails: false,
		weeklyDigest: true,
	});

	const [channels, setChannels] = useState<NotificationChannels>({
		emailNotifications: true,
		pushNotifications: true,
		smsAlerts: false,
	});

	const [hasChanges, setHasChanges] = useState(false);

	const handlePreferenceChange =
		(key: keyof NotificationPreferences) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPreferences((prev) => ({
				...prev,
				[key]: event.target.checked,
			}));
			setHasChanges(true);
		};

	const handleChannelChange =
		(key: keyof NotificationChannels) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setChannels((prev) => ({
				...prev,
				[key]: event.target.checked,
			}));
			setHasChanges(true);
		};

	const handleSave = () => {
		// Handle save logic here
		console.log("Saved notification preferences:", preferences, channels);
		setHasChanges(false);
	};

	const handleReset = () => {
		setPreferences({
			newMessages: true,
			projectProposals: true,
			paymentUpdates: true,
			newReviews: false,
			marketingEmails: false,
			weeklyDigest: true,
		});
		setChannels({
			emailNotifications: true,
			pushNotifications: true,
			smsAlerts: false,
		});
		setHasChanges(false);
	};

	const notificationItems = [
		{
			key: "newMessages" as keyof NotificationPreferences,
			title: "New Messages",
			description: "Get notified when clients send you messages",
			enabled: preferences.newMessages,
		},
		{
			key: "projectProposals" as keyof NotificationPreferences,
			title: "Project Proposals",
			description: "Receive alerts for new project opportunities",
			enabled: preferences.projectProposals,
		},
		{
			key: "paymentUpdates" as keyof NotificationPreferences,
			title: "Payment Updates",
			description: "Get notified about payments and invoices",
			enabled: preferences.paymentUpdates,
		},
		{
			key: "newReviews" as keyof NotificationPreferences,
			title: "New Reviews",
			description: "Alerts when clients leave feedback",
			enabled: preferences.newReviews,
		},
		{
			key: "marketingEmails" as keyof NotificationPreferences,
			title: "Marketing Emails",
			description: "Receive tips, updates, and promotional content",
			enabled: preferences.marketingEmails,
		},
		{
			key: "weeklyDigest" as keyof NotificationPreferences,
			title: "Weekly Digest",
			description: "Summary of your activity and opportunities",
			enabled: preferences.weeklyDigest,
		},
	];

	const channelItems = [
		{
			key: "emailNotifications" as keyof NotificationChannels,
			title: "Email Notifications",
			enabled: channels.emailNotifications,
		},
		{
			key: "pushNotifications" as keyof NotificationChannels,
			title: "Push Notifications",
			enabled: channels.pushNotifications,
		},
		{
			key: "smsAlerts" as keyof NotificationChannels,
			title: "SMS Alerts",
			enabled: channels.smsAlerts,
		},
	];

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-900 mb-1">
					Notifications
				</h2>
				<p className="text-sm text-gray-500">
					Control how your receive updates
				</p>
			</div>

			{/* Notification Preferences Section */}
			<div className="mb-8">
				<h3 className="text-base font-semibold text-gray-900 mb-2">
					Notification Preferences
				</h3>
				<p className="text-sm text-gray-500 mb-4">
					Choose how you want to be notified about important updates
				</p>
				<div className="space-y-3">
					{notificationItems.map((item) => (
						<div
							key={item.key}
							className="flex max-md:flex-col md:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
						>
							<div>
								<h4 className="text-sm font-semibold text-gray-900 mb-1">
									{item.title}
								</h4>
								<p className="text-sm text-gray-500">{item.description}</p>
							</div>
							<Switch
								checked={item.enabled}
								onChange={handlePreferenceChange(item.key)}
								sx={{
									"& .MuiSwitch-switchBase.Mui-checked": {
										color: "#2196F3",
									},
									"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
										backgroundColor: "#2196F3",
									},
								}}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Notification Channels Section */}
			<div className="mb-8">
				<h3 className="text-base font-semibold text-gray-900 mb-4">
					Notification Channels
				</h3>
				<div className="space-y-3">
					{channelItems.map((item) => (
						<div
							key={item.key}
							className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
						>
							<div>
								<h4 className="text-sm font-semibold text-gray-900">
									{item.title}
								</h4>
							</div>
							<Switch
								checked={item.enabled}
								onChange={handleChannelChange(item.key)}
								sx={{
									"& .MuiSwitch-switchBase.Mui-checked": {
										color: "#2196F3",
									},
									"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
										backgroundColor: "#2196F3",
									},
								}}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex max-md:flex-col max-md:gap-4 justify-between items-center pt-6 border-t border-gray-200">
				<button
					onClick={handleReset}
					className="shadow rounded-lg px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition"
				>
					Reset to Default
				</button>
				<button
					onClick={handleSave}
					disabled={!hasChanges}
					className="px-6 py-2 text-sm text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
					style={{ backgroundColor: "#F05658" }}
					onMouseEnter={(e) => {
						if (hasChanges) {
							e.currentTarget.style.backgroundColor = "#d94446";
						}
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = "#F05658";
					}}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
};

export default NotificationsSettings;
