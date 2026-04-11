import React, { useState } from "react";
import { Close, ArrowForward } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";

interface NotificationModalProps {
	open: boolean;
	onClose: () => void;
}

interface NotificationItemData {
	id: string;
	type: "job_alert" | "system_alert" | "system_maintenance";
	title: string;
	message: string;
	timestamp: string;
	category: "today" | "yesterday";
}

const NotificationModal: React.FC<NotificationModalProps> = ({
	open,
	onClose,
}) => {
	const [notifications] = useState<NotificationItemData[]>([
		{
			id: "1",
			type: "system_alert",
			title: "System Alert",
			message:
				"A recent sign-in to your Allnova account (cc6a4247) from an unknown device or browser.",
			timestamp: "12 hours ago",
			category: "today",
		},
		{
			id: "2",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "2 hours ago",
			category: "today",
		},
		{
			id: "3",
			type: "system_maintenance",
			title: "System maintenance",
			message: "Scheduled maintenance will occur tonight from 2-4 AM",
			timestamp: "1 hour ago",
			category: "today",
		},
		{
			id: "4",
			type: "system_alert",
			title: "System Alert",
			message:
				"A recent sign-in to your Allnova account (cc6a4247) from an unknown device or browser.",
			timestamp: "12 hours ago",
			category: "yesterday",
		},
		{
			id: "5",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "2 hours ago",
			category: "yesterday",
		},
		{
			id: "6",
			type: "system_maintenance",
			title: "System maintenance",
			message: "Scheduled maintenance will occur tonight from 2-4 AM",
			timestamp: "1 hour ago",
			category: "yesterday",
		},
	]);

	const getIcon = (type: string) => {
		switch (type) {
			case "job_alert":
				return (
					<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
						<svg
							className="w-5 h-5 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
				);
			case "system_alert":
				return (
					<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
						<svg
							className="w-5 h-5 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>
				);
			case "system_maintenance":
				return (
					<div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
						<svg
							className="w-5 h-5 text-yellow-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</div>
				);
		}
	};

	const todayNotifications = notifications.filter(
		(n) => n.category === "today",
	);
	const yesterdayNotifications = notifications.filter(
		(n) => n.category === "yesterday",
	);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="sm"
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: 3,
					maxHeight: "90vh",
				},
			}}
		>
			<div className="p-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-2">
					<div>
						<h2 className="text-xl font-semibold">All Activities (20)</h2>
						<p className="text-sm text-gray-500">Latest updates</p>
					</div>
					<IconButton onClick={onClose} size="small">
						<Close />
					</IconButton>
				</div>

				{/* Notifications List */}
				<div className="mt-6 space-y-6 max-h-[60vh] overflow-y-auto">
					{/* Today Section */}
					{todayNotifications.length > 0 && (
						<div>
							<h3 className="text-sm font-medium text-gray-400 mb-4">
								Today({todayNotifications.length})
							</h3>
							<div className="space-y-4">
								{todayNotifications.map((notification) => (
									<div
										key={notification.id}
										className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
									>
										{getIcon(notification.type)}
										<div className="flex-1 min-w-0">
											<h4 className="font-semibold text-gray-900 mb-1">
												{notification.title}
											</h4>
											<p className="text-sm text-gray-600 mb-1">
												{notification.message}
											</p>
											<span className="text-xs text-gray-400">
												{notification.timestamp}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Yesterday Section */}
					{yesterdayNotifications.length > 0 && (
						<div>
							<h3 className="text-sm font-medium text-gray-400 mb-4">
								Yesterday({yesterdayNotifications.length})
							</h3>
							<div className="space-y-4">
								{yesterdayNotifications.map((notification) => (
									<div
										key={notification.id}
										className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
									>
										{getIcon(notification.type)}
										<div className="flex-1 min-w-0">
											<h4 className="font-semibold text-gray-900 mb-1">
												{notification.title}
											</h4>
											<p className="text-sm text-gray-600 mb-1">
												{notification.message}
											</p>
											<span className="text-xs text-gray-400">
												{notification.timestamp}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* See More Button */}
				<button className="w-full mt-6 py-3 text-red-500 font-medium flex items-center justify-center gap-2 hover:bg-red-50 rounded-lg transition-colors">
					See more
					<ArrowForward sx={{ fontSize: 18 }} />
				</button>
			</div>
		</Dialog>
	);
};

export default NotificationModal;
