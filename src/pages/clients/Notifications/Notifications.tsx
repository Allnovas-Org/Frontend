import React, { useState } from "react";
import { Search, Apps } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import NotificationItem from "./modals/NotificationItem";

interface Notification {
	id: string;
	type: "job_alert" | "system_alert" | "system_maintenance";
	title: string;
	message: string;
	timestamp: string;
	isNew?: boolean;
	isRead?: boolean;
	category: "all" | "unread" | "archived";
}

const Notifications = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilter, setActiveFilter] = useState<
		"all" | "unread" | "archived"
	>("all");
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: "1",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "12 hours ago",
			isNew: true,
			isRead: false,
			category: "all",
		},
		{
			id: "2",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "12 hours ago",
			isRead: true,
			category: "all",
		},
		{
			id: "3",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "12 hours ago",
			isRead: true,
			category: "all",
		},
		{
			id: "4",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "12 hours ago",
			isRead: true,
			category: "all",
		},
		{
			id: "5",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "12 hours ago",
			isNew: true,
			isRead: false,
			category: "all",
		},
		{
			id: "6",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "12 hours ago",
			isNew: true,
			isRead: false,
			category: "all",
		},
		{
			id: "7",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "12 hours ago",
			isNew: true,
			isRead: false,
			category: "all",
		},
		{
			id: "8",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "12 hours ago",
			isRead: true,
			category: "all",
		},
		{
			id: "9",
			type: "job_alert",
			title: "Job Alert",
			message:
				'A job proposal was submitted for your job posting "UI/UX Designer Needed for Simple Design Task".',
			timestamp: "12 hours ago",
			isNew: true,
			isRead: false,
			category: "all",
		},
	]);

	const handleMarkAsRead = (id: string) => {
		setNotifications((prev) =>
			prev.map((notif) =>
				notif.id === id ? { ...notif, isRead: true, isNew: false } : notif,
			),
		);
	};

	const handleArchive = (id: string) => {
		setNotifications((prev) =>
			prev.map((notif) =>
				notif.id === id ? { ...notif, category: "archived" } : notif,
			),
		);
	};

	const handleDelete = (id: string) => {
		setNotifications((prev) => prev.filter((notif) => notif.id !== id));
	};

	const filteredNotifications = notifications.filter((notif) => {
		if (activeFilter === "unread" && notif.isRead) return false;
		if (activeFilter === "archived" && notif.category !== "archived")
			return false;
		if (activeFilter === "all" && notif.category === "archived") return false;

		if (searchQuery) {
			return (
				notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				notif.message.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		return true;
	});

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-6xl mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-6">
					<div className="flex items-center justify-between mb-6">
						<TextField
							placeholder="Search notifications..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							variant="outlined"
							fullWidth
							sx={{
								maxWidth: 540,
								backgroundColor: "white",
								borderRadius: 2,
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderColor: "#e5e7eb",
									},
									"&:hover fieldset": {
										borderColor: "#d1d5db",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#9ca3af",
									},
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search sx={{ color: "#9ca3af" }} />
									</InputAdornment>
								),
							}}
						/>

						<div className="flex gap-2">
							<button
								onClick={() => setActiveFilter("all")}
								className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
									activeFilter === "all"
										? "bg-red-500 text-white"
										: "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300"
								}`}
							>
								<Apps sx={{ fontSize: 20 }} />
								All
							</button>
							<button
								onClick={() => setActiveFilter("unread")}
								className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
									activeFilter === "unread"
										? "bg-gray-900 text-white"
										: "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300"
								}`}
							>
								Unread
							</button>
							<button
								onClick={() => setActiveFilter("archived")}
								className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
									activeFilter === "archived"
										? "bg-gray-900 text-white"
										: "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300"
								}`}
							>
								Archived
							</button>
						</div>
					</div>
				</div>

				{/* Notifications List */}
				<div>
					{filteredNotifications.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-gray-500">No notifications found</p>
						</div>
					) : (
						filteredNotifications.map((notification) => (
							<NotificationItem
								key={notification.id}
								{...notification}
								onMarkAsRead={handleMarkAsRead}
								onArchive={handleArchive}
								onDelete={handleDelete}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Notifications;
