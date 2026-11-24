import React, { useCallback, useEffect, useState } from "react";
import { Search, Apps } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import NotificationItem from "./modals/NotificationItem";
import {
	ApiNotification,
	archiveNotification,
	deleteNotification,
	listNotifications,
	markNotificationRead,
} from "../../../services/notifications.service";
import { getApiErrorMessage } from "../../../utils/apiError";

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
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [loadError, setLoadError] = useState("");
	const [loading, setLoading] = useState(true);
	const [actionError, setActionError] = useState("");

	const loadNotifications = useCallback(async () => {
		setLoading(true);
		setLoadError("");
		try {
			const page = await listNotifications();
			setNotifications(page.results.map(mapNotification));
		} catch (error) {
			setLoadError(
				getApiErrorMessage(error, "Unable to load notifications."),
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadNotifications();
	}, [loadNotifications]);

	const handleMarkAsRead = async (id: string) => {
		try {
			const updated = await markNotificationRead(id);
			setNotifications((current) =>
				current.map((notification) =>
					notification.id === id ? mapNotification(updated) : notification,
				),
			);
		} catch (error) {
			setActionError(getApiErrorMessage(error, "Unable to mark as read."));
		}
	};

	const handleArchive = async (id: string) => {
		try {
			const updated = await archiveNotification(id);
			setNotifications((current) =>
				current.map((notification) =>
					notification.id === id ? mapNotification(updated) : notification,
				),
			);
		} catch (error) {
			setActionError(getApiErrorMessage(error, "Unable to archive notification."));
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteNotification(id);
			setNotifications((current) =>
				current.filter((notification) => notification.id !== id),
			);
		} catch (error) {
			setActionError(getApiErrorMessage(error, "Unable to delete notification."));
		}
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
						loading ? (
							<div className="text-center py-12">
								<p className="text-gray-500">Loading notifications…</p>
							</div>
						) : loadError ? (
							<div role="alert" className="text-center py-12 text-red-600">
								{loadError}
							</div>
						) : (
						<div className="text-center py-12">
							<p className="text-gray-500">No notifications found</p>
						</div>
						)
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
					{actionError ? (
						<p role="alert" className="mt-4 text-sm text-red-600">
							{actionError}
						</p>
					) : null}
				</div>
			</div>
		</div>
	);
};

function mapNotification(notification: ApiNotification): Notification {
	return {
		id: notification.id,
		type: notification.kind.includes("job") ? "job_alert" : "system_alert",
		title: notification.title,
		message: notification.body,
		timestamp: new Date(notification.created_at).toLocaleString(),
		isNew: !notification.read_at,
		isRead: Boolean(notification.read_at),
		category: notification.archived_at ? "archived" : "all",
	};
}

export default Notifications;
